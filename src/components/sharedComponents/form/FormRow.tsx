import type { FC, PropsWithChildren, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  row-gap: var(--base-gap);
  width: 100%;
`

const Label = styled.label<{ isUpperCase?: boolean }>`
  color: var(--theme-text-color);
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-transform: ${({ isUpperCase = true }) => (isUpperCase ? 'uppercase' : 'none')};
`

const ErrorMessage = styled.div`
  color: var(--theme-color-danger);
  column-gap: var(--base-gap);
  display: none;
  font-size: 1.2rem;
  font-weight: 400;
  height: 0;
  line-height: 1.5;
  opacity: 0;
  transition: display 0s allow-discrete, height 0s allow-discrete, opacity 0s;
  width: 100%;

  &.show {
    display: flex;
    height: auto;
    opacity: 1;
    transition: display var(--base-transition-duration-sm) allow-discrete, height var(--base-transition-duration-xs) allow-discrete,opacity var(--base-transition-duration-sm);
  }

  @starting-style {
    &.show {
      height: 0;
      opacity: 0;
    }
  }
`

const ErrorSVG = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0163 11.1312L9.55063 1.63932C9.39232 1.36858 9.16588 1.144 8.89384 0.987939C8.62179 0.831873 8.31363 0.749756 8 0.749756C7.68637 0.749756 7.37821 0.831873 7.10617 0.987939C6.83412 1.144 6.60769 1.36858 6.44938 1.63932L0.983751 11.1312C0.830138 11.3939 0.74918 11.6928 0.74918 11.9971C0.74918 12.3015 0.830138 12.6003 0.983751 12.8631C1.14031 13.1352 1.36643 13.3607 1.63893 13.5166C1.91142 13.6724 2.22047 13.753 2.53438 13.7499H13.4656C13.7793 13.7527 14.0881 13.6721 14.3604 13.5162C14.6326 13.3604 14.8586 13.135 15.015 12.8631C15.1688 12.6005 15.25 12.3016 15.2502 11.9973C15.2504 11.693 15.1697 11.394 15.0163 11.1312ZM13.7163 12.1124C13.6908 12.1558 13.6542 12.1914 13.6102 12.2156C13.5662 12.2398 13.5164 12.2517 13.4663 12.2499H2.53438C2.48418 12.2517 2.43446 12.2398 2.39045 12.2156C2.34644 12.1914 2.3098 12.1558 2.28438 12.1124C2.26282 12.0774 2.2514 12.037 2.2514 11.9959C2.2514 11.9547 2.26282 11.9144 2.28438 11.8793L7.75 2.38745C7.77707 2.34579 7.81411 2.31155 7.85777 2.28785C7.90143 2.26415 7.95032 2.25174 8 2.25174C8.04968 2.25174 8.09857 2.26415 8.14223 2.28785C8.18589 2.31155 8.22294 2.34579 8.25 2.38745L13.715 11.8793C13.7368 11.9143 13.7484 11.9546 13.7486 11.9957C13.7488 12.0369 13.7376 12.0773 13.7163 12.1124ZM7.25 7.99995V5.99995C7.25 5.80103 7.32902 5.61027 7.46967 5.46962C7.61032 5.32896 7.80109 5.24995 8 5.24995C8.19891 5.24995 8.38968 5.32896 8.53033 5.46962C8.67098 5.61027 8.75 5.80103 8.75 5.99995V7.99995C8.75 8.19886 8.67098 8.38962 8.53033 8.53028C8.38968 8.67093 8.19891 8.74995 8 8.74995C7.80109 8.74995 7.61032 8.67093 7.46967 8.53028C7.32902 8.38962 7.25 8.19886 7.25 7.99995ZM9 10.4999C9 10.6977 8.94135 10.8911 8.83147 11.0555C8.72159 11.22 8.56541 11.3481 8.38269 11.4238C8.19996 11.4995 7.99889 11.5193 7.80491 11.4807C7.61093 11.4421 7.43275 11.3469 7.2929 11.2071C7.15304 11.0672 7.0578 10.889 7.01922 10.695C6.98063 10.5011 7.00043 10.3 7.07612 10.1173C7.15181 9.93454 7.27998 9.77836 7.44443 9.66848C7.60888 9.55859 7.80222 9.49995 8 9.49995C8.26522 9.49995 8.51957 9.6053 8.70711 9.79284C8.89464 9.98038 9 10.2347 9 10.4999Z"
      fill="currentColor"
    />
  </svg>
)

interface FormRowProps extends PropsWithChildren {
  error?: string
  label?: string | ReactNode
  isUpperCase?: boolean
}

export const FormRow: FC<FormRowProps> = ({
  children,
  label,
  error,
  isUpperCase,
  ...restProps
}) => (
  <Wrapper {...restProps}>
    {label && <Label isUpperCase={isUpperCase}>{label}</Label>}
    {children}
    <ErrorMessage className={`${error ? 'show' : ''}`.trim()}>
      <ErrorSVG />
      {error}
    </ErrorMessage>
  </Wrapper>
)
