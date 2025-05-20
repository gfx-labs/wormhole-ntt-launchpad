import { useState } from 'react'
import styled from 'styled-components'
import type { Address } from 'viem'
import type { NTTToken } from '../../../../../api/endpoints'
import { shortenAddress } from '../../../../sharedComponents/ConnectButtonWrapper'
import ChevronDown from '../../../../sharedComponents/assets/ChevronDown'
import WalletIcon from '../../../../sharedComponents/assets/WalletIcon'

const GreyText = styled.span`
  color: rgb(255 255 255 / 50%);
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
`

const BaseText = styled.span`
  color: #fff;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
`

const StyledSummaryContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: var(--padding-8, 16px) var(--padding-24, 24px);
  justify-content: space-between;
  border-radius: 12px;
  border: 0.8px solid var(--light-transparent-12, rgb(255 255 255 / 12%));
  background: var(--light-transparent-07, rgb(255 255 255 / 7%));
`

const StyledAddress = styled.span`
  color: #fff;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  margin-right: 8px;
`

const TransferSummary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  height: 38px;
  flex: 1 0 0;
`
const SummaryDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px var(--gap-8, 8px);
  align-items: center;
`

const TxSummaryContainer = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: var(--gap-16, 16px);
  align-self: stretch;
  border-radius: 12px;
`

const TxTextBase = styled.div`
  color: #fff;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  text-transform: uppercase;
  height: 38px;
`
const TxTitle = styled(TxTextBase)`
  font-weight: 700;
`
const Divider = styled.div`
  height: 1px;
  width: 100%;
  align-self: stretch;
  background: rgb(255 255 255 / 10%);
  margin: 12px 0;
`
const ChevronWrapper = styled.div`
  display: flex;
  height: 52px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Label = styled(TxTextBase)`
  text-align: left;
  font-weight: 500;
`

const Value = styled(TxTextBase)`
  text-align: right;
`

const TxSummary = ({ address }: { address: string }) => {
  return (
    <TxSummaryContainer>
      <TxTitle>Transaction Summary</TxTitle>
      <Row>
        <Label>ESTIMATED TIME OF ARRIVAL</Label>
        <Value>~15 minutes</Value>
      </Row>

      <Row>
        <Label>DESTINATION WALLET</Label>
        <Value>{address}</Value>
      </Row>
    </TxSummaryContainer>
  )
}
interface SummaryProps {
  address: string
  receiverAddress?: string
  receiveAmount: string
  selectedReceiveToken?: NTTToken
  connectorIcon?: string
}

const Summary = ({
  address,
  receiverAddress,
  receiveAmount,
  selectedReceiveToken,
  connectorIcon,
}: SummaryProps) => {
  const [expanded, setExpanded] = useState(false)

  const showIcon = !receiverAddress && connectorIcon
  const customReceiverAddress = receiverAddress ?? address

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <StyledSummaryContainer onClick={() => setExpanded(!expanded)}>
        <TransferSummary>
          <SummaryDetails>
            {showIcon ? (
              <img
                src={connectorIcon}
                alt="wallet"
                height={24}
                width={24}
              />
            ) : (
              <WalletIcon />
            )}
            <StyledAddress>{shortenAddress(customReceiverAddress as Address)}</StyledAddress>
            <GreyText>will receive </GreyText>
            <BaseText>~{receiveAmount}</BaseText>
            <GreyText> {selectedReceiveToken?.token.symbol} on </GreyText>
            <BaseText>{selectedReceiveToken?.blockchain}</BaseText>
            <GreyText> in ~ </GreyText>
            <BaseText>15</BaseText>
            <GreyText> minutes</GreyText>
          </SummaryDetails>
          <ChevronWrapper>
            <ChevronDown style={{ width: '20px', height: '20px' }} />
          </ChevronWrapper>
        </TransferSummary>
        {expanded && (
          <>
            <Divider />
            <TxSummary address={customReceiverAddress ?? ''} />
          </>
        )}
      </StyledSummaryContainer>
    </div>
  )
}

export default Summary
