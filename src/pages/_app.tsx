import "reset-css";
// "resets" all these styles to zero/none, so that you don't see any browser-styles you haven't applied to your page.
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import { NextComponentType } from "next";
import { AppProps } from "next/app";
import React from "react";

import PlayerTemplate from "../components/PlayerTemplate";
import { theme } from "../lib/theme";
import { store } from "../lib/store";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <StoreProvider store={store}>
        <>
          {Component.authPage ? (
            <Component {...pageProps} />
          ) : (
            <PlayerTemplate>
              <Component {...pageProps} />
            </PlayerTemplate>
          )}
        </>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
