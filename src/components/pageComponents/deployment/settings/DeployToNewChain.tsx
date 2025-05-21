import type { NTTToken } from '@/src/api/endpoints'
import DeployButtons from '@/src/components/pageComponents/deploy/form/DeployButtons'
import PeerChainsSelector from '@/src/components/pageComponents/deploy/form/PeerChainsSelector'
import LinkExistingChains from '@/src/components/pageComponents/deployment/settings/LinkExistingChains'
import { FormWrapper } from '@/src/components/sharedComponents/form/FormWrapper'
import { TokenTitle } from '@/src/components/sharedComponents/form/TokenTitle'
import { ButtonsWrapper } from '@/src/components/sharedComponents/form/ui'
import { BackButton, NextButton } from '@/src/components/sharedComponents/ui/Buttons'
import { MainText } from '@/src/components/sharedComponents/ui/MainText'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import type { EvmChainsIds } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import { DeployProvider } from '@/src/stores/deploy/Provider'
import { getInitialState } from '@/src/stores/deploy/initialStates'
import type { DeployInfo, DeployStateType } from '@/src/stores/deploy/types'
import { type WormholeChainId, getEvmChainId } from '@/src/utils/wormholeChains'
import { ContainerPadding, InnerContainer } from '@bootnodedev/db-ui-toolkit'
import styled from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled(InnerContainer)`
  align-items: center;
  flex-direction: column;
  row-gap: calc(var(--base-gap-xl) * 3);

  ${ContainerPadding}
`

const DeployToNewChainContent = ({
  setShowAddChain,
  currentDeployedChains,
}: {
  setShowAddChain: (show: boolean) => void
  currentDeployedChains: EvmChainsIds[]
}) => {
  const { step, setStep, homeChain, deployInfo } = useDeployStore()

  const canGoToDeploy = homeChain !== undefined

  const showWarning = homeChain && deployInfo[homeChain]?.success // chain is deployed

  // check if all peer chains are linked except the home chain
  const canGoToSettings = Object.entries(deployInfo)
    .filter(([chainId]) => Number(chainId) !== homeChain)
    .every(([, info]) => info?.linked) // all peer chains are linked

  return step === 'peers' ? (
    <>
      <PeerChainsSelector
        title="Select peer chain (only one)"
        currentDeployedChains={currentDeployedChains}
        singleChain
      />
      <ButtonsWrapper>
        <BackButton
          onClick={() => {
            setShowAddChain(false)
          }}
        >
          Go Back
        </BackButton>
        <NextButton
          disabled={!canGoToDeploy}
          onClick={() => setStep('deploy')}
        >
          Next
        </NextButton>
      </ButtonsWrapper>
    </>
  ) : step === 'deploy' ? (
    <>
      <DeployButtons hideNavigationButtons />

      {showWarning && <LinkExistingChains />}

      <ButtonsWrapper>
        {showWarning ? (
          <NextButton
            disabled={!canGoToSettings}
            title={canGoToSettings ? 'Settings' : 'Link all chains to continue'}
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              localStorage.removeItem('deploy-to-new-chain')
              setShowAddChain(false)
            }}
          >
            Settings
          </NextButton>
        ) : (
          <BackButton onClick={() => setStep('peers')}>Go Back</BackButton>
        )}
      </ButtonsWrapper>
    </>
  ) : null
}

const getAddressesByChainId = (
  tokenInfo: { home: NTTToken; peers: NTTToken[] },
  chainId: EvmChainsIds,
) => {
  const data = [tokenInfo.home, ...tokenInfo.peers].find(
    ({ wormholeChainId }) => getEvmChainId(wormholeChainId) === chainId,
  )

  if (!data) {
    throw new Error('Token info not found')
  }

  return {
    tokenAddress: data.token.address as Address,
    ownerContract: data.manager.owner.address as Address,
    managerAddress: data.manager.address as Address,
  }
}

const DeployToNewChain = ({
  chain,
  address,
  setShowAddChain,
}: {
  chain: WormholeChainId
  address: string
  setShowAddChain: (show: boolean) => void
}) => {
  const { data: tokenInfo } = useTokenByChainAndAddress(chain, address)

  if (!tokenInfo) {
    throw 'No token info'
  }

  const peerChainsIds = [
    getEvmChainId(tokenInfo.home.wormholeChainId as WormholeChainId),
    ...tokenInfo.peers.map(({ wormholeChainId }) =>
      getEvmChainId(wormholeChainId as WormholeChainId),
    ),
  ]
  const filteredPeerChainsIds = peerChainsIds.filter((chainId): chainId is EvmChainsIds =>
    Boolean(chainId),
  )
  // fill initial state
  const initialState: DeployStateType = {
    ...getInitialState(),
    mode: 'addChain',
    homeChain: undefined,
    peerChains: filteredPeerChainsIds,
    tokenAddress: undefined,
    tokenName: tokenInfo.home.token.name,
    tokenSymbol: tokenInfo.home.token.symbol,
    externalSalt: tokenInfo.home.externalSalt,
    step: 'peers',
    deployInfo: filteredPeerChainsIds.reduce(
      (acc, chainId) => {
        const { tokenAddress, ownerContract, managerAddress } = getAddressesByChainId(
          tokenInfo,
          chainId,
        )
        acc[chainId] = {
          success: true,
          manager: managerAddress,
          token: tokenAddress,
          transceiver: '0x', // Transceiver is obtained directly from the manager contract
          ownerContract,
          linked: false,
        }
        return acc
      },
      {} as Record<EvmChainsIds, DeployInfo>,
    ),
  }

  return (
    <DeployProvider
      initialState={initialState}
      storeKey="deploy-to-new-chain"
    >
      <Wrapper>
        <MainText
          title={
            <>
              Deploy new chain to
              <br />
              your multichain Token
            </>
          }
        />
        <FormWrapper>
          <TokenTitle
            name={tokenInfo.home.token.name}
            symbol={tokenInfo.home.token.symbol}
          />
          <DeployToNewChainContent
            currentDeployedChains={filteredPeerChainsIds}
            setShowAddChain={setShowAddChain}
          />
        </FormWrapper>
      </Wrapper>
    </DeployProvider>
  )
}

export default DeployToNewChain
