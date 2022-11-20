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
      <Flex bg={`${color}.600`} padding="40px" align="end">
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
          />
        </Box>
        <Box padding="20px" lineHeight="40px" color="white">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl">{title}</Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
}

export default GradientTemplate;
