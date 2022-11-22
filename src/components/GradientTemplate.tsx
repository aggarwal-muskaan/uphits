import React from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, theme } from "@chakra-ui/react";

interface Props {
  color: string;
  children: JSX.Element;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  roundImage: boolean;
}

function GradientTemplate({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}: Props) {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.colors.gray,
          borderRadius: "24px",
        },
      }}
    >
      <Flex
        bg={`${color}.600`}
        padding={{ base: "15px", lg: "40px" }}
        align={{ base: "center", lg: "end" }}
      >
        <Box padding="20px">
          <Image
            boxSize={{ base: "100px", lg: "160px" }}
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
            minW="90px"
          />
        </Box>
        <Box
          padding="20px"
          lineHeight={{ base: "30px", lg: "40px" }}
          color="white"
        >
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize={{ base: "4xl", lg: "6xl" }}>{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box pt={{ base: "30px", lg: "50px" }} pb={{ base: "70px", lg: "50px" }}>
        {children}
      </Box>
    </Box>
  );
}

export default GradientTemplate;
