import type { NamedString, SpanList } from '@/lib/types';
import { NFTStorage } from 'nft.storage';
export declare function httpURL(uri?: null): undefined;
export declare function httpURL(uri: string): string;
export declare const capitalize: (str: string) => string;
export declare const isEmpty: (val: unknown) => boolean;
export declare const isSet: (val: unknown) => boolean;
export declare const switchTo: (chain: number) => Promise<void>;
export declare function ipfsify({ filesOrURL, storage }: {
    filesOrURL: NamedString | string | File;
    storage: NFTStorage;
}): Promise<string>;
export declare function ipfsify({ filesOrURL, storage }: {
    filesOrURL: Array<NamedString> | FileList;
    storage: NFTStorage;
}): Promise<Array<string>>;
export declare const regexify: (str?: string) => string;
export declare const deregexify: (str?: string) => string;
export declare const extractMessage: (error: unknown) => string;
export declare const spanListToString: (list: SpanList) => string;
export declare const toSpanList: (str: string) => SpanList;
