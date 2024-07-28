import { contentGenerator } from "./contentGenerator";
//@ts-ignore
import { getStorePage } from "../actions/store";
import { correctPath, generateOffer, getProtocol } from "./utils";
//@ts-ignore
import { words } from "../constants/words";
import { Lang } from "../types";

const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
const cpath = correctPath(lang);
const protocol = getProtocol();

export const homeMetaData = () => ({
  title: `${process.env.NEXT_PUBLIC_APP} ${country.toUpperCase()} - ${contentGenerator(
    "homeTitle",
    "",
    lang,
  )}`,
  description: contentGenerator("homeDescription", "", lang),
  canonical: `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}`,
  url: `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}`,

  locale: process.env.NEXT_PUBLIC_HTML_LANG,
  type: "article",
  openGraph: {
    type: "article",
    article: {
      publishedTime: Date.now(),
      modifiedTime: Date.now(),
      authors: [process.env.NEXT_PUBLIC_DOMAIN as string],
    },
    url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}`,
    site_name: process.env.NEXT_PUBLIC_APP,
  },
});

//--------------------- Store Page ---------------------//
export const storePageMetaData = async (data: any) => {
  console.log(data.store);
  const d = new Date();

  const offersList =
    data.store?.coupons
      ?.slice(0, 3)
      ?.map((coupon: any) => coupon.offer)
      .join(", ") || "";

  const couponCount = data?.store?._count?.coupons || 0;
  const dealCount = data?.store?._count?.offers || 0;

  const meta = {
    title: contentGenerator(
      "seoTitle",
      data.store.nativeName,
      lang,
      "",
      "",
      couponCount + dealCount,
    ),
    description: contentGenerator(
      "seoDescription",
      data.store.nativeName,
      lang,
      // theOffer,
      offersList,
      couponCount,
      dealCount,
      couponCount || 0,
    ),
    canonical: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/coupons/${data.store.slug}`,
    url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/coupons/${data.store.slug}`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: data.store.createdAt,
        modifiedTime: data.store.updatedAt,
        authors: ["couponverse"],
      },
      url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/coupons/${data.store.slug}`,
      ...(data.store.img && {
        images: {
          url: `${process.env.NEXT_PUBLIC_CDN_URL}${data.store.img.replace(/\\/g, "/")}`,
          width: 320,
          height: 320,
          alt: contentGenerator(
            "seoTitle",
            data.store.nativeName,
            lang,
            // theOffer,
            data?.store?._count?.coupons,
          ),
        },
      }),
      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };

  return meta;
};

//--------------------- Store Page ---------------------//
export const offerPageMetaData = async (slug: string) => {
  const meta = {};

  return meta;
};

export const storeListMetaData = () => {
  const meta = {
    title: `${words.AllStores[lang]} | ${process.env.NEXT_PUBLIC_APP}`,
    description: `${words.AllStores[lang]} List - ${words.ViewAllStores[lang]} | ${process.env.NEXT_PUBLIC_APP}`,
    canonical: `${process.env.PROTOCOL}${country}.${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,
    url: `${process.env.PROTOCOL}${country}.${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: Date.now(),
        modifiedTime: Date.now(),
        authors: [process.env.NEXT_PUBLIC_DOMAIN as string],
      },
      url: `${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,
      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };

  return meta;
};

export const searchPageMetaData = (term: string) => {
  const meta = {};

  return meta;
};
