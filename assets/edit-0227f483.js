import { h as createAnimation, p as parseLengthAndUnit, i as cssValue, r as reactExports, f as useParams, u as useWeb3, j as jsxs, e as jsx, H as HelmetExport } from "./index-f164924e.js";
import { d as deregexify, r as regexify, h as httpURL, l as lib, e as extractMessage } from "./TokenFilterForm.module-7fdc84b3.js";
import { O as OptionsForm } from "./MaxForm-1ae5aa3f.js";
import { H as HomeLink } from "./HomeLink-0db95d25.js";
import "./index.esm-cf20c191.js";
import "./ThreeDScene-0886a4fc.js";
import "./react-markdown-ceb5e008.js";
import "./SubmitButton-55f1645b.js";
var __assign = globalThis && globalThis.__assign || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = globalThis && globalThis.__rest || function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var right = createAnimation("RingLoader", "0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}", "right");
var left = createAnimation("RingLoader", "0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}", "left");
function RingLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 60 : _f, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size"]);
  var _g = parseLengthAndUnit(size), value = _g.value, unit = _g.unit;
  var wrapper = __assign({ display: "inherit", width: cssValue(size), height: cssValue(size), position: "relative" }, cssOverride);
  var style = function(i) {
    return {
      position: "absolute",
      top: "0",
      left: "0",
      width: "".concat(value).concat(unit),
      height: "".concat(value).concat(unit),
      border: "".concat(value / 10).concat(unit, " solid ").concat(color),
      opacity: "0.4",
      borderRadius: "100%",
      animationFillMode: "forwards",
      perspective: "800px",
      animation: "".concat(i === 1 ? right : left, " ").concat(2 / speedMultiplier, "s 0s infinite linear")
    };
  };
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: style(1) }),
    reactExports.createElement("span", { style: style(2) })
  );
}
const edit = "";
const Edit = () => {
  const { nftId } = useParams();
  const tokenId = reactExports.useMemo(() => deregexify(nftId), [nftId]);
  const [metadata, setMetadata] = reactExports.useState();
  const [metaURI, setMetaURI] = reactExports.useState();
  const [error, setError] = reactExports.useState();
  const { roContract } = useWeb3();
  reactExports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          const metaURI2 = await roContract("uri", [tokenId]);
          const url = httpURL(metaURI2);
          if (!metaURI2 || metaURI2 === "") {
            setMetadata({});
          } else {
            const response = await fetch(url);
            const body = await response.text();
            try {
              setMetadata(lib.parse(body));
              setMetaURI(metaURI2);
            } catch (error2) {
              console.error({ url, tokenId, metaURI: metaURI2, error: error2, body });
              throw error2;
            }
          }
        } catch (err) {
          setMetadata(null);
          setError(extractMessage(err));
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  return /* @__PURE__ */ jsxs("main", { id: "edit", children: [
    /* @__PURE__ */ jsx(HelmetExport, { children: /* @__PURE__ */ jsxs("title", { children: [
      "’𝖈𝖍𝖎𝖊𝖛𝖊: ℰ𝒹𝒾𝓉 #",
      tokenId && regexify(tokenId)
    ] }) }),
    /* @__PURE__ */ jsx(HomeLink, {}),
    error && /* @__PURE__ */ jsxs("aside", { className: "error", children: [
      /* @__PURE__ */ jsx("span", { children: "`setMetadata` Error" }),
      /* @__PURE__ */ jsx("span", { children: error })
    ] }),
    metadata === void 0 ? /* @__PURE__ */ jsxs("aside", { children: [
      /* @__PURE__ */ jsx(RingLoader, { color: "#36d7b7" }),
      /* @__PURE__ */ jsxs("span", { children: [
        "Loading ",
        metaURI,
        "…"
      ] })
    ] }) : /* @__PURE__ */ jsx(
      OptionsForm,
      {
        purpose: "update",
        ...{ tokenId, metadata, metaURI }
      }
    )
  ] });
};
export {
  Edit,
  Edit as default
};
//# sourceMappingURL=edit-0227f483.js.map
