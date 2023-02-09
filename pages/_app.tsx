import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import DarkModeContextProvider from './context/Theme/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeContextProvider>
      <Component {...pageProps} />
    </DarkModeContextProvider>
  );
}
