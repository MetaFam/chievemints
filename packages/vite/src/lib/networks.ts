import CONFIG from '../config'
import { Maybe } from './types'

export type NetworkInfo = {
  [chainName: string]: {
    chainId: string
    name: string
    label: string
    symbol: string
    explorer: Maybe<string>
    rpc: string
  }
}

export const NETWORKS: NetworkInfo = {
  mainnet: {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    label: 'Ethereum',
    symbol: 'ETH',
    explorer: 'https://etherscan.io',
    rpc: `https://mainnet.infura.io/v3/${CONFIG.infuraId}`,
  },
  rinkeby: {
    chainId: '0x4',
    name: 'Rinkeby',
    label: 'Rinkeby',
    symbol: 'ETH',
    explorer: 'https://rinkeby.etherscan.io',
    rpc: `https://rinkeby.infura.io/v3/${CONFIG.infuraId}`,
  },
  gnosis: {
    chainId: '0x64',
    name: 'Gnosis Chain',
    label: 'Gnosis',
    symbol: 'xDAI',
    explorer: 'https://blockscout.com/xdai/mainnet',
    rpc: 'https://rpc.gnosischain.com/',
  },
  polygon: {
    chainId: '0x89',
    name: 'Polygon',
    label: 'Polygon',
    symbol: 'MATIC',
    explorer: 'https://polygonscan.com',
    rpc: 'https://polygon-rpc.com',
  },
  localhost: {
    chainId: '0x7a69',
    name: 'Ganache',
    label: 'Ganache',
    symbol: '🄴🅃🄷',
    explorer: null,
    rpc: 'http://127.0.0.1:8545',
  },
  get contract() {
    return this[CONFIG.contractNetwork]
  },
}
