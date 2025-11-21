import { useWeb3 } from '@/lib/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { SubmitButton } from './SubmitButton';
import { extractMessage } from '@/lib/helpers';
import { BarLoader } from 'react-spinners';
import { toast } from 'react-toastify';
export const MaxForm = ({ tokenId, purpose = 'create', perUser = false, ...props }) => {
    const [max, setMax] = useState(null);
    const [processing, setProcessing] = useState(false);
    const { roContract, rwContract, contractClient } = useWeb3();
    useEffect(() => {
        const load = async () => {
            if (roContract && tokenId) {
                if (perUser) {
                    setMax(await roContract('getPerUserMax', [BigInt(tokenId)]));
                }
                else {
                    setMax(await roContract('getMax', [BigInt(tokenId)]));
                }
            }
        };
        load();
    }, [tokenId, roContract, perUser]);
    const save = useCallback(async (evt) => {
        evt.preventDefault();
        if (!rwContract) {
            throw new Error('`rwContract` is not defined');
        }
        try {
            setProcessing(true);
            let hash;
            if (perUser) {
                hash = await rwContract('setPerUserMax', [tokenId, max]);
            }
            else {
                hash = await rwContract('setMax', [tokenId, max]);
            }
            await contractClient.waitForTransactionReceipt({ hash });
        }
        catch (error) {
            toast(extractMessage(error));
        }
        finally {
            setProcessing(false);
        }
    }, [contractClient, max, perUser, rwContract, tokenId]);
    return (React.createElement("form", { onSubmit: save, ...props },
        React.createElement("label", null,
            React.createElement("h3", null,
                perUser && 'Per User',
                " Maximum Mintable"),
            max == null ? (React.createElement("div", null,
                React.createElement(BarLoader, { color: "#2768ff" }),
                React.createElement("p", null, "Loading\u2026"))) : (React.createElement("input", { type: "number", value: max, onChange: ({ target: { value } }) => {
                    setMax(value.trim().replace(/^0+([^0])/, '$1'));
                } }))),
        React.createElement(SubmitButton, { label: `Set ${perUser ? 'Per User' : ''} Max`, disabled: !/^-?\d+$/.test(max), requireStorage: false, short: true, className: "full", purpose, processing })));
};
//# sourceMappingURL=MaxForm.js.map