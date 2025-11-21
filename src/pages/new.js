import React, { useCallback, useEffect, useState } from 'react';
import { parseEventLogs } from 'viem';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { OptionsForm, Header, SubmitButton } from '@/components';
import { useWeb3 } from '@/lib/hooks';
import { extractMessage } from '@/lib/helpers';
import { rolePermissions, tokenPermissions } from '@/config';
import { CircleLoader } from 'react-spinners';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import ns from '../styles/new.module.css';
export const New = () => (React.createElement("section", null,
    React.createElement(Helmet, null,
        React.createElement("title", null, "\u2019\uD835\uDD88\uD835\uDD8D\uD835\uDD8E\uD835\uDD8A\uD835\uDD9B\uD835\uDD8A: \u2C9A\u2C89\u2CB1 \u2CA6\u2C9F\u2C95\u2C89\u2C9B")),
    React.createElement(Header, null),
    React.createElement(Content, null)));
const Content = () => {
    const { ensClient, roContract, rwContract, rolesLibrary, connecting, address, contractClient, contract, } = useWeb3();
    const [search] = useSearchParams({ tokenId: '' });
    const id = search.get('tokenId');
    const [tokenId, setTokenId] = (useState(Array.isArray(id) ? id[0] : id));
    const [roles, setRoles] = (useState(tokenPermissions));
    const [working, setWorking] = useState(false);
    const { register, handleSubmit } = useForm();
    useEffect(() => {
        if (typeof id === 'string') {
            setTokenId(id);
        }
    }, [id]);
    useEffect(() => {
        const load = async () => {
            if (roContract) {
                const numRoles = (await rolesLibrary('roleIndexForName', ['ReservedLast'])) - 1;
                const roles = await Promise.all(Array.from({ length: numRoles }).map(async (_, idx) => await rolesLibrary('roleNameByIndex', [idx + 1])));
                setRoles(roles);
            }
        };
        load(); // load static list to avoid extraneous permissions
    }, [roContract, rolesLibrary]);
    const reserve = useCallback(async (data) => {
        setWorking(true);
        try {
            if (!rwContract) {
                throw new Error('Connect your wallet to reserve an id.');
            }
            if (!rolesLibrary) {
                throw new Error('Library not loaded.');
            }
            const grants = [];
            const disables = [];
            await Promise.all(Object.entries(data).map(async ([key, value]) => {
                if (typeof value === 'boolean' && value) {
                    const [, type, role] = key.match(/^(grant|disable)\((.+)\)$/) ?? [];
                    console.debug({ rolesLibrary });
                    const roleId = await rolesLibrary('roleIndexForName', [role]);
                    if (isNaN(roleId)) {
                        throw new Error(`Invalid role id for ${type}: ${role}`);
                    }
                    switch (type) {
                        case 'grant': {
                            grants.push(roleId);
                            break;
                        }
                        case 'disable': {
                            disables.push(roleId);
                            break;
                        }
                        default: {
                            throw new Error(`Unknown operation: ${type}`);
                        }
                    }
                }
            }));
            let { maintainer } = data;
            if (maintainer === '') {
                maintainer = address;
            }
            if (maintainer == null) {
                throw new Error('`maintainer` is not set.');
            }
            if (maintainer.includes('.')) {
                if (!ensClient) {
                    throw new Error('ENS provider not defined.');
                }
                maintainer = ((await ensClient.getEnsName({ address: maintainer }))
                    ?? undefined);
            }
            console.debug({ maintainer, grants, disables });
            const hash = await rwContract('create', [maintainer, grants, disables]);
            const receipt = await (contractClient.waitForTransactionReceipt({ hash }));
            const [event] = parseEventLogs({
                abi: contract.abi,
                logs: receipt.logs,
                eventName: 'Created',
            });
            if (!event) {
                throw new Error('Couldn’t find a creation event.');
            }
            console.debug({ event });
            const [id] = event.args;
            setTokenId(id);
        }
        catch (error) {
            toast.error(extractMessage(error));
            console.error({ error });
        }
        finally {
            setWorking(false);
        }
    }, [address, contractClient, ensClient, rolesLibrary, rwContract]);
    if (!rwContract || !tokenId || working) {
        return (React.createElement("main", { id: ns.new },
            React.createElement("h1", null, "Create a New Token Type"),
            (() => {
                if (connecting) {
                    return (React.createElement("section", null,
                        React.createElement(CircleLoader, { color: "#FF7301", size: 100 }),
                        React.createElement("h2", null, "Connecting\u2026")));
                }
                if (working) {
                    return (React.createElement("section", null,
                        React.createElement(CircleLoader, { color: "#6EA8FF", size: 100 }),
                        React.createElement("h2", null, "Reserving your token\u2026")));
                }
                if (!tokenId) {
                    return (React.createElement("form", { onSubmit: handleSubmit(reserve) },
                        React.createElement("label", { id: ns.admin },
                            React.createElement("h2", null, "Admin"),
                            React.createElement("input", { ...register('maintainer'), placeholder: "Maintainer Address (default Creator)" })),
                        React.createElement("table", null,
                            React.createElement("thead", null,
                                React.createElement("tr", null,
                                    React.createElement("th", null, "Role"),
                                    React.createElement("th", null,
                                        React.createElement(Tippy, { content: "Give the admin these roles:" },
                                            React.createElement("span", null, "Grant"))),
                                    React.createElement("th", null,
                                        React.createElement(Tippy, { content: "Prevent these permissions from being checked:" },
                                            React.createElement("span", null, "Disable"))),
                                    React.createElement("th", null, "Description"))),
                            React.createElement("tbody", null, roles.map((role, idx) => (React.createElement("tr", { key: idx },
                                React.createElement("td", null, role),
                                React.createElement("td", null,
                                    React.createElement("input", { type: "checkbox", ...register(`grant(${role})`) })),
                                React.createElement("td", null,
                                    React.createElement("input", { type: "checkbox", ...register(`disable(${role})`) })),
                                React.createElement("td", null, rolePermissions[role])))))),
                        React.createElement(SubmitButton, { purpose: "create", label: "Reserve an ID", className: "full", requireStorage: false })));
                }
                return (React.createElement("p", null, "\u00BFHow\u2019d we get here?"));
            })()));
    }
    return (React.createElement(OptionsForm, { tokenId }));
};
export default New;
//# sourceMappingURL=new.js.map