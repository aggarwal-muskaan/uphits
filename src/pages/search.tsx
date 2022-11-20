import React from "react";
import { Heading } from "@chakra-ui/layout";
import { Box, Flex, Text } from "@chakra-ui/react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const Search = () => {
  const styles = React.useMemo(() => ({ color: "#fff", size: "100%" }), []);

  return (
    <Flex
      direction="column"
      h="100%"
      w="100%"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bgGradient={`linear(pink.400 0%, pink.500 15%, pink.600 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Box w="50px" mb="2rem">
        <IconContext.Provider value={styles}>
          <BsEmojiSmileFill />
        </IconContext.Provider>
      </Box>
      <Heading mb="1rem" as="h1" color="white">
        Coming soon
      </Heading>
      <Text color="white">This feature is yet to be developed.</Text>
    </Flex>
  );
};

export default Search;
