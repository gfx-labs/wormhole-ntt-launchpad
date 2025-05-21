import { ChainItem } from '@/src/components/sharedComponents/form/ChainItem'
import { Checkmark as BaseCheckmark } from '@/src/components/sharedComponents/form/Checkmark'
import type { ReactElement } from 'react'
import styled from 'styled-components'

const Checkmark = styled(BaseCheckmark)`
  margin-left: auto;
`

interface CheckboxProps {
  disabled?: boolean
  icon?: ReactElement
  isChecked: boolean
  label: string
  onToggle: () => void
}

const PeerChain = ({ icon, label, isChecked, onToggle, disabled = false }: CheckboxProps) => (
  <ChainItem
    $isChecked={isChecked}
    disabled={disabled}
    onClick={() => !disabled && onToggle()}
    icon={icon}
    name={label}
  >
    <Checkmark className={isChecked ? 'checked' : ''} />
  </ChainItem>
)

export default PeerChain
