import { getServerSideSitemap } from "next-sitemap";
import { getSitemapArray } from "@repo/ui/actions/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 14400;

export async function GET(req, res) {
  //   const pageNo = req.params.page;
  const pageNo = req.url.replace(".xml", "").replace(/.*-/, "");

  let urlsArray = [];
  try {
    urlsArray = await getSitemapArray(pageNo);
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
