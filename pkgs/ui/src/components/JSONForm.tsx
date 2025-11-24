import React, { useEffect } from 'react'
import type {
  FieldValues, UseFormRegister, UseFormSetValue,
} from 'react-hook-form'
import JSON5 from 'json5'
import { HashLoader } from 'react-spinners'
import type { ERC1155Metadata, Maybe } from '#types'
import jf from '../styles/JSONForm.module.css'

export const JSONForm: React.FC<{
  register: UseFormRegister<FieldValues>
  metadata: Maybe<ERC1155Metadata>
  setValue: UseFormSetValue<FieldValues>
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