import { aB as useParams, r as react, e as useWeb3, j as jsxs, a as jsx, H as HelmetExport } from "./index.ee52586c.js";
import { D as deregexify, B as Box, r as regexify, h as httpURL } from "./LinkedSVG.dcd30e1b.js";
import { O as OptionsForm } from "./MaxForm.86d0a003.js";
import { H as HomeLink } from "./HomeLink.fd4ab05d.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.67767496.js";
import "./index.esm.b14f5311.js";
import "./chakra-ui-form-control.esm.0ea3eb5a.js";
import "./chakra-ui-textarea.esm.646f61ee.js";
import "./chakra-ui-image.esm.643ec633.js";
import "./chakra-ui-button.esm.81233fed.js";
import "./SubmitButton.9541d623.js";
import "./chakra-ui-toast.esm.226fadbb.js";
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
//# sourceMappingURL=edit.e0bc99c3.js.map
