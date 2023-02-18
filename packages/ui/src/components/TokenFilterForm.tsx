import { toSpanList } from '@/lib/helpers'
import { Limits } from '@/lib/types'
import {
  chakra, Button, Checkbox, Flex, FormControl,
  FormLabel, Input, Stack, type FlexProps, Text,
} from '@chakra-ui/react'
import React, {
  FormEventHandler, HTMLAttributes, SetStateAction, useEffect, useState,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useStyles } from '../lib/styles'

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
  visibleList: Array<number | Limits> 
} & HTMLAttributes<HTMLFormElement>> = ({
  limit = 10, setLimit, offset = 0, setOffset,
  gatingVisible = false, setGatingVisible,
  visibleList, setVisibleList, ...props
}) => {
  const {
    register, handleSubmit, control, setValue,
  } = useForm<FilterValues>()
  const ss = useStyles('TokenFilterForm')

  useEffect(() => {
    setValue('limit', limit)
    setValue('offset', offset)
    setValue('visible', visibleList.toString())
    setValue('gatingVisible', gatingVisible)
  }, [limit, offset, visibleList, gatingVisible, setValue])

  const submit = async (data: FilterValues) => {
    setLimit(Number(data.limit))
    setOffset(Number(data.offset))
    setGatingVisible(data.gatingVisible)
    setVisibleList(toSpanList(data.visible))
  }

  return (
    <form
      onSubmit={handleSubmit(submit) as FormEventHandler}
      className={ss.filter}
      {...props}
    >
      <section className={ss.flexCol}>
        <div className={ss.flex}>
          <fieldset>
            <legend>Limit</legend>
            <input
              type="number"
              placeholder="Number of tokens to display."
              {...register('limit')}
            />
          </fieldset>
          <fieldset>
            <legend>Offset</legend>
            <input
              type="number"
              placeholder="Size of the offset."
              {...register('offset')}
            />
          </fieldset>
        </div>
        <span className={ss.sep}>or</span>
        <fieldset className={ss.flex}>
          <legend>Visible&#xA0;List</legend>

          <input
            placeholder="Comma, space and dash separated list of indices."
            {...register('visible')}
          />
        </fieldset>
      </section>
      <section className={ss.gatingVisible}>
          <Controller
            {...{ control }}
            name="gatingVisible"
            defaultValue={gatingVisible}
            render={({ field: { onChange, value: checked, ref } }) => (
              <label className={ss('flex')}>
                <input
                  className={ss.grow0}
                  type="checkbox"
                  {...{ checked, onChange, ref }}
                />
                <span>View<br/>Permission<br/>Tokens</span>
              </label>
            )}
          />

        <button>View</button>
      </section>
    </form>
  )
}

export default TokenFilterForm
