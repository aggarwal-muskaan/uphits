import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { IconContext } from "react-icons";

import { PlayerBar } from "./music/PlayerBar";
import Sidebar from "./sidebar/Sidebar";
import React from "react";

interface Props {
  children: JSX.Element;
}

function PlayerTemplate({ children }: Props) {
  const [isSmallWidthDevice] = useMediaQuery("(max-width: 810px)");
  const styles = React.useMemo(() => ({ color: "#4db6ac", size: "100%" }), []);
  console.log("isSmallWidthDevice", isSmallWidthDevice);

  return (
    <Box w="100vw" h="100vh">
      {!isSmallWidthDevice ? (
        <>
          <Box
            pos="absolute"
            top="0"
            left="0"
            w="16rem"
            h="calc(100% - 5rem)"
            py="1.5rem"
            color="grey.400"
            bg="black"
          >
            <Sidebar />
          </Box>
          <Box ml="16rem" mb="5rem">
            <Box h="calc(100vh - 5rem)">{children}</Box>
          </Box>
          <Box pos="absolute" bottom="0" left="0" h="5rem" w="100%">
            <PlayerBar />
          </Box>
        </>
      ) : (
        <>
          <Box bg="gray.900">
            <Link href="/" passHref>
              <a>
                <Flex w="100%" h="3rem" display="flex" alignItems="center">
                  <Box w="50px" h="70%" ml="1rem">
                    <IconContext.Provider value={styles}>
                      <BsMusicNoteList />
                    </IconContext.Provider>
                  </Box>
                  <Text fontSize="2xl" color="teal.300" fontWeight="bold">
                    uphits
                  </Text>
                </Flex>
              </a>
            </Link>
          </Box>
          <Box mb="4rem">
            <Box h="calc(100vh - 4rem)">{children}</Box>
          </Box>
          <Box pos="absolute" bottom="0" left="0" h="4rem" w="100%">
            <PlayerBar />
          </Box>
        </>
      )}
    </Box>
  );
}

export default PlayerTemplate;
