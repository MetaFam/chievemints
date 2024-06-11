import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import {
  config, ethers, run, upgrades, network,
} from 'hardhat'
import { utils, Contract } from 'ethers'
import R from 'ramda'
import { HardhatNetworkAccountsConfig, HardhatNetworkHDAccountsConfig } from 'hardhat/types'

const initializerArgs = ['MetaGame ’Chievemints', 'MG’s 🏆s']

const chain = (
  process.env.HARDHAT_NETWORK ?? config.defaultNetwork
)
const onPolygon = /(polygon|mumbai)/i.test(chain)

const fileTemplates = {
  address: `artifacts/${network.name}/{contract}.address`,
  args: `artifacts/${network.name}/{contract}.args`,
}

type DeployArgs = {
  contract: string
  args?: Array<any>
  libraries?: Record<string, string>
  proxy?: boolean
}

const deploy = async ({
  contract,
  args = [],
  libraries = {},
  proxy = false,
}: DeployArgs) => {
  const files = Object.fromEntries(
    Object.entries(fileTemplates).map(
      ([name, template]) => {
        template = template.replace(/\{contract\}/g, contract)
        const dir = path.dirname(template)
        if(!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
        return [name, template]
      }
    )
  )

  console.log(`\n 🛰  Deploying: ${contract}`)

  if(!ethers) throw new Error('`ethers` is not defined.')

  args ??= []
  const artifacts = await ethers.getContractFactory(
    contract, { libraries }
  )

  let deployment
  let impl: { new?: string, old?: string } = {}

  if(proxy) {
    if(!fs.existsSync(files.address)) {
      console.log(
        `\n 🥂 ${chalk.hex('#FF7D31')(files.address)} doesn't exist;`
        + ' creating a new proxy…'
      )
      deployment = await upgrades.deployProxy(
        artifacts,
        args,
        { kind: 'uups', timeout: 10 * 60 * 1000 },
      )
    } else {
      const existing = (
        fs.readFileSync(files.address).toString().trim()
      )
      impl.old = (
        await upgrades.erc1967.getImplementationAddress(existing)
      )

      console.log(
        `\n ⚇ Existing deployment proxied at ${chalk.hex('#AD4EFF')(existing)}`
        + ` for implementation ${chalk.hex('#87BED5')(impl.old)};`
        + ' upgrading'
      )
      deployment = await upgrades.upgradeProxy(
        existing,
        artifacts,
        { kind: 'uups', timeout: 10 * 60 * 1000 },
      )
    }
  } else {
    deployment = await artifacts.deploy()
  }
  const {
    address: deployed,
    signer: signator,
    deployTransaction: {
      gasPrice: gas, hash: tx, gasLimit,
    },
  } = deployment
  const signer = await signator.getAddress()
  const gasPrice = gas?.toBigInt() ?? '𝕌𝕟𝕕𝕖𝕗𝕚𝕟𝕖𝕕'

  console.debug(
    `\n 🍅 ${chalk.hex('#00AA7F')('Deployed in TX:')} `
    + chalk.hex('#6572AA')(tx) + ' to '
    + chalk.hex('#8FFFFC')(deployed)
  )

  if(proxy) {
    let loops = 0
    const timeout =  4 * 1000
    const maxLoops = 5
    let done = false

    while(!done && ++loops <= maxLoops) {
      try {
        impl.new = (
          await upgrades.erc1967.getImplementationAddress(deployed)
        )
      } catch(err) {
        console.error({ err })
      } // fails if the proxy isn't yet connected
      done = (
        (impl.new != null && impl.old !== impl.new)
      )
      if(!done) {
        console.info(
          ` 🔁 ${chalk.hex('#FF0606')(loops.toString())}`
          + `/${chalk.hex('#BB0606')(maxLoops.toString())}:`
          + ' No new implmentation found at'
          + ` ${chalk.hex('#FFF013')(deployed)};`
          + ` sleeping ${timeout / 1000}s`
        )
        await sleep(timeout)
      }
    }

    if(!impl.new) {
      throw new Error('Proxy implementation never loaded.')
    }
  }

  console.log(
    `\n 📄 ${chalk.cyan(contract)}, deployed`
    + (proxy ? (
      ` as a proxy at ${chalk.magenta(deployed)}`
      + ` to the implementation at ${chalk.hex('#DE307E')(impl.new)}`
    ) : (
      ` to address ${chalk.magenta(deployed)}`
    ))
    + ` by ${chalk.hex('#5A5FA5')(signer)}`
    + ` on chain ${chalk.bold.yellowBright(`#${chain}`)}`
    + ` ${chalk.green(`(saved to ${files.address})`)}.`
  )
  fs.writeFileSync(files.address, deployed)

  let gasInfo = '𐌵ⲛⲕⲛⲟⲱⲛ'
  if(typeof gasPrice === 'bigint') {
    const gasUsed = (
      gasLimit.toBigInt() * gasPrice
    )
    gasInfo = (
      `${utils.formatEther(gasUsed)} `
      + (onPolygon ? 'MATIC' : 'ETH')
    )
  }

  console.log(`\n ⛽ ${chalk.hex('#C6A831')(gasInfo)}`)

  const encoded = abiEncodeArgs(deployment, args)

  if(encoded && encoded.length > 2) {
    console.log(
      `\n 📚 Serializing ${encoded.length}`
      + ` arguments to ${chalk.hex('#6FBCFF')(files.args)}.`
    )
    fs.writeFileSync(files.args, encoded.slice(2))
  }

  return deployment
}

const main = async () => {
  await deploy({ contract: 'Roles' })
  await deploy({ contract: 'Bits' })

  const primary = 'BulkDisbursableNFTs'
  console.log(`\n\n 📡 Deploying: ${chalk.hex('#0E9907')(primary)}…\n`)

  const deployment = await deploy({
    contract: primary,
    proxy: true,
    args: initializerArgs,
  })

  const implementationAddress = (
    await upgrades.erc1967.getImplementationAddress(deployment.address)
  )
  try {
    const examiner = (
      `${onPolygon ? 'Polygon' : 'Ether'}scan`
    )
    const timeout = 20
    console.log(` ⏱  Waiting ${chalk.hex('#FFF818')(timeout)} seconds for ${examiner}`)
    await sleep(timeout * 1000)
    console.log(chalk.hex('#FFD25E')(
      `\n 🔍 Verifying ${chalk.hex('#8454FF')(implementationAddress)}`
      + ` on ${examiner}…\n`
    ))
    await run('verify:verify', {
      address: implementationAddress,
      constructorArguments: [],
    })
  } catch(err) {
    console.error((err as Error).message)
  }

  let saveDir = config.paths.artifacts
  if(process.env.PWD && saveDir.startsWith(process.env.PWD)) {
    saveDir = saveDir.substring(process.env.PWD.length + 1)
  }
  console.log(
    '\n 💾  Artifacts (address, abi, and args) saved to:'
    + ` ${chalk.hex('#87FF37')(saveDir)}\n`
  )
}

const abiEncodeArgs = (deployed: Contract, args: Array<unknown>) => {
  if (
    args
    && deployed
    && R.hasPath(['interface', 'deploy'], deployed)
  ) {
    const inputs = deployed.interface.deploy.inputs
    return (
      utils.defaultAbiCoder.encode(
        inputs, inputs.length === 0 ? [] : args,
      )
    )
  }
}

// checks if it is a Solidity file
const isSolidity = (filename: string) => (
  /\.(sol|swp|swap)$/i.test(filename)
)

const sleep = (ms: number) => (
  new Promise(resolve => setTimeout(resolve, ms))
)

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error({ error })
  process.exit(-1)
})
