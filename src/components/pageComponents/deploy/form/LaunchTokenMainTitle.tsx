import { TokenTitle } from '@/src/components/sharedComponents/form/TokenTitle'
import { useDeployStore } from '@/src/stores/deploy'
import type { FC } from 'react'

const LaunchTokenMainTitle: FC<{ title?: string }> = ({ title = 'Token', ...restProps }) => {
  const { tokenName, tokenSymbol } = useDeployStore()

  return (
    tokenName &&
    tokenSymbol && (
      <TokenTitle
        name={tokenName}
        symbol={tokenSymbol}
        title={title}
        {...restProps}
      />
    )
  )
}

export default LaunchTokenMainTitle
