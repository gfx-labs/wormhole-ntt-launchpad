import ChainSelectionManager from '@/src/components/pageComponents/deployment/settings/ChainSelectionManager'
import { ButtonRow } from '@/src/components/pageComponents/deployment/settings/ui'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { WalletStatusVerifier } from '@/src/components/sharedComponents/WalletStatusVerifier'
import { PauseUnpauseButton as BasePauseUnpauseButton } from '@/src/components/sharedComponents/ui/Buttons'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import {
  useSuspenseReadNttManagerIsPaused,
  useSuspenseReadNttManagerPauser,
  useWriteNttManagerPause,
  useWriteNttManagerUnpause,
  useWriteNttOwnerExecute,
} from '@/src/hooks/generated'
import { useManagerOwner } from '@/src/hooks/useManagerOwner'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import { pauseCalldata, unpauseCalldata } from '@/src/utils/executeCalldata'
import { withSuspenseAndRetry } from '@/src/utils/suspenseWrapper'
import { type WormholeChainId, getEvmChain, getEvmChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { type ComponentProps, useState } from 'react'
import styled, { css } from 'styled-components'
import { type Address, type Hash, isAddressEqual, zeroAddress } from 'viem'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: var(--base-gap);
`

const Row = styled(ButtonRow)`
  width: 100%;
`

const PauseUnpauseButton = styled(BasePauseUnpauseButton)`
  max-width: fit-content;
  padding: 0 var(--base-common-padding-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      min-width: 130px;
    `,
  )}
`

const ChainSelectorAndPause = withSuspenseAndRetry<
  ComponentProps<'div'> & {
    wormholeTokenAddress: string
    wormholeChainId: WormholeChainId
  }
>(({ wormholeChainId, wormholeTokenAddress, ...restProps }) => {
  const chainId = getEvmChainId(wormholeChainId)
  const evmChain = getEvmChain(wormholeChainId)

  if (!evmChain || !chainId) {
    throw new Error(`Chain ${wormholeChainId} not supported`)
  }

  const [txHash, setTxHash] = useState<Hash | undefined>()
  const [isWaitingSignature, setIsWaitingSignature] = useState(false)
  const { evmAddress } = useWeb3Status()
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, wormholeTokenAddress)
  const managerAddress = tokenInfo?.home.manager.address
  const managerOwnerInfo = useManagerOwner(wormholeChainId, wormholeTokenAddress)
  const { data: isPaused, refetch: refetchIsPaused } = useSuspenseReadNttManagerIsPaused({
    address: tokenInfo?.home.manager.address as Address,
    chainId,
  })
  const { data: pauser } = useSuspenseReadNttManagerPauser({
    chainId,
    address: managerAddress as Address,
  })

  const isOwnerConnected = isAddressEqual(
    evmAddress || zeroAddress,
    managerOwnerInfo.semanticalOwner as Address,
  )

  const isPauserNTTOwnerSC =
    isAddressEqual(pauser, managerOwnerInfo.nttOwnerProxyAddress as Address) &&
    isAddressEqual(evmAddress || zeroAddress, managerOwnerInfo.nttOwnerOwner as Address)

  const canPause = isOwnerConnected || isAddressEqual(pauser, evmAddress || zeroAddress)

  const { writeContractAsync: pause } = useWriteNttManagerPause()
  const { writeContractAsync: unpause } = useWriteNttManagerUnpause()
  const { writeContractAsync: execute } = useWriteNttOwnerExecute()
  const { readOnlyClient } = useWeb3Status()

  if (!readOnlyClient) {
    throw new Error('No read only client')
  }

  const unpauseHandler = async () => {
    setIsWaitingSignature(true)
    setTxHash(undefined)
    let hash: Hash

    if (!isOwnerConnected) {
      return
    }

    try {
      hash = managerOwnerInfo.isOwnedByNTTOwnerSC
        ? await execute(
            unpauseCalldata({
              managerAddress: managerAddress as Address,
              chainId,
              nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
              gas: 1000000,
            }),
          )
        : await unpause({
            address: managerAddress as Address,
            chainId,
          })

      setTxHash(hash)
      setIsWaitingSignature(false)
    } catch (error) {
      console.error('Error pausing/unpausing NTT:', error)
      setTxHash(undefined)
      setIsWaitingSignature(false)
    }
  }

  const pauseHandler = async () => {
    setIsWaitingSignature(true)
    setTxHash(undefined)
    let hash: Hash

    if (!canPause) {
      return
    }

    try {
      hash =
        (managerOwnerInfo.isOwnedByNTTOwnerSC && isOwnerConnected) || isPauserNTTOwnerSC
          ? await execute(
              pauseCalldata({
                managerAddress: managerAddress as Address,
                chainId,
                nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
                gas: 1000000,
              }),
            )
          : await pause({
              address: managerAddress as Address,
              chainId,
            })

      setTxHash(hash)
      setIsWaitingSignature(false)
    } catch (error) {
      console.error('Error pausing/unpausing NTT:', error)
      setTxHash(undefined)
      setIsWaitingSignature(false)
    }
  }

  return (
    <Wrapper {...restProps}>
      <Row>
        <ChainSelectionManager
          wormholeChainId={wormholeChainId}
          wormholeTokenAddress={wormholeTokenAddress}
        />
        <WalletStatusVerifier chainId={chainId}>
          {isPaused ? (
            <PauseUnpauseButton
              $variant="unpause"
              onClick={unpauseHandler}
              disabled={!isOwnerConnected}
            />
          ) : (
            <PauseUnpauseButton
              $variant="pause"
              onClick={pauseHandler}
              disabled={!canPause}
            />
          )}
        </WalletStatusVerifier>
      </Row>
      <NTTTransactionStatus
        chain={evmChain}
        hash={txHash}
        isWaitingSignature={isWaitingSignature}
        onError={() => {
          setTxHash(undefined)
          setIsWaitingSignature(false)
        }}
        onSuccess={refetchIsPaused}
      />
    </Wrapper>
  )
})

export default ChainSelectorAndPause
