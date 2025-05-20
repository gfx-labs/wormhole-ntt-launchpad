import DeploymentDetails from '@/src/components/pageComponents/deployment/dashboard/DeploymentDetails'
import SupplyByChain from '@/src/components/pageComponents/deployment/dashboard/SupplyByChain'
import Title from '@/src/components/pageComponents/deployment/dashboard/Title'
import TokenAddresses from '@/src/components/pageComponents/deployment/dashboard/TokenAddresses'
import { FormWrapper } from '@/src/components/sharedComponents/form/FormWrapper'
import { MainText } from '@/src/components/sharedComponents/ui/MainText'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import { ContainerPadding, InnerContainer } from '@bootnodedev/db-ui-toolkit'
import { GeneralMessage } from '@bootnodedev/db-ui-toolkit'
import styled from 'styled-components'
import TransferWrapper from './Transfer/TransferWrapper'

const Wrapper = styled(InnerContainer)`
  align-items: center;
  flex-direction: column;
  row-gap: calc(var(--base-gap-xl) * 4);

  ${ContainerPadding}
`

const DeploymentDashboard = ({
  address,
  chain,
  ...restProps
}: {
  address: string
  chain: WormholeChainId
}) => {
  const { data: tokenInfo } = useTokenByChainAndAddress(chain, address)

  return !tokenInfo ? (
    <GeneralMessage message={'No token info'} />
  ) : (
    <Wrapper {...restProps}>
      <MainText title="Token Dashboard" />
      <FormWrapper>
        <Title
          token={tokenInfo.home}
          address={address}
          chain={chain}
        />
        <TokenAddresses tokens={[tokenInfo.home, ...tokenInfo.peers]} />
        <TransferWrapper tokens={[tokenInfo.home, ...tokenInfo.peers]} />
        <SupplyByChain tokens={[tokenInfo.home, ...tokenInfo.peers]} />
        <DeploymentDetails token={tokenInfo} />
      </FormWrapper>
    </Wrapper>
  )
}

export default DeploymentDashboard
