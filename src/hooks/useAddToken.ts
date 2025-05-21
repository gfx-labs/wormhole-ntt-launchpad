import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import { useCallback } from 'react'
import type { Address } from 'viem'

interface AddTokenArgs {
  address: Address
  symbol: string
  decimals: number
  image?: string
}

export function useAddToken() {
  const { walletClient } = useWeb3Status()

  const addToken = useCallback(
    async ({ address, symbol, decimals, image }: AddTokenArgs) => {
      if (!walletClient) return

      try {
        await walletClient.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address,
              symbol,
              decimals,
              image,
            },
          },
        })
        return true
      } catch (error) {
        console.error('Error adding token to wallet:', error)
        return false
      }
    },
    [walletClient],
  )

  return { addToken }
}
