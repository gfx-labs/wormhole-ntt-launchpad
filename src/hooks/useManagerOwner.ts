import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { WormholeChainId } from '@/src/utils/wormholeChains'

export const useManagerOwner = (wormholeChainId: WormholeChainId, wormholeTokenAddress: string) => {
  const { data: token } = useTokenByChainAndAddress(wormholeChainId, wormholeTokenAddress)
  const { address } = useWeb3Status()

  const nttOwnerOwner = token.home.manager.owner.nttOwner
  const isOwnedByNTTOwnerSC = nttOwnerOwner !== null
  const nttOwnerProxyAddress = isOwnedByNTTOwnerSC ? token.home.manager.owner.address : null
  const semanticalOwner = isOwnedByNTTOwnerSC ? nttOwnerOwner : token.home.manager.owner.address

  return {
    isOwnedByNTTOwnerSC,
    nttOwnerProxyAddress,
    owner: token.home.manager.owner.address,
    nttOwnerOwner,
    semanticalOwner, // This attribute hides the NTTOwner proxy
    isOwner: semanticalOwner === address,
  }
}
