import { getServerSideSitemap } from "next-sitemap";
import { getSitemapArray } from "@repo/ui/actions/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 14400;

export async function GET(req, res) {
  //   const pageNo = req.params.page;
  const pageNo = req.url.replace(".xml", "").replace(/.*-/, "");
  const take = 500;
  const skip = (parseInt(pageNo) - 1) * take;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang = process.env.NEXT_PUBLIC_LG;
  if (!lang || !country) return res.status(404).send("Not found");

  let protocol = "http://";
  if (process.env.NODE_ENV === "production") protocol = "https://";

  let urlsArray = [];
  try {
    // urlsArray = await getSitemapArray(pageNo);
    const storesRes = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/store/getManyMinimal?country=${country}&skip=${skip}&take=${take}`,
    );

    if (!storesRes || storesRes?.status != 200) return [];

    const stores = storesRes?.data;
    if (!stores || stores?.length == 0) return [];

    const urlsArray = stores?.map((item) => {
      return {
        loc: `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/coupons/${item.slug}`,
        lastmod: new Date().toISOString(),
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
