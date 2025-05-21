import {
  ButtonRowAlt,
  InnerCard,
  SecondaryButton,
} from '@/src/components/pageComponents/deployment/settings/ui'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { WalletStatusVerifier } from '@/src/components/sharedComponents/WalletStatusVerifier'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import Textfield from '@/src/components/sharedComponents/form/Textfield'
import { InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import {
  useSuspenseReadNttManagerPauser,
  useWriteNttManagerTransferOwnership,
  useWriteNttManagerTransferPauserCapability,
  useWriteNttOwnerExecute,
  useWriteNttOwnerTransferOwnership,
} from '@/src/hooks/generated'
import { useManagerOwner } from '@/src/hooks/useManagerOwner'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import { transferPauserCapabilityCalldata } from '@/src/utils/executeCalldata'
import getZodFieldError from '@/src/utils/getZodFieldError'
import { SafeSuspense } from '@/src/utils/suspenseWrapper'
import { type WormholeChainId, getEvmChain, getEvmChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react'
import type { ComponentPropsWithoutRef, FC } from 'react'
import styled, { css } from 'styled-components'
import { type Address, type Hash, isAddress, isAddressEqual, zeroAddress } from 'viem'
import { z } from 'zod'

const Wrapper = styled(InnerCard)`
  padding: calc(var(--base-common-padding-xl) * 2) var(--base-common-padding-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

const roleFormSchema = z.object({
  address: z.string().refine(isAddress, 'Invalid address'),
})

type RoleRowProps = {
  wormholeChainId: WormholeChainId
  wormholeTokenAddress: string
  type: 'owner' | 'pauser'
  currentAddress: string
  isWaitingSignature: boolean
  onUpdateClick: (newAddress: string) => void
  disabled: boolean
  isReadOnly: boolean
}

const RoleRow: FC<RoleRowProps> = ({
  type,
  currentAddress,
  isWaitingSignature,
  onUpdateClick,
  disabled,
  isReadOnly,
  wormholeChainId,
  wormholeTokenAddress,
}) => {
  const managerOwnerInfo = useManagerOwner(wormholeChainId, wormholeTokenAddress)
  const [address, setAddress] = useState<string>('')

  const chainId = getEvmChainId(wormholeChainId)
  if (!chainId) {
    throw new Error(`Chain ID ${wormholeChainId} not found`)
  }

  // if currentAddress is the nttOwnerProxyAddress, set the address to the nttOwnerOwner
  // otherwise, set currentAddress
  useEffect(() => {
    setAddress(
      isAddressEqual(currentAddress as Address, managerOwnerInfo.nttOwnerProxyAddress as Address)
        ? (managerOwnerInfo.nttOwnerOwner as Address)
        : currentAddress,
    )
  }, [currentAddress, managerOwnerInfo.nttOwnerProxyAddress, managerOwnerInfo.nttOwnerOwner])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onUpdateClick(address)
  }

  const validationResult = roleFormSchema.safeParse({
    address,
  })

  const addressError = getZodFieldError(validationResult, 'address', !currentAddress)

  return (
    <form onSubmit={handleSubmit}>
      <FormRow
        isUpperCase={false}
        label={
          type === 'owner'
            ? managerOwnerInfo.isOwnedByNTTOwnerSC
              ? "MANAGER'S OWNER (Through NTTOwner proxy)"
              : "MANAGER'S OWNER"
            : isAddressEqual(
                  currentAddress as Address,
                  managerOwnerInfo.nttOwnerProxyAddress as Address,
                )
              ? 'PAUSER (Through NTTOwner proxy)'
              : 'PAUSER'
        }
        error={addressError}
      >
        <ButtonRowAlt>
          <Textfield
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            value={address}
            name="owner"
            type="text"
            readOnly={isReadOnly}
            error={addressError}
          />
          <WalletStatusVerifier chainId={chainId}>
            <SecondaryButton
              type="submit"
              disabled={disabled || isWaitingSignature || isReadOnly || !validationResult.success}
            >
              Update
            </SecondaryButton>
          </WalletStatusVerifier>
        </ButtonRowAlt>
      </FormRow>
    </form>
  )
}

type RoleRowsProps = {
  wormholeChainId: WormholeChainId
  wormholeTokenAddress: string
}

const RoleRows: FC<RoleRowsProps> = ({ wormholeChainId, wormholeTokenAddress }) => {
  const { evmAddress: _connectedAddress } = useWeb3Status()
  const chain = getEvmChain(wormholeChainId)
  if (!chain) {
    throw new Error(`Chain ${wormholeChainId} not found`)
  }
  const { data: tokenInfo, refetch: refetchTokenByChainAndAddress } = useTokenByChainAndAddress(
    wormholeChainId,
    wormholeTokenAddress,
  )
  const managerAddress = tokenInfo?.home.manager.address
  const managerOwnerInfo = useManagerOwner(wormholeChainId, wormholeTokenAddress)

  const [ownerTxHash, setOwnerTxHash] = useState<Hash>()
  const [pauserTxHash, setPauserTxHash] = useState<Hash>()
  const [isWaitingOwnerSignature, setIsWaitingOwnerSignature] = useState(false)
  const [isWaitingPauserSignature, setIsWaitingPauserSignature] = useState(false)

  const { data: currentPauser } = useSuspenseReadNttManagerPauser({
    address: managerAddress as Address,
    chainId: chain.id,
  })

  const { writeContractAsync: setOwner } = useWriteNttManagerTransferOwnership()
  const { writeContractAsync: setPauser } = useWriteNttManagerTransferPauserCapability()
  const { writeContractAsync: NTTProxyTransferOwner } = useWriteNttOwnerTransferOwnership()
  const { writeContractAsync: execute } = useWriteNttOwnerExecute()

  const isPauserNTTOwnerSC =
    isAddressEqual(currentPauser, managerOwnerInfo.nttOwnerProxyAddress as Address) &&
    isAddressEqual(_connectedAddress || zeroAddress, managerOwnerInfo.nttOwnerOwner as Address)

  const isOwnerConnected = isAddressEqual(
    _connectedAddress || zeroAddress,
    managerOwnerInfo.semanticalOwner as Address,
  )

  const handleSetOwner = async (inputAddress: string) => {
    try {
      setIsWaitingOwnerSignature(true)
      const hash = managerOwnerInfo.isOwnedByNTTOwnerSC
        ? await NTTProxyTransferOwner({
            args: [inputAddress as Address],
            chainId: chain.id,
            address: managerOwnerInfo.nttOwnerProxyAddress as Address,
          })
        : await setOwner({
            args: [inputAddress as Address],
            chainId: chain.id,
            address: managerAddress as Address,
          })
      setOwnerTxHash(hash)
    } catch (error) {
      console.error(error)
    } finally {
      setIsWaitingOwnerSignature(false)
    }
  }

  const handleSetPauser = async (inputAddress: string) => {
    try {
      setIsWaitingPauserSignature(true)
      const hash =
        (managerOwnerInfo.isOwnedByNTTOwnerSC && isOwnerConnected) || isPauserNTTOwnerSC
          ? await execute(
              transferPauserCapabilityCalldata({
                chainId: chain.id,
                managerAddress: managerAddress as Address,
                newPauser: inputAddress as Address,
                nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
              }),
            )
          : await setPauser({
              args: [inputAddress as Address],
              chainId: chain.id,
              address: managerAddress as Address,
            })
      setPauserTxHash(hash)
    } catch (error) {
      console.error(error)
    } finally {
      setIsWaitingPauserSignature(false)
    }
  }

  return (
    <>
      <RoleRow
        wormholeChainId={wormholeChainId}
        wormholeTokenAddress={wormholeTokenAddress}
        type="owner"
        currentAddress={managerOwnerInfo.semanticalOwner}
        onUpdateClick={handleSetOwner}
        isWaitingSignature={isWaitingOwnerSignature}
        disabled={ownerTxHash !== undefined}
        isReadOnly={!managerOwnerInfo.isOwner}
      />
      <NTTTransactionStatus
        chain={chain}
        hash={ownerTxHash}
        isWaitingSignature={isWaitingOwnerSignature}
        onSuccess={() => {
          refetchTokenByChainAndAddress()
        }}
        onError={() => {
          setOwnerTxHash(undefined)
          setIsWaitingOwnerSignature(false)
        }}
      />
      <RoleRow
        wormholeChainId={wormholeChainId}
        wormholeTokenAddress={wormholeTokenAddress}
        type="pauser"
        currentAddress={currentPauser}
        onUpdateClick={handleSetPauser}
        isWaitingSignature={isWaitingPauserSignature}
        disabled={pauserTxHash !== undefined}
        isReadOnly={
          !managerOwnerInfo.isOwner &&
          !isAddressEqual(currentPauser as Address, _connectedAddress || zeroAddress)
        }
      />

      <NTTTransactionStatus
        chain={chain}
        hash={pauserTxHash}
        isWaitingSignature={isWaitingPauserSignature}
        onSuccess={() => {
          refetchTokenByChainAndAddress()
        }}
        onError={() => {
          setPauserTxHash(undefined)
          setIsWaitingPauserSignature(false)
        }}
      />
    </>
  )
}

const RoleManagement: FC<
  ComponentPropsWithoutRef<'div'> & {
    wormholeChain: WormholeChainId
    wormholeTokenAddress: string
  }
> = ({ wormholeChain, wormholeTokenAddress, ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <InnerCardTitle>Role management</InnerCardTitle>
      <SafeSuspense>
        <RoleRows
          wormholeChainId={wormholeChain}
          wormholeTokenAddress={wormholeTokenAddress}
        />
      </SafeSuspense>
    </Wrapper>
  )
}

export default RoleManagement
