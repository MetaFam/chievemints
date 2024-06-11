import { utils } from 'ethers'
import fs from 'fs'
import glob from 'glob'
import chalk from 'chalk'
import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import '@openzeppelin/hardhat-upgrades'
import 'dotenv/config'
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types'
import '@typechain/ethers-v5'
import '@typechain/hardhat'
import {
  HardhatUserConfig, HttpNetworkUserConfig,
} from 'hardhat/types'
import * as bip39 from 'bip39'
import { deregexify, load } from './lib/helpers'

const { isAddress, getAddress, formatUnits } = utils

const defaultNetwork = process.env.CHAIN_NAME ?? 'polygon'

let mnemonic = (() => {
  try {
    return fs.readFileSync('./mnemonic.txt').toString().trim()
  } catch (e) {
  }
})()

if(!mnemonic || mnemonic === '') {
  mnemonic = process.env.MNEMONIC

  if(!mnemonic) {
    console.warn('Generating and saving mnemonic to `mnemonic.txt`.')
    mnemonic = bip39.generateMnemonic()
    fs.writeFileSync('./mnemonic.txt', mnemonic.toString())
  }
}

const validationKeyNames = {
  mainnet: 'ETHERSCAN_API_KEY',
  rinkeby: 'ETHERSCAN_API_KEY',
  polygon: 'POLYGONSCAN_API_KEY',
  polygonMumbai: 'POLYGONSCAN_API_KEY',
  dysMumbai: 'POLYGONSCAN_API_KEY',
  optimisticEthereum: 'OPTIMISMSCAN_API_KEY',
}

const apiKey = Object.fromEntries(
  Object.entries(
    validationKeyNames
  ).map(([net, key]) => (
    [net, process.env[key]]
  )).filter(([, value]) => value !== undefined)
)
apiKey.gnosis = 'any value will work here'

if(!apiKey[defaultNetwork]) {
  const keyName = validationKeyNames[
    defaultNetwork as keyof typeof validationKeyNames
  ]
  if(!keyName) {
    throw new Error(
      `No \`validationKeyNames\` entry for network: ${defaultNetwork}`
    )
  }
  throw new Error(
    `Missing \`$${keyName}\` needed for validation on ${defaultNetwork}.`
  )
}

type EtherscannedHardhatConfig = HardhatUserConfig & {
  etherscan: { apiKey: Record<string, string> }
  typechain: { target: string, outDir: string }
}

const gasMultiplier = 1.5
const infuraId = process.env.INFURA_ID ?? ''
const alchemyId = process.env.ALCHEMY_ID ?? ''
const config: EtherscannedHardhatConfig = {
  defaultNetwork,

  paths: {
    sources: 'src',
    artifacts: `artifacts/${defaultNetwork}`,
  },

  networks: {
    localhost: {
      url: 'http://localhost:8545',
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${infuraId}`,
      accounts: { mnemonic },
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`,
      accounts: { mnemonic },
      gasMultiplier,
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${infuraId}`,
      accounts: { mnemonic },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraId}`,
      accounts: { mnemonic },
    },
    gnosis: {
      url: 'https://rpc.gnosischain.com',
      accounts: { mnemonic },
      gasMultiplier,
    },
    polygon: {
      // url: 'https://polygon-rpc.com',
      url: `https://polygon-mainnet.g.alchemy.com/v2/${alchemyId}`,
      accounts: { mnemonic },
      gasMultiplier,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      accounts: { mnemonic },
    },
    dysMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${alchemyId}`,
      accounts: { mnemonic },
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${alchemyId}`,
      accounts: { mnemonic },
    },
    get optimisticEthereum() {
      return this.optimism
    },
  },
  solidity: {
    compilers: [{
      version: '0.8.23',
      settings: {
        optimizer: {
          enabled: true,
          runs: 5,
        },
      },
    }],
  },
  etherscan: { apiKey },
  typechain: {
    target: 'ethers-v5',
    outDir: '../ui/contracts/types/',
  },
}

const networkConfig = (
  config?.networks?.[defaultNetwork ?? ''] as HttpNetworkUserConfig
)
if(networkConfig?.url?.endsWith('/')) {
  console.warn(`${defaultNetwork} network URL ends with '/', probably missing a provider id.`)
}

if(
  networkConfig.url
  === (config?.networks?.mumbai as HttpNetworkUserConfig)?.url
  && !apiKey.polygonMumbai
) {
  throw new Error(
    'For validation on Mumbai, `apiKey.polygonMumbai` must be set.'
  )
}


