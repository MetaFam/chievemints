import React, { useEffect } from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import JSON5 from 'json5'
import { ERC1155Metadata } from '@/lib/types'
import '../styles/JSONForm.css'

export const JSONForm: React.FC<{
  register: UseFormRegister<FieldValues>
  metadata: ERC1155Metadata
  setValue: (name: string, value: string) => void
}> = ({
  register, metadata, setValue
}) => {
  useEffect(() => {
    setValue('json5', JSON5.stringify(metadata, null, 2))
  }, [metadata, setValue])

  return (
    <textarea
      placeholder="Enter JSON5 token metadata…"
      {...register('json5')}
    />
  )
}

export default JSONForm