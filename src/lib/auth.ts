// for protected route-handler

import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { errorResponse } from "./apiResponseStructure";

import prisma from "./prismaClient";

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const accessToken = req.cookies.ACCESS_TOKEN;
    if (accessToken) {
      let user: User;

      try {
        const payload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        let id: number;
        if (typeof payload === "string") id = Number(payload);
        else {
          id = payload.id;
        }
        user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        console.log(error);
        const dataObj = errorResponse({
          code: 401,
          message: "Not Authorized.",
        });
        res.json(dataObj);
        return;
      }

      return handler(req, res, user);
    }
    const dataObj = errorResponse({
      code: 401,
      message: "Not Authorized",
    });
    res.json(dataObj);
  };
};
