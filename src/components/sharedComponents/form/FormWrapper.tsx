import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'

const LineCSS = css`
  background-image: linear-gradient(to right, rgb(193 187 246 / 0%) 0%, rgb(193 187 246 / 30%) 50%, rgb(193 187 246 / 0%));
  content: '';
  flex-grow: 0;
  height: 1px;
  left: 0;
  position: absolute;
  width: 100%;
`

export const FormWrapper = styled.div`
  background-image: radial-gradient(circle at -1% -24%, rgb(193 187 246 / 7%), rgb(193 187 246 / 0%) 52%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  max-width: 100%;
  padding: calc(var(--base-common-padding) * 5) var(--base-common-padding);
  position: relative;
  row-gap: var(--base-gap-xl);
  width: 918px;

  &::before {
    ${LineCSS}
    top: 0;
  }

  &::after {
    ${LineCSS}
    bottom: 0;
    top: auto;
  }

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 5);
      row-gap: calc(var(--base-gap) * 3);
    `,
  )}
`
