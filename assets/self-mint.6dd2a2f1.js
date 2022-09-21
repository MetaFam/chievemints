import { g as useWeb3, r as react, j as jsxs, C as Container, H as HelmetExport, a as jsx, S as Stack, aM as useParams } from "./index.1422698f.js";
import { e as extractMessage, r as regexify, o as deregexify } from "./LinkedSVG.bed330e2.js";
import { View } from "./view.67f3bf36.js";
import { S as SubmitButton } from "./SubmitButton.02d3f385.js";
import { u as useToast } from "./chakra-ui-toast.esm.74e28ef8.js";
import "./HomeLink.ca759ab9.js";
import "./chakra-ui-alert.esm.de1790b1.js";
const SelfMint = ({
  tokenId
}) => {
  const {
    rwContract,
    address
  } = useWeb3();
  const [processing, setProcessing] = react.exports.useState(false);
  const toast = useToast();
  const mint = react.exports.useCallback(async () => {
    try {
      setProcessing(true);
      const tx = await rwContract["mint(address[],uint256,bytes)"]([address], BigInt(tokenId), []);
      await tx.wait();
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
    } finally {
      setProcessing(false);
    }
  }, [address, rwContract, toast, tokenId]);
  return /* @__PURE__ */ jsxs(Container, {
    maxW: "40rem",
    my: 10,
    children: [/* @__PURE__ */ jsxs(HelmetExport, {
      children: [/* @__PURE__ */ jsxs("title", {
        children: ["Self-Mint NFT #", regexify(tokenId)]
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Mint a \u2019Chievemint NFT"
      })]
    }), /* @__PURE__ */ jsxs(Stack, {
      as: "form",
      onSubmit: mint,
      children: [/* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint",
        processing
      }), /* @__PURE__ */ jsx(View, {
        tokenId,
        header: false
      }), /* @__PURE__ */ jsx(SubmitButton, {
        purpose: "mint",
        processing
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
//# sourceMappingURL=self-mint.6dd2a2f1.js.map
