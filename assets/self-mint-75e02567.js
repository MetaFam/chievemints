import { a3 as useWeb3, a4 as reactExports, a5 as jsxs, a6 as HelmetExport, a7 as jsx, a8 as useParams } from "./index-dc31a81c.js";
import { r as regexify, d as deregexify } from "./TokenFilterForm.module-4a5a5329.js";
import { View } from "./view-80068ff7.js";
import { S as SubmitButton } from "./SubmitButton-890014ea.js";
import "./react-markdown-6591dae8.js";
import "./HomeLink-813a91a1.js";
import "./ThreeDScene-d471941e.js";
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
//# sourceMappingURL=self-mint-75e02567.js.map
