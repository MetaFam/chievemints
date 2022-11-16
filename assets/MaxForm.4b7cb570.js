import { i as forwardRef, x as omit, r as react, d as chakra, a5 as useSafeLayoutEffect, a as jsx, k as useMultiStyleConfig, o as omitThemingProps, af as split, ag as layoutPropNames, ah as useFormControl, ai as mergeWith, a7 as dataAttr, m as cx, g as useWeb3, f as useNavigate, aj as useConfig, j as jsxs, S as Stack, Y as Box, I as Input, ak as createIcon, z as Fragment, al as nftBase, am as UnorderedList, an as ListItem, b as FormControl, F as Flex, c as FormLabel, ao as SimpleGrid, R as React, ac as Center, B as Button, Z as Link, T as Text, X as Spinner } from "./index.6976bf7a.js";
import { j as isSet, k as ipfsify, m as isEmpty, r as regexify, e as extractMessage, l as lib, a as Tooltip, h as httpURL, R as ReactMarkdown, b as Table, c as Thead, d as Tr, f as Th, g as Tbody, i as Td } from "./LinkedSVG.6239437b.js";
import { u as useForm } from "./index.esm.4255f118.js";
import { T as Tabs, a as TabList, b as Tab, c as TabPanels, d as TabPanel, R as RadioGroup, e as Radio, f as Textarea } from "./chakra-ui-textarea.esm.f3059553.js";
import { S as SubmitButton } from "./SubmitButton.e09300ae.js";
import { u as useToast } from "./chakra-ui-toast.esm.0b3cba0c.js";
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function useImage(props) {
  var loading = props.loading, src = props.src, srcSet = props.srcSet, onLoad = props.onLoad, onError = props.onError, crossOrigin = props.crossOrigin, sizes = props.sizes, ignoreFallback = props.ignoreFallback;
  var _useState = react.exports.useState("pending"), status = _useState[0], setStatus = _useState[1];
  react.exports.useEffect(function() {
    setStatus(src ? "loading" : "pending");
  }, [src]);
  var imageRef = react.exports.useRef();
  var load = react.exports.useCallback(function() {
    if (!src)
      return;
    flush();
    var img = new Image();
    img.src = src;
    if (crossOrigin)
      img.crossOrigin = crossOrigin;
    if (srcSet)
      img.srcset = srcSet;
    if (sizes)
      img.sizes = sizes;
    if (loading)
      img.loading = loading;
    img.onload = function(event) {
      flush();
      setStatus("loaded");
      onLoad == null ? void 0 : onLoad(event);
    };
    img.onerror = function(error) {
      flush();
      setStatus("failed");
      onError == null ? void 0 : onError(error);
    };
    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);
  var flush = function flush2() {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };
  useSafeLayoutEffect(function() {
    if (ignoreFallback)
      return void 0;
    if (status === "loading") {
      load();
    }
    return function() {
      flush();
    };
  }, [status, load, ignoreFallback]);
  return ignoreFallback ? "loaded" : status;
}
var _excluded$1 = ["htmlWidth", "htmlHeight", "alt"], _excluded2$1 = ["fallbackSrc", "fallback", "src", "srcSet", "align", "fit", "loading", "ignoreFallback", "crossOrigin"];
var NativeImage = /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
  var htmlWidth = props.htmlWidth, htmlHeight = props.htmlHeight, alt = props.alt, rest = _objectWithoutPropertiesLoose$1(props, _excluded$1);
  return /* @__PURE__ */ jsx("img", {
    width: htmlWidth,
    height: htmlHeight,
    ref,
    alt,
    ...rest
  });
});
var Image$1 = /* @__PURE__ */ forwardRef(function(props, ref) {
  var fallbackSrc = props.fallbackSrc, fallback = props.fallback, src = props.src, srcSet = props.srcSet, align = props.align, fit = props.fit, loading = props.loading, ignoreFallback = props.ignoreFallback, crossOrigin = props.crossOrigin, rest = _objectWithoutPropertiesLoose$1(props, _excluded2$1);
  var shouldIgnore = loading != null || ignoreFallback || fallbackSrc === void 0 && fallback === void 0;
  var status = useImage(_extends$1({}, props, {
    ignoreFallback: shouldIgnore
  }));
  var shared = _extends$1({
    ref,
    objectFit: fit,
    objectPosition: align
  }, shouldIgnore ? rest : omit(rest, ["onError", "onLoad"]));
  if (status !== "loaded") {
    if (fallback)
      return fallback;
    return /* @__PURE__ */ react.exports.createElement(chakra.img, _extends$1({
      as: NativeImage,
      className: "chakra-image__placeholder",
      src: fallbackSrc
    }, shared));
  }
  return /* @__PURE__ */ react.exports.createElement(chakra.img, _extends$1({
    as: NativeImage,
    src,
    srcSet,
    crossOrigin,
    loading,
    className: "chakra-image"
  }, shared));
});
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded = ["children", "placeholder", "className"], _excluded2 = ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"], _excluded3 = ["children"];
var SelectField = /* @__PURE__ */ forwardRef(function(props, ref) {
  var children = props.children, placeholder = props.placeholder, className = props.className, rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /* @__PURE__ */ react.exports.createElement(chakra.select, _extends({}, rest, {
    ref,
    className: cx("chakra-select", className)
  }), placeholder && /* @__PURE__ */ jsx("option", {
    value: "",
    children: placeholder
  }), children);
});
var Select = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Select", props);
  var _omitThemingProps = omitThemingProps(props), rootProps = _omitThemingProps.rootProps, placeholder = _omitThemingProps.placeholder, icon = _omitThemingProps.icon, color = _omitThemingProps.color, height = _omitThemingProps.height, h = _omitThemingProps.h, minH = _omitThemingProps.minH, minHeight = _omitThemingProps.minHeight, iconColor = _omitThemingProps.iconColor, iconSize = _omitThemingProps.iconSize;
  _omitThemingProps.isFullWidth;
  var rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded2);
  var _split = split(rest, layoutPropNames), layoutProps = _split[0], otherProps = _split[1];
  var ownProps = useFormControl(otherProps);
  var rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color
  };
  var fieldStyles = mergeWith({
    paddingEnd: "2rem"
  }, styles.field, {
    _focus: {
      zIndex: "unset"
    }
  });
  return /* @__PURE__ */ react.exports.createElement(
    chakra.div,
    _extends({
      className: "chakra-select__wrapper",
      __css: rootStyles
    }, layoutProps, rootProps),
    /* @__PURE__ */ jsx(SelectField, {
      ref,
      height: h != null ? h : height,
      minH: minH != null ? minH : minHeight,
      placeholder,
      ...ownProps,
      __css: fieldStyles,
      children: props.children
    }),
    /* @__PURE__ */ jsx(SelectIcon, {
      "data-disabled": dataAttr(ownProps.disabled),
      ...(iconColor || color) && {
        color: iconColor || color
      },
      __css: styles.icon,
      ...iconSize && {
        fontSize: iconSize
      },
      children: icon
    })
  );
});
var DefaultIcon = function DefaultIcon2(props) {
  return /* @__PURE__ */ jsx("svg", {
    viewBox: "0 0 24 24",
    ...props,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
    })
  });
};
var IconWrapper = chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)"
  }
});
var SelectIcon = function SelectIcon2(props) {
  var _props$children = props.children, children = _props$children === void 0 ? /* @__PURE__ */ jsx(DefaultIcon, {}) : _props$children, rest = _objectWithoutPropertiesLoose(props, _excluded3);
  var clone = /* @__PURE__ */ react.exports.cloneElement(children, {
    role: "presentation",
    className: "chakra-select__icon",
    focusable: false,
    "aria-hidden": true,
    style: {
      width: "1em",
      height: "1em",
      color: "currentColor"
    }
  });
  return /* @__PURE__ */ jsx(IconWrapper, {
    ...rest,
    className: "chakra-select__icon-wrapper",
    children: /* @__PURE__ */ react.exports.isValidElement(children) ? clone : null
  });
};
const OptionsForm = ({
  purpose = "create",
  tokenId,
  metadata: incomingData,
  metaURI: incomingURI
}) => {
  const FIELD_FORM = 0;
  const URI_FORM = 1;
  const JSON5_FORM = 2;
  const {
    rwContract
  } = useWeb3();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {
      isSubmitting: processing
    }
  } = useForm();
  const [tab, setTab] = react.exports.useState(FIELD_FORM);
  const toast = useToast();
  const {
    storage
  } = useConfig();
  const metadata = watch("metadata");
  const json5 = watch("json5");
  const uri = watch("uri");
  react.exports.useEffect(() => {
    if (purpose === "update") {
      setValue("metadata", incomingData);
    }
  }, [setValue, purpose, incomingData]);
  const buildMeta = react.exports.useCallback(async (data) => {
    const {
      name,
      description,
      homepage,
      color,
      images,
      animation,
      attributes
    } = data;
    const metadata2 = {
      name: isSet(name) ? name : "\u{1D650}\u{1D663}\u{1D669}\u{1D65E}\u{1D669}\u{1D661}\u{1D65A}\u{1D659}",
      decimals: 0
    };
    if (isSet(description)) {
      metadata2.description = description;
    }
    if (isSet(homepage)) {
      metadata2.external_url = homepage;
    }
    if (Array.isArray(images) && images.some((img) => img != null)) {
      metadata2.image = await ipfsify({
        filesOrURL: images,
        storage
      });
    } else if (!Array.isArray(images)) {
      console.warn(`Unknown Image Type: ${typeof images}`);
    }
    if (animation instanceof File || typeof animation === "string") {
      metadata2.animation_url = await ipfsify({
        filesOrURL: animation,
        storage
      });
    } else if (animation != null) {
      console.warn(`Unknown Animation Type: ${typeof animation}`);
    }
    if (color?.startsWith("#")) {
      metadata2.background_color = color.substring(1).toUpperCase();
    }
    if (isSet(attributes) && !isEmpty(attributes)) {
      metadata2.attributes = attributes.map(({
        name: name2,
        value,
        type
      }) => {
        const attr = {
          trait_type: name2,
          value
        };
        if (type !== "string") {
          attr.display_type = type;
        }
        return attr;
      });
    }
    return metadata2;
  }, [storage]);
  const configure = react.exports.useCallback(async ({
    metadata: metadata2
  }) => {
    if (!rwContract) {
      throw new Error(`Cannot connect to contract to ${purpose} metadata.`);
    }
    if (tokenId == null) {
      throw new Error("Token id is unset.");
    }
    try {
      const tx = await rwContract.setURI(BigInt(tokenId), metadata2);
      await tx.wait();
      if (metadata2 !== "") {
        navigate(`/view/${regexify(tokenId)}`);
      }
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Contract Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    }
  }, [rwContract, tokenId, purpose, navigate, toast]);
  const submit = react.exports.useCallback(async (data) => {
    try {
      const name = `metadata.${new Date().toISOString()}.json`;
      let metadata2 = await (async () => {
        switch (tab) {
          case FIELD_FORM: {
            const content = JSON.stringify(await buildMeta(data), null, 2);
            return {
              name,
              content
            };
          }
          case URI_FORM: {
            return data.uri ?? "";
          }
          case JSON5_FORM: {
            if (!isSet(data.json5)) {
              throw new Error("JSON5 isn\u2019t set.");
            }
            const meta = lib.parse(data.json5);
            return {
              name,
              content: JSON.stringify(meta, null, 2)
            };
          }
          default: {
            throw new Error(`Unknown Tab: ${tab}`);
          }
        }
      })();
      if (metadata2 == null) {
        throw new Error(`Metadata is \`${lib.stringify(metadata2)}\`.`);
      } else if (metadata2 !== "") {
        metadata2 = await ipfsify({
          filesOrURL: metadata2,
          storage
        });
      }
      await configure({
        metadata: metadata2
      });
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Metadata Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    }
  }, [buildMeta, configure, storage, tab, toast]);
  return /* @__PURE__ */ jsxs(Stack, {
    align: "center",
    children: [/* @__PURE__ */ jsxs(Box, {
      as: "form",
      onSubmit: handleSubmit(submit),
      mt: 10,
      w: ["100%", "min(85vw, 40em)"],
      sx: {
        a: {
          textDecoration: "underline"
        }
      },
      children: [/* @__PURE__ */ jsx(SubmitButton, {
        purpose,
        processing,
        mb: 3
      }), /* @__PURE__ */ jsxs(Tabs, {
        mx: [0, 5],
        isFitted: true,
        variant: "enclosed",
        onChange: async (idx) => {
          switch (idx) {
            case FIELD_FORM: {
              let metadata2;
              switch (tab) {
                case URI_FORM: {
                  if (uri && uri !== "") {
                    const res = await fetch(uri);
                    metadata2 = lib.parse(await res.text());
                  }
                  break;
                }
                case JSON5_FORM: {
                  if (json5 && json5 !== "") {
                    metadata2 = lib.parse(json5);
                  }
                  break;
                }
              }
              if (metadata2) {
                await configure({
                  metadata: metadata2
                });
              } else {
                toast({
                  title: "Metadata Warning",
                  description: "No metadata specified.",
                  status: "warning",
                  isClosable: true,
                  duration: 1e4
                });
              }
              break;
            }
          }
          setTab(idx);
        },
        children: [/* @__PURE__ */ jsxs(TabList, {
          mb: "1em",
          children: [/* @__PURE__ */ jsx(Tab, {
            children: "Fields"
          }), /* @__PURE__ */ jsx(Tab, {
            children: "URI"
          }), /* @__PURE__ */ jsx(Tab, {
            children: "JSON5"
          })]
        }), /* @__PURE__ */ jsx(TabPanels, {
          children: [NFTForm, URIForm, JSONForm].map((Form, idx) => /* @__PURE__ */ jsx(TabPanel, {
            p: 0,
            children: /* @__PURE__ */ jsx(Form, {
              register,
              watch,
              setValue,
              tokenId,
              metadata
            })
          }, idx))
        })]
      }), /* @__PURE__ */ jsx(SubmitButton, {
        purpose,
        processing,
        mb: 3,
        requireStorage: true
      })]
    }), /* @__PURE__ */ jsx(MaxForm, {
      colorScheme: "blue",
      tokenId,
      purpose
    }), /* @__PURE__ */ jsx(MaxForm, {
      colorScheme: "blue",
      perUser: true,
      tokenId,
      purpose
    })]
  });
};
const URIForm = ({
  register
}) => {
  return /* @__PURE__ */ jsx(Input, {
    placeholder: "Enter a URI for the token\u2026",
    ...register("uri")
  });
};
createIcon({
  d: "M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z",
  displayName: "CopyIcon"
});
createIcon({
  d: "M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z",
  displayName: "SearchIcon"
});
createIcon({
  d: "M23.414,20.591l-4.645-4.645a10.256,10.256,0,1,0-2.828,2.829l4.645,4.644a2.025,2.025,0,0,0,2.828,0A2,2,0,0,0,23.414,20.591ZM10.25,3.005A7.25,7.25,0,1,1,3,10.255,7.258,7.258,0,0,1,10.25,3.005Z",
  displayName: "Search2Icon"
});
createIcon({
  d: "M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z",
  displayName: "MoonIcon"
});
createIcon({
  displayName: "SunIcon",
  path: /* @__PURE__ */ jsxs("g", {
    strokeLinejoin: "round",
    strokeLinecap: "round",
    strokeWidth: "2",
    fill: "none",
    stroke: "currentColor",
    children: [/* @__PURE__ */ jsx("circle", {
      cx: "12",
      cy: "12",
      r: "5"
    }), /* @__PURE__ */ jsx("path", {
      d: "M12 1v2"
    }), /* @__PURE__ */ jsx("path", {
      d: "M12 21v2"
    }), /* @__PURE__ */ jsx("path", {
      d: "M4.22 4.22l1.42 1.42"
    }), /* @__PURE__ */ jsx("path", {
      d: "M18.36 18.36l1.42 1.42"
    }), /* @__PURE__ */ jsx("path", {
      d: "M1 12h2"
    }), /* @__PURE__ */ jsx("path", {
      d: "M21 12h2"
    }), /* @__PURE__ */ jsx("path", {
      d: "M4.22 19.78l1.42-1.42"
    }), /* @__PURE__ */ jsx("path", {
      d: "M18.36 5.64l1.42-1.42"
    })]
  })
});
var AddIcon = createIcon({
  d: "M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z",
  displayName: "AddIcon"
});
createIcon({
  displayName: "SmallAddIcon",
  viewBox: "0 0 20 20",
  path: /* @__PURE__ */ jsx("path", {
    fill: "currentColor",
    d: "M14 9h-3V6c0-.55-.45-1-1-1s-1 .45-1 1v3H6c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1v-3h3c.55 0 1-.45 1-1s-.45-1-1-1z",
    fillRule: "evenodd"
  })
});
createIcon({
  viewBox: "0 0 14 14",
  d: "M14,7.77 L14,6.17 L12.06,5.53 L11.61,4.44 L12.49,2.6 L11.36,1.47 L9.55,2.38 L8.46,1.93 L7.77,0.01 L6.17,0.01 L5.54,1.95 L4.43,2.4 L2.59,1.52 L1.46,2.65 L2.37,4.46 L1.92,5.55 L0,6.23 L0,7.82 L1.94,8.46 L2.39,9.55 L1.51,11.39 L2.64,12.52 L4.45,11.61 L5.54,12.06 L6.23,13.98 L7.82,13.98 L8.45,12.04 L9.56,11.59 L11.4,12.47 L12.53,11.34 L11.61,9.53 L12.08,8.44 L14,7.75 L14,7.77 Z M7,10 C5.34,10 4,8.66 4,7 C4,5.34 5.34,4 7,4 C8.66,4 10,5.34 10,7 C10,8.66 8.66,10 7,10 Z",
  displayName: "SettingsIcon"
});
createIcon({
  displayName: "CheckCircleIcon",
  d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
});
createIcon({
  d: "M19.5,9.5h-.75V6.75a6.75,6.75,0,0,0-13.5,0V9.5H4.5a2,2,0,0,0-2,2V22a2,2,0,0,0,2,2h15a2,2,0,0,0,2-2V11.5A2,2,0,0,0,19.5,9.5Zm-9.5,6a2,2,0,1,1,3,1.723V19.5a1,1,0,0,1-2,0V17.223A1.994,1.994,0,0,1,10,15.5ZM7.75,6.75a4.25,4.25,0,0,1,8.5,0V9a.5.5,0,0,1-.5.5H8.25a.5.5,0,0,1-.5-.5Z",
  displayName: "LockIcon"
});
createIcon({
  d: "M19.5,9.5h-.75V6.75A6.751,6.751,0,0,0,5.533,4.811a1.25,1.25,0,1,0,2.395.717A4.251,4.251,0,0,1,16.25,6.75V9a.5.5,0,0,1-.5.5H4.5a2,2,0,0,0-2,2V22a2,2,0,0,0,2,2h15a2,2,0,0,0,2-2V11.5A2,2,0,0,0,19.5,9.5Zm-9.5,6a2,2,0,1,1,3,1.723V19.5a1,1,0,0,1-2,0V17.223A1.994,1.994,0,0,1,10,15.5Z",
  displayName: "UnlockIcon"
});
createIcon({
  displayName: "ViewIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M23.432,10.524C20.787,7.614,16.4,4.538,12,4.6,7.6,4.537,3.213,7.615.568,10.524a2.211,2.211,0,0,0,0,2.948C3.182,16.351,7.507,19.4,11.839,19.4h.308c4.347,0,8.671-3.049,11.288-5.929A2.21,2.21,0,0,0,23.432,10.524ZM7.4,12A4.6,4.6,0,1,1,12,16.6,4.6,4.6,0,0,1,7.4,12Z"
    }), /* @__PURE__ */ jsx("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    })]
  })
});
createIcon({
  displayName: "ViewOffIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M23.2,10.549a20.954,20.954,0,0,0-4.3-3.6l4-3.995a1,1,0,1,0-1.414-1.414l-.018.018a.737.737,0,0,1-.173.291l-19.5,19.5c-.008.007-.018.009-.026.017a1,1,0,0,0,1.631,1.088l4.146-4.146a11.26,11.26,0,0,0,4.31.939h.3c4.256,0,8.489-2.984,11.051-5.8A2.171,2.171,0,0,0,23.2,10.549ZM16.313,13.27a4.581,4.581,0,0,1-3,3.028,4.3,4.3,0,0,1-3.1-.19.253.253,0,0,1-.068-.407l5.56-5.559a.252.252,0,0,1,.407.067A4.3,4.3,0,0,1,16.313,13.27Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M7.615,13.4a.244.244,0,0,0,.061-.24A4.315,4.315,0,0,1,7.5,12,4.5,4.5,0,0,1,12,7.5a4.276,4.276,0,0,1,1.16.173.244.244,0,0,0,.24-.062l1.941-1.942a.254.254,0,0,0-.1-.421A10.413,10.413,0,0,0,12,4.75C7.7,4.692,3.4,7.7.813,10.549a2.15,2.15,0,0,0-.007,2.9,21.209,21.209,0,0,0,3.438,3.03.256.256,0,0,0,.326-.029Z"
    })]
  })
});
createIcon({
  d: "M11.2857,6.05714 L10.08571,4.85714 L7.85714,7.14786 L7.85714,1 L6.14286,1 L6.14286,7.14786 L3.91429,4.85714 L2.71429,6.05714 L7,10.42857 L11.2857,6.05714 Z M1,11.2857 L1,13 L13,13 L13,11.2857 L1,11.2857 Z",
  displayName: "DownloadIcon",
  viewBox: "0 0 14 14"
});
createIcon({
  displayName: "DeleteIcon",
  path: /* @__PURE__ */ jsx("g", {
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("path", {
      d: "M19.452 7.5H4.547a.5.5 0 00-.5.545l1.287 14.136A2 2 0 007.326 24h9.347a2 2 0 001.992-1.819L19.95 8.045a.5.5 0 00-.129-.382.5.5 0 00-.369-.163zm-9.2 13a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zm5 0a.75.75 0 01-1.5 0v-9a.75.75 0 011.5 0zM22 4h-4.75a.25.25 0 01-.25-.25V2.5A2.5 2.5 0 0014.5 0h-5A2.5 2.5 0 007 2.5v1.25a.25.25 0 01-.25.25H2a1 1 0 000 2h20a1 1 0 000-2zM9 3.75V2.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v1.25a.25.25 0 01-.25.25h-5.5A.25.25 0 019 3.75z"
    })
  })
});
createIcon({
  displayName: "RepeatIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M10.319,4.936a7.239,7.239,0,0,1,7.1,2.252,1.25,1.25,0,1,0,1.872-1.657A9.737,9.737,0,0,0,9.743,2.5,10.269,10.269,0,0,0,2.378,9.61a.249.249,0,0,1-.271.178l-1.033-.13A.491.491,0,0,0,.6,9.877a.5.5,0,0,0-.019.526l2.476,4.342a.5.5,0,0,0,.373.248.43.43,0,0,0,.062,0,.5.5,0,0,0,.359-.152l3.477-3.593a.5.5,0,0,0-.3-.844L5.15,10.172a.25.25,0,0,1-.2-.333A7.7,7.7,0,0,1,10.319,4.936Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M23.406,14.1a.5.5,0,0,0,.015-.526l-2.5-4.329A.5.5,0,0,0,20.546,9a.489.489,0,0,0-.421.151l-3.456,3.614a.5.5,0,0,0,.3.842l1.848.221a.249.249,0,0,1,.183.117.253.253,0,0,1,.023.216,7.688,7.688,0,0,1-5.369,4.9,7.243,7.243,0,0,1-7.1-2.253,1.25,1.25,0,1,0-1.872,1.656,9.74,9.74,0,0,0,9.549,3.03,10.261,10.261,0,0,0,7.369-7.12.251.251,0,0,1,.27-.179l1.058.127a.422.422,0,0,0,.06,0A.5.5,0,0,0,23.406,14.1Z"
    })]
  })
});
createIcon({
  displayName: "RepeatClockIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M12.965,6a1,1,0,0,0-1,1v5.5a1,1,0,0,0,1,1h5a1,1,0,0,0,0-2h-3.75a.25.25,0,0,1-.25-.25V7A1,1,0,0,0,12.965,6Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M12.567,1.258A10.822,10.822,0,0,0,2.818,8.4a.25.25,0,0,1-.271.163L.858,8.309a.514.514,0,0,0-.485.213.5.5,0,0,0-.021.53l2.679,4.7a.5.5,0,0,0,.786.107l3.77-3.746a.5.5,0,0,0-.279-.85L5.593,9.007a.25.25,0,0,1-.192-.35,8.259,8.259,0,1,1,7.866,11.59,1.25,1.25,0,0,0,.045,2.5h.047a10.751,10.751,0,1,0-.792-21.487Z"
    })]
  })
});
createIcon({
  displayName: "EditIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: "2",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
    }), /* @__PURE__ */ jsx("path", {
      d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
    })]
  })
});
createIcon({
  d: "M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  displayName: "ChevronLeftIcon"
});
createIcon({
  d: "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  displayName: "ChevronRightIcon"
});
createIcon({
  displayName: "ChevronDownIcon",
  d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
});
createIcon({
  d: "M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z",
  displayName: "ChevronUpIcon"
});
createIcon({
  d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  displayName: "ArrowBackIcon"
});
createIcon({
  d: "M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z",
  displayName: "ArrowForwardIcon"
});
createIcon({
  d: "M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
  displayName: "ArrowUpIcon"
});
createIcon({
  viewBox: "0 0 16 16",
  d: "M11.891 9.992a1 1 0 1 1 1.416 1.415l-4.3 4.3a1 1 0 0 1-1.414 0l-4.3-4.3A1 1 0 0 1 4.71 9.992l3.59 3.591 3.591-3.591zm0-3.984L8.3 2.417 4.709 6.008a1 1 0 0 1-1.416-1.415l4.3-4.3a1 1 0 0 1 1.414 0l4.3 4.3a1 1 0 1 1-1.416 1.415z",
  displayName: "ArrowUpDownIcon"
});
createIcon({
  d: "M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
  displayName: "ArrowDownIcon"
});
var ExternalLinkIcon = createIcon({
  displayName: "ExternalLinkIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: "2",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
    }), /* @__PURE__ */ jsx("path", {
      d: "M15 3h6v6"
    }), /* @__PURE__ */ jsx("path", {
      d: "M10 14L21 3"
    })]
  })
});
createIcon({
  displayName: "LinkIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M10.458,18.374,7.721,21.11a2.853,2.853,0,0,1-3.942,0l-.892-.891a2.787,2.787,0,0,1,0-3.941l5.8-5.8a2.789,2.789,0,0,1,3.942,0l.893.892A1,1,0,0,0,14.94,9.952l-.893-.892a4.791,4.791,0,0,0-6.771,0l-5.8,5.8a4.787,4.787,0,0,0,0,6.77l.892.891a4.785,4.785,0,0,0,6.771,0l2.736-2.735a1,1,0,1,0-1.414-1.415Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M22.526,2.363l-.892-.892a4.8,4.8,0,0,0-6.77,0l-2.905,2.9a1,1,0,0,0,1.414,1.414l2.9-2.9a2.79,2.79,0,0,1,3.941,0l.893.893a2.786,2.786,0,0,1,0,3.942l-5.8,5.8a2.769,2.769,0,0,1-1.971.817h0a2.766,2.766,0,0,1-1.969-.816,1,1,0,1,0-1.415,1.412,4.751,4.751,0,0,0,3.384,1.4h0a4.752,4.752,0,0,0,3.385-1.4l5.8-5.8a4.786,4.786,0,0,0,0-6.771Z"
    })]
  })
});
createIcon({
  displayName: "PlusSquareIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeWidth: "2",
    children: [/* @__PURE__ */ jsx("rect", {
      height: "18",
      width: "18",
      rx: "2",
      ry: "2",
      x: "3",
      y: "3"
    }), /* @__PURE__ */ jsx("path", {
      d: "M12 8v8"
    }), /* @__PURE__ */ jsx("path", {
      d: "M8 12h8"
    })]
  })
});
createIcon({
  displayName: "CalendarIcon",
  viewBox: "0 0 14 14",
  d: "M10.8889,5.5 L3.11111,5.5 L3.11111,7.05556 L10.8889,7.05556 L10.8889,5.5 Z M12.4444,1.05556 L11.6667,1.05556 L11.6667,0 L10.1111,0 L10.1111,1.05556 L3.88889,1.05556 L3.88889,0 L2.33333,0 L2.33333,1.05556 L1.55556,1.05556 C0.692222,1.05556 0.00777777,1.75556 0.00777777,2.61111 L0,12.5 C0,13.3556 0.692222,14 1.55556,14 L12.4444,14 C13.3,14 14,13.3556 14,12.5 L14,2.61111 C14,1.75556 13.3,1.05556 12.4444,1.05556 Z M12.4444,12.5 L1.55556,12.5 L1.55556,3.94444 L12.4444,3.94444 L12.4444,12.5 Z M8.55556,8.61111 L3.11111,8.61111 L3.11111,10.1667 L8.55556,10.1667 L8.55556,8.61111 Z"
});
createIcon({
  d: "M0.913134,0.920639 C1.49851,0.331726 2.29348,0 3.12342,0 L10.8766,0 C11.7065,0 12.5015,0.331725 13.0869,0.920639 C13.6721,1.50939 14,2.30689 14,3.13746 L14,8.12943 C13.9962,8.51443 13.9059,8.97125 13.7629,9.32852 C13.6128,9.683 13.3552,10.0709 13.0869,10.3462 C12.813,10.6163 12.4265,10.8761 12.0734,11.0274 C11.7172,11.1716 11.2607,11.263 10.8766,11.2669 L10.1234,11.2669 L10.1234,12.5676 L10.1209,12.5676 C10.1204,12.793 10.0633,13.0791 9.97807,13.262 C9.8627,13.466 9.61158,13.7198 9.40818,13.8382 L9.40824,13.8383 C9.4077,13.8386 9.40716,13.8388 9.40661,13.8391 C9.40621,13.8393 9.4058,13.8396 9.40539,13.8398 L9.40535,13.8397 C9.22958,13.9254 8.94505,13.9951 8.75059,14 L8.74789,14 C8.35724,13.9963 7.98473,13.8383 7.71035,13.5617 L5.39553,11.2669 L3.12342,11.2669 C2.29348,11.2669 1.49851,10.9352 0.913134,10.3462 C0.644826,10.0709 0.387187,9.683 0.23711,9.32852 C0.0941235,8.97125 0.00379528,8.51443 0,8.12943 L0,3.13746 C0,2.30689 0.327915,1.50939 0.913134,0.920639 Z M3.12342,1.59494 C2.71959,1.59494 2.33133,1.75628 2.04431,2.04503 C1.75713,2.33395 1.59494,2.72681 1.59494,3.13746 L1.59494,8.12943 C1.59114,8.35901 1.62114,8.51076 1.71193,8.72129 C1.79563,8.9346 1.88065,9.06264 2.04431,9.22185 C2.33133,9.5106 2.71959,9.67195 3.12342,9.67195 L5.72383,9.67195 C5.93413,9.67195 6.13592,9.75502 6.28527,9.90308 L8.52848,12.1269 L8.52848,10.4694 C8.52848,10.029 8.88552,9.67195 9.32595,9.67195 L10.8766,9.67195 C11.1034,9.67583 11.2517,9.64614 11.4599,9.55518 C11.6712,9.47132 11.7976,9.38635 11.9557,9.22185 C12.1193,9.06264 12.2044,8.9346 12.2881,8.72129 C12.3789,8.51076 12.4089,8.35901 12.4051,8.12943 L12.4051,3.13746 C12.4051,2.72681 12.2429,2.33394 11.9557,2.04503 C11.6687,1.75628 11.2804,1.59494 10.8766,1.59494 L3.12342,1.59494 Z",
  displayName: "ChatIcon",
  viewBox: "0 0 14 14"
});
createIcon({
  displayName: "TimeIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M17.134,15.81,12.5,11.561V6.5a1,1,0,0,0-2,0V12a1,1,0,0,0,.324.738l4.959,4.545a1.01,1.01,0,0,0,1.413-.061A1,1,0,0,0,17.134,15.81Z"
    })]
  })
});
createIcon({
  displayName: "ArrowRightIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M13.584,12a2.643,2.643,0,0,1-.775,1.875L3.268,23.416a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L.768,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,13.584,12Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M23.75,12a2.643,2.643,0,0,1-.775,1.875l-9.541,9.541a1.768,1.768,0,0,1-2.5-2.5l8.739-8.739a.25.25,0,0,0,0-.354L10.934,3.084a1.768,1.768,0,0,1,2.5-2.5l9.541,9.541A2.643,2.643,0,0,1,23.75,12Z"
    })]
  })
});
createIcon({
  displayName: "ArrowLeftIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M10.416,12a2.643,2.643,0,0,1,.775-1.875L20.732.584a1.768,1.768,0,0,1,2.5,2.5l-8.739,8.739a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5l-9.541-9.541A2.643,2.643,0,0,1,10.416,12Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M.25,12a2.643,2.643,0,0,1,.775-1.875L10.566.584a1.768,1.768,0,0,1,2.5,2.5L4.327,11.823a.25.25,0,0,0,0,.354l8.739,8.739a1.768,1.768,0,0,1-2.5,2.5L1.025,13.875A2.643,2.643,0,0,1,.25,12Z"
    })]
  })
});
createIcon({
  displayName: "AtSignIcon",
  d: "M12,.5A11.634,11.634,0,0,0,.262,12,11.634,11.634,0,0,0,12,23.5a11.836,11.836,0,0,0,6.624-2,1.25,1.25,0,1,0-1.393-2.076A9.34,9.34,0,0,1,12,21a9.132,9.132,0,0,1-9.238-9A9.132,9.132,0,0,1,12,3a9.132,9.132,0,0,1,9.238,9v.891a1.943,1.943,0,0,1-3.884,0V12A5.355,5.355,0,1,0,12,17.261a5.376,5.376,0,0,0,3.861-1.634,4.438,4.438,0,0,0,7.877-2.736V12A11.634,11.634,0,0,0,12,.5Zm0,14.261A2.763,2.763,0,1,1,14.854,12,2.812,2.812,0,0,1,12,14.761Z"
});
createIcon({
  displayName: "AttachmentIcon",
  d: "M21.843,3.455a6.961,6.961,0,0,0-9.846,0L1.619,13.832a5.128,5.128,0,0,0,7.252,7.252L17.3,12.653A3.293,3.293,0,1,0,12.646,8L7.457,13.184A1,1,0,1,0,8.871,14.6L14.06,9.409a1.294,1.294,0,0,1,1.829,1.83L7.457,19.67a3.128,3.128,0,0,1-4.424-4.424L13.411,4.869a4.962,4.962,0,1,1,7.018,7.018L12.646,19.67a1,1,0,1,0,1.414,1.414L21.843,13.3a6.96,6.96,0,0,0,0-9.846Z"
});
createIcon({
  displayName: "UpDownIcon",
  viewBox: "-1 -1 9 11",
  d: "M 3.5 0L 3.98809 -0.569442L 3.5 -0.987808L 3.01191 -0.569442L 3.5 0ZM 3.5 9L 3.01191 9.56944L 3.5 9.98781L 3.98809 9.56944L 3.5 9ZM 0.488094 3.56944L 3.98809 0.569442L 3.01191 -0.569442L -0.488094 2.43056L 0.488094 3.56944ZM 3.01191 0.569442L 6.51191 3.56944L 7.48809 2.43056L 3.98809 -0.569442L 3.01191 0.569442ZM -0.488094 6.56944L 3.01191 9.56944L 3.98809 8.43056L 0.488094 5.43056L -0.488094 6.56944ZM 3.98809 9.56944L 7.48809 6.56944L 6.51191 5.43056L 3.01191 8.43056L 3.98809 9.56944Z"
});
createIcon({
  d: "M23.555,8.729a1.505,1.505,0,0,0-1.406-.98H16.062a.5.5,0,0,1-.472-.334L13.405,1.222a1.5,1.5,0,0,0-2.81,0l-.005.016L8.41,7.415a.5.5,0,0,1-.471.334H1.85A1.5,1.5,0,0,0,.887,10.4l5.184,4.3a.5.5,0,0,1,.155.543L4.048,21.774a1.5,1.5,0,0,0,2.31,1.684l5.346-3.92a.5.5,0,0,1,.591,0l5.344,3.919a1.5,1.5,0,0,0,2.312-1.683l-2.178-6.535a.5.5,0,0,1,.155-.543l5.194-4.306A1.5,1.5,0,0,0,23.555,8.729Z",
  displayName: "StarIcon"
});
createIcon({
  displayName: "EmailIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M11.114,14.556a1.252,1.252,0,0,0,1.768,0L22.568,4.87a.5.5,0,0,0-.281-.849A1.966,1.966,0,0,0,22,4H2a1.966,1.966,0,0,0-.289.021.5.5,0,0,0-.281.849Z"
    }), /* @__PURE__ */ jsx("path", {
      d: "M23.888,5.832a.182.182,0,0,0-.2.039l-6.2,6.2a.251.251,0,0,0,0,.354l5.043,5.043a.75.75,0,1,1-1.06,1.061l-5.043-5.043a.25.25,0,0,0-.354,0l-2.129,2.129a2.75,2.75,0,0,1-3.888,0L7.926,13.488a.251.251,0,0,0-.354,0L2.529,18.531a.75.75,0,0,1-1.06-1.061l5.043-5.043a.251.251,0,0,0,0-.354l-6.2-6.2a.18.18,0,0,0-.2-.039A.182.182,0,0,0,0,6V18a2,2,0,0,0,2,2H22a2,2,0,0,0,2-2V6A.181.181,0,0,0,23.888,5.832Z"
    })]
  })
});
createIcon({
  d: "M2.20731,0.0127209 C2.1105,-0.0066419 1.99432,-0.00664663 1.91687,0.032079 C0.871279,0.438698 0.212942,1.92964 0.0580392,2.95587 C-0.426031,6.28627 2.20731,9.17133 4.62766,11.0689 C6.77694,12.7534 10.9012,15.5223 13.3409,12.8503 C13.6507,12.5211 14.0186,12.037 13.9993,11.553 C13.9412,10.7397 13.186,10.1588 12.6051,9.71349 C12.1598,9.38432 11.2304,8.47427 10.6495,8.49363 C10.1267,8.51299 9.79754,9.05515 9.46837,9.38432 L8.88748,9.96521 C8.79067,10.062 7.55145,9.24878 7.41591,9.15197 C6.91248,8.8228 6.4284,8.45491 6.00242,8.04829 C5.57644,7.64167 5.18919,7.19632 4.86002,6.73161 C4.7632,6.59607 3.96933,5.41495 4.04678,5.31813 C4.04678,5.31813 4.72448,4.58234 4.91811,4.2919 C5.32473,3.67229 5.63453,3.18822 5.16982,2.45243 C4.99556,2.18135 4.78257,1.96836 4.55021,1.73601 C4.14359,1.34875 3.73698,0.942131 3.27227,0.612963 C3.02055,0.419335 2.59457,0.0708094 2.20731,0.0127209 Z",
  displayName: "PhoneIcon",
  viewBox: "0 0 14 14"
});
createIcon({
  viewBox: "0 0 10 10",
  d: "M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z",
  displayName: "DragHandleIcon"
});
createIcon({
  displayName: "SpinnerIcon",
  path: /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("defs", {
      children: /* @__PURE__ */ jsxs("linearGradient", {
        x1: "28.154%",
        y1: "63.74%",
        x2: "74.629%",
        y2: "17.783%",
        id: "a",
        children: [/* @__PURE__ */ jsx("stop", {
          stopColor: "currentColor",
          offset: "0%"
        }), /* @__PURE__ */ jsx("stop", {
          stopColor: "#fff",
          stopOpacity: "0",
          offset: "100%"
        })]
      })
    }), /* @__PURE__ */ jsxs("g", {
      transform: "translate(2)",
      fill: "none",
      children: [/* @__PURE__ */ jsx("circle", {
        stroke: "url(#a)",
        strokeWidth: "4",
        cx: "10",
        cy: "12",
        r: "10"
      }), /* @__PURE__ */ jsx("path", {
        d: "M10 2C4.477 2 0 6.477 0 12",
        stroke: "currentColor",
        strokeWidth: "4"
      }), /* @__PURE__ */ jsx("rect", {
        fill: "currentColor",
        x: "8",
        width: "4",
        height: "4",
        rx: "8"
      })]
    })]
  })
});
var CloseIcon = createIcon({
  displayName: "CloseIcon",
  d: "M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
});
createIcon({
  displayName: "SmallCloseIcon",
  viewBox: "0 0 16 16",
  path: /* @__PURE__ */ jsx("path", {
    d: "M9.41 8l2.29-2.29c.19-.18.3-.43.3-.71a1.003 1.003 0 0 0-1.71-.71L8 6.59l-2.29-2.3a1.003 1.003 0 0 0-1.42 1.42L6.59 8 4.3 10.29c-.19.18-.3.43-.3.71a1.003 1.003 0 0 0 1.71.71L8 9.41l2.29 2.29c.18.19.43.3.71.3a1.003 1.003 0 0 0 .71-1.71L9.41 8z",
    fillRule: "evenodd",
    fill: "currentColor"
  })
});
createIcon({
  d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z",
  displayName: "NotAllowedIcon"
});
createIcon({
  d: "M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z",
  displayName: "TriangleDownIcon"
});
createIcon({
  d: "M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z",
  displayName: "TriangleUpIcon"
});
createIcon({
  displayName: "InfoOutlineIcon",
  path: /* @__PURE__ */ jsxs("g", {
    fill: "currentColor",
    stroke: "currentColor",
    strokeLinecap: "square",
    strokeWidth: "2",
    children: [/* @__PURE__ */ jsx("circle", {
      cx: "12",
      cy: "12",
      fill: "none",
      r: "11",
      stroke: "currentColor"
    }), /* @__PURE__ */ jsx("line", {
      fill: "none",
      x1: "11.959",
      x2: "11.959",
      y1: "11",
      y2: "17"
    }), /* @__PURE__ */ jsx("circle", {
      cx: "11.959",
      cy: "7",
      r: "1",
      stroke: "none"
    })]
  })
});
createIcon({
  displayName: "BellIcon",
  d: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
});
createIcon({
  d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
});
createIcon({
  d: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z",
  displayName: "QuestionIcon"
});
createIcon({
  displayName: "QuestionOutlineIcon",
  path: /* @__PURE__ */ jsxs("g", {
    stroke: "currentColor",
    strokeWidth: "1.5",
    children: [/* @__PURE__ */ jsx("path", {
      strokeLinecap: "round",
      fill: "none",
      d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
    }), /* @__PURE__ */ jsx("path", {
      fill: "none",
      strokeLinecap: "round",
      d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
    }), /* @__PURE__ */ jsx("circle", {
      fill: "none",
      strokeMiterlimit: "10",
      cx: "12",
      cy: "12",
      r: "11.25"
    })]
  })
});
createIcon({
  d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
  displayName: "WarningIcon"
});
createIcon({
  displayName: "WarningTwoIcon",
  d: "M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
});
createIcon({
  viewBox: "0 0 14 14",
  path: /* @__PURE__ */ jsx("g", {
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("polygon", {
      points: "5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"
    })
  })
});
createIcon({
  displayName: "MinusIcon",
  path: /* @__PURE__ */ jsx("g", {
    fill: "currentColor",
    children: /* @__PURE__ */ jsx("rect", {
      height: "4",
      width: "20",
      x: "2",
      y: "10"
    })
  })
});
createIcon({
  displayName: "HamburgerIcon",
  viewBox: "0 0 24 24",
  d: "M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"
});
const AttrRow = ({
  attributes = [],
  setValue: setFormValue,
  index
}) => {
  const {
    name = "",
    value = "",
    type = "string"
  } = attributes[index];
  const setter = react.exports.useCallback((prop) => (value2) => {
    setFormValue("attributes", [...attributes.slice(0, index), {
      ...attributes[index],
      [prop]: value2
    }, ...attributes.slice(index + 1)]);
  }, [setFormValue, index, attributes]);
  const setName = setter("name");
  const setValue = setter("value");
  const setType = setter("type");
  return /* @__PURE__ */ jsxs(Tr, {
    children: [/* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsx(Input, {
        value: name,
        onChange: ({
          target: {
            value: value2
          }
        }) => {
          setName(value2);
        }
      })
    }), /* @__PURE__ */ jsx(Td, {
      children: (() => {
        switch (type) {
          case "date": {
            return /* @__PURE__ */ jsx(Input, {
              type: "date",
              value: isEmpty(value) ? "" : new Date(value).toISOString().split("T")[0],
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(new Date(value2).getTime());
              }
            });
          }
          case "string": {
            return /* @__PURE__ */ jsx(Input, {
              value,
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(value2);
              }
            });
          }
          default: {
            return /* @__PURE__ */ jsx(Input, {
              type: "number",
              value,
              onChange: ({
                target: {
                  value: value2
                }
              }) => {
                setValue(value2 != null ? Number(value2) : "");
              }
            });
          }
        }
      })()
    }), /* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsxs(Select, {
        value: type,
        onChange: ({
          target: {
            value: value2
          }
        }) => {
          setType(value2);
        },
        children: [/* @__PURE__ */ jsx(chakra.option, {
          value: "string",
          children: "String"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "date",
          children: "Date"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "number",
          children: "Number"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "boost_percentage",
          children: "Boost Percentage"
        }), /* @__PURE__ */ jsx(chakra.option, {
          value: "boost_number",
          children: "Boost Number"
        })]
      })
    }), /* @__PURE__ */ jsx(Td, {
      children: /* @__PURE__ */ jsx(Tooltip, {
        label: "Remove",
        hasArrow: true,
        children: /* @__PURE__ */ jsx(Button, {
          size: "sm",
          ml: 2,
          colorScheme: "red",
          onClick: () => setFormValue("attributes", [...attributes.slice(0, index), ...attributes.slice(index + 1)]),
          children: /* @__PURE__ */ jsx(CloseIcon, {})
        })
      })
    })]
  });
};
const NFTForm = ({
  register,
  watch,
  setValue,
  tokenId = "\u{1D61C}\u{1D62F}\u{1D62C}\u{1D62F}\u{1D630}\u{1D638}\u{1D62F}",
  metadata
}) => {
  const [primaryImageIdx, setPrimaryImageIdx] = react.exports.useState(0);
  const imageRef = react.exports.useRef(null);
  const {
    homepage,
    description,
    color,
    images,
    attributes,
    animation
  } = watch();
  react.exports.useEffect(() => {
    if (metadata) {
      Object.entries({
        name: null,
        description: null,
        external_url: "homepage",
        animation_url: "animation"
      }).forEach(([prop, name]) => {
        setValue(name ?? prop, metadata[prop]);
      });
      if (metadata.image) {
        setValue("images", [metadata.image]);
      }
      const {
        attributes: attrs
      } = metadata;
      if (!isEmpty(attrs)) {
        setValue("attributes", (attrs ?? []).map(({
          trait_type: name,
          value,
          display_type: type = "string"
        }) => ({
          name,
          value,
          type
        })));
      }
      const bg = metadata.background_color;
      if (bg && !isEmpty(bg)) {
        setValue("color", `#${bg}`);
      }
    }
  }, [metadata, setValue]);
  react.exports.useEffect(() => {
    if (!homepage || isEmpty(homepage) || homepage.endsWith("\u{1D61C}\u{1D62F}\u{1D62C}\u{1D62F}\u{1D630}\u{1D638}\u{1D62F}")) {
      setValue("homepage", `${nftBase}/${regexify(tokenId)}`);
    }
  }, [homepage, setValue, tokenId]);
  react.exports.useEffect(() => {
    if (window.location.hash) {
      const elem = document.getElementById(window.location.hash.substring(1));
      window.scroll({
        top: (elem?.offsetTop ?? 0) - 120,
        behavior: "smooth"
      });
    }
  }, []);
  const addImage = ({
    target: {
      files
    }
  }) => {
    if (files?.length && files?.length >= 1) {
      setValue("images", [...images ?? [], ...Array.from(files)]);
    }
  };
  const removeImage = (idx) => {
    const replacement = [...images.slice(0, idx), ...images.slice(idx + 1)];
    setValue("images", replacement);
    if (primaryImageIdx === idx) {
      setPrimaryImageIdx(replacement.length > 0 ? 0 : void 0);
    }
  };
  const configAnimation = (evt) => {
    const {
      target: {
        files
      }
    } = evt;
    if (files?.length >= 1) {
      setValue("animation", files[0]);
    } else {
      setValue("animation", null);
    }
    evt.preventDefault();
  };
  const addRow = () => {
    setValue("attributes", [...attributes ?? [], {}]);
  };
  return /* @__PURE__ */ jsxs(UnorderedList, {
    listStyleType: "none",
    children: [/* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Name"
          }), /* @__PURE__ */ jsx(Input, {
            autoFocus: true,
            ml: {
              base: 0,
              md: 4
            },
            ...register("name")
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsxs(FormControl, {
        mt: 3,
        children: [/* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Images"
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            accept: "image/*",
            ref: imageRef,
            onChange: addImage,
            display: "none",
            multiple: true
          })]
        }), images?.length > 0 && /* @__PURE__ */ jsx(RadioGroup, {
          value: primaryImageIdx,
          onChange: (value) => {
            setPrimaryImageIdx(Number(value));
          },
          children: /* @__PURE__ */ jsx(SimpleGrid, {
            columns: 3,
            templateColumns: "6rem 1fr 2rem",
            children: images.map((image, idx) => {
              const name = image?.name ?? image?.replace(/^.*\//g, "");
              return /* @__PURE__ */ jsxs(React.Fragment, {
                children: [/* @__PURE__ */ jsx(Flex, {
                  w: 16,
                  children: /* @__PURE__ */ jsx(Radio, {
                    value: idx,
                    children: "Display Image"
                  })
                }), /* @__PURE__ */ jsx(Flex, {
                  justify: "center",
                  bg: idx === primaryImageIdx ? color : "transparent",
                  children: /* @__PURE__ */ jsx(Tooltip, {
                    label: name,
                    hasArrow: true,
                    children: /* @__PURE__ */ jsx(Image$1, {
                      alt: name,
                      src: image instanceof File ? URL.createObjectURL(image) : httpURL(image) ?? void 0,
                      maxH: 60,
                      mt: 0,
                      onClick: () => imageRef.current?.click()
                    })
                  })
                }), /* @__PURE__ */ jsx(Center, {
                  children: /* @__PURE__ */ jsx(Button, {
                    size: "xs",
                    colorScheme: "red",
                    onClick: () => removeImage(idx),
                    children: /* @__PURE__ */ jsx(CloseIcon, {})
                  })
                })]
              }, idx);
            })
          })
        }), /* @__PURE__ */ jsx(Button, {
          w: "full",
          mt: 3,
          colorScheme: "teal",
          onClick: () => imageRef.current?.click(),
          children: /* @__PURE__ */ jsx(AddIcon, {})
        })]
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Background"
          }), /* @__PURE__ */ jsx(Input, {
            type: "color",
            ...register("color")
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Homepage"
          }), /* @__PURE__ */ jsxs(Flex, {
            grow: 1,
            children: [/* @__PURE__ */ jsx(Input, {
              ...register("homepage")
            }), homepage?.length > 0 && /* @__PURE__ */ jsx(Link, {
              ml: 2,
              href: homepage,
              isExternal: true,
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Stack, {
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Description"
          }), /* @__PURE__ */ jsxs(Tabs, {
            ml: 5,
            isFitted: true,
            variant: "enclosed",
            children: [/* @__PURE__ */ jsxs(TabList, {
              mb: "1em",
              children: [/* @__PURE__ */ jsx(Tab, {
                children: "Markdown"
              }), /* @__PURE__ */ jsx(Tab, {
                children: "Preview"
              })]
            }), /* @__PURE__ */ jsxs(TabPanels, {
              children: [/* @__PURE__ */ jsx(TabPanel, {
                children: /* @__PURE__ */ jsx(Textarea, {
                  placeholder: "Enter a markdown formatted description.",
                  minH: 32,
                  ...register("description")
                })
              }), /* @__PURE__ */ jsx(TabPanel, {
                children: /* @__PURE__ */ jsx(ReactMarkdown, {
                  children: description
                })
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Flex, {
          direction: {
            base: "column",
            md: "row"
          },
          children: [/* @__PURE__ */ jsx(FormLabel, {
            _after: {
              content: '":"'
            },
            children: "Animation"
          }), typeof animation === "string" && /* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(Text, {
              children: decodeURI(animation.replace(/^ipfs:\/\/[^/]+\//, ""))
            }), /* @__PURE__ */ jsx(Link, {
              href: httpURL(animation),
              ml: 3,
              mb: 5,
              isExternal: true,
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          }), typeof File !== "undefined" && animation instanceof File && /* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(Text, {
              children: animation.name
            }), /* @__PURE__ */ jsx(Link, {
              ml: 3,
              mb: 5,
              isExternal: true,
              href: URL.createObjectURL(animation),
              children: /* @__PURE__ */ jsx(ExternalLinkIcon, {})
            })]
          }), /* @__PURE__ */ jsx(Input, {
            type: "file",
            accept: "model/gltf+json,model/gltf-binary,video/*,.gltf,.glb",
            onChange: configAnimation,
            h: "auto"
          })]
        })
      })
    }), /* @__PURE__ */ jsx(ListItem, {
      id: "attributes",
      children: /* @__PURE__ */ jsx(FormControl, {
        mt: 3,
        children: /* @__PURE__ */ jsxs(Stack, {
          children: [/* @__PURE__ */ jsxs(Flex, {
            children: [/* @__PURE__ */ jsx(FormLabel, {
              _after: {
                content: '":"'
              },
              children: "Attributes"
            }), /* @__PURE__ */ jsx(Button, {
              ml: 2,
              size: "xs",
              onClick: addRow,
              colorScheme: "teal",
              children: /* @__PURE__ */ jsx(AddIcon, {})
            })]
          }), attributes?.length > 0 && /* @__PURE__ */ jsxs(Table, {
            sx: {
              "th, td": {
                textAlign: "center",
                px: 2
              }
            },
            children: [/* @__PURE__ */ jsx(Thead, {
              children: /* @__PURE__ */ jsxs(Tr, {
                children: [/* @__PURE__ */ jsx(Th, {
                  children: "Name"
                }), /* @__PURE__ */ jsx(Th, {
                  children: "Value"
                }), /* @__PURE__ */ jsx(Th, {
                  children: "Type"
                })]
              })
            }), /* @__PURE__ */ jsx(Tbody, {
              children: attributes.map((_, index) => /* @__PURE__ */ jsx(AttrRow, {
                attributes,
                setValue,
                index
              }, index))
            })]
          })]
        })
      })
    })]
  });
};
const JSONForm = ({
  register,
  metadata
}) => /* @__PURE__ */ jsx(Textarea, {
  placeholder: "Enter JSON5 token metadata\u2026",
  h: "75vh",
  ...register("json5"),
  children: lib.stringify(metadata)
});
const MaxForm = ({
  tokenId,
  purpose = "create",
  perUser = false,
  ...props
}) => {
  const [max, setMax] = react.exports.useState(null);
  const [processing, setProcessing] = react.exports.useState(false);
  const {
    roContract,
    rwContract
  } = useWeb3();
  const toast = useToast();
  react.exports.useEffect(() => {
    const load = async () => {
      if (roContract && tokenId) {
        if (perUser) {
          setMax(await roContract.getPerUserMax(BigInt(tokenId)));
        } else {
          setMax(await roContract.getMax(BigInt(tokenId)));
        }
      }
    };
    load();
  }, [tokenId, roContract]);
  const save = react.exports.useCallback(async (evt) => {
    evt.preventDefault();
    if (!rwContract) {
      throw new Error("`rwContract` is not defined");
    }
    try {
      setProcessing(true);
      let tx;
      if (perUser) {
        tx = await rwContract.setPerUserMax(tokenId, max);
      } else {
        tx = await rwContract.setMax(tokenId, max);
      }
      await tx.wait();
    } catch (error) {
      toast({
        title: "Contract Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    } finally {
      setProcessing(false);
    }
  }, [max, rwContract, toast, tokenId]);
  return /* @__PURE__ */ jsxs(Flex, {
    as: "form",
    onSubmit: save,
    alignItems: "flex-end",
    children: [/* @__PURE__ */ jsxs(FormControl, {
      display: "flex",
      w: "auto",
      alignItems: "baseline",
      mt: 3,
      children: [/* @__PURE__ */ jsxs(FormLabel, {
        whiteSpace: "pre",
        _after: {
          content: '":"'
        },
        children: [perUser && "Per User", " Maximum Mintable"]
      }), max == null ? /* @__PURE__ */ jsxs(Flex, {
        children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsx(Text, {
          ml: 3,
          children: "Loading\u2026"
        })]
      }) : /* @__PURE__ */ jsx(Input, {
        type: "number",
        mx: {
          base: 0,
          md: 4
        },
        w: 32,
        textAlign: "center",
        value: max,
        onChange: ({
          target: {
            value
          }
        }) => {
          setMax(value.trim().replace(/^0+([^0])/, "$1"));
        }
      })]
    }), /* @__PURE__ */ jsx(SubmitButton, {
      label: `Set ${perUser ? "Per User" : ""} Max`,
      disabled: !/^-?\d+$/.test(max),
      purpose,
      processing,
      ...props
    })]
  });
};
export {
  OptionsForm as O
};
//# sourceMappingURL=MaxForm.4b7cb570.js.map
