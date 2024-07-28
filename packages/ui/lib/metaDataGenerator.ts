import { contentGenerator } from "./contentGenerator";
import { getStorePage } from "../actions/store";
import { correctPath, generateOffer, getProtocol } from "./utils";
import { words } from "../constants/words";
import { Lang } from "../types";

const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
const cpath = correctPath(lang);
const protocol = getProtocol();

export const homeMetaData = () => ({
  title: `${process.env.APP} ${country.toUpperCase()} - ${contentGenerator(
    "homeTitle",
    "",
    lang,
  )}`,
  description: contentGenerator("homeDescription", "", lang),
  canonical: `${process.env.PROTOCOL}${process.env.DOMAIN}`,
  url: `${process.env.PROTOCOL}${process.env.DOMAIN}`,

  locale: process.env.HTML_LANG,
  type: "article",
  openGraph: {
    type: "article",
    article: {
      publishedTime: Date.now(),
      modifiedTime: Date.now(),
      authors: [process.env.DOMAIN as string],
    },
    url: `${process.env.PROTOCOL}${process.env.DOMAIN}`,
    site_name: process.env.APP,
  },
});

//--------------------- Store Page ---------------------//
export const storePageMetaData = async (slug: string) => {
  const response = await getStorePage(slug, lang, country);
  const store = response.data;
  let theOffer;

  if (store?.coupons?.length > 0) {
    theOffer = generateOffer(store.coupons, store.nativeName, lang);
  }

  const d = new Date();

  const offersList =
    store?.coupons
      ?.slice(0, 3)
      ?.map((coupon: any) => coupon.offer)
      .join(", ") || "";

  const couponCount = store.coupons?.filter((item: any) => item.type == "CODE");
  const dealCount = store.coupons?.filter((item: any) => item.type == "DEAL");

  const meta = {
    title: contentGenerator(
      "seoTitle",
      store.nativeName,
      lang,
      theOffer,
      "",
      store.coupons?.length,
    ),
    description: contentGenerator(
      "seoDescription",
      store.nativeName,
      lang,
      theOffer,
      offersList,
      couponCount,
      dealCount,
      store?.coupons?.length || 0,
    ),
    canonical: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${slug}`,
    url: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${slug}`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: store.createdAt,
        modifiedTime: store.updatedAt,
        authors: ["dealcodie"],
      },
      url: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${slug}`,
      ...(store.img && {
        images: {
          url: `${process.env.NEXT_PUBLIC_CDN_URL}${store.img.replace(/\\/g, "/")}`,
          width: 320,
          height: 320,
          alt: contentGenerator(
            "seoTitle",
            store.name,
            lang,
            theOffer,
            store.coupons?.length,
          ),
        },
      }),
      site_name: process.env.APP,
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
    title: `${words.AllStores[lang]} | ${process.env.APP}`,
    description: `${words.AllStores[lang]} List - ${words.ViewAllStores[lang]} | ${process.env.APP}`,
    canonical: `${process.env.PROTOCOL}${country}.${process.env.DOMAIN}/stores/all`,
    url: `${process.env.PROTOCOL}${country}.${process.env.DOMAIN}/stores/all`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: Date.now(),
        modifiedTime: Date.now(),
        authors: [process.env.DOMAIN as string],
      },
      url: `${process.env.PROTOCOL}${process.env.DOMAIN}/stores/all`,
      site_name: process.env.APP,
    },
  };

  return meta;
};

export const searchPageMetaData = (term: string) => {
  const meta = {};

  return meta;
};
