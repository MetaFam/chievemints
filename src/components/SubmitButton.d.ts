import React, { ButtonHTMLAttributes } from 'react';
import '../styles/SubmitButton.css';
export declare const SubmitButton: React.FC<{
    purpose?: string;
    processing?: boolean;
    label?: string;
    requireStorage?: boolean;
    short?: boolean;
    openSettings?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>>;
