import { p as createContext, o as __DEV__, g as forwardRef, h as cx, r as react, c as chakra, s as useStyleConfig, t as omitThemingProps, a2 as mergeWith, a3 as useMergeRefs, a4 as dataAttr, a as jsx, j as jsxs, F as Fragment, a1 as Spinner, v as useMultiStyleConfig, S as StylesProvider, B as useStyles, L as useId, a5 as useBoolean, C as mergeRefs, a6 as ariaAttr, N as callAllHandlers } from "./index.35c474d9.js";
import { I as Icon$1 } from "./LinkedSVG.4242533a.js";
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
var _excluded$4 = ["size", "colorScheme", "variant", "className", "spacing", "isAttached", "isDisabled"];
var _createContext$1 = createContext({
  strict: false,
  name: "ButtonGroupContext"
}), ButtonGroupProvider = _createContext$1[0], useButtonGroup = _createContext$1[1];
var ButtonGroup = /* @__PURE__ */ forwardRef(function(props, ref) {
  var size = props.size, colorScheme = props.colorScheme, variant = props.variant, className = props.className, _props$spacing = props.spacing, spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing, isAttached = props.isAttached, isDisabled = props.isDisabled, rest = _objectWithoutPropertiesLoose$1(props, _excluded$4);
  var _className = cx("chakra-button__group", className);
  var context = react.exports.useMemo(function() {
    return {
      size,
      colorScheme,
      variant,
      isDisabled
    };
  }, [size, colorScheme, variant, isDisabled]);
  var groupStyles = {
    display: "inline-flex"
  };
  if (isAttached) {
    groupStyles = _extends$1({}, groupStyles, {
      "> *:first-of-type:not(:last-of-type)": {
        borderEndRadius: 0
      },
      "> *:not(:first-of-type):not(:last-of-type)": {
        borderRadius: 0
      },
      "> *:not(:first-of-type):last-of-type": {
        borderStartRadius: 0
      }
    });
  } else {
    groupStyles = _extends$1({}, groupStyles, {
      "& > *:not(style) ~ *:not(style)": {
        marginStart: spacing
      }
    });
  }
  return /* @__PURE__ */ react.exports.createElement(ButtonGroupProvider, {
    value: context
  }, /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({
    ref,
    role: "group",
    __css: groupStyles,
    className: _className
  }, rest)));
});
if (__DEV__) {
  ButtonGroup.displayName = "ButtonGroup";
}
var _excluded$3 = ["label", "placement", "spacing", "children", "className", "__css"];
var ButtonSpinner = function ButtonSpinner2(props) {
  var label = props.label, placement = props.placement, _props$spacing = props.spacing, spacing = _props$spacing === void 0 ? "0.5rem" : _props$spacing, _props$children = props.children, children = _props$children === void 0 ? /* @__PURE__ */ jsx(Spinner, {
    color: "currentColor",
    width: "1em",
    height: "1em"
  }) : _props$children, className = props.className, __css = props.__css, rest = _objectWithoutPropertiesLoose$1(props, _excluded$3);
  var _className = cx("chakra-button__spinner", className);
  var marginProp = placement === "start" ? "marginEnd" : "marginStart";
  var spinnerStyles = react.exports.useMemo(function() {
    var _extends2;
    return _extends$1((_extends2 = {
      display: "flex",
      alignItems: "center",
      position: label ? "relative" : "absolute"
    }, _extends2[marginProp] = label ? spacing : 0, _extends2.fontSize = "1em", _extends2.lineHeight = "normal", _extends2), __css);
  }, [__css, label, marginProp, spacing]);
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends$1({
    className: _className
  }, rest, {
    __css: spinnerStyles
  }), children);
};
if (__DEV__) {
  ButtonSpinner.displayName = "ButtonSpinner";
}
var _excluded$2$1 = ["children", "className"];
var ButtonIcon = function ButtonIcon2(props) {
  var children = props.children, className = props.className, rest = _objectWithoutPropertiesLoose$1(props, _excluded$2$1);
  var _children = /* @__PURE__ */ react.exports.isValidElement(children) ? /* @__PURE__ */ react.exports.cloneElement(children, {
    "aria-hidden": true,
    focusable: false
  }) : children;
  var _className = cx("chakra-button__icon", className);
  return /* @__PURE__ */ react.exports.createElement(chakra.span, _extends$1({
    display: "inline-flex",
    alignSelf: "center",
    flexShrink: 0
  }, rest, {
    className: _className
  }), _children);
};
if (__DEV__) {
  ButtonIcon.displayName = "ButtonIcon";
}
function useButtonType(value) {
  var _React$useState = react.exports.useState(!value), isButton = _React$useState[0], setIsButton = _React$useState[1];
  var refCallback = react.exports.useCallback(function(node) {
    if (!node)
      return;
    setIsButton(node.tagName === "BUTTON");
  }, []);
  var type = isButton ? "button" : void 0;
  return {
    ref: refCallback,
    type
  };
}
var _excluded$1$1 = ["isDisabled", "isLoading", "isActive", "isFullWidth", "children", "leftIcon", "rightIcon", "loadingText", "iconSpacing", "type", "spinner", "spinnerPlacement", "className", "as"];
var Button = /* @__PURE__ */ forwardRef(function(props, ref) {
  var group = useButtonGroup();
  var styles = useStyleConfig("Button", _extends$1({}, group, props));
  var _omitThemingProps = omitThemingProps(props), _omitThemingProps$isD = _omitThemingProps.isDisabled, isDisabled = _omitThemingProps$isD === void 0 ? group == null ? void 0 : group.isDisabled : _omitThemingProps$isD, isLoading = _omitThemingProps.isLoading, isActive = _omitThemingProps.isActive, isFullWidth = _omitThemingProps.isFullWidth, children = _omitThemingProps.children, leftIcon = _omitThemingProps.leftIcon, rightIcon = _omitThemingProps.rightIcon, loadingText = _omitThemingProps.loadingText, _omitThemingProps$ico = _omitThemingProps.iconSpacing, iconSpacing = _omitThemingProps$ico === void 0 ? "0.5rem" : _omitThemingProps$ico, type = _omitThemingProps.type, spinner = _omitThemingProps.spinner, _omitThemingProps$spi = _omitThemingProps.spinnerPlacement, spinnerPlacement = _omitThemingProps$spi === void 0 ? "start" : _omitThemingProps$spi, className = _omitThemingProps.className, as = _omitThemingProps.as, rest = _objectWithoutPropertiesLoose$1(_omitThemingProps, _excluded$1$1);
  var buttonStyles = react.exports.useMemo(function() {
    var _styles$_focus;
    var _focus = mergeWith({}, (_styles$_focus = styles == null ? void 0 : styles["_focus"]) != null ? _styles$_focus : {}, {
      zIndex: 1
    });
    return _extends$1({
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      width: isFullWidth ? "100%" : "auto"
    }, styles, !!group && {
      _focus
    });
  }, [styles, group, isFullWidth]);
  var _useButtonType = useButtonType(as), _ref = _useButtonType.ref, defaultType = _useButtonType.type;
  var contentProps = {
    rightIcon,
    leftIcon,
    iconSpacing,
    children
  };
  return /* @__PURE__ */ react.exports.createElement(chakra.button, _extends$1({
    disabled: isDisabled || isLoading,
    ref: useMergeRefs(ref, _ref),
    as,
    type: type != null ? type : defaultType,
    "data-active": dataAttr(isActive),
    "data-loading": dataAttr(isLoading),
    __css: buttonStyles,
    className: cx("chakra-button", className)
  }, rest), isLoading && spinnerPlacement === "start" && /* @__PURE__ */ jsx(ButtonSpinner, {
    className: "chakra-button__spinner--start",
    label: loadingText,
    placement: "start",
    spacing: iconSpacing,
    children: spinner
  }), isLoading ? loadingText || /* @__PURE__ */ react.exports.createElement(
    chakra.span,
    {
      opacity: 0
    },
    /* @__PURE__ */ jsx(ButtonContent, {
      ...contentProps
    })
  ) : /* @__PURE__ */ jsx(ButtonContent, {
    ...contentProps
  }), isLoading && spinnerPlacement === "end" && /* @__PURE__ */ jsx(ButtonSpinner, {
    className: "chakra-button__spinner--end",
    label: loadingText,
    placement: "end",
    spacing: iconSpacing,
    children: spinner
  }));
});
if (__DEV__) {
  Button.displayName = "Button";
}
function ButtonContent(props) {
  var leftIcon = props.leftIcon, rightIcon = props.rightIcon, children = props.children, iconSpacing = props.iconSpacing;
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [leftIcon && /* @__PURE__ */ jsx(ButtonIcon, {
      marginEnd: iconSpacing,
      children: leftIcon
    }), children, rightIcon && /* @__PURE__ */ jsx(ButtonIcon, {
      marginStart: iconSpacing,
      children: rightIcon
    })]
  });
}
var _excluded$5 = ["icon", "children", "isRound", "aria-label"];
var IconButton = /* @__PURE__ */ forwardRef(function(props, ref) {
  var icon = props.icon, children = props.children, isRound = props.isRound, ariaLabel = props["aria-label"], rest = _objectWithoutPropertiesLoose$1(props, _excluded$5);
  var element = icon || children;
  var _children = /* @__PURE__ */ react.exports.isValidElement(element) ? /* @__PURE__ */ react.exports.cloneElement(element, {
    "aria-hidden": true,
    focusable: false
  }) : null;
  return /* @__PURE__ */ jsx(Button, {
    padding: "0",
    borderRadius: isRound ? "full" : void 0,
    ref,
    "aria-label": ariaLabel,
    ...rest,
    children: _children
  });
});
if (__DEV__) {
  IconButton.displayName = "IconButton";
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
var _excluded$2 = ["id", "isRequired", "isInvalid", "isDisabled", "isReadOnly"], _excluded2$1 = ["getRootProps", "htmlProps"];
var _createContext = createContext({
  strict: false,
  name: "FormControlContext"
}), FormControlProvider = _createContext[0], useFormControlContext = _createContext[1];
function useFormControlProvider(props) {
  var idProp = props.id, isRequired = props.isRequired, isInvalid = props.isInvalid, isDisabled = props.isDisabled, isReadOnly = props.isReadOnly, htmlProps = _objectWithoutPropertiesLoose(props, _excluded$2);
  var uuid = useId();
  var id = idProp || "field-" + uuid;
  var labelId = id + "-label";
  var feedbackId = id + "-feedback";
  var helpTextId = id + "-helptext";
  var _React$useState = react.exports.useState(false), hasFeedbackText = _React$useState[0], setHasFeedbackText = _React$useState[1];
  var _React$useState2 = react.exports.useState(false), hasHelpText = _React$useState2[0], setHasHelpText = _React$useState2[1];
  var _useBoolean = useBoolean(), isFocused = _useBoolean[0], setFocus = _useBoolean[1];
  var getHelpTextProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({
      id: helpTextId
    }, props2, {
      ref: mergeRefs(forwardedRef, function(node) {
        if (!node)
          return;
        setHasHelpText(true);
      })
    });
  }, [helpTextId]);
  var getLabelProps = react.exports.useCallback(function(props2, forwardedRef) {
    var _props$id, _props$htmlFor;
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, props2, {
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: (_props$id = props2.id) != null ? _props$id : labelId,
      htmlFor: (_props$htmlFor = props2.htmlFor) != null ? _props$htmlFor : id
    });
  }, [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]);
  var getErrorMessageProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({
      id: feedbackId
    }, props2, {
      ref: mergeRefs(forwardedRef, function(node) {
        if (!node)
          return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    });
  }, [feedbackId]);
  var getRootProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, props2, htmlProps, {
      ref: forwardedRef,
      role: "group"
    });
  }, [htmlProps]);
  var getRequiredIndicatorProps = react.exports.useCallback(function(props2, forwardedRef) {
    if (props2 === void 0) {
      props2 = {};
    }
    if (forwardedRef === void 0) {
      forwardedRef = null;
    }
    return _extends({}, props2, {
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props2.children || "*"
    });
  }, []);
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: setFocus.on,
    onBlur: setFocus.off,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps
  };
}
var FormControl = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("Form", props);
  var ownProps = omitThemingProps(props);
  var _useFormControlProvid = useFormControlProvider(ownProps), getRootProps = _useFormControlProvid.getRootProps;
  _useFormControlProvid.htmlProps;
  var context = _objectWithoutPropertiesLoose(_useFormControlProvid, _excluded2$1);
  var className = cx("chakra-form-control", props.className);
  return /* @__PURE__ */ react.exports.createElement(FormControlProvider, {
    value: context
  }, /* @__PURE__ */ react.exports.createElement(StylesProvider, {
    value: styles
  }, /* @__PURE__ */ react.exports.createElement(chakra.div, _extends({}, getRootProps({}, ref), {
    className,
    __css: styles["container"]
  }))));
});
if (__DEV__) {
  FormControl.displayName = "FormControl";
}
var FormHelperText = /* @__PURE__ */ forwardRef(function(props, ref) {
  var field = useFormControlContext();
  var styles = useStyles();
  var className = cx("chakra-form__helper-text", props.className);
  return /* @__PURE__ */ react.exports.createElement(chakra.div, _extends({}, field == null ? void 0 : field.getHelpTextProps(props, ref), {
    __css: styles.helperText,
    className
  }));
});
if (__DEV__) {
  FormHelperText.displayName = "FormHelperText";
}
var _excluded$1 = ["isDisabled", "isInvalid", "isReadOnly", "isRequired"], _excluded2 = ["id", "disabled", "readOnly", "required", "isRequired", "isInvalid", "isReadOnly", "isDisabled", "onFocus", "onBlur"];
function useFormControl(props) {
  var _useFormControlProps = useFormControlProps(props), isDisabled = _useFormControlProps.isDisabled, isInvalid = _useFormControlProps.isInvalid, isReadOnly = _useFormControlProps.isReadOnly, isRequired = _useFormControlProps.isRequired, rest = _objectWithoutPropertiesLoose(_useFormControlProps, _excluded$1);
  return _extends({}, rest, {
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  });
}
function useFormControlProps(props) {
  var _ref, _ref2, _ref3;
  var field = useFormControlContext();
  var id = props.id, disabled = props.disabled, readOnly = props.readOnly, required = props.required, isRequired = props.isRequired, isInvalid = props.isInvalid, isReadOnly = props.isReadOnly, isDisabled = props.isDisabled, onFocus = props.onFocus, onBlur = props.onBlur, rest = _objectWithoutPropertiesLoose(props, _excluded2);
  var labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : [];
  if (field != null && field.hasFeedbackText && field != null && field.isInvalid) {
    labelIds.push(field.feedbackId);
  }
  if (field != null && field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }
  return _extends({}, rest, {
    "aria-describedby": labelIds.join(" ") || void 0,
    id: id != null ? id : field == null ? void 0 : field.id,
    isDisabled: (_ref = disabled != null ? disabled : isDisabled) != null ? _ref : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_ref2 = readOnly != null ? readOnly : isReadOnly) != null ? _ref2 : field == null ? void 0 : field.isReadOnly,
    isRequired: (_ref3 = required != null ? required : isRequired) != null ? _ref3 : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  });
}
var FormErrorMessage = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useMultiStyleConfig("FormError", props);
  var ownProps = omitThemingProps(props);
  var field = useFormControlContext();
  if (!(field != null && field.isInvalid))
    return null;
  return /* @__PURE__ */ react.exports.createElement(StylesProvider, {
    value: styles
  }, /* @__PURE__ */ react.exports.createElement(chakra.div, _extends({}, field == null ? void 0 : field.getErrorMessageProps(ownProps, ref), {
    className: cx("chakra-form__error-message", props.className),
    __css: _extends({
      display: "flex",
      alignItems: "center"
    }, styles.text)
  })));
});
if (__DEV__) {
  FormErrorMessage.displayName = "FormErrorMessage";
}
var FormErrorIcon = /* @__PURE__ */ forwardRef(function(props, ref) {
  var styles = useStyles();
  var field = useFormControlContext();
  if (!(field != null && field.isInvalid))
    return null;
  var _className = cx("chakra-form__error-icon", props.className);
  return /* @__PURE__ */ jsx(Icon$1, {
    ref,
    "aria-hidden": true,
    ...props,
    __css: styles.icon,
    className: _className,
    children: /* @__PURE__ */ jsx("path", {
      fill: "currentColor",
      d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
    })
  });
});
if (__DEV__) {
  FormErrorIcon.displayName = "FormErrorIcon";
}
var _excluded = ["className", "children", "requiredIndicator", "optionalIndicator"];
var FormLabel = /* @__PURE__ */ forwardRef(function(passedProps, ref) {
  var _field$getLabelProps;
  var styles = useStyleConfig("FormLabel", passedProps);
  var props = omitThemingProps(passedProps);
  props.className;
  var children = props.children, _props$requiredIndica = props.requiredIndicator, requiredIndicator = _props$requiredIndica === void 0 ? /* @__PURE__ */ jsx(RequiredIndicator, {}) : _props$requiredIndica, _props$optionalIndica = props.optionalIndicator, optionalIndicator = _props$optionalIndica === void 0 ? null : _props$optionalIndica, rest = _objectWithoutPropertiesLoose(props, _excluded);
  var field = useFormControlContext();
  var ownProps = (_field$getLabelProps = field == null ? void 0 : field.getLabelProps(rest, ref)) != null ? _field$getLabelProps : _extends({
    ref
  }, rest);
  return /* @__PURE__ */ react.exports.createElement(chakra.label, _extends({}, ownProps, {
    className: cx("chakra-form__label", props.className),
    __css: _extends({
      display: "block",
      textAlign: "start"
    }, styles)
  }), children, field != null && field.isRequired ? requiredIndicator : optionalIndicator);
});
if (__DEV__) {
  FormLabel.displayName = "FormLabel";
}
var RequiredIndicator = /* @__PURE__ */ forwardRef(function(props, ref) {
  var field = useFormControlContext();
  var styles = useStyles();
  if (!(field != null && field.isRequired))
    return null;
  var className = cx("chakra-form__required-indicator", props.className);
  return /* @__PURE__ */ react.exports.createElement(chakra.span, _extends({}, field == null ? void 0 : field.getRequiredIndicatorProps(props, ref), {
    __css: styles.requiredIndicator,
    className
  }));
});
if (__DEV__) {
  RequiredIndicator.displayName = "RequiredIndicator";
}
export {
  Button as B,
  FormControl as F,
  FormLabel as a,
  useFormControlProps as b,
  useFormControlContext as c,
  useFormControl as u
};
//# sourceMappingURL=chakra-ui-form-control.esm.c27e1ea4.js.map
