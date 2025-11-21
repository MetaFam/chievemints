// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title EnumerableERC1155
 * @dev ERC1155 token with enumeration capabilities for tokens and owners
 */
abstract contract EnumerableERC1155 is
  Initializable,
  ERC1155Upgradeable,
  ERC1155BurnableUpgradeable,
  ERC1155SupplyUpgradeable,
  OwnableUpgradeable
{
  string public name;
  string public symbol;

  struct CheckableList {
    uint256[] entries;
    mapping(uint256 => uint256) indices;
  }

  // List of all tokens
  CheckableList internal tokens;

  // Mapping from owner to list of owned token IDs
  mapping(address => CheckableList) internal owned;

  // Mapping from token ID to list of owner addresses
  mapping(uint256 => address[]) internal owners;

  // Mapping from token ID to information URI
  mapping(uint256 => string) internal uris;


  function __EnumerableERC1155_init(string memory uri_) internal onlyInitializing {
    __ERC1155_init(uri_);
    __ERC1155Burnable_init();
    __ERC1155Supply_init();
    __EnumerableERC1155_init_unchained();
  }

  function __EnumerableERC1155_init_unchained() internal onlyInitializing {
    // Token id 0 is reserved, so it is skipped
    tokens.entries.push(0);
  }

  function setDescription(string calldata _name, string calldata _symbol)
    public
    virtual
    onlyOwner
  {
    name = _name;
    symbol = _symbol;
  }

  /**
   * @notice Get the total number of token types
   */
  function typeSupply()
    public
    view
    virtual
    returns (uint256 count)
  {
    count = tokens.entries.length - 1;
  }

  /**
   * @notice Get token ID by index (1-based)
   */
  function tokenByIndex(uint256 index)
    public
    view
    virtual
    returns (uint256 id)
  {
    require(
      index > 0,
      "ERC1155Enumerable: tokens indexed from 1"
    );
    require(
      index < tokens.entries.length,
      "ERC1155Enumerable: token index out of bounds"
    );

    id = tokens.entries[index];
  }

  /**
   * @notice Get the index of a token ID
   */
  function tokenIndex(uint256 id)
    public
    view
    virtual
    returns (uint256 index)
  {
    index = tokens.indices[id];
    require(
      index != 0,
      "ERC1155Enumerable: token does not exist"
    );
  }

  /**
   * @notice Check if a token ID exists
   */
  function tokenExists(uint256 id)
    public
    view
    virtual
    returns (bool)
  {
    return tokens.indices[id] != 0;
  }

  /**
   * @notice Get token owned by address at index
   */
  function tokenOfOwnerByIndex(
    address owner,
    uint256 index
  )
    public
    view
    virtual
    returns (uint256 id)
  {
    require(
      index < owned[owner].entries.length,
      "ERC1155Enumerable: owner index out of bounds"
    );

    // Skip over any zero entries (deleted tokens)
    uint256 count = 0;
    for(uint256 i = 0; i < owned[owner].entries.length; i++) {
      if(owned[owner].entries[i] != 0) {
        if(count == index) {
          return owned[owner].entries[i];
        }
        count++;
      }
    }

    revert("ERC1155Enumerable: owner index out of bounds");
  }

  /**
   * @notice Get number of different token types owned by an address
   */
  function balanceOfBatch(address owner)
    public
    view
    virtual
    returns (uint256 count)
  {
    count = 0;
    for(uint256 i = 0; i < owned[owner].entries.length; i++) {
      if(owned[owner].entries[i] != 0) {
        count++;
      }
    }
  }

  /**
   * @notice Get all token IDs owned by an address
   */
  function tokensOfOwner(address owner)
    public
    view
    virtual
    returns (uint256[] memory tokenIds)
  {
    uint256 balance = balanceOfBatch(owner);
    tokenIds = new uint256[](balance);

    uint256 index = 0;
    for(uint256 i = 0; i < owned[owner].entries.length; i++) {
      if(owned[owner].entries[i] != 0) {
        tokenIds[index] = owned[owner].entries[i];
        index++;
      }
    }
  }

  /**
   * @notice Get tokens with pagination
   */
  function tokensByPage(uint256 page, uint256 perPage)
    public
    view
    virtual
    returns (uint256[] memory tokenIds)
  {
    uint256 start = page * perPage + 1; // tokens start at index 1
    uint256 end = start + perPage;
    uint256 supply = tokens.entries.length;

    if(start >= supply) {
      return new uint256[](0);
    }

    if(end > supply) {
      end = supply;
    }

    uint256 length = end - start;
    tokenIds = new uint256[](length);

    for(uint256 i = 0; i < length; i++) {
      tokenIds[i] = tokens.entries[start + i];
    }
  }

  /**
   * @dev Hook that is called before any token transfer
   * Updates the enumeration data structures
   */
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  )
    internal
    virtual
    override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
  {
    // Add tokens to global list if they don't exist
    for(uint256 i = 0; i < ids.length; ++i) {
      if(tokens.indices[ids[i]] == 0) {
        tokens.entries.push(ids[i]);
        tokens.indices[ids[i]] = tokens.entries.length - 1;
      }
    }

    // Add tokens to recipient's owned list
    if(to != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(owned[to].indices[ids[i]] == 0) {
          owned[to].entries.push(ids[i]);
          owned[to].indices[ids[i]] = owned[to].entries.length - 1;
        }
      }
    }

    // Remove tokens from sender's owned list if balance becomes 0
    if(from != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(balanceOf(from, ids[i]) <= amounts[i]) {
          uint256 index = owned[from].indices[ids[i]];
          if(index > 0 || (index == 0 && owned[from].entries[0] == ids[i])) {
            // Swap with last element
            uint256 lastIndex = owned[from].entries.length - 1;
            uint256 lastTokenId = owned[from].entries[lastIndex];

            owned[from].entries[index] = lastTokenId;
            owned[from].indices[lastTokenId] = index;

            // Remove last element
            owned[from].entries.pop();
            delete owned[from].indices[ids[i]];
          }
        }
      }
    }

    super._beforeTokenTransfer(
      operator, from, to, ids, amounts, data
    );
  }

  /**
   * @dev This empty reserved space is put in place to allow future versions to add new
   * variables without shifting down storage in the inheritance chain.
   */
  uint256[47] private __gap;
}