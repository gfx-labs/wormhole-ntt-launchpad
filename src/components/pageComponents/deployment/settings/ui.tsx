import { InnerCard as BaseInnerCard } from '@/src/components/sharedComponents/form/ui'
import { SecondaryButton as BaseSecondaryButton } from '@/src/components/sharedComponents/ui/Buttons'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'

export const InnerCard = styled(BaseInnerCard)`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      row-gap: calc(var(--base-gap) * 3);
    `,
  )}
`

export const ButtonRow = styled.div`
  align-items: center;
  gap: var(--base-gap-xl) var(--base-gap);
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      column-gap: var(--base-gap-xl);
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: 1fr auto;
    `,
  )}
`
/* Will show buttons and inputs each in a row, 100% width on smaller resolutions */
export const ButtonRowAlt = styled(ButtonRow)`
  > button,
  > input {
    width: 100%;
  }
`

export const SecondaryButton = styled(BaseSecondaryButton)`
  font-size: 0.9rem;
  height: 56px;
`
