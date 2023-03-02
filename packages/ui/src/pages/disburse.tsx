import React, {
  ChangeEvent, FormEvent, ReactNode, useCallback,
  useEffect, useMemo, useState,
} from 'react'
import { capitalize, deregexify, extractMessage, httpURL } from '@/lib/helpers'
import { Maybe, ERC1155Metadata, Optional } from '@/lib/types'
import { useWeb3 } from '@/lib/hooks'
import { HomeLink } from '@/components'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

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
      if(!isAddress) {
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
      <Text>
        {name}
        {address != null && (
          <Text ml={2} as="em">({address})</Text>
        )}
      </Text>
      {address === null && <Spinner size="xs"/>}
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
  const [action, setAction] = useState('whitelist')
  const {
    ensProvider, address, roContract, rwContract, connect,
  } = useWeb3()
  const [addresses, setAddresses] = useState<Array<string | ReactNode>>([])
  const toast = useToast()

  useEffect(() => {
    const parse = async () => {
      setAddresses(
        split(raw)
        .map((name: string, idx: number) => (
          <Address key={idx} {...{ name }}/>
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
      if(roContract && address && tokenId) {
        try {
          setBalance(Number(
            (await roContract.balanceOf(address, tokenId)).toString()
          ))
        } catch(err) {
          setError((err as Error).message)
        }
      }
    }
    
    getBalance()
  }, [address, roContract, tokenId])
  
  useEffect(
    () => {
      const getMetadata = async () => {
        if(roContract && tokenId) {
          try {
            const meta = await roContract.uri(tokenId)
            if(!meta) {
              setMetadata(null)
            } else {
              const response = await fetch(httpURL(meta)!)
              setMetadata(await response.json())
            }
          } catch(err) {
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

    if(!rwContract) {
      toast({
        title: 'Contract Error!',
        description: 'Token is not Connected.',
        status: 'error',
        isClosable: true,
        duration: 10000
      })
      return
    }
    try {
      // const skip = evt.target.skip.checked
      const addrs = await Promise.all(
        split(raw)
        .map(async (name: string) => {
          const response = await ensProvider?.resolveName(name)
          if(!response) {
            throw new Error(`Couldn't Resolve Name: “${name}”`)
          }
          return response
        })
      )
      switch(action) {
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
    } catch(err) {
      toast({
        title: `${capitalize(action)}ing Error`,
        description: extractMessage(err),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    }
  }, [action, ensProvider, raw, roContract, rwContract, toast, tokenId])

  if(error) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error: Loading NFT</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Container maxW="40rem">
      <Helmet>
        <title>Disburse NFT #{tokenId}</title>
        <meta name="description" content="Distribute A ’Chievemint NFT" />
      </Helmet>

      <HomeLink/>

      <Stack as="form" onSubmit={submit}>
        {(() => {
          if(metadata === null) {
            return <Text my={8}>Token {name} does not exist.</Text>
          } else if(!address) {
            return (
              <Text my={8}>
                Connect your wallet to distribute “{name}” tokens…
              </Text>
            )
          } else if(balance == null) {
            return (
              <Flex my={8}>
                <Spinner/>
                <Text ml={2}>Loading Balance…</Text>
              </Flex>
            )
          } else {
            return <Text my={8}>Distribute up to {balance} “{name}” tokens:</Text>
          }
        })()}
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>CSV</Tab>
            <Tab>Parsed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl>
                <FormLabel>Comma, Space, or Semicolon Separated ETH or ENS Addresses:</FormLabel>
                <Textarea
                  height={64}
                  placeholder="Enter space, semicolon, or comma separated eth addresses."
                  value={raw}
                  onChange={
                    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
                      setRaw(value)
                    }
                  }
                />
              </FormControl>
            </TabPanel>
            <TabPanel>
              <OrderedList>
                {addresses.map((addr, idx) => (
                  <ListItem key={idx} justifyContent="center">
                    {addr}
                  </ListItem>
                ))}
              </OrderedList>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <FormControl>
          <RadioGroup onChange={setAction} value={action}>
            <Radio value="mint">Mint</Radio>
            <Radio value="whitelist" ml={5}>Whitelist</Radio>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <Checkbox name="skip" value="true">
            Skip existing holders
          </Checkbox>
        </FormControl>
        <FormControl textAlign="center">
          {!rwContract ? (
            <Button onClick={connect}>
              Connect
            </Button>
          ) : (
            <Button type="submit" colorScheme="green">Distribute</Button>
          )}
        </FormControl>
      </Stack>
    </Container>
  )
}

export default Disburse