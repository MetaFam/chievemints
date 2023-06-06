import { Limits } from '@/lib/types';
import React, { HTMLAttributes, SetStateAction } from 'react';
export type FilterValues = {
    limit: number;
    offset: number;
    visible: string;
    gatingVisible: boolean;
};
export declare const TokenFilterForm: React.FC<{
    limit: number;
    setLimit: (limit: SetStateAction<number>) => void;
    offset: number;
    setOffset: (offset: SetStateAction<number>) => void;
    gatingVisible: boolean;
    setGatingVisible: (gatingVisible: SetStateAction<boolean>) => void;
    setVisibleList: (visible: SetStateAction<Array<number | Limits>>) => (void);
    visibleList: Array<number | Limits>;
} & HTMLAttributes<HTMLFormElement>>;
export default TokenFilterForm;
