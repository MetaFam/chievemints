import { LinkedSVG } from '@/components';
import React from 'react';
import Tippy from '@tippyjs/react';
import tyl from '../styles/Header.module.css';
export const Header = ({ links = { cup: '/new', sign: '/' }, ...props }) => (React.createElement("header", { id: tyl.header, ...props },
    React.createElement(Tippy, { content: "Create A New Token Type" },
        React.createElement(LinkedSVG, { id: tyl.cup, className: "link", svg: "logo.svg", href: links.cup })),
    React.createElement(Tippy, { content: "List Existing Tokens" },
        React.createElement(LinkedSVG, { id: tyl.sign, className: "link", svg: "header.svg", href: links.sign }))));
export default Header;
//# sourceMappingURL=Header.js.map