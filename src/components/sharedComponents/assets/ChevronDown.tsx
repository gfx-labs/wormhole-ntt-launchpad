import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`
const ChevronDown: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <g transform="translate(6, 9.71)">
      <path
        d="M14.9132 2.32956L8.66325 8.57956C8.57615 8.66696 8.47266 8.7363 8.3587 8.78362C8.24475 8.83094 8.12257 8.8553 7.99918 8.8553C7.8758 8.8553 7.75362 8.83094 7.63967 8.78362C7.52571 8.7363 7.42222 8.66696 7.33512 8.57956L1.08512 2.32956C0.909002 2.15344 0.810059 1.91456 0.810059 1.66549C0.810059 1.41642 0.909002 1.17755 1.08512 1.00143C1.26124 0.825311 1.50011 0.726367 1.74918 0.726367C1.99826 0.726367 2.23713 0.825311 2.41325 1.00143L7.99997 6.58815L13.5867 1.00065C13.7628 0.82453 14.0017 0.725586 14.2507 0.725586C14.4998 0.725586 14.7387 0.82453 14.9148 1.00065C15.0909 1.17677 15.1899 1.41564 15.1899 1.66471C15.1899 1.91378 15.0909 2.15265 14.9148 2.32877L14.9132 2.32956Z"
        fill="white"
      />
    </g>
  </Wrapper>
)

export default ChevronDown
