import { networks } from '@/src/constants/networks'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentPropsWithoutRef, FC } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  background-color: rgb(221 233 90 / 4%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  border: solid 1px rgb(221 233 90 / 25%);
  display: flex;
  flex-direction: column;
  padding: calc(var(--base-gap) * 3) var(--base-gap-xl);
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-gap) * 3) calc(var(--base-gap) * 4);
    `,
  )}
`

const Text = styled.p`
  color: var(--theme-text-color-light);
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  row-gap: var(--base-gap);

  svg {
    display: block;
    flex-shrink: 0;
  }

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      column-gap: var(--base-gap-xl);
    `,
  )}
`

const Rows = styled.div`
  overflow-x: auto;
`

const RowsWidth = styled.div`
  min-width: max-content;
`

const Row = styled.div`
  align-items: center;
  border-bottom: solid 1px rgb(255 255 255 / 12%);
  column-gap: calc(var(--base-gap) * 8);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: var(--base-common-padding);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      grid-template-columns: minmax(80px, 0.25fr) 1fr 1fr;
    `,
  )}
`

const Title = styled.div`
  color: var(--theme-text-color);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
`

const Name = styled.span`
  color: var(--theme-text-color-light);
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  white-space: nowrap;
`

const IconsWrapper = styled.div`
  --icon-size: 18px;

  align-items: center;
  column-gap: var(--base-gap-sm);
  display: flex;
  height: var(--icon-size);

  svg {
    display: block;
    max-height: var(--icon-size);
    max-width: var(--icon-size);
  }
`

const ConfigureButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  color: var(--theme-color-primary);
  column-gap: var(--base-gap);
  cursor: pointer;
  display: flex;
  font-family: var(--base-font-family-button);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.2;
  margin-left: auto;
  padding: 0;
  text-transform: uppercase;

  &:active {
    opacity: 0.8;
  }
`

const WarningSVG = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 0.25C8.57164 0.25 6.68657 0.821828 5.08319 1.89317C3.47982 2.96451 2.23013 4.48726 1.49218 6.26884C0.754225 8.05042 0.561142 10.0108 0.937348 11.9021C1.31355 13.7934 2.24215 15.5307 3.60571 16.8943C4.96928 18.2579 6.70656 19.1865 8.59787 19.5627C10.4892 19.9389 12.4496 19.7458 14.2312 19.0078C16.0127 18.2699 17.5355 17.0202 18.6068 15.4168C19.6782 13.8134 20.25 11.9284 20.25 10C20.2473 7.41498 19.2192 4.93661 17.3913 3.10872C15.5634 1.28084 13.085 0.25273 10.5 0.25ZM10.5 18.25C8.86831 18.25 7.27326 17.7661 5.91655 16.8596C4.55984 15.9531 3.50242 14.6646 2.878 13.1571C2.25358 11.6496 2.0902 9.99085 2.40853 8.3905C2.72685 6.79016 3.51259 5.32015 4.66637 4.16637C5.82016 3.01259 7.29017 2.22685 8.89051 1.90852C10.4909 1.59019 12.1497 1.75357 13.6571 2.37799C15.1646 3.00242 16.4531 4.05984 17.3596 5.41655C18.2661 6.77325 18.75 8.3683 18.75 10C18.7475 12.1873 17.8775 14.2843 16.3309 15.8309C14.7843 17.3775 12.6873 18.2475 10.5 18.25ZM9.75 10.75V5.5C9.75 5.30109 9.82902 5.11032 9.96967 4.96967C10.1103 4.82902 10.3011 4.75 10.5 4.75C10.6989 4.75 10.8897 4.82902 11.0303 4.96967C11.171 5.11032 11.25 5.30109 11.25 5.5V10.75C11.25 10.9489 11.171 11.1397 11.0303 11.2803C10.8897 11.421 10.6989 11.5 10.5 11.5C10.3011 11.5 10.1103 11.421 9.96967 11.2803C9.82902 11.1397 9.75 10.9489 9.75 10.75ZM11.625 14.125C11.625 14.3475 11.559 14.565 11.4354 14.75C11.3118 14.935 11.1361 15.0792 10.9305 15.1644C10.725 15.2495 10.4988 15.2718 10.2805 15.2284C10.0623 15.185 9.86184 15.0778 9.70451 14.9205C9.54718 14.7632 9.44003 14.5627 9.39662 14.3445C9.35321 14.1262 9.37549 13.9 9.46064 13.6945C9.54579 13.4889 9.68998 13.3132 9.87499 13.1896C10.06 13.066 10.2775 13 10.5 13C10.7984 13 11.0845 13.1185 11.2955 13.3295C11.5065 13.5405 11.625 13.8266 11.625 14.125Z"
      fill="#DDE95A"
    />
  </svg>
)

const ChevronRight = () => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.68378 0.898012L6.2965 5.51072C6.361 5.575 6.41218 5.65138 6.4471 5.73549C6.48202 5.81959 6.5 5.90976 6.5 6.00082C6.5 6.09189 6.48202 6.18206 6.4471 6.26616C6.41218 6.35026 6.361 6.42664 6.2965 6.49092L1.68378 11.1036C1.5538 11.2336 1.37751 11.3066 1.19368 11.3066C1.00986 11.3066 0.833566 11.2336 0.703583 11.1036C0.5736 10.9737 0.500577 10.7974 0.500577 10.6135C0.500577 10.4297 0.5736 10.2534 0.703583 10.1234L4.82677 6.00025L0.703007 1.87706C0.573024 1.74708 0.5 1.57078 0.5 1.38696C0.5 1.20314 0.573024 1.02684 0.703007 0.896859C0.832989 0.766876 1.00928 0.693851 1.19311 0.693851C1.37693 0.693851 1.55323 0.766876 1.68321 0.896859L1.68378 0.898012Z"
      fill="currentColor"
    />
  </svg>
)

const Warning: FC<ComponentPropsWithoutRef<'div'>> = ({ ...restProps }) => {
  // TODO: This is obviously VERY temporary, replace with actual data
  const transceivers = [
    {
      name: 'Arbitrum',
      icons: (
        <>
          {networks.find(({ id }) => id === 8453 || id === 84532)?.icon}
          {networks.find(({ id }) => id === 10 || id === 11155420)?.icon}
        </>
      ),
    },
    {
      name: 'Base',
      icons: <>{networks.find(({ id }) => id === 10 || id === 11155420)?.icon}</>,
    },
    {
      name: 'Ethereum',
      icons: (
        <>
          {networks.find(({ id }) => id === 8453 || id === 84532)?.icon}
          {networks.find(({ id }) => id === 10 || id === 11155420)?.icon}
        </>
      ),
    },
  ]
  return (
    <Wrapper {...restProps}>
      <Text>
        <WarningSVG />
        <span>
          You have deployed your token to a new chain, but it is not yet linked as a peer on the
          other chains. Please link it to ensure proper functionality.
        </span>
      </Text>
      <Rows>
        <RowsWidth>
          <Row>
            <Title>Chain</Title>
            <Title>Unlinked Peers</Title>
            <span>&nbsp;</span>
          </Row>
          {transceivers.map(({ name, icons }) => (
            <Row key={`${name}_chainname`}>
              <Name>{name}</Name>
              <IconsWrapper>{icons}</IconsWrapper>
              <ConfigureButton>
                Configure <ChevronRight />
              </ConfigureButton>
            </Row>
          ))}
        </RowsWidth>
      </Rows>
    </Wrapper>
  )
}

export default Warning
