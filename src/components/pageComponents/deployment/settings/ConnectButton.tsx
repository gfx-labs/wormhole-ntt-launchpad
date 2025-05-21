import { PrimaryButton } from '@/src/components/sharedComponents/ui/Buttons'
import { useAppKit } from '@reown/appkit/react'
import type { ComponentPropsWithoutRef, FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(PrimaryButton)`
  border-radius: calc(
    var(--base-border-radius-xl) + var(--base-border-radius-sm)
  );
  column-gap: var(--base-gap-xl);
  height: 64px;
  white-space: normal;
  width: 100%;
`

const WalletSVG = () => (
  <svg
    width="20"
    height="17"
    viewBox="0 0 20 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.75 3H2.75C2.55109 3 2.36032 2.92098 2.21967 2.78033C2.07902 2.63968 2 2.44891 2 2.25C2 2.05109 2.07902 1.86032 2.21967 1.71967C2.36032 1.57902 2.55109 1.5 2.75 1.5H15.5C15.6989 1.5 15.8897 1.42098 16.0303 1.28033C16.171 1.13968 16.25 0.948912 16.25 0.75C16.25 0.551088 16.171 0.360322 16.0303 0.21967C15.8897 0.0790178 15.6989 0 15.5 0H2.75C2.15326 0 1.58097 0.237053 1.15901 0.65901C0.737053 1.08097 0.5 1.65326 0.5 2.25V14.25C0.5 14.8467 0.737053 15.419 1.15901 15.841C1.58097 16.2629 2.15326 16.5 2.75 16.5H17.75C18.1478 16.5 18.5294 16.342 18.8107 16.0607C19.092 15.7794 19.25 15.3978 19.25 15V4.5C19.25 4.10218 19.092 3.72064 18.8107 3.43934C18.5294 3.15804 18.1478 3 17.75 3ZM17.75 15H2.75C2.55109 15 2.36032 14.921 2.21967 14.7803C2.07902 14.6397 2 14.4489 2 14.25V4.37156C2.24082 4.45693 2.4945 4.50037 2.75 4.5H17.75V15ZM13.25 9.375C13.25 9.1525 13.316 8.93499 13.4396 8.74998C13.5632 8.56498 13.7389 8.42078 13.9445 8.33564C14.15 8.25049 14.3762 8.22821 14.5945 8.27162C14.8127 8.31502 15.0132 8.42217 15.1705 8.5795C15.3278 8.73684 15.435 8.93729 15.4784 9.15552C15.5218 9.37375 15.4995 9.59995 15.4144 9.80552C15.3292 10.0111 15.185 10.1868 15 10.3104C14.815 10.434 14.5975 10.5 14.375 10.5C14.0766 10.5 13.7905 10.3815 13.5795 10.1705C13.3685 9.95952 13.25 9.67337 13.25 9.375Z"
      fill="currentColor"
    />
  </svg>
)

const ConnectButton: FC<ComponentPropsWithoutRef<'button'>> = ({ ...restProps }) => {
  const { open } = useAppKit()

  return (
    <Wrapper
      {...restProps}
      onClick={() => open()}
    >
      <WalletSVG /> Connect your wallet to manage your token
    </Wrapper>
  )
}

export default ConnectButton
