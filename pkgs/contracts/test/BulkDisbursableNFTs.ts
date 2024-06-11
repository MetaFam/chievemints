import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
// @ts-ignore
import chaiMatch from 'chai-match'
import { ethers as Ethers, Signer } from 'ethers'
import { ethers, upgrades } from 'hardhat'

chai.use(chaiAsPromised)
chai.use(chaiMatch)

let owner: SignerWithAddress
let creator: SignerWithAddress
let token: Ethers.Contract
let bits: Ethers.Contract
let roles: Ethers.Contract

const transact = async (
  { sender = owner, method, args = [] }:
  { sender?: any, method: string, args?: Array<unknown> }
) => {
  const tx = await token.connect(sender)[method](...args)
  return await tx?.wait()
}

beforeEach(async () => {
  [owner, creator] = await ethers.getSigners()

  const Token = await ethers.getContractFactory(
    'BulkDisbursableNFTs'
  )
  const Bits = await ethers.getContractFactory(
    'Bits'
  )
  const Roles = await ethers.getContractFactory(
    'Roles'
  )
  token = await upgrades.deployProxy(
    Token,
    ['MetaGame ’Chievemints', 'MG’s 🏆s'],
    { kind: 'uups', timeout: 10 * 60 * 1000 },
  )
  bits = await Bits.deploy()
  roles = await Roles.deploy()
})


