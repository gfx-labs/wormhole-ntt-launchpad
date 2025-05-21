import { WORMHOLE_CHAIN_ID } from '@/src/utils/wormholeChains'
import { z } from 'zod'

export const tokenFormSchema = z.object({
  tokenAddress: z
    .string()
    .refine((val) => typeof val === 'string' && val.length === 64, 'Invalid address'),
  chainId: z.string().refine(
    (val) =>
      Object.values(WORMHOLE_CHAIN_ID)
        .map((chain) => chain.toString())
        .includes(val.toString()),
    'Invalid chain',
  ),
})
