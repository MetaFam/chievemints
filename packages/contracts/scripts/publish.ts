import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import hre from 'hardhat'

const shortDir = (path: string) => {
  const [, start] = process.env.PWD?.match(/^(.*\/packages\/).*$/) ?? []
  if(path.startsWith(start)) {
    path = path.substring(start.length)
  }
  return path
}

let publishDir = path.join(
  process.cwd(),
  '../ui/contracts/',
  hre.network.name,
)
let artifactsDir = hre.config.paths.artifacts

const graphDir = path.join(process.cwd(), '../subgraph')

const publishContract = (contractName: string) => {
  console.log(
    `\n 💽 Publishing ${chalk.cyan(contractName)}`
    + ` to ${chalk.gray(shortDir(publishDir))}`
  )
  try {
    const [, sourceDir = 'contracts'] = (
      hre.config.paths.sources.match(/^.*\/([^\/]+)\/?$/) ?? []
    )
    const contractJSON = path.join(
      artifactsDir, sourceDir,
      `${contractName}.sol/${contractName}.json`,
    )
    console.log(
      `\n 📖 Reading: ${chalk.magentaBright(shortDir(contractJSON))}`
    )  
    let contract = (
      JSON.parse(fs.readFileSync(contractJSON).toString())
    )

    const addressJSON = (
      `${artifactsDir}/${contractName}.address`
    )
    console.log(
      ` 📖 Reading: ${chalk.greenBright(shortDir(addressJSON))}`
    )  
    const address = (
      fs.readFileSync(addressJSON).toString().trim()
    )

    // let graphConfigPath = `${graphDir}/config/config.json`
    // let graphConfig
    // try {
    //   if (fs.existsSync(graphConfigPath)) {
    //     graphConfig = (
    //       fs.readFileSync(graphConfigPath).toString()
    //     )
    //   } else {
    //     graphConfig = '{}'
    //   }
    // } catch (e) {
    //   console.error(e)
    // }
    // graphConfig = JSON.parse(graphConfig)
    // graphConfig[contractName + 'Address'] = address

    const outs = {
      [`${publishDir}/${contractName}.address.ts`]: (
        `export default '${address}'`
      ),
      [`${publishDir}/${contractName}.abi.ts`]: (
        `export default ${JSON.stringify(contract.abi, null, 2)}`
      ),
      // [`${publishDir}/${contractName}.bytecode.ts`]: (
      //   `export default '${contract.bytecode}'`
      // ),
      
      // [graphConfigPath]: JSON.stringify(graphConfig, null, 2),
      // [`${graphDir}/abis/${contractName}.json`]: (
      //   JSON.stringify(contract.abi, null, 2)
      // ),
    }
    Object.entries(outs).forEach(([file, content]) => {
      const dir = path.dirname(file)
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true })
      }
  
      console.info(
        ` 💁 Writing: ${chalk.hex('#FF8D1A')(shortDir(file))}`
      )
      fs.writeFileSync(file, content)
    })

    console.log(
      `\n 📠 Published ${chalk.green(contractName)} to the frontend.`
    )

    return true
  } catch (e) {
    console.error(e)
    if(/no such file or directory/i.test((e as Error).message)) {
      console.log(chalk.yellowBright(
        ` ⚠️  Can't find ${contractName}.json. (Is it deployed?)`
      ))
    } else {
      console.error(e)
    }
    return false
  }
}

async function main() {
  if(!fs.existsSync(publishDir)) {
    fs.mkdirSync(publishDir, { recursive: true })
  }
  const finalContractList: Array<string> = []
  fs.readdirSync(hre.config.paths.sources).forEach(
    (file) => {
      if(file.endsWith('.sol')) {
        const contractName = file.replace(/\.sol$/, '')
        if(publishContract(contractName)) {
          finalContractList.push(contractName)
        }
      }
    }
  )
  fs.writeFileSync(
    `${publishDir}/index.ts`,
    `export default ${JSON.stringify(finalContractList, null, 2)}`
  )
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1)
})
