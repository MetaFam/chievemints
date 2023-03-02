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
    <Tr>
      <Td><Input
        value={name}
        onChange={
          ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setName(value)
          }
        }
      /></Td>
      <Td>{(() => {
        switch (type) {
          case 'date': {
            return (
              <Input
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
              <Input
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
              <Input
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
      })()}</Td>
      <Td>
        <Select
          value={type}
          onChange={
            ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
              setType(value)
            }
          }
        >
          <chakra.option value="string">String</chakra.option>
          <chakra.option value="date">Date</chakra.option>
          <chakra.option value="number">Number</chakra.option>
          <chakra.option value="boost_percentage">
            Boost Percentage
          </chakra.option>
          <chakra.option value="boost_number">
            Boost Number
          </chakra.option>
        </Select>
      </Td>
      <Td><Tooltip label="Remove" hasArrow>
        <Button
          size="sm" ml={2}
          colorScheme="red"
          onClick={() => setFormValue(
            'attributes',
            [
              ...attributes.slice(0, index),
              ...attributes.slice(index + 1)
            ]
          )}
        >
          <CloseIcon />
        </Button>
      </Tooltip></Td>
    </Tr>
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
    <UnorderedList listStyleType="none">
      <ListItem>
        <FormControl mt={3}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormLabel _after={{ content: '":"' }}>
              Name
            </FormLabel>
            <Input
              autoFocus
              ml={{ base: 0, md: 4 }}
              {...register('name')}
            />
          </Flex>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl mt={3}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormLabel _after={{ content: '":"' }}>
              Images
            </FormLabel>
            <Input
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={addImage}
              display="none"
              multiple
            />
          </Flex>
          {images?.length > 0 && (
            <RadioGroup
              value={primaryImageIdx}
              onChange={(value: string) => {
                setPrimaryImageIdx(Number(value))
              }}
            >
              <SimpleGrid columns={3} templateColumns="6rem 1fr 2rem">
                {images.map((image: File | string, idx: number) => {
                  const name = (
                    (image as File)?.name
                    ?? (image as string)?.replace(/^.*\//g, '')
                  )

                  return (
                    <React.Fragment key={idx}>
                      <Flex w={16}>
                        <Radio value={idx}>Display Image</Radio>
                      </Flex>
                      <Flex
                        justify="center"
                        bg={idx === primaryImageIdx ? color : 'transparent'}
                      >
                        <Tooltip label={name} hasArrow>
                          <Image
                            alt={name}
                            src={
                              (image instanceof File) ? (
                                URL.createObjectURL(image)
                              ) : (
                                httpURL(image) ?? undefined
                              )
                            }
                            maxH={60} mt={0}
                            onClick={() => imageRef.current?.click()}
                          />
                        </Tooltip>
                      </Flex>
                      <Center>
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={() => removeImage(idx)}
                        >
                          <CloseIcon/>
                        </Button>
                      </Center>
                    </React.Fragment>
                  )
                })}
              </SimpleGrid>
            </RadioGroup>
          )}
          <Button
            w="full" mt={3}
            colorScheme="teal"
            onClick={() => imageRef.current?.click()}
          >
            <AddIcon/>
          </Button>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl mt={3}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormLabel _after={{ content: '":"' }}>
              Background
            </FormLabel>
            <Input
              type="color"
              {...register('color')}
            />
          </Flex>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl mt={3}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormLabel _after={{ content: '":"' }}>
              Homepage
            </FormLabel>
            <Flex grow={1}>
              <Input
                {...register('homepage')}
              />
              {homepage?.length > 0 && (
                <Link ml={2} href={homepage} isExternal>
                  <ExternalLinkIcon />
                </Link>
              )}
            </Flex>
          </Flex>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl mt={3}>
          <Stack>
            <FormLabel _after={{ content: '":"' }}>
              Description
            </FormLabel>
            <Tabs ml={5} isFitted variant="enclosed">
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
          </Stack>
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl mt={3}>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <FormLabel _after={{ content: '":"' }}>
              Animation
            </FormLabel>
            {typeof animation === 'string' && (
              <Flex>
                <Text>
                  {decodeURI(animation.replace(
                    /^ipfs:\/\/[^/]+\//, ''
                  ))}
                </Text>
                {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
                <Link href={httpURL(animation)!} ml={3} mb={5} isExternal>
                  <ExternalLinkIcon />
                </Link>
              </Flex>
            )}
            {(
              typeof File !== 'undefined'
              && animation instanceof File
              && (
                <Flex>
                  <Text>{animation.name}</Text>
                  <Link
                    ml={3} mb={5}
                    isExternal
                    href={URL.createObjectURL(animation)}
                  >
                    <ExternalLinkIcon />
                  </Link>
                </Flex>
              )
            )}
            <Input
              type="file"
              accept="model/gltf+json,model/gltf-binary,video/*,.gltf,.glb"
              onChange={configAnimation}
              h="auto"
            />
          </Flex>
        </FormControl>
      </ListItem>
      <ListItem id="attributes">
        <FormControl mt={3}>
          <Stack>
            <Flex>
              <FormLabel _after={{ content: '":"' }}>
                Attributes
              </FormLabel>
              <Button
                ml={2} size="xs"
                onClick={addRow}
                colorScheme="teal"
              >
                <AddIcon />
              </Button>
            </Flex>
            {attributes?.length > 0 && (
              <Table
                sx={{ 'th, td': {
                  textAlign: 'center',
                  px: 2,
                } }}
              >
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Value</Th>
                    <Th>Type</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {attributes.map((_: Attribute, index: number) => (
                    <AttrRow
                      key={index}
                      {...{
                        attributes, setValue, index,
                      }}
                    />
                  ))}
                </Tbody>
              </Table>
            )}
          </Stack>
        </FormControl>
      </ListItem>
    </UnorderedList>
  )
}

export default NFTForm