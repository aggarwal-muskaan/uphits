import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import GradientTemplate from "../components/GradientTemplate";
import { useUser } from "../lib/customHooks";
import prismaClient from "../lib/prismaClient";

interface Props {
  artists: Artist[];
}

const Home = ({ artists }: Props) => {
  const { user } = useUser();

  return (
    <GradientTemplate
      roundImage
      color="gray"
      subtitle="profile"
      title={user?.firstName}
      description={`${user?.playlistsCount} public playlists`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientTemplate>
  );
};

export const getServerSideProps = async () => {
  const artists = await prismaClient.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
