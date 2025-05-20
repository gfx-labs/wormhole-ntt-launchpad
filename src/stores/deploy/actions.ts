import type { StateCreator } from 'zustand'

import { getInitialState } from '@/src/stores/deploy/initialStates'
import type { DeployActionsType, DeployStateType } from '@/src/stores/deploy/types'

export const deployFormActions: StateCreator<
  DeployStateType & DeployActionsType,
  [],
  [],
  DeployActionsType
> = (set) => ({
  resetForm: (initialState) =>
    set(() => ({ ...(initialState ? initialState : getInitialState()) })),

  setHomeChainId: (chainId) => set(() => ({ homeChain: chainId })),

  setTokenAddress: (address) => set(() => ({ tokenAddress: address })),

  setFormType: (type) =>
    set(() => ({
      ...getInitialState(), // reset the form
      formType: type,
    })),

  setTokenName: (name) => set(() => ({ tokenName: name })),

  setTokenSymbol: (symbol) => set(() => ({ tokenSymbol: symbol })),

  setTokenSupply: (supply) => set(() => ({ tokenSupply: supply })),

  setPeerChains: (peerChains) => set(() => ({ peerChains })),

  setStep: (step) => set(() => ({ step })),

  setDeployInfo: (chainId, info) =>
    set((state) => ({ deployInfo: { ...state.deployInfo, [chainId]: info } })),

  setMode: (mode) => set(() => ({ mode })),
})
