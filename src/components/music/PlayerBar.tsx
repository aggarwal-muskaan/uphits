import { Box, Flex, Text } from "@chakra-ui/layout";
import { MusicControls } from "./MusicControls";

export const PlayerBar = () => {
  return (
    <Box height="100%" width="100%" bg="gray.900" padding="10px">
      <Flex align="center">
        {/* {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null} */}
        <Box width="40%">
          <MusicControls />
        </Box>
      </Flex>
    </Box>
  );
};
