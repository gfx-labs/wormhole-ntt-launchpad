import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`
const SuccessIcon: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    fill="none"
    width="94"
    height="94"
    viewBox="0 0 94 94"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <circle
      cx="47.0001"
      cy="47.3065"
      r="46.631"
      fill="#C1BBF6"
      fill-opacity="0.12"
    />
    <path
      d="M46.1681 25.1013C33.933 25.1013 23.9629 35.0715 23.9629 47.3065C23.9629 59.5416 33.933 69.5118 46.1681 69.5118C58.4032 69.5118 68.3734 59.5416 68.3734 47.3065C68.3734 35.0715 58.4032 25.1013 46.1681 25.1013ZM56.7822 42.1993L44.1919 54.7897C43.881 55.1006 43.4591 55.2782 43.015 55.2782C42.5709 55.2782 42.149 55.1006 41.8381 54.7897L35.554 48.5056C34.9101 47.8617 34.9101 46.7958 35.554 46.1519C36.198 45.5079 37.2638 45.5079 37.9078 46.1519L43.015 51.2591L54.4285 39.8456C55.0724 39.2016 56.1383 39.2016 56.7822 39.8456C57.4262 40.4895 57.4262 41.5332 56.7822 42.1993Z"
      fill="#C1BBF6"
    />
  </Wrapper>
)

export default SuccessIcon
