import { create as ipfsHTTPClient } from 'ipfs-http-client'
const process: Record<string,any> = { env: {} }
export const CONFIG = {
  infuraId: (
    process.env.NEXT_PUBLIC_INFURA_ID
    ?? '781d8466252d47508e177b8637b1c2fd'
  ),
  ceramicURL: (
    process.env.NEXT_PUBLIC_CERAMIC_URL
    ?? 'https://ceramic.metagame.wtf'       // mainnet
    ?? 'https://ceramic-clay.3boxlabs.com'  // testnet
  ),
  ceramicNetwork: (
    process.env.NEXT_PUBLIC_CERAMIC_NETWORK
    ?? 'mainnet' ?? 'testnet-clay'
  ),
  contractNetwork: (
    process.env.NEXT_PUBLIC_CHAIN_NAME || 'polygon'
  ),
  ipfs: ipfsHTTPClient({
    host: 'ipfs.infura.io', port: 5001, protocol: 'https'
  }),  
  nftGraph: (
    process.env.NEXT_PUBLIC_NFT_GRAPH
    ?? 'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
  ),
}

export default CONFIG