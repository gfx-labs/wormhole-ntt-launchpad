import {
  Wrapper as BaseWrapper,
  Close,
  CloseButton,
  Item,
  Title,
  TitleWrapper,
} from '@/src/components/sharedComponents/modal/ui'
import { networks } from '@/src/constants/networks'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import { formatWormholeAddress } from '@/src/utils/address'
import { type WormholeChainId, getEvmChainId } from '@/src/utils/wormholeChains'
import { useNavigate } from '@tanstack/react-router'
import type { FC } from 'react'
import styled from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled(BaseWrapper)`
  min-width: fit-content;
`

/* const Footer = styled.div`
  background-color: rgb(255 255 255 / 4%);
  border-bottom-left-radius: var(--base-border-radius-xl);
  border-bottom-right-radius: var(--base-border-radius-xl);
  border-top: solid 1px rgb(255 255 255 / 12%);
  margin: calc(var(--base-gap) * 3) calc(var(--base-common-padding-xl) * -1) calc(var(--base-gap) * -4);
  padding: calc(var(--base-common-padding) * 3) var(--base-common-padding-xl);
` */

interface Props {
  onClose: () => void
  //selectedId?: (typeof networks)[number]['id']
  showDeployTokenToNewChain?: boolean
  wormholeChainId: WormholeChainId
  wormholeTokenAddress: string
}

const ChainSelectionModalManager: FC<Props> = ({
  onClose,
  //selectedId,
  showDeployTokenToNewChain = false,
  wormholeTokenAddress: tokenAddress,
  wormholeChainId,
  ...restProps
}) => {
  const navigate = useNavigate()
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, tokenAddress)

  return (
    <Wrapper {...restProps}>
      <TitleWrapper>
        <Title>Select a chain</Title>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </TitleWrapper>
      {tokenInfo.peers.map(({ wormholeChainId: peerWormholeChainId, token: peerToken }) => {
        const peerChainId = getEvmChainId(peerWormholeChainId)
        const network = networks.find(({ id }) => id === peerChainId)

        return (
          <Item
            key={peerWormholeChainId}
            onClick={() => {
              navigate({
                to: `/deployment/settings/${peerWormholeChainId}/${formatWormholeAddress(
                  peerToken.address as Address,
                ).slice(2)}`,
              })
              onClose()
            }}
          >
            {network?.icon}
            {network?.label}
          </Item>
        )
      })}
      {/*  {showDeployTokenToNewChain && (
        <Footer>
          <PrimaryButtonSmall>Deploy token to a new chain</PrimaryButtonSmall>
        </Footer>
      )} */}
    </Wrapper>
  )
}

export default ChainSelectionModalManager
