import type { NTTToken } from '@/src/api/endpoints'
import { NTTManagerAbi } from '@/src/constants/contracts/abis/NTTManager'
import { type WormholeChainId, getEvmChain } from '@/src/utils/wormholeChains'
import type { Address } from 'viem'
import { useReadContracts } from 'wagmi'

export interface TokenLimit {
  wormholeChainId: number
  blockchain: string
  currentCapacity: number
  maxCapacity: number
  maxCapacityRaw: bigint
  availablePercentage: number
}

// Helper function to unpack TrimmedAmount and apply decimals
function unpackTrimmedAmount(packedAmount: bigint, toDecimals: bigint): bigint {
  //const TRIMMED_DECIMALS = 8
  const fromDecimals = packedAmount & 0xffn
  const amount = packedAmount >> 8n

  if (fromDecimals === toDecimals) {
    return amount
  }

  return fromDecimals > toDecimals
    ? amount / 10n ** (fromDecimals - toDecimals)
    : amount * 10n ** (toDecimals - fromDecimals)
}

export function useTokensLimits(token: NTTToken, peers: NTTToken[]) {
  const chain = getEvmChain(token.wormholeChainId as WormholeChainId)

  const { data: allCalls } = useReadContracts({
    contracts: [
      {
        address: token.manager.address as Address,
        chainId: chain?.id,
        abi: NTTManagerAbi,
        functionName: 'rateLimitDuration',
      },
      {
        address: token.manager.address as Address,
        chainId: chain?.id,
        abi: NTTManagerAbi,
        functionName: 'getOutboundLimitParams',
      },
      {
        address: token.manager.address as Address,
        chainId: chain?.id,
        abi: NTTManagerAbi,
        functionName: 'getCurrentOutboundCapacity',
      },
      ...peers.flatMap((peer) => [
        {
          address: token.manager.address as Address,
          chainId: chain?.id,
          abi: NTTManagerAbi,
          functionName: 'getInboundLimitParams',
          args: [peer.wormholeChainId as WormholeChainId],
        },
        {
          address: token.manager.address as Address,
          chainId: chain?.id,
          abi: NTTManagerAbi,
          functionName: 'getCurrentInboundCapacity',
          args: [peer.wormholeChainId as WormholeChainId],
        },
      ]),
    ],
  }) as { data: Array<{ result: unknown }> } // TS infers incorrectly the return type
  if (!allCalls) {
    return null
  }

  const results: TokenLimit[] = []

  // Process all limits (outbound and inbound)
  // First 3 calls are:
  // [0] = rateLimitDuration
  // [1,2] = outbound params and capacity for home chain
  // Then for each peer:
  // [3,4] = inbound params and capacity for peer 1
  // [5,6] = inbound params and capacity for peer 2
  // etc...

  for (let i = 0; i <= peers.length; i++) {
    const baseIndex = 1 + i * 2
    // For i = 0, we're processing home chain (outbound)
    // For i > 0, we're processing peers (inbound)
    const chainToken = i === 0 ? token : peers[i - 1]

    const params = allCalls[baseIndex].result as {
      limit: bigint // 1b
      currentCapacity: bigint // 1b - bridge value
      lastTxTimestamp: bigint
    }
    const maxCapacity = unpackTrimmedAmount(params.limit, BigInt(token.token.decimals))
    const currentCapacity =
      (allCalls[baseIndex + 1].result as bigint) / BigInt(10 ** token.token.decimals)

    results.push({
      wormholeChainId: chainToken.wormholeChainId,
      blockchain: chainToken.blockchain,
      currentCapacity: Number(currentCapacity),
      maxCapacity: Number(maxCapacity),
      maxCapacityRaw: maxCapacity,
      availablePercentage:
        currentCapacity === 0n || maxCapacity === 0n
          ? 0
          : Number((currentCapacity * 100n) / maxCapacity),
    })
  }

  return {
    duration: allCalls[0].result as bigint,
    outbound: results[0],
    inbound: results.slice(1),
  }
}
