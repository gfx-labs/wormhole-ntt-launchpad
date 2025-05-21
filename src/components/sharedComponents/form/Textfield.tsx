import type { ComponentPropsWithoutRef, FC } from 'react'
import styled from 'styled-components'

import { Textfield as BaseTextfield } from '@bootnodedev/db-ui-toolkit'

const Wrapper = styled(BaseTextfield)`
  && {
    /* Texfield */
    --theme-textfield-background-color: transparent;
    --theme-textfield-background-color-active: transparent;
    --theme-textfield-border-color: rgba(160 159 161 / 30%);
    --theme-textfield-border-color-active: rgb(255 255 255 / 40%);
    --theme-textfield-color: var(--theme-text-color);
    --theme-textfield-color-active: var(--theme-text-color-light);
    --theme-textfield-color-error: var(--theme-text-color-light);
    --theme-textfield-placeholder-color: var(--theme-text-color);

    border-radius: var(--base-border-radius-xl);
    font-size: 1.6rem;
    height: 56px;
    min-width: 0;
    padding: 0 calc(var(--base-common-padding) * 3);

    &:read-only {
      background-color: rgb(255 255 255 / 3%);
      border: solid 1px rgb(160 159 161 / 10%);
    }
  }
`

interface FormInputProps extends ComponentPropsWithoutRef<'input'> {
  error?: string
  renderInput?: (props: FormInputProps) => JSX.Element
  validate?: (value: string) => string | undefined
}

/**
 * A reusable form input component with validation.
 *
 * in the validate function, yo can return an error message if the input is invalid.
 * Or, you can handle the error message in the parent component.
 *
 * @returns {JSX.Element} The rendered input component.
 */
const Textfield: FC<FormInputProps> = ({ error, value, ...restProps }) => {
  return (
    <Wrapper
      $status={error && value ? 'error' : undefined}
      value={value}
      {...restProps}
    />
  )
}

export default Textfield
