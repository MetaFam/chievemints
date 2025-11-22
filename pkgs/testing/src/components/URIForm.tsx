import React from 'react'
import type {
  FieldValues, UseFormRegister,
} from 'react-hook-form'
import '../styles/URIForm.css'

export const URIForm: React.FC<{
  register: UseFormRegister<FieldValues>
}> = ({ register }) => {
  return (
    <input
      placeholder="Enter a URI for the token…"
      {...register('uri')}
    />
  )
}
