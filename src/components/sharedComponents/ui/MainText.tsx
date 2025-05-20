import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentProps, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: var(--base-gap-xl);
  padding-top: calc(var(--base-common-padding-xl) * 4);
`

const Title = styled.h1`
  color: var(--theme-title-color);
  font-family: var(--base-font-family-title);
  font-size: 4.8rem;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      font-size: 6rem;
    `,
  )}
`

const Text = styled.p`
  color: var(--theme-text-color-light);
  font-size: 1.6rem;
  font-weight: normal;
  line-height: 1.5;
  margin:  calc(var(--base-gap) * -1) 0 0;
  text-align: center;

  br {
    display: none;
  }

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      br {
        display: block;
      }
    `,
  )}
`

interface Props extends Omit<ComponentProps<'div'>, 'title'> {
  title: string | ReactNode
  text?: string | ReactNode
}

export const MainText: FC<Props> = ({ title, text, ...restProps }) => (
  <Wrapper {...restProps}>
    <Title>{title}</Title>
    {text && <Text>{text}</Text>}
  </Wrapper>
)
