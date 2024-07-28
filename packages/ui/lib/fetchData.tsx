import { Lang } from "../types";
import axios from "axios";

//--------------- Store Page -----------------
export const fetchStorePageData = async (slug: string) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang = process.env.NEXT_PUBLIC_LG;
  const perpage = 10;

  try {
    const [storeRes, couponsRes, offersRes] =
      // popularStores, popularCoupons, popularOffers
      await Promise.all([
        // store
        axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/store/get?slug=${slug}&country=${country}&lang=${lang}`,
        ), //TODO: select fields
        // coupons
        axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?shop=${slug}&orderby=hotness_desc&country=${country},in&lang=${lang}&page=1&perpage=${perpage}&morefields=views,upvotes,downvotes`,
        ),
        // offers
        axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?shop=${slug}&orderby=hotness_desc&country=${country}&lang=${lang}&page=1&perpage=${perpage}&morefields=views,upvotes,downvotes`,
        ),
        // popularStores
        // axios.get(
        //   `${process.env.NEXT_PUBLIC_BACK_URL}/store/getMany?orderby=views_desc&country=${country}&lang=${lang}&page=1&perpage=2`,
        // ),
        // // popularCoupons
        // axios.get(
        //   `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?country=${country}&page=1&perpage=3`,
        // ),
        // // popularOffers
        // axios.get(
        //   `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?country=${country}&page=1&perpage=3`,
        // ),
      ]);

    if (
      storeRes.status != 200 ||
      couponsRes.status != 200 ||
      offersRes.status != 200
    )
      return null;

    const store = storeRes.data;
    const coupons = couponsRes.data;
    const offers = offersRes.data;

    return { store, coupons, offers };
  } catch (error: any) {
    console.log("error", error.message);
    return null;
  }
};

//--------------- Offer Page -----------------

export const fetchOfferPageData = async (slug: string) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;

  try {
    const offerRes: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_URL}/offer/get`,
      {
        params: {
          slug,
          country,
          morefields: "store,upvotes,downvotes,description",
        },
      },
    );

    if (offerRes.status !== 200) {
      return null;
    }

    return { offer: offerRes.data };
  } catch (error: any) {
    console.log("error", error.message);
    return null;
  }
};
