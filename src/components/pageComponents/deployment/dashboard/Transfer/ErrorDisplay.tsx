import styled from 'styled-components'

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

const ErrorDisplay = () => {
  return (
    <MessageWrapper>
      <ErrorIcon />
      <Message>Transaction failed, please try again</Message>
    </MessageWrapper>
  )
}

export default ErrorDisplay
