import { i as forwardRef, _ as __DEV__, k as useMultiStyleConfig, o as omitThemingProps, r as react, l as StylesProvider, d as chakra, m as cx, n as useStyles, p as mergeRefs, q as motion, s as useStyleConfig, t as useTheme, v as getCSSVar, w as isString, x as omit, y as pick, a as jsx, z as Fragment$1, j as jsxs, A as AnimatePresence, P as Portal$1, V as VisuallyHidden, D as useDisclosure, E as useId, G as useEventListener, J as callAllHandlers, K as px, L as CID, M as ipfsLinkPattern, N as NETWORKS, O as getAugmentedNamespace, Q as getDefaultExportFromCjs, R as React, U as propTypes, W as Link, S as Stack, T as Text, F as Flex, X as Spinner, Y as Box, Z as Link$1 } from "./index.32121adf.js";
function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e2 = m2[i];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source2 = arguments[i];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$2(source2, excluded) {
  if (source2 == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key2, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key2 = sourceKeys[i];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source2[key2];
  }
  return target;
}
var _excluded2 = ["className"], _excluded3 = ["placement"], _excluded4 = ["isNumeric"], _excluded5 = ["isNumeric"];
var Table = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Table", props);
  var _omitThemingProps = omitThemingProps(props), className = _omitThemingProps.className, tableProps = _objectWithoutPropertiesLoose$2(_omitThemingProps, _excluded2);
  return /* @__PURE__ */ react.exports.createElement(StylesProvider, {
    value: styles
  }, /* @__PURE__ */ react.exports.createElement(chakra.table, _extends$2({
    role: "table",
    ref,
    __css: styles.table,
    className: cx("chakra-table", className)
  }, tableProps)));
});
if (__DEV__) {
  Table.displayName = "Table";
}
var TableCaption = /* @__PURE__ */ forwardRef(function(props, ref) {
  var _props$placement = props.placement, placement = _props$placement === void 0 ? "bottom" : _props$placement, rest = _objectWithoutPropertiesLoose$2(props, _excluded3);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.caption, _extends$2({}, rest, {
    ref,
    __css: _extends$2({}, styles.caption, {
      captionSide: placement
    })
  }));
});
if (__DEV__) {
  TableCaption.displayName = "TableCaption";
}
var Thead = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.thead, _extends$2({}, props, {
    ref,
    __css: styles.thead
  }));
});
var Tbody = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.tbody, _extends$2({}, props, {
    ref,
    __css: styles.tbody
  }));
});
var Th = /* @__PURE__ */ forwardRef(function(_ref2, ref) {
  var isNumeric = _ref2.isNumeric, rest = _objectWithoutPropertiesLoose$2(_ref2, _excluded4);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.th, _extends$2({}, rest, {
    ref,
    __css: styles.th,
    "data-is-numeric": isNumeric
  }));
});
var Tr = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.tr, _extends$2({
    role: "row"
  }, props, {
    ref,
    __css: styles.tr
  }));
});
var Td = /* @__PURE__ */ forwardRef(function(_ref3, ref) {
  var isNumeric = _ref3.isNumeric, rest = _objectWithoutPropertiesLoose$2(_ref3, _excluded5);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.td, _extends$2({
    role: "gridcell"
  }, rest, {
    ref,
    __css: styles.td,
    "data-is-numeric": isNumeric
  }));
});
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read$1 = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read$1, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element2) {
  return element2 ? (element2.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}
function isElement$1(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element2 = state.elements[name];
    if (!isHTMLElement(element2) || !getNodeName(element2)) {
      return;
    }
    Object.assign(element2.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element2.removeAttribute(name2);
      } else {
        element2.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element2 = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element2) || !getNodeName(element2)) {
        return;
      }
      Object.assign(element2.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element2.removeAttribute(attribute);
      });
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
var max = Math.max;
var min = Math.min;
var round = Math.round;
function getBoundingClientRect(element2, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  var rect = element2.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (isHTMLElement(element2) && includeScale) {
    var offsetHeight = element2.offsetHeight;
    var offsetWidth = element2.offsetWidth;
    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }
    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element2) {
  var clientRect = getBoundingClientRect(element2);
  var width = element2.offsetWidth;
  var height = element2.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element2.offsetLeft,
    y: element2.offsetTop,
    width,
    height
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function isTableElement(element2) {
  return ["table", "td", "th"].indexOf(getNodeName(element2)) >= 0;
}
function getDocumentElement(element2) {
  return ((isElement$1(element2) ? element2.ownerDocument : element2.document) || window.document).documentElement;
}
function getParentNode(element2) {
  if (getNodeName(element2) === "html") {
    return element2;
  }
  return element2.assignedSlot || element2.parentNode || (isShadowRoot(element2) ? element2.host : null) || getDocumentElement(element2);
}
function getTrueOffsetParent(element2) {
  if (!isHTMLElement(element2) || getComputedStyle(element2).position === "fixed") {
    return null;
  }
  return element2.offsetParent;
}
function getContainingBlock(element2) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element2)) {
    var elementCss = getComputedStyle(element2);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element2);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element2) {
  var window2 = getWindow(element2);
  var offsetParent = getTrueOffsetParent(element2);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element2) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min2, value, max2) {
  var v2 = within(min2, value, max2);
  return v2 > max2 ? max2 : v2;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys2) {
  return keys2.reduce(function(hashMap, key2) {
    hashMap[key2] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
const arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash$1[matched];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element2) {
  return getBoundingClientRect(getDocumentElement(element2)).left + getWindowScroll(element2).scrollLeft;
}
function getViewportRect(element2) {
  var win = getWindow(element2);
  var html2 = getDocumentElement(element2);
  var visualViewport = win.visualViewport;
  var width = html2.clientWidth;
  var height = html2.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element2),
    y
  };
}
function getDocumentRect(element2) {
  var _element$ownerDocumen;
  var html2 = getDocumentElement(element2);
  var winScroll = getWindowScroll(element2);
  var body = (_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html2.scrollWidth, html2.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html2.scrollHeight, html2.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element2);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html2).direction === "rtl") {
    x += max(html2.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function isScrollParent(element2) {
  var _getComputedStyle = getComputedStyle(element2), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element2, list2) {
  var _element$ownerDocumen;
  if (list2 === void 0) {
    list2 = [];
  }
  var scrollParent = getScrollParent(element2);
  var isBody = scrollParent === ((_element$ownerDocumen = element2.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list2.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element2) {
  var rect = getBoundingClientRect(element2);
  rect.top = rect.top + element2.clientTop;
  rect.left = rect.left + element2.clientLeft;
  rect.bottom = rect.top + element2.clientHeight;
  rect.right = rect.left + element2.clientWidth;
  rect.width = element2.clientWidth;
  rect.height = element2.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element2, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element2)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element2)));
}
function getClippingParents(element2) {
  var clippingParents2 = listScrollParents(getParentNode(element2));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element2).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element2) ? getOffsetParent(element2) : element2;
  if (!isElement$1(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element2, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element2) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element2, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element2, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element2 = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element2.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element2.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element2.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element2.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element2[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element2[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element2 = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement$1(element2) ? element2 : element2.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key2) {
      var multiply = [right, bottom].indexOf(key2) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key2) >= 0 ? "y" : "x";
      overflowOffsets[key2] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b2) {
    return overflows[a] - overflows[b2];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks2 = [];
    if (checkMainAxis) {
      checks2.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks2.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks2.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks2);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks3 = checksMap.get(placement2);
        if (checks3) {
          return checks3.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
const flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
const hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
const offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = offset2 + overflow[mainSide];
    var max$1 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element2) {
  return {
    scrollLeft: element2.scrollLeft,
    scrollTop: element2.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element2) {
  var rect = element2.getBoundingClientRect();
  var scaleX = round(rect.width) / element2.offsetWidth || 1;
  var scaleY = round(rect.height) / element2.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order$1(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order$1(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce(fn6) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn6());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key2) {
    return merged[key2];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element2) {
    return !(element2 && typeof element2.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement$1(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m2) {
          return m2.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index2 = 0; index2 < state.orderedModifiers.length; index2++) {
          if (state.reset === true) {
            state.reset = false;
            index2 = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index2], fn6 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn6 === "function") {
            state = fn6({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect5 = _ref3.effect;
        if (typeof effect5 === "function") {
          var cleanupFn = effect5({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn6) {
        return fn6();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
function _objectWithoutPropertiesLoose$1(source2, excluded) {
  if (source2 == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key2, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key2 = sourceKeys[i];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source2[key2];
  }
  return target;
}
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source2 = arguments[i];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
var toVar = function toVar2(value, fallback) {
  return {
    "var": value,
    varRef: fallback ? "var(" + value + ", " + fallback + ")" : "var(" + value + ")"
  };
};
var cssVars = {
  arrowShadowColor: toVar("--popper-arrow-shadow-color"),
  arrowSize: toVar("--popper-arrow-size", "8px"),
  arrowSizeHalf: toVar("--popper-arrow-size-half"),
  arrowBg: toVar("--popper-arrow-bg"),
  transformOrigin: toVar("--popper-transform-origin"),
  arrowOffset: toVar("--popper-arrow-offset")
};
function getBoxShadow(placement) {
  if (placement.includes("top"))
    return "1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("bottom"))
    return "-1px -1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("right"))
    return "-1px 1px 1px 0 var(--popper-arrow-shadow-color)";
  if (placement.includes("left"))
    return "1px -1px 1px 0 var(--popper-arrow-shadow-color)";
}
var transforms = {
  top: "bottom center",
  "top-start": "bottom left",
  "top-end": "bottom right",
  bottom: "top center",
  "bottom-start": "top left",
  "bottom-end": "top right",
  left: "right center",
  "left-start": "right top",
  "left-end": "right bottom",
  right: "left center",
  "right-start": "left top",
  "right-end": "left bottom"
};
var toTransformOrigin = function toTransformOrigin2(placement) {
  return transforms[placement];
};
var defaultEventListeners = {
  scroll: true,
  resize: true
};
function getEventListenerOptions(value) {
  var eventListeners2;
  if (typeof value === "object") {
    eventListeners2 = {
      enabled: true,
      options: _extends$1({}, defaultEventListeners, value)
    };
  } else {
    eventListeners2 = {
      enabled: value,
      options: defaultEventListeners
    };
  }
  return eventListeners2;
}
var matchWidth = {
  name: "matchWidth",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: function fn2(_ref) {
    var state = _ref.state;
    state.styles.popper.width = state.rects.reference.width + "px";
  },
  effect: function effect2(_ref2) {
    var state = _ref2.state;
    return function() {
      var reference2 = state.elements.reference;
      state.elements.popper.style.width = reference2.offsetWidth + "px";
    };
  }
};
var transformOrigin = {
  name: "transformOrigin",
  enabled: true,
  phase: "write",
  fn: function fn3(_ref3) {
    var state = _ref3.state;
    setTransformOrigin(state);
  },
  effect: function effect3(_ref4) {
    var state = _ref4.state;
    return function() {
      setTransformOrigin(state);
    };
  }
};
var setTransformOrigin = function setTransformOrigin2(state) {
  state.elements.popper.style.setProperty(cssVars.transformOrigin["var"], toTransformOrigin(state.placement));
};
var positionArrow = {
  name: "positionArrow",
  enabled: true,
  phase: "afterWrite",
  fn: function fn4(_ref5) {
    var state = _ref5.state;
    setArrowStyles(state);
  }
};
var setArrowStyles = function setArrowStyles2(state) {
  var _state$elements;
  if (!state.placement)
    return;
  var overrides = getArrowStyle$1(state.placement);
  if ((_state$elements = state.elements) != null && _state$elements.arrow && overrides) {
    var _Object$assign, _vars;
    Object.assign(state.elements.arrow.style, (_Object$assign = {}, _Object$assign[overrides.property] = overrides.value, _Object$assign.width = cssVars.arrowSize.varRef, _Object$assign.height = cssVars.arrowSize.varRef, _Object$assign.zIndex = -1, _Object$assign));
    var vars = (_vars = {}, _vars[cssVars.arrowSizeHalf["var"]] = "calc(" + cssVars.arrowSize.varRef + " / 2)", _vars[cssVars.arrowOffset["var"]] = "calc(" + cssVars.arrowSizeHalf.varRef + " * -1)", _vars);
    for (var property in vars) {
      state.elements.arrow.style.setProperty(property, vars[property]);
    }
  }
};
var getArrowStyle$1 = function getArrowStyle(placement) {
  if (placement.startsWith("top")) {
    return {
      property: "bottom",
      value: cssVars.arrowOffset.varRef
    };
  }
  if (placement.startsWith("bottom")) {
    return {
      property: "top",
      value: cssVars.arrowOffset.varRef
    };
  }
  if (placement.startsWith("left")) {
    return {
      property: "right",
      value: cssVars.arrowOffset.varRef
    };
  }
  if (placement.startsWith("right")) {
    return {
      property: "left",
      value: cssVars.arrowOffset.varRef
    };
  }
};
var innerArrow = {
  name: "innerArrow",
  enabled: true,
  phase: "main",
  requires: ["arrow"],
  fn: function fn5(_ref6) {
    var state = _ref6.state;
    setInnerArrowStyles(state);
  },
  effect: function effect4(_ref7) {
    var state = _ref7.state;
    return function() {
      setInnerArrowStyles(state);
    };
  }
};
var setInnerArrowStyles = function setInnerArrowStyles2(state) {
  if (!state.elements.arrow)
    return;
  var inner = state.elements.arrow.querySelector("[data-popper-arrow-inner]");
  if (!inner)
    return;
  Object.assign(inner.style, {
    transform: "rotate(45deg)",
    background: cssVars.arrowBg.varRef,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "inherit",
    boxShadow: getBoxShadow(state.placement)
  });
};
var logicals = {
  "start-start": {
    ltr: "left-start",
    rtl: "right-start"
  },
  "start-end": {
    ltr: "left-end",
    rtl: "right-end"
  },
  "end-start": {
    ltr: "right-start",
    rtl: "left-start"
  },
  "end-end": {
    ltr: "right-end",
    rtl: "left-end"
  },
  start: {
    ltr: "left",
    rtl: "right"
  },
  end: {
    ltr: "right",
    rtl: "left"
  }
};
var opposites = {
  "auto-start": "auto-end",
  "auto-end": "auto-start",
  "top-start": "top-end",
  "top-end": "top-start",
  "bottom-start": "bottom-end",
  "bottom-end": "bottom-start"
};
function getPopperPlacement(placement, dir) {
  var _logicals$placement, _opposites$placement;
  if (dir === void 0) {
    dir = "ltr";
  }
  var value = ((_logicals$placement = logicals[placement]) == null ? void 0 : _logicals$placement[dir]) || placement;
  if (dir === "ltr")
    return value;
  return (_opposites$placement = opposites[placement]) != null ? _opposites$placement : value;
}
var _excluded$2 = ["size", "shadowColor", "bg", "style"];
function usePopper(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, _props$enabled = _props.enabled, enabled = _props$enabled === void 0 ? true : _props$enabled, modifiers = _props.modifiers, _props$placement = _props.placement, placementProp = _props$placement === void 0 ? "bottom" : _props$placement, _props$strategy = _props.strategy, strategy = _props$strategy === void 0 ? "absolute" : _props$strategy, _props$arrowPadding = _props.arrowPadding, arrowPadding = _props$arrowPadding === void 0 ? 8 : _props$arrowPadding, _props$eventListeners = _props.eventListeners, eventListeners2 = _props$eventListeners === void 0 ? true : _props$eventListeners, offset2 = _props.offset, _props$gutter = _props.gutter, gutter = _props$gutter === void 0 ? 8 : _props$gutter, _props$flip = _props.flip, flip2 = _props$flip === void 0 ? true : _props$flip, _props$boundary = _props.boundary, boundary = _props$boundary === void 0 ? "clippingParents" : _props$boundary, _props$preventOverflo = _props.preventOverflow, preventOverflow2 = _props$preventOverflo === void 0 ? true : _props$preventOverflo, matchWidth$1 = _props.matchWidth, _props$direction = _props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction;
  var reference2 = react.exports.useRef(null);
  var popper2 = react.exports.useRef(null);
  var instance = react.exports.useRef(null);
  var placement = getPopperPlacement(placementProp, direction);
  var cleanup = react.exports.useRef(function() {
  });
  var setupPopper = react.exports.useCallback(function() {
    if (!enabled || !reference2.current || !popper2.current)
      return;
    cleanup.current == null ? void 0 : cleanup.current();
    instance.current = createPopper(reference2.current, popper2.current, {
      placement,
      modifiers: [innerArrow, positionArrow, transformOrigin, _extends$1({}, matchWidth, {
        enabled: !!matchWidth$1
      }), _extends$1({
        name: "eventListeners"
      }, getEventListenerOptions(eventListeners2)), {
        name: "arrow",
        options: {
          padding: arrowPadding
        }
      }, {
        name: "offset",
        options: {
          offset: offset2 != null ? offset2 : [0, gutter]
        }
      }, {
        name: "flip",
        enabled: !!flip2,
        options: {
          padding: 8
        }
      }, {
        name: "preventOverflow",
        enabled: !!preventOverflow2,
        options: {
          boundary
        }
      }].concat(modifiers != null ? modifiers : []),
      strategy
    });
    instance.current.forceUpdate();
    cleanup.current = instance.current.destroy;
  }, [placement, enabled, modifiers, matchWidth$1, eventListeners2, arrowPadding, offset2, gutter, flip2, preventOverflow2, boundary, strategy]);
  react.exports.useEffect(function() {
    return function() {
      if (!reference2.current && !popper2.current) {
        var _instance$current;
        (_instance$current = instance.current) == null ? void 0 : _instance$current.destroy();
        instance.current = null;
      }
    };
  }, []);
  var referenceRef = react.exports.useCallback(function(node) {
    reference2.current = node;
    setupPopper();
  }, [setupPopper]);
  var getReferenceProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    return _extends$1({}, props2, {
      ref: mergeRefs(referenceRef, ref)
    });
  }, [referenceRef]);
  var popperRef = react.exports.useCallback(function(node) {
    popper2.current = node;
    setupPopper();
  }, [setupPopper]);
  var getPopperProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    return _extends$1({}, props2, {
      ref: mergeRefs(popperRef, ref),
      style: _extends$1({}, props2.style, {
        position: strategy,
        minWidth: "max-content",
        inset: "0 auto auto 0"
      })
    });
  }, [strategy, popperRef]);
  var getArrowProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    var _props2 = props2;
    _props2.size;
    _props2.shadowColor;
    _props2.bg;
    _props2.style;
    var rest = _objectWithoutPropertiesLoose$1(_props2, _excluded$2);
    return _extends$1({}, rest, {
      ref,
      "data-popper-arrow": "",
      style: getArrowStyle2(props2)
    });
  }, []);
  var getArrowInnerProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    return _extends$1({}, props2, {
      ref,
      "data-popper-arrow-inner": ""
    });
  }, []);
  return {
    update: function update() {
      var _instance$current2;
      (_instance$current2 = instance.current) == null ? void 0 : _instance$current2.update();
    },
    forceUpdate: function forceUpdate() {
      var _instance$current3;
      (_instance$current3 = instance.current) == null ? void 0 : _instance$current3.forceUpdate();
    },
    transformOrigin: cssVars.transformOrigin.varRef,
    referenceRef,
    popperRef,
    getPopperProps,
    getArrowProps,
    getArrowInnerProps,
    getReferenceProps
  };
}
function getArrowStyle2(props) {
  var size = props.size, shadowColor = props.shadowColor, bg = props.bg, style = props.style;
  var computedStyle = _extends$1({}, style, {
    position: "absolute"
  });
  if (size) {
    computedStyle["--popper-arrow-size"] = size;
  }
  if (shadowColor) {
    computedStyle["--popper-arrow-shadow-color"] = shadowColor;
  }
  if (bg) {
    computedStyle["--popper-arrow-bg"] = bg;
  }
  return computedStyle;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source2 = arguments[i];
      for (var key2 in source2) {
        if (Object.prototype.hasOwnProperty.call(source2, key2)) {
          target[key2] = source2[key2];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source2, excluded) {
  if (source2 == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source2);
  var key2, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key2 = sourceKeys[i];
    if (excluded.indexOf(key2) >= 0)
      continue;
    target[key2] = source2[key2];
  }
  return target;
}
var scale = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.15,
        easings: "easeInOut"
      },
      scale: {
        duration: 0.2,
        easings: "easeInOut"
      }
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: {
        easings: "easeOut",
        duration: 0.2
      },
      scale: {
        duration: 0.2,
        ease: [0.175, 0.885, 0.4, 1.1]
      }
    }
  }
};
var _excluded$1 = ["openDelay", "closeDelay", "closeOnClick", "closeOnMouseDown", "closeOnEsc", "onOpen", "onClose", "placement", "id", "isOpen", "defaultIsOpen", "arrowSize", "arrowShadowColor", "arrowPadding", "modifiers", "isDisabled", "gutter", "offset", "direction"];
function useTooltip(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, _props$openDelay = _props.openDelay, openDelay = _props$openDelay === void 0 ? 0 : _props$openDelay, _props$closeDelay = _props.closeDelay, closeDelay = _props$closeDelay === void 0 ? 0 : _props$closeDelay, _props$closeOnClick = _props.closeOnClick, closeOnClick = _props$closeOnClick === void 0 ? true : _props$closeOnClick, closeOnMouseDown = _props.closeOnMouseDown, _props$closeOnEsc = _props.closeOnEsc, closeOnEsc = _props$closeOnEsc === void 0 ? true : _props$closeOnEsc, onOpenProp = _props.onOpen, onCloseProp = _props.onClose, placement = _props.placement, id = _props.id, isOpenProp = _props.isOpen, defaultIsOpen = _props.defaultIsOpen, _props$arrowSize = _props.arrowSize, arrowSize = _props$arrowSize === void 0 ? 10 : _props$arrowSize, arrowShadowColor = _props.arrowShadowColor, arrowPadding = _props.arrowPadding, modifiers = _props.modifiers, isDisabled = _props.isDisabled, gutter = _props.gutter, offset2 = _props.offset, direction = _props.direction, htmlProps = _objectWithoutPropertiesLoose(_props, _excluded$1);
  var _useDisclosure = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  }), isOpen = _useDisclosure.isOpen, onOpen = _useDisclosure.onOpen, onClose = _useDisclosure.onClose;
  var _usePopper = usePopper({
    enabled: isOpen,
    placement,
    arrowPadding,
    modifiers,
    gutter,
    offset: offset2,
    direction
  }), referenceRef = _usePopper.referenceRef, getPopperProps = _usePopper.getPopperProps, getArrowInnerProps = _usePopper.getArrowInnerProps, getArrowProps = _usePopper.getArrowProps;
  var tooltipId = useId(id, "tooltip");
  var ref = react.exports.useRef(null);
  var enterTimeout = react.exports.useRef();
  var exitTimeout = react.exports.useRef();
  var openWithDelay = react.exports.useCallback(function() {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = react.exports.useCallback(function() {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }
    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = react.exports.useCallback(function() {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = react.exports.useCallback(function() {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);
  var onKeyDown = react.exports.useCallback(function(event) {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  }, [isOpen, closeWithDelay]);
  useEventListener("keydown", closeOnEsc ? onKeyDown : void 0);
  react.exports.useEffect(function() {
    return function() {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    };
  }, []);
  useEventListener("mouseleave", closeWithDelay, function() {
    return ref.current;
  });
  var getTriggerProps = react.exports.useCallback(function(props2, _ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (_ref === void 0) {
      _ref = null;
    }
    var triggerProps = _extends({}, props2, {
      ref: mergeRefs(ref, _ref, referenceRef),
      onMouseEnter: callAllHandlers(props2.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props2.onClick, onClick),
      onMouseDown: callAllHandlers(props2.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props2.onFocus, openWithDelay),
      onBlur: callAllHandlers(props2.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : void 0
    });
    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = react.exports.useCallback(function(props2, forwardedRef) {
    var _extends2;
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return getPopperProps(_extends({}, props2, {
      style: _extends({}, props2.style, (_extends2 = {}, _extends2[cssVars.arrowSize["var"]] = arrowSize ? px(arrowSize) : void 0, _extends2[cssVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2))
    }), forwardedRef);
  }, [getPopperProps, arrowSize, arrowShadowColor]);
  var getTooltipProps = react.exports.useCallback(function(props2, _ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (_ref === void 0) {
      _ref = null;
    }
    var tooltipProps = _extends({
      ref: _ref
    }, htmlProps, props2, {
      id: tooltipId,
      role: "tooltip",
      style: _extends({}, props2.style, {
        position: "relative",
        transformOrigin: cssVars.transformOrigin.varRef
      })
    });
    return tooltipProps;
  }, [htmlProps, tooltipId]);
  return {
    isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps,
    getTooltipProps,
    getTooltipPositionerProps,
    getArrowProps,
    getArrowInnerProps
  };
}
var _excluded = ["children", "label", "shouldWrapChildren", "aria-label", "hasArrow", "bg", "portalProps", "background", "backgroundColor", "bgColor"];
var StyledTooltip = chakra(motion.div);
var Tooltip = /* @__PURE__ */ forwardRef(function(props, ref) {
  var _ref, _ref2;
  var styles = useStyleConfig("Tooltip", props);
  var ownProps = omitThemingProps(props);
  var theme = useTheme();
  var children = ownProps.children, label = ownProps.label, shouldWrapChildren = ownProps.shouldWrapChildren, ariaLabel = ownProps["aria-label"], hasArrow = ownProps.hasArrow, bg = ownProps.bg, portalProps = ownProps.portalProps, background = ownProps.background, backgroundColor = ownProps.backgroundColor, bgColor = ownProps.bgColor, rest = _objectWithoutPropertiesLoose(ownProps, _excluded);
  var userDefinedBg = (_ref = (_ref2 = background != null ? background : backgroundColor) != null ? _ref2 : bg) != null ? _ref : bgColor;
  if (userDefinedBg) {
    styles.bg = userDefinedBg;
    styles[cssVars.arrowBg["var"]] = getCSSVar(theme, "colors", userDefinedBg);
  }
  var tooltip = useTooltip(_extends({}, rest, {
    direction: theme.direction
  }));
  var shouldWrap = isString(children) || shouldWrapChildren;
  var trigger;
  if (shouldWrap) {
    trigger = /* @__PURE__ */ react.exports.createElement(chakra.span, _extends({
      tabIndex: 0
    }, tooltip.getTriggerProps()), children);
  } else {
    var child = react.exports.Children.only(children);
    trigger = /* @__PURE__ */ react.exports.cloneElement(child, tooltip.getTriggerProps(child.props, child.ref));
  }
  var hasAriaLabel = !!ariaLabel;
  var _tooltipProps = tooltip.getTooltipProps({}, ref);
  var tooltipProps = hasAriaLabel ? omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = pick(_tooltipProps, ["role", "id"]);
  if (!label) {
    return /* @__PURE__ */ jsx(Fragment$1, {
      children
    });
  }
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [trigger, /* @__PURE__ */ jsx(AnimatePresence, {
      children: tooltip.isOpen && /* @__PURE__ */ react.exports.createElement(Portal$1, portalProps, /* @__PURE__ */ react.exports.createElement(
        chakra.div,
        _extends({}, tooltip.getTooltipPositionerProps(), {
          __css: {
            zIndex: styles.zIndex,
            pointerEvents: "none"
          }
        }),
        /* @__PURE__ */ jsxs(StyledTooltip, {
          variants: scale,
          ...tooltipProps,
          initial: "exit",
          animate: "enter",
          exit: "exit",
          __css: styles,
          children: [label, hasAriaLabel && /* @__PURE__ */ jsx(VisuallyHidden, {
            ...hiddenProps,
            children: ariaLabel
          }), hasArrow && /* @__PURE__ */ react.exports.createElement(chakra.div, {
            "data-popper-arrow": true,
            className: "chakra-tooltip__arrow-wrapper"
          }, /* @__PURE__ */ react.exports.createElement(chakra.div, {
            "data-popper-arrow-inner": true,
            className: "chakra-tooltip__arrow",
            __css: {
              bg: styles.bg
            }
          }))]
        })
      ))
    })]
  });
});
if (__DEV__) {
  Tooltip.displayName = "Tooltip";
}
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
var unicode = {
  Space_Separator,
  ID_Start,
  ID_Continue
};
var util = {
  isSpaceSeparator(c2) {
    return typeof c2 === "string" && unicode.Space_Separator.test(c2);
  },
  isIdStartChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
  },
  isIdContinueChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "\u200C" || c2 === "\u200D" || unicode.ID_Continue.test(c2));
  },
  isDigit(c2) {
    return typeof c2 === "string" && /[0-9]/.test(c2);
  },
  isHexDigit(c2) {
    return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
  }
};
let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token;
let key;
let root$1;
var parse$2 = function parse(text2, reviver) {
  source = String(text2);
  parseState = "start";
  stack = [];
  pos = 0;
  line = 1;
  column = 0;
  token = void 0;
  key = void 0;
  root$1 = void 0;
  do {
    token = lex();
    parseStates[parseState]();
  } while (token.type !== "eof");
  if (typeof reviver === "function") {
    return internalize({ "": root$1 }, "", reviver);
  }
  return root$1;
};
function internalize(holder, name, reviver) {
  const value = holder[name];
  if (value != null && typeof value === "object") {
    for (const key2 in value) {
      const replacement = internalize(value, key2, reviver);
      if (replacement === void 0) {
        delete value[key2];
      } else {
        value[key2] = replacement;
      }
    }
  }
  return reviver.call(holder, name, value);
}
let lexState;
let buffer;
let doubleQuote;
let sign;
let c$1;
function lex() {
  lexState = "default";
  buffer = "";
  doubleQuote = false;
  sign = 1;
  for (; ; ) {
    c$1 = peek();
    const token2 = lexStates[lexState]();
    if (token2) {
      return token2;
    }
  }
}
function peek() {
  if (source[pos]) {
    return String.fromCodePoint(source.codePointAt(pos));
  }
}
function read() {
  const c2 = peek();
  if (c2 === "\n") {
    line++;
    column = 0;
  } else if (c2) {
    column += c2.length;
  } else {
    column++;
  }
  if (c2) {
    pos += c2.length;
  }
  return c2;
}
const lexStates = {
  default() {
    switch (c$1) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case "\xA0":
      case "\uFEFF":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        return;
      case "/":
        read();
        lexState = "comment";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    if (util.isSpaceSeparator(c$1)) {
      read();
      return;
    }
    return lexStates[parseState]();
  },
  comment() {
    switch (c$1) {
      case "*":
        read();
        lexState = "multiLineComment";
        return;
      case "/":
        read();
        lexState = "singleLineComment";
        return;
    }
    throw invalidChar(read());
  },
  multiLineComment() {
    switch (c$1) {
      case "*":
        read();
        lexState = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
  },
  multiLineCommentAsterisk() {
    switch (c$1) {
      case "*":
        read();
        return;
      case "/":
        read();
        lexState = "default";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
    lexState = "multiLineComment";
  },
  singleLineComment() {
    switch (c$1) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        lexState = "default";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    read();
  },
  value() {
    switch (c$1) {
      case "{":
      case "[":
        return newToken("punctuator", read());
      case "n":
        read();
        literal("ull");
        return newToken("null", null);
      case "t":
        read();
        literal("rue");
        return newToken("boolean", true);
      case "f":
        read();
        literal("alse");
        return newToken("boolean", false);
      case "-":
      case "+":
        if (read() === "-") {
          sign = -1;
        }
        lexState = "sign";
        return;
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
      case '"':
      case "'":
        doubleQuote = read() === '"';
        buffer = "";
        lexState = "string";
        return;
    }
    throw invalidChar(read());
  },
  identifierNameStartEscape() {
    if (c$1 !== "u") {
      throw invalidChar(read());
    }
    read();
    const u2 = unicodeEscape();
    switch (u2) {
      case "$":
      case "_":
        break;
      default:
        if (!util.isIdStartChar(u2)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u2;
    lexState = "identifierName";
  },
  identifierName() {
    switch (c$1) {
      case "$":
      case "_":
      case "\u200C":
      case "\u200D":
        buffer += read();
        return;
      case "\\":
        read();
        lexState = "identifierNameEscape";
        return;
    }
    if (util.isIdContinueChar(c$1)) {
      buffer += read();
      return;
    }
    return newToken("identifier", buffer);
  },
  identifierNameEscape() {
    if (c$1 !== "u") {
      throw invalidChar(read());
    }
    read();
    const u2 = unicodeEscape();
    switch (u2) {
      case "$":
      case "_":
      case "\u200C":
      case "\u200D":
        break;
      default:
        if (!util.isIdContinueChar(u2)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u2;
    lexState = "identifierName";
  },
  sign() {
    switch (c$1) {
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", sign * Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
    }
    throw invalidChar(read());
  },
  zero() {
    switch (c$1) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
      case "x":
      case "X":
        buffer += read();
        lexState = "hexadecimal";
        return;
    }
    return newToken("numeric", sign * 0);
  },
  decimalInteger() {
    switch (c$1) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c$1)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalPointLeading() {
    if (util.isDigit(c$1)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    throw invalidChar(read());
  },
  decimalPoint() {
    switch (c$1) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c$1)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalFraction() {
    switch (c$1) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util.isDigit(c$1)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalExponent() {
    switch (c$1) {
      case "+":
      case "-":
        buffer += read();
        lexState = "decimalExponentSign";
        return;
    }
    if (util.isDigit(c$1)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentSign() {
    if (util.isDigit(c$1)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentInteger() {
    if (util.isDigit(c$1)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  hexadecimal() {
    if (util.isHexDigit(c$1)) {
      buffer += read();
      lexState = "hexadecimalInteger";
      return;
    }
    throw invalidChar(read());
  },
  hexadecimalInteger() {
    if (util.isHexDigit(c$1)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  string() {
    switch (c$1) {
      case "\\":
        read();
        buffer += escape();
        return;
      case '"':
        if (doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "'":
        if (!doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "\n":
      case "\r":
        throw invalidChar(read());
      case "\u2028":
      case "\u2029":
        separatorChar(c$1);
        break;
      case void 0:
        throw invalidChar(read());
    }
    buffer += read();
  },
  start() {
    switch (c$1) {
      case "{":
      case "[":
        return newToken("punctuator", read());
    }
    lexState = "value";
  },
  beforePropertyName() {
    switch (c$1) {
      case "$":
      case "_":
        buffer = read();
        lexState = "identifierName";
        return;
      case "\\":
        read();
        lexState = "identifierNameStartEscape";
        return;
      case "}":
        return newToken("punctuator", read());
      case '"':
      case "'":
        doubleQuote = read() === '"';
        lexState = "string";
        return;
    }
    if (util.isIdStartChar(c$1)) {
      buffer += read();
      lexState = "identifierName";
      return;
    }
    throw invalidChar(read());
  },
  afterPropertyName() {
    if (c$1 === ":") {
      return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforePropertyValue() {
    lexState = "value";
  },
  afterPropertyValue() {
    switch (c$1) {
      case ",":
      case "}":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforeArrayValue() {
    if (c$1 === "]") {
      return newToken("punctuator", read());
    }
    lexState = "value";
  },
  afterArrayValue() {
    switch (c$1) {
      case ",":
      case "]":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  end() {
    throw invalidChar(read());
  }
};
function newToken(type, value) {
  return {
    type,
    value,
    line,
    column
  };
}
function literal(s) {
  for (const c2 of s) {
    const p2 = peek();
    if (p2 !== c2) {
      throw invalidChar(read());
    }
    read();
  }
}
function escape() {
  const c2 = peek();
  switch (c2) {
    case "b":
      read();
      return "\b";
    case "f":
      read();
      return "\f";
    case "n":
      read();
      return "\n";
    case "r":
      read();
      return "\r";
    case "t":
      read();
      return "	";
    case "v":
      read();
      return "\v";
    case "0":
      read();
      if (util.isDigit(peek())) {
        throw invalidChar(read());
      }
      return "\0";
    case "x":
      read();
      return hexEscape();
    case "u":
      read();
      return unicodeEscape();
    case "\n":
    case "\u2028":
    case "\u2029":
      read();
      return "";
    case "\r":
      read();
      if (peek() === "\n") {
        read();
      }
      return "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw invalidChar(read());
    case void 0:
      throw invalidChar(read());
  }
  return read();
}
function hexEscape() {
  let buffer2 = "";
  let c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  c2 = peek();
  if (!util.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  return String.fromCodePoint(parseInt(buffer2, 16));
}
function unicodeEscape() {
  let buffer2 = "";
  let count = 4;
  while (count-- > 0) {
    const c2 = peek();
    if (!util.isHexDigit(c2)) {
      throw invalidChar(read());
    }
    buffer2 += read();
  }
  return String.fromCodePoint(parseInt(buffer2, 16));
}
const parseStates = {
  start() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push$1();
  },
  beforePropertyName() {
    switch (token.type) {
      case "identifier":
      case "string":
        key = token.value;
        parseState = "afterPropertyName";
        return;
      case "punctuator":
        pop();
        return;
      case "eof":
        throw invalidEOF();
    }
  },
  afterPropertyName() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    parseState = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push$1();
  },
  beforeArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    if (token.type === "punctuator" && token.value === "]") {
      pop();
      return;
    }
    push$1();
  },
  afterPropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforePropertyName";
        return;
      case "}":
        pop();
    }
  },
  afterArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforeArrayValue";
        return;
      case "]":
        pop();
    }
  },
  end() {
  }
};
function push$1() {
  let value;
  switch (token.type) {
    case "punctuator":
      switch (token.value) {
        case "{":
          value = {};
          break;
        case "[":
          value = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      value = token.value;
      break;
  }
  if (root$1 === void 0) {
    root$1 = value;
  } else {
    const parent = stack[stack.length - 1];
    if (Array.isArray(parent)) {
      parent.push(value);
    } else {
      parent[key] = value;
    }
  }
  if (value !== null && typeof value === "object") {
    stack.push(value);
    if (Array.isArray(value)) {
      parseState = "beforeArrayValue";
    } else {
      parseState = "beforePropertyName";
    }
  } else {
    const current = stack[stack.length - 1];
    if (current == null) {
      parseState = "end";
    } else if (Array.isArray(current)) {
      parseState = "afterArrayValue";
    } else {
      parseState = "afterPropertyValue";
    }
  }
}
function pop() {
  stack.pop();
  const current = stack[stack.length - 1];
  if (current == null) {
    parseState = "end";
  } else if (Array.isArray(current)) {
    parseState = "afterArrayValue";
  } else {
    parseState = "afterPropertyValue";
  }
}
function invalidChar(c2) {
  if (c2 === void 0) {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
}
function invalidEOF() {
  return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
}
function invalidIdentifier() {
  column -= 5;
  return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
}
function separatorChar(c2) {
  console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
}
function formatChar(c2) {
  const replacements = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (replacements[c2]) {
    return replacements[c2];
  }
  if (c2 < " ") {
    const hexString = c2.charCodeAt(0).toString(16);
    return "\\x" + ("00" + hexString).substring(hexString.length);
  }
  return c2;
}
function syntaxError(message) {
  const err = new SyntaxError(message);
  err.lineNumber = line;
  err.columnNumber = column;
  return err;
}
var stringify$2 = function stringify(value, replacer, space2) {
  const stack2 = [];
  let indent = "";
  let propertyList;
  let replacerFunc;
  let gap = "";
  let quote;
  if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
    space2 = replacer.space;
    quote = replacer.quote;
    replacer = replacer.replacer;
  }
  if (typeof replacer === "function") {
    replacerFunc = replacer;
  } else if (Array.isArray(replacer)) {
    propertyList = [];
    for (const v2 of replacer) {
      let item;
      if (typeof v2 === "string") {
        item = v2;
      } else if (typeof v2 === "number" || v2 instanceof String || v2 instanceof Number) {
        item = String(v2);
      }
      if (item !== void 0 && propertyList.indexOf(item) < 0) {
        propertyList.push(item);
      }
    }
  }
  if (space2 instanceof Number) {
    space2 = Number(space2);
  } else if (space2 instanceof String) {
    space2 = String(space2);
  }
  if (typeof space2 === "number") {
    if (space2 > 0) {
      space2 = Math.min(10, Math.floor(space2));
      gap = "          ".substr(0, space2);
    }
  } else if (typeof space2 === "string") {
    gap = space2.substr(0, 10);
  }
  return serializeProperty("", { "": value });
  function serializeProperty(key2, holder) {
    let value2 = holder[key2];
    if (value2 != null) {
      if (typeof value2.toJSON5 === "function") {
        value2 = value2.toJSON5(key2);
      } else if (typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key2);
      }
    }
    if (replacerFunc) {
      value2 = replacerFunc.call(holder, key2, value2);
    }
    if (value2 instanceof Number) {
      value2 = Number(value2);
    } else if (value2 instanceof String) {
      value2 = String(value2);
    } else if (value2 instanceof Boolean) {
      value2 = value2.valueOf();
    }
    switch (value2) {
      case null:
        return "null";
      case true:
        return "true";
      case false:
        return "false";
    }
    if (typeof value2 === "string") {
      return quoteString(value2);
    }
    if (typeof value2 === "number") {
      return String(value2);
    }
    if (typeof value2 === "object") {
      return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
    }
    return void 0;
  }
  function quoteString(value2) {
    const quotes = {
      "'": 0.1,
      '"': 0.2
    };
    const replacements = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    let product = "";
    for (let i = 0; i < value2.length; i++) {
      const c2 = value2[i];
      switch (c2) {
        case "'":
        case '"':
          quotes[c2]++;
          product += c2;
          continue;
        case "\0":
          if (util.isDigit(value2[i + 1])) {
            product += "\\x00";
            continue;
          }
      }
      if (replacements[c2]) {
        product += replacements[c2];
        continue;
      }
      if (c2 < " ") {
        let hexString = c2.charCodeAt(0).toString(16);
        product += "\\x" + ("00" + hexString).substring(hexString.length);
        continue;
      }
      product += c2;
    }
    const quoteChar = quote || Object.keys(quotes).reduce((a, b2) => quotes[a] < quotes[b2] ? a : b2);
    product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
    return quoteChar + product + quoteChar;
  }
  function serializeObject(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let keys2 = propertyList || Object.keys(value2);
    let partial = [];
    for (const key2 of keys2) {
      const propertyString = serializeProperty(key2, value2);
      if (propertyString !== void 0) {
        let member = serializeKey(key2) + ":";
        if (gap !== "") {
          member += " ";
        }
        member += propertyString;
        partial.push(member);
      }
    }
    let final;
    if (partial.length === 0) {
      final = "{}";
    } else {
      let properties;
      if (gap === "") {
        properties = partial.join(",");
        final = "{" + properties + "}";
      } else {
        let separator = ",\n" + indent;
        properties = partial.join(separator);
        final = "{\n" + indent + properties + ",\n" + stepback + "}";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
  function serializeKey(key2) {
    if (key2.length === 0) {
      return quoteString(key2);
    }
    const firstChar = String.fromCodePoint(key2.codePointAt(0));
    if (!util.isIdStartChar(firstChar)) {
      return quoteString(key2);
    }
    for (let i = firstChar.length; i < key2.length; i++) {
      if (!util.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
        return quoteString(key2);
      }
    }
    return key2;
  }
  function serializeArray(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let partial = [];
    for (let i = 0; i < value2.length; i++) {
      const propertyString = serializeProperty(String(i), value2);
      partial.push(propertyString !== void 0 ? propertyString : "null");
    }
    let final;
    if (partial.length === 0) {
      final = "[]";
    } else {
      if (gap === "") {
        let properties = partial.join(",");
        final = "[" + properties + "]";
      } else {
        let separator = ",\n" + indent;
        let properties = partial.join(separator);
        final = "[\n" + indent + properties + ",\n" + stepback + "]";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
};
const JSON5 = {
  parse: parse$2,
  stringify: stringify$2
};
var lib = JSON5;
const httpURL = (uri) => {
  const [, origCID, path2] = uri?.match(/^(?:ipfs|dweb):(?:\/\/)?([^/]+)(?:\/(.*))?$/) ?? [];
  if (origCID) {
    const cid = CID.parse(origCID);
    const v0CID = cid.toV0().toString();
    const v1CID = cid.toV1().toString();
    const pattern = ipfsLinkPattern;
    return encodeURI(
      pattern.replace(/{cid}/g, origCID).replace(/{v0cid}/g, v0CID).replace(/{v1cid}/g, v1CID).replace(/{path}/g, path2 ?? "")
    ).replace(/#/g, "%23");
  }
  return uri;
};
const capitalize = (str) => {
  if (!str?.split)
    return str;
  return str.trim().split(/\s+/g).map((sub) => `${sub[0]?.toUpperCase() ?? ""}${sub.substring(1)?.toLowerCase() ?? ""}`).join(" ");
};
const isEmpty = (val) => {
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  if (val instanceof Object) {
    return Object.keys(val).length === 0;
  }
  if (val === "") {
    return true;
  }
  return false;
};
const isSet = (val) => {
  if (val === "" || val == null) {
    return false;
  }
  return true;
};
const switchTo = async (chain) => {
  const chainId = `0x${chain.toString(16)}`;
  try {
    await window.ethereum.request?.({
      method: "wallet_switchEthereumChain",
      params: [{ chainId }]
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      const chainName = Object.values(NETWORKS).find(
        ({ chainId: chainId2 }) => chain === chainId2
      )?.name;
      throw new Error(
        `The network \u201C${chainName ?? "\u{1D4E4}\u{1D4F7}\u{1D4F4}\u{1D4F7}\u{1D4F8}\u{1D500}\u{1D4F7}"}\u201D is not yet available in your MetaMask.

 Please add it.`
      );
    } else {
      throw switchError;
    }
  }
};
const ipfsify = async ({
  storage,
  filesOrURL
}) => {
  let value = filesOrURL;
  if (value == null || Array.isArray(value) && value.every((v2) => v2 == null)) {
    const str = lib.stringify(value);
    throw new Error(`\`ipfsify\` called with value = \`${str}\``);
  }
  if (Array.isArray(value)) {
    const [last] = value.slice(-1);
    if (typeof last === "string") {
      value = last;
    }
  }
  if (typeof value === "string") {
    if (value.startsWith("ipfs://")) {
      return value;
    }
    throw new Error(`Unknown File String: ${value}`);
  }
  if (storage == null) {
    return null;
  }
  const list2 = Array.isArray(value) ? value : [value];
  const root2 = await storage.storeDirectory(
    list2 instanceof FileList ? list2 : list2.map((entry) => new File(
      [entry.content ?? entry],
      entry.name
    ))
  );
  return `ipfs://${root2.toString()}/${list2[0].name}`;
};
const regexify = (str) => {
  if (!str)
    return str;
  let matches = str.split(/((\w)\2{3,})/g);
  for (let i = 0; i < matches.length - 1; i++) {
    const str2 = matches[i];
    const next = matches[i + 1];
    if ((/* @__PURE__ */ new Set([...str2, ...next])).size === 1) {
      matches[i] += next;
      matches[i + 1] = "";
      i++;
    }
  }
  matches = matches.filter((m2) => m2 !== "");
  const condensed = matches.map((m2) => {
    const [char] = m2;
    if (m2.length > 3 && /\w/.test(char) && new Set(m2).size === 1) {
      return `${char}{${m2.length - 1}}`;
    } else {
      return m2;
    }
  });
  return condensed.join("");
};
const deregexify = (str) => {
  if (!str)
    return str;
  const matches = str.split(/(\w\{\d+\})/);
  const expanded = matches.map((m2) => {
    const [_, char, count] = m2.match(/^(.)\{(\d+)\}/) ?? [];
    if (char && count) {
      return char.repeat(Number(count));
    } else {
      return m2;
    }
  });
  return expanded.join("");
};
const extractMessage = (error) => error.reason ?? error?.error?.message ?? error?.data?.message ?? error?.message ?? (typeof error === "string" ? error : `\u{1D47C}\u{1D48F}\u{1D48C}\u{1D48F}\u{1D490}\u{1D498}\u{1D48F} \u{1D46C}\u{1D493}\u{1D493}\u{1D490}\u{1D493}: ${lib.stringify(error, null, 2)}`);
const spanListToString = (list2) => list2.map((entry) => typeof entry === "number" ? entry.toString() : (() => {
  const { low, high } = entry;
  return `${low}\u2013${high}`;
})()).join(",");
const toSpanList = (str) => {
  if (str == null)
    return [];
  const visibles = str.split(/\s*(\s|,|;)\s*/).filter((str2) => !["", ",", ";"].includes(str2.trim()));
  const list2 = visibles.map((entry) => {
    const parts = entry.split(/[-–—]/);
    if (parts.length > 1) {
      const [[low], [high]] = [parts, parts.slice(-1)];
      return Object.fromEntries(
        Object.entries({ low, high }).map(
          ([key2, val]) => [key2, Number(val)]
        )
      );
    }
    return Number(entry);
  });
  Object.defineProperty(
    list2,
    "toString",
    { get() {
      return () => spanListToString(this);
    } }
  );
  return list2;
};
const protocols = ["http", "https", "mailto", "tel"];
function uriTransformer(uri) {
  const url = (uri || "").trim();
  const first = url.charAt(0);
  if (first === "#" || first === "/") {
    return url;
  }
  const colon = url.indexOf(":");
  if (colon === -1) {
    return url;
  }
  let index2 = -1;
  while (++index2 < protocols.length) {
    const protocol = protocols[index2];
    if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
      return url;
    }
  }
  index2 = url.indexOf("?");
  if (index2 !== -1 && colon > index2) {
    return url;
  }
  index2 = url.indexOf("#");
  if (index2 !== -1 && colon > index2) {
    return url;
  }
  return "javascript:void(0)";
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer = function isBuffer2(obj) {
  return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
};
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point$1(value);
  }
  return "";
}
function point$1(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column);
}
function position(pos2) {
  return point$1(pos2 && pos2.start) + "-" + point$1(pos2 && pos2.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
class VFileMessage extends Error {
  constructor(reason, place, origin) {
    const parts = [null, null];
    let position2 = {
      start: { line: null, column: null },
      end: { line: null, column: null }
    };
    super();
    if (typeof place === "string") {
      origin = place;
      place = void 0;
    }
    if (typeof origin === "string") {
      const index2 = origin.indexOf(":");
      if (index2 === -1) {
        parts[1] = origin;
      } else {
        parts[0] = origin.slice(0, index2);
        parts[1] = origin.slice(index2 + 1);
      }
    }
    if (place) {
      if ("type" in place || "position" in place) {
        if (place.position) {
          position2 = place.position;
        }
      } else if ("start" in place || "end" in place) {
        position2 = place;
      } else if ("line" in place || "column" in place) {
        position2.start = place;
      }
    }
    this.name = stringifyPosition(place) || "1:1";
    this.message = typeof reason === "object" ? reason.message : reason;
    this.stack = typeof reason === "object" ? reason.stack : "";
    this.reason = this.message;
    this.fatal;
    this.line = position2.start.line;
    this.column = position2.start.column;
    this.source = parts[0];
    this.ruleId = parts[1];
    this.position = position2;
    this.actual;
    this.expected;
    this.file;
    this.url;
    this.note;
  }
}
VFileMessage.prototype.file = "";
VFileMessage.prototype.name = "";
VFileMessage.prototype.reason = "";
VFileMessage.prototype.message = "";
VFileMessage.prototype.stack = "";
VFileMessage.prototype.fatal = null;
VFileMessage.prototype.column = null;
VFileMessage.prototype.line = null;
VFileMessage.prototype.source = null;
VFileMessage.prototype.ruleId = null;
VFileMessage.prototype.position = null;
const path = { basename, dirname, extname, join, sep: "/" };
function basename(path2, ext) {
  if (ext !== void 0 && typeof ext !== "string") {
    throw new TypeError('"ext" argument must be a string');
  }
  assertPath$1(path2);
  let start2 = 0;
  let end2 = -1;
  let index2 = path2.length;
  let seenNonSlash;
  if (ext === void 0 || ext.length === 0 || ext.length > path2.length) {
    while (index2--) {
      if (path2.charCodeAt(index2) === 47) {
        if (seenNonSlash) {
          start2 = index2 + 1;
          break;
        }
      } else if (end2 < 0) {
        seenNonSlash = true;
        end2 = index2 + 1;
      }
    }
    return end2 < 0 ? "" : path2.slice(start2, end2);
  }
  if (ext === path2) {
    return "";
  }
  let firstNonSlashEnd = -1;
  let extIndex = ext.length - 1;
  while (index2--) {
    if (path2.charCodeAt(index2) === 47) {
      if (seenNonSlash) {
        start2 = index2 + 1;
        break;
      }
    } else {
      if (firstNonSlashEnd < 0) {
        seenNonSlash = true;
        firstNonSlashEnd = index2 + 1;
      }
      if (extIndex > -1) {
        if (path2.charCodeAt(index2) === ext.charCodeAt(extIndex--)) {
          if (extIndex < 0) {
            end2 = index2;
          }
        } else {
          extIndex = -1;
          end2 = firstNonSlashEnd;
        }
      }
    }
  }
  if (start2 === end2) {
    end2 = firstNonSlashEnd;
  } else if (end2 < 0) {
    end2 = path2.length;
  }
  return path2.slice(start2, end2);
}
function dirname(path2) {
  assertPath$1(path2);
  if (path2.length === 0) {
    return ".";
  }
  let end2 = -1;
  let index2 = path2.length;
  let unmatchedSlash;
  while (--index2) {
    if (path2.charCodeAt(index2) === 47) {
      if (unmatchedSlash) {
        end2 = index2;
        break;
      }
    } else if (!unmatchedSlash) {
      unmatchedSlash = true;
    }
  }
  return end2 < 0 ? path2.charCodeAt(0) === 47 ? "/" : "." : end2 === 1 && path2.charCodeAt(0) === 47 ? "//" : path2.slice(0, end2);
}
function extname(path2) {
  assertPath$1(path2);
  let index2 = path2.length;
  let end2 = -1;
  let startPart = 0;
  let startDot = -1;
  let preDotState = 0;
  let unmatchedSlash;
  while (index2--) {
    const code2 = path2.charCodeAt(index2);
    if (code2 === 47) {
      if (unmatchedSlash) {
        startPart = index2 + 1;
        break;
      }
      continue;
    }
    if (end2 < 0) {
      unmatchedSlash = true;
      end2 = index2 + 1;
    }
    if (code2 === 46) {
      if (startDot < 0) {
        startDot = index2;
      } else if (preDotState !== 1) {
        preDotState = 1;
      }
    } else if (startDot > -1) {
      preDotState = -1;
    }
  }
  if (startDot < 0 || end2 < 0 || preDotState === 0 || preDotState === 1 && startDot === end2 - 1 && startDot === startPart + 1) {
    return "";
  }
  return path2.slice(startDot, end2);
}
function join(...segments) {
  let index2 = -1;
  let joined;
  while (++index2 < segments.length) {
    assertPath$1(segments[index2]);
    if (segments[index2]) {
      joined = joined === void 0 ? segments[index2] : joined + "/" + segments[index2];
    }
  }
  return joined === void 0 ? "." : normalize$1(joined);
}
function normalize$1(path2) {
  assertPath$1(path2);
  const absolute = path2.charCodeAt(0) === 47;
  let value = normalizeString(path2, !absolute);
  if (value.length === 0 && !absolute) {
    value = ".";
  }
  if (value.length > 0 && path2.charCodeAt(path2.length - 1) === 47) {
    value += "/";
  }
  return absolute ? "/" + value : value;
}
function normalizeString(path2, allowAboveRoot) {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let index2 = -1;
  let code2;
  let lastSlashIndex;
  while (++index2 <= path2.length) {
    if (index2 < path2.length) {
      code2 = path2.charCodeAt(index2);
    } else if (code2 === 47) {
      break;
    } else {
      code2 = 47;
    }
    if (code2 === 47) {
      if (lastSlash === index2 - 1 || dots === 1)
        ;
      else if (lastSlash !== index2 - 1 && dots === 2) {
        if (result.length < 2 || lastSegmentLength !== 2 || result.charCodeAt(result.length - 1) !== 46 || result.charCodeAt(result.length - 2) !== 46) {
          if (result.length > 2) {
            lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex < 0) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = index2;
              dots = 0;
              continue;
            }
          } else if (result.length > 0) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = index2;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result = result.length > 0 ? result + "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path2.slice(lastSlash + 1, index2);
        } else {
          result = path2.slice(lastSlash + 1, index2);
        }
        lastSegmentLength = index2 - lastSlash - 1;
      }
      lastSlash = index2;
      dots = 0;
    } else if (code2 === 46 && dots > -1) {
      dots++;
    } else {
      dots = -1;
    }
  }
  return result;
}
function assertPath$1(path2) {
  if (typeof path2 !== "string") {
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(path2)
    );
  }
}
const proc = { cwd };
function cwd() {
  return "/";
}
function isUrl(fileURLOrPath) {
  return fileURLOrPath !== null && typeof fileURLOrPath === "object" && fileURLOrPath.href && fileURLOrPath.origin;
}
function urlToPath(path2) {
  if (typeof path2 === "string") {
    path2 = new URL(path2);
  } else if (!isUrl(path2)) {
    const error = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + path2 + "`"
    );
    error.code = "ERR_INVALID_ARG_TYPE";
    throw error;
  }
  if (path2.protocol !== "file:") {
    const error = new TypeError("The URL must be of scheme file");
    error.code = "ERR_INVALID_URL_SCHEME";
    throw error;
  }
  return getPathFromURLPosix(path2);
}
function getPathFromURLPosix(url) {
  if (url.hostname !== "") {
    const error = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    error.code = "ERR_INVALID_FILE_URL_HOST";
    throw error;
  }
  const pathname = url.pathname;
  let index2 = -1;
  while (++index2 < pathname.length) {
    if (pathname.charCodeAt(index2) === 37 && pathname.charCodeAt(index2 + 1) === 50) {
      const third = pathname.charCodeAt(index2 + 2);
      if (third === 70 || third === 102) {
        const error = new TypeError(
          "File URL path must not include encoded / characters"
        );
        error.code = "ERR_INVALID_FILE_URL_PATH";
        throw error;
      }
    }
  }
  return decodeURIComponent(pathname);
}
const order = ["history", "path", "basename", "stem", "extname", "dirname"];
class VFile {
  constructor(value) {
    let options;
    if (!value) {
      options = {};
    } else if (typeof value === "string" || isBuffer(value)) {
      options = { value };
    } else if (isUrl(value)) {
      options = { path: value };
    } else {
      options = value;
    }
    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = proc.cwd();
    this.value;
    this.stored;
    this.result;
    this.map;
    let index2 = -1;
    while (++index2 < order.length) {
      const prop2 = order[index2];
      if (prop2 in options && options[prop2] !== void 0) {
        this[prop2] = prop2 === "history" ? [...options[prop2]] : options[prop2];
      }
    }
    let prop;
    for (prop in options) {
      if (!order.includes(prop))
        this[prop] = options[prop];
    }
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(path2) {
    if (isUrl(path2)) {
      path2 = urlToPath(path2);
    }
    assertNonEmpty(path2, "path");
    if (this.path !== path2) {
      this.history.push(path2);
    }
  }
  get dirname() {
    return typeof this.path === "string" ? path.dirname(this.path) : void 0;
  }
  set dirname(dirname2) {
    assertPath(this.basename, "dirname");
    this.path = path.join(dirname2 || "", this.basename);
  }
  get basename() {
    return typeof this.path === "string" ? path.basename(this.path) : void 0;
  }
  set basename(basename2) {
    assertNonEmpty(basename2, "basename");
    assertPart(basename2, "basename");
    this.path = path.join(this.dirname || "", basename2);
  }
  get extname() {
    return typeof this.path === "string" ? path.extname(this.path) : void 0;
  }
  set extname(extname2) {
    assertPart(extname2, "extname");
    assertPath(this.dirname, "extname");
    if (extname2) {
      if (extname2.charCodeAt(0) !== 46) {
        throw new Error("`extname` must start with `.`");
      }
      if (extname2.includes(".", 1)) {
        throw new Error("`extname` cannot contain multiple dots");
      }
    }
    this.path = path.join(this.dirname, this.stem + (extname2 || ""));
  }
  get stem() {
    return typeof this.path === "string" ? path.basename(this.path, this.extname) : void 0;
  }
  set stem(stem) {
    assertNonEmpty(stem, "stem");
    assertPart(stem, "stem");
    this.path = path.join(this.dirname || "", stem + (this.extname || ""));
  }
  toString(encoding) {
    return (this.value || "").toString(encoding);
  }
  message(reason, place, origin) {
    const message = new VFileMessage(reason, place, origin);
    if (this.path) {
      message.name = this.path + ":" + message.name;
      message.file = this.path;
    }
    message.fatal = false;
    this.messages.push(message);
    return message;
  }
  info(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = null;
    return message;
  }
  fail(reason, place, origin) {
    const message = this.message(reason, place, origin);
    message.fatal = true;
    throw message;
  }
}
function assertPart(part, name) {
  if (part && part.includes(path.sep)) {
    throw new Error(
      "`" + name + "` cannot be a path: did not expect `" + path.sep + "`"
    );
  }
}
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error("`" + name + "` cannot be empty");
  }
}
function assertPath(path2, name) {
  if (!path2) {
    throw new Error("Setting `" + name + "` requires `path` to be set too");
  }
}
function bail(error) {
  if (error) {
    throw error;
  }
}
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray2(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
};
var isPlainObject$1 = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, "constructor");
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  var key2;
  for (key2 in obj) {
  }
  return typeof key2 === "undefined" || hasOwn.call(obj, key2);
};
var setProperty = function setProperty2(target, options) {
  if (defineProperty && options.name === "__proto__") {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
};
var getProperty = function getProperty2(obj, name) {
  if (name === "__proto__") {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      return gOPD(obj, name).value;
    }
  }
  return obj[name];
};
var extend = function extend2() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (target == null || typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i < length; ++i) {
    options = arguments[i];
    if (options != null) {
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name);
        if (target !== copy) {
          if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject$1(src) ? src : {};
            }
            setProperty(target, { name, newValue: extend2(deep, clone, copy) });
          } else if (typeof copy !== "undefined") {
            setProperty(target, { name, newValue: copy });
          }
        }
      }
    }
  }
  return target;
};
function isPlainObject2(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
function trough() {
  const fns = [];
  const pipeline = { run, use };
  return pipeline;
  function run(...values) {
    let middlewareIndex = -1;
    const callback = values.pop();
    if (typeof callback !== "function") {
      throw new TypeError("Expected function as last argument, not " + callback);
    }
    next(null, ...values);
    function next(error, ...output) {
      const fn6 = fns[++middlewareIndex];
      let index2 = -1;
      if (error) {
        callback(error);
        return;
      }
      while (++index2 < values.length) {
        if (output[index2] === null || output[index2] === void 0) {
          output[index2] = values[index2];
        }
      }
      values = output;
      if (fn6) {
        wrap$1(fn6, next)(...output);
      } else {
        callback(null, ...output);
      }
    }
  }
  function use(middelware) {
    if (typeof middelware !== "function") {
      throw new TypeError(
        "Expected `middelware` to be a function, not " + middelware
      );
    }
    fns.push(middelware);
    return pipeline;
  }
}
function wrap$1(middleware, callback) {
  let called;
  return wrapped;
  function wrapped(...parameters) {
    const fnExpectsCallback = middleware.length > parameters.length;
    let result;
    if (fnExpectsCallback) {
      parameters.push(done);
    }
    try {
      result = middleware.apply(this, parameters);
    } catch (error) {
      const exception = error;
      if (fnExpectsCallback && called) {
        throw exception;
      }
      return done(exception);
    }
    if (!fnExpectsCallback) {
      if (result instanceof Promise) {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }
  function done(error, ...output) {
    if (!called) {
      called = true;
      callback(error, ...output);
    }
  }
  function then(value) {
    done(null, value);
  }
}
const unified = base().freeze();
const own$7 = {}.hasOwnProperty;
function base() {
  const transformers = trough();
  const attachers = [];
  let namespace = {};
  let frozen;
  let freezeIndex = -1;
  processor.data = data;
  processor.Parser = void 0;
  processor.Compiler = void 0;
  processor.freeze = freeze;
  processor.attachers = attachers;
  processor.use = use;
  processor.parse = parse3;
  processor.stringify = stringify3;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;
  return processor;
  function processor() {
    const destination = base();
    let index2 = -1;
    while (++index2 < attachers.length) {
      destination.use(...attachers[index2]);
    }
    destination.data(extend(true, {}, namespace));
    return destination;
  }
  function data(key2, value) {
    if (typeof key2 === "string") {
      if (arguments.length === 2) {
        assertUnfrozen("data", frozen);
        namespace[key2] = value;
        return processor;
      }
      return own$7.call(namespace, key2) && namespace[key2] || null;
    }
    if (key2) {
      assertUnfrozen("data", frozen);
      namespace = key2;
      return processor;
    }
    return namespace;
  }
  function freeze() {
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      const [attacher, ...options] = attachers[freezeIndex];
      if (options[0] === false) {
        continue;
      }
      if (options[0] === true) {
        options[0] = void 0;
      }
      const transformer = attacher.call(processor, ...options);
      if (typeof transformer === "function") {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Number.POSITIVE_INFINITY;
    return processor;
  }
  function use(value, ...options) {
    let settings;
    assertUnfrozen("use", frozen);
    if (value === null || value === void 0)
      ;
    else if (typeof value === "function") {
      addPlugin(value, ...options);
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new TypeError("Expected usable value, not `" + value + "`");
    }
    if (settings) {
      namespace.settings = Object.assign(namespace.settings || {}, settings);
    }
    return processor;
    function add(value2) {
      if (typeof value2 === "function") {
        addPlugin(value2);
      } else if (typeof value2 === "object") {
        if (Array.isArray(value2)) {
          const [plugin, ...options2] = value2;
          addPlugin(plugin, ...options2);
        } else {
          addPreset(value2);
        }
      } else {
        throw new TypeError("Expected usable value, not `" + value2 + "`");
      }
    }
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = Object.assign(settings || {}, result.settings);
      }
    }
    function addList(plugins) {
      let index2 = -1;
      if (plugins === null || plugins === void 0)
        ;
      else if (Array.isArray(plugins)) {
        while (++index2 < plugins.length) {
          const thing = plugins[index2];
          add(thing);
        }
      } else {
        throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
      }
    }
    function addPlugin(plugin, value2) {
      let index2 = -1;
      let entry;
      while (++index2 < attachers.length) {
        if (attachers[index2][0] === plugin) {
          entry = attachers[index2];
          break;
        }
      }
      if (entry) {
        if (isPlainObject2(entry[1]) && isPlainObject2(value2)) {
          value2 = extend(true, entry[1], value2);
        }
        entry[1] = value2;
      } else {
        attachers.push([...arguments]);
      }
    }
  }
  function parse3(doc) {
    processor.freeze();
    const file = vfile(doc);
    const Parser = processor.Parser;
    assertParser("parse", Parser);
    if (newable(Parser, "parse")) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file);
  }
  function stringify3(node, doc) {
    processor.freeze();
    const file = vfile(doc);
    const Compiler = processor.Compiler;
    assertCompiler("stringify", Compiler);
    assertNode(node);
    if (newable(Compiler, "compile")) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file);
  }
  function run(node, doc, callback) {
    assertNode(node);
    processor.freeze();
    if (!callback && typeof doc === "function") {
      callback = doc;
      doc = void 0;
    }
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      transformers.run(node, vfile(doc), done);
      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          callback(null, tree, file);
        }
      }
    }
  }
  function runSync(node, file) {
    let result;
    let complete;
    processor.run(node, file, done);
    assertDone("runSync", "run", complete);
    return result;
    function done(error, tree) {
      bail(error);
      result = tree;
      complete = true;
    }
  }
  function process(doc, callback) {
    processor.freeze();
    assertParser("process", processor.Parser);
    assertCompiler("process", processor.Compiler);
    if (!callback) {
      return new Promise(executor);
    }
    executor(null, callback);
    function executor(resolve, reject) {
      const file = vfile(doc);
      processor.run(processor.parse(file), file, (error, tree, file2) => {
        if (error || !tree || !file2) {
          done(error);
        } else {
          const result = processor.stringify(tree, file2);
          if (result === void 0 || result === null)
            ;
          else if (looksLikeAVFileValue(result)) {
            file2.value = result;
          } else {
            file2.result = result;
          }
          done(error, file2);
        }
      });
      function done(error, file2) {
        if (error || !file2) {
          reject(error);
        } else if (resolve) {
          resolve(file2);
        } else {
          callback(null, file2);
        }
      }
    }
  }
  function processSync(doc) {
    let complete;
    processor.freeze();
    assertParser("processSync", processor.Parser);
    assertCompiler("processSync", processor.Compiler);
    const file = vfile(doc);
    processor.process(file, done);
    assertDone("processSync", "process", complete);
    return file;
    function done(error) {
      complete = true;
      bail(error);
    }
  }
}
function newable(value, name) {
  return typeof value === "function" && value.prototype && (keys(value.prototype) || name in value.prototype);
}
function keys(value) {
  let key2;
  for (key2 in value) {
    if (own$7.call(value, key2)) {
      return true;
    }
  }
  return false;
}
function assertParser(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Parser`");
  }
}
function assertCompiler(name, value) {
  if (typeof value !== "function") {
    throw new TypeError("Cannot `" + name + "` without `Compiler`");
  }
}
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      "Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
  }
}
function assertNode(node) {
  if (!isPlainObject2(node) || typeof node.type !== "string") {
    throw new TypeError("Expected node, got `" + node + "`");
  }
}
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      "`" + name + "` finished async. Use `" + asyncName + "` instead"
    );
  }
}
function vfile(value) {
  return looksLikeAVFile(value) ? value : new VFile(value);
}
function looksLikeAVFile(value) {
  return Boolean(
    value && typeof value === "object" && "message" in value && "messages" in value
  );
}
function looksLikeAVFileValue(value) {
  return typeof value === "string" || isBuffer(value);
}
function toString(node, options) {
  var { includeImageAlt = true } = options || {};
  return one$1(node, includeImageAlt);
}
function one$1(node, includeImageAlt) {
  return node && typeof node === "object" && (node.value || (includeImageAlt ? node.alt : "") || "children" in node && all$1(node.children, includeImageAlt) || Array.isArray(node) && all$1(node, includeImageAlt)) || "";
}
function all$1(values, includeImageAlt) {
  var result = [];
  var index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one$1(values[index2], includeImageAlt);
  }
  return result.join("");
}
function splice(list2, start2, remove, items) {
  const end2 = list2.length;
  let chunkStart = 0;
  let parameters;
  if (start2 < 0) {
    start2 = -start2 > end2 ? 0 : end2 + start2;
  } else {
    start2 = start2 > end2 ? end2 : start2;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start2, remove);
    [].splice.apply(list2, parameters);
  } else {
    if (remove)
      [].splice.apply(list2, [start2, remove]);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start2, 0);
      [].splice.apply(list2, parameters);
      chunkStart += 1e4;
      start2 += 1e4;
    }
  }
}
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items);
    return list2;
  }
  return items;
}
const hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left2 = maybe || (all2[hook] = {});
    const right2 = extension2[hook];
    let code2;
    for (code2 in right2) {
      if (!hasOwnProperty.call(left2, code2))
        left2[code2] = [];
      const value = right2[code2];
      constructs(
        left2[code2],
        Array.isArray(value) ? value : value ? [value] : []
      );
    }
  }
}
function constructs(existing, list2) {
  let index2 = -1;
  const before = [];
  while (++index2 < list2.length) {
    (list2[index2].add === "after" ? existing : before).push(list2[index2]);
  }
  splice(existing, 0, 0, before);
}
const unicodePunctuationRegex = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
const asciiAlpha = regexCheck(/[A-Za-z]/);
const asciiDigit = regexCheck(/\d/);
const asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
const asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
const asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
const asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code2) {
  return code2 !== null && (code2 < 32 || code2 === 127);
}
function markdownLineEndingOrSpace(code2) {
  return code2 !== null && (code2 < 0 || code2 === 32);
}
function markdownLineEnding(code2) {
  return code2 !== null && code2 < -2;
}
function markdownSpace(code2) {
  return code2 === -2 || code2 === -1 || code2 === 32;
}
const unicodeWhitespace = regexCheck(/\s/);
const unicodePunctuation = regexCheck(unicodePunctuationRegex);
function regexCheck(regex) {
  return check;
  function check(code2) {
    return code2 !== null && regex.test(String.fromCharCode(code2));
  }
}
function factorySpace(effects, ok2, type, max2) {
  const limit = max2 ? max2 - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start2;
  function start2(code2) {
    if (markdownSpace(code2)) {
      effects.enter(type);
      return prefix(code2);
    }
    return ok2(code2);
  }
  function prefix(code2) {
    if (markdownSpace(code2) && size++ < limit) {
      effects.consume(code2);
      return prefix;
    }
    effects.exit(type);
    return ok2(code2);
  }
}
const content$1 = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  let previous2;
  return contentStart;
  function afterContentStartConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  function paragraphInitial(code2) {
    effects.enter("paragraph");
    return lineStart(code2);
  }
  function lineStart(code2) {
    const token2 = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    if (previous2) {
      previous2.next = token2;
    }
    previous2 = token2;
    return data(code2);
  }
  function data(code2) {
    if (code2 === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code2);
    return data;
  }
}
const document$2 = {
  tokenize: initializeDocument
};
const containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self = this;
  const stack2 = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start2;
  function start2(code2) {
    if (continued < stack2.length) {
      const item = stack2[continued];
      self.containerState = item[1];
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code2);
    }
    return checkNewContainers(code2);
  }
  function documentContinue(code2) {
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point2;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point2 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
      return checkNewContainers(code2);
    }
    return start2(code2);
  }
  function checkNewContainers(code2) {
    if (continued === stack2.length) {
      if (!childFlow) {
        return documentContinued(code2);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code2);
      }
      self.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      );
    }
    self.containerState = {};
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code2);
  }
  function thereIsANewContainer(code2) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code2);
  }
  function thereIsNoNewContainer(code2) {
    self.parser.lazy[self.now().line] = continued !== stack2.length;
    lineStartOffset = self.now().offset;
    return flowStart(code2);
  }
  function documentContinued(code2) {
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code2);
  }
  function containerContinue(code2) {
    continued++;
    stack2.push([self.currentConstruct, self.containerState]);
    return documentContinued(code2);
  }
  function flowStart(code2) {
    if (code2 === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code2);
  }
  function flowContinue(code2) {
    if (code2 === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code2);
      return;
    }
    if (markdownLineEnding(code2)) {
      effects.consume(code2);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self.interrupt = void 0;
      return start2;
    }
    effects.consume(code2);
    return flowContinue;
  }
  function writeToChild(token2, eof) {
    const stream = self.sliceStream(token2);
    if (eof)
      stream.push(null);
    token2.previous = childToken;
    if (childToken)
      childToken.next = token2;
    childToken = token2;
    childFlow.defineSkip(token2.start);
    childFlow.write(stream);
    if (self.parser.lazy[token2.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (childFlow.events[index2][1].start.offset < lineStartOffset && (!childFlow.events[index2][1].end || childFlow.events[index2][1].end.offset > lineStartOffset)) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point2;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point2 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point2);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
    }
  }
  function exitContainers(size) {
    let index2 = stack2.length;
    while (index2-- > size) {
      const entry = stack2[index2];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack2.length = size;
  }
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
}
function tokenizeContainer(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function classifyCharacter(code2) {
  if (code2 === null || markdownLineEndingOrSpace(code2) || unicodeWhitespace(code2)) {
    return 1;
  }
  if (unicodePunctuation(code2)) {
    return 2;
  }
}
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }
  return events;
}
const attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text2;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset2;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start2 = Object.assign({}, events[open][1].end);
          const end2 = Object.assign({}, events[index2][1].start);
          movePoint(start2, -use);
          movePoint(end2, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: start2,
            end: Object.assign({}, events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end: end2
          };
          text2 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index2][1].start)
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          };
          events[open][1].end = Object.assign({}, openingSequence.start);
          events[index2][1].start = Object.assign({}, closingSequence.end);
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events[open][1], context],
              ["exit", events[open][1], context]
            ]);
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text2, context]
          ]);
          nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index2),
              context
            )
          );
          nextEvents = push(nextEvents, [
            ["exit", text2, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset2 = 2;
            nextEvents = push(nextEvents, [
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context]
            ]);
          } else {
            offset2 = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset2 - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
function tokenizeAttention(effects, ok2) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous2 = this.previous;
  const before = classifyCharacter(previous2);
  let marker;
  return start2;
  function start2(code2) {
    effects.enter("attentionSequence");
    marker = code2;
    return sequence(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return sequence;
    }
    const token2 = effects.exit("attentionSequence");
    const after = classifyCharacter(code2);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code2);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    token2._open = Boolean(marker === 42 ? open : open && (before || !close));
    token2._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok2(code2);
  }
}
function movePoint(point2, offset2) {
  point2.column += offset2;
  point2.offset += offset2;
  point2._bufferIndex += offset2;
}
const autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok2, nok) {
  let size = 1;
  return start2;
  function start2(code2) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  function open(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return schemeOrEmailAtext;
    }
    return asciiAtext(code2) ? emailAtext(code2) : nok(code2);
  }
  function schemeOrEmailAtext(code2) {
    return code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2) ? schemeInsideOrEmailAtext(code2) : emailAtext(code2);
  }
  function schemeInsideOrEmailAtext(code2) {
    if (code2 === 58) {
      effects.consume(code2);
      return urlInside;
    }
    if ((code2 === 43 || code2 === 45 || code2 === 46 || asciiAlphanumeric(code2)) && size++ < 32) {
      effects.consume(code2);
      return schemeInsideOrEmailAtext;
    }
    return emailAtext(code2);
  }
  function urlInside(code2) {
    if (code2 === 62) {
      effects.exit("autolinkProtocol");
      return end2(code2);
    }
    if (code2 === null || code2 === 32 || code2 === 60 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return urlInside;
  }
  function emailAtext(code2) {
    if (code2 === 64) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (asciiAtext(code2)) {
      effects.consume(code2);
      return emailAtext;
    }
    return nok(code2);
  }
  function emailAtSignOrDot(code2) {
    return asciiAlphanumeric(code2) ? emailLabel(code2) : nok(code2);
  }
  function emailLabel(code2) {
    if (code2 === 46) {
      effects.consume(code2);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code2 === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      return end2(code2);
    }
    return emailValue(code2);
  }
  function emailValue(code2) {
    if ((code2 === 45 || asciiAlphanumeric(code2)) && size++ < 63) {
      effects.consume(code2);
      return code2 === 45 ? emailValue : emailLabel;
    }
    return nok(code2);
  }
  function end2(code2) {
    effects.enter("autolinkMarker");
    effects.consume(code2);
    effects.exit("autolinkMarker");
    effects.exit("autolink");
    return ok2;
  }
}
const blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true
};
function tokenizeBlankLine(effects, ok2, nok) {
  return factorySpace(effects, afterWhitespace, "linePrefix");
  function afterWhitespace(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    if (code2 === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code2);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    if (markdownSpace(code2)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code2);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok2;
    }
    effects.exit("blockQuotePrefix");
    return ok2(code2);
  }
}
function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
  return factorySpace(
    effects,
    effects.attempt(blockQuote, ok2, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function exit(effects) {
  effects.exit("blockQuote");
}
const characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    effects.exit("escapeMarker");
    return open;
  }
  function open(code2) {
    if (asciiPunctuation(code2)) {
      effects.enter("characterEscapeValue");
      effects.consume(code2);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok2;
    }
    return nok(code2);
  }
}
const element = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference2 = "&" + value + ";";
  element.innerHTML = characterReference2;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference2 ? false : char;
}
const characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok2, nok) {
  const self = this;
  let size = 0;
  let max2;
  let test;
  return start2;
  function start2(code2) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code2);
    effects.exit("characterReferenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max2 = 31;
    test = asciiAlphanumeric;
    return value(code2);
  }
  function numeric(code2) {
    if (code2 === 88 || code2 === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code2);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max2 = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max2 = 7;
    test = asciiDigit;
    return value(code2);
  }
  function value(code2) {
    let token2;
    if (code2 === 59 && size) {
      token2 = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token2))) {
        return nok(code2);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code2);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok2;
    }
    if (test(code2) && size++ < max2) {
      effects.consume(code2);
      return value;
    }
    return nok(code2);
  }
}
const codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true
};
function tokenizeCodeFenced(effects, ok2, nok) {
  const self = this;
  const closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  const nonLazyLine = {
    tokenize: tokenizeNonLazyLine,
    partial: true
  };
  const tail = this.events[this.events.length - 1];
  const initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let sizeOpen = 0;
  let marker;
  return start2;
  function start2(code2) {
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    marker = code2;
    return sequenceOpen(code2);
  }
  function sequenceOpen(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeFencedFenceSequence");
    return sizeOpen < 3 ? nok(code2) : factorySpace(effects, infoOpen, "whitespace")(code2);
  }
  function infoOpen(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code2);
  }
  function info(code2) {
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, infoAfter, "whitespace")(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return info;
  }
  function infoAfter(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return openAfter(code2);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code2);
  }
  function meta(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return openAfter(code2);
    }
    if (code2 === 96 && code2 === marker)
      return nok(code2);
    effects.consume(code2);
    return meta;
  }
  function openAfter(code2) {
    effects.exit("codeFencedFence");
    return self.interrupt ? ok2(code2) : contentStart(code2);
  }
  function contentStart(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(
        nonLazyLine,
        effects.attempt(
          closingFenceConstruct,
          after,
          initialPrefix ? factorySpace(
            effects,
            contentStart,
            "linePrefix",
            initialPrefix + 1
          ) : contentStart
        ),
        after
      )(code2);
    }
    effects.enter("codeFlowValue");
    return contentContinue(code2);
  }
  function contentContinue(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return contentStart(code2);
    }
    effects.consume(code2);
    return contentContinue;
  }
  function after(code2) {
    effects.exit("codeFenced");
    return ok2(code2);
  }
  function tokenizeNonLazyLine(effects2, ok3, nok2) {
    const self2 = this;
    return start3;
    function start3(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self2.parser.lazy[self2.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function tokenizeClosingFence(effects2, ok3, nok2) {
    let size = 0;
    return factorySpace(
      effects2,
      closingSequenceStart,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function closingSequenceStart(code2) {
      effects2.enter("codeFencedFence");
      effects2.enter("codeFencedFenceSequence");
      return closingSequence(code2);
    }
    function closingSequence(code2) {
      if (code2 === marker) {
        effects2.consume(code2);
        size++;
        return closingSequence;
      }
      if (size < sizeOpen)
        return nok2(code2);
      effects2.exit("codeFencedFenceSequence");
      return factorySpace(effects2, closingSequenceEnd, "whitespace")(code2);
    }
    function closingSequenceEnd(code2) {
      if (code2 === null || markdownLineEnding(code2)) {
        effects2.exit("codeFencedFence");
        return ok3(code2);
      }
      return nok2(code2);
    }
  }
}
const codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
const indentedContent = {
  tokenize: tokenizeIndentedContent,
  partial: true
};
function tokenizeCodeIndented(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterStartPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterStartPrefix(code2) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? afterPrefix(code2) : nok(code2);
  }
  function afterPrefix(code2) {
    if (code2 === null) {
      return after(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(indentedContent, afterPrefix, after)(code2);
    }
    effects.enter("codeFlowValue");
    return content2(code2);
  }
  function content2(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("codeFlowValue");
      return afterPrefix(code2);
    }
    effects.consume(code2);
    return content2;
  }
  function after(code2) {
    effects.exit("codeIndented");
    return ok2(code2);
  }
}
function tokenizeIndentedContent(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return start2;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code2);
  }
  function afterPrefix(code2) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok2(code2) : markdownLineEnding(code2) ? start2(code2) : nok(code2);
  }
}
const codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
function previous(code2) {
  return code2 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function tokenizeCodeText(effects, ok2, nok) {
  let sizeOpen = 0;
  let size;
  let token2;
  return start2;
  function start2(code2) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return openingSequence(code2);
  }
  function openingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      sizeOpen++;
      return openingSequence;
    }
    effects.exit("codeTextSequence");
    return gap(code2);
  }
  function gap(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 96) {
      token2 = effects.enter("codeTextSequence");
      size = 0;
      return closingSequence(code2);
    }
    if (code2 === 32) {
      effects.enter("space");
      effects.consume(code2);
      effects.exit("space");
      return gap;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return gap;
    }
    effects.enter("codeTextData");
    return data(code2);
  }
  function data(code2) {
    if (code2 === null || code2 === 32 || code2 === 96 || markdownLineEnding(code2)) {
      effects.exit("codeTextData");
      return gap(code2);
    }
    effects.consume(code2);
    return data;
  }
  function closingSequence(code2) {
    if (code2 === 96) {
      effects.consume(code2);
      size++;
      return closingSequence;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok2(code2);
    }
    token2.type = "codeTextData";
    return data(code2);
  }
}
function subtokenize(events) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events[index2];
    if (index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events[otherIndex];
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events[lineIndex][1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events[lineIndex][1].start);
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        splice(events, lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  return !more;
}
function subcontent(events, eventIndex) {
  const token2 = events[eventIndex][1];
  const context = events[eventIndex][2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  const tokenizer = token2._tokenizer || context.parser[token2.contentType](token2.start);
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous2;
  let index2 = -1;
  let current = token2;
  let adjust = 0;
  let start2 = 0;
  const breaks = [start2];
  while (current) {
    while (events[++startPosition][1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous2) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous2 = current;
    current = current.next;
  }
  current = token2;
  while (++index2 < childEvents.length) {
    if (childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line) {
      start2 = index2 + 1;
      breaks.push(start2);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start3 = startPositions.pop();
    jumps.unshift([start3, start3 + slice.length - 1]);
    splice(events, start3, 2, slice);
  }
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}
const content = {
  tokenize: tokenizeContent,
  resolve: resolveContent
};
const continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
function tokenizeContent(effects, ok2) {
  let previous2;
  return start2;
  function start2(code2) {
    effects.enter("content");
    previous2 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return data(code2);
  }
  function data(code2) {
    if (code2 === null) {
      return contentEnd(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code2);
    }
    effects.consume(code2);
    return data;
  }
  function contentEnd(code2) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok2(code2);
  }
  function contentContinue(code2) {
    effects.consume(code2);
    effects.exit("chunkContent");
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    });
    previous2 = previous2.next;
    return data;
  }
}
function tokenizeContinuation(effects, ok2, nok) {
  const self = this;
  return startLookahead;
  function startLookahead(code2) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  function prefixed(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok2(code2);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok2)(code2);
  }
}
function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max2) {
  const limit = max2 || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start2;
  function start2(code2) {
    if (code2 === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore;
    }
    if (code2 === null || code2 === 41 || asciiControl(code2)) {
      return nok(code2);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationRaw(code2);
  }
  function destinationEnclosedBefore(code2) {
    if (code2 === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code2);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return destinationEnclosed(code2);
  }
  function destinationEnclosed(code2) {
    if (code2 === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return destinationEnclosedBefore(code2);
    }
    if (code2 === null || code2 === 60 || markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? destinationEnclosedEscape : destinationEnclosed;
  }
  function destinationEnclosedEscape(code2) {
    if (code2 === 60 || code2 === 62 || code2 === 92) {
      effects.consume(code2);
      return destinationEnclosed;
    }
    return destinationEnclosed(code2);
  }
  function destinationRaw(code2) {
    if (code2 === 40) {
      if (++balance > limit)
        return nok(code2);
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === 41) {
      if (!balance--) {
        effects.exit("chunkString");
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code2);
      }
      effects.consume(code2);
      return destinationRaw;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      if (balance)
        return nok(code2);
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok2(code2);
    }
    if (asciiControl(code2))
      return nok(code2);
    effects.consume(code2);
    return code2 === 92 ? destinationRawEscape : destinationRaw;
  }
  function destinationRawEscape(code2) {
    if (code2 === 40 || code2 === 41 || code2 === 92) {
      effects.consume(code2);
      return destinationRaw;
    }
    return destinationRaw(code2);
  }
}
function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
  const self = this;
  let size = 0;
  let data;
  return start2;
  function start2(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  function atBreak(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 && !data || code2 === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs || size > 999) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return label(code2);
  }
  function label(code2) {
    if (code2 === null || code2 === 91 || code2 === 93 || markdownLineEnding(code2) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code2);
    }
    effects.consume(code2);
    data = data || !markdownSpace(code2);
    return code2 === 92 ? labelEscape : label;
  }
  function labelEscape(code2) {
    if (code2 === 91 || code2 === 92 || code2 === 93) {
      effects.consume(code2);
      size++;
      return label;
    }
    return label(code2);
  }
}
function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
  let marker;
  return start2;
  function start2(code2) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code2);
    effects.exit(markerType);
    marker = code2 === 40 ? 41 : code2;
    return atFirstTitleBreak;
  }
  function atFirstTitleBreak(code2) {
    if (code2 === marker) {
      effects.enter(markerType);
      effects.consume(code2);
      effects.exit(markerType);
      effects.exit(type);
      return ok2;
    }
    effects.enter(stringType);
    return atTitleBreak(code2);
  }
  function atTitleBreak(code2) {
    if (code2 === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker);
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      return factorySpace(effects, atTitleBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return title(code2);
  }
  function title(code2) {
    if (code2 === marker || code2 === null || markdownLineEnding(code2)) {
      effects.exit("chunkString");
      return atTitleBreak(code2);
    }
    effects.consume(code2);
    return code2 === 92 ? titleEscape : title;
  }
  function titleEscape(code2) {
    if (code2 === marker || code2 === 92) {
      effects.consume(code2);
      return title;
    }
    return title(code2);
  }
}
function factoryWhitespace(effects, ok2) {
  let seen;
  return start2;
  function start2(code2) {
    if (markdownLineEnding(code2)) {
      effects.enter("lineEnding");
      effects.consume(code2);
      effects.exit("lineEnding");
      seen = true;
      return start2;
    }
    if (markdownSpace(code2)) {
      return factorySpace(
        effects,
        start2,
        seen ? "linePrefix" : "lineSuffix"
      )(code2);
    }
    return ok2(code2);
  }
}
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
const titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};
function tokenizeDefinition(effects, ok2, nok) {
  const self = this;
  let identifier;
  return start2;
  function start2(code2) {
    effects.enter("definition");
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code2);
  }
  function labelAfter(code2) {
    identifier = normalizeIdentifier(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );
    if (code2 === 58) {
      effects.enter("definitionMarker");
      effects.consume(code2);
      effects.exit("definitionMarker");
      return factoryWhitespace(
        effects,
        factoryDestination(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace(effects, after, "whitespace"),
            factorySpace(effects, after, "whitespace")
          ),
          nok,
          "definitionDestination",
          "definitionDestinationLiteral",
          "definitionDestinationLiteralMarker",
          "definitionDestinationRaw",
          "definitionDestinationString"
        )
      );
    }
    return nok(code2);
  }
  function after(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("definition");
      if (!self.parser.defined.includes(identifier)) {
        self.parser.defined.push(identifier);
      }
      return ok2(code2);
    }
    return nok(code2);
  }
}
function tokenizeTitle(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, before)(code2) : nok(code2);
  }
  function before(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(
        effects,
        factorySpace(effects, after, "whitespace"),
        nok,
        "definitionTitle",
        "definitionTitleMarker",
        "definitionTitleString"
      )(code2);
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === null || markdownLineEnding(code2) ? ok2(code2) : nok(code2);
  }
}
const hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    effects.enter("hardBreakEscape");
    effects.enter("escapeMarker");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (markdownLineEnding(code2)) {
      effects.exit("escapeMarker");
      effects.exit("hardBreakEscape");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content2;
  let text2;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content2 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text2 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [
      ["enter", content2, context],
      ["enter", text2, context],
      ["exit", text2, context],
      ["exit", content2, context]
    ]);
  }
  return events;
}
function tokenizeHeadingAtx(effects, ok2, nok) {
  const self = this;
  let size = 0;
  return start2;
  function start2(code2) {
    effects.enter("atxHeading");
    effects.enter("atxHeadingSequence");
    return fenceOpenInside(code2);
  }
  function fenceOpenInside(code2) {
    if (code2 === 35 && size++ < 6) {
      effects.consume(code2);
      return fenceOpenInside;
    }
    if (code2 === null || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingSequence");
      return self.interrupt ? ok2(code2) : headingBreak(code2);
    }
    return nok(code2);
  }
  function headingBreak(code2) {
    if (code2 === 35) {
      effects.enter("atxHeadingSequence");
      return sequence(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("atxHeading");
      return ok2(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, headingBreak, "whitespace")(code2);
    }
    effects.enter("atxHeadingText");
    return data(code2);
  }
  function sequence(code2) {
    if (code2 === 35) {
      effects.consume(code2);
      return sequence;
    }
    effects.exit("atxHeadingSequence");
    return headingBreak(code2);
  }
  function data(code2) {
    if (code2 === null || code2 === 35 || markdownLineEndingOrSpace(code2)) {
      effects.exit("atxHeadingText");
      return headingBreak(code2);
    }
    effects.consume(code2);
    return data;
  }
}
const htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
const htmlRawNames = ["pre", "script", "style", "textarea"];
const htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
const nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
function tokenizeHtmlFlow(effects, ok2, nok) {
  const self = this;
  let kind;
  let startTag;
  let buffer2;
  let index2;
  let marker;
  return start2;
  function start2(code2) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationStart;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      kind = 3;
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer2 = String.fromCharCode(code2);
      startTag = true;
      return tagName;
    }
    return nok(code2);
  }
  function declarationStart(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      kind = 2;
      return commentOpenInside;
    }
    if (code2 === 91) {
      effects.consume(code2);
      kind = 5;
      buffer2 = "CDATA[";
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      kind = 4;
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function commentOpenInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return self.interrupt ? ok2 : continuationDeclarationInside;
    }
    return nok(code2);
  }
  function cdataOpenInside(code2) {
    if (code2 === buffer2.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer2.length ? self.interrupt ? ok2 : continuation : cdataOpenInside;
    }
    return nok(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      buffer2 = String.fromCharCode(code2);
      return tagName;
    }
    return nok(code2);
  }
  function tagName(code2) {
    if (code2 === null || code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      if (code2 !== 47 && startTag && htmlRawNames.includes(buffer2.toLowerCase())) {
        kind = 1;
        return self.interrupt ? ok2(code2) : continuation(code2);
      }
      if (htmlBlockNames.includes(buffer2.toLowerCase())) {
        kind = 6;
        if (code2 === 47) {
          effects.consume(code2);
          return basicSelfClosing;
        }
        return self.interrupt ? ok2(code2) : continuation(code2);
      }
      kind = 7;
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code2) : startTag ? completeAttributeNameBefore(code2) : completeClosingTagAfter(code2);
    }
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      buffer2 += String.fromCharCode(code2);
      return tagName;
    }
    return nok(code2);
  }
  function basicSelfClosing(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return self.interrupt ? ok2 : continuation;
    }
    return nok(code2);
  }
  function completeClosingTagAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeClosingTagAfter;
    }
    return completeEnd(code2);
  }
  function completeAttributeNameBefore(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return completeEnd;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameBefore;
    }
    return completeEnd(code2);
  }
  function completeAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code2);
  }
  function completeAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code2);
  }
  function completeAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAttributeValueBefore;
    }
    marker = null;
    return completeAttributeValueUnquoted(code2);
  }
  function completeAttributeValueQuoted(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      return nok(code2);
    }
    if (code2 === marker) {
      effects.consume(code2);
      return completeAttributeValueQuotedAfter;
    }
    effects.consume(code2);
    return completeAttributeValueQuoted;
  }
  function completeAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96 || markdownLineEndingOrSpace(code2)) {
      return completeAttributeNameAfter(code2);
    }
    effects.consume(code2);
    return completeAttributeValueUnquoted;
  }
  function completeAttributeValueQuotedAfter(code2) {
    if (code2 === 47 || code2 === 62 || markdownSpace(code2)) {
      return completeAttributeNameBefore(code2);
    }
    return nok(code2);
  }
  function completeEnd(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return completeAfter;
    }
    return nok(code2);
  }
  function completeAfter(code2) {
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return completeAfter;
    }
    return code2 === null || markdownLineEnding(code2) ? continuation(code2) : nok(code2);
  }
  function continuation(code2) {
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationCommentInside;
    }
    if (code2 === 60 && kind === 1) {
      effects.consume(code2);
      return continuationRawTagOpen;
    }
    if (code2 === 62 && kind === 4) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 63 && kind === 3) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    if (code2 === 93 && kind === 5) {
      effects.consume(code2);
      return continuationCharacterDataInside;
    }
    if (markdownLineEnding(code2) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code2);
    }
    if (code2 === null || markdownLineEnding(code2)) {
      return continuationAtLineEnding(code2);
    }
    effects.consume(code2);
    return continuation;
  }
  function continuationAtLineEnding(code2) {
    effects.exit("htmlFlowData");
    return htmlContinueStart(code2);
  }
  function htmlContinueStart(code2) {
    if (code2 === null) {
      return done(code2);
    }
    if (markdownLineEnding(code2)) {
      return effects.attempt(
        {
          tokenize: htmlLineEnd,
          partial: true
        },
        htmlContinueStart,
        done
      )(code2);
    }
    effects.enter("htmlFlowData");
    return continuation(code2);
  }
  function htmlLineEnd(effects2, ok3, nok2) {
    return start3;
    function start3(code2) {
      effects2.enter("lineEnding");
      effects2.consume(code2);
      effects2.exit("lineEnding");
      return lineStart;
    }
    function lineStart(code2) {
      return self.parser.lazy[self.now().line] ? nok2(code2) : ok3(code2);
    }
  }
  function continuationCommentInside(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationRawTagOpen(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      buffer2 = "";
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationRawEndTag(code2) {
    if (code2 === 62 && htmlRawNames.includes(buffer2.toLowerCase())) {
      effects.consume(code2);
      return continuationClose;
    }
    if (asciiAlpha(code2) && buffer2.length < 8) {
      effects.consume(code2);
      buffer2 += String.fromCharCode(code2);
      return continuationRawEndTag;
    }
    return continuation(code2);
  }
  function continuationCharacterDataInside(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationDeclarationInside(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      return continuationClose;
    }
    if (code2 === 45 && kind === 2) {
      effects.consume(code2);
      return continuationDeclarationInside;
    }
    return continuation(code2);
  }
  function continuationClose(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("htmlFlowData");
      return done(code2);
    }
    effects.consume(code2);
    return continuationClose;
  }
  function done(code2) {
    effects.exit("htmlFlow");
    return ok2(code2);
  }
}
function tokenizeNextBlank(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    effects.exit("htmlFlowData");
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    return effects.attempt(blankLine, ok2, nok);
  }
}
const htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok2, nok) {
  const self = this;
  let marker;
  let buffer2;
  let index2;
  let returnState;
  return start2;
  function start2(code2) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code2);
    return open;
  }
  function open(code2) {
    if (code2 === 33) {
      effects.consume(code2);
      return declarationOpen;
    }
    if (code2 === 47) {
      effects.consume(code2);
      return tagCloseStart;
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instruction;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    return nok(code2);
  }
  function declarationOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentOpen;
    }
    if (code2 === 91) {
      effects.consume(code2);
      buffer2 = "CDATA[";
      index2 = 0;
      return cdataOpen;
    }
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return declaration;
    }
    return nok(code2);
  }
  function commentOpen(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return commentStart;
    }
    return nok(code2);
  }
  function commentStart(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentStartDash;
    }
    return comment(code2);
  }
  function commentStartDash(code2) {
    if (code2 === null || code2 === 62) {
      return nok(code2);
    }
    return comment(code2);
  }
  function comment(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 45) {
      effects.consume(code2);
      return commentClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = comment;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return comment;
  }
  function commentClose(code2) {
    if (code2 === 45) {
      effects.consume(code2);
      return end2;
    }
    return comment(code2);
  }
  function cdataOpen(code2) {
    if (code2 === buffer2.charCodeAt(index2++)) {
      effects.consume(code2);
      return index2 === buffer2.length ? cdata : cdataOpen;
    }
    return nok(code2);
  }
  function cdata(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = cdata;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return cdata;
  }
  function cdataClose(code2) {
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function cdataEnd(code2) {
    if (code2 === 62) {
      return end2(code2);
    }
    if (code2 === 93) {
      effects.consume(code2);
      return cdataEnd;
    }
    return cdata(code2);
  }
  function declaration(code2) {
    if (code2 === null || code2 === 62) {
      return end2(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = declaration;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return declaration;
  }
  function instruction(code2) {
    if (code2 === null) {
      return nok(code2);
    }
    if (code2 === 63) {
      effects.consume(code2);
      return instructionClose;
    }
    if (markdownLineEnding(code2)) {
      returnState = instruction;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return instruction;
  }
  function instructionClose(code2) {
    return code2 === 62 ? end2(code2) : instruction(code2);
  }
  function tagCloseStart(code2) {
    if (asciiAlpha(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return nok(code2);
  }
  function tagClose(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagClose;
    }
    return tagCloseBetween(code2);
  }
  function tagCloseBetween(code2) {
    if (markdownLineEnding(code2)) {
      returnState = tagCloseBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagCloseBetween;
    }
    return end2(code2);
  }
  function tagOpen(code2) {
    if (code2 === 45 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpen;
    }
    if (code2 === 47 || code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenBetween(code2) {
    if (code2 === 47) {
      effects.consume(code2);
      return end2;
    }
    if (code2 === 58 || code2 === 95 || asciiAlpha(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenBetween;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenBetween;
    }
    return end2(code2);
  }
  function tagOpenAttributeName(code2) {
    if (code2 === 45 || code2 === 46 || code2 === 58 || code2 === 95 || asciiAlphanumeric(code2)) {
      effects.consume(code2);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code2);
  }
  function tagOpenAttributeNameAfter(code2) {
    if (code2 === 61) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code2);
  }
  function tagOpenAttributeValueBefore(code2) {
    if (code2 === null || code2 === 60 || code2 === 61 || code2 === 62 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 34 || code2 === 39) {
      effects.consume(code2);
      marker = code2;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code2);
    }
    if (markdownSpace(code2)) {
      effects.consume(code2);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code2);
    marker = void 0;
    return tagOpenAttributeValueUnquoted;
  }
  function tagOpenAttributeValueQuoted(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code2 === null) {
      return nok(code2);
    }
    if (markdownLineEnding(code2)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueQuoted;
  }
  function tagOpenAttributeValueQuotedAfter(code2) {
    if (code2 === 62 || code2 === 47 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    return nok(code2);
  }
  function tagOpenAttributeValueUnquoted(code2) {
    if (code2 === null || code2 === 34 || code2 === 39 || code2 === 60 || code2 === 61 || code2 === 96) {
      return nok(code2);
    }
    if (code2 === 62 || markdownLineEndingOrSpace(code2)) {
      return tagOpenBetween(code2);
    }
    effects.consume(code2);
    return tagOpenAttributeValueUnquoted;
  }
  function atLineEnding(code2) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(
      effects,
      afterPrefix,
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function afterPrefix(code2) {
    effects.enter("htmlTextData");
    return returnState(code2);
  }
  function end2(code2) {
    if (code2 === 62) {
      effects.consume(code2);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok2;
    }
    return nok(code2);
  }
}
const labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
const resourceConstruct = {
  tokenize: tokenizeResource
};
const fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
const collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  let token2;
  while (++index2 < events.length) {
    token2 = events[index2][1];
    if (token2.type === "labelImage" || token2.type === "labelLink" || token2.type === "labelEnd") {
      events.splice(index2 + 1, token2.type === "labelImage" ? 4 : 2);
      token2.type = "data";
      index2++;
    }
  }
  return events;
}
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset2 = 0;
  let token2;
  let open;
  let close;
  let media;
  while (index2--) {
    token2 = events[index2][1];
    if (open) {
      if (token2.type === "link" || token2.type === "labelLink" && token2._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token2.type === "labelLink") {
        token2._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token2.type === "labelImage" || token2.type === "labelLink") && !token2._balanced) {
        open = index2;
        if (token2.type !== "labelLink") {
          offset2 = 2;
          break;
        }
      }
    } else if (token2.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const label = {
    type: "label",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close][1].end)
  };
  const text2 = {
    type: "labelText",
    start: Object.assign({}, events[open + offset2 + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  };
  media = [
    ["enter", group, context],
    ["enter", label, context]
  ];
  media = push(media, events.slice(open + 1, open + offset2 + 3));
  media = push(media, [["enter", text2, context]]);
  media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset2 + 4, close - 3),
      context
    )
  );
  media = push(media, [
    ["exit", text2, context],
    events[close - 2],
    events[close - 1],
    ["exit", label, context]
  ]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
function tokenizeLabelEnd(effects, ok2, nok) {
  const self = this;
  let index2 = self.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
      labelStart = self.events[index2][1];
      break;
    }
  }
  return start2;
  function start2(code2) {
    if (!labelStart) {
      return nok(code2);
    }
    if (labelStart._inactive)
      return balanced(code2);
    defined = self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize({
          start: labelStart.end,
          end: self.now()
        })
      )
    );
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return afterLabelEnd;
  }
  function afterLabelEnd(code2) {
    if (code2 === 40) {
      return effects.attempt(
        resourceConstruct,
        ok2,
        defined ? ok2 : balanced
      )(code2);
    }
    if (code2 === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok2,
        defined ? effects.attempt(collapsedReferenceConstruct, ok2, balanced) : balanced
      )(code2);
    }
    return defined ? ok2(code2) : balanced(code2);
  }
  function balanced(code2) {
    labelStart._balanced = true;
    return nok(code2);
  }
}
function tokenizeResource(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code2);
    effects.exit("resourceMarker");
    return factoryWhitespace(effects, open);
  }
  function open(code2) {
    if (code2 === 41) {
      return end2(code2);
    }
    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(code2);
  }
  function destinationAfter(code2) {
    return markdownLineEndingOrSpace(code2) ? factoryWhitespace(effects, between)(code2) : end2(code2);
  }
  function between(code2) {
    if (code2 === 34 || code2 === 39 || code2 === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end2),
        nok,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString"
      )(code2);
    }
    return end2(code2);
  }
  function end2(code2) {
    if (code2 === 41) {
      effects.enter("resourceMarker");
      effects.consume(code2);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok2;
    }
    return nok(code2);
  }
}
function tokenizeFullReference(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      "reference",
      "referenceMarker",
      "referenceString"
    )(code2);
  }
  function afterLabel(code2) {
    return self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) ? ok2(code2) : nok(code2);
  }
}
function tokenizeCollapsedReference(effects, ok2, nok) {
  return start2;
  function start2(code2) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code2);
    effects.exit("referenceMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 93) {
      effects.enter("referenceMarker");
      effects.consume(code2);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok2;
    }
    return nok(code2);
  }
}
const labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code2);
    effects.exit("labelImageMarker");
    return open;
  }
  function open(code2) {
    if (code2 === 91) {
      effects.enter("labelMarker");
      effects.consume(code2);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code2);
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok2, nok) {
  const self = this;
  return start2;
  function start2(code2) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code2);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  function after(code2) {
    return code2 === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code2) : ok2(code2);
  }
}
const lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok2) {
  return start2;
  function start2(code2) {
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    return factorySpace(effects, ok2, "linePrefix");
  }
}
const thematicBreak$1 = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok2, nok) {
  let size = 0;
  let marker;
  return start2;
  function start2(code2) {
    effects.enter("thematicBreak");
    marker = code2;
    return atBreak(code2);
  }
  function atBreak(code2) {
    if (code2 === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code2);
    }
    if (markdownSpace(code2)) {
      return factorySpace(effects, atBreak, "whitespace")(code2);
    }
    if (size < 3 || code2 !== null && !markdownLineEnding(code2)) {
      return nok(code2);
    }
    effects.exit("thematicBreak");
    return ok2(code2);
  }
  function sequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return atBreak(code2);
  }
}
const list$1 = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
const listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
const indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};
function tokenizeListStart(effects, ok2, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start2;
  function start2(code2) {
    const kind = self.containerState.type || (code2 === 42 || code2 === 43 || code2 === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code2 === self.containerState.marker : asciiDigit(code2)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code2 === 42 || code2 === 45 ? effects.check(thematicBreak$1, nok, atMarker)(code2) : atMarker(code2);
      }
      if (!self.interrupt || code2 === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code2);
      }
    }
    return nok(code2);
  }
  function inside(code2) {
    if (asciiDigit(code2) && ++size < 10) {
      effects.consume(code2);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code2 === self.containerState.marker : code2 === 41 || code2 === 46)) {
      effects.exit("listItemValue");
      return atMarker(code2);
    }
    return nok(code2);
  }
  function atMarker(code2) {
    effects.enter("listItemMarker");
    effects.consume(code2);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code2;
    return effects.check(
      blankLine,
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    );
  }
  function onBlank(code2) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code2);
  }
  function otherPrefix(code2) {
    if (markdownSpace(code2)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code2);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code2);
  }
  function endOfPrefix(code2) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok2(code2);
  }
}
function tokenizeListContinuation(effects, ok2, nok) {
  const self = this;
  self.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code2) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
    return factorySpace(
      effects,
      ok2,
      "listItemIndent",
      self.containerState.size + 1
    )(code2);
  }
  function notBlank(code2) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code2)) {
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code2);
    }
    self.containerState.furtherBlankLines = void 0;
    self.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code2);
  }
  function notInCurrentItem(code2) {
    self.containerState._closeFlow = true;
    self.interrupt = void 0;
    return factorySpace(
      effects,
      effects.attempt(list$1, ok2, nok),
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code2);
  }
}
function tokenizeIndent(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self.containerState.size + 1
  );
  function afterPrefix(code2) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok2(code2) : nok(code2);
  }
}
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function afterPrefix(code2) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code2) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok2(code2) : nok(code2);
  }
}
const setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content2;
  let text2;
  let definition2;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content2 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text2 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading2 = {
    type: "setextHeading",
    start: Object.assign({}, events[text2][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  events[text2][1].type = "setextHeadingText";
  if (definition2) {
    events.splice(text2, 0, ["enter", heading2, context]);
    events.splice(definition2 + 1, 0, ["exit", events[content2][1], context]);
    events[content2][1].end = Object.assign({}, events[definition2][1].end);
  } else {
    events[content2][1] = heading2;
  }
  events.push(["exit", heading2, context]);
  return events;
}
function tokenizeSetextUnderline(effects, ok2, nok) {
  const self = this;
  let index2 = self.events.length;
  let marker;
  let paragraph2;
  while (index2--) {
    if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
      paragraph2 = self.events[index2][1].type === "paragraph";
      break;
    }
  }
  return start2;
  function start2(code2) {
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph2)) {
      effects.enter("setextHeadingLine");
      effects.enter("setextHeadingLineSequence");
      marker = code2;
      return closingSequence(code2);
    }
    return nok(code2);
  }
  function closingSequence(code2) {
    if (code2 === marker) {
      effects.consume(code2);
      return closingSequence;
    }
    effects.exit("setextHeadingLineSequence");
    return factorySpace(effects, closingSequenceEnd, "lineSuffix")(code2);
  }
  function closingSequenceEnd(code2) {
    if (code2 === null || markdownLineEnding(code2)) {
      effects.exit("setextHeadingLine");
      return ok2(code2);
    }
    return nok(code2);
  }
}
const flow$1 = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    blankLine,
    atBlankEnding,
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content, afterConstruct)
        ),
        "linePrefix"
      )
    )
  );
  return initial;
  function atBlankEnding(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code2);
    effects.exit("lineEndingBlank");
    self.currentConstruct = void 0;
    return initial;
  }
  function afterConstruct(code2) {
    if (code2 === null) {
      effects.consume(code2);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code2);
    effects.exit("lineEnding");
    self.currentConstruct = void 0;
    return initial;
  }
}
const resolver = {
  resolveAll: createResolver()
};
const string$1 = initializeFactory("string");
const text$2 = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0
    )
  };
  function initializeText(effects) {
    const self = this;
    const constructs2 = this.parser.constructs[field];
    const text2 = effects.attempt(constructs2, start2, notText);
    return start2;
    function start2(code2) {
      return atBreak(code2) ? text2(code2) : notText(code2);
    }
    function notText(code2) {
      if (code2 === null) {
        effects.consume(code2);
        return;
      }
      effects.enter("data");
      effects.consume(code2);
      return data;
    }
    function data(code2) {
      if (atBreak(code2)) {
        effects.exit("data");
        return text2(code2);
      }
      effects.consume(code2);
      return data;
    }
    function atBreak(code2) {
      if (code2 === null) {
        return true;
      }
      const list2 = constructs2[code2];
      let index2 = -1;
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
  }
}
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
}
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1)
          ;
        else {
          index2++;
          break;
        }
      }
      if (size) {
        const token2 = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data.end)
        };
        data.end = Object.assign({}, token2.start);
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token2);
        } else {
          events.splice(
            eventIndex,
            0,
            ["enter", token2, context],
            ["exit", token2, context]
          );
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}
function createTokenizer(parser, initialize, from) {
  let point2 = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack2 = [];
  const effects = {
    consume,
    enter,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write: write2
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write2(slice) {
    chunks = push(chunks, slice);
    main2();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token2, expandTabs) {
    return serializeChunks(sliceStream(token2), expandTabs);
  }
  function sliceStream(token2) {
    return sliceChunks(chunks, token2);
  }
  function now() {
    return Object.assign({}, point2);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main2() {
    let chunkIndex;
    while (point2._index < chunks.length) {
      const chunk = chunks[point2._index];
      if (typeof chunk === "string") {
        chunkIndex = point2._index;
        if (point2._bufferIndex < 0) {
          point2._bufferIndex = 0;
        }
        while (point2._index === chunkIndex && point2._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point2._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code2) {
    state = state(code2);
  }
  function consume(code2) {
    if (markdownLineEnding(code2)) {
      point2.line++;
      point2.column = 1;
      point2.offset += code2 === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code2 !== -1) {
      point2.column++;
      point2.offset++;
    }
    if (point2._bufferIndex < 0) {
      point2._index++;
    } else {
      point2._bufferIndex++;
      if (point2._bufferIndex === chunks[point2._index].length) {
        point2._bufferIndex = -1;
        point2._index++;
      }
    }
    context.previous = code2;
  }
  function enter(type, fields) {
    const token2 = fields || {};
    token2.type = type;
    token2.start = now();
    context.events.push(["enter", token2, context]);
    stack2.push(token2);
    return token2;
  }
  function exit2(type) {
    const token2 = stack2.pop();
    token2.end = now();
    context.events.push(["exit", token2, context]);
    return token2;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map) {
        return start2;
        function start2(code2) {
          const def = code2 !== null && map[code2];
          const all2 = code2 !== null && map.null;
          const list2 = [
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list2)(code2);
        }
      }
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      function handleConstruct(construct) {
        return start2;
        function start2(code2) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok2,
            nok
          )(code2);
        }
      }
      function ok2(code2) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code2) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack2);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point2 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack2 = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point2.line in columnStart && point2.column < 2) {
      point2.column = columnStart[point2.line];
      point2.offset += columnStart[point2.line] - 1;
    }
  }
}
function sliceChunks(chunks, token2) {
  const startIndex = token2.start._index;
  const startBufferIndex = token2.start._bufferIndex;
  const endIndex = token2.end._index;
  const endBufferIndex = token2.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}
const document$1 = {
  [42]: list$1,
  [43]: list$1,
  [45]: list$1,
  [48]: list$1,
  [49]: list$1,
  [50]: list$1,
  [51]: list$1,
  [52]: list$1,
  [53]: list$1,
  [54]: list$1,
  [55]: list$1,
  [56]: list$1,
  [57]: list$1,
  [62]: blockQuote
};
const contentInitial = {
  [91]: definition
};
const flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
const flow = {
  [35]: headingAtx,
  [42]: thematicBreak$1,
  [45]: [setextUnderline, thematicBreak$1],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak$1,
  [96]: codeFenced,
  [126]: codeFenced
};
const string = {
  [38]: characterReference,
  [92]: characterEscape
};
const text$1 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
const insideSpan = {
  null: [attention, resolver]
};
const attentionMarkers = {
  null: [42, 95]
};
const disable = {
  null: []
};
const defaultConstructs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  document: document$1,
  contentInitial,
  flowInitial,
  flow,
  string,
  text: text$1,
  insideSpan,
  attentionMarkers,
  disable
}, Symbol.toStringTag, { value: "Module" }));
function parse$1(options = {}) {
  const constructs2 = combineExtensions(
    [defaultConstructs].concat(options.extensions || [])
  );
  const parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create2(content$1),
    document: create2(document$2),
    flow: create2(flow$1),
    string: create2(string$1),
    text: create2(text$2)
  };
  return parser;
  function create2(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
  }
}
const search = /[\0\t\n\r]/g;
function preprocess() {
  let column2 = 1;
  let buffer2 = "";
  let start2 = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end2) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code2;
    value = buffer2 + value.toString(encoding);
    startPosition = 0;
    buffer2 = "";
    if (start2) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start2 = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code2 = value.charCodeAt(endPosition);
      if (!match) {
        buffer2 = value.slice(startPosition);
        break;
      }
      if (code2 === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column2 += endPosition - startPosition;
        }
        switch (code2) {
          case 0: {
            chunks.push(65533);
            column2++;
            break;
          }
          case 9: {
            next = Math.ceil(column2 / 4) * 4;
            chunks.push(-2);
            while (column2++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column2 = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column2 = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end2) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer2)
        chunks.push(buffer2);
      chunks.push(null);
    }
    return chunks;
  }
}
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}
function decodeNumericCharacterReference(value, base2) {
  const code2 = Number.parseInt(value, base2);
  if (code2 < 9 || code2 === 11 || code2 > 13 && code2 < 32 || code2 > 126 && code2 < 160 || code2 > 55295 && code2 < 57344 || code2 > 64975 && code2 < 65008 || (code2 & 65535) === 65535 || (code2 & 65535) === 65534 || code2 > 1114111) {
    return "\uFFFD";
  }
  return String.fromCharCode(code2);
}
const characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}
const own$6 = {}.hasOwnProperty;
const fromMarkdown = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler(options)(
    postprocess(
      parse$1(options).document().write(preprocess()(value, encoding, true))
    )
  );
};
function compiler(options = {}) {
  const config = configure(
    {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: opener(link2),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading2),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer2,
        codeFencedFenceMeta: buffer2,
        codeIndented: opener(codeFlow, buffer2),
        codeText: opener(codeText2, buffer2),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer2,
        definitionLabelString: buffer2,
        definitionTitleString: buffer2,
        emphasis: opener(emphasis2),
        hardBreakEscape: opener(hardBreak2),
        hardBreakTrailing: opener(hardBreak2),
        htmlFlow: opener(html2, buffer2),
        htmlFlowData: onenterdata,
        htmlText: opener(html2, buffer2),
        htmlTextData: onenterdata,
        image: opener(image2),
        label: buffer2,
        link: opener(link2),
        listItem: opener(listItem2),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list2, onenterlistordered),
        listUnordered: opener(list2),
        paragraph: opener(paragraph2),
        reference: onenterreference,
        referenceString: buffer2,
        resourceDestinationString: buffer2,
        resourceTitleString: buffer2,
        setextHeading: opener(heading2),
        strong: opener(strong2),
        thematicBreak: opener(thematicBreak2)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },
    options.mdastExtensions || []
  );
  const data = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const stack2 = [tree];
    const tokenStack = [];
    const listStack = [];
    const context = {
      stack: stack2,
      tokenStack,
      config,
      enter,
      exit: exit2,
      buffer: buffer2,
      resume,
      setData,
      getData
    };
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own$6.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index2][2].sliceSerialize
            },
            context
          ),
          events[index2][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(
        events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: point2(
        events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  function prepareList(events, start2, length) {
    let index2 = start2 - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem3;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
        if (event[0] === "enter") {
          containerBalance++;
        } else {
          containerBalance--;
        }
        atMarker = void 0;
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (listItem3 && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index2;
          }
          atMarker = void 0;
        }
      } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace")
        ;
      else {
        atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem3) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent")
              ;
            else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem3._spread = true;
          }
          listItem3.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          );
          events.splice(lineIndex || index2, 0, ["exit", listItem3, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          listItem3 = {
            type: "listItem",
            _spread: false,
            start: Object.assign({}, event[1].start)
          };
          events.splice(index2, 0, ["enter", listItem3, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start2][1]._spread = listSpread;
    return length;
  }
  function setData(key2, value) {
    data[key2] = value;
  }
  function getData(key2) {
    return data[key2];
  }
  function point2(d2) {
    return {
      line: d2.line,
      column: d2.column,
      offset: d2.offset
    };
  }
  function opener(create2, and) {
    return open;
    function open(token2) {
      enter.call(this, create2(token2), token2);
      if (and)
        and.call(this, token2);
    }
  }
  function buffer2() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function enter(node, token2, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token2, errorHandler]);
    node.position = {
      start: point2(token2.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token2) {
      if (and)
        and.call(this, token2);
      exit2.call(this, token2);
    }
  }
  function exit2(token2, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token2.type + "` (" + stringifyPosition({
          start: token2.start,
          end: token2.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token2.type) {
      if (onExitError) {
        onExitError.call(this, token2, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token2, open[0]);
      }
    }
    node.position.end = point2(token2.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true);
  }
  function onenterlistitemvalue(token2) {
    if (getData("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token2), 10);
      setData("expectingFirstListItemValue");
    }
  }
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.lang = data2;
  }
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.meta = data2;
  }
  function onexitcodefencedfence() {
    if (getData("flowCodeInside"))
      return;
    this.buffer();
    setData("flowCodeInside", true);
  }
  function onexitcodefenced() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    setData("flowCodeInside");
  }
  function onexitcodeindented() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  function onexitdefinitionlabelstring(token2) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token2)
    ).toLowerCase();
  }
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data2;
  }
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data2;
  }
  function onexitatxheadingsequence(token2) {
    const node = this.stack[this.stack.length - 1];
    if (!node.depth) {
      const depth = this.sliceSerialize(token2).length;
      node.depth = depth;
    }
  }
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true);
  }
  function onexitsetextheadinglinesequence(token2) {
    const node = this.stack[this.stack.length - 1];
    node.depth = this.sliceSerialize(token2).charCodeAt(0) === 61 ? 1 : 2;
  }
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding");
  }
  function onenterdata(token2) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text2();
      tail.position = {
        start: point2(token2.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token2) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token2);
    tail.position.end = point2(token2.end);
  }
  function onexitlineending(token2) {
    const context = this.stack[this.stack.length - 1];
    if (getData("atHardBreak")) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token2.end);
      setData("atHardBreak");
      return;
    }
    if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token2);
      onexitdata.call(this, token2);
    }
  }
  function onexithardbreak() {
    setData("atHardBreak", true);
  }
  function onexithtmlflow() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexithtmltext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexitcodetext() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.value = data2;
  }
  function onexitlink() {
    const context = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      context.type += "Reference";
      context.referenceType = getData("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitimage() {
    const context = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      context.type += "Reference";
      context.referenceType = getData("referenceType") || "shortcut";
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
    }
    setData("referenceType");
  }
  function onexitlabeltext(token2) {
    const ancestor = this.stack[this.stack.length - 2];
    const string2 = this.sliceSerialize(token2);
    ancestor.label = decodeString(string2);
    ancestor.identifier = normalizeIdentifier(string2).toLowerCase();
  }
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node = this.stack[this.stack.length - 1];
    setData("inReference", true);
    if (node.type === "link") {
      node.children = fragment.children;
    } else {
      node.alt = value;
    }
  }
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.url = data2;
  }
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.title = data2;
  }
  function onexitresource() {
    setData("inReference");
  }
  function onenterreference() {
    setData("referenceType", "collapsed");
  }
  function onexitreferencestring(token2) {
    const label = this.resume();
    const node = this.stack[this.stack.length - 1];
    node.label = label;
    node.identifier = normalizeIdentifier(
      this.sliceSerialize(token2)
    ).toLowerCase();
    setData("referenceType", "full");
  }
  function onexitcharacterreferencemarker(token2) {
    setData("characterReferenceType", token2.type);
  }
  function onexitcharacterreferencevalue(token2) {
    const data2 = this.sliceSerialize(token2);
    const type = getData("characterReferenceType");
    let value;
    if (type) {
      value = decodeNumericCharacterReference(
        data2,
        type === "characterReferenceMarkerNumeric" ? 10 : 16
      );
      setData("characterReferenceType");
    } else {
      value = decodeNamedCharacterReference(data2);
    }
    const tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point2(token2.end);
  }
  function onexitautolinkprotocol(token2) {
    onexitdata.call(this, token2);
    const node = this.stack[this.stack.length - 1];
    node.url = this.sliceSerialize(token2);
  }
  function onexitautolinkemail(token2) {
    onexitdata.call(this, token2);
    const node = this.stack[this.stack.length - 1];
    node.url = "mailto:" + this.sliceSerialize(token2);
  }
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function emphasis2() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function heading2() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function hardBreak2() {
    return {
      type: "break"
    };
  }
  function html2() {
    return {
      type: "html",
      value: ""
    };
  }
  function image2() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function link2() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function list2(token2) {
    return {
      type: "list",
      ordered: token2.type === "listOrdered",
      start: null,
      spread: token2._spread,
      children: []
    };
  }
  function listItem2(token2) {
    return {
      type: "listItem",
      spread: token2._spread,
      checked: null,
      children: []
    };
  }
  function paragraph2() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function strong2() {
    return {
      type: "strong",
      children: []
    };
  }
  function text2() {
    return {
      type: "text",
      value: ""
    };
  }
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
}
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
  return combined;
}
function extension(combined, extension2) {
  let key2;
  for (key2 in extension2) {
    if (own$6.call(extension2, key2)) {
      const list2 = key2 === "canContainEols" || key2 === "transforms";
      const maybe = own$6.call(combined, key2) ? combined[key2] : void 0;
      const left2 = maybe || (combined[key2] = list2 ? [] : {});
      const right2 = extension2[key2];
      if (right2) {
        if (list2) {
          combined[key2] = [...left2, ...right2];
        } else {
          Object.assign(left2, right2);
        }
      }
    }
  }
}
function defaultOnError(left2, right2) {
  if (left2) {
    throw new Error(
      "Cannot close `" + left2.type + "` (" + stringifyPosition({
        start: left2.start,
        end: left2.end
      }) + "): a different token (`" + right2.type + "`, " + stringifyPosition({
        start: right2.start,
        end: right2.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right2.type + "`, " + stringifyPosition({
        start: right2.start,
        end: right2.end
      }) + ") is still open"
    );
  }
}
function remarkParse(options) {
  const parser = (doc) => {
    const settings = this.data("settings");
    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      })
    );
  };
  Object.assign(this, { Parser: parser });
}
var u$1 = function(type, props, value) {
  var node = { type: String(type) };
  if ((value === void 0 || value === null) && (typeof props === "string" || Array.isArray(props))) {
    value = props;
  } else {
    Object.assign(node, props);
  }
  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== void 0 && value !== null) {
    node.value = String(value);
  }
  return node;
};
const own$5 = {}.hasOwnProperty;
function unknown(h2, node) {
  const data = node.data || {};
  if ("value" in node && !(own$5.call(data, "hName") || own$5.call(data, "hProperties") || own$5.call(data, "hChildren"))) {
    return h2.augment(node, u$1("text", node.value));
  }
  return h2(node, "div", all(h2, node));
}
function one(h2, node, parent) {
  const type = node && node.type;
  let fn6;
  if (!type) {
    throw new Error("Expected node, got `" + node + "`");
  }
  if (own$5.call(h2.handlers, type)) {
    fn6 = h2.handlers[type];
  } else if (h2.passThrough && h2.passThrough.includes(type)) {
    fn6 = returnNode;
  } else {
    fn6 = h2.unknownHandler;
  }
  return (typeof fn6 === "function" ? fn6 : unknown)(h2, node, parent);
}
function returnNode(h2, node) {
  return "children" in node ? { ...node, children: all(h2, node) } : node;
}
function all(h2, parent) {
  const values = [];
  if ("children" in parent) {
    const nodes = parent.children;
    let index2 = -1;
    while (++index2 < nodes.length) {
      const result = one(h2, nodes[index2], parent);
      if (result) {
        if (index2 && nodes[index2 - 1].type === "break") {
          if (!Array.isArray(result) && result.type === "text") {
            result.value = result.value.replace(/^\s+/, "");
          }
          if (!Array.isArray(result) && result.type === "element") {
            const head = result.children[0];
            if (head && head.type === "text") {
              head.value = head.value.replace(/^\s+/, "");
            }
          }
        }
        if (Array.isArray(result)) {
          values.push(...result);
        } else {
          values.push(result);
        }
      }
    }
  }
  return values;
}
const convert = function(test) {
  if (test === void 0 || test === null) {
    return ok;
  }
  if (typeof test === "string") {
    return typeFactory(test);
  }
  if (typeof test === "object") {
    return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
  }
  if (typeof test === "function") {
    return castFactory(test);
  }
  throw new Error("Expected function, string, or object as test");
};
function anyFactory(tests) {
  const checks2 = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks2[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks2.length) {
      if (checks2[index3].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all2);
  function all2(node) {
    let key2;
    for (key2 in check) {
      if (node[key2] !== check[key2])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters));
  }
}
function ok() {
  return true;
}
function color(d2) {
  return d2;
}
const CONTINUE = true;
const SKIP = "skip";
const EXIT = false;
const visitParents = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  const is = convert(test);
  const step = reverse ? -1 : 1;
  factory2(tree, null, [])();
  function factory2(node, index2, parents) {
    const value = typeof node === "object" && node !== null ? node : {};
    let name;
    if (typeof value.type === "string") {
      name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = [];
      let subresult;
      let offset2;
      let grandparents;
      if (!test || is(node, index2, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if (node.children && result[0] !== SKIP) {
        offset2 = (reverse ? node.children.length : -1) + step;
        grandparents = parents.concat(node);
        while (offset2 > -1 && offset2 < node.children.length) {
          subresult = factory2(node.children[offset2], offset2, grandparents)();
          if (subresult[0] === EXIT) {
            return subresult;
          }
          offset2 = typeof subresult[1] === "number" ? subresult[1] : offset2 + step;
        }
      }
      return result;
    }
  }
};
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}
const visit = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    return visitor(
      node,
      parent ? parent.children.indexOf(node) : null,
      parent
    );
  }
};
const pointStart = point("start");
const pointEnd = point("end");
function point(type) {
  return point2;
  function point2(node) {
    const point3 = node && node.position && node.position[type] || {};
    return {
      line: point3.line || null,
      column: point3.column || null,
      offset: point3.offset > -1 ? point3.offset : null
    };
  }
}
function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}
const own$4 = {}.hasOwnProperty;
function definitions(node) {
  const cache = /* @__PURE__ */ Object.create(null);
  if (!node || !node.type) {
    throw new Error("mdast-util-definitions expected node");
  }
  visit(node, "definition", (definition3) => {
    const id = clean(definition3.identifier);
    if (id && !own$4.call(cache, id)) {
      cache[id] = definition3;
    }
  });
  return definition2;
  function definition2(identifier) {
    const id = clean(identifier);
    return id && own$4.call(cache, id) ? cache[id] : null;
  }
}
function clean(value) {
  return String(value || "").toUpperCase();
}
const characterReferences = { '"': "quot", "&": "amp", "<": "lt", ">": "gt" };
function encode$1(value) {
  return value.replace(/["&<>]/g, replace);
  function replace(value2) {
    return "&" + characterReferences[value2] + ";";
  }
}
function sanitizeUri(url, protocol) {
  const value = encode$1(normalizeUri(url || ""));
  if (!protocol) {
    return value;
  }
  const colon = value.indexOf(":");
  const questionMark = value.indexOf("?");
  const numberSign = value.indexOf("#");
  const slash = value.indexOf("/");
  if (colon < 0 || slash > -1 && colon > slash || questionMark > -1 && colon > questionMark || numberSign > -1 && colon > numberSign || protocol.test(value.slice(0, colon))) {
    return value;
  }
  return "";
}
function normalizeUri(value) {
  const result = [];
  let index2 = -1;
  let start2 = 0;
  let skip = 0;
  while (++index2 < value.length) {
    const code2 = value.charCodeAt(index2);
    let replace = "";
    if (code2 === 37 && asciiAlphanumeric(value.charCodeAt(index2 + 1)) && asciiAlphanumeric(value.charCodeAt(index2 + 2))) {
      skip = 2;
    } else if (code2 < 128) {
      if (!/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(code2))) {
        replace = String.fromCharCode(code2);
      }
    } else if (code2 > 55295 && code2 < 57344) {
      const next = value.charCodeAt(index2 + 1);
      if (code2 < 56320 && next > 56319 && next < 57344) {
        replace = String.fromCharCode(code2, next);
        skip = 1;
      } else {
        replace = "\uFFFD";
      }
    } else {
      replace = String.fromCharCode(code2);
    }
    if (replace) {
      result.push(value.slice(start2, index2), encodeURIComponent(replace));
      start2 = index2 + skip + 1;
      replace = "";
    }
    if (skip) {
      index2 += skip;
      skip = 0;
    }
  }
  return result.join("") + value.slice(start2);
}
function wrap(nodes, loose) {
  const result = [];
  let index2 = -1;
  if (loose) {
    result.push(u$1("text", "\n"));
  }
  while (++index2 < nodes.length) {
    if (index2)
      result.push(u$1("text", "\n"));
    result.push(nodes[index2]);
  }
  if (loose && nodes.length > 0) {
    result.push(u$1("text", "\n"));
  }
  return result;
}
function footer(h2) {
  let index2 = -1;
  const listItems = [];
  while (++index2 < h2.footnoteOrder.length) {
    const def = h2.footnoteById[h2.footnoteOrder[index2].toUpperCase()];
    if (!def) {
      continue;
    }
    const content2 = all(h2, def);
    const id = String(def.identifier);
    const safeId = sanitizeUri(id.toLowerCase());
    let referenceIndex = 0;
    const backReferences = [];
    while (++referenceIndex <= h2.footnoteCounts[id]) {
      const backReference = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + h2.clobberPrefix + "fnref-" + safeId + (referenceIndex > 1 ? "-" + referenceIndex : ""),
          dataFootnoteBackref: true,
          className: ["data-footnote-backref"],
          ariaLabel: h2.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      if (referenceIndex > 1) {
        backReference.children.push({
          type: "element",
          tagName: "sup",
          children: [{ type: "text", value: String(referenceIndex) }]
        });
      }
      if (backReferences.length > 0) {
        backReferences.push({ type: "text", value: " " });
      }
      backReferences.push(backReference);
    }
    const tail = content2[content2.length - 1];
    if (tail && tail.type === "element" && tail.tagName === "p") {
      const tailTail = tail.children[tail.children.length - 1];
      if (tailTail && tailTail.type === "text") {
        tailTail.value += " ";
      } else {
        tail.children.push({ type: "text", value: " " });
      }
      tail.children.push(...backReferences);
    } else {
      content2.push(...backReferences);
    }
    const listItem2 = {
      type: "element",
      tagName: "li",
      properties: { id: h2.clobberPrefix + "fn-" + safeId },
      children: wrap(content2, true)
    };
    if (def.position) {
      listItem2.position = def.position;
    }
    listItems.push(listItem2);
  }
  if (listItems.length === 0) {
    return null;
  }
  return {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: true, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: h2.footnoteLabelTagName,
        properties: JSON.parse(JSON.stringify(h2.footnoteLabelProperties)),
        children: [u$1("text", h2.footnoteLabel)]
      },
      { type: "text", value: "\n" },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: wrap(listItems, true)
      },
      { type: "text", value: "\n" }
    ]
  };
}
function blockquote(h2, node) {
  return h2(node, "blockquote", wrap(all(h2, node), true));
}
function hardBreak(h2, node) {
  return [h2(node, "br"), u$1("text", "\n")];
}
function code(h2, node) {
  const value = node.value ? node.value + "\n" : "";
  const lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  const props = {};
  if (lang) {
    props.className = ["language-" + lang];
  }
  const code2 = h2(node, "code", props, [u$1("text", value)]);
  if (node.meta) {
    code2.data = { meta: node.meta };
  }
  return h2(node.position, "pre", [code2]);
}
function strikethrough(h2, node) {
  return h2(node, "del", all(h2, node));
}
function emphasis(h2, node) {
  return h2(node, "em", all(h2, node));
}
function footnoteReference(h2, node) {
  const id = String(node.identifier);
  const safeId = sanitizeUri(id.toLowerCase());
  const index2 = h2.footnoteOrder.indexOf(id);
  let counter;
  if (index2 === -1) {
    h2.footnoteOrder.push(id);
    h2.footnoteCounts[id] = 1;
    counter = h2.footnoteOrder.length;
  } else {
    h2.footnoteCounts[id]++;
    counter = index2 + 1;
  }
  const reuseCounter = h2.footnoteCounts[id];
  return h2(node, "sup", [
    h2(
      node.position,
      "a",
      {
        href: "#" + h2.clobberPrefix + "fn-" + safeId,
        id: h2.clobberPrefix + "fnref-" + safeId + (reuseCounter > 1 ? "-" + reuseCounter : ""),
        dataFootnoteRef: true,
        ariaDescribedBy: "footnote-label"
      },
      [u$1("text", String(counter))]
    )
  ]);
}
function footnote(h2, node) {
  const footnoteById = h2.footnoteById;
  let no = 1;
  while (no in footnoteById)
    no++;
  const identifier = String(no);
  footnoteById[identifier] = {
    type: "footnoteDefinition",
    identifier,
    children: [{ type: "paragraph", children: node.children }],
    position: node.position
  };
  return footnoteReference(h2, {
    type: "footnoteReference",
    identifier,
    position: node.position
  });
}
function heading(h2, node) {
  return h2(node, "h" + node.depth, all(h2, node));
}
function html$2(h2, node) {
  return h2.dangerous ? h2.augment(node, u$1("raw", node.value)) : null;
}
var encodeCache = {};
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) {
    return cache;
  }
  cache = encodeCache[exclude] = [];
  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    if (/^[0-9a-z]$/i.test(ch)) {
      cache.push(ch);
    } else {
      cache.push("%" + ("0" + i.toString(16).toUpperCase()).slice(-2));
    }
  }
  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }
  return cache;
}
function encode(string2, exclude, keepEscaped) {
  var i, l2, code2, nextCode, cache, result = "";
  if (typeof exclude !== "string") {
    keepEscaped = exclude;
    exclude = encode.defaultChars;
  }
  if (typeof keepEscaped === "undefined") {
    keepEscaped = true;
  }
  cache = getEncodeCache(exclude);
  for (i = 0, l2 = string2.length; i < l2; i++) {
    code2 = string2.charCodeAt(i);
    if (keepEscaped && code2 === 37 && i + 2 < l2) {
      if (/^[0-9a-f]{2}$/i.test(string2.slice(i + 1, i + 3))) {
        result += string2.slice(i, i + 3);
        i += 2;
        continue;
      }
    }
    if (code2 < 128) {
      result += cache[code2];
      continue;
    }
    if (code2 >= 55296 && code2 <= 57343) {
      if (code2 >= 55296 && code2 <= 56319 && i + 1 < l2) {
        nextCode = string2.charCodeAt(i + 1);
        if (nextCode >= 56320 && nextCode <= 57343) {
          result += encodeURIComponent(string2[i] + string2[i + 1]);
          i++;
          continue;
        }
      }
      result += "%EF%BF%BD";
      continue;
    }
    result += encodeURIComponent(string2[i]);
  }
  return result;
}
encode.defaultChars = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";
var encode_1 = encode;
function revert(h2, node) {
  const subtype = node.referenceType;
  let suffix = "]";
  if (subtype === "collapsed") {
    suffix += "[]";
  } else if (subtype === "full") {
    suffix += "[" + (node.label || node.identifier) + "]";
  }
  if (node.type === "imageReference") {
    return u$1("text", "![" + node.alt + suffix);
  }
  const contents = all(h2, node);
  const head = contents[0];
  if (head && head.type === "text") {
    head.value = "[" + head.value;
  } else {
    contents.unshift(u$1("text", "["));
  }
  const tail = contents[contents.length - 1];
  if (tail && tail.type === "text") {
    tail.value += suffix;
  } else {
    contents.push(u$1("text", suffix));
  }
  return contents;
}
function imageReference(h2, node) {
  const def = h2.definition(node.identifier);
  if (!def) {
    return revert(h2, node);
  }
  const props = { src: encode_1(def.url || ""), alt: node.alt };
  if (def.title !== null && def.title !== void 0) {
    props.title = def.title;
  }
  return h2(node, "img", props);
}
function image(h2, node) {
  const props = { src: encode_1(node.url), alt: node.alt };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h2(node, "img", props);
}
function inlineCode(h2, node) {
  return h2(node, "code", [u$1("text", node.value.replace(/\r?\n|\r/g, " "))]);
}
function linkReference(h2, node) {
  const def = h2.definition(node.identifier);
  if (!def) {
    return revert(h2, node);
  }
  const props = { href: encode_1(def.url || "") };
  if (def.title !== null && def.title !== void 0) {
    props.title = def.title;
  }
  return h2(node, "a", props, all(h2, node));
}
function link(h2, node) {
  const props = { href: encode_1(node.url) };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h2(node, "a", props, all(h2, node));
}
function listItem(h2, node, parent) {
  const result = all(h2, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  const wrapped = [];
  if (typeof node.checked === "boolean") {
    let paragraph2;
    if (result[0] && result[0].type === "element" && result[0].tagName === "p") {
      paragraph2 = result[0];
    } else {
      paragraph2 = h2(null, "p", []);
      result.unshift(paragraph2);
    }
    if (paragraph2.children.length > 0) {
      paragraph2.children.unshift(u$1("text", " "));
    }
    paragraph2.children.unshift(
      h2(null, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  let index2 = -1;
  while (++index2 < result.length) {
    const child = result[index2];
    if (loose || index2 !== 0 || child.type !== "element" || child.tagName !== "p") {
      wrapped.push(u$1("text", "\n"));
    }
    if (child.type === "element" && child.tagName === "p" && !loose) {
      wrapped.push(...child.children);
    } else {
      wrapped.push(child);
    }
  }
  const tail = result[result.length - 1];
  if (tail && (loose || !("tagName" in tail) || tail.tagName !== "p")) {
    wrapped.push(u$1("text", "\n"));
  }
  return h2(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  let index2 = -1;
  while (!loose && ++index2 < children.length) {
    loose = listItemLoose(children[index2]);
  }
  return Boolean(loose);
}
function listItemLoose(node) {
  const spread = node.spread;
  return spread === void 0 || spread === null ? node.children.length > 1 : spread;
}
function list(h2, node) {
  const props = {};
  const name = node.ordered ? "ol" : "ul";
  const items = all(h2, node);
  let index2 = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  while (++index2 < items.length) {
    const item = items[index2];
    if (item.type === "element" && item.tagName === "li" && item.properties && Array.isArray(item.properties.className) && item.properties.className.includes("task-list-item")) {
      props.className = ["contains-task-list"];
      break;
    }
  }
  return h2(node, name, props, wrap(items, true));
}
function paragraph(h2, node) {
  return h2(node, "p", all(h2, node));
}
function root(h2, node) {
  return h2.augment(node, u$1("root", wrap(all(h2, node))));
}
function strong(h2, node) {
  return h2(node, "strong", all(h2, node));
}
function table(h2, node) {
  const rows = node.children;
  let index2 = -1;
  const align = node.align || [];
  const result = [];
  while (++index2 < rows.length) {
    const row = rows[index2].children;
    const name = index2 === 0 ? "th" : "td";
    const out = [];
    let cellIndex = -1;
    const length = node.align ? align.length : row.length;
    while (++cellIndex < length) {
      const cell = row[cellIndex];
      out.push(
        h2(cell, name, { align: align[cellIndex] }, cell ? all(h2, cell) : [])
      );
    }
    result[index2] = h2(rows[index2], "tr", wrap(out, true));
  }
  return h2(
    node,
    "table",
    wrap(
      [h2(result[0].position, "thead", wrap([result[0]], true))].concat(
        result[1] ? h2(
          {
            start: pointStart(result[1]),
            end: pointEnd(result[result.length - 1])
          },
          "tbody",
          wrap(result.slice(1), true)
        ) : []
      ),
      true
    )
  );
}
const tab = 9;
const space = 32;
function trimLines(value) {
  const source2 = String(value);
  const search2 = /\r?\n|\r/g;
  let match = search2.exec(source2);
  let last = 0;
  const lines = [];
  while (match) {
    lines.push(
      trimLine(source2.slice(last, match.index), last > 0, true),
      match[0]
    );
    last = match.index + match[0].length;
    match = search2.exec(source2);
  }
  lines.push(trimLine(source2.slice(last), last > 0, false));
  return lines.join("");
}
function trimLine(value, start2, end2) {
  let startIndex = 0;
  let endIndex = value.length;
  if (start2) {
    let code2 = value.codePointAt(startIndex);
    while (code2 === tab || code2 === space) {
      startIndex++;
      code2 = value.codePointAt(startIndex);
    }
  }
  if (end2) {
    let code2 = value.codePointAt(endIndex - 1);
    while (code2 === tab || code2 === space) {
      endIndex--;
      code2 = value.codePointAt(endIndex - 1);
    }
  }
  return endIndex > startIndex ? value.slice(startIndex, endIndex) : "";
}
function text(h2, node) {
  return h2.augment(node, u$1("text", trimLines(String(node.value))));
}
function thematicBreak(h2, node) {
  return h2(node, "hr");
}
const handlers = {
  blockquote,
  break: hardBreak,
  code,
  delete: strikethrough,
  emphasis,
  footnoteReference,
  footnote,
  heading,
  html: html$2,
  imageReference,
  image,
  inlineCode,
  linkReference,
  link,
  listItem,
  list,
  paragraph,
  root,
  strong,
  table,
  text,
  thematicBreak,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};
function ignore() {
  return null;
}
const own$3 = {}.hasOwnProperty;
function factory(tree, options) {
  const settings = options || {};
  const dangerous = settings.allowDangerousHtml || false;
  const footnoteById = {};
  h2.dangerous = dangerous;
  h2.clobberPrefix = settings.clobberPrefix === void 0 || settings.clobberPrefix === null ? "user-content-" : settings.clobberPrefix;
  h2.footnoteLabel = settings.footnoteLabel || "Footnotes";
  h2.footnoteLabelTagName = settings.footnoteLabelTagName || "h2";
  h2.footnoteLabelProperties = settings.footnoteLabelProperties || {
    id: "footnote-label",
    className: ["sr-only"]
  };
  h2.footnoteBackLabel = settings.footnoteBackLabel || "Back to content";
  h2.definition = definitions(tree);
  h2.footnoteById = footnoteById;
  h2.footnoteOrder = [];
  h2.footnoteCounts = {};
  h2.augment = augment;
  h2.handlers = { ...handlers, ...settings.handlers };
  h2.unknownHandler = settings.unknownHandler;
  h2.passThrough = settings.passThrough;
  visit(tree, "footnoteDefinition", (definition2) => {
    const id = String(definition2.identifier).toUpperCase();
    if (!own$3.call(footnoteById, id)) {
      footnoteById[id] = definition2;
    }
  });
  return h2;
  function augment(left2, right2) {
    if (left2 && "data" in left2 && left2.data) {
      const data = left2.data;
      if (data.hName) {
        if (right2.type !== "element") {
          right2 = {
            type: "element",
            tagName: "",
            properties: {},
            children: []
          };
        }
        right2.tagName = data.hName;
      }
      if (right2.type === "element" && data.hProperties) {
        right2.properties = { ...right2.properties, ...data.hProperties };
      }
      if ("children" in right2 && right2.children && data.hChildren) {
        right2.children = data.hChildren;
      }
    }
    if (left2) {
      const ctx = "type" in left2 ? left2 : { position: left2 };
      if (!generated(ctx)) {
        right2.position = { start: pointStart(ctx), end: pointEnd(ctx) };
      }
    }
    return right2;
  }
  function h2(node, tagName, props, children) {
    if (Array.isArray(props)) {
      children = props;
      props = {};
    }
    return augment(node, {
      type: "element",
      tagName,
      properties: props || {},
      children: children || []
    });
  }
}
function toHast(tree, options) {
  const h2 = factory(tree, options);
  const node = one(h2, tree, null);
  const foot = footer(h2);
  if (foot) {
    node.children.push(u$1("text", "\n"), foot);
  }
  return Array.isArray(node) ? { type: "root", children: node } : node;
}
const remarkRehype = function(destination, options) {
  return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
};
const remarkRehype$1 = remarkRehype;
function bridge(destination, options) {
  return (node, file, next) => {
    destination.run(toHast(node, options), file, (error) => {
      next(error);
    });
  };
}
function mutate(options) {
  return (node) => toHast(node, options);
}
class Schema {
  constructor(property, normal, space2) {
    this.property = property;
    this.normal = normal;
    if (space2) {
      this.space = space2;
    }
  }
}
Schema.prototype.property = {};
Schema.prototype.normal = {};
Schema.prototype.space = null;
function merge(definitions2, space2) {
  const property = {};
  const normal = {};
  let index2 = -1;
  while (++index2 < definitions2.length) {
    Object.assign(property, definitions2[index2].property);
    Object.assign(normal, definitions2[index2].normal);
  }
  return new Schema(property, normal, space2);
}
function normalize(value) {
  return value.toLowerCase();
}
class Info {
  constructor(property, attribute) {
    this.property = property;
    this.attribute = attribute;
  }
}
Info.prototype.space = null;
Info.prototype.boolean = false;
Info.prototype.booleanish = false;
Info.prototype.overloadedBoolean = false;
Info.prototype.number = false;
Info.prototype.commaSeparated = false;
Info.prototype.spaceSeparated = false;
Info.prototype.commaOrSpaceSeparated = false;
Info.prototype.mustUseProperty = false;
Info.prototype.defined = false;
let powers = 0;
const boolean = increment();
const booleanish = increment();
const overloadedBoolean = increment();
const number = increment();
const spaceSeparated = increment();
const commaSeparated = increment();
const commaOrSpaceSeparated = increment();
function increment() {
  return 2 ** ++powers;
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean,
  booleanish,
  overloadedBoolean,
  number,
  spaceSeparated,
  commaSeparated,
  commaOrSpaceSeparated
}, Symbol.toStringTag, { value: "Module" }));
const checks = Object.keys(types);
class DefinedInfo extends Info {
  constructor(property, attribute, mask, space2) {
    let index2 = -1;
    super(property, attribute);
    mark(this, "space", space2);
    if (typeof mask === "number") {
      while (++index2 < checks.length) {
        const check = checks[index2];
        mark(this, checks[index2], (mask & types[check]) === types[check]);
      }
    }
  }
}
DefinedInfo.prototype.defined = true;
function mark(values, key2, value) {
  if (value) {
    values[key2] = value;
  }
}
const own$2 = {}.hasOwnProperty;
function create(definition2) {
  const property = {};
  const normal = {};
  let prop;
  for (prop in definition2.properties) {
    if (own$2.call(definition2.properties, prop)) {
      const value = definition2.properties[prop];
      const info = new DefinedInfo(
        prop,
        definition2.transform(definition2.attributes || {}, prop),
        value,
        definition2.space
      );
      if (definition2.mustUseProperty && definition2.mustUseProperty.includes(prop)) {
        info.mustUseProperty = true;
      }
      property[prop] = info;
      normal[normalize(prop)] = prop;
      normal[normalize(info.attribute)] = prop;
    }
  }
  return new Schema(property, normal, definition2.space);
}
const xlink = create({
  space: "xlink",
  transform(_, prop) {
    return "xlink:" + prop.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});
const xml = create({
  space: "xml",
  transform(_, prop) {
    return "xml:" + prop.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute;
}
function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform(attributes, property.toLowerCase());
}
const xmlns = create({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: caseInsensitiveTransform,
  properties: { xmlns: null, xmlnsXLink: null }
});
const aria = create({
  transform(_, prop) {
    return prop === "role" ? prop : "aria-" + prop.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish,
    ariaAutoComplete: null,
    ariaBusy: booleanish,
    ariaChecked: booleanish,
    ariaColCount: number,
    ariaColIndex: number,
    ariaColSpan: number,
    ariaControls: spaceSeparated,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated,
    ariaDetails: null,
    ariaDisabled: booleanish,
    ariaDropEffect: spaceSeparated,
    ariaErrorMessage: null,
    ariaExpanded: booleanish,
    ariaFlowTo: spaceSeparated,
    ariaGrabbed: booleanish,
    ariaHasPopup: null,
    ariaHidden: booleanish,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated,
    ariaLevel: number,
    ariaLive: null,
    ariaModal: booleanish,
    ariaMultiLine: booleanish,
    ariaMultiSelectable: booleanish,
    ariaOrientation: null,
    ariaOwns: spaceSeparated,
    ariaPlaceholder: null,
    ariaPosInSet: number,
    ariaPressed: booleanish,
    ariaReadOnly: booleanish,
    ariaRelevant: null,
    ariaRequired: booleanish,
    ariaRoleDescription: spaceSeparated,
    ariaRowCount: number,
    ariaRowIndex: number,
    ariaRowSpan: number,
    ariaSelected: booleanish,
    ariaSetSize: number,
    ariaSort: null,
    ariaValueMax: number,
    ariaValueMin: number,
    ariaValueNow: number,
    ariaValueText: null,
    role: null
  }
});
const html$1 = create({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: caseInsensitiveTransform,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: commaSeparated,
    acceptCharset: spaceSeparated,
    accessKey: spaceSeparated,
    action: null,
    allow: null,
    allowFullScreen: boolean,
    allowPaymentRequest: boolean,
    allowUserMedia: boolean,
    alt: null,
    as: null,
    async: boolean,
    autoCapitalize: null,
    autoComplete: spaceSeparated,
    autoFocus: boolean,
    autoPlay: boolean,
    capture: boolean,
    charSet: null,
    checked: boolean,
    cite: null,
    className: spaceSeparated,
    cols: number,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean,
    controlsList: spaceSeparated,
    coords: number | commaSeparated,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean,
    defer: boolean,
    dir: null,
    dirName: null,
    disabled: boolean,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean,
    formTarget: null,
    headers: spaceSeparated,
    height: number,
    hidden: boolean,
    high: number,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated,
    httpEquiv: spaceSeparated,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean,
    itemId: null,
    itemProp: spaceSeparated,
    itemRef: spaceSeparated,
    itemScope: boolean,
    itemType: spaceSeparated,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean,
    low: number,
    manifest: null,
    max: null,
    maxLength: number,
    media: null,
    method: null,
    min: null,
    minLength: number,
    multiple: boolean,
    muted: boolean,
    name: null,
    nonce: null,
    noModule: boolean,
    noValidate: boolean,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean,
    optimum: number,
    pattern: null,
    ping: spaceSeparated,
    placeholder: null,
    playsInline: boolean,
    poster: null,
    preload: null,
    readOnly: boolean,
    referrerPolicy: null,
    rel: spaceSeparated,
    required: boolean,
    reversed: boolean,
    rows: number,
    rowSpan: number,
    sandbox: spaceSeparated,
    scope: null,
    scoped: boolean,
    seamless: boolean,
    selected: boolean,
    shape: null,
    size: number,
    sizes: null,
    slot: null,
    span: number,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: number,
    step: null,
    style: null,
    tabIndex: number,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean,
    useMap: null,
    value: booleanish,
    width: number,
    wrap: null,
    align: null,
    aLink: null,
    archive: spaceSeparated,
    axis: null,
    background: null,
    bgColor: null,
    border: number,
    borderColor: null,
    bottomMargin: number,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: boolean,
    declare: boolean,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: number,
    leftMargin: number,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: number,
    marginWidth: number,
    noResize: boolean,
    noHref: boolean,
    noShade: boolean,
    noWrap: boolean,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: number,
    rules: null,
    scheme: null,
    scrolling: booleanish,
    standby: null,
    summary: null,
    text: null,
    topMargin: number,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: number,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean,
    disableRemotePlayback: boolean,
    prefix: null,
    property: null,
    results: number,
    security: null,
    unselectable: null
  }
});
const svg$1 = create({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: caseSensitiveTransform,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});
const valid = /^data[-\w.:]+$/i;
const dash = /-[a-z]/g;
const cap = /[A-Z]/g;
function find(schema, value) {
  const normal = normalize(value);
  let prop = value;
  let Type = Info;
  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]];
  }
  if (normal.length > 4 && normal.slice(0, 4) === "data" && valid.test(value)) {
    if (value.charAt(4) === "-") {
      const rest = value.slice(5).replace(dash, camelcase);
      prop = "data" + rest.charAt(0).toUpperCase() + rest.slice(1);
    } else {
      const rest = value.slice(4);
      if (!dash.test(rest)) {
        let dashes = rest.replace(cap, kebab);
        if (dashes.charAt(0) !== "-") {
          dashes = "-" + dashes;
        }
        value = "data" + dashes;
      }
    }
    Type = DefinedInfo;
  }
  return new Type(prop, value);
}
function kebab($0) {
  return "-" + $0.toLowerCase();
}
function camelcase($0) {
  return $0.charAt(1).toUpperCase();
}
const hastToReact = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
};
const html = merge([xml, xlink, xmlns, aria, html$1], "html");
const svg = merge([xml, xlink, xmlns, aria, svg$1], "svg");
function rehypeFilter(options) {
  if (options.allowedElements && options.disallowedElements) {
    throw new TypeError(
      "Only one of `allowedElements` and `disallowedElements` should be defined"
    );
  }
  if (options.allowedElements || options.disallowedElements || options.allowElement) {
    return (tree) => {
      visit(tree, "element", (node, index2, parent_) => {
        const parent = parent_;
        let remove;
        if (options.allowedElements) {
          remove = !options.allowedElements.includes(node.tagName);
        } else if (options.disallowedElements) {
          remove = options.disallowedElements.includes(node.tagName);
        }
        if (!remove && options.allowElement && typeof index2 === "number") {
          remove = !options.allowElement(node, index2, parent);
        }
        if (remove && typeof index2 === "number") {
          if (options.unwrapDisallowed && node.children) {
            parent.children.splice(index2, 1, ...node.children);
          } else {
            parent.children.splice(index2, 1);
          }
          return index2;
        }
        return void 0;
      });
    };
  }
}
var reactIs = { exports: {} };
var reactIs_production_min$1 = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
u = Symbol.for("react.module.reference");
function v(a) {
  if ("object" === typeof a && null !== a) {
    var r = a.$$typeof;
    switch (r) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case m:
          case n:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case h:
              case l:
              case q:
              case p:
              case g:
                return a;
              default:
                return r;
            }
        }
      case c:
        return r;
    }
  }
}
var ContextConsumer = reactIs_production_min$1.ContextConsumer = h;
var ContextProvider = reactIs_production_min$1.ContextProvider = g;
var Element$1 = reactIs_production_min$1.Element = b;
var ForwardRef = reactIs_production_min$1.ForwardRef = l;
var Fragment = reactIs_production_min$1.Fragment = d;
var Lazy = reactIs_production_min$1.Lazy = q;
var Memo = reactIs_production_min$1.Memo = p;
var Portal = reactIs_production_min$1.Portal = c;
var Profiler = reactIs_production_min$1.Profiler = f;
var StrictMode = reactIs_production_min$1.StrictMode = e;
var Suspense = reactIs_production_min$1.Suspense = m;
var SuspenseList = reactIs_production_min$1.SuspenseList = n;
var isAsyncMode = reactIs_production_min$1.isAsyncMode = function() {
  return false;
};
var isConcurrentMode = reactIs_production_min$1.isConcurrentMode = function() {
  return false;
};
var isContextConsumer = reactIs_production_min$1.isContextConsumer = function(a) {
  return v(a) === h;
};
var isContextProvider = reactIs_production_min$1.isContextProvider = function(a) {
  return v(a) === g;
};
var isElement = reactIs_production_min$1.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
var isForwardRef = reactIs_production_min$1.isForwardRef = function(a) {
  return v(a) === l;
};
var isFragment = reactIs_production_min$1.isFragment = function(a) {
  return v(a) === d;
};
var isLazy = reactIs_production_min$1.isLazy = function(a) {
  return v(a) === q;
};
var isMemo = reactIs_production_min$1.isMemo = function(a) {
  return v(a) === p;
};
var isPortal = reactIs_production_min$1.isPortal = function(a) {
  return v(a) === c;
};
var isProfiler = reactIs_production_min$1.isProfiler = function(a) {
  return v(a) === f;
};
var isStrictMode = reactIs_production_min$1.isStrictMode = function(a) {
  return v(a) === e;
};
var isSuspense = reactIs_production_min$1.isSuspense = function(a) {
  return v(a) === m;
};
var isSuspenseList = reactIs_production_min$1.isSuspenseList = function(a) {
  return v(a) === n;
};
var isValidElementType = reactIs_production_min$1.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
};
var typeOf = reactIs_production_min$1.typeOf = v;
const reactIs_production_min = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  ContextConsumer,
  ContextProvider,
  Element: Element$1,
  ForwardRef,
  Fragment,
  Lazy,
  Memo,
  Portal,
  Profiler,
  StrictMode,
  Suspense,
  SuspenseList,
  isAsyncMode,
  isConcurrentMode,
  isContextConsumer,
  isContextProvider,
  isElement,
  isForwardRef,
  isFragment,
  isLazy,
  isMemo,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
  isSuspenseList,
  isValidElementType,
  typeOf,
  default: reactIs_production_min$1
}, [reactIs_production_min$1]);
const require$$0$1 = /* @__PURE__ */ getAugmentedNamespace(reactIs_production_min);
(function(module) {
  {
    module.exports = require$$0$1;
  }
})(reactIs);
const ReactIs = /* @__PURE__ */ getDefaultExportFromCjs(reactIs.exports);
function whitespace(thing) {
  var value = thing && typeof thing === "object" && thing.type === "text" ? thing.value || "" : thing;
  return typeof value === "string" && value.replace(/[ \t\n\f\r]/g, "") === "";
}
function stringify$1(values) {
  return values.join(" ").trim();
}
function stringify2(values, options) {
  var settings = options || {};
  if (values[values.length - 1] === "") {
    values = values.concat("");
  }
  return values.join(
    (settings.padRight ? " " : "") + "," + (settings.padLeft === false ? "" : " ")
  ).trim();
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
var NEWLINE_REGEX = /\n/g;
var WHITESPACE_REGEX = /^\s*/;
var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
var COLON_REGEX = /^:\s*/;
var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
var SEMICOLON_REGEX = /^[;\s]*/;
var TRIM_REGEX = /^\s+|\s+$/g;
var NEWLINE = "\n";
var FORWARD_SLASH = "/";
var ASTERISK = "*";
var EMPTY_STRING = "";
var TYPE_COMMENT = "comment";
var TYPE_DECLARATION = "declaration";
var inlineStyleParser = function(style, options) {
  if (typeof style !== "string") {
    throw new TypeError("First argument must be a string");
  }
  if (!style)
    return [];
  options = options || {};
  var lineno = 1;
  var column2 = 1;
  function updatePosition(str) {
    var lines = str.match(NEWLINE_REGEX);
    if (lines)
      lineno += lines.length;
    var i = str.lastIndexOf(NEWLINE);
    column2 = ~i ? str.length - i : column2 + str.length;
  }
  function position2() {
    var start2 = { line: lineno, column: column2 };
    return function(node) {
      node.position = new Position(start2);
      whitespace2();
      return node;
    };
  }
  function Position(start2) {
    this.start = start2;
    this.end = { line: lineno, column: column2 };
    this.source = options.source;
  }
  Position.prototype.content = style;
  function error(msg) {
    var err = new Error(
      options.source + ":" + lineno + ":" + column2 + ": " + msg
    );
    err.reason = msg;
    err.filename = options.source;
    err.line = lineno;
    err.column = column2;
    err.source = style;
    if (options.silent)
      ;
    else {
      throw err;
    }
  }
  function match(re) {
    var m2 = re.exec(style);
    if (!m2)
      return;
    var str = m2[0];
    updatePosition(str);
    style = style.slice(str.length);
    return m2;
  }
  function whitespace2() {
    match(WHITESPACE_REGEX);
  }
  function comments(rules) {
    var c2;
    rules = rules || [];
    while (c2 = comment()) {
      if (c2 !== false) {
        rules.push(c2);
      }
    }
    return rules;
  }
  function comment() {
    var pos2 = position2();
    if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1))
      return;
    var i = 2;
    while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) {
      ++i;
    }
    i += 2;
    if (EMPTY_STRING === style.charAt(i - 1)) {
      return error("End of comment missing");
    }
    var str = style.slice(2, i - 2);
    column2 += 2;
    updatePosition(str);
    style = style.slice(i);
    column2 += 2;
    return pos2({
      type: TYPE_COMMENT,
      comment: str
    });
  }
  function declaration() {
    var pos2 = position2();
    var prop = match(PROPERTY_REGEX);
    if (!prop)
      return;
    comment();
    if (!match(COLON_REGEX))
      return error("property missing ':'");
    var val = match(VALUE_REGEX);
    var ret = pos2({
      type: TYPE_DECLARATION,
      property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
      value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
    });
    match(SEMICOLON_REGEX);
    return ret;
  }
  function declarations() {
    var decls = [];
    comments(decls);
    var decl;
    while (decl = declaration()) {
      if (decl !== false) {
        decls.push(decl);
        comments(decls);
      }
    }
    return decls;
  }
  whitespace2();
  return declarations();
};
function trim(str) {
  return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
const inlineStyleParser$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: inlineStyleParser
}, [inlineStyleParser]);
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(inlineStyleParser$1);
var parse2 = require$$0;
function StyleToObject(style, iterator) {
  var output = null;
  if (!style || typeof style !== "string") {
    return output;
  }
  var declaration;
  var declarations = parse2(style);
  var hasIterator = typeof iterator === "function";
  var property;
  var value;
  for (var i = 0, len = declarations.length; i < len; i++) {
    declaration = declarations[i];
    property = declaration.property;
    value = declaration.value;
    if (hasIterator) {
      iterator(property, value, declaration);
    } else if (value) {
      output || (output = {});
      output[property] = value;
    }
  }
  return output;
}
var styleToObject = StyleToObject;
const own$1 = {}.hasOwnProperty;
const tableElements = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr"]);
function childrenToReact(context, node) {
  const children = [];
  let childIndex = -1;
  let child;
  while (++childIndex < node.children.length) {
    child = node.children[childIndex];
    if (child.type === "element") {
      children.push(toReact(context, child, childIndex, node));
    } else if (child.type === "text") {
      if (node.type !== "element" || !tableElements.has(node.tagName) || !whitespace(child)) {
        children.push(child.value);
      }
    } else if (child.type === "raw" && !context.options.skipHtml) {
      children.push(child.value);
    }
  }
  return children;
}
function toReact(context, node, index2, parent) {
  const options = context.options;
  const parentSchema = context.schema;
  const name = node.tagName;
  const properties = {};
  let schema = parentSchema;
  let property;
  if (parentSchema.space === "html" && name === "svg") {
    schema = svg;
    context.schema = schema;
  }
  if (node.properties) {
    for (property in node.properties) {
      if (own$1.call(node.properties, property)) {
        addProperty(properties, property, node.properties[property], context);
      }
    }
  }
  if (name === "ol" || name === "ul") {
    context.listDepth++;
  }
  const children = childrenToReact(context, node);
  if (name === "ol" || name === "ul") {
    context.listDepth--;
  }
  context.schema = parentSchema;
  const position2 = node.position || {
    start: {
      line: null,
      column: null,
      offset: null
    },
    end: {
      line: null,
      column: null,
      offset: null
    }
  };
  const component = options.components && own$1.call(options.components, name) ? options.components[name] : name;
  const basic = typeof component === "string" || component === React.Fragment;
  if (!ReactIs.isValidElementType(component)) {
    throw new TypeError(`Component for name \`${name}\` not defined or is not renderable`);
  }
  properties.key = [name, position2.start.line, position2.start.column, index2].join("-");
  if (name === "a" && options.linkTarget) {
    properties.target = typeof options.linkTarget === "function" ? options.linkTarget(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null) : options.linkTarget;
  }
  if (name === "a" && options.transformLinkUri) {
    properties.href = options.transformLinkUri(String(properties.href || ""), node.children, typeof properties.title === "string" ? properties.title : null);
  }
  if (!basic && name === "code" && parent.type === "element" && parent.tagName !== "pre") {
    properties.inline = true;
  }
  if (!basic && (name === "h1" || name === "h2" || name === "h3" || name === "h4" || name === "h5" || name === "h6")) {
    properties.level = Number.parseInt(name.charAt(1), 10);
  }
  if (name === "img" && options.transformImageUri) {
    properties.src = options.transformImageUri(String(properties.src || ""), String(properties.alt || ""), typeof properties.title === "string" ? properties.title : null);
  }
  if (!basic && name === "li" && parent.type === "element") {
    const input = getInputElement(node);
    properties.checked = input && input.properties ? Boolean(input.properties.checked) : null;
    properties.index = getElementsBeforeCount(parent, node);
    properties.ordered = parent.tagName === "ol";
  }
  if (!basic && (name === "ol" || name === "ul")) {
    properties.ordered = name === "ol";
    properties.depth = context.listDepth;
  }
  if (name === "td" || name === "th") {
    if (properties.align) {
      if (!properties.style)
        properties.style = {};
      properties.style.textAlign = properties.align;
      delete properties.align;
    }
    if (!basic) {
      properties.isHeader = name === "th";
    }
  }
  if (!basic && name === "tr" && parent.type === "element") {
    properties.isHeader = Boolean(parent.tagName === "thead");
  }
  if (options.sourcePos) {
    properties["data-sourcepos"] = flattenPosition(position2);
  }
  if (!basic && options.rawSourcePos) {
    properties.sourcePosition = node.position;
  }
  if (!basic && options.includeElementIndex) {
    properties.index = getElementsBeforeCount(parent, node);
    properties.siblingCount = getElementsBeforeCount(parent);
  }
  if (!basic) {
    properties.node = node;
  }
  return children.length > 0 ? React.createElement(component, properties, children) : React.createElement(component, properties);
}
function getInputElement(node) {
  let index2 = -1;
  while (++index2 < node.children.length) {
    const child = node.children[index2];
    if (child.type === "element" && child.tagName === "input") {
      return child;
    }
  }
  return null;
}
function getElementsBeforeCount(parent, node) {
  let index2 = -1;
  let count = 0;
  while (++index2 < parent.children.length) {
    if (parent.children[index2] === node)
      break;
    if (parent.children[index2].type === "element")
      count++;
  }
  return count;
}
function addProperty(props, prop, value, ctx) {
  const info = find(ctx.schema, prop);
  let result = value;
  if (result === null || result === void 0 || result !== result) {
    return;
  }
  if (Array.isArray(result)) {
    result = info.commaSeparated ? stringify2(result) : stringify$1(result);
  }
  if (info.property === "style" && typeof result === "string") {
    result = parseStyle(result);
  }
  if (info.space && info.property) {
    props[own$1.call(hastToReact, info.property) ? hastToReact[info.property] : info.property] = result;
  } else if (info.attribute) {
    props[info.attribute] = result;
  }
}
function parseStyle(value) {
  const result = {};
  try {
    styleToObject(value, iterator);
  } catch {
  }
  return result;
  function iterator(name, v2) {
    const k2 = name.slice(0, 4) === "-ms-" ? `ms-${name.slice(4)}` : name;
    result[k2.replace(/-([a-z])/g, styleReplacer)] = v2;
  }
}
function styleReplacer(_, $1) {
  return $1.toUpperCase();
}
function flattenPosition(pos2) {
  return [pos2.start.line, ":", pos2.start.column, "-", pos2.end.line, ":", pos2.end.column].map((d2) => String(d2)).join("");
}
const own = {}.hasOwnProperty;
const changelog = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md";
const deprecated = {
  plugins: {
    to: "plugins",
    id: "change-plugins-to-remarkplugins"
  },
  renderers: {
    to: "components",
    id: "change-renderers-to-components"
  },
  astPlugins: {
    id: "remove-buggy-html-in-markdown-parser"
  },
  allowDangerousHtml: {
    id: "remove-buggy-html-in-markdown-parser"
  },
  escapeHtml: {
    id: "remove-buggy-html-in-markdown-parser"
  },
  source: {
    to: "children",
    id: "change-source-to-children"
  },
  allowNode: {
    to: "allowElement",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  allowedTypes: {
    to: "allowedElements",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  disallowedTypes: {
    to: "disallowedElements",
    id: "replace-allownode-allowedtypes-and-disallowedtypes"
  },
  includeNodeIndex: {
    to: "includeElementIndex",
    id: "change-includenodeindex-to-includeelementindex"
  }
};
function ReactMarkdown(options) {
  for (const key2 in deprecated) {
    if (own.call(deprecated, key2) && own.call(options, key2)) {
      const deprecation = deprecated[key2];
      console.warn(`[react-markdown] Warning: please ${deprecation.to ? `use \`${deprecation.to}\` instead of` : "remove"} \`${key2}\` (see <${changelog}#${deprecation.id}> for more info)`);
      delete deprecated[key2];
    }
  }
  const processor = unified().use(remarkParse).use(options.remarkPlugins || []).use(remarkRehype$1, {
    ...options.remarkRehypeOptions,
    allowDangerousHtml: true
  }).use(options.rehypePlugins || []).use(rehypeFilter, options);
  const file = new VFile();
  if (typeof options.children === "string") {
    file.value = options.children;
  } else if (options.children !== void 0 && options.children !== null) {
    console.warn(`[react-markdown] Warning: please pass a string as \`children\` (not: \`${options.children}\`)`);
  }
  const hastNode = processor.runSync(processor.parse(file), file);
  if (hastNode.type !== "root") {
    throw new TypeError("Expected a `root` node");
  }
  let result = /* @__PURE__ */ jsx(Fragment$1, {
    children: childrenToReact({
      options,
      schema: html,
      listDepth: 0
    }, hastNode)
  });
  if (options.className) {
    result = /* @__PURE__ */ jsx("div", {
      className: options.className,
      children: result
    });
  }
  return result;
}
ReactMarkdown.defaultProps = {
  transformLinkUri: uriTransformer
};
ReactMarkdown.propTypes = {
  children: propTypes.exports.string,
  className: propTypes.exports.string,
  allowElement: propTypes.exports.func,
  allowedElements: propTypes.exports.arrayOf(propTypes.exports.string),
  disallowedElements: propTypes.exports.arrayOf(propTypes.exports.string),
  unwrapDisallowed: propTypes.exports.bool,
  remarkPlugins: propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.object, propTypes.exports.func, propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.bool, propTypes.exports.string, propTypes.exports.object, propTypes.exports.func, propTypes.exports.arrayOf(
    propTypes.exports.any
  )]))])),
  rehypePlugins: propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.object, propTypes.exports.func, propTypes.exports.arrayOf(propTypes.exports.oneOfType([propTypes.exports.bool, propTypes.exports.string, propTypes.exports.object, propTypes.exports.func, propTypes.exports.arrayOf(
    propTypes.exports.any
  )]))])),
  sourcePos: propTypes.exports.bool,
  rawSourcePos: propTypes.exports.bool,
  skipHtml: propTypes.exports.bool,
  includeElementIndex: propTypes.exports.bool,
  transformLinkUri: propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.bool]),
  linkTarget: propTypes.exports.oneOfType([propTypes.exports.func, propTypes.exports.string]),
  transformImageUri: propTypes.exports.func,
  components: propTypes.exports.object
};
const RouterLink$1 = chakra(Link);
const IdTd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  children: /* @__PURE__ */ jsx(Tooltip, {
    label: token2.id != null ? regexify(token2.id) : "\u{1D684}\u{1D697}\u{1D694}\u{1D697}\u{1D698}\u{1D6A0}\u{1D697}",
    children: /* @__PURE__ */ jsxs(Stack, {
      children: [/* @__PURE__ */ jsx(Text, {
        children: token2.index
      }), token2.gates != null && /* @__PURE__ */ jsxs(Text, {
        title: `Controls Token #${token2.gates}`,
        children: ["(", token2.gates === 0 ? "all" : token2.gates, ")"]
      }), token2.is?.disabling && /* @__PURE__ */ jsx(Text, {
        children: "(disabled)"
      })]
    })
  })
});
const ErrorTd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  colSpan: 4,
  children: /* @__PURE__ */ jsx(Flex, {
    justify: "center",
    children: /* @__PURE__ */ jsx(Text, {
      color: "cyan",
      fontStyle: "italic",
      children: extractMessage(token2.error)
    })
  })
});
const LoadingTd = ({
  label = "Loading Metadata\u2026",
  ...props
}) => /* @__PURE__ */ jsx(Td, {
  ...props,
  children: /* @__PURE__ */ jsxs(Flex, {
    justify: "center",
    children: [/* @__PURE__ */ jsx(Spinner, {
      thickness: "4px"
    }), /* @__PURE__ */ jsx(Text, {
      ml: 3,
      children: label
    })]
  })
});
const ImageTd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  children: /* @__PURE__ */ jsx(Stack, {
    children: /* @__PURE__ */ jsxs(RouterLink$1, {
      to: `/view/${regexify(token2.id)}`,
      children: [/* @__PURE__ */ jsx(Box, {
        bg: token2.metadata?.background_color ? `#${token2.metadata.background_color}` : "transparent",
        children: token2.metadata?.image && /* @__PURE__ */ jsx(chakra.object, {
          data: httpURL(token2.metadata.image) ?? void 0,
          title: token2.metadata?.name ?? "Untitled",
          maxW: 32,
          maxH: 32,
          objectFit: "contain",
          margin: "auto"
        })
      }), /* @__PURE__ */ jsx(Text, {
        children: token2.metadata?.name ?? /* @__PURE__ */ jsx(Text, {
          as: "em",
          children: "Untitled"
        })
      })]
    })
  })
});
const DescriptionTd = ({
  token: token2
}) => /* @__PURE__ */ jsxs(Td, {
  flexGrow: 1,
  sx: {
    a: {
      textDecoration: "underline"
    },
    blockquote: {
      borderLeft: "3px solid #66666644"
    }
  },
  children: [token2.is?.disabling && /* @__PURE__ */ jsxs(Text, {
    textAlign: "justify",
    fontStyle: "italic",
    mb: 5,
    children: ["This token disables the following permission for", /* @__PURE__ */ jsxs(RouterLink$1, {
      to: `/view/${token2.gates}`,
      ml: 1,
      children: ["the token at index #", token2.gates]
    }), ":"]
  }), token2.is?.gating && /* @__PURE__ */ jsxs(Text, {
    textAlign: "justify",
    fontStyle: "italic",
    mb: 5,
    children: ["This token gives holders the following permission for", token2.gates === 0 ? " all tokens" : /* @__PURE__ */ jsxs(RouterLink$1, {
      to: `/view/${token2.gates}`,
      ml: 1,
      children: ["the token at index #", token2.gates]
    }), ":"]
  }), /* @__PURE__ */ jsx(ReactMarkdown, {
    linkTarget: "_blank",
    children: token2.is?.disabling || token2.is?.gating ? `> ${token2.metadata.description.replace(/\n/g, "\n> ")}` : token2.metadata?.description ?? "*No Description*"
  })]
});
const LinkTd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  children: token2.metadata?.external_url && /* @__PURE__ */ jsx(Link$1, {
    href: token2.metadata.external_url,
    isExternal: true,
    fontSize: "150%",
    children: /* @__PURE__ */ jsx(Tooltip, {
      label: token2.metadata.external_url,
      hasArrow: true,
      children: "\u{1F310}"
    })
  })
});
const URITd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  children: token2.uri && /* @__PURE__ */ jsxs(Flex, {
    justify: "center",
    fontSize: "150%",
    children: [/* @__PURE__ */ jsx(Link$1, {
      href: httpURL(token2.uri) ?? void 0,
      isExternal: true,
      children: /* @__PURE__ */ jsx(Tooltip, {
        label: token2.uri,
        hasArrow: true,
        children: "\u{1F517}"
      })
    }), /* @__PURE__ */ jsx(Link$1, {
      ml: 2,
      onClick: () => {
        if (token2.uri && typeof navigator !== "undefined" && window.isSecureContext) {
          navigator.clipboard?.writeText(token2.uri);
        }
      },
      children: /* @__PURE__ */ jsx(Tooltip, {
        label: "Copy to Clipboard",
        hasArrow: true,
        children: "\u{1F4CB}"
      })
    })]
  })
});
const TotalTd = ({
  token: token2
}) => /* @__PURE__ */ jsx(Td, {
  children: /* @__PURE__ */ jsxs(RouterLink$1, {
    to: `/owners/${regexify(token2.id)}`,
    whiteSpace: "pre",
    children: [token2.total?.toString() ?? /* @__PURE__ */ jsx(Spinner, {
      size: "xs"
    }), " \u2044 ", token2.max?.toString() ?? /* @__PURE__ */ jsx(Spinner, {
      size: "xs"
    })]
  })
});
const ActionsTd = ({
  token: token2
}) => {
  const id = regexify(token2.id);
  return /* @__PURE__ */ jsx(Td, {
    children: /* @__PURE__ */ jsxs(Flex, {
      justify: "center",
      fontSize: "150%",
      children: [/* @__PURE__ */ jsx(RouterLink$1, {
        to: `/edit/${id}`,
        children: /* @__PURE__ */ jsx(Tooltip, {
          label: "Edit Metadata",
          hasArrow: true,
          children: "\u270F\uFE0F"
        })
      }), /* @__PURE__ */ jsx(RouterLink$1, {
        ml: 2,
        to: `/view/${id}`,
        children: /* @__PURE__ */ jsx(Tooltip, {
          label: "View This NFT",
          hasArrow: true,
          children: "\u{1F441}"
        })
      }), /* @__PURE__ */ jsx(RouterLink$1, {
        ml: 2,
        to: `/disburse/${id}`,
        children: /* @__PURE__ */ jsx(Tooltip, {
          label: "Disburse This NFT",
          hasArrow: true,
          children: "\u{1F4B8}"
        })
      })]
    })
  });
};
const TokensTable = ({
  tokens
}) => {
  return /* @__PURE__ */ jsxs(Table, {
    sx: {
      "th, td": {
        textAlign: "center"
      },
      a: {
        borderBottom: "2px dotted transparent"
      },
      "a:hover": {
        textDecoration: "none",
        borderBottom: "2px dotted"
      }
    },
    children: [/* @__PURE__ */ jsx(Thead, {
      children: /* @__PURE__ */ jsxs(Tr, {
        children: [/* @__PURE__ */ jsx(Th, {
          children: "Id"
        }), /* @__PURE__ */ jsx(Th, {
          children: "Display"
        }), /* @__PURE__ */ jsx(Th, {
          flexGrow: 1,
          children: "Description"
        }), /* @__PURE__ */ jsx(Th, {
          children: "Link"
        }), /* @__PURE__ */ jsx(Th, {
          children: "Metadata"
        }), /* @__PURE__ */ jsx(Th, {
          children: "Total"
        }), /* @__PURE__ */ jsx(Th, {
          children: "Actions"
        })]
      })
    }), /* @__PURE__ */ jsx(Tbody, {
      children: tokens.map((token2, index2) => {
        if (token2.is?.hidden) {
          return null;
        }
        return /* @__PURE__ */ jsxs(Tr, {
          children: [/* @__PURE__ */ jsx(IdTd, {
            token: token2,
            index: index2
          }), (() => {
            if (!token2.uri && token2.error) {
              return /* @__PURE__ */ jsx(ErrorTd, {
                token: token2
              });
            }
            if (!token2.metadata) {
              return /* @__PURE__ */ jsx(LoadingTd, {
                colSpan: token2.uri ? 3 : 4,
                label: `${token2.uri ? "Loading" : "Finding"} Metadata\u2026`,
                token: token2
              });
            }
            return /* @__PURE__ */ jsxs(Fragment$1, {
              children: [/* @__PURE__ */ jsx(ImageTd, {
                token: token2
              }), /* @__PURE__ */ jsx(DescriptionTd, {
                token: token2
              }), /* @__PURE__ */ jsx(LinkTd, {
                token: token2
              })]
            });
          })(), token2.uri && /* @__PURE__ */ jsx(URITd, {
            token: token2
          }), /* @__PURE__ */ jsx(TotalTd, {
            token: token2
          }), /* @__PURE__ */ jsx(ActionsTd, {
            token: token2
          })]
        }, index2);
      })
    })]
  });
};
const RouterLink = chakra(Link);
const LinkedSVG = React.forwardRef(({
  href = "#",
  svg: data,
  ...props
}, ref) => /* @__PURE__ */ jsx(RouterLink, {
  position: "relative",
  zIndex: 1,
  to: href,
  ...props,
  children: /* @__PURE__ */ jsx(Box, {
    display: "inline-block",
    w: "full",
    h: "full",
    children: /* @__PURE__ */ jsx(chakra.object, {
      maxH: "100%",
      data,
      ref,
      position: "relative",
      zIndex: -1
    })
  })
}));
LinkedSVG.displayName = "LinkedSVG";
export {
  LinkedSVG as L,
  ReactMarkdown as R,
  TokensTable as T,
  Tooltip as a,
  Table as b,
  Thead as c,
  Tr as d,
  extractMessage as e,
  Th as f,
  Tbody as g,
  httpURL as h,
  Td as i,
  isSet as j,
  ipfsify as k,
  lib as l,
  isEmpty as m,
  capitalize as n,
  deregexify as o,
  regexify as r,
  switchTo as s,
  toSpanList as t
};
//# sourceMappingURL=LinkedSVG.c397aabb.js.map
