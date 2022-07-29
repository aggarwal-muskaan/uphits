import { validateRoute } from "../../lib/auth";
import prismaClient from "../../lib/prismaClient";
import { successResponse } from "../../lib/apiResponseStructure";

export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prismaClient.playlist.count({
    where: {
      userId: user.id,
    },
  });

  const dataObj = successResponse({
    code: 200,
    message: "Successfully fetch user info!",
    result: { ...user, playlistsCount },
  });
  res.json(dataObj);
});
