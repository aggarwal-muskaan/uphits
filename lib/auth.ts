// for protected route-handler

import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "./prismaClient";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const accessToken = req.cookies.ACCESS_TOKEN;

    if (accessToken) {
      let user;

      try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        let id: number;
        if (typeof payload === "string") id = Number(payload);
        else {
          id = payload.exp;
        }
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "Not Authorized." });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorized." });
  };
};
