import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import JSON5 from 'json5'
import {
  regexify, deregexify, httpURL,
} from '@/lib/helpers'
import type { ERC1155Metadata, Styles } from '@/lib/types'
import { HomeLink, ThreeDScene } from '@/components'
import { useWeb3 } from '@/lib/hooks'
import styles from '../styles/view.module.css'

const ss: Styles = (
  (...names: Array<string>) => {
    return names.map((name) => styles[name]).join(' ')
  }
)
Object.assign(ss, styles)

export const View: React.FC<{ tokenId: string, header?: boolean }> = (
  ({ tokenId, header = true }) => {
    const [metadata, setMetadata] = useState<ERC1155Metadata>()
    const [error, setError] = useState<string>()
    const { roContract } = useWeb3()

    useEffect(
      () => {
        const getMetadata = async () => {
          if(roContract && tokenId) {
            try {
              let realId = BigInt(tokenId)
              if(realId < 2**32) {
                realId = await roContract.tokenByIndex(realId)
              }

              const metadataURI = await roContract.uri(realId)
              const metadataURL = httpURL(metadataURI)
              if(!metadataURL) {
                throw new Error(
                  `Couldn't find metadata for token #${regexify(tokenId)}.`
                )
              }
              const response = await fetch(metadataURL)
              const data = await response.text()
              setMetadata(JSON5.parse(data))
            } catch(err) {
              setError((err as Error).message)
            }
          }
        }

        getMetadata()
      },
      [roContract, tokenId],
    )

    if(error) {
      return (
        <aside>
          <span>Error: Loading NFT</span>
          <span>{error}</span>
        </aside>
      )
    }

    if(!metadata) {
      return (
        <main>
          <FadeLoader color="#36d7b7" height={100}/>
          <p>Loading Metadata for Token #{regexify(tokenId)}</p>
        </main>
      )
    }

    const {
      name, image, animation_url: animation,
      description, background_color: bg,
    } = metadata

    return (
      <div id={vs.style}>
        {header && (
          <Helmet>
            <title>{name} (#{regexify(tokenId)})</title>
            <meta
              name="description"
              content={description}
            />
          </Helmet>
        )}
        <header><HomeLink/></header>
        <header>
          {name && <h1>{name}</h1>}
        </header>
        <main>
          {image && (
            <object
              data={httpURL(image as string) ?? undefined}
              title={name}
              className={vs.image}
              style={{ backgroundColor: `#${bg}` }}
            />
          )}
          {description && (
            <Markdown
              className={vs.markdown}
              remarkPlugins={[remarkGfm]}
              linkTarget="_blank"
            >
              {description}
            </Markdown>
          )}
          {animation && (
            (() => {
              const url = httpURL(animation as string) ?? undefined

              if(/(mpe?g|mp4)$/i.test(animation as string)) {
                return (
                  <video
                    controls autoPlay loop muted
                    className={vs.video}
                  >
                    <source src={url}/>
                  </video>
                )
              } else if(/(glb|gltf)$/i.test(animation as string)) {
                return (
                  <ThreeDScene
                    model={url}
                    className={vs.model}                            
                    {...{ bg }}
                  />
                )
              } else {
                return (
                  <object
                    data={url}
                    title={name}
                    className={vs.object}
                  />
                )
              }
            })()
          )}
        </main>
      </div>
    )
  }
)

export const ViewPage = () => {
  const { nftId } = useParams() 
  const tokenId = deregexify(
    Array.isArray(nftId) ? nftId[0] : nftId
  )

  return <View {...{ tokenId }}/>
}

export default ViewPage