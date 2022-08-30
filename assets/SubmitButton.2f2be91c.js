import { w as switchTo, F as Flex, T as Text, x as capitalize } from "./LinkedSVG.e13455b9.js";
import { e as useWeb3, r as react, U as NETWORKS, a as jsx, j as jsxs, a1 as Spinner } from "./index.77bf8803.js";
import { B as Button } from "./chakra-ui-button.esm.d8396911.js";
const SubmitButton = ({
  purpose = "create",
  processing = false,
  onClick,
  label = `${capitalize(purpose)} NFT`,
  ...props
}) => {
  const {
    chain,
    userProvider,
    connect,
    rwContract
  } = useWeb3();
  const offChain = react.exports.useMemo(() => chain !== NETWORKS.contract.chainId, [chain]);
  const [working, setWorking] = react.exports.useState(processing);
  const desiredNetwork = offChain ? NETWORKS.contract.name : null;
  return /* @__PURE__ */ jsx(Button, {
    type: "submit",
    variant: "solid",
    colorScheme: !rwContract || offChain ? "blue" : "green",
    isDisabled: offChain && !!rwContract || processing || working,
    w: "full",
    onClick: async (evt) => {
      try {
        setWorking(true);
        if (!userProvider) {
          evt.preventDefault();
          connect();
        } else if (offChain) {
          evt.preventDefault();
          switchTo(NETWORKS.contract.chainId);
        } else {
          onClick?.apply(null, [evt]);
        }
      } finally {
        setWorking(false);
      }
    },
    ...props,
    children: (() => {
      if (processing || working) {
        return /* @__PURE__ */ jsxs(Flex, {
          children: [/* @__PURE__ */ jsx(Spinner, {}), /* @__PURE__ */ jsxs(Text, {
            ml: 2,
            children: [capitalize(purpose).replace(/e$/, ""), "ing\u2026"]
          })]
        });
      } else if (!userProvider) {
        return `Connect To ${capitalize(purpose)}`;
      } else if (offChain) {
        return `Connect To The ${desiredNetwork} Network To ${capitalize(purpose)}`;
      } else if (!rwContract) {
        return "Contract Not Connected";
      } else {
        return label;
      }
    })()
  });
};
export {
  SubmitButton as S
};
//# sourceMappingURL=SubmitButton.2f2be91c.js.map
