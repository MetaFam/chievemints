/* eslint-disable @next/next/no-img-element */
import {
  AddIcon, CloseIcon, ExternalLinkIcon
} from '@chakra-ui/icons'
import { nftBase } from '@/config'
import { httpURL, isEmpty, regexify } from '@/lib/helpers'
import {
  Attribute, ERC1155Metadata, Maybe, OpenSeaAttribute,
} from '@/lib/types'
import React, {
  ChangeEvent, useCallback, useEffect, useRef, useState,
} from 'react'
import Markdown from 'react-markdown'
import {
  FieldValues, UseFormRegister, UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { Link } from 'react-router-dom'
import '../styles/NFTForm.css'

const AttrRow: React.FC<{
  attributes: Array<Attribute>
  setValue: (
    UseFormSetValue<FieldValues>
  )
  index: number
}> = ({ attributes = [], setValue: setFormValue, index }) => {
  const { name = '', value = '', type = 'string' } = (
    attributes[index]
  )
  const setter = useCallback(
    (prop: string) => (
      (value: string | number) => {
        setFormValue(
          'attributes',
          [
            ...attributes.slice(0, index),
            { ...attributes[index], [prop]: value },
            ...attributes.slice(index + 1)
          ],
        )
      }
    ), [setFormValue, index, attributes]
  )
  const setName = setter('name')
  const setValue = setter('value')
  const setType = setter('type')

  return (
    <div>
      <>
        <input
          value={name}
          onChange={
            ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              setName(value)
            }
          }
        />
        {(() => {
          switch (type) {
            case 'date': {
              return (
                <input
                  type="date"
                  value={isEmpty(value) ? (
                    ''
                  ) : (
                    (new Date(value)).toISOString().split('T')[0]
                  )}
                  onChange={
                    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                      setValue((new Date(value)).getTime())
                    }
                  }
                />
              )
            }
            case 'string': {
              return (
                <input
                  {...{ value }}
                  onChange={
                    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                      setValue(value)
                    }
                  }
                />
              )
            }
            default: {
              return (
                <input
                  type="number"
                  {...{ value }}
                  onChange={
                    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                      setValue(value != null ? Number(value) : '')
                    }
                  }
                />
              )
            }
          }
        })()}
        <div>
          <select
            value={type}
            onChange={
              ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
                setType(value)
              }
            }
          >
            <option value="string">String</option>
            <option value="date">Date</option>
            <option value="number">Number</option>
            <option value="boost_percentage">
              Boost Percentage
            </option>
            <option value="boost_number">
              Boost Number
            </option>
          </select>
        </div>
        <div>
          <button
            onClick={() => setFormValue(
              'attributes',
              [
                ...attributes.slice(0, index),
                ...attributes.slice(index + 1)
              ]
            )}
          >
            {/* <CloseIcon /> */}
          </button>
        </div>
      </>
    </div>
  )
}

