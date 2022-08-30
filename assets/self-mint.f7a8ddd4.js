import { e as useWeb3, r as react, j as jsxs, H as HelmetExport, a as jsx, aA as useParams } from "./index.77bf8803.js";
import { e as extractMessage, C as Container, S as Stack, D as deregexify } from "./LinkedSVG.e13455b9.js";
import { View } from "./view.615556b5.js";
import { S as SubmitButton } from "./SubmitButton.2f2be91c.js";
import { u as useToast } from "./chakra-ui-toast.esm.830b19ff.js";
import "./HomeLink.9065c520.js";
import "./chakra-ui-alert.esm.b6d839f4.js";
import "./chakra-ui-image.esm.5342859d.js";
import "./chakra-ui-button.esm.d8396911.js";
const SelfMint = ({
  tokenId
}) => {
  const {
    rwContract,
    address
  } = useWeb3();
  const toast = useToast();
  const mint = react.exports.useCallback(async () => {
    try {
      await rwContract["mint(address[],uint256,bytes)"]([address], BigInt(tokenId), []);
    } catch (error) {
      console.error({
        error
      });
      toast({
        title: "Minting Error",
        description: extractMessage(error),
        status: "error",
        isClosable: true,
        duration: 1e4
      });
    }
  }, [address, rwContract, toast, tokenId]);
  return /* @__PURE__ */ jsxs(Container, {
    maxW: "40rem",
    my: 10,
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsxs("title", {
        children: ["Self-Mint NFT #", tokenId]
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Mint a \u2019Chievemint NFT"
      })]
    }), /* @__PURE__ */ jsxs(Stack, {
      as: "form",
      onSubmit: mint,
      children: [/* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint"
      }), /* @__PURE__ */ jsx(View, {
        tokenId,
        header: false
      }), /* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint"
      })]
    })]
  });
};
const SelfMintPage = () => {
  const {
    nftId
  } = useParams();
  const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
  return /* @__PURE__ */ jsx(SelfMint, {
    tokenId
  });
};
export {
  SelfMint,
  SelfMintPage,
  SelfMintPage as default
};
//# sourceMappingURL=self-mint.f7a8ddd4.js.map
