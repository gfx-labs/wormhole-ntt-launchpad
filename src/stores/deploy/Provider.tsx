import { type ReactNode, createContext, useEffect, useRef } from 'react'

import { createDeployStore } from '@/src/stores/deploy'
import type { DeployInfo, DeployStateType, DeployStore } from '@/src/stores/deploy/types'
import { Toast } from '@bootnodedev/db-ui-toolkit'
import { toast } from 'react-hot-toast'

// This patter is recommended for zustand in the official docs: https://zustand.docs.pmnd.rs/guides/initialize-state-with-props
// To initialize the store with custom initial state.

export const DeployContext = createContext<DeployStore | null>(null)

export const DeployProvider = ({
  children,
  storeKey,
  initialState,
}: {
  children: ReactNode
  storeKey: 'deploy-store' | 'deploy-to-new-chain'
  initialState?: Partial<DeployStateType>
}) => {
  const storeRef = useRef<DeployStore>()

  if (!storeRef.current) {
    storeRef.current = createDeployStore(storeKey, initialState) // init the store with custom initial state
  }

  const store = storeRef.current.getState()
  const homeChain = store.homeChain ?? store.peerChains[0]

  const chainDeployInfo = store.deployInfo[homeChain] as DeployInfo

  const hasDeployInfo =
    store.mode === 'create'
      ? Object.values(store.deployInfo).some((info) => info?.success)
      : store?.homeChain && homeChain && chainDeployInfo?.success

  if (!hasDeployInfo) {
    // clear the store if there is no deploy info
    storeRef.current?.persist.clearStorage()
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: Empty dependency array for one-time execution
  useEffect(() => {
    let toastId: string | undefined

    if (hasDeployInfo) {
      toastId = toast.custom(
        <Toast>
          Progress restored. Deploy to all chains to activate peer connections. Pick up where you
          left off.
        </Toast>,
        {
          id: 'deploy-restore-message',
          duration: 8000,
          position: 'top-center',
        },
      )
    }

    return () => {
      if (toastId) {
        toast.remove(toastId)
      }
    }
  }, [])

  return <DeployContext.Provider value={storeRef.current}>{children}</DeployContext.Provider>
}
