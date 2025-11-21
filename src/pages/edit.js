import React, { useEffect, useMemo, useState, } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import JSON5 from 'json5';
import { useWeb3 } from '@/lib/hooks';
import { httpURL, regexify, deregexify, extractMessage, } from '@/lib/helpers';
import { HomeLink, OptionsForm } from '@/components';
import { RingLoader } from 'react-spinners';
import '../styles/edit.css';
export const Edit = () => {
    const { nftId } = useParams();
    const tokenId = useMemo(() => deregexify(nftId), [nftId]);
    const [metadata, setMetadata] = useState();
    const [metaURI, setMetaURI] = useState();
    const [error, setError] = useState();
    const { roContract } = useWeb3();
    useEffect(() => {
        const getMetadata = async () => {
            if (roContract && tokenId) {
                try {
                    const metaURI = await roContract('uri', [tokenId]);
                    const url = httpURL(metaURI);
                    if (!metaURI || metaURI === '') {
                        setMetadata({});
                    }
                    else {
                        const response = await fetch(url);
                        const body = await response.text();
                        try {
                            setMetadata(JSON5.parse(body));
                            setMetaURI(metaURI);
                        }
                        catch (error) {
                            console.error({ url, tokenId, metaURI, error, body });
                            throw error;
                        }
                    }
                }
                catch (err) {
                    setMetadata(null);
                    setError(extractMessage(err));
                }
            }
        };
        getMetadata();
    }, [roContract, tokenId]);
    return (React.createElement("main", { id: "edit" },
        React.createElement(Helmet, null,
            React.createElement("title", null,
                "\u2019\uD835\uDD88\uD835\uDD8D\uD835\uDD8E\uD835\uDD8A\uD835\uDD9B\uD835\uDD8A: \u2130\uD835\uDCB9\uD835\uDCBE\uD835\uDCC9 #",
                tokenId && regexify(tokenId))),
        React.createElement(HomeLink, null),
        error && (React.createElement("aside", { className: "error" },
            React.createElement("span", null, "`setMetadata` Error"),
            React.createElement("span", null, error))),
        metadata === undefined ? (React.createElement("aside", null,
            React.createElement(RingLoader, { color: "#36d7b7" }),
            React.createElement("span", null,
                "Loading ",
                metaURI,
                "\u2026"))) : (React.createElement(OptionsForm, { purpose: "update", tokenId, metadata, metaURI }))));
};
export default Edit;
//# sourceMappingURL=edit.js.map