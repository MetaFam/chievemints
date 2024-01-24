import { useModal } from 'connectkit'
import {
  type PublicClient,
  type WalletClient,
  useAccount,
  useChainId,
} from 'wagmi'
import {
  Abi,
  createPublicClient, createWalletClient, custom, http,
} from 'viem'
import 'viem/window'
import type { Maybe } from '@/lib/types'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { NETWORKS } from '@/lib/networks'
import { contractNetwork } from '@/config'

export type ContractInterface = (
  (functionName: string, args?: Array<unknown>) => (
    Promise<unknown>
  )
)

export type Web3ContextType = {
  ensClient?: PublicClient
  contractClient?: PublicClient
  walletClient?: WalletClient
  roContract?: ContractInterface
  bitsLibrary?: ContractInterface
  rolesLibrary?: ContractInterface
  rwContract?: ContractInterface
  address?: string
  chainId?: number
  connect: () => Promise<void>
  disconnect: () => void
  connecting: boolean
  connected: boolean
  contract: {
    address: Maybe<string>
    abi: Maybe<Record<string, unknown>>
  }
}

export const Web3Context = (
  createContext<Web3ContextType>({
    connect: async () => {
      throw new Error('Unimplemented')
    },
    disconnect: () => {
      throw new Error('Unimplemented')
    },
    connecting: false,
    connected: false,
    contract: {
      address: null,
      abi: null,
    },
  })
)

export const useWeb3 = (): Web3ContextType => (
  useContext(Web3Context)
)

export const Web3ContextProvider: React.FC<{ children: ReactNode }> = (
  ({ children }) => {
    const [contractAddress, setContractAddress] = useState(null)
    const [abi, setABI] = useState(null)
    const [rolesAddress, setRolesAddress] = useState(null)
    const [rolesABI, setRolesABI] = useState(null)
    const [bitsAddress, setBitsAddress] = useState(null)
    const [bitsABI, setBitsABI] = useState(null)
    const { setOpen } = useModal()
    const {
      address,
      isConnecting: connecting,
      isConnected: connected,
    } = useAccount()
    const chainId = useChainId()

    const ensClient = useMemo(() => (
      createPublicClient({
        chain: NETWORKS.mainnet.wagmiChain,
        transport: http(),
      })
    ), [])

    const contractClient = useMemo(() => (
      createPublicClient({
        chain: NETWORKS.contract.wagmiChain,
        transport: http(),
      })
    ), [])

    const walletClient = useMemo(() => (
      createWalletClient({
        chain: NETWORKS.contract.wagmiChain,
        transport: custom(window.ethereum),
      })
    ), [])

    const contractReader = useCallback(
      (address: string, abi: Abi) => (
        async (functionName: string, args?: Array<unknown>) => {
          if(!address) {
            throw new Error('Contract address not set.')
          }
          if(!abi) {
            throw new Error('Contract ABI not set.')
          }
          console.debug('Reading contract…')
          return (
            contractClient.readContract({
              address: address as '0x{string}',
              abi,
              functionName,
              args,
            })
          )
        }
      ),
      [contractClient],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const roContract = useCallback(
      contractReader(contractAddress, abi),
      [contractReader, abi, contractClient],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const bitsLibrary = useCallback(
      contractReader(bitsAddress, bitsABI),
      [contractReader, bitsABI, bitsAddress],
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const rolesLibrary = useCallback(
      contractReader(rolesAddress, rolesABI),
      [contractReader, rolesAddress, rolesABI],
    )

    const rwContract = useCallback(
      async (functionName: string, args?: Array<unknown>) => {
        if(
          contractAddress
          && abi
          && chainId === NETWORKS.contract.chainId
        ) {
          console.debug({ walletClient})
          return walletClient.writeContract({
            account: address as '0x{string}',
            address: contractAddress as '0x{string}',
            chain: NETWORKS[chainId].wagmiChain,
            abi,
            functionName,
            args,
          })
        }
      },
      [
        contractAddress,
        abi,
        chainId,
        walletClient,
        address,
      ],
    )

    const disconnect = useCallback(() => {
      setContractAddress(null)
      setABI(null)
    }, [])

    const connect = useCallback(async () => {
      console.debug('Connecting…')
      setOpen(true)
    }, [setOpen])

    useEffect(() => {
      const libs = async () => {
        const chain = contractNetwork
        if(!contractAddress) {
          import(
            `../contracts/${chain}/BulkDisbursableNFTs.address.ts`
          )
          .then(({ default: addr }) => setContractAddress(addr))
        }
        if(!abi) {
          import (
            `../contracts/${chain}/BulkDisbursableNFTs.abi.ts`
          )
          .then(({ default: abi }) => setABI(abi))
        }
      }

      libs()
    }, [abi, contractAddress])

    useEffect(() => {
      const libs = async () => {
        const chain = contractNetwork
        import(`../contracts/${chain}/Bits.address.ts`)
        .then(({ default: addr }) => setBitsAddress(addr))

        import(`../contracts/${chain}/Bits.abi.ts`)
        .then(({ default: abi }) => setBitsABI(abi))

        import(`../contracts/${chain}/Roles.address.ts`)
        .then(({ default: addr }) => setRolesAddress(addr))

        import(`../contracts/${chain}/Roles.abi.ts`)
        .then(({ default: abi }) => setRolesABI(abi))
      }

      libs()
    }, [])

    return (
      <Web3Context.Provider
        value={{
          ensClient,
          contractClient,
          walletClient,
          roContract,
          bitsLibrary,
          rolesLibrary,
          rwContract,
          connect,
          disconnect,
          connecting,
          connected,
          address,
          chainId,
          contract: {
            address: contractAddress,
            abi,
          },
        }}
      >
        {children}
      </Web3Context.Provider>
    )
  }
)
