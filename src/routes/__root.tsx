import { Main, Wrapper } from '@bootnodedev/db-ui-toolkit'
import { ModalContainer, ModalProvider } from '@faceless-ui/modal'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'

import { TanStackReactQueryDevtools } from '@/src/components/sharedComponents/TanStackReactQueryDevtools'
import { TanStackRouterDevtools } from '@/src/components/sharedComponents/TanStackRouterDevtools'
import { Footer } from '@/src/components/sharedComponents/ui/Footer'
import { Header } from '@/src/components/sharedComponents/ui/Header'
import { AppKitProvider } from '@/src/context/appkit'
import { TransactionNotificationProvider } from '@/src/lib/toast/TransactionNotificationProvider'
import Styles from '@/src/styles'

import 'modern-normalize/modern-normalize.css'
import { useEffect, useState } from 'react'
import { useWeb3Status } from '../hooks/useWeb3Status'

declare module '@tanstack/react-router' {
  interface HistoryState {
    referer?: string
  }
}

export const Route = createRootRoute({
  component: Root,
})

declare global {
  interface Window {
    OkuOfacList: string[]
  }
}

const OfacComponent = () => {
  const { address, isWalletConnected: isConnected } = useWeb3Status()
  const [onOfacList, setOnOfacList] = useState(false)
  useEffect(() => {
    if (
      address &&
      window.OkuOfacList &&
      window.OkuOfacList.some((item: string) => {
        return item.toLowerCase() === address.toLowerCase()
      })
    ) {
      setOnOfacList(true)
    } else {
      setOnOfacList(false)
    }
  }, [address])

  const showSite = isConnected ? !onOfacList : true
  return (
    <>
      {showSite ? (
        <Outlet />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-white">
            You are blocked from using this service. Please open a support ticket if you believe
            this is a mistake.
          </div>
        </div>
      )}
    </>
  )
}

function Root() {
  return (
    <>
      <Styles />
      <AppKitProvider>
        <Toaster />
        <ModalProvider transTime={300}>
          <TransactionNotificationProvider>
            <Wrapper>
              <Header />
              <Main>
                <OfacComponent />
              </Main>
              <Footer />
              <TanStackReactQueryDevtools />
              <TanStackRouterDevtools />
            </Wrapper>
          </TransactionNotificationProvider>
          <ModalContainer />
        </ModalProvider>
      </AppKitProvider>
      <Analytics />
    </>
  )
}
