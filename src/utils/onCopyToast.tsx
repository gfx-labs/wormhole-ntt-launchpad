import { Toast } from '@bootnodedev/db-ui-toolkit'
import type { ReactNode } from 'react'
import { toast } from 'react-hot-toast'

const onCopyToast = (message?: string | ReactNode) => {
  const timeDelay = 2500
  toast.custom(<Toast>{message ? message : 'Copied to the clipboard!'}</Toast>, {
    duration: timeDelay,
    position: 'top-center',
    id: 'copy-to-clipboard',
  })
}

export default onCopyToast
