import { type EvmChainsIds, transports } from '@/src/lib/networks.config'
import { getChainById } from '@/src/utils/getChainById'
import { type PublicClient, createPublicClient } from 'viem'

// Singleton store for public clients
const clients: Partial<Record<EvmChainsIds, PublicClient>> = {}

export const getPublicClient = (chainId: EvmChainsIds): PublicClient => {
  if (!clients[chainId]) {
    clients[chainId] = createPublicClient({
      chain: getChainById(chainId),
      transport: transports[chainId],
    }) as PublicClient
  }
  return clients[chainId]
}
