import { contractNetwork } from '@/config'
import type { NetworkInfo } from '@/types'
import {
  mainnet, gnosis, localhost,
  polygon, polygonMumbai, optimism,
} from 'viem/chains'

declare const MAINNET_RPC: string
declare const GNOSIS_RPC: string
declare const POLYGON_RPC: string
declare const MUMBAI_RPC: string
declare const OPTIMISM_RPC: string
declare const LOCAL_RPC: string

export const NETWORKS: NetworkInfo = (() => {
  const networks: NetworkInfo = {
    mainnet: {
      viemChain: mainnet,
      chainId: 1,
      name: 'Ethereum Mainnet',
      label: 'Ethereum',
      currency: 'ETH',
      explorerUrl: 'https://etherscan.io',
      rpcUrl: (typeof MAINNET_RPC !== 'undefined' ? (
        MAINNET_RPC
      ) : (
        'https://eth.public-rpcUrl.com/'
      )),
    },
    gnosis: {
      viemChain: gnosis,
      chainId: 0x64,
      name: 'Gnosis Chain',
      label: 'Gnosis',
      currency: 'xDAI',
      explorerUrl: 'https://blockscout.com/xdai/mainnet',
      rpcUrl: (typeof GNOSIS_RPC !== 'undefined' ? (
        GNOSIS_RPC
      ) : (
        'https://rpcUrl.gnosischain.com/'
      )),
    },
    polygon: {
      viemChain: polygon,
      chainId: 137,
      name: 'Polygon',
      label: 'Polygon',
      currency: 'MATIC',
      explorerUrl: 'https://polygonscan.com',
      rpcUrl: (typeof POLYGON_RPC !== 'undefined' ? (
        POLYGON_RPC
      ) : (
        'https://polygon-rpcUrl.com'
      )),
    },
    mumbai: {
      viemChain: polygonMumbai,
      chainId: 80001,
      name: 'Polygon’s Mumbai Testnet',
      label: 'Mumbai',
      currency: '𝙼𝙰𝚃𝙸𝙲',
      explorerUrl: 'https://mumbai.polygonscan.com',
      rpcUrl: (typeof MUMBAI_RPC !== 'undefined' ? (
        MUMBAI_RPC
      ) : (
        'https://rpcUrl.ankr.com/polygon_mumbai'
        ?? 'https://rpcUrl-mumbai.matic.today'
      )),
    },
    optimisticEthereum: {
      viemChain: optimism,
      chainId: 10,
      name: 'Optimism',
      label: 'Optimism',
      currency: 'OETH',
      explorerUrl: 'https://optimistic.etherscan.io',
      rpcUrl: (typeof OPTIMISM_RPC !== 'undefined' ? (
        OPTIMISM_RPC
      ) : (
        'https://mainnet.optimism.io'
      )),
    },
    localhost: {
      viemChain: localhost,
      chainId: 0x7a69,
      name: 'Ganache',
      label: 'Ganache',
      currency: '🄴🅃🄷',
      explorerUrl: null,
      rpcUrl: (typeof LOCAL_RPC !== 'undefined' ? (
        LOCAL_RPC
      ) : (
        'http://127.0.0.1:8545'
      )),
    },
  }
  Object.defineProperty(networks, 'contract', {
    get() {
      let net = this[contractNetwork]
      if(!net) {
        Object.keys(networks).forEach((name) => {
          if(contractNetwork.toLowerCase().includes(name)) {
            net = this[name]
          }
        })
      }
      return net
    },
  })
  for(const net of Object.values(networks)) {
    networks[net.chainId] = net
  }
  return networks
})()