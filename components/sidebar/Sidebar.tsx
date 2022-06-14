import { Box, Flex, Text } from "@chakra-ui/react";
import { BsMusicNoteList } from "react-icons/bs";
import { IconContext } from "react-icons";

function Sidebar() {
  return (
    <>
      <Flex w="100%" h="66px" mb="18px" display="flex" alignItems="center">
        <Box w="50px" h="100%" ml="2rem">
          <IconContext.Provider value={{ color: "#4db6ac", size: "100%" }}>
            <BsMusicNoteList />
          </IconContext.Provider>
        </Box>
        <Text fontSize={"3xl"} ml="0.5rem" color="teal.300">
          uphits
        </Text>
      </Flex>

      <Box w="100%">Sidevar</Box>
    </>
  );
}

export default Sidebar;
