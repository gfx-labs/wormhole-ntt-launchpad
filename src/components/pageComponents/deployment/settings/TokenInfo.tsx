import PeerChains from '@/src/components/pageComponents/deployment/settings/PeerChains'
import Hash from '@/src/components/sharedComponents/Hash'
import { TokenInfoItem } from '@/src/components/sharedComponents/form/TokenInfoItem'
import { wormholeAddressToAddress } from '@/src/utils/address'
import { getExplorerLink } from '@/src/utils/getExplorerLink'
import onCopyToast from '@/src/utils/onCopyToast'
import { type WormholeChainId, getEvmChain } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentProps, FC } from 'react'
import styled, { css } from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled.div`
  display: grid;
  row-gap: var(--base-gap);
  width: 100%;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      column-gap: var(--base-gap-xl);
      grid-template-columns: 1fr 1fr;

      > div:last-child {
        grid-column: 1 / -1;
      }
    `,
  )}

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      column-gap: var(--base-gap-xl);
      grid-template-columns: 1fr 1fr 1fr;

      > div:last-child {
        grid-column: auto;
      }
    `,
  )}
`

const TokenInfo: FC<
  ComponentProps<'div'> & {
    managerAddress: string
    wormholeTokenAddress: string
    wormholeChainId: WormholeChainId
  }
> = ({ wormholeTokenAddress, managerAddress, wormholeChainId, ...restProps }) => {
  const _chain = getEvmChain(wormholeChainId)
  const explorerURL = _chain?.blockExplorers?.default.url
  const tokenAddress = wormholeAddressToAddress(wormholeTokenAddress)

  return (
    <Wrapper {...restProps}>
      <TokenInfoItem
        title="Token Address"
        data={
          <Hash
            explorerURL={getExplorerLink({
              chain: _chain,
              hashOrAddress: tokenAddress as Address,
              explorerUrl: explorerURL,
            })}
            hash={tokenAddress}
            onCopy={() => onCopyToast()}
            showCopyButton
            truncatedHashLength="disabled"
          />
        }
      />
      <TokenInfoItem
        title="Manager Address"
        data={
          <Hash
            explorerURL={getExplorerLink({
              chain: _chain,
              hashOrAddress: managerAddress as Address,
              explorerUrl: explorerURL,
            })}
            hash={managerAddress}
            onCopy={() => onCopyToast()}
            showCopyButton
            truncatedHashLength="disabled"
          />
        }
      />
      <TokenInfoItem
        title="Peer chains"
        data={
          <PeerChains
            wormholeTokenAddress={wormholeTokenAddress}
            wormholeChainId={wormholeChainId}
          />
        }
      />
    </Wrapper>
  )
}

export default TokenInfo
