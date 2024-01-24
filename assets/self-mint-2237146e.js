import { u as useWeb3, r as reactExports, Q, j as jsxs, H as HelmetExport, e as jsx, f as useParams } from "./index-d6dac5c9.js";
import { e as extractMessage, r as regexify, d as deregexify } from "./TokenFilterForm.module-8a2c2533.js";
import { View } from "./view-aa414cf5.js";
import { S as SubmitButton } from "./SubmitButton-a615749e.js";
import "./react-markdown-23a94034.js";
import "./HomeLink-18947dd1.js";
import "./ThreeDScene-ec54c271.js";
const SelfMint = ({ tokenId }) => {
  const { rwContract, address, contractClient } = useWeb3();
  const [processing, setProcessing] = reactExports.useState(false);
  const mint = reactExports.useCallback(async () => {
    try {
      setProcessing(true);
      const hash = await rwContract("mint", [[address], BigInt(tokenId)]);
      await contractClient.waitForTransactionReceipt({ hash });
    } catch (error) {
      console.error({ error });
      Q.error(extractMessage(error));
    } finally {
      setProcessing(false);
    }
  }, [address, contractClient, rwContract, tokenId]);
  return /* @__PURE__ */ jsxs("main", { id: "self-mint", children: [
    /* @__PURE__ */ jsxs(HelmetExport, { children: [
      /* @__PURE__ */ jsxs("title", { children: [
        "Self-Mint NFT #",
        regexify(tokenId)
      ] }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Mint a ’Chievemint NFT" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: mint, children: [
      /* @__PURE__ */ jsx(SubmitButton, { purpose: "mint", ...{ processing } }),
      /* @__PURE__ */ jsx(View, { ...{ tokenId }, header: false }),
      /* @__PURE__ */ jsx(SubmitButton, { purpose: "mint", ...{ processing } })
    ] })
  ] });
};
const SelfMintPage = () => {
  const { nftId } = useParams();
  const tokenId = deregexify(
    Array.isArray(nftId) ? nftId[0] : nftId
  );
  return /* @__PURE__ */ jsx(SelfMint, { ...{ tokenId } });
};
export {
  SelfMint,
  SelfMintPage,
  SelfMintPage as default
};
//# sourceMappingURL=self-mint-2237146e.js.map
