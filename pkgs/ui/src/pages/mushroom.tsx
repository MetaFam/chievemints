import React from 'react'
import { Helmet } from 'react-helmet'
import { BiconomyPaymaster, BiconomySmartAccountV2, Bundler, DEFAULT_ECDSA_OWNERSHIP_MODULE, DEFAULT_ENTRYPOINT_ADDRESS, ECDSAOwnershipValidationModule, PaymasterMode, WalletClientSigner, createSmartAccountClient } from '@biconomy/account'
import { Header } from '@/components'
import {
  createWalletClient, http, encodeFunctionData, parseAbi, custom, 
} from 'viem'
import { useAccount } from 'wagmi'
import { optimism } from 'viem/chains'
import ABI from '../contracts/optimisticEthereum/BulkDisbursableNFTs.abi';
import tyl from '../styles/mushroom.module.css'

export const FreeMushroom = () => (
  <section id={tyl.free}>
    <Helmet>
      <title>’𝖈𝖍𝖎𝖊𝖛𝖊: Free Mushroom</title>
    </Helmet>
    <Header/>
    <Content/>
  </section>
)

const Content: React.FC = () => {
  const { address } = useAccount()
  console.debug({ address, ABI })
  const mint = async () => {
    const client = createWalletClient({
      account: address,
      chain: optimism,
      transport: custom(window.ethereum),
    })

    console.debug({ acc: client.account, req: await client.request({ method: 'eth_accounts', params: [] }) })

    const bundlerURL = (
      'https://bundler.biconomy.io/api/v2/10/nJPK7B3ru.ac5t7734-190d-41am-af80-6877f74b8f44'
    )
    const paymasterURL = (
      'https://paymaster.biconomy.io/api/v1/10/B__e5X2ip.9ef0f5c9-efda-4014-b91c-f1ecf60ab466'
    )
    // const bundler = new Bundler({
    //   bundlerUrl: bundlerURL,
    //   chainId: 10,
    //   entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    // })
    // const paymaster = new BiconomyPaymaster({
    //   paymasterUrl: paymasterURL,
    // })

    // const smartAccount = await BiconomySmartAccountV2.create({
    //   chainId: 10,
    //   bundler,
    //   paymaster,
    //   entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    //   defaultValidationModule: ownerShipModule,
    //   activeValidationModule: ownerShipModule
    // })

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

    console.debug({ nftData, saAddr: await smartAccount.getAccountAddress() })

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
      console.log(`Minted mushroom with transaction hash: ${transactionHash}`)
    } else {
      console.error('Failed to mint mushroom.')
    }
  }

  return (
    <button onClick={mint}>Mint A Mushroom</button>
  )
}

export default FreeMushroom