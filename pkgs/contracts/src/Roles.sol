// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";

library Roles {
  enum Role {
    // The first value is zero and all tokens should
    // have a positive value.
    Reserved00,

    // Superusers have access to the bulk of the
    // functions of the contract.
    Superuser,

    // Minters have the capacity to create instances
    // of existing tokens subject to restrictions on
    // quantity and whether an individual may hold
    // duplicates.
    Minter,

    // Casters may cast roles upon other users except
    // for superusers who may only be created by
    // other superusers (or the owner).
    Caster,

    // Transferers have the ability to move tokens
    // between accounts.
    Transferer,

    // Configurers can update the URI associated
    // with a token.
    Configurer,

    // Maintainers may update the contract.
    Maintainer,

    // Creators can create new tokens.
    Creator,

    // Limiters can change the maximum number of
    // tokens allowed to be minted.
    Limiter,

    // Burners can destroy minted tokens.
    Burner,

    // Destroyers can remove a created token.
    Destroyer,

    // Oracles provide information about the world.
    // Trusted information like the length of
    // videos submitted for time tokens.
    Oracle,

    ReservedNeg1
  }

    function roleNameByIndex(uint8 index)
    public
    pure
    returns (string memory)
  {
    if(index == uint8(Role.Superuser)) return "Superuser";
    if(index == uint8(Role.Minter)) return "Minter";
    if(index == uint8(Role.Caster)) return "Caster";
    if(index == uint8(Role.Transferer)) return "Transferer";
    if(index == uint8(Role.Configurer)) return "Configurer";
    if(index == uint8(Role.Maintainer)) return "Maintainer";
    if(index == uint8(Role.Creator)) return "Creator";
    if(index == uint8(Role.Limiter)) return "Limiter";
    if(index == uint8(Role.Burner)) return "Burner";
    if(index == uint8(Role.Destroyer)) return "Destroyer";
    if(index == uint8(Role.Oracle)) return "Oracle";
    if(index == uint8(Role.ReservedNeg1)) return "ReservedLast";
    revert (string(abi.encodePacked("Unknown Role Index: ", Strings.toString(uint8(index)))));
  }

  bytes32 private constant HASH_SUPERUSER = keccak256(abi.encodePacked('Superuser'));
  bytes32 private constant HASH_MINTER = keccak256(abi.encodePacked('Minter'));
  bytes32 private constant HASH_CASTER = keccak256(abi.encodePacked('Caster'));
  bytes32 private constant HASH_TRANSFERER = keccak256(abi.encodePacked('Transferer'));
  bytes32 private constant HASH_CONFIGURER = keccak256(abi.encodePacked('Configurer'));
  bytes32 private constant HASH_MAINTAINER = keccak256(abi.encodePacked('Maintainer'));
  bytes32 private constant HASH_CREATOR = keccak256(abi.encodePacked('Creator'));
  bytes32 private constant HASH_LIMITER = keccak256(abi.encodePacked('Limiter'));
  bytes32 private constant HASH_BURNER = keccak256(abi.encodePacked('Burner'));
  bytes32 private constant HASH_DESTROYER = keccak256(abi.encodePacked('Destroyer'));
  bytes32 private constant HASH_ORACLE = keccak256(abi.encodePacked('Oracle'));
  bytes32 private constant HASH_RESERVED_LAST = keccak256(abi.encodePacked('ReservedLast'));

  function roleIndexForName(string memory roleName)
    public
    pure
    returns (uint8 role)
  {
    bytes32 hash = keccak256(abi.encodePacked(roleName));
    if(hash == HASH_SUPERUSER) return uint8(Role.Superuser);
    if(hash == HASH_MINTER) return uint8(Role.Minter);
    if(hash == HASH_CASTER) return uint8(Role.Caster);
    if(hash == HASH_TRANSFERER) return uint8(Role.Transferer);
    if(hash == HASH_CONFIGURER) return uint8(Role.Configurer);
    if(hash == HASH_MAINTAINER) return uint8(Role.Maintainer);
    if(hash == HASH_CREATOR) return uint8(Role.Creator);
    if(hash == HASH_LIMITER) return uint8(Role.Limiter);
    if(hash == HASH_BURNER) return uint8(Role.Burner);
    if(hash == HASH_DESTROYER) return uint8(Role.Destroyer);
    if(hash == HASH_ORACLE) return uint8(Role.Oracle);
    if(hash == HASH_RESERVED_LAST) return uint8(Role.ReservedNeg1);
    revert(string(abi.encodePacked('Unknown role type: ', roleName)));
  }
}