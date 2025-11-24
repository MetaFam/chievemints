import {
  type ReactNode, useEffect, useMemo, useState,
} from 'react'
import { useParams } from 'react-router'
import JSON5 from 'json5'
import { RingLoader } from 'react-spinners'
import { useWeb3 } from '#lib/hooks'
import {
  httpURL, regexify, deregexify, extractMessage,
} from '#lib/helpers'
import { HomeLink, OptionsForm } from '#components'
import type { ERC1155Metadata, Maybe } from '#types'
import '../styles/edit.css'

export const Edit = () => {
  const { nftId } = useParams()
  if(!nftId) throw new Error('`nftId` is not set.')
  const tokenId = useMemo(() => deregexify(nftId), [nftId])
  const [metadata, setMetadata] = useState<Maybe<ERC1155Metadata>>()
  const [metaURI, setMetaURI] = useState<string>()
  const [error, setError] = useState<ReactNode>()
  const { roContract } = useWeb3()

  useEffect(() => {
    const getMetadata = async () => {
      if(roContract && tokenId) {
        try {
          const metaURI = await roContract('uri', [tokenId]) as string
          const url = httpURL(metaURI)
          if(!metaURI || metaURI === '') {
            setMetadata({})
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
    <main id="edit">
      <title>{`’𝖈𝖍𝖎𝖊𝖛𝖊: ℰ𝒹𝒾𝓉${tokenId == null ? '' : ` #${regexify(tokenId)}`}`}</title>

      <HomeLink/>

      {error && (
        <aside className="error">
          <span>`setMetadata` Error</span>
          <span>{error}</span>
        </aside>
      )}
      {metadata === undefined ? (
        <aside>
          <RingLoader color="#36d7b7"/>
          <span>Loading {metaURI}…</span>
        </aside>
      ) : (
        <OptionsForm
          purpose="update"
          {...{ tokenId, metadata, metaURI }}
        />
      )}
    </main>
  )
}

export default Edit