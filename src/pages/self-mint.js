import React, { useCallback, useState } from 'react';
import { deregexify, extractMessage, regexify } from '@/lib/helpers';
import { useParams } from 'react-router-dom';
import { View } from './view';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { SubmitButton } from '@/components';
import { useWeb3 } from '@/lib/hooks';
export const SelfMint = ({ tokenId }) => {
    const { rwContract, address, contractClient } = useWeb3();
    const [processing, setProcessing] = useState(false);
    const mint = useCallback(async () => {
        try {
            setProcessing(true);
            const hash = await (rwContract('mint', [[address], BigInt(tokenId)]));
            await contractClient.waitForTransactionReceipt({ hash });
        }
        catch (error) {
            console.error({ error });
            toast.error(extractMessage(error));
        }
        finally {
            setProcessing(false);
        }
    }, [address, contractClient, rwContract, tokenId]);
    return (React.createElement("main", { id: "self-mint" },
        React.createElement(Helmet, null,
            React.createElement("title", null,
                "Self-Mint NFT #",
                regexify(tokenId)),
            React.createElement("meta", { name: "description", content: "Mint a \u2019Chievemint NFT" })),
        React.createElement("form", { onSubmit: mint },
            React.createElement(SubmitButton, { purpose: "mint", processing }),
            React.createElement(View, { tokenId, header: false }),
            React.createElement(SubmitButton, { purpose: "mint", processing }))));
};
export const SelfMintPage = () => {
    const { nftId } = useParams();
    const tokenId = deregexify(Array.isArray(nftId) ? nftId[0] : nftId);
    return React.createElement(SelfMint, { tokenId });
};
export default SelfMintPage;
//# sourceMappingURL=self-mint.js.map