import React, { useState } from 'react';
export const ModelModal = ({ isOpen, onClose, setWearables, }) => {
    const [type, setType] = useState('model/gltf-binary');
    const [specifiedType, setSpecifiedType] = useState('');
    const addModel = (type, file) => {
        setWearables((ws) => {
            if (!ws[type] || window.confirm(`¿Replace ${type}?`)) {
                return { ...ws, [type]: file };
            }
            else {
                return ws;
            }
        });
    };
    return (React.createElement("dialog", { isOpen, onClose },
        React.createElement("form", { onSubmit: (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
                addModel(type !== 'other' ? type : specifiedType, evt.target['file'].files[0]);
                onClose();
            } },
            React.createElement("header", null,
                React.createElement("h2", null, "Add Model"),
                React.createElement("button", null, "\u274C")),
            React.createElement("main", null,
                React.createElement("fieldset", { id: "mimetype" },
                    React.createElement("label", null,
                        React.createElement("h3", null, "Model Type"),
                        React.createElement("select", { value: type, onChange: ({ target: { value } }) => setType(value) },
                            React.createElement("optgroup", { style: { padding: 0 } },
                                React.createElement("option", { value: "model/gltf-binary" }, "Binary glTF"),
                                React.createElement("option", { value: "model/gltf+json" }, "glTF"),
                                React.createElement("option", { value: "model/fbx" }, "FBX"),
                                React.createElement("option", { value: "application/x-blender" }, "Blender"),
                                React.createElement("option", { value: "model/vox" }, "VOX"),
                                React.createElement("option", { value: "model/vrm" }, "VRM")),
                            React.createElement("optgroup", null,
                                React.createElement("option", { value: "other" }, "Other")))),
                    type === 'other' && (React.createElement("input", { placeholder: "Mime Type", required: true, value: specifiedType, onChange: ({ target: { value } }) => (setSpecifiedType(value)) }))),
                React.createElement("fieldset", { id: "model" },
                    React.createElement("label", null,
                        React.createElement("h3", null, "Model File:"),
                        React.createElement("input", { id: "file", required: true, type: "file" })))),
            React.createElement("footer", null,
                React.createElement("button", { onClick: onClose }, "Cancel"),
                React.createElement("button", null, "Add")))));
};
export default ModelModal;
//# sourceMappingURL=ModelModal.js.map