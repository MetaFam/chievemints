import { e as useWeb3, r as react, j as jsxs, H as HelmetExport, a as jsx, aA as useParams } from "./index.74129a3c.js";
import { e as extractMessage, C as Container, r as regexify, S as Stack, D as deregexify } from "./LinkedSVG.2c776b3b.js";
import { View } from "./view.c211ee26.js";
import { S as SubmitButton } from "./SubmitButton.d9b34ed5.js";
import { u as useToast } from "./chakra-ui-toast.esm.83ae5436.js";
import "./HomeLink.0842e6b2.js";
import "./chakra-ui-alert.esm.99e4f622.js";
import "./chakra-ui-image.esm.418cddf4.js";
import "./chakra-ui-button.esm.150654e4.js";
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
//# sourceMappingURL=self-mint.ea08b33b.js.map
