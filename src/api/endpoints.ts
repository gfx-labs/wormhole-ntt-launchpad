import { env } from '@/src/env'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import axios from 'axios'

export type NTTToken = {
  manager: {
    address: string
    owner: {
      address: string
      nttOwner: string | null
    }
    transceivers: { address: string }[]
  }
  blockchain: string
  wormholeChainId: WormholeChainId
  isCannonical: boolean
  mode: 'locking' | 'burning'
  externalSalt: string
  token: {
    address: string
    decimals: number
    maxSupply: string
    minter: null | string
    name: string
    owner: string
    symbol: string
    totalSupply: string
  }
}

export function getTokensOwnedBy(address: string) {
  return axios.get<NTTToken[]>(`${env.PUBLIC_WORMHOLE_API_URL}/v1/ntt/token/ownedBy/${address}`)
}

export function getTokenByChainAndAddress(chainId: string, address: string) {
  return axios.get<{ home: NTTToken; peers: NTTToken[] }>(
    `${env.PUBLIC_WORMHOLE_API_URL}/v1/ntt/token/${chainId}/${address.toLowerCase()}`,
  )
}
