"use server";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
import prisma from "../lib/db";

export const sendTelegramNotification = async (message) => {
  const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
    polling: false,
  });

  const chatId = process.env.TELEGRAM_CHAT_ID;

  const { sendMessage, error } = await bot.sendMessage(chatId, message);

  if (error) {
    console.error("Error sending message:", error);
    return { error: error.message };
  } else {
    console.log("Message sent:", sendMessage);
    return { status: 200, message: sendMessage };
  }
};

//todo: add pagination
export const getSearch = async (search, lang) => {
  if (!search) return { status: 400, message: "No search query", data: 0 };

  if (search.length < 3)
    return { status: 400, message: "Search query too short", data: 0 };

  const searchResult = await prisma.store.findMany({
    where: {
      OR: [{ name: { contains: search } }, { slug: { contains: search } }],

      // access: country,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      img: true,
      link: true,
      affLink: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return { status: 200, data: searchResult, message: "Search result" };
};
