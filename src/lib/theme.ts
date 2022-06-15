import { extendTheme } from "@chakra-ui/react";

const colors = {
  grey: {
    50: "#fafafa",
    100: "#F5f5f5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  teal: {
    50: "#e0f2f1",
    100: "#b2dfdb",
    200: "#80cbc4",
    300: "#4db6ac",
    400: "#26a69a",
    500: "#009688",
    600: "#00897b",
    700: "#00796b",
    800: "#00695c",
    900: "#004d40",
  },
};

const components = {
  Button: {
    variants: {
      link: {
        ":focus": {
          outline: "none",
          boxShadow: "none",
        },
      },
    },
  },
};

export const theme = extendTheme({ colors, components });
