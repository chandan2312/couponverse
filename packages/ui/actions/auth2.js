"use server";
import { cookies } from "next/headers";
import prisma from "../lib/db";
import jwt from "jsonwebtoken";

export const decodeAccessToken = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore?.get("accessToken");
    if (!accessToken) return;
    const data = jwt.verify(accessToken.value, process.env.ACCESS_TOKEN_SECRET);

    if (!data) return { status: 401, message: "Unauthorized" };

    let user;
    if (typeof data === "object" && "id" in data) {
      user = await prisma.User.findUnique({
        where: {
          id: data.id,
        },
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          avatar: true,
        },
      });
    }

    if (!user) return { status: 401, data: null, message: "Unauthorized" };
    return { status: 200, data: user, message: "Authorized" };
  } catch (error) {
    return { status: 401, data: null, message: "Unauthorized" };
  }
};

export const checkAlreadyRegistered = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return { registered: true, data: user };
  } else {
    return { registered: false, data: null };
  }
};
