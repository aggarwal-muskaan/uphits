import { Box } from "@chakra-ui/layout";
import { PlayerBar } from "./music/PlayerBar";
import Sidebar from "./sidebar/Sidebar";

interface Props {
  children: JSX.Element;
}

function PlayerTemplate({ children }: Props) {
  return (
    <Box w="100vw" h="100vh">
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
        <Box
          h="calc(100vh - 5rem)"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "red",
              borderRadius: "24px",
            },
          }}
        >
          {children}
        </Box>
      </Box>

      <Box pos="absolute" bottom="0" left="0" h="5rem" w="100%">
        <PlayerBar />
      </Box>
    </Box>
  );
}

export default PlayerTemplate;
