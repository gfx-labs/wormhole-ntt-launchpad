// networks.config.ts
/**
 * This file contains the configuration for the networks used in the application.
 *
 * @packageDocumentation
 */
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
  solana,
  // unichain,
  worldchain,
} from '@reown/appkit/networks'
import { http, type Chain, type Transport } from 'viem'

import { includeTestnets } from '@/src/constants/common'
import { env } from '@/src/env'
import type { ExtendedChain } from '../types/token'

const devChains = [sepolia, arbitrumSepolia, baseSepolia, optimismSepolia] as Chain[]

const evmProdChains = [
  mainnet,
  base,
  bsc,
  arbitrum,
  berachain,
  optimism,
  polygon,
  blast,
  ink,
  mantle,
  // unichain,
  worldchain,
  // celo,
] as Chain[]

export const allChains = includeTestnets
  ? devChains
  : ([...evmProdChains, solana] as ExtendedChain[])

export const chains = includeTestnets ? devChains : evmProdChains

export type AllChainsIds = (typeof allChains)[number]['id']
export type EvmChainsIds = (typeof chains)[number]['id']

type RestrictedTransports = Record<EvmChainsIds, Transport>
export const transports: RestrictedTransports = {
  [mainnet.id]: http(env.PUBLIC_RPC_MAINNET),
  [arbitrum.id]: http(env.PUBLIC_RPC_ARBITRUM),
  [optimism.id]: http(env.PUBLIC_RPC_OPTIMISM),
  [optimismSepolia.id]: http(env.PUBLIC_RPC_OPTIMISM_SEPOLIA),
  [sepolia.id]: http(env.PUBLIC_RPC_SEPOLIA),
  [base.id]: http(env.PUBLIC_RPC_BASE),
  [baseSepolia.id]: http(env.PUBLIC_RPC_BASE_SEPOLIA),
  [arbitrumSepolia.id]: http(env.PUBLIC_RPC_ARBITRUM_SEPOLIA),
  [polygon.id]: http(env.PUBLIC_RPC_POLYGON),
  [blast.id]: http(env.PUBLIC_RPC_BLAST),
  [bsc.id]: http(env.PUBLIC_RPC_BSC),
  [ink.id]: http(env.PUBLIC_RPC_INK),
  [berachain.id]: http(env.PUBLIC_RPC_BERACHAIN),
  [mantle.id]: http(env.PUBLIC_RPC_MANTLE),
  // [unichain.id]: http(env.PUBLIC_RPC_UNICHAIN),
  [worldchain.id]: http(env.PUBLIC_RPC_WORLDCHAIN),
  // [celo.id]: http(env.PUBLIC_RPC_CELO),
}
