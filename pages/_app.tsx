import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/stores/store";
import AuthProvider from "@/components/AuthProvider";
import ThemeInitializer from "@/components/ThemeInitializer";
import { SITE_NAME } from "@/utils/labels";

function App({ Component, pageProps }: AppProps) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <Head>
        <title>{SITE_NAME}</title>
        <meta
          name="description"
          content="Discover films from every country on an interactive world map."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <ThemeInitializer>
          <Component {...pageProps} />
        </ThemeInitializer>
      </AuthProvider>
    </Provider>
  );
}

export default App;
