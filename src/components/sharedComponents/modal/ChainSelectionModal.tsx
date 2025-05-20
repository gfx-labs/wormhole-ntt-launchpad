import {
  Close,
  CloseButton,
  Item,
  Title,
  TitleWrapper,
  Wrapper,
} from '@/src/components/sharedComponents/modal/ui'
import { networks } from '@/src/constants/networks'
import type { AllChainsIds } from '@/src/lib/networks.config'
import type { FC } from 'react'
import styled from 'styled-components'
import { WORMHOLE_CHAIN_ID_TO_ICON } from '../../../utils/wormholeChains'

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--theme-color-darker-gray);
    border-radius: var(--base-border-radius-xl);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--theme-scrollbar-thumb, #888);
    border-radius: var(--base-border-radius-xl);
  }
`
interface ChainSelectorProps {
  filterSelected?: boolean
  items: Array<{
    id: number | string
    isActive?: boolean
    name: string
    onClick: () => void
  }>
}

export const ChainSelector: FC<ChainSelectorProps> = ({ items, filterSelected = false }) => {
  const filteredItems = filterSelected ? items.filter((item) => !item.isActive) : items

  const Icon = WORMHOLE_CHAIN_ID_TO_ICON[1]
  return (
    <>
      <ItemWrapper>
        <Item className="disabled">
          <Icon /> Solana (Coming Soon)
        </Item>
        {filteredItems.map(({ isActive, id, onClick, name }) => (
          <Item
            className={isActive ? 'active' : ''}
            key={id}
            onClick={onClick}
          >
            {networks.find((item) => item.id === id)?.icon}
            {name}
          </Item>
        ))}
      </ItemWrapper>
    </>
  )
}

interface Props {
  onClose: () => void
  items: Array<{
    id: AllChainsIds
    isActive?: boolean
    name: string
    onClick: () => void
  }>
}

export const ChainSelectionModal: FC<Props> = ({ onClose, items, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <TitleWrapper>
        <Title>Select a chain</Title>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
      </TitleWrapper>
      <ChainSelector
        items={items.map(({ id, name, onClick, isActive }) => ({
          id: id,
          name: name,
          onClick: () => {
            onClick()
            onClose()
          },
          isActive: isActive,
        }))}
      />
    </Wrapper>
  )
}
