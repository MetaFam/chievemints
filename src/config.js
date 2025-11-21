import { NFTStorage } from 'nft.storage';
import React, { useCallback, useMemo, useRef, useState, forwardRef, } from 'react';
import tyl from './styles/config.module.css';
export const contractNetwork = ((() => {
    switch (window.location.host) {
        case 'op.chiev.es': {
            return 'optimisticEthereum';
        }
        case 'poly.chiev.es': {
            return 'polygon';
        }
        default: {
            if (typeof CHAIN_NAME !== 'undefined') {
                return CHAIN_NAME;
            }
            return 'polygon';
        }
    }
})());
export const ipfsLinkPattern = ((typeof IPFS_LINK_PATTERN !== 'undefined') ? (IPFS_LINK_PATTERN) : ('https://nftstorage.link/{protocol}/{v1cid}/{path}'));
export const nftGraph = ((typeof NFT_GRAPH !== 'undefined') ? (NFT_GRAPH) : ('https://api.thegraph.com/subgraphs/name/alberthaotan/nft-matic'));
export const nftBase = ((typeof NFT_BASE !== 'undefined') ? (NFT_BASE) : (`https://${window.location.host}/#/view`));
export const envNFTStorageAPIToken = ((typeof NFT_STORAGE_API_TOKEN !== 'undefined') ? (NFT_STORAGE_API_TOKEN) : (null));
export const walletConnectProjectId = ((typeof WALLET_CONNECT_PROJECT_ID !== 'undefined') ? (WALLET_CONNECT_PROJECT_ID) : (null));
export const rolePermissions = {
    Superuser: 'Can perform all actions on the token.',
    Minter: 'Can mint new instances of the token.',
    Caster: 'Can assign roles for the token.',
    Transferer: 'Can transfer the token to another account.',
    Configurer: 'Can change the token’s metadata URI.',
    Maintainer: 'Can update the token contract.',
    Creator: 'Can create new token types.',
    Limiter: 'Can set the maximum mintable allowance for a token.',
    Burner: 'Can destroy an instance of a token.',
    Destroyer: 'Can destroy a token type.',
    Oracle: 'Provides information about the off-chain world.',
};
export const tokenPermissions = [
    'Superuser', 'Minter', 'Caster', 'Transferer',
    'Configurer', 'Limiter', 'Burner', 'Destroyer',
];
export const defaults = {
    limit: 10,
    offset: 0,
    gating: false,
    visible: '',
};
export const Settings = forwardRef(({ nftStorageAPIToken: apiToken, setNFTStorageAPIToken: setAPIToken, }, ref) => {
    const [internalAPIToken, setInternalAPIToken] = (useState(apiToken ?? ''));
    return (React.createElement("dialog", { ref, className: tyl.dialog },
        React.createElement("form", { onSubmit: () => {
                setAPIToken(internalAPIToken);
            } },
            React.createElement("header", null,
                React.createElement("h2", null, "Settings")),
            React.createElement("main", null,
                React.createElement("label", null,
                    React.createElement("h3", null,
                        React.createElement("a", { target: "_blank", href: "//nft.storage", rel: "noreferrer" }, "NFT.Storage"),
                        "API Token",
                        React.createElement("span", null, "*")),
                    React.createElement("input", { placeholder: "Required Token", type: "password", autoComplete: "off", value: internalAPIToken, onChange: ({ target: { value } }) => {
                            setInternalAPIToken(value);
                        } }))),
            React.createElement("footer", null,
                React.createElement("button", { formMethod: "dialog" }, "Cancel"),
                React.createElement("button", null, "Save")))));
});
Settings.displayName = 'Settings';
export const useConfig = ({ requireStorage = false } = {}) => {
    const host = window.location.host;
    const key = `chievemints-${host}-nftStorageAPIToken`;
    const store = localStorage;
    const [nftStorageAPIToken, baseSetNFTStorageAPIToken] = (useState(envNFTStorageAPIToken
        ?? store.getItem(key)
        ?? null));
    const setNFTStorageAPIToken = useCallback((token) => {
        store.setItem(key, token);
        baseSetNFTStorageAPIToken(token);
    }, [key, store]);
    const dialog = useRef(null);
    const storage = useMemo(() => {
        const token = nftStorageAPIToken;
        return token ? new NFTStorage({ token }) : null;
    }, [nftStorageAPIToken]);
    const openSettings = useCallback(() => {
        if (!dialog.current) {
            console.error({ openSettings: 'dialog.current is null' });
        }
        else {
            dialog.current.showModal();
        }
    }, [dialog]);
    const SettingsDialog = useCallback(() => (React.createElement(Settings, { ref: dialog, nftStorageAPIToken,
        setNFTStorageAPIToken })), [nftStorageAPIToken, setNFTStorageAPIToken]);
    return useMemo(() => ({
        storage,
        openSettings,
        Settings: SettingsDialog,
    }), [storage, openSettings, SettingsDialog]);
};
//# sourceMappingURL=config.js.map