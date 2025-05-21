import type { DeployType } from '@/src/stores/deploy/types'
import { getWHPeerLimit } from '@/src/utils/getWHPeerLimit'
import type { Address } from 'viem'
import { zeroAddress } from 'viem'

// Definitions:
// General conditions for `formType`:

// 1. If `formType` is 'upgrade':
//    - `tokenAddress` is required on all chains.
//    - `tokenSupply` must be `ZeroBigNumber` on all chains.
//    - `outboundLimit` must equal MAX_TOKEN_AMOUNT on all chains.
//    - The mode is determined by the chain type:
//        - On the home chain: `Mode.LOCKING`.
//        - On peer chains: `Mode.BURNING`.
//    - Peer chains must have `inboundLimit` set to MAX_TOKEN_AMOUNT.

// 2. If `formType` is 'new':
//    - `tokenAddress` is not required on any chain.
//    - `tokenSupply` is required only on the home chain, to avoid minting tokens on peer chains.
//    - `outboundLimit` must equal MAX_TOKEN_AMOUNT on all chains.
//    - The mode is `Mode.BURNING` on all chains.
//    - Peer chains must have `inboundLimit` set to MAX_TOKEN_AMOUNT.

export enum Mode {
  LOCKING = 0,
  BURNING = 1,
}

interface CalcDeployParamsInput {
  formType: DeployType
  isHomeChain: boolean
  tokenAddress?: Address
  tokenDecimals: number
  tokenSupply?: string
  tokenInfo?: {
    totalSupply: bigint
    decimals: number
  } | null
}

interface CalcDeployParamsOutput {
  mode: Mode
  tokenAddress: Address
  tokenSupply: bigint
  outboundLimit: bigint
  inboundLimit: bigint
}

export function getDeployParams({
  formType,
  isHomeChain,
  tokenAddress,
  tokenDecimals,
  tokenSupply,
}: CalcDeployParamsInput): CalcDeployParamsOutput {
  const isUpgrade = formType === 'upgrade'

  // Calculate mode
  const mode = isUpgrade
    ? isHomeChain
      ? Mode.LOCKING
      : Mode.BURNING // upgrade: LOCKING only on home chain
    : Mode.BURNING // new: BURNING on all chains

  // Calculate tokenAddress
  const calculatedTokenAddress = isUpgrade
    ? tokenAddress || zeroAddress // required for upgrade
    : zeroAddress // not required for new

  // Calculate tokenSupply
  let calculatedTokenSupply = 0n
  if (isUpgrade) {
    calculatedTokenSupply = 0n // ZeroBigNumber for upgrade
  } else if (isHomeChain) {
    calculatedTokenSupply = tokenSupply ? BigInt(tokenSupply) : 0n // only set on home chain for new
  }

  const maxLimit = getWHPeerLimit(tokenDecimals)

  return {
    mode,
    tokenAddress: calculatedTokenAddress,
    tokenSupply: calculatedTokenSupply,
    outboundLimit: maxLimit,
    inboundLimit: maxLimit,
  }
}
