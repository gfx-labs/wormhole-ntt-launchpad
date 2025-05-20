import styled, { css } from 'styled-components'
import type { Address } from 'viem'
import type { Connector } from 'wagmi'
import type { NTTToken } from '../../../../../api/endpoints'
import { useWeb3Status } from '../../../../../hooks/useWeb3Status'
import { getAnyChain, getEvmChainId } from '../../../../../utils/wormholeChains'
import { UserAvatar } from '../../../../sharedComponents/Avatar/UserAvatar'
import { shortenAddress } from '../../../../sharedComponents/ConnectButtonWrapper'
import SwitchIcon from '../../../../sharedComponents/assets/SwitchIcon'
import WalletIcon from '../../../../sharedComponents/assets/WalletIcon'
import { SecondaryButtonSmall } from '../../../../sharedComponents/ui/Buttons'
import TransferRow from './TransferRow'

const baseTextStyles = css`
  color: var(--white, #fff);
  font-family: 'Roboto Mono', monospace;
  font-style: normal;
`

const LabelDetails = styled.div`
  ${baseTextStyles};
  font-weight: 400;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--gap-8, 8px);
`

const WalletDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  line-height: 160%;
  justify-content: center;
`

const WalletText = styled.span`
  margin-right: auto;
`

const ChangeWalletButton = styled(SecondaryButtonSmall)`
  background-color: transparent;
`

interface TransferProps {
  address: string | undefined
  receiverAddress?: string | undefined
  connector: Connector | undefined
  tokens: NTTToken[]
  sendAmount: string | undefined
  receiveAmount: string | undefined
  selectedSendToken: NTTToken | undefined
  selectedReceiveToken: NTTToken | undefined
  formattedCurrentTokenBalance: string
  wormholeChainId: number
  showChangeWallet: boolean
  setError: (error: boolean) => void
  setSendAmount: (amount: string) => void
  setSelectedSendToken: (token: NTTToken) => void
  setReceiveAmount: (amount: string) => void
  setSelectedReceiveToken: (token: NTTToken) => void
  setExpectedChainId: (chainId: number | null) => void
  setShowChangeWallet: (show: boolean) => void
}

const Transfer = ({
  address,
  receiverAddress,
  connector,
  tokens,
  sendAmount,
  receiveAmount,
  showChangeWallet,
  selectedSendToken,
  selectedReceiveToken,
  formattedCurrentTokenBalance,
  wormholeChainId,
  setSendAmount,
  setSelectedSendToken,
  setReceiveAmount,
  setSelectedReceiveToken,
  setError,
  setExpectedChainId,
  setShowChangeWallet,
}: TransferProps) => {
  // if evm, default address is the same for other chains - will have to handle for Sol

  const { switchNetwork } = useWeb3Status()
  const handleSendSelect = async (token: NTTToken) => {
    setError(false)
    if (token.wormholeChainId !== wormholeChainId) {
      const chainId = getAnyChain(token.wormholeChainId)
      chainId && switchNetwork(chainId)
    }
    setSelectedSendToken(token)
  }

  const handleReceiveSelect = (token: NTTToken) => {
    setError(false)
    setSelectedReceiveToken(token)
  }

  const handleSwap = () => {
    if (!selectedSendToken || !selectedReceiveToken) return
    setError(false)

    const temp = selectedSendToken
    setSelectedSendToken(selectedReceiveToken)
    const chainId = getAnyChain(selectedReceiveToken?.wormholeChainId)
    // User initiated network switch
    const evmChainId = getEvmChainId(selectedSendToken?.wormholeChainId)
    if (evmChainId !== undefined) {
      setExpectedChainId(evmChainId)
    }

    try {
      if (chainId) {
        switchNetwork(chainId)
        setSelectedReceiveToken(temp)
      }
    } catch (error) {
      console.error('Network switch failed:', error)
      setExpectedChainId(null)
    }
  }

  const showIcon = connector?.icon && !receiverAddress
  const customReceiverAddress = receiverAddress ?? address

  return (
    <Wrapper>
      <LabelDetails>
        Send
        {address && (
          <WalletDetails>
            {connector?.icon ? (
              <img
                src={connector?.icon}
                alt="wallet"
                height={24}
                width={24}
              />
            ) : (
              <UserAvatar
                address={address as Address}
                size={24}
              />
            )}
            {shortenAddress(address as Address)}
          </WalletDetails>
        )}
      </LabelDetails>
      <TransferRow
        type="send"
        tokens={tokens}
        amount={sendAmount}
        address={address as Address}
        onSelect={handleSendSelect}
        setSendAmount={setSendAmount}
        setReceiveAmount={setReceiveAmount}
        selectedToken={selectedSendToken}
        currentTokenBalance={formattedCurrentTokenBalance}
      />
      <SwitchIcon
        style={{
          marginTop: '36px',
          alignSelf: 'center',
          cursor: 'pointer',
        }}
        onClick={handleSwap}
      />
      <LabelDetails>
        Receive
        {address && (
          <WalletDetails>
            <ChangeWalletButton onClick={() => setShowChangeWallet(!showChangeWallet)}>
              <WalletIcon />
              <WalletText>Change destination</WalletText>
            </ChangeWalletButton>

            {showIcon ? (
              <img
                src={connector?.icon}
                alt="wallet"
                height={24}
                width={24}
              />
            ) : (
              <WalletIcon />
            )}
            {shortenAddress(customReceiverAddress as Address)}
          </WalletDetails>
        )}
      </LabelDetails>
      <TransferRow
        type="receive"
        tokens={tokens}
        amount={receiveAmount}
        address={customReceiverAddress as Address}
        onSelect={handleReceiveSelect}
        selectedToken={selectedReceiveToken}
      />
    </Wrapper>
  )
}

export default Transfer
