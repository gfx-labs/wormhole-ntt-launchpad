import { chains } from '@/src/lib/networks.config'
import { type DeployStateType, DeploySteps } from '@/src/stores/deploy/types'

export const getInitialState = (): DeployStateType => ({
  mode: 'create',
  homeChain: chains[0].id,
  externalSalt: Math.random().toString(36).substring(2, 15),
  tokenAddress: undefined,
  formType: undefined,
  tokenName: undefined,
  tokenSymbol: undefined,
  step: DeploySteps[0],
  tokenSupply: undefined,
  peerChains: [],
  deployInfo: {} as DeployStateType['deployInfo'],
})
