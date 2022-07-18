import { Button } from "@chakra-ui/react";
import { TButton } from "../../types";

export function FilledAuthButton(props: TButton) {
  return (
    <Button
      colorScheme="teal"
      borderRadius="500px"
      p="22px 32px"
      mt="1rem"
      mb="1.3rem"
      fontSize="0.8rem"
      letterSpacing="2px"
      _hover={{
        transform: "scale(1.04)",
      }}
    >
      {props.text}
    </Button>
  );
}

export function OutlinedButton(props: TButton) {
  return (
    <Button
      variant="outline"
      w="100%"
      fontSize="0.9rem"
      borderRadius="500px"
      letterSpacing="2px"
      p="24px 32px"
      mt="1rem"
      mb="1.3rem"
      color="gray.600"
      borderColor="gray.400"
      _hover={{ backgroundColor: "transparent", borderColor: "gray.800" }}
    >
      {props.text}
    </Button>
  );
}
