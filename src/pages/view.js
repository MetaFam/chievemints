import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import JSON5 from 'json5';
import { regexify, deregexify, httpURL, } from '@/lib/helpers';
import { HomeLink, ThreeDScene } from '@/components';
import { useWeb3 } from '@/lib/hooks';
import { FadeLoader } from 'react-spinners';
import tyl from '../styles/view.module.css';
export const View = (({ tokenId, header = true }) => {
    const [metadata, setMetadata] = useState();
    const [error, setError] = useState();
    const { roContract } = useWeb3();
    useEffect(() => {
        const getMetadata = async () => {
            if (roContract && tokenId) {
                try {
                    let realId = BigInt(tokenId);
                    if (realId < 2 ** 32) {
                        realId = await roContract('tokenByIndex', [realId]);
                    }
                    const metadataURI = await roContract('uri', [realId]);
                    const metadataURL = httpURL(metadataURI);
                    if (!metadataURL) {
                        throw new Error(`Couldn't find metadata for token #${regexify(tokenId)}.`);
                    }
                    const response = await fetch(metadataURL);
                    const data = await response.text();
                    setMetadata(JSON5.parse(data));
                }
                catch (err) {
                    setError(err.message);
                }
            }
        };
        getMetadata();
    }, [roContract, tokenId]);
    if (error) {
        return (React.createElement("aside", null,
            React.createElement("span", null, "Error: Loading NFT"),
            React.createElement("span", null, error)));
    }
    if (!metadata) {
        return (React.createElement("main", null,
            React.createElement(FadeLoader, { color: "#36d7b7", height: 100 }),
            React.createElement("p", null,
                "Loading Metadata for Token #",
                regexify(tokenId))));
    }
    const { name, image, animation_url: animation, description, background_color: bg, } = metadata;
    return (React.createElement("div", { id: tyl.style },
        header && (React.createElement(Helmet, null,
            React.createElement("title", null,
                name,
                " (#",
                regexify(tokenId),
                ")"),
            React.createElement("meta", { name: "description", content: description }))),
        React.createElement("header", null,
            React.createElement(HomeLink, null)),
        React.createElement("header", null, name && React.createElement("h1", null, name)),
        React.createElement("main", null,
            image && (React.createElement("object", { data: httpURL(image) ?? undefined, title: name, className: tyl.image, style: { backgroundColor: `#${bg}` } })),
            description && (React.createElement(Markdown, { className: tyl.markdown, remarkPlugins: [remarkGfm], linkTarget: "_blank" }, description)),
            animation && ((() => {
                const url = httpURL(animation) ?? undefined;
                if (/(mpe?g|mp4)$/i.test(animation)) {
                    return (React.createElement("video", { controls: true, autoPlay: true, loop: true, muted: true, className: tyl.video },
                        React.createElement("source", { src: url })));
                }
                else if (/(glb|gltf)$/i.test(animation)) {
                    return (React.createElement(ThreeDScene, { model: url, className: tyl.model, bg }));
                }
                else {
                    return (React.createElement("object", { data: url, title: name, className: tyl.object }));
                }
            })()))));
});
export const ViewPage = () => {
    const { nftId } = useParams();
    const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
    return React.createElement(View, { tokenId });
};
export default ViewPage;
//# sourceMappingURL=view.js.map