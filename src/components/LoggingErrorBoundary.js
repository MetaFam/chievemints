import React, { Component, } from 'react';
export default class LoggingErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        const msg = error.message ?? error ?? 'Unknown Error';
        return { error: msg };
    }
    componentDidCatch(error, info) {
        console.error(error, info.componentStack);
    }
    render() {
        if (this.state.error) {
            return React.createElement("p", null, this.state.error);
        }
        return this.props.children;
    }
}
//# sourceMappingURL=LoggingErrorBoundary.js.map