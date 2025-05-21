import { getDeployParams } from '@/src/components/pageComponents/deploy/utils/calculateDeployParams'
import { includeTestnets } from '@/src/constants/common'
import { useWriteNttFactoryDeployNtt } from '@/src/hooks/generated'
import { useTokenInfo } from '@/src/hooks/useTokenInfo'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { EvmChainsIds } from '@/src/lib/networks.config'
import type { DeployType } from '@/src/stores/deploy/types'
import { getWormholeChainId } from '@/src/utils/wormholeChains'
import type { Address } from 'viem'

const GAS_LIMIT = includeTestnets ? 25000000n : undefined

interface DeployArgs {
  mode: number
  tokenParams: {
    name: string
    symbol: string
    existingAddress: Address
    initialSupply: bigint
  }
  externalSalt: string
  outboundLimit: bigint

  peersParams: {
    peerChainId: number
    decimals: number
    inboundLimit: bigint
  }[]
}

interface DeployNTTParams {
  formType: DeployType
  homeChain: EvmChainsIds
  tokenAddress?: Address
  tokenName?: string
  tokenSymbol?: string
  tokenSupply?: string
  peerChains: EvmChainsIds[]
}

interface UseDeployNTTParams {
  chainId: EvmChainsIds
  homeChainId: EvmChainsIds
  externalSalt: string
  tokenAddress?: Address
}

export const useDeployNTT = ({
  chainId,
  homeChainId,
  externalSalt,
  tokenAddress,
}: UseDeployNTTParams) => {
  const { address } = useWeb3Status()
  const { writeContractAsync } = useWriteNttFactoryDeployNtt()
  const { data: tokenInfo } = useTokenInfo({
    chainId: homeChainId,
    address: tokenAddress,
  }) // always use homeChainId for tokenInfo

  const deployNTT = async (params: DeployNTTParams) => {
    const { homeChain, tokenName, tokenSymbol, tokenSupply, peerChains, formType } = params

    const _tokenName = tokenInfo?.name || tokenName
    const _tokenSymbol = tokenInfo?.symbol || tokenSymbol

    if (!_tokenName || !_tokenSymbol) {
      throw new Error('Token name or symbol not found')
    }

    if (!address) {
      throw new Error('Wallet not connected')
    }

    const isHomeChain = chainId === homeChain

    const {
      mode,
      tokenAddress: calculatedTokenAddress,
      tokenSupply: calculatedTokenSupply,
      outboundLimit,
      inboundLimit,
    } = getDeployParams({
      formType,
      isHomeChain,
      tokenAddress,
      tokenDecimals: tokenInfo?.decimals || 18,
      tokenSupply,
      tokenInfo,
    })
    const deployArgs: DeployArgs = {
      mode,
      tokenParams: {
        name: `${_tokenName}`,
        symbol: `${_tokenSymbol}`,
        existingAddress: calculatedTokenAddress,
        initialSupply: calculatedTokenSupply,
      },
      externalSalt,
      outboundLimit,
      peersParams: [homeChain, ...peerChains]
        .filter((peerChainId) => peerChainId !== chainId)
        .map((peerChainId) => ({
          peerChainId: getWormholeChainId(peerChainId),
          decimals: peerChainId === homeChain ? tokenInfo?.decimals || 18 : 18,
          inboundLimit,
        })),
    }
    try {
      const tx = await writeContractAsync({
        args: [
          deployArgs.mode,
          deployArgs.tokenParams,
          deployArgs.externalSalt,
          deployArgs.outboundLimit,
          deployArgs.peersParams,
        ],
        gas: GAS_LIMIT,
      })
      return tx
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return deployNTT
}
