import type { ComponentProps, FC, MouseEventHandler } from 'react'
import styled from 'styled-components'

import { CopyButton, ExternalLink } from '@bootnodedev/db-ui-toolkit'

import { getTruncatedHash } from '@/src/utils/strings'

export const ExternalLinkSVG = () => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5312 6.3125C14.5312 6.53628 14.4424 6.75089 14.2841 6.90912C14.1259 7.06736 13.9113 7.15625 13.6875 7.15625C13.4637 7.15625 13.2491 7.06736 13.0909 6.90912C12.9326 6.75089 12.8438 6.53628 12.8438 6.3125V3.85156L8.65945 8.03586C8.50095 8.19437 8.28596 8.28342 8.0618 8.28342C7.83763 8.28342 7.62265 8.19437 7.46414 8.03586C7.30563 7.87735 7.21658 7.66237 7.21658 7.4382C7.21658 7.21404 7.30563 6.99906 7.46414 6.84055L11.6484 2.65625H9.1875C8.96372 2.65625 8.74911 2.56736 8.59088 2.40912C8.43265 2.25089 8.34375 2.03628 8.34375 1.8125C8.34375 1.58872 8.43265 1.37411 8.59088 1.21588C8.74911 1.05764 8.96372 0.96875 9.1875 0.96875H13.6875C13.9113 0.96875 14.1259 1.05764 14.2841 1.21588C14.4424 1.37411 14.5312 1.58872 14.5312 1.8125V6.3125ZM11.4375 8C11.2137 8 10.9991 8.0889 10.8409 8.24713C10.6826 8.40536 10.5938 8.61997 10.5938 8.84375V13.3438H2.15625V4.90625H6.65625C6.88003 4.90625 7.09464 4.81736 7.25287 4.65912C7.41111 4.50089 7.5 4.28628 7.5 4.0625C7.5 3.83872 7.41111 3.62411 7.25287 3.46588C7.09464 3.30764 6.88003 3.21875 6.65625 3.21875H1.875C1.50204 3.21875 1.14435 3.36691 0.880631 3.63063C0.616908 3.89435 0.46875 4.25204 0.46875 4.625V13.625C0.46875 13.998 0.616908 14.3556 0.880631 14.6194C1.14435 14.8831 1.50204 15.0312 1.875 15.0312H10.875C11.248 15.0312 11.6056 14.8831 11.8694 14.6194C12.1331 14.3556 12.2812 13.998 12.2812 13.625V8.84375C12.2812 8.61997 12.1924 8.40536 12.0341 8.24713C11.8759 8.0889 11.6613 8 11.4375 8Z"
      fill="currentColor"
    />
  </svg>
)

const CopySVG = () => (
  <svg
    width="15"
    height="16"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.6875 0.96875H4.6875C4.46372 0.96875 4.24911 1.05764 4.09088 1.21588C3.93264 1.37411 3.84375 1.58872 3.84375 1.8125V4.34375H1.3125C1.08872 4.34375 0.874112 4.43264 0.715879 4.59088C0.557645 4.74911 0.46875 4.96372 0.46875 5.1875V14.1875C0.46875 14.4113 0.557645 14.6259 0.715879 14.7841C0.874112 14.9424 1.08872 15.0312 1.3125 15.0312H10.3125C10.5363 15.0312 10.7509 14.9424 10.9091 14.7841C11.0674 14.6259 11.1562 14.4113 11.1562 14.1875V11.6562H13.6875C13.9113 11.6562 14.1259 11.5674 14.2841 11.4091C14.4424 11.2509 14.5312 11.0363 14.5312 10.8125V1.8125C14.5312 1.58872 14.4424 1.37411 14.2841 1.21588C14.1259 1.05764 13.9113 0.96875 13.6875 0.96875ZM9.46875 13.3438H2.15625V6.03125H9.46875V13.3438ZM12.8438 9.96875H11.1562V5.1875C11.1562 4.96372 11.0674 4.74911 10.9091 4.59088C10.7509 4.43264 10.5363 4.34375 10.3125 4.34375H5.53125V2.65625H12.8438V9.96875Z"
      fill="currentColor"
    />
  </svg>
)

const Wrapper = styled.div`
  align-items: center;
  column-gap: var(--base-gap-xl);
  display: flex;
  max-width: 100%;
`

const HashValue = styled.span`
  color: inherit;
  font-size: inherit;
  max-width: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface HashProps extends Omit<ComponentProps<'div'>, 'onCopy'> {
  explorerURL?: string
  hash: string
  onCopy?: MouseEventHandler<HTMLButtonElement>
  showCopyButton?: boolean
  truncatedHashLength?: number | 'disabled'
}

/**
 * Hash component, displays a hash with an optional copy button and an optional external link.
 *
 * @param {HashProps} props - Hash component props.
 * @param {string} props.hash - The hash to display.
 * @param {string} [props.explorerURL=''] - The URL to the explorer for the hash. If provided, an external link icon will be displayed. Default is an empty string.
 * @param {MouseEventHandler<HTMLButtonElement>} [props.onCopy=undefined] - The function to call when the copy button is clicked. Default is undefined.
 * @param {boolean} [props.showCopyButton=false] - Whether to show the copy button. Default is false.
 * @param {number | 'disabled'} [props.truncatedHashLength=6] - The number of characters to show at the start and end of the hash. 'disabled' if you don't want to truncate the hash value. Default is 6.
 *
 * @example
 * ```tsx
 * <Hash
 *   hash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
 * />
 * ```
 */
const Hash: FC<HashProps> = ({
  explorerURL = '',
  hash,
  onCopy,
  showCopyButton = false,
  truncatedHashLength = 6,
  ...restProps
}) => {
  return (
    <Wrapper {...restProps}>
      <HashValue>
        {truncatedHashLength === 'disabled' ? hash : getTruncatedHash(hash, truncatedHashLength)}
      </HashValue>
      {explorerURL && (
        <ExternalLink href={explorerURL}>
          <ExternalLinkSVG />
        </ExternalLink>
      )}
      {showCopyButton && (
        <CopyButton
          onClick={onCopy}
          value={hash}
        >
          <CopySVG />
        </CopyButton>
      )}
    </Wrapper>
  )
}

export default Hash
