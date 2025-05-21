import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import type { FC } from 'react'
import type { Address } from 'viem'
import { UserAvatar } from './Avatar/UserAvatar'
import ConnectButton from './ConnectButton'

export const shortenAddress = (address: Address | null | undefined): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

interface ConnectWalletButtonProps {
  label: string
}
export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({ label }) => {
  const { open } = useAppKit()
  const { address, isConnected, status } = useAppKitAccount()

  return (
    <ConnectButton
      $isConnected={isConnected}
      disabled={status === 'connecting'}
      onClick={() => {
        open()
      }}
    >
      {isConnected ? (
        <>
          {address && (
            <UserAvatar
              address={address as Address}
              size={24}
            />
          )}
          {shortenAddress(address as Address)}
        </>
      ) : (
        label
      )}
    </ConnectButton>
  )
}
