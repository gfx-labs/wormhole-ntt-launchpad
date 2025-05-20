import type { NTTToken } from '@/src/api/endpoints'
import TokenLimits, {
  Wrapper as TokenLimitsRow,
} from '@/src/components/pageComponents/deployment/dashboard/TokenLimits'
import { InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { InnerCardOpaque } from '@/src/components/sharedComponents/form/ui'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import { useTokensLimits } from '@/src/hooks/useTokensLimits'
import { formatWormholeAddress } from '@/src/utils/address'
import { WORMHOLE_CHAIN_ID_TO_ICON, type WormholeChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { createElement, useState } from 'react'
import styled, { css } from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: var(--base-gap-xl);
  row-gap: var(--base-gap-xl);
`

const Title = styled(InnerCardTitle)`
  font-size: 3.6rem;
`

const Item = styled.div<{ $isExpanded?: boolean }>`
  background-color: rgb(255 255 255 / 6%);
  border-radius: calc(
    var(--base-border-radius-xl) + var(--base-border-radius-sm)
  );
  box-shadow: 0 2px 6px 0 rgb(13 10 44 / 8%);
  cursor: ${({ $isExpanded }) => ($isExpanded ? 'default' : 'pointer')};
  display: flex;
  flex-direction: column;
  padding: 0 var(--base-gap-xl) var(--base-gap-xl);
  row-gap: calc(var(--base-gap-xl) * 2);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: 0 calc(var(--base-gap-xl) * 2) calc(var(--base-gap) * 3);
    `,
  )}
`

const Toggle = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap);
  cursor: pointer;
  display: flex;
  margin-left: calc(var(--base-gap-xl) * -1);
  margin-right: calc(var(--base-gap-xl) * -1);
  padding-left: var(--base-gap-xl);
  padding-right: var(--base-gap-xl);
  padding-top: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      margin-left: calc(var(--base-gap-xl) * -2);
      margin-right: calc(var(--base-gap-xl) * -2);
      padding-left: calc(var(--base-gap-xl) * 2);
      padding-right: calc(var(--base-gap-xl) * 2);
      padding-top: calc(var(--base-gap) * 3);
    `,
  )}

  &:active {
    opacity: 0.8;
  }

  ${InnerCardTitle} {
    position: relative;
    top: 2px;
  }

  .chevronDown {
    margin-left: auto;
    transition: transform var(--base-transition-duration-sm) ease-in-out;
  }

  &.isExpanded {
    .chevronDown {
      transform: rotate(180deg);
    }
  }
`

const Icon = styled.span`
  --icon-size: 24px;

  height: var(--icon-size);
  width: var(--icon-size);

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

const InnerCard = styled(InnerCardOpaque)`
  padding: var(--base-gap-xl);
  row-gap: var(--base-gap);
`

const OverflowWrapper = styled.div`
  overflow-x: auto;
`

const Limits = styled.div`
  display: flex;
  flex-direction: column;
  min-width: max-content;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      min-width: 0;
    `,
  )}
`

const TokenLimitsTitles = styled(TokenLimitsRow)`
  border-bottom: 1px solid rgb(255 255 255 / 12%);
  padding-bottom: var(--base-gap);
`

const RowTitle = styled.div`
  align-items: center;
  color: var(--theme-text-color);
  font-size: 1.4rem;
  font-weight: 400;
`

const RefreshButton = styled.button`
  --button-size: 34px;

  align-items: center;
  background-color: var(--theme-color-darker-gray);
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  height: var(--button-size);
  justify-content: center;
  margin-left: auto;
  padding: 0;
  width: var(--button-size);

  &:active {
    opacity: 0.8;
  }
`

const WarningText = styled.div`
  align-items: center;
  color: var(--theme-text-color);
  column-gap: var(--base-gap);
  display: flex;
  font-size: 1.3rem;
  font-weight: 400;
  padding-top: calc(var(--base-gap) * 3);
`

const ChevronDown = () => (
  <svg
    className="chevronDown"
    fill="none"
    height="9"
    viewBox="0 0 16 9"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9132 2.32956L8.66325 8.57956C8.57615 8.66696 8.47266 8.7363 8.3587 8.78362C8.24475 8.83094 8.12257 8.8553 7.99918 8.8553C7.8758 8.8553 7.75362 8.83094 7.63967 8.78362C7.52571 8.7363 7.42222 8.66696 7.33512 8.57956L1.08512 2.32956C0.909002 2.15344 0.810059 1.91456 0.810059 1.66549C0.810059 1.41642 0.909002 1.17755 1.08512 1.00143C1.26124 0.825311 1.50011 0.726367 1.74918 0.726367C1.99826 0.726367 2.23713 0.825311 2.41325 1.00143L7.99997 6.58815L13.5867 1.00065C13.7628 0.82453 14.0017 0.725586 14.2507 0.725586C14.4998 0.725586 14.7387 0.82453 14.9148 1.00065C15.0909 1.17677 15.1899 1.41564 15.1899 1.66471C15.1899 1.91378 15.0909 2.15265 14.9148 2.32877L14.9132 2.32956Z"
      fill="currentColor"
    />
  </svg>
)

const RefreshIcon = () => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.1564 2.93753V6.31253C16.1564 6.53631 16.0675 6.75092 15.9093 6.90916C15.751 7.06739 15.5364 7.15628 15.3127 7.15628H11.9377C11.7139 7.15628 11.4993 7.06739 11.341 6.90916C11.1828 6.75092 11.0939 6.53631 11.0939 6.31253C11.0939 6.08876 11.1828 5.87415 11.341 5.71591C11.4993 5.55768 11.7139 5.46878 11.9377 5.46878H13.14L11.8041 4.24675C11.7949 4.23832 11.7858 4.22988 11.7773 4.22074C11.1579 3.60168 10.3958 3.14434 9.55812 2.88898C8.72043 2.63361 7.83281 2.58804 6.97337 2.75627C6.11393 2.9245 5.309 3.30138 4.62942 3.85375C3.94984 4.40611 3.41642 5.11704 3.07611 5.92396C2.7358 6.73089 2.59903 7.60909 2.67783 8.48129C2.75662 9.35349 3.04857 10.193 3.52799 10.9258C4.0074 11.6587 4.65959 12.2625 5.42716 12.6842C6.19474 13.1058 7.05417 13.3323 7.92985 13.3438H8.00016C9.36417 13.3471 10.6771 12.8254 11.667 11.8869C11.8297 11.7332 12.0468 11.6503 12.2705 11.6567C12.4943 11.663 12.7064 11.758 12.8602 11.9207C13.0139 12.0834 13.0967 12.3005 13.0904 12.5243C13.0841 12.748 12.9891 12.9601 12.8264 13.1139C11.5234 14.3488 9.7954 15.0354 8.00016 15.0313H7.90383C6.75285 15.0151 5.62346 14.7165 4.61481 14.1618C3.60617 13.6072 2.74913 12.8133 2.11895 11.8501C1.48878 10.8868 1.10473 9.78352 1.00054 8.63715C0.896354 7.49078 1.07521 6.33636 1.5214 5.27526C1.96759 4.21416 2.66747 3.27883 3.55959 2.5514C4.45171 1.82398 5.50877 1.3267 6.63797 1.10324C7.76717 0.879784 8.93396 0.936975 10.0359 1.26979C11.1378 1.60261 12.1412 2.20088 12.9579 3.01207L14.4689 4.39441V2.93753C14.4689 2.71376 14.5578 2.49915 14.716 2.34091C14.8743 2.18268 15.0889 2.09378 15.3127 2.09378C15.5364 2.09378 15.751 2.18268 15.9093 2.34091C16.0675 2.49915 16.1564 2.71376 16.1564 2.93753Z"
      fill="#C1BBF6"
    />
  </svg>
)

