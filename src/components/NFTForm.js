/* eslint-disable @next/next/no-img-element */
import { nftBase } from '@/config';
import { httpURL, isEmpty, regexify, capitalize, } from '@/lib/helpers';
import React, { useCallback, useEffect, useRef, useState, } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel, } from 'react-tabs';
import { ThreeDScene } from './ThreeDScene';
import fs from '../styles/NFTForm.module.css';
const AttrRow = ({ attributes = [], setValue: setFormValue, index }) => {
    const { name = '', value = '', type = 'string' } = (attributes[index]);
    const setter = useCallback((prop) => ((value) => {
        setFormValue('attributes', [
            ...attributes.slice(0, index),
            { ...attributes[index], [prop]: value },
            ...attributes.slice(index + 1)
        ]);
    }), [setFormValue, index, attributes]);
    const setName = setter('name');
    const setValue = setter('value');
    const setType = setter('type');
    return (React.createElement("tr", null,
        React.createElement("td", null,
            React.createElement("input", { value: name, onChange: ({ target: { value } }) => {
                    setName(value);
                } })),
        React.createElement("td", null,
            React.createElement("select", { value: type, onChange: ({ target: { value } }) => {
                    setType(value);
                } },
                React.createElement("option", { value: "string" }, "String"),
                React.createElement("option", { value: "date" }, "Date"),
                React.createElement("option", { value: "number" }, "Number"),
                React.createElement("option", { value: "boost_percentage" }, "Boost Percentage"),
                React.createElement("option", { value: "boost_number" }, "Boost Number"))),
        React.createElement("td", null, (() => {
            switch (type) {
                case 'date': {
                    return (React.createElement("input", { type: "date", value: (() => {
                            if (!isEmpty(value)) {
                                try {
                                    return (new Date(value)
                                        .toLocaleDateString('sv', { timeZone: 'GMT' }));
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            }
                            return '';
                        })(), onChange: ({ target: { value } }) => {
                            setValue(new Date(value).getTime());
                        } }));
                }
                case 'string': {
                    return (React.createElement("input", { value, onChange: ({ target: { value } }) => {
                            setValue(value);
                        } }));
                }
                default: {
                    return (React.createElement("input", { type: "number", value, onChange: ({ target: { value } }) => {
                            setValue(value != null ? Number(value) : '');
                        } }));
                }
            }
        })()),
        React.createElement("td", { className: fs.actions },
            React.createElement("button", { type: "button", onClick: () => setFormValue('attributes', [
                    ...attributes.slice(0, index + 1),
                    { name: '', value: '', type: 'string' },
                    ...attributes.slice(index + 1),
                ]) }, "\u2795"),
            React.createElement("button", { type: "button", onClick: () => setFormValue('attributes', [
                    ...attributes.slice(0, index),
                    ...attributes.slice(index + 1),
                ]) }, "\u274C"))));
};
const Hyperlink = ({ href, children, }) => {
    const external = /^(http|ip[nf]s)/.test(href);
    return (external ? (React.createElement("a", { href, target: "_blank", rel: "noreferrer" }, children)) : (React.createElement(Link, { to: href }, children)));
};
const MediaDisplay = ({ content, name = 'Alt', prop, setValue, accept = '*/*', }) => {
    const [filename, setFilename] = (useState(null));
    const input = useRef(null);
    const [type, setType] = useState(null);
    useEffect(() => {
        let file = ((typeof content === 'string') ? content : content?.name);
        file = file?.replace(/^(https?:\/\/[^/]+\/|ip[nf]s:\/\/(.+\/)?)/, '');
        setFilename(file);
        const ext = file?.split('.').pop();
        let type = 'none';
        if (['mp4', 'avif', 'webm'].includes(ext)) {
            type = 'video';
        }
        else if (['mp3', 'wav', 'ogg', 'flac'].includes(ext)) {
            type = 'audio';
        }
        else if (['gltf', 'glb'].includes(ext)) {
            type = 'model';
        }
        else if (file != null) {
            type = 'image';
        }
        setType(type);
    }, [content]);
    const set = ({ target: { value } }) => {
        setValue(prop, value);
        setFilename(value);
    };
    const remove = (evt) => {
        setValue(prop, undefined);
        setFilename(null);
        evt.preventDefault();
    };
    return (React.createElement("label", { className: fs.media },
        React.createElement("div", { className: fs.selector },
            React.createElement("h3", null, capitalize(prop)),
            React.createElement("input", { onChange: set, ref: input }),
            filename && React.createElement("h4", null, filename)),
        content && (React.createElement("div", { className: fs.content },
            (() => {
                const url = ((content instanceof File) ? (URL.createObjectURL(content)) : (httpURL(content)));
                switch (type) {
                    case 'none': {
                        return null;
                    }
                    case 'video': {
                        return React.createElement("video", null,
                            React.createElement("source", { src: url }));
                    }
                    case 'audio': {
                        return React.createElement("audio", null,
                            React.createElement("source", { src: url }));
                    }
                    case 'model': {
                        return (React.createElement(ThreeDScene, { className: fs.model, model: url }));
                    }
                    default: {
                        return React.createElement("img", { alt: name, src: url });
                    }
                }
            })(),
            React.createElement("button", { type: "button", onClick: remove }, "\u274C")))));
};
export const NFTForm = ({ 
// purpose = 'create',
register, watch, setValue, tokenId = '𝘜𝘯𝘬𝘯𝘰𝘸𝘯', metadata, }) => {
    const { homepage, description, color, image, attributes, animation, name, } = watch();
    // const [wearables, setWearables] = useState({})
    useEffect(() => {
        if (metadata) {
            Object.entries({
                name: null, description: null, image: null,
                external_url: 'homepage',
                animation_url: 'animation',
            })
                .forEach(([prop, name]) => {
                setValue(name ?? prop, metadata[prop]);
            });
            const { attributes: attrs } = metadata;
            if (!isEmpty(attrs)) {
                setValue('attributes', ((attrs ?? []).map(({ trait_type: name, value, display_type: type = 'string', }) => ({ name, value, type }))));
            }
            // setWearables(metadata.properties?.wearables ?? {})
            const bg = metadata.background_color;
            if (bg && !isEmpty(bg)) {
                setValue('color', `#${bg}`);
            }
        }
    }, [metadata, setValue]);
    useEffect(() => {
        if (!homepage
            || isEmpty(homepage)
            || homepage.endsWith('𝘜𝘯𝘬𝘯𝘰𝘸𝘯')) {
            setValue('homepage', `${nftBase}/${regexify(tokenId)}`);
        }
    }, [homepage, setValue, tokenId]);
    useEffect(() => {
        if (window.location.hash) {
            const elem = document.getElementById(window.location.hash.substring(1));
            window.scroll({
                top: (elem?.offsetTop ?? 0) - 120,
                behavior: 'smooth',
            });
        }
    }, []);
    const addRow = () => {
        setValue('attributes', [...(attributes ?? []), {}]);
    };
    return (React.createElement("ul", null,
        React.createElement("li", { id: fs.name },
            React.createElement("label", null,
                React.createElement("h3", null, "Name"),
                React.createElement("input", { ...register('name') }))),
        React.createElement("li", { id: fs.image, style: { '--img-bg': color } },
            React.createElement(MediaDisplay, { content: image, prop: "image", accept: "image/*", name, setValue })),
        React.createElement("li", { id: fs.background },
            React.createElement("label", null,
                React.createElement("h3", null, "Background"),
                React.createElement("input", { type: "color", ...register('color') }))),
        React.createElement("li", { id: fs.homepage },
            React.createElement("label", null,
                React.createElement("h3", null, "Homepage"),
                React.createElement("input", { ...register('homepage') })),
            homepage?.length > 0 && (React.createElement(Hyperlink, { href: homepage }, "\uD83E\uDC7D"))),
        React.createElement("li", { id: fs.description },
            React.createElement("label", null,
                React.createElement("h3", null, "Description"),
                React.createElement(Tabs, null,
                    React.createElement(TabList, null,
                        React.createElement(Tab, null, "Markdown"),
                        React.createElement(Tab, null, "Preview")),
                    React.createElement(TabPanel, null,
                        React.createElement("textarea", { placeholder: "Enter a markdown formatted description.", ...register('description') })),
                    React.createElement(TabPanel, null,
                        React.createElement(Markdown, null, description))))),
        React.createElement("li", { id: fs.animation },
            React.createElement(MediaDisplay, { content: animation, prop: "animation", accept: "model/gltf+json,model/gltf-binary,video/*,.gltf,.glb", name, setValue })),
        React.createElement("li", { id: fs.attributes },
            React.createElement("label", null,
                React.createElement("h3", null, "Attributes"),
                React.createElement("button", { type: "button", onClick: addRow }, "\u2795")),
            attributes?.length > 0 && (React.createElement("table", null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Value"),
                        React.createElement("th", null))),
                React.createElement("tbody", null, attributes.map((_, index) => (React.createElement(AttrRow, { key: index, attributes, setValue, index })))))))));
};
export default NFTForm;
//# sourceMappingURL=NFTForm.js.map