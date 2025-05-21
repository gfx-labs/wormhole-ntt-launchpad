import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'

export const ButtonsWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: calc(var(--base-common-padding) * 3);
  width: 100%;
`

export const NotFound = styled.div`
color: var(--theme-text-color-light);
font-size: 1.6rem;
font-weight: 500;
grid-column: 1 / -1;
line-height: 1.5;
margin: auto;
text-align: center;
`

export const InnerTitle = styled.h2`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 3.6rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
`

export const InnerCard = styled.div`
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  border: solid 1px var(--theme-gray-1);
  padding: calc(var(--base-common-padding) * 2) var(--base-common-padding);
  width: 100%;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

export const InnerCardTitle = styled.h3`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 2.4rem;
  line-height: 1;
  text-transform: uppercase;
`

export const InnerCardOpaque = styled.div`
  background-color: rgb(255 255 255 / 4%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  box-shadow: 0 6.3px 6.5px 0 rgb(0 0 0 / 2%), 0 29.7px 25.5px 0 rgb(0 0 0 / 3%), 0 77px 80px 0 rgb(0 0 0 / 5%);
  display: flex;
  flex-direction: column;
`
