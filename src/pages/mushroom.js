import React from 'react';
import { Helmet } from 'react-helmet';
import { PaymasterMode, createSmartAccountClient } from '@biconomy/account';
import { Header } from '@/components';
import { createWalletClient, encodeFunctionData, parseAbi, custom, } from 'viem';
import { useAccount } from 'wagmi';
import { optimism } from 'viem/chains';
import tyl from '../styles/mushroom.module.css';
import { toast } from 'react-toastify';
export const FreeMushroom = () => (React.createElement("section", { id: tyl.free },
    React.createElement(Helmet, null,
        React.createElement("title", null, "\u2019\uD835\uDD88\uD835\uDD8D\uD835\uDD8E\uD835\uDD8A\uD835\uDD9B\uD835\uDD8A: Free Mushroom")),
    React.createElement(Header, null),
    React.createElement(Content, null)));
const Content = () => {
    const { address } = useAccount();
    const mint = async () => {
        const client = createWalletClient({
            account: address,
            chain: optimism,
            transport: custom(window.ethereum),
        });
        const bundlerURL = ('https://bundler.biconomy.io/api/v2/10/nJPK7B3ru.ac5t7734-190d-41am-af80-6877f74b8f44');
        const paymasterURL = ('https://paymaster.biconomy.io/api/v1/10/B__e5X2ip.9ef0f5c9-efda-4014-b91c-f1ecf60ab466');
        const smartAccount = await createSmartAccountClient({
            signer: client,
            bundlerUrl: bundlerURL,
            paymasterUrl: paymasterURL,
        });
        const tokenId = `0x48${'0'.repeat(57)}7`;
        const nftData = encodeFunctionData({
            abi: parseAbi([
                'function mint(address recipient, uint256 id, uint256 amount, bytes data) public'
            ]),
            functionName: 'mint',
            args: [address, BigInt(tokenId), BigInt(1), '0x0'],
        });
        const { wait } = await smartAccount.sendTransaction({
            to: '0xb77b8eDB779Cda90dBF651F8109857C97193CF9F',
            data: nftData,
        }, {
            paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        });
        const { receipt: { transactionHash }, success, } = await wait();
        if (success) {
            toast(`Minted mushroom with transaction hash: ${transactionHash}`);
        }
        else {
            console.error('Failed to mint mushroom.');
        }
    };
    return (React.createElement("button", { onClick: mint }, "Mint A Mushroom"));
};
export default FreeMushroom;
//# sourceMappingURL=mushroom.js.map