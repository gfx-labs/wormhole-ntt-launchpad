import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ReactNode } from '@tanstack/react-router'
import type { TransactionId } from '@wormhole-foundation/sdk'
import { useCallback, useEffect, useMemo, useState } from 'react'
import styled, { css } from 'styled-components'
import { type Address, formatUnits } from 'viem'
import { useBalance, useWaitForTransactionReceipt } from 'wagmi'
import type { NTTToken } from '../../../../../api/endpoints'
import { useManagerOwner } from '../../../../../hooks/useManagerOwner'
import { useWeb3Status } from '../../../../../hooks/useWeb3Status'
import { formatWormholeAddress } from '../../../../../utils/address'
import { getWormholeChainId } from '../../../../../utils/wormholeChains'
import { InnerCardOpaque, InnerCardTitle } from '../../../../sharedComponents/form/ui'
import ChangeWallet from './ChangeWallet'
import { ConnectButtonWrapper } from './ConnectandTransferButton/ConnectButtonWrapper'
import ErrorDisplay from './ErrorDisplay'
import { LoadingSpinner } from './LoadingSpinner'
import OrderSubmitted from './OrderSubmitted'
import Summary from './Summary'
import Transfer from './Transfer'
import { transfer } from './utils/transfer'

const CardWrapper = styled(InnerCardOpaque)`
  user-select: none;
  display: flex;
  padding: 32px;
  flex-direction: column;
  gap: var(--gap-12, 12px);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

const CardTitle = styled(InnerCardTitle)`
  color: var(--white, #fff);
  font-size: 36px;
  font-style: normal;
  font-weight: 900;
  line-height: 90%; /* 32.4px */
  text-transform: uppercase;
`
const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`
const TransferWrapper = ({ tokens, ...restProps }: { tokens: NTTToken[] }) => {
  const { walletChainId, isWalletConnected, address, connector } = useWeb3Status()

  const wormholeChainId = getWormholeChainId(walletChainId)
  const defaultSendToken =
    tokens.find((token) => token.wormholeChainId === wormholeChainId) ?? tokens[0]

  const defaultReceiveToken =
    tokens.find((token) => token.wormholeChainId !== defaultSendToken?.wormholeChainId) ?? tokens[0]

  const [selectedSendToken, setSelectedSendToken] = useState<NTTToken | undefined>(defaultSendToken)
  const [selectedReceiveToken, setSelectedReceiveToken] = useState<NTTToken | undefined>(
    defaultReceiveToken,
  )

  const [transactionIds, setTransactionIds] = useState<TransactionId[] | undefined>(undefined)

  const [sendAmount, setSendAmount] = useState<string | undefined>(undefined)
  const [receiveAmount, setReceiveAmount] = useState<string | undefined>(undefined)
  const [receiverAddress, setReceiverAddress] = useState<string | undefined>(undefined)
  const [receiverInputAddress, setReceiverInputAddress] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [expectedChainId, setExpectedChainId] = useState<number | null>(null)
  const [isWaitingTx, setIsWaitingTx] = useState<boolean>(false)
  const [showChangeWallet, setShowChangeWallet] = useState<boolean>(false)
  const hasTransactionIds = transactionIds && transactionIds?.length > 0
  const currentTokenAddress = selectedSendToken?.token.address as Address
  const [approvalTxHash, setApprovalTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [transferTxHash, setTransferTxHash] = useState<`0x${string}` | undefined>(undefined)
  const [approvalConfirmed, setApprovalConfirmed] = useState(false)
  const { data: currentTokenBalance } = useBalance({
    address: address as `0x${string}`,
    chainId: walletChainId as number,
    token: currentTokenAddress,
    query: {
      enabled: !!address && !!currentTokenAddress,
    },
  })

  const formattedCurrentTokenBalance = useMemo(() => {
    return formatUnits(currentTokenBalance?.value ?? 0n, 18)
  }, [currentTokenBalance])

  const hasBalance =
    sendAmount && Number.parseFloat(sendAmount) <= Number.parseFloat(formattedCurrentTokenBalance)

  const wormholeTokenAddress = formatWormholeAddress(currentTokenAddress).slice(2)

  const ownerData = useManagerOwner(
    selectedSendToken?.wormholeChainId ?? defaultSendToken.wormholeChainId,
    wormholeTokenAddress,
  )
  const isOwner = ownerData?.nttOwnerOwner === address

  const showSummary =
    address &&
    sendAmount &&
    receiveAmount &&
    selectedSendToken &&
    selectedReceiveToken &&
    hasBalance &&
    Number.parseFloat(sendAmount) > 0 &&
    !showChangeWallet

  const isTransferDisabled =
    !showChangeWallet && (isWalletConnected ? !isOwner || !showSummary : false)

  useEffect(() => {
    if (!isWalletConnected || !address || !walletChainId) return
    if (walletChainId.toString() === expectedChainId?.toString()) {
      // This is a user initiated in app network switch
      setExpectedChainId(null) // Clear the flag
    } else {
      // This is a network switch initiated by the app wallet
      const newSendToken = tokens.find((t) => t.wormholeChainId === wormholeChainId)
      setSelectedSendToken(newSendToken ?? tokens[0])
    }
  }, [walletChainId, tokens, wormholeChainId, isWalletConnected, address, expectedChainId])

  const handleSetReceiverWallet = () => {
    if (receiverInputAddress.trim() === '') return
    setReceiverAddress(receiverInputAddress.trim())
    setShowChangeWallet(false)
    setReceiverInputAddress('')
  }

  const { isLoading: approvalLoading } = useWaitForTransactionReceipt({
    hash: approvalTxHash ?? undefined,
    query: { enabled: !!approvalTxHash },
    timeout: 300000,
  })

  const { isSuccess: isTransferConfirmed, isLoading: transferLoading } =
    useWaitForTransactionReceipt({
      hash: transferTxHash ?? undefined,
      query: { enabled: !!transferTxHash },
      timeout: 300000,
    })

  const handleTransfer = useCallback(async () => {
    setError(false)
    if (!showSummary) {
      alert('Please select tokens, enter an amount, and connect your wallet.')
      return
    }

    if (!hasBalance) {
      alert('Amount exceeds available balance.')
      return
    }

    try {
      const result = await transfer({
        selectedReceiveToken,
        selectedSendToken,
        sendAmount,
        address,
        receiverAddress,
        setIsWaitingTx,
        setApprovalTxHash,
        setApprovalConfirmed,
        setTransferTxHash,
      })
      console.log('Transfer successful:', result.txids)
      setTransactionIds(result.txids)
      setIsWaitingTx(false)
      setSendAmount(undefined)
      setReceiveAmount(undefined)
    } catch (error) {
      console.error('Transfer failed:', error)
      setIsWaitingTx(false)
      setError(true)
      alert('Transfer failed. Check console for details.')
    }
  }, [
    selectedSendToken,
    selectedReceiveToken,
    sendAmount,
    address,
    receiverAddress,
    hasBalance,
    showSummary,
  ])

  const getButtonText = (): ReactNode => {
    if (isWalletConnected && !isOwner) {
      return 'Login with owner wallet'
    }
    if (showChangeWallet) {
      if (!receiverInputAddress) {
        return 'Paste a destination address'
      }
      return 'Change Wallet'
    }
    if (isWaitingTx) {
      let loadingMessage = 'Waiting'

      if (!approvalLoading && !transferTxHash && !isTransferConfirmed) {
        loadingMessage = 'Waiting for wallet signature'
      } else if (approvalLoading && !approvalConfirmed) {
        loadingMessage = 'Waiting for token approval confirmation'
      } else if (approvalConfirmed && transferTxHash && !isTransferConfirmed) {
        loadingMessage = 'Waiting for transfer confirmation'
      }

      return (
        <LoadingWrapper>
          {loadingMessage}
          <LoadingSpinner />
        </LoadingWrapper>
      )
    }
    if (!isWalletConnected) {
      return 'Connect Wallet'
    }
    if (!sendAmount) {
      return 'Enter an amount'
    }

    return `Transfer to ${selectedReceiveToken?.blockchain}`
  }
  const buttonText = getButtonText()

  return (
    <CardWrapper {...restProps}>
      {!hasTransactionIds && (
        <>
          <CardTitle>Transfer</CardTitle>
          <Transfer
            tokens={tokens}
            sendAmount={sendAmount}
            receiveAmount={receiveAmount}
            address={address as Address}
            receiverAddress={receiverAddress}
            showChangeWallet={showChangeWallet}
            setSelectedSendToken={setSelectedSendToken}
            setSelectedReceiveToken={setSelectedReceiveToken}
            setSendAmount={setSendAmount}
            setReceiveAmount={setReceiveAmount}
            selectedSendToken={selectedSendToken}
            selectedReceiveToken={selectedReceiveToken}
            formattedCurrentTokenBalance={formattedCurrentTokenBalance}
            setError={setError}
            wormholeChainId={wormholeChainId}
            connector={connector}
            setExpectedChainId={setExpectedChainId}
            setShowChangeWallet={setShowChangeWallet}
          />
          {showChangeWallet && <ChangeWallet onValidInput={setReceiverInputAddress} />}
          {showSummary && (
            <Summary
              address={address as Address}
              receiverAddress={receiverAddress}
              receiveAmount={receiveAmount}
              selectedReceiveToken={selectedReceiveToken}
              connectorIcon={connector?.icon}
            />
          )}

          <ConnectButtonWrapper
            disabled={
              isTransferDisabled ||
              isWaitingTx ||
              approvalLoading ||
              transferLoading ||
              (showChangeWallet && receiverInputAddress.length < 1)
            }
            handleAction={showChangeWallet ? handleSetReceiverWallet : handleTransfer}
            label={buttonText}
          />

          {error && <ErrorDisplay />}
        </>
      )}
      {hasTransactionIds && address && wormholeChainId && (
        <OrderSubmitted
          transactionIds={transactionIds}
          setTransactionIds={setTransactionIds}
        />
      )}
    </CardWrapper>
  )
}

export default TransferWrapper
