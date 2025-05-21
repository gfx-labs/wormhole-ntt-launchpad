import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { type ComponentProps, type FC, useState } from 'react'
import styled, { css } from 'styled-components'

const Svg = styled.svg`
  display: block;
  fill: none;
  height: 100%;
`

const Show = () => (
  <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
      fill="#C1BBF6"
    />
  </Svg>
)

const Hide = () => (
  <Svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 11V13H5V11H19Z"
      fill="#C1BBF6"
    />
  </Svg>
)

const ToggleButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  outline: none;
  padding: 0;
  width: 24px;

  &:active {
    opacity: 0.8;
  }
`

const Wrapper = styled.div`
  background-color: rgb(25 25 25 / 44%);
  border-radius: calc(var(--base-border-radius-xl) + var(--base-border-radius-sm));
  border: solid 1px rgb(255 255 255 / 10%);
  display: flex;
  flex-direction: column;
  padding: calc(var(--base-common-padding) * 3) var(--base-common-padding-xl);
  row-gap: calc(var(--base-gap) * 4);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

const Title = styled.h3`
  color: var(--theme-title-color);
  display: flex;
  font-family: var(--base-font-family-title);
  font-size: 2.1rem;
  line-height: 1;
  justify-content: space-between;
  text-transform: uppercase;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      font-size: 2.4rem;
    `,
  )}
`

const Text = styled.p`
  color: var(--theme-text-color);
  display: none;
  font-size: 1.4rem;
  font-weight: normal;
  line-height: 1.6;
  margin: 0;
  opacity: 0;
  transition: display 0s allow-discrete, height 0s allow-discrete, opacity 0s;


  &.show {
    display: block;
    height: auto;
    opacity: 1;
    transition: display var(--base-transition-duration-xxl) allow-discrete, height var(--base-transition-duration-xs) allow-discrete,opacity var(--base-transition-duration-xl);
  }

  @starting-style {
    &.show {
      height: 0;
      opacity: 0;

    }
  }
`

interface Props extends ComponentProps<'div'> {
  description: string
  title: string
}

const Item: FC<Props> = ({ title, description, ...restProps }) => {
  const [show, setShow] = useState(false)

  return (
    <Wrapper {...restProps}>
      <Title>
        {title}
        <ToggleButton onClick={() => setShow(!show)}>{show ? <Hide /> : <Show />}</ToggleButton>
      </Title>
      <Text className={`${show ? 'show' : ''}`}>{description}</Text>
    </Wrapper>
  )
}

export default Item
