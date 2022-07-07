import { Textarea } from '@chakra-ui/react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

export const JSONForm: React.FC<{
  register: UseFormRegister<FieldValues>
}> = ({
  register
}) => (
   <Textarea
    placeholder="Enter JSON5 token metadata…"
    h="75vh"
    {...register('json5')}
   >
   </Textarea>
)

export default JSONForm