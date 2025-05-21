import styled from 'styled-components'
import { type Address, formatUnits } from 'viem'
import { useBalance } from 'wagmi'
import { useWeb3Status } from '../../../../../../hooks/useWeb3Status'
import { type WormholeChainId, getEvmChainId } from '../../../../../../utils/wormholeChains'

interface ChainItemProps {
  $active?: boolean
}

const TokenItem = styled.div<ChainItemProps>`
  display: flex;
  padding: 16px 36px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex: 1 0 0;
  color: white;
  border-radius: 12px;
  background: ${({ $active }) => ($active ? '#212025' : '#19181a')};
  cursor: ${({ $active }) => ($active ? 'default' : 'pointer')};

  &:hover {
    background: #212025;
  }
`

const TokenText = styled.div`
  color: var(--colors-neutral-grey-white, #fff);
  text-align: justify;
  font-kerning: none;
  font-feature-settings: 'calt' off;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px; /* 128.571% */
`

interface TokenSelectorProps {
  item: {
    name: string
    tokenAddress: Address
    symbol: string
    onClick: () => void
  }
  selectedChain: { chain: string; wormholeChainId: WormholeChainId }
}

const TokenSelector = ({ item, selectedChain }: TokenSelectorProps) => {
  const isActive = true
  const { address } = useWeb3Status()
  const chainId = getEvmChainId(selectedChain.wormholeChainId)

  const { data: currentTokenBalance } = useBalance({
    address: address as `0x${string}`,
    chainId: typeof chainId === 'number' ? chainId : undefined,
    token: item.tokenAddress,
  })
  const formattedCurrentTokenBalance = formatUnits(currentTokenBalance?.value ?? 0n, 18)

  return (
    <TokenItem
      className={isActive ? 'active' : ''}
      key={item.name}
      onClick={item.onClick}
    >
      <TokenText>{item.name} </TokenText>
      <TokenText>{`${formattedCurrentTokenBalance} ${item.symbol}`}</TokenText>
    </TokenItem>
  )
}
export default TokenSelector
