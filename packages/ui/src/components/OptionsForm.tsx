import {
  URIForm, JSONForm, NFTForm, MaxForm, SubmitButton,
} from '@/components'
import {
  ipfsify, isSet, isEmpty, regexify, extractMessage,
} from '@/lib/helpers'
import React, { useCallback, useEffect, useState } from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useForm } from 'react-hook-form'
import JSON5 from 'json5'
import {
  ERC1155Metadata, FormValues, Maybe, OpenSeaAttribute, Attribute,
} from '@/lib/types'
import { useNavigate } from 'react-router-dom'
import { useConfig } from '@/config'

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
  } = useForm()
  const [tab, setTab] = useState(FIELD_FORM)
  const toast = useToast()
  const { storage } = useConfig()
  const metadata = watch('metadata')
  const json5 = watch('json5')
  const uri = watch('uri')

  useEffect(() => {
    if(purpose === 'update') {
      setValue('metadata', incomingData)
    }
  }, [setValue, purpose, incomingData])

  const buildMeta = useCallback(async (data: FormValues) => {
    const {
      name, description, homepage, color,
      images, animation, attributes,
    } = data

    const metadata: ERC1155Metadata = {
      name: isSet(name) ? name : '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙',
      decimals: 0,
    }

    if(isSet(description)) {
      metadata.description = description
    }

    if(isSet(homepage)) {
      metadata.external_url = homepage
    }

    if(Array.isArray(images) && images.some((img) => img != null)) {
      metadata.image = await ipfsify({ filesOrURL: images, storage })
    } else if(!Array.isArray(images)) {
      console.warn(`Unknown Image Type: ${typeof images}`)
    }

    if(animation instanceof File || typeof animation === 'string') {
      metadata.animation_url = await ipfsify({ filesOrURL: animation, storage })
    } else if (animation != null) {
      console.warn(`Unknown Animation Type: ${typeof animation}`)
    }

    if(color?.startsWith('#')) {
      metadata.background_color = (
        color.substring(1).toUpperCase()
      )
    }

    if(isSet(attributes) && !isEmpty(attributes)) {
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
    async ({ metadata }: { metadata: string } ) => {
      if(!rwContract) {
        throw new Error(
          `Cannot connect to contract to ${purpose} metadata.`
        )
      }
      if(tokenId == null) {
        throw new Error('Token id is unset.')
      }
      if(metadata == null) {
        throw new Error ('metadata is unset.')
      }
      try {
        const tx = await rwContract.setURI(
          BigInt(tokenId), metadata
        )
        await tx.wait()

        if(metadata !== '') {
          navigate(`/view/${regexify(tokenId)}`)
        }
      } catch(error) {
        console.error({ error })
        toast({
          title: 'Contract Error',
          description: extractMessage(error),
          status: 'error',
          isClosable: true,
          duration: 10000
        })
      }
    },
    [rwContract, tokenId, purpose, navigate, toast],
  )

  const submit = useCallback(async (data: FormValues) => {
    try {
      const name = `metadata.${(new Date()).toISOString()}.json`
      let metadata = await (async () => {
        switch(tab) {
          case FIELD_FORM: {
            const content = JSON.stringify(
              await buildMeta(data), null, 2
            )
            return { name, content }
          }
          case URI_FORM: {
            return data.uri ?? ''
          }
          case JSON5_FORM: {
            if(!isSet(data.json5)) {
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

      if(metadata == null) {
        throw new Error(`Metadata is \`${JSON5.stringify(metadata)}\`.`)
      } else if(metadata !== '') {
        console.log({metadata})
        metadata = await ipfsify({ filesOrURL: metadata, storage })
        console.log({metadata})
      }
      await configure({ metadata })
    } catch(error) {
      console.error({ error })
      toast({
        title: 'Metadata Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    }
  }, [buildMeta, configure, storage, tab, toast])

  return (
    <Stack align="center">
      <Box
        as="form" onSubmit={handleSubmit(submit)}
        mt={10} w={['100%', 'min(85vw, 40em)']}
        sx={{ a: { textDecoration: 'underline' } }}
      >
        <SubmitButton {...{ purpose, processing }} mb={3} />
        <Tabs
          mx={[0, 5]}
          isFitted
          variant="enclosed"
          onChange={async (idx: number) => {
            switch(idx) {
              case FIELD_FORM: {
                let metadata
                switch(tab) {
                  case URI_FORM: {
                    if(uri && uri !== '') {
                      const res = await fetch(uri)
                      metadata = JSON5.parse(
                        await res.text()
                      )
                    }
                    break
                  }
                  case JSON5_FORM: {
                    if(json5 && json5 !== '') {
                      metadata = JSON5.parse(json5)
                    }
                    break
                  }
                }
                if(metadata) {
                  await configure({ metadata })
                } else {
                  toast({
                    title: 'Metadata Warning',
                    description: 'No metadata specified.',
                    status: 'warning',
                    isClosable: true,
                    duration: 10000
                  })
                }
                break
              }
              case URI_FORM: {
                break
              }
            }
            setTab(idx)
          }}
        >
          <TabList mb="1em">
            <Tab>Fields</Tab>
            <Tab>URI</Tab>
            <Tab>JSON5</Tab>
          </TabList>
          <TabPanels>
            {[NFTForm, URIForm, JSONForm].map((Form, idx) => (
              <TabPanel key={idx} p={0}>
                <Form {...{
                  register,
                  watch,
                  setValue,
                  tokenId,
                  metadata,
                }} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <SubmitButton
          {...{ purpose, processing }}
          mb={3}
          requireStorage={true}
        />
      </Box>
      <MaxForm colorScheme="blue" {...{ tokenId, purpose }}/>
      <MaxForm
        colorScheme="blue"
        perUser={true}
        {...{ tokenId, purpose }}
      />
    </Stack>
  )
}

export default OptionsForm