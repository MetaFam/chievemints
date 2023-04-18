/* eslint-disable @next/next/no-img-element */
import { nftBase } from '@/config'
import {
  httpURL, isEmpty, regexify, capitalize,
} from '@/lib/helpers'
import {
  Attribute, ERC1155Metadata, Maybe, OpenSeaAttribute,
} from '@/lib/types'
import React, {
  ChangeEvent, useCallback, useEffect,
} from 'react'
import Markdown from 'react-markdown'
import {
  FieldValues, UseFormRegister, UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { Link } from 'react-router-dom'
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs'
import { ThreeDScene } from './ThreeDScene'
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
    <tr>
      <td>
        <input
          value={name}
          onChange={
            ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              setName(value)
            }
          }
        />
      </td>
      <td>
        {(() => {
          switch (type) {
            case 'date': {
              return (
                <input
                  type="date"
                  value={(() => {
                    if(!isEmpty(value)) {
                      try {
                        return (
                          new Date(value).toDateString()
                        )
                      } catch(e) {
                        console.error(e)
                      }
                    }
                    return ''
                  })()}
                  onChange={
                    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
                      setValue(new Date(value).getTime())
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
      </td>
      <td>
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
      </td>
      <td className='actions'>
        <button
          onClick={() => setFormValue(
            'attributes',
            [
              ...attributes.slice(0, index + 1),
              { name: '', value: '', type: 'string' },
              ...attributes.slice(index + 1),
            ]
          )}
        >
          ➕
        </button>
        <button
          onClick={() => setFormValue(
            'attributes',
            [
              ...attributes.slice(0, index),
              ...attributes.slice(index + 1),
            ]
          )}
        >
          ❌
        </button>
      </td>
    </tr>
  )
}

const Hyperlink: React.FC<React.PropsWithChildren<{
  href: string
}>> = ({
  href, children,
}) => {
  const external = /^(http|ip[nf]s)/.test(href)
  return (external ? (
    <a {...{ href }} target="_blank" rel="noreferrer">
      {children}
    </a>
  ) : (
    <Link {...{ to: href }}>{children}</Link>
  ))

}

const MediaDisplay: React.FC<{
  content: File | string
  name?: string
  prop: string
  setValue: UseFormSetValue<FieldValues>
  accept?: string
}> = ({
  content, name = 'Alt', prop, setValue, accept = '*/*',
}) => {
  const [filename, setFilename] = React.useState<Maybe<string>>(null)

  useEffect(() => {
    if(typeof content === 'string') {
      setFilename(content.replace(
        /^(https?:\/\/[^/]+\/|ip[nf]s:\/\/(.+\/)?)/, ''
      ))
    }
  }, [content])

  const set = ({ target: { files } }: (
    { target: { files: Maybe<FileList> } }
  )) => {
    if(files.length >= 1 && files[0]) {
      setValue(prop, files[0])
      setFilename(files[0].name)
    }
  }

  const remove = (evt: React.MouseEvent) => {
    setValue(prop, undefined)
    setFilename(null)
    evt.preventDefault()
  }

  return (
    <label className="media">
      <div className="selector">
        <h3>{capitalize(prop)}</h3>
        <input
          type="file"
          onChange={set}
          {...{ accept }}
        />
        {filename && <h4>{filename}</h4>}
        {!content && <div className="btn">Set</div>}
      </div>
      {content && (
        <div className="content">
          {(() => {
            const url = (
              (content instanceof File) ? (
                URL.createObjectURL(content)
              ) : (
                httpURL(content)
              )
            )
            const ext = filename?.split('.').pop()
            if(['mp4', 'avif', 'webm'].includes(ext)) {
              return (
                <video>
                  <source src={url}/>
                </video>
              )
            }
            if(['gltf', 'glb'].includes(ext)) {
              return <ThreeDScene model={url}/>
            }
            return (
              <img alt={name} src={url}/>
            )
          })()}
          <button onClick={remove}>❌</button>
        </div>
      )}
    </label>
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
  const {
    homepage, description, color, image,
    attributes, animation, name,
  } = watch()
  // const [wearables, setWearables] = useState({})

  useEffect(() => {
    if (metadata) {
      Object.entries({
        name: null, description: null, image: null,
        external_url: 'homepage',
        animation_url: 'animation',
      })
      .forEach(([prop, name]) => {
        console.info({ name, m: metadata[prop] })
        setValue(name ?? prop, metadata[prop])
      })

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
    if(
      !homepage
      || isEmpty(homepage)
      || homepage.endsWith('𝘜𝘯𝘬𝘯𝘰𝘸𝘯')
    ) {
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

  const addRow = () => {
    setValue('attributes', [...(attributes ?? []), {}])
  }

  return (
    <ul>
      <li id="name">
        <label>
          <h3>Name</h3>
          <input {...register('name')}/>
        </label>
      </li>
      <li id="image" style={{ '--img-bg': color }}>
        <MediaDisplay
          content={image}
          prop="image"
          accept="image/*"
          {...{ name, setValue }}
        />
      </li>
      <li id="background">
        <label>
          <h3>Background</h3>
          <input
            type="color"
            {...register('color')}
          />
        </label>
      </li>
      <li id="homepage">
        <label>
          <h3>Homepage</h3>
          <input {...register('homepage')}/>
        </label>
        {homepage?.length > 0 && (
          <Hyperlink href={homepage}>
            🡽
          </Hyperlink>
        )}
      </li>
      <li id="description">
        <label>
          <h3>Description</h3>
          <Tabs>
            <TabList>
              <Tab>Markdown</Tab>
              <Tab>Preview</Tab>
            </TabList>
            <TabPanel>
              <textarea
                id="description"
                placeholder="Enter a markdown formatted description."
                {...register('description')}
              />
            </TabPanel>
            <TabPanel>
              <Markdown>
                {description}
              </Markdown>
            </TabPanel>
          </Tabs>
        </label>
      </li>
      <li id="animation">
        <MediaDisplay
          content={animation}
          prop="animation"
          accept="model/gltf+json,model/gltf-binary,video/*,.gltf,.glb"
          {...{ name, setValue }}
        />
      </li>
      <li id="attributes">
        <label>
          <h3>Attributes</h3>
          <button onClick={addRow}>
            ➕
          </button>
        </label>
        {attributes?.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Type</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {attributes.map((_: Attribute, index: number) => (
                <AttrRow
                  key={index}
                  {...{
                    attributes, setValue, index,
                  }}
                />
              ))}
            </tbody>
          </table>
        )}
      </li>
    </ul>
  )
}

export default NFTForm