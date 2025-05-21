import DropdownButton from '@/src/components/sharedComponents/form/DropdownButton'
import { ChainSelectionModal } from '@/src/components/sharedComponents/modal/ChainSelectionModal'
import { networks } from '@/src/constants/networks'
import type { AllChainsIds } from '@/src/lib/networks.config'
import { Modal, useModal } from '@faceless-ui/modal'
import type { FC } from 'react'

interface Props {
  items: Array<{
    id: AllChainsIds
    isActive?: boolean
    name: string
    onClick: () => void
  }>
  // biome-ignore lint/suspicious/noExplicitAny: Can't determine which type to use for this prop, sorry
  selectedChain: any
}

export const ChainSelection: FC<Props> = ({ selectedChain, items }) => {
  const { closeModal, openModal } = useModal()

  const showChainSelectionModal = () => {
    openModal('chain-selection-modal')
  }

  const hideChainSelectionModal = () => {
    closeModal('chain-selection-modal')
  }

  return (
    <>
      <DropdownButton
        type="button"
        onClick={showChainSelectionModal}
      >
        {networks.find((item) => item.id === selectedChain?.id)?.icon}
        {selectedChain ? selectedChain.name : 'Select network'}
      </DropdownButton>
      <Modal slug="chain-selection-modal">
        <ChainSelectionModal
          items={items}
          onClose={hideChainSelectionModal}
        />
      </Modal>
    </>
  )
}

export default ChainSelection
