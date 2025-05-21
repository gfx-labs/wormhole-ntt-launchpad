import { createElement } from 'react'
import styled from 'styled-components'
import {
  WORMHOLE_CHAIN_ID_TO_ICON,
  type WormholeChainId,
} from '../../../../../../utils/wormholeChains'
import { Icon } from '../../../../../sharedComponents/TokenInput/Components'

interface ChainItemProps {
  $active?: boolean
}

const ChainItem = styled.div<ChainItemProps>`
  display: flex;
  padding: 16px 36px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  color: white;
  border-radius: 12px;
  background: #19181a;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};

  &:hover {
    opacity: 1;
  }
`

interface ChainSelectorProps {
  items: {
    blockchain: { chain: string; wormholeChainId: WormholeChainId }
    isSelected: boolean
    onClick: () => void
  }[]
}

const ChainSelector = ({ items }: ChainSelectorProps) => {
  return (
    <>
      {items.map((item) => {
        const icon = WORMHOLE_CHAIN_ID_TO_ICON[item.blockchain.wormholeChainId]
        return (
          <ChainItem
            $active={item.isSelected}
            key={item.blockchain.chain}
            onClick={item.onClick}
          >
            <Icon>{icon ? createElement(icon) : null}</Icon>
            {item.blockchain.chain}
          </ChainItem>
        )
      })}
    </>
  )
}

export default ChainSelector
