import React from "react";
import { Box, Divider, Flex, Heading } from "@chakra-ui/layout";
import { BsMusicNoteList } from "react-icons/bs";
import { IconContext } from "react-icons";
import { TAuthTemplate } from "../types";

function AuthTemplate(props: TAuthTemplate) {
  const { form } = props;
  const styles = React.useMemo(() => ({ color: "#4db6ac", size: "100%" }), []);

  return (
    <>
      <Flex
        w="100%"
        h="70px"
        my="18px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="60px" h="100%">
          <IconContext.Provider value={styles}>
            <BsMusicNoteList />
          </IconContext.Provider>
        </Box>
        <Heading as="h2" ml="0.5rem" color="teal.300">
          uphits
        </Heading>
      </Flex>

      <Divider color="gray.400" />

      <Flex justifyContent="center">
        <Box maxW="500px" mt="3rem" minW="300px" w="90%">
          {form}
        </Box>
      </Flex>
    </>
  );
}

export default AuthTemplate;
