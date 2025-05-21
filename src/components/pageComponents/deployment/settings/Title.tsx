import type { NTTToken } from '@/src/api/endpoints'
import { TokenTitle } from '@/src/components/sharedComponents/form/TokenTitle'
import {
  PrimaryInvertedButtonSmall,
  SecondaryButtonSmall,
} from '@/src/components/sharedComponents/ui/Buttons'
import { useManagerOwner } from '@/src/hooks/useManagerOwner'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { useNavigate } from '@tanstack/react-router'
import type { ComponentPropsWithoutRef, FC } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap-xl);
  width: 100%;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      align-items: center;
      column-gap: var(--base-gap-xl);
      flex-direction: row;
      justify-content: space-between;
    `,
  )}
`

const TitleButtons = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      align-items: center;
      column-gap: var(--base-gap);
      flex-direction: row;
    `,
  )}

  > button {
    justify-content: space-between;

    ${breakpointMediaQuery(
      'tabletPortraitStart',
      css`
        justify-content: center;
      `,
    )}
  }
`

const PrimaryInvertedButton = styled(PrimaryInvertedButtonSmall)`
  background-color: transparent;
  border: solid 0.8px rgb(193 187 246 / 10%);
`

export const ChevronRightSVG = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.68378 0.897768L6.2965 5.51048C6.361 5.57476 6.41218 5.65114 6.4471 5.73524C6.48202 5.81935 6.5 5.90951 6.5 6.00058C6.5 6.09164 6.48202 6.18181 6.4471 6.26591C6.41218 6.35002 6.361 6.4264 6.2965 6.49068L1.68378 11.1034C1.5538 11.2334 1.37751 11.3064 1.19368 11.3064C1.00986 11.3064 0.833566 11.2334 0.703583 11.1034C0.5736 10.9734 0.500577 10.7971 0.500577 10.6133C0.500577 10.4295 0.5736 10.2532 0.703583 10.1232L4.82677 6L0.703007 1.87682C0.573024 1.74683 0.5 1.57054 0.5 1.38672C0.5 1.20289 0.573024 1.0266 0.703007 0.896615C0.832989 0.766632 1.00928 0.693607 1.19311 0.693607C1.37693 0.693607 1.55323 0.766632 1.68321 0.896615L1.68378 0.897768Z"
      fill="currentColor"
    />
  </svg>
)

interface Props extends ComponentPropsWithoutRef<'div'> {
  address: string
  chain: WormholeChainId
  token: NTTToken
  setShowAddChain: (show: boolean) => void
}

const Title: FC<Props> = ({ chain, address, token: { token }, setShowAddChain, ...restProps }) => {
  const navigate = useNavigate()

  const ownerData = useManagerOwner(chain, address)

  const canAddNewChain = ownerData.isOwner && ownerData.isOwnedByNTTOwnerSC

  return (
    <Wrapper {...restProps}>
      <TokenTitle
        name={token.name}
        symbol={token.symbol}
      />
      <TitleButtons>
        <SecondaryButtonSmall
          onClick={() => setShowAddChain(true)}
          disabled={!canAddNewChain}
        >
          Deploy token to a new chain
        </SecondaryButtonSmall>
        <PrimaryInvertedButton
          onClick={() => {
            navigate({
              to: `/deployment/${chain}/${address}`,
            })
          }}
        >
          Dashboard <ChevronRightSVG />
        </PrimaryInvertedButton>
      </TitleButtons>
    </Wrapper>
  )
}

export default Title
