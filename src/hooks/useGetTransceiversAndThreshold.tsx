import { WormholeTransceiverAbi } from '@/src/constants/contracts/abis/WormholeTransceiver'
import {
  useSuspenseReadNttManagerGetThreshold,
  useSuspenseReadNttManagerGetTransceivers,
} from '@/src/hooks/generated'
import type { EvmChainsIds } from '@/src/lib/networks.config'
import { getPublicClient } from '@/src/utils/publicClients'
import { useSuspenseQueries } from '@tanstack/react-query'
import type { Address } from 'viem'

const getTransceiversAndThreshold = ({
  chainId,
  managerAddress,
}: {
  chainId: EvmChainsIds
  managerAddress: Address
}) => {
  const { data: transceiverAddresses } = useSuspenseReadNttManagerGetTransceivers({
    chainId,
    address: managerAddress,
  })

  const { data: threshold } = useSuspenseReadNttManagerGetThreshold({
    chainId,
    address: managerAddress,
  })

  const result = useSuspenseQueries({
    queries: transceiverAddresses.map((transceiver) => ({
      queryKey: ['transceiverTypes', chainId, transceiver],
      queryFn: async () => {
        try {
          const transceiverType = await getPublicClient(chainId).readContract({
            address: transceiver,
            abi: WormholeTransceiverAbi,
            functionName: 'getTransceiverType',
          })
          return {
            type: transceiverType,
            address: transceiver,
          }
        } catch (error) {
          console.error(error)
          return {
            type: 'unknown',
            address: transceiver,
          }
        }
      },
      enabled: transceiverAddresses?.length > 0,
    })),
    combine: (results) => {
      return {
        transceivers: results.map((result) => result.data),
        threshold: threshold,
      }
    },
  })

  return result
}

export default getTransceiversAndThreshold
