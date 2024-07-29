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
    {
      type: "homeTitle",
    },
  )}`,
  description: contentGenerator({ type: "homeDescription" }),
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
  const d = new Date();

  const offersList =
    data.store?.coupons
      ?.slice(0, 3)
      ?.map((coupon: any) => coupon.offer)
      .join(", ") || "";

  const couponCount = data?.store?._count?.coupons || 0;
  const offerCount = data?.store?._count?.offers || 0;
  const percentage = generateOffer(data.coupons, data.store.nativeName);

  const meta = {
    title: contentGenerator({
      type: "seoTitle",
      name: data.store.nativeName,
      percentage: percentage,
      count: couponCount + offerCount,
    }),
    description: contentGenerator({
      type: "seoDescription",
      name: data.store.nativeName,

      couponCount: couponCount,
      offerCount: offerCount,
      count: couponCount || 0,
    }),
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
          alt: contentGenerator({
            type: "seoTitle",
            name: data.store.nativeName,
            couponCount: data?.store?._count?.coupons,
          }),
        },
      }),
      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };

  return meta;
};

//--------------------- Store Page ---------------------//
export const offerPageMetaData = async (data: any, storeName?: string) => {
  const d = new Date();

  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;

  const name = storeName
    ? storeName
    : data.offer.store
      ? data.offer.store.nativeName.find(
          (el: any) => Object.keys(el)[0] == lang,
        )?.[lang]
      : "";

  const meta = {
    title: `${data.offer.title} | ${name} | ${process.env.NEXT_PUBLIC_APP}`,
    description: data.offer?.description,
    canonical: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/offer/${data.offer.slug}`,
    url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/offer/${data.offer.slug}`,

    locale: process.env.NEXT_PUBLIC_HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: data.offer.createdAt,
        modifiedTime: data.offer.updatedAt,
        authors: ["couponverse"],
      },
      url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/offer/${data.offer.slug}`,
      ...(data.offer.img && {
        images: {
          url: `${process.env.NEXT_PUBLIC_CDN_URL}${data.offer.img.replace(/\\/g, "/")}`,
          width: 320,
          height: 320,
          alt: contentGenerator({ type: "seoTitle" }),
        },
      }),
      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };

  return meta;
};

export const storeListMetaData = () => {
  const lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;
  const meta = {
    title: `${words.AllStores[lang]} | ${process.env.NEXT_PUBLIC_APP}`,
    description: `${words.AllStores[lang]} List - ${words.ViewAllStores[lang]} | ${process.env.NEXT_PUBLIC_APP}`,
    canonical: `${process.env.NEXT_PUBLIC_PROTOCOL}${country}.${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,
    url: `${process.env.NEXT_PUBLIC_PROTOCOL}${country}.${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,

    locale: process.env.NEXT_PUBLIC_HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: Date.now(),
        modifiedTime: Date.now(),
        authors: [process.env.NEXT_PUBLIC_DOMAIN as string],
      },
      url: `${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/stores/all`,
      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };

  return meta;
};

export const searchPageMetaData = (term: string) => {
  const meta = {};

  return meta;
};
