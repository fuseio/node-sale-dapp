'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/store/store'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS_ID, NEXT_PUBLIC_YANDEX_METRICA_ID } from '@/lib/config'
import ReactGA from "react-ga4";
import { YMInitializer } from 'react-yandex-metrika'

type Props = {
  children: ReactNode,
}

export default function Providers({ children }: Props) {
  const storeRef = useRef<AppStore>()

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    ReactGA.initialize(NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string);
  }

  return (
    <Provider store={storeRef.current}>
      <YMInitializer
        accounts={[parseInt(NEXT_PUBLIC_YANDEX_METRICA_ID)]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        }}
      />
      {children}
    </Provider>
  )
}
