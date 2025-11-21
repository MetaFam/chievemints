import React, { useState, useEffect, useCallback, useRef, } from 'react';
import { extractMessage, httpURL, toSpanList, } from '@/lib/helpers';
import { HiddenError, } from '@/lib/types';
import { Header, TokenFilterForm, TokensTable, } from '@/components';
import { useWeb3 } from '@/lib/hooks';
import { Helmet } from 'react-helmet';
import { ConnectKitButton } from 'connectkit';
import { useSearchParams, useNavigate, createSearchParams, } from 'react-router-dom';
import JSON5 from 'json5';
import Tippy from '@tippyjs/react';
import { defaults } from '@/config';
import tyl from '../styles/home.module.css';
const Home = () => {
    const [tokens, setTokens] = useState([]);
    const [query] = useSearchParams();
    const [limit, setLimit] = useState(Number(query.get('limit') ?? defaults.limit));
    const [offset, setOffset] = useState(Number(query.get('offset') ?? defaults.offset));
    const [gatingVisible, setGatingVisible] = (useState(query.get('gating') === 'true'));
    const visible = query.get('visible') ?? defaults.visible;
    const [visibleList, setVisibleList] = (useState(toSpanList(visible)));
    const navigate = useNavigate();
    const { roContract, bitsLibrary } = useWeb3();
    const setToken = useCallback((idx, info) => {
        let token;
        setTokens((tkns) => {
            token = { ...tkns[idx], ...info };
            return ([
                ...tkns.slice(0, idx),
                ...Array.from({ length: idx - tkns.length }, () => ({})),
                token,
                ...tkns.slice(idx + 1),
            ]);
        });
        return token;
    }, [setTokens]);
    const [typeCount, setTypeCount] = useState(null);
    const [GATING_TYPE, setGATING_TYPE] = useState(null);
    const [DISABLING_TYPE, setDISABLING_TYPE] = useState(null);
    const [TYPE_WIDTH, setTYPE_WIDTH] = useState(null);
    const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = (useState(null));
    useEffect(() => {
        const params = {};
        if (visibleList?.length > 0) {
            Object.assign(params, {
                visible: visibleList.toString(),
            });
        }
        else {
            Object.entries({ limit, offset, gating: gatingVisible }).forEach(([key, val]) => {
                if (val !== defaults[key]) {
                    Object.assign(params, { [key]: val.toString() });
                }
            });
        }
        const options = { search: `?${createSearchParams(params)}` };
        navigate(options, { replace: true });
    }, [visibleList, limit, offset, gatingVisible, navigate]);
    useEffect(() => {
        if (roContract && bitsLibrary) {
            roContract('typeSupply')
                .then(setTypeCount);
            bitsLibrary('GATING_TYPE')
                .then(setGATING_TYPE);
            bitsLibrary('DISABLING_TYPE')
                .then(setDISABLING_TYPE);
            bitsLibrary('TYPE_WIDTH')
                .then(setTYPE_WIDTH);
            bitsLibrary('TYPE_BOUNDARY')
                .then(setTYPE_BOUNDARY);
        }
    }, [roContract, bitsLibrary]);
    useEffect(() => {
        setVisibleList(toSpanList(visible));
    }, [visible]);
    const controller = useRef(null);
    const retrieve = useCallback(async (tokens) => {
        controller.current?.abort();
        controller.current = new AbortController();
        setTokens([]);
        return (await Promise.allSettled(tokens.map(async (token, idx) => {
            try {
                const id = token.id ? BigInt(token.id) : await roContract('tokenByIndex', [token.index]);
                const type = (id
                    & ((2n ** BigInt(TYPE_WIDTH) - 1n) // TYPE_WIDTH 1s
                        << BigInt(TYPE_BOUNDARY)));
                const gating = token.is?.gating ?? (type === GATING_TYPE);
                const disabling = token.is?.disabling ?? (type === (GATING_TYPE | DISABLING_TYPE));
                const gates = token.gates ?? (gating || disabling ? (Number((2n ** 32n - 1n) & id)) : (null));
                const is = {
                    gating,
                    disabling,
                    hidden: (token.hidable != false
                        && (gating || disabling)
                        && !gatingVisible),
                };
                setToken(idx, {
                    id: `0x${id.toString(16)}`,
                    index: token.index,
                    gates,
                    is,
                });
                if (is.hidden) {
                    throw new HiddenError('Token is hidden.');
                }
                const responses = await Promise.allSettled([
                    (async () => {
                        const uri = token.uri ?? await roContract('uri', [id]);
                        if (uri === '') {
                            throw new Error('No URI… Waiting for configuration…');
                        }
                        setToken(idx, { uri });
                        const response = await fetch(httpURL(uri), { signal: controller.current.signal });
                        if (!response.ok) {
                            throw new Error(`Request Status: ${response.status}`);
                        }
                        let body;
                        try {
                            body = await response.text();
                            setToken(idx, { metadata: JSON5.parse(body) });
                        }
                        catch (error) {
                            console.debug({ error, body });
                        }
                    })(),
                    (async () => {
                        const supply = await roContract('totalSupply', [id]);
                        setToken(idx, { total: supply });
                    })(),
                    (async () => {
                        const max = await roContract('getMax', [id]);
                        setToken(idx, { max });
                    })(),
                ]);
                const [{ reason: error } = { reason: null }] = responses.filter((res) => (res.status === 'rejected'));
                if (error)
                    throw new Error(error);
            }
            catch (error) {
                if (!(error instanceof HiddenError)) {
                    console.error({ error });
                }
                if (!(error instanceof DOMException)) { // !aborted
                    return setToken(idx, {
                        error: extractMessage(error)
                    });
                }
            }
        })));
    }, [
        GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH, DISABLING_TYPE,
        gatingVisible, roContract, setToken,
    ]);
    useEffect(() => {
        const load = async () => {
            if (roContract && bitsLibrary && typeCount != null
                && TYPE_WIDTH != null && TYPE_BOUNDARY != null
                && GATING_TYPE != null && DISABLING_TYPE != null) {
                const tokens = [];
                if (visibleList.some(() => true)) {
                    visibleList.forEach((elem) => {
                        let { high, low } = elem;
                        const sorted = [low, high] = ([low, high].sort((a, b) => (a - b)));
                        if (sorted.some((elem) => elem == null)) {
                            [high, low] = [elem, elem];
                        }
                        tokens.push(...(Array.from({ length: high - low + 1 })
                            .map((_, idx) => ({
                            index: low + idx,
                            hidable: false,
                        }))));
                    });
                }
                else {
                    const start = offset < 0 ? Number(typeCount) + offset : offset;
                    const count = Math.min(limit, Number(typeCount) - start);
                    tokens.push(...(Array.from({ length: count })
                        .map((_, idx) => ({
                        index: start + idx + 1,
                    }))));
                }
                await retrieve(tokens);
            }
        };
        load();
    }, [
        visibleList, retrieve, roContract, bitsLibrary,
        limit, offset, typeCount,
        TYPE_WIDTH, TYPE_BOUNDARY, GATING_TYPE, DISABLING_TYPE,
    ]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Helmet, null,
            React.createElement("title", null, "\uD835\uDD10\uD835\uDD22\uD835\uDD31\uD835\uDD1E\uD835\uDD0A\uD835\uDD1E\uD835\uDD2A\uD835\uDD22\u2019\uD835\uDD30 \u2019\uD835\uDE3E\uD835\uDE5D\uD835\uDE5E\uD835\uDE5A\uD835\uDE6B\uD835\uDE5A\uD835\uDE62\uD835\uDE5E\uD835\uDE63\uD835\uDE69\uD835\uDE68"),
            React.createElement("meta", { name: "description", content: "MetaGame\u2019s \u2019Chievemints NFTs" })),
        React.createElement(Header, null),
        React.createElement("main", { className: tyl.main },
            React.createElement(TokenFilterForm, { limit, setLimit,
                offset, setOffset,
                gatingVisible, setGatingVisible,
                visibleList, setVisibleList }),
            React.createElement(TokensTable, { tokens })),
        React.createElement("footer", { className: tyl.footer },
            React.createElement("section", { className: tyl.buttons },
                React.createElement(Tippy, { content: "Add 10 More \u2019Chieves" },
                    React.createElement("button", { onClick: () => {
                            if (visibleList.length > 0) {
                                const potentials = visibleList.map((entry) => (entry?.high ?? entry));
                                const max = Math.max(...potentials);
                                setVisibleList((vis) => ([...vis, { low: max, high: max + 10 }]));
                            }
                            else {
                                setLimit((lim) => lim + 10);
                            }
                        } },
                        React.createElement("span", { className: "bigNBold" }, "+"),
                        "10")),
                React.createElement(Tippy, { content: `Scroll Down ${limit} ’Chieves` },
                    React.createElement("button", { onClick: () => setOffset((off) => off + limit) },
                        React.createElement("span", { className: "biggerNBold" }, "\u27F1"),
                        limit)),
                React.createElement(Tippy, { content: `Scroll Up ${limit} ’Chieves` },
                    React.createElement("button", { onClick: () => setOffset((off) => off - limit) },
                        React.createElement("span", { className: "biggerNBold" }, "\u27F0"),
                        limit)),
                React.createElement(ConnectKitButton, null)))));
};
export default Home;
//# sourceMappingURL=home.js.map