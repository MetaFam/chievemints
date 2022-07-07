export type Maybe<T> = T | null
export type Values<T> = T[keyof T]
export type Optional<T> = T | undefined

export type OpenSeaAttribute = {
  trait_type?: string
  value?: string | number
  display_type?: string
}

export type Attribute = {
  name?: string
  value?: string | number
  type?: string
}

export type ERC1155Metadata = {
  name?: string
  description?: string
  decimals?: number
  attributes?: Array<Attribute>
  properties?: { wearables?: Record<string, string> }
  external_url?: string
  image?: string
  animation_url?: string
  background_color?: string

} & {
  [key: string]: string | number
}

export type CodedError = Error & { code: number }

export type TokenState = {
  id: string
  hide: boolean
  index: number 
  uri?: string
  metadata?: ERC1155Metadata
  total?: number
  error?: string
}

export type MetaMaskError = Error & {
  data: {
    code: number
    data: string
    message: string
  }
}

export type NestedError = {
  error: Error
}

export type NamedString = {
  name: string
  content: string
}

export type Fileish = (
  File | string | NamedString
)

export type FileListish = (
  Fileish | Array<File | string>
)

export type FormValues = {
  name?: string
  description?: string
  homepage?: string
  images?: FileListish
  color?: string
  animation?: Fileish
  attributes?: Array<Attribute>
  uri?: string
  json5?: string
  maximum?: number
}