import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/stores/store";
import AuthProvider from "@/components/AuthProvider";
import ThemeInitializer from "@/components/ThemeInitializer";

function App({ Component, pageProps }: AppProps) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeInitializer>
          <Component {...pageProps} />
        </ThemeInitializer>
      </AuthProvider>
    </Provider>
  );
}

export default App;
