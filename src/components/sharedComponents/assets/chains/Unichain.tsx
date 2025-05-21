import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`

const Unichain: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    fill="none"
    height="29"
    viewBox="0 0 116 115"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <path
      d="M115.476 56.406C84.3089 56.406 59.07 31.1416 59.07 0H56.8819V56.406H0.47583V58.594C31.6429 58.594 56.8819 83.8584 56.8819 115H59.07V58.594H115.476V56.406Z"
      fill="#fc0fa4"
    />
  </Wrapper>
)

export default Unichain
