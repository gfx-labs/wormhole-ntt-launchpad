import type { NTTToken } from '@/src/api/endpoints'
import {
  ButtonRowAlt,
  InnerCard,
  SecondaryButton,
} from '@/src/components/pageComponents/deployment/settings/ui'
import { BigNumberInput } from '@/src/components/sharedComponents/BigNumberInput'
import { NTTTransactionStatus } from '@/src/components/sharedComponents/NTTTransactionStatus'
import { WalletStatusVerifier } from '@/src/components/sharedComponents/WalletStatusVerifier'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import BaseTextfield from '@/src/components/sharedComponents/form/Textfield'
import { InnerCardTitle } from '@/src/components/sharedComponents/form/ui'
import { getNetworkType, networks } from '@/src/constants/networks'
import { useTokenByChainAndAddress } from '@/src/hooks/api/useTokenByChainAndAddress'
import {
  useReadNttManagerRateLimitDuration,
  useWriteNttManagerSetInboundLimit,
  useWriteNttManagerSetOutboundLimit,
  useWriteNttOwnerExecute,
} from '@/src/hooks/generated'
import { useManagerOwner } from '@/src/hooks/useManagerOwner'
import { type TokenLimit, useTokensLimits } from '@/src/hooks/useTokensLimits'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import { formatWormholeAddress } from '@/src/utils/address'
import { setInboundLimitCalldata, setOutboundLimitCalldata } from '@/src/utils/executeCalldata'
import { getWHPeerLimit } from '@/src/utils/getWHPeerLimit'
import getZodFieldError from '@/src/utils/getZodFieldError'
import { SafeSuspense } from '@/src/utils/suspenseWrapper'
import { type WormholeChainId, getEvmChain } from '@/src/utils/wormholeChains'
import { breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import type { ComponentPropsWithoutRef, FC } from 'react'
import { type FormEvent, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { type Address, type Hash, isAddressEqual, zeroAddress } from 'viem'
import { z } from 'zod'
import { ConnectWalletButton } from '../../../sharedComponents/ConnectButtonWrapper'

const Wrapper = styled.div``

const Top = styled(InnerCard)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding: calc(var(--base-common-padding-xl) * 2) var(--base-common-padding-xl);
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
`

/* const Bottom = styled(InnerCardOpaque)`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: solid 1px rgb(255 255 255 / 12%);
  padding: calc(var(--base-common-padding-xl) * 2) var(--base-common-padding-xl);
  row-gap: var(--base-gap-xl);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding) * 4);
    `,
  )}
` */

const Subtitle = styled(InnerCardTitle)`
  font-size: 1.9rem;
  padding-top: var(--base-gap);
`

const Text = styled.p`
  color: var(--theme-text-color);
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
`

const Warning = styled(Text)`
  column-gap: var(--base-gap);
  align-items: center;
  display: flex;
  padding-top: var(--base-gap-xl);
`

/* const BottomText = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: var(--base-gap-xl);
  padding-top: var(--base-gap);
  row-gap: var(--base-gap);
` */

const LabelWrapper = styled.span`
  align-items: center;
  column-gap: var(--base-gap);
  display: flex;
`

const IconWrapper = styled.div`
  --icon-size: 18px;

  height: var(--icon-size);
  width: var(--icon-size);

  svg {
    display: block;
    max-height: 100%;
    max-width: 100%;
  }
`

const Textfield = styled(BaseTextfield)``

const TextFieldWrapper = styled.div`
  position: relative;

  ${Textfield} {
    padding-right: 90px;
    position: relative;
    width: 100%;
    z-index: 1;
  }
`

