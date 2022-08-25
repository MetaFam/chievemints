import { r as react, j as jsxs, a as jsx, c as chakra, u as useSearchParams, d as defaults, b as useNavigate, e as useWeb3, f as createSearchParams, H as HelmetExport } from "./index.80cd6793.js";
import { F as Flex, S as Stack, T as Text, t as toSpanList, e as extractMessage, h as httpURL, l as lib, C as Container, a as TokensTable } from "./LinkedSVG.14b04039.js";
import { H as Header } from "./Header.1d7d0842.js";
import { u as useForm, I as Input, C as Controller } from "./index.esm.324865b1.js";
import { C as Checkbox } from "./chakra-ui-checkbox.esm.b6fb89bc.js";
import { F as FormControl, a as FormLabel, B as Button } from "./chakra-ui-form-control.esm.c0acd08e.js";
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
    constsContract
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
    if (roContract && constsContract) {
      roContract.typeSupply().then((supply) => supply.toBigInt()).then(setTypeCount);
      constsContract.GATING_TYPE().then((type) => type.toBigInt()).then(setGATING_TYPE);
      constsContract.TYPE_WIDTH().then(setTYPE_WIDTH);
      constsContract.TYPE_BOUNDARY().then(setTYPE_BOUNDARY);
    }
  }, [roContract, constsContract]);
  react.exports.useEffect(() => {
    setVisibleList(toSpanList(visible));
  }, [visible]);
  const tokenForIndex = react.exports.useCallback(async ({
    index,
    idx,
    hideable = true
  }) => {
    if (TYPE_WIDTH == null || TYPE_BOUNDARY == null) {
      return null;
    }
    try {
      const id = (await roContract.tokenByIndex(index)).toBigInt();
      const gating = (id & 2n ** BigInt(TYPE_WIDTH) - 1n << BigInt(TYPE_BOUNDARY)) === GATING_TYPE;
      const is = {
        gating,
        hidden: hideable && gating && !gatingVisible
      };
      return setToken(idx, {
        id: `0x${id.toString(16)}`,
        is,
        index
      });
    } catch (error) {
      return setToken(idx, {
        error: extractMessage(error)
      });
    }
  }, [GATING_TYPE, TYPE_BOUNDARY, TYPE_WIDTH, gatingVisible, roContract, setToken]);
  const controller = react.exports.useRef(null);
  const retrieve = react.exports.useCallback(async (tokens2) => {
    controller.current?.abort();
    controller.current = new AbortController();
    return await Promise.allSettled(tokens2.map(async (token, idx) => {
      if (!(token instanceof Error)) {
        if (token.is?.hidden) {
          throw new Error("Token is hidden.");
        }
        try {
          const uri = await roContract.uri(token.id);
          if (uri === "")
            throw new Error("No URI\u2026 Waiting for configuration\u2026");
          setToken(idx, {
            uri
          });
          const response = await fetch(httpURL(uri), {
            signal: controller.current.signal
          });
          if (!response.ok) {
            throw new Error(`Request Status: ${response.status}`);
          }
          const data = await response.text();
          if (!data || data.trim() === "") {
            throw new Error("Aww, No Data. \u{1F63E}");
          }
          setToken(idx, {
            metadata: lib.parse(data)
          });
          roContract.totalSupply(token.id).then((total) => setToken(idx, {
            total
          }));
          roContract.getMax(token.id).then((max) => setToken(idx, {
            max
          }));
        } catch (error) {
          if (!(error instanceof DOMException)) {
            return setToken(idx, {
              error: extractMessage(error)
            });
          }
        }
      }
    }));
  }, [roContract, setToken]);
  react.exports.useEffect(() => {
    const load = async () => {
      if (roContract && constsContract && typeCount != null) {
        const generators = [];
        setTokens([]);
        if (visibleList.some(() => true)) {
          let count = 0;
          generators.push(...visibleList.map(async (elem) => {
            let {
              high,
              low
            } = elem;
            let sorted = [high, low];
            sorted = sorted.sort();
            [low, high] = sorted;
            if (!sorted.some((elem2) => elem2 != null)) {
              [high, low] = [elem, elem];
            }
            return await Promise.all(Array.from({
              length: high - low + 1
            }).map(async (_, idx) => await tokenForIndex({
              index: low + idx,
              idx: count++,
              hideable: false
            })));
          }));
        } else {
          const start = offset < 0 ? Number(typeCount) + offset : offset;
          const count = Math.min(limit, Number(typeCount) - start);
          generators.push(...Array.from({
            length: count
          }).map(async (_, idx) => await tokenForIndex({
            index: start + idx + 1,
            idx
          })));
        }
        const tokens2 = (await Promise.all(generators)).flat();
        await retrieve(tokens2);
      }
    };
    load();
  }, [visibleList, retrieve, roContract, constsContract, limit, offset, tokenForIndex, typeCount]);
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
          })]
        })]
      })
    })]
  });
};
export {
  Home as default
};
//# sourceMappingURL=home.8b071b0b.js.map
