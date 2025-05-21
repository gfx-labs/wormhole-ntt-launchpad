import type { AllChainsIds } from '@/src/lib/networks.config'
import { create } from 'zustand'

// Define the store state type
interface DeploymentFormState {
  tokenAddress: string
  selectedChain: AllChainsIds | null
  // Actions
  setTokenAddress: (address: string) => void
  setSelectedChain: (chainId: AllChainsIds | null) => void
  reset: () => void
}

// Create the store
export const useDeploymentFormStore = create<DeploymentFormState>((set) => ({
  // Initial state
  tokenAddress: '',
  selectedChain: null,

  // Actions
  setTokenAddress: (address) => set({ tokenAddress: address }),
  setSelectedChain: (chainId) => set({ selectedChain: chainId }),
  reset: () => set({ tokenAddress: '', selectedChain: null }),
}))
