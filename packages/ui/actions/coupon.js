"use server";
import dotenv from "dotenv";
import prisma from "../lib/db";
import translate from "google-translate-api-x";
import {
  countryWiseWords,
  englishCountries,
  flattenCountryWiseWords,
} from "../constants/index.js";
dotenv.config({ path: "@ui/.env" });
import { unstable_cache } from "next/cache";
import filterCoupons from "../lib/filterCoupons";

//---------------- GENERAL FUNCTIONS ----------------//

export const getCoupons = unstable_cache(
  async (condition, fields, orderBy, page, perPage) => {
    let skip = 0;
    if (page == 2) {
      skip = 2;
    } else {
      skip = (page - 1) * perPage || 0;
    }
    const take = perPage || 10;

    try {
      const coupons = await prisma.Coupon.findMany({
        where: condition,
        ...(fields && { select: fields }),
        ...(orderBy && { orderBy: orderBy }),
        skip,
        take,
      });

      const totalCount = await prisma.Coupon.count({
        where: condition,
      });

      const filtered = filterCoupons(coupons);

      return filtered;
    } catch (error) {
      console.log(error.message);

      return null;
    }
  },
  {
    revalidate: 60 * 60 * 24 * 3, // TODO: set
  },
);

export const getCoupon = async (condition, fields) => {
  try {
    const coupon = await prisma.Coupon.findUnique({
      where: condition,
      select: fields,
    });

    return coupon;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const deleteCoupon = async (dealId) => {
  try {
    const coupon = await prisma.Coupon.delete({
      where: {
        id: dealId,
      },
    });

    return coupon;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const updateCoupon = async (condition, data, fields) => {
  try {
    const coupon = await prisma.Coupon.update({
      where: condition,
      data: data,
      select: fields,
    });

    return coupon;
  } catch (error) {
    console.log(error.message);

    return null;
  }
};

export const addCoupon = async (data, fields) => {
  try {
    const coupon = await prisma.Coupon.create({
      data: data,
      select: fields,
    });

    return coupon;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//---------------- SPECIAL PURPOSE FUNCTIONS ----------------//

//TODO: recheck
export const checkExistingCoupon = async (obj) => {
  try {
    const checkedDeal = await prisma.Coupon.findFirst({
      where: {
        OR: [
          {
            shop: obj.shop,
            code: obj.code,
            type: "CODE",
          },
          {
            shop: obj.shop,
            offer: obj.offer,
            type: "DEAL",
          },
          {
            shop: obj.shop,
            offer: obj.offer,
            type: "DEAL",
            sourceTitle: obj.sourceTitle,
          },
        ],
      },
    });

    if (checkedDeal == null) {
      return { status: 200, message: "Deal Not Exist", data: 0 };
    } else {
      return { status: 200, message: "Deal Exist", data: checkedDeal };
    }
  } catch (error) {
    console.log(error.message);
    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const addCoupons = async (deals, slug) => {
  try {
    const checkDuplicatePromises = await deals?.map(async (item) => {
      const checkCouponRes = await prisma.Coupon.findMany({
        where: {
          code: item.code || "",
          offer: item.offer || "",
          type: item.type || "DEAL",
          shop: item.shop,
        },
      });

      return checkCouponRes?.length > 0;
    });

    const hasDuplicates = await Promise.all(checkDuplicatePromises);

    if (hasDuplicates.some((duplicate) => duplicate)) {
      return {
        status: 200,
        message: "No New Coupons Added",
        data: 0,
      };
    }

    const addedDeals = await Promise.all(
      deals?.map(async (item) => {
        const addDealsRes = await prisma.Coupon.create({
          data: {
            sourceTitle: item.sourceTitle || "",
            title: item.title || "",
            sourceDescription: item.sourceDescription || "",
            description: item.description || "",
            shop: item.shop,
            offer: item.offer || "",
            code: item.code || "",
            type: item.type || "DEAL",
            isVerified: item.isVerified || false,
            isExpired: item.isExpired || false,
            expiryDate: item.expiryDate || "",
            isSpinned: item.isSpinned || false,

            votes: item.votes || 0,
            rating: item.rating || 0,
            views: item.views || 0,
            usedToday: 0,
            useHistory: "[]",
            lastClickTime: new Date(),
            scrapeUrl: item.scrapeUrl || "",
            scrapeSite: item.scrapeSite || "",
            terms: item.terms || "",
            status: item.status || "DRAFT",
            store: {
              connect: {
                slug: slug,
              },
            },
          },
        });

        // add deal id to store model

        const updatedStore = await prisma.Store.update({
          where: {
            slug: slug,
          },
          data: {
            coupons: {
              connect: {
                id: addDealsRes.id,
              },
            },
          },
        });

        return addDealsRes;
      }),
    );

    const length = addedDeals?.filter((item) => item != null)?.length || 0;
    return {
      status: 200,
      message: `New ${length} Coupons Added Successfully ✅`,
      data: length,
    };
  } catch (error) {
    console.log(error);
    if (
      error.message.includes("invocation") ||
      error.message.includes("properties of ")
    ) {
      return {
        status: 500,
        message: error.message,
        data: 0,
      };
    }

    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const getTrendingCoupons = unstable_cache(
  async (country) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const countryWords = countryWiseWords[country];
    const filteredWords = flattenCountryWiseWords?.filter(
      (word) => !countryWords?.includes(word),
    );
    try {
      let result = await prisma.coupon.aggregateRaw({
        pipeline: [
          // {
          // 	$unwind: "$viewsRecord",
          // },
          {
            $match: {
              type: "CODE",
            },
          },
          // // Match records where viewsRecord.time is within the last 7 days
          // {
          // 	$match: {
          // 		"viewsRecord.time": { $gte: sevenDaysAgo },
          // 	},
          // },
          // // Group by store id and count the number of views
          // {
          // 	$group: {
          // 		_id: "$_id",
          // 		name: { $first: "$name" }, // Keep store name
          // 		viewCount: { $sum: 1 },
          // 	},
          // },
          // // Sort by viewCount in descending order
          // {
          // 	$sort: { viewCount: -1 },
          // },
          {
            $match: {
              type: "CODE",
            },
          },
          {
            $sort: { views: -1 },
          },
          // Limit to the top 10 stores
          {
            $limit: 12,
          },
          {
            $lookup: {
              from: "Store",
              localField: "storeID",
              foreignField: "_id",
              as: "store",
            },
          },
          // Unwind the store array (because $lookup produces an array)
          {
            $unwind: "$store",
          },
          // Select only the fields you want

          {
            $project: {
              _id: 1,
              sourceTitle: 1,
              title: 1,
              englishTitle: 1,
              sourceDescription: 1,
              description: 1,
              shop: 1,
              offer: 1,
              englishOffer: 1,
              code: 1,
              type: 1,
              isVerified: 1,
              isExpired: 1,
              expiryDate: 1,
              votes: 1,
              rating: 1,
              views: 1,
              viewsRecord: 1,
              voteHistory: 1,
              terms: 1,
              store: {
                _id: 1,
                nativeName: 1,
                slug: 1,
                img: 1,
                views: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          },
        ],
      });

      const newCoupons = result?.filter((coupon) => {
        return !filteredWords.some(
          (word) =>
            coupon.englishTitle.toLowerCase().includes(word.toLowerCase()) ||
            coupon.englishOffer.toLowerCase().includes(word.toLowerCase()),
        );
      });

      return {
        status: 200,
        message: "Trending coupons",
        data: newCoupons,
      };
    } catch (error) {
      console.log(error);

      return {
        status: 500,
        message: error.message,
        data: 0,
      };
    }
  },
  {
    revalidate: 60 * 60 * 24 * 3, // 3 days
  },
);

export const getPopularCoupons = unstable_cache(
  async (country) => {
    try {
      const topStores = await prisma.Store.findMany({
        where: {
          popularity: 1,
          access: country,
        },
        select: {
          id: true,
          slug: true,
        },
      });

      // only pick random 8 stores
      const randomStores = topStores
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

      const storeIds = randomStores?.map((store) => store.id);

      const coupons = await prisma.Coupon.findMany({
        where: {
          storeID: {
            in: storeIds,
          },
          type: "CODE",
          isExpired: false,
        },
        select: {
          sourceTitle: true,
          title: true,
          englishTitle: true,
          sourceDescription: true,
          description: true,
          shop: true,
          offer: true,
          englishOffer: true,
          code: true,
          type: true,
          isVerified: true,
          isExpired: true,
          expiryDate: true,
          votes: true,
          rating: true,
          views: true,
          viewsRecord: true,
          voteHistory: true,
          terms: true,
          store: {
            select: {
              slug: true,
              nativeName: true,
              img: true,
            },
          },
        },
      });

      //TODO: find best coupon from each store
      const bestCoupons = coupons.reduce((acc, coupon) => {
        if (!acc[coupon.store.slug]) {
          acc[coupon.store.slug] = coupon;
        } else {
          if (coupon.views > acc[coupon.store.slug].views) {
            acc[coupon.store.slug] = coupon;
          }
        }
        return acc;
      }, {});

      return Object.values(bestCoupons);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  },
  {
    revalidate: 60 * 60 * 24 * 3, // 3 days
  },
);
