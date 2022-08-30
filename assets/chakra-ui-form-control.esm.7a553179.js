import { p as createContext, g as forwardRef, o as __DEV__, v as useMultiStyleConfig, t as omitThemingProps, h as cx, r as react, S as StylesProvider, c as chakra, B as useStyles, a as jsx, s as useStyleConfig, L as useId, a7 as useBoolean, C as mergeRefs, a4 as dataAttr, ae as ariaAttr, N as callAllHandlers } from "./index.74129a3c.js";
import { I as Icon$1 } from "./LinkedSVG.2c776b3b.js";
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
  FormControl as F,
  FormLabel as a,
  useFormControlProps as b,
  useFormControlContext as c,
  useFormControl as u
};
//# sourceMappingURL=chakra-ui-form-control.esm.7a553179.js.map
