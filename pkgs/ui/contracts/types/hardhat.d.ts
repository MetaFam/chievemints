/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1822ProxiableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1822ProxiableUpgradeable__factory>;
    getContractFactory(
      name: "IERC1967Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1967Upgradeable__factory>;
    getContractFactory(
      name: "IBeaconUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IBeaconUpgradeable__factory>;
    getContractFactory(
      name: "ERC1967UpgradeUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1967UpgradeUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "UUPSUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UUPSUpgradeable__factory>;
    getContractFactory(
      name: "ERC1155Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Upgradeable__factory>;
    getContractFactory(
      name: "ERC1155BurnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155BurnableUpgradeable__factory>;
    getContractFactory(
      name: "ERC1155SupplyUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155SupplyUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155MetadataURIUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155MetadataURIUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155ReceiverUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155ReceiverUpgradeable__factory>;
    getContractFactory(
      name: "IERC1155Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC1155Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Bits",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Bits__factory>;
    getContractFactory(
      name: "BulkDisbursableNFTs",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BulkDisbursableNFTs__factory>;
    getContractFactory(
      name: "Roles",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Roles__factory>;

    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "IERC1822ProxiableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1822ProxiableUpgradeable>;
    getContractAt(
      name: "IERC1967Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1967Upgradeable>;
    getContractAt(
      name: "IBeaconUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IBeaconUpgradeable>;
    getContractAt(
      name: "ERC1967UpgradeUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1967UpgradeUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "UUPSUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UUPSUpgradeable>;
    getContractAt(
      name: "ERC1155Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Upgradeable>;
    getContractAt(
      name: "ERC1155BurnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155BurnableUpgradeable>;
    getContractAt(
      name: "ERC1155SupplyUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155SupplyUpgradeable>;
    getContractAt(
      name: "IERC1155MetadataURIUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155MetadataURIUpgradeable>;
    getContractAt(
      name: "IERC1155ReceiverUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155ReceiverUpgradeable>;
    getContractAt(
      name: "IERC1155Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC1155Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "Bits",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Bits>;
    getContractAt(
      name: "BulkDisbursableNFTs",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BulkDisbursableNFTs>;
    getContractAt(
      name: "Roles",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Roles>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
