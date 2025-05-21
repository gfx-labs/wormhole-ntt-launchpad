import { type AllChainsIds, type EvmChainsIds, chains } from '@/src/lib/networks.config'
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

import ArbitrumIcon from '@/src/components/sharedComponents/assets/chains/Arbitrum'
import BaseIcon from '@/src/components/sharedComponents/assets/chains/Base'
import BerachainIcon from '@/src/components/sharedComponents/assets/chains/Berachain'
import BlastIcon from '@/src/components/sharedComponents/assets/chains/Blast'
import BscIcon from '@/src/components/sharedComponents/assets/chains/Bsc'
// import CeloIcon from '@/src/components/sharedComponents/assets/chains/Celo'
import EthereumIcon from '@/src/components/sharedComponents/assets/chains/Ethereum'
import InkIcon from '@/src/components/sharedComponents/assets/chains/Ink'
import MantleIcon from '@/src/components/sharedComponents/assets/chains/Mantle'
import OptimismIcon from '@/src/components/sharedComponents/assets/chains/Optimism'
import PolygonIcon from '@/src/components/sharedComponents/assets/chains/Polygon'
// import UnichainIcon from '@/src/components/sharedComponents/assets/chains/Unichain'
import WorldchainIcon from '@/src/components/sharedComponents/assets/chains/Worldchain'
import type { FC, HTMLAttributes } from 'react'
import SolonaIcon from '../components/sharedComponents/assets/chains/Solona'

export const WORMHOLE_CHAIN_ID = {
  // Mainnets
  [mainnet.id]: 2, // Ethereum Mainnet
  [base.id]: 30, // Base Mainnet
  [arbitrum.id]: 23, // Arbitrum One
  [optimism.id]: 24, // Optimism Mainnet
  [polygon.id]: 5, // Polygon Mainnet
  [blast.id]: 36, // Blast Mainnet
  [bsc.id]: 4, // BSC/BNB Mainnet
  [ink.id]: 46, // Ink Mainnet
  [berachain.id]: 39, // Berachain Mainnet
  [mantle.id]: 35, // Mantle Mainnet
  // [unichain.id]: 44, // Unichain Mainnet
  [worldchain.id]: 45, // Worldchain Mainnet
  // [celo.id]: 14, // Celo Mainnet
  [solana.id]: 1, // Solana Mainnet

  // Testnets/Sepolias
  [sepolia.id]: 10002, // Ethereum Sepolia
  [baseSepolia.id]: 10004, // Base Sepolia
  [arbitrumSepolia.id]: 10003, // Arbitrum Sepolia
  [optimismSepolia.id]: 10005, // Optimism Sepolia
} as const

export type WormholeChainId = (typeof WORMHOLE_CHAIN_ID)[keyof typeof WORMHOLE_CHAIN_ID]

export const WORMHOLE_CHAIN_ID_TO_ICON: Record<WormholeChainId, FC<HTMLAttributes<SVGElement>>> = {
  2: EthereumIcon, // Ethereum Mainnet
  5: PolygonIcon, // Polygon Mainnet
  30: BaseIcon, // Base Mainnet
  23: ArbitrumIcon, // Arbitrum One
  24: OptimismIcon, // Optimism Mainnet
  36: BlastIcon, // Blast Mainnet
  4: BscIcon, // BSC Mainnet
  46: InkIcon, // Ink Mainnet
  39: BerachainIcon, // Berachain Mainnet
  35: MantleIcon, // Mantle Mainnet
  // 44: UnichainIcon, // Unichain Mainnet
  45: WorldchainIcon, // Worldchain Mainnet
  // 14: CeloIcon, // Celo Mainnet
  1: SolonaIcon, // Solana Mainnet

  // Testnets/Sepolias
  10002: EthereumIcon, // Ethereum Sepolia
  10004: BaseIcon, // Base Sepolia
  10003: ArbitrumIcon, // Arbitrum Sepolia
  10005: OptimismIcon, // Optimism Sepolia
}

export const getWormholeChainId = (chainId: AllChainsIds) => {
  if (!(chainId in WORMHOLE_CHAIN_ID)) {
    throw new Error(`Wormhole chain id not found for chainId: ${chainId}`)
  }
  return WORMHOLE_CHAIN_ID[chainId as keyof typeof WORMHOLE_CHAIN_ID]
}

export const getAnyChain = (wormholeChainId: WormholeChainId) => {
  const chain = chains.find((chain) => chain.id === getEvmChainId(wormholeChainId))
  if (!chain) {
    console.warn(`Chain id not found for wormhole chain id: ${wormholeChainId}`)
  }

  return chain
}

export const getAnyChainId = (wormholeChainId: WormholeChainId): AllChainsIds | undefined => {
  const entry = Object.entries(WORMHOLE_CHAIN_ID).find(([_, value]) => value === +wormholeChainId)

  if (!entry) {
    console.warn(`Chain id not found for wormhole chain id: ${wormholeChainId}`)
  }

  return entry?.length ? Number(entry[0]) : undefined
}

export const getEvmChain = (wormholeChainId: WormholeChainId) => {
  const chain = chains.find((chain) => chain.id === getEvmChainId(wormholeChainId))
  if (!chain) {
    console.warn('No chain found')
  }

  return chain
}

export const getEvmChainId = (wormholeChainId: WormholeChainId): EvmChainsIds | undefined => {
  const entry = Object.entries(WORMHOLE_CHAIN_ID).find(([_, value]) => value === +wormholeChainId)

  if (!entry) {
    console.log(`EVM chain id not found for wormhole chain id: ${wormholeChainId}`)
  }

  return entry?.length ? Number(entry[0]) : undefined
}
