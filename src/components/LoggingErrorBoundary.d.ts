import { Maybe } from '@/lib/types';
import React, { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';
type StateType = {
    error?: Maybe<string>;
};
type PropsType = PropsWithChildren<{
    fallback?: ReactNode;
}>;
export default class LoggingErrorBoundary extends Component<PropsType, StateType> {
    constructor(props: PropsType);
    static getDerivedStateFromError(error: Error): {
        error: string | Error;
    };
    componentDidCatch(error: Error, info: ErrorInfo): void;
    render(): string | number | boolean | React.ReactFragment | JSX.Element;
}
export {};
