import { Maybe } from '@/lib/types';
import React, { ReactNode } from 'react';
export declare const Anchor: ({ name }: {
    name: string;
}) => JSX.Element;
export declare const Label: ({ name }: {
    name: string;
}) => JSX.Element;
export declare const Expandable: React.FC<{
    name: string;
    button?: Maybe<ReactNode>;
    children: ReactNode;
}>;
export default Expandable;
