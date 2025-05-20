import { createFileRoute } from '@tanstack/react-router'

import Deploy from '@/src/components/pageComponents/deploy'
import { DeployProvider } from '@/src/stores/deploy/Provider'

const DeployPage = () => (
  <DeployProvider storeKey="deploy-store">
    <Deploy />
  </DeployProvider>
)

export const Route = createFileRoute('/deploy')({
  component: DeployPage,
})

export default Deploy
