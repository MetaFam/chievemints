import { f as createAnimation, g as cssValue, r as reactExports, p as parseLengthAndUnit, c as useWeb3, b as useNavigate, l as useConfig, Q, a as jsxs, i as reactDomExports, j as jsx, n as nftBase, L as Link } from "./index-23392436.js";
import { i as isSet, b as isEmpty, r as regexify, e as extractMessage, l as lib, c as ipfsify, o as os, T as Tabs, f as TabList, g as Tab, j as TabPanel, k as fs, m as capitalize, h as httpURL, n as jf } from "./TokenFilterForm.module-e8ed1c9b.js";
import { u as useForm } from "./index.esm-ad7d8970.js";
import { T as ThreeDScene } from "./ThreeDScene-0d679655.js";
import { R as ReactMarkdown } from "./react-markdown-84de2d25.js";
import { S as SubmitButton } from "./SubmitButton-b17c486b.js";
var BasicColors;
(function(BasicColors2) {
  BasicColors2["maroon"] = "#800000";
  BasicColors2["red"] = "#FF0000";
  BasicColors2["orange"] = "#FFA500";
  BasicColors2["yellow"] = "#FFFF00";
  BasicColors2["olive"] = "#808000";
  BasicColors2["green"] = "#008000";
  BasicColors2["purple"] = "#800080";
  BasicColors2["fuchsia"] = "#FF00FF";
  BasicColors2["lime"] = "#00FF00";
  BasicColors2["teal"] = "#008080";
  BasicColors2["aqua"] = "#00FFFF";
  BasicColors2["blue"] = "#0000FF";
  BasicColors2["navy"] = "#000080";
  BasicColors2["black"] = "#000000";
  BasicColors2["gray"] = "#808080";
  BasicColors2["silver"] = "#C0C0C0";
  BasicColors2["white"] = "#FFFFFF";
})(BasicColors || (BasicColors = {}));
var calculateRgba = function(color, opacity) {
  if (Object.keys(BasicColors).includes(color)) {
    color = BasicColors[color];
  }
  if (color[0] === "#") {
    color = color.slice(1);
  }
  if (color.length === 3) {
    var res_1 = "";
    color.split("").forEach(function(c) {
      res_1 += c;
      res_1 += c;
    });
    color = res_1;
  }
  var rgbValues = (color.match(/.{2}/g) || []).map(function(hex) {
    return parseInt(hex, 16);
  }).join(", ");
  return "rgba(".concat(rgbValues, ", ").concat(opacity, ")");
};
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
var long = createAnimation("BarLoader", "0% {left: -35%;right: 100%} 60% {left: 100%;right: -90%} 100% {left: 100%;right: -90%}", "long");
var short = createAnimation("BarLoader", "0% {left: -200%;right: 100%} 60% {left: 107%;right: -8%} 100% {left: 107%;right: -8%}", "short");
function BarLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.height, height = _f === void 0 ? 4 : _f, _g = _a.width, width = _g === void 0 ? 100 : _g, additionalprops = __rest$1(_a, ["loading", "color", "speedMultiplier", "cssOverride", "height", "width"]);
  var wrapper = __assign$1({ display: "inherit", position: "relative", width: cssValue(width), height: cssValue(height), overflow: "hidden", backgroundColor: calculateRgba(color, 0.2), backgroundClip: "padding-box" }, cssOverride);
  var style = function(i) {
    return {
      position: "absolute",
      height: cssValue(height),
      overflow: "hidden",
      backgroundColor: color,
      backgroundClip: "padding-box",
      display: "block",
      borderRadius: 2,
      willChange: "left, right",
      animationFillMode: "forwards",
      animation: "".concat(i === 1 ? long : short, " ").concat(2.1 / speedMultiplier, "s ").concat(i === 2 ? "".concat(1.15 / speedMultiplier, "s") : "", " ").concat(i === 1 ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)" : "cubic-bezier(0.165, 0.84, 0.44, 1)", " infinite")
    };
  };
  if (!loading) {
    return null;
  }
  return reactExports.createElement(
    "span",
    __assign$1({ style: wrapper }, additionalprops),
    reactExports.createElement("span", { style: style(1) }),
    reactExports.createElement("span", { style: style(2) })
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
function HashLoader(_a) {
  var _b = _a.loading, loading = _b === void 0 ? true : _b, _c = _a.color, color = _c === void 0 ? "#000000" : _c, _d = _a.speedMultiplier, speedMultiplier = _d === void 0 ? 1 : _d, _e = _a.cssOverride, cssOverride = _e === void 0 ? {} : _e, _f = _a.size, size = _f === void 0 ? 50 : _f, additionalprops = __rest(_a, ["loading", "color", "speedMultiplier", "cssOverride", "size"]);
  var _g = parseLengthAndUnit(size), value = _g.value, unit = _g.unit;
  var wrapper = __assign({ display: "inherit", position: "relative", width: cssValue(size), height: cssValue(size), transform: "rotate(165deg)" }, cssOverride);
  var thickness = value / 5;
  var lat = (value - thickness) / 2;
  var offset = lat - thickness;
  var colorValue = calculateRgba(color, 0.75);
  var before = createAnimation("HashLoader", "0% {width: ".concat(thickness, "px; box-shadow: ").concat(lat, "px ").concat(-offset, "px ").concat(colorValue, ", ").concat(-lat, "px ").concat(offset, "px ").concat(colorValue, "}\n    35% {width: ").concat(cssValue(size), "; box-shadow: 0 ").concat(-offset, "px ").concat(colorValue, ", 0 ").concat(offset, "px ").concat(colorValue, "}\n    70% {width: ").concat(thickness, "px; box-shadow: ").concat(-lat, "px ").concat(-offset, "px ").concat(colorValue, ", ").concat(lat, "px ").concat(offset, "px ").concat(colorValue, "}\n    100% {box-shadow: ").concat(lat, "px ").concat(-offset, "px ").concat(colorValue, ", ").concat(-lat, "px ").concat(offset, "px ").concat(colorValue, "}"), "before");
  var after = createAnimation("HashLoader", "0% {height: ".concat(thickness, "px; box-shadow: ").concat(offset, "px ").concat(lat, "px ").concat(color, ", ").concat(-offset, "px ").concat(-lat, "px ").concat(color, "}\n    35% {height: ").concat(cssValue(size), "; box-shadow: ").concat(offset, "px 0 ").concat(color, ", ").concat(-offset, "px 0 ").concat(color, "}\n    70% {height: ").concat(thickness, "px; box-shadow: ").concat(offset, "px ").concat(-lat, "px ").concat(color, ", ").concat(-offset, "px ").concat(lat, "px ").concat(color, "}\n    100% {box-shadow: ").concat(offset, "px ").concat(lat, "px ").concat(color, ", ").concat(-offset, "px ").concat(-lat, "px ").concat(color, "}"), "after");
  var style = function(i) {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "block",
      width: "".concat(value / 5).concat(unit),
      height: "".concat(value / 5).concat(unit),
      borderRadius: "".concat(value / 10).concat(unit),
      transform: "translate(-50%, -50%)",
      animationFillMode: "none",
      animation: "".concat(i === 1 ? before : after, " ").concat(2 / speedMultiplier, "s infinite")
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
const OptionsForm = ({
  purpose = "create",
  tokenId,
  metadata: incomingData,
  metaURI: incomingURI
}) => {
  const FIELD_FORM = 0;
  const URI_FORM = 1;
  const JSON5_FORM = 2;
  const { rwContract } = useWeb3();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting: processing }
  } = useForm({
    defaultValues: {
      uri: incomingURI
    }
  });
  const [metadata, setMetadata] = reactExports.useState(incomingData ?? {});
  const [tab, setTab] = reactExports.useState(FIELD_FORM);
  const { storage, Settings, openSettings } = useConfig();
  const values = watch();
  const json5 = watch("json5");
  const uri = watch("uri");
  const buildMeta = reactExports.useCallback(async ({
    data,
    ipfs = true
  }) => {
    const wrapIPFS = async (filesOrURL) => {
      const isFile = filesOrURL instanceof File;
      const isString = typeof filesOrURL === "string";
      if (isFile || isString) {
        if (ipfs) {
          return await ipfsify({ filesOrURL, storage });
        } else {
          return isFile ? URL.createObjectURL(filesOrURL) : filesOrURL;
        }
      } else {
        throw new Error(`Unknown Media Type: ${typeof image}`);
      }
    };
    const {
      name,
      description,
      homepage,
      color,
      image,
      animation,
      attributes
    } = data;
    const metadata2 = {
      name: isSet(name) ? name : "𝙐𝙣𝙩𝙞𝙩𝙡𝙚𝙙",
      decimals: 0
    };
    if (isSet(description)) {
      metadata2.description = description;
    }
    if (isSet(homepage)) {
      metadata2.external_url = homepage;
    }
    if (image) {
      metadata2.image = await wrapIPFS(image);
    }
    if (animation) {
      metadata2.animation_url = await wrapIPFS(animation);
    }
    if (color?.startsWith("#")) {
      metadata2.background_color = color.substring(1).toUpperCase();
    }
    if (isSet(attributes) && !isEmpty(attributes)) {
      metadata2.attributes = attributes.map(({ name: name2, value, type }) => {
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
  const configure = reactExports.useCallback(
    async ({ metadata: metadata2 }) => {
      if (!rwContract) {
        throw new Error(
          `Cannot connect to contract to ${purpose} metadata.`
        );
      }
      if (tokenId == null) {
        throw new Error("Token id is unset.");
      }
      if (metadata2 == null) {
        throw new Error("metadata is unset.");
      }
      try {
        const tx = await rwContract.setURI(
          BigInt(tokenId),
          metadata2
        );
        await tx.wait(2);
        if (metadata2 !== "") {
          navigate(`/view/${regexify(tokenId)}`);
        }
      } catch (error) {
        console.error({ error });
        Q(extractMessage(error), { type: "error" });
      }
    },
    [rwContract, tokenId, purpose, navigate]
  );
  const submit = reactExports.useCallback(async (data) => {
    try {
      const name = `metadata.${(/* @__PURE__ */ new Date()).toISOString()}.json`;
      let metadata2 = await (async () => {
        switch (tab) {
          case FIELD_FORM: {
            const content = JSON.stringify(
              await buildMeta({ data }),
              null,
              2
            );
            return { name, content };
          }
          case URI_FORM: {
            return data.uri ?? "";
          }
          case JSON5_FORM: {
            if (!isSet(data.json5)) {
              throw new Error("JSON5 isn’t set.");
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
        metadata2 = await ipfsify({ filesOrURL: metadata2, storage });
      }
      await configure({ metadata: metadata2 });
    } catch (error) {
      console.error({ error });
      Q(extractMessage(error));
    }
  }, [buildMeta, configure, storage, tab]);
  const changeTo = reactExports.useMemo(() => ({
    fields: async (previous) => {
      let metaPromise;
      switch (previous) {
        case URI_FORM: {
          if (uri && uri !== "") {
            metaPromise = fetch(uri).then((res) => res.text()).then(
              (txt) => lib.parse(txt)
            );
          }
          break;
        }
        case JSON5_FORM: {
          if (json5 && json5 !== "") {
            metaPromise = Promise.resolve(
              lib.parse(json5)
            );
          }
          break;
        }
      }
      if (metaPromise) {
        setMetadata(null);
        metaPromise.then((meta) => {
          const types = [
            { image: "image" },
            { animation: "animation_url" }
          ];
          for (const typeSet of types) {
            const type = Object.keys(typeSet)[0];
            const key = typeSet[type];
            if (typeof meta[key] === "string" && meta[key].startsWith("blob:")) {
              meta[key] = values[type];
            }
          }
          setMetadata(meta);
        });
      } else {
        Q.warn("No metadata specified.");
      }
    },
    uri: async (previous) => {
      return previous;
    },
    json5: async (previous) => {
      let metaPromise;
      switch (previous) {
        case FIELD_FORM: {
          metaPromise = buildMeta({ data: values, ipfs: false });
          break;
        }
        case URI_FORM: {
          if (uri && uri !== "") {
            metaPromise = fetch(uri).then((res) => res.json());
          }
          break;
        }
      }
      if (metaPromise) {
        setMetadata(null);
        setMetadata(await metaPromise);
      } else {
        Q("No metadata found.");
      }
    }
  }), [uri, json5, buildMeta, values]);
  const onSelect = reactExports.useCallback(
    (idx, previous) => {
      if (idx === previous)
        return;
      let changePromise;
      switch (idx) {
        case FIELD_FORM: {
          changePromise = changeTo.fields(previous);
          break;
        }
        case URI_FORM: {
          changePromise = changeTo.uri(previous);
          break;
        }
        case JSON5_FORM: {
          changePromise = changeTo.json5(previous);
          break;
        }
      }
      changePromise.then(() => setTab(idx));
    },
    [changeTo]
  );
  return /* @__PURE__ */ jsxs("div", { id: os.form, children: [
    reactDomExports.createPortal(
      /* @__PURE__ */ jsx(Settings, {}),
      document.body
    ),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit(submit), children: [
      /* @__PURE__ */ jsx(
        SubmitButton,
        {
          className: "full",
          ...{ purpose, processing, openSettings }
        }
      ),
      /* @__PURE__ */ jsxs(Tabs, { ...{ onSelect }, children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: "Fields" }),
          /* @__PURE__ */ jsx(Tab, { children: "URI" }),
          /* @__PURE__ */ jsx(Tab, { children: "JSON5" })
        ] }),
        [NFTForm, URIForm, JSONForm].map(
          (Form, idx) => /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(Form, { ...{
            register,
            watch,
            setValue,
            tokenId,
            metadata
          } }) }, idx)
        )
      ] }),
      /* @__PURE__ */ jsx(
        SubmitButton,
        {
          requireStorage: true,
          className: "full",
          ...{ purpose, processing, openSettings }
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("section", { id: os.maxes, children: [
      /* @__PURE__ */ jsx(
        MaxForm,
        {
          className: os.max,
          ...{ tokenId, purpose }
        }
      ),
      /* @__PURE__ */ jsx(
        MaxForm,
        {
          perUser: true,
          className: os.max,
          ...{ tokenId, purpose }
        }
      )
    ] })
  ] });
};
const URIForm = ({ register }) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      placeholder: "Enter a URI for the token…",
      ...register("uri")
    }
  );
};
const AttrRow = ({ attributes = [], setValue: setFormValue, index }) => {
  const { name = "", value = "", type = "string" } = attributes[index];
  const setter = reactExports.useCallback(
    (prop) => (value2) => {
      setFormValue(
        "attributes",
        [
          ...attributes.slice(0, index),
          { ...attributes[index], [prop]: value2 },
          ...attributes.slice(index + 1)
        ]
      );
    },
    [setFormValue, index, attributes]
  );
  const setName = setter("name");
  const setValue = setter("value");
  const setType = setter("type");
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
      "input",
      {
        value: name,
        onChange: ({ target: { value: value2 } }) => {
          setName(value2);
        }
      }
    ) }),
    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(
      "select",
      {
        value: type,
        onChange: ({ target: { value: value2 } }) => {
          setType(value2);
        },
        children: [
          /* @__PURE__ */ jsx("option", { value: "string", children: "String" }),
          /* @__PURE__ */ jsx("option", { value: "date", children: "Date" }),
          /* @__PURE__ */ jsx("option", { value: "number", children: "Number" }),
          /* @__PURE__ */ jsx("option", { value: "boost_percentage", children: "Boost Percentage" }),
          /* @__PURE__ */ jsx("option", { value: "boost_number", children: "Boost Number" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("td", { children: (() => {
      switch (type) {
        case "date": {
          return /* @__PURE__ */ jsx(
            "input",
            {
              type: "date",
              value: (() => {
                if (!isEmpty(value)) {
                  try {
                    return new Date(value).toLocaleDateString(
                      "sv",
                      { timeZone: "GMT" }
                    );
                  } catch (e) {
                    console.error(e);
                  }
                }
                return "";
              })(),
              onChange: ({ target: { value: value2 } }) => {
                setValue(new Date(value2).getTime());
              }
            }
          );
        }
        case "string": {
          return /* @__PURE__ */ jsx(
            "input",
            {
              ...{ value },
              onChange: ({ target: { value: value2 } }) => {
                setValue(value2);
              }
            }
          );
        }
        default: {
          return /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              ...{ value },
              onChange: ({ target: { value: value2 } }) => {
                setValue(value2 != null ? Number(value2) : "");
              }
            }
          );
        }
      }
    })() }),
    /* @__PURE__ */ jsxs("td", { className: fs.actions, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setFormValue(
            "attributes",
            [
              ...attributes.slice(0, index + 1),
              { name: "", value: "", type: "string" },
              ...attributes.slice(index + 1)
            ]
          ),
          children: "➕"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setFormValue(
            "attributes",
            [
              ...attributes.slice(0, index),
              ...attributes.slice(index + 1)
            ]
          ),
          children: "❌"
        }
      )
    ] })
  ] });
};
const Hyperlink = ({
  href,
  children
}) => {
  const external = /^(http|ip[nf]s)/.test(href);
  return external ? /* @__PURE__ */ jsx("a", { ...{ href }, target: "_blank", rel: "noreferrer", children }) : /* @__PURE__ */ jsx(Link, { ...{ to: href }, children });
};
const MediaDisplay = ({
  content,
  name = "Alt",
  prop,
  setValue,
  accept = "*/*"
}) => {
  const [filename, setFilename] = reactExports.useState(null);
  const input = reactExports.useRef(null);
  const [type, setType] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let file = typeof content === "string" ? content : content?.name;
    file = file?.replace(
      /^(https?:\/\/[^/]+\/|ip[nf]s:\/\/(.+\/)?)/,
      ""
    );
    setFilename(file);
    const ext = file?.split(".").pop();
    let type2 = "none";
    if (["mp4", "avif", "webm"].includes(ext)) {
      type2 = "video";
    } else if (["mp3", "wav", "ogg", "flac"].includes(ext)) {
      type2 = "audio";
    } else if (["gltf", "glb"].includes(ext)) {
      type2 = "model";
    } else if (file != null) {
      type2 = "image";
    }
    setType(type2);
  }, [content]);
  const set = ({ target: { files } }) => {
    if (files.length >= 1 && files[0]) {
      setValue(prop, files[0]);
      setFilename(files[0].name);
    }
  };
  const remove = (evt) => {
    setValue(prop, void 0);
    setFilename(null);
    evt.preventDefault();
  };
  return /* @__PURE__ */ jsxs("label", { className: fs.media, children: [
    /* @__PURE__ */ jsxs("div", { className: fs.selector, children: [
      /* @__PURE__ */ jsx("h3", { children: capitalize(prop) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          onChange: set,
          ref: input,
          ...{ accept }
        }
      ),
      filename && /* @__PURE__ */ jsx("h4", { children: filename }),
      !content && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => input.current?.click(),
          children: "Set"
        }
      )
    ] }),
    content && /* @__PURE__ */ jsxs("div", { className: fs.content, children: [
      (() => {
        const url = content instanceof File ? URL.createObjectURL(content) : httpURL(content);
        switch (type) {
          case "none": {
            return null;
          }
          case "video": {
            return /* @__PURE__ */ jsx("video", { children: /* @__PURE__ */ jsx("source", { src: url }) });
          }
          case "audio": {
            return /* @__PURE__ */ jsx("audio", { children: /* @__PURE__ */ jsx("source", { src: url }) });
          }
          case "model": {
            return /* @__PURE__ */ jsx(
              ThreeDScene,
              {
                className: fs.model,
                model: url
              }
            );
          }
          default: {
            return /* @__PURE__ */ jsx("img", { alt: name, src: url });
          }
        }
      })(),
      /* @__PURE__ */ jsx("button", { type: "button", onClick: remove, children: "❌" })
    ] })
  ] });
};
const NFTForm = ({
  // purpose = 'create',
  register,
  watch,
  setValue,
  tokenId = "𝘜𝘯𝘬𝘯𝘰𝘸𝘯",
  metadata
}) => {
  const {
    homepage,
    description,
    color,
    image,
    attributes,
    animation,
    name
  } = watch();
  reactExports.useEffect(() => {
    if (metadata) {
      Object.entries({
        name: null,
        description: null,
        image: null,
        external_url: "homepage",
        animation_url: "animation"
      }).forEach(([prop, name2]) => {
        setValue(name2 ?? prop, metadata[prop]);
      });
      const { attributes: attrs } = metadata;
      if (!isEmpty(attrs)) {
        setValue(
          "attributes",
          (attrs ?? []).map(
            ({
              trait_type: name2,
              value,
              display_type: type = "string"
            }) => ({ name: name2, value, type })
          )
        );
      }
      const bg = metadata.background_color;
      if (bg && !isEmpty(bg)) {
        setValue("color", `#${bg}`);
      }
    }
  }, [metadata, setValue]);
  reactExports.useEffect(() => {
    if (!homepage || isEmpty(homepage) || homepage.endsWith("𝘜𝘯𝘬𝘯𝘰𝘸𝘯")) {
      setValue(
        "homepage",
        `${nftBase}/${regexify(tokenId)}`
      );
    }
  }, [homepage, setValue, tokenId]);
  reactExports.useEffect(() => {
    if (window.location.hash) {
      const elem = document.getElementById(
        window.location.hash.substring(1)
      );
      window.scroll({
        top: (elem?.offsetTop ?? 0) - 120,
        behavior: "smooth"
      });
    }
  }, []);
  const addRow = () => {
    setValue("attributes", [...attributes ?? [], {}]);
  };
  return /* @__PURE__ */ jsxs("ul", { children: [
    /* @__PURE__ */ jsx("li", { id: fs.name, children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("h3", { children: "Name" }),
      /* @__PURE__ */ jsx("input", { ...register("name") })
    ] }) }),
    /* @__PURE__ */ jsx("li", { id: fs.image, style: { "--img-bg": color }, children: /* @__PURE__ */ jsx(
      MediaDisplay,
      {
        content: image,
        prop: "image",
        accept: "image/*",
        ...{ name, setValue }
      }
    ) }),
    /* @__PURE__ */ jsx("li", { id: fs.background, children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("h3", { children: "Background" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "color",
          ...register("color")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("li", { id: fs.homepage, children: [
      /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Homepage" }),
        /* @__PURE__ */ jsx("input", { ...register("homepage") })
      ] }),
      homepage?.length > 0 && /* @__PURE__ */ jsx(Hyperlink, { href: homepage, children: "🡽" })
    ] }),
    /* @__PURE__ */ jsx("li", { id: fs.description, children: /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsx("h3", { children: "Description" }),
      /* @__PURE__ */ jsxs(Tabs, { children: [
        /* @__PURE__ */ jsxs(TabList, { children: [
          /* @__PURE__ */ jsx(Tab, { children: "Markdown" }),
          /* @__PURE__ */ jsx(Tab, { children: "Preview" })
        ] }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(
          "textarea",
          {
            placeholder: "Enter a markdown formatted description.",
            ...register("description")
          }
        ) }),
        /* @__PURE__ */ jsx(TabPanel, { children: /* @__PURE__ */ jsx(ReactMarkdown, { children: description }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("li", { id: fs.animation, children: /* @__PURE__ */ jsx(
      MediaDisplay,
      {
        content: animation,
        prop: "animation",
        accept: "model/gltf+json,model/gltf-binary,video/*,.gltf,.glb",
        ...{ name, setValue }
      }
    ) }),
    /* @__PURE__ */ jsxs("li", { id: fs.attributes, children: [
      /* @__PURE__ */ jsxs("label", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Attributes" }),
        /* @__PURE__ */ jsx("button", { type: "button", onClick: addRow, children: "➕" })
      ] }),
      attributes?.length > 0 && /* @__PURE__ */ jsxs("table", { children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { children: "Name" }),
          /* @__PURE__ */ jsx("th", { children: "Type" }),
          /* @__PURE__ */ jsx("th", { children: "Value" }),
          /* @__PURE__ */ jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: attributes.map((_, index) => /* @__PURE__ */ jsx(
          AttrRow,
          {
            ...{
              attributes,
              setValue,
              index
            }
          },
          index
        )) })
      ] })
    ] })
  ] });
};
const JSONForm = ({
  register,
  metadata,
  setValue
}) => {
  reactExports.useEffect(() => {
    if (metadata) {
      setValue("json5", lib.stringify(metadata, null, 2));
    }
  }, [metadata, setValue]);
  return metadata == null ? /* @__PURE__ */ jsxs("section", { id: jf.loading, children: [
    /* @__PURE__ */ jsx(HashLoader, { color: "#EB6300" }),
    /* @__PURE__ */ jsx("p", { children: "Fetching metadata…" })
  ] }) : /* @__PURE__ */ jsx(
    "textarea",
    {
      placeholder: "Enter JSON5 token metadata…",
      ...register("json5")
    }
  );
};
const MaxForm = ({ tokenId, purpose = "create", perUser = false, ...props }) => {
  const [max, setMax] = reactExports.useState(null);
  const [processing, setProcessing] = reactExports.useState(false);
  const { roContract, rwContract } = useWeb3();
  reactExports.useEffect(() => {
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
  }, [tokenId, roContract, perUser]);
  const save = reactExports.useCallback(async (evt) => {
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
      Q(extractMessage(error));
    } finally {
      setProcessing(false);
    }
  }, [max, perUser, rwContract, tokenId]);
  return /* @__PURE__ */ jsxs("form", { onSubmit: save, ...props, children: [
    /* @__PURE__ */ jsxs("label", { children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        perUser && "Per User",
        " Maximum Mintable"
      ] }),
      max == null ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(BarLoader, { color: "#2768ff" }),
        /* @__PURE__ */ jsx("p", { children: "Loading…" })
      ] }) : /* @__PURE__ */ jsx(
        "input",
        {
          type: "number",
          value: max,
          onChange: ({ target: { value } }) => {
            setMax(value.trim().replace(/^0+([^0])/, "$1"));
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      SubmitButton,
      {
        label: `Set ${perUser ? "Per User" : ""} Max`,
        disabled: !/^-?\d+$/.test(max),
        requireStorage: false,
        short: true,
        className: "full",
        ...{ purpose, processing }
      }
    )
  ] });
};
export {
  OptionsForm as O
};
//# sourceMappingURL=MaxForm-ae554f41.js.map
