import type { NTTToken } from '@/src/api/endpoints'
import { TokenTitle } from '@/src/components/sharedComponents/form/TokenTitle'
import {
  PrimaryInvertedButtonSmall,
  SecondaryButtonSmall,
} from '@/src/components/sharedComponents/ui/Buttons'
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

const WalletText = styled.span`
  margin-right: auto;
`

const ChevronRightSVG = () => (
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

const WalletIcon = () => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7499 7.5C10.7499 7.69778 10.6912 7.89112 10.5813 8.05557C10.4714 8.22002 10.3153 8.34819 10.1325 8.42388C9.94981 8.49957 9.74874 8.51937 9.55476 8.48079C9.36078 8.4422 9.1826 8.34696 9.04274 8.20711C8.90289 8.06725 8.80765 7.88907 8.76906 7.69509C8.73048 7.50111 8.75028 7.30004 8.82597 7.11732C8.90166 6.93459 9.02983 6.77841 9.19428 6.66853C9.35873 6.55865 9.55207 6.5 9.74985 6.5C10.0151 6.5 10.2694 6.60536 10.457 6.79289C10.6445 6.98043 10.7499 7.23478 10.7499 7.5ZM13.2499 5.25V10.25C13.2499 10.7804 13.0391 11.2891 12.6641 11.6642C12.289 12.0393 11.7803 12.25 11.2499 12.25H2.24985C1.71942 12.25 1.21071 12.0393 0.835637 11.6642C0.460564 11.2891 0.24985 10.7804 0.24985 10.25V2.8075C0.242158 2.54006 0.288205 2.27379 0.385265 2.02446C0.482325 1.77514 0.628424 1.54782 0.814913 1.35597C1.0014 1.16412 1.22449 1.01164 1.47097 0.907549C1.71744 0.803463 1.9823 0.74989 2.24985 0.75H10.4999C10.6988 0.75 10.8895 0.829018 11.0302 0.96967C11.1708 1.11032 11.2499 1.30109 11.2499 1.5C11.2499 1.69891 11.1708 1.88968 11.0302 2.03033C10.8895 2.17098 10.6988 2.25 10.4999 2.25H2.24985C2.1828 2.24996 2.11643 2.26342 2.05468 2.28955C1.99293 2.31569 1.93707 2.35398 1.89043 2.40214C1.84378 2.45031 1.80729 2.50736 1.78314 2.56991C1.75899 2.63247 1.74767 2.69923 1.74985 2.76625V2.77125C1.76035 2.90364 1.82111 3.02699 1.91966 3.11601C2.01821 3.20503 2.14708 3.25297 2.27985 3.25H11.2499C11.7803 3.25 12.289 3.46071 12.6641 3.83579C13.0391 4.21086 13.2499 4.71957 13.2499 5.25ZM11.7499 5.25C11.7499 5.11739 11.6972 4.99021 11.6034 4.89645C11.5096 4.80268 11.3825 4.75 11.2499 4.75H2.27985C2.10104 4.75008 1.92294 4.72739 1.74985 4.6825V10.25C1.74985 10.3826 1.80253 10.5098 1.8963 10.6036C1.99007 10.6973 2.11724 10.75 2.24985 10.75H11.2499C11.3825 10.75 11.5096 10.6973 11.6034 10.6036C11.6972 10.5098 11.7499 10.3826 11.7499 10.25V5.25Z"
      fill="currentColor"
    />
  </svg>
)

interface Props extends ComponentPropsWithoutRef<'div'> {
  address: string
  chain: WormholeChainId
  token: NTTToken
}

const Title: FC<Props> = ({ chain, address, token: { token }, ...restProps }) => {
  const navigate = useNavigate()

  return (
    <Wrapper {...restProps}>
      <TokenTitle
        name={token.name}
        symbol={token.symbol}
        title="Token information"
      />
      <TitleButtons>
        <SecondaryButtonSmall disabled>
          <WalletIcon />
          <WalletText>Add token to wallet</WalletText>
        </SecondaryButtonSmall>
        <PrimaryInvertedButton
          onClick={() => {
            navigate({
              to: `/deployment/settings/${chain}/${address}`,
            })
          }}
        >
          Settings <ChevronRightSVG />
        </PrimaryInvertedButton>
      </TitleButtons>
    </Wrapper>
  )
}

export default Title
