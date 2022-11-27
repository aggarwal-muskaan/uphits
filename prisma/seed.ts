import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./artistsData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (ar) => {
      return prisma.artist.upsert({
        where: { name: ar.name },
        update: {},
        create: {
          name: ar.name,
          image: ar.image,
          song: {
            create: ar.songs.map((s) => ({
              name: s.name,
              duration: s.duration,
              url: s.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "test@gmail.com" },
    update: {},
    create: {
      email: "test@gmail.com",
      password: bcrypt.hashSync("password", salt),
      firstName: "User Emma",
    },
  });

  const songs = await prisma.song.findMany({});
  let end = 0;
  const size = songs.length / 3;
  await Promise.all(
    new Array(3).fill(1).map(async (_, i) => {
      const start = size * i;
      end += size - 1;
      const slicedArray = songs.slice(start, end + 1);
      return prisma.playlist.create({
        data: {
          name: `Playlist ${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: slicedArray.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
