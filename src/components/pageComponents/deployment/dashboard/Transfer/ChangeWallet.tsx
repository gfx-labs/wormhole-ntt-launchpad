import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { isAddress } from 'viem'

const Wrapper = styled.div`
  display: flex;
  height: 83px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  align-self: stretch;
`
const Label = styled.div`
  color: var(--lightgray, #a09fa1);
  font-family: 'Roboto Mono', monospace;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  text-transform: uppercase;
`

const AddressInput = styled.input`
  display: flex;
  padding: 16px 24px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 16px;
  color: var(--white, #fff);
  background: transparent;
  border: 1px solid var(--lightgray-transparent-30, rgb(160 159 161 / 30%));
`

interface ChangeWalletInputProps {
  onValidInput: (value: string) => void
}

const ChangeWallet = ({ onValidInput }: ChangeWalletInputProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    const trimmed = inputValue.trim()
    onValidInput(isAddress(trimmed) ? trimmed : '')
  }, [inputValue, onValidInput])

  return (
    <Wrapper>
      <Label>Recipient Address</Label>
      <AddressInput
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Paste a wallet address"
      />
    </Wrapper>
  )
}
export default ChangeWallet
