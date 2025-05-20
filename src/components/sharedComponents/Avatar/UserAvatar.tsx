import type { FC } from 'react'
import type { Address } from 'viem'
import { normalize } from 'viem/ens'
import { useEnsAvatar, useEnsName } from 'wagmi'
import Avatar from './Avatar'

interface Props {
  address: Address
  size: number
}
export const UserAvatar: FC<Props> = ({ address, size }) => {
  // TODO add Sol equivalent? useEnsName/avatar
  const { data: ensName } = useEnsName({ address })

  const { data: avatarImg } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
  })

  return (
    <Avatar
      address={address}
      ensImage={avatarImg}
      ensName={ensName}
      size={size}
    />
  )
}
