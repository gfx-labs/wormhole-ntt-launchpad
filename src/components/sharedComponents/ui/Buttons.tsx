import styled, { css } from 'styled-components'

import { Button } from '@bootnodedev/db-ui-toolkit'

const CommonButtonStyles = css`
  border-radius: calc(var(--base-border-radius) + var(--base-border-radius-sm));
  font-family: var(--base-font-family-button);
  font-size: 1.1rem;
  font-weight: 500;
  height: 50px;
  line-height: 1;
  padding: 0 calc(var(--base-common-padding) * 3);
  text-transform: uppercase;
`

const CommonButtonSmallStyles = css`
  font-size: 0.9rem;
  height: 40px;
  padding: 0 calc(var(--base-common-padding-xl) + var(--base-common-padding-sm));
`

/**
 * Preset buttons, just for convenience.
 */
export const PrimaryButton = styled(Button).attrs({
  $variant: 'primary',
})`
  ${CommonButtonStyles}
`

PrimaryButton.defaultProps = {
  type: 'button',
}

export const PrimaryButtonSmall = styled(PrimaryButton)`
  ${CommonButtonSmallStyles}
`

PrimaryButtonSmall.defaultProps = {
  type: 'button',
}

export const PrimaryInvertedButton = styled(Button).attrs({
  $variant: 'primary-inverted',
})`
  ${CommonButtonStyles}
`

PrimaryInvertedButton.defaultProps = {
  type: 'button',
}

export const PrimaryInvertedButtonSmall = styled(PrimaryInvertedButton)`
  ${CommonButtonSmallStyles}
`

PrimaryInvertedButtonSmall.defaultProps = {
  type: 'button',
}

export const SecondaryButton = styled(Button).attrs({
  $variant: 'secondary',
})`
  ${CommonButtonStyles}
`

SecondaryButton.defaultProps = {
  type: 'button',
}

export const SecondaryButtonSmall = styled(SecondaryButton)`
  ${CommonButtonSmallStyles}
`

SecondaryButtonSmall.defaultProps = {
  type: 'button',
}

const ChevronRight = () => (
  <svg
    width="9"
    height="16"
    viewBox="0 0 9 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.66305 1.08675L7.91305 7.33675C8.00045 7.42385 8.0698 7.52734 8.11712 7.6413C8.16443 7.75525 8.18879 7.87743 8.18879 8.00082C8.18879 8.1242 8.16443 8.24638 8.11712 8.36033C8.0698 8.47429 8.00045 8.57778 7.91305 8.66488L1.66305 14.9149C1.48693 15.091 1.24806 15.1899 0.998989 15.1899C0.749918 15.1899 0.511047 15.091 0.334927 14.9149C0.158807 14.7388 0.0598635 14.4999 0.0598635 14.2508C0.0598635 14.0017 0.158807 13.7629 0.334927 13.5868L5.92165 8.00003L0.334146 2.41332C0.158026 2.2372 0.0590822 1.99833 0.0590822 1.74925C0.0590822 1.50018 0.158026 1.26131 0.334146 1.08519C0.510267 0.909071 0.749137 0.810125 0.998209 0.810125C1.24728 0.810125 1.48615 0.909071 1.66227 1.08519L1.66305 1.08675Z"
      fill="currentColor"
    />
  </svg>
)

export const NextButton = styled(PrimaryButton).attrs(({ children }) => {
  return {
    children: (
      <>
        {children} <ChevronRight />
      </>
    ),
  }
})`
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  column-gap: var(--base-gap-xl);
  height: 64px;
  padding: 0 calc(var(--base-common-padding-xl) * 2);
`

NextButton.defaultProps = {
  type: 'button',
}

const ChevronLeft = () => (
  <svg
    width="8"
    height="14"
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.34704 12.0281C7.50555 12.1866 7.5946 12.4016 7.5946 12.6257C7.5946 12.8499 7.50555 13.0649 7.34704 13.2234C7.18853 13.3819 6.97355 13.4709 6.74939 13.4709C6.52522 13.4709 6.31024 13.3819 6.15173 13.2234L0.526729 7.59839C0.448069 7.52 0.385657 7.42686 0.343072 7.3243C0.300486 7.22174 0.278564 7.11178 0.278564 7.00073C0.278564 6.88968 0.300486 6.77972 0.343072 6.67717C0.385657 6.57461 0.448069 6.48146 0.526729 6.40307L6.15173 0.778075C6.31024 0.619566 6.52522 0.530518 6.74939 0.530518C6.97355 0.530518 7.18853 0.619567 7.34704 0.778075C7.50555 0.936583 7.5946 1.15157 7.5946 1.37573C7.5946 1.5999 7.50555 1.81488 7.34704 1.97339L2.3204 7.00003L7.34704 12.0281Z"
      fill="currentColor"
    />
  </svg>
)

