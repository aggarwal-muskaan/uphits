import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="gray.800"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal"
        size="xl"
      />
    </Flex>
  );
}
