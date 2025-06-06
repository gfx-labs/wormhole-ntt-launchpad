import { networks } from '@/src/constants/networks'
import { useAddToken } from '@/src/hooks/useAddToken'
import { useWeb3Status } from '@/src/hooks/useWeb3Status'
import type { AllChainsIds } from '@/src/lib/networks.config'
import { Button } from '@bootnodedev/db-ui-toolkit'
import type { ComponentPropsWithoutRef } from 'react'
import type { Address, Chain } from 'viem'
import { getAnyChainById } from '../../utils/getChainById'

interface AddTokenButtonProps extends ComponentPropsWithoutRef<'button'> {
  tokenAddress: Address
  tokenSymbol: string
  chainId: AllChainsIds
  decimals?: number
}

const WalletIcon = () => (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.7499 7.5C10.7499 7.69778 10.6912 7.89112 10.5813 8.05557C10.4714 8.22002 10.3153 8.34819 10.1325 8.42388C9.94981 8.49957 9.74874 8.51937 9.55476 8.48079C9.36078 8.4422 9.1826 8.34696 9.04274 8.20711C8.90289 8.06725 8.80765 7.88907 8.76906 7.69509C8.73048 7.50111 8.75028 7.30004 8.82597 7.11732C8.90166 6.93459 9.02983 6.77841 9.19428 6.66853C9.35873 6.55865 9.55207 6.5 9.74985 6.5C10.0151 6.5 10.2694 6.60536 10.457 6.79289C10.6445 6.98043 10.7499 7.23478 10.7499 7.5ZM13.2499 5.25V10.25C13.2499 10.7804 13.0391 11.2891 12.6641 11.6642C12.289 12.0393 11.7803 12.25 11.2499 12.25H2.24985C1.71942 12.25 1.21071 12.0393 0.835637 11.6642C0.460564 11.2891 0.24985 10.7804 0.24985 10.25V2.8075C0.242158 2.54006 0.288205 2.27379 0.385265 2.02446C0.482325 1.77514 0.628424 1.54782 0.814913 1.35597C1.0014 1.16412 1.22449 1.01164 1.47097 0.907549C1.71744 0.803463 1.9823 0.74989 2.24985 0.75H10.4999C10.6988 0.75 10.8895 0.829018 11.0302 0.96967C11.1708 1.11032 11.2499 1.30109 11.2499 1.5C11.2499 1.69891 11.1708 1.88968 11.0302 2.03033C10.8895 2.17098 10.6988 2.25 10.4999 2.25H2.24985C2.1828 2.24996 2.11643 2.26342 2.05468 2.28955C1.99293 2.31569 1.93707 2.35398 1.89043 2.40214C1.84378 2.45031 1.80729 2.50736 1.78314 2.56991C1.75899 2.63247 1.74767 2.69923 1.74985 2.76625V2.77125C1.76035 2.90364 1.82111 3.02699 1.91966 3.11601C2.01821 3.20503 2.14708 3.25297 2.27985 3.25H11.2499C11.7803 3.25 12.289 3.46071 12.6641 3.83579C13.0391 4.21086 13.2499 4.71957 13.2499 5.25ZM11.7499 5.25C11.7499 5.11739 11.6972 4.99021 11.6034 4.89645C11.5096 4.80268 11.3825 4.75 11.2499 4.75H2.27985C2.10104 4.75008 1.92294 4.72739 1.74985 4.6825V10.25C1.74985 10.3826 1.80253 10.5098 1.8963 10.6036C1.99007 10.6973 2.11724 10.75 2.24985 10.75H11.2499C11.3825 10.75 11.5096 10.6973 11.6034 10.6036C11.6972 10.5098 11.7499 10.3826 11.7499 10.25V5.25Z"
      fill="currentColor"
    />
  </svg>
)

const AddTokenButton = ({
  chainId,
  children = 'Add to wallet',
  decimals = 18,
  tokenAddress,
  tokenSymbol,
  ...restProps
}: AddTokenButtonProps) => {
  const { appChainId, switchNetwork } = useWeb3Status()
  const { addToken } = useAddToken()
  const networkName = networks.find((n) => n.id === chainId)?.label

  const needSwitchChain = appChainId !== chainId

  const action = async () => {
    if (needSwitchChain) {
      switchNetwork(getAnyChainById(chainId) as Chain)
      return
    }

    await addToken({
      address: tokenAddress,
      symbol: tokenSymbol || '',
      decimals,
    })
  }
  return (
    <Button
      title={needSwitchChain ? `Switch to ${networkName} to add the token` : 'Add token to wallet'}
      onClick={action}
      {...restProps}
    >
      {needSwitchChain ? 'Switch to add token' : 'Add token'} <WalletIcon />
    </Button>
  )
}

export default AddTokenButton
