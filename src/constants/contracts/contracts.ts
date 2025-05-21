import {
  type Abi,
  type Address,
  type ContractFunctionArgs as WagmiContractFunctionArgs,
  type ContractFunctionName as WagmiContractFunctionName,
  isAddress,
} from 'viem'

import { NTTFactoryAbi } from '@/src/constants/contracts/abis/NTTFactory'
import { NTTManagerAbi } from '@/src/constants/contracts/abis/NTTManager'
import { NTTOwnerAbi } from '@/src/constants/contracts/abis/NTTOwner'
import { PeerTokenAbi } from '@/src/constants/contracts/abis/PeerToken'
import { WormholeTransceiverAbi } from '@/src/constants/contracts/abis/WormholeTransceiver'
import type { AllChainsIds } from '@/src/lib/networks.config'
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  berachain,
  blast,
  bsc,
  // celo,
  ink,
  mainnet,
  mantle,
  optimism,
  optimismSepolia,
  polygon,
  sepolia,
  // unichain,
  worldchain,
} from 'viem/chains'

import { solana } from '@reown/appkit/networks'

type OptionalAddresses = Partial<Record<AllChainsIds, Address>>
type ContractConfig<TAbi> = {
  abi: TAbi
  name: string
  address?: OptionalAddresses
}

/**
 * A collection of contracts to be used in the dapp with their ABI and addresses per chain.
 *
 * @dev The data required to configure this variable is:
 *  - `RequiredChainId` is mandatory in the address object.
 *  - IDs defined `ChainIds` can be added as well if necessary.
 */
const contracts = [
  {
    abi: PeerTokenAbi,
    name: 'PeerToken',
  },
  {
    abi: NTTOwnerAbi,
    name: 'NTTOwner',
  },
  {
    abi: NTTManagerAbi,
    name: 'NTTManager',
  },
  {
    abi: WormholeTransceiverAbi,
    name: 'WormholeTransceiver',
  },
  {
    abi: NTTFactoryAbi,
    name: 'NTTFactory',
    address: {
      [optimismSepolia.id]: '0x602ff647614c831bb91809a475f9910de8d50a0a',
      [baseSepolia.id]: '0x602ff647614c831bb91809a475f9910de8d50a0a',
      [arbitrumSepolia.id]: '0x602ff647614c831bb91809a475f9910de8d50a0a',
      [sepolia.id]: '0x602ff647614c831bb91809a475f9910de8d50a0a',

      [mainnet.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [optimism.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [arbitrum.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [base.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [polygon.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [blast.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [bsc.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [berachain.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [mantle.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      // [unichain.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [worldchain.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      // [celo.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [ink.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
      [solana.id]: '0x6a8894d2843b33a939d706dc8c54f42716cdddc1',
    },
  },
] as const satisfies ContractConfig<Abi>[]

/**
 * Retrieves all contracts.
 *
 * @returns {Array<ContractConfig>} An array containing the contracts' ABI and addresses.
 */
export const getContracts = () => contracts

export type ContractNames = (typeof contracts)[number]['name']

type ContractOfName<CN extends ContractNames> = Extract<(typeof contracts)[number], { name: CN }>
type AbiOfName<CN extends ContractNames> = ContractOfName<CN>['abi']

type AddressRecord<T extends ContractNames> = ContractOfName<T> extends {
  address: infer K
}
  ? K
  : never
type ChainIdOf<T extends ContractNames> = keyof AddressRecord<T>

export type ContractFunctionName<CN extends ContractNames> = WagmiContractFunctionName<
  AbiOfName<CN>,
  'nonpayable' | 'payable'
>

export type ContractFunctionArgs<
  CN extends ContractNames,
  MN extends ContractFunctionName<CN>,
> = WagmiContractFunctionArgs<AbiOfName<CN>, 'nonpayable' | 'payable', MN>

/**
 * Retrieves the contract information based on the contract name and chain ID.
 *
 * @param {string} name - The name of the contract.
 * @param {EvmChainsIds} chainId - The chain ID configured in the dApp. See networks.config.ts.
 * @returns {Contract} An object containing the contract's ABI and address.
 *
 * @throws If contract is not found.
 */
export const getContract = <
  ContractName extends ContractNames,
  ChainId extends ChainIdOf<ContractName>,
>(
  name: ContractName,
  chainId: ChainId,
) => {
  const contract = contracts.find((contract) => contract.name === name)

  if (!contract) {
    throw new Error(`Contract ${name} not found`)
  }

  // address key not present
  if (!('address' in contract)) {
    throw new Error(`Contract ${name} address not found}`)
  }

  const address = (contract.address as AddressRecord<ContractName>)[chainId]

  // address undefined
  if (!address) {
    throw new Error(`Contract ${name} address not found for chain ${chainId.toString()}`)
  }

  // not a valid address
  if (!isAddress(address as string)) {
    throw new Error(`Contract ${name} address is not a valid address`)
  }

  return { abi: contract.abi as AbiOfName<ContractName>, address }
}
