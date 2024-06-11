"use server";
import dotenv from "dotenv";
import prisma from "../lib/db";

//[]
export const addCategory = async (categories) => {
  //find and add categories

  if (categories.length === 0) {
    return {
      status: 200,
      message: "No categories provided",
      data: 0,
    };
  }

  let result = [];

  try {
    for (let i = 0; i < categories.length; i++) {
      const findCategory = await prisma.Category.findUnique({
        where: {
          slug: categories[i],
        },
      });

      if (!findCategory) {
        const add = await prisma.Category.create({
          data: {
            name: categories[i].replace("-", " "),
            slug: categories[i],
          },
        });
        console.log("add");

        result = [add.slug];
      } else {
        result = [findCategory.slug];
      }
    }

    return {
      status: 200,
      message: "Categories added",
      data: result,
    };
  } catch (error) {
    console.log("error" + error.message);
    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};
