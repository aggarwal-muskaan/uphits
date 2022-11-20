// "resets" all these styles to zero/none, so that you don't see any browser-styles you haven't applied to your page.
import "reset-css";
// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import { StoreProvider } from "easy-peasy";
import PlayerTemplate from "../components/PlayerTemplate";
import { theme } from "../lib/theme";
import { store } from "../lib/store";
import { AppProps } from "next/app";
import { NextComponentType } from "next";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          <PlayerTemplate>
            <Component {...pageProps} />
          </PlayerTemplate>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
