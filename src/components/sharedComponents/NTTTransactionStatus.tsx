import { ExplorerLink } from '@/src/components/sharedComponents/ExplorerLink'
import { useEffect } from 'react'
import styled from 'styled-components'
import type { Hash } from 'viem'
import { useWaitForTransactionReceipt } from 'wagmi'
import type { ExtendedChain } from '../../types/token'

const Row = styled.div`
  align-items: center;
  column-gap: var(--base-gap);
  display: flex;
  justify-content: center;
  margin-left: auto;
  max-width: fit-content;
`

const MessageWrapper = styled.div`
  align-items: center;
  background-color: rgb(255 255 255 / 7%);
  border-radius: 60px;
  border: solid 0.8px rgb(255 255 255 / 12%);
  column-gap: var(--base-gap);
  display: flex;
  flex-direction: row;
  height: 37px;
  justify-content: center;
  margin-left: auto;
  max-width: fit-content;
  padding: 0 calc(var(--base-common-padding-xl) + var(--base-common-padding-sm));
`

const Message = styled.span`
  color: var(--theme-text-color);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.2;
`

const ExplorerButton = styled(ExplorerLink)`
  align-items: center;
  border: solid 0.8px rgb(255 255 255 / 12%);
  border-radius: calc(var(--base-border-radius) + var(--base-border-radius-sm));
  color: var(--theme-color-primary);
  column-gap: var(--base-gap);
  display: flex;
  font-family: var(--base-font-family-button);
  font-size: 0.9rem;
  font-weight: 500;
  height: 37px;
  padding: 0 var(--base-common-padding-xl);
  text-decoration: none;
  text-transform: uppercase;
  transition: border-color var(--base-transition-duration);

  &:active {
    opacity: 0.8;
  }

  &:hover {
    border-color: rgba(193 187 246 / 40%);
  }
`

const InfoIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.35938 5.39062C7.35938 5.13104 7.43636 4.87728 7.58057 4.66144C7.72479 4.4456 7.92978 4.27737 8.16961 4.17803C8.40944 4.07869 8.67334 4.0527 8.92793 4.10334C9.18254 4.15399 9.4164 4.27899 9.59996 4.46255C9.78351 4.6461 9.90852 4.87997 9.95916 5.13457C10.0098 5.38917 9.98381 5.65307 9.88447 5.8929C9.78513 6.13272 9.6169 6.33771 9.40106 6.48193C9.18523 6.62615 8.93147 6.70312 8.67188 6.70312C8.32378 6.70312 7.98994 6.56484 7.7438 6.3187C7.49766 6.07256 7.35938 5.73872 7.35938 5.39062ZM17.8594 9C17.8594 10.7522 17.3398 12.4651 16.3663 13.922C15.3928 15.3789 14.0092 16.5145 12.3903 17.185C10.7715 17.8555 8.99018 18.031 7.27163 17.6891C5.55307 17.3473 3.97449 16.5035 2.73548 15.2645C1.49647 14.0255 0.6527 12.4469 0.310859 10.7284C-0.0309816 9.00983 0.144464 7.2285 0.815009 5.60966C1.48555 3.99082 2.62108 2.60718 4.078 1.6337C5.53492 0.660218 7.24779 0.140625 9 0.140625C11.3489 0.14323 13.6008 1.07746 15.2617 2.73835C16.9225 4.39924 17.8568 6.65115 17.8594 9ZM15.8906 9C15.8906 7.63716 15.4865 6.30493 14.7293 5.17177C13.9722 4.03862 12.896 3.15543 11.6369 2.63389C10.3778 2.11236 8.99236 1.9759 7.65571 2.24178C6.31906 2.50765 5.09127 3.16392 4.1276 4.12759C3.16392 5.09126 2.50766 6.31906 2.24178 7.65571C1.9759 8.99236 2.11236 10.3778 2.6339 11.6369C3.15543 12.896 4.03862 13.9722 5.17178 14.7293C6.30494 15.4865 7.63717 15.8906 9 15.8906C10.8269 15.8887 12.5784 15.1621 13.8703 13.8702C15.1621 12.5784 15.8887 10.8269 15.8906 9ZM9.98438 12.0089V9.32812C9.98438 8.893 9.81153 8.47571 9.50385 8.16803C9.19617 7.86035 8.77887 7.6875 8.34375 7.6875C8.11128 7.68715 7.88619 7.76909 7.70835 7.9188C7.5305 8.06851 7.41138 8.27633 7.37208 8.50546C7.33278 8.73458 7.37584 8.97022 7.49363 9.17064C7.61141 9.37106 7.79633 9.52333 8.01563 9.60047V12.2812C8.01563 12.7164 8.18848 13.1337 8.49616 13.4413C8.80383 13.749 9.22113 13.9219 9.65625 13.9219C9.88872 13.9222 10.1138 13.8403 10.2917 13.6906C10.4695 13.5409 10.5886 13.333 10.6279 13.1039C10.6672 12.8748 10.6242 12.6392 10.5064 12.4387C10.3886 12.2383 10.2037 12.086 9.98438 12.0089Z"
      fill="#C1BBF6"
    />
  </svg>
)

