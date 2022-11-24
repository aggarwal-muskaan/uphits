import { Box, Text, Grid, GridItem } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import Link from "next/link";
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
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={1}
          rowGap={10}
        >
          {artists.map((artist) => (
            <Link
              key={artist.id}
              href={{
                pathname: "/artist/[id]",
                query: { id: artist.id },
              }}
              passHref
            >
              <GridItem paddingX="10px" cursor="pointer">
                <Box
                  bg="gray.900"
                  borderRadius="4px"
                  padding="15px"
                  width="100%"
                >
                  <Image
                    src="https://placekitten.com/300/300"
                    borderRadius="100%"
                  />
                  <Box marginTop="20px">
                    <Text fontSize="large">{artist.name}</Text>
                    <Text fontSize="x-small">Artist</Text>
                  </Box>
                </Box>
              </GridItem>
            </Link>
          ))}
        </Grid>
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
