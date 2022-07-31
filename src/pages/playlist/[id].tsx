import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prismaClient";

export default ({ playlist }) => {
  return <div>{playlist.songs[3].artist.name}</div>;
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
