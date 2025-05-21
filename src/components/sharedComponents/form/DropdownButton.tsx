import { Button, breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import styled, { css } from 'styled-components'

const ChevronDown = () => (
  <svg
    className="chevronDown"
    fill="none"
    height="20"
    viewBox="0 0 21 20"
    width="21"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.4132 8.1633L11.1632 14.4133C11.0762 14.5007 10.9727 14.57 10.8587 14.6174C10.7447 14.6647 10.6226 14.689 10.4992 14.689C10.3758 14.689 10.2536 14.6647 10.1397 14.6174C10.0257 14.57 9.92222 14.5007 9.83512 14.4133L3.58512 8.1633C3.409 7.98718 3.31006 7.74831 3.31006 7.49923C3.31006 7.25016 3.409 7.01129 3.58512 6.83517C3.76124 6.65905 4.00011 6.56011 4.24918 6.56011C4.49826 6.56011 4.73713 6.65905 4.91325 6.83517L10.5 12.4219L16.0867 6.83439C16.2628 6.65827 16.5017 6.55933 16.7507 6.55933C16.9998 6.55933 17.2387 6.65827 17.4148 6.83439C17.5909 7.01051 17.6899 7.24938 17.6899 7.49845C17.6899 7.74752 17.5909 7.98639 17.4148 8.16252L17.4132 8.1633Z"
      fill="white"
    />
  </svg>
)

const DropdownButton = styled(Button).attrs(({ children }) => ({
  $variant: 'form-dropdown',
  children: (
    <>
      {children} <ChevronDown />
    </>
  ),
}))`
  border-radius: var(--base-border-radius-xl);
  column-gap: var(--base-gap);
  flex-grow: 1;
  flex-shrink: 0;
  font-size: 1.6rem;
  height: 56px;
  justify-content: flex-start;
  min-width: 0;
  padding: 0 var(--base-common-padding-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      column-gap: var(--base-gap-xl);
      padding: 0 calc(var(--base-common-padding) * 3);
    `,
  )}

  .chevronDown {
    margin-left: auto;
    transition: transform var(--base-transition-duration-xs) ease-in-out;
  }

  .isActive & {
    .chevronDown {
      transform: rotate(180deg);
    }
  }
`

export default DropdownButton
