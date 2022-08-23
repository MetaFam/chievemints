import { toSpanList } from '@/lib/helpers'
import { Limits } from '@/lib/types'
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { SetStateAction, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export type FilterValues = {
  limit: number
  offset: number
  visible: string
  gatingVisible: boolean
}

export const TokenFilterForm: React.FC<{
  limit: number
  setLimit: (limit: SetStateAction<number>) => void
  offset: number
  setOffset: (offset: SetStateAction<number>) => void
  gatingVisible: boolean
  setGatingVisible: (gatingVisible: SetStateAction<boolean>) => void
  setVisibleList: (visible: SetStateAction<Array<number | Limits>>) => (
    void
  ) 
}> = ({
  limit = 10, setLimit, offset = 0, setOffset,
  gatingVisible = false, setGatingVisible,
  setVisibleList
}) => {
  const [visible, setVisible] = useState(null)
  const {
    register, handleSubmit, control, setValue,
  } = useForm<FilterValues>()
  const submit = async (data: FilterValues) => {
    setLimit(Number(data.limit))
    setOffset(Number(data.offset))
    setGatingVisible(data.gatingVisible)
    setVisible(data.visible)
    setVisibleList(toSpanList(data.visible))
  }

  useEffect(() => {
    setValue('limit', limit)
    setValue('offset', offset)
    setValue('visible', visible)
    setValue('gatingVisible', gatingVisible)
  }, [limit, offset, visible, gatingVisible, setValue])

  return (
    <Box
      as="form" onSubmit={handleSubmit(submit)}
      mt={10} mb="1rem" maxW={['100%', 'min(85vw, 50em)']}
      sx={{ a: { textDecoration: 'underline' } }}
    >
      <FormControl>
        <Flex align="center" my={1}>
          <FormLabel _after={{ content: '":"' }}>Limit</FormLabel>
          <Input
            type="number"
            placeholder="Number of tokens to display."
            {...register('limit')}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" my={1}>
          <FormLabel _after={{ content: '":"' }}>Offset</FormLabel>
          <Input
            type="number"
            placeholder="Number of tokens offset from Token 1."
            {...register('offset')}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" my={1} >
          <FormLabel _after={{ content: '":"' }}>Visible&#xA0;List</FormLabel>
          <Input
            placeholder="Comma, space and dash separated list of indices."
            {...register('visible')}
          />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex align="center" my={1}>
          <Controller
            control={control}
            name="gatingVisible"
            defaultValue={gatingVisible}
            render={({ field: { onChange, value, ref } }) => (
              <Checkbox
                onChange={onChange}
                ref={ref}
                isChecked={value}
              >
                View&#xA0;Permission&#xA0;Tokens
              </Checkbox>
            )}
          />
        </Flex>
      </FormControl>

      <Button type="submit">
        View
      </Button>
    </Box>
  )
}

export default TokenFilterForm
