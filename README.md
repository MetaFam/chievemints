# ’Chievemints

![MetaGame ’Chievemints](packages/ui/public/logo.svg)

This is a simple app to mint ERC-1155 NFTs to represent player accomplishments in [MetaGame](//metagame.wtf).

The permissions for each token are controlled by the existence of other tokens in the system.

## Running

* `yarn`
* `yarn ui:start`

## Deploying the Contract

Set `CHAIN_NAME` in `packages/contracts/.env` and `VITE_CHAIN_NAME` in `packages/ui/.env` to a network from the [hardhat config](packages/contracts/hardhat.config.ts).

By default if an existing deployment for that network is found in `packages/contracts/artifacts/`, the system will attempt to upgrade the contract. To force a fresh deployment, the best method is to add a new network for your deployment to `packages/contracts/hardhat.config.ts` to the `validationKeyNames` and `config.networks` sections. This new chain name needs to include an existing chain name *(like "dysMumbai" or "polygonTesting")* for the network name to resolve in the UI. Otherwise, the new chain needs to be added to `packages/ui/src/lib/networks.ts`.

After the network is configured, the contracts can be deployed using `yarn hh:deploy`.

After the contract is deployed, the deploying address is set as the owner. To create tokens from your wallet, you will either need to add a "`Creator`" or "`Superuser`" permission for that address *(creators can make new token types, superusers can do pretty much everything)*. To do so, from the command line run `yarn --cwd packages/contracts/ hardhat grant --address myaddr.eth --role Superuser`.

You should now be able to click the trophy in the UI to create a new token type.

## Publishing the UI

In order to publish the UI, you will need write access to the [’Chievemints GitHub Repository](https://github.com/MetaFam/chievemints/). Given that, just run `yarn ui:publish`.

![Flashy Octo](packages/ui/public/favicon.svg)

## Uploading Metadata

The gating tokens need to have metadata files uploaded to IPFS in order for them to display correctly. This is done by running the `yarn gating-metadata` task in the `packages/contracts/` subdirectory.
