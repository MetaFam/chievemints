import React, { ButtonHTMLAttributes } from 'react';
export declare const SubmitButton: React.FC<{
    purpose?: string;
    processing?: boolean;
    label?: string;
    requireStorage?: boolean;
    short?: boolean;
    openSettings?: () => void;
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>>;
