import WalletConnectProvider from '@walletconnect/web3-provider'
import { NETWORKS } from '../lib/networks'

const rpcUrls = Object.fromEntries(
  Object.entries(NETWORKS).map(
    ([hexId, { rpc }]) => [Number(hexId), rpc]
  )
)

export const options = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: rpcUrls,
    }
  }
}

export default options