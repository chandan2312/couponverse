import { cache } from "react";
import prisma from "../lib/db";
import { correctPath } from "../lib/utils";
import { getStoreCount } from "./store";
import { unstable_cache } from "next/cache";

export const getSitemapArray = unstable_cache(
  async (page) => {
    if (!page) return [];

    let protocol = "http://";
    if (process.env.NODE_ENV === "production") protocol = "https://";

    const country = process.env.COUNTRYCODE;
    const lang = process.env.LG;
    if (!lang || !country) return res.status(404).send("Not found");
    const cPath = correctPath(lang);

    const take = 500;
    const skip = (page - 1) * take;

    console.log("page", page, "skip", skip, "take", take);

    const cachedFetchStores = async (skip, take) => {
      return await prisma.Store.findMany({
        skip,
        take,
        where: {
          access: country,
        },
        select: {
          slug: true,
        },
      });
    };

    const storeRes = await cachedFetchStores(skip, take);

    if (!storeRes || storeRes.length == 0) return [];

    const urlsArray = storeRes.map((item) => {
      return {
        loc: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cPath}/${item.slug}`,
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 0.9,
      };
    });

    return urlsArray;
  },
  {
    revalidate: 60 * 60 * 24,
  },
);

export const getSitemapIndexArray = unstable_cache(
  async () => {
    const country = process.env.COUNTRYCODE;
    const lang = process.env.LG;
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
  },
  {
    revalidate: 60 * 60 * 24,
  },
);
