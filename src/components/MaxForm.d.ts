import React from 'react';
type MaxFormProps = {
    tokenId?: string;
    perUser?: boolean;
    purpose: string;
} & React.HTMLProps<HTMLFormElement>;
export declare const MaxForm: ({ tokenId, purpose, perUser, ...props }: MaxFormProps) => JSX.Element;
export {};
