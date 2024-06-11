import { cache } from "react";
import prisma from "../lib/db";
import { correctPath } from "../lib/utils";
import { getStoreCount } from "./store";

export const getSitemapArray = async (page) => {
  if (!page) return [];

  let protocol = "http://";
  if (process.env.NODE_ENV === "production") protocol = "https://";

  const country = process.env.COUNTRYCODE;
  const lang = process.env.LANG;
  if (!lang || !country) return res.status(404).send("Not found");
  const cPath = correctPath(lang);

  const take = 500;
  const skip = (page - 1) * take;

  const cachedFetchStores = cache(async (skip, take) => {
    return await prisma.Store.findMany({
      skip,
      take,
      where: {
        access: {
          hasSome: ["global", country],
        },
      },
      select: {
        slug: true,
      },
    });
  });

  const storeRes = await cachedFetchStores(skip, take);
  //TODO: list coming empty from db call

  if (!storeRes || !storeRes.length == 0) return [];

  console.log("storeRes");
  console.log(storeRes);

  const urlsArray = storeRes.map((item) => {
    return {
      loc: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cPath}/${item.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.9,
    };
  });

  console.log(urlsArray);

  return urlsArray;
};

export const getSitemapIndexArray = async () => {
  const country = process.env.COUNTRYCODE;
  const lang = process.env.LANG;
  let protocol = "http://";
  if (process.env.NODE_ENV === "production") protocol = "https://";

  let storeCount;
  try {
    storeCount = await getStoreCount(country);
  } catch (error) {
    console.log(error.message);
    return [];
  }

  const pageCount = Math.ceil(storeCount / 500);

  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(
      `${process.env.PROTOCOL}${process.env.DOMAIN}/map/store-${i}.xml`,
    );
  }

  return pageArray;
};
