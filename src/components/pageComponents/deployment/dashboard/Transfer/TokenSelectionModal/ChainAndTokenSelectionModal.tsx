import {
  Close,
  CloseButton,
  Title,
  TitleWrapper,
  Wrapper,
} from '@/src/components/sharedComponents/modal/ui'
import { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import type { NTTToken } from '../../../../../../api/endpoints'

import type { Address } from 'viem'
import ChainSelector from './ChainSelector'
import TokenSelector from './TokenSelector'

export const baseTextStyles = css`
  color: var(--white, #fff);
  font-family: 'Roboto Mono', monospace;
  font-style: normal;
  font-weight: 400;
`

const ModalWrapper = styled(Wrapper)`
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 24px;
`
const SmallText = styled.div`
  ${baseTextStyles};
  font-size: 1.2rem;
  line-height: 0.875rem;
  color: var(--colors-neutral-grey-400, #7c85a2);
  font-kerning: none;
  font-feature-settings: 'calt' off;
`

const ChainWrapper = styled.div`
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  display: flex;
`

const TokenWrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  border-radius: 12px;
  background: #19181a;
  gap: 16px;
`

interface Props {
  onClose: () => void
  items: NTTToken[]
  onSelect: (token: NTTToken) => void
}

export const ChainTokenSelectionModal = ({ onClose, items, onSelect, ...restProps }: Props) => {
  const uniqueChains = Array.from(
    new Map(items.map((item) => [item.blockchain, item.wormholeChainId])),
  ).map(([chain, wormholeChainId]) => ({ chain, wormholeChainId }))

  const [selectedChain, setSelectedChain] = useState(uniqueChains[0] || '')

  const chainItems = useMemo(
    () =>
      uniqueChains.map((chain) => {
        return {
          blockchain: chain,
          isSelected: chain.chain === selectedChain.chain,
          onClick: () => setSelectedChain(chain),
        }
      }),
    [uniqueChains, selectedChain],
  )

  const tokenItem = useMemo(() => {
    const selectedToken = items.find((item) => item.blockchain === selectedChain.chain)
    if (!selectedToken) return null

    return {
      name: selectedToken.token.name,
      tokenAddress: selectedToken.token.address as unknown as Address,
      symbol: selectedToken.token.symbol,
      onClick: () => {
        onSelect(selectedToken)
        onClose()
      },
    }
  }, [items, selectedChain, onSelect, onClose])

  return (
    <ModalWrapper {...restProps}>
      <TitleWrapper>
        <Title>SELECT A CHAIN AND TOKEN</Title>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </TitleWrapper>
      <ChainWrapper>
        <ChainSelector items={chainItems} />
      </ChainWrapper>
      <TokenWrapper>
        <SmallText>My Tokens</SmallText>
        {tokenItem ? (
          <TokenSelector
            item={tokenItem}
            selectedChain={selectedChain}
          />
        ) : (
          <SmallText>No tokens found</SmallText>
        )}
      </TokenWrapper>
    </ModalWrapper>
  )
}
