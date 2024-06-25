"use server";
import { addCategory } from "./category.js";
import prisma from "../lib/db";
import translate from "google-translate-api-x";
import {
  countryWiseWords,
  englishCountries,
  flattenCountryWiseWords,
} from "../constants";
import { checkEnglishCountryArray } from "../lib/utils";
import { unstable_cache } from "next/cache";
import filterCoupons from "../lib/filterCoupons";

export const getStoreCount = unstable_cache(
  async (country) => {
    return await prisma.store.count({
      where: {
        access: {
          hasSome: ["global", country],
        },
      },
    });
  },
  {
    revalidate: 60 * 60 * 24,
  },
);

export const getStoreList = unstable_cache(
  async (country, take, skip) => {
    try {
      const dataRaw = await prisma.store.findMany({
        where: {
          access: {
            hasSome: ["global", country],
          },
        },
        select: {
          slug: true,
          name: true,
          nativeName: true,
          coupons: {
            select: {
              id: true,
            },
          },
        },
        take: 500,
        skip: skip,
      });

      const data = dataRaw.filter((store) => store.coupons.length > 0);

      return {
        status: 200,
        message: "Stores List",
        data: data,
      };
    } catch (error) {
      console.log("GetStoreList fn error");
      console.log(error.message);

      return {
        status: 500,
        message: error.message,
        data: 0,
      };
    }
  },
  {
    revalidate: 60 * 60 * 4,
  },
);

