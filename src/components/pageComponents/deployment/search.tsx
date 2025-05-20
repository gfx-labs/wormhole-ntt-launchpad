import { ChainSelection } from '@/src/components/sharedComponents/form/ChainSelection'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import { FormWrapper } from '@/src/components/sharedComponents/form/FormWrapper'
import Textfield from '@/src/components/sharedComponents/form/Textfield'
import { InnerCardOpaque as BaseInnerCardOpaque } from '@/src/components/sharedComponents/form/ui'
import { PrimaryButton } from '@/src/components/sharedComponents/ui/Buttons'
import { MainText } from '@/src/components/sharedComponents/ui/MainText'
import { allChains, chains } from '@/src/lib/networks.config'
import { useDeploymentFormStore } from '@/src/stores/deployment/searchForm'
import { formatWormholeAddress } from '@/src/utils/address'
import getZodFieldError from '@/src/utils/getZodFieldError'
import { getWormholeChainId } from '@/src/utils/wormholeChains'
import { ContainerPadding, InnerContainer, breakpointMediaQuery } from '@bootnodedev/db-ui-toolkit'
import { useRouter } from '@tanstack/react-router'
import { type ChangeEvent, type FormEvent, useRef } from 'react'
import styled, { css } from 'styled-components'
import { type Address, isAddress } from 'viem'
import { z } from 'zod'

const Wrapper = styled(InnerContainer)`
  align-items: center;
  flex-direction: column;
  row-gap: calc(var(--base-gap-xl) * 4);

  ${ContainerPadding}
`

const ButtonWrapper = styled.div`
  display: grid;
  padding-top: var(--base-common-padding-xl);
  width: 100%;
`

const InnerCardOpaque = styled(BaseInnerCardOpaque)`
  padding: calc(var(--base-common-padding) * 3) var(--base-common-padding-xl);
  row-gap: calc(var(--base-gap) * 4);

  ${breakpointMediaQuery(
    'tabletPortraitStart',
    css`
      padding: calc(var(--base-common-padding-xl) * 2);
    `,
  )}

  ${breakpointMediaQuery(
    'tabletLandscapeStart',
    css`
      padding: calc(var(--base-common-padding-xl) * 2)
        calc(var(--base-common-padding) * 7);
    `,
  )}
`

const tokenFormSchema = z.object({
  tokenAddress: z.string().refine(isAddress, 'Invalid address'),
  chainId: z.number().refine((val) => allChains.find((chain) => chain.id === val), 'Invalid chain'),
})

const DeploymentSearchPage = ({ ...restProps }) => {
  const router = useRouter()
  const {
    tokenAddress,
    selectedChain: selectedChainId,
    setTokenAddress,
    setSelectedChain: setSelectedChainId,
  } = useDeploymentFormStore()
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedChainId) return

    const wormholeChainId = getWormholeChainId(selectedChainId).toString()
    const wormholeTokenAddress = formatWormholeAddress(tokenAddress as Address).slice(2)

    const n: Promise<void> = router.navigate({
      to: '/deployment/$chain/$address',
      params: { chain: wormholeChainId, address: wormholeTokenAddress },
    }) as Promise<void>

    n.finally(() => {
      setSelectedChainId(null)
      setTokenAddress('')
    })
  }

  const validationResult = tokenFormSchema.safeParse({
    tokenAddress,
    chainId: selectedChainId,
  })

  const networkError =
    tokenAddress && getZodFieldError(validationResult, 'chainId', !selectedChainId)
  const addressError = getZodFieldError(validationResult, 'tokenAddress', !tokenAddress)
  const items = chains.map((chain) => ({
    id: chain.id,
    name: chain.name,
    onClick: () => setSelectedChainId(chain.id),
    isActive: selectedChainId === chain.id,
  }))

  const selectedChain = chains.find((item) => item.id === selectedChainId)

  return (
    <Wrapper {...restProps}>
      <MainText
        title={
          <>
            Access the Token
            <br />
            dashboard and admin panel
          </>
        }
        text={
          <>
            Effortlessly monitor supply, track distribution, set <br />
            rate limits, and deploy on new networks.
          </>
        }
      />
      <FormWrapper>
        <InnerCardOpaque
          as="form"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <FormRow
            error={networkError}
            label="Network"
          >
            <ChainSelection
              items={items}
              selectedChain={selectedChain}
            />
          </FormRow>
          <FormRow
            error={addressError}
            label="Token Address"
          >
            <Textfield
              error={addressError}
              id="token-address"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
              placeholder="Enter token address"
              type="search"
              value={tokenAddress}
            />
          </FormRow>
          <ButtonWrapper>
            <PrimaryButton
              disabled={!validationResult.success}
              type="submit"
            >
              Next
            </PrimaryButton>
          </ButtonWrapper>
        </InnerCardOpaque>
      </FormWrapper>
    </Wrapper>
  )
}

export default DeploymentSearchPage
