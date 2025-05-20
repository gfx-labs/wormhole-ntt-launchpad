import BackButton from '@/src/components/pageComponents/deploy/form/BackButton'
import { BigNumberInput } from '@/src/components/sharedComponents/BigNumberInput'
import Hash from '@/src/components/sharedComponents/Hash'
import { ChainSelection } from '@/src/components/sharedComponents/form/ChainSelection'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import Textfield from '@/src/components/sharedComponents/form/Textfield'
import { ButtonsWrapper } from '@/src/components/sharedComponents/form/ui'
import { NextButton } from '@/src/components/sharedComponents/ui/Buttons'
import { chains } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import { getAnyChainById } from '@/src/utils/getChainById'
import { getExplorerLink } from '@/src/utils/getExplorerLink'
import getZodFieldError from '@/src/utils/getZodFieldError'
import onCopyToast from '@/src/utils/onCopyToast'
import { generateTokenSymbol } from '@/src/utils/tokenSymbolGenerator'
import styled from 'styled-components'
import { maxUint256 } from 'viem'
import { useAccount } from 'wagmi'
import { z } from 'zod'

const OwnerInfo = styled.div`
  background-color: rgb(255 255 255 / 7%);
  border-radius: var(--base-border-radius-xl);
  color: var(--theme-text-color);
  column-gap: var(--base-gap);
  display: block;
  flex-grow: 0;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 1.6;
  max-width: fit-content;
  min-height: 62px;
  padding: var(--base-common-padding-xl);
`

const ConnectedAddress = styled(Hash)`
  --theme-copy-button-color: var(--theme-color-primary-light);
  --theme-copy-button-color-hover: rgb(255 255 255 / 60%);

  /* External link button */
  --theme-external-link-button-color: var(--theme-color-primary-light);
  --theme-external-link-button-color-hover: rgb(255 255 255 / 60%);

  background-color: var(--theme-color-darker-gray);
  border-radius: var(--base-border-radius-sm);
  color: var(--theme-text-color-light);
  column-gap: var(--base-gap);
  display: inline-flex;
  min-height: 30px;
  padding: 0 var(--base-common-padding);
`

const tokenFormSchema = z.object({
  tokenName: z
    .string()
    .min(1, 'Token name is required and must be at least 1 characters')
    .max(40, 'Token name must be less than 40 characters')
    .regex(/^[a-zA-Z0-9\s]+$/, 'Token name can only contain letters, numbers and spaces'),

  tokenSymbol: z
    .string()
    .min(1, 'Token symbol is required and must be at least 1 characters')
    .max(8, 'Token symbol must be less than 8 characters')
    .regex(/^[A-Z0-9]+$/, 'Token symbol must be uppercase letters and numbers only'),

  tokenSupply: z
    .string()
    .min(1, 'Token supply is required')
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
        return amount <= maxUint256
      } catch {
        return false
      }
    }, 'Token supply exceeds maximum allowed value'),
})

const LaunchTokenFields = () => {
  const {
    homeChain,
    setHomeChainId,
    setPeerChains,
    setStep,
    setTokenName,
    setTokenSupply,
    setTokenSymbol,
    tokenName,
    tokenSupply,
    tokenSymbol,
  } = useDeployStore()
  const { isConnected, address } = useAccount()
  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const chain = getAnyChainById(homeChain)

  const validationResult = tokenFormSchema.safeParse({
    tokenName,
    tokenSymbol,
    tokenSupply,
  })

  const tokenNameError = getZodFieldError(validationResult, 'tokenName', !tokenName)
  const tokenSymbolError = getZodFieldError(validationResult, 'tokenSymbol', !tokenSymbol)
  const tokenSupplyError = getZodFieldError(validationResult, 'tokenSupply', !tokenSupply)

  const items = chains.map((chain) => ({
    id: chain.id,
    name: chain.name,
    onClick: () => {
      setHomeChainId(chain.id)
      setPeerChains([]) // reset peer chains
    },
    isActive: homeChain === chain.id,
  }))
  const selectedChain = chains.find((item) => item.id === homeChain)

  return (
    <>
      <OwnerInfo>
        {isConnected && address ? (
          <>
            You are about to set up your NTT with{' '}
            <ConnectedAddress
              explorerURL={getExplorerLink({
                chain: chain,
                hashOrAddress: address,
              })}
              hash={address}
              onCopy={() => onCopyToast()}
              showCopyButton
            />
            as the owner.
          </>
        ) : (
          'The owner of your NTT will be the connected wallet address when you execute the deployment.'
        )}
      </OwnerInfo>
      <FormRow label="Home Network">
        <ChainSelection
          selectedChain={selectedChain}
          items={items}
        />
      </FormRow>
      <FormRow
        error={tokenNameError}
        label="Name"
      >
        <Textfield
          onChange={(e) => {
            setTokenName(e.target.value)
            setTokenSymbol(generateTokenSymbol(e.target.value))
          }}
          placeholder="Token name"
          value={tokenName || ''}
          error={tokenNameError}
        />
      </FormRow>
      <FormRow
        error={tokenSymbolError}
        label="Symbol"
      >
        <Textfield
          onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
          placeholder="Token symbol"
          value={tokenSymbol || ''}
          error={tokenSymbolError}
        />
      </FormRow>
      <FormRow
        error={tokenSupplyError}
        label={'Initial supply'}
      >
        <BigNumberInput
          decimals={18}
          onChange={(value) => setTokenSupply(value.toString())}
          renderInput={({ ...props }) => (
            <Textfield
              {...props}
              error={tokenSupplyError}
              placeholder={`Token supply (will be minted to the deployer's address in ${chain?.name})`}
            />
          )}
          value={BigInt(tokenSupply || 0)}
        />
      </FormRow>
      <ButtonsWrapper>
        <BackButton />
        <NextButton
          disabled={!validationResult.success}
          onClick={() => setStep('peers')}
        >
          Next
        </NextButton>
      </ButtonsWrapper>
    </>
  )
}

export default LaunchTokenFields
