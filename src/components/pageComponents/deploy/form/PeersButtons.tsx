import BackButton from '@/src/components/pageComponents/deploy/form/BackButton'
import { ButtonsWrapper } from '@/src/components/sharedComponents/form/ui'
import { NextButton } from '@/src/components/sharedComponents/ui/Buttons'
import { useDeployStore } from '@/src/stores/deploy'

const PeersButtons = () => {
  const { setStep, peerChains } = useDeployStore()

  const canDeploy = peerChains.length > 0

  const handleGoToDeploy = () => {
    setStep('deploy')
  }

  return (
    <ButtonsWrapper>
      <BackButton />
      <NextButton
        disabled={!canDeploy}
        onClick={handleGoToDeploy}
      >
        Next
      </NextButton>
    </ButtonsWrapper>
  )
}

export default PeersButtons
