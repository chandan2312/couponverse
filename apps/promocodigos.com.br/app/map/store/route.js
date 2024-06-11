import { getServerSideSitemapIndex } from "next-sitemap";
import { getSitemapIndexArray } from "@repo/ui/actions/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 14400;

//@ts-ignore
export async function GET(req, res) {
  const pageArray = await getSitemapIndexArray();

  console.log("pageArray");
  console.log(pageArray);

  if (!pageArray || pageArray.length === 0)
    return NextResponse.error("Not found", { status: 404 });

  return getServerSideSitemapIndex(pageArray);
}
