import { TokenTitle } from '@/src/components/sharedComponents/form/TokenTitle'
import { useTokenInfo } from '@/src/hooks/useTokenInfo'
import { useDeployStore } from '@/src/stores/deploy'
import type { FC } from 'react'

const ExpandTokenMainTitle: FC<{ title?: string }> = ({
  title = 'Token information',
  ...restProps
}) => {
  const { tokenAddress, homeChain } = useDeployStore()

  if (!homeChain) {
    throw new Error('Home chain is not set')
  }

  const { data } = useTokenInfo({
    address: tokenAddress,
    chainId: homeChain,
  })

  return (
    data && (
      <TokenTitle
        name={data.name}
        symbol={data.symbol}
        title={title}
        {...restProps}
      />
    )
  )
}

export default ExpandTokenMainTitle
