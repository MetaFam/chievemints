import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import type { Maybe } from '@/lib/types';
import React, { ReactNode } from 'react';
export type Web3ContextType = {
    userProvider?: Web3Provider;
    ensProvider?: JsonRpcProvider;
    contractProvider?: JsonRpcProvider;
    roContract?: Contract;
    bitsLibrary?: Contract;
    rolesLibrary?: Contract;
    rwContract?: Contract;
    address?: string;
    chain?: number;
    connect: () => Promise<void>;
    disconnect: () => void;
    connecting: boolean;
    connected: boolean;
    contract: {
        address: Maybe<string>;
        abi: Maybe<Record<string, unknown>>;
    };
};
export declare const Web3Context: React.Context<Web3ContextType>;
export declare const useWeb3: () => Web3ContextType;
export declare const Web3ContextProvider: React.FC<{
    children: ReactNode;
}>;
