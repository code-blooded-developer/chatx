import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store, { AppStore } from "@/store/store";

import SocketProvider from "@/context/socket";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SocketProvider>
        <Component {...pageProps} />
      </SocketProvider>
    </Provider>
  );
}
