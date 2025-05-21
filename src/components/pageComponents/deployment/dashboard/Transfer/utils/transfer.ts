import {
  type Chain,
  type ChainAddress,
  type TransactionId,
  Wormhole,
  signSendWait,
  toUniversal,
} from '@wormhole-foundation/sdk'
import evm from '@wormhole-foundation/sdk/platforms/evm'
import type { NTTToken } from '../../../../../../api/endpoints'
import '@wormhole-foundation/sdk-evm-ntt'

import { ethers } from 'ethers'
import type { Dispatch, SetStateAction } from 'react'
import { ensureAllowance, getWalletSigner, loadProtocol, reformatTokenType } from './utils'

export const transfer = async ({
  selectedReceiveToken,
  selectedSendToken,
  sendAmount,
  address,
  receiverAddress,
  setIsWaitingTx,
  setApprovalTxHash,
  setTransferTxHash,
  setApprovalConfirmed,
}: {
  selectedReceiveToken: NTTToken
  selectedSendToken: NTTToken
  sendAmount: string
  address: string
  receiverAddress?: string
  setIsWaitingTx: Dispatch<SetStateAction<boolean>>
  setApprovalTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>
  setTransferTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>
  setApprovalConfirmed: Dispatch<SetStateAction<boolean>>
}) => {
  setIsWaitingTx(true)
  const senderChain = selectedSendToken.blockchain as Chain
  const receiverChain = selectedReceiveToken.blockchain as Chain

  //TODO handle testnet
  const wh = new Wormhole('Mainnet', [evm.Platform])
  const srcChain = wh.getChain(senderChain)

  const senderUniversalAddress = toUniversal(senderChain, address)
  const receiverUniversalAddress = toUniversal(
    receiverChain,
    receiverAddress ? receiverAddress : address,
  )

  const destination: ChainAddress = {
    chain: receiverChain,
    address: receiverUniversalAddress,
  }

  const srcNttContracts = reformatTokenType(selectedSendToken)

  const srcNtt = await loadProtocol(srcChain, srcNttContracts)

  // Uncomment if we need manual redemption for the destination chain
  // const dstNttContracts = reformatTokenType(selectedReceiveToken)
  // const dstChain = wh.getChain(receiverChain)
  // const [srcNtt, dstNtt] = await Promise.all([
  //   loadProtocol(srcChain, srcNttContracts),
  //   loadProtocol(dstChain, dstNttContracts),
  // ])

  const srcSigner = await getWalletSigner(srcChain, setTransferTxHash)

  const decimals = selectedSendToken.token.decimals || 18
  const amount = BigInt(ethers.parseUnits(sendAmount, decimals).toString())
  console.log('Transfer amount:', sendAmount, 'Token (raw:', amount.toString(), ')')
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const ethersSigner = await provider.getSigner()

  let txids: TransactionId[] = []
  try {
    await ensureAllowance(
      srcNttContracts.token,
      srcNttContracts.manager,
      amount,
      address,
      ethersSigner,
      decimals,
      setApprovalTxHash,
      setApprovalConfirmed,
    )
    const xfer = () =>
      srcNtt.transfer(senderUniversalAddress, amount, destination, {
        queue: false,
        automatic: true,
        gasDropoff: 0n,
      })

    txids = await signSendWait(srcChain, xfer(), srcSigner)
    setIsWaitingTx(false)
    console.log('Number of transactions:', txids.length)
    console.log(
      'Transaction IDs:',
      txids.map((tx) => tx.txid),
    )
  } catch (error) {
    setIsWaitingTx(false)
    console.error('signSendWait failed:', error)
    throw error
  }

  // Uncomment if we need to get the VAA for the last transaction, takes ~ 10 mins

  // const txnVaa = await wh.getVaa(
  //   txids[txids?.length - 1]?.txid,
  //   'Ntt:WormholeTransfer',
  //   25 * 60 * 1000,
  // )
  // console.log('VAA:', txnVaa)
  console.log('Transfer successful:', txids)
  return { txids }

  // Uncomment if manual redemption is needed for the destination chain
  // const dstSigner = await getWalletSigner(dstChain)
  // const dstTxids = await signSendWait(
  //   dstChain,
  //   dstNtt.redeem([vaa!], receiverUniversalAddress),
  //   dstSigner,
  // )
  // console.log('Destination txs:', dstTxids)
}
