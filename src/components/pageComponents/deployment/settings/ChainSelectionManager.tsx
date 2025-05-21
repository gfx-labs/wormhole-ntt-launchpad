import ChainSelectionModalManager from '@/src/components/pageComponents/deployment/settings/ChainSelectionModalManager'
import DropdownButton from '@/src/components/sharedComponents/form/DropdownButton'
import { networks } from '@/src/constants/networks'
import { type WormholeChainId, getAnyChainId } from '@/src/utils/wormholeChains'
import { Modal, useModal } from '@faceless-ui/modal'
import type { FC } from 'react'

interface Props {
  wormholeTokenAddress: string
  wormholeChainId: WormholeChainId //(typeof networks)[number]['id'] | null
}

const ChainSelectionManager: FC<Props> = ({
  wormholeChainId,
  wormholeTokenAddress: tokenAddress,
}) => {
  const { closeModal, openModal } = useModal()
  const selectedChainId = getAnyChainId(wormholeChainId)

  const showChainSelectionModal = () => {
    openModal('chain-selection-modal')
  }

  const hideChainSelectionModal = () => {
    closeModal('chain-selection-modal')
  }

  const selectedNetwork = networks.find((item) => item.id === selectedChainId)

  if (wormholeChainId && !selectedNetwork) {
    throw new Error(`Chain not found for chain id: ${wormholeChainId}`)
  }

  return (
    <>
      <DropdownButton
        type="button"
        onClick={showChainSelectionModal}
      >
        {selectedNetwork?.icon}
        {selectedNetwork?.label || 'Select network'}
      </DropdownButton>
      <Modal slug="chain-selection-modal">
        <ChainSelectionModalManager
          onClose={hideChainSelectionModal}
          wormholeChainId={wormholeChainId}
          wormholeTokenAddress={tokenAddress}
        />
      </Modal>
    </>
  )
}

export default ChainSelectionManager
