import { BackButton as BaseBackButton } from '@/src/components/sharedComponents/ui/Buttons'
import { useDeployStore } from '@/src/stores/deploy'
import { DeploySteps } from '@/src/stores/deploy/types'

const BackButton = () => {
  const { setStep, step, deployInfo, homeChain, setFormType } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const handleBack = () => {
    if (step === 'setup') {
      setStep('unset')
      setFormType(undefined)
    } else {
      setStep(DeploySteps[DeploySteps.indexOf(step) - 1])
    }
  }
  return (
    <BaseBackButton
      // If the home chain is deployed, we don't need to go back
      disabled={deployInfo?.[homeChain]?.success}
      onClick={handleBack}
    >
      Back
    </BaseBackButton>
  )
}

export default BackButton
