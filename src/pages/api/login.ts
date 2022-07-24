import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

import prisma from "../../lib/prismaClient";
import { successResponse, errorResponse } from "../../lib/apiResponseStructure";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    const dataObj = errorResponse({
      code: 422,
      message: "Invalid request.",
    });
    res.json(dataObj);
  } else {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          time: Date.now(),
        },
        process.env.JWT_SECRET_KEY || "hello-test",
        { expiresIn: "8h" }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("ACCESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      );
      const dataObj = successResponse({
        code: 200,
        message: "Successfully logged in!",
        result: { profileName: user.firstName, email: user.email },
      });
      res.json(dataObj);
    } else {
      const dataObj = errorResponse({
        code: 401,
        message: "Invalid Email or Password.",
      });
      res.json(dataObj);
    }
  }
};
