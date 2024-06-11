import { contentGenerator } from "./contentGenerator"
import {getStorePage} from "../actions/store"
import { correctPath, generateOffer, getProtocol } from "./utils";
import { words } from "../constants/words";

const country = process.env.COUNTRYCODE as string
const lang = process.env.LG as string || "en"
const cpath = correctPath(lang)
const protocol = getProtocol()


export const homeMetaData = () => ({
   title:`${process.env.APP} ${country.toUpperCase()} - ${contentGenerator(
            "homeTitle",
            "",
            lang
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


export const storePageMetaData = async(slug:string) => {

    
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


	const meta =  {
		title: contentGenerator("seoTitle", store.nativeName, lang, theOffer),
		description: contentGenerator(
			"seoDescription",
			store.nativeName,
			lang,
			theOffer,
			offersList,
			0,
			0,
			store?.coupons?.length || 0
		),
		canonical: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${slug}`,
		url: `${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${slug}`,

		locale: lang,
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
      url: `${process.env.CDN_URL}${store.img.replace(/\\/g, "/")}`,
      width: 320,
      height: 320,
      alt: contentGenerator("seoTitle", store.name, lang, theOffer),
    }
  }),
			site_name: process.env.APP,
		},
	};

    return meta
}

export const storeListMetaData = () => {

    const meta = {
		title: `${words.AllStores[lang]} | ${
			process.env.APP
		}`,
		description: `${words.AllStores[lang]} List - ${
			words.ViewAllStores[lang]
		} | ${process.env.APP}`,
		canonical: `${process.env.PROTOCOL}${country}.${process.env.DOMAIN}/stores`,
		url: `${process.env.PROTOCOL}${country}.${process.env.DOMAIN}/stores`,

		locale: lang,
		type: "article",
		openGraph: {
			type: "article",
			article: {
				publishedTime: Date.now(),
				modifiedTime: Date.now(),
				authors: [process.env.DOMAIN as string],
			},
			url: `${process.env.PROTOCOL}${process.env.DOMAIN}/stores`,
			site_name: process.env.APP,
		},
	}

   return meta
}

export const searchPageMetaData = (term:string) => {

    const meta = {

    }

   return meta
}