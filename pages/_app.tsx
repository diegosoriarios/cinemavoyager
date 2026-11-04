import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper } from "@/stores/store";

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<div>loading</div>}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
