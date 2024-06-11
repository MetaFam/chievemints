// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./Roles.sol";

// import "hardhat/console.sol";

library Bits {
  // Each _WIDTH is the number of Bits given to the
  // particular field. The _BOUNDARY is the bit before
  // the first bit of the field.
  uint8 public constant TEAM_WIDTH = 13;
  uint8 public constant TEAM_BOUNDARY = uint8(256 - TEAM_WIDTH);
  uint8 public constant TYPE_WIDTH = 8;
  uint8 public constant TYPE_BOUNDARY = TEAM_BOUNDARY - TYPE_WIDTH;
  uint8 public constant REQUIREMENT_WIDTH = 3;
  uint8 public constant REQUIREMENT_BOUNDARY = TYPE_BOUNDARY - REQUIREMENT_WIDTH;
  uint8 public constant REPETITION_WIDTH = 3;
  uint8 public constant REPETITION_BOUNDARY = REQUIREMENT_BOUNDARY - REPETITION_WIDTH;
  uint8 public constant UNIQUENESS_WIDTH = 1;
  uint8 public constant UNIQUENESS_BOUNDARY = REPETITION_BOUNDARY - UNIQUENESS_WIDTH;
  uint8 public constant ROLE_WIDTH = 8;
  uint8 public constant ROLE_BOUNDARY = UNIQUENESS_BOUNDARY - ROLE_WIDTH;
  uint8 public constant INTERNAL_WIDTH = 1;
  uint8 public constant INTERNAL_BOUNDARY = ROLE_BOUNDARY - INTERNAL_WIDTH;
  uint8 public constant COUNTER_WIDTH = 32;
  uint256 public constant TEAM_MASK = (2**TEAM_WIDTH - 1) << TEAM_BOUNDARY;
  uint256 public constant TYPE_MASK = (2**TYPE_WIDTH - 1) << TYPE_BOUNDARY;
  uint256 public constant REQUIREMENT_MASK = (2**REQUIREMENT_WIDTH - 1) << REQUIREMENT_BOUNDARY;
  uint256 public constant REPETITION_MASK = (2**REPETITION_WIDTH - 1) << REPETITION_BOUNDARY;
  uint256 public constant UNIQUENESS_MASK = (2**UNIQUENESS_WIDTH - 1) << UNIQUENESS_BOUNDARY;
  uint256 public constant ROLE_MASK = (2**ROLE_WIDTH - 1) << ROLE_BOUNDARY;
  uint256 public constant INTERNAL_MASK = (2**INTERNAL_WIDTH - 1) << INTERNAL_BOUNDARY;
  uint256 public constant COUNTER_MASK = (2**COUNTER_WIDTH - 1);

  // 13 publicity Bits defining groups to which
  // the the token information is accessible

  // Error: Constants of non-value type not yet implemented.
  // uint256[] public constant TEAM = []

  uint256 public constant TEAM_1 = 2**0 << TEAM_BOUNDARY;
  uint256 public constant TEAM_2 = 2**1 << TEAM_BOUNDARY;
  uint256 public constant TEAM_3 = 2**2 << TEAM_BOUNDARY;
  uint256 public constant TEAM_4 = 2**3 << TEAM_BOUNDARY;
  uint256 public constant TEAM_5 = 2**4 << TEAM_BOUNDARY;
  uint256 public constant TEAM_6 = 2**5 << TEAM_BOUNDARY;
  uint256 public constant TEAM_7 = 2**6 << TEAM_BOUNDARY;
  uint256 public constant TEAM_8 = 2**7 << TEAM_BOUNDARY;
  uint256 public constant TEAM_9 = 2**8 << TEAM_BOUNDARY;
  uint256 public constant TEAM_A = 2**9 << TEAM_BOUNDARY;
  uint256 public constant TEAM_B = 2**10 << TEAM_BOUNDARY;
  uint256 public constant TEAM_C = 2**11 << TEAM_BOUNDARY;
  uint256 public constant TEAM_D = 2**12 << TEAM_BOUNDARY;

  // There are four modes for how the publicity
  // is interpreted.
  uint256 public constant REQUIRE_ALL   = 1 << REQUIREMENT_BOUNDARY;
  uint256 public constant REQUIRE_NONE  = 2 << REQUIREMENT_BOUNDARY;
  uint256 public constant REQUIRE_ONE   = 3 << REQUIREMENT_BOUNDARY;
  uint256 public constant USE_ONCE      = 1 << REPETITION_BOUNDARY;
  uint256 public constant USE_UNLIMITED = 2 << REPETITION_BOUNDARY;
  uint256 public constant USE_UNTIL     = 3 << REPETITION_BOUNDARY;
  uint256 public constant USE_AFTER     = 4 << REPETITION_BOUNDARY;
  uint256 public constant UNIQUE        = 1 << UNIQUENESS_BOUNDARY;


  // Gating tokens control access to contract
  // functionality.
  uint256 public constant GATING_TYPE        = 1 << TYPE_BOUNDARY;
  // Membership tokens represent being given
  // access to a team's information.
  uint256 public constant MEMBERSHIP_TYPE    = 2 << TYPE_BOUNDARY;
  // Address tokens have a lower 160 Bits which
  // correspond to an Ethereum address.
  uint256 public constant ADDRESS_TYPE       = 3 << TYPE_BOUNDARY; // ¿?
  // Time tokens are divisible tokens to be
  // distributed in response to activities
  // that require time in proportion to that
  // time. I.e. 1 for 1 hour of pair programming.
  uint256 public constant RECORDED_TIME_TYPE = 4 << TYPE_BOUNDARY;
  // Whereas recorded time is directly viewable,
  // vouched time is represented by a summary of what
  // was accomplished and how long it took. As with
  // recorded time, the token is distributed proportionally
  // to the time spent.
  uint256 public constant VOUCHED_TIME_TYPE  = 5 << TYPE_BOUNDARY;
  // A recording is a reactable event.
  uint256 public constant RECORDING_TYPE     = 6 << TYPE_BOUNDARY;
  // A review is a set of reactions to a recording.
  uint256 public constant REVIEW_TYPE        = 7 << TYPE_BOUNDARY;
  // 20 bytes of a hash of a reaction, be it a word or
  // image along with a signed byte representing the weight.
  // This may be too much info for a token or even to have in
  // the contract…
  uint256 public constant REACTION_TYPE      = 8 << TYPE_BOUNDARY;
  // Vanilla NFTs are created by using `create` to reserve
  // an id.
  uint256 public constant VANILLA_TYPE       = 9 << TYPE_BOUNDARY;
  // Disables role check
  uint256 public constant DISABLING_TYPE     = 10 << TYPE_BOUNDARY;

  // Experimental tokens are meant to demonstrate
  // properties of the system. The flag may be used
  // in conjunction with other types.
  uint256 public constant EXPERIMENTAL_TYPE = 2**TYPE_WIDTH << TYPE_BOUNDARY;

  // Bits that can be set, but shouldn't affect matching
  uint256 public constant NO_MATCH_FLAGS = USE_ONCE | INTERNAL_MASK;
}