const WarningIcon = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 0.1875C6.55373 0.1875 5.13993 0.616371 3.9374 1.41988C2.73486 2.22339 1.7976 3.36544 1.24413 4.70163C0.690668 6.03781 0.545857 7.50811 0.828011 8.9266C1.11017 10.3451 1.80661 11.648 2.82928 12.6707C3.85196 13.6934 5.15492 14.3898 6.57341 14.672C7.99189 14.9541 9.46219 14.8093 10.7984 14.2559C12.1346 13.7024 13.2766 12.7651 14.0801 11.5626C14.8836 10.3601 15.3125 8.94628 15.3125 7.5C15.3105 5.56123 14.5394 3.70246 13.1685 2.33154C11.7975 0.960627 9.93877 0.189547 8 0.1875ZM8 13.6875C6.77623 13.6875 5.57994 13.3246 4.56241 12.6447C3.54488 11.9648 2.75182 10.9985 2.2835 9.86785C1.81518 8.73724 1.69265 7.49314 1.93139 6.29288C2.17014 5.09262 2.75944 3.99011 3.62478 3.12478C4.49012 2.25944 5.59262 1.67014 6.79288 1.43139C7.99314 1.19264 9.23724 1.31518 10.3679 1.7835C11.4985 2.25181 12.4648 3.04488 13.1447 4.06241C13.8246 5.07994 14.1875 6.27623 14.1875 7.5C14.1856 9.14046 13.5331 10.7132 12.3732 11.8732C11.2132 13.0331 9.64046 13.6856 8 13.6875ZM9.125 10.875C9.125 11.0242 9.06574 11.1673 8.96025 11.2727C8.85476 11.3782 8.71169 11.4375 8.5625 11.4375C8.26413 11.4375 7.97799 11.319 7.76701 11.108C7.55603 10.897 7.4375 10.6109 7.4375 10.3125V7.5C7.28832 7.5 7.14525 7.44074 7.03976 7.33525C6.93427 7.22976 6.875 7.08668 6.875 6.9375C6.875 6.78832 6.93427 6.64524 7.03976 6.53975C7.14525 6.43426 7.28832 6.375 7.4375 6.375C7.73587 6.375 8.02202 6.49353 8.233 6.7045C8.44398 6.91548 8.5625 7.20163 8.5625 7.5V10.3125C8.71169 10.3125 8.85476 10.3718 8.96025 10.4773C9.06574 10.5827 9.125 10.7258 9.125 10.875ZM6.875 4.40625C6.875 4.23937 6.92449 4.07624 7.0172 3.93749C7.10991 3.79873 7.24169 3.69059 7.39586 3.62673C7.55004 3.56287 7.71969 3.54616 7.88336 3.57871C8.04703 3.61127 8.19737 3.69163 8.31537 3.80963C8.43337 3.92763 8.51373 4.07797 8.54629 4.24164C8.57885 4.40531 8.56214 4.57496 8.49828 4.72914C8.43441 4.88331 8.32627 5.01509 8.18752 5.1078C8.04876 5.20052 7.88563 5.25 7.71875 5.25C7.49498 5.25 7.28037 5.16111 7.12213 5.00287C6.9639 4.84464 6.875 4.63003 6.875 4.40625Z"
      fill="currentColor"
    />
  </svg>
)

