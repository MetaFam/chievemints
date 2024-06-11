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

  function roleIndexForName(string memory roleName)
    public
    pure
    returns (uint8 role)
  {
    bytes32 hash = keccak256(abi.encodePacked(roleName));
    if(hash == keccak256(abi.encodePacked('Superuser'))) {
      return uint8(Role.Superuser);
    }
    if(hash == keccak256(abi.encodePacked('Minter'))) {
      return uint8(Role.Minter);
    }
    if(hash == keccak256(abi.encodePacked('Caster'))) {
      return uint8(Role.Caster);
    }
    if(hash == keccak256(abi.encodePacked('Transferer'))) {
      return uint8(Role.Transferer);
    }
    if(hash == keccak256(abi.encodePacked('Configurer'))) {
      return uint8(Role.Configurer);
    }
    if(hash == keccak256(abi.encodePacked('Maintainer'))) {
      return uint8(Role.Maintainer);
    }
    if(hash == keccak256(abi.encodePacked('Creator'))) {
      return uint8(Role.Creator);
    }
    if(hash == keccak256(abi.encodePacked('Limiter'))) {
      return uint8(Role.Limiter);
    }
    if(hash == keccak256(abi.encodePacked('Burner'))) {
      return uint8(Role.Burner);
    }
    if(hash == keccak256(abi.encodePacked('Destroyer'))) {
      return uint8(Role.Destroyer);
    }
    if(hash == keccak256(abi.encodePacked('Oracle'))) {
      return uint8(Role.Oracle);
    }
    if(hash == keccak256(abi.encodePacked('ReservedLast'))) {
      return uint8(Role.ReservedNeg1);
    }
    revert(string(abi.encodePacked('Unknown role type: ', roleName)));
  }
}