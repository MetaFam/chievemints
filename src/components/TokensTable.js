/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Tippy from '@tippyjs/react';
import { extractMessage, httpURL, regexify } from '@/lib/helpers';
import Markdown from 'react-markdown';
import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import '../styles/TokensTable.css';
const Index = ({ token }) => (React.createElement("div", { className: "index" },
    React.createElement(Tippy, { content: token.id != null ? (regexify(token.id)) : ('𝚄𝚗𝚔𝚗𝚘𝚠𝚗') },
        React.createElement("p", { className: "content" },
            React.createElement("span", null, token.index),
            token.gates != null && (React.createElement("span", { title: `Controls Token #${token.gates}` },
                "(",
                token.gates === 0 ? 'all' : token.gates,
                ")")),
            token.is?.disabling && (React.createElement("span", null, "(disabled)"))))));
const Error = ({ token }) => (React.createElement("div", { className: "error" },
    React.createElement("p", { className: "content" }, extractMessage(token.error))));
const Loading = (({ label = 'Loading Metadata…', ...props }) => (React.createElement("div", { className: "loading" },
    React.createElement("p", { className: "content", ...props }, label))));
const Finding = (({ label = 'Finding Metadata…', ...props }) => (React.createElement("div", { className: "finding" },
    React.createElement("p", { className: "content", ...props }, label))));
const Image = ({ token }) => (React.createElement("div", { className: "img", style: { '--img-bg': `#${token.metadata.background_color}` } },
    React.createElement(Link, { to: `/view/${regexify(token.id)}`, className: "content" }, token.metadata?.image && (React.createElement("img", { src: httpURL(token.metadata.image) ?? undefined, alt: token.metadata?.name ?? 'Untitled' })))));
const Description = ({ token }) => (React.createElement("div", { className: "text" },
    React.createElement("div", { className: "title" },
        React.createElement("h2", { className: "content" },
            token.metadata?.name ?? (React.createElement("em", null, "Untitled")),
            token.gates == null ? '' : (token.gates === 0 ? (' for all tokens') : (React.createElement(React.Fragment, null,
                ' ',
                "for",
                ' ',
                React.createElement(Link, { to: `/view/${token.gates}` },
                    "#",
                    token.gates)))))),
    React.createElement("div", { className: "desc" },
        token.is?.disabling && (React.createElement("p", { className: "content" },
            "This token ",
            React.createElement("b", null, "disables"),
            " the following permission for",
            ' ',
            React.createElement(Link, { to: `/view/i:${token.gates}` },
                "the token at index #",
                token.gates),
            ":")),
        token.is?.gating && (React.createElement("p", { className: "content" },
            "This token gives holders the following permission for",
            ' ',
            token.gates === 0 ? ('all tokens') : (React.createElement(Link, { to: `/view/${token.gates}` },
                "the token at index #",
                token.gates)),
            ":")),
        React.createElement(Markdown, { linkTarget: "_blank", className: "content" }, token.is?.disabling || token.is?.gating ? (`> ${token.metadata.description.replace(/\n/g, "\n> ")}`) : (token.metadata?.description ?? ('*No Description*'))))));
const LinkLink = ({ token }) => (React.createElement("div", { className: "homepage" }, token.metadata?.external_url && (React.createElement(Tippy, { content: token.metadata.external_url },
    React.createElement("a", { className: "content", href: token.metadata.external_url, target: "_blank", rel: "noreferrer" }, "\uD83C\uDF10")))));
const URI = ({ token }) => ((token.uri && (React.createElement("nav", { className: "metainfo" },
    React.createElement("ul", null,
        React.createElement("li", { className: "source" },
            React.createElement(Tippy, { content: token.uri },
                React.createElement("a", { className: "content", href: httpURL(token.uri) ?? undefined, target: "_blank", rel: "noreferrer" }, "\uD83D\uDD17"))),
        React.createElement("li", { className: "clipboard" },
            React.createElement(Tippy, { content: "Copy to Clipboard" },
                React.createElement("button", { className: "content", onClick: () => {
                        if (token.uri && window.isSecureContext) {
                            navigator?.clipboard?.writeText(token.uri);
                        }
                    } }, "\uD83D\uDCCB"))))))));
const Total = ({ token }) => {
    const label = `${token.total?.toString()} minted of ${token.max?.toString()} total`;
    return (React.createElement("div", { className: "quantity" },
        React.createElement(Link, { to: `/owners/${regexify(token.id)}`, className: "content" },
            React.createElement(Tippy, { content: label },
                React.createElement(React.Fragment, null,
                    React.createElement("sup", null, token.total?.toString()
                        ?? React.createElement(ClimbingBoxLoader, { size: 4, color: "#FE0235" })),
                    '⁄',
                    React.createElement("sub", null, Number(token.max) < 0 ? '∞' : token.max?.toString()
                        ?? React.createElement(ClimbingBoxLoader, { size: 4, color: "#EF2299" })))))));
};
const Actions = ({ token }) => {
    const id = regexify(token.id);
    return (React.createElement("nav", { className: "actions" },
        React.createElement("ul", null,
            React.createElement("li", { className: "edit" },
                React.createElement(Tippy, { content: "Edit Metadata" },
                    React.createElement(Link, { to: `/edit/${id}`, className: "content" }, "\u270F\uFE0F"))),
            React.createElement("li", { className: "view" },
                React.createElement(Tippy, { content: "View This NFT" },
                    React.createElement(Link, { to: `/view/${id}`, className: "content" }, "\uD83D\uDC41"))),
            React.createElement("li", { className: "disburse" },
                React.createElement(Tippy, { content: "Disburse This NFT" },
                    React.createElement(Link, { to: `/disburse/${id}`, className: "content" }, "\uD83D\uDCB8"))),
            React.createElement("li", { className: "permissions" },
                React.createElement(Tippy, { content: "Adjust NFT Permissions" },
                    React.createElement(Link, { to: `/permissions/${id}`, className: "content" }, "\uD83D\uDD12"))))));
};
export const TokensTable = ({ tokens }) => (React.createElement("section", { id: "tokens" }, tokens.map((token, index) => {
    if (token.is?.hidden) {
        return null;
    }
    return (React.createElement("article", { className: "token", key: index },
        React.createElement(Index, { token, index }),
        (() => {
            if (token.error) {
                return React.createElement(Error, { token });
            }
            if (!token.metadata) {
                return (!token.uri ? (React.createElement(Finding, null)) : (React.createElement(Loading, null)));
            }
            return (React.createElement(React.Fragment, null,
                React.createElement(Image, { token }),
                React.createElement(Description, { token }),
                React.createElement(LinkLink, { token })));
        })(),
        React.createElement(URI, { token }),
        React.createElement(Total, { token }),
        React.createElement(Actions, { token })));
})));
export default TokensTable;
//# sourceMappingURL=TokensTable.js.map