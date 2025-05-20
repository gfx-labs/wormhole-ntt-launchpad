import BackButton from '@/src/components/pageComponents/deploy/form/BackButton'
import { getDeployNttOutputs } from '@/src/components/pageComponents/deploy/utils/getDeployNttOutputs'
import BaseAddTokenButton from '@/src/components/sharedComponents/AddTokenButton'
import { ExplorerLink } from '@/src/components/sharedComponents/ExplorerLink'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { WalletStatusVerifier } from '@/src/components/sharedComponents/WalletStatusVerifier'
import { ChainItem } from '@/src/components/sharedComponents/form/ChainItem'
import { ButtonsWrapper } from '@/src/components/sharedComponents/form/ui'
import { InnerCard, InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { NextButton } from '@/src/components/sharedComponents/ui/Buttons'
import { PrimaryButtonSmall } from '@/src/components/sharedComponents/ui/Buttons'
import { getNetworkIcon, getNetworkType } from '@/src/constants/networks'
import { useDeployNTT } from '@/src/hooks/useDeployNTT'
import { useTokenInfo } from '@/src/hooks/useTokenInfo'
import type { AllChainsIds, EvmChainsIds } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import { formatWormholeAddress } from '@/src/utils/address'
import { getPublicClient } from '@/src/utils/publicClients'
import { getWormholeChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { Chain } from '@reown/appkit/networks'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import styled, { css } from 'styled-components'
import type { DeployInfo } from '../../../../stores/deploy/types'
import { getAnyChainById } from '../../../../utils/getChainById'
const ChainsWrapper = styled(InnerCard)`
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

const Next = styled(NextButton)`
  margin-left: auto;
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

const AddTokenButton = styled(BaseAddTokenButton)`
  ${ButtonCSS}
`

export const SuccessIcon = () => (
  <svg
    width="18"
    height="13"
    viewBox="0 0 18 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5715 2.10261L7.07153 12.6026C6.98008 12.6944 6.87141 12.7672 6.75176 12.8169C6.63211 12.8666 6.50382 12.8921 6.37427 12.8921C6.24471 12.8921 6.11643 12.8666 5.99677 12.8169C5.87712 12.7672 5.76845 12.6944 5.677 12.6026L1.08325 8.00886C0.991684 7.91729 0.91905 7.80859 0.869495 7.68895C0.819939 7.56931 0.794434 7.44109 0.794434 7.31159C0.794434 7.1821 0.819939 7.05387 0.869495 6.93423C0.91905 6.8146 0.991684 6.70589 1.08325 6.61433C1.17482 6.52276 1.28352 6.45013 1.40316 6.40057C1.5228 6.35101 1.65102 6.32551 1.78052 6.32551C1.91001 6.32551 2.03824 6.35101 2.15787 6.40057C2.27751 6.45013 2.38622 6.52276 2.47778 6.61433L6.37509 10.5116L16.1786 0.709715C16.3636 0.524789 16.6144 0.420898 16.8759 0.420898C17.1374 0.420898 17.3882 0.524789 17.5732 0.709715C17.7581 0.894642 17.862 1.14546 17.862 1.40698C17.862 1.66851 17.7581 1.91932 17.5732 2.10425L17.5715 2.10261Z"
      fill="#7AE28D"
    />
  </svg>
)

export const ExternalLink = () => (
  <svg
    width="13"
    height="14"
    viewBox="0 0 13 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.75 5.5C12.75 5.69891 12.671 5.88968 12.5303 6.03033C12.3897 6.17098 12.1989 6.25 12 6.25C11.8011 6.25 11.6103 6.17098 11.4697 6.03033C11.329 5.88968 11.25 5.69891 11.25 5.5V3.3125L7.53063 7.03187C7.38973 7.17277 7.19863 7.25193 6.99938 7.25193C6.80012 7.25193 6.60902 7.17277 6.46812 7.03187C6.32723 6.89098 6.24807 6.69988 6.24807 6.50063C6.24807 6.30137 6.32723 6.11027 6.46812 5.96938L10.1875 2.25H8C7.80109 2.25 7.61032 2.17098 7.46967 2.03033C7.32902 1.88968 7.25 1.69891 7.25 1.5C7.25 1.30109 7.32902 1.11032 7.46967 0.96967C7.61032 0.829018 7.80109 0.75 8 0.75H12C12.1989 0.75 12.3897 0.829018 12.5303 0.96967C12.671 1.11032 12.75 1.30109 12.75 1.5V5.5ZM10 7C9.80109 7 9.61032 7.07902 9.46967 7.21967C9.32902 7.36032 9.25 7.55109 9.25 7.75V11.75H1.75V4.25H5.75C5.94891 4.25 6.13968 4.17098 6.28033 4.03033C6.42098 3.88968 6.5 3.69891 6.5 3.5C6.5 3.30109 6.42098 3.11032 6.28033 2.96967C6.13968 2.82902 5.94891 2.75 5.75 2.75H1.5C1.16848 2.75 0.850537 2.8817 0.616117 3.11612C0.381696 3.35054 0.25 3.66848 0.25 4V12C0.25 12.3315 0.381696 12.6495 0.616117 12.8839C0.850537 13.1183 1.16848 13.25 1.5 13.25H9.5C9.83152 13.25 10.1495 13.1183 10.3839 12.8839C10.6183 12.6495 10.75 12.3315 10.75 12V7.75C10.75 7.55109 10.671 7.36032 10.5303 7.21967C10.3897 7.07902 10.1989 7 10 7Z"
      fill="#C1BBF6"
    />
  </svg>
)

const WalletIcon = () => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7499 7.5C10.7499 7.69778 10.6912 7.89112 10.5813 8.05557C10.4714 8.22002 10.3153 8.34819 10.1325 8.42388C9.94981 8.49957 9.74874 8.51937 9.55476 8.48079C9.36078 8.4422 9.1826 8.34696 9.04274 8.20711C8.90289 8.06725 8.80765 7.88907 8.76906 7.69509C8.73048 7.50111 8.75028 7.30004 8.82597 7.11732C8.90166 6.93459 9.02983 6.77841 9.19428 6.66853C9.35873 6.55865 9.55207 6.5 9.74985 6.5C10.0151 6.5 10.2694 6.60536 10.457 6.79289C10.6445 6.98043 10.7499 7.23478 10.7499 7.5ZM13.2499 5.25V10.25C13.2499 10.7804 13.0391 11.2891 12.6641 11.6642C12.289 12.0393 11.7803 12.25 11.2499 12.25H2.24985C1.71942 12.25 1.21071 12.0393 0.835637 11.6642C0.460564 11.2891 0.24985 10.7804 0.24985 10.25V2.8075C0.242158 2.54006 0.288205 2.27379 0.385265 2.02446C0.482325 1.77514 0.628424 1.54782 0.814913 1.35597C1.0014 1.16412 1.22449 1.01164 1.47097 0.907549C1.71744 0.803463 1.9823 0.74989 2.24985 0.75H10.4999C10.6988 0.75 10.8895 0.829018 11.0302 0.96967C11.1708 1.11032 11.2499 1.30109 11.2499 1.5C11.2499 1.69891 11.1708 1.88968 11.0302 2.03033C10.8895 2.17098 10.6988 2.25 10.4999 2.25H2.24985C2.1828 2.24996 2.11643 2.26342 2.05468 2.28955C1.99293 2.31569 1.93707 2.35398 1.89043 2.40214C1.84378 2.45031 1.80729 2.50736 1.78314 2.56991C1.75899 2.63247 1.74767 2.69923 1.74985 2.76625V2.77125C1.76035 2.90364 1.82111 3.02699 1.91966 3.11601C2.01821 3.20503 2.14708 3.25297 2.27985 3.25H11.2499C11.7803 3.25 12.289 3.46071 12.6641 3.83579C13.0391 4.21086 13.2499 4.71957 13.2499 5.25ZM11.7499 5.25C11.7499 5.11739 11.6972 4.99021 11.6034 4.89645C11.5096 4.80268 11.3825 4.75 11.2499 4.75H2.27985C2.10104 4.75008 1.92294 4.72739 1.74985 4.6825V10.25C1.74985 10.3826 1.80253 10.5098 1.8963 10.6036C1.99007 10.6973 2.11724 10.75 2.24985 10.75H11.2499C11.3825 10.75 11.5096 10.6973 11.6034 10.6036C11.6972 10.5098 11.7499 10.3826 11.7499 10.25V5.25Z"
      fill="currentColor"
    />
  </svg>
)

const DeployButton = ({
  chainId,
  externalSalt,
}: {
  chainId: AllChainsIds
  externalSalt: string
}) => {
  const [isDeploying, setIsDeploying] = useState(false)
  const [isWaitingForSignature, setIsWaitingForSignature] = useState(false)

  const {
    homeChain,
    setDeployInfo,
    deployInfo,
    tokenAddress,
    tokenName,
    tokenSymbol,
    tokenSupply,
    peerChains,
    formType,
  } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const isEvmChain = getNetworkType(chainId) === 'EVM'

  const EvmPeerChains = peerChains.filter(
    (chain): chain is EvmChainsIds => getNetworkType(chain) === 'EVM',
  )
  const deployNTT = useDeployNTT({
    chainId: chainId as EvmChainsIds,
    homeChainId: homeChain as EvmChainsIds,
    externalSalt: externalSalt,
    tokenAddress,
  })

  const { data: tokenInfo } = useTokenInfo({
    chainId: homeChain,
    address: tokenAddress,
  })

  const handleDeploy = async () => {
    if (isEvmChain) {
      try {
        setIsDeploying(true)
        setIsWaitingForSignature(true)
        const hash = await deployNTT({
          formType,
          homeChain: homeChain as EvmChainsIds,
          tokenAddress,
          tokenName,
          tokenSymbol,
          tokenSupply,
          peerChains: EvmPeerChains,
        })
        if (!hash) {
          throw new Error('Failed to deploy NTT')
        }

        setDeployInfo(chainId as EvmChainsIds, {
          ...chainDeployInfo,
          txHash: hash, // save txHash to the store
        })

        setIsWaitingForSignature(false)
        const txReceipt = await getPublicClient(chainId as EvmChainsIds).waitForTransactionReceipt({
          hash,
        })
        const {
          manager,
          token,
          transceiver,
          ownerContract: nttOwner,
        } = getDeployNttOutputs(txReceipt)

        setDeployInfo(chainId as EvmChainsIds, {
          success: true,
          manager,
          token,
          transceiver,
          ownerContract: nttOwner,
          txHash: hash,
        })
        setIsDeploying(false)
      } catch (error) {
        setIsDeploying(false)
        setIsWaitingForSignature(false)
        console.error(error)
      }
    } else {
      console.log('Solana deployment not yet supported')
    }
  }

  const chainDeployInfo = deployInfo[chainId] as DeployInfo
  const homeChainDeployInfo = deployInfo[homeChain] as DeployInfo

  const icon = getNetworkIcon(chainId)
  const chain = getAnyChainById(chainId)

  const isHomeChain = chainId === homeChain
  const isHomeChainDeployed = homeChainDeployInfo?.success
  const isPeerChainDeployed = chainDeployInfo?.success

  const shouldShowDeployButton =
    (isHomeChain && !isHomeChainDeployed) ||
    (!isHomeChain && isHomeChainDeployed && !isPeerChainDeployed)

  const shouldShowExplorerLink = isPeerChainDeployed || (isHomeChain && isHomeChainDeployed)

  return (
    <Item
      $done={shouldShowExplorerLink}
      $isActive={shouldShowDeployButton}
      disabled={!shouldShowDeployButton && !shouldShowExplorerLink}
      icon={icon}
      name={chain.name}
    >
      <ChildrenWrapper>
        {shouldShowDeployButton && (
          <>
            <NTTTransactionStatus
              chain={chain as Chain}
              hash={chainDeployInfo?.txHash}
              isWaitingSignature={isWaitingForSignature}
              onError={() => null}
            />

            <WalletStatusVerifier chainId={chainId}>
              <PrimaryButtonSmall
                disabled={isDeploying || !isEvmChain}
                onClick={handleDeploy}
              >
                {!isEvmChain ? 'Coming Soon' : isDeploying ? 'Deploying' : 'Deploy'}
              </PrimaryButtonSmall>
            </WalletStatusVerifier>
          </>
        )}
        {shouldShowExplorerLink && chainDeployInfo?.txHash && (
          <>
            <MessageWrapper>
              <SuccessIcon />
              <Message>Deployed successfully</Message>
            </MessageWrapper>
            <ExplorerButton
              chain={getAnyChainById(chainId)}
              hashOrAddress={chainDeployInfo?.txHash}
              text={
                <>
                  Explorer <ExternalLink />
                </>
              }
            />
          </>
        )}
        {chainDeployInfo?.token && (
          <AddTokenButton
            tokenAddress={
              isHomeChain ? tokenAddress || chainDeployInfo.token : chainDeployInfo.token
            }
            tokenSymbol={tokenInfo?.symbol || tokenSymbol || ''}
            chainId={chainId}
          >
            Add <WalletIcon />
          </AddTokenButton>
        )}
      </ChildrenWrapper>
    </Item>
  )
}

const DeployButtons = ({
  hideNavigationButtons,
}: {
  hideNavigationButtons?: boolean
}) => {
  const { peerChains, homeChain, deployInfo, externalSalt, mode } = useDeployStore()
  const navigate = useNavigate()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const allChains = [homeChain, ...peerChains]

  const chainDeployInfo = deployInfo[homeChain] as DeployInfo

  const wormholeChainId = getWormholeChainId(homeChain)

  const canGoToDashboard = allChains.every((chainId) => deployInfo?.[chainId]?.success)

  // Filter out chains that are already deployed (addChain mode)
  const filteredChains = mode === 'addChain' ? [homeChain] : allChains

  return (
    <>
      <ChainsWrapper>
        <InnerCardTitle>Deploy chains</InnerCardTitle>
        <Items>
          {filteredChains.map((chain) => (
            <DeployButton
              key={chain}
              chainId={chain}
              externalSalt={externalSalt}
            />
          ))}
        </Items>
      </ChainsWrapper>
      {!hideNavigationButtons && (
        <ButtonsWrapper>
          <BackButton />
          <Next
            onClick={() => {
              localStorage.removeItem('deploy-store')

              navigate({
                to: `/deployment/${wormholeChainId}/${formatWormholeAddress(
                  chainDeployInfo.token,
                ).slice(2)}`,
                state: {
                  referer: 'deploy',
                },
              })
            }}
            disabled={!canGoToDashboard}
          >
            Dashboard
          </Next>
        </ButtonsWrapper>
      )}
    </>
  )
}

export default DeployButtons
