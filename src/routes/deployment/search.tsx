import DeploymentSearchPage from '@/src/components/pageComponents/deployment/search'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/deployment/search')({
  component: DeploymentSearchPage,
})
