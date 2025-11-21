import React from 'react'
import { BiconomyPaymaster, BiconomySmartAccountV2, Bundler, DEFAULT_ECDSA_OWNERSHIP_MODULE, DEFAULT_ENTRYPOINT_ADDRESS, ECDSAOwnershipValidationModule, PaymasterMode, WalletClientSigner, createSmartAccountClient } from '@biconomy/account'
import {
  createWalletClient, http, encodeFunctionData, parseAbi, custom,
} from 'viem'
import { optimism } from 'viem/chains'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { Header } from '@/components'
import ABI from '../contracts/optimisticEthereum/BulkDisbursableNFTs.abi';
import tyl from '../styles/mushroom.module.css'

export const FreeMushroom = () => (
  <section id={tyl.free}>
    <title>’𝖈𝖍𝖎𝖊𝖛𝖊: Free Mushroom</title>

    <Header/>

    <Content/>
  </section>
)

const Content: React.FC = () => {
  const { address } = useAccount()
  const mint = async () => {
    const client = createWalletClient({
      account: address,
      chain: optimism,
      transport: custom(window.ethereum),
    })

    const bundlerURL = (
      'https://bundler.biconomy.io/api/v2/10/nJPK7B3ru.ac5t7734-190d-41am-af80-6877f74b8f44'
    )
    const paymasterURL = (
      'https://paymaster.biconomy.io/api/v1/10/B__e5X2ip.9ef0f5c9-efda-4014-b91c-f1ecf60ab466'
    )

    const smartAccount = await createSmartAccountClient({
      signer: client,
      bundlerUrl: bundlerURL,
      paymasterUrl: paymasterURL,
    })

    const tokenId = `0x48${'0'.repeat(57)}7`
    const nftData = encodeFunctionData({
      abi: parseAbi([
        'function mint(address recipient, uint256 id, uint256 amount, bytes data) public'
      ]),
      functionName: 'mint',
      args: [address, BigInt(tokenId), BigInt(1), '0x0'],
    })

    const { wait } = await smartAccount.sendTransaction({
      to: '0xb77b8eDB779Cda90dBF651F8109857C97193CF9F',
      data: nftData,
    }, {
      paymasterServiceData: { mode: PaymasterMode.SPONSORED },
    })

    const {
      receipt: { transactionHash },
      success,
    } = await wait()

    if(success) {
      toast(`Minted mushroom with transaction hash: ${transactionHash}`)
    } else {
      console.error('Failed to mint mushroom.')
    }
  }

  return (
    <button onClick={mint}>Mint A Mushroom</button>
  )
}

export default FreeMushroom