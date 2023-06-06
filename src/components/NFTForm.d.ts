import { ERC1155Metadata, Maybe } from '@/lib/types';
import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
export declare const NFTForm: React.FC<{
    purpose?: 'create' | 'update';
    register: UseFormRegister<FieldValues>;
    watch: UseFormWatch<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    tokenId?: string;
    metadata?: Maybe<ERC1155Metadata>;
}>;
export default NFTForm;
