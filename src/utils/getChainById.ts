import { extractChain } from 'viem'

import { type AllChainsIds, type EvmChainsIds, allChains, chains } from '@/src/lib/networks.config'

export const getChainById = (chainId: EvmChainsIds) => {
  return extractChain({
    chains,
    id: chainId,
  })
}

export const getAnyChainById = (chainId: AllChainsIds) => {
  const chain = allChains.find((chain) => chain.id === chainId)
  if (!chain) {
    throw new Error(`Chain with id ${chainId} not found`)
  }
  return chain
}
