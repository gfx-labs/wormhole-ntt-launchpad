import type { NTTToken } from '@/src/api/endpoints'
import BaseHash from '@/src/components/sharedComponents/Hash'
import { InnerCardOpaque } from '@/src/components/sharedComponents/form/ui'
import { getExplorerLink } from '@/src/utils/getExplorerLink'
import onCopyToast from '@/src/utils/onCopyToast'
import {
  WORMHOLE_CHAIN_ID_TO_ICON,
  type WormholeChainId,
  getEvmChain,
} from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { createElement } from 'react'
import styled, { css } from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled(InnerCardOpaque)`
  padding: var(--base-common-padding-xl);
  row-gap: var(--base-gap-xl);
`

const Title = styled.h3`
  color: var(--theme-text-color);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`

const Items = styled.div`
  align-items: center;
  display: grid;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      gap: var(--base-gap) calc(var(--base-gap) * 7);
      grid-template-columns: 1fr 1fr 1fr;
    `,
  )}
`

const Item = styled.div`
  align-items: center;
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap);
  display: flex;
  font-size: 1.4rem;
  font-weight: 400;
  min-width: 0;
`

const Icon = styled.div`
  --icon-size: 18px;

  flex-shrink: 0;
  height: var(--icon-size);
  width: var(--icon-size);

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

const Hash = styled(BaseHash)`
  column-gap: var(--base-gap);
  max-width: calc(100% - 38px);
`

const TokenAddresses = ({ tokens, ...restProps }: { tokens: NTTToken[] }) => (
  <Wrapper {...restProps}>
    <Title>Token addresses</Title>
    <Items>
      {tokens.map((ti) => {
        const chain = getEvmChain(ti.wormholeChainId as WormholeChainId)
        if (!chain) {
          console.log('No chain found for token', ti)
          return <></>
        }
        return (
          <Item key={`${ti.wormholeChainId}-${ti.token.address}`}>
            <Icon>
              {createElement(WORMHOLE_CHAIN_ID_TO_ICON[ti.wormholeChainId as WormholeChainId])}
            </Icon>
            <Hash
              explorerURL={getExplorerLink({
                chain,
                hashOrAddress: ti.token.address as Address,
              })}
              hash={ti.token.address as string}
              onCopy={() => onCopyToast()}
              showCopyButton
              truncatedHashLength="disabled"
            />
          </Item>
        )
      })}
    </Items>
  </Wrapper>
)

export default TokenAddresses