export default config

const DEBUG = false
const debug = (...info: string[]) => {
  if (DEBUG) console.debug(...info)
}

task('env', 'Display the execution environment', async () => {
  console.info({ __dirname, env: process.env, config })
})

task('mint', 'Mint a token for a user')
.addParam('address', 'Address of the user to promote')
.addParam('tokenId', 'Id of the token to mint')
.setAction(async (args, { ethers }) => {
  const [, srcDir] = config?.paths?.sources?.match(/^.*?\/?([^\/]+)\/?$/) ?? []
  if (!srcDir) throw new Error('ERROR - could not find source directory')
  const contractsHome = `${config?.paths?.artifacts}/${srcDir}/`
  const [contractFile] = (
    glob
    .sync(`${contractsHome}/*/*`)
    .filter((name) => !/\.dbg\.json$/.test(name))
  )

  const { abi, contractName } = JSON.parse(
    fs.readFileSync(contractFile).toString()
  )
  console.debug(
    ` 🦐 Loaded ${chalk.hex('#88C677')(contractName)} From:`
    + ` ${chalk.hex('#E59AF9')(contractFile)}`
  )
  const address = (
    fs.readFileSync(
      `${config?.paths?.artifacts}/${contractName}.address`
    )
    .toString()
    .trim()
  )

  console.debug(`Found contract at address: ${address}`)
  
  const contract = (
    new ethers.Contract(address, abi, ethers.provider.getSigner())
  )
  const tx = await contract['mint(address,uint256,uint256,bytes)'](
    args.address, args.tokenId, 1, [],
  )

  console.info(`Minted with token id ${chalk.hex('#ff0000')(args.tokenId)} for ${chalk.hex('00ff00')(args.address)}`) 

})

task('setMax', 'Set maximum mintable allowance.')
.addParam('token', 'Id of the token to alter')
.addParam('max', 'Maximum allowed to mint (negative value for no limit)')
.setAction(async (args, { ethers }) => {
  const [, srcDir] = config?.paths?.sources?.match(/^.*?\/?([^\/]+)\/?$/) ?? []
  if (!srcDir) throw new Error('ERROR - could not find source directory')
  const contractsHome = `${config?.paths?.artifacts}/${srcDir}/`
  const [contractFile] = (
    glob
    .sync(`${contractsHome}/*/Bulk*`)
    .filter((name) => !/\.dbg\.json$/.test(name))
  )

  const { abi, contractName } = JSON.parse(
    fs.readFileSync(contractFile).toString()
  )
  console.debug(
    ` 🦐 Loaded ${chalk.hex('#88C677')(contractName)} From:`
    + ` ${chalk.hex('#E59AF9')(contractFile)}`
  )

  const address = (
    fs.readFileSync(
      `${config?.paths?.artifacts}/${contractName}.address`
    )
    .toString()
    .trim()
  )

  const contract = (
    new ethers.Contract(address, abi, ethers.provider.getSigner())
  )
  const tx = await contract.setMax(deregexify(args.token), args.max)
  await tx.wait()

  console.info(`Set max to ${chalk.hex('#ff0000')(args.max)} for ${chalk.hex('00ff00')(args.token)}`) 
})

task('grant', 'Grant a role')
.addParam('address', 'Address of the user to promote')
.addParam('role', 'Role to grant')
.addFlag('singleUse', 'Token may be used only once.')
.addOptionalParam('token', 'Token id to grant for')
.setAction(async (args, { ethers }) => {
  const { contract, name: contractName } = (
    load({ filenameBase: 'Bulk*', ethers, config })
  )
  let { address: user, role, token, singleUse } = args
  console.log(
    ` 🍏 Setting ${chalk.hex('#E1A47B')(user)}`
    + ` as ${singleUse ? '(single use) ' : ''}${chalk.hex('#5AE1AD')(role)}`
    + ` on ${chalk.hex('#E16464')(contractName)}`
    + (token ? ` for id:${chalk.hex('#E11F83')(token)}` : '')
  )
  if(user.includes('.')) {
    const rpc = (
      (config.networks?.mainnet as HttpNetworkUserConfig)?.url
    )
    if(!rpc) throw new Error('No mainnet RPC defined.')
    const provider = new ethers.providers.JsonRpcProvider(rpc)
    const derefed = await provider.resolveName(user)
    console.debug(
      ` 🚊 Looked Up: ${chalk.hex('#FCFF13')(user)}`
      + ` → ${chalk.hex('#8B67FF')(derefed)}`
    )
    user = derefed
  }
  if(token) {
    const expanded = deregexify(token)
    if(expanded !== token) {
      console.debug(
        ` 🔭 Expanded: ${chalk.hex('#FCFF13')(token)}`
        + ` → ${chalk.hex('#8B67FF')(expanded)}`
      )
      token = expanded
    }
  }
  const { contract: rolesLibrary } = (
    load({ filenameBase: 'Roles*', ethers, config })
  )

  const roleId = await rolesLibrary.roleIndexForName(role)
  if(roleId === 0) throw new Error(`Can’t find “${role}” (must be capitalized).`)
  let tx
  if(token) {
    tx = await contract['grantRole(uint8,address,uint256,bool)'](roleId, user, token, !!args.singleUse)
  } else {
    tx = await contract['grantRole(uint8,address,bool)'](roleId, user, !!args.singleUse)
  }
  const gas = {
    limit: tx.gasLimit.toBigInt() as bigint,
    price: tx.gasPrice.toBigInt() as bigint,
  }
  console.log(` ⛽ ${Number((gas.limit * gas.price) / 10n**10n) / 10**8}`)
  console.info(` 🕋 Tx: ${tx.hash}`)
})

