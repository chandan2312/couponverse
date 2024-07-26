"use server";
// import { cookies } from "next/headers";
import prisma from "../lib/db";
import jwt from "jsonwebtoken";
// import { signIn, signOut } from "../lib/auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

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

export const mySignIn = async (provider) => {
  const res = await signIn(provider);
  return res;
};

export const mySignOut = async (provider) => {
  const res = await signOut();
  return res;
};

console.log("client token", process.env.AUTH_GOOGLE_ID);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});
