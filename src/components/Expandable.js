import React, { useCallback, useRef, useState, } from 'react';
import { Link } from 'react-router-dom';
export const Anchor = ({ name }) => {
    const anchor = name.toLowerCase().replace(/\s+/g, '-');
    return (React.createElement(Link, { id: anchor, to: `#${anchor}` },
        React.createElement("span", { role: "img", "aria-label": "Link" }, "\uD83D\uDD17")));
};
export const Label = ({ name }) => (React.createElement("div", null,
    React.createElement(Anchor, { name }),
    React.createElement("span", null, "\u25A0"),
    React.createElement("label", null,
        name,
        ":")));
export const Expandable = ({ name, button = null, children }) => {
    const [hide, setHide] = useState({});
    const toggle = useCallback((prop) => {
        setHide(h => ({ ...h, [prop]: !h[prop] }));
    }, []);
    const box = useRef(null);
    return (React.createElement("div", { ref: box },
        React.createElement("div", null,
            React.createElement(Anchor, { name, box }),
            React.createElement("p", { onClick: () => toggle(name) },
                React.createElement("span", null, hide[name] ? '▸' : '▾'),
                name),
            !hide[name] && button),
        !hide[name] && children));
};
export default Expandable;
//# sourceMappingURL=Expandable.js.map