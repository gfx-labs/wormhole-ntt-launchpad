import { env } from '@/src/env'
import { type Address, isAddress } from 'viem'

/**
 * Checks if the given address is the native token address according to the current environment.
 *
 * @param {string} address - The address to check.
 * @returns True if the address is the native token address, false otherwise.
 */
export const isNativeToken = (address: string) => {
  return address.toLowerCase() === env.PUBLIC_NATIVE_TOKEN_ADDRESS
}

export const formatWormholeAddress = (address: Address) => {
  // Validate the input to ensure it starts with '0x' and is a valid length
  if (!isAddress(address)) {
    throw new Error('Invalid format')
  }

  // Remove the '0x' prefix and pad with 24 zeros at the start
  const paddedAddress = `0x${'0'.repeat(24)}${address.slice(2)}`

  return paddedAddress
}

export const wormholeAddressToAddress = (address: string) => {
  if (address.length !== 64) {
    throw new Error('Invalid Wormhole address')
  }

  return `0x${address.slice(-40)}`
}