task('disable', 'Disable a role')
.addParam('role', 'Role to grant')
.addParam('index', 'Index of the token to modify')
.setAction(async (args, { ethers }) => {
  const { contract, name: contractName } = (
    load({ filenameBase: 'Bulk*', ethers, config })
  )
  let { role, index } = args
  console.log(
    ` 🍍 Disabling ${chalk.hex('#E1A47B')(role)} role`
    + ` on ${chalk.hex('#E16464')(contractName)}`
    + ` for token index #${chalk.hex('#E11F83')(index)}`
  )
  const { contract: rolesLibrary } = (
    load({ filenameBase: 'Roles*', ethers, config })
  )
  const roleId = await rolesLibrary.roleIndexForName(role)
  if(roleId === 0) throw new Error(`Can’t find “${role}” (must be capitalized).`)
  let tx = await contract.disableRole(roleId, index)
  const gas = {
    limit: tx.gasLimit.toBigInt() as bigint,
    price: tx.gasPrice.toBigInt() as bigint,
  }
  console.log(` ⛽ ${Number((gas.limit * gas.price) / 10n**10n) / 10**8}`)
  console.info(` 🕋 Tx: ${tx.hash}`)
})

task('wallet', 'Create a wallet (pk) link', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom()
  const privateKey = randomWallet._signingKey().privateKey
  console.log(` 🔐 WALLET Generated As ${randomWallet.address}`)
  console.log(` 🔗 http://localhost:3000/pk#${privateKey}`)
})


// task('fundedwallet', 'Create a wallet (pk) link and fund it with deployer?')
// .addOptionalParam('amount', 'Amount of ETH to send to wallet after generating')
// .addOptionalParam('url', 'URL to add pk to')
// .setAction(async (taskArgs, { network, ethers }) => {
//   const randomWallet = ethers.Wallet.createRandom()
//   const privateKey = randomWallet._signingKey().privateKey
//   console.log(` 🔐 WALLET Generated As ${randomWallet.address}`)
//   let { url = 'http://localhost:3000' } = taskArgs

//   let localDeployerMnemonic
//   try{
//     localDeployerMnemonic = (
//       fs.readFileSync('./mnemonic.txt')
//       .toString()
//       .trim()
//     )
//   } catch (e) {
//     /* do nothing - this file isn't always there */
//   }

//   let amount = taskArgs.amount ?? '0.01'
//   const tx = {
//     to: randomWallet.address,
//     value: ethers.utils.parseEther(amount)
//   }

//   // SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
//   // IF NOT SEND USING LOCAL HARDHAT NODE:
//   if(localDeployerMnemonic){
//     let deployerWallet = ethers.Wallet.fromMnemonic(localDeployerMnemonic)
//     deployerWallet = deployerWallet.connect(ethers.provider)
//     console.log(` 💵 Sending ${amount} ETH to ${randomWallet.address} using deployer account`)
//     let sendresult = await deployerWallet.sendTransaction(tx)
//     console.log(`   ${url}/pk#${privateKey}`)
//     return
//   } else {
//     console.log(` 💵 Sending ${amount} ETH to ${randomWallet.address} using local node`)
//     console.log(`   ${url}/pk#${privateKey}`)
//     return send(ethers.provider.getSigner(), tx)
//   }
// })

