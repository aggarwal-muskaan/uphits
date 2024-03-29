import Link from "next/link";
import { Box, Flex, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { IconContext } from "react-icons";

import { PlayerBar } from "./music/PlayerBar";
import Sidebar from "./sidebar/Sidebar";
import React from "react";
import { Router } from "next/router";
import Loading from "./shared/Loading";

interface Props {
  children: JSX.Element;
}

function PlayerTemplate({ children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallWidthDevice] = useMediaQuery("(max-width: 810px)");
  const styles = React.useMemo(() => ({ color: "#4db6ac", size: "100%" }), []);

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  React.useEffect(() => {
    if (loading) onClose();
  }, [loading]);

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

          {loading ? (
            <Loading />
          ) : (
            <Box ml="16rem" mb="5rem">
              <Box h="calc(100vh - 5rem)">{children}</Box>
            </Box>
          )}

          <Box pos="absolute" bottom="0" left="0" h="5rem" w="100%">
            <PlayerBar />
          </Box>
        </>
      ) : (
        <>
          <Box bg="gray.900">
            <Flex
              w="100%"
              h="3rem"
              display="flex"
              alignItems="center"
              onClick={onOpen}
            >
              <Box w="50px" h="70%" ml="1rem">
                <IconContext.Provider value={styles}>
                  <BsMusicNoteList />
                </IconContext.Provider>
              </Box>
              <Text fontSize="2xl" color="teal.300" fontWeight="bold">
                uphits
              </Text>
            </Flex>
          </Box>

          {loading ? (
            <Loading />
          ) : (
            <Box mb="4.5rem">
              <Box h="calc(100vh - 4.5rem)">{children}</Box>
            </Box>
          )}

          <Box pos="absolute" bottom="0" left="0" h="4.5rem" w="100%">
            <PlayerBar />
          </Box>

          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg="black" color="grey.400">
              <Sidebar />
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
}

export default PlayerTemplate;
