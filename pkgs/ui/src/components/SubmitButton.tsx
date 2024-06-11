import { PacmanLoader } from 'react-spinners'
import { capitalize, useSwitchTo } from '@/lib/helpers'
import { NETWORKS } from '@/lib/networks'
import React, {
  ButtonHTMLAttributes,
  HTMLProps, MouseEvent, useCallback, useMemo, useState,
} from 'react'
import { useWeb3 } from '@/lib/hooks'
import { useConfig } from '@/config'
import tyl from '../styles/SubmitButton.module.css'

export const SubmitButton: React.FC<{
  purpose?: string
  processing?: boolean
  label?: string
  requireStorage?: boolean
  short?: boolean
  openSettings?: () => void
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  purpose = 'create',
  processing = false,
  short = false,
  // onClick,
  requireStorage = true,
  label = `${capitalize(purpose)} NFT`,
  openSettings,
  className = null,
  ...props
}) => {
  const {
    address, chainId, connect, rwContract,
  } = useWeb3()
  const offChain = useMemo(
    () => chainId !== NETWORKS.contract.chainId,
    [chainId],
  )
  const [working, setWorking] = useState(processing)
  const desiredNetwork = (
    offChain ? NETWORKS.contract.name : null
  )
  const { storage } = useConfig({ requireStorage })
  const switchTo = useSwitchTo()

  const onClick = useCallback(async (evt: MouseEvent<HTMLButtonElement>) => {
    try {
      setWorking(true)

      console.debug({ rwContract })

      if(!address) {
        evt.preventDefault()
        connect()
      } else if(offChain) {
        evt.preventDefault()
        switchTo(NETWORKS.contract.chainId)
      } else if(!storage && requireStorage) {
        evt.preventDefault()
        openSettings()
      } else {
        // onClick?.apply(null, [evt])
      }
    } finally {
      setWorking(false)
    }
  }, [
    address,
    connect,
    offChain,
    openSettings,
    requireStorage,
    rwContract,
    storage,
    switchTo,
  ])

  return <>
    <button
      className={
        [className, tyl.button].filter((e) => !!e).join(' ')
      }
      {...{ onClick, ...props }}
    >
      {(() => {
        if(processing || working) {
          return (
            <>
              <PacmanLoader color="#BB2244"/>
              <p>{capitalize(purpose).replace(/e$/, '')}ing…</p>
            </>
          )
        } else if(!address) {
          return `Connect To ${capitalize(purpose)}`
        } else if(offChain) {
          return `Connect To ${
            !short ? 'The ' : ''
          }${desiredNetwork}${
            !short ? ` Network To ${capitalize(purpose)}` : ''
          }`
        } else if(!rwContract) {
          return 'Contract Not Connected'
        } else if(requireStorage && !storage) {
          return <>
            Missing{' '}
            <a target="_blank" rel="noreferrer" href="//nft.storage">
              NFT.Storage
            </a>
            {' '}Token
          </>
        } else {
          return label
        }
      })()}
    </button>
  </>
}
