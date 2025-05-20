import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentProps, FC } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  row-gap: var(--base-gap);
`

const Title = styled.h3`
  color: var(--theme-text-color);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`

const TitleAndSymbolWrapper = styled.h2`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 2.8rem;
  line-height: 1;
  text-transform: uppercase;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      font-size: 3.6rem;
    `,
  )}
`

const TokenSymbol = styled.span`
  color: var(--theme-color-primary-dark);
`

interface Props extends ComponentProps<'div'> {
  name: string
  symbol: string
  title?: string
}

export const TokenTitle: FC<Props> = ({ name, symbol, title, ...restProps }) => (
  <Wrapper {...restProps}>
    {title && <Title>{title}</Title>}
    <TitleAndSymbolWrapper>
      {name} <TokenSymbol>({symbol})</TokenSymbol>
    </TitleAndSymbolWrapper>
  </Wrapper>
)
