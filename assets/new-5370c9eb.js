import { k as createAnimation, l as cssValue, r as reactExports, m as parseLengthAndUnit, a as jsxs, j as jsx, H as HelmetExport, c as useWeb3, u as useSearchParams, t as tokenPermissions, Q, n as rolePermissions } from "./index-d6a2095c.js";
import { u as useForm } from "./index.esm-e76e7df6.js";
import { H as Header, T as Tippy } from "./Header-86a51e5b.js";
import { O as OptionsForm } from "./MaxForm-99a1d55c.js";
import { e as extractMessage } from "./TokenFilterForm.module-3a2b00d1.js";
import { S as SubmitButton } from "./SubmitButton-73efc9e5.js";
import "./_commonjsHelpers-1bd4c8e6.js";
import "./ThreeDScene-c1755e95.js";
import "./react-markdown-0fcfadda.js";
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
var circle = createAnimation("CircleLoader", "0% {transform: rotate(0deg)} 50% {transform: rotate(180deg)} 100% {transform: rotate(360deg)}", "circle");
function CircleLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 50 : _f, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size"]);
  var wrapper = __assign({ display: "inherit", position: "relative", width: cssValue(size), height: cssValue(size) }, cssOverride);
  var style = function(i) {
    var _a2 = parseLengthAndUnit(size), value = _a2.value, unit = _a2.unit;
    return {
      position: "absolute",
      height: "".concat(value * (1 - i / 10)).concat(unit),
      width: "".concat(value * (1 - i / 10)).concat(unit),
      borderTop: "1px solid ".concat(color),
      borderBottom: "none",
      borderLeft: "1px solid ".concat(color),
      borderRight: "none",
      borderRadius: "100%",
      transition: "2s",
      top: "".concat(i * 0.7 * 2.5, "%"),
      left: "".concat(i * 0.35 * 2.5, "%"),
      animation: "".concat(circle, " ").concat(1 / speedMultiplier, "s ").concat(i * 0.2 / speedMultiplier, "s infinite linear")
    };
  };
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: style(0) }),
    reactExports.createElement("span", { style: style(1) }),
    reactExports.createElement("span", { style: style(2) }),
    reactExports.createElement("span", { style: style(3) }),
    reactExports.createElement("span", { style: style(4) })
  );
}
const admin = "_admin_jn32u_1";
const ns = {
  "new": "_new_jn32u_1",
  admin
};
const New = () => /* @__PURE__ */ jsxs("section", { children: [
  /* @__PURE__ */ jsx(HelmetExport, { children: /* @__PURE__ */ jsx("title", { children: "’𝖈𝖍𝖎𝖊𝖛𝖊: Ⲛⲉⲱ Ⲧⲟⲕⲉⲛ" }) }),
  /* @__PURE__ */ jsx(Header, {}),
  /* @__PURE__ */ jsx(Content, {})
] });
const Content = () => {
  const {
    ensProvider,
    roContract,
    rwContract,
    rolesLibrary,
    connecting,
    connect,
    chain,
    address
  } = useWeb3();
  const [search, setSearch] = useSearchParams({ tokenId: "" });
  const id = search.get("tokenId");
  const [tokenId, setTokenId] = reactExports.useState(Array.isArray(id) ? id[0] : id);
  const [roles, setRoles] = reactExports.useState(tokenPermissions);
  const [working, setWorking] = reactExports.useState(false);
  const { register, handleSubmit } = useForm();
  reactExports.useEffect(() => {
    if (typeof id === "string") {
      setTokenId(id);
    }
  }, [id]);
  reactExports.useEffect(() => {
  }, [roContract]);
  const reserve = reactExports.useCallback(async (data) => {
    setWorking(true);
    try {
      if (!rwContract) {
        throw new Error(
          "Connect your wallet to reserve an id."
        );
      }
      if (!rolesLibrary) {
        throw new Error("Library not loaded.");
      }
      const grants = [];
      const disables = [];
      await Promise.all(Object.entries(data).map(
        async ([key, value]) => {
          if (typeof value === "boolean" && value) {
            const [, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? [];
            const roleId = await rolesLibrary.roleIndexForName(role);
            switch (type) {
              case "grant": {
                grants.push(roleId);
                break;
              }
              case "disable": {
                disables.push(roleId);
                break;
              }
              default: {
                throw new Error(`Unknown operation: ${type}`);
              }
            }
          }
        }
      ));
      let { maintainer } = data;
      if (maintainer === "") {
        maintainer = address;
      }
      if (maintainer == null) {
        throw new Error("`maintainer` is not set.");
      }
      if (maintainer.includes(".")) {
        if (!ensProvider) {
          throw new Error("ENS provider not defined.");
        }
        maintainer = await ensProvider.resolveName(maintainer) ?? void 0;
      }
      const tx = await rwContract["create(address,uint8[],uint8[])"](
        maintainer,
        grants,
        disables
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(
        (evt) => evt.event === "Created"
      );
      if (!event) {
        throw new Error(
          "Couldn’t find a creation event."
        );
      }
      const [id2] = event.args;
      setTokenId(id2.toHexString());
    } catch (error) {
      Q.error(extractMessage(error));
      console.error(error.stack);
    } finally {
      setWorking(false);
    }
  }, [address, ensProvider, rolesLibrary, rwContract]);
  if (!rwContract || !tokenId || working) {
    return /* @__PURE__ */ jsxs("main", { id: ns.new, children: [
      /* @__PURE__ */ jsx("h1", { children: "Create a New Token Type" }),
      (() => {
        if (connecting) {
          return /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx(CircleLoader, { color: "#FF7301", size: 100 }),
            /* @__PURE__ */ jsx("h2", { children: "Connecting…" })
          ] });
        }
        if (working) {
          return /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx(CircleLoader, { color: "#6EA8FF", size: 100 }),
            /* @__PURE__ */ jsx("h2", { children: "Reserving your token…" })
          ] });
        }
        if (!tokenId) {
          return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(reserve), children: [
            /* @__PURE__ */ jsxs("label", { id: ns.admin, children: [
              /* @__PURE__ */ jsx("h2", { children: "Admin" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ...register("maintainer"),
                  placeholder: "Maintainer Address (default Creator)"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("table", { children: [
              /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("th", { children: "Role" }),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(Tippy, { content: "Give the admin these roles:", children: /* @__PURE__ */ jsx("span", { children: "Grant" }) }) }),
                /* @__PURE__ */ jsx("th", { children: /* @__PURE__ */ jsx(Tippy, { content: "Prevent these permissions from being checked:", children: /* @__PURE__ */ jsx("span", { children: "Disable" }) }) }),
                /* @__PURE__ */ jsx("th", { children: "Description" })
              ] }) }),
              /* @__PURE__ */ jsx("tbody", { children: roles.map((role, idx) => /* @__PURE__ */ jsxs("tr", { children: [
                /* @__PURE__ */ jsx("td", { children: role }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", { type: "checkbox", ...register(`grant(${role})`) }) }),
                /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("input", { type: "checkbox", ...register(`disable(${role})`) }) }),
                /* @__PURE__ */ jsx("td", { children: rolePermissions[role] })
              ] }, idx)) })
            ] }),
            /* @__PURE__ */ jsx(
              SubmitButton,
              {
                purpose: "create",
                label: "Reserve an ID",
                className: "full",
                requireStorage: false
              }
            )
          ] });
        }
        return /* @__PURE__ */ jsx("p", { children: "¿How’d we get here?" });
      })()
    ] });
  }
  return /* @__PURE__ */ jsx(OptionsForm, { ...{ tokenId } });
};
export {
  New,
  New as default
};
//# sourceMappingURL=new-5370c9eb.js.map
