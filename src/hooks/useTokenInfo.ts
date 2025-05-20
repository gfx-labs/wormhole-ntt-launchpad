import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

import { PeerTokenAbi } from '@/src/constants/contracts/abis/PeerToken'
import type { AllChainsIds, EvmChainsIds } from '@/src/lib/networks.config'
import { getPublicClient } from '@/src/utils/publicClients'
import { solana } from '@reown/appkit/networks'

export const useTokenInfo = ({
  address,
  chainId,
}: {
  address?: Address
  chainId: AllChainsIds
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['token-info', chainId, address],
    queryFn: async () => {
      if (!address) {
        throw new Error('Address is required')
      }

      // TODO replace with Solana txn call
      if (chainId === solana.id) {
        return {
          decimals: 9,
          name: 'Solona Mock Token',
          symbol: 'SMT',
          totalSupply: BigInt(1000000000),
          owner: address,
        }
      }

      const client = getPublicClient(chainId as EvmChainsIds)

      const [decimals, name, symbol, totalSupply, owner] = await client.multicall({
        contracts: [
          {
            address,
            abi: PeerTokenAbi,
            functionName: 'decimals',
          },
          {
            address,
            abi: PeerTokenAbi,
            functionName: 'name',
          },
          {
            address,
            abi: PeerTokenAbi,
            functionName: 'symbol',
          },
          {
            address,
            abi: PeerTokenAbi,
            functionName: 'totalSupply',
          },
          {
            address,
            abi: PeerTokenAbi,
            functionName: 'owner',
          },
        ],
      })

      if (decimals.error || name.error || symbol.error || totalSupply.error) {
        return null
      }

      return {
        decimals: decimals.result,
        name: name.result,
        symbol: symbol.result,
        totalSupply: totalSupply.result,
        owner: owner.result,
      }
    },
    enabled: !!address,
    refetchOnWindowFocus: false,
  })

  return { data, isLoading }
}
