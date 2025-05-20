import ConnectButton from '@/src/components/pageComponents/deployment/settings/ConnectButton'
import DeployToNewChain from '@/src/components/pageComponents/deployment/settings/DeployToNewChain'
import PeerChainsLimits from '@/src/components/pageComponents/deployment/settings/PeerChainsLimits'
import ChainSelectorAndPause from '@/src/components/pageComponents/deployment/settings/PeerSelectorAndPause'
import RoleManagement from '@/src/components/pageComponents/deployment/settings/RoleManagement'
import SecurityThreshold from '@/src/components/pageComponents/deployment/settings/SecurityThreshold'
import Title from '@/src/components/pageComponents/deployment/settings/Title'
import TokenInfo from '@/src/components/pageComponents/deployment/settings/TokenInfo'
import { FormWrapper } from '@/src/components/sharedComponents/form/FormWrapper'
import { InnerCardOpaque as BaseInnerCardOpaque } from '@/src/components/sharedComponents/form/ui'
import { MainText } from '@/src/components/sharedComponents/ui/MainText'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { DeployStateType } from '@/src/stores/deploy/types'
import { SafeSuspense } from '@/src/utils/suspenseWrapper'
import type { WormholeChainId } from '@/src/utils/wormholeChains'
import { ContainerPadding, InnerContainer, breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import type { Address } from 'viem'

const Wrapper = styled(InnerContainer)`
  align-items: center;
  flex-direction: column;
  row-gap: calc(var(--base-gap-xl) * 4);

  ${ContainerPadding}
`

const InnerCardOpaque = styled(BaseInnerCardOpaque)`
  padding: calc(var(--base-common-padding) * 3) var(--base-common-padding);
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding-xl) * 2);
    `,
  )}
`
const SettingsPage = ({
  wormholeAddress,
  wormholeChainId,
  ...restProps
}: {
  wormholeAddress: string
  wormholeChainId: WormholeChainId
}) => {
  const { isWalletConnected } = useWeb3Status()
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, wormholeAddress)
  const persistedStore = JSON.parse(localStorage.getItem('deploy-to-new-chain') || '{}')
    ?.state as DeployStateType

  const hasDeployInfo = Object.values(persistedStore?.deployInfo ?? {}).some(
    (info) => info?.txHash && info.txHash !== '0x',
  )
  const [showAddChain, setShowAddChain] = useState(hasDeployInfo)

  return (
    <Wrapper {...restProps}>
      {showAddChain ? (
        <DeployToNewChain
          chain={wormholeChainId}
          address={wormholeAddress}
          setShowAddChain={setShowAddChain}
        />
      ) : (
        <div key={wormholeChainId}>
          <MainText
            title={
              <>
                Manage your
                <br />
                multichain Token
              </>
            }
            text={
              <>
                Configure outbound and inbound limits, role <br />
                management, and security settings.
              </>
            }
          />
          <FormWrapper>
            <Title
              address={wormholeAddress}
              chain={wormholeChainId}
              setShowAddChain={setShowAddChain}
              token={tokenInfo?.home}
            />
            {/* {isWalletConnected && <Warning />} */}
            <InnerCardOpaque>
              <SafeSuspense>
                <ChainSelectorAndPause
                  wormholeTokenAddress={wormholeAddress}
                  wormholeChainId={wormholeChainId}
                />
              </SafeSuspense>
              <TokenInfo
                wormholeTokenAddress={wormholeAddress}
                managerAddress={tokenInfo.home.manager.address}
                wormholeChainId={wormholeChainId}
              />
            </InnerCardOpaque>
            {isWalletConnected && (
              <RoleManagement
                /* nttOwnerAddress={tokenInfo.home.manager.owner.nttOwner}
                nttOwnerOwnerAddress={tokenInfo.home.manager.owner.address}
                managerAddress={tokenInfo.home.manager.address} */
                wormholeTokenAddress={wormholeAddress}
                wormholeChain={wormholeChainId}
              />
            )}
            {isWalletConnected && tokenInfo.home.manager.address && (
              <SafeSuspense>
                <SecurityThreshold
                  managerAddress={tokenInfo.home.manager.address as Address}
                  wormholeChainId={wormholeChainId}
                  wormholeAddress={wormholeAddress}
                />
              </SafeSuspense>
            )}
            {isWalletConnected && (
              <PeerChainsLimits
                wormholeTokenAddress={wormholeAddress}
                wormholeChainId={wormholeChainId}
              />
            )}
            {!isWalletConnected && <ConnectButton />}
          </FormWrapper>
        </div>
      )}
    </Wrapper>
  )
}

export default SettingsPage
