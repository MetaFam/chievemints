import { capitalize, switchTo } from '@/lib/helpers'
import { NETWORKS } from '@/lib/networks'
import React, {
  ButtonHTMLAttributes,
  HTMLProps, MouseEvent, useCallback, useMemo, useState,
} from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useConfig } from '@/config'
import { PacmanLoader } from 'react-spinners'
import '../styles/SubmitButton.css'

export const SubmitButton: React.FC<{
  purpose?: string
  processing?: boolean
  label?: string
  requireStorage?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  purpose = 'create',
  processing = false,
  // onClick,
  requireStorage,
  label = `${capitalize(purpose)} NFT`,
  ...props
}) => {
  const {
    chain, userProvider, connect, rwContract,
  } = useWeb3()
  const offChain = useMemo(
    () => chain !== NETWORKS.contract.chainId,
    [chain],
  )
  const [working, setWorking] = useState(processing)
  const desiredNetwork = (
    offChain ? NETWORKS.contract.name : null
  )
  const { storage } = useConfig({ requireStorage })

  const onClick = useCallback(async (evt: MouseEvent<HTMLButtonElement>) => {
    try {
      setWorking(true)

      if(!userProvider) {
        evt.preventDefault()
        connect()
      } else if(offChain) {
        evt.preventDefault()
        switchTo(NETWORKS.contract.chainId)
      } else if(!storage && requireStorage) {
        // openSettings()
      } else {
        // onClick?.apply(null, [evt])
      }
    } finally {
      setWorking(false)
    }
  }, [connect, offChain, requireStorage, storage, userProvider])

  return <>
    <button {...{ onClick, ...props }}>
      {(() => {
        if(processing || working) {
          return (
            <>
              <PacmanLoader color="#BB2244"/>
              <p>{capitalize(purpose).replace(/e$/, '')}ing…</p>
            </>
          )
        } else if(!userProvider) {
          return `Connect To ${capitalize(purpose)}`
        } else if(offChain) {
          return `Connect To The ${desiredNetwork} Network To ${capitalize(purpose)}`
        } else if(!rwContract) {
          return 'Contract Not Connected'
        } else if(requireStorage && !storage) {
          return <>
            Missing
            <a target="_blank" rel="noreferrer" href="//nft.storage">
              NFT.Storage
            </a>
            Token
          </>
        } else {
          return label
        }
      })()}
    </button>
  </>
}
