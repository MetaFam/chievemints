import { aK as BASES, aD as require$$2$1, aE as require$$3, aF as require$$0$4, aG as require$$1$1, ai as getAugmentedNamespace, aL as cjs$2, aM as require$$0$5, aN as require$$0$6, aO as require$$2$2, q as getDefaultExportFromCjs, aP as require$$0$7, aQ as fromString, aR as concat, aS as random, aT as cjs$3, aU as x25519, aV as HKDF_1, aW as sha256, aX as chacha20poly1305, av as getDocument_1, ar as getNavigator_1, aB as detect, ap as getLocation_1, ak as eventsExports, aj as commonjsGlobal, aI as EventEmitter, aC as getWindowMetadata_1, _ as __vitePreload } from "./index-d6dac5c9.js";
import { b as buffer } from "./index-cd0a5607.js";
import { a as safeJsonStringify, s as safeJsonParse, i as isWsUrl, c as cjs$4, b as isLocalhostUrl, f as formatJsonRpcError, d as parseConnectionError, J as JsonRpcProvider, e as isJsonRpcRequest, g as isJsonRpcResponse, h as formatJsonRpcResult, j as isJsonRpcResult, k as isJsonRpcError, l as formatJsonRpcRequest, m as getBigIntRpcId, p as payloadId, H as HttpConnection } from "./http-b176eb0b.js";
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e = m2[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k2 in e) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
function toString(array, encoding = "utf8") {
  const base = BASES[encoding];
  if (!base) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base.encoder.encode(array).substring(1);
}
const RELAY_JSONRPC = {
  waku: {
    publish: "waku_publish",
    batchPublish: "waku_batchPublish",
    subscribe: "waku_subscribe",
    batchSubscribe: "waku_batchSubscribe",
    subscription: "waku_subscription",
    unsubscribe: "waku_unsubscribe",
    batchUnsubscribe: "waku_batchUnsubscribe"
  },
  irn: {
    publish: "irn_publish",
    batchPublish: "irn_batchPublish",
    subscribe: "irn_subscribe",
    batchSubscribe: "irn_batchSubscribe",
    subscription: "irn_subscription",
    unsubscribe: "irn_unsubscribe",
    batchUnsubscribe: "irn_batchUnsubscribe"
  },
  iridium: {
    publish: "iridium_publish",
    batchPublish: "iridium_batchPublish",
    subscribe: "iridium_subscribe",
    batchSubscribe: "iridium_batchSubscribe",
    subscription: "iridium_subscription",
    unsubscribe: "iridium_unsubscribe",
    batchUnsubscribe: "iridium_batchUnsubscribe"
  }
};
var queryString$3 = {};
(function(exports) {
  const strictUriEncode = require$$0$4;
  const decodeComponent = require$$1$1;
  const splitOnFirst = require$$2$1;
  const filterObject = require$$3;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode(key, options), "[", encode(index, options), "]=", encode(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[]"].join("")];
          }
          return [...result, [encode(key, options), "[]=", encode(value, options)].join("")];
        };
      case "colon-list-separator":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), ":list="].join("")];
          }
          return [...result, [encode(key, options), ":list=", encode(value, options)].join("")];
        };
      case "comma":
      case "separator":
      case "bracket-separator": {
        const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          value = value === null ? "" : value;
          if (result.length === 0) {
            return [[encode(key, options), keyValueSep, encode(value, options)].join("")];
          }
          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode(key, options)];
          }
          return [...result, [encode(key, options), "=", encode(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "colon-list-separator":
        return (key, value, accumulator) => {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      case "bracket-separator":
        return (key, value, accumulator) => {
          const isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, "");
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode(item, options));
          if (accumulator[key] === void 0) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a3, b3) => Number(a3) - Number(b3)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
        for (const k2 of Object.keys(value)) {
          value[k2] = parseValue(value[k2], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    const keys2 = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys2.sort(options.sort);
    }
    return keys2.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode(key, options);
      }
      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key, options) + "[]";
        }
        return value.reduce(formatter(key), []).join("&");
      }
      return encode(key, options) + "=" + encode(value, options);
    }).filter((x2) => x2.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign(
      {
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
      },
      options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode(hash, options) } : {}
    );
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true,
      [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true,
      [encodeFragmentIdentifier]: false
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString$3);
function Un(e, n2 = []) {
  const t = [];
  return Object.keys(e).forEach((r) => {
    if (n2.length && !n2.includes(r))
      return;
    const o = e[r];
    t.push(...o.accounts);
  }), t;
}
const nn$3 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
function U$5(e, n2) {
  const { message: t, code: r } = nn$3[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function k$4(e, n2) {
  return Array.isArray(e) ? typeof n2 < "u" && e.length ? e.every(n2) : true : false;
}
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.at(-1) === '"' && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}
function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
function checkBufferSupport() {
  if (typeof buffer.Buffer === void 0) {
    throw new TypeError("[unstorage] Buffer is not supported!");
  }
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  checkBufferSupport();
  const base64 = buffer.Buffer.from(value).toString("base64");
  return BASE64_PREFIX + base64;
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  checkBufferSupport();
  return buffer.Buffer.from(value.slice(BASE64_PREFIX.length), "base64");
}
function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}
function joinKeys(...keys2) {
  return normalizeKey(keys2.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey(base);
  return base ? base + ":" : "";
}
function defineDriver(factory) {
  return factory;
}
const DRIVER_NAME = "memory";
const memory = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    options: {},
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return Array.from(data.keys());
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});
function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          await asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        const keys2 = rawKeys.map((key) => mount.mountpoint + normalizeKey(key)).filter((key) => !maskedMounts.some((p3) => key.startsWith(p3)));
        allKeys.push(...keys2);
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p3) => !p3.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter((key) => key.startsWith(base) && !key.endsWith("$")) : allKeys.filter((key) => !key.endsWith("$"));
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m2) => {
          if (m2.driver.clear) {
            return asyncCall(m2.driver.clear, m2.relativeBase, opts);
          }
          if (m2.driver.removeItem) {
            const keys2 = await m2.driver.getKeys(m2.relativeBase || "", opts);
            return Promise.all(
              keys2.map((key) => m2.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a3, b3) => b3.length - a3.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey(key) + ":";
      const m2 = getMount(key);
      return {
        driver: m2.driver,
        base: m2.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m2) => ({
        driver: m2.driver,
        base: m2.mountpoint
      }));
    }
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function clear(customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.clear();
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}
const x = "idb-keyval";
var z$1 = (i = {}) => {
  const t = i.base && i.base.length > 0 ? `${i.base}:` : "", e = (s) => t + s;
  let n2;
  return i.dbName && i.storeName && (n2 = createStore(i.dbName, i.storeName)), { name: x, options: i, async hasItem(s) {
    return !(typeof await get(e(s), n2) > "u");
  }, async getItem(s) {
    return await get(e(s), n2) ?? null;
  }, setItem(s, a3) {
    return set(e(s), a3, n2);
  }, removeItem(s) {
    return del(e(s), n2);
  }, getKeys() {
    return keys(n2);
  }, clear() {
    return clear(n2);
  } };
};
const D$4 = "WALLET_CONNECT_V2_INDEXED_DB", E$2 = "keyvaluestorage";
let _$3 = class _ {
  constructor() {
    this.indexedDb = createStorage({ driver: z$1({ dbName: D$4, storeName: E$2 }) });
  }
  async getKeys() {
    return this.indexedDb.getKeys();
  }
  async getEntries() {
    return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map((t) => [t.key, t.value]);
  }
  async getItem(t) {
    const e = await this.indexedDb.getItem(t);
    if (e !== null)
      return e;
  }
  async setItem(t, e) {
    await this.indexedDb.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    await this.indexedDb.removeItem(t);
  }
};
var l = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, c = { exports: {} };
(function() {
  let i;
  function t() {
  }
  i = t, i.prototype.getItem = function(e) {
    return this.hasOwnProperty(e) ? String(this[e]) : null;
  }, i.prototype.setItem = function(e, n2) {
    this[e] = String(n2);
  }, i.prototype.removeItem = function(e) {
    delete this[e];
  }, i.prototype.clear = function() {
    const e = this;
    Object.keys(e).forEach(function(n2) {
      e[n2] = void 0, delete e[n2];
    });
  }, i.prototype.key = function(e) {
    return e = e || 0, Object.keys(this)[e];
  }, i.prototype.__defineGetter__("length", function() {
    return Object.keys(this).length;
  }), typeof l < "u" && l.localStorage ? c.exports = l.localStorage : typeof window < "u" && window.localStorage ? c.exports = window.localStorage : c.exports = new t();
})();
function k$3(i) {
  var t;
  return [i[0], safeJsonParse((t = i[1]) != null ? t : "")];
}
let K$1 = class K {
  constructor() {
    this.localStorage = c.exports;
  }
  async getKeys() {
    return Object.keys(this.localStorage);
  }
  async getEntries() {
    return Object.entries(this.localStorage).map(k$3);
  }
  async getItem(t) {
    const e = this.localStorage.getItem(t);
    if (e !== null)
      return safeJsonParse(e);
  }
  async setItem(t, e) {
    this.localStorage.setItem(t, safeJsonStringify(e));
  }
  async removeItem(t) {
    this.localStorage.removeItem(t);
  }
};
const N$3 = "wc_storage_version", y$2 = 1, O$3 = async (i, t, e) => {
  const n2 = N$3, s = await t.getItem(n2);
  if (s && s >= y$2) {
    e(t);
    return;
  }
  const a3 = await i.getKeys();
  if (!a3.length) {
    e(t);
    return;
  }
  const m2 = [];
  for (; a3.length; ) {
    const r = a3.shift();
    if (!r)
      continue;
    const o = r.toLowerCase();
    if (o.includes("wc@") || o.includes("walletconnect") || o.includes("wc_") || o.includes("wallet_connect")) {
      const f3 = await i.getItem(r);
      await t.setItem(r, f3), m2.push(r);
    }
  }
  await t.setItem(n2, y$2), e(t), j$2(i, m2);
}, j$2 = async (i, t) => {
  t.length && t.forEach(async (e) => {
    await i.removeItem(e);
  });
};
let h$4 = class h {
  constructor() {
    this.initialized = false, this.setInitialized = (e) => {
      this.storage = e, this.initialized = true;
    };
    const t = new K$1();
    this.storage = t;
    try {
      const e = new _$3();
      O$3(t, e, this.setInitialized);
    } catch {
      this.initialized = true;
    }
  }
  async getKeys() {
    return await this.initialize(), this.storage.getKeys();
  }
  async getEntries() {
    return await this.initialize(), this.storage.getEntries();
  }
  async getItem(t) {
    return await this.initialize(), this.storage.getItem(t);
  }
  async setItem(t, e) {
    return await this.initialize(), this.storage.setItem(t, e);
  }
  async removeItem(t) {
    return await this.initialize(), this.storage.removeItem(t);
  }
  async initialize() {
    this.initialized || await new Promise((t) => {
      const e = setInterval(() => {
        this.initialized && (clearInterval(e), t());
      }, 20);
    });
  }
};
var cjs$1 = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics$1 = function(d2, b3) {
  extendStatics$1 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b4) {
    d3.__proto__ = b4;
  } || function(d3, b4) {
    for (var p3 in b4)
      if (b4.hasOwnProperty(p3))
        d3[p3] = b4[p3];
  };
  return extendStatics$1(d2, b3);
};
function __extends$1(d2, b3) {
  extendStatics$1(d2, b3);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p3 in s)
        if (Object.prototype.hasOwnProperty.call(s, p3))
          t[p3] = s[p3];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function __rest$1(s, e) {
  var t = {};
  for (var p3 in s)
    if (Object.prototype.hasOwnProperty.call(s, p3) && e.indexOf(p3) < 0)
      t[p3] = s[p3];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p3 = Object.getOwnPropertySymbols(s); i < p3.length; i++) {
      if (e.indexOf(p3[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p3[i]))
        t[p3[i]] = s[p3[i]];
    }
  return t;
}
function __decorate$1(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d2 = decorators[i])
        r = (c2 < 3 ? d2(r) : c2 > 3 ? d2(target, key, r) : d2(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param$1(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata$1(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter$1(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator$1(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f3, y3, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n2) {
    return function(v3) {
      return step([n2, v3]);
    };
  }
  function step(op) {
    if (f3)
      throw new TypeError("Generator is already executing.");
    while (_3)
      try {
        if (f3 = 1, y3 && (t = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t = y3["return"]) && t.call(y3), 0) : y3.next) && !(t = t.call(y3, op[1])).done)
          return t;
        if (y3 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _3.label++;
            return { value: op[1], done: false };
          case 5:
            _3.label++;
            y3 = op[1];
            op = [0];
            continue;
          case 7:
            op = _3.ops.pop();
            _3.trys.pop();
            continue;
          default:
            if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _3 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _3.label = op[1];
              break;
            }
            if (op[0] === 6 && _3.label < t[1]) {
              _3.label = t[1];
              t = op;
              break;
            }
            if (t && _3.label < t[2]) {
              _3.label = t[2];
              _3.ops.push(op);
              break;
            }
            if (t[2])
              _3.ops.pop();
            _3.trys.pop();
            continue;
        }
        op = body.call(thisArg, _3);
      } catch (e) {
        op = [6, e];
        y3 = 0;
      } finally {
        f3 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding$1(o, m2, k2, k22) {
  if (k22 === void 0)
    k22 = k2;
  o[k22] = m2[k2];
}
function __exportStar$1(m2, exports) {
  for (var p3 in m2)
    if (p3 !== "default" && !exports.hasOwnProperty(p3))
      exports[p3] = m2[p3];
}
function __values$1(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read$1(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r, ar2 = [], e;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r = i.next()).done)
      ar2.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar2;
}
function __spread$1() {
  for (var ar2 = [], i = 0; i < arguments.length; i++)
    ar2 = ar2.concat(__read$1(arguments[i]));
  return ar2;
}
function __spreadArrays$1() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k2 = 0, i = 0; i < il; i++)
    for (var a3 = arguments[i], j2 = 0, jl = a3.length; j2 < jl; j2++, k2++)
      r[k2] = a3[j2];
  return r;
}
function __await$1(v3) {
  return this instanceof __await$1 ? (this.v = v3, this) : new __await$1(v3);
}
function __asyncGenerator$1(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i, q2 = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n2) {
    if (g3[n2])
      i[n2] = function(v3) {
        return new Promise(function(a3, b3) {
          q2.push([n2, v3, a3, b3]) > 1 || resume(n2, v3);
        });
      };
  }
  function resume(n2, v3) {
    try {
      step(g3[n2](v3));
    } catch (e) {
      settle(q2[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await$1 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q2[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f3, v3) {
    if (f3(v3), q2.shift(), q2.length)
      resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator$1(o) {
  var i, p3;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n2, f3) {
    i[n2] = o[n2] ? function(v3) {
      return (p3 = !p3) ? { value: __await$1(o[n2](v3)), done: n2 === "return" } : f3 ? f3(v3) : v3;
    } : f3;
  }
}
function __asyncValues$1(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o[Symbol.asyncIterator], i;
  return m2 ? m2.call(o) : (o = typeof __values$1 === "function" ? __values$1(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n2) {
    i[n2] = o[n2] && function(v3) {
      return new Promise(function(resolve, reject) {
        v3 = o[n2](v3), settle(resolve, reject, v3.done, v3.value);
      });
    };
  }
  function settle(resolve, reject, d2, v3) {
    Promise.resolve(v3).then(function(v4) {
      resolve({ value: v4, done: d2 });
    }, reject);
  }
}
function __makeTemplateObject$1(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar$1(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod)
      if (Object.hasOwnProperty.call(mod, k2))
        result[k2] = mod[k2];
  }
  result.default = mod;
  return result;
}
function __importDefault$1(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet$1(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet$1(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
const tslib_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return __assign$1;
  },
  __asyncDelegator: __asyncDelegator$1,
  __asyncGenerator: __asyncGenerator$1,
  __asyncValues: __asyncValues$1,
  __await: __await$1,
  __awaiter: __awaiter$1,
  __classPrivateFieldGet: __classPrivateFieldGet$1,
  __classPrivateFieldSet: __classPrivateFieldSet$1,
  __createBinding: __createBinding$1,
  __decorate: __decorate$1,
  __exportStar: __exportStar$1,
  __extends: __extends$1,
  __generator: __generator$1,
  __importDefault: __importDefault$1,
  __importStar: __importStar$1,
  __makeTemplateObject: __makeTemplateObject$1,
  __metadata: __metadata$1,
  __param: __param$1,
  __read: __read$1,
  __rest: __rest$1,
  __spread: __spread$1,
  __spreadArrays: __spreadArrays$1,
  __values: __values$1
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$3 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6$1);
var heartbeat$2 = {};
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(cjs$2);
var types = {};
var heartbeat$1 = {};
class IEvents {
}
const esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  IEvents
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$2 = /* @__PURE__ */ getAugmentedNamespace(esm);
var hasRequiredHeartbeat$2;
function requireHeartbeat$2() {
  if (hasRequiredHeartbeat$2)
    return heartbeat$1;
  hasRequiredHeartbeat$2 = 1;
  Object.defineProperty(heartbeat$1, "__esModule", { value: true });
  heartbeat$1.IHeartBeat = void 0;
  const events_1 = require$$0$2;
  class IHeartBeat extends events_1.IEvents {
    constructor(opts) {
      super();
    }
  }
  heartbeat$1.IHeartBeat = IHeartBeat;
  return heartbeat$1;
}
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes)
    return types;
  hasRequiredTypes = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require$$0$3;
    tslib_1.__exportStar(requireHeartbeat$2(), exports);
  })(types);
  return types;
}
var constants$1 = {};
var heartbeat = {};
var hasRequiredHeartbeat$1;
function requireHeartbeat$1() {
  if (hasRequiredHeartbeat$1)
    return heartbeat;
  hasRequiredHeartbeat$1 = 1;
  Object.defineProperty(heartbeat, "__esModule", { value: true });
  heartbeat.HEARTBEAT_EVENTS = heartbeat.HEARTBEAT_INTERVAL = void 0;
  const time_1 = require$$2;
  heartbeat.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
  heartbeat.HEARTBEAT_EVENTS = {
    pulse: "heartbeat_pulse"
  };
  return heartbeat;
}
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1)
    return constants$1;
  hasRequiredConstants$1 = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    const tslib_1 = require$$0$3;
    tslib_1.__exportStar(requireHeartbeat$1(), exports);
  })(constants$1);
  return constants$1;
}
var hasRequiredHeartbeat;
function requireHeartbeat() {
  if (hasRequiredHeartbeat)
    return heartbeat$2;
  hasRequiredHeartbeat = 1;
  Object.defineProperty(heartbeat$2, "__esModule", { value: true });
  heartbeat$2.HeartBeat = void 0;
  const tslib_1 = require$$0$3;
  const events_1 = require$$0$5;
  const time_1 = require$$2;
  const types_1 = requireTypes();
  const constants_1 = requireConstants$1();
  class HeartBeat extends types_1.IHeartBeat {
    constructor(opts) {
      super(opts);
      this.events = new events_1.EventEmitter();
      this.interval = constants_1.HEARTBEAT_INTERVAL;
      this.interval = (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
    }
    static init(opts) {
      return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const heartbeat2 = new HeartBeat(opts);
        yield heartbeat2.init();
        return heartbeat2;
      });
    }
    init() {
      return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield this.initialize();
      });
    }
    stop() {
      clearInterval(this.intervalRef);
    }
    on(event, listener) {
      this.events.on(event, listener);
    }
    once(event, listener) {
      this.events.once(event, listener);
    }
    off(event, listener) {
      this.events.off(event, listener);
    }
    removeListener(event, listener) {
      this.events.removeListener(event, listener);
    }
    initialize() {
      return tslib_1.__awaiter(this, void 0, void 0, function* () {
        this.intervalRef = setInterval(() => this.pulse(), time_1.toMiliseconds(this.interval));
      });
    }
    pulse() {
      this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
    }
  }
  heartbeat$2.HeartBeat = HeartBeat;
  return heartbeat$2;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require$$0$3;
  tslib_1.__exportStar(requireHeartbeat(), exports);
  tslib_1.__exportStar(requireTypes(), exports);
  tslib_1.__exportStar(requireConstants$1(), exports);
})(cjs$1);
var cjs = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d2, b3) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b4) {
    d3.__proto__ = b4;
  } || function(d3, b4) {
    for (var p3 in b4)
      if (b4.hasOwnProperty(p3))
        d3[p3] = b4[p3];
  };
  return extendStatics(d2, b3);
};
function __extends(d2, b3) {
  extendStatics(d2, b3);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b3 === null ? Object.create(b3) : (__.prototype = b3.prototype, new __());
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p3 in s)
        if (Object.prototype.hasOwnProperty.call(s, p3))
          t[p3] = s[p3];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p3 in s)
    if (Object.prototype.hasOwnProperty.call(s, p3) && e.indexOf(p3) < 0)
      t[p3] = s[p3];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p3 = Object.getOwnPropertySymbols(s); i < p3.length; i++) {
      if (e.indexOf(p3[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p3[i]))
        t[p3[i]] = s[p3[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d2 = decorators[i])
        r = (c2 < 3 ? d2(r) : c2 > 3 ? d2(target, key, r) : d2(target, key)) || r;
  return c2 > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _3 = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f3, y3, t, g3;
  return g3 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g3[Symbol.iterator] = function() {
    return this;
  }), g3;
  function verb(n2) {
    return function(v3) {
      return step([n2, v3]);
    };
  }
  function step(op) {
    if (f3)
      throw new TypeError("Generator is already executing.");
    while (_3)
      try {
        if (f3 = 1, y3 && (t = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t = y3["return"]) && t.call(y3), 0) : y3.next) && !(t = t.call(y3, op[1])).done)
          return t;
        if (y3 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _3.label++;
            return { value: op[1], done: false };
          case 5:
            _3.label++;
            y3 = op[1];
            op = [0];
            continue;
          case 7:
            op = _3.ops.pop();
            _3.trys.pop();
            continue;
          default:
            if (!(t = _3.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _3 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _3.label = op[1];
              break;
            }
            if (op[0] === 6 && _3.label < t[1]) {
              _3.label = t[1];
              t = op;
              break;
            }
            if (t && _3.label < t[2]) {
              _3.label = t[2];
              _3.ops.push(op);
              break;
            }
            if (t[2])
              _3.ops.pop();
            _3.trys.pop();
            continue;
        }
        op = body.call(thisArg, _3);
      } catch (e) {
        op = [6, e];
        y3 = 0;
      } finally {
        f3 = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding(o, m2, k2, k22) {
  if (k22 === void 0)
    k22 = k2;
  o[k22] = m2[k2];
}
function __exportStar(m2, exports) {
  for (var p3 in m2)
    if (p3 !== "default" && !exports.hasOwnProperty(p3))
      exports[p3] = m2[p3];
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m2 = s && o[s], i = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r, ar2 = [], e;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r = i.next()).done)
      ar2.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar2;
}
function __spread() {
  for (var ar2 = [], i = 0; i < arguments.length; i++)
    ar2 = ar2.concat(__read(arguments[i]));
  return ar2;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k2 = 0, i = 0; i < il; i++)
    for (var a3 = arguments[i], j2 = 0, jl = a3.length; j2 < jl; j2++, k2++)
      r[k2] = a3[j2];
  return r;
}
function __await(v3) {
  return this instanceof __await ? (this.v = v3, this) : new __await(v3);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g3 = generator.apply(thisArg, _arguments || []), i, q2 = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n2) {
    if (g3[n2])
      i[n2] = function(v3) {
        return new Promise(function(a3, b3) {
          q2.push([n2, v3, a3, b3]) > 1 || resume(n2, v3);
        });
      };
  }
  function resume(n2, v3) {
    try {
      step(g3[n2](v3));
    } catch (e) {
      settle(q2[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q2[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f3, v3) {
    if (f3(v3), q2.shift(), q2.length)
      resume(q2[0][0], q2[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p3;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n2, f3) {
    i[n2] = o[n2] ? function(v3) {
      return (p3 = !p3) ? { value: __await(o[n2](v3)), done: n2 === "return" } : f3 ? f3(v3) : v3;
    } : f3;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o[Symbol.asyncIterator], i;
  return m2 ? m2.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n2) {
    i[n2] = o[n2] && function(v3) {
      return new Promise(function(resolve, reject) {
        v3 = o[n2](v3), settle(resolve, reject, v3.done, v3.value);
      });
    };
  }
  function settle(resolve, reject, d2, v3) {
    Promise.resolve(v3).then(function(v4) {
      resolve({ value: v4, done: d2 });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k2 in mod)
      if (Object.hasOwnProperty.call(mod, k2))
        result[k2] = mod[k2];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
const tslib_es6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get __assign() {
    return __assign;
  },
  __asyncDelegator,
  __asyncGenerator,
  __asyncValues,
  __await,
  __awaiter,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __createBinding,
  __decorate,
  __exportStar,
  __extends,
  __generator,
  __importDefault,
  __importStar,
  __makeTemplateObject,
  __metadata,
  __param,
  __read,
  __rest,
  __spread,
  __spreadArrays,
  __values
}, Symbol.toStringTag, { value: "Module" }));
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6);
var quickFormatUnescaped;
var hasRequiredQuickFormatUnescaped;
function requireQuickFormatUnescaped() {
  if (hasRequiredQuickFormatUnescaped)
    return quickFormatUnescaped;
  hasRequiredQuickFormatUnescaped = 1;
  function tryStringify(o) {
    try {
      return JSON.stringify(o);
    } catch (e) {
      return '"[Circular]"';
    }
  }
  quickFormatUnescaped = format;
  function format(f3, args, opts) {
    var ss2 = opts && opts.stringify || tryStringify;
    var offset = 1;
    if (typeof f3 === "object" && f3 !== null) {
      var len = args.length + offset;
      if (len === 1)
        return f3;
      var objects = new Array(len);
      objects[0] = ss2(f3);
      for (var index = 1; index < len; index++) {
        objects[index] = ss2(args[index]);
      }
      return objects.join(" ");
    }
    if (typeof f3 !== "string") {
      return f3;
    }
    var argLen = args.length;
    if (argLen === 0)
      return f3;
    var str = "";
    var a3 = 1 - offset;
    var lastPos = -1;
    var flen = f3 && f3.length || 0;
    for (var i = 0; i < flen; ) {
      if (f3.charCodeAt(i) === 37 && i + 1 < flen) {
        lastPos = lastPos > -1 ? lastPos : 0;
        switch (f3.charCodeAt(i + 1)) {
          case 100:
          case 102:
            if (a3 >= argLen)
              break;
            if (args[a3] == null)
              break;
            if (lastPos < i)
              str += f3.slice(lastPos, i);
            str += Number(args[a3]);
            lastPos = i + 2;
            i++;
            break;
          case 105:
            if (a3 >= argLen)
              break;
            if (args[a3] == null)
              break;
            if (lastPos < i)
              str += f3.slice(lastPos, i);
            str += Math.floor(Number(args[a3]));
            lastPos = i + 2;
            i++;
            break;
          case 79:
          case 111:
          case 106:
            if (a3 >= argLen)
              break;
            if (args[a3] === void 0)
              break;
            if (lastPos < i)
              str += f3.slice(lastPos, i);
            var type = typeof args[a3];
            if (type === "string") {
              str += "'" + args[a3] + "'";
              lastPos = i + 2;
              i++;
              break;
            }
            if (type === "function") {
              str += args[a3].name || "<anonymous>";
              lastPos = i + 2;
              i++;
              break;
            }
            str += ss2(args[a3]);
            lastPos = i + 2;
            i++;
            break;
          case 115:
            if (a3 >= argLen)
              break;
            if (lastPos < i)
              str += f3.slice(lastPos, i);
            str += String(args[a3]);
            lastPos = i + 2;
            i++;
            break;
          case 37:
            if (lastPos < i)
              str += f3.slice(lastPos, i);
            str += "%";
            lastPos = i + 2;
            i++;
            a3--;
            break;
        }
        ++a3;
      }
      ++i;
    }
    if (lastPos === -1)
      return f3;
    else if (lastPos < flen) {
      str += f3.slice(lastPos);
    }
    return str;
  }
  return quickFormatUnescaped;
}
var browser$2;
var hasRequiredBrowser$1;
function requireBrowser$1() {
  if (hasRequiredBrowser$1)
    return browser$2;
  hasRequiredBrowser$1 = 1;
  const format = requireQuickFormatUnescaped();
  browser$2 = pino;
  const _console = pfGlobalThisOrFallback().console || {};
  const stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
  };
  function shouldSerialize(serialize, serializers) {
    if (Array.isArray(serialize)) {
      const hasToFilter = serialize.filter(function(k2) {
        return k2 !== "!stdSerializers.err";
      });
      return hasToFilter;
    } else if (serialize === true) {
      return Object.keys(serializers);
    }
    return false;
  }
  function pino(opts) {
    opts = opts || {};
    opts.browser = opts.browser || {};
    const transmit2 = opts.browser.transmit;
    if (transmit2 && typeof transmit2.send !== "function") {
      throw Error("pino: transmit option must have a send function");
    }
    const proto = opts.browser.write || _console;
    if (opts.browser.write)
      opts.browser.asObject = true;
    const serializers = opts.serializers || {};
    const serialize = shouldSerialize(opts.browser.serialize, serializers);
    let stdErrSerialize = opts.browser.serialize;
    if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1)
      stdErrSerialize = false;
    const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
    if (typeof proto === "function") {
      proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
    }
    if (opts.enabled === false)
      opts.level = "silent";
    const level = opts.level || "info";
    const logger = Object.create(proto);
    if (!logger.log)
      logger.log = noop;
    Object.defineProperty(logger, "levelVal", {
      get: getLevelVal
    });
    Object.defineProperty(logger, "level", {
      get: getLevel,
      set: setLevel
    });
    const setOpts = {
      transmit: transmit2,
      serialize,
      asObject: opts.browser.asObject,
      levels,
      timestamp: getTimeFunction(opts)
    };
    logger.levels = pino.levels;
    logger.level = level;
    logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
    logger.serializers = serializers;
    logger._serialize = serialize;
    logger._stdErrSerialize = stdErrSerialize;
    logger.child = child;
    if (transmit2)
      logger._logEvent = createLogEventShape();
    function getLevelVal() {
      return this.level === "silent" ? Infinity : this.levels.values[this.level];
    }
    function getLevel() {
      return this._level;
    }
    function setLevel(level2) {
      if (level2 !== "silent" && !this.levels.values[level2]) {
        throw Error("unknown level " + level2);
      }
      this._level = level2;
      set2(setOpts, logger, "error", "log");
      set2(setOpts, logger, "fatal", "error");
      set2(setOpts, logger, "warn", "error");
      set2(setOpts, logger, "info", "log");
      set2(setOpts, logger, "debug", "log");
      set2(setOpts, logger, "trace", "log");
    }
    function child(bindings, childOptions) {
      if (!bindings) {
        throw new Error("missing bindings for child Pino");
      }
      childOptions = childOptions || {};
      if (serialize && bindings.serializers) {
        childOptions.serializers = bindings.serializers;
      }
      const childOptionsSerializers = childOptions.serializers;
      if (serialize && childOptionsSerializers) {
        var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
        var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
        delete bindings.serializers;
        applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
      }
      function Child(parent) {
        this._childLevel = (parent._childLevel | 0) + 1;
        this.error = bind(parent, bindings, "error");
        this.fatal = bind(parent, bindings, "fatal");
        this.warn = bind(parent, bindings, "warn");
        this.info = bind(parent, bindings, "info");
        this.debug = bind(parent, bindings, "debug");
        this.trace = bind(parent, bindings, "trace");
        if (childSerializers) {
          this.serializers = childSerializers;
          this._serialize = childSerialize;
        }
        if (transmit2) {
          this._logEvent = createLogEventShape(
            [].concat(parent._logEvent.bindings, bindings)
          );
        }
      }
      Child.prototype = this;
      return new Child(this);
    }
    return logger;
  }
  pino.levels = {
    values: {
      fatal: 60,
      error: 50,
      warn: 40,
      info: 30,
      debug: 20,
      trace: 10
    },
    labels: {
      10: "trace",
      20: "debug",
      30: "info",
      40: "warn",
      50: "error",
      60: "fatal"
    }
  };
  pino.stdSerializers = stdSerializers;
  pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
  function set2(opts, logger, level, fallback) {
    const proto = Object.getPrototypeOf(logger);
    logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
    wrap(opts, logger, level);
  }
  function wrap(opts, logger, level) {
    if (!opts.transmit && logger[level] === noop)
      return;
    logger[level] = function(write) {
      return function LOG() {
        const ts2 = opts.timestamp();
        const args = new Array(arguments.length);
        const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
        for (var i = 0; i < args.length; i++)
          args[i] = arguments[i];
        if (opts.serialize && !opts.asObject) {
          applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
        }
        if (opts.asObject)
          write.call(proto, asObject(this, level, args, ts2));
        else
          write.apply(proto, args);
        if (opts.transmit) {
          const transmitLevel = opts.transmit.level || logger.level;
          const transmitValue = pino.levels.values[transmitLevel];
          const methodValue = pino.levels.values[level];
          if (methodValue < transmitValue)
            return;
          transmit(this, {
            ts: ts2,
            methodLevel: level,
            methodValue,
            transmitLevel,
            transmitValue: pino.levels.values[opts.transmit.level || logger.level],
            send: opts.transmit.send,
            val: logger.levelVal
          }, args);
        }
      };
    }(logger[level]);
  }
  function asObject(logger, level, args, ts2) {
    if (logger._serialize)
      applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
    const argsCloned = args.slice();
    let msg = argsCloned[0];
    const o = {};
    if (ts2) {
      o.time = ts2;
    }
    o.level = pino.levels.values[level];
    let lvl = (logger._childLevel | 0) + 1;
    if (lvl < 1)
      lvl = 1;
    if (msg !== null && typeof msg === "object") {
      while (lvl-- && typeof argsCloned[0] === "object") {
        Object.assign(o, argsCloned.shift());
      }
      msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
    } else if (typeof msg === "string")
      msg = format(argsCloned.shift(), argsCloned);
    if (msg !== void 0)
      o.msg = msg;
    return o;
  }
  function applySerializers(args, serialize, serializers, stdErrSerialize) {
    for (const i in args) {
      if (stdErrSerialize && args[i] instanceof Error) {
        args[i] = pino.stdSerializers.err(args[i]);
      } else if (typeof args[i] === "object" && !Array.isArray(args[i])) {
        for (const k2 in args[i]) {
          if (serialize && serialize.indexOf(k2) > -1 && k2 in serializers) {
            args[i][k2] = serializers[k2](args[i][k2]);
          }
        }
      }
    }
  }
  function bind(parent, bindings, level) {
    return function() {
      const args = new Array(1 + arguments.length);
      args[0] = bindings;
      for (var i = 1; i < args.length; i++) {
        args[i] = arguments[i - 1];
      }
      return parent[level].apply(this, args);
    };
  }
  function transmit(logger, opts, args) {
    const send = opts.send;
    const ts2 = opts.ts;
    const methodLevel = opts.methodLevel;
    const methodValue = opts.methodValue;
    const val = opts.val;
    const bindings = logger._logEvent.bindings;
    applySerializers(
      args,
      logger._serialize || Object.keys(logger.serializers),
      logger.serializers,
      logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
    );
    logger._logEvent.ts = ts2;
    logger._logEvent.messages = args.filter(function(arg) {
      return bindings.indexOf(arg) === -1;
    });
    logger._logEvent.level.label = methodLevel;
    logger._logEvent.level.value = methodValue;
    send(methodLevel, logger._logEvent, val);
    logger._logEvent = createLogEventShape(bindings);
  }
  function createLogEventShape(bindings) {
    return {
      ts: 0,
      messages: [],
      bindings: bindings || [],
      level: { label: "", value: 0 }
    };
  }
  function asErrValue(err) {
    const obj = {
      type: err.constructor.name,
      msg: err.message,
      stack: err.stack
    };
    for (const key in err) {
      if (obj[key] === void 0) {
        obj[key] = err[key];
      }
    }
    return obj;
  }
  function getTimeFunction(opts) {
    if (typeof opts.timestamp === "function") {
      return opts.timestamp;
    }
    if (opts.timestamp === false) {
      return nullTime;
    }
    return epochTime;
  }
  function mock() {
    return {};
  }
  function passthrough(a3) {
    return a3;
  }
  function noop() {
  }
  function nullTime() {
    return false;
  }
  function epochTime() {
    return Date.now();
  }
  function unixTime() {
    return Math.round(Date.now() / 1e3);
  }
  function isoTime() {
    return new Date(Date.now()).toISOString();
  }
  function pfGlobalThisOrFallback() {
    function defd(o) {
      return typeof o !== "undefined" && o;
    }
    try {
      if (typeof globalThis !== "undefined")
        return globalThis;
      Object.defineProperty(Object.prototype, "globalThis", {
        get: function() {
          delete Object.prototype.globalThis;
          return this.globalThis = this;
        },
        configurable: true
      });
      return globalThis;
    } catch (e) {
      return defd(self) || defd(window) || defd(this) || {};
    }
  }
  return browser$2;
}
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants)
    return constants;
  hasRequiredConstants = 1;
  Object.defineProperty(constants, "__esModule", { value: true });
  constants.PINO_CUSTOM_CONTEXT_KEY = constants.PINO_LOGGER_DEFAULTS = void 0;
  constants.PINO_LOGGER_DEFAULTS = {
    level: "info"
  };
  constants.PINO_CUSTOM_CONTEXT_KEY = "custom_context";
  return constants;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  Object.defineProperty(utils, "__esModule", { value: true });
  utils.generateChildLogger = utils.formatChildLoggerContext = utils.getLoggerContext = utils.setBrowserLoggerContext = utils.getBrowserLoggerContext = utils.getDefaultLoggerOptions = void 0;
  const constants_1 = requireConstants();
  function getDefaultLoggerOptions(opts) {
    return Object.assign(Object.assign({}, opts), { level: (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level });
  }
  utils.getDefaultLoggerOptions = getDefaultLoggerOptions;
  function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    return logger[customContextKey] || "";
  }
  utils.getBrowserLoggerContext = getBrowserLoggerContext;
  function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    logger[customContextKey] = context;
    return logger;
  }
  utils.setBrowserLoggerContext = setBrowserLoggerContext;
  function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    let context = "";
    if (typeof logger.bindings === "undefined") {
      context = getBrowserLoggerContext(logger, customContextKey);
    } else {
      context = logger.bindings().context || "";
    }
    return context;
  }
  utils.getLoggerContext = getLoggerContext;
  function formatChildLoggerContext(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const parentContext = getLoggerContext(logger, customContextKey);
    const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
    return context;
  }
  utils.formatChildLoggerContext = formatChildLoggerContext;
  function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
    const context = formatChildLoggerContext(logger, childContext, customContextKey);
    const child = logger.child({ context });
    return setBrowserLoggerContext(child, context, customContextKey);
  }
  utils.generateChildLogger = generateChildLogger;
  return utils;
}
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.pino = void 0;
  const tslib_1 = require$$0$1;
  const pino_1 = tslib_1.__importDefault(requireBrowser$1());
  Object.defineProperty(exports, "pino", { enumerable: true, get: function() {
    return pino_1.default;
  } });
  tslib_1.__exportStar(requireConstants(), exports);
  tslib_1.__exportStar(requireUtils(), exports);
})(cjs);
class n extends IEvents {
  constructor(s) {
    super(), this.opts = s, this.protocol = "wc", this.version = 2;
  }
}
let h$3 = class h2 extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t, this.records = /* @__PURE__ */ new Map();
  }
};
let a$1 = class a {
  constructor(s, t) {
    this.logger = s, this.core = t;
  }
};
let u$1 = class u extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
};
let g$3 = class g extends IEvents {
  constructor(s) {
    super();
  }
};
let p$3 = class p {
  constructor(s, t, o, M2) {
    this.core = s, this.logger = t, this.name = o;
  }
};
class d extends IEvents {
  constructor(s, t) {
    super(), this.relayer = s, this.logger = t;
  }
}
let E$1 = class E extends IEvents {
  constructor(s, t) {
    super(), this.core = s, this.logger = t;
  }
};
let y$1 = class y {
  constructor(s, t) {
    this.projectId = s, this.logger = t;
  }
};
let v$2 = class v {
  constructor(s, t) {
    this.projectId = s, this.logger = t;
  }
};
var ed25519 = {};
var sha512$2 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var binary_1 = require$$0$6;
  var wipe_1 = require$$2$2;
  exports.DIGEST_LENGTH = 64;
  exports.BLOCK_SIZE = 128;
  var SHA512 = (
    /** @class */
    function() {
      function SHA5122() {
        this.digestLength = exports.DIGEST_LENGTH;
        this.blockSize = exports.BLOCK_SIZE;
        this._stateHi = new Int32Array(8);
        this._stateLo = new Int32Array(8);
        this._tempHi = new Int32Array(16);
        this._tempLo = new Int32Array(16);
        this._buffer = new Uint8Array(256);
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        this.reset();
      }
      SHA5122.prototype._initState = function() {
        this._stateHi[0] = 1779033703;
        this._stateHi[1] = 3144134277;
        this._stateHi[2] = 1013904242;
        this._stateHi[3] = 2773480762;
        this._stateHi[4] = 1359893119;
        this._stateHi[5] = 2600822924;
        this._stateHi[6] = 528734635;
        this._stateHi[7] = 1541459225;
        this._stateLo[0] = 4089235720;
        this._stateLo[1] = 2227873595;
        this._stateLo[2] = 4271175723;
        this._stateLo[3] = 1595750129;
        this._stateLo[4] = 2917565137;
        this._stateLo[5] = 725511199;
        this._stateLo[6] = 4215389547;
        this._stateLo[7] = 327033209;
      };
      SHA5122.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
      };
      SHA5122.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._tempHi);
        wipe_1.wipe(this._tempLo);
        this.reset();
      };
      SHA5122.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) {
          dataLength = data.length;
        }
        if (this._finished) {
          throw new Error("SHA512: can't update because hash was finished.");
        }
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
          while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          if (this._bufferLength === this.blockSize) {
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
            this._bufferLength = 0;
          }
        }
        if (dataLength >= this.blockSize) {
          dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
          dataLength %= this.blockSize;
        }
        while (dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        return this;
      };
      SHA5122.prototype.finish = function(out) {
        if (!this._finished) {
          var bytesHashed = this._bytesHashed;
          var left = this._bufferLength;
          var bitLenHi = bytesHashed / 536870912 | 0;
          var bitLenLo = bytesHashed << 3;
          var padLength = bytesHashed % 128 < 112 ? 128 : 256;
          this._buffer[left] = 128;
          for (var i = left + 1; i < padLength - 8; i++) {
            this._buffer[i] = 0;
          }
          binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
          binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
          hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
          this._finished = true;
        }
        for (var i = 0; i < this.digestLength / 8; i++) {
          binary_1.writeUint32BE(this._stateHi[i], out, i * 8);
          binary_1.writeUint32BE(this._stateLo[i], out, i * 8 + 4);
        }
        return this;
      };
      SHA5122.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      };
      SHA5122.prototype.saveState = function() {
        if (this._finished) {
          throw new Error("SHA256: cannot save finished state");
        }
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      };
      SHA5122.prototype.restoreState = function(savedState) {
        this._stateHi.set(savedState.stateHi);
        this._stateLo.set(savedState.stateLo);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) {
          this._buffer.set(savedState.buffer);
        }
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
      };
      SHA5122.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.stateHi);
        wipe_1.wipe(savedState.stateLo);
        if (savedState.buffer) {
          wipe_1.wipe(savedState.buffer);
        }
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
      };
      return SHA5122;
    }()
  );
  exports.SHA512 = SHA512;
  var K3 = new Int32Array([
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ]);
  function hashBlocks(wh, wl, hh, hl, m2, pos, len) {
    var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
    var h4, l2;
    var th, tl;
    var a3, b3, c2, d2;
    while (len >= 128) {
      for (var i = 0; i < 16; i++) {
        var j2 = 8 * i + pos;
        wh[i] = binary_1.readUint32BE(m2, j2);
        wl[i] = binary_1.readUint32BE(m2, j2 + 4);
      }
      for (var i = 0; i < 80; i++) {
        var bh0 = ah0;
        var bh1 = ah1;
        var bh2 = ah2;
        var bh3 = ah3;
        var bh4 = ah4;
        var bh5 = ah5;
        var bh6 = ah6;
        var bh7 = ah7;
        var bl0 = al0;
        var bl1 = al1;
        var bl2 = al2;
        var bl3 = al3;
        var bl4 = al4;
        var bl5 = al5;
        var bl6 = al6;
        var bl7 = al7;
        h4 = ah7;
        l2 = al7;
        a3 = l2 & 65535;
        b3 = l2 >>> 16;
        c2 = h4 & 65535;
        d2 = h4 >>> 16;
        h4 = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
        l2 = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        h4 = ah4 & ah5 ^ ~ah4 & ah6;
        l2 = al4 & al5 ^ ~al4 & al6;
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        h4 = K3[i * 2];
        l2 = K3[i * 2 + 1];
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        h4 = wh[i % 16];
        l2 = wl[i % 16];
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        b3 += a3 >>> 16;
        c2 += b3 >>> 16;
        d2 += c2 >>> 16;
        th = c2 & 65535 | d2 << 16;
        tl = a3 & 65535 | b3 << 16;
        h4 = th;
        l2 = tl;
        a3 = l2 & 65535;
        b3 = l2 >>> 16;
        c2 = h4 & 65535;
        d2 = h4 >>> 16;
        h4 = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
        l2 = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        h4 = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
        l2 = al0 & al1 ^ al0 & al2 ^ al1 & al2;
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        b3 += a3 >>> 16;
        c2 += b3 >>> 16;
        d2 += c2 >>> 16;
        bh7 = c2 & 65535 | d2 << 16;
        bl7 = a3 & 65535 | b3 << 16;
        h4 = bh3;
        l2 = bl3;
        a3 = l2 & 65535;
        b3 = l2 >>> 16;
        c2 = h4 & 65535;
        d2 = h4 >>> 16;
        h4 = th;
        l2 = tl;
        a3 += l2 & 65535;
        b3 += l2 >>> 16;
        c2 += h4 & 65535;
        d2 += h4 >>> 16;
        b3 += a3 >>> 16;
        c2 += b3 >>> 16;
        d2 += c2 >>> 16;
        bh3 = c2 & 65535 | d2 << 16;
        bl3 = a3 & 65535 | b3 << 16;
        ah1 = bh0;
        ah2 = bh1;
        ah3 = bh2;
        ah4 = bh3;
        ah5 = bh4;
        ah6 = bh5;
        ah7 = bh6;
        ah0 = bh7;
        al1 = bl0;
        al2 = bl1;
        al3 = bl2;
        al4 = bl3;
        al5 = bl4;
        al6 = bl5;
        al7 = bl6;
        al0 = bl7;
        if (i % 16 === 15) {
          for (var j2 = 0; j2 < 16; j2++) {
            h4 = wh[j2];
            l2 = wl[j2];
            a3 = l2 & 65535;
            b3 = l2 >>> 16;
            c2 = h4 & 65535;
            d2 = h4 >>> 16;
            h4 = wh[(j2 + 9) % 16];
            l2 = wl[(j2 + 9) % 16];
            a3 += l2 & 65535;
            b3 += l2 >>> 16;
            c2 += h4 & 65535;
            d2 += h4 >>> 16;
            th = wh[(j2 + 1) % 16];
            tl = wl[(j2 + 1) % 16];
            h4 = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
            l2 = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
            a3 += l2 & 65535;
            b3 += l2 >>> 16;
            c2 += h4 & 65535;
            d2 += h4 >>> 16;
            th = wh[(j2 + 14) % 16];
            tl = wl[(j2 + 14) % 16];
            h4 = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
            l2 = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
            a3 += l2 & 65535;
            b3 += l2 >>> 16;
            c2 += h4 & 65535;
            d2 += h4 >>> 16;
            b3 += a3 >>> 16;
            c2 += b3 >>> 16;
            d2 += c2 >>> 16;
            wh[j2] = c2 & 65535 | d2 << 16;
            wl[j2] = a3 & 65535 | b3 << 16;
          }
        }
      }
      h4 = ah0;
      l2 = al0;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[0];
      l2 = hl[0];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[0] = ah0 = c2 & 65535 | d2 << 16;
      hl[0] = al0 = a3 & 65535 | b3 << 16;
      h4 = ah1;
      l2 = al1;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[1];
      l2 = hl[1];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[1] = ah1 = c2 & 65535 | d2 << 16;
      hl[1] = al1 = a3 & 65535 | b3 << 16;
      h4 = ah2;
      l2 = al2;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[2];
      l2 = hl[2];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[2] = ah2 = c2 & 65535 | d2 << 16;
      hl[2] = al2 = a3 & 65535 | b3 << 16;
      h4 = ah3;
      l2 = al3;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[3];
      l2 = hl[3];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[3] = ah3 = c2 & 65535 | d2 << 16;
      hl[3] = al3 = a3 & 65535 | b3 << 16;
      h4 = ah4;
      l2 = al4;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[4];
      l2 = hl[4];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[4] = ah4 = c2 & 65535 | d2 << 16;
      hl[4] = al4 = a3 & 65535 | b3 << 16;
      h4 = ah5;
      l2 = al5;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[5];
      l2 = hl[5];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[5] = ah5 = c2 & 65535 | d2 << 16;
      hl[5] = al5 = a3 & 65535 | b3 << 16;
      h4 = ah6;
      l2 = al6;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[6];
      l2 = hl[6];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[6] = ah6 = c2 & 65535 | d2 << 16;
      hl[6] = al6 = a3 & 65535 | b3 << 16;
      h4 = ah7;
      l2 = al7;
      a3 = l2 & 65535;
      b3 = l2 >>> 16;
      c2 = h4 & 65535;
      d2 = h4 >>> 16;
      h4 = hh[7];
      l2 = hl[7];
      a3 += l2 & 65535;
      b3 += l2 >>> 16;
      c2 += h4 & 65535;
      d2 += h4 >>> 16;
      b3 += a3 >>> 16;
      c2 += b3 >>> 16;
      d2 += c2 >>> 16;
      hh[7] = ah7 = c2 & 65535 | d2 << 16;
      hl[7] = al7 = a3 & 65535 | b3 << 16;
      pos += 128;
      len -= 128;
    }
    return pos;
  }
  function hash(data) {
    var h4 = new SHA512();
    h4.update(data);
    var digest = h4.digest();
    h4.clean();
    return digest;
  }
  exports.hash = hash;
})(sha512$2);
const sha512 = /* @__PURE__ */ getDefaultExportFromCjs(sha512$2);
const sha512$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: sha512
}, [sha512$2]);
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(sha512$1);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
  const random_1 = require$$0$7;
  const sha512_1 = require$$1;
  const wipe_1 = require$$2$2;
  exports.SIGNATURE_LENGTH = 64;
  exports.PUBLIC_KEY_LENGTH = 32;
  exports.SECRET_KEY_LENGTH = 64;
  exports.SEED_LENGTH = 32;
  function gf(init) {
    const r = new Float64Array(16);
    if (init) {
      for (let i = 0; i < init.length; i++) {
        r[i] = init[i];
      }
    }
    return r;
  }
  const _9 = new Uint8Array(32);
  _9[0] = 9;
  const gf0 = gf();
  const gf1 = gf([1]);
  const D2 = gf([
    30883,
    4953,
    19914,
    30187,
    55467,
    16705,
    2637,
    112,
    59544,
    30585,
    16505,
    36039,
    65139,
    11119,
    27886,
    20995
  ]);
  const D22 = gf([
    61785,
    9906,
    39828,
    60374,
    45398,
    33411,
    5274,
    224,
    53552,
    61171,
    33010,
    6542,
    64743,
    22239,
    55772,
    9222
  ]);
  const X2 = gf([
    54554,
    36645,
    11616,
    51542,
    42930,
    38181,
    51040,
    26924,
    56412,
    64982,
    57905,
    49316,
    21502,
    52590,
    14035,
    8553
  ]);
  const Y = gf([
    26200,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214,
    26214
  ]);
  const I2 = gf([
    41136,
    18958,
    6951,
    50414,
    58488,
    44335,
    6150,
    12099,
    55207,
    15867,
    153,
    11085,
    57099,
    20417,
    9344,
    11139
  ]);
  function set25519(r, a3) {
    for (let i = 0; i < 16; i++) {
      r[i] = a3[i] | 0;
    }
  }
  function car25519(o) {
    let c2 = 1;
    for (let i = 0; i < 16; i++) {
      let v3 = o[i] + c2 + 65535;
      c2 = Math.floor(v3 / 65536);
      o[i] = v3 - c2 * 65536;
    }
    o[0] += c2 - 1 + 37 * (c2 - 1);
  }
  function sel25519(p3, q2, b3) {
    const c2 = ~(b3 - 1);
    for (let i = 0; i < 16; i++) {
      const t = c2 & (p3[i] ^ q2[i]);
      p3[i] ^= t;
      q2[i] ^= t;
    }
  }
  function pack25519(o, n2) {
    const m2 = gf();
    const t = gf();
    for (let i = 0; i < 16; i++) {
      t[i] = n2[i];
    }
    car25519(t);
    car25519(t);
    car25519(t);
    for (let j2 = 0; j2 < 2; j2++) {
      m2[0] = t[0] - 65517;
      for (let i = 1; i < 15; i++) {
        m2[i] = t[i] - 65535 - (m2[i - 1] >> 16 & 1);
        m2[i - 1] &= 65535;
      }
      m2[15] = t[15] - 32767 - (m2[14] >> 16 & 1);
      const b3 = m2[15] >> 16 & 1;
      m2[14] &= 65535;
      sel25519(t, m2, 1 - b3);
    }
    for (let i = 0; i < 16; i++) {
      o[2 * i] = t[i] & 255;
      o[2 * i + 1] = t[i] >> 8;
    }
  }
  function verify32(x2, y3) {
    let d2 = 0;
    for (let i = 0; i < 32; i++) {
      d2 |= x2[i] ^ y3[i];
    }
    return (1 & d2 - 1 >>> 8) - 1;
  }
  function neq25519(a3, b3) {
    const c2 = new Uint8Array(32);
    const d2 = new Uint8Array(32);
    pack25519(c2, a3);
    pack25519(d2, b3);
    return verify32(c2, d2);
  }
  function par25519(a3) {
    const d2 = new Uint8Array(32);
    pack25519(d2, a3);
    return d2[0] & 1;
  }
  function unpack25519(o, n2) {
    for (let i = 0; i < 16; i++) {
      o[i] = n2[2 * i] + (n2[2 * i + 1] << 8);
    }
    o[15] &= 32767;
  }
  function add(o, a3, b3) {
    for (let i = 0; i < 16; i++) {
      o[i] = a3[i] + b3[i];
    }
  }
  function sub(o, a3, b3) {
    for (let i = 0; i < 16; i++) {
      o[i] = a3[i] - b3[i];
    }
  }
  function mul(o, a3, b3) {
    let v3, c2, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b3[0], b1 = b3[1], b22 = b3[2], b32 = b3[3], b4 = b3[4], b5 = b3[5], b6 = b3[6], b7 = b3[7], b8 = b3[8], b9 = b3[9], b10 = b3[10], b11 = b3[11], b12 = b3[12], b13 = b3[13], b14 = b3[14], b15 = b3[15];
    v3 = a3[0];
    t0 += v3 * b0;
    t1 += v3 * b1;
    t2 += v3 * b22;
    t3 += v3 * b32;
    t4 += v3 * b4;
    t5 += v3 * b5;
    t6 += v3 * b6;
    t7 += v3 * b7;
    t8 += v3 * b8;
    t9 += v3 * b9;
    t10 += v3 * b10;
    t11 += v3 * b11;
    t12 += v3 * b12;
    t13 += v3 * b13;
    t14 += v3 * b14;
    t15 += v3 * b15;
    v3 = a3[1];
    t1 += v3 * b0;
    t2 += v3 * b1;
    t3 += v3 * b22;
    t4 += v3 * b32;
    t5 += v3 * b4;
    t6 += v3 * b5;
    t7 += v3 * b6;
    t8 += v3 * b7;
    t9 += v3 * b8;
    t10 += v3 * b9;
    t11 += v3 * b10;
    t12 += v3 * b11;
    t13 += v3 * b12;
    t14 += v3 * b13;
    t15 += v3 * b14;
    t16 += v3 * b15;
    v3 = a3[2];
    t2 += v3 * b0;
    t3 += v3 * b1;
    t4 += v3 * b22;
    t5 += v3 * b32;
    t6 += v3 * b4;
    t7 += v3 * b5;
    t8 += v3 * b6;
    t9 += v3 * b7;
    t10 += v3 * b8;
    t11 += v3 * b9;
    t12 += v3 * b10;
    t13 += v3 * b11;
    t14 += v3 * b12;
    t15 += v3 * b13;
    t16 += v3 * b14;
    t17 += v3 * b15;
    v3 = a3[3];
    t3 += v3 * b0;
    t4 += v3 * b1;
    t5 += v3 * b22;
    t6 += v3 * b32;
    t7 += v3 * b4;
    t8 += v3 * b5;
    t9 += v3 * b6;
    t10 += v3 * b7;
    t11 += v3 * b8;
    t12 += v3 * b9;
    t13 += v3 * b10;
    t14 += v3 * b11;
    t15 += v3 * b12;
    t16 += v3 * b13;
    t17 += v3 * b14;
    t18 += v3 * b15;
    v3 = a3[4];
    t4 += v3 * b0;
    t5 += v3 * b1;
    t6 += v3 * b22;
    t7 += v3 * b32;
    t8 += v3 * b4;
    t9 += v3 * b5;
    t10 += v3 * b6;
    t11 += v3 * b7;
    t12 += v3 * b8;
    t13 += v3 * b9;
    t14 += v3 * b10;
    t15 += v3 * b11;
    t16 += v3 * b12;
    t17 += v3 * b13;
    t18 += v3 * b14;
    t19 += v3 * b15;
    v3 = a3[5];
    t5 += v3 * b0;
    t6 += v3 * b1;
    t7 += v3 * b22;
    t8 += v3 * b32;
    t9 += v3 * b4;
    t10 += v3 * b5;
    t11 += v3 * b6;
    t12 += v3 * b7;
    t13 += v3 * b8;
    t14 += v3 * b9;
    t15 += v3 * b10;
    t16 += v3 * b11;
    t17 += v3 * b12;
    t18 += v3 * b13;
    t19 += v3 * b14;
    t20 += v3 * b15;
    v3 = a3[6];
    t6 += v3 * b0;
    t7 += v3 * b1;
    t8 += v3 * b22;
    t9 += v3 * b32;
    t10 += v3 * b4;
    t11 += v3 * b5;
    t12 += v3 * b6;
    t13 += v3 * b7;
    t14 += v3 * b8;
    t15 += v3 * b9;
    t16 += v3 * b10;
    t17 += v3 * b11;
    t18 += v3 * b12;
    t19 += v3 * b13;
    t20 += v3 * b14;
    t21 += v3 * b15;
    v3 = a3[7];
    t7 += v3 * b0;
    t8 += v3 * b1;
    t9 += v3 * b22;
    t10 += v3 * b32;
    t11 += v3 * b4;
    t12 += v3 * b5;
    t13 += v3 * b6;
    t14 += v3 * b7;
    t15 += v3 * b8;
    t16 += v3 * b9;
    t17 += v3 * b10;
    t18 += v3 * b11;
    t19 += v3 * b12;
    t20 += v3 * b13;
    t21 += v3 * b14;
    t22 += v3 * b15;
    v3 = a3[8];
    t8 += v3 * b0;
    t9 += v3 * b1;
    t10 += v3 * b22;
    t11 += v3 * b32;
    t12 += v3 * b4;
    t13 += v3 * b5;
    t14 += v3 * b6;
    t15 += v3 * b7;
    t16 += v3 * b8;
    t17 += v3 * b9;
    t18 += v3 * b10;
    t19 += v3 * b11;
    t20 += v3 * b12;
    t21 += v3 * b13;
    t22 += v3 * b14;
    t23 += v3 * b15;
    v3 = a3[9];
    t9 += v3 * b0;
    t10 += v3 * b1;
    t11 += v3 * b22;
    t12 += v3 * b32;
    t13 += v3 * b4;
    t14 += v3 * b5;
    t15 += v3 * b6;
    t16 += v3 * b7;
    t17 += v3 * b8;
    t18 += v3 * b9;
    t19 += v3 * b10;
    t20 += v3 * b11;
    t21 += v3 * b12;
    t22 += v3 * b13;
    t23 += v3 * b14;
    t24 += v3 * b15;
    v3 = a3[10];
    t10 += v3 * b0;
    t11 += v3 * b1;
    t12 += v3 * b22;
    t13 += v3 * b32;
    t14 += v3 * b4;
    t15 += v3 * b5;
    t16 += v3 * b6;
    t17 += v3 * b7;
    t18 += v3 * b8;
    t19 += v3 * b9;
    t20 += v3 * b10;
    t21 += v3 * b11;
    t22 += v3 * b12;
    t23 += v3 * b13;
    t24 += v3 * b14;
    t25 += v3 * b15;
    v3 = a3[11];
    t11 += v3 * b0;
    t12 += v3 * b1;
    t13 += v3 * b22;
    t14 += v3 * b32;
    t15 += v3 * b4;
    t16 += v3 * b5;
    t17 += v3 * b6;
    t18 += v3 * b7;
    t19 += v3 * b8;
    t20 += v3 * b9;
    t21 += v3 * b10;
    t22 += v3 * b11;
    t23 += v3 * b12;
    t24 += v3 * b13;
    t25 += v3 * b14;
    t26 += v3 * b15;
    v3 = a3[12];
    t12 += v3 * b0;
    t13 += v3 * b1;
    t14 += v3 * b22;
    t15 += v3 * b32;
    t16 += v3 * b4;
    t17 += v3 * b5;
    t18 += v3 * b6;
    t19 += v3 * b7;
    t20 += v3 * b8;
    t21 += v3 * b9;
    t22 += v3 * b10;
    t23 += v3 * b11;
    t24 += v3 * b12;
    t25 += v3 * b13;
    t26 += v3 * b14;
    t27 += v3 * b15;
    v3 = a3[13];
    t13 += v3 * b0;
    t14 += v3 * b1;
    t15 += v3 * b22;
    t16 += v3 * b32;
    t17 += v3 * b4;
    t18 += v3 * b5;
    t19 += v3 * b6;
    t20 += v3 * b7;
    t21 += v3 * b8;
    t22 += v3 * b9;
    t23 += v3 * b10;
    t24 += v3 * b11;
    t25 += v3 * b12;
    t26 += v3 * b13;
    t27 += v3 * b14;
    t28 += v3 * b15;
    v3 = a3[14];
    t14 += v3 * b0;
    t15 += v3 * b1;
    t16 += v3 * b22;
    t17 += v3 * b32;
    t18 += v3 * b4;
    t19 += v3 * b5;
    t20 += v3 * b6;
    t21 += v3 * b7;
    t22 += v3 * b8;
    t23 += v3 * b9;
    t24 += v3 * b10;
    t25 += v3 * b11;
    t26 += v3 * b12;
    t27 += v3 * b13;
    t28 += v3 * b14;
    t29 += v3 * b15;
    v3 = a3[15];
    t15 += v3 * b0;
    t16 += v3 * b1;
    t17 += v3 * b22;
    t18 += v3 * b32;
    t19 += v3 * b4;
    t20 += v3 * b5;
    t21 += v3 * b6;
    t22 += v3 * b7;
    t23 += v3 * b8;
    t24 += v3 * b9;
    t25 += v3 * b10;
    t26 += v3 * b11;
    t27 += v3 * b12;
    t28 += v3 * b13;
    t29 += v3 * b14;
    t30 += v3 * b15;
    t0 += 38 * t16;
    t1 += 38 * t17;
    t2 += 38 * t18;
    t3 += 38 * t19;
    t4 += 38 * t20;
    t5 += 38 * t21;
    t6 += 38 * t22;
    t7 += 38 * t23;
    t8 += 38 * t24;
    t9 += 38 * t25;
    t10 += 38 * t26;
    t11 += 38 * t27;
    t12 += 38 * t28;
    t13 += 38 * t29;
    t14 += 38 * t30;
    c2 = 1;
    v3 = t0 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t0 = v3 - c2 * 65536;
    v3 = t1 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t1 = v3 - c2 * 65536;
    v3 = t2 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t2 = v3 - c2 * 65536;
    v3 = t3 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t3 = v3 - c2 * 65536;
    v3 = t4 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t4 = v3 - c2 * 65536;
    v3 = t5 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t5 = v3 - c2 * 65536;
    v3 = t6 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t6 = v3 - c2 * 65536;
    v3 = t7 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t7 = v3 - c2 * 65536;
    v3 = t8 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t8 = v3 - c2 * 65536;
    v3 = t9 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t9 = v3 - c2 * 65536;
    v3 = t10 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t10 = v3 - c2 * 65536;
    v3 = t11 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t11 = v3 - c2 * 65536;
    v3 = t12 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t12 = v3 - c2 * 65536;
    v3 = t13 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t13 = v3 - c2 * 65536;
    v3 = t14 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t14 = v3 - c2 * 65536;
    v3 = t15 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t15 = v3 - c2 * 65536;
    t0 += c2 - 1 + 37 * (c2 - 1);
    c2 = 1;
    v3 = t0 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t0 = v3 - c2 * 65536;
    v3 = t1 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t1 = v3 - c2 * 65536;
    v3 = t2 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t2 = v3 - c2 * 65536;
    v3 = t3 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t3 = v3 - c2 * 65536;
    v3 = t4 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t4 = v3 - c2 * 65536;
    v3 = t5 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t5 = v3 - c2 * 65536;
    v3 = t6 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t6 = v3 - c2 * 65536;
    v3 = t7 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t7 = v3 - c2 * 65536;
    v3 = t8 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t8 = v3 - c2 * 65536;
    v3 = t9 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t9 = v3 - c2 * 65536;
    v3 = t10 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t10 = v3 - c2 * 65536;
    v3 = t11 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t11 = v3 - c2 * 65536;
    v3 = t12 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t12 = v3 - c2 * 65536;
    v3 = t13 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t13 = v3 - c2 * 65536;
    v3 = t14 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t14 = v3 - c2 * 65536;
    v3 = t15 + c2 + 65535;
    c2 = Math.floor(v3 / 65536);
    t15 = v3 - c2 * 65536;
    t0 += c2 - 1 + 37 * (c2 - 1);
    o[0] = t0;
    o[1] = t1;
    o[2] = t2;
    o[3] = t3;
    o[4] = t4;
    o[5] = t5;
    o[6] = t6;
    o[7] = t7;
    o[8] = t8;
    o[9] = t9;
    o[10] = t10;
    o[11] = t11;
    o[12] = t12;
    o[13] = t13;
    o[14] = t14;
    o[15] = t15;
  }
  function square(o, a3) {
    mul(o, a3, a3);
  }
  function inv25519(o, i) {
    const c2 = gf();
    let a3;
    for (a3 = 0; a3 < 16; a3++) {
      c2[a3] = i[a3];
    }
    for (a3 = 253; a3 >= 0; a3--) {
      square(c2, c2);
      if (a3 !== 2 && a3 !== 4) {
        mul(c2, c2, i);
      }
    }
    for (a3 = 0; a3 < 16; a3++) {
      o[a3] = c2[a3];
    }
  }
  function pow2523(o, i) {
    const c2 = gf();
    let a3;
    for (a3 = 0; a3 < 16; a3++) {
      c2[a3] = i[a3];
    }
    for (a3 = 250; a3 >= 0; a3--) {
      square(c2, c2);
      if (a3 !== 1) {
        mul(c2, c2, i);
      }
    }
    for (a3 = 0; a3 < 16; a3++) {
      o[a3] = c2[a3];
    }
  }
  function edadd(p3, q2) {
    const a3 = gf(), b3 = gf(), c2 = gf(), d2 = gf(), e = gf(), f3 = gf(), g3 = gf(), h4 = gf(), t = gf();
    sub(a3, p3[1], p3[0]);
    sub(t, q2[1], q2[0]);
    mul(a3, a3, t);
    add(b3, p3[0], p3[1]);
    add(t, q2[0], q2[1]);
    mul(b3, b3, t);
    mul(c2, p3[3], q2[3]);
    mul(c2, c2, D22);
    mul(d2, p3[2], q2[2]);
    add(d2, d2, d2);
    sub(e, b3, a3);
    sub(f3, d2, c2);
    add(g3, d2, c2);
    add(h4, b3, a3);
    mul(p3[0], e, f3);
    mul(p3[1], h4, g3);
    mul(p3[2], g3, f3);
    mul(p3[3], e, h4);
  }
  function cswap(p3, q2, b3) {
    for (let i = 0; i < 4; i++) {
      sel25519(p3[i], q2[i], b3);
    }
  }
  function pack(r, p3) {
    const tx = gf(), ty = gf(), zi = gf();
    inv25519(zi, p3[2]);
    mul(tx, p3[0], zi);
    mul(ty, p3[1], zi);
    pack25519(r, ty);
    r[31] ^= par25519(tx) << 7;
  }
  function scalarmult(p3, q2, s) {
    set25519(p3[0], gf0);
    set25519(p3[1], gf1);
    set25519(p3[2], gf1);
    set25519(p3[3], gf0);
    for (let i = 255; i >= 0; --i) {
      const b3 = s[i / 8 | 0] >> (i & 7) & 1;
      cswap(p3, q2, b3);
      edadd(q2, p3);
      edadd(p3, p3);
      cswap(p3, q2, b3);
    }
  }
  function scalarbase(p3, s) {
    const q2 = [gf(), gf(), gf(), gf()];
    set25519(q2[0], X2);
    set25519(q2[1], Y);
    set25519(q2[2], gf1);
    mul(q2[3], X2, Y);
    scalarmult(p3, q2, s);
  }
  function generateKeyPairFromSeed(seed) {
    if (seed.length !== exports.SEED_LENGTH) {
      throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
    }
    const d2 = (0, sha512_1.hash)(seed);
    d2[0] &= 248;
    d2[31] &= 127;
    d2[31] |= 64;
    const publicKey = new Uint8Array(32);
    const p3 = [gf(), gf(), gf(), gf()];
    scalarbase(p3, d2);
    pack(publicKey, p3);
    const secretKey = new Uint8Array(64);
    secretKey.set(seed);
    secretKey.set(publicKey, 32);
    return {
      publicKey,
      secretKey
    };
  }
  exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
  function generateKeyPair2(prng) {
    const seed = (0, random_1.randomBytes)(32, prng);
    const result = generateKeyPairFromSeed(seed);
    (0, wipe_1.wipe)(seed);
    return result;
  }
  exports.generateKeyPair = generateKeyPair2;
  function extractPublicKeyFromSecretKey(secretKey) {
    if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
      throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
    }
    return new Uint8Array(secretKey.subarray(32));
  }
  exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
  const L2 = new Float64Array([
    237,
    211,
    245,
    92,
    26,
    99,
    18,
    88,
    214,
    156,
    247,
    162,
    222,
    249,
    222,
    20,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    16
  ]);
  function modL(r, x2) {
    let carry;
    let i;
    let j2;
    let k2;
    for (i = 63; i >= 32; --i) {
      carry = 0;
      for (j2 = i - 32, k2 = i - 12; j2 < k2; ++j2) {
        x2[j2] += carry - 16 * x2[i] * L2[j2 - (i - 32)];
        carry = Math.floor((x2[j2] + 128) / 256);
        x2[j2] -= carry * 256;
      }
      x2[j2] += carry;
      x2[i] = 0;
    }
    carry = 0;
    for (j2 = 0; j2 < 32; j2++) {
      x2[j2] += carry - (x2[31] >> 4) * L2[j2];
      carry = x2[j2] >> 8;
      x2[j2] &= 255;
    }
    for (j2 = 0; j2 < 32; j2++) {
      x2[j2] -= carry * L2[j2];
    }
    for (i = 0; i < 32; i++) {
      x2[i + 1] += x2[i] >> 8;
      r[i] = x2[i] & 255;
    }
  }
  function reduce(r) {
    const x2 = new Float64Array(64);
    for (let i = 0; i < 64; i++) {
      x2[i] = r[i];
    }
    for (let i = 0; i < 64; i++) {
      r[i] = 0;
    }
    modL(r, x2);
  }
  function sign(secretKey, message) {
    const x2 = new Float64Array(64);
    const p3 = [gf(), gf(), gf(), gf()];
    const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d2[0] &= 248;
    d2[31] &= 127;
    d2[31] |= 64;
    const signature = new Uint8Array(64);
    signature.set(d2.subarray(32), 32);
    const hs2 = new sha512_1.SHA512();
    hs2.update(signature.subarray(32));
    hs2.update(message);
    const r = hs2.digest();
    hs2.clean();
    reduce(r);
    scalarbase(p3, r);
    pack(signature, p3);
    hs2.reset();
    hs2.update(signature.subarray(0, 32));
    hs2.update(secretKey.subarray(32));
    hs2.update(message);
    const h4 = hs2.digest();
    reduce(h4);
    for (let i = 0; i < 32; i++) {
      x2[i] = r[i];
    }
    for (let i = 0; i < 32; i++) {
      for (let j2 = 0; j2 < 32; j2++) {
        x2[i + j2] += h4[i] * d2[j2];
      }
    }
    modL(signature.subarray(32), x2);
    return signature;
  }
  exports.sign = sign;
  function unpackneg(r, p3) {
    const t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
    set25519(r[2], gf1);
    unpack25519(r[1], p3);
    square(num, r[1]);
    mul(den, num, D2);
    sub(num, num, r[2]);
    add(den, r[2], den);
    square(den2, den);
    square(den4, den2);
    mul(den6, den4, den2);
    mul(t, den6, num);
    mul(t, t, den);
    pow2523(t, t);
    mul(t, t, num);
    mul(t, t, den);
    mul(t, t, den);
    mul(r[0], t, den);
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) {
      mul(r[0], r[0], I2);
    }
    square(chk, r[0]);
    mul(chk, chk, den);
    if (neq25519(chk, num)) {
      return -1;
    }
    if (par25519(r[0]) === p3[31] >> 7) {
      sub(r[0], gf0, r[0]);
    }
    mul(r[3], r[0], r[1]);
    return 0;
  }
  function verify(publicKey, message, signature) {
    const t = new Uint8Array(32);
    const p3 = [gf(), gf(), gf(), gf()];
    const q2 = [gf(), gf(), gf(), gf()];
    if (signature.length !== exports.SIGNATURE_LENGTH) {
      throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
    }
    if (unpackneg(q2, publicKey)) {
      return false;
    }
    const hs2 = new sha512_1.SHA512();
    hs2.update(signature.subarray(0, 32));
    hs2.update(publicKey);
    hs2.update(message);
    const h4 = hs2.digest();
    reduce(h4);
    scalarmult(p3, q2, h4);
    scalarbase(q2, signature.subarray(32));
    edadd(p3, q2);
    pack(t, p3);
    if (verify32(signature, t)) {
      return false;
    }
    return true;
  }
  exports.verify = verify;
  function convertPublicKeyToX25519(publicKey) {
    let q2 = [gf(), gf(), gf(), gf()];
    if (unpackneg(q2, publicKey)) {
      throw new Error("Ed25519: invalid public key");
    }
    let a3 = gf();
    let b3 = gf();
    let y3 = q2[1];
    add(a3, gf1, y3);
    sub(b3, gf1, y3);
    inv25519(b3, b3);
    mul(a3, a3, b3);
    let z2 = new Uint8Array(32);
    pack25519(z2, a3);
    return z2;
  }
  exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
  function convertSecretKeyToX25519(secretKey) {
    const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
    d2[0] &= 248;
    d2[31] &= 127;
    d2[31] |= 64;
    const o = new Uint8Array(d2.subarray(0, 32));
    (0, wipe_1.wipe)(d2);
    return o;
  }
  exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
})(ed25519);
const JWT_IRIDIUM_ALG = "EdDSA";
const JWT_IRIDIUM_TYP = "JWT";
const JWT_DELIMITER = ".";
const JWT_ENCODING = "base64url";
const JSON_ENCODING = "utf8";
const DATA_ENCODING = "utf8";
const DID_DELIMITER = ":";
const DID_PREFIX = "did";
const DID_METHOD = "key";
const MULTICODEC_ED25519_ENCODING = "base58btc";
const MULTICODEC_ED25519_BASE = "z";
const MULTICODEC_ED25519_HEADER = "K36";
const KEY_PAIR_SEED_LENGTH = 32;
function encodeJSON(val) {
  return toString(fromString(safeJsonStringify(val), JSON_ENCODING), JWT_ENCODING);
}
function encodeIss(publicKey) {
  const header = fromString(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
  const multicodec = MULTICODEC_ED25519_BASE + toString(concat([header, publicKey]), MULTICODEC_ED25519_ENCODING);
  return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}
function encodeSig(bytes) {
  return toString(bytes, JWT_ENCODING);
}
function encodeData(params) {
  return fromString([encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER), DATA_ENCODING);
}
function encodeJWT(params) {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature)
  ].join(JWT_DELIMITER);
}
function generateKeyPair(seed = random.randomBytes(KEY_PAIR_SEED_LENGTH)) {
  return ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = cjs$3.fromMiliseconds(Date.now())) {
  const header = { alg: JWT_IRIDIUM_ALG, typ: JWT_IRIDIUM_TYP };
  const iss = encodeIss(keyPair.publicKey);
  const exp = iat + ttl;
  const payload = { iss, sub, aud, iat, exp };
  const data = encodeData({ header, payload });
  const signature = ed25519.sign(keyPair.secretKey, data);
  return encodeJWT({ header, payload, signature });
}
var queryString$2 = {};
(function(exports) {
  const strictUriEncode = require$$0$4;
  const decodeComponent = require$$1$1;
  const splitOnFirst = require$$2$1;
  const filterObject = require$$3;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode(key, options), "[", encode(index, options), "]=", encode(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[]"].join("")];
          }
          return [...result, [encode(key, options), "[]=", encode(value, options)].join("")];
        };
      case "colon-list-separator":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), ":list="].join("")];
          }
          return [...result, [encode(key, options), ":list=", encode(value, options)].join("")];
        };
      case "comma":
      case "separator":
      case "bracket-separator": {
        const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          value = value === null ? "" : value;
          if (result.length === 0) {
            return [[encode(key, options), keyValueSep, encode(value, options)].join("")];
          }
          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode(key, options)];
          }
          return [...result, [encode(key, options), "=", encode(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "colon-list-separator":
        return (key, value, accumulator) => {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      case "bracket-separator":
        return (key, value, accumulator) => {
          const isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, "");
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode(item, options));
          if (accumulator[key] === void 0) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a3, b3) => Number(a3) - Number(b3)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
        for (const k2 of Object.keys(value)) {
          value[k2] = parseValue(value[k2], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    const keys2 = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys2.sort(options.sort);
    }
    return keys2.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode(key, options);
      }
      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key, options) + "[]";
        }
        return value.reduce(formatter(key), []).join("&");
      }
      return encode(key, options) + "=" + encode(value, options);
    }).filter((x2) => x2.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign(
      {
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
      },
      options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode(hash, options) } : {}
    );
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true,
      [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true,
      [encodeFragmentIdentifier]: false
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString$2);
const J = "base10", p$2 = "base16", F$2 = "base64pad", H$2 = "utf8", Q$3 = 0, _$2 = 1, Dn = 0, Pe = 1, Z$1 = 12, X$1 = 32;
function kn() {
  const e = x25519.generateKeyPair();
  return { privateKey: toString(e.secretKey, p$2), publicKey: toString(e.publicKey, p$2) };
}
function Vn$1() {
  const e = random.randomBytes(X$1);
  return toString(e, p$2);
}
function Mn(e, n2) {
  const t = x25519.sharedKey(fromString(e, p$2), fromString(n2, p$2), true), r = new HKDF_1(sha256.SHA256, t).expand(X$1);
  return toString(r, p$2);
}
function Kn(e) {
  const n2 = sha256.hash(fromString(e, p$2));
  return toString(n2, p$2);
}
function Ln$1(e) {
  const n2 = sha256.hash(fromString(e, H$2));
  return toString(n2, p$2);
}
function Re(e) {
  return fromString(`${e}`, J);
}
function $$2(e) {
  return Number(toString(e, J));
}
function xn(e) {
  const n2 = Re(typeof e.type < "u" ? e.type : Q$3);
  if ($$2(n2) === _$2 && typeof e.senderPublicKey > "u")
    throw new Error("Missing sender public key for type 1 envelope");
  const t = typeof e.senderPublicKey < "u" ? fromString(e.senderPublicKey, p$2) : void 0, r = typeof e.iv < "u" ? fromString(e.iv, p$2) : random.randomBytes(Z$1), o = new chacha20poly1305.ChaCha20Poly1305(fromString(e.symKey, p$2)).seal(r, fromString(e.message, H$2));
  return Te({ type: n2, sealed: o, iv: r, senderPublicKey: t });
}
function Fn(e) {
  const n2 = new chacha20poly1305.ChaCha20Poly1305(fromString(e.symKey, p$2)), { sealed: t, iv: r } = ee$1(e.encoded), o = n2.open(r, t);
  if (o === null)
    throw new Error("Failed to decrypt");
  return toString(o, H$2);
}
function Te(e) {
  if ($$2(e.type) === _$2) {
    if (typeof e.senderPublicKey > "u")
      throw new Error("Missing sender public key for type 1 envelope");
    return toString(concat([e.type, e.senderPublicKey, e.iv, e.sealed]), F$2);
  }
  return toString(concat([e.type, e.iv, e.sealed]), F$2);
}
function ee$1(e) {
  const n2 = fromString(e, F$2), t = n2.slice(Dn, Pe), r = Pe;
  if ($$2(t) === _$2) {
    const d2 = r + X$1, l2 = d2 + Z$1, c2 = n2.slice(r, d2), u3 = n2.slice(d2, l2), a3 = n2.slice(l2);
    return { type: t, sealed: a3, iv: u3, senderPublicKey: c2 };
  }
  const o = r + Z$1, s = n2.slice(r, o), i = n2.slice(o);
  return { type: t, sealed: i, iv: s };
}
function Hn(e, n2) {
  const t = ee$1(e);
  return Ae({ type: $$2(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? toString(t.senderPublicKey, p$2) : void 0, receiverPublicKey: n2?.receiverPublicKey });
}
function Ae(e) {
  const n2 = e?.type || Q$3;
  if (n2 === _$2) {
    if (typeof e?.senderPublicKey > "u")
      throw new Error("missing sender public key");
    if (typeof e?.receiverPublicKey > "u")
      throw new Error("missing receiver public key");
  }
  return { type: n2, senderPublicKey: e?.senderPublicKey, receiverPublicKey: e?.receiverPublicKey };
}
function qn(e) {
  return e.type === _$2 && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
}
var Bn = Object.defineProperty, Ue$1 = Object.getOwnPropertySymbols, Gn = Object.prototype.hasOwnProperty, Wn = Object.prototype.propertyIsEnumerable, _e = (e, n2, t) => n2 in e ? Bn(e, n2, { enumerable: true, configurable: true, writable: true, value: t }) : e[n2] = t, Ce = (e, n2) => {
  for (var t in n2 || (n2 = {}))
    Gn.call(n2, t) && _e(e, t, n2[t]);
  if (Ue$1)
    for (var t of Ue$1(n2))
      Wn.call(n2, t) && _e(e, t, n2[t]);
  return e;
};
const je$2 = "ReactNative", m$2 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" }, De$1 = "js";
function te$2() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function C$1() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === je$2;
}
function D$3() {
  return !te$2() && !!getNavigator_1() && !!getDocument_1();
}
function T$1() {
  return C$1() ? m$2.reactNative : te$2() ? m$2.node : D$3() ? m$2.browser : m$2.unknown;
}
function Jn() {
  var e;
  try {
    return C$1() && typeof global < "u" && typeof (global == null ? void 0 : global.Application) < "u" ? (e = global.Application) == null ? void 0 : e.applicationId : void 0;
  } catch {
    return;
  }
}
function ke$1(e, n2) {
  let t = queryString$2.parse(e);
  return t = Ce(Ce({}, t), n2), e = queryString$2.stringify(t), e;
}
function Ve$1() {
  if (T$1() === m$2.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
    const { OS: t, Version: r } = global.Platform;
    return [t, r].join("-");
  }
  const e = detect();
  if (e === null)
    return "unknown";
  const n2 = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
  return e.type === "browser" ? [n2, e.name, e.version].join("-") : [n2, e.version].join("-");
}
function Me$1() {
  var e;
  const n2 = T$1();
  return n2 === m$2.browser ? [n2, ((e = getLocation_1()) == null ? void 0 : e.host) || "unknown"].join(":") : n2;
}
function Ke$1(e, n2, t) {
  const r = Ve$1(), o = Me$1();
  return [[e, n2].join("-"), [De$1, t].join("-"), r, o].join("/");
}
function Xn({ protocol: e, version: n2, relayUrl: t, sdkVersion: r, auth: o, projectId: s, useOnCloseEvent: i, bundleId: d2 }) {
  const l2 = t.split("?"), c2 = Ke$1(e, n2, r), u3 = { auth: o, ua: c2, projectId: s, useOnCloseEvent: i || void 0, origin: d2 || void 0 }, a3 = ke$1(l2[1] || "", u3);
  return l2[0] + "?" + a3;
}
function rt$1(e) {
  return Object.fromEntries(e.entries());
}
function ot$1(e) {
  return new Map(Object.entries(e));
}
function at$2(e = cjs$3.FIVE_MINUTES, n2) {
  const t = cjs$3.toMiliseconds(e || cjs$3.FIVE_MINUTES);
  let r, o, s;
  return { resolve: (i) => {
    s && r && (clearTimeout(s), r(i));
  }, reject: (i) => {
    s && o && (clearTimeout(s), o(i));
  }, done: () => new Promise((i, d2) => {
    s = setTimeout(() => {
      d2(new Error(n2));
    }, t), r = i, o = d2;
  }) };
}
function ut$1(e, n2, t) {
  return new Promise(async (r, o) => {
    const s = setTimeout(() => o(new Error(t)), n2);
    try {
      const i = await e;
      r(i);
    } catch (i) {
      o(i);
    }
    clearTimeout(s);
  });
}
function re(e, n2) {
  if (typeof n2 == "string" && n2.startsWith(`${e}:`))
    return n2;
  if (e.toLowerCase() === "topic") {
    if (typeof n2 != "string")
      throw new Error('Value must be "string" for expirer target type: topic');
    return `topic:${n2}`;
  } else if (e.toLowerCase() === "id") {
    if (typeof n2 != "number")
      throw new Error('Value must be "number" for expirer target type: id');
    return `id:${n2}`;
  }
  throw new Error(`Unknown expirer target type: ${e}`);
}
function lt$1(e) {
  return re("topic", e);
}
function dt$1(e) {
  return re("id", e);
}
function ft$3(e) {
  const [n2, t] = e.split(":"), r = { id: void 0, topic: void 0 };
  if (n2 === "topic" && typeof t == "string")
    r.topic = t;
  else if (n2 === "id" && Number.isInteger(Number(t)))
    r.id = Number(t);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${n2}:${t}`);
  return r;
}
function pt$2(e, n2) {
  return cjs$3.fromMiliseconds((n2 || Date.now()) + cjs$3.toMiliseconds(e));
}
function mt$2(e) {
  return Date.now() >= cjs$3.toMiliseconds(e);
}
function yt$2(e, n2) {
  return `${e}${n2 ? `:${n2}` : ""}`;
}
const He$1 = "irn";
function vt$1(e) {
  return e?.relay || { protocol: He$1 };
}
function Et$1(e) {
  const n2 = RELAY_JSONRPC[e];
  if (typeof n2 > "u")
    throw new Error(`Relay Protocol not supported: ${e}`);
  return n2;
}
var bt$1 = Object.defineProperty, qe$1 = Object.getOwnPropertySymbols, Nt$1 = Object.prototype.hasOwnProperty, Ot$1 = Object.prototype.propertyIsEnumerable, Be$1 = (e, n2, t) => n2 in e ? bt$1(e, n2, { enumerable: true, configurable: true, writable: true, value: t }) : e[n2] = t, St$1 = (e, n2) => {
  for (var t in n2 || (n2 = {}))
    Nt$1.call(n2, t) && Be$1(e, t, n2[t]);
  if (qe$1)
    for (var t of qe$1(n2))
      Ot$1.call(n2, t) && Be$1(e, t, n2[t]);
  return e;
};
function Ge$1(e, n2 = "-") {
  const t = {}, r = "relay" + n2;
  return Object.keys(e).forEach((o) => {
    if (o.startsWith(r)) {
      const s = o.replace(r, ""), i = e[o];
      t[s] = i;
    }
  }), t;
}
function wt$1(e) {
  e = e.includes("wc://") ? e.replace("wc://", "") : e, e = e.includes("wc:") ? e.replace("wc:", "") : e;
  const n2 = e.indexOf(":"), t = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, n2), o = e.substring(n2 + 1, t).split("@"), s = typeof t < "u" ? e.substring(t) : "", i = queryString$2.parse(s);
  return { protocol: r, topic: We$1(o[0]), version: parseInt(o[1], 10), symKey: i.symKey, relay: Ge$1(i) };
}
function We$1(e) {
  return e.startsWith("//") ? e.substring(2) : e;
}
function ze(e, n2 = "-") {
  const t = "relay", r = {};
  return Object.keys(e).forEach((o) => {
    const s = t + n2 + o;
    e[o] && (r[s] = e[o]);
  }), r;
}
function It$1(e) {
  return `${e.protocol}:${e.topic}@${e.version}?` + queryString$2.stringify(St$1({ symKey: e.symKey }, ze(e.relay)));
}
const nn$2 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, tn$1 = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function N$2(e, n2) {
  const { message: t, code: r } = tn$1[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function U$4(e, n2) {
  const { message: t, code: r } = nn$2[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function k$2(e, n2) {
  return Array.isArray(e) ? typeof n2 < "u" && e.length ? e.every(n2) : true : false;
}
function w$4(e) {
  return typeof e > "u";
}
function h$2(e, n2) {
  return n2 && w$4(e) ? true : typeof e == "string" && !!e.trim().length;
}
function kt$1(e) {
  if (h$2(e, false))
    try {
      return typeof new URL(e) < "u";
    } catch {
      return false;
    }
  return false;
}
function Vt$1(e) {
  var n2;
  return (n2 = e?.proposer) == null ? void 0 : n2.publicKey;
}
function Mt$1(e) {
  return e?.topic;
}
function Ht$2(e) {
  return typeof e < "u" && typeof e !== null;
}
function er$1() {
  const e = T$1();
  return new Promise((n2) => {
    switch (e) {
      case m$2.browser:
        n2(mn());
        break;
      case m$2.reactNative:
        n2(yn());
        break;
      case m$2.node:
        n2(hn());
        break;
      default:
        n2(true);
    }
  });
}
function mn() {
  return D$3() && navigator?.onLine;
}
async function yn() {
  if (C$1() && typeof global < "u" && global != null && global.NetInfo) {
    const e = await (global == null ? void 0 : global.NetInfo.fetch());
    return e?.isConnected;
  }
  return true;
}
function hn() {
  return true;
}
function nr$1(e) {
  switch (T$1()) {
    case m$2.browser:
      gn(e);
      break;
    case m$2.reactNative:
      vn(e);
      break;
  }
}
function gn(e) {
  !C$1() && D$3() && (window.addEventListener("online", () => e(true)), window.addEventListener("offline", () => e(false)));
}
function vn(e) {
  C$1() && typeof global < "u" && global != null && global.NetInfo && global?.NetInfo.addEventListener((n2) => e(n2?.isConnected));
}
var browser$1;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser$1;
  hasRequiredBrowser = 1;
  browser$1 = function() {
    throw new Error(
      "ws does not work in the browser. Browser clients must use the native WebSocket object"
    );
  };
  return browser$1;
}
const w$3 = () => typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : requireBrowser(), b$2 = () => typeof WebSocket < "u" || typeof global < "u" && typeof window.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u", a2 = (c2) => c2.split("?")[0], h$1 = 10, S$2 = w$3();
let f$1 = class f {
  constructor(e) {
    if (this.url = e, this.events = new eventsExports.EventEmitter(), this.registering = false, !isWsUrl(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    this.url = e;
  }
  get connected() {
    return typeof this.socket < "u";
  }
  get connecting() {
    return this.registering;
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async open(e = this.url) {
    await this.register(e);
  }
  async close() {
    return new Promise((e, t) => {
      if (typeof this.socket > "u") {
        t(new Error("Connection already closed"));
        return;
      }
      this.socket.onclose = (n2) => {
        this.onClose(n2), e();
      }, this.socket.close();
    });
  }
  async send(e) {
    typeof this.socket > "u" && (this.socket = await this.register());
    try {
      this.socket.send(safeJsonStringify(e));
    } catch (t) {
      this.onError(e.id, t);
    }
  }
  register(e = this.url) {
    if (!isWsUrl(e))
      throw new Error(`Provided URL is not compatible with WebSocket connection: ${e}`);
    if (this.registering) {
      const t = this.events.getMaxListeners();
      return (this.events.listenerCount("register_error") >= t || this.events.listenerCount("open") >= t) && this.events.setMaxListeners(t + 1), new Promise((n2, o) => {
        this.events.once("register_error", (s) => {
          this.resetMaxListeners(), o(s);
        }), this.events.once("open", () => {
          if (this.resetMaxListeners(), typeof this.socket > "u")
            return o(new Error("WebSocket connection is missing or invalid"));
          n2(this.socket);
        });
      });
    }
    return this.url = e, this.registering = true, new Promise((t, n2) => {
      const o = new URLSearchParams(e).get("origin"), s = cjs$4.isReactNative() ? { headers: { origin: o } } : { rejectUnauthorized: !isLocalhostUrl(e) }, i = new S$2(e, [], s);
      b$2() ? i.onerror = (r) => {
        const l2 = r;
        n2(this.emitError(l2.error));
      } : i.on("error", (r) => {
        n2(this.emitError(r));
      }), i.onopen = () => {
        this.onOpen(i), t(i);
      };
    });
  }
  onOpen(e) {
    e.onmessage = (t) => this.onPayload(t), e.onclose = (t) => this.onClose(t), this.socket = e, this.registering = false, this.events.emit("open");
  }
  onClose(e) {
    this.socket = void 0, this.registering = false, this.events.emit("close", e);
  }
  onPayload(e) {
    if (typeof e.data > "u")
      return;
    const t = typeof e.data == "string" ? safeJsonParse(e.data) : e.data;
    this.events.emit("payload", t);
  }
  onError(e, t) {
    const n2 = this.parseError(t), o = n2.message || n2.toString(), s = formatJsonRpcError(e, o);
    this.events.emit("payload", s);
  }
  parseError(e, t = this.url) {
    return parseConnectionError(e, a2(t), "WS");
  }
  resetMaxListeners() {
    this.events.getMaxListeners() > h$1 && this.events.setMaxListeners(h$1);
  }
  emitError(e) {
    const t = this.parseError(new Error(e?.message || `WebSocket connection failed for host: ${a2(this.url)}`));
    return this.events.emit("register_error", t), t;
  }
};
var lodash_isequal = { exports: {} };
lodash_isequal.exports;
(function(module, exports) {
  var LARGE_ARRAY_SIZE = 200;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal.process;
  var nodeUtil = function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function baseTimes(n2, iteratee) {
    var index = -1, result = Array(n2);
    while (++index < n2) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray(set2) {
    var index = -1, result = Array(set2.size);
    set2.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
  var coreJsData = root["__core-js_shared__"];
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var nativeObjectToString = objectProto.toString;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer = moduleExports ? root.Buffer : void 0, Symbol2 = root.Symbol, Uint8Array2 = root.Uint8Array, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0, nativeKeys = overArg(Object.keys, Object);
  var DataView = getNative(root, "DataView"), Map2 = getNative(root, "Map"), Promise2 = getNative(root, "Promise"), Set2 = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap);
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : void 0;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet(key) {
    return this.__data__.get(key);
  }
  function stackHas(key) {
    return this.__data__.has(key);
  }
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
    objTag = objTag == argsTag ? objectTag : objTag;
    othTag = othTag == argsTag ? objectTag : othTag;
    var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
          return false;
        }
        return true;
      case boolTag:
      case dateTag:
      case numberTag:
        return eq(+object, +other);
      case errorTag:
        return object.name == other.name && object.message == other.message;
      case regexpTag:
      case stringTag:
        return object == other + "";
      case mapTag:
        var convert = mapToArray;
      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
        return false;
      }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys2, getSymbols);
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };
  var getTag = baseGetTag;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
    getTag = function(value) {
      var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
  }
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArguments = baseIsArguments(function() {
    return arguments;
  }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArray = Array.isArray;
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }
  var isBuffer = nativeIsBuffer || stubFalse;
  function isEqual(value, other) {
    return baseIsEqual(value, other);
  }
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  function keys2(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }
  function stubArray() {
    return [];
  }
  function stubFalse() {
    return false;
  }
  module.exports = isEqual;
})(lodash_isequal, lodash_isequal.exports);
var lodash_isequalExports = lodash_isequal.exports;
const Gi = /* @__PURE__ */ getDefaultExportFromCjs(lodash_isequalExports);
function unfetch_module(e, n2) {
  return n2 = n2 || {}, new Promise(function(t, r) {
    var s = new XMLHttpRequest(), o = [], u3 = [], i = {}, a3 = function() {
      return { ok: 2 == (s.status / 100 | 0), statusText: s.statusText, status: s.status, url: s.responseURL, text: function() {
        return Promise.resolve(s.responseText);
      }, json: function() {
        return Promise.resolve(s.responseText).then(JSON.parse);
      }, blob: function() {
        return Promise.resolve(new Blob([s.response]));
      }, clone: a3, headers: { keys: function() {
        return o;
      }, entries: function() {
        return u3;
      }, get: function(e2) {
        return i[e2.toLowerCase()];
      }, has: function(e2) {
        return e2.toLowerCase() in i;
      } } };
    };
    for (var l2 in s.open(n2.method || "get", e, true), s.onload = function() {
      s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e2, n3, t2) {
        o.push(n3 = n3.toLowerCase()), u3.push([n3, t2]), i[n3] = i[n3] ? i[n3] + "," + t2 : t2;
      }), t(a3());
    }, s.onerror = r, s.withCredentials = "include" == n2.credentials, n2.headers)
      s.setRequestHeader(l2, n2.headers[l2]);
    s.send(n2.body || null);
  });
}
const unfetch_module$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: unfetch_module
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(unfetch_module$1);
var browser = self.fetch || (self.fetch = require$$0.default || require$$0);
const Yi = /* @__PURE__ */ getDefaultExportFromCjs(browser);
function Hi(r, e) {
  if (r.length >= 255)
    throw new TypeError("Alphabet too long");
  for (var t = new Uint8Array(256), i = 0; i < t.length; i++)
    t[i] = 255;
  for (var s = 0; s < r.length; s++) {
    var n2 = r.charAt(s), o = n2.charCodeAt(0);
    if (t[o] !== 255)
      throw new TypeError(n2 + " is ambiguous");
    t[o] = s;
  }
  var a3 = r.length, h4 = r.charAt(0), l2 = Math.log(a3) / Math.log(256), d2 = Math.log(256) / Math.log(a3);
  function p3(u3) {
    if (u3 instanceof Uint8Array || (ArrayBuffer.isView(u3) ? u3 = new Uint8Array(u3.buffer, u3.byteOffset, u3.byteLength) : Array.isArray(u3) && (u3 = Uint8Array.from(u3))), !(u3 instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (u3.length === 0)
      return "";
    for (var m2 = 0, z2 = 0, I2 = 0, _3 = u3.length; I2 !== _3 && u3[I2] === 0; )
      I2++, m2++;
    for (var S2 = (_3 - I2) * d2 + 1 >>> 0, f3 = new Uint8Array(S2); I2 !== _3; ) {
      for (var T2 = u3[I2], A2 = 0, C2 = S2 - 1; (T2 !== 0 || A2 < z2) && C2 !== -1; C2--, A2++)
        T2 += 256 * f3[C2] >>> 0, f3[C2] = T2 % a3 >>> 0, T2 = T2 / a3 >>> 0;
      if (T2 !== 0)
        throw new Error("Non-zero carry");
      z2 = A2, I2++;
    }
    for (var x2 = S2 - z2; x2 !== S2 && f3[x2] === 0; )
      x2++;
    for (var q2 = h4.repeat(m2); x2 < S2; ++x2)
      q2 += r.charAt(f3[x2]);
    return q2;
  }
  function y3(u3) {
    if (typeof u3 != "string")
      throw new TypeError("Expected String");
    if (u3.length === 0)
      return new Uint8Array();
    var m2 = 0;
    if (u3[m2] !== " ") {
      for (var z2 = 0, I2 = 0; u3[m2] === h4; )
        z2++, m2++;
      for (var _3 = (u3.length - m2) * l2 + 1 >>> 0, S2 = new Uint8Array(_3); u3[m2]; ) {
        var f3 = t[u3.charCodeAt(m2)];
        if (f3 === 255)
          return;
        for (var T2 = 0, A2 = _3 - 1; (f3 !== 0 || T2 < I2) && A2 !== -1; A2--, T2++)
          f3 += a3 * S2[A2] >>> 0, S2[A2] = f3 % 256 >>> 0, f3 = f3 / 256 >>> 0;
        if (f3 !== 0)
          throw new Error("Non-zero carry");
        I2 = T2, m2++;
      }
      if (u3[m2] !== " ") {
        for (var C2 = _3 - I2; C2 !== _3 && S2[C2] === 0; )
          C2++;
        for (var x2 = new Uint8Array(z2 + (_3 - C2)), q2 = z2; C2 !== _3; )
          x2[q2++] = S2[C2++];
        return x2;
      }
    }
  }
  function M2(u3) {
    var m2 = y3(u3);
    if (m2)
      return m2;
    throw new Error(`Non-${e} character`);
  }
  return { encode: p3, decodeUnsafe: y3, decode: M2 };
}
var Ji = Hi, Xi = Ji;
const Ne = (r) => {
  if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
    return r;
  if (r instanceof ArrayBuffer)
    return new Uint8Array(r);
  if (ArrayBuffer.isView(r))
    return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
  throw new Error("Unknown type, must be binary type");
}, Wi$1 = (r) => new TextEncoder().encode(r), Qi = (r) => new TextDecoder().decode(r);
class Zi {
  constructor(e, t, i) {
    this.name = e, this.prefix = t, this.baseEncode = i;
  }
  encode(e) {
    if (e instanceof Uint8Array)
      return `${this.prefix}${this.baseEncode(e)}`;
    throw Error("Unknown type, must be binary type");
  }
}
class es {
  constructor(e, t, i) {
    if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
      throw new Error("Invalid prefix character");
    this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
  }
  decode(e) {
    if (typeof e == "string") {
      if (e.codePointAt(0) !== this.prefixCodePoint)
        throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
      return this.baseDecode(e.slice(this.prefix.length));
    } else
      throw Error("Can only multibase decode strings");
  }
  or(e) {
    return Ue(this, e);
  }
}
class ts {
  constructor(e) {
    this.decoders = e;
  }
  or(e) {
    return Ue(this, e);
  }
  decode(e) {
    const t = e[0], i = this.decoders[t];
    if (i)
      return i.decode(e);
    throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
  }
}
const Ue = (r, e) => new ts({ ...r.decoders || { [r.prefix]: r }, ...e.decoders || { [e.prefix]: e } });
class is {
  constructor(e, t, i, s) {
    this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = s, this.encoder = new Zi(e, t, i), this.decoder = new es(e, t, s);
  }
  encode(e) {
    return this.encoder.encode(e);
  }
  decode(e) {
    return this.decoder.decode(e);
  }
}
const W$1 = ({ name: r, prefix: e, encode: t, decode: i }) => new is(r, e, t, i), B$2 = ({ prefix: r, name: e, alphabet: t }) => {
  const { encode: i, decode: s } = Xi(t, e);
  return W$1({ prefix: r, name: e, encode: i, decode: (n2) => Ne(s(n2)) });
}, ss = (r, e, t, i) => {
  const s = {};
  for (let d2 = 0; d2 < e.length; ++d2)
    s[e[d2]] = d2;
  let n2 = r.length;
  for (; r[n2 - 1] === "="; )
    --n2;
  const o = new Uint8Array(n2 * t / 8 | 0);
  let a3 = 0, h4 = 0, l2 = 0;
  for (let d2 = 0; d2 < n2; ++d2) {
    const p3 = s[r[d2]];
    if (p3 === void 0)
      throw new SyntaxError(`Non-${i} character`);
    h4 = h4 << t | p3, a3 += t, a3 >= 8 && (a3 -= 8, o[l2++] = 255 & h4 >> a3);
  }
  if (a3 >= t || 255 & h4 << 8 - a3)
    throw new SyntaxError("Unexpected end of data");
  return o;
}, rs = (r, e, t) => {
  const i = e[e.length - 1] === "=", s = (1 << t) - 1;
  let n2 = "", o = 0, a3 = 0;
  for (let h4 = 0; h4 < r.length; ++h4)
    for (a3 = a3 << 8 | r[h4], o += 8; o > t; )
      o -= t, n2 += e[s & a3 >> o];
  if (o && (n2 += e[s & a3 << t - o]), i)
    for (; n2.length * t & 7; )
      n2 += "=";
  return n2;
}, g$2 = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) => W$1({ prefix: e, name: r, encode(s) {
  return rs(s, i, t);
}, decode(s) {
  return ss(s, i, t, r);
} }), ns = W$1({ prefix: "\0", name: "identity", encode: (r) => Qi(r), decode: (r) => Wi$1(r) });
var os = Object.freeze({ __proto__: null, identity: ns });
const as$1 = g$2({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
var hs$1 = Object.freeze({ __proto__: null, base2: as$1 });
const cs$1 = g$2({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
var us$1 = Object.freeze({ __proto__: null, base8: cs$1 });
const ls$1 = B$2({ prefix: "9", name: "base10", alphabet: "0123456789" });
var ds$1 = Object.freeze({ __proto__: null, base10: ls$1 });
const gs$1 = g$2({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 }), ps$1 = g$2({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
var Ds = Object.freeze({ __proto__: null, base16: gs$1, base16upper: ps$1 });
const ys = g$2({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 }), ms = g$2({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 }), bs = g$2({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 }), fs = g$2({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 }), Es = g$2({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 }), ws = g$2({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 }), vs = g$2({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 }), Is = g$2({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 }), Cs = g$2({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
var Rs = Object.freeze({ __proto__: null, base32: ys, base32upper: ms, base32pad: bs, base32padupper: fs, base32hex: Es, base32hexupper: ws, base32hexpad: vs, base32hexpadupper: Is, base32z: Cs });
const _s = B$2({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" }), Ss = B$2({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
var Ts = Object.freeze({ __proto__: null, base36: _s, base36upper: Ss });
const Ps = B$2({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" }), xs = B$2({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
var Os = Object.freeze({ __proto__: null, base58btc: Ps, base58flickr: xs });
const As = g$2({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 }), zs = g$2({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 }), Ns = g$2({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 }), Us = g$2({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
var Ls = Object.freeze({ __proto__: null, base64: As, base64pad: zs, base64url: Ns, base64urlpad: Us });
const Le = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"), Fs = Le.reduce((r, e, t) => (r[t] = e, r), []), $s = Le.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
function Ms(r) {
  return r.reduce((e, t) => (e += Fs[t], e), "");
}
function ks(r) {
  const e = [];
  for (const t of r) {
    const i = $s[t.codePointAt(0)];
    if (i === void 0)
      throw new Error(`Non-base256emoji character: ${t}`);
    e.push(i);
  }
  return new Uint8Array(e);
}
const Ks = W$1({ prefix: "🚀", name: "base256emoji", encode: Ms, decode: ks });
var Bs = Object.freeze({ __proto__: null, base256emoji: Ks }), Vs = $e, Fe = 128, js = 127, qs = ~js, Gs = Math.pow(2, 31);
function $e(r, e, t) {
  e = e || [], t = t || 0;
  for (var i = t; r >= Gs; )
    e[t++] = r & 255 | Fe, r /= 128;
  for (; r & qs; )
    e[t++] = r & 255 | Fe, r >>>= 7;
  return e[t] = r | 0, $e.bytes = t - i + 1, e;
}
var Ys = he$1, Hs = 128, Me = 127;
function he$1(r, i) {
  var t = 0, i = i || 0, s = 0, n2 = i, o, a3 = r.length;
  do {
    if (n2 >= a3)
      throw he$1.bytes = 0, new RangeError("Could not decode varint");
    o = r[n2++], t += s < 28 ? (o & Me) << s : (o & Me) * Math.pow(2, s), s += 7;
  } while (o >= Hs);
  return he$1.bytes = n2 - i, t;
}
var Js = Math.pow(2, 7), Xs = Math.pow(2, 14), Ws = Math.pow(2, 21), Qs = Math.pow(2, 28), Zs = Math.pow(2, 35), er = Math.pow(2, 42), tr$1 = Math.pow(2, 49), ir = Math.pow(2, 56), sr = Math.pow(2, 63), rr = function(r) {
  return r < Js ? 1 : r < Xs ? 2 : r < Ws ? 3 : r < Qs ? 4 : r < Zs ? 5 : r < er ? 6 : r < tr$1 ? 7 : r < ir ? 8 : r < sr ? 9 : 10;
}, nr = { encode: Vs, decode: Ys, encodingLength: rr }, ke = nr;
const Ke = (r, e, t = 0) => (ke.encode(r, e, t), e), Be = (r) => ke.encodingLength(r), ce$2 = (r, e) => {
  const t = e.byteLength, i = Be(r), s = i + Be(t), n2 = new Uint8Array(s + t);
  return Ke(r, n2, 0), Ke(t, n2, i), n2.set(e, s), new or(r, t, e, n2);
};
class or {
  constructor(e, t, i, s) {
    this.code = e, this.size = t, this.digest = i, this.bytes = s;
  }
}
const Ve = ({ name: r, code: e, encode: t }) => new ar(r, e, t);
class ar {
  constructor(e, t, i) {
    this.name = e, this.code = t, this.encode = i;
  }
  digest(e) {
    if (e instanceof Uint8Array) {
      const t = this.encode(e);
      return t instanceof Uint8Array ? ce$2(this.code, t) : t.then((i) => ce$2(this.code, i));
    } else
      throw Error("Unknown type, must be binary type");
  }
}
const je$1 = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e)), hr$1 = Ve({ name: "sha2-256", code: 18, encode: je$1("SHA-256") }), cr$1 = Ve({ name: "sha2-512", code: 19, encode: je$1("SHA-512") });
var ur = Object.freeze({ __proto__: null, sha256: hr$1, sha512: cr$1 });
const qe = 0, lr$1 = "identity", Ge = Ne, dr = (r) => ce$2(qe, Ge(r)), gr = { code: qe, name: lr$1, encode: Ge, digest: dr };
var pr = Object.freeze({ __proto__: null, identity: gr });
new TextEncoder(), new TextDecoder();
const Ye = { ...os, ...hs$1, ...us$1, ...ds$1, ...Ds, ...Rs, ...Ts, ...Os, ...Ls, ...Bs };
({ ...ur, ...pr });
function He(r) {
  return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
}
function Dr(r = 0) {
  return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? He(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
}
function Je(r, e, t, i) {
  return { name: r, prefix: e, encoder: { name: r, prefix: e, encode: t }, decoder: { decode: i } };
}
const Xe$1 = Je("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1))), ue$1 = Je("ascii", "a", (r) => {
  let e = "a";
  for (let t = 0; t < r.length; t++)
    e += String.fromCharCode(r[t]);
  return e;
}, (r) => {
  r = r.substring(1);
  const e = Dr(r.length);
  for (let t = 0; t < r.length; t++)
    e[t] = r.charCodeAt(t);
  return e;
}), yr = { utf8: Xe$1, "utf-8": Xe$1, hex: Ye.base16, latin1: ue$1, ascii: ue$1, binary: ue$1, ...Ye };
function mr(r, e = "utf8") {
  const t = yr[e];
  if (!t)
    throw new Error(`Unsupported encoding "${e}"`);
  return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? He(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
}
const le$1 = "wc", We = 2, Q$2 = "core", O$2 = `${le$1}@2:${Q$2}:`, Qe$1 = { name: Q$2, logger: "error" }, Ze$1 = { database: ":memory:" }, et = "crypto", de$1 = "client_ed25519_seed", tt = cjs$3.ONE_DAY, it = "keychain", st = "0.3", rt = "messages", nt = "0.3", ot = cjs$3.SIX_HOURS, at$1 = "publisher", ht$1 = "irn", ct = "error", ge$1 = "wss://relay.walletconnect.com", pe$1 = "wss://relay.walletconnect.org", ut = "relayer", D$2 = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" }, lt = "_subscription", P$1 = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" }, dt = cjs$3.ONE_SECOND, gt$1 = "2.11.0", pt$1 = 1e4, Dt$1 = "0.3", yt$1 = "WALLETCONNECT_CLIENT_ID", w$2 = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" }, mt$1 = "subscription", bt = "0.3", ft$2 = cjs$3.FIVE_SECONDS * 1e3, Et = "pairing", wt = "0.3", F$1 = { wc_pairingDelete: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 0 } } }, V$2 = { create: "pairing_create", expire: "pairing_expire", delete: "pairing_delete", ping: "pairing_ping" }, R = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" }, vt = "history", It = "0.3", Ct$1 = "expirer", v$1 = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" }, Rt = "0.3", Z = "verify-api", $$1 = "https://verify.walletconnect.com", ee = "https://verify.walletconnect.org", _t = [$$1, ee], St = "echo", Tt = "https://echo.walletconnect.com";
class Pt {
  constructor(e, t) {
    this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = it, this.version = st, this.initialized = false, this.storagePrefix = O$2, this.init = async () => {
      if (!this.initialized) {
        const i = await this.getKeyChain();
        typeof i < "u" && (this.keychain = i), this.initialized = true;
      }
    }, this.has = (i) => (this.isInitialized(), this.keychain.has(i)), this.set = async (i, s) => {
      this.isInitialized(), this.keychain.set(i, s), await this.persist();
    }, this.get = (i) => {
      this.isInitialized();
      const s = this.keychain.get(i);
      if (typeof s > "u") {
        const { message: n2 } = N$2("NO_MATCHING_KEY", `${this.name}: ${i}`);
        throw new Error(n2);
      }
      return s;
    }, this.del = async (i) => {
      this.isInitialized(), this.keychain.delete(i), await this.persist();
    }, this.core = e, this.logger = cjs.generateChildLogger(t, this.name);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setKeyChain(e) {
    await this.core.storage.setItem(this.storageKey, rt$1(e));
  }
  async getKeyChain() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ot$1(e) : void 0;
  }
  async persist() {
    await this.setKeyChain(this.keychain);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
let xt$1 = class xt {
  constructor(e, t, i) {
    this.core = e, this.logger = t, this.name = et, this.initialized = false, this.init = async () => {
      this.initialized || (await this.keychain.init(), this.initialized = true);
    }, this.hasKeys = (s) => (this.isInitialized(), this.keychain.has(s)), this.getClientId = async () => {
      this.isInitialized();
      const s = await this.getClientSeed(), n2 = generateKeyPair(s);
      return encodeIss(n2.publicKey);
    }, this.generateKeyPair = () => {
      this.isInitialized();
      const s = kn();
      return this.setPrivateKey(s.publicKey, s.privateKey);
    }, this.signJWT = async (s) => {
      this.isInitialized();
      const n2 = await this.getClientSeed(), o = generateKeyPair(n2), a3 = Vn$1(), h4 = tt;
      return await signJWT(a3, s, h4, o);
    }, this.generateSharedKey = (s, n2, o) => {
      this.isInitialized();
      const a3 = this.getPrivateKey(s), h4 = Mn(a3, n2);
      return this.setSymKey(h4, o);
    }, this.setSymKey = async (s, n2) => {
      this.isInitialized();
      const o = n2 || Kn(s);
      return await this.keychain.set(o, s), o;
    }, this.deleteKeyPair = async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }, this.deleteSymKey = async (s) => {
      this.isInitialized(), await this.keychain.del(s);
    }, this.encode = async (s, n2, o) => {
      this.isInitialized();
      const a3 = Ae(o), h4 = safeJsonStringify(n2);
      if (qn(a3)) {
        const y3 = a3.senderPublicKey, M2 = a3.receiverPublicKey;
        s = await this.generateSharedKey(y3, M2);
      }
      const l2 = this.getSymKey(s), { type: d2, senderPublicKey: p3 } = a3;
      return xn({ type: d2, symKey: l2, message: h4, senderPublicKey: p3 });
    }, this.decode = async (s, n2, o) => {
      this.isInitialized();
      const a3 = Hn(n2, o);
      if (qn(a3)) {
        const h4 = a3.receiverPublicKey, l2 = a3.senderPublicKey;
        s = await this.generateSharedKey(h4, l2);
      }
      try {
        const h4 = this.getSymKey(s), l2 = Fn({ symKey: h4, encoded: n2 });
        return safeJsonParse(l2);
      } catch (h4) {
        this.logger.error(`Failed to decode message from topic: '${s}', clientId: '${await this.getClientId()}'`), this.logger.error(h4);
      }
    }, this.getPayloadType = (s) => {
      const n2 = ee$1(s);
      return $$2(n2.type);
    }, this.getPayloadSenderPublicKey = (s) => {
      const n2 = ee$1(s);
      return n2.senderPublicKey ? toString(n2.senderPublicKey, p$2) : void 0;
    }, this.core = e, this.logger = cjs.generateChildLogger(t, this.name), this.keychain = i || new Pt(this.core, this.logger);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  async setPrivateKey(e, t) {
    return await this.keychain.set(e, t), e;
  }
  getPrivateKey(e) {
    return this.keychain.get(e);
  }
  async getClientSeed() {
    let e = "";
    try {
      e = this.keychain.get(de$1);
    } catch {
      e = Vn$1(), await this.keychain.set(de$1, e);
    }
    return mr(e, "base16");
  }
  getSymKey(e) {
    return this.keychain.get(e);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
class Ot extends a$1 {
  constructor(e, t) {
    super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = rt, this.version = nt, this.initialized = false, this.storagePrefix = O$2, this.init = async () => {
      if (!this.initialized) {
        this.logger.trace("Initialized");
        try {
          const i = await this.getRelayerMessages();
          typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
        } catch (i) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
        } finally {
          this.initialized = true;
        }
      }
    }, this.set = async (i, s) => {
      this.isInitialized();
      const n2 = Ln$1(s);
      let o = this.messages.get(i);
      return typeof o > "u" && (o = {}), typeof o[n2] < "u" || (o[n2] = s, this.messages.set(i, o), await this.persist()), n2;
    }, this.get = (i) => {
      this.isInitialized();
      let s = this.messages.get(i);
      return typeof s > "u" && (s = {}), s;
    }, this.has = (i, s) => {
      this.isInitialized();
      const n2 = this.get(i), o = Ln$1(s);
      return typeof n2[o] < "u";
    }, this.del = async (i) => {
      this.isInitialized(), this.messages.delete(i), await this.persist();
    }, this.logger = cjs.generateChildLogger(e, this.name), this.core = t;
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  async setRelayerMessages(e) {
    await this.core.storage.setItem(this.storageKey, rt$1(e));
  }
  async getRelayerMessages() {
    const e = await this.core.storage.getItem(this.storageKey);
    return typeof e < "u" ? ot$1(e) : void 0;
  }
  async persist() {
    await this.setRelayerMessages(this.messages);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
class vr extends u$1 {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.events = new eventsExports.EventEmitter(), this.name = at$1, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = cjs$3.toMiliseconds(cjs$3.TEN_SECONDS), this.needsTransportRestart = false, this.publish = async (i, s, n2) => {
      var o;
      this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: s, opts: n2 } });
      try {
        const a3 = n2?.ttl || ot, h4 = vt$1(n2), l2 = n2?.prompt || false, d2 = n2?.tag || 0, p3 = n2?.id || getBigIntRpcId().toString(), y3 = { topic: i, message: s, opts: { ttl: a3, relay: h4, prompt: l2, tag: d2, id: p3 } }, M2 = setTimeout(() => this.queue.set(p3, y3), this.publishTimeout);
        try {
          await await ut$1(this.rpcPublish(i, s, a3, h4, l2, d2, p3), this.publishTimeout, "Failed to publish payload, please try again."), this.removeRequestFromQueue(p3), this.relayer.events.emit(D$2.publish, y3);
        } catch (u3) {
          if (this.logger.debug("Publishing Payload stalled"), this.needsTransportRestart = true, (o = n2?.internal) != null && o.throwOnFailedPublish)
            throw this.removeRequestFromQueue(p3), u3;
          return;
        } finally {
          clearTimeout(M2);
        }
        this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: s, opts: n2 } });
      } catch (a3) {
        throw this.logger.debug("Failed to Publish Payload"), this.logger.error(a3), a3;
      }
    }, this.on = (i, s) => {
      this.events.on(i, s);
    }, this.once = (i, s) => {
      this.events.once(i, s);
    }, this.off = (i, s) => {
      this.events.off(i, s);
    }, this.removeListener = (i, s) => {
      this.events.removeListener(i, s);
    }, this.relayer = e, this.logger = cjs.generateChildLogger(t, this.name), this.registerEventListeners();
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  rpcPublish(e, t, i, s, n2, o, a3) {
    var h4, l2, d2, p3;
    const y3 = { method: Et$1(s.protocol).publish, params: { topic: e, message: t, ttl: i, prompt: n2, tag: o }, id: a3 };
    return w$4((h4 = y3.params) == null ? void 0 : h4.prompt) && ((l2 = y3.params) == null || delete l2.prompt), w$4((d2 = y3.params) == null ? void 0 : d2.tag) && ((p3 = y3.params) == null || delete p3.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: y3 }), this.relayer.request(y3);
  }
  removeRequestFromQueue(e) {
    this.queue.delete(e);
  }
  checkQueue() {
    this.queue.forEach(async (e) => {
      const { topic: t, message: i, opts: s } = e;
      await this.publish(t, i, s);
    });
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(cjs$1.HEARTBEAT_EVENTS.pulse, () => {
      if (this.needsTransportRestart) {
        this.needsTransportRestart = false, this.relayer.events.emit(D$2.connection_stalled);
        return;
      }
      this.checkQueue();
    }), this.relayer.on(D$2.message_ack, (e) => {
      this.removeRequestFromQueue(e.id.toString());
    });
  }
}
class Ir {
  constructor() {
    this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
      const i = this.get(e);
      this.exists(e, t) || this.map.set(e, [...i, t]);
    }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
      if (typeof t > "u") {
        this.map.delete(e);
        return;
      }
      if (!this.map.has(e))
        return;
      const i = this.get(e);
      if (!this.exists(e, t))
        return;
      const s = i.filter((n2) => n2 !== t);
      if (!s.length) {
        this.map.delete(e);
        return;
      }
      this.map.set(e, s);
    }, this.clear = () => {
      this.map.clear();
    };
  }
  get topics() {
    return Array.from(this.map.keys());
  }
}
var Cr = Object.defineProperty, Rr = Object.defineProperties, _r = Object.getOwnPropertyDescriptors, At = Object.getOwnPropertySymbols, Sr = Object.prototype.hasOwnProperty, Tr = Object.prototype.propertyIsEnumerable, zt$1 = (r, e, t) => e in r ? Cr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, j$1 = (r, e) => {
  for (var t in e || (e = {}))
    Sr.call(e, t) && zt$1(r, t, e[t]);
  if (At)
    for (var t of At(e))
      Tr.call(e, t) && zt$1(r, t, e[t]);
  return r;
}, De = (r, e) => Rr(r, _r(e));
class Nt extends d {
  constructor(e, t) {
    super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new Ir(), this.events = new eventsExports.EventEmitter(), this.name = mt$1, this.version = bt, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = O$2, this.subscribeTimeout = 1e4, this.restartInProgress = false, this.batchSubscribeTopicsLimit = 500, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId());
    }, this.subscribe = async (i, s) => {
      await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: s } });
      try {
        const n2 = vt$1(s), o = { topic: i, relay: n2 };
        this.pending.set(i, o);
        const a3 = await this.rpcSubscribe(i, n2);
        return this.onSubscribe(a3, o), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: s } }), a3;
      } catch (n2) {
        throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n2), n2;
      }
    }, this.unsubscribe = async (i, s) => {
      await this.restartToComplete(), this.isInitialized(), typeof s?.id < "u" ? await this.unsubscribeById(i, s.id, s) : await this.unsubscribeByTopic(i, s);
    }, this.isSubscribed = async (i) => this.topics.includes(i) ? true : await new Promise((s, n2) => {
      const o = new cjs$3.Watch();
      o.start(this.pendingSubscriptionWatchLabel);
      const a3 = setInterval(() => {
        !this.pending.has(i) && this.topics.includes(i) && (clearInterval(a3), o.stop(this.pendingSubscriptionWatchLabel), s(true)), o.elapsed(this.pendingSubscriptionWatchLabel) >= ft$2 && (clearInterval(a3), o.stop(this.pendingSubscriptionWatchLabel), n2(new Error("Subscription resolution timeout")));
      }, this.pollingInterval);
    }).catch(() => false), this.on = (i, s) => {
      this.events.on(i, s);
    }, this.once = (i, s) => {
      this.events.once(i, s);
    }, this.off = (i, s) => {
      this.events.off(i, s);
    }, this.removeListener = (i, s) => {
      this.events.removeListener(i, s);
    }, this.restart = async () => {
      this.restartInProgress = true, await this.restore(), await this.reset(), this.restartInProgress = false;
    }, this.relayer = e, this.logger = cjs.generateChildLogger(t, this.name), this.clientId = "";
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.subscriptions.size;
  }
  get ids() {
    return Array.from(this.subscriptions.keys());
  }
  get values() {
    return Array.from(this.subscriptions.values());
  }
  get topics() {
    return this.topicMap.topics;
  }
  hasSubscription(e, t) {
    let i = false;
    try {
      i = this.getSubscription(e).topic === t;
    } catch {
    }
    return i;
  }
  onEnable() {
    this.cached = [], this.initialized = true;
  }
  onDisable() {
    this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
  }
  async unsubscribeByTopic(e, t) {
    const i = this.topicMap.get(e);
    await Promise.all(i.map(async (s) => await this.unsubscribeById(e, s, t)));
  }
  async unsubscribeById(e, t, i) {
    this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    try {
      const s = vt$1(i);
      await this.rpcUnsubscribe(e, t, s);
      const n2 = U$4("USER_DISCONNECTED", `${this.name}, ${e}`);
      await this.onUnsubscribe(e, t, n2), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
    } catch (s) {
      throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
    }
  }
  async rpcSubscribe(e, t) {
    const i = { method: Et$1(t.protocol).subscribe, params: { topic: e } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    try {
      await await ut$1(this.relayer.request(i), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(D$2.connection_stalled);
    }
    return Ln$1(e + this.clientId);
  }
  async rpcBatchSubscribe(e) {
    if (!e.length)
      return;
    const t = e[0].relay, i = { method: Et$1(t.protocol).batchSubscribe, params: { topics: e.map((s) => s.topic) } };
    this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
    try {
      return await await ut$1(this.relayer.request(i), this.subscribeTimeout);
    } catch {
      this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(D$2.connection_stalled);
    }
  }
  rpcUnsubscribe(e, t, i) {
    const s = { method: Et$1(i.protocol).unsubscribe, params: { topic: e, id: t } };
    return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s }), this.relayer.request(s);
  }
  onSubscribe(e, t) {
    this.setSubscription(e, De(j$1({}, t), { id: e })), this.pending.delete(t.topic);
  }
  onBatchSubscribe(e) {
    e.length && e.forEach((t) => {
      this.setSubscription(t.id, j$1({}, t)), this.pending.delete(t.topic);
    });
  }
  async onUnsubscribe(e, t, i) {
    this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
  }
  async setRelayerSubscriptions(e) {
    await this.relayer.core.storage.setItem(this.storageKey, e);
  }
  async getRelayerSubscriptions() {
    return await this.relayer.core.storage.getItem(this.storageKey);
  }
  setSubscription(e, t) {
    this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t));
  }
  addSubscription(e, t) {
    this.subscriptions.set(e, j$1({}, t)), this.topicMap.set(t.topic, e), this.events.emit(w$2.created, t);
  }
  getSubscription(e) {
    this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
    const t = this.subscriptions.get(e);
    if (!t) {
      const { message: i } = N$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  deleteSubscription(e, t) {
    this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
    const i = this.getSubscription(e);
    this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(w$2.deleted, De(j$1({}, i), { reason: t }));
  }
  async persist() {
    await this.setRelayerSubscriptions(this.values), this.events.emit(w$2.sync);
  }
  async reset() {
    if (this.cached.length) {
      const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
      for (let t = 0; t < e; t++) {
        const i = this.cached.splice(0, this.batchSubscribeTopicsLimit);
        await this.batchSubscribe(i);
      }
    }
    this.events.emit(w$2.resubscribed);
  }
  async restore() {
    try {
      const e = await this.getRelayerSubscriptions();
      if (typeof e > "u" || !e.length)
        return;
      if (this.subscriptions.size) {
        const { message: t } = N$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
    }
  }
  async batchSubscribe(e) {
    if (!e.length)
      return;
    const t = await this.rpcBatchSubscribe(e);
    k$2(t) && this.onBatchSubscribe(t.map((i, s) => De(j$1({}, e[s]), { id: i })));
  }
  async onConnect() {
    this.restartInProgress || (await this.restart(), this.onEnable());
  }
  onDisconnect() {
    this.onDisable();
  }
  async checkPending() {
    if (!this.initialized || this.relayer.transportExplicitlyClosed)
      return;
    const e = [];
    this.pending.forEach((t) => {
      e.push(t);
    }), await this.batchSubscribe(e);
  }
  registerEventListeners() {
    this.relayer.core.heartbeat.on(cjs$1.HEARTBEAT_EVENTS.pulse, async () => {
      await this.checkPending();
    }), this.relayer.on(D$2.connect, async () => {
      await this.onConnect();
    }), this.relayer.on(D$2.disconnect, () => {
      this.onDisconnect();
    }), this.events.on(w$2.created, async (e) => {
      const t = w$2.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    }), this.events.on(w$2.deleted, async (e) => {
      const t = w$2.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async restartToComplete() {
    this.restartInProgress && await new Promise((e) => {
      const t = setInterval(() => {
        this.restartInProgress || (clearInterval(t), e());
      }, this.pollingInterval);
    });
  }
}
var Pr = Object.defineProperty, Ut = Object.getOwnPropertySymbols, xr = Object.prototype.hasOwnProperty, Or = Object.prototype.propertyIsEnumerable, Lt$1 = (r, e, t) => e in r ? Pr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, Ar = (r, e) => {
  for (var t in e || (e = {}))
    xr.call(e, t) && Lt$1(r, t, e[t]);
  if (Ut)
    for (var t of Ut(e))
      Or.call(e, t) && Lt$1(r, t, e[t]);
  return r;
};
let Ft$1 = class Ft extends g$3 {
  constructor(e) {
    super(e), this.protocol = "wc", this.version = 2, this.events = new eventsExports.EventEmitter(), this.name = ut, this.transportExplicitlyClosed = false, this.initialized = false, this.connectionAttemptInProgress = false, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "socket stalled"], this.hasExperiencedNetworkDisruption = false, this.request = async (t) => {
      this.logger.debug("Publishing Request Payload");
      try {
        return await this.toEstablishConnection(), await this.provider.request(t);
      } catch (i) {
        throw this.logger.debug("Failed to Publish Request"), this.logger.error(i), i;
      }
    }, this.onPayloadHandler = (t) => {
      this.onProviderPayload(t);
    }, this.onConnectHandler = () => {
      this.events.emit(D$2.connect);
    }, this.onDisconnectHandler = () => {
      this.onProviderDisconnect();
    }, this.onProviderErrorHandler = (t) => {
      this.logger.error(t), this.events.emit(D$2.error, t), this.logger.info("Fatal socket error received, closing transport"), this.transportClose();
    }, this.registerProviderListeners = () => {
      this.provider.on(P$1.payload, this.onPayloadHandler), this.provider.on(P$1.connect, this.onConnectHandler), this.provider.on(P$1.disconnect, this.onDisconnectHandler), this.provider.on(P$1.error, this.onProviderErrorHandler);
    }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? cjs.generateChildLogger(e.logger, this.name) : cjs.pino(cjs.getDefaultLoggerOptions({ level: e.logger || ct })), this.messages = new Ot(this.logger, e.core), this.subscriber = new Nt(this, this.logger), this.publisher = new vr(this, this.logger), this.relayUrl = e?.relayUrl || ge$1, this.projectId = e.projectId, this.bundleId = Jn(), this.provider = {};
  }
  async init() {
    this.logger.trace("Initialized"), this.registerEventListeners(), await this.createProvider(), await Promise.all([this.messages.init(), this.subscriber.init()]);
    try {
      await this.transportOpen();
    } catch {
      this.logger.warn(`Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${pe$1}...`), await this.restartTransport(pe$1);
    }
    this.initialized = true, setTimeout(async () => {
      this.subscriber.topics.length === 0 && (this.logger.info("No topics subscribed to after init, closing transport"), await this.transportClose(), this.transportExplicitlyClosed = false);
    }, pt$1);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get connected() {
    return this.provider.connection.connected;
  }
  get connecting() {
    return this.provider.connection.connecting;
  }
  async publish(e, t, i) {
    this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now() });
  }
  async subscribe(e, t) {
    var i;
    this.isInitialized();
    let s = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "";
    if (s)
      return s;
    let n2;
    const o = (a3) => {
      a3.topic === e && (this.subscriber.off(w$2.created, o), n2());
    };
    return await Promise.all([new Promise((a3) => {
      n2 = a3, this.subscriber.on(w$2.created, o);
    }), new Promise(async (a3) => {
      s = await this.subscriber.subscribe(e, t), a3();
    })]), s;
  }
  async unsubscribe(e, t) {
    this.isInitialized(), await this.subscriber.unsubscribe(e, t);
  }
  on(e, t) {
    this.events.on(e, t);
  }
  once(e, t) {
    this.events.once(e, t);
  }
  off(e, t) {
    this.events.off(e, t);
  }
  removeListener(e, t) {
    this.events.removeListener(e, t);
  }
  async transportClose() {
    this.transportExplicitlyClosed = true, this.hasExperiencedNetworkDisruption && this.connected ? await ut$1(this.provider.disconnect(), 1e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.connected && await this.provider.disconnect();
  }
  async transportOpen(e) {
    if (this.transportExplicitlyClosed = false, await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress) {
      e && e !== this.relayUrl && (this.relayUrl = e, await this.transportClose(), await this.createProvider()), this.connectionAttemptInProgress = true;
      try {
        await Promise.all([new Promise((t) => {
          if (!this.initialized)
            return t();
          this.subscriber.once(w$2.resubscribed, () => {
            t();
          });
        }), new Promise(async (t, i) => {
          try {
            await ut$1(this.provider.connect(), 1e4, `Socket stalled when trying to connect to ${this.relayUrl}`);
          } catch (s) {
            i(s);
            return;
          }
          t();
        })]);
      } catch (t) {
        this.logger.error(t);
        const i = t;
        if (!this.isConnectionStalled(i.message))
          throw t;
        this.provider.events.emit(P$1.disconnect);
      } finally {
        this.connectionAttemptInProgress = false, this.hasExperiencedNetworkDisruption = false;
      }
    }
  }
  async restartTransport(e) {
    await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.transportClose(), await this.createProvider(), await this.transportOpen());
  }
  async confirmOnlineStateOrThrow() {
    if (!await er$1())
      throw new Error("No internet connection detected. Please restart your network and try again.");
  }
  isConnectionStalled(e) {
    return this.staleConnectionErrors.some((t) => e.includes(t));
  }
  async createProvider() {
    this.provider.connection && this.unregisterProviderListeners();
    const e = await this.core.crypto.signJWT(this.relayUrl);
    this.provider = new JsonRpcProvider(new f$1(Xn({ sdkVersion: gt$1, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true, bundleId: this.bundleId }))), this.registerProviderListeners();
  }
  async recordMessageEvent(e) {
    const { topic: t, message: i } = e;
    await this.messages.set(t, i);
  }
  async shouldIgnoreMessageEvent(e) {
    const { topic: t, message: i } = e;
    if (!i || i.length === 0)
      return this.logger.debug(`Ignoring invalid/empty message: ${i}`), true;
    if (!await this.subscriber.isSubscribed(t))
      return this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), true;
    const s = this.messages.has(t, i);
    return s && this.logger.debug(`Ignoring duplicate message: ${i}`), s;
  }
  async onProviderPayload(e) {
    if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), isJsonRpcRequest(e)) {
      if (!e.method.endsWith(lt))
        return;
      const t = e.params, { topic: i, message: s, publishedAt: n2 } = t.data, o = { topic: i, message: s, publishedAt: n2 };
      this.logger.debug("Emitting Relayer Payload"), this.logger.trace(Ar({ type: "event", event: t.id }, o)), this.events.emit(t.id, o), await this.acknowledgePayload(e), await this.onMessageEvent(o);
    } else
      isJsonRpcResponse(e) && this.events.emit(D$2.message_ack, e);
  }
  async onMessageEvent(e) {
    await this.shouldIgnoreMessageEvent(e) || (this.events.emit(D$2.message, e), await this.recordMessageEvent(e));
  }
  async acknowledgePayload(e) {
    const t = formatJsonRpcResult(e.id, true);
    await this.provider.connection.send(t);
  }
  unregisterProviderListeners() {
    this.provider.off(P$1.payload, this.onPayloadHandler), this.provider.off(P$1.connect, this.onConnectHandler), this.provider.off(P$1.disconnect, this.onDisconnectHandler), this.provider.off(P$1.error, this.onProviderErrorHandler);
  }
  async registerEventListeners() {
    this.events.on(D$2.connection_stalled, () => {
      this.restartTransport().catch((t) => this.logger.error(t));
    });
    let e = await er$1();
    nr$1(async (t) => {
      this.initialized && e !== t && (e = t, t ? await this.restartTransport().catch((i) => this.logger.error(i)) : (this.hasExperiencedNetworkDisruption = true, await this.transportClose().catch((i) => this.logger.error(i))));
    });
  }
  onProviderDisconnect() {
    this.events.emit(D$2.disconnect), this.attemptToReconnect();
  }
  attemptToReconnect() {
    this.transportExplicitlyClosed || (this.logger.info("attemptToReconnect called. Connecting..."), setTimeout(async () => {
      await this.restartTransport().catch((e) => this.logger.error(e));
    }, cjs$3.toMiliseconds(dt)));
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  async toEstablishConnection() {
    if (await this.confirmOnlineStateOrThrow(), !this.connected) {
      if (this.connectionAttemptInProgress)
        return await new Promise((e) => {
          const t = setInterval(() => {
            this.connected && (clearInterval(t), e());
          }, this.connectionStatusPollingInterval);
        });
      await this.restartTransport();
    }
  }
};
var zr = Object.defineProperty, $t = Object.getOwnPropertySymbols, Nr = Object.prototype.hasOwnProperty, Ur = Object.prototype.propertyIsEnumerable, Mt = (r, e, t) => e in r ? zr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, kt = (r, e) => {
  for (var t in e || (e = {}))
    Nr.call(e, t) && Mt(r, t, e[t]);
  if ($t)
    for (var t of $t(e))
      Ur.call(e, t) && Mt(r, t, e[t]);
  return r;
};
let Kt$1 = class Kt extends p$3 {
  constructor(e, t, i, s = O$2, n2 = void 0) {
    super(e, t, i, s), this.core = e, this.logger = t, this.name = i, this.map = /* @__PURE__ */ new Map(), this.version = Dt$1, this.cached = [], this.initialized = false, this.storagePrefix = O$2, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((o) => {
        this.getKey && o !== null && !w$4(o) ? this.map.set(this.getKey(o), o) : Vt$1(o) ? this.map.set(o.id, o) : Mt$1(o) && this.map.set(o.topic, o);
      }), this.cached = [], this.initialized = true);
    }, this.set = async (o, a3) => {
      this.isInitialized(), this.map.has(o) ? await this.update(o, a3) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: o, value: a3 }), this.map.set(o, a3), await this.persist());
    }, this.get = (o) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: o }), this.getData(o)), this.getAll = (o) => (this.isInitialized(), o ? this.values.filter((a3) => Object.keys(o).every((h4) => Gi(a3[h4], o[h4]))) : this.values), this.update = async (o, a3) => {
      this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: o, update: a3 });
      const h4 = kt(kt({}, this.getData(o)), a3);
      this.map.set(o, h4), await this.persist();
    }, this.delete = async (o, a3) => {
      this.isInitialized(), this.map.has(o) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: o, reason: a3 }), this.map.delete(o), await this.persist());
    }, this.logger = cjs.generateChildLogger(t, this.name), this.storagePrefix = s, this.getKey = n2;
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.map.size;
  }
  get keys() {
    return Array.from(this.map.keys());
  }
  get values() {
    return Array.from(this.map.values());
  }
  async setDataStore(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getDataStore() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getData(e) {
    const t = this.map.get(e);
    if (!t) {
      const { message: i } = N$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i), new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setDataStore(this.values);
  }
  async restore() {
    try {
      const e = await this.getDataStore();
      if (typeof e > "u" || !e.length)
        return;
      if (this.map.size) {
        const { message: t } = N$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
let Bt$1 = class Bt {
  constructor(e, t) {
    this.core = e, this.logger = t, this.name = Et, this.version = wt, this.events = new EventEmitter(), this.initialized = false, this.storagePrefix = O$2, this.ignoredPayloadTypes = [_$2], this.registeredMethods = [], this.init = async () => {
      this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
    }, this.register = ({ methods: i }) => {
      this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i])];
    }, this.create = async () => {
      this.isInitialized();
      const i = Vn$1(), s = await this.core.crypto.setSymKey(i), n2 = pt$2(cjs$3.FIVE_MINUTES), o = { protocol: ht$1 }, a3 = { topic: s, expiry: n2, relay: o, active: false }, h4 = It$1({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: i, relay: o });
      return await this.pairings.set(s, a3), await this.core.relayer.subscribe(s), this.core.expirer.set(s, n2), { topic: s, uri: h4 };
    }, this.pair = async (i) => {
      this.isInitialized(), this.isValidPair(i);
      const { topic: s, symKey: n2, relay: o } = wt$1(i.uri);
      let a3;
      if (this.pairings.keys.includes(s) && (a3 = this.pairings.get(s), a3.active))
        throw new Error(`Pairing already exists: ${s}. Please try again with a new connection URI.`);
      const h4 = pt$2(cjs$3.FIVE_MINUTES), l2 = { topic: s, relay: o, expiry: h4, active: false };
      return await this.pairings.set(s, l2), this.core.expirer.set(s, h4), i.activatePairing && await this.activate({ topic: s }), this.events.emit(V$2.create, l2), this.core.crypto.keychain.has(s) || (await this.core.crypto.setSymKey(n2, s), await this.core.relayer.subscribe(s, { relay: o })), l2;
    }, this.activate = async ({ topic: i }) => {
      this.isInitialized();
      const s = pt$2(cjs$3.THIRTY_DAYS);
      await this.pairings.update(i, { active: true, expiry: s }), this.core.expirer.set(i, s);
    }, this.ping = async (i) => {
      this.isInitialized(), await this.isValidPing(i);
      const { topic: s } = i;
      if (this.pairings.keys.includes(s)) {
        const n2 = await this.sendRequest(s, "wc_pairingPing", {}), { done: o, resolve: a3, reject: h4 } = at$2();
        this.events.once(yt$2("pairing_ping", n2), ({ error: l2 }) => {
          l2 ? h4(l2) : a3();
        }), await o();
      }
    }, this.updateExpiry = async ({ topic: i, expiry: s }) => {
      this.isInitialized(), await this.pairings.update(i, { expiry: s });
    }, this.updateMetadata = async ({ topic: i, metadata: s }) => {
      this.isInitialized(), await this.pairings.update(i, { peerMetadata: s });
    }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i) => {
      this.isInitialized(), await this.isValidDisconnect(i);
      const { topic: s } = i;
      this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", U$4("USER_DISCONNECTED")), await this.deletePairing(s));
    }, this.sendRequest = async (i, s, n2) => {
      const o = formatJsonRpcRequest(s, n2), a3 = await this.core.crypto.encode(i, o), h4 = F$1[s].req;
      return this.core.history.set(i, o), this.core.relayer.publish(i, a3, h4), o.id;
    }, this.sendResult = async (i, s, n2) => {
      const o = formatJsonRpcResult(i, n2), a3 = await this.core.crypto.encode(s, o), h4 = await this.core.history.get(s, i), l2 = F$1[h4.request.method].res;
      await this.core.relayer.publish(s, a3, l2), await this.core.history.resolve(o);
    }, this.sendError = async (i, s, n2) => {
      const o = formatJsonRpcError(i, n2), a3 = await this.core.crypto.encode(s, o), h4 = await this.core.history.get(s, i), l2 = F$1[h4.request.method] ? F$1[h4.request.method].res : F$1.unregistered_method.res;
      await this.core.relayer.publish(s, a3, l2), await this.core.history.resolve(o);
    }, this.deletePairing = async (i, s) => {
      await this.core.relayer.unsubscribe(i), await Promise.all([this.pairings.delete(i, U$4("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i), s ? Promise.resolve() : this.core.expirer.del(i)]);
    }, this.cleanup = async () => {
      const i = this.pairings.getAll().filter((s) => mt$2(s.expiry));
      await Promise.all(i.map((s) => this.deletePairing(s.topic)));
    }, this.onRelayEventRequest = (i) => {
      const { topic: s, payload: n2 } = i;
      switch (n2.method) {
        case "wc_pairingPing":
          return this.onPairingPingRequest(s, n2);
        case "wc_pairingDelete":
          return this.onPairingDeleteRequest(s, n2);
        default:
          return this.onUnknownRpcMethodRequest(s, n2);
      }
    }, this.onRelayEventResponse = async (i) => {
      const { topic: s, payload: n2 } = i, o = (await this.core.history.get(s, n2.id)).request.method;
      switch (o) {
        case "wc_pairingPing":
          return this.onPairingPingResponse(s, n2);
        default:
          return this.onUnknownRpcMethodResponse(o);
      }
    }, this.onPairingPingRequest = async (i, s) => {
      const { id: n2 } = s;
      try {
        this.isValidPing({ topic: i }), await this.sendResult(n2, i, true), this.events.emit(V$2.ping, { id: n2, topic: i });
      } catch (o) {
        await this.sendError(n2, i, o), this.logger.error(o);
      }
    }, this.onPairingPingResponse = (i, s) => {
      const { id: n2 } = s;
      setTimeout(() => {
        isJsonRpcResult(s) ? this.events.emit(yt$2("pairing_ping", n2), {}) : isJsonRpcError(s) && this.events.emit(yt$2("pairing_ping", n2), { error: s.error });
      }, 500);
    }, this.onPairingDeleteRequest = async (i, s) => {
      const { id: n2 } = s;
      try {
        this.isValidDisconnect({ topic: i }), await this.deletePairing(i), this.events.emit(V$2.delete, { id: n2, topic: i });
      } catch (o) {
        await this.sendError(n2, i, o), this.logger.error(o);
      }
    }, this.onUnknownRpcMethodRequest = async (i, s) => {
      const { id: n2, method: o } = s;
      try {
        if (this.registeredMethods.includes(o))
          return;
        const a3 = U$4("WC_METHOD_UNSUPPORTED", o);
        await this.sendError(n2, i, a3), this.logger.error(a3);
      } catch (a3) {
        await this.sendError(n2, i, a3), this.logger.error(a3);
      }
    }, this.onUnknownRpcMethodResponse = (i) => {
      this.registeredMethods.includes(i) || this.logger.error(U$4("WC_METHOD_UNSUPPORTED", i));
    }, this.isValidPair = (i) => {
      var s;
      if (!Ht$2(i)) {
        const { message: o } = N$2("MISSING_OR_INVALID", `pair() params: ${i}`);
        throw new Error(o);
      }
      if (!kt$1(i.uri)) {
        const { message: o } = N$2("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
        throw new Error(o);
      }
      const n2 = wt$1(i.uri);
      if (!((s = n2?.relay) != null && s.protocol)) {
        const { message: o } = N$2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
        throw new Error(o);
      }
      if (!(n2 != null && n2.symKey)) {
        const { message: o } = N$2("MISSING_OR_INVALID", "pair() uri#symKey");
        throw new Error(o);
      }
    }, this.isValidPing = async (i) => {
      if (!Ht$2(i)) {
        const { message: n2 } = N$2("MISSING_OR_INVALID", `ping() params: ${i}`);
        throw new Error(n2);
      }
      const { topic: s } = i;
      await this.isValidPairingTopic(s);
    }, this.isValidDisconnect = async (i) => {
      if (!Ht$2(i)) {
        const { message: n2 } = N$2("MISSING_OR_INVALID", `disconnect() params: ${i}`);
        throw new Error(n2);
      }
      const { topic: s } = i;
      await this.isValidPairingTopic(s);
    }, this.isValidPairingTopic = async (i) => {
      if (!h$2(i, false)) {
        const { message: s } = N$2("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
        throw new Error(s);
      }
      if (!this.pairings.keys.includes(i)) {
        const { message: s } = N$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
        throw new Error(s);
      }
      if (mt$2(this.pairings.get(i).expiry)) {
        await this.deletePairing(i);
        const { message: s } = N$2("EXPIRED", `pairing topic: ${i}`);
        throw new Error(s);
      }
    }, this.core = e, this.logger = cjs.generateChildLogger(t, this.name), this.pairings = new Kt$1(this.core, this.logger, this.name, this.storagePrefix);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
  registerRelayerEvents() {
    this.core.relayer.on(D$2.message, async (e) => {
      const { topic: t, message: i } = e;
      if (!this.pairings.keys.includes(t) || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i)))
        return;
      const s = await this.core.crypto.decode(t, i);
      try {
        isJsonRpcRequest(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({ topic: t, payload: s })) : isJsonRpcResponse(s) && (await this.core.history.resolve(s), await this.onRelayEventResponse({ topic: t, payload: s }), this.core.history.delete(t, s.id));
      } catch (n2) {
        this.logger.error(n2);
      }
    });
  }
  registerExpirerEvents() {
    this.core.expirer.on(v$1.expired, async (e) => {
      const { topic: t } = ft$3(e.target);
      t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit(V$2.expire, { topic: t }));
    });
  }
};
class Vt extends h$3 {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new eventsExports.EventEmitter(), this.name = vt, this.version = It, this.cached = [], this.initialized = false, this.storagePrefix = O$2, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.set = (i, s, n2) => {
      if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i, request: s, chainId: n2 }), this.records.has(s.id))
        return;
      const o = { id: s.id, topic: i, request: { method: s.method, params: s.params || null }, chainId: n2, expiry: pt$2(cjs$3.THIRTY_DAYS) };
      this.records.set(o.id, o), this.events.emit(R.created, o);
    }, this.resolve = async (i) => {
      if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i }), !this.records.has(i.id))
        return;
      const s = await this.getRecord(i.id);
      typeof s.response > "u" && (s.response = isJsonRpcError(i) ? { error: i.error } : { result: i.result }, this.records.set(s.id, s), this.events.emit(R.updated, s));
    }, this.get = async (i, s) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i, id: s }), await this.getRecord(s)), this.delete = (i, s) => {
      this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s }), this.values.forEach((n2) => {
        if (n2.topic === i) {
          if (typeof s < "u" && n2.id !== s)
            return;
          this.records.delete(n2.id), this.events.emit(R.deleted, n2);
        }
      });
    }, this.exists = async (i, s) => (this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i : false), this.on = (i, s) => {
      this.events.on(i, s);
    }, this.once = (i, s) => {
      this.events.once(i, s);
    }, this.off = (i, s) => {
      this.events.off(i, s);
    }, this.removeListener = (i, s) => {
      this.events.removeListener(i, s);
    }, this.logger = cjs.generateChildLogger(t, this.name);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get size() {
    return this.records.size;
  }
  get keys() {
    return Array.from(this.records.keys());
  }
  get values() {
    return Array.from(this.records.values());
  }
  get pending() {
    const e = [];
    return this.values.forEach((t) => {
      if (typeof t.response < "u")
        return;
      const i = { topic: t.topic, request: formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
      return e.push(i);
    }), e;
  }
  async setJsonRpcRecords(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getJsonRpcRecords() {
    return await this.core.storage.getItem(this.storageKey);
  }
  getRecord(e) {
    this.isInitialized();
    const t = this.records.get(e);
    if (!t) {
      const { message: i } = N$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw new Error(i);
    }
    return t;
  }
  async persist() {
    await this.setJsonRpcRecords(this.values), this.events.emit(R.sync);
  }
  async restore() {
    try {
      const e = await this.getJsonRpcRecords();
      if (typeof e > "u" || !e.length)
        return;
      if (this.records.size) {
        const { message: t } = N$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
    }
  }
  registerEventListeners() {
    this.events.on(R.created, (e) => {
      const t = R.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(R.updated, (e) => {
      const t = R.updated;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.events.on(R.deleted, (e) => {
      const t = R.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
    }), this.core.heartbeat.on(cjs$1.HEARTBEAT_EVENTS.pulse, () => {
      this.cleanup();
    });
  }
  cleanup() {
    try {
      this.records.forEach((e) => {
        cjs$3.toMiliseconds(e.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${e.id}`), this.delete(e.topic, e.id));
      });
    } catch (e) {
      this.logger.warn(e);
    }
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
}
let jt$1 = class jt extends E$1 {
  constructor(e, t) {
    super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new eventsExports.EventEmitter(), this.name = Ct$1, this.version = Rt, this.cached = [], this.initialized = false, this.storagePrefix = O$2, this.init = async () => {
      this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = true);
    }, this.has = (i) => {
      try {
        const s = this.formatTarget(i);
        return typeof this.getExpiration(s) < "u";
      } catch {
        return false;
      }
    }, this.set = (i, s) => {
      this.isInitialized();
      const n2 = this.formatTarget(i), o = { target: n2, expiry: s };
      this.expirations.set(n2, o), this.checkExpiry(n2, o), this.events.emit(v$1.created, { target: n2, expiration: o });
    }, this.get = (i) => {
      this.isInitialized();
      const s = this.formatTarget(i);
      return this.getExpiration(s);
    }, this.del = (i) => {
      if (this.isInitialized(), this.has(i)) {
        const s = this.formatTarget(i), n2 = this.getExpiration(s);
        this.expirations.delete(s), this.events.emit(v$1.deleted, { target: s, expiration: n2 });
      }
    }, this.on = (i, s) => {
      this.events.on(i, s);
    }, this.once = (i, s) => {
      this.events.once(i, s);
    }, this.off = (i, s) => {
      this.events.off(i, s);
    }, this.removeListener = (i, s) => {
      this.events.removeListener(i, s);
    }, this.logger = cjs.generateChildLogger(t, this.name);
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get storageKey() {
    return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name;
  }
  get length() {
    return this.expirations.size;
  }
  get keys() {
    return Array.from(this.expirations.keys());
  }
  get values() {
    return Array.from(this.expirations.values());
  }
  formatTarget(e) {
    if (typeof e == "string")
      return lt$1(e);
    if (typeof e == "number")
      return dt$1(e);
    const { message: t } = N$2("UNKNOWN_TYPE", `Target type: ${typeof e}`);
    throw new Error(t);
  }
  async setExpirations(e) {
    await this.core.storage.setItem(this.storageKey, e);
  }
  async getExpirations() {
    return await this.core.storage.getItem(this.storageKey);
  }
  async persist() {
    await this.setExpirations(this.values), this.events.emit(v$1.sync);
  }
  async restore() {
    try {
      const e = await this.getExpirations();
      if (typeof e > "u" || !e.length)
        return;
      if (this.expirations.size) {
        const { message: t } = N$2("RESTORE_WILL_OVERRIDE", this.name);
        throw this.logger.error(t), new Error(t);
      }
      this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
    } catch (e) {
      this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
    }
  }
  getExpiration(e) {
    const t = this.expirations.get(e);
    if (!t) {
      const { message: i } = N$2("NO_MATCHING_KEY", `${this.name}: ${e}`);
      throw this.logger.error(i), new Error(i);
    }
    return t;
  }
  checkExpiry(e, t) {
    const { expiry: i } = t;
    cjs$3.toMiliseconds(i) - Date.now() <= 0 && this.expire(e, t);
  }
  expire(e, t) {
    this.expirations.delete(e), this.events.emit(v$1.expired, { target: e, expiration: t });
  }
  checkExpirations() {
    this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
  }
  registerEventListeners() {
    this.core.heartbeat.on(cjs$1.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()), this.events.on(v$1.created, (e) => {
      const t = v$1.created;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(v$1.expired, (e) => {
      const t = v$1.expired;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    }), this.events.on(v$1.deleted, (e) => {
      const t = v$1.deleted;
      this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
    });
  }
  isInitialized() {
    if (!this.initialized) {
      const { message: e } = N$2("NOT_INITIALIZED", this.name);
      throw new Error(e);
    }
  }
};
let qt$1 = class qt extends y$1 {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.name = Z, this.initialized = false, this.queue = [], this.verifyDisabled = false, this.init = async (i) => {
      if (this.verifyDisabled || C$1() || !D$3())
        return;
      const s = this.getVerifyUrl(i?.verifyUrl);
      this.verifyUrl !== s && this.removeIframe(), this.verifyUrl = s;
      try {
        await this.createIframe();
      } catch (n2) {
        this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.info(n2);
      }
      if (!this.initialized) {
        this.removeIframe(), this.verifyUrl = ee;
        try {
          await this.createIframe();
        } catch (n2) {
          this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.info(n2), this.verifyDisabled = true;
        }
      }
    }, this.register = async (i) => {
      this.initialized ? this.sendPost(i.attestationId) : (this.addToQueue(i.attestationId), await this.init());
    }, this.resolve = async (i) => {
      if (this.isDevEnv)
        return "";
      const s = this.getVerifyUrl(i?.verifyUrl);
      let n2;
      try {
        n2 = await this.fetchAttestation(i.attestationId, s);
      } catch (o) {
        this.logger.info(`failed to resolve attestation: ${i.attestationId} from url: ${s}`), this.logger.info(o), n2 = await this.fetchAttestation(i.attestationId, ee);
      }
      return n2;
    }, this.fetchAttestation = async (i, s) => {
      this.logger.info(`resolving attestation: ${i} from url: ${s}`);
      const n2 = this.startAbortTimer(cjs$3.ONE_SECOND * 2), o = await fetch(`${s}/attestation/${i}`, { signal: this.abortController.signal });
      return clearTimeout(n2), o.status === 200 ? await o.json() : void 0;
    }, this.addToQueue = (i) => {
      this.queue.push(i);
    }, this.processQueue = () => {
      this.queue.length !== 0 && (this.queue.forEach((i) => this.sendPost(i)), this.queue = []);
    }, this.sendPost = (i) => {
      var s;
      try {
        if (!this.iframe)
          return;
        (s = this.iframe.contentWindow) == null || s.postMessage(i, "*"), this.logger.info(`postMessage sent: ${i} ${this.verifyUrl}`);
      } catch {
      }
    }, this.createIframe = async () => {
      let i;
      const s = (n2) => {
        n2.data === "verify_ready" && (this.initialized = true, this.processQueue(), window.removeEventListener("message", s), i());
      };
      await Promise.race([new Promise((n2) => {
        if (document.getElementById(Z))
          return n2();
        window.addEventListener("message", s);
        const o = document.createElement("iframe");
        o.id = Z, o.src = `${this.verifyUrl}/${this.projectId}`, o.style.display = "none", document.body.append(o), this.iframe = o, i = n2;
      }), new Promise((n2, o) => setTimeout(() => {
        window.removeEventListener("message", s), o("verify iframe load timeout");
      }, cjs$3.toMiliseconds(cjs$3.FIVE_SECONDS)))]);
    }, this.removeIframe = () => {
      this.iframe && (this.iframe.remove(), this.iframe = void 0, this.initialized = false);
    }, this.getVerifyUrl = (i) => {
      let s = i || $$1;
      return _t.includes(s) || (this.logger.info(`verify url: ${s}, not included in trusted list, assigning default: ${$$1}`), s = $$1), s;
    }, this.logger = cjs.generateChildLogger(t, this.name), this.verifyUrl = $$1, this.abortController = new AbortController(), this.isDevEnv = te$2() && {}.IS_VITEST;
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  startAbortTimer(e) {
    return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), cjs$3.toMiliseconds(e));
  }
};
let Gt$1 = class Gt extends v$2 {
  constructor(e, t) {
    super(e, t), this.projectId = e, this.logger = t, this.context = St, this.registerDeviceToken = async (i) => {
      const { clientId: s, token: n2, notificationType: o, enableEncrypted: a3 = false } = i, h4 = `${Tt}/${this.projectId}/clients`;
      await Yi(h4, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ client_id: s, type: o, token: n2, always_raw: a3 }) });
    }, this.logger = cjs.generateChildLogger(t, this.context);
  }
};
var Lr = Object.defineProperty, Yt$1 = Object.getOwnPropertySymbols, Fr = Object.prototype.hasOwnProperty, $r = Object.prototype.propertyIsEnumerable, Ht$1 = (r, e, t) => e in r ? Lr(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t, Jt$1 = (r, e) => {
  for (var t in e || (e = {}))
    Fr.call(e, t) && Ht$1(r, t, e[t]);
  if (Yt$1)
    for (var t of Yt$1(e))
      $r.call(e, t) && Ht$1(r, t, e[t]);
  return r;
};
let te$1 = class te extends n {
  constructor(e) {
    super(e), this.protocol = le$1, this.version = We, this.name = Q$2, this.events = new eventsExports.EventEmitter(), this.initialized = false, this.on = (i, s) => this.events.on(i, s), this.once = (i, s) => this.events.once(i, s), this.off = (i, s) => this.events.off(i, s), this.removeListener = (i, s) => this.events.removeListener(i, s), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || ge$1, this.customStoragePrefix = e != null && e.customStoragePrefix ? `:${e.customStoragePrefix}` : "";
    const t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : cjs.pino(cjs.getDefaultLoggerOptions({ level: e?.logger || Qe$1.logger }));
    this.logger = cjs.generateChildLogger(t, this.name), this.heartbeat = new cjs$1.HeartBeat(), this.crypto = new xt$1(this, this.logger, e?.keychain), this.history = new Vt(this, this.logger), this.expirer = new jt$1(this, this.logger), this.storage = e != null && e.storage ? e.storage : new h$4(Jt$1(Jt$1({}, Ze$1), e?.storageOptions)), this.relayer = new Ft$1({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new Bt$1(this, this.logger), this.verify = new qt$1(this.projectId || "", this.logger), this.echoClient = new Gt$1(this.projectId || "", this.logger);
  }
  static async init(e) {
    const t = new te(e);
    await t.initialize();
    const i = await t.crypto.getClientId();
    return await t.storage.setItem(yt$1, i), t;
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  async start() {
    this.initialized || await this.initialize();
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = true, this.logger.info("Core Initialization Success");
    } catch (e) {
      throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
    }
  }
};
const Mr = te$1;
let b$1 = class b {
  constructor(s) {
    this.opts = s, this.protocol = "wc", this.version = 2;
  }
};
let w$1 = class w {
  constructor(s) {
    this.client = s;
  }
};
var queryString$1 = {};
(function(exports) {
  const strictUriEncode = require$$0$4;
  const decodeComponent = require$$1$1;
  const splitOnFirst = require$$2$1;
  const filterObject = require$$3;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode(key, options), "[", encode(index, options), "]=", encode(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[]"].join("")];
          }
          return [...result, [encode(key, options), "[]=", encode(value, options)].join("")];
        };
      case "colon-list-separator":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), ":list="].join("")];
          }
          return [...result, [encode(key, options), ":list=", encode(value, options)].join("")];
        };
      case "comma":
      case "separator":
      case "bracket-separator": {
        const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          value = value === null ? "" : value;
          if (result.length === 0) {
            return [[encode(key, options), keyValueSep, encode(value, options)].join("")];
          }
          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode(key, options)];
          }
          return [...result, [encode(key, options), "=", encode(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "colon-list-separator":
        return (key, value, accumulator) => {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      case "bracket-separator":
        return (key, value, accumulator) => {
          const isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, "");
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode(item, options));
          if (accumulator[key] === void 0) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a3, b3) => Number(a3) - Number(b3)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
        for (const k2 of Object.keys(value)) {
          value[k2] = parseValue(value[k2], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    const keys2 = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys2.sort(options.sort);
    }
    return keys2.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode(key, options);
      }
      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key, options) + "[]";
        }
        return value.reduce(formatter(key), []).join("&");
      }
      return encode(key, options) + "=" + encode(value, options);
    }).filter((x2) => x2.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign(
      {
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
      },
      options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode(hash, options) } : {}
    );
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true,
      [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true,
      [encodeFragmentIdentifier]: false
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString$1);
function L$1(e, n2) {
  return e.includes(":") ? [e] : n2.chains || [];
}
const p$1 = "base16", H$1 = "utf8", _$1 = 1;
function Ln(e) {
  const n2 = sha256.hash(fromString(e, H$1));
  return toString(n2, p$1);
}
const je = "ReactNative", m$1 = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
function te2() {
  return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
}
function C() {
  return !getDocument_1() && !!getNavigator_1() && navigator.product === je;
}
function D$1() {
  return !te2() && !!getNavigator_1() && !!getDocument_1();
}
function T() {
  return C() ? m$1.reactNative : te2() ? m$1.node : D$1() ? m$1.browser : m$1.unknown;
}
function Qn() {
  return getWindowMetadata_1() || { name: "", description: "", url: "", icons: [""] };
}
function O$1(e, n2) {
  return e.filter((t) => n2.includes(t)).length === e.length;
}
function at(e = cjs$3.FIVE_MINUTES, n2) {
  const t = cjs$3.toMiliseconds(e || cjs$3.FIVE_MINUTES);
  let r, o, s;
  return { resolve: (i) => {
    s && r && (clearTimeout(s), r(i));
  }, reject: (i) => {
    s && o && (clearTimeout(s), o(i));
  }, done: () => new Promise((i, d2) => {
    s = setTimeout(() => {
      d2(new Error(n2));
    }, t), r = i, o = d2;
  }) };
}
function ft$1(e) {
  const [n2, t] = e.split(":"), r = { id: void 0, topic: void 0 };
  if (n2 === "topic" && typeof t == "string")
    r.topic = t;
  else if (n2 === "id" && Number.isInteger(Number(t)))
    r.id = Number(t);
  else
    throw new Error(`Invalid target, expected id:number or topic:string, got ${n2}:${t}`);
  return r;
}
function pt(e, n2) {
  return cjs$3.fromMiliseconds((n2 || Date.now()) + cjs$3.toMiliseconds(e));
}
function mt(e) {
  return Date.now() >= cjs$3.toMiliseconds(e);
}
function yt(e, n2) {
  return `${e}${n2 ? `:${n2}` : ""}`;
}
async function ht({ id: e, topic: n2, wcDeepLink: t }) {
  try {
    if (!t)
      return;
    const r = typeof t == "string" ? JSON.parse(t) : t;
    let o = r?.href;
    if (typeof o != "string")
      return;
    o.endsWith("/") && (o = o.slice(0, -1));
    const s = `${o}/wc?requestId=${e}&sessionTopic=${n2}`, i = T();
    i === m$1.browser ? s.startsWith("https://") ? window.open(s, "_blank", "noreferrer noopener") : window.open(s, "_self", "noreferrer noopener") : i === m$1.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(s);
  } catch (r) {
    console.error(r);
  }
}
async function gt(e, n2) {
  try {
    return await e.getItem(n2) || (D$1() ? localStorage.getItem(n2) : void 0);
  } catch (t) {
    console.error(t);
  }
}
function A$1(e) {
  const n2 = [];
  return e.forEach((t) => {
    const [r, o] = t.split(":");
    n2.push(`${r}:${o}`);
  }), n2;
}
function Qe(e) {
  const n2 = [];
  return Object.values(e).forEach((t) => {
    n2.push(...A$1(t.accounts));
  }), n2;
}
function Ze(e, n2) {
  const t = [];
  return Object.values(e).forEach((r) => {
    A$1(r.accounts).includes(n2) && t.push(...r.methods);
  }), t;
}
function Xe(e, n2) {
  const t = [];
  return Object.values(e).forEach((r) => {
    A$1(r.accounts).includes(n2) && t.push(...r.events);
  }), t;
}
function jt2(e, n2) {
  const t = ln(e, n2);
  if (t)
    throw new Error(t.message);
  const r = {};
  for (const [o, s] of Object.entries(e))
    r[o] = { methods: s.methods, events: s.events, chains: s.accounts.map((i) => `${i.split(":")[0]}:${i.split(":")[1]}`) };
  return r;
}
const nn$1 = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } }, tn = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
function N$1(e, n2) {
  const { message: t, code: r } = tn[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function U$3(e, n2) {
  const { message: t, code: r } = nn$1[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function k$1(e, n2) {
  return Array.isArray(e) ? typeof n2 < "u" && e.length ? e.every(n2) : true : false;
}
function B$1(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
function w2(e) {
  return typeof e > "u";
}
function h3(e, n2) {
  return n2 && w2(e) ? true : typeof e == "string" && !!e.trim().length;
}
function G$2(e, n2) {
  return n2 && w2(e) ? true : typeof e == "number" && !isNaN(e);
}
function Dt(e, n2) {
  const { requiredNamespaces: t } = n2, r = Object.keys(e.namespaces), o = Object.keys(t);
  let s = true;
  return O$1(o, r) ? (r.forEach((i) => {
    const { accounts: d2, methods: l2, events: c2 } = e.namespaces[i], u3 = A$1(d2), a3 = t[i];
    (!O$1(L$1(i, a3), u3) || !O$1(a3.methods, l2) || !O$1(a3.events, c2)) && (s = false);
  }), s) : false;
}
function V$1(e) {
  return h3(e, false) && e.includes(":") ? e.split(":").length === 2 : false;
}
function rn(e) {
  if (h3(e, false) && e.includes(":")) {
    const n2 = e.split(":");
    if (n2.length === 3) {
      const t = n2[0] + ":" + n2[1];
      return !!n2[2] && V$1(t);
    }
  }
  return false;
}
function Kt2(e, n2) {
  let t = null;
  return h3(e?.publicKey, false) || (t = N$1("MISSING_OR_INVALID", `${n2} controller public key should be a string`)), t;
}
function ie(e) {
  let n2 = true;
  return k$1(e) ? e.length && (n2 = e.every((t) => h3(t, false))) : n2 = false, n2;
}
function on(e, n2, t) {
  let r = null;
  return k$1(n2) && n2.length ? n2.forEach((o) => {
    r || V$1(o) || (r = U$3("UNSUPPORTED_CHAINS", `${t}, chain ${o} should be a string and conform to "namespace:chainId" format`));
  }) : V$1(e) || (r = U$3("UNSUPPORTED_CHAINS", `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
}
function sn(e, n2, t) {
  let r = null;
  return Object.entries(e).forEach(([o, s]) => {
    if (r)
      return;
    const i = on(o, L$1(o, s), `${n2} ${t}`);
    i && (r = i);
  }), r;
}
function cn(e, n2) {
  let t = null;
  return k$1(e) ? e.forEach((r) => {
    t || rn(r) || (t = U$3("UNSUPPORTED_ACCOUNTS", `${n2}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
  }) : t = U$3("UNSUPPORTED_ACCOUNTS", `${n2}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
}
function an(e, n2) {
  let t = null;
  return Object.values(e).forEach((r) => {
    if (t)
      return;
    const o = cn(r?.accounts, `${n2} namespace`);
    o && (t = o);
  }), t;
}
function un(e, n2) {
  let t = null;
  return ie(e?.methods) ? ie(e?.events) || (t = U$3("UNSUPPORTED_EVENTS", `${n2}, events should be an array of strings or empty array for no events`)) : t = U$3("UNSUPPORTED_METHODS", `${n2}, methods should be an array of strings or empty array for no methods`), t;
}
function ce$1(e, n2) {
  let t = null;
  return Object.values(e).forEach((r) => {
    if (t)
      return;
    const o = un(r, `${n2}, namespace`);
    o && (t = o);
  }), t;
}
function Lt(e, n2, t) {
  let r = null;
  if (e && B$1(e)) {
    const o = ce$1(e, n2);
    o && (r = o);
    const s = sn(e, n2, t);
    s && (r = s);
  } else
    r = N$1("MISSING_OR_INVALID", `${n2}, ${t} should be an object with data`);
  return r;
}
function ln(e, n2) {
  let t = null;
  if (e && B$1(e)) {
    const r = ce$1(e, n2);
    r && (t = r);
    const o = an(e, n2);
    o && (t = o);
  } else
    t = N$1("MISSING_OR_INVALID", `${n2}, namespaces should be an object with data`);
  return t;
}
function dn(e) {
  return h3(e.protocol, true);
}
function xt2(e, n2) {
  let t = false;
  return n2 && !e ? t = true : e && k$1(e) && e.length && e.forEach((r) => {
    t = dn(r);
  }), t;
}
function Ft2(e) {
  return typeof e == "number";
}
function Ht(e) {
  return typeof e < "u" && typeof e !== null;
}
function qt2(e) {
  return !(!e || typeof e != "object" || !e.code || !G$2(e.code, false) || !e.message || !h3(e.message, false));
}
function Bt2(e) {
  return !(w2(e) || !h3(e.method, false));
}
function Gt2(e) {
  return !(w2(e) || w2(e.result) && w2(e.error) || !G$2(e.id, false) || !h3(e.jsonrpc, false));
}
function Wt(e) {
  return !(w2(e) || !h3(e.name, false));
}
function zt(e, n2) {
  return !(!V$1(n2) || !Qe(e).includes(n2));
}
function Yt(e, n2, t) {
  return h3(t, false) ? Ze(e, n2).includes(t) : false;
}
function Jt(e, n2, t) {
  return h3(t, false) ? Xe(e, n2).includes(t) : false;
}
function fn(e, n2, t) {
  let r = null;
  const o = Qt(e), s = Zt(n2), i = Object.keys(o), d2 = Object.keys(s), l2 = pn(Object.keys(e)), c2 = pn(Object.keys(n2)), u3 = l2.filter((a3) => !c2.includes(a3));
  return u3.length && (r = N$1("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u3.toString()}
      Received: ${Object.keys(n2).toString()}`)), O$1(i, d2) || (r = N$1("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${i.toString()}
      Approved: ${d2.toString()}`)), Object.keys(n2).forEach((a3) => {
    if (!a3.includes(":") || r)
      return;
    const b3 = A$1(n2[a3].accounts);
    b3.includes(a3) || (r = N$1("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${a3}
        Required: ${a3}
        Approved: ${b3.toString()}`));
  }), i.forEach((a3) => {
    r || (O$1(o[a3].methods, s[a3].methods) ? O$1(o[a3].events, s[a3].events) || (r = N$1("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${a3}`)) : r = N$1("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${a3}`));
  }), r;
}
function Qt(e) {
  const n2 = {};
  return Object.keys(e).forEach((t) => {
    var r;
    t.includes(":") ? n2[t] = e[t] : (r = e[t].chains) == null || r.forEach((o) => {
      n2[o] = { methods: e[t].methods, events: e[t].events };
    });
  }), n2;
}
function pn(e) {
  return [...new Set(e.map((n2) => n2.includes(":") ? n2.split(":")[0] : n2))];
}
function Zt(e) {
  const n2 = {};
  return Object.keys(e).forEach((t) => {
    if (t.includes(":"))
      n2[t] = e[t];
    else {
      const r = A$1(e[t].accounts);
      r?.forEach((o) => {
        n2[o] = { accounts: e[t].accounts.filter((s) => s.includes(`${o}:`)), methods: e[t].methods, events: e[t].events };
      });
    }
  }), n2;
}
function Xt(e, n2) {
  return G$2(e, false) && e <= n2.max && e >= n2.min;
}
const ae$1 = {};
class tr {
  static get(n2) {
    return ae$1[n2];
  }
  static set(n2, t) {
    ae$1[n2] = t;
  }
  static delete(n2) {
    delete ae$1[n2];
  }
}
const X = "wc", F = 2, H = "client", G$1 = `${X}@${F}:${H}:`, M$1 = { name: H, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.com" }, W = "WALLETCONNECT_DEEPLINK_CHOICE", ne = "proposal", oe$1 = "Proposal expired", ae = "session", A = cjs$3.SEVEN_DAYS, ce = "engine", V = { wc_sessionPropose: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1101 } }, wc_sessionSettle: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: cjs$3.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: cjs$3.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: cjs$3.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1114 }, res: { ttl: cjs$3.THIRTY_SECONDS, prompt: false, tag: 1115 } } }, U$2 = { min: cjs$3.FIVE_MINUTES, max: cjs$3.SEVEN_DAYS }, I = { idle: "IDLE", active: "ACTIVE" }, le = "request", pe = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var as = Object.defineProperty, cs = Object.defineProperties, ls = Object.getOwnPropertyDescriptors, he = Object.getOwnPropertySymbols, ps = Object.prototype.hasOwnProperty, hs = Object.prototype.propertyIsEnumerable, de = (m2, r, e) => r in m2 ? as(m2, r, { enumerable: true, configurable: true, writable: true, value: e }) : m2[r] = e, g$1 = (m2, r) => {
  for (var e in r || (r = {}))
    ps.call(r, e) && de(m2, e, r[e]);
  if (he)
    for (var e of he(r))
      hs.call(r, e) && de(m2, e, r[e]);
  return m2;
}, b2 = (m2, r) => cs(m2, ls(r));
class ds extends w$1 {
  constructor(r) {
    super(r), this.name = ce, this.events = new EventEmitter(), this.initialized = false, this.ignoredPayloadTypes = [_$1], this.requestQueue = { state: I.idle, queue: [] }, this.sessionRequestQueue = { state: I.idle, queue: [] }, this.requestQueueDelay = cjs$3.ONE_SECOND, this.init = async () => {
      this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.registerPairingEvents(), this.client.core.pairing.register({ methods: Object.keys(V) }), this.initialized = true, setTimeout(() => {
        this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
      }, cjs$3.toMiliseconds(this.requestQueueDelay)));
    }, this.connect = async (e) => {
      await this.isInitialized();
      const s = b2(g$1({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
      await this.isValidConnect(s);
      const { pairingTopic: t, requiredNamespaces: i, optionalNamespaces: n2, sessionProperties: o, relays: a3 } = s;
      let c2 = t, p3, d2 = false;
      if (c2 && (d2 = this.client.core.pairing.pairings.get(c2).active), !c2 || !d2) {
        const { topic: v3, uri: S2 } = await this.client.core.pairing.create();
        c2 = v3, p3 = S2;
      }
      const h4 = await this.client.core.crypto.generateKeyPair(), R2 = g$1({ requiredNamespaces: i, optionalNamespaces: n2, relays: a3 ?? [{ protocol: ht$1 }], proposer: { publicKey: h4, metadata: this.client.metadata } }, o && { sessionProperties: o }), { reject: w3, resolve: T2, done: K3 } = at(cjs$3.FIVE_MINUTES, oe$1);
      if (this.events.once(yt("session_connect"), async ({ error: v3, session: S2 }) => {
        if (v3)
          w3(v3);
        else if (S2) {
          S2.self.publicKey = h4;
          const B2 = b2(g$1({}, S2), { requiredNamespaces: S2.requiredNamespaces, optionalNamespaces: S2.optionalNamespaces });
          await this.client.session.set(S2.topic, B2), await this.setExpiry(S2.topic, S2.expiry), c2 && await this.client.core.pairing.updateMetadata({ topic: c2, metadata: S2.peer.metadata }), T2(B2);
        }
      }), !c2) {
        const { message: v3 } = N$1("NO_MATCHING_KEY", `connect() pairing topic: ${c2}`);
        throw new Error(v3);
      }
      const L2 = await this.sendRequest({ topic: c2, method: "wc_sessionPropose", params: R2 }), ge2 = pt(cjs$3.FIVE_MINUTES);
      return await this.setProposal(L2, g$1({ id: L2, expiry: ge2 }, R2)), { uri: p3, approval: K3 };
    }, this.pair = async (e) => (await this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e) => {
      await this.isInitialized(), await this.isValidApprove(e);
      const { id: s, relayProtocol: t, namespaces: i, sessionProperties: n2 } = e, o = this.client.proposal.get(s);
      let { pairingTopic: a3, proposer: c2, requiredNamespaces: p3, optionalNamespaces: d2 } = o;
      a3 = a3 || "", B$1(p3) || (p3 = jt2(i, "approve()"));
      const h4 = await this.client.core.crypto.generateKeyPair(), R2 = c2.publicKey, w3 = await this.client.core.crypto.generateSharedKey(h4, R2);
      a3 && s && (await this.client.core.pairing.updateMetadata({ topic: a3, metadata: c2.metadata }), await this.sendResult({ id: s, topic: a3, result: { relay: { protocol: t ?? "irn" }, responderPublicKey: h4 } }), await this.client.proposal.delete(s, U$3("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: a3 }));
      const T2 = g$1({ relay: { protocol: t ?? "irn" }, namespaces: i, requiredNamespaces: p3, optionalNamespaces: d2, pairingTopic: a3, controller: { publicKey: h4, metadata: this.client.metadata }, expiry: pt(A) }, n2 && { sessionProperties: n2 });
      await this.client.core.relayer.subscribe(w3), await this.sendRequest({ topic: w3, method: "wc_sessionSettle", params: T2, throwOnFailedPublish: true });
      const K3 = b2(g$1({}, T2), { topic: w3, pairingTopic: a3, acknowledged: false, self: T2.controller, peer: { publicKey: c2.publicKey, metadata: c2.metadata }, controller: h4 });
      return await this.client.session.set(w3, K3), await this.setExpiry(w3, pt(A)), { topic: w3, acknowledged: () => new Promise((L2) => setTimeout(() => L2(this.client.session.get(w3)), 500)) };
    }, this.reject = async (e) => {
      await this.isInitialized(), await this.isValidReject(e);
      const { id: s, reason: t } = e, { pairingTopic: i } = this.client.proposal.get(s);
      i && (await this.sendError(s, i, t), await this.client.proposal.delete(s, U$3("USER_DISCONNECTED")));
    }, this.update = async (e) => {
      await this.isInitialized(), await this.isValidUpdate(e);
      const { topic: s, namespaces: t } = e, i = await this.sendRequest({ topic: s, method: "wc_sessionUpdate", params: { namespaces: t } }), { done: n2, resolve: o, reject: a3 } = at();
      return this.events.once(yt("session_update", i), ({ error: c2 }) => {
        c2 ? a3(c2) : o();
      }), await this.client.session.update(s, { namespaces: t }), { acknowledged: n2 };
    }, this.extend = async (e) => {
      await this.isInitialized(), await this.isValidExtend(e);
      const { topic: s } = e, t = await this.sendRequest({ topic: s, method: "wc_sessionExtend", params: {} }), { done: i, resolve: n2, reject: o } = at();
      return this.events.once(yt("session_extend", t), ({ error: a3 }) => {
        a3 ? o(a3) : n2();
      }), await this.setExpiry(s, pt(A)), { acknowledged: i };
    }, this.request = async (e) => {
      await this.isInitialized(), await this.isValidRequest(e);
      const { chainId: s, request: t, topic: i, expiry: n2 } = e, o = payloadId(), { done: a3, resolve: c2, reject: p3 } = at(n2, "Request expired. Please try again.");
      return this.events.once(yt("session_request", o), ({ error: d2, result: h4 }) => {
        d2 ? p3(d2) : c2(h4);
      }), await Promise.all([new Promise(async (d2) => {
        await this.sendRequest({ clientRpcId: o, topic: i, method: "wc_sessionRequest", params: { request: t, chainId: s }, expiry: n2, throwOnFailedPublish: true }).catch((h4) => p3(h4)), this.client.events.emit("session_request_sent", { topic: i, request: t, chainId: s, id: o }), d2();
      }), new Promise(async (d2) => {
        const h4 = await gt(this.client.core.storage, W);
        ht({ id: o, topic: i, wcDeepLink: h4 }), d2();
      }), a3()]).then((d2) => d2[2]);
    }, this.respond = async (e) => {
      await this.isInitialized(), await this.isValidRespond(e);
      const { topic: s, response: t } = e, { id: i } = t;
      isJsonRpcResult(t) ? await this.sendResult({ id: i, topic: s, result: t.result, throwOnFailedPublish: true }) : isJsonRpcError(t) && await this.sendError(i, s, t.error), this.cleanupAfterResponse(e);
    }, this.ping = async (e) => {
      await this.isInitialized(), await this.isValidPing(e);
      const { topic: s } = e;
      if (this.client.session.keys.includes(s)) {
        const t = await this.sendRequest({ topic: s, method: "wc_sessionPing", params: {} }), { done: i, resolve: n2, reject: o } = at();
        this.events.once(yt("session_ping", t), ({ error: a3 }) => {
          a3 ? o(a3) : n2();
        }), await i();
      } else
        this.client.core.pairing.pairings.keys.includes(s) && await this.client.core.pairing.ping({ topic: s });
    }, this.emit = async (e) => {
      await this.isInitialized(), await this.isValidEmit(e);
      const { topic: s, event: t, chainId: i } = e;
      await this.sendRequest({ topic: s, method: "wc_sessionEvent", params: { event: t, chainId: i } });
    }, this.disconnect = async (e) => {
      await this.isInitialized(), await this.isValidDisconnect(e);
      const { topic: s } = e;
      this.client.session.keys.includes(s) ? (await this.sendRequest({ topic: s, method: "wc_sessionDelete", params: U$3("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession(s)) : await this.client.core.pairing.disconnect({ topic: s });
    }, this.find = (e) => (this.isInitialized(), this.client.session.getAll().filter((s) => Dt(s, e))), this.getPendingSessionRequests = () => (this.isInitialized(), this.client.pendingRequest.getAll()), this.cleanupDuplicatePairings = async (e) => {
      if (e.pairingTopic)
        try {
          const s = this.client.core.pairing.pairings.get(e.pairingTopic), t = this.client.core.pairing.pairings.getAll().filter((i) => {
            var n2, o;
            return ((n2 = i.peerMetadata) == null ? void 0 : n2.url) && ((o = i.peerMetadata) == null ? void 0 : o.url) === e.peer.metadata.url && i.topic && i.topic !== s.topic;
          });
          if (t.length === 0)
            return;
          this.client.logger.info(`Cleaning up ${t.length} duplicate pairing(s)`), await Promise.all(t.map((i) => this.client.core.pairing.disconnect({ topic: i.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
        } catch (s) {
          this.client.logger.error(s);
        }
    }, this.deleteSession = async (e, s) => {
      const { self: t } = this.client.session.get(e);
      await this.client.core.relayer.unsubscribe(e), this.client.session.delete(e, U$3("USER_DISCONNECTED")), this.client.core.crypto.keychain.has(t.publicKey) && await this.client.core.crypto.deleteKeyPair(t.publicKey), this.client.core.crypto.keychain.has(e) && await this.client.core.crypto.deleteSymKey(e), s || this.client.core.expirer.del(e), this.client.core.storage.removeItem(W).catch((i) => this.client.logger.warn(i)), this.getPendingSessionRequests().forEach((i) => {
        i.topic === e && this.deletePendingSessionRequest(i.id, U$3("USER_DISCONNECTED"));
      });
    }, this.deleteProposal = async (e, s) => {
      await Promise.all([this.client.proposal.delete(e, U$3("USER_DISCONNECTED")), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
    }, this.deletePendingSessionRequest = async (e, s, t = false) => {
      await Promise.all([this.client.pendingRequest.delete(e, s), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((i) => i.id !== e), t && (this.sessionRequestQueue.state = I.idle);
    }, this.setExpiry = async (e, s) => {
      this.client.session.keys.includes(e) && await this.client.session.update(e, { expiry: s }), this.client.core.expirer.set(e, s);
    }, this.setProposal = async (e, s) => {
      await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
    }, this.setPendingSessionRequest = async (e) => {
      const s = V.wc_sessionRequest.req.ttl, { id: t, topic: i, params: n2, verifyContext: o } = e;
      await this.client.pendingRequest.set(t, { id: t, topic: i, params: n2, verifyContext: o }), s && this.client.core.expirer.set(t, pt(s));
    }, this.sendRequest = async (e) => {
      const { topic: s, method: t, params: i, expiry: n2, relayRpcId: o, clientRpcId: a3, throwOnFailedPublish: c2 } = e, p3 = formatJsonRpcRequest(t, i, a3);
      if (D$1() && pe.includes(t)) {
        const R2 = Ln(JSON.stringify(p3));
        this.client.core.verify.register({ attestationId: R2 });
      }
      const d2 = await this.client.core.crypto.encode(s, p3), h4 = V[t].req;
      return n2 && (h4.ttl = n2), o && (h4.id = o), this.client.core.history.set(s, p3), c2 ? (h4.internal = b2(g$1({}, h4.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s, d2, h4)) : this.client.core.relayer.publish(s, d2, h4).catch((R2) => this.client.logger.error(R2)), p3.id;
    }, this.sendResult = async (e) => {
      const { id: s, topic: t, result: i, throwOnFailedPublish: n2 } = e, o = formatJsonRpcResult(s, i), a3 = await this.client.core.crypto.encode(t, o), c2 = await this.client.core.history.get(t, s), p3 = V[c2.request.method].res;
      n2 ? (p3.internal = b2(g$1({}, p3.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, a3, p3)) : this.client.core.relayer.publish(t, a3, p3).catch((d2) => this.client.logger.error(d2)), await this.client.core.history.resolve(o);
    }, this.sendError = async (e, s, t) => {
      const i = formatJsonRpcError(e, t), n2 = await this.client.core.crypto.encode(s, i), o = await this.client.core.history.get(s, e), a3 = V[o.request.method].res;
      this.client.core.relayer.publish(s, n2, a3), await this.client.core.history.resolve(i);
    }, this.cleanup = async () => {
      const e = [], s = [];
      this.client.session.getAll().forEach((t) => {
        mt(t.expiry) && e.push(t.topic);
      }), this.client.proposal.getAll().forEach((t) => {
        mt(t.expiry) && s.push(t.id);
      }), await Promise.all([...e.map((t) => this.deleteSession(t)), ...s.map((t) => this.deleteProposal(t))]);
    }, this.onRelayEventRequest = async (e) => {
      this.requestQueue.queue.push(e), await this.processRequestsQueue();
    }, this.processRequestsQueue = async () => {
      if (this.requestQueue.state === I.active) {
        this.client.logger.info("Request queue already active, skipping...");
        return;
      }
      for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
        this.requestQueue.state = I.active;
        const e = this.requestQueue.queue.shift();
        if (e)
          try {
            this.processRequest(e), await new Promise((s) => setTimeout(s, 300));
          } catch (s) {
            this.client.logger.warn(s);
          }
      }
      this.requestQueue.state = I.idle;
    }, this.processRequest = (e) => {
      const { topic: s, payload: t } = e, i = t.method;
      switch (i) {
        case "wc_sessionPropose":
          return this.onSessionProposeRequest(s, t);
        case "wc_sessionSettle":
          return this.onSessionSettleRequest(s, t);
        case "wc_sessionUpdate":
          return this.onSessionUpdateRequest(s, t);
        case "wc_sessionExtend":
          return this.onSessionExtendRequest(s, t);
        case "wc_sessionPing":
          return this.onSessionPingRequest(s, t);
        case "wc_sessionDelete":
          return this.onSessionDeleteRequest(s, t);
        case "wc_sessionRequest":
          return this.onSessionRequest(s, t);
        case "wc_sessionEvent":
          return this.onSessionEventRequest(s, t);
        default:
          return this.client.logger.info(`Unsupported request method ${i}`);
      }
    }, this.onRelayEventResponse = async (e) => {
      const { topic: s, payload: t } = e, i = (await this.client.core.history.get(s, t.id)).request.method;
      switch (i) {
        case "wc_sessionPropose":
          return this.onSessionProposeResponse(s, t);
        case "wc_sessionSettle":
          return this.onSessionSettleResponse(s, t);
        case "wc_sessionUpdate":
          return this.onSessionUpdateResponse(s, t);
        case "wc_sessionExtend":
          return this.onSessionExtendResponse(s, t);
        case "wc_sessionPing":
          return this.onSessionPingResponse(s, t);
        case "wc_sessionRequest":
          return this.onSessionRequestResponse(s, t);
        default:
          return this.client.logger.info(`Unsupported response method ${i}`);
      }
    }, this.onRelayEventUnknownPayload = (e) => {
      const { topic: s } = e, { message: t } = N$1("MISSING_OR_INVALID", `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`);
      throw new Error(t);
    }, this.onSessionProposeRequest = async (e, s) => {
      const { params: t, id: i } = s;
      try {
        this.isValidConnect(g$1({}, s.params));
        const n2 = pt(cjs$3.FIVE_MINUTES), o = g$1({ id: i, pairingTopic: e, expiry: n2 }, t);
        await this.setProposal(i, o);
        const a3 = Ln(JSON.stringify(s)), c2 = await this.getVerifyContext(a3, o.proposer.metadata);
        this.client.events.emit("session_proposal", { id: i, params: o, verifyContext: c2 });
      } catch (n2) {
        await this.sendError(i, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionProposeResponse = async (e, s) => {
      const { id: t } = s;
      if (isJsonRpcResult(s)) {
        const { result: i } = s;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: i });
        const n2 = this.client.proposal.get(t);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: n2 });
        const o = n2.proposer.publicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: o });
        const a3 = i.responderPublicKey;
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: a3 });
        const c2 = await this.client.core.crypto.generateSharedKey(o, a3);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: c2 });
        const p3 = await this.client.core.relayer.subscribe(c2);
        this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: p3 }), await this.client.core.pairing.activate({ topic: e });
      } else
        isJsonRpcError(s) && (await this.client.proposal.delete(t, U$3("USER_DISCONNECTED")), this.events.emit(yt("session_connect"), { error: s.error }));
    }, this.onSessionSettleRequest = async (e, s) => {
      const { id: t, params: i } = s;
      try {
        this.isValidSessionSettleRequest(i);
        const { relay: n2, controller: o, expiry: a3, namespaces: c2, requiredNamespaces: p3, optionalNamespaces: d2, sessionProperties: h4, pairingTopic: R2 } = s.params, w3 = g$1({ topic: e, relay: n2, expiry: a3, namespaces: c2, acknowledged: true, pairingTopic: R2, requiredNamespaces: p3, optionalNamespaces: d2, controller: o.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: o.publicKey, metadata: o.metadata } }, h4 && { sessionProperties: h4 });
        await this.sendResult({ id: s.id, topic: e, result: true }), this.events.emit(yt("session_connect"), { session: w3 }), this.cleanupDuplicatePairings(w3);
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionSettleResponse = async (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(yt("session_approve", t), {})) : isJsonRpcError(s) && (await this.client.session.delete(e, U$3("USER_DISCONNECTED")), this.events.emit(yt("session_approve", t), { error: s.error }));
    }, this.onSessionUpdateRequest = async (e, s) => {
      const { params: t, id: i } = s;
      try {
        const n2 = `${e}_session_update`, o = tr.get(n2);
        if (o && this.isRequestOutOfSync(o, i)) {
          this.client.logger.info(`Discarding out of sync request - ${i}`);
          return;
        }
        this.isValidUpdate(g$1({ topic: e }, t)), await this.client.session.update(e, { namespaces: t.namespaces }), await this.sendResult({ id: i, topic: e, result: true }), this.client.events.emit("session_update", { id: i, topic: e, params: t }), tr.set(n2, i);
      } catch (n2) {
        await this.sendError(i, e, n2), this.client.logger.error(n2);
      }
    }, this.isRequestOutOfSync = (e, s) => parseInt(s.toString().slice(0, -3)) <= parseInt(e.toString().slice(0, -3)), this.onSessionUpdateResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(yt("session_update", t), {}) : isJsonRpcError(s) && this.events.emit(yt("session_update", t), { error: s.error });
    }, this.onSessionExtendRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidExtend({ topic: e }), await this.setExpiry(e, pt(A)), await this.sendResult({ id: t, topic: e, result: true }), this.client.events.emit("session_extend", { id: t, topic: e });
      } catch (i) {
        await this.sendError(t, e, i), this.client.logger.error(i);
      }
    }, this.onSessionExtendResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(yt("session_extend", t), {}) : isJsonRpcError(s) && this.events.emit(yt("session_extend", t), { error: s.error });
    }, this.onSessionPingRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidPing({ topic: e }), await this.sendResult({ id: t, topic: e, result: true }), this.client.events.emit("session_ping", { id: t, topic: e });
      } catch (i) {
        await this.sendError(t, e, i), this.client.logger.error(i);
      }
    }, this.onSessionPingResponse = (e, s) => {
      const { id: t } = s;
      setTimeout(() => {
        isJsonRpcResult(s) ? this.events.emit(yt("session_ping", t), {}) : isJsonRpcError(s) && this.events.emit(yt("session_ping", t), { error: s.error });
      }, 500);
    }, this.onSessionDeleteRequest = async (e, s) => {
      const { id: t } = s;
      try {
        this.isValidDisconnect({ topic: e, reason: s.params }), await Promise.all([new Promise((i) => {
          this.client.core.relayer.once(D$2.publish, async () => {
            i(await this.deleteSession(e));
          });
        }), this.sendResult({ id: t, topic: e, result: true })]), this.client.events.emit("session_delete", { id: t, topic: e });
      } catch (i) {
        this.client.logger.error(i);
      }
    }, this.onSessionRequest = async (e, s) => {
      const { id: t, params: i } = s;
      try {
        this.isValidRequest(g$1({ topic: e }, i));
        const n2 = Ln(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", i, t))), o = this.client.session.get(e), a3 = await this.getVerifyContext(n2, o.peer.metadata), c2 = { id: t, topic: e, params: i, verifyContext: a3 };
        await this.setPendingSessionRequest(c2), this.addSessionRequestToSessionRequestQueue(c2), this.processSessionRequestQueue();
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.onSessionRequestResponse = (e, s) => {
      const { id: t } = s;
      isJsonRpcResult(s) ? this.events.emit(yt("session_request", t), { result: s.result }) : isJsonRpcError(s) && this.events.emit(yt("session_request", t), { error: s.error });
    }, this.onSessionEventRequest = async (e, s) => {
      const { id: t, params: i } = s;
      try {
        const n2 = `${e}_session_event_${i.event.name}`, o = tr.get(n2);
        if (o && this.isRequestOutOfSync(o, t)) {
          this.client.logger.info(`Discarding out of sync request - ${t}`);
          return;
        }
        this.isValidEmit(g$1({ topic: e }, i)), this.client.events.emit("session_event", { id: t, topic: e, params: i }), tr.set(n2, t);
      } catch (n2) {
        await this.sendError(t, e, n2), this.client.logger.error(n2);
      }
    }, this.addSessionRequestToSessionRequestQueue = (e) => {
      this.sessionRequestQueue.queue.push(e);
    }, this.cleanupAfterResponse = (e) => {
      this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
        this.sessionRequestQueue.state = I.idle, this.processSessionRequestQueue();
      }, cjs$3.toMiliseconds(this.requestQueueDelay));
    }, this.processSessionRequestQueue = () => {
      if (this.sessionRequestQueue.state === I.active) {
        this.client.logger.info("session request queue is already active.");
        return;
      }
      const e = this.sessionRequestQueue.queue[0];
      if (!e) {
        this.client.logger.info("session request queue is empty.");
        return;
      }
      try {
        this.sessionRequestQueue.state = I.active, this.client.events.emit("session_request", e);
      } catch (s) {
        this.client.logger.error(s);
      }
    }, this.onPairingCreated = (e) => {
      if (e.active)
        return;
      const s = this.client.proposal.getAll().find((t) => t.pairingTopic === e.topic);
      s && this.onSessionProposeRequest(e.topic, formatJsonRpcRequest("wc_sessionPropose", { requiredNamespaces: s.requiredNamespaces, optionalNamespaces: s.optionalNamespaces, relays: s.relays, proposer: s.proposer, sessionProperties: s.sessionProperties }, s.id));
    }, this.isValidConnect = async (e) => {
      if (!Ht(e)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
        throw new Error(a3);
      }
      const { pairingTopic: s, requiredNamespaces: t, optionalNamespaces: i, sessionProperties: n2, relays: o } = e;
      if (w2(s) || await this.isValidPairingTopic(s), !xt2(o, true)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `connect() relays: ${o}`);
        throw new Error(a3);
      }
      !w2(t) && B$1(t) !== 0 && this.validateNamespaces(t, "requiredNamespaces"), !w2(i) && B$1(i) !== 0 && this.validateNamespaces(i, "optionalNamespaces"), w2(n2) || this.validateSessionProps(n2, "sessionProperties");
    }, this.validateNamespaces = (e, s) => {
      const t = Lt(e, "connect()", s);
      if (t)
        throw new Error(t.message);
    }, this.isValidApprove = async (e) => {
      if (!Ht(e))
        throw new Error(N$1("MISSING_OR_INVALID", `approve() params: ${e}`).message);
      const { id: s, namespaces: t, relayProtocol: i, sessionProperties: n2 } = e;
      await this.isValidProposalId(s);
      const o = this.client.proposal.get(s), a3 = ln(t, "approve()");
      if (a3)
        throw new Error(a3.message);
      const c2 = fn(o.requiredNamespaces, t, "approve()");
      if (c2)
        throw new Error(c2.message);
      if (!h3(i, true)) {
        const { message: p3 } = N$1("MISSING_OR_INVALID", `approve() relayProtocol: ${i}`);
        throw new Error(p3);
      }
      w2(n2) || this.validateSessionProps(n2, "sessionProperties");
    }, this.isValidReject = async (e) => {
      if (!Ht(e)) {
        const { message: i } = N$1("MISSING_OR_INVALID", `reject() params: ${e}`);
        throw new Error(i);
      }
      const { id: s, reason: t } = e;
      if (await this.isValidProposalId(s), !qt2(t)) {
        const { message: i } = N$1("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(t)}`);
        throw new Error(i);
      }
    }, this.isValidSessionSettleRequest = (e) => {
      if (!Ht(e)) {
        const { message: c2 } = N$1("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
        throw new Error(c2);
      }
      const { relay: s, controller: t, namespaces: i, expiry: n2 } = e;
      if (!dn(s)) {
        const { message: c2 } = N$1("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
        throw new Error(c2);
      }
      const o = Kt2(t, "onSessionSettleRequest()");
      if (o)
        throw new Error(o.message);
      const a3 = ln(i, "onSessionSettleRequest()");
      if (a3)
        throw new Error(a3.message);
      if (mt(n2)) {
        const { message: c2 } = N$1("EXPIRED", "onSessionSettleRequest()");
        throw new Error(c2);
      }
    }, this.isValidUpdate = async (e) => {
      if (!Ht(e)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `update() params: ${e}`);
        throw new Error(a3);
      }
      const { topic: s, namespaces: t } = e;
      await this.isValidSessionTopic(s);
      const i = this.client.session.get(s), n2 = ln(t, "update()");
      if (n2)
        throw new Error(n2.message);
      const o = fn(i.requiredNamespaces, t, "update()");
      if (o)
        throw new Error(o.message);
    }, this.isValidExtend = async (e) => {
      if (!Ht(e)) {
        const { message: t } = N$1("MISSING_OR_INVALID", `extend() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionTopic(s);
    }, this.isValidRequest = async (e) => {
      if (!Ht(e)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `request() params: ${e}`);
        throw new Error(a3);
      }
      const { topic: s, request: t, chainId: i, expiry: n2 } = e;
      await this.isValidSessionTopic(s);
      const { namespaces: o } = this.client.session.get(s);
      if (!zt(o, i)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `request() chainId: ${i}`);
        throw new Error(a3);
      }
      if (!Bt2(t)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `request() ${JSON.stringify(t)}`);
        throw new Error(a3);
      }
      if (!Yt(o, i, t.method)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `request() method: ${t.method}`);
        throw new Error(a3);
      }
      if (n2 && !Xt(n2, U$2)) {
        const { message: a3 } = N$1("MISSING_OR_INVALID", `request() expiry: ${n2}. Expiry must be a number (in seconds) between ${U$2.min} and ${U$2.max}`);
        throw new Error(a3);
      }
    }, this.isValidRespond = async (e) => {
      var s;
      if (!Ht(e)) {
        const { message: n2 } = N$1("MISSING_OR_INVALID", `respond() params: ${e}`);
        throw new Error(n2);
      }
      const { topic: t, response: i } = e;
      try {
        await this.isValidSessionTopic(t);
      } catch (n2) {
        throw (s = e?.response) != null && s.id && this.cleanupAfterResponse(e), n2;
      }
      if (!Gt2(i)) {
        const { message: n2 } = N$1("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(i)}`);
        throw new Error(n2);
      }
    }, this.isValidPing = async (e) => {
      if (!Ht(e)) {
        const { message: t } = N$1("MISSING_OR_INVALID", `ping() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionOrPairingTopic(s);
    }, this.isValidEmit = async (e) => {
      if (!Ht(e)) {
        const { message: o } = N$1("MISSING_OR_INVALID", `emit() params: ${e}`);
        throw new Error(o);
      }
      const { topic: s, event: t, chainId: i } = e;
      await this.isValidSessionTopic(s);
      const { namespaces: n2 } = this.client.session.get(s);
      if (!zt(n2, i)) {
        const { message: o } = N$1("MISSING_OR_INVALID", `emit() chainId: ${i}`);
        throw new Error(o);
      }
      if (!Wt(t)) {
        const { message: o } = N$1("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
        throw new Error(o);
      }
      if (!Jt(n2, i, t.name)) {
        const { message: o } = N$1("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
        throw new Error(o);
      }
    }, this.isValidDisconnect = async (e) => {
      if (!Ht(e)) {
        const { message: t } = N$1("MISSING_OR_INVALID", `disconnect() params: ${e}`);
        throw new Error(t);
      }
      const { topic: s } = e;
      await this.isValidSessionOrPairingTopic(s);
    }, this.getVerifyContext = async (e, s) => {
      const t = { verified: { verifyUrl: s.verifyUrl || $$1, validation: "UNKNOWN", origin: s.url || "" } };
      try {
        const i = await this.client.core.verify.resolve({ attestationId: e, verifyUrl: s.verifyUrl });
        i && (t.verified.origin = i.origin, t.verified.isScam = i.isScam, t.verified.validation = i.origin === new URL(s.url).origin ? "VALID" : "INVALID");
      } catch (i) {
        this.client.logger.info(i);
      }
      return this.client.logger.info(`Verify context: ${JSON.stringify(t)}`), t;
    }, this.validateSessionProps = (e, s) => {
      Object.values(e).forEach((t) => {
        if (!h3(t, false)) {
          const { message: i } = N$1("MISSING_OR_INVALID", `${s} must be in Record<string, string> format. Received: ${JSON.stringify(t)}`);
          throw new Error(i);
        }
      });
    };
  }
  async isInitialized() {
    if (!this.initialized) {
      const { message: r } = N$1("NOT_INITIALIZED", this.name);
      throw new Error(r);
    }
    await this.client.core.relayer.confirmOnlineStateOrThrow();
  }
  registerRelayerEvents() {
    this.client.core.relayer.on(D$2.message, async (r) => {
      const { topic: e, message: s } = r;
      if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s)))
        return;
      const t = await this.client.core.crypto.decode(e, s);
      try {
        isJsonRpcRequest(t) ? (this.client.core.history.set(e, t), this.onRelayEventRequest({ topic: e, payload: t })) : isJsonRpcResponse(t) ? (await this.client.core.history.resolve(t), await this.onRelayEventResponse({ topic: e, payload: t }), this.client.core.history.delete(e, t.id)) : this.onRelayEventUnknownPayload({ topic: e, payload: t });
      } catch (i) {
        this.client.logger.error(i);
      }
    });
  }
  registerExpirerEvents() {
    this.client.core.expirer.on(v$1.expired, async (r) => {
      const { topic: e, id: s } = ft$1(r.target);
      if (s && this.client.pendingRequest.keys.includes(s))
        return await this.deletePendingSessionRequest(s, N$1("EXPIRED"), true);
      e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, true), this.client.events.emit("session_expire", { topic: e })) : s && (await this.deleteProposal(s, true), this.client.events.emit("proposal_expire", { id: s }));
    });
  }
  registerPairingEvents() {
    this.client.core.pairing.events.on(V$2.create, (r) => this.onPairingCreated(r));
  }
  isValidPairingTopic(r) {
    if (!h3(r, false)) {
      const { message: e } = N$1("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
      throw new Error(e);
    }
    if (!this.client.core.pairing.pairings.keys.includes(r)) {
      const { message: e } = N$1("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (mt(this.client.core.pairing.pairings.get(r).expiry)) {
      const { message: e } = N$1("EXPIRED", `pairing topic: ${r}`);
      throw new Error(e);
    }
  }
  async isValidSessionTopic(r) {
    if (!h3(r, false)) {
      const { message: e } = N$1("MISSING_OR_INVALID", `session topic should be a string: ${r}`);
      throw new Error(e);
    }
    if (!this.client.session.keys.includes(r)) {
      const { message: e } = N$1("NO_MATCHING_KEY", `session topic doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (mt(this.client.session.get(r).expiry)) {
      await this.deleteSession(r);
      const { message: e } = N$1("EXPIRED", `session topic: ${r}`);
      throw new Error(e);
    }
  }
  async isValidSessionOrPairingTopic(r) {
    if (this.client.session.keys.includes(r))
      await this.isValidSessionTopic(r);
    else if (this.client.core.pairing.pairings.keys.includes(r))
      this.isValidPairingTopic(r);
    else if (h3(r, false)) {
      const { message: e } = N$1("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${r}`);
      throw new Error(e);
    } else {
      const { message: e } = N$1("MISSING_OR_INVALID", `session or pairing topic should be a string: ${r}`);
      throw new Error(e);
    }
  }
  async isValidProposalId(r) {
    if (!Ft2(r)) {
      const { message: e } = N$1("MISSING_OR_INVALID", `proposal id should be a number: ${r}`);
      throw new Error(e);
    }
    if (!this.client.proposal.keys.includes(r)) {
      const { message: e } = N$1("NO_MATCHING_KEY", `proposal id doesn't exist: ${r}`);
      throw new Error(e);
    }
    if (mt(this.client.proposal.get(r).expiry)) {
      await this.deleteProposal(r);
      const { message: e } = N$1("EXPIRED", `proposal id: ${r}`);
      throw new Error(e);
    }
  }
}
class us extends Kt$1 {
  constructor(r, e) {
    super(r, e, ne, G$1), this.core = r, this.logger = e;
  }
}
class ue extends Kt$1 {
  constructor(r, e) {
    super(r, e, ae, G$1), this.core = r, this.logger = e;
  }
}
class gs extends Kt$1 {
  constructor(r, e) {
    super(r, e, le, G$1, (s) => s.id), this.core = r, this.logger = e;
  }
}
let Q$1 = class Q extends b$1 {
  constructor(r) {
    super(r), this.protocol = X, this.version = F, this.name = M$1.name, this.events = new eventsExports.EventEmitter(), this.on = (s, t) => this.events.on(s, t), this.once = (s, t) => this.events.once(s, t), this.off = (s, t) => this.events.off(s, t), this.removeListener = (s, t) => this.events.removeListener(s, t), this.removeAllListeners = (s) => this.events.removeAllListeners(s), this.connect = async (s) => {
      try {
        return await this.engine.connect(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.pair = async (s) => {
      try {
        return await this.engine.pair(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.approve = async (s) => {
      try {
        return await this.engine.approve(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.reject = async (s) => {
      try {
        return await this.engine.reject(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.update = async (s) => {
      try {
        return await this.engine.update(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.extend = async (s) => {
      try {
        return await this.engine.extend(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.request = async (s) => {
      try {
        return await this.engine.request(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.respond = async (s) => {
      try {
        return await this.engine.respond(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.ping = async (s) => {
      try {
        return await this.engine.ping(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.emit = async (s) => {
      try {
        return await this.engine.emit(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.disconnect = async (s) => {
      try {
        return await this.engine.disconnect(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.find = (s) => {
      try {
        return this.engine.find(s);
      } catch (t) {
        throw this.logger.error(t.message), t;
      }
    }, this.getPendingSessionRequests = () => {
      try {
        return this.engine.getPendingSessionRequests();
      } catch (s) {
        throw this.logger.error(s.message), s;
      }
    }, this.name = r?.name || M$1.name, this.metadata = r?.metadata || Qn();
    const e = typeof r?.logger < "u" && typeof r?.logger != "string" ? r.logger : cjs.pino(cjs.getDefaultLoggerOptions({ level: r?.logger || M$1.logger }));
    this.core = r?.core || new Mr(r), this.logger = cjs.generateChildLogger(e, this.name), this.session = new ue(this.core, this.logger), this.proposal = new us(this.core, this.logger), this.pendingRequest = new gs(this.core, this.logger), this.engine = new ds(this);
  }
  static async init(r) {
    const e = new Q(r);
    return await e.initialize(), e;
  }
  get context() {
    return cjs.getLoggerContext(this.logger);
  }
  get pairing() {
    return this.core.pairing.pairings;
  }
  async initialize() {
    this.logger.trace("Initialized");
    try {
      await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }), this.logger.info("SignClient Initialization Success");
    } catch (r) {
      throw this.logger.info("SignClient Initialization Failure"), this.logger.error(r.message), r;
    }
  }
};
var queryString = {};
(function(exports) {
  const strictUriEncode = require$$0$4;
  const decodeComponent = require$$1$1;
  const splitOnFirst = require$$2$1;
  const filterObject = require$$3;
  const isNullOrUndefined = (value) => value === null || value === void 0;
  const encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index":
        return (key) => (result, value) => {
          const index = result.length;
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[", index, "]"].join("")];
          }
          return [
            ...result,
            [encode(key, options), "[", encode(index, options), "]=", encode(value, options)].join("")
          ];
        };
      case "bracket":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), "[]"].join("")];
          }
          return [...result, [encode(key, options), "[]=", encode(value, options)].join("")];
        };
      case "colon-list-separator":
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, [encode(key, options), ":list="].join("")];
          }
          return [...result, [encode(key, options), ":list=", encode(value, options)].join("")];
        };
      case "comma":
      case "separator":
      case "bracket-separator": {
        const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          value = value === null ? "" : value;
          if (result.length === 0) {
            return [[encode(key, options), keyValueSep, encode(value, options)].join("")];
          }
          return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
        };
      }
      default:
        return (key) => (result, value) => {
          if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
            return result;
          }
          if (value === null) {
            return [...result, encode(key, options)];
          }
          return [...result, [encode(key, options), "=", encode(value, options)].join("")];
        };
    }
  }
  function parserForArrayFormat(options) {
    let result;
    switch (options.arrayFormat) {
      case "index":
        return (key, value, accumulator) => {
          result = /\[(\d*)\]$/.exec(key);
          key = key.replace(/\[\d*\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      case "bracket":
        return (key, value, accumulator) => {
          result = /(\[\])$/.exec(key);
          key = key.replace(/\[\]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "colon-list-separator":
        return (key, value, accumulator) => {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
      case "comma":
      case "separator":
        return (key, value, accumulator) => {
          const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          const isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode(item, options)) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      case "bracket-separator":
        return (key, value, accumulator) => {
          const isArray = /(\[\])$/.test(key);
          key = key.replace(/\[\]$/, "");
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode(item, options));
          if (accumulator[key] === void 0) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], arrayValue);
        };
      default:
        return (key, value, accumulator) => {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(accumulator[key], value);
        };
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return decodeComponent(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (typeof input === "object") {
      return keysSorter(Object.keys(input)).sort((a3, b3) => Number(a3) - Number(b3)).map((key) => input[key]);
    }
    return input;
  }
  function removeHash(input) {
    const hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    let hash = "";
    const hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function extract(input) {
    input = removeHash(input);
    const queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function parse(query, options) {
    options = Object.assign({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const formatter = parserForArrayFormat(options);
    const ret = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return ret;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return ret;
    }
    for (const param of query.split("&")) {
      if (param === "") {
        continue;
      }
      let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
      value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode(value, options);
      formatter(decode(key, options), value, ret);
    }
    for (const key of Object.keys(ret)) {
      const value = ret[key];
      if (typeof value === "object" && value !== null) {
        for (const k2 of Object.keys(value)) {
          value[k2] = parseValue(value[k2], options);
        }
      } else {
        ret[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return ret;
    }
    return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
      const value = ret[key];
      if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
        result[key] = keysSorter(value);
      } else {
        result[key] = value;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  exports.extract = extract;
  exports.parse = parse;
  exports.stringify = (object, options) => {
    if (!object) {
      return "";
    }
    options = Object.assign({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
    const formatter = encoderForArrayFormat(options);
    const objectCopy = {};
    for (const key of Object.keys(object)) {
      if (!shouldFilter(key)) {
        objectCopy[key] = object[key];
      }
    }
    const keys2 = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys2.sort(options.sort);
    }
    return keys2.map((key) => {
      const value = object[key];
      if (value === void 0) {
        return "";
      }
      if (value === null) {
        return encode(key, options);
      }
      if (Array.isArray(value)) {
        if (value.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key, options) + "[]";
        }
        return value.reduce(formatter(key), []).join("&");
      }
      return encode(key, options) + "=" + encode(value, options);
    }).filter((x2) => x2.length > 0).join("&");
  };
  exports.parseUrl = (url, options) => {
    options = Object.assign({
      decode: true
    }, options);
    const [url_, hash] = splitOnFirst(url, "#");
    return Object.assign(
      {
        url: url_.split("?")[0] || "",
        query: parse(extract(url), options)
      },
      options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode(hash, options) } : {}
    );
  };
  exports.stringifyUrl = (object, options) => {
    options = Object.assign({
      encode: true,
      strict: true,
      [encodeFragmentIdentifier]: true
    }, options);
    const url = removeHash(object.url).split("?")[0] || "";
    const queryFromUrl = exports.extract(object.url);
    const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
    const query = Object.assign(parsedQueryFromUrl, object.query);
    let queryString2 = exports.stringify(query, options);
    if (queryString2) {
      queryString2 = `?${queryString2}`;
    }
    let hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      hash = `#${options[encodeFragmentIdentifier] ? encode(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
    }
    return `${url}${queryString2}${hash}`;
  };
  exports.pick = (input, filter, options) => {
    options = Object.assign({
      parseFragmentIdentifier: true,
      [encodeFragmentIdentifier]: false
    }, options);
    const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
    return exports.stringifyUrl({
      url,
      query: filterObject(query, filter),
      fragmentIdentifier
    }, options);
  };
  exports.exclude = (input, filter, options) => {
    const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
    return exports.pick(input, exclusionFilter, options);
  };
})(queryString);
const K2 = ":";
function ve(e) {
  const [n2, t] = e.split(K2);
  return { namespace: n2, reference: t };
}
function S$1(e = [], n2 = []) {
  return [.../* @__PURE__ */ new Set([...e, ...n2])];
}
function oe(e) {
  return e.includes(":");
}
function en(e) {
  return oe(e) ? e.split(":")[0] : e;
}
const nn = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
function U$1(e, n2) {
  const { message: t, code: r } = nn[e];
  return { message: n2 ? `${t} ${n2}` : t, code: r };
}
function k(e, n2) {
  return Array.isArray(e) ? typeof n2 < "u" && e.length ? e.every(n2) : true : false;
}
function B(e) {
  return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
}
const Ia = "error", Wg = "wss://relay.walletconnect.com", Fg = "wc", Mg = "universal_provider", xa = `${Fg}@2:${Mg}:`, qg = "https://rpc.walletconnect.com/v1/", Vn = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
var ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ui = { exports: {} };
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
(function(C2, u3) {
  (function() {
    var i, d2 = "4.17.21", P2 = 200, O2 = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", $2 = "Expected a function", En = "Invalid `variable` option passed into `_.template`", zt2 = "__lodash_hash_undefined__", pr2 = 500, It2 = "__lodash_placeholder__", Ln2 = 1, Fn2 = 2, xt3 = 4, Et2 = 1, ve2 = 2, vn2 = 1, ct2 = 2, qi = 4, Dn2 = 8, yt2 = 16, Hn2 = 32, St2 = 64, Mn2 = 128, Kt3 = 256, dr2 = 512, La = 30, Da = "...", Ha = 800, Na = 16, Bi = 1, $a = 2, Ua = 3, ht2 = 1 / 0, kn2 = 9007199254740991, Wa = 17976931348623157e292, _e2 = 0 / 0, Nn = 4294967295, Fa = Nn - 1, Ma = Nn >>> 1, qa = [["ary", Mn2], ["bind", vn2], ["bindKey", ct2], ["curry", Dn2], ["curryRight", yt2], ["flip", dr2], ["partial", Hn2], ["partialRight", St2], ["rearg", Kt3]], Ot2 = "[object Arguments]", me = "[object Array]", Ba = "[object AsyncFunction]", Yt2 = "[object Boolean]", Zt2 = "[object Date]", Ga = "[object DOMException]", we = "[object Error]", Pe2 = "[object Function]", Gi2 = "[object GeneratorFunction]", yn2 = "[object Map]", Jt2 = "[object Number]", za = "[object Null]", qn2 = "[object Object]", zi = "[object Promise]", Ka = "[object Proxy]", Xt2 = "[object RegExp]", Sn = "[object Set]", Qt2 = "[object String]", Ae2 = "[object Symbol]", Ya = "[object Undefined]", Vt2 = "[object WeakMap]", Za = "[object WeakSet]", kt2 = "[object ArrayBuffer]", Rt2 = "[object DataView]", gr2 = "[object Float32Array]", vr2 = "[object Float64Array]", _r2 = "[object Int8Array]", mr2 = "[object Int16Array]", wr = "[object Int32Array]", Pr2 = "[object Uint8Array]", Ar2 = "[object Uint8ClampedArray]", Cr2 = "[object Uint16Array]", Ir2 = "[object Uint32Array]", Ja = /\b__p \+= '';/g, Xa = /\b(__p \+=) '' \+/g, Qa = /(__e\(.*?\)|\b__t\)) \+\n'';/g, Ki = /&(?:amp|lt|gt|quot|#39);/g, Yi2 = /[&<>"']/g, Va = RegExp(Ki.source), ka = RegExp(Yi2.source), ja = /<%-([\s\S]+?)%>/g, no = /<%([\s\S]+?)%>/g, Zi2 = /<%=([\s\S]+?)%>/g, to = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, eo = /^\w*$/, ro = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, xr2 = /[\\^$.*+?()[\]{}|]/g, io = RegExp(xr2.source), Er = /^\s+/, so = /\s/, uo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ao = /\{\n\/\* \[wrapped with (.+)\] \*/, oo = /,? & /, fo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, co = /[()=,{}\[\]\/\s]/, ho = /\\(\\)?/g, lo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Ji2 = /\w*$/, po = /^[-+]0x[0-9a-f]+$/i, go = /^0b[01]+$/i, vo = /^\[object .+?Constructor\]$/, _o = /^0o[0-7]+$/i, mo = /^(?:0|[1-9]\d*)$/, wo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ce2 = /($^)/, Po = /['\n\r\u2028\u2029\\]/g, Ie = "\\ud800-\\udfff", Ao = "\\u0300-\\u036f", Co = "\\ufe20-\\ufe2f", Io = "\\u20d0-\\u20ff", Xi2 = Ao + Co + Io, Qi2 = "\\u2700-\\u27bf", Vi = "a-z\\xdf-\\xf6\\xf8-\\xff", xo = "\\xac\\xb1\\xd7\\xf7", Eo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", yo = "\\u2000-\\u206f", So = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ki = "A-Z\\xc0-\\xd6\\xd8-\\xde", ji = "\\ufe0e\\ufe0f", ns2 = xo + Eo + yo + So, yr2 = "['’]", Oo = "[" + Ie + "]", ts2 = "[" + ns2 + "]", xe = "[" + Xi2 + "]", es2 = "\\d+", Ro = "[" + Qi2 + "]", rs2 = "[" + Vi + "]", is2 = "[^" + Ie + ns2 + es2 + Qi2 + Vi + ki + "]", Sr2 = "\\ud83c[\\udffb-\\udfff]", bo = "(?:" + xe + "|" + Sr2 + ")", ss2 = "[^" + Ie + "]", Or2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", Rr2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", bt2 = "[" + ki + "]", us2 = "\\u200d", as2 = "(?:" + rs2 + "|" + is2 + ")", To = "(?:" + bt2 + "|" + is2 + ")", os2 = "(?:" + yr2 + "(?:d|ll|m|re|s|t|ve))?", fs2 = "(?:" + yr2 + "(?:D|LL|M|RE|S|T|VE))?", cs2 = bo + "?", hs2 = "[" + ji + "]?", Lo = "(?:" + us2 + "(?:" + [ss2, Or2, Rr2].join("|") + ")" + hs2 + cs2 + ")*", Do = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Ho = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ls2 = hs2 + cs2 + Lo, No = "(?:" + [Ro, Or2, Rr2].join("|") + ")" + ls2, $o = "(?:" + [ss2 + xe + "?", xe, Or2, Rr2, Oo].join("|") + ")", Uo = RegExp(yr2, "g"), Wo = RegExp(xe, "g"), br = RegExp(Sr2 + "(?=" + Sr2 + ")|" + $o + ls2, "g"), Fo = RegExp([bt2 + "?" + rs2 + "+" + os2 + "(?=" + [ts2, bt2, "$"].join("|") + ")", To + "+" + fs2 + "(?=" + [ts2, bt2 + as2, "$"].join("|") + ")", bt2 + "?" + as2 + "+" + os2, bt2 + "+" + fs2, Ho, Do, es2, No].join("|"), "g"), Mo = RegExp("[" + us2 + Ie + Xi2 + ji + "]"), qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Bo = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Go = -1, B2 = {};
    B2[gr2] = B2[vr2] = B2[_r2] = B2[mr2] = B2[wr] = B2[Pr2] = B2[Ar2] = B2[Cr2] = B2[Ir2] = true, B2[Ot2] = B2[me] = B2[kt2] = B2[Yt2] = B2[Rt2] = B2[Zt2] = B2[we] = B2[Pe2] = B2[yn2] = B2[Jt2] = B2[qn2] = B2[Xt2] = B2[Sn] = B2[Qt2] = B2[Vt2] = false;
    var q2 = {};
    q2[Ot2] = q2[me] = q2[kt2] = q2[Rt2] = q2[Yt2] = q2[Zt2] = q2[gr2] = q2[vr2] = q2[_r2] = q2[mr2] = q2[wr] = q2[yn2] = q2[Jt2] = q2[qn2] = q2[Xt2] = q2[Sn] = q2[Qt2] = q2[Ae2] = q2[Pr2] = q2[Ar2] = q2[Cr2] = q2[Ir2] = true, q2[we] = q2[Pe2] = q2[Vt2] = false;
    var zo = { À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }, Ko = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Yo = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Zo = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Jo = parseFloat, Xo = parseInt, ps2 = typeof ge == "object" && ge && ge.Object === Object && ge, Qo = typeof self == "object" && self && self.Object === Object && self, k2 = ps2 || Qo || Function("return this")(), Tr2 = u3 && !u3.nodeType && u3, lt2 = Tr2 && true && C2 && !C2.nodeType && C2, ds2 = lt2 && lt2.exports === Tr2, Lr2 = ds2 && ps2.process, _n = function() {
      try {
        var h4 = lt2 && lt2.require && lt2.require("util").types;
        return h4 || Lr2 && Lr2.binding && Lr2.binding("util");
      } catch {
      }
    }(), gs2 = _n && _n.isArrayBuffer, vs2 = _n && _n.isDate, _s2 = _n && _n.isMap, ms2 = _n && _n.isRegExp, ws2 = _n && _n.isSet, Ps2 = _n && _n.isTypedArray;
    function cn2(h4, g3, p3) {
      switch (p3.length) {
        case 0:
          return h4.call(g3);
        case 1:
          return h4.call(g3, p3[0]);
        case 2:
          return h4.call(g3, p3[0], p3[1]);
        case 3:
          return h4.call(g3, p3[0], p3[1], p3[2]);
      }
      return h4.apply(g3, p3);
    }
    function Vo(h4, g3, p3, A2) {
      for (var S2 = -1, U2 = h4 == null ? 0 : h4.length; ++S2 < U2; ) {
        var X2 = h4[S2];
        g3(A2, X2, p3(X2), h4);
      }
      return A2;
    }
    function mn2(h4, g3) {
      for (var p3 = -1, A2 = h4 == null ? 0 : h4.length; ++p3 < A2 && g3(h4[p3], p3, h4) !== false; )
        ;
      return h4;
    }
    function ko(h4, g3) {
      for (var p3 = h4 == null ? 0 : h4.length; p3-- && g3(h4[p3], p3, h4) !== false; )
        ;
      return h4;
    }
    function As2(h4, g3) {
      for (var p3 = -1, A2 = h4 == null ? 0 : h4.length; ++p3 < A2; )
        if (!g3(h4[p3], p3, h4))
          return false;
      return true;
    }
    function jn(h4, g3) {
      for (var p3 = -1, A2 = h4 == null ? 0 : h4.length, S2 = 0, U2 = []; ++p3 < A2; ) {
        var X2 = h4[p3];
        g3(X2, p3, h4) && (U2[S2++] = X2);
      }
      return U2;
    }
    function Ee(h4, g3) {
      var p3 = h4 == null ? 0 : h4.length;
      return !!p3 && Tt2(h4, g3, 0) > -1;
    }
    function Dr2(h4, g3, p3) {
      for (var A2 = -1, S2 = h4 == null ? 0 : h4.length; ++A2 < S2; )
        if (p3(g3, h4[A2]))
          return true;
      return false;
    }
    function G2(h4, g3) {
      for (var p3 = -1, A2 = h4 == null ? 0 : h4.length, S2 = Array(A2); ++p3 < A2; )
        S2[p3] = g3(h4[p3], p3, h4);
      return S2;
    }
    function nt2(h4, g3) {
      for (var p3 = -1, A2 = g3.length, S2 = h4.length; ++p3 < A2; )
        h4[S2 + p3] = g3[p3];
      return h4;
    }
    function Hr(h4, g3, p3, A2) {
      var S2 = -1, U2 = h4 == null ? 0 : h4.length;
      for (A2 && U2 && (p3 = h4[++S2]); ++S2 < U2; )
        p3 = g3(p3, h4[S2], S2, h4);
      return p3;
    }
    function jo(h4, g3, p3, A2) {
      var S2 = h4 == null ? 0 : h4.length;
      for (A2 && S2 && (p3 = h4[--S2]); S2--; )
        p3 = g3(p3, h4[S2], S2, h4);
      return p3;
    }
    function Nr2(h4, g3) {
      for (var p3 = -1, A2 = h4 == null ? 0 : h4.length; ++p3 < A2; )
        if (g3(h4[p3], p3, h4))
          return true;
      return false;
    }
    var nf = $r2("length");
    function tf(h4) {
      return h4.split("");
    }
    function ef(h4) {
      return h4.match(fo) || [];
    }
    function Cs2(h4, g3, p3) {
      var A2;
      return p3(h4, function(S2, U2, X2) {
        if (g3(S2, U2, X2))
          return A2 = U2, false;
      }), A2;
    }
    function ye(h4, g3, p3, A2) {
      for (var S2 = h4.length, U2 = p3 + (A2 ? 1 : -1); A2 ? U2-- : ++U2 < S2; )
        if (g3(h4[U2], U2, h4))
          return U2;
      return -1;
    }
    function Tt2(h4, g3, p3) {
      return g3 === g3 ? gf(h4, g3, p3) : ye(h4, Is2, p3);
    }
    function rf(h4, g3, p3, A2) {
      for (var S2 = p3 - 1, U2 = h4.length; ++S2 < U2; )
        if (A2(h4[S2], g3))
          return S2;
      return -1;
    }
    function Is2(h4) {
      return h4 !== h4;
    }
    function xs2(h4, g3) {
      var p3 = h4 == null ? 0 : h4.length;
      return p3 ? Wr(h4, g3) / p3 : _e2;
    }
    function $r2(h4) {
      return function(g3) {
        return g3 == null ? i : g3[h4];
      };
    }
    function Ur2(h4) {
      return function(g3) {
        return h4 == null ? i : h4[g3];
      };
    }
    function Es2(h4, g3, p3, A2, S2) {
      return S2(h4, function(U2, X2, M2) {
        p3 = A2 ? (A2 = false, U2) : g3(p3, U2, X2, M2);
      }), p3;
    }
    function sf(h4, g3) {
      var p3 = h4.length;
      for (h4.sort(g3); p3--; )
        h4[p3] = h4[p3].value;
      return h4;
    }
    function Wr(h4, g3) {
      for (var p3, A2 = -1, S2 = h4.length; ++A2 < S2; ) {
        var U2 = g3(h4[A2]);
        U2 !== i && (p3 = p3 === i ? U2 : p3 + U2);
      }
      return p3;
    }
    function Fr2(h4, g3) {
      for (var p3 = -1, A2 = Array(h4); ++p3 < h4; )
        A2[p3] = g3(p3);
      return A2;
    }
    function uf(h4, g3) {
      return G2(g3, function(p3) {
        return [p3, h4[p3]];
      });
    }
    function ys2(h4) {
      return h4 && h4.slice(0, bs2(h4) + 1).replace(Er, "");
    }
    function hn2(h4) {
      return function(g3) {
        return h4(g3);
      };
    }
    function Mr2(h4, g3) {
      return G2(g3, function(p3) {
        return h4[p3];
      });
    }
    function jt3(h4, g3) {
      return h4.has(g3);
    }
    function Ss2(h4, g3) {
      for (var p3 = -1, A2 = h4.length; ++p3 < A2 && Tt2(g3, h4[p3], 0) > -1; )
        ;
      return p3;
    }
    function Os2(h4, g3) {
      for (var p3 = h4.length; p3-- && Tt2(g3, h4[p3], 0) > -1; )
        ;
      return p3;
    }
    function af(h4, g3) {
      for (var p3 = h4.length, A2 = 0; p3--; )
        h4[p3] === g3 && ++A2;
      return A2;
    }
    var of = Ur2(zo), ff = Ur2(Ko);
    function cf(h4) {
      return "\\" + Zo[h4];
    }
    function hf(h4, g3) {
      return h4 == null ? i : h4[g3];
    }
    function Lt2(h4) {
      return Mo.test(h4);
    }
    function lf(h4) {
      return qo.test(h4);
    }
    function pf(h4) {
      for (var g3, p3 = []; !(g3 = h4.next()).done; )
        p3.push(g3.value);
      return p3;
    }
    function qr(h4) {
      var g3 = -1, p3 = Array(h4.size);
      return h4.forEach(function(A2, S2) {
        p3[++g3] = [S2, A2];
      }), p3;
    }
    function Rs2(h4, g3) {
      return function(p3) {
        return h4(g3(p3));
      };
    }
    function tt2(h4, g3) {
      for (var p3 = -1, A2 = h4.length, S2 = 0, U2 = []; ++p3 < A2; ) {
        var X2 = h4[p3];
        (X2 === g3 || X2 === It2) && (h4[p3] = It2, U2[S2++] = p3);
      }
      return U2;
    }
    function Se(h4) {
      var g3 = -1, p3 = Array(h4.size);
      return h4.forEach(function(A2) {
        p3[++g3] = A2;
      }), p3;
    }
    function df(h4) {
      var g3 = -1, p3 = Array(h4.size);
      return h4.forEach(function(A2) {
        p3[++g3] = [A2, A2];
      }), p3;
    }
    function gf(h4, g3, p3) {
      for (var A2 = p3 - 1, S2 = h4.length; ++A2 < S2; )
        if (h4[A2] === g3)
          return A2;
      return -1;
    }
    function vf(h4, g3, p3) {
      for (var A2 = p3 + 1; A2--; )
        if (h4[A2] === g3)
          return A2;
      return A2;
    }
    function Dt2(h4) {
      return Lt2(h4) ? mf(h4) : nf(h4);
    }
    function On(h4) {
      return Lt2(h4) ? wf(h4) : tf(h4);
    }
    function bs2(h4) {
      for (var g3 = h4.length; g3-- && so.test(h4.charAt(g3)); )
        ;
      return g3;
    }
    var _f = Ur2(Yo);
    function mf(h4) {
      for (var g3 = br.lastIndex = 0; br.test(h4); )
        ++g3;
      return g3;
    }
    function wf(h4) {
      return h4.match(br) || [];
    }
    function Pf(h4) {
      return h4.match(Fo) || [];
    }
    var Af = function h4(g3) {
      g3 = g3 == null ? k2 : Ht2.defaults(k2.Object(), g3, Ht2.pick(k2, Bo));
      var p3 = g3.Array, A2 = g3.Date, S2 = g3.Error, U2 = g3.Function, X2 = g3.Math, M2 = g3.Object, Br = g3.RegExp, Cf = g3.String, wn = g3.TypeError, Oe = p3.prototype, If = U2.prototype, Nt2 = M2.prototype, Re2 = g3["__core-js_shared__"], be = If.toString, F2 = Nt2.hasOwnProperty, xf = 0, Ts2 = function() {
        var n2 = /[^.]+$/.exec(Re2 && Re2.keys && Re2.keys.IE_PROTO || "");
        return n2 ? "Symbol(src)_1." + n2 : "";
      }(), Te2 = Nt2.toString, Ef = be.call(M2), yf = k2._, Sf = Br("^" + be.call(F2).replace(xr2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Le2 = ds2 ? g3.Buffer : i, et2 = g3.Symbol, De2 = g3.Uint8Array, Ls2 = Le2 ? Le2.allocUnsafe : i, He2 = Rs2(M2.getPrototypeOf, M2), Ds2 = M2.create, Hs2 = Nt2.propertyIsEnumerable, Ne2 = Oe.splice, Ns2 = et2 ? et2.isConcatSpreadable : i, ne2 = et2 ? et2.iterator : i, pt2 = et2 ? et2.toStringTag : i, $e2 = function() {
        try {
          var n2 = mt2(M2, "defineProperty");
          return n2({}, "", {}), n2;
        } catch {
        }
      }(), Of = g3.clearTimeout !== k2.clearTimeout && g3.clearTimeout, Rf = A2 && A2.now !== k2.Date.now && A2.now, bf = g3.setTimeout !== k2.setTimeout && g3.setTimeout, Ue2 = X2.ceil, We2 = X2.floor, Gr = M2.getOwnPropertySymbols, Tf = Le2 ? Le2.isBuffer : i, $s2 = g3.isFinite, Lf = Oe.join, Df = Rs2(M2.keys, M2), Q3 = X2.max, nn2 = X2.min, Hf = A2.now, Nf = g3.parseInt, Us2 = X2.random, $f = Oe.reverse, zr2 = mt2(g3, "DataView"), te3 = mt2(g3, "Map"), Kr = mt2(g3, "Promise"), $t2 = mt2(g3, "Set"), ee2 = mt2(g3, "WeakMap"), re2 = mt2(M2, "create"), Fe2 = ee2 && new ee2(), Ut2 = {}, Uf = wt2(zr2), Wf = wt2(te3), Ff = wt2(Kr), Mf = wt2($t2), qf = wt2(ee2), Me2 = et2 ? et2.prototype : i, ie2 = Me2 ? Me2.valueOf : i, Ws2 = Me2 ? Me2.toString : i;
      function a3(n2) {
        if (Y(n2) && !R2(n2) && !(n2 instanceof H2)) {
          if (n2 instanceof Pn)
            return n2;
          if (F2.call(n2, "__wrapped__"))
            return Fu(n2);
        }
        return new Pn(n2);
      }
      var Wt2 = function() {
        function n2() {
        }
        return function(t) {
          if (!K3(t))
            return {};
          if (Ds2)
            return Ds2(t);
          n2.prototype = t;
          var e = new n2();
          return n2.prototype = i, e;
        };
      }();
      function qe2() {
      }
      function Pn(n2, t) {
        this.__wrapped__ = n2, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
      }
      a3.templateSettings = { escape: ja, evaluate: no, interpolate: Zi2, variable: "", imports: { _: a3 } }, a3.prototype = qe2.prototype, a3.prototype.constructor = a3, Pn.prototype = Wt2(qe2.prototype), Pn.prototype.constructor = Pn;
      function H2(n2) {
        this.__wrapped__ = n2, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Nn, this.__views__ = [];
      }
      function Bf() {
        var n2 = new H2(this.__wrapped__);
        return n2.__actions__ = un2(this.__actions__), n2.__dir__ = this.__dir__, n2.__filtered__ = this.__filtered__, n2.__iteratees__ = un2(this.__iteratees__), n2.__takeCount__ = this.__takeCount__, n2.__views__ = un2(this.__views__), n2;
      }
      function Gf() {
        if (this.__filtered__) {
          var n2 = new H2(this);
          n2.__dir__ = -1, n2.__filtered__ = true;
        } else
          n2 = this.clone(), n2.__dir__ *= -1;
        return n2;
      }
      function zf() {
        var n2 = this.__wrapped__.value(), t = this.__dir__, e = R2(n2), r = t < 0, s = e ? n2.length : 0, o = eh(0, s, this.__views__), f3 = o.start, c2 = o.end, l2 = c2 - f3, v3 = r ? c2 : f3 - 1, _3 = this.__iteratees__, m2 = _3.length, w3 = 0, I2 = nn2(l2, this.__takeCount__);
        if (!e || !r && s == l2 && I2 == l2)
          return ou(n2, this.__actions__);
        var E3 = [];
        n:
          for (; l2-- && w3 < I2; ) {
            v3 += t;
            for (var T2 = -1, y3 = n2[v3]; ++T2 < m2; ) {
              var D2 = _3[T2], N2 = D2.iteratee, dn2 = D2.type, sn2 = N2(y3);
              if (dn2 == $a)
                y3 = sn2;
              else if (!sn2) {
                if (dn2 == Bi)
                  continue n;
                break n;
              }
            }
            E3[w3++] = y3;
          }
        return E3;
      }
      H2.prototype = Wt2(qe2.prototype), H2.prototype.constructor = H2;
      function dt2(n2) {
        var t = -1, e = n2 == null ? 0 : n2.length;
        for (this.clear(); ++t < e; ) {
          var r = n2[t];
          this.set(r[0], r[1]);
        }
      }
      function Kf() {
        this.__data__ = re2 ? re2(null) : {}, this.size = 0;
      }
      function Yf(n2) {
        var t = this.has(n2) && delete this.__data__[n2];
        return this.size -= t ? 1 : 0, t;
      }
      function Zf(n2) {
        var t = this.__data__;
        if (re2) {
          var e = t[n2];
          return e === zt2 ? i : e;
        }
        return F2.call(t, n2) ? t[n2] : i;
      }
      function Jf(n2) {
        var t = this.__data__;
        return re2 ? t[n2] !== i : F2.call(t, n2);
      }
      function Xf(n2, t) {
        var e = this.__data__;
        return this.size += this.has(n2) ? 0 : 1, e[n2] = re2 && t === i ? zt2 : t, this;
      }
      dt2.prototype.clear = Kf, dt2.prototype.delete = Yf, dt2.prototype.get = Zf, dt2.prototype.has = Jf, dt2.prototype.set = Xf;
      function Bn2(n2) {
        var t = -1, e = n2 == null ? 0 : n2.length;
        for (this.clear(); ++t < e; ) {
          var r = n2[t];
          this.set(r[0], r[1]);
        }
      }
      function Qf() {
        this.__data__ = [], this.size = 0;
      }
      function Vf(n2) {
        var t = this.__data__, e = Be2(t, n2);
        if (e < 0)
          return false;
        var r = t.length - 1;
        return e == r ? t.pop() : Ne2.call(t, e, 1), --this.size, true;
      }
      function kf(n2) {
        var t = this.__data__, e = Be2(t, n2);
        return e < 0 ? i : t[e][1];
      }
      function jf(n2) {
        return Be2(this.__data__, n2) > -1;
      }
      function nc(n2, t) {
        var e = this.__data__, r = Be2(e, n2);
        return r < 0 ? (++this.size, e.push([n2, t])) : e[r][1] = t, this;
      }
      Bn2.prototype.clear = Qf, Bn2.prototype.delete = Vf, Bn2.prototype.get = kf, Bn2.prototype.has = jf, Bn2.prototype.set = nc;
      function Gn2(n2) {
        var t = -1, e = n2 == null ? 0 : n2.length;
        for (this.clear(); ++t < e; ) {
          var r = n2[t];
          this.set(r[0], r[1]);
        }
      }
      function tc() {
        this.size = 0, this.__data__ = { hash: new dt2(), map: new (te3 || Bn2)(), string: new dt2() };
      }
      function ec(n2) {
        var t = nr2(this, n2).delete(n2);
        return this.size -= t ? 1 : 0, t;
      }
      function rc(n2) {
        return nr2(this, n2).get(n2);
      }
      function ic(n2) {
        return nr2(this, n2).has(n2);
      }
      function sc(n2, t) {
        var e = nr2(this, n2), r = e.size;
        return e.set(n2, t), this.size += e.size == r ? 0 : 1, this;
      }
      Gn2.prototype.clear = tc, Gn2.prototype.delete = ec, Gn2.prototype.get = rc, Gn2.prototype.has = ic, Gn2.prototype.set = sc;
      function gt2(n2) {
        var t = -1, e = n2 == null ? 0 : n2.length;
        for (this.__data__ = new Gn2(); ++t < e; )
          this.add(n2[t]);
      }
      function uc(n2) {
        return this.__data__.set(n2, zt2), this;
      }
      function ac(n2) {
        return this.__data__.has(n2);
      }
      gt2.prototype.add = gt2.prototype.push = uc, gt2.prototype.has = ac;
      function Rn(n2) {
        var t = this.__data__ = new Bn2(n2);
        this.size = t.size;
      }
      function oc() {
        this.__data__ = new Bn2(), this.size = 0;
      }
      function fc(n2) {
        var t = this.__data__, e = t.delete(n2);
        return this.size = t.size, e;
      }
      function cc(n2) {
        return this.__data__.get(n2);
      }
      function hc(n2) {
        return this.__data__.has(n2);
      }
      function lc(n2, t) {
        var e = this.__data__;
        if (e instanceof Bn2) {
          var r = e.__data__;
          if (!te3 || r.length < P2 - 1)
            return r.push([n2, t]), this.size = ++e.size, this;
          e = this.__data__ = new Gn2(r);
        }
        return e.set(n2, t), this.size = e.size, this;
      }
      Rn.prototype.clear = oc, Rn.prototype.delete = fc, Rn.prototype.get = cc, Rn.prototype.has = hc, Rn.prototype.set = lc;
      function Fs2(n2, t) {
        var e = R2(n2), r = !e && Pt2(n2), s = !e && !r && at2(n2), o = !e && !r && !s && Bt3(n2), f3 = e || r || s || o, c2 = f3 ? Fr2(n2.length, Cf) : [], l2 = c2.length;
        for (var v3 in n2)
          (t || F2.call(n2, v3)) && !(f3 && (v3 == "length" || s && (v3 == "offset" || v3 == "parent") || o && (v3 == "buffer" || v3 == "byteLength" || v3 == "byteOffset") || Zn(v3, l2))) && c2.push(v3);
        return c2;
      }
      function Ms2(n2) {
        var t = n2.length;
        return t ? n2[ei(0, t - 1)] : i;
      }
      function pc(n2, t) {
        return tr2(un2(n2), vt2(t, 0, n2.length));
      }
      function dc(n2) {
        return tr2(un2(n2));
      }
      function Yr(n2, t, e) {
        (e !== i && !bn(n2[t], e) || e === i && !(t in n2)) && zn(n2, t, e);
      }
      function se(n2, t, e) {
        var r = n2[t];
        (!(F2.call(n2, t) && bn(r, e)) || e === i && !(t in n2)) && zn(n2, t, e);
      }
      function Be2(n2, t) {
        for (var e = n2.length; e--; )
          if (bn(n2[e][0], t))
            return e;
        return -1;
      }
      function gc(n2, t, e, r) {
        return rt2(n2, function(s, o, f3) {
          t(r, s, e(s), f3);
        }), r;
      }
      function qs2(n2, t) {
        return n2 && Un2(t, V2(t), n2);
      }
      function vc(n2, t) {
        return n2 && Un2(t, on2(t), n2);
      }
      function zn(n2, t, e) {
        t == "__proto__" && $e2 ? $e2(n2, t, { configurable: true, enumerable: true, value: e, writable: true }) : n2[t] = e;
      }
      function Zr(n2, t) {
        for (var e = -1, r = t.length, s = p3(r), o = n2 == null; ++e < r; )
          s[e] = o ? i : Si(n2, t[e]);
        return s;
      }
      function vt2(n2, t, e) {
        return n2 === n2 && (e !== i && (n2 = n2 <= e ? n2 : e), t !== i && (n2 = n2 >= t ? n2 : t)), n2;
      }
      function An(n2, t, e, r, s, o) {
        var f3, c2 = t & Ln2, l2 = t & Fn2, v3 = t & xt3;
        if (e && (f3 = s ? e(n2, r, s, o) : e(n2)), f3 !== i)
          return f3;
        if (!K3(n2))
          return n2;
        var _3 = R2(n2);
        if (_3) {
          if (f3 = ih(n2), !c2)
            return un2(n2, f3);
        } else {
          var m2 = tn2(n2), w3 = m2 == Pe2 || m2 == Gi2;
          if (at2(n2))
            return hu(n2, c2);
          if (m2 == qn2 || m2 == Ot2 || w3 && !s) {
            if (f3 = l2 || w3 ? {} : bu(n2), !c2)
              return l2 ? Zc(n2, vc(f3, n2)) : Yc(n2, qs2(f3, n2));
          } else {
            if (!q2[m2])
              return s ? n2 : {};
            f3 = sh(n2, m2, c2);
          }
        }
        o || (o = new Rn());
        var I2 = o.get(n2);
        if (I2)
          return I2;
        o.set(n2, f3), sa(n2) ? n2.forEach(function(y3) {
          f3.add(An(y3, t, e, y3, n2, o));
        }) : ra(n2) && n2.forEach(function(y3, D2) {
          f3.set(D2, An(y3, t, e, D2, n2, o));
        });
        var E3 = v3 ? l2 ? pi : li : l2 ? on2 : V2, T2 = _3 ? i : E3(n2);
        return mn2(T2 || n2, function(y3, D2) {
          T2 && (D2 = y3, y3 = n2[D2]), se(f3, D2, An(y3, t, e, D2, n2, o));
        }), f3;
      }
      function _c(n2) {
        var t = V2(n2);
        return function(e) {
          return Bs2(e, n2, t);
        };
      }
      function Bs2(n2, t, e) {
        var r = e.length;
        if (n2 == null)
          return !r;
        for (n2 = M2(n2); r--; ) {
          var s = e[r], o = t[s], f3 = n2[s];
          if (f3 === i && !(s in n2) || !o(f3))
            return false;
        }
        return true;
      }
      function Gs2(n2, t, e) {
        if (typeof n2 != "function")
          throw new wn($2);
        return le2(function() {
          n2.apply(i, e);
        }, t);
      }
      function ue2(n2, t, e, r) {
        var s = -1, o = Ee, f3 = true, c2 = n2.length, l2 = [], v3 = t.length;
        if (!c2)
          return l2;
        e && (t = G2(t, hn2(e))), r ? (o = Dr2, f3 = false) : t.length >= P2 && (o = jt3, f3 = false, t = new gt2(t));
        n:
          for (; ++s < c2; ) {
            var _3 = n2[s], m2 = e == null ? _3 : e(_3);
            if (_3 = r || _3 !== 0 ? _3 : 0, f3 && m2 === m2) {
              for (var w3 = v3; w3--; )
                if (t[w3] === m2)
                  continue n;
              l2.push(_3);
            } else
              o(t, m2, r) || l2.push(_3);
          }
        return l2;
      }
      var rt2 = vu($n), zs2 = vu(Xr, true);
      function mc(n2, t) {
        var e = true;
        return rt2(n2, function(r, s, o) {
          return e = !!t(r, s, o), e;
        }), e;
      }
      function Ge2(n2, t, e) {
        for (var r = -1, s = n2.length; ++r < s; ) {
          var o = n2[r], f3 = t(o);
          if (f3 != null && (c2 === i ? f3 === f3 && !pn2(f3) : e(f3, c2)))
            var c2 = f3, l2 = o;
        }
        return l2;
      }
      function wc(n2, t, e, r) {
        var s = n2.length;
        for (e = b3(e), e < 0 && (e = -e > s ? 0 : s + e), r = r === i || r > s ? s : b3(r), r < 0 && (r += s), r = e > r ? 0 : aa(r); e < r; )
          n2[e++] = t;
        return n2;
      }
      function Ks2(n2, t) {
        var e = [];
        return rt2(n2, function(r, s, o) {
          t(r, s, o) && e.push(r);
        }), e;
      }
      function j2(n2, t, e, r, s) {
        var o = -1, f3 = n2.length;
        for (e || (e = ah), s || (s = []); ++o < f3; ) {
          var c2 = n2[o];
          t > 0 && e(c2) ? t > 1 ? j2(c2, t - 1, e, r, s) : nt2(s, c2) : r || (s[s.length] = c2);
        }
        return s;
      }
      var Jr = _u(), Ys2 = _u(true);
      function $n(n2, t) {
        return n2 && Jr(n2, t, V2);
      }
      function Xr(n2, t) {
        return n2 && Ys2(n2, t, V2);
      }
      function ze2(n2, t) {
        return jn(t, function(e) {
          return Jn2(n2[e]);
        });
      }
      function _t2(n2, t) {
        t = st2(t, n2);
        for (var e = 0, r = t.length; n2 != null && e < r; )
          n2 = n2[Wn2(t[e++])];
        return e && e == r ? n2 : i;
      }
      function Zs2(n2, t, e) {
        var r = t(n2);
        return R2(n2) ? r : nt2(r, e(n2));
      }
      function en2(n2) {
        return n2 == null ? n2 === i ? Ya : za : pt2 && pt2 in M2(n2) ? th(n2) : dh(n2);
      }
      function Qr(n2, t) {
        return n2 > t;
      }
      function Pc(n2, t) {
        return n2 != null && F2.call(n2, t);
      }
      function Ac(n2, t) {
        return n2 != null && t in M2(n2);
      }
      function Cc(n2, t, e) {
        return n2 >= nn2(t, e) && n2 < Q3(t, e);
      }
      function Vr(n2, t, e) {
        for (var r = e ? Dr2 : Ee, s = n2[0].length, o = n2.length, f3 = o, c2 = p3(o), l2 = 1 / 0, v3 = []; f3--; ) {
          var _3 = n2[f3];
          f3 && t && (_3 = G2(_3, hn2(t))), l2 = nn2(_3.length, l2), c2[f3] = !e && (t || s >= 120 && _3.length >= 120) ? new gt2(f3 && _3) : i;
        }
        _3 = n2[0];
        var m2 = -1, w3 = c2[0];
        n:
          for (; ++m2 < s && v3.length < l2; ) {
            var I2 = _3[m2], E3 = t ? t(I2) : I2;
            if (I2 = e || I2 !== 0 ? I2 : 0, !(w3 ? jt3(w3, E3) : r(v3, E3, e))) {
              for (f3 = o; --f3; ) {
                var T2 = c2[f3];
                if (!(T2 ? jt3(T2, E3) : r(n2[f3], E3, e)))
                  continue n;
              }
              w3 && w3.push(E3), v3.push(I2);
            }
          }
        return v3;
      }
      function Ic(n2, t, e, r) {
        return $n(n2, function(s, o, f3) {
          t(r, e(s), o, f3);
        }), r;
      }
      function ae2(n2, t, e) {
        t = st2(t, n2), n2 = Hu(n2, t);
        var r = n2 == null ? n2 : n2[Wn2(In(t))];
        return r == null ? i : cn2(r, n2, e);
      }
      function Js2(n2) {
        return Y(n2) && en2(n2) == Ot2;
      }
      function xc(n2) {
        return Y(n2) && en2(n2) == kt2;
      }
      function Ec(n2) {
        return Y(n2) && en2(n2) == Zt2;
      }
      function oe2(n2, t, e, r, s) {
        return n2 === t ? true : n2 == null || t == null || !Y(n2) && !Y(t) ? n2 !== n2 && t !== t : yc(n2, t, e, r, oe2, s);
      }
      function yc(n2, t, e, r, s, o) {
        var f3 = R2(n2), c2 = R2(t), l2 = f3 ? me : tn2(n2), v3 = c2 ? me : tn2(t);
        l2 = l2 == Ot2 ? qn2 : l2, v3 = v3 == Ot2 ? qn2 : v3;
        var _3 = l2 == qn2, m2 = v3 == qn2, w3 = l2 == v3;
        if (w3 && at2(n2)) {
          if (!at2(t))
            return false;
          f3 = true, _3 = false;
        }
        if (w3 && !_3)
          return o || (o = new Rn()), f3 || Bt3(n2) ? Su(n2, t, e, r, s, o) : jc(n2, t, l2, e, r, s, o);
        if (!(e & Et2)) {
          var I2 = _3 && F2.call(n2, "__wrapped__"), E3 = m2 && F2.call(t, "__wrapped__");
          if (I2 || E3) {
            var T2 = I2 ? n2.value() : n2, y3 = E3 ? t.value() : t;
            return o || (o = new Rn()), s(T2, y3, e, r, o);
          }
        }
        return w3 ? (o || (o = new Rn()), nh(n2, t, e, r, s, o)) : false;
      }
      function Sc(n2) {
        return Y(n2) && tn2(n2) == yn2;
      }
      function kr(n2, t, e, r) {
        var s = e.length, o = s, f3 = !r;
        if (n2 == null)
          return !o;
        for (n2 = M2(n2); s--; ) {
          var c2 = e[s];
          if (f3 && c2[2] ? c2[1] !== n2[c2[0]] : !(c2[0] in n2))
            return false;
        }
        for (; ++s < o; ) {
          c2 = e[s];
          var l2 = c2[0], v3 = n2[l2], _3 = c2[1];
          if (f3 && c2[2]) {
            if (v3 === i && !(l2 in n2))
              return false;
          } else {
            var m2 = new Rn();
            if (r)
              var w3 = r(v3, _3, l2, n2, t, m2);
            if (!(w3 === i ? oe2(_3, v3, Et2 | ve2, r, m2) : w3))
              return false;
          }
        }
        return true;
      }
      function Xs2(n2) {
        if (!K3(n2) || fh(n2))
          return false;
        var t = Jn2(n2) ? Sf : vo;
        return t.test(wt2(n2));
      }
      function Oc(n2) {
        return Y(n2) && en2(n2) == Xt2;
      }
      function Rc(n2) {
        return Y(n2) && tn2(n2) == Sn;
      }
      function bc(n2) {
        return Y(n2) && ar2(n2.length) && !!B2[en2(n2)];
      }
      function Qs2(n2) {
        return typeof n2 == "function" ? n2 : n2 == null ? fn2 : typeof n2 == "object" ? R2(n2) ? js2(n2[0], n2[1]) : ks2(n2) : ma(n2);
      }
      function jr(n2) {
        if (!he2(n2))
          return Df(n2);
        var t = [];
        for (var e in M2(n2))
          F2.call(n2, e) && e != "constructor" && t.push(e);
        return t;
      }
      function Tc(n2) {
        if (!K3(n2))
          return ph(n2);
        var t = he2(n2), e = [];
        for (var r in n2)
          r == "constructor" && (t || !F2.call(n2, r)) || e.push(r);
        return e;
      }
      function ni(n2, t) {
        return n2 < t;
      }
      function Vs2(n2, t) {
        var e = -1, r = an2(n2) ? p3(n2.length) : [];
        return rt2(n2, function(s, o, f3) {
          r[++e] = t(s, o, f3);
        }), r;
      }
      function ks2(n2) {
        var t = gi(n2);
        return t.length == 1 && t[0][2] ? Lu(t[0][0], t[0][1]) : function(e) {
          return e === n2 || kr(e, n2, t);
        };
      }
      function js2(n2, t) {
        return _i(n2) && Tu(t) ? Lu(Wn2(n2), t) : function(e) {
          var r = Si(e, n2);
          return r === i && r === t ? Oi(e, n2) : oe2(t, r, Et2 | ve2);
        };
      }
      function Ke2(n2, t, e, r, s) {
        n2 !== t && Jr(t, function(o, f3) {
          if (s || (s = new Rn()), K3(o))
            Lc(n2, t, f3, e, Ke2, r, s);
          else {
            var c2 = r ? r(wi(n2, f3), o, f3 + "", n2, t, s) : i;
            c2 === i && (c2 = o), Yr(n2, f3, c2);
          }
        }, on2);
      }
      function Lc(n2, t, e, r, s, o, f3) {
        var c2 = wi(n2, e), l2 = wi(t, e), v3 = f3.get(l2);
        if (v3) {
          Yr(n2, e, v3);
          return;
        }
        var _3 = o ? o(c2, l2, e + "", n2, t, f3) : i, m2 = _3 === i;
        if (m2) {
          var w3 = R2(l2), I2 = !w3 && at2(l2), E3 = !w3 && !I2 && Bt3(l2);
          _3 = l2, w3 || I2 || E3 ? R2(c2) ? _3 = c2 : Z2(c2) ? _3 = un2(c2) : I2 ? (m2 = false, _3 = hu(l2, true)) : E3 ? (m2 = false, _3 = lu(l2, true)) : _3 = [] : pe2(l2) || Pt2(l2) ? (_3 = c2, Pt2(c2) ? _3 = oa(c2) : (!K3(c2) || Jn2(c2)) && (_3 = bu(l2))) : m2 = false;
        }
        m2 && (f3.set(l2, _3), s(_3, l2, r, o, f3), f3.delete(l2)), Yr(n2, e, _3);
      }
      function nu(n2, t) {
        var e = n2.length;
        if (e)
          return t += t < 0 ? e : 0, Zn(t, e) ? n2[t] : i;
      }
      function tu(n2, t, e) {
        t.length ? t = G2(t, function(o) {
          return R2(o) ? function(f3) {
            return _t2(f3, o.length === 1 ? o[0] : o);
          } : o;
        }) : t = [fn2];
        var r = -1;
        t = G2(t, hn2(x2()));
        var s = Vs2(n2, function(o, f3, c2) {
          var l2 = G2(t, function(v3) {
            return v3(o);
          });
          return { criteria: l2, index: ++r, value: o };
        });
        return sf(s, function(o, f3) {
          return Kc(o, f3, e);
        });
      }
      function Dc(n2, t) {
        return eu(n2, t, function(e, r) {
          return Oi(n2, r);
        });
      }
      function eu(n2, t, e) {
        for (var r = -1, s = t.length, o = {}; ++r < s; ) {
          var f3 = t[r], c2 = _t2(n2, f3);
          e(c2, f3) && fe(o, st2(f3, n2), c2);
        }
        return o;
      }
      function Hc(n2) {
        return function(t) {
          return _t2(t, n2);
        };
      }
      function ti(n2, t, e, r) {
        var s = r ? rf : Tt2, o = -1, f3 = t.length, c2 = n2;
        for (n2 === t && (t = un2(t)), e && (c2 = G2(n2, hn2(e))); ++o < f3; )
          for (var l2 = 0, v3 = t[o], _3 = e ? e(v3) : v3; (l2 = s(c2, _3, l2, r)) > -1; )
            c2 !== n2 && Ne2.call(c2, l2, 1), Ne2.call(n2, l2, 1);
        return n2;
      }
      function ru(n2, t) {
        for (var e = n2 ? t.length : 0, r = e - 1; e--; ) {
          var s = t[e];
          if (e == r || s !== o) {
            var o = s;
            Zn(s) ? Ne2.call(n2, s, 1) : si(n2, s);
          }
        }
        return n2;
      }
      function ei(n2, t) {
        return n2 + We2(Us2() * (t - n2 + 1));
      }
      function Nc(n2, t, e, r) {
        for (var s = -1, o = Q3(Ue2((t - n2) / (e || 1)), 0), f3 = p3(o); o--; )
          f3[r ? o : ++s] = n2, n2 += e;
        return f3;
      }
      function ri(n2, t) {
        var e = "";
        if (!n2 || t < 1 || t > kn2)
          return e;
        do
          t % 2 && (e += n2), t = We2(t / 2), t && (n2 += n2);
        while (t);
        return e;
      }
      function L2(n2, t) {
        return Pi(Du(n2, t, fn2), n2 + "");
      }
      function $c(n2) {
        return Ms2(Gt3(n2));
      }
      function Uc(n2, t) {
        var e = Gt3(n2);
        return tr2(e, vt2(t, 0, e.length));
      }
      function fe(n2, t, e, r) {
        if (!K3(n2))
          return n2;
        t = st2(t, n2);
        for (var s = -1, o = t.length, f3 = o - 1, c2 = n2; c2 != null && ++s < o; ) {
          var l2 = Wn2(t[s]), v3 = e;
          if (l2 === "__proto__" || l2 === "constructor" || l2 === "prototype")
            return n2;
          if (s != f3) {
            var _3 = c2[l2];
            v3 = r ? r(_3, l2, c2) : i, v3 === i && (v3 = K3(_3) ? _3 : Zn(t[s + 1]) ? [] : {});
          }
          se(c2, l2, v3), c2 = c2[l2];
        }
        return n2;
      }
      var iu = Fe2 ? function(n2, t) {
        return Fe2.set(n2, t), n2;
      } : fn2, Wc = $e2 ? function(n2, t) {
        return $e2(n2, "toString", { configurable: true, enumerable: false, value: bi(t), writable: true });
      } : fn2;
      function Fc(n2) {
        return tr2(Gt3(n2));
      }
      function Cn(n2, t, e) {
        var r = -1, s = n2.length;
        t < 0 && (t = -t > s ? 0 : s + t), e = e > s ? s : e, e < 0 && (e += s), s = t > e ? 0 : e - t >>> 0, t >>>= 0;
        for (var o = p3(s); ++r < s; )
          o[r] = n2[r + t];
        return o;
      }
      function Mc(n2, t) {
        var e;
        return rt2(n2, function(r, s, o) {
          return e = t(r, s, o), !e;
        }), !!e;
      }
      function Ye2(n2, t, e) {
        var r = 0, s = n2 == null ? r : n2.length;
        if (typeof t == "number" && t === t && s <= Ma) {
          for (; r < s; ) {
            var o = r + s >>> 1, f3 = n2[o];
            f3 !== null && !pn2(f3) && (e ? f3 <= t : f3 < t) ? r = o + 1 : s = o;
          }
          return s;
        }
        return ii(n2, t, fn2, e);
      }
      function ii(n2, t, e, r) {
        var s = 0, o = n2 == null ? 0 : n2.length;
        if (o === 0)
          return 0;
        t = e(t);
        for (var f3 = t !== t, c2 = t === null, l2 = pn2(t), v3 = t === i; s < o; ) {
          var _3 = We2((s + o) / 2), m2 = e(n2[_3]), w3 = m2 !== i, I2 = m2 === null, E3 = m2 === m2, T2 = pn2(m2);
          if (f3)
            var y3 = r || E3;
          else
            v3 ? y3 = E3 && (r || w3) : c2 ? y3 = E3 && w3 && (r || !I2) : l2 ? y3 = E3 && w3 && !I2 && (r || !T2) : I2 || T2 ? y3 = false : y3 = r ? m2 <= t : m2 < t;
          y3 ? s = _3 + 1 : o = _3;
        }
        return nn2(o, Fa);
      }
      function su(n2, t) {
        for (var e = -1, r = n2.length, s = 0, o = []; ++e < r; ) {
          var f3 = n2[e], c2 = t ? t(f3) : f3;
          if (!e || !bn(c2, l2)) {
            var l2 = c2;
            o[s++] = f3 === 0 ? 0 : f3;
          }
        }
        return o;
      }
      function uu(n2) {
        return typeof n2 == "number" ? n2 : pn2(n2) ? _e2 : +n2;
      }
      function ln2(n2) {
        if (typeof n2 == "string")
          return n2;
        if (R2(n2))
          return G2(n2, ln2) + "";
        if (pn2(n2))
          return Ws2 ? Ws2.call(n2) : "";
        var t = n2 + "";
        return t == "0" && 1 / n2 == -ht2 ? "-0" : t;
      }
      function it2(n2, t, e) {
        var r = -1, s = Ee, o = n2.length, f3 = true, c2 = [], l2 = c2;
        if (e)
          f3 = false, s = Dr2;
        else if (o >= P2) {
          var v3 = t ? null : Vc(n2);
          if (v3)
            return Se(v3);
          f3 = false, s = jt3, l2 = new gt2();
        } else
          l2 = t ? [] : c2;
        n:
          for (; ++r < o; ) {
            var _3 = n2[r], m2 = t ? t(_3) : _3;
            if (_3 = e || _3 !== 0 ? _3 : 0, f3 && m2 === m2) {
              for (var w3 = l2.length; w3--; )
                if (l2[w3] === m2)
                  continue n;
              t && l2.push(m2), c2.push(_3);
            } else
              s(l2, m2, e) || (l2 !== c2 && l2.push(m2), c2.push(_3));
          }
        return c2;
      }
      function si(n2, t) {
        return t = st2(t, n2), n2 = Hu(n2, t), n2 == null || delete n2[Wn2(In(t))];
      }
      function au(n2, t, e, r) {
        return fe(n2, t, e(_t2(n2, t)), r);
      }
      function Ze2(n2, t, e, r) {
        for (var s = n2.length, o = r ? s : -1; (r ? o-- : ++o < s) && t(n2[o], o, n2); )
          ;
        return e ? Cn(n2, r ? 0 : o, r ? o + 1 : s) : Cn(n2, r ? o + 1 : 0, r ? s : o);
      }
      function ou(n2, t) {
        var e = n2;
        return e instanceof H2 && (e = e.value()), Hr(t, function(r, s) {
          return s.func.apply(s.thisArg, nt2([r], s.args));
        }, e);
      }
      function ui(n2, t, e) {
        var r = n2.length;
        if (r < 2)
          return r ? it2(n2[0]) : [];
        for (var s = -1, o = p3(r); ++s < r; )
          for (var f3 = n2[s], c2 = -1; ++c2 < r; )
            c2 != s && (o[s] = ue2(o[s] || f3, n2[c2], t, e));
        return it2(j2(o, 1), t, e);
      }
      function fu(n2, t, e) {
        for (var r = -1, s = n2.length, o = t.length, f3 = {}; ++r < s; ) {
          var c2 = r < o ? t[r] : i;
          e(f3, n2[r], c2);
        }
        return f3;
      }
      function ai(n2) {
        return Z2(n2) ? n2 : [];
      }
      function oi(n2) {
        return typeof n2 == "function" ? n2 : fn2;
      }
      function st2(n2, t) {
        return R2(n2) ? n2 : _i(n2, t) ? [n2] : Wu(W2(n2));
      }
      var qc = L2;
      function ut2(n2, t, e) {
        var r = n2.length;
        return e = e === i ? r : e, !t && e >= r ? n2 : Cn(n2, t, e);
      }
      var cu = Of || function(n2) {
        return k2.clearTimeout(n2);
      };
      function hu(n2, t) {
        if (t)
          return n2.slice();
        var e = n2.length, r = Ls2 ? Ls2(e) : new n2.constructor(e);
        return n2.copy(r), r;
      }
      function fi(n2) {
        var t = new n2.constructor(n2.byteLength);
        return new De2(t).set(new De2(n2)), t;
      }
      function Bc(n2, t) {
        var e = t ? fi(n2.buffer) : n2.buffer;
        return new n2.constructor(e, n2.byteOffset, n2.byteLength);
      }
      function Gc(n2) {
        var t = new n2.constructor(n2.source, Ji2.exec(n2));
        return t.lastIndex = n2.lastIndex, t;
      }
      function zc(n2) {
        return ie2 ? M2(ie2.call(n2)) : {};
      }
      function lu(n2, t) {
        var e = t ? fi(n2.buffer) : n2.buffer;
        return new n2.constructor(e, n2.byteOffset, n2.length);
      }
      function pu(n2, t) {
        if (n2 !== t) {
          var e = n2 !== i, r = n2 === null, s = n2 === n2, o = pn2(n2), f3 = t !== i, c2 = t === null, l2 = t === t, v3 = pn2(t);
          if (!c2 && !v3 && !o && n2 > t || o && f3 && l2 && !c2 && !v3 || r && f3 && l2 || !e && l2 || !s)
            return 1;
          if (!r && !o && !v3 && n2 < t || v3 && e && s && !r && !o || c2 && e && s || !f3 && s || !l2)
            return -1;
        }
        return 0;
      }
      function Kc(n2, t, e) {
        for (var r = -1, s = n2.criteria, o = t.criteria, f3 = s.length, c2 = e.length; ++r < f3; ) {
          var l2 = pu(s[r], o[r]);
          if (l2) {
            if (r >= c2)
              return l2;
            var v3 = e[r];
            return l2 * (v3 == "desc" ? -1 : 1);
          }
        }
        return n2.index - t.index;
      }
      function du(n2, t, e, r) {
        for (var s = -1, o = n2.length, f3 = e.length, c2 = -1, l2 = t.length, v3 = Q3(o - f3, 0), _3 = p3(l2 + v3), m2 = !r; ++c2 < l2; )
          _3[c2] = t[c2];
        for (; ++s < f3; )
          (m2 || s < o) && (_3[e[s]] = n2[s]);
        for (; v3--; )
          _3[c2++] = n2[s++];
        return _3;
      }
      function gu(n2, t, e, r) {
        for (var s = -1, o = n2.length, f3 = -1, c2 = e.length, l2 = -1, v3 = t.length, _3 = Q3(o - c2, 0), m2 = p3(_3 + v3), w3 = !r; ++s < _3; )
          m2[s] = n2[s];
        for (var I2 = s; ++l2 < v3; )
          m2[I2 + l2] = t[l2];
        for (; ++f3 < c2; )
          (w3 || s < o) && (m2[I2 + e[f3]] = n2[s++]);
        return m2;
      }
      function un2(n2, t) {
        var e = -1, r = n2.length;
        for (t || (t = p3(r)); ++e < r; )
          t[e] = n2[e];
        return t;
      }
      function Un2(n2, t, e, r) {
        var s = !e;
        e || (e = {});
        for (var o = -1, f3 = t.length; ++o < f3; ) {
          var c2 = t[o], l2 = r ? r(e[c2], n2[c2], c2, e, n2) : i;
          l2 === i && (l2 = n2[c2]), s ? zn(e, c2, l2) : se(e, c2, l2);
        }
        return e;
      }
      function Yc(n2, t) {
        return Un2(n2, vi(n2), t);
      }
      function Zc(n2, t) {
        return Un2(n2, Ou(n2), t);
      }
      function Je2(n2, t) {
        return function(e, r) {
          var s = R2(e) ? Vo : gc, o = t ? t() : {};
          return s(e, n2, x2(r, 2), o);
        };
      }
      function Ft3(n2) {
        return L2(function(t, e) {
          var r = -1, s = e.length, o = s > 1 ? e[s - 1] : i, f3 = s > 2 ? e[2] : i;
          for (o = n2.length > 3 && typeof o == "function" ? (s--, o) : i, f3 && rn2(e[0], e[1], f3) && (o = s < 3 ? i : o, s = 1), t = M2(t); ++r < s; ) {
            var c2 = e[r];
            c2 && n2(t, c2, r, o);
          }
          return t;
        });
      }
      function vu(n2, t) {
        return function(e, r) {
          if (e == null)
            return e;
          if (!an2(e))
            return n2(e, r);
          for (var s = e.length, o = t ? s : -1, f3 = M2(e); (t ? o-- : ++o < s) && r(f3[o], o, f3) !== false; )
            ;
          return e;
        };
      }
      function _u(n2) {
        return function(t, e, r) {
          for (var s = -1, o = M2(t), f3 = r(t), c2 = f3.length; c2--; ) {
            var l2 = f3[n2 ? c2 : ++s];
            if (e(o[l2], l2, o) === false)
              break;
          }
          return t;
        };
      }
      function Jc(n2, t, e) {
        var r = t & vn2, s = ce2(n2);
        function o() {
          var f3 = this && this !== k2 && this instanceof o ? s : n2;
          return f3.apply(r ? e : this, arguments);
        }
        return o;
      }
      function mu(n2) {
        return function(t) {
          t = W2(t);
          var e = Lt2(t) ? On(t) : i, r = e ? e[0] : t.charAt(0), s = e ? ut2(e, 1).join("") : t.slice(1);
          return r[n2]() + s;
        };
      }
      function Mt2(n2) {
        return function(t) {
          return Hr(va(ga(t).replace(Uo, "")), n2, "");
        };
      }
      function ce2(n2) {
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new n2();
            case 1:
              return new n2(t[0]);
            case 2:
              return new n2(t[0], t[1]);
            case 3:
              return new n2(t[0], t[1], t[2]);
            case 4:
              return new n2(t[0], t[1], t[2], t[3]);
            case 5:
              return new n2(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new n2(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new n2(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var e = Wt2(n2.prototype), r = n2.apply(e, t);
          return K3(r) ? r : e;
        };
      }
      function Xc(n2, t, e) {
        var r = ce2(n2);
        function s() {
          for (var o = arguments.length, f3 = p3(o), c2 = o, l2 = qt3(s); c2--; )
            f3[c2] = arguments[c2];
          var v3 = o < 3 && f3[0] !== l2 && f3[o - 1] !== l2 ? [] : tt2(f3, l2);
          if (o -= v3.length, o < e)
            return Iu(n2, t, Xe2, s.placeholder, i, f3, v3, i, i, e - o);
          var _3 = this && this !== k2 && this instanceof s ? r : n2;
          return cn2(_3, this, f3);
        }
        return s;
      }
      function wu(n2) {
        return function(t, e, r) {
          var s = M2(t);
          if (!an2(t)) {
            var o = x2(e, 3);
            t = V2(t), e = function(c2) {
              return o(s[c2], c2, s);
            };
          }
          var f3 = n2(t, e, r);
          return f3 > -1 ? s[o ? t[f3] : f3] : i;
        };
      }
      function Pu(n2) {
        return Yn(function(t) {
          var e = t.length, r = e, s = Pn.prototype.thru;
          for (n2 && t.reverse(); r--; ) {
            var o = t[r];
            if (typeof o != "function")
              throw new wn($2);
            if (s && !f3 && je2(o) == "wrapper")
              var f3 = new Pn([], true);
          }
          for (r = f3 ? r : e; ++r < e; ) {
            o = t[r];
            var c2 = je2(o), l2 = c2 == "wrapper" ? di(o) : i;
            l2 && mi(l2[0]) && l2[1] == (Mn2 | Dn2 | Hn2 | Kt3) && !l2[4].length && l2[9] == 1 ? f3 = f3[je2(l2[0])].apply(f3, l2[3]) : f3 = o.length == 1 && mi(o) ? f3[c2]() : f3.thru(o);
          }
          return function() {
            var v3 = arguments, _3 = v3[0];
            if (f3 && v3.length == 1 && R2(_3))
              return f3.plant(_3).value();
            for (var m2 = 0, w3 = e ? t[m2].apply(this, v3) : _3; ++m2 < e; )
              w3 = t[m2].call(this, w3);
            return w3;
          };
        });
      }
      function Xe2(n2, t, e, r, s, o, f3, c2, l2, v3) {
        var _3 = t & Mn2, m2 = t & vn2, w3 = t & ct2, I2 = t & (Dn2 | yt2), E3 = t & dr2, T2 = w3 ? i : ce2(n2);
        function y3() {
          for (var D2 = arguments.length, N2 = p3(D2), dn2 = D2; dn2--; )
            N2[dn2] = arguments[dn2];
          if (I2)
            var sn2 = qt3(y3), gn2 = af(N2, sn2);
          if (r && (N2 = du(N2, r, s, I2)), o && (N2 = gu(N2, o, f3, I2)), D2 -= gn2, I2 && D2 < v3) {
            var J2 = tt2(N2, sn2);
            return Iu(n2, t, Xe2, y3.placeholder, e, N2, J2, c2, l2, v3 - D2);
          }
          var Tn = m2 ? e : this, Qn2 = w3 ? Tn[n2] : n2;
          return D2 = N2.length, c2 ? N2 = gh(N2, c2) : E3 && D2 > 1 && N2.reverse(), _3 && l2 < D2 && (N2.length = l2), this && this !== k2 && this instanceof y3 && (Qn2 = T2 || ce2(Qn2)), Qn2.apply(Tn, N2);
        }
        return y3;
      }
      function Au(n2, t) {
        return function(e, r) {
          return Ic(e, n2, t(r), {});
        };
      }
      function Qe2(n2, t) {
        return function(e, r) {
          var s;
          if (e === i && r === i)
            return t;
          if (e !== i && (s = e), r !== i) {
            if (s === i)
              return r;
            typeof e == "string" || typeof r == "string" ? (e = ln2(e), r = ln2(r)) : (e = uu(e), r = uu(r)), s = n2(e, r);
          }
          return s;
        };
      }
      function ci(n2) {
        return Yn(function(t) {
          return t = G2(t, hn2(x2())), L2(function(e) {
            var r = this;
            return n2(t, function(s) {
              return cn2(s, r, e);
            });
          });
        });
      }
      function Ve2(n2, t) {
        t = t === i ? " " : ln2(t);
        var e = t.length;
        if (e < 2)
          return e ? ri(t, n2) : t;
        var r = ri(t, Ue2(n2 / Dt2(t)));
        return Lt2(t) ? ut2(On(r), 0, n2).join("") : r.slice(0, n2);
      }
      function Qc(n2, t, e, r) {
        var s = t & vn2, o = ce2(n2);
        function f3() {
          for (var c2 = -1, l2 = arguments.length, v3 = -1, _3 = r.length, m2 = p3(_3 + l2), w3 = this && this !== k2 && this instanceof f3 ? o : n2; ++v3 < _3; )
            m2[v3] = r[v3];
          for (; l2--; )
            m2[v3++] = arguments[++c2];
          return cn2(w3, s ? e : this, m2);
        }
        return f3;
      }
      function Cu(n2) {
        return function(t, e, r) {
          return r && typeof r != "number" && rn2(t, e, r) && (e = r = i), t = Xn2(t), e === i ? (e = t, t = 0) : e = Xn2(e), r = r === i ? t < e ? 1 : -1 : Xn2(r), Nc(t, e, r, n2);
        };
      }
      function ke2(n2) {
        return function(t, e) {
          return typeof t == "string" && typeof e == "string" || (t = xn2(t), e = xn2(e)), n2(t, e);
        };
      }
      function Iu(n2, t, e, r, s, o, f3, c2, l2, v3) {
        var _3 = t & Dn2, m2 = _3 ? f3 : i, w3 = _3 ? i : f3, I2 = _3 ? o : i, E3 = _3 ? i : o;
        t |= _3 ? Hn2 : St2, t &= ~(_3 ? St2 : Hn2), t & qi || (t &= ~(vn2 | ct2));
        var T2 = [n2, t, s, I2, m2, E3, w3, c2, l2, v3], y3 = e.apply(i, T2);
        return mi(n2) && Nu(y3, T2), y3.placeholder = r, $u(y3, n2, t);
      }
      function hi(n2) {
        var t = X2[n2];
        return function(e, r) {
          if (e = xn2(e), r = r == null ? 0 : nn2(b3(r), 292), r && $s2(e)) {
            var s = (W2(e) + "e").split("e"), o = t(s[0] + "e" + (+s[1] + r));
            return s = (W2(o) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
          }
          return t(e);
        };
      }
      var Vc = $t2 && 1 / Se(new $t2([, -0]))[1] == ht2 ? function(n2) {
        return new $t2(n2);
      } : Di;
      function xu(n2) {
        return function(t) {
          var e = tn2(t);
          return e == yn2 ? qr(t) : e == Sn ? df(t) : uf(t, n2(t));
        };
      }
      function Kn2(n2, t, e, r, s, o, f3, c2) {
        var l2 = t & ct2;
        if (!l2 && typeof n2 != "function")
          throw new wn($2);
        var v3 = r ? r.length : 0;
        if (v3 || (t &= ~(Hn2 | St2), r = s = i), f3 = f3 === i ? f3 : Q3(b3(f3), 0), c2 = c2 === i ? c2 : b3(c2), v3 -= s ? s.length : 0, t & St2) {
          var _3 = r, m2 = s;
          r = s = i;
        }
        var w3 = l2 ? i : di(n2), I2 = [n2, t, e, r, s, _3, m2, o, f3, c2];
        if (w3 && lh(I2, w3), n2 = I2[0], t = I2[1], e = I2[2], r = I2[3], s = I2[4], c2 = I2[9] = I2[9] === i ? l2 ? 0 : n2.length : Q3(I2[9] - v3, 0), !c2 && t & (Dn2 | yt2) && (t &= ~(Dn2 | yt2)), !t || t == vn2)
          var E3 = Jc(n2, t, e);
        else
          t == Dn2 || t == yt2 ? E3 = Xc(n2, t, c2) : (t == Hn2 || t == (vn2 | Hn2)) && !s.length ? E3 = Qc(n2, t, e, r) : E3 = Xe2.apply(i, I2);
        var T2 = w3 ? iu : Nu;
        return $u(T2(E3, I2), n2, t);
      }
      function Eu(n2, t, e, r) {
        return n2 === i || bn(n2, Nt2[e]) && !F2.call(r, e) ? t : n2;
      }
      function yu(n2, t, e, r, s, o) {
        return K3(n2) && K3(t) && (o.set(t, n2), Ke2(n2, t, i, yu, o), o.delete(t)), n2;
      }
      function kc(n2) {
        return pe2(n2) ? i : n2;
      }
      function Su(n2, t, e, r, s, o) {
        var f3 = e & Et2, c2 = n2.length, l2 = t.length;
        if (c2 != l2 && !(f3 && l2 > c2))
          return false;
        var v3 = o.get(n2), _3 = o.get(t);
        if (v3 && _3)
          return v3 == t && _3 == n2;
        var m2 = -1, w3 = true, I2 = e & ve2 ? new gt2() : i;
        for (o.set(n2, t), o.set(t, n2); ++m2 < c2; ) {
          var E3 = n2[m2], T2 = t[m2];
          if (r)
            var y3 = f3 ? r(T2, E3, m2, t, n2, o) : r(E3, T2, m2, n2, t, o);
          if (y3 !== i) {
            if (y3)
              continue;
            w3 = false;
            break;
          }
          if (I2) {
            if (!Nr2(t, function(D2, N2) {
              if (!jt3(I2, N2) && (E3 === D2 || s(E3, D2, e, r, o)))
                return I2.push(N2);
            })) {
              w3 = false;
              break;
            }
          } else if (!(E3 === T2 || s(E3, T2, e, r, o))) {
            w3 = false;
            break;
          }
        }
        return o.delete(n2), o.delete(t), w3;
      }
      function jc(n2, t, e, r, s, o, f3) {
        switch (e) {
          case Rt2:
            if (n2.byteLength != t.byteLength || n2.byteOffset != t.byteOffset)
              return false;
            n2 = n2.buffer, t = t.buffer;
          case kt2:
            return !(n2.byteLength != t.byteLength || !o(new De2(n2), new De2(t)));
          case Yt2:
          case Zt2:
          case Jt2:
            return bn(+n2, +t);
          case we:
            return n2.name == t.name && n2.message == t.message;
          case Xt2:
          case Qt2:
            return n2 == t + "";
          case yn2:
            var c2 = qr;
          case Sn:
            var l2 = r & Et2;
            if (c2 || (c2 = Se), n2.size != t.size && !l2)
              return false;
            var v3 = f3.get(n2);
            if (v3)
              return v3 == t;
            r |= ve2, f3.set(n2, t);
            var _3 = Su(c2(n2), c2(t), r, s, o, f3);
            return f3.delete(n2), _3;
          case Ae2:
            if (ie2)
              return ie2.call(n2) == ie2.call(t);
        }
        return false;
      }
      function nh(n2, t, e, r, s, o) {
        var f3 = e & Et2, c2 = li(n2), l2 = c2.length, v3 = li(t), _3 = v3.length;
        if (l2 != _3 && !f3)
          return false;
        for (var m2 = l2; m2--; ) {
          var w3 = c2[m2];
          if (!(f3 ? w3 in t : F2.call(t, w3)))
            return false;
        }
        var I2 = o.get(n2), E3 = o.get(t);
        if (I2 && E3)
          return I2 == t && E3 == n2;
        var T2 = true;
        o.set(n2, t), o.set(t, n2);
        for (var y3 = f3; ++m2 < l2; ) {
          w3 = c2[m2];
          var D2 = n2[w3], N2 = t[w3];
          if (r)
            var dn2 = f3 ? r(N2, D2, w3, t, n2, o) : r(D2, N2, w3, n2, t, o);
          if (!(dn2 === i ? D2 === N2 || s(D2, N2, e, r, o) : dn2)) {
            T2 = false;
            break;
          }
          y3 || (y3 = w3 == "constructor");
        }
        if (T2 && !y3) {
          var sn2 = n2.constructor, gn2 = t.constructor;
          sn2 != gn2 && "constructor" in n2 && "constructor" in t && !(typeof sn2 == "function" && sn2 instanceof sn2 && typeof gn2 == "function" && gn2 instanceof gn2) && (T2 = false);
        }
        return o.delete(n2), o.delete(t), T2;
      }
      function Yn(n2) {
        return Pi(Du(n2, i, Bu), n2 + "");
      }
      function li(n2) {
        return Zs2(n2, V2, vi);
      }
      function pi(n2) {
        return Zs2(n2, on2, Ou);
      }
      var di = Fe2 ? function(n2) {
        return Fe2.get(n2);
      } : Di;
      function je2(n2) {
        for (var t = n2.name + "", e = Ut2[t], r = F2.call(Ut2, t) ? e.length : 0; r--; ) {
          var s = e[r], o = s.func;
          if (o == null || o == n2)
            return s.name;
        }
        return t;
      }
      function qt3(n2) {
        var t = F2.call(a3, "placeholder") ? a3 : n2;
        return t.placeholder;
      }
      function x2() {
        var n2 = a3.iteratee || Ti;
        return n2 = n2 === Ti ? Qs2 : n2, arguments.length ? n2(arguments[0], arguments[1]) : n2;
      }
      function nr2(n2, t) {
        var e = n2.__data__;
        return oh(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
      }
      function gi(n2) {
        for (var t = V2(n2), e = t.length; e--; ) {
          var r = t[e], s = n2[r];
          t[e] = [r, s, Tu(s)];
        }
        return t;
      }
      function mt2(n2, t) {
        var e = hf(n2, t);
        return Xs2(e) ? e : i;
      }
      function th(n2) {
        var t = F2.call(n2, pt2), e = n2[pt2];
        try {
          n2[pt2] = i;
          var r = true;
        } catch {
        }
        var s = Te2.call(n2);
        return r && (t ? n2[pt2] = e : delete n2[pt2]), s;
      }
      var vi = Gr ? function(n2) {
        return n2 == null ? [] : (n2 = M2(n2), jn(Gr(n2), function(t) {
          return Hs2.call(n2, t);
        }));
      } : Hi2, Ou = Gr ? function(n2) {
        for (var t = []; n2; )
          nt2(t, vi(n2)), n2 = He2(n2);
        return t;
      } : Hi2, tn2 = en2;
      (zr2 && tn2(new zr2(new ArrayBuffer(1))) != Rt2 || te3 && tn2(new te3()) != yn2 || Kr && tn2(Kr.resolve()) != zi || $t2 && tn2(new $t2()) != Sn || ee2 && tn2(new ee2()) != Vt2) && (tn2 = function(n2) {
        var t = en2(n2), e = t == qn2 ? n2.constructor : i, r = e ? wt2(e) : "";
        if (r)
          switch (r) {
            case Uf:
              return Rt2;
            case Wf:
              return yn2;
            case Ff:
              return zi;
            case Mf:
              return Sn;
            case qf:
              return Vt2;
          }
        return t;
      });
      function eh(n2, t, e) {
        for (var r = -1, s = e.length; ++r < s; ) {
          var o = e[r], f3 = o.size;
          switch (o.type) {
            case "drop":
              n2 += f3;
              break;
            case "dropRight":
              t -= f3;
              break;
            case "take":
              t = nn2(t, n2 + f3);
              break;
            case "takeRight":
              n2 = Q3(n2, t - f3);
              break;
          }
        }
        return { start: n2, end: t };
      }
      function rh(n2) {
        var t = n2.match(ao);
        return t ? t[1].split(oo) : [];
      }
      function Ru(n2, t, e) {
        t = st2(t, n2);
        for (var r = -1, s = t.length, o = false; ++r < s; ) {
          var f3 = Wn2(t[r]);
          if (!(o = n2 != null && e(n2, f3)))
            break;
          n2 = n2[f3];
        }
        return o || ++r != s ? o : (s = n2 == null ? 0 : n2.length, !!s && ar2(s) && Zn(f3, s) && (R2(n2) || Pt2(n2)));
      }
      function ih(n2) {
        var t = n2.length, e = new n2.constructor(t);
        return t && typeof n2[0] == "string" && F2.call(n2, "index") && (e.index = n2.index, e.input = n2.input), e;
      }
      function bu(n2) {
        return typeof n2.constructor == "function" && !he2(n2) ? Wt2(He2(n2)) : {};
      }
      function sh(n2, t, e) {
        var r = n2.constructor;
        switch (t) {
          case kt2:
            return fi(n2);
          case Yt2:
          case Zt2:
            return new r(+n2);
          case Rt2:
            return Bc(n2, e);
          case gr2:
          case vr2:
          case _r2:
          case mr2:
          case wr:
          case Pr2:
          case Ar2:
          case Cr2:
          case Ir2:
            return lu(n2, e);
          case yn2:
            return new r();
          case Jt2:
          case Qt2:
            return new r(n2);
          case Xt2:
            return Gc(n2);
          case Sn:
            return new r();
          case Ae2:
            return zc(n2);
        }
      }
      function uh(n2, t) {
        var e = t.length;
        if (!e)
          return n2;
        var r = e - 1;
        return t[r] = (e > 1 ? "& " : "") + t[r], t = t.join(e > 2 ? ", " : " "), n2.replace(uo, `{
/* [wrapped with ` + t + `] */
`);
      }
      function ah(n2) {
        return R2(n2) || Pt2(n2) || !!(Ns2 && n2 && n2[Ns2]);
      }
      function Zn(n2, t) {
        var e = typeof n2;
        return t = t ?? kn2, !!t && (e == "number" || e != "symbol" && mo.test(n2)) && n2 > -1 && n2 % 1 == 0 && n2 < t;
      }
      function rn2(n2, t, e) {
        if (!K3(e))
          return false;
        var r = typeof t;
        return (r == "number" ? an2(e) && Zn(t, e.length) : r == "string" && t in e) ? bn(e[t], n2) : false;
      }
      function _i(n2, t) {
        if (R2(n2))
          return false;
        var e = typeof n2;
        return e == "number" || e == "symbol" || e == "boolean" || n2 == null || pn2(n2) ? true : eo.test(n2) || !to.test(n2) || t != null && n2 in M2(t);
      }
      function oh(n2) {
        var t = typeof n2;
        return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? n2 !== "__proto__" : n2 === null;
      }
      function mi(n2) {
        var t = je2(n2), e = a3[t];
        if (typeof e != "function" || !(t in H2.prototype))
          return false;
        if (n2 === e)
          return true;
        var r = di(e);
        return !!r && n2 === r[0];
      }
      function fh(n2) {
        return !!Ts2 && Ts2 in n2;
      }
      var ch = Re2 ? Jn2 : Ni;
      function he2(n2) {
        var t = n2 && n2.constructor, e = typeof t == "function" && t.prototype || Nt2;
        return n2 === e;
      }
      function Tu(n2) {
        return n2 === n2 && !K3(n2);
      }
      function Lu(n2, t) {
        return function(e) {
          return e == null ? false : e[n2] === t && (t !== i || n2 in M2(e));
        };
      }
      function hh(n2) {
        var t = sr2(n2, function(r) {
          return e.size === pr2 && e.clear(), r;
        }), e = t.cache;
        return t;
      }
      function lh(n2, t) {
        var e = n2[1], r = t[1], s = e | r, o = s < (vn2 | ct2 | Mn2), f3 = r == Mn2 && e == Dn2 || r == Mn2 && e == Kt3 && n2[7].length <= t[8] || r == (Mn2 | Kt3) && t[7].length <= t[8] && e == Dn2;
        if (!(o || f3))
          return n2;
        r & vn2 && (n2[2] = t[2], s |= e & vn2 ? 0 : qi);
        var c2 = t[3];
        if (c2) {
          var l2 = n2[3];
          n2[3] = l2 ? du(l2, c2, t[4]) : c2, n2[4] = l2 ? tt2(n2[3], It2) : t[4];
        }
        return c2 = t[5], c2 && (l2 = n2[5], n2[5] = l2 ? gu(l2, c2, t[6]) : c2, n2[6] = l2 ? tt2(n2[5], It2) : t[6]), c2 = t[7], c2 && (n2[7] = c2), r & Mn2 && (n2[8] = n2[8] == null ? t[8] : nn2(n2[8], t[8])), n2[9] == null && (n2[9] = t[9]), n2[0] = t[0], n2[1] = s, n2;
      }
      function ph(n2) {
        var t = [];
        if (n2 != null)
          for (var e in M2(n2))
            t.push(e);
        return t;
      }
      function dh(n2) {
        return Te2.call(n2);
      }
      function Du(n2, t, e) {
        return t = Q3(t === i ? n2.length - 1 : t, 0), function() {
          for (var r = arguments, s = -1, o = Q3(r.length - t, 0), f3 = p3(o); ++s < o; )
            f3[s] = r[t + s];
          s = -1;
          for (var c2 = p3(t + 1); ++s < t; )
            c2[s] = r[s];
          return c2[t] = e(f3), cn2(n2, this, c2);
        };
      }
      function Hu(n2, t) {
        return t.length < 2 ? n2 : _t2(n2, Cn(t, 0, -1));
      }
      function gh(n2, t) {
        for (var e = n2.length, r = nn2(t.length, e), s = un2(n2); r--; ) {
          var o = t[r];
          n2[r] = Zn(o, e) ? s[o] : i;
        }
        return n2;
      }
      function wi(n2, t) {
        if (!(t === "constructor" && typeof n2[t] == "function") && t != "__proto__")
          return n2[t];
      }
      var Nu = Uu(iu), le2 = bf || function(n2, t) {
        return k2.setTimeout(n2, t);
      }, Pi = Uu(Wc);
      function $u(n2, t, e) {
        var r = t + "";
        return Pi(n2, uh(r, vh(rh(r), e)));
      }
      function Uu(n2) {
        var t = 0, e = 0;
        return function() {
          var r = Hf(), s = Na - (r - e);
          if (e = r, s > 0) {
            if (++t >= Ha)
              return arguments[0];
          } else
            t = 0;
          return n2.apply(i, arguments);
        };
      }
      function tr2(n2, t) {
        var e = -1, r = n2.length, s = r - 1;
        for (t = t === i ? r : t; ++e < t; ) {
          var o = ei(e, s), f3 = n2[o];
          n2[o] = n2[e], n2[e] = f3;
        }
        return n2.length = t, n2;
      }
      var Wu = hh(function(n2) {
        var t = [];
        return n2.charCodeAt(0) === 46 && t.push(""), n2.replace(ro, function(e, r, s, o) {
          t.push(s ? o.replace(ho, "$1") : r || e);
        }), t;
      });
      function Wn2(n2) {
        if (typeof n2 == "string" || pn2(n2))
          return n2;
        var t = n2 + "";
        return t == "0" && 1 / n2 == -ht2 ? "-0" : t;
      }
      function wt2(n2) {
        if (n2 != null) {
          try {
            return be.call(n2);
          } catch {
          }
          try {
            return n2 + "";
          } catch {
          }
        }
        return "";
      }
      function vh(n2, t) {
        return mn2(qa, function(e) {
          var r = "_." + e[0];
          t & e[1] && !Ee(n2, r) && n2.push(r);
        }), n2.sort();
      }
      function Fu(n2) {
        if (n2 instanceof H2)
          return n2.clone();
        var t = new Pn(n2.__wrapped__, n2.__chain__);
        return t.__actions__ = un2(n2.__actions__), t.__index__ = n2.__index__, t.__values__ = n2.__values__, t;
      }
      function _h(n2, t, e) {
        (e ? rn2(n2, t, e) : t === i) ? t = 1 : t = Q3(b3(t), 0);
        var r = n2 == null ? 0 : n2.length;
        if (!r || t < 1)
          return [];
        for (var s = 0, o = 0, f3 = p3(Ue2(r / t)); s < r; )
          f3[o++] = Cn(n2, s, s += t);
        return f3;
      }
      function mh(n2) {
        for (var t = -1, e = n2 == null ? 0 : n2.length, r = 0, s = []; ++t < e; ) {
          var o = n2[t];
          o && (s[r++] = o);
        }
        return s;
      }
      function wh() {
        var n2 = arguments.length;
        if (!n2)
          return [];
        for (var t = p3(n2 - 1), e = arguments[0], r = n2; r--; )
          t[r - 1] = arguments[r];
        return nt2(R2(e) ? un2(e) : [e], j2(t, 1));
      }
      var Ph = L2(function(n2, t) {
        return Z2(n2) ? ue2(n2, j2(t, 1, Z2, true)) : [];
      }), Ah = L2(function(n2, t) {
        var e = In(t);
        return Z2(e) && (e = i), Z2(n2) ? ue2(n2, j2(t, 1, Z2, true), x2(e, 2)) : [];
      }), Ch = L2(function(n2, t) {
        var e = In(t);
        return Z2(e) && (e = i), Z2(n2) ? ue2(n2, j2(t, 1, Z2, true), i, e) : [];
      });
      function Ih(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        return r ? (t = e || t === i ? 1 : b3(t), Cn(n2, t < 0 ? 0 : t, r)) : [];
      }
      function xh(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        return r ? (t = e || t === i ? 1 : b3(t), t = r - t, Cn(n2, 0, t < 0 ? 0 : t)) : [];
      }
      function Eh(n2, t) {
        return n2 && n2.length ? Ze2(n2, x2(t, 3), true, true) : [];
      }
      function yh(n2, t) {
        return n2 && n2.length ? Ze2(n2, x2(t, 3), true) : [];
      }
      function Sh(n2, t, e, r) {
        var s = n2 == null ? 0 : n2.length;
        return s ? (e && typeof e != "number" && rn2(n2, t, e) && (e = 0, r = s), wc(n2, t, e, r)) : [];
      }
      function Mu(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        if (!r)
          return -1;
        var s = e == null ? 0 : b3(e);
        return s < 0 && (s = Q3(r + s, 0)), ye(n2, x2(t, 3), s);
      }
      function qu(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        if (!r)
          return -1;
        var s = r - 1;
        return e !== i && (s = b3(e), s = e < 0 ? Q3(r + s, 0) : nn2(s, r - 1)), ye(n2, x2(t, 3), s, true);
      }
      function Bu(n2) {
        var t = n2 == null ? 0 : n2.length;
        return t ? j2(n2, 1) : [];
      }
      function Oh(n2) {
        var t = n2 == null ? 0 : n2.length;
        return t ? j2(n2, ht2) : [];
      }
      function Rh(n2, t) {
        var e = n2 == null ? 0 : n2.length;
        return e ? (t = t === i ? 1 : b3(t), j2(n2, t)) : [];
      }
      function bh(n2) {
        for (var t = -1, e = n2 == null ? 0 : n2.length, r = {}; ++t < e; ) {
          var s = n2[t];
          r[s[0]] = s[1];
        }
        return r;
      }
      function Gu(n2) {
        return n2 && n2.length ? n2[0] : i;
      }
      function Th(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        if (!r)
          return -1;
        var s = e == null ? 0 : b3(e);
        return s < 0 && (s = Q3(r + s, 0)), Tt2(n2, t, s);
      }
      function Lh(n2) {
        var t = n2 == null ? 0 : n2.length;
        return t ? Cn(n2, 0, -1) : [];
      }
      var Dh = L2(function(n2) {
        var t = G2(n2, ai);
        return t.length && t[0] === n2[0] ? Vr(t) : [];
      }), Hh = L2(function(n2) {
        var t = In(n2), e = G2(n2, ai);
        return t === In(e) ? t = i : e.pop(), e.length && e[0] === n2[0] ? Vr(e, x2(t, 2)) : [];
      }), Nh = L2(function(n2) {
        var t = In(n2), e = G2(n2, ai);
        return t = typeof t == "function" ? t : i, t && e.pop(), e.length && e[0] === n2[0] ? Vr(e, i, t) : [];
      });
      function $h(n2, t) {
        return n2 == null ? "" : Lf.call(n2, t);
      }
      function In(n2) {
        var t = n2 == null ? 0 : n2.length;
        return t ? n2[t - 1] : i;
      }
      function Uh(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        if (!r)
          return -1;
        var s = r;
        return e !== i && (s = b3(e), s = s < 0 ? Q3(r + s, 0) : nn2(s, r - 1)), t === t ? vf(n2, t, s) : ye(n2, Is2, s, true);
      }
      function Wh(n2, t) {
        return n2 && n2.length ? nu(n2, b3(t)) : i;
      }
      var Fh = L2(zu);
      function zu(n2, t) {
        return n2 && n2.length && t && t.length ? ti(n2, t) : n2;
      }
      function Mh(n2, t, e) {
        return n2 && n2.length && t && t.length ? ti(n2, t, x2(e, 2)) : n2;
      }
      function qh(n2, t, e) {
        return n2 && n2.length && t && t.length ? ti(n2, t, i, e) : n2;
      }
      var Bh = Yn(function(n2, t) {
        var e = n2 == null ? 0 : n2.length, r = Zr(n2, t);
        return ru(n2, G2(t, function(s) {
          return Zn(s, e) ? +s : s;
        }).sort(pu)), r;
      });
      function Gh(n2, t) {
        var e = [];
        if (!(n2 && n2.length))
          return e;
        var r = -1, s = [], o = n2.length;
        for (t = x2(t, 3); ++r < o; ) {
          var f3 = n2[r];
          t(f3, r, n2) && (e.push(f3), s.push(r));
        }
        return ru(n2, s), e;
      }
      function Ai(n2) {
        return n2 == null ? n2 : $f.call(n2);
      }
      function zh(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        return r ? (e && typeof e != "number" && rn2(n2, t, e) ? (t = 0, e = r) : (t = t == null ? 0 : b3(t), e = e === i ? r : b3(e)), Cn(n2, t, e)) : [];
      }
      function Kh(n2, t) {
        return Ye2(n2, t);
      }
      function Yh(n2, t, e) {
        return ii(n2, t, x2(e, 2));
      }
      function Zh(n2, t) {
        var e = n2 == null ? 0 : n2.length;
        if (e) {
          var r = Ye2(n2, t);
          if (r < e && bn(n2[r], t))
            return r;
        }
        return -1;
      }
      function Jh(n2, t) {
        return Ye2(n2, t, true);
      }
      function Xh(n2, t, e) {
        return ii(n2, t, x2(e, 2), true);
      }
      function Qh(n2, t) {
        var e = n2 == null ? 0 : n2.length;
        if (e) {
          var r = Ye2(n2, t, true) - 1;
          if (bn(n2[r], t))
            return r;
        }
        return -1;
      }
      function Vh(n2) {
        return n2 && n2.length ? su(n2) : [];
      }
      function kh(n2, t) {
        return n2 && n2.length ? su(n2, x2(t, 2)) : [];
      }
      function jh(n2) {
        var t = n2 == null ? 0 : n2.length;
        return t ? Cn(n2, 1, t) : [];
      }
      function nl(n2, t, e) {
        return n2 && n2.length ? (t = e || t === i ? 1 : b3(t), Cn(n2, 0, t < 0 ? 0 : t)) : [];
      }
      function tl(n2, t, e) {
        var r = n2 == null ? 0 : n2.length;
        return r ? (t = e || t === i ? 1 : b3(t), t = r - t, Cn(n2, t < 0 ? 0 : t, r)) : [];
      }
      function el(n2, t) {
        return n2 && n2.length ? Ze2(n2, x2(t, 3), false, true) : [];
      }
      function rl(n2, t) {
        return n2 && n2.length ? Ze2(n2, x2(t, 3)) : [];
      }
      var il = L2(function(n2) {
        return it2(j2(n2, 1, Z2, true));
      }), sl = L2(function(n2) {
        var t = In(n2);
        return Z2(t) && (t = i), it2(j2(n2, 1, Z2, true), x2(t, 2));
      }), ul = L2(function(n2) {
        var t = In(n2);
        return t = typeof t == "function" ? t : i, it2(j2(n2, 1, Z2, true), i, t);
      });
      function al(n2) {
        return n2 && n2.length ? it2(n2) : [];
      }
      function ol(n2, t) {
        return n2 && n2.length ? it2(n2, x2(t, 2)) : [];
      }
      function fl(n2, t) {
        return t = typeof t == "function" ? t : i, n2 && n2.length ? it2(n2, i, t) : [];
      }
      function Ci(n2) {
        if (!(n2 && n2.length))
          return [];
        var t = 0;
        return n2 = jn(n2, function(e) {
          if (Z2(e))
            return t = Q3(e.length, t), true;
        }), Fr2(t, function(e) {
          return G2(n2, $r2(e));
        });
      }
      function Ku(n2, t) {
        if (!(n2 && n2.length))
          return [];
        var e = Ci(n2);
        return t == null ? e : G2(e, function(r) {
          return cn2(t, i, r);
        });
      }
      var cl = L2(function(n2, t) {
        return Z2(n2) ? ue2(n2, t) : [];
      }), hl = L2(function(n2) {
        return ui(jn(n2, Z2));
      }), ll = L2(function(n2) {
        var t = In(n2);
        return Z2(t) && (t = i), ui(jn(n2, Z2), x2(t, 2));
      }), pl = L2(function(n2) {
        var t = In(n2);
        return t = typeof t == "function" ? t : i, ui(jn(n2, Z2), i, t);
      }), dl = L2(Ci);
      function gl(n2, t) {
        return fu(n2 || [], t || [], se);
      }
      function vl(n2, t) {
        return fu(n2 || [], t || [], fe);
      }
      var _l = L2(function(n2) {
        var t = n2.length, e = t > 1 ? n2[t - 1] : i;
        return e = typeof e == "function" ? (n2.pop(), e) : i, Ku(n2, e);
      });
      function Yu(n2) {
        var t = a3(n2);
        return t.__chain__ = true, t;
      }
      function ml(n2, t) {
        return t(n2), n2;
      }
      function er2(n2, t) {
        return t(n2);
      }
      var wl = Yn(function(n2) {
        var t = n2.length, e = t ? n2[0] : 0, r = this.__wrapped__, s = function(o) {
          return Zr(o, n2);
        };
        return t > 1 || this.__actions__.length || !(r instanceof H2) || !Zn(e) ? this.thru(s) : (r = r.slice(e, +e + (t ? 1 : 0)), r.__actions__.push({ func: er2, args: [s], thisArg: i }), new Pn(r, this.__chain__).thru(function(o) {
          return t && !o.length && o.push(i), o;
        }));
      });
      function Pl() {
        return Yu(this);
      }
      function Al() {
        return new Pn(this.value(), this.__chain__);
      }
      function Cl() {
        this.__values__ === i && (this.__values__ = ua(this.value()));
        var n2 = this.__index__ >= this.__values__.length, t = n2 ? i : this.__values__[this.__index__++];
        return { done: n2, value: t };
      }
      function Il() {
        return this;
      }
      function xl(n2) {
        for (var t, e = this; e instanceof qe2; ) {
          var r = Fu(e);
          r.__index__ = 0, r.__values__ = i, t ? s.__wrapped__ = r : t = r;
          var s = r;
          e = e.__wrapped__;
        }
        return s.__wrapped__ = n2, t;
      }
      function El() {
        var n2 = this.__wrapped__;
        if (n2 instanceof H2) {
          var t = n2;
          return this.__actions__.length && (t = new H2(this)), t = t.reverse(), t.__actions__.push({ func: er2, args: [Ai], thisArg: i }), new Pn(t, this.__chain__);
        }
        return this.thru(Ai);
      }
      function yl() {
        return ou(this.__wrapped__, this.__actions__);
      }
      var Sl = Je2(function(n2, t, e) {
        F2.call(n2, e) ? ++n2[e] : zn(n2, e, 1);
      });
      function Ol(n2, t, e) {
        var r = R2(n2) ? As2 : mc;
        return e && rn2(n2, t, e) && (t = i), r(n2, x2(t, 3));
      }
      function Rl(n2, t) {
        var e = R2(n2) ? jn : Ks2;
        return e(n2, x2(t, 3));
      }
      var bl = wu(Mu), Tl = wu(qu);
      function Ll(n2, t) {
        return j2(rr2(n2, t), 1);
      }
      function Dl(n2, t) {
        return j2(rr2(n2, t), ht2);
      }
      function Hl(n2, t, e) {
        return e = e === i ? 1 : b3(e), j2(rr2(n2, t), e);
      }
      function Zu(n2, t) {
        var e = R2(n2) ? mn2 : rt2;
        return e(n2, x2(t, 3));
      }
      function Ju(n2, t) {
        var e = R2(n2) ? ko : zs2;
        return e(n2, x2(t, 3));
      }
      var Nl = Je2(function(n2, t, e) {
        F2.call(n2, e) ? n2[e].push(t) : zn(n2, e, [t]);
      });
      function $l(n2, t, e, r) {
        n2 = an2(n2) ? n2 : Gt3(n2), e = e && !r ? b3(e) : 0;
        var s = n2.length;
        return e < 0 && (e = Q3(s + e, 0)), or2(n2) ? e <= s && n2.indexOf(t, e) > -1 : !!s && Tt2(n2, t, e) > -1;
      }
      var Ul = L2(function(n2, t, e) {
        var r = -1, s = typeof t == "function", o = an2(n2) ? p3(n2.length) : [];
        return rt2(n2, function(f3) {
          o[++r] = s ? cn2(t, f3, e) : ae2(f3, t, e);
        }), o;
      }), Wl = Je2(function(n2, t, e) {
        zn(n2, e, t);
      });
      function rr2(n2, t) {
        var e = R2(n2) ? G2 : Vs2;
        return e(n2, x2(t, 3));
      }
      function Fl(n2, t, e, r) {
        return n2 == null ? [] : (R2(t) || (t = t == null ? [] : [t]), e = r ? i : e, R2(e) || (e = e == null ? [] : [e]), tu(n2, t, e));
      }
      var Ml = Je2(function(n2, t, e) {
        n2[e ? 0 : 1].push(t);
      }, function() {
        return [[], []];
      });
      function ql(n2, t, e) {
        var r = R2(n2) ? Hr : Es2, s = arguments.length < 3;
        return r(n2, x2(t, 4), e, s, rt2);
      }
      function Bl(n2, t, e) {
        var r = R2(n2) ? jo : Es2, s = arguments.length < 3;
        return r(n2, x2(t, 4), e, s, zs2);
      }
      function Gl(n2, t) {
        var e = R2(n2) ? jn : Ks2;
        return e(n2, ur2(x2(t, 3)));
      }
      function zl(n2) {
        var t = R2(n2) ? Ms2 : $c;
        return t(n2);
      }
      function Kl(n2, t, e) {
        (e ? rn2(n2, t, e) : t === i) ? t = 1 : t = b3(t);
        var r = R2(n2) ? pc : Uc;
        return r(n2, t);
      }
      function Yl(n2) {
        var t = R2(n2) ? dc : Fc;
        return t(n2);
      }
      function Zl(n2) {
        if (n2 == null)
          return 0;
        if (an2(n2))
          return or2(n2) ? Dt2(n2) : n2.length;
        var t = tn2(n2);
        return t == yn2 || t == Sn ? n2.size : jr(n2).length;
      }
      function Jl(n2, t, e) {
        var r = R2(n2) ? Nr2 : Mc;
        return e && rn2(n2, t, e) && (t = i), r(n2, x2(t, 3));
      }
      var Xl = L2(function(n2, t) {
        if (n2 == null)
          return [];
        var e = t.length;
        return e > 1 && rn2(n2, t[0], t[1]) ? t = [] : e > 2 && rn2(t[0], t[1], t[2]) && (t = [t[0]]), tu(n2, j2(t, 1), []);
      }), ir2 = Rf || function() {
        return k2.Date.now();
      };
      function Ql(n2, t) {
        if (typeof t != "function")
          throw new wn($2);
        return n2 = b3(n2), function() {
          if (--n2 < 1)
            return t.apply(this, arguments);
        };
      }
      function Xu(n2, t, e) {
        return t = e ? i : t, t = n2 && t == null ? n2.length : t, Kn2(n2, Mn2, i, i, i, i, t);
      }
      function Qu(n2, t) {
        var e;
        if (typeof t != "function")
          throw new wn($2);
        return n2 = b3(n2), function() {
          return --n2 > 0 && (e = t.apply(this, arguments)), n2 <= 1 && (t = i), e;
        };
      }
      var Ii = L2(function(n2, t, e) {
        var r = vn2;
        if (e.length) {
          var s = tt2(e, qt3(Ii));
          r |= Hn2;
        }
        return Kn2(n2, r, t, e, s);
      }), Vu = L2(function(n2, t, e) {
        var r = vn2 | ct2;
        if (e.length) {
          var s = tt2(e, qt3(Vu));
          r |= Hn2;
        }
        return Kn2(t, r, n2, e, s);
      });
      function ku(n2, t, e) {
        t = e ? i : t;
        var r = Kn2(n2, Dn2, i, i, i, i, i, t);
        return r.placeholder = ku.placeholder, r;
      }
      function ju(n2, t, e) {
        t = e ? i : t;
        var r = Kn2(n2, yt2, i, i, i, i, i, t);
        return r.placeholder = ju.placeholder, r;
      }
      function na(n2, t, e) {
        var r, s, o, f3, c2, l2, v3 = 0, _3 = false, m2 = false, w3 = true;
        if (typeof n2 != "function")
          throw new wn($2);
        t = xn2(t) || 0, K3(e) && (_3 = !!e.leading, m2 = "maxWait" in e, o = m2 ? Q3(xn2(e.maxWait) || 0, t) : o, w3 = "trailing" in e ? !!e.trailing : w3);
        function I2(J2) {
          var Tn = r, Qn2 = s;
          return r = s = i, v3 = J2, f3 = n2.apply(Qn2, Tn), f3;
        }
        function E3(J2) {
          return v3 = J2, c2 = le2(D2, t), _3 ? I2(J2) : f3;
        }
        function T2(J2) {
          var Tn = J2 - l2, Qn2 = J2 - v3, wa = t - Tn;
          return m2 ? nn2(wa, o - Qn2) : wa;
        }
        function y3(J2) {
          var Tn = J2 - l2, Qn2 = J2 - v3;
          return l2 === i || Tn >= t || Tn < 0 || m2 && Qn2 >= o;
        }
        function D2() {
          var J2 = ir2();
          if (y3(J2))
            return N2(J2);
          c2 = le2(D2, T2(J2));
        }
        function N2(J2) {
          return c2 = i, w3 && r ? I2(J2) : (r = s = i, f3);
        }
        function dn2() {
          c2 !== i && cu(c2), v3 = 0, r = l2 = s = c2 = i;
        }
        function sn2() {
          return c2 === i ? f3 : N2(ir2());
        }
        function gn2() {
          var J2 = ir2(), Tn = y3(J2);
          if (r = arguments, s = this, l2 = J2, Tn) {
            if (c2 === i)
              return E3(l2);
            if (m2)
              return cu(c2), c2 = le2(D2, t), I2(l2);
          }
          return c2 === i && (c2 = le2(D2, t)), f3;
        }
        return gn2.cancel = dn2, gn2.flush = sn2, gn2;
      }
      var Vl = L2(function(n2, t) {
        return Gs2(n2, 1, t);
      }), kl = L2(function(n2, t, e) {
        return Gs2(n2, xn2(t) || 0, e);
      });
      function jl(n2) {
        return Kn2(n2, dr2);
      }
      function sr2(n2, t) {
        if (typeof n2 != "function" || t != null && typeof t != "function")
          throw new wn($2);
        var e = function() {
          var r = arguments, s = t ? t.apply(this, r) : r[0], o = e.cache;
          if (o.has(s))
            return o.get(s);
          var f3 = n2.apply(this, r);
          return e.cache = o.set(s, f3) || o, f3;
        };
        return e.cache = new (sr2.Cache || Gn2)(), e;
      }
      sr2.Cache = Gn2;
      function ur2(n2) {
        if (typeof n2 != "function")
          throw new wn($2);
        return function() {
          var t = arguments;
          switch (t.length) {
            case 0:
              return !n2.call(this);
            case 1:
              return !n2.call(this, t[0]);
            case 2:
              return !n2.call(this, t[0], t[1]);
            case 3:
              return !n2.call(this, t[0], t[1], t[2]);
          }
          return !n2.apply(this, t);
        };
      }
      function np(n2) {
        return Qu(2, n2);
      }
      var tp = qc(function(n2, t) {
        t = t.length == 1 && R2(t[0]) ? G2(t[0], hn2(x2())) : G2(j2(t, 1), hn2(x2()));
        var e = t.length;
        return L2(function(r) {
          for (var s = -1, o = nn2(r.length, e); ++s < o; )
            r[s] = t[s].call(this, r[s]);
          return cn2(n2, this, r);
        });
      }), xi = L2(function(n2, t) {
        var e = tt2(t, qt3(xi));
        return Kn2(n2, Hn2, i, t, e);
      }), ta = L2(function(n2, t) {
        var e = tt2(t, qt3(ta));
        return Kn2(n2, St2, i, t, e);
      }), ep = Yn(function(n2, t) {
        return Kn2(n2, Kt3, i, i, i, t);
      });
      function rp(n2, t) {
        if (typeof n2 != "function")
          throw new wn($2);
        return t = t === i ? t : b3(t), L2(n2, t);
      }
      function ip(n2, t) {
        if (typeof n2 != "function")
          throw new wn($2);
        return t = t == null ? 0 : Q3(b3(t), 0), L2(function(e) {
          var r = e[t], s = ut2(e, 0, t);
          return r && nt2(s, r), cn2(n2, this, s);
        });
      }
      function sp(n2, t, e) {
        var r = true, s = true;
        if (typeof n2 != "function")
          throw new wn($2);
        return K3(e) && (r = "leading" in e ? !!e.leading : r, s = "trailing" in e ? !!e.trailing : s), na(n2, t, { leading: r, maxWait: t, trailing: s });
      }
      function up(n2) {
        return Xu(n2, 1);
      }
      function ap(n2, t) {
        return xi(oi(t), n2);
      }
      function op() {
        if (!arguments.length)
          return [];
        var n2 = arguments[0];
        return R2(n2) ? n2 : [n2];
      }
      function fp(n2) {
        return An(n2, xt3);
      }
      function cp(n2, t) {
        return t = typeof t == "function" ? t : i, An(n2, xt3, t);
      }
      function hp(n2) {
        return An(n2, Ln2 | xt3);
      }
      function lp(n2, t) {
        return t = typeof t == "function" ? t : i, An(n2, Ln2 | xt3, t);
      }
      function pp(n2, t) {
        return t == null || Bs2(n2, t, V2(t));
      }
      function bn(n2, t) {
        return n2 === t || n2 !== n2 && t !== t;
      }
      var dp = ke2(Qr), gp = ke2(function(n2, t) {
        return n2 >= t;
      }), Pt2 = Js2(function() {
        return arguments;
      }()) ? Js2 : function(n2) {
        return Y(n2) && F2.call(n2, "callee") && !Hs2.call(n2, "callee");
      }, R2 = p3.isArray, vp = gs2 ? hn2(gs2) : xc;
      function an2(n2) {
        return n2 != null && ar2(n2.length) && !Jn2(n2);
      }
      function Z2(n2) {
        return Y(n2) && an2(n2);
      }
      function _p(n2) {
        return n2 === true || n2 === false || Y(n2) && en2(n2) == Yt2;
      }
      var at2 = Tf || Ni, mp = vs2 ? hn2(vs2) : Ec;
      function wp(n2) {
        return Y(n2) && n2.nodeType === 1 && !pe2(n2);
      }
      function Pp(n2) {
        if (n2 == null)
          return true;
        if (an2(n2) && (R2(n2) || typeof n2 == "string" || typeof n2.splice == "function" || at2(n2) || Bt3(n2) || Pt2(n2)))
          return !n2.length;
        var t = tn2(n2);
        if (t == yn2 || t == Sn)
          return !n2.size;
        if (he2(n2))
          return !jr(n2).length;
        for (var e in n2)
          if (F2.call(n2, e))
            return false;
        return true;
      }
      function Ap(n2, t) {
        return oe2(n2, t);
      }
      function Cp(n2, t, e) {
        e = typeof e == "function" ? e : i;
        var r = e ? e(n2, t) : i;
        return r === i ? oe2(n2, t, i, e) : !!r;
      }
      function Ei(n2) {
        if (!Y(n2))
          return false;
        var t = en2(n2);
        return t == we || t == Ga || typeof n2.message == "string" && typeof n2.name == "string" && !pe2(n2);
      }
      function Ip(n2) {
        return typeof n2 == "number" && $s2(n2);
      }
      function Jn2(n2) {
        if (!K3(n2))
          return false;
        var t = en2(n2);
        return t == Pe2 || t == Gi2 || t == Ba || t == Ka;
      }
      function ea(n2) {
        return typeof n2 == "number" && n2 == b3(n2);
      }
      function ar2(n2) {
        return typeof n2 == "number" && n2 > -1 && n2 % 1 == 0 && n2 <= kn2;
      }
      function K3(n2) {
        var t = typeof n2;
        return n2 != null && (t == "object" || t == "function");
      }
      function Y(n2) {
        return n2 != null && typeof n2 == "object";
      }
      var ra = _s2 ? hn2(_s2) : Sc;
      function xp(n2, t) {
        return n2 === t || kr(n2, t, gi(t));
      }
      function Ep(n2, t, e) {
        return e = typeof e == "function" ? e : i, kr(n2, t, gi(t), e);
      }
      function yp(n2) {
        return ia(n2) && n2 != +n2;
      }
      function Sp(n2) {
        if (ch(n2))
          throw new S2(O2);
        return Xs2(n2);
      }
      function Op(n2) {
        return n2 === null;
      }
      function Rp(n2) {
        return n2 == null;
      }
      function ia(n2) {
        return typeof n2 == "number" || Y(n2) && en2(n2) == Jt2;
      }
      function pe2(n2) {
        if (!Y(n2) || en2(n2) != qn2)
          return false;
        var t = He2(n2);
        if (t === null)
          return true;
        var e = F2.call(t, "constructor") && t.constructor;
        return typeof e == "function" && e instanceof e && be.call(e) == Ef;
      }
      var yi = ms2 ? hn2(ms2) : Oc;
      function bp(n2) {
        return ea(n2) && n2 >= -kn2 && n2 <= kn2;
      }
      var sa = ws2 ? hn2(ws2) : Rc;
      function or2(n2) {
        return typeof n2 == "string" || !R2(n2) && Y(n2) && en2(n2) == Qt2;
      }
      function pn2(n2) {
        return typeof n2 == "symbol" || Y(n2) && en2(n2) == Ae2;
      }
      var Bt3 = Ps2 ? hn2(Ps2) : bc;
      function Tp(n2) {
        return n2 === i;
      }
      function Lp(n2) {
        return Y(n2) && tn2(n2) == Vt2;
      }
      function Dp(n2) {
        return Y(n2) && en2(n2) == Za;
      }
      var Hp = ke2(ni), Np = ke2(function(n2, t) {
        return n2 <= t;
      });
      function ua(n2) {
        if (!n2)
          return [];
        if (an2(n2))
          return or2(n2) ? On(n2) : un2(n2);
        if (ne2 && n2[ne2])
          return pf(n2[ne2]());
        var t = tn2(n2), e = t == yn2 ? qr : t == Sn ? Se : Gt3;
        return e(n2);
      }
      function Xn2(n2) {
        if (!n2)
          return n2 === 0 ? n2 : 0;
        if (n2 = xn2(n2), n2 === ht2 || n2 === -ht2) {
          var t = n2 < 0 ? -1 : 1;
          return t * Wa;
        }
        return n2 === n2 ? n2 : 0;
      }
      function b3(n2) {
        var t = Xn2(n2), e = t % 1;
        return t === t ? e ? t - e : t : 0;
      }
      function aa(n2) {
        return n2 ? vt2(b3(n2), 0, Nn) : 0;
      }
      function xn2(n2) {
        if (typeof n2 == "number")
          return n2;
        if (pn2(n2))
          return _e2;
        if (K3(n2)) {
          var t = typeof n2.valueOf == "function" ? n2.valueOf() : n2;
          n2 = K3(t) ? t + "" : t;
        }
        if (typeof n2 != "string")
          return n2 === 0 ? n2 : +n2;
        n2 = ys2(n2);
        var e = go.test(n2);
        return e || _o.test(n2) ? Xo(n2.slice(2), e ? 2 : 8) : po.test(n2) ? _e2 : +n2;
      }
      function oa(n2) {
        return Un2(n2, on2(n2));
      }
      function $p(n2) {
        return n2 ? vt2(b3(n2), -kn2, kn2) : n2 === 0 ? n2 : 0;
      }
      function W2(n2) {
        return n2 == null ? "" : ln2(n2);
      }
      var Up = Ft3(function(n2, t) {
        if (he2(t) || an2(t)) {
          Un2(t, V2(t), n2);
          return;
        }
        for (var e in t)
          F2.call(t, e) && se(n2, e, t[e]);
      }), fa = Ft3(function(n2, t) {
        Un2(t, on2(t), n2);
      }), fr = Ft3(function(n2, t, e, r) {
        Un2(t, on2(t), n2, r);
      }), Wp = Ft3(function(n2, t, e, r) {
        Un2(t, V2(t), n2, r);
      }), Fp = Yn(Zr);
      function Mp(n2, t) {
        var e = Wt2(n2);
        return t == null ? e : qs2(e, t);
      }
      var qp = L2(function(n2, t) {
        n2 = M2(n2);
        var e = -1, r = t.length, s = r > 2 ? t[2] : i;
        for (s && rn2(t[0], t[1], s) && (r = 1); ++e < r; )
          for (var o = t[e], f3 = on2(o), c2 = -1, l2 = f3.length; ++c2 < l2; ) {
            var v3 = f3[c2], _3 = n2[v3];
            (_3 === i || bn(_3, Nt2[v3]) && !F2.call(n2, v3)) && (n2[v3] = o[v3]);
          }
        return n2;
      }), Bp = L2(function(n2) {
        return n2.push(i, yu), cn2(ca, i, n2);
      });
      function Gp(n2, t) {
        return Cs2(n2, x2(t, 3), $n);
      }
      function zp(n2, t) {
        return Cs2(n2, x2(t, 3), Xr);
      }
      function Kp(n2, t) {
        return n2 == null ? n2 : Jr(n2, x2(t, 3), on2);
      }
      function Yp(n2, t) {
        return n2 == null ? n2 : Ys2(n2, x2(t, 3), on2);
      }
      function Zp(n2, t) {
        return n2 && $n(n2, x2(t, 3));
      }
      function Jp(n2, t) {
        return n2 && Xr(n2, x2(t, 3));
      }
      function Xp(n2) {
        return n2 == null ? [] : ze2(n2, V2(n2));
      }
      function Qp(n2) {
        return n2 == null ? [] : ze2(n2, on2(n2));
      }
      function Si(n2, t, e) {
        var r = n2 == null ? i : _t2(n2, t);
        return r === i ? e : r;
      }
      function Vp(n2, t) {
        return n2 != null && Ru(n2, t, Pc);
      }
      function Oi(n2, t) {
        return n2 != null && Ru(n2, t, Ac);
      }
      var kp = Au(function(n2, t, e) {
        t != null && typeof t.toString != "function" && (t = Te2.call(t)), n2[t] = e;
      }, bi(fn2)), jp = Au(function(n2, t, e) {
        t != null && typeof t.toString != "function" && (t = Te2.call(t)), F2.call(n2, t) ? n2[t].push(e) : n2[t] = [e];
      }, x2), nd = L2(ae2);
      function V2(n2) {
        return an2(n2) ? Fs2(n2) : jr(n2);
      }
      function on2(n2) {
        return an2(n2) ? Fs2(n2, true) : Tc(n2);
      }
      function td(n2, t) {
        var e = {};
        return t = x2(t, 3), $n(n2, function(r, s, o) {
          zn(e, t(r, s, o), r);
        }), e;
      }
      function ed(n2, t) {
        var e = {};
        return t = x2(t, 3), $n(n2, function(r, s, o) {
          zn(e, s, t(r, s, o));
        }), e;
      }
      var rd = Ft3(function(n2, t, e) {
        Ke2(n2, t, e);
      }), ca = Ft3(function(n2, t, e, r) {
        Ke2(n2, t, e, r);
      }), id = Yn(function(n2, t) {
        var e = {};
        if (n2 == null)
          return e;
        var r = false;
        t = G2(t, function(o) {
          return o = st2(o, n2), r || (r = o.length > 1), o;
        }), Un2(n2, pi(n2), e), r && (e = An(e, Ln2 | Fn2 | xt3, kc));
        for (var s = t.length; s--; )
          si(e, t[s]);
        return e;
      });
      function sd(n2, t) {
        return ha(n2, ur2(x2(t)));
      }
      var ud = Yn(function(n2, t) {
        return n2 == null ? {} : Dc(n2, t);
      });
      function ha(n2, t) {
        if (n2 == null)
          return {};
        var e = G2(pi(n2), function(r) {
          return [r];
        });
        return t = x2(t), eu(n2, e, function(r, s) {
          return t(r, s[0]);
        });
      }
      function ad(n2, t, e) {
        t = st2(t, n2);
        var r = -1, s = t.length;
        for (s || (s = 1, n2 = i); ++r < s; ) {
          var o = n2 == null ? i : n2[Wn2(t[r])];
          o === i && (r = s, o = e), n2 = Jn2(o) ? o.call(n2) : o;
        }
        return n2;
      }
      function od(n2, t, e) {
        return n2 == null ? n2 : fe(n2, t, e);
      }
      function fd(n2, t, e, r) {
        return r = typeof r == "function" ? r : i, n2 == null ? n2 : fe(n2, t, e, r);
      }
      var la = xu(V2), pa = xu(on2);
      function cd(n2, t, e) {
        var r = R2(n2), s = r || at2(n2) || Bt3(n2);
        if (t = x2(t, 4), e == null) {
          var o = n2 && n2.constructor;
          s ? e = r ? new o() : [] : K3(n2) ? e = Jn2(o) ? Wt2(He2(n2)) : {} : e = {};
        }
        return (s ? mn2 : $n)(n2, function(f3, c2, l2) {
          return t(e, f3, c2, l2);
        }), e;
      }
      function hd(n2, t) {
        return n2 == null ? true : si(n2, t);
      }
      function ld(n2, t, e) {
        return n2 == null ? n2 : au(n2, t, oi(e));
      }
      function pd(n2, t, e, r) {
        return r = typeof r == "function" ? r : i, n2 == null ? n2 : au(n2, t, oi(e), r);
      }
      function Gt3(n2) {
        return n2 == null ? [] : Mr2(n2, V2(n2));
      }
      function dd(n2) {
        return n2 == null ? [] : Mr2(n2, on2(n2));
      }
      function gd(n2, t, e) {
        return e === i && (e = t, t = i), e !== i && (e = xn2(e), e = e === e ? e : 0), t !== i && (t = xn2(t), t = t === t ? t : 0), vt2(xn2(n2), t, e);
      }
      function vd(n2, t, e) {
        return t = Xn2(t), e === i ? (e = t, t = 0) : e = Xn2(e), n2 = xn2(n2), Cc(n2, t, e);
      }
      function _d(n2, t, e) {
        if (e && typeof e != "boolean" && rn2(n2, t, e) && (t = e = i), e === i && (typeof t == "boolean" ? (e = t, t = i) : typeof n2 == "boolean" && (e = n2, n2 = i)), n2 === i && t === i ? (n2 = 0, t = 1) : (n2 = Xn2(n2), t === i ? (t = n2, n2 = 0) : t = Xn2(t)), n2 > t) {
          var r = n2;
          n2 = t, t = r;
        }
        if (e || n2 % 1 || t % 1) {
          var s = Us2();
          return nn2(n2 + s * (t - n2 + Jo("1e-" + ((s + "").length - 1))), t);
        }
        return ei(n2, t);
      }
      var md = Mt2(function(n2, t, e) {
        return t = t.toLowerCase(), n2 + (e ? da(t) : t);
      });
      function da(n2) {
        return Ri(W2(n2).toLowerCase());
      }
      function ga(n2) {
        return n2 = W2(n2), n2 && n2.replace(wo, of).replace(Wo, "");
      }
      function wd(n2, t, e) {
        n2 = W2(n2), t = ln2(t);
        var r = n2.length;
        e = e === i ? r : vt2(b3(e), 0, r);
        var s = e;
        return e -= t.length, e >= 0 && n2.slice(e, s) == t;
      }
      function Pd(n2) {
        return n2 = W2(n2), n2 && ka.test(n2) ? n2.replace(Yi2, ff) : n2;
      }
      function Ad(n2) {
        return n2 = W2(n2), n2 && io.test(n2) ? n2.replace(xr2, "\\$&") : n2;
      }
      var Cd = Mt2(function(n2, t, e) {
        return n2 + (e ? "-" : "") + t.toLowerCase();
      }), Id = Mt2(function(n2, t, e) {
        return n2 + (e ? " " : "") + t.toLowerCase();
      }), xd = mu("toLowerCase");
      function Ed(n2, t, e) {
        n2 = W2(n2), t = b3(t);
        var r = t ? Dt2(n2) : 0;
        if (!t || r >= t)
          return n2;
        var s = (t - r) / 2;
        return Ve2(We2(s), e) + n2 + Ve2(Ue2(s), e);
      }
      function yd(n2, t, e) {
        n2 = W2(n2), t = b3(t);
        var r = t ? Dt2(n2) : 0;
        return t && r < t ? n2 + Ve2(t - r, e) : n2;
      }
      function Sd(n2, t, e) {
        n2 = W2(n2), t = b3(t);
        var r = t ? Dt2(n2) : 0;
        return t && r < t ? Ve2(t - r, e) + n2 : n2;
      }
      function Od(n2, t, e) {
        return e || t == null ? t = 0 : t && (t = +t), Nf(W2(n2).replace(Er, ""), t || 0);
      }
      function Rd(n2, t, e) {
        return (e ? rn2(n2, t, e) : t === i) ? t = 1 : t = b3(t), ri(W2(n2), t);
      }
      function bd() {
        var n2 = arguments, t = W2(n2[0]);
        return n2.length < 3 ? t : t.replace(n2[1], n2[2]);
      }
      var Td = Mt2(function(n2, t, e) {
        return n2 + (e ? "_" : "") + t.toLowerCase();
      });
      function Ld(n2, t, e) {
        return e && typeof e != "number" && rn2(n2, t, e) && (t = e = i), e = e === i ? Nn : e >>> 0, e ? (n2 = W2(n2), n2 && (typeof t == "string" || t != null && !yi(t)) && (t = ln2(t), !t && Lt2(n2)) ? ut2(On(n2), 0, e) : n2.split(t, e)) : [];
      }
      var Dd = Mt2(function(n2, t, e) {
        return n2 + (e ? " " : "") + Ri(t);
      });
      function Hd(n2, t, e) {
        return n2 = W2(n2), e = e == null ? 0 : vt2(b3(e), 0, n2.length), t = ln2(t), n2.slice(e, e + t.length) == t;
      }
      function Nd(n2, t, e) {
        var r = a3.templateSettings;
        e && rn2(n2, t, e) && (t = i), n2 = W2(n2), t = fr({}, t, r, Eu);
        var s = fr({}, t.imports, r.imports, Eu), o = V2(s), f3 = Mr2(s, o), c2, l2, v3 = 0, _3 = t.interpolate || Ce2, m2 = "__p += '", w3 = Br((t.escape || Ce2).source + "|" + _3.source + "|" + (_3 === Zi2 ? lo : Ce2).source + "|" + (t.evaluate || Ce2).source + "|$", "g"), I2 = "//# sourceURL=" + (F2.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Go + "]") + `
`;
        n2.replace(w3, function(y3, D2, N2, dn2, sn2, gn2) {
          return N2 || (N2 = dn2), m2 += n2.slice(v3, gn2).replace(Po, cf), D2 && (c2 = true, m2 += `' +
__e(` + D2 + `) +
'`), sn2 && (l2 = true, m2 += `';
` + sn2 + `;
__p += '`), N2 && (m2 += `' +
((__t = (` + N2 + `)) == null ? '' : __t) +
'`), v3 = gn2 + y3.length, y3;
        }), m2 += `';
`;
        var E3 = F2.call(t, "variable") && t.variable;
        if (!E3)
          m2 = `with (obj) {
` + m2 + `
}
`;
        else if (co.test(E3))
          throw new S2(En);
        m2 = (l2 ? m2.replace(Ja, "") : m2).replace(Xa, "$1").replace(Qa, "$1;"), m2 = "function(" + (E3 || "obj") + `) {
` + (E3 ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c2 ? ", __e = _.escape" : "") + (l2 ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + m2 + `return __p
}`;
        var T2 = _a(function() {
          return U2(o, I2 + "return " + m2).apply(i, f3);
        });
        if (T2.source = m2, Ei(T2))
          throw T2;
        return T2;
      }
      function $d(n2) {
        return W2(n2).toLowerCase();
      }
      function Ud(n2) {
        return W2(n2).toUpperCase();
      }
      function Wd(n2, t, e) {
        if (n2 = W2(n2), n2 && (e || t === i))
          return ys2(n2);
        if (!n2 || !(t = ln2(t)))
          return n2;
        var r = On(n2), s = On(t), o = Ss2(r, s), f3 = Os2(r, s) + 1;
        return ut2(r, o, f3).join("");
      }
      function Fd(n2, t, e) {
        if (n2 = W2(n2), n2 && (e || t === i))
          return n2.slice(0, bs2(n2) + 1);
        if (!n2 || !(t = ln2(t)))
          return n2;
        var r = On(n2), s = Os2(r, On(t)) + 1;
        return ut2(r, 0, s).join("");
      }
      function Md(n2, t, e) {
        if (n2 = W2(n2), n2 && (e || t === i))
          return n2.replace(Er, "");
        if (!n2 || !(t = ln2(t)))
          return n2;
        var r = On(n2), s = Ss2(r, On(t));
        return ut2(r, s).join("");
      }
      function qd(n2, t) {
        var e = La, r = Da;
        if (K3(t)) {
          var s = "separator" in t ? t.separator : s;
          e = "length" in t ? b3(t.length) : e, r = "omission" in t ? ln2(t.omission) : r;
        }
        n2 = W2(n2);
        var o = n2.length;
        if (Lt2(n2)) {
          var f3 = On(n2);
          o = f3.length;
        }
        if (e >= o)
          return n2;
        var c2 = e - Dt2(r);
        if (c2 < 1)
          return r;
        var l2 = f3 ? ut2(f3, 0, c2).join("") : n2.slice(0, c2);
        if (s === i)
          return l2 + r;
        if (f3 && (c2 += l2.length - c2), yi(s)) {
          if (n2.slice(c2).search(s)) {
            var v3, _3 = l2;
            for (s.global || (s = Br(s.source, W2(Ji2.exec(s)) + "g")), s.lastIndex = 0; v3 = s.exec(_3); )
              var m2 = v3.index;
            l2 = l2.slice(0, m2 === i ? c2 : m2);
          }
        } else if (n2.indexOf(ln2(s), c2) != c2) {
          var w3 = l2.lastIndexOf(s);
          w3 > -1 && (l2 = l2.slice(0, w3));
        }
        return l2 + r;
      }
      function Bd(n2) {
        return n2 = W2(n2), n2 && Va.test(n2) ? n2.replace(Ki, _f) : n2;
      }
      var Gd = Mt2(function(n2, t, e) {
        return n2 + (e ? " " : "") + t.toUpperCase();
      }), Ri = mu("toUpperCase");
      function va(n2, t, e) {
        return n2 = W2(n2), t = e ? i : t, t === i ? lf(n2) ? Pf(n2) : ef(n2) : n2.match(t) || [];
      }
      var _a = L2(function(n2, t) {
        try {
          return cn2(n2, i, t);
        } catch (e) {
          return Ei(e) ? e : new S2(e);
        }
      }), zd = Yn(function(n2, t) {
        return mn2(t, function(e) {
          e = Wn2(e), zn(n2, e, Ii(n2[e], n2));
        }), n2;
      });
      function Kd(n2) {
        var t = n2 == null ? 0 : n2.length, e = x2();
        return n2 = t ? G2(n2, function(r) {
          if (typeof r[1] != "function")
            throw new wn($2);
          return [e(r[0]), r[1]];
        }) : [], L2(function(r) {
          for (var s = -1; ++s < t; ) {
            var o = n2[s];
            if (cn2(o[0], this, r))
              return cn2(o[1], this, r);
          }
        });
      }
      function Yd(n2) {
        return _c(An(n2, Ln2));
      }
      function bi(n2) {
        return function() {
          return n2;
        };
      }
      function Zd(n2, t) {
        return n2 == null || n2 !== n2 ? t : n2;
      }
      var Jd = Pu(), Xd = Pu(true);
      function fn2(n2) {
        return n2;
      }
      function Ti(n2) {
        return Qs2(typeof n2 == "function" ? n2 : An(n2, Ln2));
      }
      function Qd(n2) {
        return ks2(An(n2, Ln2));
      }
      function Vd(n2, t) {
        return js2(n2, An(t, Ln2));
      }
      var kd = L2(function(n2, t) {
        return function(e) {
          return ae2(e, n2, t);
        };
      }), jd = L2(function(n2, t) {
        return function(e) {
          return ae2(n2, e, t);
        };
      });
      function Li(n2, t, e) {
        var r = V2(t), s = ze2(t, r);
        e == null && !(K3(t) && (s.length || !r.length)) && (e = t, t = n2, n2 = this, s = ze2(t, V2(t)));
        var o = !(K3(e) && "chain" in e) || !!e.chain, f3 = Jn2(n2);
        return mn2(s, function(c2) {
          var l2 = t[c2];
          n2[c2] = l2, f3 && (n2.prototype[c2] = function() {
            var v3 = this.__chain__;
            if (o || v3) {
              var _3 = n2(this.__wrapped__), m2 = _3.__actions__ = un2(this.__actions__);
              return m2.push({ func: l2, args: arguments, thisArg: n2 }), _3.__chain__ = v3, _3;
            }
            return l2.apply(n2, nt2([this.value()], arguments));
          });
        }), n2;
      }
      function ng() {
        return k2._ === this && (k2._ = yf), this;
      }
      function Di() {
      }
      function tg(n2) {
        return n2 = b3(n2), L2(function(t) {
          return nu(t, n2);
        });
      }
      var eg = ci(G2), rg = ci(As2), ig = ci(Nr2);
      function ma(n2) {
        return _i(n2) ? $r2(Wn2(n2)) : Hc(n2);
      }
      function sg(n2) {
        return function(t) {
          return n2 == null ? i : _t2(n2, t);
        };
      }
      var ug = Cu(), ag = Cu(true);
      function Hi2() {
        return [];
      }
      function Ni() {
        return false;
      }
      function og() {
        return {};
      }
      function fg() {
        return "";
      }
      function cg() {
        return true;
      }
      function hg(n2, t) {
        if (n2 = b3(n2), n2 < 1 || n2 > kn2)
          return [];
        var e = Nn, r = nn2(n2, Nn);
        t = x2(t), n2 -= Nn;
        for (var s = Fr2(r, t); ++e < n2; )
          t(e);
        return s;
      }
      function lg(n2) {
        return R2(n2) ? G2(n2, Wn2) : pn2(n2) ? [n2] : un2(Wu(W2(n2)));
      }
      function pg(n2) {
        var t = ++xf;
        return W2(n2) + t;
      }
      var dg = Qe2(function(n2, t) {
        return n2 + t;
      }, 0), gg = hi("ceil"), vg = Qe2(function(n2, t) {
        return n2 / t;
      }, 1), _g = hi("floor");
      function mg(n2) {
        return n2 && n2.length ? Ge2(n2, fn2, Qr) : i;
      }
      function wg(n2, t) {
        return n2 && n2.length ? Ge2(n2, x2(t, 2), Qr) : i;
      }
      function Pg(n2) {
        return xs2(n2, fn2);
      }
      function Ag(n2, t) {
        return xs2(n2, x2(t, 2));
      }
      function Cg(n2) {
        return n2 && n2.length ? Ge2(n2, fn2, ni) : i;
      }
      function Ig(n2, t) {
        return n2 && n2.length ? Ge2(n2, x2(t, 2), ni) : i;
      }
      var xg = Qe2(function(n2, t) {
        return n2 * t;
      }, 1), Eg = hi("round"), yg = Qe2(function(n2, t) {
        return n2 - t;
      }, 0);
      function Sg(n2) {
        return n2 && n2.length ? Wr(n2, fn2) : 0;
      }
      function Og(n2, t) {
        return n2 && n2.length ? Wr(n2, x2(t, 2)) : 0;
      }
      return a3.after = Ql, a3.ary = Xu, a3.assign = Up, a3.assignIn = fa, a3.assignInWith = fr, a3.assignWith = Wp, a3.at = Fp, a3.before = Qu, a3.bind = Ii, a3.bindAll = zd, a3.bindKey = Vu, a3.castArray = op, a3.chain = Yu, a3.chunk = _h, a3.compact = mh, a3.concat = wh, a3.cond = Kd, a3.conforms = Yd, a3.constant = bi, a3.countBy = Sl, a3.create = Mp, a3.curry = ku, a3.curryRight = ju, a3.debounce = na, a3.defaults = qp, a3.defaultsDeep = Bp, a3.defer = Vl, a3.delay = kl, a3.difference = Ph, a3.differenceBy = Ah, a3.differenceWith = Ch, a3.drop = Ih, a3.dropRight = xh, a3.dropRightWhile = Eh, a3.dropWhile = yh, a3.fill = Sh, a3.filter = Rl, a3.flatMap = Ll, a3.flatMapDeep = Dl, a3.flatMapDepth = Hl, a3.flatten = Bu, a3.flattenDeep = Oh, a3.flattenDepth = Rh, a3.flip = jl, a3.flow = Jd, a3.flowRight = Xd, a3.fromPairs = bh, a3.functions = Xp, a3.functionsIn = Qp, a3.groupBy = Nl, a3.initial = Lh, a3.intersection = Dh, a3.intersectionBy = Hh, a3.intersectionWith = Nh, a3.invert = kp, a3.invertBy = jp, a3.invokeMap = Ul, a3.iteratee = Ti, a3.keyBy = Wl, a3.keys = V2, a3.keysIn = on2, a3.map = rr2, a3.mapKeys = td, a3.mapValues = ed, a3.matches = Qd, a3.matchesProperty = Vd, a3.memoize = sr2, a3.merge = rd, a3.mergeWith = ca, a3.method = kd, a3.methodOf = jd, a3.mixin = Li, a3.negate = ur2, a3.nthArg = tg, a3.omit = id, a3.omitBy = sd, a3.once = np, a3.orderBy = Fl, a3.over = eg, a3.overArgs = tp, a3.overEvery = rg, a3.overSome = ig, a3.partial = xi, a3.partialRight = ta, a3.partition = Ml, a3.pick = ud, a3.pickBy = ha, a3.property = ma, a3.propertyOf = sg, a3.pull = Fh, a3.pullAll = zu, a3.pullAllBy = Mh, a3.pullAllWith = qh, a3.pullAt = Bh, a3.range = ug, a3.rangeRight = ag, a3.rearg = ep, a3.reject = Gl, a3.remove = Gh, a3.rest = rp, a3.reverse = Ai, a3.sampleSize = Kl, a3.set = od, a3.setWith = fd, a3.shuffle = Yl, a3.slice = zh, a3.sortBy = Xl, a3.sortedUniq = Vh, a3.sortedUniqBy = kh, a3.split = Ld, a3.spread = ip, a3.tail = jh, a3.take = nl, a3.takeRight = tl, a3.takeRightWhile = el, a3.takeWhile = rl, a3.tap = ml, a3.throttle = sp, a3.thru = er2, a3.toArray = ua, a3.toPairs = la, a3.toPairsIn = pa, a3.toPath = lg, a3.toPlainObject = oa, a3.transform = cd, a3.unary = up, a3.union = il, a3.unionBy = sl, a3.unionWith = ul, a3.uniq = al, a3.uniqBy = ol, a3.uniqWith = fl, a3.unset = hd, a3.unzip = Ci, a3.unzipWith = Ku, a3.update = ld, a3.updateWith = pd, a3.values = Gt3, a3.valuesIn = dd, a3.without = cl, a3.words = va, a3.wrap = ap, a3.xor = hl, a3.xorBy = ll, a3.xorWith = pl, a3.zip = dl, a3.zipObject = gl, a3.zipObjectDeep = vl, a3.zipWith = _l, a3.entries = la, a3.entriesIn = pa, a3.extend = fa, a3.extendWith = fr, Li(a3, a3), a3.add = dg, a3.attempt = _a, a3.camelCase = md, a3.capitalize = da, a3.ceil = gg, a3.clamp = gd, a3.clone = fp, a3.cloneDeep = hp, a3.cloneDeepWith = lp, a3.cloneWith = cp, a3.conformsTo = pp, a3.deburr = ga, a3.defaultTo = Zd, a3.divide = vg, a3.endsWith = wd, a3.eq = bn, a3.escape = Pd, a3.escapeRegExp = Ad, a3.every = Ol, a3.find = bl, a3.findIndex = Mu, a3.findKey = Gp, a3.findLast = Tl, a3.findLastIndex = qu, a3.findLastKey = zp, a3.floor = _g, a3.forEach = Zu, a3.forEachRight = Ju, a3.forIn = Kp, a3.forInRight = Yp, a3.forOwn = Zp, a3.forOwnRight = Jp, a3.get = Si, a3.gt = dp, a3.gte = gp, a3.has = Vp, a3.hasIn = Oi, a3.head = Gu, a3.identity = fn2, a3.includes = $l, a3.indexOf = Th, a3.inRange = vd, a3.invoke = nd, a3.isArguments = Pt2, a3.isArray = R2, a3.isArrayBuffer = vp, a3.isArrayLike = an2, a3.isArrayLikeObject = Z2, a3.isBoolean = _p, a3.isBuffer = at2, a3.isDate = mp, a3.isElement = wp, a3.isEmpty = Pp, a3.isEqual = Ap, a3.isEqualWith = Cp, a3.isError = Ei, a3.isFinite = Ip, a3.isFunction = Jn2, a3.isInteger = ea, a3.isLength = ar2, a3.isMap = ra, a3.isMatch = xp, a3.isMatchWith = Ep, a3.isNaN = yp, a3.isNative = Sp, a3.isNil = Rp, a3.isNull = Op, a3.isNumber = ia, a3.isObject = K3, a3.isObjectLike = Y, a3.isPlainObject = pe2, a3.isRegExp = yi, a3.isSafeInteger = bp, a3.isSet = sa, a3.isString = or2, a3.isSymbol = pn2, a3.isTypedArray = Bt3, a3.isUndefined = Tp, a3.isWeakMap = Lp, a3.isWeakSet = Dp, a3.join = $h, a3.kebabCase = Cd, a3.last = In, a3.lastIndexOf = Uh, a3.lowerCase = Id, a3.lowerFirst = xd, a3.lt = Hp, a3.lte = Np, a3.max = mg, a3.maxBy = wg, a3.mean = Pg, a3.meanBy = Ag, a3.min = Cg, a3.minBy = Ig, a3.stubArray = Hi2, a3.stubFalse = Ni, a3.stubObject = og, a3.stubString = fg, a3.stubTrue = cg, a3.multiply = xg, a3.nth = Wh, a3.noConflict = ng, a3.noop = Di, a3.now = ir2, a3.pad = Ed, a3.padEnd = yd, a3.padStart = Sd, a3.parseInt = Od, a3.random = _d, a3.reduce = ql, a3.reduceRight = Bl, a3.repeat = Rd, a3.replace = bd, a3.result = ad, a3.round = Eg, a3.runInContext = h4, a3.sample = zl, a3.size = Zl, a3.snakeCase = Td, a3.some = Jl, a3.sortedIndex = Kh, a3.sortedIndexBy = Yh, a3.sortedIndexOf = Zh, a3.sortedLastIndex = Jh, a3.sortedLastIndexBy = Xh, a3.sortedLastIndexOf = Qh, a3.startCase = Dd, a3.startsWith = Hd, a3.subtract = yg, a3.sum = Sg, a3.sumBy = Og, a3.template = Nd, a3.times = hg, a3.toFinite = Xn2, a3.toInteger = b3, a3.toLength = aa, a3.toLower = $d, a3.toNumber = xn2, a3.toSafeInteger = $p, a3.toString = W2, a3.toUpper = Ud, a3.trim = Wd, a3.trimEnd = Fd, a3.trimStart = Md, a3.truncate = qd, a3.unescape = Bd, a3.uniqueId = pg, a3.upperCase = Gd, a3.upperFirst = Ri, a3.each = Zu, a3.eachRight = Ju, a3.first = Gu, Li(a3, function() {
        var n2 = {};
        return $n(a3, function(t, e) {
          F2.call(a3.prototype, e) || (n2[e] = t);
        }), n2;
      }(), { chain: false }), a3.VERSION = d2, mn2(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n2) {
        a3[n2].placeholder = a3;
      }), mn2(["drop", "take"], function(n2, t) {
        H2.prototype[n2] = function(e) {
          e = e === i ? 1 : Q3(b3(e), 0);
          var r = this.__filtered__ && !t ? new H2(this) : this.clone();
          return r.__filtered__ ? r.__takeCount__ = nn2(e, r.__takeCount__) : r.__views__.push({ size: nn2(e, Nn), type: n2 + (r.__dir__ < 0 ? "Right" : "") }), r;
        }, H2.prototype[n2 + "Right"] = function(e) {
          return this.reverse()[n2](e).reverse();
        };
      }), mn2(["filter", "map", "takeWhile"], function(n2, t) {
        var e = t + 1, r = e == Bi || e == Ua;
        H2.prototype[n2] = function(s) {
          var o = this.clone();
          return o.__iteratees__.push({ iteratee: x2(s, 3), type: e }), o.__filtered__ = o.__filtered__ || r, o;
        };
      }), mn2(["head", "last"], function(n2, t) {
        var e = "take" + (t ? "Right" : "");
        H2.prototype[n2] = function() {
          return this[e](1).value()[0];
        };
      }), mn2(["initial", "tail"], function(n2, t) {
        var e = "drop" + (t ? "" : "Right");
        H2.prototype[n2] = function() {
          return this.__filtered__ ? new H2(this) : this[e](1);
        };
      }), H2.prototype.compact = function() {
        return this.filter(fn2);
      }, H2.prototype.find = function(n2) {
        return this.filter(n2).head();
      }, H2.prototype.findLast = function(n2) {
        return this.reverse().find(n2);
      }, H2.prototype.invokeMap = L2(function(n2, t) {
        return typeof n2 == "function" ? new H2(this) : this.map(function(e) {
          return ae2(e, n2, t);
        });
      }), H2.prototype.reject = function(n2) {
        return this.filter(ur2(x2(n2)));
      }, H2.prototype.slice = function(n2, t) {
        n2 = b3(n2);
        var e = this;
        return e.__filtered__ && (n2 > 0 || t < 0) ? new H2(e) : (n2 < 0 ? e = e.takeRight(-n2) : n2 && (e = e.drop(n2)), t !== i && (t = b3(t), e = t < 0 ? e.dropRight(-t) : e.take(t - n2)), e);
      }, H2.prototype.takeRightWhile = function(n2) {
        return this.reverse().takeWhile(n2).reverse();
      }, H2.prototype.toArray = function() {
        return this.take(Nn);
      }, $n(H2.prototype, function(n2, t) {
        var e = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), s = a3[r ? "take" + (t == "last" ? "Right" : "") : t], o = r || /^find/.test(t);
        s && (a3.prototype[t] = function() {
          var f3 = this.__wrapped__, c2 = r ? [1] : arguments, l2 = f3 instanceof H2, v3 = c2[0], _3 = l2 || R2(f3), m2 = function(D2) {
            var N2 = s.apply(a3, nt2([D2], c2));
            return r && w3 ? N2[0] : N2;
          };
          _3 && e && typeof v3 == "function" && v3.length != 1 && (l2 = _3 = false);
          var w3 = this.__chain__, I2 = !!this.__actions__.length, E3 = o && !w3, T2 = l2 && !I2;
          if (!o && _3) {
            f3 = T2 ? f3 : new H2(this);
            var y3 = n2.apply(f3, c2);
            return y3.__actions__.push({ func: er2, args: [m2], thisArg: i }), new Pn(y3, w3);
          }
          return E3 && T2 ? n2.apply(this, c2) : (y3 = this.thru(m2), E3 ? r ? y3.value()[0] : y3.value() : y3);
        });
      }), mn2(["pop", "push", "shift", "sort", "splice", "unshift"], function(n2) {
        var t = Oe[n2], e = /^(?:push|sort|unshift)$/.test(n2) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n2);
        a3.prototype[n2] = function() {
          var s = arguments;
          if (r && !this.__chain__) {
            var o = this.value();
            return t.apply(R2(o) ? o : [], s);
          }
          return this[e](function(f3) {
            return t.apply(R2(f3) ? f3 : [], s);
          });
        };
      }), $n(H2.prototype, function(n2, t) {
        var e = a3[t];
        if (e) {
          var r = e.name + "";
          F2.call(Ut2, r) || (Ut2[r] = []), Ut2[r].push({ name: t, func: e });
        }
      }), Ut2[Xe2(i, ct2).name] = [{ name: "wrapper", func: i }], H2.prototype.clone = Bf, H2.prototype.reverse = Gf, H2.prototype.value = zf, a3.prototype.at = wl, a3.prototype.chain = Pl, a3.prototype.commit = Al, a3.prototype.next = Cl, a3.prototype.plant = xl, a3.prototype.reverse = El, a3.prototype.toJSON = a3.prototype.valueOf = a3.prototype.value = yl, a3.prototype.first = a3.prototype.head, ne2 && (a3.prototype[ne2] = Il), a3;
    }, Ht2 = Af();
    lt2 ? ((lt2.exports = Ht2)._ = Ht2, Tr2._ = Ht2) : k2._ = Ht2;
  }).call(ge);
})(Ui, Ui.exports);
var Bg = Object.defineProperty, Gg = Object.defineProperties, zg = Object.getOwnPropertyDescriptors, Ea = Object.getOwnPropertySymbols, Kg = Object.prototype.hasOwnProperty, Yg = Object.prototype.propertyIsEnumerable, ya = (C2, u3, i) => u3 in C2 ? Bg(C2, u3, { enumerable: true, configurable: true, writable: true, value: i }) : C2[u3] = i, cr = (C2, u3) => {
  for (var i in u3 || (u3 = {}))
    Kg.call(u3, i) && ya(C2, i, u3[i]);
  if (Ea)
    for (var i of Ea(u3))
      Yg.call(u3, i) && ya(C2, i, u3[i]);
  return C2;
}, Zg = (C2, u3) => Gg(C2, zg(u3));
function ft(C2, u3, i) {
  var d2;
  const P2 = ve(C2);
  return ((d2 = u3.rpcMap) == null ? void 0 : d2[P2.reference]) || `${qg}?chainId=${P2.namespace}:${P2.reference}&projectId=${i}`;
}
function Ct(C2) {
  return C2.includes(":") ? C2.split(":")[1] : C2;
}
function Sa(C2) {
  return C2.map((u3) => `${u3.split(":")[0]}:${u3.split(":")[1]}`);
}
function Jg(C2, u3) {
  const i = Object.keys(u3.namespaces).filter((P2) => P2.includes(C2));
  if (!i.length)
    return [];
  const d2 = [];
  return i.forEach((P2) => {
    const O2 = u3.namespaces[P2].accounts;
    d2.push(...O2);
  }), d2;
}
function Xg(C2 = {}, u3 = {}) {
  const i = Oa(C2), d2 = Oa(u3);
  return Ui.exports.merge(i, d2);
}
function Oa(C2) {
  var u3, i, d2, P2;
  const O2 = {};
  if (!B(C2))
    return O2;
  for (const [$2, En] of Object.entries(C2)) {
    const zt2 = oe($2) ? [$2] : En.chains, pr2 = En.methods || [], It2 = En.events || [], Ln2 = En.rpcMap || {}, Fn2 = en($2);
    O2[Fn2] = Zg(cr(cr({}, O2[Fn2]), En), { chains: S$1(zt2, (u3 = O2[Fn2]) == null ? void 0 : u3.chains), methods: S$1(pr2, (i = O2[Fn2]) == null ? void 0 : i.methods), events: S$1(It2, (d2 = O2[Fn2]) == null ? void 0 : d2.events), rpcMap: cr(cr({}, Ln2), (P2 = O2[Fn2]) == null ? void 0 : P2.rpcMap) });
  }
  return O2;
}
function Qg(C2) {
  return C2.includes(":") ? C2.split(":")[2] : C2;
}
function Vg(C2) {
  const u3 = {};
  for (const [i, d2] of Object.entries(C2)) {
    const P2 = d2.methods || [], O2 = d2.events || [], $2 = d2.accounts || [], En = oe(i) ? [i] : d2.chains ? d2.chains : Sa(d2.accounts);
    u3[i] = { chains: En, methods: P2, events: O2, accounts: $2 };
  }
  return u3;
}
function Wi(C2) {
  return typeof C2 == "number" ? C2 : C2.includes("0x") ? parseInt(C2, 16) : C2.includes(":") ? Number(C2.split(":")[1]) : Number(C2);
}
const Ra = {}, z = (C2) => Ra[C2], Fi = (C2, u3) => {
  Ra[C2] = u3;
};
class kg {
  constructor(u3) {
    this.name = "polkadot", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${u3}`);
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class jg {
  constructor(u3) {
    this.name = "eip155", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
  }
  async request(u3) {
    switch (u3.request.method) {
      case "eth_requestAccounts":
        return this.getAccounts();
      case "eth_accounts":
        return this.getAccounts();
      case "wallet_switchEthereumChain":
        return await this.handleSwitchChain(u3);
      case "eth_chainId":
        return parseInt(this.getDefaultChain());
    }
    return this.namespace.methods.includes(u3.request.method) ? await this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(parseInt(u3), i), this.chainId = parseInt(u3), this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${u3}`);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId.toString();
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(`${this.name}:${u3}`, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = parseInt(Ct(i));
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  getHttpProvider() {
    const u3 = this.chainId, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  async handleSwitchChain(u3) {
    var i, d2;
    let P2 = u3.request.params ? (i = u3.request.params[0]) == null ? void 0 : i.chainId : "0x0";
    P2 = P2.startsWith("0x") ? P2 : `0x${P2}`;
    const O2 = parseInt(P2, 16);
    if (this.isChainApproved(O2))
      this.setDefaultChain(`${O2}`);
    else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
      await this.client.request({ topic: u3.topic, request: { method: u3.request.method, params: [{ chainId: P2 }] }, chainId: (d2 = this.namespace.chains) == null ? void 0 : d2[0] }), this.setDefaultChain(`${O2}`);
    else
      throw new Error(`Failed to switch to chain 'eip155:${O2}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
    return null;
  }
  isChainApproved(u3) {
    return this.namespace.chains.includes(`${this.name}:${u3}`);
  }
}
class nv {
  constructor(u3) {
    this.name = "solana", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${u3}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class tv {
  constructor(u3) {
    this.name = "cosmos", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class ev {
  constructor(u3) {
    this.name = "cip34", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      const d2 = this.getCardanoRPCUrl(i), P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, d2);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  getCardanoRPCUrl(u3) {
    const i = this.namespace.rpcMap;
    if (i)
      return i[u3];
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || this.getCardanoRPCUrl(u3);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class rv {
  constructor(u3) {
    this.name = "elrond", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${u3}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class iv {
  constructor(u3) {
    this.name = "multiversx", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    this.httpProviders[u3] || this.setHttpProvider(u3, i), this.chainId = u3, this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${u3}`);
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? [...new Set(u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      const P2 = Ct(i);
      u3[P2] = this.createHttpProvider(P2, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace, this.client.core.projectId);
    if (!d2)
      throw new Error(`No RPC url provided for chainId: ${u3}`);
    return new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
class sv {
  constructor(u3) {
    this.name = "near", this.namespace = u3.namespace, this.events = z("events"), this.client = z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
  }
  updateNamespace(u3) {
    this.namespace = Object.assign(this.namespace, u3);
  }
  requestAccounts() {
    return this.getAccounts();
  }
  getDefaultChain() {
    if (this.chainId)
      return this.chainId;
    if (this.namespace.defaultChain)
      return this.namespace.defaultChain;
    const u3 = this.namespace.chains[0];
    if (!u3)
      throw new Error("ChainId not found");
    return u3.split(":")[1];
  }
  request(u3) {
    return this.namespace.methods.includes(u3.request.method) ? this.client.request(u3) : this.getHttpProvider().request(u3.request);
  }
  setDefaultChain(u3, i) {
    if (this.chainId = u3, !this.httpProviders[u3]) {
      const d2 = i || ft(`${this.name}:${u3}`, this.namespace);
      if (!d2)
        throw new Error(`No RPC url provided for chainId: ${u3}`);
      this.setHttpProvider(u3, d2);
    }
    this.events.emit(Vn.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
  }
  getAccounts() {
    const u3 = this.namespace.accounts;
    return u3 ? u3.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]) || [] : [];
  }
  createHttpProviders() {
    const u3 = {};
    return this.namespace.chains.forEach((i) => {
      var d2;
      u3[i] = this.createHttpProvider(i, (d2 = this.namespace.rpcMap) == null ? void 0 : d2[i]);
    }), u3;
  }
  getHttpProvider() {
    const u3 = `${this.name}:${this.chainId}`, i = this.httpProviders[u3];
    if (typeof i > "u")
      throw new Error(`JSON-RPC provider for ${u3} not found`);
    return i;
  }
  setHttpProvider(u3, i) {
    const d2 = this.createHttpProvider(u3, i);
    d2 && (this.httpProviders[u3] = d2);
  }
  createHttpProvider(u3, i) {
    const d2 = i || ft(u3, this.namespace);
    return typeof d2 > "u" ? void 0 : new JsonRpcProvider(new HttpConnection(d2, z("disableProviderPing")));
  }
}
var uv = Object.defineProperty, av = Object.defineProperties, ov = Object.getOwnPropertyDescriptors, ba = Object.getOwnPropertySymbols, fv = Object.prototype.hasOwnProperty, cv = Object.prototype.propertyIsEnumerable, Ta = (C2, u3, i) => u3 in C2 ? uv(C2, u3, { enumerable: true, configurable: true, writable: true, value: i }) : C2[u3] = i, hr = (C2, u3) => {
  for (var i in u3 || (u3 = {}))
    fv.call(u3, i) && Ta(C2, i, u3[i]);
  if (ba)
    for (var i of ba(u3))
      cv.call(u3, i) && Ta(C2, i, u3[i]);
  return C2;
}, Mi = (C2, u3) => av(C2, ov(u3));
class lr {
  constructor(u3) {
    this.events = new EventEmitter(), this.rpcProviders = {}, this.shouldAbortPairingAttempt = false, this.maxPairingAttempts = 10, this.disableProviderPing = false, this.providerOpts = u3, this.logger = typeof u3?.logger < "u" && typeof u3?.logger != "string" ? u3.logger : cjs.pino(cjs.getDefaultLoggerOptions({ level: u3?.logger || Ia })), this.disableProviderPing = u3?.disableProviderPing || false;
  }
  static async init(u3) {
    const i = new lr(u3);
    return await i.initialize(), i;
  }
  async request(u3, i) {
    const [d2, P2] = this.validateChain(i);
    if (!this.session)
      throw new Error("Please call connect() before request()");
    return await this.getProvider(d2).request({ request: hr({}, u3), chainId: `${d2}:${P2}`, topic: this.session.topic });
  }
  sendAsync(u3, i, d2) {
    const P2 = (/* @__PURE__ */ new Date()).getTime();
    this.request(u3, d2).then((O2) => i(null, formatJsonRpcResult(P2, O2))).catch((O2) => i(O2, void 0));
  }
  async enable() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties }), await this.requestAccounts();
  }
  async disconnect() {
    var u3;
    if (!this.session)
      throw new Error("Please call connect() before enable()");
    await this.client.disconnect({ topic: (u3 = this.session) == null ? void 0 : u3.topic, reason: U$1("USER_DISCONNECTED") }), await this.cleanup();
  }
  async connect(u3) {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (this.setNamespaces(u3), await this.cleanupPendingPairings(), !u3.skipPairing)
      return await this.pair(u3.pairingTopic);
  }
  on(u3, i) {
    this.events.on(u3, i);
  }
  once(u3, i) {
    this.events.once(u3, i);
  }
  removeListener(u3, i) {
    this.events.removeListener(u3, i);
  }
  off(u3, i) {
    this.events.off(u3, i);
  }
  get isWalletConnect() {
    return true;
  }
  async pair(u3) {
    this.shouldAbortPairingAttempt = false;
    let i = 0;
    do {
      if (this.shouldAbortPairingAttempt)
        throw new Error("Pairing aborted");
      if (i >= this.maxPairingAttempts)
        throw new Error("Max auto pairing attempts reached");
      const { uri: d2, approval: P2 } = await this.client.connect({ pairingTopic: u3, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties });
      d2 && (this.uri = d2, this.events.emit("display_uri", d2)), await P2().then((O2) => {
        this.session = O2, this.namespaces || (this.namespaces = Vg(O2.namespaces), this.persist("namespaces", this.namespaces));
      }).catch((O2) => {
        if (O2.message !== oe$1)
          throw O2;
        i++;
      });
    } while (!this.session);
    return this.onConnect(), this.session;
  }
  setDefaultChain(u3, i) {
    try {
      if (!this.session)
        return;
      const [d2, P2] = this.validateChain(u3);
      this.getProvider(d2).setDefaultChain(P2, i);
    } catch (d2) {
      if (!/Please call connect/.test(d2.message))
        throw d2;
    }
  }
  async cleanupPendingPairings(u3 = {}) {
    this.logger.info("Cleaning up inactive pairings...");
    const i = this.client.pairing.getAll();
    if (k(i)) {
      for (const d2 of i)
        u3.deletePairings ? this.client.core.expirer.set(d2.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(d2.topic);
      this.logger.info(`Inactive pairings cleared: ${i.length}`);
    }
  }
  abortPairingAttempt() {
    this.shouldAbortPairingAttempt = true;
  }
  async checkStorage() {
    if (this.namespaces = await this.getFromStore("namespaces"), this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
      const u3 = this.client.session.keys.length - 1;
      this.session = this.client.session.get(this.client.session.keys[u3]), this.createProviders();
    }
  }
  async initialize() {
    this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
  }
  async createClient() {
    this.client = this.providerOpts.client || await Q$1.init({ logger: this.providerOpts.logger || Ia, relayUrl: this.providerOpts.relayUrl || Wg, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name }), this.logger.trace("SignClient Initialized");
  }
  createProviders() {
    if (!this.client)
      throw new Error("Sign Client not initialized");
    if (!this.session)
      throw new Error("Session not initialized. Please call connect() before enable()");
    const u3 = [...new Set(Object.keys(this.session.namespaces).map((i) => en(i)))];
    Fi("client", this.client), Fi("events", this.events), Fi("disableProviderPing", this.disableProviderPing), u3.forEach((i) => {
      if (!this.session)
        return;
      const d2 = Jg(i, this.session), P2 = Sa(d2), O2 = Xg(this.namespaces, this.optionalNamespaces), $2 = Mi(hr({}, O2[i]), { accounts: d2, chains: P2 });
      switch (i) {
        case "eip155":
          this.rpcProviders[i] = new jg({ namespace: $2 });
          break;
        case "solana":
          this.rpcProviders[i] = new nv({ namespace: $2 });
          break;
        case "cosmos":
          this.rpcProviders[i] = new tv({ namespace: $2 });
          break;
        case "polkadot":
          this.rpcProviders[i] = new kg({ namespace: $2 });
          break;
        case "cip34":
          this.rpcProviders[i] = new ev({ namespace: $2 });
          break;
        case "elrond":
          this.rpcProviders[i] = new rv({ namespace: $2 });
          break;
        case "multiversx":
          this.rpcProviders[i] = new iv({ namespace: $2 });
          break;
        case "near":
          this.rpcProviders[i] = new sv({ namespace: $2 });
          break;
      }
    });
  }
  registerEventListeners() {
    if (typeof this.client > "u")
      throw new Error("Sign Client is not initialized");
    this.client.on("session_ping", (u3) => {
      this.events.emit("session_ping", u3);
    }), this.client.on("session_event", (u3) => {
      const { params: i } = u3, { event: d2 } = i;
      if (d2.name === "accountsChanged") {
        const P2 = d2.data;
        P2 && k(P2) && this.events.emit("accountsChanged", P2.map(Qg));
      } else if (d2.name === "chainChanged") {
        const P2 = i.chainId, O2 = i.event.data, $2 = en(P2), En = Wi(P2) !== Wi(O2) ? `${$2}:${Wi(O2)}` : P2;
        this.onChainChanged(En);
      } else
        this.events.emit(d2.name, d2.data);
      this.events.emit("session_event", u3);
    }), this.client.on("session_update", ({ topic: u3, params: i }) => {
      var d2;
      const { namespaces: P2 } = i, O2 = (d2 = this.client) == null ? void 0 : d2.session.get(u3);
      this.session = Mi(hr({}, O2), { namespaces: P2 }), this.onSessionUpdate(), this.events.emit("session_update", { topic: u3, params: i });
    }), this.client.on("session_delete", async (u3) => {
      await this.cleanup(), this.events.emit("session_delete", u3), this.events.emit("disconnect", Mi(hr({}, U$1("USER_DISCONNECTED")), { data: u3.topic }));
    }), this.on(Vn.DEFAULT_CHAIN_CHANGED, (u3) => {
      this.onChainChanged(u3, true);
    });
  }
  getProvider(u3) {
    if (!this.rpcProviders[u3])
      throw new Error(`Provider not found: ${u3}`);
    return this.rpcProviders[u3];
  }
  onSessionUpdate() {
    Object.keys(this.rpcProviders).forEach((u3) => {
      var i;
      this.getProvider(u3).updateNamespace((i = this.session) == null ? void 0 : i.namespaces[u3]);
    });
  }
  setNamespaces(u3) {
    const { namespaces: i, optionalNamespaces: d2, sessionProperties: P2 } = u3;
    i && Object.keys(i).length && (this.namespaces = i), d2 && Object.keys(d2).length && (this.optionalNamespaces = d2), this.sessionProperties = P2, this.persist("namespaces", i), this.persist("optionalNamespaces", d2);
  }
  validateChain(u3) {
    const [i, d2] = u3?.split(":") || ["", ""];
    if (!this.namespaces || !Object.keys(this.namespaces).length)
      return [i, d2];
    if (i && !Object.keys(this.namespaces || {}).map(($2) => en($2)).includes(i))
      throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);
    if (i && d2)
      return [i, d2];
    const P2 = en(Object.keys(this.namespaces)[0]), O2 = this.rpcProviders[P2].getDefaultChain();
    return [P2, O2];
  }
  async requestAccounts() {
    const [u3] = this.validateChain();
    return await this.getProvider(u3).requestAccounts();
  }
  onChainChanged(u3, i = false) {
    var d2;
    if (!this.namespaces)
      return;
    const [P2, O2] = this.validateChain(u3);
    i || this.getProvider(P2).setDefaultChain(O2), ((d2 = this.namespaces[P2]) != null ? d2 : this.namespaces[`${P2}:${O2}`]).defaultChain = O2, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", O2);
  }
  onConnect() {
    this.createProviders(), this.events.emit("connect", { session: this.session });
  }
  async cleanup() {
    this.session = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, this.persist("namespaces", void 0), this.persist("optionalNamespaces", void 0), this.persist("sessionProperties", void 0), await this.cleanupPendingPairings({ deletePairings: true });
  }
  persist(u3, i) {
    this.client.core.storage.setItem(`${xa}/${u3}`, i);
  }
  async getFromStore(u3) {
    return await this.client.core.storage.getItem(`${xa}/${u3}`);
  }
}
const hv = lr;
const P = "wc", S = "ethereum_provider", $ = `${P}@2:${S}:`, j = "https://rpc.walletconnect.com/v1/", u2 = ["eth_sendTransaction", "personal_sign"], E2 = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode"], m = ["chainChanged", "accountsChanged"], _2 = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var N = Object.defineProperty, q = Object.defineProperties, D = Object.getOwnPropertyDescriptors, y2 = Object.getOwnPropertySymbols, U = Object.prototype.hasOwnProperty, Q2 = Object.prototype.propertyIsEnumerable, O = (a3, t, s) => t in a3 ? N(a3, t, { enumerable: true, configurable: true, writable: true, value: s }) : a3[t] = s, p2 = (a3, t) => {
  for (var s in t || (t = {}))
    U.call(t, s) && O(a3, s, t[s]);
  if (y2)
    for (var s of y2(t))
      Q2.call(t, s) && O(a3, s, t[s]);
  return a3;
}, M = (a3, t) => q(a3, D(t));
function g2(a3) {
  return Number(a3[0].split(":")[1]);
}
function f2(a3) {
  return `0x${a3.toString(16)}`;
}
function L(a3) {
  const { chains: t, optionalChains: s, methods: i, optionalMethods: n2, events: e, optionalEvents: h4, rpcMap: c2 } = a3;
  if (!k$4(t))
    throw new Error("Invalid chains");
  const o = { chains: t, methods: i || u2, events: e || m, rpcMap: p2({}, t.length ? { [g2(t)]: c2[g2(t)] } : {}) }, r = e?.filter((l2) => !m.includes(l2)), d2 = i?.filter((l2) => !u2.includes(l2));
  if (!s && !h4 && !n2 && !(r != null && r.length) && !(d2 != null && d2.length))
    return { required: t.length ? o : void 0 };
  const C2 = r?.length && d2?.length || !s, I2 = { chains: [...new Set(C2 ? o.chains.concat(s || []) : s)], methods: [...new Set(o.methods.concat(n2 != null && n2.length ? n2 : E2))], events: [...new Set(o.events.concat(h4 != null && h4.length ? h4 : _2))], rpcMap: c2 };
  return { required: t.length ? o : void 0, optional: s.length ? I2 : void 0 };
}
class v2 {
  constructor() {
    this.events = new eventsExports.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = $, this.on = (t, s) => (this.events.on(t, s), this), this.once = (t, s) => (this.events.once(t, s), this), this.removeListener = (t, s) => (this.events.removeListener(t, s), this), this.off = (t, s) => (this.events.off(t, s), this), this.parseAccount = (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
  }
  static async init(t) {
    const s = new v2();
    return await s.initialize(t), s;
  }
  async request(t) {
    return await this.signer.request(t, this.formatChainId(this.chainId));
  }
  sendAsync(t, s) {
    this.signer.sendAsync(t, s, this.formatChainId(this.chainId));
  }
  get connected() {
    return this.signer.client ? this.signer.client.core.relayer.connected : false;
  }
  get connecting() {
    return this.signer.client ? this.signer.client.core.relayer.connecting : false;
  }
  async enable() {
    return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
  }
  async connect(t) {
    if (!this.signer.client)
      throw new Error("Provider not initialized. Call init() first");
    this.loadConnectOpts(t);
    const { required: s, optional: i } = L(this.rpc);
    try {
      const n2 = await new Promise(async (h4, c2) => {
        var o;
        this.rpc.showQrModal && ((o = this.modal) == null || o.subscribeModal((r) => {
          !r.open && !this.signer.session && (this.signer.abortPairingAttempt(), c2(new Error("Connection request reset. Please try again.")));
        })), await this.signer.connect(M(p2({ namespaces: p2({}, s && { [this.namespace]: s }) }, i && { optionalNamespaces: { [this.namespace]: i } }), { pairingTopic: t?.pairingTopic })).then((r) => {
          h4(r);
        }).catch((r) => {
          c2(new Error(r.message));
        });
      });
      if (!n2)
        return;
      const e = Un(n2.namespaces, [this.namespace]);
      this.setChainIds(this.rpc.chains.length ? this.rpc.chains : e), this.setAccounts(e), this.events.emit("connect", { chainId: f2(this.chainId) });
    } catch (n2) {
      throw this.signer.logger.error(n2), n2;
    } finally {
      this.modal && this.modal.closeModal();
    }
  }
  async disconnect() {
    this.session && await this.signer.disconnect(), this.reset();
  }
  get isWalletConnect() {
    return true;
  }
  get session() {
    return this.signer.session;
  }
  registerEventListeners() {
    this.signer.on("session_event", (t) => {
      const { params: s } = t, { event: i } = s;
      i.name === "accountsChanged" ? (this.accounts = this.parseAccounts(i.data), this.events.emit("accountsChanged", this.accounts)) : i.name === "chainChanged" ? this.setChainId(this.formatChainId(i.data)) : this.events.emit(i.name, i.data), this.events.emit("session_event", t);
    }), this.signer.on("chainChanged", (t) => {
      const s = parseInt(t);
      this.chainId = s, this.events.emit("chainChanged", f2(this.chainId)), this.persist();
    }), this.signer.on("session_update", (t) => {
      this.events.emit("session_update", t);
    }), this.signer.on("session_delete", (t) => {
      this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", M(p2({}, U$5("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
    }), this.signer.on("display_uri", (t) => {
      var s, i;
      this.rpc.showQrModal && ((s = this.modal) == null || s.closeModal(), (i = this.modal) == null || i.openModal({ uri: t })), this.events.emit("display_uri", t);
    });
  }
  switchEthereumChain(t) {
    this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
  }
  isCompatibleChainId(t) {
    return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
  }
  formatChainId(t) {
    return `${this.namespace}:${t}`;
  }
  parseChainId(t) {
    return Number(t.split(":")[1]);
  }
  setChainIds(t) {
    const s = t.filter((i) => this.isCompatibleChainId(i)).map((i) => this.parseChainId(i));
    s.length && (this.chainId = s[0], this.events.emit("chainChanged", f2(this.chainId)), this.persist());
  }
  setChainId(t) {
    if (this.isCompatibleChainId(t)) {
      const s = this.parseChainId(t);
      this.chainId = s, this.switchEthereumChain(s);
    }
  }
  parseAccountId(t) {
    const [s, i, n2] = t.split(":");
    return { chainId: `${s}:${i}`, address: n2 };
  }
  setAccounts(t) {
    this.accounts = t.filter((s) => this.parseChainId(this.parseAccountId(s).chainId) === this.chainId).map((s) => this.parseAccountId(s).address), this.events.emit("accountsChanged", this.accounts);
  }
  getRpcConfig(t) {
    var s, i;
    const n2 = (s = t?.chains) != null ? s : [], e = (i = t?.optionalChains) != null ? i : [], h4 = n2.concat(e);
    if (!h4.length)
      throw new Error("No chains specified in either `chains` or `optionalChains`");
    const c2 = n2.length ? t?.methods || u2 : [], o = n2.length ? t?.events || m : [], r = t?.optionalMethods || [], d2 = t?.optionalEvents || [], C2 = t?.rpcMap || this.buildRpcMap(h4, t.projectId), I2 = t?.qrModalOptions || void 0;
    return { chains: n2?.map((l2) => this.formatChainId(l2)), optionalChains: e.map((l2) => this.formatChainId(l2)), methods: c2, events: o, optionalMethods: r, optionalEvents: d2, rpcMap: C2, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: I2, projectId: t.projectId, metadata: t.metadata };
  }
  buildRpcMap(t, s) {
    const i = {};
    return t.forEach((n2) => {
      i[n2] = this.getRpcUrl(n2, s);
    }), i;
  }
  async initialize(t) {
    if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? g2(this.rpc.chains) : g2(this.rpc.optionalChains), this.signer = await hv.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storageOptions: t.storageOptions }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
      let s;
      try {
        const { WalletConnectModal: i } = await __vitePreload(() => import("./index-f34093e8.js").then((n2) => n2.i), true ? ["assets/index-f34093e8.js","assets/index-d6dac5c9.js","assets/index-bfe896e9.css"] : void 0);
        s = i;
      } catch {
        throw new Error("To use QR modal, please install @walletconnect/modal package");
      }
      if (s)
        try {
          this.modal = new s(p2({ projectId: this.rpc.projectId }, this.rpc.qrModalOptions));
        } catch (i) {
          throw this.signer.logger.error(i), new Error("Could not generate WalletConnectModal Instance");
        }
    }
  }
  loadConnectOpts(t) {
    if (!t)
      return;
    const { chains: s, optionalChains: i, rpcMap: n2 } = t;
    s && k$4(s) && (this.rpc.chains = s.map((e) => this.formatChainId(e)), s.forEach((e) => {
      this.rpc.rpcMap[e] = n2?.[e] || this.getRpcUrl(e);
    })), i && k$4(i) && (this.rpc.optionalChains = [], this.rpc.optionalChains = i?.map((e) => this.formatChainId(e)), i.forEach((e) => {
      this.rpc.rpcMap[e] = n2?.[e] || this.getRpcUrl(e);
    }));
  }
  getRpcUrl(t, s) {
    var i;
    return ((i = this.rpc.rpcMap) == null ? void 0 : i[t]) || `${j}?chainId=eip155:${t}&projectId=${s || this.rpc.projectId}`;
  }
  async loadPersistedSession() {
    if (!this.session)
      return;
    const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), s = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
    this.setChainIds(t ? [this.formatChainId(t)] : s?.accounts), this.setAccounts(s?.accounts);
  }
  reset() {
    this.chainId = 1, this.accounts = [];
  }
  persist() {
    this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
  }
  parseAccounts(t) {
    return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((s) => this.parseAccount(s));
  }
}
const G = v2;
export {
  G as EthereumProvider,
  _2 as OPTIONAL_EVENTS,
  E2 as OPTIONAL_METHODS,
  m as REQUIRED_EVENTS,
  u2 as REQUIRED_METHODS,
  v2 as default
};
//# sourceMappingURL=index.es-14ffc65d.js.map
