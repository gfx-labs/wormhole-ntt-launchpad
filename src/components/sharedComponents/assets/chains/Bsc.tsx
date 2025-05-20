import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`

const Bsc: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    {...restProps}
  >
    <g clipPath="url(#clip0_0_7175)">
      <path
        d="M13.988 27.9574C21.6933 27.9574 27.9396 21.7111 27.9396 14.0058C27.9396 6.30055 21.6933 0.0541992 13.988 0.0541992C6.28273 0.0541992 0.036377 6.30055 0.036377 14.0058C0.036377 21.7111 6.28273 27.9574 13.988 27.9574Z"
        fill="#F3BA2F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6065 15.4893L19.711 17.5878L13.99 23.3027L8.27514 17.5878L10.3797 15.4893L13.99 19.0996L17.6065 15.4893ZM13.99 11.8728L16.1248 14.0076L13.99 16.1424L11.8613 14.0137V14.0076L12.2363 13.6327L12.4177 13.4513L13.99 11.8728ZM6.7935 11.9031L8.89804 14.0076L6.7935 16.1061L4.68896 14.0016L6.7935 11.9031ZM21.1866 11.9031L23.2911 14.0076L21.1866 16.1061L19.0821 14.0016L21.1866 11.9031ZM13.99 4.70654L19.7049 10.4214L17.6004 12.526L13.99 8.90957L10.3797 12.5199L8.27514 10.4214L13.99 4.70654Z"
        fill="#131415"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_7175">
        <rect
          width="27.9395"
          height="28"
          fill="white"
          transform="translate(0.0302734)"
        />
      </clipPath>
    </defs>
  </Wrapper>
)

export default Bsc
