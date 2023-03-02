import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import JSON5 from 'json5'
import { ERC1155Metadata } from '@/lib/types'

export const JSONForm: React.FC<{
  register: UseFormRegister<FieldValues>
  metadata: ERC1155Metadata
}> = ({
  register, metadata
}) => (
   <textarea
    placeholder="Enter JSON5 token metadata…"
    {...register('json5')}
   >
    {JSON5.stringify(metadata)}
   </textarea>
)

export default JSONForm