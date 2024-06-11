import React, { FormEvent, useState } from 'react'

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
    <dialog {...{ isOpen, onClose }}>
      {/* <ModalOverlay/> */}
      <form
        onSubmit={(evt: FormEvent) => {
          evt.preventDefault()
          evt.stopPropagation()
          addModel(
            type !== 'other' ? type : specifiedType,
            (evt.target as HTMLFormElement)['file'].files[0],
          )
          onClose()
        }}
      >
        <header>
          <h2>Add Model</h2>
          <button>❌</button>
        </header>
        <main>
          <fieldset id="mimetype">
            <label>
              <h3>Model Type</h3>
              <select
                value={type}
                onChange={({ target: { value } }) => setType(value)}
              >
                <optgroup style={{ padding: 0 }}>
                  <option value="model/gltf-binary">Binary glTF</option>
                  <option value="model/gltf+json">glTF</option>
                  <option value="model/fbx">FBX</option>
                  <option value="application/x-blender">Blender</option>
                  <option value="model/vox">VOX</option>
                  <option value="model/vrm">VRM</option>
                </optgroup>
                <optgroup>
                  <option value="other">Other</option>
                </optgroup>
              </select>
            </label>
            {type === 'other' && (
              <input
                placeholder="Mime Type"
                required={true} value={specifiedType}
                onChange={({ target: { value } }) => (
                  setSpecifiedType(value)
                )}
              />
            )}
          </fieldset>
          <fieldset id="model">
            <label>
              <h3>Model File:</h3>
              <input
                id="file" required={true} type="file"
              />
            </label>
          </fieldset>
        </main>

        <footer>
          <button onClick={onClose}>Cancel</button>
          <button>Add</button>
        </footer>
      </form>
    </dialog>
  )
}

export default ModelModal