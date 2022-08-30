import { aA as useParams, r as react, e as useWeb3, j as jsxs, a as jsx, H as HelmetExport } from "./index.77bf8803.js";
import { D as deregexify, B as Box, r as regexify, h as httpURL } from "./LinkedSVG.e13455b9.js";
import { O as OptionsForm } from "./MaxForm.2801448a.js";
import { H as HomeLink } from "./HomeLink.9065c520.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.b6d839f4.js";
import "./index.esm.adfd9f00.js";
import "./chakra-ui-form-control.esm.fc4b9b1d.js";
import "./chakra-ui-textarea.esm.7738a2e6.js";
import "./chakra-ui-image.esm.5342859d.js";
import "./chakra-ui-button.esm.d8396911.js";
import "./SubmitButton.2f2be91c.js";
import "./chakra-ui-toast.esm.830b19ff.js";
const Edit = () => {
  const {
    nftId
  } = useParams();
  const tokenId = react.exports.useMemo(() => deregexify(nftId), [nftId]);
  const [metadata, setMetadata] = react.exports.useState();
  const [error, setError] = react.exports.useState();
  const {
    roContract
  } = useWeb3();
  react.exports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          const meta = await roContract.uri(tokenId);
          if (!meta) {
            setMetadata(null);
          } else {
            const response = await fetch(httpURL(meta));
            setMetadata(await response.json());
          }
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  return /* @__PURE__ */ jsxs(Box, {
    ml: 16,
    children: [/* @__PURE__ */ jsx(HelmetExport, {
      children: /* @__PURE__ */ jsxs("title", {
        children: ["\u2019\u{1D588}\u{1D58D}\u{1D58E}\u{1D58A}\u{1D59B}\u{1D58A}: \u2130\u{1D4B9}\u{1D4BE}\u{1D4C9} #", tokenId && regexify(tokenId)]
      })
    }), /* @__PURE__ */ jsx(HomeLink, {}), error && /* @__PURE__ */ jsxs(Alert, {
      status: "error",
      children: [/* @__PURE__ */ jsx(AlertIcon, {}), /* @__PURE__ */ jsx(AlertTitle, {
        children: "`setMetadata` Error"
      }), /* @__PURE__ */ jsx(AlertDescription, {
        children: error
      })]
    }), /* @__PURE__ */ jsx(OptionsForm, {
      purpose: "update",
      tokenId,
      metadata
    })]
  });
};
export {
  Edit,
  Edit as default
};
//# sourceMappingURL=edit.c7138034.js.map
