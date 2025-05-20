import { createEnv } from '@t3-oss/env-core'
import { isAddress, zeroAddress } from 'viem'
import { z } from 'zod'

const zBoolean = z
  .enum(['true', 'false'])
  .transform((value) => value === 'true')
  .optional()
  .default('false')

// Add a custom address validator
const zAddress = z.string().refine(
  (address) => isAddress(address),
  (val) => ({ message: `${val} is not a valid address` }),
)

/**
 * Represents the environment configuration object.
 *
 * @dev zod-checked and typed environment variables.
 *  Here you should define all the environment variables that your application uses.
 */
export const env = createEnv({
  clientPrefix: 'PUBLIC_',
  client: {
    PUBLIC_ALCHEMY_KEY: z.string().optional(),
    PUBLIC_APP_DESCRIPTION: z.string().min(1).optional(),
    PUBLIC_APP_LOGO: z.string().optional(),
    PUBLIC_APP_NAME: z.string().min(1),
    PUBLIC_APP_URL: z.string().optional(),
    PUBLIC_USE_DEFAULT_TOKENS: zBoolean,
    PUBLIC_INFURA_KEY: z.string().optional(),
    PUBLIC_NATIVE_TOKEN_ADDRESS: zAddress
      .optional()
      .default(zeroAddress)
      .transform((value) => value.toLowerCase()),
    PUBLIC_RPC_ARBITRUM: z.string().optional(),
    PUBLIC_RPC_ARBITRUM_SEPOLIA: z.string().optional(),
    PUBLIC_RPC_BASE: z.string().optional(),
    PUBLIC_RPC_BASE_SEPOLIA: z.string().optional(),
    PUBLIC_RPC_GNOSIS: z.string().optional(),
    PUBLIC_RPC_GNOSIS_CHIADO: z.string().optional(),
    PUBLIC_RPC_MAINNET: z.string().optional(),
    PUBLIC_RPC_OPTIMISM: z.string().optional(),
    PUBLIC_RPC_OPTIMISM_SEPOLIA: z.string().optional(),
    PUBLIC_RPC_POLYGON: z.string().optional(),
    PUBLIC_RPC_POLYGON_MUMBAI: z.string().optional(),
    PUBLIC_RPC_SEPOLIA: z.string().optional(),
    PUBLIC_RPC_SOLANA: z.string().optional(),
    PUBLIC_RPC_BLAST: z.string().optional(),
    PUBLIC_RPC_INK: z.string().optional(),
    PUBLIC_RPC_BERACHAIN: z.string().optional(),
    PUBLIC_RPC_MANTLE: z.string().optional(),
    PUBLIC_RPC_UNICHAIN: z.string().optional(),
    PUBLIC_RPC_WORLDCHAIN: z.string().optional(),
    PUBLIC_RPC_CELO: z.string().optional(),
    PUBLIC_RPC_BSC: z.string().optional(),
    PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().optional().default(''),
    PUBLIC_INCLUDE_TESTNETS: zBoolean,
    PUBLIC_WORMHOLE_API_URL: z.string().url(),
    PUBLIC_REOWN_PROJECT_ID: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
