import DeploymentSettings from '@/src/components/pageComponents/deployment/settings'
import { tokenFormSchema } from '@/src/utils/tokenFormSchema'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deployment/settings/$chain/$address')({
  component: () => {
    // Get access to route params
    const { chain, address } = Route.useParams()

    const validationResult = tokenFormSchema.safeParse({
      chainId: chain,
      tokenAddress: address,
    })

    if (!validationResult.success) {
      return <div>{validationResult.error.message}</div>
    }

    return (
      <DeploymentSettings
        wormholeAddress={address}
        wormholeChainId={chain as unknown as WormholeChainId}
      />
    )
  },
})