export const NFTForm: React.FC<{
  purpose?: 'create' | 'update'
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  tokenId?: string
  metadata?: Maybe<ERC1155Metadata>
}> = ({
  // purpose = 'create',
  register,
  watch,
  setValue,
  tokenId = '𝘜𝘯𝘬𝘯𝘰𝘸𝘯',
  metadata,
}) => {
  const [primaryImageIdx, setPrimaryImageIdx] = (
    useState<number | undefined>(0)
  )
  const imageRef = useRef<HTMLInputElement>(null)
  const {
    homepage, description, color, images, attributes, animation,
  } = watch()
  // const [wearables, setWearables] = useState({})

  useEffect(() => {
    if (metadata) {
      Object.entries({
        name: null, description: null,
        external_url: 'homepage',
        animation_url: 'animation',
      })
      .forEach(([prop, name]) => {
        setValue(name ?? prop, metadata[prop])
      })

      if(metadata.image) {
        setValue('images', [metadata.image])
      }

      const { attributes: attrs } = metadata
      if(!isEmpty(attrs)) {
        setValue(
          'attributes',
          ((attrs ?? []).map(
            ({
              trait_type: name,
              value,
              display_type: type = 'string',
            }: OpenSeaAttribute) => (
              { name, value, type }
            )
          ))
        )
      }

      // setWearables(metadata.properties?.wearables ?? {})

      const bg = metadata.background_color
      if(bg && !isEmpty(bg)) {
        setValue('color', `#${bg}`)
      }
    }
  }, [metadata, setValue])

  useEffect(() => {
    if(!homepage || isEmpty(homepage) || homepage.endsWith('𝘜𝘯𝘬𝘯𝘰𝘸𝘯')) {
      setValue(
        'homepage',
        `${nftBase}/${regexify(tokenId)}`
      )
    }
  }, [homepage, setValue, tokenId])

  useEffect(() => {
    if (window.location.hash) {
      const elem = document.getElementById(
        window.location.hash.substring(1)
      )
      window.scroll({
        top: (elem?.offsetTop ?? 0) - 120,
        behavior: 'smooth',
      })
    }
  }, [])

  const addImage = ({ target: { files } }: (
    { target: { files: Maybe<FileList> } }
  )) => {
    if(files?.length && files?.length >= 1) {
      setValue('images', [...(images ?? []), ...Array.from(files)])
    }
  }

  const removeImage = (idx: number) => {
    const replacement = [
      ...images.slice(0, idx),
      ...images.slice(idx + 1)
    ]
    setValue('images', replacement)
    if(primaryImageIdx === idx) {
      setPrimaryImageIdx(
        replacement.length > 0 ? 0 : undefined
      )
    }
  }

  const configAnimation = (
    (evt: ChangeEvent & { target: { files: Maybe<FileList> } }) => {
      const { target: { files } } = evt
      if (files?.length >= 1) {
        setValue('animation', files[0])
      } else {
        setValue('animation', null)
      }
      evt.preventDefault()
    }
  )

  const addRow = () => {
    setValue('attributes', [...(attributes ?? []), {}])
  }

  return (
    <ul>
      <li>
        <div>
          <label>Name</label>
          <input {...register('name')}/>
        </div>
      </li>
      <li>
        <div>
          <label>Images</label>
          <input
            type="file"
            accept="image/*"
            ref={imageRef}
            onChange={addImage}
            multiple
          />
        </div>
        {images?.length > 0 && (
          <div>
            {images.map((image: File | string, idx: number) => {
              const name = (
                (image as File)?.name
                ?? (image as string)?.replace(/^.*\//g, '')
              )

              return (
                <React.Fragment key={idx}>
                  <div>
                    <label>
                      Display Image
                      <input type="radio" value={idx}/>
                    </label>
                  </div>
                  <div>
                    <img
                      alt={name}
                      src={
                        (image instanceof File) ? (
                          URL.createObjectURL(image)
                        ) : (
                          httpURL(image) ?? undefined
                        )
                      }
                      onClick={() => imageRef.current?.click()}
                    />
                  </div>
                  <div>
                    <button onClick={() => removeImage(idx)}>
                      {/* <CloseIcon/> */}
                    </button>
                  </div>
                </React.Fragment>
              )
            })}
          </div>
        )}
        <button onClick={() => imageRef.current?.click()}>
          {/* <AddIcon/> */}
        </button>
      </li>
      <li>
        <div>
          <label>Background</label>
          <input
            type="color"
            {...register('color')}
          />
        </div>
      </li>
      <li>
        <div>
          <label>Homepage</label>
          <input {...register('homepage')}/>
          {homepage?.length > 0 && (
            <Link to={homepage}>
              <ExternalLinkIcon />
            </Link>
          )}
        </div>
      </li>
      <li>
        <div>
          <label>Description</label>
          <Tabs>
            <TabList mb="1em">
              <Tab>Markdown</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Textarea
                  placeholder="Enter a markdown formatted description."
                  minH={32}
                  {...register('description')}
                />
              </TabPanel>
              <TabPanel>
                <Markdown>
                  {description}
                </Markdown>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </li>
      <li>
        <div>
          <label>Animation</label>
          {typeof animation === 'string' && (
            <>
              <p>
                {decodeURI(animation.replace(
                  /^ipfs:\/\/[^/]+\//, ''
                ))}
              </p>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              <Link to={httpURL(animation)!}>
                {/* <ExternalLinkIcon /> */}
              </Link>
            </>
          )}
          {(
            typeof File !== 'undefined'
            && animation instanceof File
            && (
              <div>
                <p>{animation.name}</p>
                <Link to={URL.createObjectURL(animation)}>
                  {/* <ExternalLinkIcon /> */}
                </Link>
              </div>
            )
          )}
          <input
            type="file"
            accept="model/gltf+json,model/gltf-binary,video/*,.gltf,.glb"
            onChange={configAnimation}
          />
        </div>
      </li>
      <li id="attributes">
        <label>Attributes</label>
        <button onClick={addRow}>
          {/* <AddIcon /> */}
        </button>
        {attributes?.length > 0 && (
          <section>
            <ul>
              <li>Name</li>
              <li>Value</li>
              <li>Type</li>
            </ul>
            {attributes.map((_: Attribute, index: number) => (
              <AttrRow
                key={index}
                {...{
                  attributes, setValue, index,
                }}
              />
            ))}
          </section>
        )}
      </li>
    </ul>
  )
}

export default NFTForm