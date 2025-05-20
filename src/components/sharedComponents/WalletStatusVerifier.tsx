import type { ComponentType, FC, ReactElement } from 'react'

import { PrimaryInvertedButtonSmall } from '@/src/components/sharedComponents/ui/Buttons'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { Chain } from 'viem'
import { type AllChainsIds, allChains } from '../../lib/networks.config'
import { ConnectWalletButton } from './ConnectButtonWrapper'

interface WalletStatusVerifierProps {
  chainId?: AllChainsIds
  children?: ReactElement
  fallback?: ReactElement
  labelSwitchChain?: string
}

/**
 * WalletStatusVerifier Component
 *
 * This component checks the wallet connection and chain synchronization status.
 * If the wallet is not connected, it displays a fallback component (default: ConnectWalletButton)
 * If the wallet is connected but not synced with the correct chain, it provides an option to switch chain.
 *
 * @param {Object} props - WalletStatusVerifier component props
 * @param {Chain['id']} [props.chainId] - The chain ID to check for synchronization
 * @param {ReactElement} [props.fallback] - The fallback component to render if the wallet is not connected
 * @param {ReactElement} props.children - The children components to render if the wallet is connected and synced
 *
 * @example
 * ```tsx
 * <WalletStatusVerifier>
 *  <AComponentThatRequiresAConnectedWallet />
 * </WalletStatusVerifier>
 * ```
 */
const WalletStatusVerifier: FC<WalletStatusVerifierProps> = ({
  chainId,
  children,
  fallback = <ConnectWalletButton label="Connect wallet" />,
  labelSwitchChain = 'Switch to',
}) => {
  const { appChainId, isWalletConnected, isWalletSynced, switchNetwork, walletChainId } =
    useWeb3Status()

  const targetId = chainId || appChainId || allChains[0].id
  const chainToSwitch = allChains.find((chain) => chain.id === targetId) || allChains[0]

  if (!isWalletConnected) {
    return fallback
  }

  if (!isWalletSynced || walletChainId !== chainToSwitch.id) {
    return (
      <PrimaryInvertedButtonSmall onClick={() => switchNetwork(chainToSwitch as Chain)}>
        {' '}
        {labelSwitchChain} {chainToSwitch?.name}
      </PrimaryInvertedButtonSmall>
    )
  }

  return children
}

/**
 * WalletStatusVerifier HOC
 *
 *
 * @param {Object} props - HOC props
 * @param {Chain['id']} [props.chainId] - The chain ID to check for synchronization
 * @param {ReactElement} [props.fallback] - The fallback component to render if the wallet is not connected
 * @param {ReactElement} WrappedComponent - The component to render if the wallet is connected and synced
 * @example
 * const ComponentWithConection = withWalletStatusVerifier(MyComponent);
 * @returns {FC} The WalletStatusVerifier HOC
 */
const withWalletStatusVerifier = <P extends object>(
  WrappedComponent: ComponentType<P>,
  {
    chainId,
    fallback = <ConnectWalletButton label="Connect" />,
    labelSwitchChain = 'Switch to',
  }: WalletStatusVerifierProps = {},
): FC<P> => {
  const ComponentWithVerifier: FC<P> = (props: P) => {
    const { appChainId, isWalletConnected, isWalletSynced, switchNetwork, walletChainId } =
      useWeb3Status()

    const targetId = chainId ?? appChainId ?? allChains[0].id
    const chainToSwitch = allChains.find((chain) => chain.id === targetId) ?? allChains[0]

    return !isWalletConnected ? (
      fallback
    ) : !isWalletSynced || walletChainId !== chainToSwitch.id ? (
      <PrimaryInvertedButtonSmall onClick={() => switchNetwork(chainToSwitch as Chain)}>
        {labelSwitchChain} {chainToSwitch?.name}
      </PrimaryInvertedButtonSmall>
    ) : (
      <WrappedComponent {...props} />
    )
  }

  ComponentWithVerifier.displayName = `withWalletStatusVerifier(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`

  return ComponentWithVerifier
}

// eslint-disable-next-line react-refresh/only-export-components
export { WalletStatusVerifier, withWalletStatusVerifier }
