"use server";
import { z } from "zod";
import { registerSchema } from "../constants/schema";
import prisma from "../lib/db";
import { ip, ipv6 } from "address";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const generateAccessAndRefereshTokens = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    },
  );

  user.refreshToken = refreshToken;

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken };
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

export const register = async (data) => {
  const isRegistered = await checkAlreadyRegistered(data.email);

  let currUser;
  let isNewlyRegistered = false;
  if (!isRegistered.registered) {
    isNewlyRegistered = true;
    currUser = await prisma.user.create({
      data: data,
    });
  } else {
    currUser = isRegistered?.data;
  }

  // data.ip4 = ip();
  // data.ip6 = ipv6();

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    currUser?.id,
  );

  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: ".dealcodie.com",
    sameSite: "None",
  });
  cookies().set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    domain: ".dealcodie.com",
    sameSite: "None",
  });

  return {
    status: 200,
    isNewlyRegistered: isNewlyRegistered,
    data: currUser,
    message: "Successfully Login",
    accessToken,
    refreshToken,
  };
};

export const tokenChecker = async () => {
  const token = cookies().get("accessToken");
  if (!token) {
    return { status: 401, message: "Unauthorized" };
  }
  try {
    const data = jwt.verify(token.value, process.env.ACCESS_TOKEN_SECRET);
    return { status: 200, data };
  } catch (error) {
    console.log(error);
    return { status: 401, message: "Unauthorized" };
  }
};
