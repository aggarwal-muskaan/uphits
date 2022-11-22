import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useStoreActions } from "easy-peasy";

import { formatDate, formatTime } from "../../lib/utilFunctions";
import { TSongsTable } from "../../types";

interface Props {
  songs: TSongsTable["songs"][];
}

export const SongsTable = ({ songs }: Props) => {
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  const handlePlay = (activeSong?: TSongsTable["songs"]) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="teal"
            aria-label="play"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s ",
                  "&:hover": {
                    bg: "rgba(255,255,255, 0.1)",
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td display={{ base: "none", md: "table-cell" }}>
                  {formatDate(song.createdAt)}
                </Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
