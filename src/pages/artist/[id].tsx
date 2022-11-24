import GradientTemplate from "../../components/GradientTemplate";
import { SongsTable } from "../../components/music/SongTable";

import { getBgColor } from "../../lib/utilFunctions";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prismaClient";
import { GetServerSideProps } from "next";
import { TArtistCollection } from "../../types";

interface Props {
  collection: TArtistCollection;
}

export default ({ collection }: Props) => {
  const color = getBgColor(collection.id);

  const songs = collection.song.map((el) => ({
    ...el,
    artist: { name: collection.name, id: collection.id },
  }));

  return (
    <GradientTemplate
      color={color}
      roundImage={false}
      title={collection.name}
      subtitle="collection"
      description={`${collection.song.length} songs`}
      image={`https://picsum.photos/400?random=${collection.id}`}
    >
      <SongsTable songs={songs} />
    </GradientTemplate>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
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

  const [collection] = await prisma.artist.findMany({
    where: {
      id: Number(query.id),
    },
    include: {
      song: {},
    },
  });

  if (collection === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: { collection },
  };
};