const Details = ({
  tokenInfo,
}: {
  tokenInfo: { home: NTTToken; peers: NTTToken[] }
}) => {
  const limitResults = useTokensLimits(tokenInfo.home, tokenInfo.peers)

  if (!limitResults) return <div>Loading...</div>
  const { duration, outbound, inbound } = limitResults

  return (
    <InnerCard>
      <RefreshButton>
        <RefreshIcon />
      </RefreshButton>
      <OverflowWrapper>
        <Limits>
          <TokenLimitsTitles>
            <RowTitle>Limits</RowTitle>
            <RowTitle>Available</RowTitle>
            <RowTitle>Used vs Total</RowTitle>
          </TokenLimitsTitles>
          <TokenLimits
            outbound
            key={tokenInfo.home.wormholeChainId}
            tokenLimit={outbound}
            token={tokenInfo.home}
          />

          {tokenInfo.peers.map((p) => {
            const inboundLimit = inbound.find(
              (limit) => limit.wormholeChainId === p.wormholeChainId,
            )
            if (!inboundLimit) throw new Error('Limit for this chian not found')
            return (
              <TokenLimits
                key={p.wormholeChainId}
                tokenLimit={inboundLimit}
                token={p}
              />
            )
          })}
        </Limits>
      </OverflowWrapper>
      <WarningText>
        <WarningIcon />
        The rate limits duration is {Number(duration) / 3600} hours
      </WarningText>
    </InnerCard>
  )
}

const DetailsSection = ({
  wormholeChainId,
  wormholeTokenAddress,
}: {
  wormholeChainId: WormholeChainId
  wormholeTokenAddress: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, wormholeTokenAddress)
  const icon = WORMHOLE_CHAIN_ID_TO_ICON[tokenInfo.home.wormholeChainId as WormholeChainId]
  return (
    <Item
      $isExpanded={isExpanded}
      onClick={() => (!isExpanded ? setIsExpanded(true) : undefined)}
    >
      <Toggle
        className={`${isExpanded ? 'isExpanded' : ''}`.trim()}
        onClick={() => (isExpanded ? setIsExpanded(false) : undefined)}
        type="button"
      >
        <Icon>{icon ? createElement(icon) : null}</Icon>
        <InnerCardTitle as="span">{tokenInfo.home.blockchain}</InnerCardTitle>
        <ChevronDown />
      </Toggle>
      {isExpanded && <Details tokenInfo={tokenInfo} />}
    </Item>
  )
}

const DeploymentDetails = ({
  token,
  ...restProps
}: {
  token: {
    home: NTTToken
    peers: NTTToken[]
  }
}) => (
  <Wrapper {...restProps}>
    <Title>Deployed Chains</Title>
    {[token.home, ...token.peers].map((t) => (
      <DetailsSection
        key={`${t.wormholeChainId}-${t.token.address}`}
        wormholeChainId={t.wormholeChainId}
        wormholeTokenAddress={formatWormholeAddress(t.token.address as Address)}
      />
    ))}
  </Wrapper>
)

export default DeploymentDetails
