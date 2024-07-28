import { getServerSideSitemapIndex } from "next-sitemap";
import { getSitemapIndexArray } from "@repo/ui/actions/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 14400;

//@ts-ignore
export async function GET(req, res) {
  const country = process.env.NEXT_PUBLIC_COUNTRY;
  const lang = process.env.NEXT_PUBLIC_LANG;
  const storesCount = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/store/getCount?country=${country}`,
  );

  const pageCount = Math.ceil(parseInt(storesCount) / 500);

  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(
      `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/map/v1/store-${i}.xml`,
    );
  }

  if (!pageArray || pageArray?.length === 0)
    return NextResponse.error("Not found", { status: 404 });

  return getServerSideSitemapIndex(pageArray);
}
