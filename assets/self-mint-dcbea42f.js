import { c as useWeb3, r as reactExports, a as jsxs, H as HelmetExport, j as jsx, k as useParams } from "./index-23392436.js";
import { r as regexify, d as deregexify } from "./TokenFilterForm.module-e8ed1c9b.js";
import { View } from "./view-9647c0ff.js";
import { S as SubmitButton } from "./SubmitButton-b17c486b.js";
import "./react-markdown-84de2d25.js";
import "./HomeLink-8f671e6f.js";
import "./ThreeDScene-0d679655.js";
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
//# sourceMappingURL=self-mint-dcbea42f.js.map
