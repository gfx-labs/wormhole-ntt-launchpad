import BackButton from '@/src/components/pageComponents/deploy/form/BackButton'
import ExpandTokenInfo from '@/src/components/pageComponents/deploy/form/ExpandTokenInfo'
import { ChainSelection } from '@/src/components/sharedComponents/form/ChainSelection'
import { FormRow } from '@/src/components/sharedComponents/form/FormRow'
import Textfield from '@/src/components/sharedComponents/form/Textfield'
import { ButtonsWrapper } from '@/src/components/sharedComponents/form/ui'
import { NextButton } from '@/src/components/sharedComponents/ui/Buttons'
import { useTokenInfo } from '@/src/hooks/useTokenInfo'
import { chains } from '@/src/lib/networks.config'
import { useDeployStore } from '@/src/stores/deploy'
import getZodFieldError from '@/src/utils/getZodFieldError'
import { type Address, isAddress } from 'viem'
import { z } from 'zod'

const tokenAddressSchema = z.string().refine((val) => isAddress(val), 'Invalid address')

const ExpandTokenFields = () => {
  const { homeChain, setHomeChainId, setPeerChains, setStep, setTokenAddress, tokenAddress } =
    useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const { data: tokenInfo } = useTokenInfo({
    address: tokenAddress,
    chainId: homeChain,
  })
  const validationResult = tokenAddressSchema.safeParse({
    tokenAddress,
  })

  const tokenAddressError = getZodFieldError(validationResult, 'tokenAddress', !tokenAddress)

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
      <FormRow label="Home Network">
        <ChainSelection
          selectedChain={selectedChain}
          items={items}
        />
      </FormRow>
      <FormRow
        error={tokenAddressError}
        label="Token address"
      >
        <Textfield
          error={tokenAddressError}
          onChange={(e) => setTokenAddress(e.target.value as Address)}
          placeholder="Token address"
          validate={(value) => (isAddress(value) ? undefined : 'Invalid address')}
          value={tokenAddress || ''}
        />
      </FormRow>
      <ExpandTokenInfo />
      <ButtonsWrapper>
        <BackButton />
        <NextButton
          disabled={!tokenInfo}
          onClick={() => setStep('peers')}
        >
          Next
        </NextButton>
      </ButtonsWrapper>
    </>
  )
}

export default ExpandTokenFields
