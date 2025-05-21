import type { Address } from 'viem'
import {
  type Connector,
  type UseBalanceReturnType,
  type UsePublicClientReturnType,
  type UseWalletClientReturnType,
  useBalance,
  usePublicClient,
  useWalletClient,
} from 'wagmi'

import { type AllChainsIds, type EvmChainsIds, allChains } from '@/src/lib/networks.config'
import type { RequiredNonNull } from '@/src/types/utils'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'
import { useDisconnect } from '@reown/appkit/react'
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getNetworkType } from '../constants/networks'
import type { ExtendedChain } from '../types/token'
export type AppWeb3Status = {
  readOnlyClient: UsePublicClientReturnType // TODO add solana | Connection
  appChainId: EvmChainsIds
}

export type WalletWeb3Status = {
  address: string | undefined
  evmAddress?: Address | undefined
  balance?: UseBalanceReturnType['data'] | number | undefined
  connectingWallet: boolean
  switchingChain: boolean
  isWalletConnected: boolean
  walletClient: UseWalletClientReturnType['data']
  isWalletSynced: boolean
  walletChainId: ExtendedChain['id']
  evmWalletChainId?: number
  evmAppChainId?: EvmChainsIds
  connector: Connector | undefined
}

export type Web3Actions = {
  switchNetwork: (network: AppKitNetwork) => void
  disconnect: () => void
}

export type Web3Status = AppWeb3Status & WalletWeb3Status & Web3Actions
/**
 * Custom hook that provides the status of the Web3 connection.
 *
 * @returns The Web3 connection status, including information about the connected wallet, supported chains, and available actions.
 */
export const useWeb3Status = () => {
  const { chainId, switchNetwork } = useAppKitNetwork()
  const { address, isConnected, status } = useAppKitAccount()
  const { connector } = useAccount()
  const { disconnect } = useDisconnect()

  const appChainId = chainId ?? allChains[0]?.id
  const [switchingChain, setSwitchingChain] = useState(false)
  const [targetChainId, setTargetChainId] = useState<EvmChainsIds | undefined>(undefined)
  const [solanaBalance, setSolanaBalance] = useState<number | undefined>(undefined)

  if (!chainId) {
    throw new Error('Missing chainId')
  }

  const isEvmChain = chainId && getNetworkType(chainId as AllChainsIds) === 'EVM'

  // EVM-specific
  const { data: evmBalance } = useBalance({
    address: address as `0x${string}`,
    chainId: typeof chainId === 'number' ? chainId : undefined,
  })
  const { data: walletClient } = useWalletClient({
    chainId: typeof chainId === 'number' ? chainId : undefined,
  })

  // TODO handle prod RPC URL
  const getSolBalance = useCallback(async () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const wallet = new PublicKey('nicktrLHhYzLmoVbuZQzHUTicd2sfP571orwo9jfc8c')

    const balance = await connection.getBalance(wallet)
    setSolanaBalance(balance / LAMPORTS_PER_SOL)
  }, [])

  const customDisconnect = useCallback(async () => {
    if (isConnected) {
      await disconnect()
    }
  }, [isConnected, disconnect])

  useEffect(() => {
    if (isConnected && !isEvmChain) {
      getSolBalance()
    }
    if (!isConnected) {
      customDisconnect()
    }
  }, [isConnected, isEvmChain, getSolBalance, customDisconnect])

  const readOnlyClient = usePublicClient()

  const appWeb3Status: AppWeb3Status = {
    readOnlyClient,
    appChainId: appChainId as EvmChainsIds,
  }

  const walletWeb3Status: WalletWeb3Status = {
    address,
    evmAddress: isEvmChain ? (address as Address) : undefined,
    balance: isEvmChain ? evmBalance : solanaBalance,
    isWalletConnected: isConnected,
    connectingWallet: status === 'connecting' || status === 'reconnecting',
    switchingChain,
    walletClient,
    isWalletSynced: isConnected && chainId === appChainId,
    walletChainId: chainId,
    evmWalletChainId: isEvmChain ? (chainId as EvmChainsIds) : undefined,
    evmAppChainId: isEvmChain ? (appChainId as EvmChainsIds) : undefined,
    connector,
  }

  const web3Actions: Web3Actions = {
    switchNetwork: (network: AppKitNetwork) => {
      setTargetChainId(network.id as EvmChainsIds)
      setSwitchingChain(true)
      switchNetwork(network)
    },
    disconnect: () => {
      disconnect()
    },
  }

  useEffect(() => {
    if (switchingChain && chainId === targetChainId) {
      setSwitchingChain(false)
      setTargetChainId(undefined)
    }
  }, [chainId, switchingChain, targetChainId])

  const web3Connection: Web3Status = {
    ...appWeb3Status,
    ...walletWeb3Status,
    ...web3Actions,
  }
  return web3Connection
}

export const useWeb3StatusConnected = () => {
  const context = useWeb3Status()
  if (!context.isWalletConnected) {
    throw new Error('Use useWeb3StatusConnected only when a wallet is connected')
  }
  return useWeb3Status() as RequiredNonNull<Web3Status>
}
