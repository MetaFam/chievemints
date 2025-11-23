import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { deregexify, extractMessage, regexify } from '#lib/helpers'
import { SubmitButton } from '#components'
import { useWeb3 } from '#lib/hooks'
import { View } from './view'

export const SelfMint: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  const { rwContract, address, contractClient } = useWeb3()
  const [processing, setProcessing] = useState(false)

  const mint = useCallback(async () => {
    try {
      if(!rwContract) {
        throw new Error('`rwContract` is not set.')
      }
      setProcessing(true)
      const hash = await (
        rwContract('mint', [[address], BigInt(tokenId)])
      ) as '0x{string}'
      await contractClient.waitForTransactionReceipt({ hash })
    } catch(error) {
      console.error({ error })
      toast.error(extractMessage(error))
    } finally {
      setProcessing(false)
    }
  }, [address, contractClient, rwContract, tokenId])

  return (
    <main id="self-mint">
      <title>{`Self-Mint NFT #${regexify(tokenId)}`}</title>
      <meta name="description" content="Mint a ’Chievemint NFT" />

      <form onSubmit={mint}>
        <SubmitButton purpose="mint" {...{ processing }}/>
        <View {...{ tokenId }} header={false}/>
        <SubmitButton purpose="mint" {...{ processing }}/>
      </form>
    </main>
  )
}

export const SelfMintPage = () => {
  const { nftId } = useParams()
  const tokenId = deregexify(
    Array.isArray(nftId) ? nftId[0] : nftId
  )

  return <SelfMint {...{ tokenId }}/>
}

export default SelfMintPage