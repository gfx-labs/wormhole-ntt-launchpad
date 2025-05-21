import {
  CloseButton as BaseCloseButton,
  Title as BaseTitle,
  Wrapper as BaseWrapper,
  Close,
} from '@/src/components/sharedComponents/modal/ui'
import { PrimaryButton, PrimaryInvertedButton } from '@/src/components/sharedComponents/ui/Buttons'
import { networks } from '@/src/constants/networks'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import type { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(BaseWrapper)`
  min-width: fit-content;
  padding-left: calc(var(--base-common-padding) * 3);
  padding-right: calc(var(--base-common-padding) * 3);
  row-gap: calc(var(--base-gap) * 3);
`

const CloseButton = styled(BaseCloseButton)`
  margin-left: auto;
`

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap);
`

const Title = styled(BaseTitle)`
  font-size: 5rem;
  text-align: center;
`

const Text = styled.p`
  color: var(--theme-text-color);
  font-size: 1.6rem;
  font-weight: normal;
  line-height: 1.5;
  margin:  calc(var(--base-gap) * -1) 0 0;
  text-align: center;
`

const Contents = styled.div`
  border-radius: var(--base-border-radius-xl);
  border: solid 1px rgb(255 255 255 / 12%);
  display: flex;
  flex-direction: column;
  padding: var(--base-common-padding-xl);
  row-gap: var(--base-gap);
`

const Row = styled.div`
  align-items: center;
  column-gap: var(--base-gap);
  display: flex;
  justify-content: space-between;
`

const Value = styled.div`
  align-items: center;
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap);
  display: flex;
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 1.2;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap-xl);
`

const IconWrapper = styled.div`
  --icon-size: 18px;

  height: var(--icon-size);
  width: var(--icon-size);

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

interface AddChainModalProps {
  address: string
  chain: WormholeChainId
  onClose: () => void
  unlinkedPeerChainId: number
}

const AddChainModal: FC<AddChainModalProps> = ({
  address,
  chain,
  onClose,
  unlinkedPeerChainId,
  ...restProps
}) => {
  const { data: tokenInfo } = useTokenByChainAndAddress(chain, address)

  return (
    <Wrapper {...restProps}>
      <CloseButton onClick={onClose}>
        <Close />
      </CloseButton>
      <MainText>
        <Title>
          Add chain to your
          <br />
          multichain token
        </Title>
        <Text>
          To continue please accept the
          <br />
          information below.
        </Text>
      </MainText>
      <Contents>
        <Row>
          <Value>Token name:</Value>
          <Value>{tokenInfo.home.token.name}</Value>
        </Row>
        <Row>
          <Value>Token symbol:</Value>
          <Value>{tokenInfo.home.token.symbol}</Value>
        </Row>
        <Row>
          <Value>Sending limits:</Value>
          <Value>
            <IconWrapper>
              {networks.find((network) => network.id === unlinkedPeerChainId)?.icon}
            </IconWrapper>
            {networks.find((network) => network.id === unlinkedPeerChainId)?.label}
          </Value>
        </Row>
        <Row>
          <Value>Receiving limits:</Value>
          <Value>1000</Value>
        </Row>
      </Contents>
      <Buttons>
        <PrimaryButton onClick={onClose}>Accept</PrimaryButton>
        <PrimaryInvertedButton onClick={onClose}>Cancel Transfer</PrimaryInvertedButton>
      </Buttons>
    </Wrapper>
  )
}

export default AddChainModal
