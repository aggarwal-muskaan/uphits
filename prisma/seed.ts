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
    where: { email: "test@yopmail.com" },
    update: {},
    create: {
      email: "user@test.com",
      password: bcrypt.hashSync("password", salt),
      firstName: "Scott",
      lastName: "Moss",
    },
  });

  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
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