const WarningSVG = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.5 0.1875C6.05373 0.1875 4.63993 0.616371 3.4374 1.41988C2.23486 2.22339 1.2976 3.36544 0.744134 4.70163C0.190668 6.03781 0.0458565 7.50811 0.328011 8.9266C0.610165 10.3451 1.30661 11.648 2.32928 12.6707C3.35196 13.6934 4.65492 14.3898 6.07341 14.672C7.49189 14.9541 8.96219 14.8093 10.2984 14.2559C11.6346 13.7024 12.7766 12.7651 13.5801 11.5626C14.3836 10.3601 14.8125 8.94628 14.8125 7.5C14.8105 5.56123 14.0394 3.70246 12.6685 2.33154C11.2975 0.960627 9.43877 0.189547 7.5 0.1875ZM7.5 13.6875C6.27623 13.6875 5.07994 13.3246 4.06241 12.6447C3.04488 11.9648 2.25182 10.9985 1.7835 9.86785C1.31518 8.73724 1.19265 7.49314 1.43139 6.29288C1.67014 5.09262 2.25944 3.99011 3.12478 3.12478C3.99012 2.25944 5.09262 1.67014 6.29288 1.43139C7.49314 1.19264 8.73724 1.31518 9.86786 1.7835C10.9985 2.25181 11.9648 3.04488 12.6447 4.06241C13.3246 5.07994 13.6875 6.27623 13.6875 7.5C13.6856 9.14046 13.0331 10.7132 11.8732 11.8732C10.7132 13.0331 9.14046 13.6856 7.5 13.6875ZM8.625 10.875C8.625 11.0242 8.56574 11.1673 8.46025 11.2727C8.35476 11.3782 8.21169 11.4375 8.0625 11.4375C7.76413 11.4375 7.47799 11.319 7.26701 11.108C7.05603 10.897 6.9375 10.6109 6.9375 10.3125V7.5C6.78832 7.5 6.64525 7.44074 6.53976 7.33525C6.43427 7.22976 6.375 7.08668 6.375 6.9375C6.375 6.78832 6.43427 6.64524 6.53976 6.53975C6.64525 6.43426 6.78832 6.375 6.9375 6.375C7.23587 6.375 7.52202 6.49353 7.733 6.7045C7.94398 6.91548 8.0625 7.20163 8.0625 7.5V10.3125C8.21169 10.3125 8.35476 10.3718 8.46025 10.4773C8.56574 10.5827 8.625 10.7258 8.625 10.875ZM6.375 4.40625C6.375 4.23937 6.42449 4.07624 6.5172 3.93749C6.60991 3.79873 6.74169 3.69059 6.89586 3.62673C7.05004 3.56287 7.21969 3.54616 7.38336 3.57871C7.54703 3.61127 7.69737 3.69163 7.81537 3.80963C7.93337 3.92763 8.01373 4.07797 8.04629 4.24164C8.07885 4.40531 8.06214 4.57496 7.99828 4.72914C7.93441 4.88331 7.82627 5.01509 7.68752 5.1078C7.54876 5.20052 7.38563 5.25 7.21875 5.25C6.99498 5.25 6.78037 5.16111 6.62213 5.00287C6.4639 4.84464 6.375 4.63003 6.375 4.40625Z"
      fill="currentColor"
    />
  </svg>
)

const limitFormSchema = (decimals: number) =>
  z.object({
    limit: z
      .string()
      .refine((val) => {
        try {
          const amount = BigInt(val)
          return amount > 0n
        } catch {
          return false
        }
      }, 'Token supply must be a valid positive number')
      .refine((val) => {
        try {
          const amount = BigInt(val)
          return amount <= getWHPeerLimit(decimals)
        } catch {
          return false
        }
      }, 'Token supply exceeds maximum allowed value of maxUint64'),
  })

