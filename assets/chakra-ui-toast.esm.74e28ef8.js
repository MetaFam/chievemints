import { A as Alert$1, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.de1790b1.js";
import { r as react, ap as reactDom, aq as useChakra, ar as useLatestRef, as as isBrowser, a as jsx, at as objectKeys, A as AnimatePresence, au as theme, av as noop, aw as ThemeProvider, ax as ColorModeContext, ay as isFunction$1, az as useIsPresent, a6 as useUpdateEffect, aA as useTimeout, q as motion, _ as __DEV__, d as chakra, aB as CloseButton } from "./index.1422698f.js";
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
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
  return _extends$2.apply(this, arguments);
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
var VisuallyHidden = /* @__PURE__ */ react.exports.forwardRef(function VisuallyHidden2(_ref, ref) {
  var _ref$as = _ref.as, Comp = _ref$as === void 0 ? "span" : _ref$as, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, props = _objectWithoutPropertiesLoose$1(_ref, ["as", "style"]);
  return /* @__PURE__ */ react.exports.createElement(Comp, _extends$2({
    ref,
    style: _extends$2({
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }, style)
  }, props));
});
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error('Cannot assign value "' + value + '" to ref "' + ref + '"');
    }
  }
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
function forwardRefWithAs(render) {
  return /* @__PURE__ */ react.exports.forwardRef(render);
}
function getOwnerDocument(element) {
  return canUseDOM() ? element ? element.ownerDocument : document : null;
}
function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
function useForkedRef() {
  for (var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    refs[_key4] = arguments[_key4];
  }
  return react.exports.useMemo(function() {
    if (refs.every(function(ref) {
      return ref == null;
    })) {
      return null;
    }
    return function(node) {
      refs.forEach(function(ref) {
        assignRef(ref, node);
      });
    };
  }, [].concat(refs));
}
function usePrevious(value) {
  var ref = react.exports.useRef(null);
  react.exports.useEffect(function() {
    ref.current = value;
  }, [value]);
  return ref.current;
}
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
var keys = {
  polite: -1,
  assertive: -1
};
var elements = {
  polite: {},
  assertive: {}
};
var liveRegions = {
  polite: null,
  assertive: null
};
var renderTimer;
var Alert = /* @__PURE__ */ forwardRefWithAs(function Alert2(_ref, forwardedRef) {
  var _ref$as = _ref.as, Comp = _ref$as === void 0 ? "div" : _ref$as, children = _ref.children, _ref$type = _ref.type, regionType = _ref$type === void 0 ? "polite" : _ref$type, props = _objectWithoutPropertiesLoose(_ref, ["as", "children", "type"]);
  var ownRef = react.exports.useRef(null);
  var ref = useForkedRef(forwardedRef, ownRef);
  var child = react.exports.useMemo(
    function() {
      return /* @__PURE__ */ react.exports.createElement(Comp, _extends$1({}, props, {
        ref,
        "data-reach-alert": true
      }), children);
    },
    [children, props]
  );
  useMirrorEffects(regionType, child, ownRef);
  return child;
});
function createMirror(type, doc) {
  var key = ++keys[type];
  var mount = function mount2(element) {
    if (liveRegions[type]) {
      elements[type][key] = element;
      renderAlerts();
    } else {
      var node = doc.createElement("div");
      node.setAttribute("data-reach-live-" + type, "true");
      liveRegions[type] = node;
      doc.body.appendChild(liveRegions[type]);
      mount2(element);
    }
  };
  var update = function update2(element) {
    elements[type][key] = element;
    renderAlerts();
  };
  var unmount = function unmount2() {
    delete elements[type][key];
    renderAlerts();
  };
  return {
    mount,
    update,
    unmount
  };
}
function renderAlerts() {
  if (renderTimer != null) {
    window.clearTimeout(renderTimer);
  }
  renderTimer = window.setTimeout(function() {
    Object.keys(elements).forEach(function(elementType) {
      var regionType = elementType;
      var container = liveRegions[regionType];
      if (container) {
        reactDom.exports.render(/* @__PURE__ */ react.exports.createElement(VisuallyHidden, {
          as: "div"
        }, /* @__PURE__ */ react.exports.createElement("div", {
          role: regionType === "assertive" ? "alert" : "status",
          "aria-live": regionType
        }, Object.keys(elements[regionType]).map(function(key) {
          return /* @__PURE__ */ react.exports.cloneElement(elements[regionType][key], {
            key,
            ref: null
          });
        }))), liveRegions[regionType]);
      }
    });
  }, 500);
}
function useMirrorEffects(regionType, element, ref) {
  var prevType = usePrevious(regionType);
  var mirror = react.exports.useRef(null);
  var mounted = react.exports.useRef(false);
  react.exports.useEffect(function() {
    var ownerDocument = getOwnerDocument(ref.current);
    if (!mounted.current) {
      mounted.current = true;
      mirror.current = createMirror(regionType, ownerDocument);
      mirror.current.mount(element);
    } else if (prevType !== regionType) {
      mirror.current && mirror.current.unmount();
      mirror.current = createMirror(regionType, ownerDocument);
      mirror.current.mount(element);
    } else {
      mirror.current && mirror.current.update(element);
    }
  }, [element, regionType, prevType, ref]);
  react.exports.useEffect(function() {
    return function() {
      mirror.current && mirror.current.unmount();
    };
  }, []);
}
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
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function findToast(toasts, id) {
  var position = getToastPosition(toasts, id);
  var index = position ? toasts[position].findIndex(function(toast2) {
    return toast2.id === id;
  }) : -1;
  return {
    position,
    index
  };
}
var getToastPosition = function getToastPosition2(toasts, id) {
  var _Object$values$flat$f;
  return (_Object$values$flat$f = Object.values(toasts).flat().find(function(toast2) {
    return toast2.id === id;
  })) == null ? void 0 : _Object$values$flat$f.position;
};
function getToastStyle(position) {
  var isRighty = position.includes("right");
  var isLefty = position.includes("left");
  var alignItems = "center";
  if (isRighty)
    alignItems = "flex-end";
  if (isLefty)
    alignItems = "flex-start";
  return {
    display: "flex",
    flexDirection: "column",
    alignItems
  };
}
var toastMotionVariants = {
  initial: function initial(props) {
    var _ref;
    var position = props.position;
    var dir = ["top", "bottom"].includes(position) ? "y" : "x";
    var factor = ["top-right", "bottom-right"].includes(position) ? 1 : -1;
    if (position === "bottom")
      factor = 1;
    return _ref = {
      opacity: 0
    }, _ref[dir] = factor * 24, _ref;
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1]
    }
  }
};
var Toast$1 = function Toast(props) {
  var id = props.id, message = props.message, onCloseComplete = props.onCloseComplete, onRequestRemove = props.onRequestRemove, _props$requestClose = props.requestClose, requestClose = _props$requestClose === void 0 ? false : _props$requestClose, _props$position = props.position, position = _props$position === void 0 ? "bottom" : _props$position, _props$duration = props.duration, duration = _props$duration === void 0 ? 5e3 : _props$duration, _props$containerStyle = props.containerStyle, containerStyle = _props$containerStyle === void 0 ? {} : _props$containerStyle;
  var _React$useState = react.exports.useState(duration), delay = _React$useState[0], setDelay = _React$useState[1];
  var isPresent = useIsPresent();
  useUpdateEffect(function() {
    if (!isPresent) {
      onCloseComplete == null ? void 0 : onCloseComplete();
    }
  }, [isPresent]);
  useUpdateEffect(function() {
    setDelay(duration);
  }, [duration]);
  var onMouseEnter = function onMouseEnter2() {
    return setDelay(null);
  };
  var onMouseLeave = function onMouseLeave2() {
    return setDelay(duration);
  };
  var close = function close2() {
    if (isPresent)
      onRequestRemove();
  };
  react.exports.useEffect(function() {
    if (isPresent && requestClose) {
      onRequestRemove();
    }
  }, [isPresent, requestClose, onRequestRemove]);
  useTimeout(close, delay);
  var style = react.exports.useMemo(function() {
    return getToastStyle(position);
  }, [position]);
  return /* @__PURE__ */ react.exports.createElement(
    motion.li,
    {
      layout: true,
      className: "chakra-toast",
      variants: toastMotionVariants,
      initial: "initial",
      animate: "animate",
      exit: "exit",
      onHoverStart: onMouseEnter,
      onHoverEnd: onMouseLeave,
      custom: {
        position
      },
      style
    },
    /* @__PURE__ */ jsx(Alert, {
      className: "chakra-toast__inner",
      style: _extends({
        pointerEvents: "auto",
        maxWidth: 560,
        minWidth: 300,
        margin: "0.5rem"
      }, containerStyle),
      children: isFunction$1(message) ? message({
        id,
        onClose: close
      }) : message
    })
  );
};
if (__DEV__) {
  Toast$1.displayName = "Toast";
}
var ToastManager = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(ToastManager2, _React$Component);
  function ToastManager2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {
      top: [],
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      bottom: [],
      "bottom-right": []
    };
    _this.notify = function(message, options) {
      var toast2 = _this.createToast(message, options);
      var position = toast2.position, id = toast2.id;
      _this.setState(function(prevToasts) {
        var _extends2;
        var isTop = position.includes("top");
        var toasts = isTop ? [toast2].concat(prevToasts[position]) : [].concat(prevToasts[position], [toast2]);
        return _extends({}, prevToasts, (_extends2 = {}, _extends2[position] = toasts, _extends2));
      });
      return id;
    };
    _this.updateToast = function(id, options) {
      _this.setState(function(prevState) {
        var nextState = _extends({}, prevState);
        var _findToast = findToast(nextState, id), position = _findToast.position, index = _findToast.index;
        if (position && index !== -1) {
          nextState[position][index] = _extends({}, nextState[position][index], options);
        }
        return nextState;
      });
    };
    _this.closeAll = function(_temp) {
      var _ref = _temp === void 0 ? {} : _temp, positions = _ref.positions;
      _this.setState(function(prev) {
        var allPositions = ["bottom", "bottom-right", "bottom-left", "top", "top-left", "top-right"];
        var positionsToClose = positions != null ? positions : allPositions;
        return positionsToClose.reduce(function(acc, position) {
          acc[position] = prev[position].map(function(toast2) {
            return _extends({}, toast2, {
              requestClose: true
            });
          });
          return acc;
        }, {});
      });
    };
    _this.createToast = function(message, options) {
      var _options$id, _options$position;
      ToastManager2.counter += 1;
      var id = (_options$id = options.id) != null ? _options$id : ToastManager2.counter;
      var position = (_options$position = options.position) != null ? _options$position : "top";
      return {
        id,
        message,
        position,
        duration: options.duration,
        onCloseComplete: options.onCloseComplete,
        onRequestRemove: function onRequestRemove() {
          return _this.removeToast(String(id), position);
        },
        status: options.status,
        requestClose: false,
        containerStyle: options.containerStyle
      };
    };
    _this.closeToast = function(id) {
      _this.setState(function(prevState) {
        var _extends3;
        var position = getToastPosition(prevState, id);
        if (!position)
          return prevState;
        return _extends({}, prevState, (_extends3 = {}, _extends3[position] = prevState[position].map(function(toast2) {
          if (toast2.id == id) {
            return _extends({}, toast2, {
              requestClose: true
            });
          }
          return toast2;
        }), _extends3));
      });
    };
    _this.removeToast = function(id, position) {
      _this.setState(function(prevState) {
        var _extends4;
        return _extends({}, prevState, (_extends4 = {}, _extends4[position] = prevState[position].filter(function(toast2) {
          return toast2.id != id;
        }), _extends4));
      });
    };
    _this.isVisible = function(id) {
      var _findToast2 = findToast(_this.state, id), position = _findToast2.position;
      return Boolean(position);
    };
    _this.getStyle = function(position) {
      var isTopOrBottom = position === "top" || position === "bottom";
      var margin = isTopOrBottom ? "0 auto" : void 0;
      var top = position.includes("top") ? "env(safe-area-inset-top, 0px)" : void 0;
      var bottom = position.includes("bottom") ? "env(safe-area-inset-bottom, 0px)" : void 0;
      var right = !position.includes("left") ? "env(safe-area-inset-right, 0px)" : void 0;
      var left = !position.includes("right") ? "env(safe-area-inset-left, 0px)" : void 0;
      return {
        position: "fixed",
        zIndex: 5500,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        margin,
        top,
        bottom,
        right,
        left
      };
    };
    var methods = {
      notify: _this.notify,
      closeAll: _this.closeAll,
      close: _this.closeToast,
      update: _this.updateToast,
      isActive: _this.isVisible
    };
    props.notify(methods);
    return _this;
  }
  var _proto = ToastManager2.prototype;
  _proto.render = function render() {
    var _this2 = this;
    return objectKeys(this.state).map(function(position) {
      var toasts = _this2.state[position];
      return /* @__PURE__ */ jsx("ul", {
        id: "chakra-toast-manager-" + position,
        style: _this2.getStyle(position),
        children: /* @__PURE__ */ jsx(AnimatePresence, {
          initial: false,
          children: toasts.map(function(toast2) {
            return /* @__PURE__ */ jsx(Toast$1, {
              ...toast2
            }, toast2.id);
          })
        })
      }, position);
    });
  };
  return ToastManager2;
}(react.exports.Component);
ToastManager.counter = 0;
var portalId = "chakra-toast-portal";
var Toaster = function Toaster2() {
  var _this = this;
  this.createToast = void 0;
  this.removeAll = void 0;
  this.closeToast = void 0;
  this.updateToast = void 0;
  this.isToastActive = void 0;
  this.bindFunctions = function(methods) {
    _this.createToast = methods.notify;
    _this.removeAll = methods.closeAll;
    _this.closeToast = methods.close;
    _this.updateToast = methods.update;
    _this.isToastActive = methods.isActive;
  };
  this.notify = function(message, options) {
    if (options === void 0) {
      options = {};
    }
    return _this.createToast == null ? void 0 : _this.createToast(message, options);
  };
  this.close = function(id) {
    _this.closeToast == null ? void 0 : _this.closeToast(id);
  };
  this.closeAll = function(options) {
    _this.removeAll == null ? void 0 : _this.removeAll(options);
  };
  this.update = function(id, options) {
    if (options === void 0) {
      options = {};
    }
    _this.updateToast == null ? void 0 : _this.updateToast(id, options);
  };
  this.isActive = function(id) {
    return _this.isToastActive == null ? void 0 : _this.isToastActive(id);
  };
  if (!isBrowser)
    return;
  var portal;
  var existingPortal = document.getElementById(portalId);
  if (existingPortal) {
    portal = existingPortal;
  } else {
    var _document$body;
    var div = document.createElement("div");
    div.id = portalId;
    (_document$body = document.body) == null ? void 0 : _document$body.appendChild(div);
    portal = div;
  }
  reactDom.exports.render(
    /* @__PURE__ */ jsx(ToastManager, {
      notify: this.bindFunctions
    }),
    portal
  );
};
var toast = new Toaster();
function getToastPlacement(position, dir) {
  var _logical$dir;
  if (!position)
    return;
  var logicals = {
    "top-start": {
      ltr: "top-left",
      rtl: "top-right"
    },
    "top-end": {
      ltr: "top-right",
      rtl: "top-left"
    },
    "bottom-start": {
      ltr: "bottom-left",
      rtl: "bottom-right"
    },
    "bottom-end": {
      ltr: "bottom-right",
      rtl: "bottom-left"
    }
  };
  var logical = logicals[position];
  return (_logical$dir = logical == null ? void 0 : logical[dir]) != null ? _logical$dir : position;
}
var Toast2 = function Toast3(props) {
  var status = props.status, variant = props.variant, id = props.id, title = props.title, isClosable = props.isClosable, onClose = props.onClose, description = props.description;
  var alertTitleId = typeof id !== "undefined" ? "toast-" + id + "-title" : void 0;
  return /* @__PURE__ */ react.exports.createElement(
    Alert$1,
    {
      status,
      variant,
      id,
      alignItems: "start",
      borderRadius: "md",
      boxShadow: "lg",
      paddingEnd: 8,
      textAlign: "start",
      width: "auto",
      "aria-labelledby": alertTitleId
    },
    /* @__PURE__ */ jsx(AlertIcon, {}),
    /* @__PURE__ */ react.exports.createElement(chakra.div, {
      flex: "1",
      maxWidth: "100%"
    }, title && /* @__PURE__ */ jsx(AlertTitle, {
      id: alertTitleId,
      children: title
    }), description && /* @__PURE__ */ jsx(AlertDescription, {
      display: "block",
      children: description
    })),
    isClosable && /* @__PURE__ */ jsx(CloseButton, {
      size: "sm",
      onClick: onClose,
      position: "absolute",
      insetEnd: 1,
      top: 1
    })
  );
};
var defaults = {
  duration: 5e3,
  position: "bottom",
  variant: "solid"
};
var defaultStandaloneParam = {
  theme,
  colorMode: "light",
  toggleColorMode: noop,
  setColorMode: noop,
  defaultOptions: defaults
};
function createStandaloneToast(_temp) {
  var _ref = _temp === void 0 ? defaultStandaloneParam : _temp, _ref$theme = _ref.theme, theme2 = _ref$theme === void 0 ? defaultStandaloneParam.theme : _ref$theme, _ref$colorMode = _ref.colorMode, colorMode = _ref$colorMode === void 0 ? defaultStandaloneParam.colorMode : _ref$colorMode, _ref$toggleColorMode = _ref.toggleColorMode, toggleColorMode = _ref$toggleColorMode === void 0 ? defaultStandaloneParam.toggleColorMode : _ref$toggleColorMode, _ref$setColorMode = _ref.setColorMode, setColorMode = _ref$setColorMode === void 0 ? defaultStandaloneParam.setColorMode : _ref$setColorMode, _ref$defaultOptions = _ref.defaultOptions, defaultOptions = _ref$defaultOptions === void 0 ? defaultStandaloneParam.defaultOptions : _ref$defaultOptions;
  var renderWithProviders = function renderWithProviders2(props, options) {
    return /* @__PURE__ */ jsx(ThemeProvider, {
      theme: theme2,
      children: /* @__PURE__ */ jsx(ColorModeContext.Provider, {
        value: {
          colorMode,
          setColorMode,
          toggleColorMode
        },
        children: isFunction$1(options.render) ? options.render(props) : /* @__PURE__ */ jsx(Toast2, {
          ...props,
          ...options
        })
      })
    });
  };
  var toastImpl = function toastImpl2(options) {
    var opts = _extends({}, defaultOptions, options);
    opts.position = getToastPlacement(opts.position, theme2.direction);
    var Message = function Message2(props) {
      return renderWithProviders(props, opts);
    };
    return toast.notify(Message, opts);
  };
  toastImpl.close = toast.close;
  toastImpl.closeAll = toast.closeAll;
  toastImpl.update = function(id, options) {
    if (!id)
      return;
    var opts = _extends({}, defaultOptions, options);
    opts.position = getToastPlacement(opts.position, theme2.direction);
    toast.update(id, _extends({}, opts, {
      message: function message(props) {
        return renderWithProviders(props, opts);
      }
    }));
  };
  toastImpl.isActive = toast.isActive;
  return toastImpl;
}
function useToast(options) {
  var _useChakra = useChakra(), theme2 = _useChakra.theme, setColorMode = _useChakra.setColorMode, toggleColorMode = _useChakra.toggleColorMode, colorMode = _useChakra.colorMode;
  var toastOptions = useLatestRef(options);
  return react.exports.useMemo(function() {
    return createStandaloneToast({
      theme: theme2,
      colorMode,
      setColorMode,
      toggleColorMode,
      defaultOptions: _extends({}, defaults, toastOptions.current)
    });
  }, [theme2, setColorMode, toggleColorMode, colorMode, toastOptions]);
}
export {
  useToast as u
};
//# sourceMappingURL=chakra-ui-toast.esm.74e28ef8.js.map
