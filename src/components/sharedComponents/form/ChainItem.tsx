import { Checkmark } from '@/src/components/sharedComponents/form/Checkmark'
import type { ComponentProps, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div<{
  $isActive?: boolean
  $isChecked?: boolean
  disabled?: boolean
}>`
  align-items: center;
  background-color: ${({ $isActive }) => {
    return $isActive ? 'rgb(255 255 255 / 4%)' : 'transparent'
  }};
  border-radius: var(--base-border-radius-xl);
  border: solid 1px rgb(255 255 255 / 12%);
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: var(--base-gap-xl) var(--base-gap);
  min-height: 64px;
  max-height: fit-content;
  padding: var(--base-common-padding-xl);
  transition: border-color var(--base-transition-duration) ease;
  width: 100%;

  &:active {
    opacity: 0.8;
  }

  &:hover {
    border-color: rgb(193 187 246 / 50%);

    ${Checkmark} {
      border-color: var(--theme-color-primary);
    }
  }

  ${({ $isChecked }) => {
    return (
      $isChecked &&
      css`
        border-color: rgb(193 187 246 / 50%);
      `
    )
  }}

  ${({ disabled }) => {
    return (
      disabled &&
      css`
          background-color: rgb(255 255 255 / 4%);
          border: solid 1px rgb(255 255 255 / 12%);
          cursor: not-allowed;
          opacity: 0.5;
          pointer-events: none;
      `
    )
  }}
`

const Grid = styled.div`
  align-items: center;
  column-gap: var(--base-gap);
  display: grid;
  grid-template-columns: 28px 1fr;
  max-width: calc(100% - 50px);
`

const ChainItemName = styled.div`
  color: var(--theme-text-color-light);
  font-size: 1.6rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface Props extends ComponentProps<'div'> {
  $isActive?: boolean
  $isChecked?: boolean
  disabled?: boolean
  icon?: ReactNode
  name: string
  onClick?: () => void
}

export const ChainItem: FC<Props> = ({
  $isActive,
  $isChecked,
  children,
  disabled,
  icon,
  name,
  onClick,
  ...restProps
}) => (
  <Wrapper
    $isActive={$isActive}
    $isChecked={$isChecked}
    disabled={disabled}
    onClick={onClick}
    {...restProps}
  >
    <Grid>
      {icon && icon}
      <ChainItemName>{name}</ChainItemName>
    </Grid>
    {children}
  </Wrapper>
)
