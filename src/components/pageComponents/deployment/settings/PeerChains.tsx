import { getNetworkIcon } from '@/src/constants/networks'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import { type WormholeChainId, getEvmChainId } from '@/src/utils/wormholeChains'
import type { ComponentProps, FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  column-gap: var(--base-gap);
  display: flex;
`

const Icon = styled.div`
  --size: 18px;

  height: var(--size);
  width: var(--size);
  filter: grayscale(0%);

  svg {
    max-height: 100%;
    max-width: 100%;
  }
`

const PeerChains: FC<
  ComponentProps<'div'> & {
    wormholeTokenAddress: string
    wormholeChainId: WormholeChainId
  }
> = ({ wormholeTokenAddress, wormholeChainId, ...restProps }) => {
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, wormholeTokenAddress)

  const allChains = [tokenInfo.home, ...tokenInfo.peers]

  return (
    <Wrapper {...restProps}>
      {allChains.map(({ wormholeChainId }) => {
        const evmChainId = getEvmChainId(wormholeChainId)
        return (
          <Icon
            // active items will be rendered in color
            //className={isActive ? 'active' : ''}
            className={'active'}
            key={wormholeChainId}
          >
            {evmChainId ? getNetworkIcon(evmChainId) : null}
          </Icon>
        )
      })}
    </Wrapper>
  )
}

export default PeerChains
