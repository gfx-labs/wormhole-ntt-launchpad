import type { Chain, ChainContext, Signer, UnsignedTransaction } from '@wormhole-foundation/sdk'
import type { Ntt } from '@wormhole-foundation/sdk-definitions-ntt'
import { ethers } from 'ethers'
import type { Dispatch, SetStateAction } from 'react'
import type { NTTToken } from '../../../../../../api/endpoints'
import { type WormholeChainId, getEvmChainId } from '../../../../../../utils/wormholeChains'

export type NttContracts = {
  [key in Chain]?: Ntt.Contracts
}

export const formatTransceiver = (address: string) => {
  return `0x${address.replace(/^0+/, '')}`
}

export const reformatTokenType = (token: NTTToken): Ntt.Contracts => {
  return {
    token: token.token.address,
    manager: token.manager.address,
    transceiver: {
      wormhole: formatTransceiver(token.manager.transceivers[0].address),
    },
  }
}

export async function ensureAllowance(
  tokenAddress: string,
  managerAddress: string,
  amount: bigint,
  address: string,
  signer: ethers.Signer,
  decimals: number,
  setApprovalTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>,
  setApprovalConfirmed: Dispatch<SetStateAction<boolean>>,
) {
  const tokenContract = new ethers.Contract(
    tokenAddress,
    [
      'function allowance(address owner, address spender) view returns (uint256)',
      'function approve(address spender, uint256 amount) returns (bool)',
    ],
    signer,
  )

  const currentAllowance = await tokenContract.allowance(address, managerAddress)
  console.log(
    'Current allowance:',
    ethers.formatUnits(currentAllowance, decimals),
    'Token',
    'address:',
    address,
  )

  if (currentAllowance < amount) {
    console.log('Allowance insufficient, approving NTT Manager')
    const approveTx = await tokenContract.approve(managerAddress, amount)
    setApprovalTxHash(approveTx.hash)
    console.log('Approval transaction sent:', approveTx.hash)
    await approveTx.wait()
    console.log('Approval confirmed')
    setApprovalConfirmed(true)
  } else {
    console.log('Allowance sufficient')
    setApprovalConfirmed(true)
  }
}

export async function getWalletSigner<C extends Chain>(
  chain: ChainContext<'Mainnet', C, 'Evm'>,
  setTransferTxHash?: Dispatch<SetStateAction<`0x${string}` | undefined>>,
): Promise<Signer<'Mainnet', C>> {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new ethers.BrowserProvider((window as any).ethereum) //await ensureWalletConnected()
  const signer = await provider.getSigner()

  const chainId = getEvmChainId(chain.config.chainId as WormholeChainId)
  if (!chainId) {
    throw new Error(`Chain ID not found for chain: ${chain.chain}`)
  }

  const currentChainId = await provider.getNetwork().then((net) => net.chainId)
  console.log('Expected Chain ID:', BigInt(chainId), 'Current Chain ID:', currentChainId)
  if (currentChainId !== BigInt(chainId)) {
    throw new Error(`Wallet is on chain ${currentChainId}, expected ${chainId}`)
  }
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (window as any).ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: `0x${chainId.toString(16)}` }],
  })

  const signerAddress = await signer.getAddress()

  const wormholeSigner: Signer<'Mainnet', C> = {
    chain: () => chain.chain,
    address: () => signerAddress,
    signAndSend: async (txRequests: UnsignedTransaction<'Mainnet', C>[]) => {
      const txHashes: string[] = []
      for (const tx of txRequests) {
        const txData: ethers.TransactionRequest = {
          to: tx.transaction.to,
          data: tx.transaction.data,
          value: tx.transaction.value ? ethers.toBigInt(tx.transaction.value) : undefined,
          gasLimit: tx.transaction.gasLimit ? ethers.toBigInt(tx.transaction.gasLimit) : undefined,
          nonce: tx.transaction.nonce,
          chainId: chainId,
        }
        console.log('Normalized tx:', txData)
        const txResponse = await signer.sendTransaction(txData)

        const hash = txResponse.hash as `0x${string}`
        if (setTransferTxHash) {
          setTransferTxHash(hash)
        }
        const receipt = await txResponse.wait()
        if (receipt?.hash) {
          txHashes.push(receipt.hash)
          console.log('Transaction confirmed:', receipt.hash)
        } else {
          console.error('Transaction failed:', receipt)
        }
      }
      return txHashes
    },
  }
  return wormholeSigner
}

export async function loadProtocol<C extends Chain>(
  chain: ChainContext<'Mainnet', C, 'Evm'>,
  nttContracts: Ntt.Contracts,
) {
  try {
    const ntt = await chain.getProtocol('Ntt', { ntt: nttContracts })
    console.log(`${chain.chain} Ntt:`, ntt)
    return ntt
  } catch (error) {
    console.error(`Failed to initialize ${chain.chain} Ntt`)
    throw error
  }
}
