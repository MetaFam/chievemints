import type { TokenState } from '@/lib/types';
import React from 'react';
import '../styles/TokensTable.css';
declare module 'csstype' {
    interface Properties {
        '--img-bg'?: string;
    }
}
export declare const TokensTable: React.FC<{
    tokens: Array<TokenState | Error>;
}>;
export default TokensTable;