contract BulkDisbursableNFTs is
 Initializable, ERC1155Upgradeable, OwnableUpgradeable,
 ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable, UUPSUpgradeable
{
  struct CheckableList {
    uint256[] entries;
    mapping (uint256 => uint256) indices;
  }

  // Note that because the contract is proxied, the
  // storage members and order cannot change
  string public name;
  string public symbol;

  mapping (uint256 => string) private uris;

  // To allow enumeration of all the tokens, a list is kept.
  CheckableList private tokens;

  // Permissioning tokens are tracked in a separate list.
  CheckableList private permissions;

  // To allow listing the tokens held by a user, a map
  // of owner to a list of tokens is maintained.
  mapping (address => CheckableList) private owned;

  // To allow listing the owners of a token, a map
  // of owner to a list of tokens is maintained.
  mapping (uint256 => address[]) private owners;

  mapping (uint256 => uint256) public uintValues;
  mapping (uint256 => int256) public intValues;

  /// @custom:oz-upgrades-unsafe-allow constructor
  constructor() initializer {}

  function initialize(
    string calldata _name,
    string calldata _symbol
  )
    initializer
    public
  {
    __Ownable_init();
    __ERC1155_init("Error: Single Token URI Not Used");
    __ERC1155Burnable_init();
    __ERC1155Supply_init();
    __UUPSUpgradeable_init();

    // Token id 0 is reserved, so it is skipped.
    tokens.entries.push(0);

    setDescription(_name, _symbol);
  }

  function setDescription(
    string calldata _name,
    string calldata _symbol
  )
    public
    virtual
    onlyOwner
  {
    name = _name;
    symbol = _symbol;
  }

  /**
   * @notice This function returns the gating token with the given
   * role. It is possible for gating tokens to operate only on a
   * single other token, but this method checks id zero which
   * represents the role applies to all tokens.
   */
  function roleToken(Roles.Role role)
    public
    virtual
    view
    returns (uint256 id)
  {
    id = roleToken(role, 0);
  }

  /**
   * @notice Creates the gating token for oprtations on a single
   * other token, given by id.
   */
  function roleToken(
    Roles.Role role,
    uint256 index
  )
    public
    virtual
    view
    returns (uint256 id)
  {
    require(
      index < 2**Bits.COUNTER_WIDTH,
      string(abi.encodePacked(
        "Indices can be at most ",
        Strings.toString(Bits.COUNTER_WIDTH),
        " bits."
      ))
    );

    id = (
      Bits.GATING_TYPE
      | (uint(role) << Bits.ROLE_BOUNDARY)
      | (role == Roles.Role.Superuser ? Bits.UNIQUENESS_MASK : 0)
      | index
    );
  }

  /**
   * @notice Checks if the message sender has the specified gating
   * role.
   */
  function hasRole(Roles.Role role)
    public
    virtual
    view
    returns (bool has)
  {
    has = hasRole(role, _msgSender());
  }

  /**
   * @notice Checks if the specified user has the given gating
   * role.
   */
  function hasRole(
    Roles.Role role,
    address user
  )
    public
    virtual
    view
    returns (bool has)
  {
    has = hasRole(role, user, 0);
  }

  /**
   * @notice Checks if the message sender has the specified gating
   * role for the listed token id.
   */
  function hasRole(
    Roles.Role role,
    uint256 id
  )
    public
    virtual
    view
    returns (bool has)
  {
    has = hasRole(role, _msgSender(), id);
  }

  /**
   * @notice Checks if the specified user has the given gating
   * role for the listed token id.
   */
  function hasRole(
    Roles.Role role,
    address user,
    uint256 id
  )
    public
    virtual
    view
    returns (bool has)
  {
    has = gateToken(role, user, tokens.indices[id]) != 0;
  }

  function gateToken(
    Roles.Role role,
    address user,
    uint256 index
  )
    public
    virtual
    view
    returns (uint256 id)
  {
    uint256 gate = roleToken(role);

    uint256 disablingId = gate | Bits.DISABLING_TYPE | index;
    if(tokens.indices[disablingId] != 0) {
      return disablingId;
    }

    uint256[8] memory ids = [
      gate | Bits.USE_ONCE | Bits.INTERNAL_MASK | index,
      gate | Bits.USE_ONCE | index,
      gate | Bits.USE_ONCE | Bits.INTERNAL_MASK,
      gate | Bits.USE_ONCE,
      gate | Bits.INTERNAL_MASK | index,
      gate | Bits.INTERNAL_MASK,
      gate | index,
      gate
    ];
    for(uint8 i = 0; i < ids.length; i++) {
      if(balanceOf(user, ids[i]) > 0) {
        return ids[i];
      }
    }
    id = 0;
  }

  /**
   * @notice Checks if the message sender holds a Superuser token
   * or is the contract owner.
   */
  function isSuper()
    public
    virtual
    view
    returns (bool superuser)
  {
    superuser = isSuper(_msgSender(), 0);
  }

  /**
   * @notice Checks if the specified user holds a Superuser token
   * or is the contract owner.
   */
  function isSuper(address user)
    public
    virtual
    view
    returns (bool superuser)
  {
    superuser = isSuper(user, 0);
  }
  
  /**
   * @notice Checks if the specified user holds a Superuser token
   * or is the contract owner.
  */
  function isSuper(uint256 tokenId)
    public
    virtual
    view
    returns (bool superuser)
  {
    superuser = isSuper(_msgSender(), tokenId);
  }

  /**
   * @notice Checks if the specified user holds a Superuser token
   * or is the contract owner.
  */
  function isSuper(address user, uint256 tokenId)
    public
    virtual
    view
    returns (bool superuser)
  {
    superuser = (
      hasRole(Roles.Role.Superuser, user, tokenId)
      || user == owner()
    );
  }

  /**
   * @notice Create an all-token gating token for the listed
   * role given to the specified user.
   */
  function grantRole(
    Roles.Role role,
    address user
  )
    public
    virtual
  {
     grantRole(role, user, 0, false);
  }

  /**
   * @notice Create an all-token gating token for the listed
   * role given to the specified user.
   */
  function grantRole(
    Roles.Role role,
    address user,
    bool singleUse
  )
    public
    virtual
  {
     grantRole(role, user, 0, singleUse);
  }

  /**
   * @notice Create an gating token for the given listed
   * role given to the specified user.
   */
  function grantRole(
    Roles.Role role,
    address user,
    uint256 id
  )
    public
    virtual
  {
    grantRole(role, user, id, false);
  }

  /**
   * @notice Create an gating token for the given listed
   * role given to the specified user.
   */
  function grantRole(
    Roles.Role role,
    address user,
    uint256 id,
    bool singleUse
  )
    public
    virtual
  {
    _grantRole(role, user, id == 0 ? 0 : tokenIndex(id), singleUse, false);
  }


  function _grantRole(
    Roles.Role role,
    address user,
    uint256 index,
    bool singleUse,
    bool local
  )
    internal
    virtual
  {
    if(!local) {
      if(role == Roles.Role.Superuser) {
        require(
          isSuper(tokens.entries[index]),
          "You must be a Superuser to create other Superusers."
        );
      } else {
        require(
          hasRole(
            Roles.Role.Caster, index) 
            || isSuper(tokens.entries[index]
          ),
          "You must have the Caster role to assign new roles."
        );
      }
    }
    uint256 id = (
      roleToken(role, index)
      | (local ? Bits.INTERNAL_MASK : 0)
      | (singleUse ? Bits.USE_ONCE : 0)
    );
    _setMax(id, getMax(id) + 1, true);
    _mint(user, id, 1, "");
  }

  function disableRole(Roles.Role toDisable, uint256 disablingIndex)
    public
  {
    uint256 id = roleToken(toDisable, disablingIndex);
    id |= Bits.DISABLING_TYPE;

    uint256 index = tokens.entries.length;
    tokens.entries.push(id);
    tokens.indices[id] = index;
  }
  /**
   * @return metadata The metadata URI associated with the given token.
   */
  function uri(uint256 id)
    public
    view
    virtual
    override
    returns (string memory metadata)
  {
    metadata = uris[id];

    if(bytes(metadata).length == 0) {
      uint256 tokenType = id & Bits.TYPE_MASK;
      if(
        tokenType == Bits.GATING_TYPE
        || tokenType == Bits.GATING_TYPE | Bits.DISABLING_TYPE
      ) {
        uint256 generic = (
          id & (
            ~Bits.COUNTER_MASK
            & ~Bits.NO_MATCH_FLAGS
            & ~Bits.TYPE_MASK
          )
          | Bits.GATING_TYPE
        );
        metadata = uris[generic];
      }
    }
  }

  /**
   * @notice Set the metadata URI for the given token.
   */
  function setURI(
    uint256 id,
    string calldata newURI
  )
    public
    virtual
  {
    require(
      hasRole(Roles.Role.Configurer, id) || isSuper(id),
      "You must have a Configurer token to change metadata."
    );
    uris[id] = newURI;
    emit URI(newURI, id);
  }

  /**
   * @notice Event fired when a new token type is created.
   */
  event Created(uint256 id, address controller);

  /**
   * @notice Call `create` with the message sender as the
   * maintainer.
   * @return id The reserved token id.
   */
  function create()
    public
    virtual
    returns (uint256 id)
  {
    Roles.Role[] memory roles = new Roles.Role [](0);
    id = create(_msgSender(), roles, roles);
  }

  /**
   * @notice Call `create` with the message sender as the
   * maintainer.
   * @return id The reserved token id.
   */
  function create(
    Roles.Role[] memory grants,
    Roles.Role[] memory disables
  )
    public
    virtual
    returns (uint256 id)
  {
    id = create(_msgSender(), grants, disables);
  }

  /**
   * @notice Reserve a new token id & mint gating tokens
   * with the Minter, Configurer, & Limiter for the
   * listed maintainer.
   * @return id The reserved token id.
   */
  function create(
    address maintainer,
    Roles.Role[] memory grants,
    Roles.Role[] memory disables
  )
    public
    virtual
    returns (uint256 id)
  {
    uint256 index = tokens.entries.length;
    id = Bits.VANILLA_TYPE | index;

    require(
      hasRole(Roles.Role.Creator, id) || isSuper(id),
      "You must have a Creator token to create new tokens."
    );

    tokens.entries.push(id);
    tokens.indices[id] = index;
    for(uint256 i = 0; i < grants.length; i++) {
      _grantRole(grants[i], maintainer, index, false, true);
    }
    for(uint256 i = 0; i < disables.length; i++) {
      disableRole(disables[i], index);
    }
    setPerUserMax(id, 1);

    emit Created(id, maintainer);
    uint256 gate = gateToken(
      Roles.Role.Creator, _msgSender(), 0
    );
    if(gate & Bits.USE_ONCE == Bits.USE_ONCE) {
      _burn(_msgSender(), gate, 1);
    }
    setPerUserMax(id,1);
  }

  /**
   * @notice Create new tokens instances.
   * @return minted If a token instance was actually created.
   * If the token to be minted is unique & the user already
   * has one, the function will succeed and return `false`.
   */
  function mint(
    address recipient,
    uint256 id,
    uint256 amount,
    bytes memory data
  )
    public
    virtual
    returns (bool minted)
  {
    if((id & Bits.UNIQUE) == Bits.UNIQUE && balanceOf(recipient, id) > 0) {
      return false;
    }
    _mint(recipient, id, amount, data);
    return true; // Also a transfer event is conditionally emitted
  }

  /**
   * @notice Mint a given token to a group of
   * addresses.
   */
  function mint(
    address[] memory to,
    uint256 id,
    bytes memory data
  )
    public
    virtual
  {
    for(uint256 i = 0; i < to.length; ++i) {
      mint(to[i], id, 1, data);
    }
  }

  function getMax(uint256 id) public view returns (int64 max) {
    uint256 key = uint256(keccak256(abi.encodePacked("max", id)));
    max = int64(intValues[key]);
  }

  /**
   * @notice Set the maximum number of tokens
   * allowed to be minted. Trumps the Minter role.
   */
  function setMax(uint256 id, int64 max) public {
    _setMax(id, max, false);
  }

  /**
   * @notice Set the maximum number of tokens
   * allowed to be minted. Trumps the Minter role.
   */
  function _setMax(uint256 id, int64 max, bool local) internal virtual {
    if(!local) {
      require(
        hasRole(Roles.Role.Limiter, id) || isSuper(id),
        "You must have a Limiter token to change quantity."
      );
    }
    uint256 key = uint256(keccak256(abi.encodePacked("max", id)));
    intValues[key] = max;
  }

  /**
   * @notice Set the maximum number of tokens
   * allowed to be minted. Trumps the Minter role.
   */
  function getPerUserMax(uint256 id) public view returns (int256 max) {
    uint256 key = uint256(keccak256(abi.encodePacked("per user max", id)));
    max = intValues[key]; 
  }
  
  /**
   * @notice Set the maximum number of tokens
   * allowed to be minted. Trumps the Minter role.
  */
  function setPerUserMax(uint256 id, int64 max) public {
    uint256 key = uint256(keccak256(abi.encodePacked("per user max", id)));
    intValues[key] = max;
  }

  function burn(
    address owner,
    uint256 id,
    uint256 quantity
  )
    public
    virtual
    override
  {
    require(
      hasRole(Roles.Role.Burner, owner, id) || isSuper(owner, id),
      "You must have a Burner token to destroy tokens."
    );
    _burn(owner, id, quantity);
  }

  /**
   * @return count The number of types of tokens.
   */
  function typeSupply()
    public
    view
    virtual
    returns (uint256 count)
  {
    count = tokens.entries.length - 1;
  }

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
      "ERC-1155 Enumerable: token index out of bounds"
    );
    id = owned[owner].entries[index];
  }

  function tokenByIndex(uint256 index)
    public
    view
    virtual
    returns (uint256 id)
  {
    require(
      index > 0,
      "ERC-1155 Enumerable: tokens indexed from 1"
    );
    require(
      index <= tokens.entries.length,
      "ERC-1155 Enumerable: token index out of bounds"
    );

    id = tokens.entries[index];
  }

  function tokenIndex(uint256 id)
    public
    view
    virtual
    returns (uint256 index)
  {
    index = tokens.indices[id];
    require(
      index != 0,
      "The requested token does not exist."
    );
  }

  // The following functions are overrides required by Solidity.
  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  )
    internal
    override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
  {
    for(uint256 i = 0; i < ids.length; ++i) {
      if(!isSuper(ids[i])) {
        if(ids[i] & Bits.INTERNAL_MASK != Bits.INTERNAL_MASK) {
          Roles.Role needed = (
            from == address(0) ? (
              Roles.Role.Minter
            ) : (
              Roles.Role.Transferer
            )
          );
          if(needed == Roles.Role.Minter) {
            int256 max = getMax(ids[i]);
            // it should be possible to fool this by splitting the mint
            // up into separate entries with the same id
            require(
              max < 0 || int256(totalSupply(ids[i]) + amounts[i]) <= max,
              "Maximum mint allowance exceeded."
            );
            int256 perUserMax = getPerUserMax(ids[i]);
            require(
              perUserMax < 0 || int256(balanceOf(to, ids[i]) + amounts[i]) <= perUserMax,
              "Maximum per user allowance exceeded."
            );
            if(ids[i] & Bits.TYPE_MASK == Bits.GATING_TYPE) {
              require(
                hasRole(Roles.Role.Caster, ids[i]),
                "You must have a Caster token to mint token gates."
              );
            } else {
              uint256 gate = gateToken(needed, _msgSender(), tokenIndex(ids[i]));
              require(
                hasRole(needed, ids[i]),
                "You must have a Minter token to generate tokens."
              );
              if(gate & Bits.USE_ONCE > 0) {
                _burn(_msgSender(), gate, 1);
              }
            }
          } else { // Transferer (or Burner)
            if(to != address(0)) {
              require(
                hasRole(needed, ids[i]),
                "You must have a Transferer token to transfer tokens."
              );
            }
          }
        }
      }
    }
    if(to != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(tokens.indices[ids[i]] == 0) {
          tokens.entries.push(ids[i]);
          tokens.indices[ids[i]] = tokens.entries.length;
        }
        if(owned[to].indices[ids[i]] == 0) {
          owned[to].entries.push(ids[i]);
          owned[to].indices[ids[i]] = owned[to].entries.length;
        }
      }
    }
    if(from != address(0)) {
      for(uint256 i = 0; i < ids.length; ++i) {
        if(balanceOf(from, ids[i]) <= amounts[i]) {
          uint256 index = owned[from].indices[ids[i]] - 1;
          delete owned[from].entries[index];
          delete owned[from].indices[ids[i]];
        }
      }
    } 
    super._beforeTokenTransfer(
      operator, from, to, ids, amounts, data
    );
  }

  function _authorizeUpgrade(address)
    internal
    view
    override
  {
    require(
      hasRole(Roles.Role.Maintainer) || isSuper(),
      "You must have a Maintainer token to upgrade the contract."
    );
  }
}