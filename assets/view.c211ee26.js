import { c as chakra, r as react, e as useWeb3, j as jsxs, a as jsx, a1 as Spinner, H as HelmetExport, aA as useParams } from "./index.74129a3c.js";
import { R as ReactMarkdown, F as Flex, T as Text, r as regexify, S as Stack, H as Heading, h as httpURL, D as deregexify, l as lib } from "./LinkedSVG.2c776b3b.js";
import { H as HomeLink } from "./HomeLink.0842e6b2.js";
import { A as Alert, a as AlertIcon, b as AlertTitle, c as AlertDescription } from "./chakra-ui-alert.esm.99e4f622.js";
import { I as Image$1 } from "./chakra-ui-image.esm.418cddf4.js";
const Markdown = chakra(ReactMarkdown);
const View = ({
  tokenId,
  header = true
}) => {
  const [metadata, setMetadata] = react.exports.useState();
  const [error, setError] = react.exports.useState();
  const {
    roContract
  } = useWeb3();
  react.exports.useEffect(() => {
    const getMetadata = async () => {
      if (roContract && tokenId) {
        try {
          let realId = BigInt(tokenId);
          if (realId < 2 ** 32) {
            realId = await roContract.tokenByIndex(realId);
          }
          const metadataURI = await roContract.uri(realId);
          const metadataURL = httpURL(metadataURI);
          if (!metadataURL) {
            throw new Error(`Couldn't find metadata for token #${regexify(tokenId)}.`);
          }
          const response = await fetch(metadataURL);
          const data = await response.text();
          setMetadata(lib.parse(data));
        } catch (err) {
          setError(err.message);
        }
      }
    };
    getMetadata();
  }, [roContract, tokenId]);
  if (error) {
    return /* @__PURE__ */ jsxs(Alert, {
      status: "error",
      children: [/* @__PURE__ */ jsx(AlertIcon, {}), /* @__PURE__ */ jsx(AlertTitle, {
        mr: 2,
        children: "Error: Loading NFT"
      }), /* @__PURE__ */ jsx(AlertDescription, {
        children: error
      })]
    });
  }
  if (!metadata) {
    return /* @__PURE__ */ jsxs(Flex, {
      align: "center",
      justify: "center",
      h: "100vh",
      children: [/* @__PURE__ */ jsx(Spinner, {
        thickness: "4px",
        speed: "1s",
        mr: 2
      }), /* @__PURE__ */ jsxs(Text, {
        children: ["Loading Metadata For Token #", regexify(tokenId)]
      })]
    });
  }
  const {
    name,
    image,
    animation_url: animationURL,
    description,
    background_color: bg
  } = metadata;
  return /* @__PURE__ */ jsxs(Stack, {
    align: "center",
    position: "relative",
    children: [header && /* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsxs("title", {
        children: ["\u2019\u{1D588}\u{1D58D}\u{1D58E}\u{1D58A}\u{1D59B}\u{1D58A}: \u{1D4E5}\u2C93\u2C89\u2CB1 #", regexify(tokenId)]
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "MetaGame\u2019s \u2019Chievemint NFTs"
      })]
    }), /* @__PURE__ */ jsx(HomeLink, {}), name && /* @__PURE__ */ jsx(Heading, {
      children: name
    }), image && /* @__PURE__ */ jsx(chakra.object, {
      data: httpURL(image) ?? void 0,
      title: name,
      pointerEvents: "none",
      maxW: "80vmin",
      maxH: "80vmin",
      bg: `#${bg}`,
      borderRadius: 15,
      p: 2
    }), description && /* @__PURE__ */ jsx(Markdown, {
      maxW: "30rem",
      sx: {
        a: {
          textDecoration: "underline"
        },
        p: {
          textIndent: "1em",
          my: 3,
          textAlign: "justify"
        }
      },
      linkTarget: "_blank",
      children: description
    }), animationURL?.endsWith(".mp4") && /* @__PURE__ */ jsx(chakra.video, {
      maxW: 96,
      maxH: 96,
      controls: true,
      autoPlay: true,
      loop: true,
      muted: true,
      children: /* @__PURE__ */ jsx(chakra.source, {
        src: httpURL(animationURL) ?? void 0
      })
    }), animationURL?.endsWith(".webp") && /* @__PURE__ */ jsx(Image$1, {
      src: httpURL(animationURL) ?? void 0,
      alt: name,
      maxW: 96,
      maxH: 96
    })]
  });
};
const ViewPage = () => {
  const {
    nftId
  } = useParams();
  const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
  return /* @__PURE__ */ jsx(View, {
    tokenId
  });
};
export {
  View,
  ViewPage,
  ViewPage as default
};
//# sourceMappingURL=view.c211ee26.js.map
