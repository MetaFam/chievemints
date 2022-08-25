import { g as forwardRef, o as __DEV__, I as omit, r as react, c as chakra, aa as useSafeLayoutEffect, a as jsx } from "./index.35c474d9.js";
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
var _excluded = ["htmlWidth", "htmlHeight", "alt"], _excluded2 = ["fallbackSrc", "fallback", "src", "srcSet", "align", "fit", "loading", "ignoreFallback", "crossOrigin"];
var NativeImage = /* @__PURE__ */ react.exports.forwardRef(function(props, ref) {
  var htmlWidth = props.htmlWidth, htmlHeight = props.htmlHeight, alt = props.alt, rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /* @__PURE__ */ jsx("img", {
    width: htmlWidth,
    height: htmlHeight,
    ref,
    alt,
    ...rest
  });
});
var Image$1 = /* @__PURE__ */ forwardRef(function(props, ref) {
  var fallbackSrc = props.fallbackSrc, fallback = props.fallback, src = props.src, srcSet = props.srcSet, align = props.align, fit = props.fit, loading = props.loading, ignoreFallback = props.ignoreFallback, crossOrigin = props.crossOrigin, rest = _objectWithoutPropertiesLoose(props, _excluded2);
  var shouldIgnore = loading != null || ignoreFallback || fallbackSrc === void 0 && fallback === void 0;
  var status = useImage(_extends({}, props, {
    ignoreFallback: shouldIgnore
  }));
  var shared = _extends({
    ref,
    objectFit: fit,
    objectPosition: align
  }, shouldIgnore ? rest : omit(rest, ["onError", "onLoad"]));
  if (status !== "loaded") {
    if (fallback)
      return fallback;
    return /* @__PURE__ */ react.exports.createElement(chakra.img, _extends({
      as: NativeImage,
      className: "chakra-image__placeholder",
      src: fallbackSrc
    }, shared));
  }
  return /* @__PURE__ */ react.exports.createElement(chakra.img, _extends({
    as: NativeImage,
    src,
    srcSet,
    crossOrigin,
    loading,
    className: "chakra-image"
  }, shared));
});
if (__DEV__) {
  Image$1.displayName = "Image";
}
export {
  Image$1 as I
};
//# sourceMappingURL=chakra-ui-image.esm.74a35fbd.js.map