// task('generate', 'Create a mnemonic for builder deploys', async (_, { ethers }) => {
//   const bip39 = require('bip39')
//   const hdkey = require('ethereumjs-wallet/hdkey')
//   const monic = mnemonic ?? bip39.generateMnemonic()
//   debug('mnemonic', monic)
//   const seed = await bip39.mnemonicToSeed(monic)
//   debug('seed', seed)
//   const hdwallet = hdkey.fromMasterSeed(seed)
//   const walletHDPath = "m/44'/60'/0'/0/"
//   const accountIndex = 0
//   let fullPath = walletHDPath + accountIndex
//   debug('fullPath', fullPath)
//   const wallet = hdwallet.derivePath(fullPath).getWallet()
//   const privateKey = `0x${wallet._privKey.toString('hex')}`
//   debug('privateKey', privateKey)
//   var EthUtil = require('ethereumjs-util')
//   const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`
//   console.log(` 🔐 Account Generated as ${address} and set as mnemonic in packages/hardhat`)
//   console.log(' 💬 Use `yarn run account` to get more information about the deployment account.')

//   fs.writeFileSync(`${address}.txt`, monic.toString())
//   if(fs.existsSync('mnemonic.txt')) {
//     console.warn('mnemonic.txt exists; skipping.')
//   } else {
//     fs.writeFileSync('./mnemonic.txt', monic.toString())
//   }
// })

// task('mineContractAddress', 'Looks for a deployer account that will give leading zeros')
// .addParam('searchFor', 'String to search for')
// .setAction(async (taskArgs, { network, ethers }) => {
//   let contract_address = ''
//   let address

//   const bip39 = require('bip39')
//   const hdkey = require('ethereumjs-wallet/hdkey')

//   let mnemonic = ''
//   while(contract_address.indexOf(taskArgs.searchFor) != 0) {
//     mnemonic = bip39.generateMnemonic()
//     debug('mnemonic', mnemonic)
//     const seed = await bip39.mnemonicToSeed(mnemonic)
//     debug('seed', seed)
//     const hdwallet = hdkey.fromMasterSeed(seed)
//     const wallet_hdpath = "m/44'/60'/0'/0/"
//     const account_index = 0
//     let fullPath = wallet_hdpath + account_index
//     debug('fullPath', fullPath)
//     const wallet = hdwallet.derivePath(fullPath).getWallet()
//     const privateKey = '0x' + wallet._privKey.toString('hex')
//     debug('privateKey', privateKey)
//     var EthUtil = require('ethereumjs-util')
//     address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`


//     const rlp = require('rlp')
//     const keccak = require('keccak')

//     let nonce = 0x00 //The nonce must be a hex literal!
//     let sender = address

//     let input_arr = [sender, nonce]
//     let rlp_encoded = rlp.encode(input_arr)

//     let contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex')

//     contract_address = contract_address_long.substring(24)
//   }

//   console.log(` ⛏  Account Mined as ${address} and set as mnemonic in packages/hardhat`)
//   console.log(` 📜 This will create the first contract: ${chalk.magenta(`0x${contract_address}`)}`)
//   console.log(' 💬 Use `yarn run account` to get more information about the deployment account.')

//   fs.writeFileSync(`${address}_produces-${contract_address}.txt`, mnemonic.toString())
//   if(fs.existsSync('mnemonic.txt')) {
//     console.warn('mnemonic.txt exists; skipping.')
//   } else {
//     fs.writeFileSync('mnemonic.txt', mnemonic.toString())
//   }
// })

task('account', 'Get balance information for the deployment account.')
.setAction(async (_, { ethers }) => {
  const hdkey = await import('ethereumjs-wallet/hdkey')
  const bip39 = await import('bip39')
  let mnemonic = fs.readFileSync('./mnemonic.txt').toString().trim()
  const seed = await bip39.mnemonicToSeed(mnemonic)
  const hdwallet = hdkey.fromMasterSeed(seed)
  const wallet_hdpath = "m/44'/60'/0'/0/"
  const account_index = 0
  let fullPath = wallet_hdpath + account_index
  debug('fullPath', fullPath)
  const wallet = hdwallet.derivePath(fullPath).getWallet()
  const privateKey = '0x' + wallet._privKey.toString('hex')
  var EthUtil = await import('ethereumjs-util')
  const address = '0x' + EthUtil.privateToAddress(wallet._privKey).toString('hex')

  var qrcode = await import('qrcode-terminal')
  qrcode.generate(address)
  console.log(` ‍📬 Deployer Account is ${address}`)
  for(const [name, net] of Object.entries(config.networks ?? {})) {
    console.log(`——— ${name} ——  ——  —— 📡`)
    if(!net) {
      console.log('  ¡No Network!')
    } else {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          (net as HttpNetworkUserConfig).url
        )
        const balance = await provider.getBalance(address)
        console.log(`  ⚖ balance: ${ethers.utils.formatEther(balance)}`)
        console.log(
          `  📙 nonce: ${await provider.getTransactionCount(address)}`
        )
      } catch(error) {
        console.error(`  🦖 ${(error as Error).message}`)
      }
    }
  }
})

