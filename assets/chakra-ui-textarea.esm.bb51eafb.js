import { $ as createContext, r as react, p as mergeRefs, aC as isRightClick, a7 as dataAttr, i as forwardRef, _ as __DEV__, m as cx, d as chakra, k as useMultiStyleConfig, o as omitThemingProps, a0 as callAll, af as split, a as jsx, E as useId, aD as isInputEvent, aE as useFormControlContext, a3 as useBoolean, a4 as warn, J as callAllHandlers, aF as ariaAttr, a8 as visuallyHiddenStyle, ag as layoutPropNames, aa as useControllableProp, x as omit, l as StylesProvider, n as useStyles, aG as useControllableState, aH as normalizeEventKey, aI as getValidChildren, aJ as determineLazyBehavior, a5 as useSafeLayoutEffect$1, aK as isUndefined, a9 as focus, s as useStyleConfig, ah as useFormControl } from "./index.d19b7c68.js";
function _extends$4() {
  _extends$4 = Object.assign || function(target) {
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
  return _extends$4.apply(this, arguments);
}
function sortNodes(nodes) {
  return nodes.sort(function(a, b) {
    var compare = a.compareDocumentPosition(b);
    if (compare & Node.DOCUMENT_POSITION_FOLLOWING || compare & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return -1;
    }
    if (compare & Node.DOCUMENT_POSITION_PRECEDING || compare & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1;
    }
    if (compare & Node.DOCUMENT_POSITION_DISCONNECTED || compare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC) {
      throw Error("Cannot sort the given nodes.");
    } else {
      return 0;
    }
  });
}
var isElement = function isElement2(el) {
  return typeof el == "object" && "nodeType" in el && el.nodeType === Node.ELEMENT_NODE;
};
function getNextIndex(current, max, loop) {
  var next = current + 1;
  if (loop && next >= max)
    next = 0;
  return next;
}
function getPrevIndex(current, max, loop) {
  var next = current - 1;
  if (loop && next < 0)
    next = max;
  return next;
}
var useSafeLayoutEffect = typeof window !== "undefined" ? react.exports.useLayoutEffect : react.exports.useEffect;
var cast = function cast2(value) {
  return value;
};
var DescendantsManager = function DescendantsManager2() {
  var _this = this;
  this.descendants = /* @__PURE__ */ new Map();
  this.register = function(nodeOrOptions) {
    if (nodeOrOptions == null)
      return;
    if (isElement(nodeOrOptions)) {
      return _this.registerNode(nodeOrOptions);
    }
    return function(node) {
      _this.registerNode(node, nodeOrOptions);
    };
  };
  this.unregister = function(node) {
    _this.descendants["delete"](node);
    var sorted = sortNodes(Array.from(_this.descendants.keys()));
    _this.assignIndex(sorted);
  };
  this.destroy = function() {
    _this.descendants.clear();
  };
  this.assignIndex = function(descendants) {
    _this.descendants.forEach(function(descendant) {
      var index = descendants.indexOf(descendant.node);
      descendant.index = index;
      descendant.node.dataset["index"] = descendant.index.toString();
    });
  };
  this.count = function() {
    return _this.descendants.size;
  };
  this.enabledCount = function() {
    return _this.enabledValues().length;
  };
  this.values = function() {
    var values = Array.from(_this.descendants.values());
    return values.sort(function(a, b) {
      return a.index - b.index;
    });
  };
  this.enabledValues = function() {
    return _this.values().filter(function(descendant) {
      return !descendant.disabled;
    });
  };
  this.item = function(index) {
    if (_this.count() === 0)
      return void 0;
    return _this.values()[index];
  };
  this.enabledItem = function(index) {
    if (_this.enabledCount() === 0)
      return void 0;
    return _this.enabledValues()[index];
  };
  this.first = function() {
    return _this.item(0);
  };
  this.firstEnabled = function() {
    return _this.enabledItem(0);
  };
  this.last = function() {
    return _this.item(_this.descendants.size - 1);
  };
  this.lastEnabled = function() {
    var lastIndex = _this.enabledValues().length - 1;
    return _this.enabledItem(lastIndex);
  };
  this.indexOf = function(node) {
    var _this$descendants$get, _this$descendants$get2;
    if (!node)
      return -1;
    return (_this$descendants$get = (_this$descendants$get2 = _this.descendants.get(node)) == null ? void 0 : _this$descendants$get2.index) != null ? _this$descendants$get : -1;
  };
  this.enabledIndexOf = function(node) {
    if (node == null)
      return -1;
    return _this.enabledValues().findIndex(function(i) {
      return i.node.isSameNode(node);
    });
  };
  this.next = function(index, loop) {
    if (loop === void 0) {
      loop = true;
    }
    var next = getNextIndex(index, _this.count(), loop);
    return _this.item(next);
  };
  this.nextEnabled = function(index, loop) {
    if (loop === void 0) {
      loop = true;
    }
    var item = _this.item(index);
    if (!item)
      return;
    var enabledIndex = _this.enabledIndexOf(item.node);
    var nextEnabledIndex = getNextIndex(enabledIndex, _this.enabledCount(), loop);
    return _this.enabledItem(nextEnabledIndex);
  };
  this.prev = function(index, loop) {
    if (loop === void 0) {
      loop = true;
    }
    var prev = getPrevIndex(index, _this.count() - 1, loop);
    return _this.item(prev);
  };
  this.prevEnabled = function(index, loop) {
    if (loop === void 0) {
      loop = true;
    }
    var item = _this.item(index);
    if (!item)
      return;
    var enabledIndex = _this.enabledIndexOf(item.node);
    var prevEnabledIndex = getPrevIndex(enabledIndex, _this.enabledCount() - 1, loop);
    return _this.enabledItem(prevEnabledIndex);
  };
  this.registerNode = function(node, options) {
    if (!node || _this.descendants.has(node))
      return;
    var keys = Array.from(_this.descendants.keys()).concat(node);
    var sorted = sortNodes(keys);
    if (options != null && options.disabled) {
      options.disabled = !!options.disabled;
    }
    var descendant = _extends$4({
      node,
      index: -1
    }, options);
    _this.descendants.set(node, descendant);
    _this.assignIndex(sorted);
  };
};
function useDescendants() {
  var descendants = react.exports.useRef(new DescendantsManager());
  useSafeLayoutEffect(function() {
    return function() {
      return descendants.current.destroy();
    };
  });
  return descendants.current;
}
var _createContext$2 = createContext({
  name: "DescendantsProvider",
  errorMessage: "useDescendantsContext must be used within DescendantsProvider"
}), DescendantsContextProvider = _createContext$2[0], useDescendantsContext = _createContext$2[1];
function useDescendant(options) {
  var descendants = useDescendantsContext();
  var _useState = react.exports.useState(-1), index = _useState[0], setIndex = _useState[1];
  var ref = react.exports.useRef(null);
  useSafeLayoutEffect(function() {
    return function() {
      if (!ref.current)
        return;
      descendants.unregister(ref.current);
    };
  }, []);
  useSafeLayoutEffect(function() {
    if (!ref.current)
      return;
    var dataIndex = Number(ref.current.dataset["index"]);
    if (index != dataIndex && !Number.isNaN(dataIndex)) {
      setIndex(dataIndex);
    }
  });
  var refCallback = options ? cast(descendants.register(options)) : cast(descendants.register);
  return {
    descendants,
    index,
    enabledIndex: descendants.enabledIndexOf(ref.current),
    register: mergeRefs(refCallback, ref)
  };
}
function createDescendantContext() {
  var ContextProvider = cast(DescendantsContextProvider);
  var _useDescendantsContext = function _useDescendantsContext2() {
    return cast(useDescendantsContext());
  };
  var _useDescendant = function _useDescendant2(options) {
    return useDescendant(options);
  };
  var _useDescendants = function _useDescendants2() {
    return useDescendants();
  };
  return [
    ContextProvider,
    _useDescendantsContext,
    _useDescendants,
    _useDescendant
  ];
}
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
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
  return _extends$3.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$3(source, excluded) {
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
function useEventListeners() {
  var listeners = react.exports.useRef(/* @__PURE__ */ new Map());
  var currentListeners = listeners.current;
  var add = react.exports.useCallback(function(el, type, listener, options) {
    listeners.current.set(listener, {
      type,
      el,
      options
    });
    el.addEventListener(type, listener, options);
  }, []);
  var remove = react.exports.useCallback(function(el, type, listener, options) {
    el.removeEventListener(type, listener, options);
    listeners.current["delete"](listener);
  }, []);
  react.exports.useEffect(function() {
    return function() {
      currentListeners.forEach(function(value, key) {
        remove(value.el, value.type, key, value.options);
      });
    };
  }, [remove, currentListeners]);
  return {
    add,
    remove
  };
}
var _excluded$5 = ["ref", "isDisabled", "isFocusable", "clickOnEnter", "clickOnSpace", "onMouseDown", "onMouseUp", "onClick", "onKeyDown", "onKeyUp", "tabIndex", "onMouseOver", "onMouseLeave"];
function isValidElement(event) {
  var element = event.target;
  var tagName = element.tagName, isContentEditable = element.isContentEditable;
  return tagName !== "INPUT" && tagName !== "TEXTAREA" && isContentEditable !== true;
}
function useClickable(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, htmlRef = _props.ref, isDisabled = _props.isDisabled, isFocusable = _props.isFocusable, _props$clickOnEnter = _props.clickOnEnter, clickOnEnter = _props$clickOnEnter === void 0 ? true : _props$clickOnEnter, _props$clickOnSpace = _props.clickOnSpace, clickOnSpace = _props$clickOnSpace === void 0 ? true : _props$clickOnSpace, onMouseDown = _props.onMouseDown, onMouseUp = _props.onMouseUp, onClick = _props.onClick, onKeyDown = _props.onKeyDown, onKeyUp = _props.onKeyUp, tabIndexProp = _props.tabIndex, onMouseOver = _props.onMouseOver, onMouseLeave = _props.onMouseLeave, htmlProps = _objectWithoutPropertiesLoose$3(_props, _excluded$5);
  var _React$useState = react.exports.useState(true), isButton = _React$useState[0], setIsButton = _React$useState[1];
  var _React$useState2 = react.exports.useState(false), isPressed = _React$useState2[0], setIsPressed = _React$useState2[1];
  var listeners = useEventListeners();
  var refCallback = function refCallback2(node) {
    if (!node)
      return;
    if (node.tagName !== "BUTTON") {
      setIsButton(false);
    }
  };
  var tabIndex = isButton ? tabIndexProp : tabIndexProp || 0;
  var trulyDisabled = isDisabled && !isFocusable;
  var handleClick = react.exports.useCallback(function(event) {
    if (isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    var self = event.currentTarget;
    self.focus();
    onClick == null ? void 0 : onClick(event);
  }, [isDisabled, onClick]);
  var onDocumentKeyUp = react.exports.useCallback(function(e) {
    if (isPressed && isValidElement(e)) {
      e.preventDefault();
      e.stopPropagation();
      setIsPressed(false);
      listeners.remove(document, "keyup", onDocumentKeyUp, false);
    }
  }, [isPressed, listeners]);
  var handleKeyDown = react.exports.useCallback(function(event) {
    onKeyDown == null ? void 0 : onKeyDown(event);
    if (isDisabled || event.defaultPrevented || event.metaKey) {
      return;
    }
    if (!isValidElement(event.nativeEvent) || isButton)
      return;
    var shouldClickOnEnter = clickOnEnter && event.key === "Enter";
    var shouldClickOnSpace = clickOnSpace && event.key === " ";
    if (shouldClickOnSpace) {
      event.preventDefault();
      setIsPressed(true);
    }
    if (shouldClickOnEnter) {
      event.preventDefault();
      var self = event.currentTarget;
      self.click();
    }
    listeners.add(document, "keyup", onDocumentKeyUp, false);
  }, [isDisabled, isButton, onKeyDown, clickOnEnter, clickOnSpace, listeners, onDocumentKeyUp]);
  var handleKeyUp = react.exports.useCallback(function(event) {
    onKeyUp == null ? void 0 : onKeyUp(event);
    if (isDisabled || event.defaultPrevented || event.metaKey)
      return;
    if (!isValidElement(event.nativeEvent) || isButton)
      return;
    var shouldClickOnSpace = clickOnSpace && event.key === " ";
    if (shouldClickOnSpace) {
      event.preventDefault();
      setIsPressed(false);
      var self = event.currentTarget;
      self.click();
    }
  }, [clickOnSpace, isButton, isDisabled, onKeyUp]);
  var onDocumentMouseUp = react.exports.useCallback(function(event) {
    if (event.button !== 0)
      return;
    setIsPressed(false);
    listeners.remove(document, "mouseup", onDocumentMouseUp, false);
  }, [listeners]);
  var handleMouseDown = react.exports.useCallback(function(event) {
    if (isRightClick(event))
      return;
    if (isDisabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    if (!isButton) {
      setIsPressed(true);
    }
    var target = event.currentTarget;
    target.focus({
      preventScroll: true
    });
    listeners.add(document, "mouseup", onDocumentMouseUp, false);
    onMouseDown == null ? void 0 : onMouseDown(event);
  }, [isDisabled, isButton, onMouseDown, listeners, onDocumentMouseUp]);
  var handleMouseUp = react.exports.useCallback(function(event) {
    if (isRightClick(event))
      return;
    if (!isButton) {
      setIsPressed(false);
    }
    onMouseUp == null ? void 0 : onMouseUp(event);
  }, [onMouseUp, isButton]);
  var handleMouseOver = react.exports.useCallback(function(event) {
    if (isDisabled) {
      event.preventDefault();
      return;
    }
    onMouseOver == null ? void 0 : onMouseOver(event);
  }, [isDisabled, onMouseOver]);
  var handleMouseLeave = react.exports.useCallback(function(event) {
    if (isPressed) {
      event.preventDefault();
      setIsPressed(false);
    }
    onMouseLeave == null ? void 0 : onMouseLeave(event);
  }, [isPressed, onMouseLeave]);
  var ref = mergeRefs(htmlRef, refCallback);
  if (isButton) {
    return _extends$3({}, htmlProps, {
      ref,
      type: "button",
      "aria-disabled": trulyDisabled ? void 0 : isDisabled,
      disabled: trulyDisabled,
      onClick: handleClick,
      onMouseDown,
      onMouseUp,
      onKeyUp,
      onKeyDown,
      onMouseOver,
      onMouseLeave
    });
  }
  return _extends$3({}, htmlProps, {
    ref,
    role: "button",
    "data-active": dataAttr(isPressed),
    "aria-disabled": isDisabled ? "true" : void 0,
    tabIndex: trulyDisabled ? void 0 : tabIndex,
    onClick: handleClick,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onKeyUp: handleKeyUp,
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave
  });
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
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
var _excluded$3 = ["onChange", "value", "defaultValue", "name", "isDisabled", "isFocusable", "isNative"];
function useRadioGroup(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, onChangeProp = _props.onChange, valueProp = _props.value, defaultValue = _props.defaultValue, nameProp = _props.name, isDisabled = _props.isDisabled, isFocusable = _props.isFocusable, isNative = _props.isNative, htmlProps = _objectWithoutPropertiesLoose$2(_props, _excluded$3);
  var _React$useState = react.exports.useState(defaultValue || ""), valueState = _React$useState[0], setValue = _React$useState[1];
  var _useControllableProp = useControllableProp(valueProp, valueState), isControlled = _useControllableProp[0], value = _useControllableProp[1];
  var ref = react.exports.useRef(null);
  var focus2 = react.exports.useCallback(function() {
    var rootNode = ref.current;
    if (!rootNode)
      return;
    var query = "input:not(:disabled):checked";
    var firstEnabledAndCheckedInput = rootNode.querySelector(query);
    if (firstEnabledAndCheckedInput) {
      firstEnabledAndCheckedInput.focus();
      return;
    }
    query = "input:not(:disabled)";
    var firstEnabledInput = rootNode.querySelector(query);
    firstEnabledInput == null ? void 0 : firstEnabledInput.focus();
  }, []);
  var fallbackName = useId(void 0, "radio");
  var name = nameProp || fallbackName;
  var onChange = react.exports.useCallback(function(eventOrValue) {
    var nextValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;
    if (!isControlled) {
      setValue(nextValue);
    }
    onChangeProp == null ? void 0 : onChangeProp(String(nextValue));
  }, [onChangeProp, isControlled]);
  var getRootProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends$2({}, props2, {
      ref: mergeRefs(forwardedRef, ref),
      role: "radiogroup"
    });
  }, []);
  var getRadioProps = react.exports.useCallback(function(props2, ref2) {
    var _extends2;
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref2 === void 0) {
      ref2 = null;
    }
    var checkedKey = isNative ? "checked" : "isChecked";
    return _extends$2({}, props2, (_extends2 = {
      ref: ref2,
      name
    }, _extends2[checkedKey] = value != null ? props2.value === value : void 0, _extends2.onChange = onChange, _extends2["data-radiogroup"] = true, _extends2));
  }, [isNative, name, onChange, value]);
  return {
    getRootProps,
    getRadioProps,
    name,
    ref,
    focus: focus2,
    setValue,
    value,
    onChange,
    isDisabled,
    isFocusable,
    htmlProps
  };
}
var _excluded$2$1 = ["colorScheme", "size", "variant", "children", "className", "isDisabled", "isFocusable"];
var _createContext$1 = createContext({
  name: "RadioGroupContext",
  strict: false
}), RadioGroupProvider = _createContext$1[0], useRadioGroupContext = _createContext$1[1];
var RadioGroup = /* @__PURE__ */ forwardRef(function(props, ref) {
  var colorScheme = props.colorScheme, size = props.size, variant = props.variant, children = props.children, className = props.className, isDisabled = props.isDisabled, isFocusable = props.isFocusable, rest = _objectWithoutPropertiesLoose$2(props, _excluded$2$1);
  var _useRadioGroup = useRadioGroup(rest), value = _useRadioGroup.value, onChange = _useRadioGroup.onChange, getRootProps = _useRadioGroup.getRootProps, name = _useRadioGroup.name, htmlProps = _useRadioGroup.htmlProps;
  var group = react.exports.useMemo(function() {
    return {
      name,
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled,
      isFocusable
    };
  }, [name, size, onChange, colorScheme, value, variant, isDisabled, isFocusable]);
  var groupProps = getRootProps(htmlProps, ref);
  var _className = cx("chakra-radio-group", className);
  return /* @__PURE__ */ react.exports.createElement(RadioGroupProvider, {
    value: group
  }, /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$2({}, groupProps, {
    className: _className
  }), children));
});
if (__DEV__) {
  RadioGroup.displayName = "RadioGroup";
}
var _excluded$1$1 = ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "isDisabled", "isReadOnly", "isRequired", "onChange", "isInvalid", "name", "value", "id", "data-radiogroup", "aria-describedby"];
function useRadio(props) {
  if (props === void 0) {
    props = {};
  }
  var _props = props, defaultIsChecked = _props.defaultIsChecked, _props$defaultChecked = _props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? defaultIsChecked : _props$defaultChecked, isCheckedProp = _props.isChecked, isFocusable = _props.isFocusable, isDisabledProp = _props.isDisabled, isReadOnlyProp = _props.isReadOnly, isRequiredProp = _props.isRequired, onChange = _props.onChange, isInvalidProp = _props.isInvalid, name = _props.name, value = _props.value, idProp = _props.id, dataRadioGroup = _props["data-radiogroup"], ariaDescribedBy = _props["aria-describedby"], htmlProps = _objectWithoutPropertiesLoose$2(_props, _excluded$1$1);
  var uuid = useId(void 0, "radio");
  var formControl = useFormControlContext();
  var group = useRadioGroupContext();
  var isWithinRadioGroup = !!group || !!dataRadioGroup;
  var isWithinFormControl = !!formControl;
  var id = isWithinFormControl && !isWithinRadioGroup ? formControl.id : uuid;
  id = idProp != null ? idProp : id;
  var isDisabled = isDisabledProp != null ? isDisabledProp : formControl == null ? void 0 : formControl.isDisabled;
  var isReadOnly = isReadOnlyProp != null ? isReadOnlyProp : formControl == null ? void 0 : formControl.isReadOnly;
  var isRequired = isRequiredProp != null ? isRequiredProp : formControl == null ? void 0 : formControl.isRequired;
  var isInvalid = isInvalidProp != null ? isInvalidProp : formControl == null ? void 0 : formControl.isInvalid;
  var _useBoolean = useBoolean(), isFocused = _useBoolean[0], setFocused = _useBoolean[1];
  var _useBoolean2 = useBoolean(), isHovered = _useBoolean2[0], setHovering = _useBoolean2[1];
  var _useBoolean3 = useBoolean(), isActive = _useBoolean3[0], setActive = _useBoolean3[1];
  var _useState = react.exports.useState(Boolean(defaultChecked)), isCheckedState = _useState[0], setChecked = _useState[1];
  var _useControllableProp = useControllableProp(isCheckedProp, isCheckedState), isControlled = _useControllableProp[0], isChecked = _useControllableProp[1];
  warn({
    condition: !!defaultIsChecked,
    message: 'The "defaultIsChecked" prop has been deprecated and will be removed in a future version. Please use the "defaultChecked" prop instead, which mirrors default React checkbox behavior.'
  });
  var handleChange = react.exports.useCallback(function(event) {
    if (isReadOnly || isDisabled) {
      event.preventDefault();
      return;
    }
    if (!isControlled) {
      setChecked(event.target.checked);
    }
    onChange == null ? void 0 : onChange(event);
  }, [isControlled, isDisabled, isReadOnly, onChange]);
  var onKeyDown = react.exports.useCallback(function(event) {
    if (event.key === " ") {
      setActive.on();
    }
  }, [setActive]);
  var onKeyUp = react.exports.useCallback(function(event) {
    if (event.key === " ") {
      setActive.off();
    }
  }, [setActive]);
  var getRadioProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    return _extends$2({}, props2, {
      ref,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props2.onMouseDown, setActive.on),
      onMouseUp: callAllHandlers(props2.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props2.onMouseEnter, setHovering.on),
      onMouseLeave: callAllHandlers(props2.onMouseLeave, setHovering.off)
    });
  }, [isActive, isHovered, isDisabled, isInvalid, isChecked, isFocused, isReadOnly, setActive.on, setActive.off, setHovering.on, setHovering.off]);
  var _ref = formControl != null ? formControl : {}, onFocus = _ref.onFocus, onBlur = _ref.onBlur;
  var getInputProps = react.exports.useCallback(function(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    var trulyDisabled = isDisabled && !isFocusable;
    return _extends$2({}, props2, {
      id,
      ref,
      type: "radio",
      name,
      value,
      onChange: callAllHandlers(props2.onChange, handleChange),
      onBlur: callAllHandlers(onBlur, props2.onBlur, setFocused.off),
      onFocus: callAllHandlers(onFocus, props2.onFocus, setFocused.on),
      onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
      onKeyUp: callAllHandlers(props2.onKeyUp, onKeyUp),
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      required: isRequired,
      "aria-invalid": ariaAttr(isInvalid),
      "aria-disabled": ariaAttr(trulyDisabled),
      "aria-required": ariaAttr(isRequired),
      "data-readonly": dataAttr(isReadOnly),
      "aria-describedby": ariaDescribedBy,
      style: visuallyHiddenStyle
    });
  }, [isDisabled, isFocusable, id, name, value, handleChange, onBlur, setFocused, onFocus, onKeyDown, onKeyUp, isChecked, isReadOnly, isRequired, isInvalid, ariaDescribedBy]);
  var getLabelProps = function getLabelProps2(props2, ref) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (ref === void 0) {
      ref = null;
    }
    return _extends$2({}, props2, {
      ref,
      onMouseDown: callAllHandlers(props2.onMouseDown, stop),
      onTouchStart: callAllHandlers(props2.onTouchStart, stop),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  };
  var getRootProps = function getRootProps2(props2, ref) {
    if (ref === void 0) {
      ref = null;
    }
    return _extends$2({}, props2, {
      ref,
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  };
  var state = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isDisabled,
    isReadOnly,
    isRequired
  };
  return {
    state,
    getCheckboxProps: getRadioProps,
    getInputProps,
    getLabelProps,
    getRootProps,
    htmlProps
  };
}
function stop(event) {
  event.preventDefault();
  event.stopPropagation();
}
var _excluded$4 = ["spacing", "children", "isFullWidth", "isDisabled", "isFocusable", "inputProps"];
var Radio = /* @__PURE__ */ forwardRef(function(props, ref) {
  var _props$name;
  var group = useRadioGroupContext();
  var onChangeProp = props.onChange, valueProp = props.value;
  var styles = useMultiStyleConfig("Radio", _extends$2({}, group, props));
  var ownProps = omitThemingProps(props);
  var _ownProps$spacing = ownProps.spacing, spacing = _ownProps$spacing === void 0 ? "0.5rem" : _ownProps$spacing, children = ownProps.children, isFullWidth = ownProps.isFullWidth, _ownProps$isDisabled = ownProps.isDisabled, isDisabled = _ownProps$isDisabled === void 0 ? group == null ? void 0 : group.isDisabled : _ownProps$isDisabled, _ownProps$isFocusable = ownProps.isFocusable, isFocusable = _ownProps$isFocusable === void 0 ? group == null ? void 0 : group.isFocusable : _ownProps$isFocusable, htmlInputProps = ownProps.inputProps, rest = _objectWithoutPropertiesLoose$2(ownProps, _excluded$4);
  var isChecked = props.isChecked;
  if ((group == null ? void 0 : group.value) != null && valueProp != null) {
    isChecked = group.value === valueProp;
  }
  var onChange = onChangeProp;
  if (group != null && group.onChange && valueProp != null) {
    onChange = callAll(group.onChange, onChangeProp);
  }
  var name = (_props$name = props == null ? void 0 : props.name) != null ? _props$name : group == null ? void 0 : group.name;
  var _useRadio = useRadio(_extends$2({}, rest, {
    isChecked,
    isFocusable,
    isDisabled,
    onChange,
    name
  })), getInputProps = _useRadio.getInputProps, getCheckboxProps = _useRadio.getCheckboxProps, getLabelProps = _useRadio.getLabelProps, getRootProps = _useRadio.getRootProps, htmlProps = _useRadio.htmlProps;
  var _split = split(htmlProps, layoutPropNames), layoutProps = _split[0], otherProps = _split[1];
  var checkboxProps = getCheckboxProps(otherProps);
  var inputProps = getInputProps(htmlInputProps, ref);
  var labelProps = getLabelProps();
  var rootProps = Object.assign({}, layoutProps, getRootProps());
  var rootStyles = _extends$2({
    width: isFullWidth ? "full" : void 0,
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    cursor: "pointer"
  }, styles.container);
  var checkboxStyles = _extends$2({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  }, styles.control);
  var labelStyles = _extends$2({
    userSelect: "none",
    marginStart: spacing
  }, styles.label);
  return /* @__PURE__ */ react.exports.createElement(
    chakra.label,
    _extends$2({
      className: "chakra-radio"
    }, rootProps, {
      __css: rootStyles
    }),
    /* @__PURE__ */ jsx("input", {
      className: "chakra-radio__input",
      ...inputProps
    }),
    /* @__PURE__ */ react.exports.createElement(chakra.span, _extends$2({
      className: "chakra-radio__control"
    }, checkboxProps, {
      __css: checkboxStyles
    })),
    children && /* @__PURE__ */ react.exports.createElement(chakra.span, _extends$2({
      className: "chakra-radio__label"
    }, labelProps, {
      __css: labelStyles
    }), children)
  );
});
if (__DEV__) {
  Radio.displayName = "Radio";
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
var _excluded$1 = ["defaultIndex", "onChange", "index", "isManual", "isLazy", "lazyBehavior", "orientation", "direction"], _excluded2$1 = ["isDisabled", "isFocusable"], _excluded3 = ["isSelected", "id", "children"];
var _createDescendantCont = createDescendantContext(), TabsDescendantsProvider = _createDescendantCont[0], useTabsDescendantsContext = _createDescendantCont[1], useTabsDescendants = _createDescendantCont[2], useTabsDescendant = _createDescendantCont[3];
function useTabs(props) {
  var defaultIndex = props.defaultIndex, onChange = props.onChange, index = props.index, isManual = props.isManual, isLazy = props.isLazy, _props$lazyBehavior = props.lazyBehavior, lazyBehavior = _props$lazyBehavior === void 0 ? "unmount" : _props$lazyBehavior, _props$orientation = props.orientation, orientation = _props$orientation === void 0 ? "horizontal" : _props$orientation, _props$direction = props.direction, direction = _props$direction === void 0 ? "ltr" : _props$direction, htmlProps = _objectWithoutPropertiesLoose$1(props, _excluded$1);
  var _React$useState = react.exports.useState(defaultIndex != null ? defaultIndex : 0), focusedIndex = _React$useState[0], setFocusedIndex = _React$useState[1];
  var _useControllableState = useControllableState({
    defaultValue: defaultIndex != null ? defaultIndex : 0,
    value: index,
    onChange
  }), selectedIndex = _useControllableState[0], setSelectedIndex = _useControllableState[1];
  react.exports.useEffect(function() {
    if (index != null) {
      setFocusedIndex(index);
    }
  }, [index]);
  var descendants = useTabsDescendants();
  var id = useId(props.id, "tabs");
  return {
    id,
    selectedIndex,
    focusedIndex,
    setSelectedIndex,
    setFocusedIndex,
    isManual,
    isLazy,
    lazyBehavior,
    orientation,
    descendants,
    direction,
    htmlProps
  };
}
var _createContext = createContext({
  name: "TabsContext",
  errorMessage: "useTabsContext: `context` is undefined. Seems you forgot to wrap all tabs components within <Tabs />"
}), TabsProvider = _createContext[0], useTabsContext = _createContext[1];
function useTabList(props) {
  var _useTabsContext = useTabsContext(), focusedIndex = _useTabsContext.focusedIndex, orientation = _useTabsContext.orientation, direction = _useTabsContext.direction;
  var descendants = useTabsDescendantsContext();
  var onKeyDown = react.exports.useCallback(function(event) {
    var _keyMap;
    var nextTab = function nextTab2() {
      var next = descendants.nextEnabled(focusedIndex);
      if (next)
        focus(next.node);
    };
    var prevTab = function prevTab2() {
      var prev = descendants.prevEnabled(focusedIndex);
      if (prev)
        focus(prev.node);
    };
    var firstTab = function firstTab2() {
      var first = descendants.firstEnabled();
      if (first)
        focus(first.node);
    };
    var lastTab = function lastTab2() {
      var last = descendants.lastEnabled();
      if (last)
        focus(last.node);
    };
    var isHorizontal = orientation === "horizontal";
    var isVertical = orientation === "vertical";
    var eventKey = normalizeEventKey(event);
    var ArrowStart = direction === "ltr" ? "ArrowLeft" : "ArrowRight";
    var ArrowEnd = direction === "ltr" ? "ArrowRight" : "ArrowLeft";
    var keyMap = (_keyMap = {}, _keyMap[ArrowStart] = function() {
      return isHorizontal && prevTab();
    }, _keyMap[ArrowEnd] = function() {
      return isHorizontal && nextTab();
    }, _keyMap.ArrowDown = function ArrowDown() {
      return isVertical && nextTab();
    }, _keyMap.ArrowUp = function ArrowUp() {
      return isVertical && prevTab();
    }, _keyMap.Home = firstTab, _keyMap.End = lastTab, _keyMap);
    var action = keyMap[eventKey];
    if (action) {
      event.preventDefault();
      action(event);
    }
  }, [descendants, focusedIndex, orientation, direction]);
  return _extends$1({}, props, {
    role: "tablist",
    "aria-orientation": orientation,
    onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown)
  });
}
function useTab(props) {
  var isDisabled = props.isDisabled, isFocusable = props.isFocusable, htmlProps = _objectWithoutPropertiesLoose$1(props, _excluded2$1);
  var _useTabsContext2 = useTabsContext(), setSelectedIndex = _useTabsContext2.setSelectedIndex, isManual = _useTabsContext2.isManual, id = _useTabsContext2.id, setFocusedIndex = _useTabsContext2.setFocusedIndex, selectedIndex = _useTabsContext2.selectedIndex;
  var _useTabsDescendant = useTabsDescendant({
    disabled: isDisabled && !isFocusable
  }), index = _useTabsDescendant.index, register = _useTabsDescendant.register;
  var isSelected = index === selectedIndex;
  var onClick = function onClick2() {
    setSelectedIndex(index);
  };
  var onFocus = function onFocus2() {
    setFocusedIndex(index);
    var isDisabledButFocusable = isDisabled && isFocusable;
    var shouldSelect = !isManual && !isDisabledButFocusable;
    if (shouldSelect) {
      setSelectedIndex(index);
    }
  };
  var clickableProps = useClickable(_extends$1({}, htmlProps, {
    ref: mergeRefs(register, props.ref),
    isDisabled,
    isFocusable,
    onClick: callAllHandlers(props.onClick, onClick)
  }));
  var type = "button";
  return _extends$1({}, clickableProps, {
    id: makeTabId(id, index),
    role: "tab",
    tabIndex: isSelected ? 0 : -1,
    type,
    "aria-selected": isSelected,
    "aria-controls": makeTabPanelId(id, index),
    onFocus: isDisabled ? void 0 : callAllHandlers(props.onFocus, onFocus)
  });
}
function useTabPanels(props) {
  var context = useTabsContext();
  var id = context.id, selectedIndex = context.selectedIndex;
  var validChildren = getValidChildren(props.children);
  var children = validChildren.map(function(child, index) {
    return /* @__PURE__ */ react.exports.cloneElement(child, {
      isSelected: index === selectedIndex,
      id: makeTabPanelId(id, index),
      "aria-labelledby": makeTabId(id, index)
    });
  });
  return _extends$1({}, props, {
    children
  });
}
function useTabPanel(props) {
  var isSelected = props.isSelected, id = props.id, children = props.children, htmlProps = _objectWithoutPropertiesLoose$1(props, _excluded3);
  var _useTabsContext3 = useTabsContext(), isLazy = _useTabsContext3.isLazy, lazyBehavior = _useTabsContext3.lazyBehavior;
  var hasBeenSelected = react.exports.useRef(false);
  if (isSelected) {
    hasBeenSelected.current = true;
  }
  var shouldRenderChildren = determineLazyBehavior({
    hasBeenSelected: hasBeenSelected.current,
    isSelected,
    isLazy,
    lazyBehavior
  });
  return _extends$1({
    tabIndex: 0
  }, htmlProps, {
    children: shouldRenderChildren ? children : null,
    role: "tabpanel",
    hidden: !isSelected,
    id
  });
}
function useTabIndicator() {
  var context = useTabsContext();
  var descendants = useTabsDescendantsContext();
  var selectedIndex = context.selectedIndex, orientation = context.orientation;
  var isHorizontal = orientation === "horizontal";
  var isVertical = orientation === "vertical";
  var _React$useState2 = react.exports.useState(function() {
    if (isHorizontal)
      return {
        left: 0,
        width: 0
      };
    if (isVertical)
      return {
        top: 0,
        height: 0
      };
    return void 0;
  }), rect = _React$useState2[0], setRect = _React$useState2[1];
  var _React$useState3 = react.exports.useState(false), hasMeasured = _React$useState3[0], setHasMeasured = _React$useState3[1];
  useSafeLayoutEffect$1(function() {
    if (isUndefined(selectedIndex))
      return void 0;
    var tab = descendants.item(selectedIndex);
    if (isUndefined(tab))
      return void 0;
    if (isHorizontal) {
      setRect({
        left: tab.node.offsetLeft,
        width: tab.node.offsetWidth
      });
    }
    if (isVertical) {
      setRect({
        top: tab.node.offsetTop,
        height: tab.node.offsetHeight
      });
    }
    var id = requestAnimationFrame(function() {
      setHasMeasured(true);
    });
    return function() {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  }, [selectedIndex, isHorizontal, isVertical, descendants]);
  return _extends$1({
    position: "absolute",
    transitionProperty: "left, right, top, bottom, height, width",
    transitionDuration: hasMeasured ? "200ms" : "0ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)"
  }, rect);
}
function makeTabId(id, index) {
  return id + "--tab-" + index;
}
function makeTabPanelId(id, index) {
  return id + "--tabpanel-" + index;
}
var _excluded$2 = ["children", "className"], _excluded2 = ["htmlProps", "descendants"];
var Tabs = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Tabs", props);
  var _omitThemingProps = omitThemingProps(props), children = _omitThemingProps.children, className = _omitThemingProps.className, rest = _objectWithoutPropertiesLoose$1(_omitThemingProps, _excluded$2);
  var _useTabs = useTabs(rest), htmlProps = _useTabs.htmlProps, descendants = _useTabs.descendants, ctx = _objectWithoutPropertiesLoose$1(_useTabs, _excluded2);
  var context = react.exports.useMemo(function() {
    return ctx;
  }, [ctx]);
  var rootProps = omit(htmlProps, ["isFitted"]);
  return /* @__PURE__ */ react.exports.createElement(TabsDescendantsProvider, {
    value: descendants
  }, /* @__PURE__ */ react.exports.createElement(TabsProvider, {
    value: context
  }, /* @__PURE__ */ react.exports.createElement(StylesProvider, {
    value: styles
  }, /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({
    className: cx("chakra-tabs", className),
    ref
  }, rootProps, {
    __css: styles.root
  }), children))));
});
if (__DEV__) {
  Tabs.displayName = "Tabs";
}
var Tab = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyles();
  var tabProps = useTab(_extends$1({}, props, {
    ref
  }));
  var tabStyles = _extends$1({
    outline: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, styles.tab);
  return /* @__PURE__ */ react.exports.createElement(chakra.button, _extends$1({}, tabProps, {
    className: cx("chakra-tabs__tab", props.className),
    __css: tabStyles
  }));
});
if (__DEV__) {
  Tab.displayName = "Tab";
}
var TabList = /* @__PURE__ */ forwardRef(function(props, ref) {
  var tablistProps = useTabList(_extends$1({}, props, {
    ref
  }));
  var styles = useStyles();
  var tablistStyles = _extends$1({
    display: "flex"
  }, styles.tablist);
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({}, tablistProps, {
    className: cx("chakra-tabs__tablist", props.className),
    __css: tablistStyles
  }));
});
if (__DEV__) {
  TabList.displayName = "TabList";
}
var TabPanel = /* @__PURE__ */ forwardRef(function(props, ref) {
  var panelProps = useTabPanel(_extends$1({}, props, {
    ref
  }));
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({
    outline: "0"
  }, panelProps, {
    className: cx("chakra-tabs__tab-panel", props.className),
    __css: styles.tabpanel
  }));
});
if (__DEV__) {
  TabPanel.displayName = "TabPanel";
}
var TabPanels = /* @__PURE__ */ forwardRef(function(props, ref) {
  var panelsProps = useTabPanels(props);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({}, panelsProps, {
    width: "100%",
    ref,
    className: cx("chakra-tabs__tab-panels", props.className),
    __css: styles.tabpanels
  }));
});
if (__DEV__) {
  TabPanels.displayName = "TabPanels";
}
var TabIndicator = /* @__PURE__ */ forwardRef(function(props, ref) {
  var indicatorStyle = useTabIndicator();
  var style = _extends$1({}, props.style, indicatorStyle);
  var styles = useStyles();
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({
    ref
  }, props, {
    className: cx("chakra-tabs__tab-indicator", props.className),
    style,
    __css: styles.indicator
  }));
});
if (__DEV__) {
  TabIndicator.displayName = "TabIndicator";
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
var _excluded = ["className", "rows"];
var Textarea = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyleConfig("Textarea", props);
  var _omitThemingProps = omitThemingProps(props), className = _omitThemingProps.className, rows = _omitThemingProps.rows, rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded);
  var textareaProps = useFormControl(rest);
  var omitted = ["h", "minH", "height", "minHeight"];
  var textareaStyles = rows ? omit(styles, omitted) : styles;
  return /* @__PURE__ */ react.exports.createElement(chakra.textarea, _extends({
    ref,
    rows
  }, textareaProps, {
    className: cx("chakra-textarea", className),
    __css: textareaStyles
  }));
});
if (__DEV__) {
  Textarea.displayName = "Textarea";
}
export {
  RadioGroup as R,
  Tabs as T,
  TabList as a,
  Tab as b,
  TabPanels as c,
  TabPanel as d,
  Radio as e,
  Textarea as f
};
//# sourceMappingURL=chakra-ui-textarea.esm.bb51eafb.js.map
