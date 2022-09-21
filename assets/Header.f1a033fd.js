import { j as jsxs, F as Flex, a as jsx } from "./index.1422698f.js";
import { a as Tooltip, L as LinkedSVG } from "./LinkedSVG.bed330e2.js";
const Header = ({
  links = {
    cup: "/new",
    sign: "/"
  },
  ...props
}) => /* @__PURE__ */ jsxs(Flex, {
  grow: 1,
  ...props,
  children: [/* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "Create A New Token Type",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      w: "min(40%, 75vh)",
      h: "auto",
      svg: "logo.svg",
      href: links.cup,
      title: "Create a new Token"
    })
  }), /* @__PURE__ */ jsx(Tooltip, {
    hasArrow: true,
    label: "List Existing Tokens",
    children: /* @__PURE__ */ jsx(LinkedSVG, {
      w: "75%",
      h: "auto",
      ml: "-15%",
      svg: "header.svg",
      href: links.sign,
      title: "View Existing Tokens"
    })
  })]
});
export {
  Header as H
};
//# sourceMappingURL=Header.f1a033fd.js.map