const PeerChainLimitFrom = ({
  isHome,
  tokenLimit,
  home,
  peer,
}: {
  isHome?: boolean
  tokenLimit: TokenLimit
  home: NTTToken
  peer: NTTToken
}) => {
  const { evmAddress } = useWeb3Status()
  const [limit, setLimit] = useState(tokenLimit.maxCapacityRaw.toString())
  const formRef = useRef<HTMLFormElement>(null)
  const validationResult = limitFormSchema(peer.token.decimals).safeParse({
    limit,
  })
  const limitError = getZodFieldError(validationResult, 'limit')
  const { writeContractAsync: setInboundLimit } = useWriteNttManagerSetInboundLimit()
  const { writeContractAsync: setOutboundLimit } = useWriteNttManagerSetOutboundLimit()
  const { writeContractAsync: execute } = useWriteNttOwnerExecute()
  const [txHash, setTxHash] = useState<Hash>()
  const [isWaitingSignature, setIsWaitingSignature] = useState(false)
  const managerOwnerInfo = useManagerOwner(
    home.wormholeChainId,
    formatWormholeAddress(home.token.address as Address),
  )

  const homeChain = getEvmChain(home.wormholeChainId as WormholeChainId)
  const isEvmChain = homeChain && getNetworkType(homeChain.id) === 'EVM'

  const submitButtonDisabled =
    !isEvmChain ||
    !isAddressEqual(managerOwnerInfo.semanticalOwner as Address, evmAddress as Address) ||
    isWaitingSignature ||
    txHash !== undefined

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!isEvmChain) {
      console.error(`${homeChain?.name} deployment is not yet supported`)
      return
    }
    e.preventDefault()

    if (!validationResult.success) {
      return
    }

    try {
      setIsWaitingSignature(true)

      const txPromise = isHome
        ? managerOwnerInfo.isOwnedByNTTOwnerSC
          ? execute(
              setOutboundLimitCalldata({
                managerAddress: home.manager.address as Address,
                limit: limit,
                chainId: homeChain.id,
                nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
              }),
            )
          : setOutboundLimit({
              args: [BigInt(limit)],
              chainId: homeChain.id,
              address: home.manager.address as Address,
            })
        : managerOwnerInfo.isOwnedByNTTOwnerSC
          ? execute(
              setInboundLimitCalldata({
                managerAddress: home.manager.address as Address,
                limit: limit,
                chainId: homeChain.id,
                nttOwnerAddress: managerOwnerInfo.nttOwnerProxyAddress as Address,
                wormholeChainId: peer.wormholeChainId,
              }),
            )
          : setInboundLimit({
              args: [BigInt(limit), peer.wormholeChainId],
              chainId: homeChain.id,
              address: peer.manager.address as Address,
            })

      const hash = await txPromise
      setIsWaitingSignature(false)
      setTxHash(hash)
    } finally {
      setIsWaitingSignature(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <FormRow
        error={limitError}
        label={
          <LabelWrapper>
            <IconWrapper>
              {
                networks.find(
                  ({ id }) => id === getEvmChain(peer.wormholeChainId as WormholeChainId)?.id,
                )?.icon
              }
            </IconWrapper>
            {isHome ? 'Sending limits' : `${peer.blockchain} receiving limits`}
          </LabelWrapper>
        }
      >
        <ButtonRowAlt>
          <TextFieldWrapper>
            <BigNumberInput
              decimals={peer.token.decimals}
              onChange={(value) => setLimit(value.toString())}
              renderInput={({ ...props }) => (
                <Textfield
                  {...props}
                  error={limitError}
                  placeholder={'Max capacity'}
                />
              )}
              value={BigInt(limit || 0)}
            />
          </TextFieldWrapper>

          <WalletStatusVerifier
            chainId={homeChain?.id}
            fallback={<ConnectWalletButton label="Connect" />}
          >
            <SecondaryButton
              disabled={
                submitButtonDisabled ||
                !isAddressEqual(
                  managerOwnerInfo.semanticalOwner as Address,
                  evmAddress || zeroAddress,
                )
              }
              type="submit"
            >
              Update
            </SecondaryButton>
          </WalletStatusVerifier>
        </ButtonRowAlt>
        {homeChain && (
          <NTTTransactionStatus
            chain={homeChain}
            hash={txHash}
            isWaitingSignature={isWaitingSignature}
            onError={() => {
              setTxHash(undefined)
              setIsWaitingSignature(false)
            }}
          />
        )}
      </FormRow>
    </form>
  )
}

