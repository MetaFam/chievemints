import { c as useWeb3, r as reactExports, a as jsxs, H as HelmetExport, j as jsx, v as useParams } from "./index-bd5631bf.js";
import { r as regexify, n as deregexify } from "./TokenFilterForm.module-31c41608.js";
import { View } from "./view-28f579c6.js";
import { S as SubmitButton } from "./SubmitButton-84492494.js";
import "./_commonjsHelpers-1bd4c8e6.js";
import "./react-markdown-005df2e0.js";
import "./HomeLink-6cf907e1.js";
import "./ThreeDScene-c57a94a2.js";
const SelfMint = ({ tokenId }) => {
  const { rwContract, address } = useWeb3();
  const [processing, setProcessing] = reactExports.useState(false);
  const mint = reactExports.useCallback(async () => {
    try {
      setProcessing(true);
      const tx = await rwContract["mint(address[],uint256,bytes)"](
        [address],
        BigInt(tokenId),
        []
      );
      await tx.wait();
    } catch (error) {
      console.error({ error });
    } finally {
      setProcessing(false);
    }
  }, [address, rwContract, tokenId]);
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
//# sourceMappingURL=self-mint-42b31f3e.js.map
