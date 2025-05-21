import { maxUint64 } from 'viem'

const TRIMMED_DECIMALS = 8

export const getWHPeerLimit = (tokenDecimals: number) => {
  if (tokenDecimals > TRIMMED_DECIMALS) {
    return maxUint64 * BigInt(10 ** (tokenDecimals - TRIMMED_DECIMALS))
  }

  return maxUint64
}
