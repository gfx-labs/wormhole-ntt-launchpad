import type { ComponentProps, FC, ReactNode } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: rgb(255 255 255 / 4%);
  border-radius: var(--base-border-radius-xl);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  padding: var(--base-common-padding-xl);
  row-gap: var(--base-gap);
`

const Title = styled.h3`
  color: var(--theme-text-color);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
`

const Data = styled.div`
  align-items: center;
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap);
  display: flex;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0;
`

interface Props extends ComponentProps<'div'> {
  title: string
  data: string | ReactNode
}

export const TokenInfoItem: FC<Props> = ({ data, title, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <Title>{title}</Title>
      <Data>{data}</Data>
    </Wrapper>
  )
}
