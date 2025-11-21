import { URIForm, JSONForm, NFTForm, MaxForm, SubmitButton, } from '@/components';
import { ipfsify, isSet, isEmpty, regexify, extractMessage, } from '@/lib/helpers';
import React, { useCallback, useMemo, useState } from 'react';
import { useWeb3 } from '@/lib/hooks';
import { useForm } from 'react-hook-form';
import JSON5 from 'json5';
import { useNavigate } from 'react-router-dom';
import { useConfig } from '@/config';
import { toast } from 'react-toastify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createPortal } from 'react-dom';
import os from '../styles/OptionsForm.module.css';
export const OptionsForm = ({ purpose = 'create', tokenId, metadata: incomingData, metaURI: incomingURI, }) => {
    const FIELD_FORM = 0;
    const URI_FORM = 1;
    const JSON5_FORM = 2;
    const { rwContract, contractClient } = useWeb3();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setValue: setValue, formState: { isSubmitting: processing }, } = useForm({
        defaultValues: {
            uri: incomingURI,
        },
    });
    const [metadata, setMetadata] = (useState(incomingData ?? {}));
    const [tab, setTab] = useState(FIELD_FORM);
    const { storage, Settings, openSettings } = useConfig();
    const values = watch();
    const json5 = watch('json5');
    const uri = watch('uri');
    const buildMeta = useCallback(async ({ data, ipfs = true, }) => {
        const { name, description, homepage, color, image, animation, attributes, } = data;
        const metadata = {
            name: isSet(name) ? name : '𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙',
            decimals: 0,
        };
        if (isSet(description)) {
            metadata.description = description;
        }
        if (isSet(homepage)) {
            metadata.external_url = homepage;
        }
        if (image) {
            metadata.image = image;
        }
        if (animation) {
            metadata.animation_url = animation;
        }
        if (color?.startsWith('#')) {
            metadata.background_color = (color.substring(1).toUpperCase());
        }
        if (isSet(attributes) && !isEmpty(attributes)) {
            metadata.attributes = (attributes.map(({ name, value, type }) => {
                const attr = {
                    trait_type: name,
                    value,
                };
                // including a string type causes nothing to render
                if (type !== 'string') {
                    attr.display_type = type;
                }
                return attr;
            }));
        }
        return metadata;
    }, [storage]);
    const configure = useCallback(async ({ metadata }) => {
        if (!rwContract) {
            throw new Error(`Cannot connect to contract to ${purpose} metadata.`);
        }
        if (tokenId == null) {
            throw new Error('Token id is unset.');
        }
        if (metadata == null) {
            throw new Error('metadata is unset.');
        }
        try {
            const hash = await rwContract('setURI', [BigInt(tokenId), metadata]);
            await contractClient.waitForTransactionReceipt({ hash });
            if (metadata !== '') {
                navigate(`/view/${regexify(tokenId)}`);
            }
        }
        catch (error) {
            console.error({ error });
            toast(extractMessage(error), { type: 'error' });
        }
    }, [rwContract, tokenId, purpose, navigate]);
    const submit = useCallback(async (data) => {
        try {
            const name = `metadata.${(new Date()).toISOString()}.json`;
            let metadata = await (async () => {
                switch (tab) {
                    case FIELD_FORM: {
                        const content = JSON.stringify(await buildMeta({ data }), null, 2);
                        return { name, content };
                    }
                    case URI_FORM: {
                        return data.uri ?? '';
                    }
                    case JSON5_FORM: {
                        if (!isSet(data.json5)) {
                            throw new Error('JSON5 isn’t set.');
                        }
                        const meta = JSON5.parse(data.json5);
                        return {
                            name,
                            content: JSON.stringify(meta, null, 2)
                        };
                    }
                    default: {
                        throw new Error(`Unknown Tab: ${tab}`);
                    }
                }
            })();
            if (metadata == null) {
                throw new Error(`Metadata is \`${JSON5.stringify(metadata)}\`.`);
            }
            else if (metadata !== '') {
                metadata = await ipfsify({ filesOrURL: metadata, storage });
            }
            await configure({ metadata });
        }
        catch (error) {
            console.error({ error });
            toast(extractMessage(error));
        }
    }, [buildMeta, configure, storage, tab]);
    const changeTo = useMemo(() => ({
        fields: async (previous) => {
            let metaPromise;
            switch (previous) {
                case URI_FORM: {
                    if (uri && uri !== '') {
                        metaPromise = (fetch(uri)
                            .then((res) => res.text())
                            .then((txt) => JSON5.parse(txt)));
                    }
                    break;
                }
                case JSON5_FORM: {
                    if (json5 && json5 !== '') {
                        metaPromise = Promise.resolve(JSON5.parse(json5));
                    }
                    break;
                }
            }
            if (metaPromise) {
                setMetadata(null);
                metaPromise
                    .then((meta) => {
                    const types = [
                        { image: 'image' },
                        { animation: 'animation_url' },
                    ];
                    for (const typeSet of types) {
                        const type = Object.keys(typeSet)[0];
                        const key = typeSet[type];
                        if (typeof meta[key] === 'string'
                            && meta[key].startsWith('blob:')) {
                            meta[key] = values[type];
                        }
                    }
                    setMetadata(meta);
                });
            }
            else {
                toast.warn('No metadata specified.');
            }
        },
        uri: async (previous) => {
            return previous;
        },
        json5: async (previous) => {
            let metaPromise;
            switch (previous) {
                case FIELD_FORM: {
                    metaPromise = (buildMeta({ data: values, ipfs: false }));
                    break;
                }
                case URI_FORM: {
                    if (uri && uri !== '') {
                        metaPromise = (fetch(uri)
                            .then((res) => res.json()));
                    }
                    break;
                }
            }
            if (metaPromise) {
                setMetadata(null);
                setMetadata(await metaPromise);
            }
            else {
                toast('No metadata found.');
            }
        }
    }), [uri, json5, buildMeta, values]);
    const onSelect = useCallback((idx, previous) => {
        if (idx === previous)
            return;
        let changePromise;
        switch (idx) {
            case FIELD_FORM: {
                changePromise = changeTo.fields(previous);
                break;
            }
            case URI_FORM: {
                changePromise = changeTo.uri(previous);
                break;
            }
            case JSON5_FORM: {
                changePromise = changeTo.json5(previous);
                break;
            }
        }
        changePromise.then(() => setTab(idx));
    }, [changeTo]);
    return (React.createElement("div", { id: os.form },
        createPortal(React.createElement(Settings, null), document.body),
        React.createElement("form", { onSubmit: handleSubmit(submit) },
            React.createElement(SubmitButton, { requireStorage: false, className: "full", purpose, processing, openSettings }),
            React.createElement(Tabs, { onSelect },
                React.createElement(TabList, null,
                    React.createElement(Tab, null, "Fields"),
                    React.createElement(Tab, null, "URI"),
                    React.createElement(Tab, null, "JSON5")),
                [NFTForm, URIForm, JSONForm].map((Form, idx) => (React.createElement(TabPanel, { key: idx },
                    React.createElement(Form, { register,
                        watch,
                        setValue,
                        tokenId,
                        metadata }))))),
            React.createElement(SubmitButton, { requireStorage: false, className: "full", purpose, processing, openSettings })),
        React.createElement("section", { id: os.maxes },
            React.createElement(MaxForm, { className: os.max, tokenId, purpose }),
            React.createElement(MaxForm, { perUser: true, className: os.max, tokenId, purpose }))));
};
export default OptionsForm;
//# sourceMappingURL=OptionsForm.js.map