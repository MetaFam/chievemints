import React, { useCallback, useEffect, useMemo, useState, } from 'react';
import { deregexify, extractMessage, httpURL, regexify, } from '@/lib/helpers';
import { useWeb3 } from '@/lib/hooks';
import { HomeLink } from '@/components';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ClockLoader, ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { normalize } from 'viem/ens';
import tyl from '../styles/disburse.module.css';
import Tippy from '@tippyjs/react';
const Address = ({ name }) => {
    const { ensClient } = useWeb3();
    const isAddress = useMemo(() => /^0x[a-z0-9]{40}$/i.test(name), [name]);
    const [address, setAddress] = useState(isAddress ? undefined : null);
    useMemo(() => {
        if (!isAddress) {
            const resolve = async () => {
                const resolved = await ensClient.getEnsAddress({ name: normalize(name) });
                setAddress(resolved ?? 'Not Found');
            };
            resolve();
        }
    }, [isAddress, ensClient, name]);
    return (React.createElement(React.Fragment, null,
        React.createElement("p", null,
            name,
            ' ',
            address != null && (React.createElement("em", null,
                "(",
                address,
                ")"))),
        address === null && React.createElement(ScaleLoader, { color: "#22BB99" })));
};
const split = (raw) => (raw.split(/\s*[\s,;:/\\|]+\s*/)
    .filter((str) => str && str !== ''));
const Disburse = () => {
    const { nftId } = useParams();
    const tokenId = useMemo(() => (deregexify(Array.isArray(nftId) ? nftId[0] : nftId)), [nftId]);
    const [balance, setBalance] = useState();
    const [metadata, setMetadata] = (useState());
    const [error, setError] = useState();
    const [raw, setRaw] = useState('');
    const [action /* , setAction */] = useState('mint');
    const { ensClient, address, roContract, rwContract, connect, contractClient, } = useWeb3();
    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        const parse = async () => {
            setAddresses(split(raw)
                .map((name, idx) => (React.createElement(Address, { key: idx, name }))));
        };
        parse();
    }, [ensClient, raw]);
    const name = useMemo(() => metadata?.name ?? `#${tokenId}`, [metadata, tokenId]);
    useEffect(() => {
        const getBalance = async () => {
            if (roContract && address && tokenId) {
                try {
                    setBalance(Number((await roContract('balanceOf', [address, tokenId])).toString()));
                }
                catch (err) {
                    setError(err.message);
                }
            }
        };
        getBalance();
    }, [address, roContract, tokenId]);
    useEffect(() => {
        const getMetadata = async () => {
            if (roContract && tokenId) {
                try {
                    const meta = await roContract('uri', [tokenId]);
                    if (!meta) {
                        setMetadata(null);
                    }
                    else {
                        const response = await fetch(httpURL(meta));
                        setMetadata(await response.json());
                    }
                }
                catch (err) {
                    setError(err.message);
                }
            }
        };
        getMetadata();
    }, [roContract, tokenId]);
    const submit = useCallback(async (evt) => {
        evt.preventDefault();
        if (!rwContract) {
            return toast('Token is not Connected.');
        }
        try {
            const addrs = await Promise.all(split(raw)
                .map(async (name) => {
                let addr = name.trim();
                if (addr.includes('.')) {
                    addr = await ensClient.getEnsAddress({ name: normalize(name) });
                    if (!addr) {
                        throw new Error(`Couldn't Resolve Name: “${name}”`);
                    }
                }
                return addr;
            }));
            console.debug({ addrs });
            switch (action) {
                case 'mint': {
                    const hash = await rwContract('mint', [addrs, tokenId, '']);
                    await contractClient.waitForTransactionReceipt({ hash });
                    toast(`Minted ${addrs.length} token${addrs.length === 1 ? '' : 's'}.`);
                    break;
                }
                case 'whitelist': {
                    console.debug('whitelist', { addrs });
                    addrs.map(async (addr) => {
                        const minterRole = await roContract('roleIndexForName', ['Minter']);
                        await rwContract('mint', [addr, minterRole, 1]);
                    });
                    break;
                }
            }
        }
        catch (err) {
            toast(extractMessage(err));
            console.error({ err });
        }
    }, [
        action, contractClient, ensClient, raw, roContract, rwContract, tokenId
    ]);
    if (error) {
        return (React.createElement("div", null,
            React.createElement("h2", null, "Error: Loading NFT"),
            React.createElement("p", null, error)));
    }
    return (React.createElement("main", { id: tyl.mint },
        React.createElement(Helmet, null,
            React.createElement("title", null,
                "Mint NFT #",
                regexify(tokenId)),
            React.createElement("meta", { name: "description", content: "Mint A \u2019Chievemint NFT" })),
        React.createElement(HomeLink, null),
        React.createElement("form", { onSubmit: submit },
            (() => {
                if (metadata === null) {
                    return React.createElement("p", null,
                        "Token ",
                        name,
                        " does not exist.");
                }
                else if (!address) {
                    return (React.createElement("p", null,
                        "Connect your wallet to distribute \u201C",
                        name,
                        "\u201D tokens\u2026"));
                }
                else if (balance == null) {
                    return (React.createElement("div", null,
                        React.createElement(ClockLoader, { color: "#36d7b7" }),
                        React.createElement("p", null, "Loading Balance\u2026")));
                }
                else {
                    return (React.createElement(Tippy, { content: `As ${address}` },
                        React.createElement("h1", null,
                            "Mint up to ",
                            balance,
                            " \u201C",
                            name,
                            "\u201D tokens:")));
                }
            })(),
            React.createElement(Tabs, null,
                React.createElement(TabList, null,
                    React.createElement(Tab, null,
                        React.createElement("span", { title: "Comma-Separated Values" }, "CSV")),
                    React.createElement(Tab, null, "Parsed")),
                React.createElement(TabPanel, null,
                    React.createElement("label", null, "Comma, Space, or Semicolon Separated ETH or ENS Addresses:"),
                    React.createElement("textarea", { placeholder: "Enter space, semicolon, or comma separated eth addresses.", value: raw, onChange: ({ target: { value } }) => {
                            setRaw(value);
                        } })),
                React.createElement(TabPanel, null,
                    React.createElement("ol", null, addresses.map((addr, idx) => (React.createElement("li", { key: idx }, addr)))))),
            React.createElement("section", { className: tyl.actions },
                React.createElement("label", null,
                    React.createElement("span", null, "Mint"),
                    React.createElement("input", { type: "radio", name: "op", value: "mint", defaultChecked: true })),
                React.createElement("label", null,
                    React.createElement("span", { className: "strike" }, "Whitelist"),
                    React.createElement("input", { type: "radio", name: "op", value: "whitelist", disabled: true }))),
            React.createElement("section", { className: "action" }, !rwContract ? (React.createElement("button", { type: "button", onClick: connect, className: "full" }, "Connect")) : (React.createElement("button", { className: "full" }, "Mint"))))));
};
export default Disburse;
//# sourceMappingURL=disburse.js.map