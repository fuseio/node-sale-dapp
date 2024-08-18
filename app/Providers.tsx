'use client'
import { ReactNode, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/store/store'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, NEXT_PUBLIC_YANDEX_METRICA_ID } from '@/lib/config'
import ReactGA from "react-ga4";
import { type State, WagmiProvider } from 'wagmi'
import { getConfig } from '@/lib/web3Auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletModal from '@/components/WalletModal'
import SwitchChainModal from '@/components/SwitchChainModal'
import { YMInitializer } from 'react-yandex-metrika'

type Props = {
  children: ReactNode,
  initialState: State | undefined,
}

export default function Providers({ children, initialState }: Props) {
  const storeRef = useRef<AppStore>()
  const queryClient = new QueryClient()
  const [config] = useState(() => getConfig())

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    ReactGA.initialize(NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string);
  }

  return (
    <Provider store={storeRef.current}>
      <WagmiProvider config={config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>
          <YMInitializer
            accounts={[parseInt(NEXT_PUBLIC_YANDEX_METRICA_ID)]}
            options={{
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            }}
          />
          <WalletModal />
          <SwitchChainModal />
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  )
}
