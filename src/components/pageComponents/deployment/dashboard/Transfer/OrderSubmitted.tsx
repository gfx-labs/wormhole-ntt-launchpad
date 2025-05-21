import type { TransactionId } from '@wormhole-foundation/sdk'
import styled from 'styled-components'
import Hash from '../../../../sharedComponents/Hash'

import onCopyToast from '../../../../../utils/onCopyToast'
import SuccessIcon from '../../../../sharedComponents/assets/SuccessIcon'
import { InnerCardTitle } from '../../../../sharedComponents/form/ui'
import { PrimaryInvertedButton } from '../../../../sharedComponents/ui/Buttons'
import { ChevronRightSVG } from '../../settings/Title'

const Title = styled(InnerCardTitle)`
  font-size: 3.6rem;
`

const OrderSubmittedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  align-self: stretch;
  border-radius: 20px;
`

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
`

const ExternalLinkWrapper = styled(Hash)`
  --theme-copy-button-color: var(--theme-color-primary-light);
  --theme-copy-button-color-hover: rgb(255 255 255 / 60%);

  /* External link button */
  --theme-external-link-button-color: var(--theme-color-primary-light);
  --theme-external-link-button-color-hover: rgb(255 255 255 / 60%);

  background: var(--darkgrey, #111112);
  color: var(--theme-text-color-light);
  font-size: 14px;
`

interface OrderSubmittedProps {
  transactionIds: TransactionId[]
  setTransactionIds: (transactionIds: TransactionId[]) => void
}
const OrderSubmitted = ({ transactionIds, setTransactionIds }: OrderSubmittedProps) => {
  return (
    <OrderSubmittedWrapper>
      <SuccessIcon />

      <CenterWrapper>
        <Title>ORDER SUBMITTED</Title>
        <ExternalLinkWrapper
          explorerURL={`https://wormholescan.io/#/tx/${transactionIds[0].txid}?network=Mainnet`}
          hash={transactionIds[0].txid}
          onCopy={() => onCopyToast()}
          showCopyButton
        />
      </CenterWrapper>

      <PrimaryInvertedButton onClick={() => setTransactionIds([])}>
        Initiate A New Order <ChevronRightSVG />
      </PrimaryInvertedButton>
    </OrderSubmittedWrapper>
  )
}

export default OrderSubmitted
