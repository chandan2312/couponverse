import { getServerSideSitemapIndex } from "next-sitemap";
import axios from "axios";

export const revalidate = 14400;

//@ts-ignore
export async function GET(req, res) {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang = process.env.NEXT_PUBLIC_LG;
  const offerCountRes = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getCount?country=${country}`,
  );

  const offersCount = offerCountRes?.data;

  const pageCount = Math.ceil(parseInt(offersCount) / 1000);

  const pageArray = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArray.push(
      `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/map/v1/offer-${i}.xml`,
    );
  }

  // if (!pageArray || pageArray?.length === 0)
  //   return NextResponse.error("Not found", { status: 404 });

  return getServerSideSitemapIndex(pageArray);
}
