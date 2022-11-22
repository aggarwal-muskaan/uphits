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
import Loading from "../components/shared/Loading";
import { Router } from "next/router";
import React from "react";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { authPage?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <ChakraProvider theme={theme} resetCSS>
      <StoreProvider store={store}>
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : loading ? (
          <Loading />
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
