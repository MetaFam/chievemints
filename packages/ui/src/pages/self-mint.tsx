import React, { useCallback, useState } from 'react'
import { deregexify, extractMessage, regexify } from '@/lib/helpers'
import { useParams } from 'react-router-dom'
import { View } from './view'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { SubmitButton } from '@/components'
import { useWeb3 } from '@/lib/hooks'

export const SelfMint: React.FC<{ tokenId: string }> = ({ tokenId }) => {
  const { rwContract, address, contractClient } = useWeb3()
  const [processing, setProcessing] = useState(false)

  const mint = useCallback(async () => {
    try {
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
  }, [address, rwContract, tokenId])

  return (
    <main id="self-mint">
      <Helmet>
        <title>Self-Mint NFT #{regexify(tokenId)}</title>
        <meta name="description" content="Mint a ’Chievemint NFT" />
      </Helmet>


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