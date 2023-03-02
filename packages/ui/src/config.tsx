import { NFTStorage } from 'nft.storage'
import React, { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Maybe } from './lib/types'

declare const CHAIN_NAME: string
declare const IPFS_LINK_PATTERN: string
declare const NFT_STORAGE_API_TOKEN: string
declare const NFT_GRAPH: string
declare const NFT_BASE: string

export const contractNetwork = (
  (
    (typeof CHAIN_NAME !== 'undefined') ? (
      CHAIN_NAME
    ) : (
      'polygon'
    )
  )
)

export const ipfsLinkPattern = (
    (
    (typeof IPFS_LINK_PATTERN !== 'undefined') ? (
      IPFS_LINK_PATTERN
    ) : (
      'https://nftstorage.link/{protocol}/{v1cid}/{path}'
    )
  )
)

export const nftGraph = (
  (
    (typeof NFT_GRAPH !== 'undefined') ? (
      NFT_GRAPH
    ) : (
      'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
    )
  )
)

export const nftBase = (
  (
    (typeof NFT_BASE !== 'undefined') ? (
      NFT_BASE
    ) : (
      'https://chiev.es/#/view'
    )
  )
)

export const rolePermissions = {
  Superuser: 'Can perform all actions on the token.',
  Minter: 'Can mint new instances of the token.',
  Caster: 'Can assign roles for the token.',
  Transferer: 'Can transfer the token to another account.',
  Configurer: 'Can change the token’s metadata URI.',
  Maintainer: 'Can update the token contract.',
  Creator: 'Can create new token types.',
  Limiter: 'Can set the maximum mintable allowance for a token.',
  Burner: 'Can destroy an instance of a token.',
  Destroyer: 'Can destroy a token type.',
  Oracle: 'Provides information about the off-chain world.',
}

export const tokenPermissions = [
  'Superuser', 'Minter', 'Caster', 'Transferer',
  'Configurer', 'Limiter', 'Burner', 'Destroyer',
]

export const defaults = {
  limit: 10,
  offset: 0,
  gating: false,
  visible: '',
}

export const useConfig = ({ requireStorage = false } = {}) => {
  const store = localStorage
  const [nftStorageAPIToken, baseSetNFTStorageAPIToken] = (
    useState(
      store.getItem('chievemints-nftStorageAPIToken')
      ?? (typeof NFT_STORAGE_API_TOKEN !== 'undefined' ? (
        NFT_STORAGE_API_TOKEN
      ) : (
        null
      ))
    )
  )
  const setNFTStorageAPIToken = useCallback(
    (token: Maybe<string>) => {
      store.setItem('chievemints-nftStorageAPIToken', token)
      baseSetNFTStorageAPIToken(token)
    },
    [store],
  )
  const [
    internalNFTStorageAPIToken,
    internalSetNFTStorageAPIToken
  ] = (
    useState(nftStorageAPIToken)
  )
  const storage = useMemo(() => (
    nftStorageAPIToken ? (
      new NFTStorage({ token: nftStorageAPIToken })
    ) : (
      null
    )
  ), [nftStorageAPIToken])

  const Settings: React.FC<{ highlight: Array<string> }> = (
    useCallback(() => (
      <dialog>
        <header>
          <h2>Settings</h2>
        </header>
        <main>
          <form>
            <label>
              <Link target="_blank" to="//nft.storage">
                NFT.Storage
              </Link>
              API Token {requireStorage}
              <span>*</span>
            </label>
            <input
              placeholder="Required Token"
              type="password"
              value={internalNFTStorageAPIToken}
              onChange={({ target: { value } }) => {
                internalSetNFTStorageAPIToken(value)
              }}
            />
          </form>
        </main>
        <footer>
          <div>
              <button>
                Cancel
              </button>
              <button
                onClick={() => {
                  setNFTStorageAPIToken(
                    internalNFTStorageAPIToken
                  )
                }}
              >
                Save
              </button>
            </div>
        </footer>
      </dialog>
    ), [internalNFTStorageAPIToken, requireStorage, setNFTStorageAPIToken])
  )

  const settings = useMemo(() => ({
    Settings,
    storage,
  }), [Settings, storage])

  return settings
}