describe('The Token Contract', () => {
  it(
    'should create four tokens when requesting.',
    async () => {
      expect(await token.owner()).to.equal(owner.address)

      const [
        TYPE_WIDTH, TYPE_BOUNDARY,
        GATING_TYPE, VANILLA_TYPE,
        ROLE_WIDTH, ROLE_BOUNDARY,
        MINTER_ROLE, CONFIGURER_ROLE, LIMITER_ROLE,
      ] = [
        await bits.TYPE_WIDTH(),
        await bits.TYPE_BOUNDARY(),
        await bits.GATING_TYPE(),
        await bits.VANILLA_TYPE(),
        await bits.ROLE_WIDTH(),
        await bits.ROLE_BOUNDARY(),
        await roles.roleIndexForName('Minter'),
        await roles.roleIndexForName('Configurer'),
        await roles.roleIndexForName('Limiter'),
      ]
      .map((val) => BigInt(val))

      const tx = await token['create(address,uint8[],uint8[])'](
        owner.address,
        [MINTER_ROLE, CONFIGURER_ROLE, LIMITER_ROLE],
        [],
      )
      const receipt = await tx.wait()
      let event = receipt.events.find(
        (evt: Ethers.Event) => evt.event === 'Created'
      )

      expect(event).to.not.be.undefined

      const [createdId, _controller] = event.args

      expect(createdId).to.equal(VANILLA_TYPE + 1n)

      expect(await token.typeSupply()).to.equal(4)

      const tokens = await Promise.all(
        Array.from({ length: 4 }, (_, i) => i)
        .map(async (idx) => (
          (await token.tokenByIndex(idx + 1)).toBigInt()
        ))
      )

      const vanilla = tokens[0]
      const gates = tokens.slice(1)

      expect(vanilla).to.equal(createdId)

      await Promise.all(gates.map(async (tkn) => (
        (tkn & ((2n**TYPE_WIDTH) - 1n)) === GATING_TYPE
      )))

      const setRoles = await Promise.all(
        gates.map(async (tkn) => (
          (tkn >> ROLE_BOUNDARY) & 2n**ROLE_WIDTH - 1n
        ))
      )

      expect(setRoles).to.have.members(
        [MINTER_ROLE, CONFIGURER_ROLE, LIMITER_ROLE]
      )
    }
  )

  it(
    'it allows for a Superuser to create tokens.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')

      await expect(
        transact({ sender: creator, method: 'create()' }),
        'attempts to `create()` w/o a Creator token should fail',
      )
      .to.eventually.be.rejected
      .then((error) => {
        expect(error.message).to.match(/must have a Creator token/)
      })

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      expect(
        await token['hasRole(uint8,address)'](creatorRole, creator.address),
        'after a generic role grant, the user will have the role'
      )
      .to.be.true

      expect(
        await token.connect(creator)['hasRole(uint8,uint256)'](creatorRole, 1),
        'with a generic role grant, specific permissions are granted',
      )
      .to.be.true

      const MINTER_ROLE = await roles.roleIndexForName("Minter")

      await expect(
        transact({
          sender: creator,
          method: 'create(uint8[],uint8[])',
          args: [[MINTER_ROLE], []],
        }),
        'with a generic Creator token, a user can `create()`'
      )
      .to.eventually.be.fulfilled

      const firstGate = (await token.tokenByIndex(3)).toBigInt()
      const minterRole = await roles.roleIndexForName("Minter")
      const minterOfNum2 = (
        await token['roleToken(uint8,uint256)'](minterRole, 2)
      ).toBigInt()
      const internalFlag = (await bits.INTERNAL_MASK()).toBigInt()

      expect(
        firstGate,
        'created gating token to be a specific minting permission',
      ).to.equal(minterOfNum2 | internalFlag)

      const genericMinter = (
        await token['roleToken(uint8)'](minterRole)
      ).toBigInt()

      await transact({
        method: 'setURI(uint256,string)',
        args: [genericMinter, 'test'],
      })

      const minterURI = await token.uri(genericMinter)

      expect(
        minterURI,
        'generic URI to be set',
      ).to.equal('test')

      expect(
        await token.uri(firstGate),
        'specific gating token to return generic URI',
      ).to.equal(minterURI)
    }
  )

  it(
    'retrieves generic metadata.',
    async () => {
      const minterRole = await roles.roleIndexForName('Minter')
      const minterGate = await token['roleToken(uint8)'](minterRole)

      await transact({
        method: 'setURI(uint256,string)',
        args: [minterGate, 'test'],
      })

      expect(
        await token.uri(minterGate),
        'the generic gating token to have the specified URI',
      ).to.equal('test')

      const specificGate = await token['roleToken(uint8,uint256)'](minterRole, 2)

      expect(
        specificGate.toBigInt() - minterGate.toBigInt(),
        'there to be a difference in the generic & specific token ids'
      ).to.equal(2n)

      expect(
        await token.uri(specificGate),
        'the single affect token to have the same URI',
      ).to.equal('test')

      expect(
        await token.typeSupply(),
        'the number of token types to be zero',
      ).to.equal(0)

      expect(
        await token['hasRole(uint8,address)'](minterRole, owner.address),
        'a user not granted a role not to have it',
      ).to.be.false

      const creatorRole = await roles.roleIndexForName('Creator')
      const creatorGate = await token['roleToken(uint8)'](creatorRole)

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      expect(
        await token.balanceOf(creator.address, creatorGate),
        'a user to have a gating token when granted a role'
      ).to.equal(1)

      expect(
        await token['hasRole(uint8,address)'](creatorRole, creator.address),
        'a user granted a role to have it',
      ).to.be.true

      await transact({ sender: creator, method: 'create()' })

      await expect(
        transact({ sender: creator, method: 'create()' }),
        'a user with a Creator role to be able to create new types',
      ).to.eventually.be.fulfilled
    }
  )

  it(
    'destroys a single use token after use',
    async () => {
      const minterRole = await roles.roleIndexForName('Minter')
      const tx = await (
        token['create(uint8[],uint8[])']([minterRole], [])
      )
      const receipt = await tx.wait()
      let event = receipt.events.find(
        (evt: Ethers.Event) => evt.event === 'Created'
      )

      expect(event).to.not.be.undefined

      const [createdId, _controller] = event.args
      const counterMask = await bits.COUNTER_MASK()
      const tokenIndex = createdId.toBigInt() & counterMask.toBigInt()

      expect(tokenIndex).to.equal(1n)

      const minterGate = await token.tokenByIndex(2)

      await token.burn(owner.address, minterGate, 1)

      expect(await token.totalSupply(minterGate)).to.equal(0)

      const minterToken = (
        await token['roleToken(uint8,uint256)'](minterRole, tokenIndex)
      )
      const singleUse = await bits.USE_ONCE()
      const singleMinter = minterToken.toBigInt() | singleUse.toBigInt()

      await transact({
        method: 'mint(address,uint256,uint256,bytes)',
        args: [creator.address, singleMinter, 1, []],
      })

      expect(await token.balanceOf(creator.address, singleMinter))
      .to.equal(1)

      expect(await token['hasRole(uint8,address,uint256)'](
        minterRole, creator.address, createdId
      )).to.be.true

      await token.setMax(createdId, 100)
      await token.setPerUserMax(createdId, 100)

      await transact({
        sender: creator,
        method: 'mint(address,uint256,uint256,bytes)',
        args: [creator.address, createdId, 10, []],
      })

      expect(await token['hasRole(uint8,address,uint256)'](
        minterRole, creator.address, tokenIndex
      )).to.be.false
    }
  )

  it(
    'allows a creator to mint.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')
      const creatorGate = await token['roleToken(uint8)'](creatorRole)

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      expect(
        await token.balanceOf(creator.address, creatorGate),
        'a user to have a gating token when granted a role'
      ).to.equal(1)

      expect(
        await token['hasRole(uint8,address)'](creatorRole, creator.address),
        'a user granted a role to have it',
      ).to.be.true

      const minterRole = await roles.roleIndexForName('Minter')
      const lastIndex = (await token.typeSupply()).toBigInt()
      await transact({
        sender: creator,
        method: 'create(uint8[],uint8[])',
        args: [[minterRole], []],
      })
      expect((await token.typeSupply()).toBigInt() - lastIndex).to.equal(2n)
      const createdId = await token.tokenByIndex(lastIndex + 1n)

      await token.setMax(createdId, 6)
      await token.setPerUserMax(createdId, 6)

      await expect(
        transact({
          sender: creator,
          method: 'mint(address,uint256,uint256,bytes)',
          args: [creator.address, createdId, 5, []]
        }),
        'a user with a Minter role to be able to create new instances',
      ).to.eventually.be.fulfilled

      expect(
        await token.balanceOf(creator.address, createdId),
        'minted tokens to show up in the user’s balance'
      ).to.equal(5)

      await expect(
        transact({
          sender: creator,
          method: 'mint(address,uint256,uint256,bytes)',
          args: [creator.address, createdId, 5, []]
        }),
        'the max mintable limit to prevent minting beyond it’s allowance',
      ).to.eventually.be.rejected

      expect(
        await token.balanceOf(creator.address, createdId),
        'minted tokens to remain the same when past the max'
      ).to.equal(5)
    }
  )

  it(
    'permits unrestricted transfers.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')
      const creatorGate = await token['roleToken(uint8)'](creatorRole)

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      expect(
        await token.balanceOf(creator.address, creatorGate),
        'a user to have a gating token when granted a role'
      ).to.equal(1)

      expect(
        await token['hasRole(uint8,address)'](creatorRole, creator.address),
        'a user granted a role to have it',
      ).to.be.true

      const minterRole = await roles.roleIndexForName('Minter')
      const lastIndex = (await token.typeSupply()).toBigInt()
      await transact({
        sender: creator,
        method: 'create(uint8[],uint8[])',
        args: [[minterRole], []],
      })
      expect((await token.typeSupply()).toBigInt() - lastIndex).to.equal(2n)
      const createdIndex = lastIndex + 1n
      const createdId = await token.tokenByIndex(createdIndex)

      await token.setMax(createdId, 6)
      await token.setPerUserMax(createdId, 6)

      await expect(
        transact({
          sender: creator,
          method: 'mint(address,uint256,uint256,bytes)',
          args: [creator.address, createdId, 5, []]
        }),
        'a user with a Creator role to be able to create new types',
      ).to.eventually.be.fulfilled

      expect(
        await token.balanceOf(creator.address, createdId),
        'a user to have a gating token when granted a role'
      ).to.equal(5)

      const transfererRole = await roles.roleIndexForName('Transferer')
      await token.disableRole(
        transfererRole, createdIndex
      )
      await transact({
        sender: creator,
        method: 'safeTransferFrom(address,address,uint256,uint256,bytes)',
        args: [creator.address, owner.address, createdId, 2, []],
      })
    }
  )

  it(
    'can list available roles.',
    async () => {
      const numRoles = await roles.roleIndexForName('ReservedLast')
      for (let i = 1; i <= numRoles; i++) {
        const role = await roles.roleNameByIndex(i)
      }
    }
  )

  it(
    'destroys a single-use creation token.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')
      let creatorToken = await token['roleToken(uint8)'](creatorRole)
      creatorToken = creatorToken.toBigInt()
      const USE_ONCE = (await bits.USE_ONCE()).toBigInt()
      creatorToken |= USE_ONCE
      await token['mint(address,uint256,uint256,bytes)'](
        creator.address, creatorToken, 1, []
      )
      const receipt = await transact({
        sender: creator,
        method: 'create()',
        args: [],
      })
      let event = receipt.events.find(
        (evt: Ethers.Event) => evt.event === 'Created'
      )

      const [createdId, _controller] = event.args
      const balance = (
        await token.balanceOf(creator.address, creatorToken)
      )
      expect(balance).to.be.equal(0)
    }
  )

  it(
    'can set and get a maximum allowance.',
    async () => {
      
      const receipt = await transact({
        sender: owner,
        method: 'create()',
        args: [],
      })
      let event = receipt.events.find(
        (evt: Ethers.Event) => evt.event === 'Created'
      )

      const [createdId] = event.args

      await token['mint(address,uint256,uint256,bytes)'](
        creator.address, createdId, 1, []
      )

      const max = 15
      await token['setMax(uint256,int64)'](createdId, max)
      const ret = await token.getMax(createdId)

      expect(ret).to.equal(max)
    }
  )

  it(
    'permits unrestricted minting.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')
      const creatorGate = await token['roleToken(uint8)'](creatorRole)

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      expect(
        await token.balanceOf(creator.address, creatorGate),
        'a user to have a gating token when granted a role'
      ).to.equal(1)

      expect(
        await token['hasRole(uint8,address)'](creatorRole, creator.address),
        'a user granted a role to have it',
      ).to.be.true

      const minterRole = await roles.roleIndexForName('Minter')
      const lastIndex = (await token.typeSupply()).toBigInt()
      await transact({
        sender: creator,
        method: 'create(uint8[],uint8[])',
        args: [[], [minterRole]],
      })
      expect((await token.typeSupply()).toBigInt() - lastIndex).to.equal(2n)
      const createdId = await token.tokenByIndex(lastIndex + 1n)
      const disablingId = await token.tokenByIndex(lastIndex + 2n)

      expect(
        await token['hasRole(uint8,uint256)'](minterRole, createdId),
        'a disabled role to show as present for all users',
      )
      .to.equal(true)

      await token.setMax(createdId, 5)
      await token.setPerUserMax(createdId, 5)

      await expect(
        transact({
          sender: creator,
          method: 'mint(address,uint256,uint256,bytes)',
          args: [creator.address, createdId, 10, []]
        }),
        'minting to be rejected when over the limit',
      ).to.eventually.be.rejected

      await expect(
        transact({
          sender: creator,
          method: 'mint(address,uint256,uint256,bytes)',
          args: [creator.address, createdId, 4, []]
        }),
        'minting to be allowed when disabled',
      ).to.eventually.be.fulfilled

      expect(
        await token.balanceOf(creator.address, createdId),
        'a user to have minted tokens'
      ).to.equal(4)

      const minterRoleToken = await token['roleToken(uint8)'](minterRole)
      await expect(
        token.setURI(minterRoleToken, 'ipfs://tokenmetadata.json'),
        'it’s possible to set the token URI for the minter role'
      ).to.eventually.be.fulfilled

      expect(
        await token.uri(disablingId),
        'disabling token URI isn’t unset',
      ).to.not.be.equal('')
    }
  )

  it.only(
    'returns the correct metadata.',
    async () => {
      const creatorRole = await roles.roleIndexForName('Creator')
      const creatorGate = await token['roleToken(uint8)'](creatorRole)

      await transact({
        method: 'grantRole(uint8,address)',
        args: [creatorRole, creator.address],
      })

      const minterRole = await roles.roleIndexForName('Minter')
      const maintainerRole = await roles.roleIndexForName('Maintainer')

      const lastIndex = (await token.typeSupply()).toBigInt()
      await transact({
        sender: creator,
        method: 'create(uint8[],uint8[])',
        args: [[maintainerRole], []],
      })
      expect((await token.typeSupply()).toBigInt() - lastIndex).to.equal(2n)
      const createdId = await token.tokenByIndex(lastIndex + 1n)
      expect(await token.uri(createdId)).to.equal('')
      await expect(
        token.setURI(createdId, 'ipfs://tokenmetadata.json'),
        'it’s possible to set the token URI for the minter role'
      ).to.eventually.be.fulfilled
      expect(await token.uri(createdId)).to.equal('ipfs://tokenmetadata.json')
    }
  )
})
