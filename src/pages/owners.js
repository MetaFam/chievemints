import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react';
import contractAddress from '../contracts/polygon/BulkDisbursableNFTs.address';
import { useParams, useSearchParams, Link, } from 'react-router-dom';
import { httpURL, deregexify, capitalize } from '@/lib/helpers';
import { HomeLink } from '@/components';
import { useWeb3 } from '@/lib/hooks';
import { contractNetwork } from '@/config';
const LIMIT = 100; // The Graph's return limit
const ownersQuery = {
    polygon: gql `
    query NFTOwners(
      $tokenId: String
      $contractAddress: String
      $startAfter: String
    ) {
      nfts(where:{ 
        contract: $contractAddress,
        tokenID: $tokenId
      }) {
        ownership(where: {
          id_gt: $startAfter
        }) {
          id
          owner
          quantity
        }
      }
    }
  `,
};
export const Owners = () => {
    const { nftId } = useParams();
    const tokenId = useMemo(() => (deregexify(Array.isArray(nftId) ? nftId[0] : nftId)), [nftId]);
    const [params] = useSearchParams();
    const startAfter = params.get('start_after') ?? '';
    const offset = params.get('offset') ?? 0;
    const [ownerships, setOwnerships] = (useState(null));
    const decId = tokenId ? BigInt(tokenId).toString(10) : null;
    const query = useMemo(() => (ownersQuery[contractNetwork]), []);
    const [search, { loading, error: { message: queryError } = { message: null }, data }] = (useLazyQuery(query ?? gql `query Empty { id }`));
    useEffect(() => {
        if (query) {
            search({ variables: {
                    tokenId: decId,
                    contractAddress: contractAddress.toLowerCase(),
                    startAfter,
                } });
        }
    }, [decId, startAfter, query, search]);
    const [title, setTitle] = useState('𝘜𝘯𝘬𝘯𝘰𝘸𝘯');
    const { ensClient, roContract } = useWeb3();
    const [error, setError] = useState((query == null ? ('Retrieving owners requires access to a subgraph'
        + ' & one hasn’t been configured for the '
        + ` ${capitalize(contractNetwork)} network.`) : (queryError)));
    useEffect(() => query && setError(queryError), [query, queryError]);
    useEffect(() => {
        const lookup = async () => {
            if (tokenId) {
                const uri = await roContract('uri', [tokenId]);
                if (!uri)
                    return;
                const response = await fetch(httpURL(uri));
                const data = await response.json();
                setTitle(data.name);
            }
        };
        lookup();
    }, [tokenId, roContract]);
    useEffect(() => {
        const process = async () => {
            if (data) {
                if (data.nfts.length > 1) {
                    throw new Error(`Got ${data.nfts.length} NFTs`);
                }
                if (data.nfts.length === 1) {
                    setOwnerships(await Promise.all(data.nfts[0].ownership.map(async (oship) => {
                        let { owner } = oship;
                        const ens = (await ensClient.getEnsName({ address: owner }));
                        if (ens) {
                            owner = ens;
                        }
                        const { quantity, id } = oship;
                        return { owner, quantity, id };
                    })));
                }
            }
        };
        process();
    }, [data, ensClient]);
    if (loading || ownerships == null)
        return React.createElement(React.Fragment, null, "Loading\u2026");
    return (React.createElement("section", null,
        React.createElement(HomeLink, null),
        React.createElement("h1", null, title),
        error && (React.createElement("div", { className: "error" },
            React.createElement("span", null, "\u00A1Error!"),
            ":",
            React.createElement("span", null, error))),
        ownerships.length === 0 ? (React.createElement("div", { className: "warning" },
            React.createElement("span", null, "\u00A1Empty!"),
            ":",
            React.createElement("span", null,
                "No owners found for token #",
                nftId,
                "."))) : (React.createElement("ol", { start: Number(offset) + 1 }, ownerships.map(({ owner, quantity }, idx) => (React.createElement("li", { key: idx }, `${owner} (${quantity})`))))),
        ownerships.length === LIMIT && (React.createElement(Link, { to: {
                pathname: `/owners?${new URLSearchParams({
                    nftId,
                    start_after: ownerships.slice(-1)[0].id,
                    offset: (Number(offset) + LIMIT).toString(),
                })}`
            } }, "Next"))));
};
export default Owners;
//# sourceMappingURL=owners.js.map