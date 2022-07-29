import { Box } from "@chakra-ui/layout";
import Sidebar from "./sidebar/Sidebar";

function PlayerTemplate({ children }) {
  return (
    <Box w="100vw" h="100vh">
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="16rem"
        h="calc(100% - 6rem)"
        py="1.5rem"
        color="grey.400"
        bg="black"
      >
        <Sidebar />
      </Box>

      <Box ml="16rem" mb="6rem">
        <Box h="calc(100vh - 6rem)">{children}</Box>
      </Box>

      <Box pos="absolute" bottom="0" left="0" h="6rem" w="100%">
        Player
      </Box>
    </Box>
  );
}

export default PlayerTemplate;
