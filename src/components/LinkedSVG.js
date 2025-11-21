import React, { useCallback, useRef, } from 'react';
import { Link } from 'react-router-dom';
export const LinkedSVG = React.forwardRef(({ href = '#', svg: data, ...props }, ref) => {
    const svg = useRef(null);
    const link = useRef(null);
    const local = !/^(https?:)?(\/\/)/.test(href);
    const onLoad = useCallback(({ target: { contentDocument: { documentElement: root, } } }) => {
        const listener = () => {
            link.current.click();
        };
        root.addEventListener('click', listener);
        return () => root.removeEventListener('click', listener);
    }, []);
    const setRef = useCallback((elem) => {
        svg.current = elem;
        if (typeof ref === 'function') {
            ref(elem);
        }
        else if ('current' in (ref ?? {})) {
            ref.current = elem;
        }
    }, []);
    return (local ? (React.createElement(Link, { className: "link", to: href, ref: link, ...props },
        React.createElement("object", { data, onLoad, ref: setRef }))) : (null));
});
LinkedSVG.displayName = 'LinkedSVG';
//# sourceMappingURL=LinkedSVG.js.map