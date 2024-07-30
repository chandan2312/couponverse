import { getServerSideSitemap } from "next-sitemap";
import { NextResponse } from "next/server";
import axios from "axios";

export const revalidate = 14400;

export async function GET(req, res) {
  //   const pageNo = req.params.page;
  const pageNo = req.url.replace(".xml", "").replace(/.*-/, "");
  const take = 1000;
  const skip = (parseInt(pageNo) - 1) * take;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang = process.env.NEXT_PUBLIC_LG;
  if (!lang || !country) return res.status(404).send("Not found");

  let protocol = "http://";
  if (process.env.NODE_ENV === "production") protocol = "https://";

  let urlsArray = [];
  try {
    // urlsArray = await getSitemapArray(pageNo);
    const offersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getManyMinimal?country=${country}&skip=${skip}&take=${take}`,
    );

    if (!offersRes || offersRes?.status != 200) return [];

    const offers = offersRes?.data;
    if (!offers || offers?.length == 0) return [];

    const urlsArray = offers?.map((item) => {
      return {
        loc: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/offer/${item.slug}`,
        lastmod: new Date(item?.updatedAt).toISOString(),
        changefreq: "weekly",
        priority: 0.9,
      };
    });

    return getServerSideSitemap(urlsArray);
  } catch (error) {
    console.log(error.message);
    return NextResponse.error(error.message, { status: 500 });
  }

  console.log(urlsArray);

  if (!urlsArray) {
    return NextResponse.error("Not found", { status: 404 });
  }
  return getServerSideSitemap(urlsArray);
}
