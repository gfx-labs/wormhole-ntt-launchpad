import {
  ButtonRow,
  InnerCard,
  SecondaryButton,
} from '@/src/components/pageComponents/deployment/settings/ui'
import HashComponent from '@/src/components/sharedComponents/Hash'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import Textfield from '@/src/components/sharedComponents/form/Textfield'
import { InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { useWriteNttManagerSetThreshold, useWriteNttOwnerExecute } from '@/src/hooks/generated'
import useGetTransceiversAndThreshold from '@/src/hooks/useGetTransceiversAndThreshold'
import { useManagerOwner } from '@/src/hooks/useManagerOwner'
import { setThresholdCalldata } from '@/src/utils/executeCalldata'
import { getExplorerLink } from '@/src/utils/getExplorerLink'
import getZodFieldError from '@/src/utils/getZodFieldError'
import onCopyToast from '@/src/utils/onCopyToast'
import { type WormholeChainId, getEvmChain, getEvmChainId } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { type ComponentPropsWithoutRef, type FC, type FormEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import type { Address, Hash } from 'viem'
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

const ButtonRowNoWrap = styled(ButtonRow)`
  flex-wrap: nowrap;
`

const ButtonWrapper = styled.div`
  align-items: center;
  column-gap: var(--base-gap-xl);
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      display: flex;
    `,
  )}
`

const OfMany = styled.div`
  color: var(--theme-text-color-light);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  white-space: nowrap;
`

const Transceivers = styled.div`
  --transceiver-border-style: solid 1px rgb(255 255 255 / 15%);

  border-top: var(--transceiver-border-style);
`

const Transceiver = styled.div`
  align-items: center;
  border-bottom: var(--transceiver-border-style);
  color: var(--theme-text-color-light);
  column-gap: calc(var(--base-gap) * 8);
  display: grid;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.5;
  padding: var(--base-common-padding);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      grid-template-columns: minmax(80px, 0.25fr) 1fr;
    `,
  )}
`

const Name = styled.span`
  min-width: 0;
  white-space: nowrap;
`

const SecurityThreshold: FC<
  ComponentPropsWithoutRef<'div'> & {
    managerAddress: Address
    wormholeChainId: WormholeChainId
    wormholeAddress: string
  }
> = ({ managerAddress, wormholeChainId, wormholeAddress, ...restProps }) => {
  const chainId = getEvmChainId(wormholeChainId)
  const evmChain = getEvmChain(wormholeChainId)

  if (!evmChain || !chainId) {
    throw new Error(`Chain not found for wormhole chain id: ${wormholeChainId}`)
  }
  const { threshold, transceivers } = useGetTransceiversAndThreshold({
    chainId: chainId,
    managerAddress,
  })

  const thresholdSchema = z.object({
    value: z
      .number()
      .min(1)
      .refine((value) => value <= transceivers.length, {
        message: 'Threshold must be less than or equal to the number of transceivers',
      }),
  })

  const [thresholdValue, setThresholdValue] = useState(threshold)
  const [isWaitingThresholdSignature, setIsWaitingThresholdSignature] = useState(false)
  const [thresholdTxHash, setThresholdTxHash] = useState<Hash>()
  const [isWaitingForTx, setIsWaitingForTx] = useState(false)

  const chain = getEvmChain(wormholeChainId)
  if (!chain) {
    throw new Error(`Chain not found for wormhole chain id: ${wormholeChainId}`)
  }
  const { writeContractAsync: execute } = useWriteNttOwnerExecute()
  const { writeContractAsync: setThreshold } = useWriteNttManagerSetThreshold()

  const validationResult = thresholdSchema.safeParse({ value: thresholdValue })
  const thresholdError = getZodFieldError(validationResult, 'value', !thresholdValue)
  const managerOwnerInfo = useManagerOwner(wormholeChainId, wormholeAddress)

  const handleSetThreshold = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsWaitingThresholdSignature(true)
      setIsWaitingForTx(true)
      const hash = managerOwnerInfo.isOwnedByNTTOwnerSC
        ? await execute(
            setThresholdCalldata({
              chainId: chain.id,
              managerAddress: managerAddress as Address,
              newThreshold: thresholdValue,
              nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
            }),
          )
        : await setThreshold({
            args: [thresholdValue],
            chainId: chain.id,
            address: managerAddress as Address,
          })
      setThresholdTxHash(hash)
    } catch (error) {
      console.error(error)
      setIsWaitingForTx(false)
    } finally {
      setIsWaitingThresholdSignature(false)
    }
  }

  return (
    <Wrapper {...restProps}>
      <InnerCardTitle>Security Threshold</InnerCardTitle>
      <FormRow label="Registered Transceivers">
        <Transceivers>
          {transceivers.map(({ type: name, address }) => (
            <Transceiver key={`${name}_${address}`}>
              <Name>{name.charAt(0).toUpperCase() + name.slice(1)}</Name>
              <HashComponent
                explorerURL={getExplorerLink({
                  chain: getEvmChain(wormholeChainId),
                  hashOrAddress: address,
                })}
                hash={address}
                onCopy={() => onCopyToast()}
                showCopyButton
              />
            </Transceiver>
          ))}
        </Transceivers>
      </FormRow>
      <form onSubmit={handleSetThreshold}>
        <FormRow label="Transceivers threshold">
          <ButtonRowNoWrap>
            <FormRow error={thresholdError}>
              <Textfield
                type="number"
                value={thresholdValue}
                onChange={(e) => setThresholdValue(Number(e.target.value))}
                min={1}
                max={transceivers.length}
                error={thresholdError}
              />
            </FormRow>
            <ButtonWrapper>
              <OfMany>of {transceivers.length}</OfMany>
              <SecondaryButton
                type="submit"
                disabled={!!thresholdError || thresholdValue === threshold || isWaitingForTx}
              >
                {isWaitingForTx ? 'Updating...' : 'Update'}
              </SecondaryButton>
            </ButtonWrapper>
          </ButtonRowNoWrap>
          <NTTTransactionStatus
            chain={evmChain}
            hash={thresholdTxHash}
            isWaitingSignature={isWaitingThresholdSignature}
            onSuccess={() => {
              setThresholdTxHash(undefined)
              setIsWaitingForTx(false)
            }}
            onError={() => {
              setIsWaitingForTx(false)
            }}
          />
        </FormRow>
      </form>
    </Wrapper>
  )
}

export default SecurityThreshold
