import { createFileRoute } from '@tanstack/react-router'

import TermsPage from '@/src/components/pageComponents/terms'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
})
