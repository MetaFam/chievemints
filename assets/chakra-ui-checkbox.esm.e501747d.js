import { p as createContext, c as chakra, g as forwardRef, o as __DEV__, v as useMultiStyleConfig, t as omitThemingProps, a5 as callAll, r as react, j as jsxs, h as cx, a as jsx, I as omit, a6 as useCallbackRef, a7 as useBoolean, a8 as warn, a9 as useSafeLayoutEffect, aa as useUpdateEffect, a4 as dataAttr, N as callAllHandlers, C as mergeRefs, ab as visuallyHiddenStyle, ac as focus, ad as useControllableProp } from "./index.a364b5af.js";
import { b as useFormControlProps } from "./chakra-ui-form-control.esm.6a57fd40.js";
import { m as motion, A as AnimatePresence } from "./LinkedSVG.c5604b3e.js";
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
var _createContext = createContext({
  name: "CheckboxGroupContext",
  strict: false
}), useCheckboxGroupContext = _createContext[1];
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
var _excluded$2 = ["isIndeterminate", "isChecked"];
function __motion(el) {
  var m = motion;
  if ("custom" in m && typeof m.custom === "function") {
    return m.custom(el);
  }
  return m(el);
}
var MotionSvg = __motion(chakra.svg);
var CheckIcon = function CheckIcon2(props) {
  return /* @__PURE__ */ jsx(MotionSvg, {
    width: "1.2em",
    viewBox: "0 0 12 10",
    variants: {
      unchecked: {
        opacity: 0,
        strokeDashoffset: 16
      },
      checked: {
        opacity: 1,
        strokeDashoffset: 0,
        transition: {
          duration: 0.2
        }
      }
    },
    style: {
      fill: "none",
      strokeWidth: 2,
      stroke: "currentColor",
      strokeDasharray: 16
    },
    ...props,
    children: /* @__PURE__ */ jsx("polyline", {
      points: "1.5 6 4.5 9 10.5 1"
    })
  });
};
var IndeterminateIcon = function IndeterminateIcon2(props) {
  return /* @__PURE__ */ jsx(MotionSvg, {
    width: "1.2em",
    viewBox: "0 0 24 24",
    variants: {
      unchecked: {
        scaleX: 0.65,
        opacity: 0
      },
      checked: {
        scaleX: 1,
        opacity: 1,
        transition: {
          scaleX: {
            duration: 0
          },
          opacity: {
            duration: 0.02
          }
        }
      }
    },
    style: {
      stroke: "currentColor",
      strokeWidth: 4
    },
    ...props,
    children: /* @__PURE__ */ jsx("line", {
      x1: "21",
      x2: "3",
      y1: "12",
      y2: "12"
    })
  });
};
var CheckboxTransition = function CheckboxTransition2(_ref) {
  var open = _ref.open, children = _ref.children;
  return /* @__PURE__ */ jsx(AnimatePresence, {
    initial: false,
    children: open && /* @__PURE__ */ react.exports.createElement(motion.div, {
      variants: {
        unchecked: {
          scale: 0.5
        },
        checked: {
          scale: 1
        }
      },
      initial: "unchecked",
      animate: "checked",
      exit: "unchecked",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      }
    }, children)
  });
};
var CheckboxIcon = function CheckboxIcon2(props) {
  var isIndeterminate = props.isIndeterminate, isChecked = props.isChecked, rest = _objectWithoutPropertiesLoose(props, _excluded$2);
  var IconEl = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return /* @__PURE__ */ jsx(CheckboxTransition, {
    open: isChecked || isIndeterminate,
    children: /* @__PURE__ */ jsx(IconEl, {
      ...rest
    })
  });
};
var _excluded$1 = ["defaultIsChecked", "defaultChecked", "isChecked", "isFocusable", "onChange", "isIndeterminate", "name", "value", "tabIndex", "aria-label", "aria-labelledby", "aria-invalid"];
function useCheckbox(props) {
  if (props === void 0) {
    props = {};
  }
  var formControlProps = useFormControlProps(props);
  var isDisabled = formControlProps.isDisabled, isReadOnly = formControlProps.isReadOnly, isRequired = formControlProps.isRequired, isInvalid = formControlProps.isInvalid, id = formControlProps.id, onBlur = formControlProps.onBlur, onFocus = formControlProps.onFocus, ariaDescribedBy = formControlProps["aria-describedby"];
  var _props = props, defaultIsChecked = _props.defaultIsChecked, _props$defaultChecked = _props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? defaultIsChecked : _props$defaultChecked, checkedProp = _props.isChecked, isFocusable = _props.isFocusable, onChange = _props.onChange, isIndeterminate = _props.isIndeterminate, name = _props.name, value = _props.value, _props$tabIndex = _props.tabIndex, tabIndex = _props$tabIndex === void 0 ? void 0 : _props$tabIndex, ariaLabel = _props["aria-label"], ariaLabelledBy = _props["aria-labelledby"], ariaInvalid = _props["aria-invalid"], rest = _objectWithoutPropertiesLoose(_props, _excluded$1);
  var htmlProps = omit(rest, ["isDisabled", "isReadOnly", "isRequired", "isInvalid", "id", "onBlur", "onFocus", "aria-describedby"]);
  var onChangeProp = useCallbackRef(onChange);
  var onBlurProp = useCallbackRef(onBlur);
  var onFocusProp = useCallbackRef(onFocus);
  var _useBoolean = useBoolean(), isFocused = _useBoolean[0], setFocused = _useBoolean[1];
  var _useBoolean2 = useBoolean(), isHovered = _useBoolean2[0], setHovered = _useBoolean2[1];
  var _useBoolean3 = useBoolean(), isActive = _useBoolean3[0], setActive = _useBoolean3[1];
  var inputRef = react.exports.useRef(null);
  var _useState = react.exports.useState(true), rootIsLabelElement = _useState[0], setRootIsLabelElement = _useState[1];
  var _useState2 = react.exports.useState(!!defaultChecked), checkedState = _useState2[0], setCheckedState = _useState2[1];
  var _useControllableProp = useControllableProp(checkedProp, checkedState), isControlled = _useControllableProp[0], isChecked = _useControllableProp[1];
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
      if (isChecked) {
        setCheckedState(event.target.checked);
      } else {
        setCheckedState(isIndeterminate ? true : event.target.checked);
      }
    }
    onChangeProp == null ? void 0 : onChangeProp(event);
  }, [isReadOnly, isDisabled, isChecked, isControlled, isIndeterminate, onChangeProp]);
  useSafeLayoutEffect(function() {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);
  useUpdateEffect(function() {
    if (isDisabled) {
      setFocused.off();
    }
  }, [isDisabled, setFocused]);
  var trulyDisabled = isDisabled && !isFocusable;
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
  useSafeLayoutEffect(function() {
    if (!inputRef.current)
      return;
    var notInSync = inputRef.current.checked !== isChecked;
    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);
  var getCheckboxProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    var onPressDown = function onPressDown2(event) {
      event.preventDefault();
      setActive.on();
    };
    return _extends({}, props2, {
      ref: forwardedRef,
      "data-active": dataAttr(isActive),
      "data-hover": dataAttr(isHovered),
      "data-checked": dataAttr(isChecked),
      "data-focus": dataAttr(isFocused),
      "data-indeterminate": dataAttr(isIndeterminate),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      "aria-hidden": true,
      onMouseDown: callAllHandlers(props2.onMouseDown, onPressDown),
      onMouseUp: callAllHandlers(props2.onMouseUp, setActive.off),
      onMouseEnter: callAllHandlers(props2.onMouseEnter, setHovered.on),
      onMouseLeave: callAllHandlers(props2.onMouseLeave, setHovered.off)
    });
  }, [isActive, isChecked, isDisabled, isFocused, isHovered, isIndeterminate, isInvalid, isReadOnly, setActive, setHovered.off, setHovered.on]);
  var getRootProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, htmlProps, props2, {
      ref: mergeRefs(forwardedRef, function(node) {
        if (!node)
          return;
        setRootIsLabelElement(node.tagName === "LABEL");
      }),
      onClick: callAllHandlers(props2.onClick, function() {
        if (!rootIsLabelElement) {
          var _inputRef$current;
          (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.click();
          focus(inputRef.current, {
            nextTick: true
          });
        }
      }),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  }, [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement]);
  var getInputProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, props2, {
      ref: mergeRefs(inputRef, forwardedRef),
      type: "checkbox",
      name,
      value,
      id,
      tabIndex,
      onChange: callAllHandlers(props2.onChange, handleChange),
      onBlur: callAllHandlers(props2.onBlur, onBlurProp, setFocused.off),
      onFocus: callAllHandlers(props2.onFocus, onFocusProp, setFocused.on),
      onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
      onKeyUp: callAllHandlers(props2.onKeyUp, onKeyUp),
      required: isRequired,
      checked: isChecked,
      disabled: trulyDisabled,
      readOnly: isReadOnly,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
      "aria-describedby": ariaDescribedBy,
      "aria-disabled": isDisabled,
      style: visuallyHiddenStyle
    });
  }, [name, value, id, handleChange, setFocused.off, setFocused.on, onBlurProp, onFocusProp, onKeyDown, onKeyUp, isRequired, isChecked, trulyDisabled, isReadOnly, ariaLabel, ariaLabelledBy, ariaInvalid, isInvalid, ariaDescribedBy, isDisabled, tabIndex]);
  var getLabelProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, props2, {
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props2.onMouseDown, stopEvent),
      onTouchStart: callAllHandlers(props2.onTouchStart, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    });
  }, [isChecked, isDisabled, isInvalid]);
  var state = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isIndeterminate,
    isDisabled,
    isReadOnly,
    isRequired
  };
  return {
    state,
    getRootProps,
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    htmlProps
  };
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
var _excluded = ["spacing", "className", "children", "iconColor", "iconSize", "icon", "isChecked", "isDisabled", "onChange", "inputProps"];
var CheckboxControl = chakra("span", {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "top",
    userSelect: "none",
    flexShrink: 0
  }
});
var Label = chakra("label", {
  baseStyle: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    verticalAlign: "top",
    position: "relative"
  }
});
var Checkbox = /* @__PURE__ */ forwardRef(function(props, ref) {
  var group = useCheckboxGroupContext();
  var mergedProps = _extends({}, group, props);
  var styles = useMultiStyleConfig("Checkbox", mergedProps);
  var ownProps = omitThemingProps(props);
  var _ownProps$spacing = ownProps.spacing, spacing = _ownProps$spacing === void 0 ? "0.5rem" : _ownProps$spacing, className = ownProps.className, children = ownProps.children, iconColor = ownProps.iconColor, iconSize = ownProps.iconSize, _ownProps$icon = ownProps.icon, icon = _ownProps$icon === void 0 ? /* @__PURE__ */ jsx(CheckboxIcon, {}) : _ownProps$icon, isCheckedProp = ownProps.isChecked, _ownProps$isDisabled = ownProps.isDisabled, isDisabled = _ownProps$isDisabled === void 0 ? group == null ? void 0 : group.isDisabled : _ownProps$isDisabled, onChangeProp = ownProps.onChange, inputProps = ownProps.inputProps, rest = _objectWithoutPropertiesLoose(ownProps, _excluded);
  var isChecked = isCheckedProp;
  if (group != null && group.value && ownProps.value) {
    isChecked = group.value.includes(ownProps.value);
  }
  var onChange = onChangeProp;
  if (group != null && group.onChange && ownProps.value) {
    onChange = callAll(group.onChange, onChangeProp);
  }
  var _useCheckbox = useCheckbox(_extends({}, rest, {
    isDisabled,
    isChecked,
    onChange
  })), state = _useCheckbox.state, getInputProps = _useCheckbox.getInputProps, getCheckboxProps = _useCheckbox.getCheckboxProps, getLabelProps = _useCheckbox.getLabelProps, getRootProps = _useCheckbox.getRootProps;
  var iconStyles = react.exports.useMemo(function() {
    return _extends({
      opacity: state.isChecked || state.isIndeterminate ? 1 : 0,
      transform: state.isChecked || state.isIndeterminate ? "scale(1)" : "scale(0.95)",
      fontSize: iconSize,
      color: iconColor
    }, styles.icon);
  }, [iconColor, iconSize, state.isChecked, state.isIndeterminate, styles.icon]);
  var clonedIcon = /* @__PURE__ */ react.exports.cloneElement(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked
  });
  return /* @__PURE__ */ jsxs(Label, {
    __css: styles.container,
    className: cx("chakra-checkbox", className),
    ...getRootProps(),
    children: [/* @__PURE__ */ jsx("input", {
      className: "chakra-checkbox__input",
      ...getInputProps(inputProps, ref)
    }), /* @__PURE__ */ jsx(CheckboxControl, {
      __css: styles.control,
      className: "chakra-checkbox__control",
      ...getCheckboxProps(),
      children: clonedIcon
    }), children && /* @__PURE__ */ react.exports.createElement(chakra.span, _extends({
      className: "chakra-checkbox__label"
    }, getLabelProps(), {
      __css: _extends({
        marginStart: spacing
      }, styles.label)
    }), children)]
  });
});
if (__DEV__) {
  Checkbox.displayName = "Checkbox";
}
export {
  Checkbox as C
};
//# sourceMappingURL=chakra-ui-checkbox.esm.e501747d.js.map
