import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import JSON5 from 'json5'
import { useWeb3 } from '@/lib/hooks'
import {
  httpURL, regexify, deregexify, extractMessage,
} from '@/lib/helpers'
import { HomeLink, OptionsForm } from '@/components'
import type { ERC1155Metadata, Maybe } from '@/lib/types'

export const Edit = () => {
  const { nftId } = useParams()
  const tokenId = useMemo(() => deregexify(nftId), [nftId])
  const [metadata, setMetadata] = useState<Maybe<ERC1155Metadata>>()
  const [metaURI, setMetaURI] = useState<Maybe<string>>()
  const [error, setError] = useState<ReactNode>()
  const { roContract } = useWeb3()

  useEffect(() => {
    const getMetadata = async () => {
      if(roContract && tokenId) {
        try {
          const metaURI = await roContract.uri(tokenId)
          const url = httpURL(metaURI)
          if(!metaURI || metaURI === '') {
            throw new Error('No metadata URI.')
          } else {
            const response = await fetch(url)
            const body = await response.text()
            try {
              setMetadata(JSON5.parse(body))
              setMetaURI(metaURI)
            } catch(error) {
              console.error({ url, tokenId, metaURI, error, body })
              throw error
            }
          }
        } catch(err) {
          setMetadata(null)
          setError(extractMessage(err))
        }
      }
    }

    getMetadata()
  }, [roContract, tokenId])

  return (
    <Box ml={16}>
      <Helmet>
        <title>’𝖈𝖍𝖎𝖊𝖛𝖊: ℰ𝒹𝒾𝓉 #{tokenId && regexify(tokenId)}</title>
      </Helmet>
      <HomeLink/>
      {error && (
        <Alert status="error">
          <AlertIcon/>
          <AlertTitle>`setMetadata` Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {metadata === undefined ? (
        <Box><Spinner/> Loading {metaURI}…</Box>
      ) : (
        <OptionsForm
          purpose="update"
          {...{ tokenId, metadata, metaURI }}
        />
      )}
    </Box>
  )
}

export default Edit