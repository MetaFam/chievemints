import { NFTStorage } from 'nft.storage'
import React, {
  useCallback, useMemo, useRef, useState, forwardRef,
} from 'react'
import { Maybe } from './lib/types'
import tyl from './styles/config.module.css'

declare const CHAIN_NAME: string
declare const IPFS_LINK_PATTERN: string
declare const NFT_STORAGE_API_TOKEN: string
declare const NFT_GRAPH: string
declare const NFT_BASE: string
declare const WALLET_CONNECT_PROJECT_ID: string

export const contractNetwork = (
  (() => {
    switch(window.location.host) {
      case 'op.chiev.es': {
        return 'optimisticEthereum'
      }
      case 'poly.chiev.es': {
        return 'polygon'
      }
      default: {
        if(typeof CHAIN_NAME !== 'undefined') {
          return CHAIN_NAME
        }
        return 'polygon'
      }
    }
  })()
)

export const ipfsLinkPattern = (
  (typeof IPFS_LINK_PATTERN !== 'undefined') ? (
    IPFS_LINK_PATTERN
  ) : (
    'https://nftstorage.link/{protocol}/{v1cid}/{path}'
  )
)

export const nftGraph = (
  (typeof NFT_GRAPH !== 'undefined') ? (
    NFT_GRAPH
  ) : (
    'https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'
  )
)

export const nftBase = (
  (typeof NFT_BASE !== 'undefined') ? (
    NFT_BASE
  ) : (
    'https://chiev.es/#/view'
  )
)

export const envNFTStorageAPIToken = (
  (typeof NFT_STORAGE_API_TOKEN !== 'undefined') ? (
    NFT_STORAGE_API_TOKEN
  ) : (
    null
  )
)

export const walletConnectProjectId = (
  (typeof WALLET_CONNECT_PROJECT_ID !== 'undefined') ? (
    WALLET_CONNECT_PROJECT_ID
  ) : (
    null
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

export const Settings = forwardRef<
  HTMLDialogElement,
  {
    nftStorageAPIToken?: string
    setNFTStorageAPIToken?: (token: Maybe<string>) => void
  }
>(({
  nftStorageAPIToken: apiToken,
  setNFTStorageAPIToken: setAPIToken,
}, ref) => {
  const [internalAPIToken, setInternalAPIToken] = (
    useState(apiToken ?? '')
  )

  return (
    <dialog {...{ ref }} className={tyl.dialog}>
      <form
        onSubmit={() => {
          setAPIToken(internalAPIToken)
        }}
      >
        <header>
          <h2>Settings</h2>
        </header>
        <main>
          <label>
            <h3>
              <a
                target="_blank"
                href="//nft.storage"
                rel="noreferrer"
              >
                NFT.Storage
              </a>
              API Token
              <span>*</span>
            </h3>
            <input
              placeholder="Required Token"
              type="password"
              autoComplete="off"
              value={internalAPIToken}
              onChange={({ target: { value } }) => {
                setInternalAPIToken(value)
              }}
            />
          </label>
        </main>
        <footer>
          <button formMethod="dialog">Cancel</button>
          <button>Save</button>
        </footer>
      </form>
    </dialog>
  )
})
Settings.displayName = 'Settings'

export const useConfig = ({ requireStorage = false } = {}) => {
  const host = window.location.host
  const key = `chievemints-${host}-nftStorageAPIToken`
  const store = localStorage
  const [nftStorageAPIToken, baseSetNFTStorageAPIToken] = (
    useState(
      envNFTStorageAPIToken
      ?? store.getItem(key)
      ?? null
    )
  )
  const setNFTStorageAPIToken = useCallback(
    (token: Maybe<string>) => {
      store.setItem(key, token)
      baseSetNFTStorageAPIToken(token)
    },
    [key, store],
  )
  const dialog = useRef(null)
  const storage = useMemo(() => {
    const token = nftStorageAPIToken
    return token ? new NFTStorage({ token }) : null
  }, [nftStorageAPIToken])
  const openSettings = useCallback(() => {
    if(!dialog.current) {
      console.error({ openSettings: 'dialog.current is null' })
    } else {
      dialog.current.showModal()
    }
  }, [dialog])
  const SettingsDialog: React.FC = useCallback(
    () => (
      <Settings
        ref={dialog}
        {...{
          nftStorageAPIToken,
          setNFTStorageAPIToken
        }}
      />
    ), [nftStorageAPIToken, setNFTStorageAPIToken]
  )

  return useMemo(() => ({
    storage,
    openSettings,
    Settings: SettingsDialog,
  }), [storage, openSettings, SettingsDialog])
}