const addr = async (ethers: HardhatEthersHelpers, addr: string) => {
  if (isAddress(addr)) {
    return getAddress(addr)
  }
  const accounts = await ethers.provider.listAccounts()
  // if (accounts[addr] !== undefined) {
  //   return accounts[addr]
  // }
  throw `Could not normalize address: ${addr}`
}

task('accounts', 'Prints the list of accounts')
.setAction(async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts()
  accounts.forEach((account, idx) => {
    console.log(`${idx + 1}: ${account}`)
  })
})

task('blockNumber', 'Prints the block number')
.setAction(async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber()
  console.log({ blockNumber })
})

task('balance', 'Prints an account’s balance')
.addPositionalParam('account', 'The account’s address')
.setAction(async (args, { ethers }) => {
  const balance = await ethers.provider.getBalance(
    await addr(ethers, args.account)
  )
  console.log(formatUnits(balance, 'ether'), 'ETH')
})

// const send = (signer: JsonRpcSigner, txparams: { to: string | undefined; value: string | BigNumber; from?: string; nonce?: number; gasPrice?: string; gasLimit?: any; chainId?: number | undefined }) => {
//   return signer.sendTransaction(txparams, (error: any, transactionHash: any) => {
//     if (error) {
//       debug(`Error: ${error}`)
//     }
//     debug(`transactionHash: ${transactionHash}`)
//     // checkForReceipt(2, params, transactionHash, resolve)
//   })
// }

// task('send', 'Send ETH')
// .addParam('from', 'From address or account index')
// .addOptionalParam('to', 'To address or account index')
// .addOptionalParam('amount', 'Amount to send in ether')
// .addOptionalParam('data', 'Data included in transaction')
// .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei')
// .addOptionalParam('gasLimit', 'Limit of how much gas to spend')
// .setAction(async (taskArgs, { network, ethers }) => {
//   const from = await addr(ethers, taskArgs.from)
//   debug(`Normalized from address: ${from}`)
//   const fromSigner = await ethers.provider.getSigner(from)

//   let to
//   if (taskArgs.to) {
//     to = await addr(ethers, taskArgs.to)
//     debug(`Normalized to address: ${to}`)
//   }

//   const txRequest = {
//     from: await fromSigner.getAddress(),
//     to,
//     value: (
//       parseUnits(
//         taskArgs.amount ?? '0',
//         'ether'
//       )
//       .toHexString()
//     ),
//     nonce: await fromSigner.getTransactionCount(),
//     gasPrice: (
//       parseUnits(
//         taskArgs.gasPrice ?? '1.001',
//         'gwei'
//       )
//       .toHexString()
//     ),
//     gasLimit: taskArgs.gasLimit ?? 24000,
//     chainId: network.config.chainId,
//   }

//   if(taskArgs.data !== undefined) {
//     txRequest.data = taskArgs.data
//     debug(`Adding data to payload: ${txRequest.data}`)
//   }
//   debug(`${Number(txRequest.gasPrice) / 1000000000} gwei`)
//   debug(JSON.stringify(txRequest, null, 2))

//   return send(fromSigner, txRequest)
// })

task('sign', 'Sign the contents of a file')
.addPositionalParam('input', 'File whose contents to sign')
.setAction(async (args, { ethers }) => {
  const { input: file } = args
  if(!file || file === '') {
    console.info('Usage: $0 sign file.txt')
  } else if(!fs.existsSync(file)) {
    throw new Error(`File “${file}” doesn't exist.`)
  } else {
    const content = fs.readFileSync(file).toString()
    const prefix = '>   '
    const indented = `${prefix}${content.replace("\n", `\n${prefix}`)}`
    console.info(`Signing: \n${indented}`)
    const sig = await ethers.provider.getSigner().signMessage(content)
    console.info(`Signature: “${sig}”`)
  }
})