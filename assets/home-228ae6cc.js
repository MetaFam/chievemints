import { j as jsx, a as jsxs, F as Fragment, L as Link, C as ClimbingBoxLoader, r as reactExports, u as useSearchParams, d as defaults, b as useNavigate, c as useWeb3, e as createSearchParams, H as HelmetExport } from "./index-d6a2095c.js";
import { r as regexify, e as extractMessage, h as httpURL, t as tffs, a as toSpanList, l as lib } from "./TokenFilterForm.module-3a2b00d1.js";
import { T as Tippy, H as Header } from "./Header-86a51e5b.js";
import { R as ReactMarkdown } from "./react-markdown-0fcfadda.js";
import { u as useForm, C as Controller } from "./index.esm-e76e7df6.js";
import "./_commonjsHelpers-1bd4c8e6.js";
class HiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "HiddenError";
  }
}
const Index = ({ token }) => /* @__PURE__ */ jsx("div", { className: "index", children: /* @__PURE__ */ jsx(
  Tippy,
  {
    content: token.id != null ? regexify(token.id) : "𝚄𝚗𝚔𝚗𝚘𝚠𝚗",
    children: /* @__PURE__ */ jsxs("p", { className: "content", children: [
      /* @__PURE__ */ jsx("span", { children: token.index }),
      token.gates != null && /* @__PURE__ */ jsxs("span", { title: `Controls Token #${token.gates}`, children: [
        "(",
        token.gates === 0 ? "all" : token.gates,
        ")"
      ] }),
      token.is?.disabling && /* @__PURE__ */ jsx("span", { children: "(disabled)" })
    ] })
  }
) });
const Error$1 = ({ token }) => /* @__PURE__ */ jsx("div", { className: "error", children: /* @__PURE__ */ jsx("p", { className: "content", children: extractMessage(token.error) }) });
const Loading = ({ label = "Loading Metadata…", ...props }) => /* @__PURE__ */ jsx("div", { className: "loading", children: /* @__PURE__ */ jsx("p", { className: "content", ...props, children: label }) });
const Finding = ({ label = "Finding Metadata…", ...props }) => /* @__PURE__ */ jsx("div", { className: "finding", children: /* @__PURE__ */ jsx("p", { className: "content", ...props, children: label }) });
const Image = ({ token }) => /* @__PURE__ */ jsx("div", { className: "img", style: { "--img-bg": `#${token.metadata.background_color}` }, children: /* @__PURE__ */ jsx(Link, { to: `/view/${regexify(token.id)}`, className: "content", children: token.metadata?.image && /* @__PURE__ */ jsx(
  "img",
  {
    src: httpURL(token.metadata.image) ?? void 0,
    alt: token.metadata?.name ?? "Untitled"
  }
) }) });
const Description = ({ token }) => /* @__PURE__ */ jsxs("div", { className: "text", children: [
  /* @__PURE__ */ jsx("div", { className: "title", children: /* @__PURE__ */ jsxs("h2", { className: "content", children: [
    token.metadata?.name ?? /* @__PURE__ */ jsx("em", { children: "Untitled" }),
    token.gates == null ? "" : token.gates === 0 ? " for all tokens" : /* @__PURE__ */ jsxs(Fragment, { children: [
      " ",
      "for",
      " ",
      /* @__PURE__ */ jsxs(Link, { to: `/view/${token.gates}`, children: [
        "#",
        token.gates
      ] })
    ] })
  ] }) }),
  /* @__PURE__ */ jsxs("div", { className: "desc", children: [
    token.is?.disabling && /* @__PURE__ */ jsxs("p", { className: "content", children: [
      "This token ",
      /* @__PURE__ */ jsx("b", { children: "disables" }),
      " the following permission for",
      " ",
      /* @__PURE__ */ jsxs(Link, { to: `/view/i:${token.gates}`, children: [
        "the token at index #",
        token.gates
      ] }),
      ":"
    ] }),
    token.is?.gating && /* @__PURE__ */ jsxs("p", { className: "content", children: [
      "This token gives holders the following permission for",
      " ",
      token.gates === 0 ? "all tokens" : /* @__PURE__ */ jsxs(Link, { to: `/view/${token.gates}`, children: [
        "the token at index #",
        token.gates
      ] }),
      ":"
    ] }),
    /* @__PURE__ */ jsx(ReactMarkdown, { linkTarget: "_blank", className: "content", children: token.is?.disabling || token.is?.gating ? `> ${token.metadata.description.replace(/\n/g, "\n> ")}` : token.metadata?.description ?? "*No Description*" })
  ] })
] });
const LinkLink = ({ token }) => /* @__PURE__ */ jsx("div", { className: "homepage", children: token.metadata?.external_url && /* @__PURE__ */ jsx(Tippy, { content: token.metadata.external_url, children: /* @__PURE__ */ jsx(
  "a",
  {
    className: "content",
    href: token.metadata.external_url,
    target: "_blank",
    rel: "noreferrer",
    children: "🌐"
  }
) }) });
const URI = ({ token }) => token.uri && /* @__PURE__ */ jsx("nav", { className: "metainfo", children: /* @__PURE__ */ jsxs("ul", { children: [
  /* @__PURE__ */ jsx("li", { className: "source", children: /* @__PURE__ */ jsx(Tippy, { content: token.uri, children: /* @__PURE__ */ jsx(
    "a",
    {
      className: "content",
      href: httpURL(token.uri) ?? void 0,
      target: "_blank",
      rel: "noreferrer",
      children: "🔗"
    }
  ) }) }),
  /* @__PURE__ */ jsx("li", { className: "clipboard", children: /* @__PURE__ */ jsx(Tippy, { content: "Copy to Clipboard", children: /* @__PURE__ */ jsx(
    "button",
    {
      className: "content",
      onClick: () => {
        if (token.uri && window.isSecureContext) {
          navigator?.clipboard?.writeText(token.uri);
        }
      },
      children: "📋"
    }
  ) }) })
] }) });
const Total = ({ token }) => {
  const label = `${token.total?.toString()} minted of ${token.max?.toString()} total`;
  return /* @__PURE__ */ jsx("div", { className: "quantity", children: /* @__PURE__ */ jsx(Link, { to: `/owners/${regexify(token.id)}`, className: "content", children: /* @__PURE__ */ jsx(Tippy, { content: label, children: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("sup", { children: token.total?.toString() ?? /* @__PURE__ */ jsx(ClimbingBoxLoader, { size: 4, color: "#FE0235" }) }),
    "⁄",
    /* @__PURE__ */ jsx("sub", { children: Number(token.max) < 0 ? "∞" : token.max?.toString() ?? /* @__PURE__ */ jsx(ClimbingBoxLoader, { size: 4, color: "#EF2299" }) })
  ] }) }) }) });
};
const Actions = ({ token }) => {
  const id = regexify(token.id);
  return /* @__PURE__ */ jsx("nav", { className: "actions", children: /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { className: "edit", children: /* @__PURE__ */ jsx(Tippy, { content: "Edit Metadata", children: /* @__PURE__ */ jsx(Link, { to: `/edit/${id}`, className: "content", children: "✏️" }) }) }),
    /* @__PURE__ */ jsx("li", { className: "view", children: /* @__PURE__ */ jsx(Tippy, { content: "View This NFT", children: /* @__PURE__ */ jsx(Link, { to: `/view/${id}`, className: "content", children: "👁" }) }) }),
    /* @__PURE__ */ jsx("li", { className: "disburse", children: /* @__PURE__ */ jsx(Tippy, { content: "Disburse This NFT", children: /* @__PURE__ */ jsx(Link, { to: `/disburse/${id}`, className: "content", children: "💸" }) }) })
  ] }) });
};
const TokensTable = ({ tokens }) => /* @__PURE__ */ jsx("section", { id: "tokens", children: tokens.map((token, index) => {
  if (token.is?.hidden) {
    return null;
  }
  return /* @__PURE__ */ jsxs("article", { className: "token", children: [
    /* @__PURE__ */ jsx(Index, { ...{ token, index } }),
    (() => {
      if (token.error) {
        return /* @__PURE__ */ jsx(Error$1, { ...{ token } });
      }
      if (!token.metadata) {
        return !token.uri ? /* @__PURE__ */ jsx(Finding, {}) : /* @__PURE__ */ jsx(Loading, {});
      }
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Image, { ...{ token } }),
        /* @__PURE__ */ jsx(Description, { ...{ token } }),
        /* @__PURE__ */ jsx(LinkLink, { ...{ token } })
      ] });
    })(),
    /* @__PURE__ */ jsx(URI, { ...{ token } }),
    /* @__PURE__ */ jsx(Total, { ...{ token } }),
    /* @__PURE__ */ jsx(Actions, { ...{ token } })
  ] }, index);
}) });
const TokenFilterForm = ({
  limit = 10,
  setLimit,
  offset = 0,
  setOffset,
  gatingVisible = false,
  setGatingVisible,
  visibleList,
  setVisibleList,
  ...props
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue
  } = useForm();
  reactExports.useEffect(() => {
    setValue("limit", limit);
    setValue("offset", offset);
    setValue("visible", visibleList.toString());
    setValue("gatingVisible", gatingVisible);
  }, [limit, offset, visibleList, gatingVisible, setValue]);
  const submit = async (data) => {
    setLimit(Number(data.limit));
    setOffset(Number(data.offset));
    setGatingVisible(data.gatingVisible);
    setVisibleList(toSpanList(data.visible));
  };
  return /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit(submit),
      id: tffs.form,
      ...props,
      children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Offset" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Size of the offset.",
              ...register("offset")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Limit" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              placeholder: "Number of tokens to display.",
              ...register("limit")
            }
          )
        ] }),
        /* @__PURE__ */ jsx("span", { className: "sep", children: "or" }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Visible List" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              placeholder: "Comma, space and dash separated list of indices.",
              ...register("visible")
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Controller,
          {
            ...{ control },
            name: "gatingVisible",
            defaultValue: gatingVisible,
            render: ({ field: { onChange, value: checked, ref } }) => /* @__PURE__ */ jsxs("label", { id: "perms", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  ...{ checked, onChange, ref }
                }
              ),
              /* @__PURE__ */ jsx("span", { children: "Show Permission Tokens" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx("button", { children: "View" })
      ]
    }
  ) });
};
const home = "";
const Home = () => {
  const [tokens, setTokens] = reactExports.useState([]);
  const [query] = useSearchParams();
  const [limit, setLimit] = reactExports.useState(Number(query.get("limit") ?? defaults.limit));
  const [offset, setOffset] = reactExports.useState(Number(query.get("offset") ?? defaults.offset));
  const [gatingVisible, setGatingVisible] = reactExports.useState(query.get("gating") === "true");
  const visible = query.get("visible") ?? defaults.visible;
  const [visibleList, setVisibleList] = reactExports.useState(toSpanList(visible));
  const navigate = useNavigate();
  const { roContract, bitsLibrary } = useWeb3();
  const setToken = reactExports.useCallback(
    (idx, info) => {
      let token;
      setTokens((tkns) => {
        token = { ...tkns[idx], ...info };
        return [
          ...tkns.slice(0, idx),
          ...Array.from({ length: idx - tkns.length }, () => ({})),
          token,
          ...tkns.slice(idx + 1)
        ];
      });
      return token;
    },
    [setTokens]
  );
  const [typeCount, setTypeCount] = reactExports.useState(null);
  const [GATING_TYPE, setGATING_TYPE] = reactExports.useState(null);
  const [DISABLING_TYPE, setDISABLING_TYPE] = reactExports.useState(null);
  const [TYPE_WIDTH, setTYPE_WIDTH] = reactExports.useState(null);
  const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const params = {};
    if (visibleList?.length > 0) {
      Object.assign(params, {
        visible: visibleList.toString()
      });
    } else {
      Object.entries({ limit, offset, gating: gatingVisible }).forEach(
        ([key, val]) => {
          if (val !== defaults[key]) {
            Object.assign(params, { [key]: val.toString() });
          }
        }
      );
    }
    const options = { search: `?${createSearchParams(params)}` };
    navigate(options, { replace: true });
  }, [visibleList, limit, offset, gatingVisible, navigate]);
  reactExports.useEffect(() => {
    if (roContract && bitsLibrary) {
      roContract.typeSupply().then((supply) => supply.toBigInt()).then(setTypeCount);
      bitsLibrary.GATING_TYPE().then((type) => type.toBigInt()).then(setGATING_TYPE);
      bitsLibrary.DISABLING_TYPE().then((type) => type.toBigInt()).then(setDISABLING_TYPE);
      bitsLibrary.TYPE_WIDTH().then(setTYPE_WIDTH);
      bitsLibrary.TYPE_BOUNDARY().then(setTYPE_BOUNDARY);
    }
  }, [roContract, bitsLibrary]);
  reactExports.useEffect(() => {
    setVisibleList(toSpanList(visible));
  }, [visible]);
  const controller = reactExports.useRef(null);
  const retrieve = reactExports.useCallback(
    async (tokens2) => {
      controller.current?.abort();
      controller.current = new AbortController();
      setTokens([]);
      return await Promise.allSettled(
        tokens2.map(async (token, idx) => {
          try {
            const id = token.id ?? (await roContract.tokenByIndex(token.index)).toBigInt();
            const type = id & 2n ** BigInt(TYPE_WIDTH) - 1n << BigInt(TYPE_BOUNDARY);
            const gating = token.is?.gating ?? type === GATING_TYPE;
            const disabling = token.is?.disabling ?? type === (GATING_TYPE | DISABLING_TYPE);
            const gates = token.gates ?? (gating || disabling ? Number(2n ** 32n - 1n & id) : null);
            const is = {
              gating,
              disabling,
              hidden: token.hidable != false && (gating || disabling) && !gatingVisible
            };
            setToken(
              idx,
              {
                id: `0x${id.toString(16)}`,
                index: token.index,
                gates,
                is
              }
            );
            if (is.hidden) {
              throw new HiddenError("Token is hidden.");
            }
            const responses = await Promise.allSettled([
              (async () => {
                const uri = token.uri ?? await roContract.uri(id);
                if (uri === "") {
                  throw new Error("No URI… Waiting for configuration…");
                }
                setToken(idx, { uri });
                const response = await fetch(
                  httpURL(uri),
                  { signal: controller.current.signal }
                );
                if (!response.ok) {
                  throw new Error(`Request Status: ${response.status}`);
                }
                let body;
                try {
                  body = await response.text();
                  setToken(idx, { metadata: lib.parse(body) });
                } catch (error2) {
                  console.debug({ error: error2, body });
                }
              })(),
              (async () => {
                const supply = await roContract.totalSupply(id);
                setToken(idx, { total: supply.toBigInt() });
              })(),
              (async () => {
                const max = await roContract.getMax(id);
                setToken(idx, { max: max.toBigInt() });
              })()
            ]);
            const [{ reason: error } = { reason: null }] = responses.filter((res) => res.status === "rejected");
            if (error)
              throw new Error(error);
          } catch (error) {
            if (!(error instanceof HiddenError)) {
              console.error({ error });
            }
            if (!(error instanceof DOMException)) {
              return setToken(idx, {
                error: extractMessage(error)
              });
            }
          }
        })
      );
    },
    [
      GATING_TYPE,
      TYPE_BOUNDARY,
      TYPE_WIDTH,
      DISABLING_TYPE,
      gatingVisible,
      roContract,
      setToken
    ]
  );
  reactExports.useEffect(() => {
    const load = async () => {
      if (roContract && bitsLibrary && typeCount != null && TYPE_WIDTH != null && TYPE_BOUNDARY != null && GATING_TYPE != null && DISABLING_TYPE != null) {
        const tokens2 = [];
        if (visibleList.some(() => true)) {
          visibleList.forEach(
            (elem) => {
              let { high, low } = elem;
              const sorted = [low, high] = [low, high].sort((a, b) => a - b);
              if (sorted.some((elem2) => elem2 == null)) {
                [high, low] = [elem, elem];
              }
              tokens2.push(...Array.from({ length: high - low + 1 }).map((_, idx) => ({
                index: low + idx,
                hidable: false
              })));
            }
          );
        } else {
          const start = offset < 0 ? Number(typeCount) + offset : offset;
          const count = Math.min(limit, Number(typeCount) - start);
          tokens2.push(
            ...Array.from({ length: count }).map((_, idx) => ({
              index: start + idx + 1
            }))
          );
        }
        await retrieve(tokens2);
      }
    };
    load();
  }, [
    visibleList,
    retrieve,
    roContract,
    bitsLibrary,
    limit,
    offset,
    typeCount,
    TYPE_WIDTH,
    TYPE_BOUNDARY,
    GATING_TYPE,
    DISABLING_TYPE
  ]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(HelmetExport, { children: [
      /* @__PURE__ */ jsx("title", { children: "𝔐𝔢𝔱𝔞𝔊𝔞𝔪𝔢’𝔰 ’𝘾𝙝𝙞𝙚𝙫𝙚𝙢𝙞𝙣𝙩𝙨" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "MetaGame’s ’Chievemint NFTs"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(
        TokenFilterForm,
        {
          ...{
            limit,
            setLimit,
            offset,
            setOffset,
            gatingVisible,
            setGatingVisible,
            visibleList,
            setVisibleList
          }
        }
      ),
      /* @__PURE__ */ jsx(TokensTable, { ...{ tokens } })
    ] }),
    /* @__PURE__ */ jsxs("footer", { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => {
            if (visibleList.length > 0) {
              const potentials = visibleList.map(
                (entry) => entry?.high ?? entry
              );
              const max = Math.max(...potentials);
              setVisibleList((vis) => [...vis, { low: max, high: max + 10 }]);
            } else {
              setLimit((lim) => lim + 10);
            }
          },
          children: [
            /* @__PURE__ */ jsx("span", { className: "bigNBold", children: "+" }),
            "10"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setOffset((off) => off + limit),
          children: [
            /* @__PURE__ */ jsx("span", { className: "biggerNBold", children: "↓" }),
            limit
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setOffset((off) => off - limit),
          children: [
            /* @__PURE__ */ jsx("span", { className: "biggerNBold", children: "↑" }),
            limit
          ]
        }
      )
    ] })
  ] });
};
export {
  Home as default
};
//# sourceMappingURL=home-228ae6cc.js.map
