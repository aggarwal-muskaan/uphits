import GradientTemplate from "../../components/GradientTemplate";
import { SongsTable } from "../../components/music/SongTable";

import { getBgColor } from "../../lib/utilFunctions";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prismaClient";

export default ({ playlist }) => {
  const color = getBgColor(playlist.id);

  return (
    <GradientTemplate
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientTemplate>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let userId: number;

  // if invalid token, redirect to Login page
  try {
    userId = validateToken(req.cookies.ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id, // or Number(query.id)
      userId,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};
