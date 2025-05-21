import DeployButtons from '@/src/components/pageComponents/deploy/form/DeployButtons'
import ExpandTokenFields from '@/src/components/pageComponents/deploy/form/ExpandTokenFields'
import ExpandTokenMainTitle from '@/src/components/pageComponents/deploy/form/ExpandTokenMainTitle'
import LaunchTokenFields from '@/src/components/pageComponents/deploy/form/LaunchTokenFields'
import LaunchTokenMainTitle from '@/src/components/pageComponents/deploy/form/LaunchTokenMainTitle'
import NttTypeSelector from '@/src/components/pageComponents/deploy/form/NttTypeSelector'
import PeerChainsSelector from '@/src/components/pageComponents/deploy/form/PeerChainsSelector'
import PeersButtons from '@/src/components/pageComponents/deploy/form/PeersButtons'
import PeersTokenInfo from '@/src/components/pageComponents/deploy/form/PeersTokenInfo'
import { FormWrapper } from '@/src/components/sharedComponents/form/FormWrapper'
import { MainText } from '@/src/components/sharedComponents/ui/MainText'
import { useDeployStore } from '@/src/stores/deploy'
import type { DeploySteps } from '@/src/stores/deploy/types'
import { ContainerPadding, InnerContainer } from '@bootnodedev/db-ui-toolkit'
import type { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(InnerContainer)`
  align-items: center;
  flex-direction: column;
  row-gap: calc(var(--base-gap-xl) * 3);

  ${ContainerPadding}
`

const getTitle = (step: string, formType: string | undefined) =>
  step === 'unset' ? (
    <>
      Create your
      <br />
      multichain token
    </>
  ) : formType === 'new' ? (
    <>
      Launch a
      <br />
      multichain token
    </>
  ) : formType === 'upgrade' ? (
    <>
      Expand your
      <br />
      existing token
    </>
  ) : (
    <></>
  )

const getText = (step: string, formType: string | undefined) =>
  step === 'unset' ? (
    <>
      Expand or launch your token across multiple networks <br />
      and unlock seamless cross-chain functionality
    </>
  ) : formType === 'new' ? (
    <>
      Deploy a new token ready for multichain <br />
      integration from day one
    </>
  ) : formType === 'upgrade' ? (
    <>
      Transform your existing token into a multichain asset <br />
      without altering its original contract.
    </>
  ) : (
    <></>
  )

const ExpandTokenSteps: FC<{ step: (typeof DeploySteps)[number] }> = ({ step }) => {
  return step === 'setup' ? (
    <ExpandTokenFields />
  ) : step === 'peers' ? (
    <>
      <ExpandTokenMainTitle />
      <PeersTokenInfo />
      <PeerChainsSelector title="Additional chains" />
      <PeersButtons />
    </>
  ) : step === 'deploy' ? (
    <>
      <ExpandTokenMainTitle />
      <DeployButtons />
    </>
  ) : (
    <></>
  )
}

const LaunchTokenSteps: FC<{ step: (typeof DeploySteps)[number] }> = ({ step }) => {
  return step === 'setup' ? (
    <LaunchTokenFields />
  ) : step === 'peers' ? (
    <>
      <LaunchTokenMainTitle />
      <PeerChainsSelector title="Chains to deploy" />
      <PeersButtons />
    </>
  ) : (
    <>
      <LaunchTokenMainTitle />
      <DeployButtons />
    </>
  )
}

const DeployPage = ({ ...restProps }) => {
  const { formType, step } = useDeployStore()
  const title = getTitle(step, formType)
  const text = getText(step, formType)

  return (
    <Wrapper {...restProps}>
      <MainText
        title={title}
        text={text}
      />
      <FormWrapper>
        {formType === undefined && <NttTypeSelector />}
        {formType === 'new' && <LaunchTokenSteps step={step} />}
        {formType === 'upgrade' && <ExpandTokenSteps step={step} />}
      </FormWrapper>
    </Wrapper>
  )
}
export default DeployPage
