import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`

const Ethereum: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    fill="none"
    height="29"
    viewBox="0 0 28 29"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <rect
      fill="#627EEA"
      height="28"
      rx="14"
      width="28"
      y="0.916016"
    />
    <path
      d="M14.4363 4.41406V12.1757L20.9961 15.1073L14.4363 4.41406Z"
      fill="white"
      fillOpacity="0.602"
    />
    <path
      d="M14.4363 4.41406L7.87646 15.1073L14.4363 12.1757V4.41406Z"
      fill="white"
    />
    <path
      d="M14.4363 20.1362V25.4101L21 16.3281L14.4363 20.1362Z"
      fill="white"
      fillOpacity="0.602"
    />
    <path
      d="M14.4363 25.4101V20.1362L7.87646 16.3281L14.4363 25.4101Z"
      fill="white"
    />
    <path
      d="M14.4363 18.9155L20.9961 15.1074L14.4363 12.1758V18.9155Z"
      fill="white"
      fillOpacity="0.2"
    />
    <path
      d="M7.87646 15.1074L14.4363 18.9155V12.1758L7.87646 15.1074Z"
      fill="white"
      fillOpacity="0.602"
    />
  </Wrapper>
)

export default Ethereum
