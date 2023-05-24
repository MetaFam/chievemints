import {
  URIForm, JSONForm, NFTForm, MaxForm, SubmitButton,
} from '@/components'
import {
  ipfsify, isSet, isEmpty, regexify, extractMessage,
} from '@/lib/helpers'
import React, { useCallback, useMemo, useState } from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import JSON5 from 'json5'
import {
  ERC1155Metadata, FormValues, Maybe, OpenSeaAttribute, Attribute,
} from '@/lib/types'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '@/config'
import { toast } from 'react-toastify'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { createPortal } from 'react-dom'
import { Values } from '@/lib/types'
import os from '../styles/OptionsForm.module.css'

export const OptionsForm: React.FC<{
  purpose?: 'create' | 'update'
  tokenId?: string
  metadata?: Maybe<ERC1155Metadata>
  metaURI?: string
}> = ({
  purpose = 'create',
  tokenId,
  metadata: incomingData,
  metaURI: incomingURI,
}) => {
    const FIELD_FORM = 0
    const URI_FORM = 1
    const JSON5_FORM = 2
    const { rwContract } = useWeb3()
    const navigate = useNavigate()
    const {
      register, handleSubmit, watch, setValue: setValue,
      formState: { isSubmitting: processing },
    } = useForm<FormValues>({
      defaultValues: {
        uri: incomingURI,
      },
    })
    const [metadata, setMetadata] = (
      useState<Maybe<ERC1155Metadata>>(incomingData ?? {})
    )
    const [tab, setTab] = useState(FIELD_FORM)
    const { storage, Settings, openSettings } = useConfig()
    const values = watch()
    const json5 = watch('json5')
    const uri = watch('uri')

    const buildMeta = useCallback(async ({
      data, ipfs = true,
    }: { data: FormValues, ipfs?: boolean }) => {
      const wrapIPFS = async (filesOrURL: unknown) => {
        const isFile = filesOrURL instanceof File
        const isString = typeof filesOrURL === 'string'
        if (isFile || isString) {
          if (ipfs) {
            return await ipfsify({ filesOrURL, storage })
          } else {
            return (
              isFile ? (
                URL.createObjectURL(filesOrURL)
              ) : (
                filesOrURL
              )
            )
          }
        } else {
          throw new Error(`Unknown Media Type: ${typeof image}`)
        }
      }

      const {
        name, description, homepage, color,
        image, animation, attributes,
      } = data

      const metadata: ERC1155Metadata = {
        name: isSet(name) ? name : '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙',
        decimals: 0,
      }

      if (isSet(description)) {
        metadata.description = description
      }

      if (isSet(homepage)) {
        metadata.external_url = homepage
      }

      if (image) {
        metadata.image = await wrapIPFS(image)
      }

      if (animation) {
        metadata.animation_url = await wrapIPFS(animation)
      }

      if (color?.startsWith('#')) {
        metadata.background_color = (
          color.substring(1).toUpperCase()
        )
      }

      if (isSet(attributes) && !isEmpty(attributes)) {
        metadata.attributes = (
          attributes.map(({ name, value, type }: Attribute) => {
            const attr: OpenSeaAttribute = {
              trait_type: name,
              value,
            }
            // including a string type causes nothing to render
            if (type !== 'string') {
              attr.display_type = type
            }
            return attr
          })
        )
      }

      return metadata
    }, [storage])

    const configure = useCallback(
      async ({ metadata }: { metadata: string }) => {
        if (!rwContract) {
          throw new Error(
            `Cannot connect to contract to ${purpose} metadata.`
          )
        }
        if (tokenId == null) {
          throw new Error('Token id is unset.')
        }
        if (metadata == null) {
          throw new Error('metadata is unset.')
        }
        try {
          const tx = await rwContract.setURI(
            BigInt(tokenId), metadata
          )
          await tx.wait(2)

          if (metadata !== '') {
            navigate(`/view/${regexify(tokenId)}`)
          }
        } catch (error) {
          console.error({ error })
          toast(extractMessage(error), { type: 'error' })
        }
      },
      [rwContract, tokenId, purpose, navigate],
    )

    const submit = useCallback(async (data: FormValues) => {
      try {
        const name = `metadata.${(new Date()).toISOString()}.json`
        let metadata = await (async () => {
          switch (tab) {
            case FIELD_FORM: {
              const content = JSON.stringify(
                await buildMeta({ data }), null, 2
              )
              return { name, content }
            }
            case URI_FORM: {
              return data.uri ?? ''
            }
            case JSON5_FORM: {
              if (!isSet(data.json5)) {
                throw new Error('JSON5 isn’t set.')
              }
              const meta = JSON5.parse(data.json5)
              return {
                name,
                content: JSON.stringify(meta, null, 2)
              }
            }
            default: {
              throw new Error(`Unknown Tab: ${tab}`)
            }
          }
        })()

        if (metadata == null) {
          throw new Error(`Metadata is \`${JSON5.stringify(metadata)}\`.`)
        } else if (metadata !== '') {
          metadata = await ipfsify({ filesOrURL: metadata, storage })
        }
        await configure({ metadata })
      } catch (error) {
        console.error({ error })
        toast(extractMessage(error))
      }
    }, [buildMeta, configure, storage, tab])

    const changeTo = useMemo(() => ({
      fields: async (previous: number) => {
        let metaPromise
        switch (previous) {
          case URI_FORM: {
            if (uri && uri !== '') {
              metaPromise = (
                fetch(uri)
                  .then((res) => res.text())
                  .then<ERC1155Metadata>(
                    (txt) => JSON5.parse(txt)
                  )
              )
            }
            break
          }
          case JSON5_FORM: {
            if (json5 && json5 !== '') {
              metaPromise = Promise.resolve<ERC1155Metadata>(
                JSON5.parse(json5)
              )
            }
            break
          }
        }

        if (metaPromise) {
          setMetadata(null)
          metaPromise
            .then((meta) => {
              const types = [
                { image: 'image' },
                { animation: 'animation_url' },
              ] as const
              for (const typeSet of types) {
                const type = Object.keys(typeSet)[0] as keyof typeof typeSet
                const key = typeSet[type] as Values<typeof typeSet>
                if (
                  typeof meta[key] === 'string'
                  && (meta[key] as string).startsWith('blob:')
                ) {
                  meta[key] = values[type] as string
                }
              }
              setMetadata(meta)
            })
        } else {
          toast.warn('No metadata specified.')
        }
      },
      uri: async (previous: number) => {
        return previous
      },
      json5: async (previous: number) => {
        let metaPromise
        switch (previous) {
          case FIELD_FORM: {
            metaPromise = (
              buildMeta({ data: values, ipfs: false })
            )
            break
          }
          case URI_FORM: {
            if (uri && uri !== '') {
              metaPromise = (
                fetch(uri)
                  .then<ERC1155Metadata>((res) => res.json())
              )
            }
            break
          }
        }
        if (metaPromise) {
          setMetadata(null)
          setMetadata(await metaPromise)
        } else {
          toast('No metadata found.')
        }
      }
    }), [uri, json5, buildMeta, values])

    const onSelect = useCallback(
      (idx: number, previous: number) => {
        if (idx === previous) return

        let changePromise
        switch (idx) {
          case FIELD_FORM: {
            changePromise = changeTo.fields(previous)
            break
          }
          case URI_FORM: {
            changePromise = changeTo.uri(previous)
            break
          }
          case JSON5_FORM: {
            changePromise = changeTo.json5(previous)
            break
          }
        }
        changePromise.then(() => setTab(idx))
      },
      [changeTo],
    )

    return (
      <div id={os.form}>
        {createPortal(
          <Settings />, document.body,
        )}
        <form onSubmit={handleSubmit(submit)}>
          <SubmitButton
            className="full"
            {...{ purpose, processing, openSettings }}
          />
          <Tabs {...{ onSelect }}>
            <TabList>
              <Tab>Fields</Tab>
              <Tab>URI</Tab>
              <Tab>JSON5</Tab>
            </TabList>
            {[NFTForm, URIForm, JSONForm].map(
              (Form, idx) => (
                <TabPanel key={idx}>
                  <Form {...{
                    register,
                    watch,
                    setValue,
                    tokenId,
                    metadata,
                  }} />
                </TabPanel>
              )
            )}
          </Tabs>
          <SubmitButton
            requireStorage={true}
            className="full"
            {...{ purpose, processing, openSettings }}
          />
        </form>
        <section id={os.maxes}>
          <MaxForm
            className={os.max}
            {...{ tokenId, purpose }}
          />
          <MaxForm
            perUser={true}
            className={os.max}
            {...{ tokenId, purpose }}
          />
        </section>
      </div>
    )
  }

export default OptionsForm