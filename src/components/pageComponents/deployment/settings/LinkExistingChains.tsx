import type { AllChainsIds, EvmChainsIds } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'

import { SuccessIcon } from '@/src/components/pageComponents/deploy/form/DeployButtons'
import { ExplorerLink } from '@/src/components/sharedComponents/ExplorerLink'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { WalletStatusVerifier } from '@/src/components/sharedComponents/WalletStatusVerifier'
import { ChainItem } from '@/src/components/sharedComponents/form/ChainItem'
import { InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { PrimaryButtonSmall } from '@/src/components/sharedComponents/ui/Buttons'
//import { MAX_LIMIT_SCALED_EVM } from '@/src/constants/common'
import { getNetworkIcon, getNetworkType } from '@/src/constants/networks'
import { useReadNttManagerGetTransceivers, useWriteNttOwnerSetPeers } from '@/src/hooks/generated'
import { getAnyChainById } from '@/src/utils/getChainById'
import { getWHPeerLimit } from '@/src/utils/getWHPeerLimit'
import { getPublicClient } from '@/src/utils/publicClients'
import { getWormholeChainId } from '@/src/utils/wormholeChains'
import { ExternalLink, breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import type { Hash } from 'viem'
import type { DeployInfo } from '../../../../stores/deploy/types'

const Item = styled(ChainItem)<{ $done?: boolean }>`
  ${({ $done }) =>
    $done &&
    css`
      &,
      &:active,
      &:hover {
        border: solid 1px rgb(255 255 255 / 12%);
        cursor: default;
        opacity: 1;
      }
    `}
`

const ChildrenWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--base-gap);
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  &:empty {
    display: none;
  }

  > button,
  > a {
    width: 100%;
  }

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      flex-direction: row;
      margin-right: 0;
      width: auto;

      > button,
      > a {
        width: auto;
      }
    `,
  )}
`

const MessageWrapper = styled.div`
  align-items: center;
  background-color: rgb(255 255 255 / 7%);
  border-radius: 60px;
  border: solid 0.8px rgb(255 255 255 / 12%);
  column-gap: var(--base-gap);
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 37px;
  padding: var(--base-common-padding)
    calc(var(--base-common-padding-xl) + var(--base-common-padding-sm));
  width: 100%;

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      width: auto;
    `,
  )}
`

const Message = styled.span`
  color: var(--theme-text-color);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.2;
`

const ButtonCSS = css`
  align-items: center;
  background-color: transparent;
  border: solid 0.8px rgb(255 255 255 / 12%);
  border-radius: calc(var(--base-border-radius) + var(--base-border-radius-sm));
  color: var(--theme-color-primary);
  column-gap: var(--base-gap);
  display: flex;
  font-family: var(--base-font-family-button);
  font-size: 0.9rem;
  font-weight: 500;
  height: 37px;
  justify-content: center;
  padding: 0 var(--base-common-padding-xl);
  text-decoration: none;
  text-transform: uppercase;
  transition: border-color var(--base-transition-duration);

  &:active {
    opacity: 0.8;
  }

  &:hover {
    background-color: transparent;
    border-color: rgba(193 187 246 / 40%);
    color: var(--theme-color-primary);
  }
`

const ExplorerButton = styled(ExplorerLink)`
  ${ButtonCSS}
`

const LinkButton = ({ chainId }: { chainId: AllChainsIds }) => {
  const [isLinking, setIsLinking] = useState(false)
  const [txHash, setTxHash] = useState<Hash | undefined>()
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false)

  const { writeContractAsync: setPeers } = useWriteNttOwnerSetPeers()

  const { homeChain, setDeployInfo, deployInfo } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }
  const isEvmChain = getNetworkType(chainId) === 'EVM'

  const chainDeployInfo = deployInfo[chainId] as DeployInfo

  const evmTransceiversQuery = useReadNttManagerGetTransceivers({
    address: chainDeployInfo.manager,
    chainId: isEvmChain ? (chainId as number) : undefined,
    query: {
      enabled: !!chainDeployInfo.manager,
      retry: true,
    },
  })

  const solanaTransceiversQuery = undefined // TODO: implement solana transceivers query

  const transceivers = isEvmChain ? evmTransceiversQuery.data : solanaTransceiversQuery

  if (!chainDeployInfo.success) {
    throw new Error('Chain is not deployed')
  }

  const handleLink = async () => {
    if (!transceivers?.length || !isEvmChain) {
      throw new Error(`No transceivers: ${chainId}`)
    }

    try {
      setIsLinking(true)
      setIsWaitingForSignature(true)

      const hash = await setPeers({
        address: chainDeployInfo.ownerContract,
        args: [
          chainDeployInfo.manager,
          transceivers[0],
          [
            {
              peerChainId: getWormholeChainId(homeChain),
              decimals: 18, // TODO: do not use hardcoded decimals
              inboundLimit: getWHPeerLimit(18),
            },
          ],
        ],
      })

      if (!hash) {
        throw new Error('Failed to link NTT')
      }

      setTxHash(hash)
      setIsWaitingForSignature(false)

      await getPublicClient(chainId as EvmChainsIds).waitForTransactionReceipt({
        hash,
      })

      setDeployInfo(chainId, {
        ...chainDeployInfo,
        linked: true,
      })
      setIsLinking(false)
    } catch (error) {
      setIsLinking(false)
      setIsWaitingForSignature(false)
      console.error(error)
    }
  }

  const chain = getAnyChainById(chainId)

  const isLinked = chainDeployInfo.linked
  const shouldShowLinkButton = !isLinked
  const shouldShowExplorerLink = isLinked && txHash

  return (
    <Item
      $done={isLinked}
      $isActive
      icon={getNetworkIcon(chainId)}
      name={chain.name}
    >
      <ChildrenWrapper>
        {shouldShowLinkButton && (
          <>
            <NTTTransactionStatus
              chain={chain}
              hash={txHash}
              isWaitingSignature={isWaitingForSignature}
              onError={() => null}
            />
            <WalletStatusVerifier chainId={chainId}>
              <PrimaryButtonSmall
                disabled={isLinking}
                onClick={handleLink}
              >
                {isLinking ? 'Linking' : 'Link'}
              </PrimaryButtonSmall>
            </WalletStatusVerifier>
          </>
        )}
        {shouldShowExplorerLink && txHash && (
          <>
            <MessageWrapper>
              <SuccessIcon />
              <Message>Linked successfully</Message>
            </MessageWrapper>
            <ExplorerButton
              chain={getAnyChainById(chainId)}
              hashOrAddress={txHash}
              text={
                <>
                  Explorer <ExternalLink />
                </>
              }
            />
          </>
        )}
      </ChildrenWrapper>
    </Item>
  )
}

const LinkExistingChains = () => {
  const { peerChains, homeChain } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  return (
    <>
      <p>
        You have deployed your token to {getAnyChainById(homeChain).name} chain with its
        corresponding peers: {peerChains.map((chainId) => getAnyChainById(chainId).name).join(', ')}
        , but it is not yet linked as a peer on the other chains. Please link it to ensure proper
        functionality.
      </p>
      <InnerCardTitle>Link peer chain</InnerCardTitle>
      {peerChains.map((chainId) => (
        <LinkButton
          key={chainId}
          chainId={chainId}
        />
      ))}
    </>
  )
}

export default LinkExistingChains
