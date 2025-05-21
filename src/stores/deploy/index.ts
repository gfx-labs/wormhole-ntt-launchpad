import { useContext } from 'react'

import { create, useStore } from 'zustand'

import { DeployContext } from '@/src/stores/deploy/Provider'
import { deployFormActions } from '@/src/stores/deploy/actions'
import { getInitialState } from '@/src/stores/deploy/initialStates'
import type { DeployActionsType, DeployStateType } from '@/src/stores/deploy/types'
import { createJSONStorage, persist } from 'zustand/middleware'

export const createDeployStore = (storeKey: string, initialState?: Partial<DeployStateType>) => {
  return create<DeployStateType & DeployActionsType>()(
    persist(
      (set, get, api) => ({
        ...getInitialState(),
        ...initialState,
        ...deployFormActions(set, get, api),
      }),
      {
        name: storeKey,
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )
}

export function useDeployStore(
  selector?: (state: DeployStateType) => DeployStateType & DeployActionsType,
): DeployStateType & DeployActionsType {
  const store = useContext(DeployContext)
  if (!store) throw new Error('Missing LaunchpadContext.Provider in the tree')
  return useStore(store, selector ?? ((state) => state))
}
