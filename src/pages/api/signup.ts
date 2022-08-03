import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

import { User } from "@prisma/client";
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
    const salt = bcrypt.genSaltSync();
    const { email, password, firstName } = req.body;

    let user: User;

    try {
      user = await prisma.user.create({
        data: {
          firstName,
          email,
          password: bcrypt.hashSync(password, salt),
        },
      });
    } catch (e) {
      const dataObj = errorResponse({
        code: 401,
        message: "User already exists",
      });
      res.json(dataObj);
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        time: Date.now(),
      },
      process.env.JWT_SECRET_KEY || "hello-test",
      { expiresIn: "8h" }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 36 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    const dataObj = successResponse({
      code: 200,
      message: "Successfully signed up!",
      result: { profileName: user.firstName, email: user.email },
    });
    res.json(dataObj);
  }
};
