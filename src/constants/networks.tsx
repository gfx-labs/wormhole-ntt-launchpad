import type { ReactElement } from 'react'

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

// import { solana } from '@reown/appkit/networks'

import Arbitrum from '@/src/components/sharedComponents/assets/chains/Arbitrum'
import Base from '@/src/components/sharedComponents/assets/chains/Base'
import Blast from '@/src/components/sharedComponents/assets/chains/Blast'
import Ethereum from '@/src/components/sharedComponents/assets/chains/Ethereum'
import Optimism from '@/src/components/sharedComponents/assets/chains/Optimism'
import Polygon from '@/src/components/sharedComponents/assets/chains/Polygon'
import { includeTestnets } from '@/src/constants/common'
import type { AllChainsIds } from '@/src/lib/networks.config'
import Berachain from '../components/sharedComponents/assets/chains/Berachain'
import Bsc from '../components/sharedComponents/assets/chains/Bsc'
// import Celo from '../components/sharedComponents/assets/chains/Celo'
import Ink from '../components/sharedComponents/assets/chains/Ink'
import Mantle from '../components/sharedComponents/assets/chains/Mantle'
// import Solona from '../components/sharedComponents/assets/chains/Solona'
// import Unichain from '../components/sharedComponents/assets/chains/Unichain'
import Worldchain from '../components/sharedComponents/assets/chains/Worldchain'

export type ChainType = 'EVM' | 'SOLANA' | 'EVM-testnet'

export type NetworkItem = {
  icon: ReactElement | undefined
  id: AllChainsIds
  label: string
  wormholeChainId?: number
  chainType: ChainType
}

export type Networks = Array<NetworkItem>

export const networks: Networks = !includeTestnets
  ? [
      {
        icon: <Ethereum />,
        id: mainnet.id,
        label: mainnet.name,
        wormholeChainId: 2,
        chainType: 'EVM',
      },
      {
        icon: <Arbitrum />,
        id: arbitrum.id,
        label: arbitrum.name,
        wormholeChainId: 23,
        chainType: 'EVM',
      },
      {
        icon: <Base />,
        id: base.id,
        label: base.name,
        wormholeChainId: 30,
        chainType: 'EVM',
      },
      {
        icon: <Optimism />,
        id: optimism.id,
        label: optimism.name,
        wormholeChainId: 24,
        chainType: 'EVM',
      },
      {
        icon: <Polygon />,
        id: polygon.id,
        label: polygon.name,
        wormholeChainId: 5,
        chainType: 'EVM',
      },
      {
        icon: <Blast />,
        id: blast.id,
        label: blast.name,
        wormholeChainId: 36,
        chainType: 'EVM',
      },
      {
        icon: <Berachain />,
        id: berachain.id,
        label: berachain.name,
        wormholeChainId: 39,
        chainType: 'EVM',
      },
      {
        icon: <Bsc />,
        id: bsc.id,
        label: bsc.name,
        wormholeChainId: 4,
        chainType: 'EVM',
      },
      {
        icon: <Ink />,
        id: ink.id,
        label: ink.name,
        wormholeChainId: 46,
        chainType: 'EVM',
      },
      {
        icon: <Mantle />,
        id: mantle.id,
        label: mantle.name,
        wormholeChainId: 35,
        chainType: 'EVM',
      },
      {
        icon: <Worldchain />,
        id: worldchain.id,
        label: worldchain.name,
        wormholeChainId: 45,
        chainType: 'EVM',
      },
      // {
      //   icon: <Unichain />,
      //   id: unichain.id,
      //   label: unichain.name,
      //   wormholeChainId: 44,
      //   chainType: 'EVM',
      // },
      // {
      //   icon: <Celo />,
      //   id: celo.id,
      //   label: celo.name,
      //   wormholeChainId: 14,
      //   chainType: 'EVM',
      // },
      // {
      //   icon: <Solona />,
      //   id: solana.id,
      //   label: solana.name,
      //   wormholeChainId: 1,
      //   chainType: 'SOLANA',
      // },
    ]
  : [
      {
        icon: <Ethereum />,
        id: sepolia.id,
        label: sepolia.name,
        wormholeChainId: 10002,
        chainType: 'EVM-testnet',
      },
      {
        icon: <Arbitrum />,
        id: arbitrumSepolia.id,
        label: arbitrumSepolia.name,
        wormholeChainId: 10003,
        chainType: 'EVM-testnet',
      },
      {
        icon: <Base />,
        id: baseSepolia.id,
        label: baseSepolia.name,
        wormholeChainId: 10004,
        chainType: 'EVM-testnet',
      },
      {
        icon: <Optimism />,
        id: optimismSepolia.id,
        label: optimismSepolia.name,
        wormholeChainId: 10005,
        chainType: 'EVM-testnet',
      },
    ]

export const getNetworkIcon = (id: AllChainsIds) =>
  networks.find((network) => network.id === id)?.icon

export const getNetworkType = (id: AllChainsIds) =>
  networks.find((network) => network.id === id)?.chainType
