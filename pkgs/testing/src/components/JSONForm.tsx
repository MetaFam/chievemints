import React, { useEffect } from 'react'
import type {
  FieldValues, UseFormRegister,
} from 'react-hook-form'
import JSON5 from 'json5'
import { HashLoader } from 'react-spinners'
import { type ERC1155Metadata } from '#types'
import jf from '../styles/JSONForm.module.css'

export const JSONForm: React.FC<{
  register: UseFormRegister<FieldValues>
  metadata: ERC1155Metadata
  setValue: (name: string, value: string) => void
}> = ({
  register, metadata, setValue
}) => {
  useEffect(() => {
    if(metadata) {
      setValue('json5', JSON5.stringify(metadata, null, 2))
    }
  }, [metadata, setValue])

  return (
    metadata == null ? (
      <section id={jf.loading}>
        <HashLoader color="#EB6300"/>
        <p>Fetching metadata…</p>
      </section>
    ) : (
      <textarea
        placeholder="Enter JSON5 token metadata…"
        {...register('json5')}
      />
    )
  )
}

export default JSONForm