import type { NTTToken } from '@/src/api/endpoints'
import type { TokenLimit } from '@/src/hooks/useTokensLimits'
import { WORMHOLE_CHAIN_ID_TO_ICON, type WormholeChainId } from '@/src/utils/wormholeChains'
import { createElement } from 'react'
import styled from 'styled-components'

export const Wrapper = styled.div`
  --percentage-width: 200px;
  --percentage-border-radius: 12px;

  align-items: center;
  column-gap: var(--base-gap-xl);
  display: grid;
  grid-template-columns: 1fr var(--percentage-width) 1fr;
  line-height: 1.2;
`

const ChainWrapper = styled.div`
  --icon-size: 18px;

  column-gap: var(--base-gap);
  display: grid;
  grid-template-columns: var(--icon-size) 1fr;
`

const IconWrapper = styled.div`
  height: var(--icon-size);
  width: var(--icon-size);

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

const ChainName = styled.div`
  color: var(--theme-text-color-light);
  font-size: 1.4rem;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Percentage = styled.div`
  background-color: rgb(193 187 246 / 15%);
  border-radius: var(--percentage-border-radius);
  height: 18px;
  overflow: hidden;
  position: relative;
  width: var(--percentage-width);
`

const Bar = styled.div<{ value: number }>`
  background-color: rgb(193 187 246);
  border-radius: var(--percentage-border-radius);
  height: 100%;
  width: ${({ value }) => value}%;
  z-index: 5;
`

const Value = styled.div`
  align-items: center;
  color: var(--theme-text-color-light);
  display: flex;
  font-size: 1.4rem;
  height: 100%;
  line-height: 1;
  padding-left: var(--base-common-padding);
`

const LimitValues = styled.div`
  color: var(--theme-text-color);
  font-size: 1.4rem;
`

const TokenLimits = ({
  token,
  tokenLimit: {
    blockchain,
    availablePercentage: percentage,
    currentCapacity,
    maxCapacity,
    wormholeChainId,
  },
  outbound,
  ...restProps
}: {
  token: NTTToken
  tokenLimit: TokenLimit
  outbound?: boolean
}) => {
  // const decimals = BigInt(10 ** token.token.decimals)
  // //const maxLimitWithDecimals = maxLimit * decimals
  // const usedAmount = maxLimitWithDecimals - currentLimit
  // const formattedUsedAmount = formatUnits(usedAmount, token.token.decimals)
  // const formattedMaxLimit = formatUnits(maxLimitWithDecimals, token.token.decimals)
  const icon = WORMHOLE_CHAIN_ID_TO_ICON[wormholeChainId as WormholeChainId]
  return (
    <Wrapper {...restProps}>
      <ChainWrapper>
        <IconWrapper>{icon ? createElement(icon) : null}</IconWrapper>
        <ChainName>
          {blockchain} {outbound ? 'sending' : 'receiving'} limits
        </ChainName>
      </ChainWrapper>
      <Percentage>
        <Bar value={percentage}>
          <Value>{percentage}%</Value>
        </Bar>
      </Percentage>
      <LimitValues>
        {maxCapacity - currentCapacity} of {maxCapacity}
      </LimitValues>
    </Wrapper>
  )
}

export default TokenLimits
