import { Box, Flex, Text } from "@chakra-ui/layout";
import { MusicControls } from "./MusicControls";
import { useStoreState } from "easy-peasy";
import { StoreModel } from "../../lib/store";
import { useMediaQuery } from "@chakra-ui/react";
import { MobileViewControls } from "./MobileViewControls";

export const PlayerBar = () => {
  const [isSmallWidthDevice] = useMediaQuery("(max-width: 810px)");

  const songs = useStoreState((state: StoreModel) => state.activeSongs);
  const activeSong = useStoreState((state: StoreModel) => state.activeSong);

  return (
    <Box height="100%" width="100%" bg="gray.900" padding="10px">
      <>
        {activeSong ? (
          isSmallWidthDevice ? (
            <>
              <MobileViewControls songs={songs} activeSong={activeSong} />
            </>
          ) : (
            <Flex align="center">
              <Box p="10px 20px" color="white" width="30%">
                <Text fontSize="large">{activeSong.name}</Text>
                <Text fontSize="sm">{activeSong.artist.name}</Text>
              </Box>
              <Box width="70%">
                <MusicControls songs={songs} activeSong={activeSong} />
              </Box>
            </Flex>
          )
        ) : (
          <Flex
            height="100%"
            align="center"
            justifyContent="center"
            color="white"
          >
            <Text color="">Build with ❤️ by&nbsp;</Text>
            <a
              target="_blank"
              href="https://linkedin.com/in/aggarwal-muskaan"
              rel="noopener noreferrer"
            >
              <Text fontWeight="bolder">Muskaan</Text>
            </a>
          </Flex>
        )}
      </>
    </Box>
  );
};
