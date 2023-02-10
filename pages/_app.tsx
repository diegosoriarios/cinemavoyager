import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ContextProvider } from './context/Auth/provider';
import DarkModeContextProvider from './context/Theme/provider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider value={500}>
      <DarkModeContextProvider>
        <Component {...pageProps} />
      </DarkModeContextProvider>
    </ContextProvider>
  );
}
