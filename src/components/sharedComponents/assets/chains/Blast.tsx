import type { FC, HTMLAttributes } from 'react'
import { styled } from 'styled-components'

const Wrapper = styled.svg`
  display: block;
  flex-shrink: 0;
`

const Blast: FC<HTMLAttributes<SVGElement>> = ({ ...restProps }) => (
  <Wrapper
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    height="29"
    width="28"
    viewBox="0 0 140 140"
    {...restProps}
  >
    <circle
      cx="70"
      cy="70"
      r="70"
      fill="#FCFC03"
    />
    <path
      d="M51.8401 62.2522L53.7523 56.3555L44.0104 49.2314L38.4407 66.3255L48.1303 73.4439L48.1133 73.4968H91.7182L87.5189 86.4438H32.0639L28.3378 97.9335H83.7928L98.3017 90.715L105.433 68.7273L96.4594 62.1356L51.8401 62.2522Z"
      fill="black"
    />
    <path
      d="M59.0675 37.9326L44.0104 49.2314L110.449 49.2528L114.119 37.9326H59.0675Z"
      fill="black"
    />
    <path
      d="M60.2876 117.5L91.7677 19.6592H80.6073L49.4586 117.5H60.2876Z"
      fill="black"
    />
  </Wrapper>
)

export default Blast
