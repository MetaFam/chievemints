import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { ERC1155Metadata } from '@/lib/types';
export declare const JSONForm: React.FC<{
    register: UseFormRegister<FieldValues>;
    metadata: ERC1155Metadata;
    setValue: (name: string, value: string) => void;
}>;
export default JSONForm;
