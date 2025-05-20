import PeerChain from '@/src/components/sharedComponents/PeerChain'
import { InnerCard, InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { networks } from '@/src/constants/networks'
import { type AllChainsIds, chains } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import { getAnyChainById } from '@/src/utils/getChainById'
import type { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled(InnerCard)`
  display: flex;
  flex-direction: column;
  row-gap: calc(var(--base-gap) * 3);
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap-xl);
  width: 100%;
`

const PeerChainsSelector: FC<{
  title: string
  currentDeployedChains?: AllChainsIds[]
  singleChain?: boolean
}> = ({ title, currentDeployedChains = [], singleChain = false, ...restProps }) => {
  const { homeChain, peerChains, setHomeChainId, setPeerChains, mode } = useDeployStore()
  const chain = homeChain ? getAnyChainById(homeChain) : undefined

  const isAddChainMode = mode === 'addChain'
  const availablePeerChains = isAddChainMode
    ? [...chains]
    : chains.filter((chain) => chain.id !== homeChain)

  // sort the chains by disabled status first
  const sortedPeerChains = availablePeerChains.sort((a, b) => {
    const aDisabled = currentDeployedChains.includes(a.id)
    const bDisabled = currentDeployedChains.includes(b.id)
    return bDisabled ? 1 : aDisabled ? -1 : 0
  })

  const handleToggle = (chainId: AllChainsIds) => {
    if (isAddChainMode) {
      // mantain the disabled chains and add the new one
      setHomeChainId(chainId)
      setPeerChains(peerChains)
      return
    }

    setPeerChains(
      peerChains.includes(chainId)
        ? peerChains.filter((id) => id !== chainId) // remove chain from peer chains
        : [...peerChains, chainId], // add chain to peer chains
    )
  }

  return (
    <Wrapper {...restProps}>
      <InnerCardTitle>{title}</InnerCardTitle>
      <Items>
        {chain && !isAddChainMode && (
          <PeerChain
            disabled={!isAddChainMode}
            icon={networks.find((item) => item.id === chain.id)?.icon}
            isChecked={true}
            label={isAddChainMode ? `${chain.name}` : `${chain.name} (Home)`}
            onToggle={() => null}
          />
        )}
        {sortedPeerChains.map((chain) => (
          <PeerChain
            disabled={currentDeployedChains.includes(chain.id)}
            icon={networks.find((item) => item.id === chain.id)?.icon}
            isChecked={[homeChain, ...peerChains].includes(chain.id)}
            key={chain.id}
            label={chain.name}
            onToggle={() => handleToggle(chain.id)}
          />
        ))}
      </Items>
    </Wrapper>
  )
}

export default PeerChainsSelector
