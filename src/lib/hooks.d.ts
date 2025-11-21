import { Abi } from 'viem';
import 'viem/window';
import type { Maybe } from '@/lib/types';
import React, { ReactNode } from 'react';
export type ContractInterface = ((functionName: string, args?: Array<unknown>) => (Promise<unknown>));
export type Web3ContextType = {
    ensClient?: any;
    contractClient?: any;
    walletClient?: any;
    roContract?: ContractInterface;
    bitsLibrary?: ContractInterface;
    rolesLibrary?: ContractInterface;
    rwContract?: ContractInterface;
    address?: string;
    chainId?: number;
    connect: () => Promise<void>;
    disconnect: () => void;
    connecting: boolean;
    connected: boolean;
    contract: {
        address: Maybe<string>;
        abi: Maybe<Abi>;
    };
};
export declare const Web3Context: React.Context<Web3ContextType>;
export declare const useWeb3: () => Web3ContextType;
export declare const Web3ContextProvider: React.FC<{
    children: ReactNode;
}>;
