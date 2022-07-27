import { successResponse } from "../../lib/apiResponseStructure";
import prismaClient from "../../lib/prismaClient";
import { validateRoute } from "../../lib/auth";

export default validateRoute(async (req, res, user) => {
  const playlists = await prismaClient.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  const dataObj = successResponse({
    code: 200,
    message: "Playlists fetched successfully .",
    result: playlists,
  });
  res.json(dataObj);
});
