import React from 'react';
import { ERC1155Metadata, Maybe } from '@/lib/types';
export declare const OptionsForm: React.FC<{
    purpose?: 'create' | 'update';
    tokenId?: string;
    metadata?: Maybe<ERC1155Metadata>;
    metaURI?: string;
}>;
export default OptionsForm;
