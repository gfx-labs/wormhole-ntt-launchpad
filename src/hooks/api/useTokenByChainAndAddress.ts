import { getTokenByChainAndAddress } from '@/src/api/endpoints'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useLocation } from '@tanstack/react-router'
import { zeroAddress } from 'viem'

export function useTokenByChainAndAddress(
  wormholeChainId: WormholeChainId,
  wormholeTokenAddress: string,
) {
  const { walletChainId, address: walletAddress } = useWeb3Status()
  const location = useLocation()
  const isFormDeploy = location.state?.referer === 'deploy'

  return useSuspenseQuery({
    queryKey: [
      'token',
      wormholeChainId,
      wormholeTokenAddress,
      walletChainId,
      walletAddress || zeroAddress,
    ],
    queryFn: () => getTokenByChainAndAddress(wormholeChainId.toString(), wormholeTokenAddress),
    select: (response) => response.data,
    retry: isFormDeploy ? 15 : false,
    retryDelay: isFormDeploy ? 2000 : 0,
  })
}
