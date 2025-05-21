import type { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { includeTestnets } from '@/src/constants/common'
import { env } from '@/src/env'
import { SolanaAdapter } from '@reown/appkit-adapter-solana'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { createAppKit } from '@reown/appkit/react'

import {
  arbitrum,
  base,
  berachain,
  blast,
  bsc,
  // celo,
  ink,
  mainnet,
  mantle,
  optimism,
  polygon,
  solana,
  // unichain,
  worldchain,
} from '@reown/appkit/networks'

import type { AppKitNetwork } from '@reown/appkit/networks'

import {
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  polygonMumbai,
  sepolia,
  solanaTestnet,
} from '@reown/appkit/networks'

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets'

if (!env.PUBLIC_REOWN_PROJECT_ID) {
  throw new Error('Missing PUBLIC_REOWN_PROJECT_ID in env')
}

const projectId = env.PUBLIC_REOWN_PROJECT_ID

const testnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  sepolia,
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  polygonMumbai,
  solanaTestnet,
]

const mainnetNetworks: [AppKitNetwork, ...AppKitNetwork[]] = [
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  blast,
  bsc,
  ink,
  berachain,
  mantle,
  // unichain,
  worldchain,
  // celo,
  solana,
]

const networks = includeTestnets ? testnetNetworks : mainnetNetworks

export const wagmiAdapter = new WagmiAdapter({
  ssr: false,
  projectId,
  networks,
})

export const config = wagmiAdapter.wagmiConfig

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new WalletConnectWalletAdapter({
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      network: 'mainnet-beta' as any,
      options: {
        projectId,
      },
    }),

    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ],
  connectionSettings: {
    confirmTransactionInitialTimeout: 60000,
    commitment: 'processed',
  },
})

const metadata = {
  name: 'NTT Launchpad',
  description: 'Wormhole NTT Launchpad',
  url: 'https://ntt.wormhole.com/', // origin must match your domain & subdomain
  icons: ['https://wormhole.com/favicon.ico'],
}

createAppKit({
  allowUnsupportedChain: false,
  adapters: [wagmiAdapter, solanaWeb3JsAdapter],
  networks,
  metadata: metadata,
  projectId,
  features: {
    analytics: true,
  },
})

const queryClient = new QueryClient()

export function AppKitProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
