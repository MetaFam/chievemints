import { CID } from 'multiformats/cid';
import { NETWORKS } from '@/lib/networks';
import { ipfsLinkPattern } from '@/config';
import JSON5 from 'json5';
import { useWeb3 } from './hooks';
export function httpURL(uri) {
    const [, protocol, origCID, path] = (uri?.match(/^(ip[nf]s):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? []);
    if (origCID) {
        const cid = CID.parse(origCID);
        const v0CID = cid.toV0().toString();
        const v1CID = cid.toV1().toString();
        const pattern = ipfsLinkPattern;
        return (encodeURI(pattern
            .replace(/{protocol}/g, protocol)
            .replace(/{cid}/g, origCID)
            .replace(/{v0cid}/g, v0CID)
            .replace(/{v1cid}/g, v1CID)
            .replace(/{path}/g, path ?? ''))
            .replace(/#/g, '%23'));
    }
    return uri ?? undefined;
}
export const capitalize = (str) => {
    if (!str?.split)
        return str;
    return (str.trim().split(/\s+/g)
        .map((sub) => (`${sub[0]?.toUpperCase() ?? ''}${sub.substring(1)?.toLowerCase() ?? ''}`))
        .join(' '));
};
export const isEmpty = ((val) => {
    if (Array.isArray(val)) {
        return val.length === 0;
    }
    if (val instanceof Object) {
        return Object.keys(val).length === 0;
    }
    if (val === '') {
        return true;
    }
    return false;
});
export const isSet = ((val) => {
    if (val === '' || val == null) {
        return false;
    }
    return true;
});
export const useSwitchTo = () => {
    const { walletClient } = useWeb3();
    return async (chain) => {
        const chainId = `0x${chain.toString(16)}`;
        console.debug({ chain, chainId });
        try {
            walletClient.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                const chainName = (Object.values(NETWORKS).find(({ chainId }) => (chain === chainId))?.name);
                throw new Error(`The network “${chainName ?? '𝓤𝓷𝓴𝓷𝓸𝔀𝓷'}”`
                    + ' is not yet available in your MetaMask.\n\n'
                    + ' Please add it.');
            }
            else {
                throw switchError;
            }
        }
    };
};
export async function ipfsify({ storage, filesOrURL, }) {
    let value = filesOrURL;
    if (value == null
        || (Array.isArray(value) && value.every((v) => v == null))) {
        const str = JSON5.stringify(value);
        throw new Error(`\`ipfsify\` called with value = \`${str}\``);
    }
    if (Array.isArray(value)) {
        const [last] = value.slice(-1);
        if (typeof last === 'string') {
            value = last;
        }
    }
    if (typeof value === 'string') {
        if (value.startsWith('ipfs://')) {
            return value;
        }
        throw new Error(`Unknown File String: ${value}`);
    }
    if (storage == null) {
        return null;
    }
    const list = (Array.isArray(value) ? value : ([value]));
    const root = await storage.storeDirectory((list instanceof FileList) ? list : (list.map((entry) => new File([entry.content ?? entry], entry.name))));
    return (list.length === 1 ? (`ipfs://${root.toString()}/${list[0].name}`) : (list.map((entry) => (`ipfs://${root.toString()}/${entry.name}`))));
}
export const regexify = (str) => {
    if (!str)
        return str;
    let matches = str.split(/((\w)\2{3,})/g);
    for (let i = 0; i < matches.length - 1; i++) {
        const str = matches[i];
        const next = matches[i + 1];
        if ((new Set([...str, ...next])).size === 1) {
            matches[i] += next;
            matches[i + 1] = '';
            i++;
        }
    }
    matches = matches.filter((m) => m !== '');
    const condensed = matches.map((m) => {
        const [char] = m;
        if (m.length > 3
            && /\w/.test(char)
            && (new Set(m)).size === 1) {
            return `${char}{${m.length - 1}}`;
        }
        else {
            return m;
        }
    });
    return condensed.join('');
};
export const deregexify = (str) => {
    if (!str)
        return str;
    const matches = str.split(/(\w\{\d+\})/);
    const expanded = matches.map((m) => {
        const [_, char, count] = m.match(/^(.)\{(\d+)\}/) ?? [];
        if (char && count) {
            return char.repeat(Number(count));
        }
        else {
            return m;
        }
    });
    return expanded.join('');
};
export const extractMessage = (error) => (error.reason
    ?? error?.details
    ?? error?.error?.message
    ?? error?.data?.message
    ?? error?.message
    ?? (typeof error === 'string' ? error : `𝑼𝒏𝒌𝒏𝒐𝒘𝒏 𝑬𝒓𝒓𝒐𝒓: ${JSON5.stringify(error, null, 2)}`));
export const spanListToString = (list) => (list.map((entry) => ((typeof entry === 'number') ? (entry.toString()) : ((() => {
    const { low, high } = entry;
    return `${low}–${high}`;
})())))
    .join(','));
export const toSpanList = (str) => {
    if (str == null)
        return [];
    const visibles = (str.split(/\s*(\s|,|;)\s*/)
        .filter((str) => !['', ',', ';'].includes(str.trim())));
    const list = (visibles.map((entry) => {
        const parts = entry.split(/[-–—]/);
        if (parts.length > 1) {
            const [[low], [high]] = ([parts, parts.slice(-1)]);
            return Object.fromEntries(Object.entries({ low, high }).map(([key, val]) => [key, Number(val)]));
        }
        return Number(entry);
    }));
    Object.defineProperty(list, 'toString', { get() { return () => spanListToString(this); } });
    return list;
};
//# sourceMappingURL=helpers.js.map