import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import type { FC } from 'react'
import { PrimaryButton } from '../../../../../sharedComponents/ui/Buttons'
import TransferConnectButton from './TransferConnectButton'

interface ConnectWalletButtonProps {
  label: string
  disabled?: boolean
  handleAction: () => void
}
export const ConnectButtonWrapper: FC<ConnectWalletButtonProps> = ({
  label,
  disabled,
  handleAction,
}) => {
  const { open } = useAppKit()
  const { isConnected, status } = useAppKitAccount()

  return (
    <>
      {!isConnected ? (
        <TransferConnectButton
          $isConnected={isConnected}
          disabled={status === 'connecting'}
          onClick={() => {
            open()
          }}
        >
          {label}
        </TransferConnectButton>
      ) : (
        <PrimaryButton
          disabled={disabled}
          onClick={handleAction}
        >
          {label}
        </PrimaryButton>
      )}
    </>
  )
}
