import type { Address, Hash } from 'viem'

import type { AllChainsIds } from '@/src/lib/networks.config'
import type { createDeployStore } from '@/src/stores/deploy'

export const DeploySteps = ['unset', 'setup', 'peers', 'deploy'] as const

export type DeployType = 'upgrade' | 'new' | undefined

export type DeployInfo = {
  success: boolean
  manager: Address
  token: Address
  transceiver: Address
  ownerContract: Address
  txHash?: Hash
  linked?: boolean
}

export type DeployStateType = {
  mode: 'create' | 'addChain'
  deployInfo: Partial<Record<AllChainsIds, DeployInfo>>
  externalSalt: string
  formType: DeployType
  homeChain: AllChainsIds | undefined
  peerChains: AllChainsIds[]
  step: (typeof DeploySteps)[number]
  tokenAddress: Address | undefined
  tokenName: string | undefined
  tokenSupply: string | undefined
  tokenSymbol: string | undefined
}

export type DeployActionsType = {
  resetForm: (initialState?: DeployStateType) => void
  setDeployInfo: (chainId: AllChainsIds, info: DeployInfo) => void
  setFormType: (type: DeployType) => void
  setHomeChainId: (chainId: AllChainsIds) => void
  setPeerChains: (peerChains: AllChainsIds[]) => void
  setStep: (step: (typeof DeploySteps)[number] | 'unset') => void
  setTokenAddress: (address: Address) => void
  setTokenName: (name: string | undefined) => void
  setTokenSupply: (supply: string | undefined) => void
  setTokenSymbol: (symbol: string | undefined) => void
  setMode: (mode: 'create' | 'addChain') => void
}

export type DeployStore = ReturnType<typeof createDeployStore>
