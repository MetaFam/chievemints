import { useWeb3 } from '@/lib/hooks'
import { Maybe } from '@/lib/types'
import React, {
  ChangeEvent, FormEvent, useCallback, useEffect, useState
} from 'react'
import { SubmitButton } from './SubmitButton'
import { ButtonProps } from '@chakra-ui/react'
import { extractMessage } from '@/lib/helpers'

export const MaxForm = (
  { tokenId, purpose = 'create', perUser = false, ...props }:
  ButtonProps & {
    tokenId?: string
    perUser?: boolean
    purpose: string
  }
) => {
  const [max, setMax] = useState<Maybe<string>>(null)
  const [processing, setProcessing] = useState(false)
  const { roContract, rwContract } = useWeb3()
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      if(roContract && tokenId) {
        if(perUser){
          setMax(await roContract.getPerUserMax(BigInt(tokenId)))
        }else{
          setMax(await roContract.getMax(BigInt(tokenId)))
        }
      }
    }
    load()
  }, [tokenId, roContract])
  
  const save = useCallback(async (evt: FormEvent) => {
    evt.preventDefault()

    if (!rwContract) {
      throw new Error('`rwContract` is not defined')
    }
    try {
      setProcessing(true)
      let tx
      if (perUser){
        tx = await rwContract.setPerUserMax(tokenId, max)
      }else{
        tx = await rwContract.setMax(tokenId, max)
      }
        await tx.wait()
    } catch(error) {
      toast({
        title: 'Contract Error',
        description: extractMessage(error),
        status: 'error',
        isClosable: true,
        duration: 10000
      })
    } finally {
      setProcessing(false)
    }
  }, [max, rwContract, toast, tokenId])

  return (
    <Flex 
      as="form"
      onSubmit={save}
      alignItems="flex-end"
    >
      <FormControl display="flex" w="auto" alignItems="baseline" mt={3}>
        <FormLabel whiteSpace="pre" _after={{ content: '":"' }}>
          {perUser && 'Per User'} Maximum Mintable
        </FormLabel>
        {max == null ? (
          <Flex>
            <Spinner/>
            <Text ml={3}>Loading…</Text>
          </Flex>
        ) : (
          <Input
            type="number"
            mx={{ base: 0, md: 4 }}
            w={32}
            textAlign="center"
            value={max}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
              setMax(value.trim().replace(/^0+([^0])/, '$1'))
            }}
          />
        )}  
      </FormControl>
      <SubmitButton
        label={`Set ${perUser ? 'Per User': ''} Max`}
        disabled={!/^-?\d+$/.test(max)}
        requireStorage={false}
        {...{ purpose, processing, ...props }}
      />
    </Flex>
)
}