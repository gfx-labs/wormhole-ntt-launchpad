import { type Address, concat, encodeAbiParameters, toFunctionSelector } from 'viem'
import type { EvmChainsIds } from '../lib/networks.config'
import type { WormholeChainId } from './wormholeChains'

const DEFAULT_GAS = 100000

type executeManagerArgs = {
  managerAddress: Address
  nttOwnerAddress: Address
  gas?: number
}

type setOutboundLimitArgs = executeManagerArgs & {
  limit: string
  chainId: EvmChainsIds
}

type setInboundLimitArgs = executeManagerArgs & {
  limit: string
  chainId: EvmChainsIds
  wormholeChainId: WormholeChainId
}

type pauseArgs = executeManagerArgs & { chainId: EvmChainsIds }

type transferPauserArgs = executeManagerArgs & {
  chainId: EvmChainsIds
  newPauser: Address
}

type setThresholdArgs = executeManagerArgs & {
  chainId: EvmChainsIds
  newThreshold: number
}

export const setOutboundLimitCalldata = ({
  managerAddress,
  limit,
  chainId,
  nttOwnerAddress,
}: setOutboundLimitArgs) => {
  return {
    args: [
      managerAddress,
      concat([
        toFunctionSelector('function setOutboundLimit(uint256)'),
        encodeAbiParameters([{ type: 'uint256' }], [BigInt(limit)]),
      ]),
    ] as const,
    chainId: chainId,
    address: nttOwnerAddress,
  }
}

export const setInboundLimitCalldata = ({
  managerAddress,
  limit,
  chainId,
  nttOwnerAddress,
  wormholeChainId,
}: setInboundLimitArgs) => {
  return {
    args: [
      managerAddress,
      concat([
        toFunctionSelector('function setInboundLimit(uint256,uint16)'),
        encodeAbiParameters(
          [{ type: 'uint256' }, { type: 'uint16' }],
          [BigInt(limit), wormholeChainId],
        ),
      ]),
    ] as const,
    chainId: chainId,
    address: nttOwnerAddress,
  }
}

export const unpauseCalldata = ({
  managerAddress,
  chainId,
  nttOwnerAddress,
  gas = DEFAULT_GAS,
}: pauseArgs) => {
  return {
    args: [managerAddress, concat([toFunctionSelector('function unpause()'), '0x'])] as const,
    chainId: chainId,
    address: nttOwnerAddress,
    gas: BigInt(gas),
  }
}

export const pauseCalldata = ({
  managerAddress,
  chainId,
  nttOwnerAddress,
  gas = DEFAULT_GAS,
}: pauseArgs) => {
  return {
    args: [managerAddress, concat([toFunctionSelector('function pause()'), '0x'])] as const,
    chainId: chainId,
    address: nttOwnerAddress,
    gas: BigInt(gas),
  }
}

export const transferPauserCapabilityCalldata = ({
  managerAddress,
  chainId,
  newPauser,
  nttOwnerAddress,
  gas = DEFAULT_GAS,
}: transferPauserArgs) => {
  return {
    args: [
      managerAddress as Address,
      concat([
        toFunctionSelector('function transferPauserCapability(address)'),
        encodeAbiParameters([{ type: 'address' }], [newPauser as Address]),
      ]),
    ] as const,
    chainId,
    address: nttOwnerAddress,
    gas: BigInt(gas),
  }
}

export const setThresholdCalldata = ({
  managerAddress,
  chainId,
  newThreshold,
  nttOwnerAddress,
  gas = DEFAULT_GAS,
}: setThresholdArgs) => {
  return {
    args: [
      managerAddress as Address,
      concat([
        toFunctionSelector('function setThreshold(uint8)'),
        encodeAbiParameters([{ type: 'uint8' }], [newThreshold]),
      ]),
    ] as const,
    chainId,
    address: nttOwnerAddress,
    gas: BigInt(gas),
  }
}
