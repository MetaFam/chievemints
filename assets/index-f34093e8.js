import { _ as __vitePreload } from "./index-d6dac5c9.js";
const t = Symbol();
const s = Object.getPrototypeOf, c$1 = /* @__PURE__ */ new WeakMap(), l = (e) => e && (c$1.has(e) ? c$1.get(e) : s(e) === Object.prototype || s(e) === Array.prototype), y$1 = (e) => l(e) && e[t] || null, h = (e, t2 = true) => {
  c$1.set(e, t2);
};
const isObject = (x) => typeof x === "object" && x !== null;
const proxyStateMap = /* @__PURE__ */ new WeakMap();
const refSet = /* @__PURE__ */ new WeakSet();
const buildProxyFunction = (objectIs = Object.is, newProxy = (target, handler) => new Proxy(target, handler), canProxy = (x) => isObject(x) && !refSet.has(x) && (Array.isArray(x) || !(Symbol.iterator in x)) && !(x instanceof WeakMap) && !(x instanceof WeakSet) && !(x instanceof Error) && !(x instanceof Number) && !(x instanceof Date) && !(x instanceof String) && !(x instanceof RegExp) && !(x instanceof ArrayBuffer), defaultHandlePromise = (promise) => {
  switch (promise.status) {
    case "fulfilled":
      return promise.value;
    case "rejected":
      throw promise.reason;
    default:
      throw promise;
  }
}, snapCache = /* @__PURE__ */ new WeakMap(), createSnapshot = (target, version, handlePromise = defaultHandlePromise) => {
  const cache = snapCache.get(target);
  if ((cache == null ? void 0 : cache[0]) === version) {
    return cache[1];
  }
  const snap = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target));
  h(snap, true);
  snapCache.set(target, [version, snap]);
  Reflect.ownKeys(target).forEach((key) => {
    if (Object.getOwnPropertyDescriptor(snap, key)) {
      return;
    }
    const value = Reflect.get(target, key);
    const desc = {
      value,
      enumerable: true,
      // This is intentional to avoid copying with proxy-compare.
      // It's still non-writable, so it avoids assigning a value.
      configurable: true
    };
    if (refSet.has(value)) {
      h(value, false);
    } else if (value instanceof Promise) {
      delete desc.value;
      desc.get = () => handlePromise(value);
    } else if (proxyStateMap.has(value)) {
      const [target2, ensureVersion] = proxyStateMap.get(
        value
      );
      desc.value = createSnapshot(
        target2,
        ensureVersion(),
        handlePromise
      );
    }
    Object.defineProperty(snap, key, desc);
  });
  return Object.preventExtensions(snap);
}, proxyCache = /* @__PURE__ */ new WeakMap(), versionHolder = [1, 1], proxyFunction = (initialObject) => {
  if (!isObject(initialObject)) {
    throw new Error("object required");
  }
  const found = proxyCache.get(initialObject);
  if (found) {
    return found;
  }
  let version = versionHolder[0];
  const listeners = /* @__PURE__ */ new Set();
  const notifyUpdate = (op, nextVersion = ++versionHolder[0]) => {
    if (version !== nextVersion) {
      version = nextVersion;
      listeners.forEach((listener) => listener(op, nextVersion));
    }
  };
  let checkVersion = versionHolder[1];
  const ensureVersion = (nextCheckVersion = ++versionHolder[1]) => {
    if (checkVersion !== nextCheckVersion && !listeners.size) {
      checkVersion = nextCheckVersion;
      propProxyStates.forEach(([propProxyState]) => {
        const propVersion = propProxyState[1](nextCheckVersion);
        if (propVersion > version) {
          version = propVersion;
        }
      });
    }
    return version;
  };
  const createPropListener = (prop) => (op, nextVersion) => {
    const newOp = [...op];
    newOp[1] = [prop, ...newOp[1]];
    notifyUpdate(newOp, nextVersion);
  };
  const propProxyStates = /* @__PURE__ */ new Map();
  const addPropListener = (prop, propProxyState) => {
    if (({ "VITE_CHAIN_NAME": "optimisticEthereum", "VITE_process.env.NODE_DEBUG": "", "VITE_RAW_global.WebSocket": "window.WebSocket", "VITE_INFURA_ID": "781d8466252d47508e177b8637b1c2fd", "VITE_ALCHEMY_ID": "ACDn1Kz28R_1VPRp44aW2zf85imtUyey", "VITE_IPFS_AUTH_USERNAME": "1xds8y1D4cqT4rt77cC1jBLOrQk", "VITE_IPFS_AUTH_PASSWORD": "858749f19398b5ae89787172852c179b", "VITE_WALLET_CONNECT_PROJECT_ID": "806b7118ca48eec75f6cf7981bfca00d", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && propProxyStates.has(prop)) {
      throw new Error("prop listener already exists");
    }
    if (listeners.size) {
      const remove = propProxyState[3](createPropListener(prop));
      propProxyStates.set(prop, [propProxyState, remove]);
    } else {
      propProxyStates.set(prop, [propProxyState]);
    }
  };
  const removePropListener = (prop) => {
    var _a;
    const entry = propProxyStates.get(prop);
    if (entry) {
      propProxyStates.delete(prop);
      (_a = entry[1]) == null ? void 0 : _a.call(entry);
    }
  };
  const addListener = (listener) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      propProxyStates.forEach(([propProxyState, prevRemove], prop) => {
        if (({ "VITE_CHAIN_NAME": "optimisticEthereum", "VITE_process.env.NODE_DEBUG": "", "VITE_RAW_global.WebSocket": "window.WebSocket", "VITE_INFURA_ID": "781d8466252d47508e177b8637b1c2fd", "VITE_ALCHEMY_ID": "ACDn1Kz28R_1VPRp44aW2zf85imtUyey", "VITE_IPFS_AUTH_USERNAME": "1xds8y1D4cqT4rt77cC1jBLOrQk", "VITE_IPFS_AUTH_PASSWORD": "858749f19398b5ae89787172852c179b", "VITE_WALLET_CONNECT_PROJECT_ID": "806b7118ca48eec75f6cf7981bfca00d", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && prevRemove) {
          throw new Error("remove already exists");
        }
        const remove = propProxyState[3](createPropListener(prop));
        propProxyStates.set(prop, [propProxyState, remove]);
      });
    }
    const removeListener = () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        propProxyStates.forEach(([propProxyState, remove], prop) => {
          if (remove) {
            remove();
            propProxyStates.set(prop, [propProxyState]);
          }
        });
      }
    };
    return removeListener;
  };
  const baseObject = Array.isArray(initialObject) ? [] : Object.create(Object.getPrototypeOf(initialObject));
  const handler = {
    deleteProperty(target, prop) {
      const prevValue = Reflect.get(target, prop);
      removePropListener(prop);
      const deleted = Reflect.deleteProperty(target, prop);
      if (deleted) {
        notifyUpdate(["delete", [prop], prevValue]);
      }
      return deleted;
    },
    set(target, prop, value, receiver) {
      const hasPrevValue = Reflect.has(target, prop);
      const prevValue = Reflect.get(target, prop, receiver);
      if (hasPrevValue && (objectIs(prevValue, value) || proxyCache.has(value) && objectIs(prevValue, proxyCache.get(value)))) {
        return true;
      }
      removePropListener(prop);
      if (isObject(value)) {
        value = y$1(value) || value;
      }
      let nextValue = value;
      if (value instanceof Promise) {
        value.then((v) => {
          value.status = "fulfilled";
          value.value = v;
          notifyUpdate(["resolve", [prop], v]);
        }).catch((e) => {
          value.status = "rejected";
          value.reason = e;
          notifyUpdate(["reject", [prop], e]);
        });
      } else {
        if (!proxyStateMap.has(value) && canProxy(value)) {
          nextValue = proxyFunction(value);
        }
        const childProxyState = !refSet.has(nextValue) && proxyStateMap.get(nextValue);
        if (childProxyState) {
          addPropListener(prop, childProxyState);
        }
      }
      Reflect.set(target, prop, nextValue, receiver);
      notifyUpdate(["set", [prop], value, prevValue]);
      return true;
    }
  };
  const proxyObject = newProxy(baseObject, handler);
  proxyCache.set(initialObject, proxyObject);
  const proxyState = [
    baseObject,
    ensureVersion,
    createSnapshot,
    addListener
  ];
  proxyStateMap.set(proxyObject, proxyState);
  Reflect.ownKeys(initialObject).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(
      initialObject,
      key
    );
    if ("value" in desc) {
      proxyObject[key] = initialObject[key];
      delete desc.value;
      delete desc.writable;
    }
    Object.defineProperty(baseObject, key, desc);
  });
  return proxyObject;
}) => [
  // public functions
  proxyFunction,
  // shared state
  proxyStateMap,
  refSet,
  // internal things
  objectIs,
  newProxy,
  canProxy,
  defaultHandlePromise,
  snapCache,
  createSnapshot,
  proxyCache,
  versionHolder
];
const [defaultProxyFunction] = buildProxyFunction();
function proxy(initialObject = {}) {
  return defaultProxyFunction(initialObject);
}
function subscribe(proxyObject, callback, notifyInSync) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (({ "VITE_CHAIN_NAME": "optimisticEthereum", "VITE_process.env.NODE_DEBUG": "", "VITE_RAW_global.WebSocket": "window.WebSocket", "VITE_INFURA_ID": "781d8466252d47508e177b8637b1c2fd", "VITE_ALCHEMY_ID": "ACDn1Kz28R_1VPRp44aW2zf85imtUyey", "VITE_IPFS_AUTH_USERNAME": "1xds8y1D4cqT4rt77cC1jBLOrQk", "VITE_IPFS_AUTH_PASSWORD": "858749f19398b5ae89787172852c179b", "VITE_WALLET_CONNECT_PROJECT_ID": "806b7118ca48eec75f6cf7981bfca00d", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  let promise;
  const ops = [];
  const addListener = proxyState[3];
  let isListenerActive = false;
  const listener = (op) => {
    ops.push(op);
    if (notifyInSync) {
      callback(ops.splice(0));
      return;
    }
    if (!promise) {
      promise = Promise.resolve().then(() => {
        promise = void 0;
        if (isListenerActive) {
          callback(ops.splice(0));
        }
      });
    }
  };
  const removeListener = addListener(listener);
  isListenerActive = true;
  return () => {
    isListenerActive = false;
    removeListener();
  };
}
function snapshot(proxyObject, handlePromise) {
  const proxyState = proxyStateMap.get(proxyObject);
  if (({ "VITE_CHAIN_NAME": "optimisticEthereum", "VITE_process.env.NODE_DEBUG": "", "VITE_RAW_global.WebSocket": "window.WebSocket", "VITE_INFURA_ID": "781d8466252d47508e177b8637b1c2fd", "VITE_ALCHEMY_ID": "ACDn1Kz28R_1VPRp44aW2zf85imtUyey", "VITE_IPFS_AUTH_USERNAME": "1xds8y1D4cqT4rt77cC1jBLOrQk", "VITE_IPFS_AUTH_PASSWORD": "858749f19398b5ae89787172852c179b", "VITE_WALLET_CONNECT_PROJECT_ID": "806b7118ca48eec75f6cf7981bfca00d", "BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": false } ? "production" : void 0) !== "production" && !proxyState) {
    console.warn("Please use proxy object");
  }
  const [target, ensureVersion, createSnapshot] = proxyState;
  return createSnapshot(target, ensureVersion(), handlePromise);
}
const o = proxy({ history: ["ConnectWallet"], view: "ConnectWallet", data: void 0 }), T = { state: o, subscribe(e) {
  return subscribe(o, () => e(o));
}, push(e, t2) {
  e !== o.view && (o.view = e, t2 && (o.data = t2), o.history.push(e));
}, reset(e) {
  o.view = e, o.history = [e];
}, replace(e) {
  o.history.length > 1 && (o.history[o.history.length - 1] = e, o.view = e);
}, goBack() {
  if (o.history.length > 1) {
    o.history.pop();
    const [e] = o.history.slice(-1);
    o.view = e;
  }
}, setData(e) {
  o.data = e;
} }, a = { WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE", WCM_VERSION: "WCM_VERSION", RECOMMENDED_WALLET_AMOUNT: 9, isMobile() {
  return typeof window < "u" ? Boolean(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : false;
}, isAndroid() {
  return a.isMobile() && navigator.userAgent.toLowerCase().includes("android");
}, isIos() {
  const e = navigator.userAgent.toLowerCase();
  return a.isMobile() && (e.includes("iphone") || e.includes("ipad"));
}, isHttpUrl(e) {
  return e.startsWith("http://") || e.startsWith("https://");
}, isArray(e) {
  return Array.isArray(e) && e.length > 0;
}, formatNativeUrl(e, t2, s2) {
  if (a.isHttpUrl(e))
    return this.formatUniversalUrl(e, t2, s2);
  let n = e;
  n.includes("://") || (n = e.replaceAll("/", "").replaceAll(":", ""), n = `${n}://`), n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s2);
  const i = encodeURIComponent(t2);
  return `${n}wc?uri=${i}`;
}, formatUniversalUrl(e, t2, s2) {
  if (!a.isHttpUrl(e))
    return this.formatNativeUrl(e, t2, s2);
  let n = e;
  n.endsWith("/") || (n = `${n}/`), this.setWalletConnectDeepLink(n, s2);
  const i = encodeURIComponent(t2);
  return `${n}wc?uri=${i}`;
}, async wait(e) {
  return new Promise((t2) => {
    setTimeout(t2, e);
  });
}, openHref(e, t2) {
  window.open(e, t2, "noreferrer noopener");
}, setWalletConnectDeepLink(e, t2) {
  try {
    localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: e, name: t2 }));
  } catch {
    console.info("Unable to set WalletConnect deep link");
  }
}, setWalletConnectAndroidDeepLink(e) {
  try {
    const [t2] = e.split("?");
    localStorage.setItem(a.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({ href: t2, name: "Android" }));
  } catch {
    console.info("Unable to set WalletConnect android deep link");
  }
}, removeWalletConnectDeepLink() {
  try {
    localStorage.removeItem(a.WALLETCONNECT_DEEPLINK_CHOICE);
  } catch {
    console.info("Unable to remove WalletConnect deep link");
  }
}, setModalVersionInStorage() {
  try {
    typeof localStorage < "u" && localStorage.setItem(a.WCM_VERSION, "2.6.2");
  } catch {
    console.info("Unable to set Web3Modal version in storage");
  }
}, getWalletRouterData() {
  var e;
  const t2 = (e = T.state.data) == null ? void 0 : e.Wallet;
  if (!t2)
    throw new Error('Missing "Wallet" view data');
  return t2;
} }, _ = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https")), r = proxy({ enabled: _, userSessionId: "", events: [], connectedWalletId: void 0 }), R = { state: r, subscribe(e) {
  return subscribe(r.events, () => e(snapshot(r.events[r.events.length - 1])));
}, initialize() {
  r.enabled && typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" && (r.userSessionId = crypto.randomUUID());
}, setConnectedWalletId(e) {
  r.connectedWalletId = e;
}, click(e) {
  if (r.enabled) {
    const t2 = { type: "CLICK", name: e.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e };
    r.events.push(t2);
  }
}, track(e) {
  if (r.enabled) {
    const t2 = { type: "TRACK", name: e.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e };
    r.events.push(t2);
  }
}, view(e) {
  if (r.enabled) {
    const t2 = { type: "VIEW", name: e.name, userSessionId: r.userSessionId, timestamp: Date.now(), data: e };
    r.events.push(t2);
  }
} }, c = proxy({ chains: void 0, walletConnectUri: void 0, isAuth: false, isCustomDesktop: false, isCustomMobile: false, isDataLoaded: false, isUiLoaded: false }), p = { state: c, subscribe(e) {
  return subscribe(c, () => e(c));
}, setChains(e) {
  c.chains = e;
}, setWalletConnectUri(e) {
  c.walletConnectUri = e;
}, setIsCustomDesktop(e) {
  c.isCustomDesktop = e;
}, setIsCustomMobile(e) {
  c.isCustomMobile = e;
}, setIsDataLoaded(e) {
  c.isDataLoaded = e;
}, setIsUiLoaded(e) {
  c.isUiLoaded = e;
}, setIsAuth(e) {
  c.isAuth = e;
} }, W = proxy({ projectId: "", mobileWallets: void 0, desktopWallets: void 0, walletImages: void 0, chains: void 0, enableAuthMode: false, enableExplorer: true, explorerExcludedWalletIds: void 0, explorerRecommendedWalletIds: void 0, termsOfServiceUrl: void 0, privacyPolicyUrl: void 0 }), y = { state: W, subscribe(e) {
  return subscribe(W, () => e(W));
}, setConfig(e) {
  var t2, s2;
  R.initialize(), p.setChains(e.chains), p.setIsAuth(Boolean(e.enableAuthMode)), p.setIsCustomMobile(Boolean((t2 = e.mobileWallets) == null ? void 0 : t2.length)), p.setIsCustomDesktop(Boolean((s2 = e.desktopWallets) == null ? void 0 : s2.length)), a.setModalVersionInStorage(), Object.assign(W, e);
} };
var V = Object.defineProperty, D = Object.getOwnPropertySymbols, H = Object.prototype.hasOwnProperty, B = Object.prototype.propertyIsEnumerable, M = (e, t2, s2) => t2 in e ? V(e, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e[t2] = s2, K = (e, t2) => {
  for (var s2 in t2 || (t2 = {}))
    H.call(t2, s2) && M(e, s2, t2[s2]);
  if (D)
    for (var s2 of D(t2))
      B.call(t2, s2) && M(e, s2, t2[s2]);
  return e;
};
const L = "https://explorer-api.walletconnect.com", E = "wcm", O = "js-2.6.2";
async function w(e, t2) {
  const s2 = K({ sdkType: E, sdkVersion: O }, t2), n = new URL(e, L);
  return n.searchParams.append("projectId", y.state.projectId), Object.entries(s2).forEach(([i, l2]) => {
    l2 && n.searchParams.append(i, String(l2));
  }), (await fetch(n)).json();
}
const m = { async getDesktopListings(e) {
  return w("/w3m/v1/getDesktopListings", e);
}, async getMobileListings(e) {
  return w("/w3m/v1/getMobileListings", e);
}, async getInjectedListings(e) {
  return w("/w3m/v1/getInjectedListings", e);
}, async getAllListings(e) {
  return w("/w3m/v1/getAllListings", e);
}, getWalletImageUrl(e) {
  return `${L}/w3m/v1/getWalletImage/${e}?projectId=${y.state.projectId}&sdkType=${E}&sdkVersion=${O}`;
}, getAssetImageUrl(e) {
  return `${L}/w3m/v1/getAssetImage/${e}?projectId=${y.state.projectId}&sdkType=${E}&sdkVersion=${O}`;
} };
var z = Object.defineProperty, j = Object.getOwnPropertySymbols, J = Object.prototype.hasOwnProperty, q = Object.prototype.propertyIsEnumerable, k = (e, t2, s2) => t2 in e ? z(e, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e[t2] = s2, F = (e, t2) => {
  for (var s2 in t2 || (t2 = {}))
    J.call(t2, s2) && k(e, s2, t2[s2]);
  if (j)
    for (var s2 of j(t2))
      q.call(t2, s2) && k(e, s2, t2[s2]);
  return e;
};
const N = a.isMobile(), d$1 = proxy({ wallets: { listings: [], total: 0, page: 1 }, search: { listings: [], total: 0, page: 1 }, recomendedWallets: [] }), te = { state: d$1, async getRecomendedWallets() {
  const { explorerRecommendedWalletIds: e, explorerExcludedWalletIds: t2 } = y.state;
  if (e === "NONE" || t2 === "ALL" && !e)
    return d$1.recomendedWallets;
  if (a.isArray(e)) {
    const s2 = { recommendedIds: e.join(",") }, { listings: n } = await m.getAllListings(s2), i = Object.values(n);
    i.sort((l2, v) => {
      const b = e.indexOf(l2.id), f = e.indexOf(v.id);
      return b - f;
    }), d$1.recomendedWallets = i;
  } else {
    const { chains: s2, isAuth: n } = p.state, i = s2?.join(","), l2 = a.isArray(t2), v = { page: 1, sdks: n ? "auth_v1" : void 0, entries: a.RECOMMENDED_WALLET_AMOUNT, chains: i, version: 2, excludedIds: l2 ? t2.join(",") : void 0 }, { listings: b } = N ? await m.getMobileListings(v) : await m.getDesktopListings(v);
    d$1.recomendedWallets = Object.values(b);
  }
  return d$1.recomendedWallets;
}, async getWallets(e) {
  const t2 = F({}, e), { explorerRecommendedWalletIds: s2, explorerExcludedWalletIds: n } = y.state, { recomendedWallets: i } = d$1;
  if (n === "ALL")
    return d$1.wallets;
  i.length ? t2.excludedIds = i.map((x) => x.id).join(",") : a.isArray(s2) && (t2.excludedIds = s2.join(",")), a.isArray(n) && (t2.excludedIds = [t2.excludedIds, n].filter(Boolean).join(",")), p.state.isAuth && (t2.sdks = "auth_v1");
  const { page: l2, search: v } = e, { listings: b, total: f } = N ? await m.getMobileListings(t2) : await m.getDesktopListings(t2), A = Object.values(b), U = v ? "search" : "wallets";
  return d$1[U] = { listings: [...d$1[U].listings, ...A], total: f, page: l2 ?? 1 }, { listings: A, total: f };
}, getWalletImageUrl(e) {
  return m.getWalletImageUrl(e);
}, getAssetImageUrl(e) {
  return m.getAssetImageUrl(e);
}, resetSearch() {
  d$1.search = { listings: [], total: 0, page: 1 };
} }, I = proxy({ open: false }), se = { state: I, subscribe(e) {
  return subscribe(I, () => e(I));
}, async open(e) {
  return new Promise((t2) => {
    const { isUiLoaded: s2, isDataLoaded: n } = p.state;
    if (a.removeWalletConnectDeepLink(), p.setWalletConnectUri(e?.uri), p.setChains(e?.chains), T.reset("ConnectWallet"), s2 && n)
      I.open = true, t2();
    else {
      const i = setInterval(() => {
        const l2 = p.state;
        l2.isUiLoaded && l2.isDataLoaded && (clearInterval(i), I.open = true, t2());
      }, 200);
    }
  });
}, close() {
  I.open = false;
} };
var G = Object.defineProperty, $ = Object.getOwnPropertySymbols, Q = Object.prototype.hasOwnProperty, X = Object.prototype.propertyIsEnumerable, S = (e, t2, s2) => t2 in e ? G(e, t2, { enumerable: true, configurable: true, writable: true, value: s2 }) : e[t2] = s2, Y = (e, t2) => {
  for (var s2 in t2 || (t2 = {}))
    Q.call(t2, s2) && S(e, s2, t2[s2]);
  if ($)
    for (var s2 of $(t2))
      X.call(t2, s2) && S(e, s2, t2[s2]);
  return e;
};
function Z() {
  return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches;
}
const C = proxy({ themeMode: Z() ? "dark" : "light" }), ne = { state: C, subscribe(e) {
  return subscribe(C, () => e(C));
}, setThemeConfig(e) {
  const { themeMode: t2, themeVariables: s2 } = e;
  t2 && (C.themeMode = t2), s2 && (C.themeVariables = Y({}, s2));
} }, g = proxy({ open: false, message: "", variant: "success" }), oe = { state: g, subscribe(e) {
  return subscribe(g, () => e(g));
}, openToast(e, t2) {
  g.open = true, g.message = e, g.variant = t2;
}, closeToast() {
  g.open = false;
} };
class d {
  constructor(e) {
    this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ne.setThemeConfig, ne.setThemeConfig(e), y.setConfig(e), this.initUi();
  }
  async initUi() {
    if (typeof window < "u") {
      await __vitePreload(() => import("./index-3da1af22.js"), true ? ["assets/index-3da1af22.js","assets/index-d6dac5c9.js","assets/index-bfe896e9.css"] : void 0);
      const e = document.createElement("wcm-modal");
      document.body.insertAdjacentElement("beforeend", e), p.setIsUiLoaded(true);
    }
  }
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WalletConnectModal: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  R,
  T,
  a,
  index as i,
  ne as n,
  oe as o,
  p,
  se as s,
  te as t,
  y
};
//# sourceMappingURL=index-f34093e8.js.map
