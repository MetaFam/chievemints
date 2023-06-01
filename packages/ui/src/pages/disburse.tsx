import React, {
  ChangeEvent, FormEvent, ReactNode, useCallback,
  useEffect, useMemo, useState,
} from 'react'
import { capitalize, deregexify, extractMessage, httpURL, regexify } from '@/lib/helpers'
import { Maybe, ERC1155Metadata, Optional } from '@/lib/types'
import { useWeb3 } from '@/lib/hooks'
import { HomeLink } from '@/components'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ClockLoader, ScaleLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import ds from '../styles/disburse.module.css'

const Address: React.FC<{ name: string }> = ({ name }) => {
  const { ensProvider } = useWeb3()
  const isAddress = useMemo(
    () => /^0x[a-z0-9]{40}$/i.test(name),
    [name],
  )
  const [address, setAddress] = useState<Optional<Maybe<string>>>(
    isAddress ? undefined : null
  )
  useMemo(
    () => {
      if (!isAddress) {
        const resolve = async () => {
          const resolved = await ensProvider?.resolveName(name)
          setAddress(resolved ?? 'Not Found')
        }
        resolve()
      }
    },
    [isAddress, ensProvider, name],
  )

  return (
    <>
      <p>
        {name}{' '}
        {address != null && (
          <em>({address})</em>
        )}
      </p>
      {address === null && <ScaleLoader color="#22BB99" />}
    </>
  )
}

const split = (raw: string) => (
  raw.split(/\s*[\s,;:/\\|]+\s*/)
    .filter((str: string) => str && str !== '')
)

const Disburse = () => {
  const { nftId } = useParams()
  const tokenId = useMemo(() => (
    deregexify(Array.isArray(nftId) ? nftId[0] : nftId)
  ), [nftId])
  const [balance, setBalance] = useState<number>()
  const [metadata, setMetadata] = (
    useState<Maybe<ERC1155Metadata>>()
  )
  const [error, setError] = useState<string>()
  const [raw, setRaw] = useState('')
  const [action, setAction] = useState('mint')
  const {
    ensProvider, address, roContract, rwContract, connect,
  } = useWeb3()
  const [addresses, setAddresses] = useState<Array<string | ReactNode>>([])

  useEffect(() => {
    const parse = async () => {
      setAddresses(
        split(raw)
          .map((name: string, idx: number) => (
            <Address key={idx} {...{ name }} />
          ))
      )
    }

    parse()
  }, [ensProvider, raw])

  const name = useMemo(
    () => metadata?.name ?? `#${tokenId}`,
    [metadata, tokenId],
  )

  useEffect(() => {
    const getBalance = async () => {
      if (roContract && address && tokenId) {
        try {
          setBalance(Number(
            (await roContract.balanceOf(address, tokenId)).toString()
          ))
        } catch (err) {
          setError((err as Error).message)
        }
      }
    }

    getBalance()
  }, [address, roContract, tokenId])

  useEffect(
    () => {
      const getMetadata = async () => {
        if (roContract && tokenId) {
          try {
            const meta = await roContract.uri(tokenId)
            if (!meta) {
              setMetadata(null)
            } else {
              const response = await fetch(httpURL(meta)!)
              setMetadata(await response.json())
            }
          } catch (err) {
            setError((err as Error).message)
          }
        }
      }

      getMetadata()
    },
    [roContract, tokenId],
  )

  const submit = useCallback(async (evt: FormEvent) => {
    evt.preventDefault()

    if (!rwContract) {
      return toast('Token is not Connected.')
    }
    try {
      const addrs = await Promise.all(
        split(raw)
          .map(async (name: string) => {
            const response = await ensProvider?.resolveName(name)
            if (!response) {
              throw new Error(`Couldn't Resolve Name: “${name}”`)
            }
            return response
          })
      )
      switch (action) {
        case 'mint': {
          const tx = await rwContract?.['mint(address[],uint256,bytes)'](
            addrs, tokenId, []
          )
          await tx.wait()
          break
        }
        case 'whitelist': {
          console.debug('whitelist', { addrs })
          addrs.map(async (addr) => {
            const minterRole = await roContract?.roleIndexForName('Minter')
            const tx = await rwContract?.['mint(address,uint256,uint256,bytes)'](
              addr, tokenId, 1, []
            )
          })
          break
        }
      }
    } catch (err) {
      toast(extractMessage(err))
    }
  }, [action, ensProvider, raw, roContract, rwContract, tokenId])

  if (error) {
    return (
      <div>
        {/* <AlertIcon /> */}
        <h2>Error: Loading NFT</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <main id={ds.mint}>
      <Helmet>
        <title>Mint NFT #{regexify(tokenId)                   }</title>
        <meta name="description" content="Mint A ’Chievemint NFT" />
      </Helmet>

      <HomeLink />

      <form onSubmit={submit}>
        {(() => {
          if (metadata === null) {
            return <p>Token {name} does not exist.</p>
          } else if (!address) {
            return (
              <p>
                Connect your wallet to distribute “{name}” tokens…
              </p>
            )
          } else if (balance == null) {
            return (
              <div>
                <ClockLoader color="#36d7b7" />
                <p>Loading Balance…</p>
              </div>
            )
          } else {
            return <h1>Mint up to {balance} “{name}” tokens:</h1>
          }
        })()}
        <Tabs>
          <TabList>
            <Tab><span title="Comma-Separated Values">
              CSV
            </span></Tab>
            <Tab>Parsed</Tab>
          </TabList>
          <TabPanel>
            <label>Comma, Space, or Semicolon Separated ETH or ENS Addresses:</label>
            <textarea
              placeholder="Enter space, semicolon, or comma separated eth addresses."
              value={raw}
              onChange={
                ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
                  setRaw(value)
                }
              }
            />
          </TabPanel>
          <TabPanel>
            <ol>
              {addresses.map((addr, idx) => (
                <li key={idx}>{addr}</li>
              ))}
            </ol>
          </TabPanel>
        </Tabs>
        <section className={ds.actions}>
          <label>
            <span>Mint</span>
            <input type="radio" name="op" value="mint" checked/>
          </label>
          <label>
            <span className="strike">Whitelist</span>
            <input type="radio" name="op" value="whitelist" disabled/>
          </label>
        </section>
        {/*
        <label>
          <span>Skip existing holders</span>
          <input type="checkbox" name="skip" value="true"/>
        </label>
        */}
        <section className="action">
          {!rwContract ? (
            <button type="button" onClick={connect} className="full">
              Connect
            </button>
          ) : (
            <button className="full">Mint</button>
          )}
        </section>
      </form>
    </main>
  )
}

export default Disburse