export const BackButton = styled(SecondaryButton).attrs(({ children }) => {
  return {
    children: (
      <>
        <ChevronLeft /> {children}
      </>
    ),
  }
})`
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  column-gap: var(--base-gap-xl);
  height: 64px;
  padding: 0 calc(var(--base-common-padding-xl) * 2);
`

BackButton.defaultProps = {
  type: 'button',
}

const PauseSVG = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.375 1.3125H7.5C7.25136 1.3125 7.0129 1.41127 6.83709 1.58709C6.66127 1.7629 6.5625 2.00136 6.5625 2.25V9.75C6.5625 9.99864 6.66127 10.2371 6.83709 10.4129C7.0129 10.5887 7.25136 10.6875 7.5 10.6875H9.375C9.62364 10.6875 9.8621 10.5887 10.0379 10.4129C10.2137 10.2371 10.3125 9.99864 10.3125 9.75V2.25C10.3125 2.00136 10.2137 1.7629 10.0379 1.58709C9.8621 1.41127 9.62364 1.3125 9.375 1.3125ZM9.1875 9.5625H7.6875V2.4375H9.1875V9.5625ZM4.5 1.3125H2.625C2.37636 1.3125 2.1379 1.41127 1.96209 1.58709C1.78627 1.7629 1.6875 2.00136 1.6875 2.25V9.75C1.6875 9.99864 1.78627 10.2371 1.96209 10.4129C2.1379 10.5887 2.37636 10.6875 2.625 10.6875H4.5C4.74864 10.6875 4.9871 10.5887 5.16291 10.4129C5.33873 10.2371 5.4375 9.99864 5.4375 9.75V2.25C5.4375 2.00136 5.33873 1.7629 5.16291 1.58709C4.9871 1.41127 4.74864 1.3125 4.5 1.3125ZM4.3125 9.5625H2.8125V2.4375H4.3125V9.5625Z"
      fill="currentColor"
    />
  </svg>
)

const UnpauseSVG = () => (
  <svg
    width="10"
    height="12"
    viewBox="0 0 10 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.99172 5.20635L2.23797 1.07525C2.09633 0.988908 1.93433 0.941689 1.76848 0.938415C1.60263 0.935141 1.43889 0.97593 1.29395 1.05662C1.14902 1.1373 1.02809 1.255 0.943509 1.3977C0.858926 1.54039 0.813718 1.70297 0.8125 1.86885V10.131C0.813718 10.2969 0.858926 10.4595 0.943509 10.6022C1.02809 10.7449 1.14902 10.8626 1.29395 10.9433C1.43889 11.024 1.60263 11.0647 1.76848 11.0615C1.93433 11.0582 2.09633 11.011 2.23797 10.9246L8.99172 6.79353C9.1279 6.71064 9.24046 6.59409 9.31857 6.4551C9.39668 6.31612 9.4377 6.15937 9.4377 5.99994C9.4377 5.84051 9.39668 5.68376 9.31857 5.54478C9.24046 5.40579 9.1279 5.28924 8.99172 5.20635ZM1.9375 9.78978V2.2101L8.1325 5.99994L1.9375 9.78978Z"
      fill="currentColor"
    />
  </svg>
)

export const PauseUnpauseButton = styled(Button).attrs(({ $variant = 'pause' }) => ({
  $variant: $variant,
  children:
    $variant === 'pause' ? (
      <>
        <PauseSVG /> Pause
      </>
    ) : (
      <>
        <UnpauseSVG />
        Un-pause
      </>
    ),
}))`
  border-radius: calc(var(--base-border-radius) + var(--base-border-radius-sm));
  font-family: var(--base-font-family-button);
  font-size: 0.9rem;
  font-weight: 500;
  height: 56px;
  line-height: 1;
  padding: 0 calc(var(--base-common-padding-xl) + var(--base-common-padding-sm));
  text-transform: uppercase;
`

PauseUnpauseButton.defaultProps = {
  type: 'button',
}
