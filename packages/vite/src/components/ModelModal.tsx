import {
  FormControl, FormLabel, Modal, ModalBody, ModalCloseButton,
  ModalContent, ModalHeader, ModalOverlay, Select, chakra,
  Input, ModalFooter, Button,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'

export type ModelModalProps = {
  isOpen: boolean
  onClose: () => void
  setWearables: (
    React.Dispatch<React.SetStateAction<
      Record<string, string>
    >>
  )
}

export const ModelModal: React.FC<ModelModalProps> = ({
  isOpen, onClose, setWearables,
}) => {
  const [type, setType] = useState('model/gltf-binary')
  const [specifiedType, setSpecifiedType] = useState('')
  const addModel = (type: string, file: string) => {
    setWearables((ws) => {
      if (!ws[type] || window.confirm(`¿Replace ${type}?`)) {
        return { ...ws, [type]: file }
      } else {
        return ws
      }
    })
  }

  return (
    <Modal {...{ isOpen, onClose }}>
      <ModalOverlay/>
      <ModalContent
        onSubmit={(evt: FormEvent) => {
          evt.preventDefault()
          evt.stopPropagation()
          addModel(
            type !== 'other' ? type : specifiedType,
            (evt.target as HTMLFormElement)['file'].files[0],
          )
          onClose()
        }}
        as="form"
      >
        <ModalHeader>Add Model</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <FormControl id="mimetype">
            <FormLabel>Model Type:</FormLabel>
            <Select
              ml={5} w="calc(100% - 2rem)"
              value={type}
              onChange={({ target: { value } }) => setType(value)}
            >
              <chakra.optgroup style={{ padding: 0 }}>
                <chakra.option value="model/gltf-binary">Binary glTF</chakra.option>
                <chakra.option value="model/gltf+json">glTF</chakra.option>
                <chakra.option value="model/fbx">FBX</chakra.option>
                <chakra.option value="application/x-blender">Blender</chakra.option>
                <chakra.option value="model/vox">VOX</chakra.option>
                <chakra.option value="model/vrm">VRM</chakra.option>
              </chakra.optgroup>
              <chakra.optgroup>
                <chakra.option value="other" fontStyle="italic">
                  Other
                </chakra.option>
              </chakra.optgroup>
            </Select>
            {type === 'other' && (
              <Input
                ml={5} mt={3} w="calc(100% - 2rem)" placeholder="Mime Type"
                required={true} value={specifiedType}
                onChange={({ target: { value } }) => (
                  setSpecifiedType(value)
                )}
              />
            )}
          </FormControl>
          <FormControl id="model" mt={5}>
            <FormLabel>Model File:</FormLabel>
            <Input
              id="file" required={true} type="file"
              ml={5} w="calc(100% - 2rem)" h="auto"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" ml={3} type="submit">
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModelModal