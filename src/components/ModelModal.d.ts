import React from 'react';
export type ModelModalProps = {
    isOpen: boolean;
    onClose: () => void;
    setWearables: (React.Dispatch<React.SetStateAction<Record<string, string>>>);
};
export declare const ModelModal: React.FC<ModelModalProps>;
export default ModelModal;