interface Props extends ComponentPropsWithoutRef<'div'> {
  wormholeTokenAddress: string
  wormholeChainId: WormholeChainId
}

const PeerChainsLimits: FC<Props> = ({ wormholeChainId, wormholeTokenAddress, ...restProps }) => {
  const { data: tokenInfo } = useTokenByChainAndAddress(wormholeChainId, wormholeTokenAddress)
  if (!tokenInfo) {
    throw 'No token info'
  }

  const homeChain = getEvmChain(tokenInfo.home.wormholeChainId as WormholeChainId)

  const { data: rateLimitDuration } = useReadNttManagerRateLimitDuration({
    chainId: homeChain?.id,
    address: tokenInfo.home.manager.address as Address,
  })

  const limits = useTokensLimits(tokenInfo.home, tokenInfo.peers)
  const homeTokenLimit = limits?.outbound

  /*   const { closeModal, openModal } = useModal()
  const [modalChainId, setModalChainId] = useState('') 

   const showAddChainModal = (modalChainId: string) => {
    setModalChainId(modalChainId)
    openModal(`chain-${modalChainId}`)
  } 

  const hideAddChainModal = (modalChainId: string) => {
    closeModal(`chain-${modalChainId}`)
  }
*/
  return (
    <SafeSuspense>
      <Wrapper {...restProps}>
        <Top>
          <InnerCardTitle>Peer Chains limits</InnerCardTitle>
          {homeTokenLimit && (
            <PeerChainLimitFrom
              isHome
              home={tokenInfo.home}
              key={`${tokenInfo.home.wormholeChainId}-${tokenInfo.home.token.address}`}
              peer={tokenInfo.home}
              tokenLimit={homeTokenLimit}
            />
          )}
          <Subtitle>Peer Chains Receiving Limits</Subtitle>
          {tokenInfo.peers.map((peer) => {
            const limit = limits?.inbound.find(
              (limit) => limit.wormholeChainId === peer.wormholeChainId,
            )

            return (
              limit && (
                <PeerChainLimitFrom
                  home={tokenInfo.home}
                  key={`${peer.wormholeChainId}-${peer.token.address}`}
                  peer={peer}
                  tokenLimit={limit}
                />
              )
            )
          })}
          {rateLimitDuration !== undefined && (
            <Warning>
              <WarningSVG /> The rate limits duration is{' '}
              {(Number(rateLimitDuration) / 3600).toString()} hours.
            </Warning>
          )}
        </Top>
        {/*  <Bottom>
          <BottomText>
            <InnerCardTitle>Unlinked Peers (HARDCODED)</InnerCardTitle>
            <Text>
              To ensure your token is fully compatible across all deployed chains,
              <br />
              add any newly deployed chain to the previously deployed networks.
            </Text>
          </BottomText>
          {networks.map(({ id, label, icon }) => (
            <FormRow
              key={id}
              label={
                <LabelWrapper>
                  <IconWrapper>{icon}</IconWrapper>
                  {label} receiving limit
                </LabelWrapper>
              }
            >
              <ButtonRowAlt>
                <Textfield
                  type="number"
                  value="1000"
                />
                <SecondaryButton onClick={() => showAddChainModal(`${id}`)}>
                  Add chain
                </SecondaryButton>
              </ButtonRowAlt>
            </FormRow>
          ))}
        </Bottom> */}
      </Wrapper>
      {/*  <Modal slug={`chain-${modalChainId}`}>
        <AddChainModal
          address={wormholeTokenAddress}
          chain={wormholeChainId}
          onClose={() => hideAddChainModal(`${modalChainId}`)}
          unlinkedPeerChainId={+modalChainId}
        />
      </Modal> */}
    </SafeSuspense>
  )
}

export default PeerChainsLimits
