import { r as react, j as jsxs, F as Flex, S as Stack, a as jsx, b as FormControl, c as FormLabel, I as Input, T as Text, d as chakra, B as Button, u as useSearchParams, e as defaults, f as useNavigate, g as useWeb3, h as createSearchParams, C as Container, H as HelmetExport } from "./index.6976bf7a.js";
import { t as toSpanList, h as httpURL, l as lib, e as extractMessage, T as TokensTable } from "./LinkedSVG.6239437b.js";
import { H as Header } from "./Header.8a2ebe00.js";
import { u as useForm, C as Controller } from "./index.esm.4255f118.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.8b252d73.js";
class HiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "HiddenError";
  }
}
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
  react.exports.useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Flex, {
    as: "form",
    onSubmit: handleSubmit(submit),
    mt: 10,
    mb: "1rem",
    maxW: ["100%", "min(85vw, 50em)"],
    direction: ["column", "row"],
    sx: {
      a: {
        textDecoration: "underline"
      }
    },
    ...props,
    children: [/* @__PURE__ */ jsxs(Stack, {
      flexGrow: 1,
      sx: {
        "&>*:not(style)~*:not(style)": {
          mt: 0.5
        },
        label: {
          _after: {
            content: '":"'
          },
          mt: 1.5,
          mr: 1,
          fontSize: "110%"
        }
      },
      children: [/* @__PURE__ */ jsx(FormControl, {
        children: /* @__PURE__ */ jsxs(Flex, {
          align: "center",
          children: [/* @__PURE__ */ jsx(FormLabel, {
            children: "Limit"
          }), /* @__PURE__ */ jsx(Input, {
            type: "number",
            placeholder: "Number of tokens to display.",
            ...register("limit")
          })]
        })
      }), /* @__PURE__ */ jsx(FormControl, {
        children: /* @__PURE__ */ jsxs(Flex, {
          align: "center",
          children: [/* @__PURE__ */ jsx(FormLabel, {
            children: "Offset"
          }), /* @__PURE__ */ jsx(Input, {
            type: "number",
            placeholder: "Number of tokens offset from Token 1.",
            ...register("offset")
          })]
        })
      }), /* @__PURE__ */ jsx(Text, {
        textAlign: "center",
        children: "or"
      }), /* @__PURE__ */ jsx(FormControl, {
        children: /* @__PURE__ */ jsxs(Flex, {
          align: "center",
          children: [/* @__PURE__ */ jsx(FormLabel, {
            children: "Visible\xA0List"
          }), /* @__PURE__ */ jsx(Input, {
            placeholder: "Comma, space and dash separated list of indices.",
            ...register("visible")
          })]
        })
      })]
    }), /* @__PURE__ */ jsxs(Stack, {
      ml: 3,
      children: [/* @__PURE__ */ jsx(FormControl, {
        children: /* @__PURE__ */ jsx(Flex, {
          align: "center",
          my: 1,
          children: /* @__PURE__ */ jsx(Controller, {
            control,
            name: "gatingVisible",
            defaultValue: gatingVisible,
            render: ({
              field: {
                onChange,
                value,
                ref
              }
            }) => /* @__PURE__ */ jsxs(Checkbox, {
              onChange,
              ref,
              isChecked: value,
              children: ["View", /* @__PURE__ */ jsx(chakra.br, {}), "Permission", /* @__PURE__ */ jsx(chakra.br, {}), "Tokens"]
            })
          })
        })
      }), /* @__PURE__ */ jsx(Button, {
        type: "submit",
        colorScheme: "purple",
        children: "View"
      })]
    })]
  });
};
const Home = () => {
  const [tokens, setTokens] = react.exports.useState([]);
  const [query] = useSearchParams();
  const [limit, setLimit] = react.exports.useState(Number(query.get("limit") ?? defaults.limit));
  const [offset, setOffset] = react.exports.useState(Number(query.get("offset") ?? defaults.offset));
  const [gatingVisible, setGatingVisible] = react.exports.useState(query.get("gating") === "true");
  const visible = query.get("visible") ?? defaults.visible;
  const [visibleList, setVisibleList] = react.exports.useState(toSpanList(visible));
  const navigate = useNavigate();
  const {
    roContract,
    bitsLibrary
  } = useWeb3();
  const setToken = react.exports.useCallback((idx, info) => {
    let token;
    setTokens((tkns) => {
      token = {
        ...tkns[idx],
        ...info
      };
      return [...tkns.slice(0, idx), ...Array.from({
        length: idx - tkns.length
      }, () => ({})), token, ...tkns.slice(idx + 1)];
    });
    return token;
  }, [setTokens]);
  const [typeCount, setTypeCount] = react.exports.useState(null);
  const [GATING_TYPE, setGATING_TYPE] = react.exports.useState(null);
  const [DISABLING_TYPE, setDISABLING_TYPE] = react.exports.useState(null);
  const [TYPE_WIDTH, setTYPE_WIDTH] = react.exports.useState(null);
  const [TYPE_BOUNDARY, setTYPE_BOUNDARY] = react.exports.useState(null);
  react.exports.useEffect(() => {
    const params = {};
    if (visibleList?.length > 0) {
      Object.assign(params, {
        visible: visibleList.toString()
      });
    } else {
      Object.entries({
        limit,
        offset,
        gating: gatingVisible
      }).forEach(([key, val]) => {
        if (val !== defaults[key]) {
          Object.assign(params, {
            [key]: val.toString()
          });
        }
      });
    }
    const options = {
      search: `?${createSearchParams(params)}`
    };
    navigate(options, {
      replace: true
    });
  }, [visibleList, limit, offset, gatingVisible, navigate]);
  react.exports.useEffect(() => {
    if (roContract && bitsLibrary) {
      roContract.typeSupply().then((supply) => supply.toBigInt()).then(setTypeCount);
      bitsLibrary.GATING_TYPE().then((type) => type.toBigInt()).then(setGATING_TYPE);
      bitsLibrary.DISABLING_TYPE().then((type) => type.toBigInt()).then(setDISABLING_TYPE);
      bitsLibrary.TYPE_WIDTH().then(setTYPE_WIDTH);
      bitsLibrary.TYPE_BOUNDARY().then(setTYPE_BOUNDARY);
    }
  }, [roContract, bitsLibrary]);
  react.exports.useEffect(() => {
    setVisibleList(toSpanList(visible));
  }, [visible]);
  const controller = react.exports.useRef(null);
  const retrieve = react.exports.useCallback(async (tokens2) => {
    controller.current?.abort();
    controller.current = new AbortController();
    setTokens([]);
    return await Promise.allSettled(tokens2.map(async (token, idx) => {
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
        setToken(idx, {
          id: `0x${id.toString(16)}`,
          index: token.index,
          gates,
          is
        });
        if (is.hidden) {
          throw new HiddenError("Token is hidden.");
        }
        const responses = await Promise.allSettled([(async () => {
          const uri = token.uri ?? await roContract.uri(id);
          if (uri === "") {
            throw new Error("No URI\u2026 Waiting for configuration\u2026");
          }
          setToken(idx, {
            uri
          });
          const response = await fetch(httpURL(uri), {
            signal: controller.current.signal
          });
          if (!response.ok) {
            throw new Error(`Request Status: ${response.status}`);
          }
          let body;
          try {
            body = await response.text();
            setToken(idx, {
              metadata: lib.parse(body)
            });
          } catch (error2) {
            console.debug({
              error: error2,
              body
            });
          }
        })(), (async () => {
          const supply = await roContract.totalSupply(id);
          setToken(idx, {
            total: supply.toBigInt()
          });
        })(), (async () => {
          const max = await roContract.getMax(id);
          setToken(idx, {
            max: max.toBigInt()
          });
        })()]);
        const [{
          reason: error
        } = {
          reason: null
        }] = responses.filter((res) => res.status === "rejected");
        if (error)
          throw new Error(error);
      } catch (error) {
        if (!(error instanceof HiddenError)) {
          console.error({
            error
          });
        }
        if (!(error instanceof DOMException)) {
          return setToken(idx, {
            error: extractMessage(error)
          });
        }
      }
    }));
  }, [GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH, DISABLING_TYPE, gatingVisible, roContract, setToken]);
  react.exports.useEffect(() => {
    const load = async () => {
      if (roContract && bitsLibrary && typeCount != null && TYPE_WIDTH != null && TYPE_BOUNDARY != null && GATING_TYPE != null && DISABLING_TYPE != null) {
        const tokens2 = [];
        if (visibleList.some(() => true)) {
          visibleList.forEach((elem) => {
            let {
              high,
              low
            } = elem;
            const sorted = [low, high] = [low, high].sort((a, b) => a - b);
            if (sorted.some((elem2) => elem2 == null)) {
              [high, low] = [elem, elem];
            }
            tokens2.push(...Array.from({
              length: high - low + 1
            }).map((_, idx) => ({
              index: low + idx,
              hidable: false
            })));
          });
        } else {
          const start = offset < 0 ? Number(typeCount) + offset : offset;
          const count = Math.min(limit, Number(typeCount) - start);
          tokens2.push(...Array.from({
            length: count
          }).map((_, idx) => ({
            index: start + idx + 1
          })));
        }
        await retrieve(tokens2);
      }
    };
    load();
  }, [visibleList, retrieve, roContract, bitsLibrary, limit, offset, typeCount, TYPE_WIDTH, TYPE_BOUNDARY, GATING_TYPE, DISABLING_TYPE]);
  return /* @__PURE__ */ jsxs(Container, {
    maxW: "full",
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsx("title", {
        children: "\u{1D510}\u{1D522}\u{1D531}\u{1D51E}\u{1D50A}\u{1D51E}\u{1D52A}\u{1D522}\u2019\u{1D530} \u2019\u{1D63E}\u{1D65D}\u{1D65E}\u{1D65A}\u{1D66B}\u{1D65A}\u{1D662}\u{1D65E}\u{1D663}\u{1D669}\u{1D668}"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "MetaGame\u2019s \u2019Chievemint NFTs"
      })]
    }), /* @__PURE__ */ jsx(chakra.header, {
      h: "45vh",
      children: /* @__PURE__ */ jsx(Flex, {
        maxW: "40rem",
        margin: "auto",
        children: /* @__PURE__ */ jsx(Header, {
          mt: "5vh",
          h: "40vh"
        })
      })
    }), /* @__PURE__ */ jsx(chakra.main, {
      children: /* @__PURE__ */ jsxs(Stack, {
        align: "center",
        children: [/* @__PURE__ */ jsx(TokenFilterForm, {
          flexGrow: 1,
          limit,
          setLimit,
          offset,
          setOffset,
          gatingVisible,
          setGatingVisible,
          visibleList,
          setVisibleList
        }), /* @__PURE__ */ jsx(TokensTable, {
          tokens
        }), /* @__PURE__ */ jsxs(Flex, {
          justify: "center",
          children: [/* @__PURE__ */ jsxs(Button, {
            onClick: () => {
              if (visibleList.length > 0) {
                const potentials = visibleList.map((entry) => entry?.high ?? entry);
                const max = Math.max(...potentials);
                setVisibleList((vis) => [...vis, {
                  low: max,
                  high: max + 10
                }]);
              } else {
                setLimit((lim) => lim + 10);
              }
            },
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 1,
              mt: -0.5,
              fontSize: "150%",
              fontWeight: "bold",
              children: "+"
            }), "10"]
          }), /* @__PURE__ */ jsxs(Button, {
            ml: 5,
            onClick: () => setOffset((off) => off + limit),
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 0.75,
              mt: -1,
              fontSize: "200%",
              fontWeight: "bold",
              children: "\u2193"
            }), limit]
          }), /* @__PURE__ */ jsxs(Button, {
            ml: 5,
            onClick: () => setOffset((off) => off - limit),
            children: [/* @__PURE__ */ jsx(Text, {
              as: "span",
              mr: 0.75,
              mt: -1,
              fontSize: "200%",
              fontWeight: "bold",
              children: "\u2191"
            }), limit]
          })]
        })]
      })
    })]
  });
};
export {
  Home as default
};
//# sourceMappingURL=home.0ed34f06.js.map
