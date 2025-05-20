import { createFileRoute } from '@tanstack/react-router'

import PrivacyPage from '@/src/components/pageComponents/privacy'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
})
