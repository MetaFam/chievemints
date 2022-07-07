import { Input, Stack } from '@chakra-ui/react'
import ReactNode from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export const URIForm: React.FC<{
  register: UseFormRegister<FieldValues>,
}> = ({
  register
}) => {
  return (
    <Input
      placeholder="Enter a URI for the token…"
      {...register('uri')}
    />
  )
}
