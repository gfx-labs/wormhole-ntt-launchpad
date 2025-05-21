import DeploymentDashboard from '@/src/components/pageComponents/deployment/dashboard'
import { ErrorCard } from '@/src/components/sharedComponents/ErrorCard'
import { LoadingCard } from '@/src/components/sharedComponents/LoadingCard'
import { SafeSuspense } from '@/src/utils/suspenseWrapper'
import { WORMHOLE_CHAIN_ID, type WormholeChainId } from '@/src/utils/wormholeChains'
import { GeneralMessage } from '@bootnodedev/db-ui-toolkit'
import { createFileRoute, useLocation } from '@tanstack/react-router'
import { z } from 'zod'

const tokenFormSchema = z.object({
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

export const Route = createFileRoute('/deployment/$chain/$address')({
  component: () => {
    // Get access to route params
    const { chain, address } = Route.useParams()

    const validationResult = tokenFormSchema.safeParse({
      tokenAddress: address,
      chainId: chain,
    })

    const location = useLocation()
    const isFromDeploy = location.state?.referer === 'deploy'

    return !validationResult.success ? (
      <GeneralMessage message={validationResult.error.message} />
    ) : (
      <SafeSuspense
        suspenseFallback={isFromDeploy ? <LoadingCard /> : undefined}
        withRetry={!!isFromDeploy}
        errorFallback={
          <ErrorCard
            title="Failed to Load Token"
            description="We couldn't load the token information. Are you sure this is a valid token address?"
          />
        }
      >
        <DeploymentDashboard
          address={address}
          chain={chain as unknown as WormholeChainId}
        />
      </SafeSuspense>
    )
  },
})
