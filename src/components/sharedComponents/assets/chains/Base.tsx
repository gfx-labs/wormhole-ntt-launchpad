import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`

const Base: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    fill="none"
    height="29"
    viewBox="0 0 28 29"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
    {...restProps}
  >
    <g clipPath="url(#clip0_63_4751)">
      <path
        d="M14 28.916C21.732 28.916 28 22.648 28 14.916C28 7.18403 21.732 0.916016 14 0.916016C6.26801 0.916016 0 7.18403 0 14.916C0 22.648 6.26801 28.916 14 28.916Z"
        fill="#0052FF"
      />
      <path
        d="M14.062 24.6452C19.4883 24.6452 23.887 20.254 23.887 14.8372C23.887 9.42044 19.4883 5.0293 14.062 5.0293C8.91397 5.0293 4.69068 8.9818 4.27124 14.0128H17.2577V15.6616H4.27124C4.69068 20.6926 8.91397 24.6452 14.062 24.6452Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_63_4751">
        <rect
          fill="white"
          height="28"
          transform="translate(0 0.916016)"
          width="28"
        />
      </clipPath>
    </defs>
  </Wrapper>
)

export default Base
