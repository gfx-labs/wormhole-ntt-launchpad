import Hash from '@/src/components/sharedComponents/Hash'
import { TokenInfoItem } from '@/src/components/sharedComponents/form/TokenInfoItem'
import { InnerCard, InnerTitle, NotFound } from '@/src/components/sharedComponents/form/ui'
import { networks } from '@/src/constants/networks'
import { useTokenInfo } from '@/src/hooks/useTokenInfo'
import { allChains } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import { getAnyChainById } from '@/src/utils/getChainById'
import { getExplorerLink } from '@/src/utils/getExplorerLink'
import { NumberType, formatNumberOrString } from '@/src/utils/numberFormat'
import onCopyToast from '@/src/utils/onCopyToast'
import { Spinner as BaseSpinner, breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'
import { formatUnits, isAddress } from 'viem'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--base-common-padding) * 3);
  row-gap: calc(var(--base-gap) * 3);
  width: 100%;
`

const Spinner = styled(BaseSpinner)`
  grid-column: 1 / -1;
  margin: auto;
`

const Items = styled(InnerCard)`
  display: grid;
  gap: var(--base-gap);
  min-height: 325px;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      grid-template-columns: 1fr 1fr;
    `,
  )}
`

const ExpandTokenInfo = ({ ...restProps }) => {
  const { tokenAddress, homeChain } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const { data, isLoading } = useTokenInfo({
    address: tokenAddress,
    chainId: homeChain,
  })
  const chain = getAnyChainById(homeChain)
  const selectedChain = allChains.find((item) => item.id === homeChain)

  return !tokenAddress || !homeChain || !isAddress(tokenAddress) ? null : (
    <Wrapper {...restProps}>
      <InnerTitle>ERC20 token information</InnerTitle>
      <Items>
        {isLoading ? (
          <Spinner />
        ) : !data ? (
          <NotFound>Token not found</NotFound>
        ) : (
          <>
            <TokenInfoItem
              title="Token Name"
              data={data.name}
            />
            <TokenInfoItem
              title="Token Symbol"
              data={data.symbol}
            />
            <TokenInfoItem
              title="Home Chain"
              data={
                <>
                  {networks.find((item) => item.id === selectedChain?.id)?.icon}
                  {selectedChain ? selectedChain.name : 'Select network'}
                </>
              }
            />
            <TokenInfoItem
              title="Decimals"
              data={data.decimals}
            />
            <TokenInfoItem
              title="Owner"
              data={
                data.owner ? (
                  <Hash
                    explorerURL={getExplorerLink({
                      chain,
                      hashOrAddress: data.owner,
                    })}
                    hash={data.owner}
                    onCopy={() => onCopyToast()}
                    showCopyButton
                  />
                ) : (
                  'N/A'
                )
              }
            />
            <TokenInfoItem
              title="Total Supply"
              data={formatNumberOrString(
                formatUnits(data.totalSupply, data.decimals),
                NumberType.TokenTx,
              )}
            />
          </>
        )}
      </Items>
    </Wrapper>
  )
}

export default ExpandTokenInfo
