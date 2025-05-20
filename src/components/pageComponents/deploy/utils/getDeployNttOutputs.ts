import { NTTFactoryAbi } from '@/src/constants/contracts/abis/NTTFactory'
import { type TransactionReceipt, decodeEventLog } from 'viem'

interface DeployNttOutputs {
  token: `0x${string}`
  manager: `0x${string}`
  transceiver: `0x${string}`
  ownerContract: `0x${string}`
}

export function getDeployNttOutputs(receipt: TransactionReceipt): DeployNttOutputs {
  // Expected output names from the deployNtt function
  const expectedOutputs = ['token', 'manager', 'transceiver', 'ownerContract'] as const

  const outputs: Partial<DeployNttOutputs> = {}

  try {
    // Loop through logs using for...of
    for (const log of receipt.logs) {
      try {
        const decodedLog = decodeEventLog({
          abi: NTTFactoryAbi,
          data: log.data,
          topics: log.topics,
        })

        // Check if the decoded log contains any of the expected output fields
        for (const key of expectedOutputs) {
          if (decodedLog.args[key as keyof typeof decodedLog.args]) {
            outputs[key] = decodedLog.args[key as keyof typeof decodedLog.args]
          }
        }
      } catch {
        // Ignore logs that cannot be decoded
      }
    }

    // Ensure all required outputs are found
    const missingOutputs = expectedOutputs.filter((key) => !outputs[key])
    if (missingOutputs.length > 0) {
      throw new Error(`Missing outputs: ${missingOutputs.join(', ')}`)
    }

    return outputs as DeployNttOutputs
  } catch (error) {
    console.error('Error capturing deployNtt output:', error)
    throw error
  }
}
