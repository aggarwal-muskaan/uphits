// "resets" all these styles to zero/none, so that you don't see any browser-styles you haven't applied to your page.
import "reset-css";
// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../lib/theme.ts";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
