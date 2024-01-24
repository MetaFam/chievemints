import { h as createAnimation, p as parseLengthAndUnit, r as reactExports, i as cssValue, f as useParams, u as useWeb3, Q, j as jsxs, e as jsx, H as HelmetExport, F as Fragment } from "./index-d6dac5c9.js";
import { d as deregexify, e as extractMessage, r as regexify, T as Tabs, a as TabList, b as Tab, f as TabPanel, h as httpURL } from "./TokenFilterForm.module-8a2c2533.js";
import { H as HomeLink } from "./HomeLink-18947dd1.js";
import { n as normalize } from "./normalize-66a64b6d.js";
var __assign$1 = globalThis && globalThis.__assign || function() {
  __assign$1 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
var __rest$1 = globalThis && globalThis.__rest || function(s, e) {
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
var rotate = createAnimation("ClockLoader", "100% { transform: rotate(360deg) }", "rotate");
function ClockLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 50 : _f, additionalprops = __rest$1(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size"]);
  var _g = parseLengthAndUnit(size), value = _g.value, unit = _g.unit;
  var wrapper = __assign$1({ display: "inherit", position: "relative", width: "".concat(value).concat(unit), height: "".concat(value).concat(unit), backgroundColor: "transparent", boxShadow: "inset 0px 0px 0px 2px ".concat(color), borderRadius: "50%" }, cssOverride);
  var minute = {
    position: "absolute",
    backgroundColor: color,
    width: "".concat(value / 3, "px"),
    height: "2px",
    top: "".concat(value / 2 - 1, "px"),
    left: "".concat(value / 2 - 1, "px"),
    transformOrigin: "1px 1px",
    animation: "".concat(rotate, " ").concat(8 / speedMultiplier, "s linear infinite")
  };
  var hour = {
    position: "absolute",
    backgroundColor: color,
    width: "".concat(value / 2.4, "px"),
    height: "2px",
    top: "".concat(value / 2 - 1, "px"),
    left: "".concat(value / 2 - 1, "px"),
    transformOrigin: "1px 1px",
    animation: "".concat(rotate, " ").concat(2 / speedMultiplier, "s linear infinite")
  };
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign$1({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: hour }),
    reactExports.createElement("span", { style: minute })
  );
}
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
var scale = createAnimation("ScaleLoader", "0% {transform: scaley(1.0)} 50% {transform: scaley(0.4)} 100% {transform: scaley(1.0)}", "scale");
function ScaleLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.height, height = _f === void 0 ? 35 : _f, _g = _a.width, width = _g === void 0 ? 4 : _g, _h = _a.radius, radius = _h === void 0 ? 2 : _h, _j = _a.margin, margin = _j === void 0 ? 2 : _j, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "height", "width", "radius", "margin"]);
  var wrapper = __assign({ display: "inherit" }, cssOverride);
  var style = function(i) {
    return {
      backgroundColor: color,
      width: cssValue(width),
      height: cssValue(height),
      margin: cssValue(margin),
      borderRadius: cssValue(radius),
      display: "inline-block",
      animation: "".concat(scale, " ").concat(1 / speedMultiplier, "s ").concat(i * 0.1, "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08)"),
      animationFillMode: "both"
    };
  };
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: style(1) }),
    reactExports.createElement("span", { style: style(2) }),
    reactExports.createElement("span", { style: style(3) }),
    reactExports.createElement("span", { style: style(4) }),
    reactExports.createElement("span", { style: style(5) })
  );
}
const mint = "_mint_iox0k_1";
const actions = "_actions_iox0k_2";
const tyl = {
  mint,
  actions
};
const Address = ({ name }) => {
  const { ensClient } = useWeb3();
  const isAddress = reactExports.useMemo(
    () => /^0x[a-z0-9]{40}$/i.test(name),
    [name]
  );
  const [address, setAddress] = reactExports.useState(
    isAddress ? void 0 : null
  );
  reactExports.useMemo(
    () => {
      if (!isAddress) {
        const resolve = async () => {
          const resolved = await ensClient.getEnsResolver({ name: normalize(name) });
          setAddress(resolved ?? "Not Found");
        };
        resolve();
      }
    },
    [isAddress, ensClient, name]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("p", { children: [
      name,
      " ",
      address != null && /* @__PURE__ */ jsxs("em", { children: [
        "(",
        address,
        ")"
      ] })
    ] }),
    address === null && /* @__PURE__ */ jsx(ScaleLoader, { color: "#22BB99" })
  ] });
};
const split = (raw) => raw.split(/\s*[\s,;:/\\|]+\s*/).filter((str) => str && str !== "");
const Disburse = () => {
  const { nftId } = useParams();
  const tokenId = reactExports.useMemo(() => deregexify(Array.isArray(nftId) ? nftId[0] : nftId), [nftId]);
  const [balance, setBalance] = reactExports.useState();
  const [metadata, setMetadata] = reactExports.useState();
  const [error, setError] = reactExports.useState();
  const [raw, setRaw] = reactExports.useState("");
  const [
    action
    /* , setAction */
  ] = reactExports.useState("mint");
  const {
    ensClient,
    address,
    roContract,
    rwContract,
    connect,
    contractClient
  } = useWeb3();
  const [addresses, setAddresses] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const parse = async () => {
      setAddresses(
        split(raw).map((name2, idx) => /* @__PURE__ */ jsx(Address, { ...{ name: name2 } }, idx))
      );
    };
    parse();
  }, [ensClient, raw]);
  const name = reactExports.useMemo(
    () => metadata?.name ?? `#${tokenId}`,
    [metadata, tokenId]
  );
  reactExports.useEffect(() => {
    const getBalance = async () => {
      if (roContract && address && tokenId) {
        try {
          setBalance(Number(
            (await roContract("balanceOf", [address, tokenId])).toString()
          ));
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getBalance();
  }, [address, roContract, tokenId]);
  reactExports.useEffect(
    () => {
      const getMetadata = async () => {
        if (roContract && tokenId) {
          try {
            const meta = await roContract("uri", [tokenId]);
            if (!meta) {
              setMetadata(null);
            } else {
              const response = await fetch(httpURL(meta));
              setMetadata(await response.json());
            }
          } catch (err) {
            setError(err.message);
          }
        }
      };
      getMetadata();
    },
    [roContract, tokenId]
  );
  const submit = reactExports.useCallback(async (evt) => {
    evt.preventDefault();
    if (!rwContract) {
      return Q("Token is not Connected.");
    }
    try {
      const addrs = await Promise.all(
        split(raw).map(async (name2) => {
          const response = await ensClient.getEnsResolver({ name: normalize(name2) });
          if (!response) {
            throw new Error(`Couldn't Resolve Name: “${name2}”`);
          }
          return response;
        })
      );
      switch (action) {
        case "mint": {
          const hash = await rwContract(
            "mint",
            [addrs, tokenId]
          );
          await contractClient.waitForTransactionReceipt({ hash });
          break;
        }
        case "whitelist": {
          console.debug("whitelist", { addrs });
          addrs.map(async (addr) => {
            const minterRole = await roContract(
              "roleIndexForName",
              ["Minter"]
            );
            await rwContract("mint", [addr, minterRole, 1]);
          });
          break;
        }
      }
    } catch (err) {
      Q(extractMessage(err));
    }
  }, [action, ensClient, raw, roContract, rwContract, tokenId]);
  if (error) {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { children: "Error: Loading NFT" }),
      /* @__PURE__ */ jsx("p", { children: error })
    ] });
  }
  return /* @__PURE__ */ jsxs("main", { id: tyl.mint, children: [
    /* @__PURE__ */ jsxs(HelmetExport, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        "Mint NFT #",
        regexify(tokenId)
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Mint A ’Chievemint NFT" })
    ] }),
    /* @__PURE__ */ jsx(HomeLink, {}),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      (() => {
        if (metadata === null) {
          return /* @__PURE__ */ jsxs("p", { children: [
            "Token ",
            name,
            " does not exist."
          ] });
        } else if (!address) {
          return /* @__PURE__ */ jsxs("p", { children: [
            "Connect your wallet to distribute “",
            name,
            "” tokens…"
          ] });
        } else if (balance == null) {
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(ClockLoader, { color: "#36d7b7" }),
            /* @__PURE__ */ jsx("p", { children: "Loading Balance…" })
          ] });
        } else {
          return /* @__PURE__ */ jsxs("h1", { children: [
            "Mint up to ",
            balance,
            " “",
            name,
            "” tokens:"
          ] });
        }
      })(),
      /* @__PURE__ */ jsxs(Tabs, { children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: /* @__PURE__ */ jsx("span", { title: "Comma-Separated Values", children: "CSV" }) }),
          /* @__PURE__ */ jsx(Tab, { children: "Parsed" })
        ] }),
        /* @__PURE__ */ jsxs(TabPanel, { children: [
          /* @__PURE__ */ jsx("label", { children: "Comma, Space, or Semicolon Separated ETH or ENS Addresses:" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              placeholder: "Enter space, semicolon, or comma separated eth addresses.",
              value: raw,
              onChange: ({ target: { value } }) => {
                setRaw(value);
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx("ol", { children: addresses.map((addr, idx) => /* @__PURE__ */ jsx("li", { children: addr }, idx)) }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: tyl.actions, children: [
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { children: "Mint" }),
          /* @__PURE__ */ jsx("input", { type: "radio", name: "op", value: "mint", checked: true })
        ] }),
        /* @__PURE__ */ jsxs("label", { children: [
          /* @__PURE__ */ jsx("span", { className: "strike", children: "Whitelist" }),
          /* @__PURE__ */ jsx("input", { type: "radio", name: "op", value: "whitelist", disabled: true })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "action", children: !rwContract ? /* @__PURE__ */ jsx("button", { type: "button", onClick: connect, className: "full", children: "Connect" }) : /* @__PURE__ */ jsx("button", { className: "full", children: "Mint" }) })
    ] })
  ] });
};
export {
  Disburse as default
};
//# sourceMappingURL=disburse-76328b2b.js.map