export const getStorePage = unstable_cache(
  async (slug, lang, country) => {
    const countryWords = countryWiseWords[country];
    const filteredWords = flattenCountryWiseWords?.filter(
      (word) => !countryWords?.includes(word),
    );
    try {
      const store = await prisma.store.findUnique({
        where: {
          slug: slug,
        },

        include: {
          coupons: {
            select: {
              id: true,
              title: true,
              code: true,
              offer: true,
              type: true,
              expiryDate: true,
              isExpired: true,
              isVerified: true,
              views: true,
              viewsRecord: true,
              voteHistory: true,
              terms: true,
              user: true,
            },
          },

          category: {
            select: {
              id: true,
              name: true,
              slug: true,
              stores: false,
            },
          },
        },
      });

      store.coupons = filterCoupons(store.coupons);

      if (!store || store.coupons.length === 0) {
        return {
          status: 404,
          message: "Store Not Found",
          data: 0,
        };
      }

      if (!country) {
        return {
          status: 404,
          message: "Country not defined",
          data: 0,
        };
      }

      if (country && !store.access.includes(country)) {
        return {
          status: 404,
          message: "Store Not Found",
          data: 0,
        };
      }

      // similarcoupons

      const rawSimilarCoupons = await prisma.store.aggregateRaw({
        pipeline: [
          {
            $match: {
              access: {
                $in: ["global", country],
              },
            },
          },
          {
            $sample: { size: 18 },
          },
          // Lookup coupons associated with the store
          {
            $lookup: {
              from: "Coupon",
              localField: "_id",
              foreignField: "storeID",
              as: "coupons",
            },
          },
          // Filter coupons array to include only those with type "CODE"
          {
            $addFields: {
              coupons: {
                $filter: {
                  input: "$coupons",
                  as: "coupon",
                  cond: { $eq: ["$$coupon.type", "CODE"] },
                },
              },
            },
          },
          // Add a field to each coupon to count the viewsRecord entries in the last 7 days
          {
            $addFields: {
              coupons: {
                $map: {
                  input: "$coupons",
                  as: "coupon",
                  in: {
                    $mergeObjects: [
                      "$$coupon",
                      {
                        viewsRecordCount: {
                          $size: {
                            $filter: {
                              input: "$$coupon.viewsRecord",
                              as: "record",
                              cond: {
                                $gte: [
                                  "$$record.time",
                                  new Date(
                                    new Date().setDate(
                                      new Date().getDate() - 7,
                                    ),
                                  ),
                                ],
                              },
                            },
                          },
                        },
                        store: "$$ROOT",
                      },
                    ],
                  },
                },
              },
            },
          },
          {
            $unwind: {
              path: "$coupons",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $sort: {
              "coupons.viewsRecordCount": -1,
            },
          },
          // Group by store ID to get the best coupon for each store
          {
            $group: {
              _id: "$_id",
              bestCoupon: { $first: "$coupons" },
            },
          },
          // Project only the bestCoupon field
          {
            $project: {
              _id: 0,
              bestCoupon: 1,
            },
          },
        ],
      });

      let similarOffersSeen = new Set();

      store.similarCoupons = rawSimilarCoupons
        .filter((item) => item.bestCoupon)
        .map(({ bestCoupon }) => ({
          _id: bestCoupon._id,
          title: bestCoupon.title,
          description: bestCoupon.description,
          offer: bestCoupon.offer,
          type: bestCoupon.type,
          code: bestCoupon.code,
          expiryDate: bestCoupon.expiryDate,
          isExpired: bestCoupon.isExpired,
          isVerified: bestCoupon.isVerified,
          views: bestCoupon.views,
          votes: bestCoupon.votes,
          viewsRecord: bestCoupon.viewsRecord,

          store: {
            _id: bestCoupon.store._id,
            name: bestCoupon.store.name,
            nativeName: bestCoupon.store.nativeName,
            img: bestCoupon.store.img,
            slug: bestCoupon.store.slug,
            link: bestCoupon.store.link,
            affLink: bestCoupon.store.affLink,
          },
        }))
        .filter((coupon) => {
          return !filteredWords.some(
            (word) =>
              coupon.title.toLowerCase().includes(word.toLowerCase()) ||
              coupon.offer.toLowerCase().includes(word.toLowerCase()),
          );
        })
        .filter((coupon) => {
          const off = coupon.offer
            .toLowerCase()
            ?.replace("upto ", "")
            ?.replace("Upto ", "")
            ?.replace("Up to ", "")
            ?.replace("up to ", "");
          let duplicate = similarOffersSeen.has(off);
          similarOffersSeen.add(off);
          return !duplicate;
        })
        .slice(0, 6);

      // similarstores

      store.similarStores = await prisma.store.aggregateRaw({
        pipeline: [
          // Match stores with viewsRecord conditions
          // {
          // 	$match: {
          // 		"viewsRecord.time": {
          // 			$gte: new Date(new Date().setDate(new Date().getDate() - 7)),
          // 		},
          // 	},
          // },
          // // Group by store and count records with time fresher than 7 days
          // {
          // 	$group: {
          // 		_id: "$_id",
          // 		viewsCount: {
          // 			$sum: {
          // 				$cond: {
          // 					if: {
          // 						$gte: [
          // 							"$viewsRecord.time",
          // 							new Date(new Date().setDate(new Date().getDate() - 7)),
          // 						],
          // 					},
          // 					then: 1,
          // 					else: 0,
          // 				},
          // 			},
          // 		},
          // 	},
          // },
          // Filter stores with at least 10 recent views
          {
            $match: {
              access: {
                $in: ["global", country],
              },
            },
          },
          {
            $match: {
              views: { $gte: 1 },
            },
          },
          {
            $sample: { size: 12 },
          },
          {
            $lookup: {
              from: "Coupon",
              localField: "_id",
              foreignField: "storeID",
              as: "coupons",
            },
          },
          {
            $addFields: {
              couponCount: { $size: "$coupons" },
            },
          },
          {
            $match: {
              couponCount: { $gt: 1 },
            },
          },
          // Project to include only necessary fields
          {
            $project: {
              _id: 1,
              name: 1,
              nativeName: 1,
              link: 1,
              affLink: 1,
              img: 1,
              sourceImg: 1,
              slug: 1,
              couponCount: 1,
              coupons: {
                _id: 1,
                sourceTitle: 1,
                title: 1,
                offer: 1,
                type: 1,
                expiryDate: 1,
                isExpired: 1,
                isVerified: 1,
                views: 1,
              },
            },
          },
        ],
      });

      if (!country) {
        return {
          status: 200,
          message: "Store Found",
          data: store,
        };
      }

      // ----------------------------- TRANSLATION ----------------------------//

      // 1) Translate Store description & offer

      const storeData = [store.name, store.description, store.bestOffer];

      const couponsData = store.coupons
        ?.map((item) => {
          return [item.title, item.description, item.offer];
        })
        ?.flat()
        ?.map((item) => (item === undefined ? "" : item));

      const similarCouponsData = store.similarCoupons
        ?.map((item) => {
          return [item.title, item.description, item.offer];
        })
        ?.flat()
        ?.map((item) => (item === undefined ? "" : item));
      //TODO: translate with proxy
      const [
        translatedStoreData,
        translatedCouponsData,
        translatedSimilarCouponsData,
      ] = await Promise.all([
        translate(storeData, {
          to: lang,
        }),
        translate(couponsData, {
          to: lang,
        }),
        translate(similarCouponsData, {
          to: lang,
        }),
      ]);

      // console.log(translatedStoreData);

      store.name = translatedStoreData[0].text;
      store.description = translatedStoreData[1].text;
      store.bestOffer = translatedStoreData[1].text;

      store.coupons = store.coupons.map((coupon, index) => {
        coupon.title = translatedCouponsData[index * 3].text;
        coupon.description = translatedCouponsData[index * 3 + 1].text;
        coupon.offer = translatedCouponsData[index * 3 + 2].text;
        return coupon;
      });

      store.similarCoupons = store.similarCoupons.map((coupon, index) => {
        coupon.title = translatedSimilarCouponsData[index * 3].text;
        coupon.description = translatedSimilarCouponsData[index * 3 + 1].text;
        coupon.offer = translatedSimilarCouponsData[index * 3 + 2].text;
        return coupon;
      });

      return {
        status: 200,
        message: "Store Found",
        data: store,
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
    revalidate: 60 * 60 * 24 * 7,
  },
);

export const addStore = async (data) => {
  try {
    const store = await prisma.Store.create({
      data: data,
    });

    return {
      status: 200,
      message: "Store Created",
      data: store,
    };
  } catch (error) {
    console.log(error.message);

    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const updateStore = async (storeId, data) => {
  // {shop,code, offer,type}
  try {
    const store = await prisma.Store.update({
      where: {
        id: storeId,
      },
      data: data,
    });

    return {
      status: 200,
      message: "Store Updated",
      data: store,
    };
  } catch (error) {
    console.log(error.message);

    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const deleteStore = async (dealId) => {
  try {
    const store = await prisma.Store.delete({
      where: {
        id: dealId,
      },
    });

    return {
      status: 200,
      message: "Store Deleted",
      data: store,
    };
  } catch (error) {
    console.log(error.message);

    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const checkExistingStore = async (storename, name, nativeName) => {
  const store = await prisma.store.findFirst({
    where: {
      OR: [
        {
          slug: {
            contains: storename.toLowerCase(),
          },
        },
        {
          name: {
            contains: name,
          },
        },
        {
          name: {
            contains: nativeName,
          },
        },
        {
          nativeName: {
            contains: name,
          },
        },
        {
          nativeName: {
            contains: nativeName,
          },
        },
      ],
    },
    include: {
      categories: {
        select: {
          slug: true,
          name: true,
          stores: false,
          _count: true,
        },
      },
    },
  });

  if (!store) return { status: 200, data: 0, message: "Store Not Exist" };
  return { status: 200, data: store, message: "Store Exist" };
};

export const addStoreView = async (storeId) => {
  const recordToAdd = {
    time: new Date(),
  };
  try {
    const store = await prisma.store.findFirst({
      where: {
        id: storeId,
      },
      select: {
        views: true,
        viewsRecord: true,
        viewsThreshold: true,
      },
    });

    if (!store) {
      return {
        status: 400,
        message: "Store Not Found",
        data: 0,
      };
    }

    const updatedStore = await prisma.store.update({
      where: {
        id: storeId,
      },
      data: {
        views: {
          increment: 1,
        },
        viewsThreshold: {
          increment: 1,
        },
        viewsRecord: {
          push: recordToAdd,
        },
      },
    });

    if (store?.viewsThreshold + 1 > 50) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const newRecords = store.viewsRecord.filter(
        (record) => new Date(record.time) >= sevenDaysAgo,
      );
      //delete stale records & make threshold 0
      await prisma.Store.update({
        where: {
          id: storeId,
        },
        data: {
          viewsRecord: newRecords,
          viewsThreshold: 0,
        },
      });
    }

    return {
      status: 200,
      message: "Views Increased",
      data: updatedStore,
    };
  } catch (error) {
    console.log(error);

    return {
      status: 500,
      message: error.message,
      data: 0,
    };
  }
};

export const getTrendingStores = unstable_cache(
  async (country) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
      const result = await prisma.store.aggregateRaw({
        pipeline: [
          // {
          // 	$unwind: "$viewsRecord",
          // },

          // {
          // 	$match: {
          // 		"viewsRecord.time": { $gte: sevenDaysAgo },
          // 	},
          // },

          // {
          // 	$group: {
          // 		_id: "$_id",
          // 		name: { $first: "$name" }, // Keep store name
          // 		viewCount: { $sum: 1 },
          // 	},
          // },
          {
            $match: {
              access: {
                $in: ["global", country],
              },
            },
          },
          {
            $sort: { views: -1 },
          },
          {
            $limit: 12,
          },
          {
            $lookup: {
              from: "Coupon",
              localField: "_id",
              foreignField: "storeID",
              as: "coupons",
            },
          },
          {
            $addFields: {
              couponCount: { $size: "$coupons" },
            },
          },
          {
            $match: {
              couponCount: { $gt: 1 },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              nativeName: 1,
              slug: 1,
              img: 1,
              sourceImg: 1,
              views: 1,
              couponCount: 1,
              coupons: 1,
            },
          },
        ],
      });

      // const result = await prisma.store.findMany({
      //   where: {
      //     access: {
      //       hasSome: ["global", country],
      //     },
      //   },
      //   take: 12,
      // });
      return {
        status: 200,
        message: "Trending Stores",
        data: result,
      };

      // ----------------------------- TRANSLATION ----------------------------//
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
    revalidate: 60 * 60 * 24,
  },
);

export const getLatestStores = unstable_cache(
  async (country) => {
    try {
      const result = await prisma.Store.findMany({
        where: {
          access: {
            hasSome: ["global", country],
          },
        },
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        status: 200,
        message: "Latest Stores",
        data: result,
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
    revalidate: 60 * 60 * 24,
  },
);
