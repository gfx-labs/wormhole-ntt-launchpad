import { describe, expect, it } from 'vitest'
import {
  pauseCalldata,
  setInboundLimitCalldata,
  setOutboundLimitCalldata,
  setThresholdCalldata,
  transferPauserCapabilityCalldata,
  unpauseCalldata,
} from './executeCalldata'

const nttOwnerAddress = '0x152C92606C97670F8C46A4C6225472A3c3B19F37'
const managerAddress = '0x31B31D6F991229B54Ea4E9b4AE283B0A79696634'
const wormholeChainId = 10005
const chainId = 421614

const addressToCallIndex = 0
const callDataForCallIndex = 1

describe('executeCalldata', () => {
  it('setOutboundLimit should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0xd9f706aee94db85b96d37ab14daaa33a7ffdb6bebc0c278206333155ca79fd6f
    const expectedCalldata =
      '0x1901717500000000000000000000000000000000000000000052b7d33ded0bbc77bc0000'

    const result = setOutboundLimitCalldata({
      managerAddress,
      limit: '100000007000000000000000000',
      nttOwnerAddress,
      chainId,
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })

  it('setInboundLimit should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0xecbf86c037e6768d3b6248a2e5789e6c69d49d625fcb259b959c520ae0f17167
    const expectedCalldata =
      '0x186ce61200000000000000000000000000000000000000000052b7d3066a30edda2c00000000000000000000000000000000000000000000000000000000000000002715'

    const result = setInboundLimitCalldata({
      managerAddress,
      limit: '100000003000000000000000000',
      nttOwnerAddress,
      chainId,
      wormholeChainId,
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })

  it('pause should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0x314f3b4d840e44e6a5dc774c817f0c1ca5cf5afc950b0edb31b5d36e90131c71
    const expectedCalldata = '0x8456cb59'

    const result = pauseCalldata({
      managerAddress,
      nttOwnerAddress,
      chainId,
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })

  it('unpause should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0xb92c80c124f9509a3b02b644d9261591b375f545ff29ac195eb7b8cc2d138e77
    const expectedCalldata = '0x3f4ba83a'

    const result = unpauseCalldata({
      managerAddress,
      nttOwnerAddress,
      chainId,
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })

  it('transferPauserCapability should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0x6464a7258dd7716af06cb28a3501f6f597642adc9b76dc39acaa306f158a3d6e
    const expectedCalldata =
      '0x036de8af000000000000000000000000de75665f3be46d696e5579628fa17b662e6fc04e'

    const result = transferPauserCapabilityCalldata({
      managerAddress,
      nttOwnerAddress,
      chainId,
      newPauser: '0xDe75665F3BE46D696e5579628fA17b662e6fC04e',
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })

  it('setThreshold should be called with the correct arguments', () => {
    // https://sepolia.arbiscan.io/tx/0x49f4e88318678fe8654acfd36b77a7760259bea34daa973e50bed61c0c77eaa6
    const expectedCalldata =
      '0xe5a986030000000000000000000000000000000000000000000000000000000000000001'

    const result = setThresholdCalldata({
      managerAddress,
      nttOwnerAddress,
      chainId,
      newThreshold: 1,
    })

    expect(result.chainId).toBe(chainId)
    expect(result.address).toBe(nttOwnerAddress)
    expect(result.args[addressToCallIndex]).toBe(managerAddress)
    expect(result.args[callDataForCallIndex]).toBe(expectedCalldata)
  })
})
