import React from "react";
import { Center, Heading } from "@chakra-ui/layout";
import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text,
  Divider,
} from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { IconContext } from "react-icons";
import { FilledAuthButton } from "../components/shared/Button";
import { useRouter } from "next/router";

const FourOhFour = () => {
  const router = useRouter();
  const styles = React.useMemo(() => ({ color: "#4db6ac", size: "100%" }), []);

  return (
    <Flex
      direction="column"
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Box w="50px" mb="2rem">
        <IconContext.Provider value={styles}>
          <BsMusicNoteList />
        </IconContext.Provider>
      </Box>
      <Heading mb="1rem" as="h1">
        Page not found
      </Heading>
      <Text mb="2rem">We can’t seem to find the page you are looking for.</Text>

      <FilledAuthButton
        text="Home"
        buttonType="submit"
        handleOnClick={() => router.push("/")}
      />
    </Flex>
  );
};

FourOhFour.authPage = true;
export default FourOhFour;
