import { NFTStorage } from 'nft.storage';
import React from 'react';
import { Maybe } from './lib/types';
export declare const contractNetwork: string;
export declare const ipfsLinkPattern: string;
export declare const nftGraph: string;
export declare const nftBase: string;
export declare const envNFTStorageAPIToken: string;
export declare const rolePermissions: {
    Superuser: string;
    Minter: string;
    Caster: string;
    Transferer: string;
    Configurer: string;
    Maintainer: string;
    Creator: string;
    Limiter: string;
    Burner: string;
    Destroyer: string;
    Oracle: string;
};
export declare const tokenPermissions: string[];
export declare const defaults: {
    limit: number;
    offset: number;
    gating: boolean;
    visible: string;
};
export declare const Settings: React.ForwardRefExoticComponent<{
    nftStorageAPIToken?: string;
    setNFTStorageAPIToken?: (token: Maybe<string>) => void;
} & React.RefAttributes<HTMLDialogElement>>;
export declare const useConfig: ({ requireStorage }?: {
    requireStorage?: boolean;
}) => {
    storage: NFTStorage;
    openSettings: () => void;
    Settings: React.FC<{}>;
};
