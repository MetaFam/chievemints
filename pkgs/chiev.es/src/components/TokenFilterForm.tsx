import { toSpanList } from '@/lib/helpers'
import { Limits } from '@/lib/types'
import React, {
  FormEventHandler, HTMLAttributes, SetStateAction, useEffect,
} from 'react'
import { Controller, useForm } from 'react-hook-form'
import tffs from '../styles/TokenFilterForm.module.css'

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
    <section>
      <form
        onSubmit={handleSubmit(submit) as FormEventHandler}
        id={tffs.form}
        {...props}
      >
        <fieldset>
          <legend>Offset</legend>
          <input
            type="number"
            placeholder="Size of the offset."
            {...register('offset')}
          />
        </fieldset>
        <fieldset>
          <legend>Limit</legend>
          <input
            type="number"
            placeholder="Number of tokens to display."
            {...register('limit')}
          />
        </fieldset>
        <span className="sep">or</span>
        <fieldset>
          <legend>Visible&#xA0;List</legend>

          <input
            placeholder="Comma, space and dash separated list of indices."
            {...register('visible')}
          />
        </fieldset>
        <Controller
          {...{ control }}
          name="gatingVisible"
          defaultValue={gatingVisible}
          render={({ field: { onChange, value: checked, ref } }) => (
            <label id="perms">
              <input
                type="checkbox"
                {...{ checked, onChange, ref }}
              />
              <span>Show Permission Tokens</span>
            </label>
          )}
        />

        <button>View</button>
      </form>
    </section>
  )
}

export default TokenFilterForm