const SuccessIcon = () => (
  <svg
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5715 2.10261L7.07153 12.6026C6.98008 12.6944 6.87141 12.7672 6.75176 12.8169C6.63211 12.8666 6.50382 12.8921 6.37427 12.8921C6.24471 12.8921 6.11643 12.8666 5.99677 12.8169C5.87712 12.7672 5.76845 12.6944 5.677 12.6026L1.08325 8.00886C0.991684 7.91729 0.91905 7.80859 0.869495 7.68895C0.819939 7.56931 0.794434 7.44109 0.794434 7.31159C0.794434 7.1821 0.819939 7.05387 0.869495 6.93423C0.91905 6.8146 0.991684 6.70589 1.08325 6.61433C1.17482 6.52276 1.28352 6.45013 1.40316 6.40057C1.5228 6.35101 1.65102 6.32551 1.78052 6.32551C1.91001 6.32551 2.03824 6.35101 2.15787 6.40057C2.27751 6.45013 2.38622 6.52276 2.47778 6.61433L6.37509 10.5116L16.1786 0.709715C16.3636 0.524789 16.6144 0.420898 16.8759 0.420898C17.1374 0.420898 17.3882 0.524789 17.5732 0.709715C17.7581 0.894642 17.862 1.14546 17.862 1.40698C17.862 1.66851 17.7581 1.91932 17.5732 2.10425L17.5715 2.10261Z"
      fill="#7AE28D"
    />
  </svg>
)

const ExternalLink = () => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.75 5.5C12.75 5.69891 12.671 5.88968 12.5303 6.03033C12.3897 6.17098 12.1989 6.25 12 6.25C11.8011 6.25 11.6103 6.17098 11.4697 6.03033C11.329 5.88968 11.25 5.69891 11.25 5.5V3.3125L7.53063 7.03187C7.38973 7.17277 7.19863 7.25193 6.99938 7.25193C6.80012 7.25193 6.60902 7.17277 6.46812 7.03187C6.32723 6.89098 6.24807 6.69988 6.24807 6.50063C6.24807 6.30137 6.32723 6.11027 6.46812 5.96938L10.1875 2.25H8C7.80109 2.25 7.61032 2.17098 7.46967 2.03033C7.32902 1.88968 7.25 1.69891 7.25 1.5C7.25 1.30109 7.32902 1.11032 7.46967 0.96967C7.61032 0.829018 7.80109 0.75 8 0.75H12C12.1989 0.75 12.3897 0.829018 12.5303 0.96967C12.671 1.11032 12.75 1.30109 12.75 1.5V5.5ZM10 7C9.80109 7 9.61032 7.07902 9.46967 7.21967C9.32902 7.36032 9.25 7.55109 9.25 7.75V11.75H1.75V4.25H5.75C5.94891 4.25 6.13968 4.17098 6.28033 4.03033C6.42098 3.88968 6.5 3.69891 6.5 3.5C6.5 3.30109 6.42098 3.11032 6.28033 2.96967C6.13968 2.82902 5.94891 2.75 5.75 2.75H1.5C1.16848 2.75 0.850537 2.8817 0.616117 3.11612C0.381696 3.35054 0.25 3.66848 0.25 4V12C0.25 12.3315 0.381696 12.6495 0.616117 12.8839C0.850537 13.1183 1.16848 13.25 1.5 13.25H9.5C9.83152 13.25 10.1495 13.1183 10.3839 12.8839C10.6183 12.6495 10.75 12.3315 10.75 12V7.75C10.75 7.55109 10.671 7.36032 10.5303 7.21967C10.3897 7.07902 10.1989 7 10 7Z"
      fill="#C1BBF6"
    />
  </svg>
)

const ErrorIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 0.140625C7.24779 0.140625 5.53492 0.660218 4.078 1.6337C2.62108 2.60718 1.48555 3.99082 0.815009 5.60966C0.144464 7.2285 -0.0309816 9.00983 0.310859 10.7284C0.6527 12.4469 1.49647 14.0255 2.73548 15.2645C3.97449 16.5035 5.55307 17.3473 7.27163 17.6891C8.99018 18.031 10.7715 17.8555 12.3903 17.185C14.0092 16.5145 15.3928 15.3789 16.3663 13.922C17.3398 12.4651 17.8594 10.7522 17.8594 9C17.8568 6.65115 16.9225 4.39924 15.2617 2.73835C13.6008 1.07746 11.3489 0.14323 9 0.140625ZM15.8906 9C15.8921 10.4875 15.4098 11.9351 14.5166 13.1245L4.87547 3.4834C5.89952 2.71821 7.11624 2.25299 8.38956 2.13974C9.66288 2.02649 10.9426 2.26968 12.0856 2.84212C13.2286 3.41457 14.1899 4.29369 14.8618 5.38118C15.5338 6.46867 15.89 7.72165 15.8906 9ZM2.10938 9C2.10796 7.51253 2.5902 6.06491 3.4834 4.87547L13.1245 14.5166C12.1005 15.2818 10.8838 15.747 9.61045 15.8603C8.33712 15.9735 7.0574 15.7303 5.91438 15.1579C4.77137 14.5854 3.81013 13.7063 3.13816 12.6188C2.46619 11.5313 2.10999 10.2783 2.10938 9Z"
      fill="#FD8058"
    />
  </svg>
)

export const NTTTransactionStatus = ({
  chain,
  hash,
  isWaitingSignature,
  onSuccess,
  onError,
}: {
  chain: ExtendedChain
  hash: Hash | undefined
  isWaitingSignature: boolean
  onError: () => void
  onSuccess?: () => void
}) => {
  const {
    isLoading: isWaitingTx,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
    timeout: 300000,
  })

  // Handle error state and cleanup
  useEffect(() => {
    if (isError) {
      onError()
    }
  }, [isError, onError])

  // Handle success state and cleanup
  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess()
    }
  }, [isSuccess, onSuccess])

  if (isError) {
    return (
      <MessageWrapper>
        <ErrorIcon />
        <Message>Transaction failed, please try again</Message>
      </MessageWrapper>
    )
  }

  if (isSuccess && hash) {
    return (
      <Row>
        <MessageWrapper>
          <SuccessIcon />
          <Message>Transaction successful</Message>
        </MessageWrapper>
        <ExplorerButton
          text={
            <>
              Explorer <ExternalLink />
            </>
          }
          hashOrAddress={hash}
          chain={chain}
        />
      </Row>
    )
  }

  if (isWaitingSignature) {
    return (
      <MessageWrapper>
        <InfoIcon />
        <Message>Waiting for signature...</Message>
      </MessageWrapper>
    )
  }

  if (isWaitingTx) {
    return (
      <MessageWrapper>
        <InfoIcon />
        <Message>Waiting for confirmation...</Message>
      </MessageWrapper>
    )
  }

  // If no hash, render nothing
  return null
}
