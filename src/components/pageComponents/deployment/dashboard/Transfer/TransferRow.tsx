import { Modal, useModal } from '@faceless-ui/modal'
import { createElement } from 'react'
import { type NumberFormatValues, NumericFormat } from 'react-number-format'
import styled from 'styled-components'
import type { Address } from 'viem'
import type { NTTToken } from '../../../../../api/endpoints'
import { useTokenByChainAndAddress } from '../../../../../hooks/api/useTokenByChainAndAddress'
import { formatWormholeAddress } from '../../../../../utils/address'
import { NumberType, formatNumber } from '../../../../../utils/numberFormat'
import { WORMHOLE_CHAIN_ID_TO_ICON } from '../../../../../utils/wormholeChains'
import ChevronDown from '../../../../sharedComponents/assets/ChevronDown'
import { PrimaryButtonSmall } from '../../../../sharedComponents/ui/Buttons'
import {
  ChainTokenSelectionModal,
  baseTextStyles,
} from './TokenSelectionModal/ChainAndTokenSelectionModal'

const FieldContainer = styled.div`
  border: 1px solid rgb(255 255 255 / 6%);
  border-radius: 12px;
  box-shadow: 0 2px 6px 0 rgb(13 10 44 / 8%);
  display: flex;
  flex: 1 0 0;
  justify-content: space-between;
  gap: var(--gap-16, 16px);
  align-self: stretch;
  padding: 16px;
`
const Divider = styled.div`
  height: auto;
  border-left: 1px solid #2e2e30;
`

const TokenSelectorButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-8, 8px);
  align-self: stretch;
  background: transparent;
  border: none;
  color: #000;
  min-width: 180px;
`

const TokenDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 75px;
  align-items: flex-start;
  flex-shrink: 1;
  gap: 4px;
`

const Icon = styled.span`
  --icon-size: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  height: var(--icon-size);
  width: var(--icon-size);
  transition: opacity 0.3s ease, transform 0.3s ease;

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

const LargeText = styled.div`
  ${baseTextStyles};
  font-size: 1.6rem;
  line-height: 150%;
  transition: all 0.3s ease-in-out;
`

const SmallText = styled.div`
  ${baseTextStyles};
  font-size: 1.2rem;
  line-height: 150%;
  transition: all 0.3s ease-in-out;
`
const MaxTextLabel = styled.div`
  ${baseTextStyles};
  color: #858585;
  font-size: 14px;
  line-height: 120%;
  white-space: nowrap;
`
const InputAmount = styled.input`
  background: transparent;
  appearance: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 150%;
  text-align: left;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`

const MaxBalanceWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 11.128px 15.897px;
  justify-content: center;
  align-items: center;
  gap: var(--gap-8, 8px);
`
const MaxButton = styled(PrimaryButtonSmall)`
  border-radius: 9.538px;
  border: 0.636px solid var(--plum-transparent-10, rgb(193 187 246 / 10%));
  background: rgb(193 187 246 / 5%);
  color: #c1bbf6;
  font-family: 'Druk Wide', monospace;
  font-size: 7.154px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`

interface TransferRowProps {
  type: 'send' | 'receive'
  tokens: NTTToken[]
  address?: string
  amount?: string
  currentTokenBalance?: string
  onSelect: (token: NTTToken) => void
  selectedToken?: NTTToken
  setSendAmount?: (amount: string) => void
  setReceiveAmount?: (amount: string) => void
}

const TransferRow = ({
  type,
  tokens,
  currentTokenBalance,
  address,
  amount,
  onSelect,
  selectedToken,
  setSendAmount,
  setReceiveAmount,
}: TransferRowProps) => {
  const { closeModal, openModal } = useModal()
  const modalSlug = `${type}chain-token-selection-modal`
  const showChainTokenSelectionModal = () => {
    openModal(modalSlug)
  }

  const hideChainSelectionModal = () => {
    closeModal(modalSlug)
  }
  if (!selectedToken) {
    selectedToken = tokens[0]
  }
  const { data: tokenInfo } = useTokenByChainAndAddress(
    selectedToken?.wormholeChainId,
    formatWormholeAddress(selectedToken.token.address as Address),
  )

  const handleChange = (values: NumberFormatValues) => {
    const rawValue = values.value
    if (!Number.isNaN(Number(rawValue))) {
      setSendAmount?.(rawValue)
      setReceiveAmount?.(rawValue)
    }
  }
  const icon = WORMHOLE_CHAIN_ID_TO_ICON[tokenInfo.home.wormholeChainId]

  return (
    <FieldContainer>
      <TokenSelectorButton
        type="button"
        onClick={showChainTokenSelectionModal}
        aria-haspopup="true"
      >
        <Icon
          key={tokenInfo.home.wormholeChainId}
          style={{ height: '40px', width: '40px', padding: '0' }}
        >
          {icon ? createElement(icon) : null}
        </Icon>
        <TokenDetails>
          <LargeText>{selectedToken?.token.symbol}</LargeText>
          <SmallText>{selectedToken?.blockchain}</SmallText>
        </TokenDetails>

        <Icon>
          <ChevronDown />
        </Icon>
      </TokenSelectorButton>
      <Modal slug={modalSlug}>
        <ChainTokenSelectionModal
          items={tokens}
          onClose={hideChainSelectionModal}
          onSelect={onSelect}
        />
      </Modal>
      <Divider />
      <NumericFormat
        value={amount}
        placeholder="0"
        thousandSeparator=","
        thousandsGroupStyle="thousand"
        onValueChange={handleChange}
        customInput={InputAmount}
      />
      {address && setSendAmount && currentTokenBalance && (
        <MaxBalanceWrapper>
          <MaxTextLabel>
            {formatNumber(Number(currentTokenBalance), NumberType.TokenTx)}{' '}
            {selectedToken?.token.symbol}
          </MaxTextLabel>
          <MaxButton
            type="button"
            onClick={() => {
              setSendAmount(currentTokenBalance)
              setReceiveAmount?.(currentTokenBalance) // TODO fix: this will be different once we add more bridge options
            }}
          >
            Max
          </MaxButton>
        </MaxBalanceWrapper>
      )}
    </FieldContainer>
  )
}

export default TransferRow
