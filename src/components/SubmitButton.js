import { PacmanLoader } from 'react-spinners';
import { capitalize, useSwitchTo } from '@/lib/helpers';
import { NETWORKS } from '@/lib/networks';
import React, { useCallback, useMemo, useState, } from 'react';
import { useWeb3 } from '@/lib/hooks';
import { useConfig } from '@/config';
import tyl from '../styles/SubmitButton.module.css';
export const SubmitButton = ({ purpose = 'create', processing = false, short = false, 
// onClick,
requireStorage = true, label = `${capitalize(purpose)} NFT`, openSettings, className = null, ...props }) => {
    const { address, chainId, connect, rwContract, } = useWeb3();
    const offChain = useMemo(() => chainId !== NETWORKS.contract.chainId, [chainId]);
    const [working, setWorking] = useState(processing);
    const desiredNetwork = (offChain ? NETWORKS.contract.name : null);
    const { storage } = useConfig({ requireStorage });
    const switchTo = useSwitchTo();
    const onClick = useCallback(async (evt) => {
        try {
            setWorking(true);
            console.debug({ rwContract });
            if (!address) {
                evt.preventDefault();
                connect();
            }
            else if (offChain) {
                evt.preventDefault();
                switchTo(NETWORKS.contract.chainId);
            }
            else if (!storage && requireStorage) {
                evt.preventDefault();
                openSettings();
            }
            else {
                // onClick?.apply(null, [evt])
            }
        }
        finally {
            setWorking(false);
        }
    }, [
        address,
        connect,
        offChain,
        openSettings,
        requireStorage,
        rwContract,
        storage,
        switchTo,
    ]);
    return React.createElement(React.Fragment, null,
        React.createElement("button", { className: [className, tyl.button].filter((e) => !!e).join(' '), onClick, ...props }, (() => {
            if (processing || working) {
                return (React.createElement(React.Fragment, null,
                    React.createElement(PacmanLoader, { color: "#BB2244" }),
                    React.createElement("p", null,
                        capitalize(purpose).replace(/e$/, ''),
                        "ing\u2026")));
            }
            else if (!address) {
                return `Connect To ${capitalize(purpose)}`;
            }
            else if (offChain) {
                return `Connect To ${!short ? 'The ' : ''}${desiredNetwork}${!short ? ` Network To ${capitalize(purpose)}` : ''}`;
            }
            else if (!rwContract) {
                return 'Contract Not Connected';
            }
            else if (requireStorage && !storage) {
                return React.createElement(React.Fragment, null,
                    "Missing",
                    ' ',
                    React.createElement("a", { target: "_blank", rel: "noreferrer", href: "//nft.storage" }, "NFT.Storage"),
                    ' ',
                    "Token");
            }
            else {
                return label;
            }
        })()));
};
//# sourceMappingURL=SubmitButton.js.map