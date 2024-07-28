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
import axios from "axios";

//-------------------- GENERAL FUNCTIONS ------------------//

export const getStore = async (condition, fields) => {
  try {
    const store = await prisma.Store.findFirst({
      where: condition,
      ...(fields && { select: fields }),
    });

    return store;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//------------------- SPECIAL PURPOSE FUNCTIONS ------------------//

export const getTrendingStores = unstable_cache(
  async (country) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    try {
      const result = await prisma.store.aggregateRaw({
        pipeline: [
          {
            $match: {
              access: country,
              popularity: { $gt: 0 },
            },
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
              nativeName: 1,
              slug: 1,
              img: 1,
              link: 1,
              affLink: 1,
              views: 1,
              couponCount: 1,
              coupons: {
                _id: 1,
                englishTitle: 1,
                englishOffer: 1,
              },
            },
          },
          {
            $facet: {
              sampled: [{ $sample: { size: 12 } }],
            },
          },
          {
            $unwind: "$sampled",
          },
          {
            $replaceRoot: { newRoot: "$sampled" },
          },
        ],
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  },
  {
    revalidate: 60 * 60 * 24,
  },
);

//-------------------- ACTIONS ------------------//

export const getStoreCount = unstable_cache(
  async (country) => {
    const rawStores = await prisma.Store.findMany({
      where: {
        access: country,
      },
      select: {
        slug: true,
        coupons: {
          select: {
            id: true,
          },
        },
      },
    });

    const count =
      rawStores?.filter((store) => store.coupons?.length > 0)?.length || 0;

    // const count = await prisma.Store.count({
    //   where: {
    //     access: country,
    //   },
    // });

    return count;
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
          access: country,
        },
        select: {
          slug: true,
          nativeName: true,
          coupons: {
            select: {
              id: true,
            },
          },
        },
        take: take,
        skip: skip,
      });

      const data = dataRaw?.filter((store) => store.coupons?.length > 0);

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
      const store = await prisma.store.findFirst({
        where: {
          slug: slug,
          access: country,
        },

        include: {
          coupons: {
            select: {
              id: true,
              title: true,
              englishTitle: true,
              code: true,
              offer: true,
              englishOffer: true,
              type: true,
              access: true,
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

          Offer: {
            include: {
              user: true,
            },
          }, //TODO: select fields

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
      store.couponCount = store.coupons?.length;

      if (!store || store.coupons?.length === 0) {
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
              access: country,
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

      store.similarCoupons = filterCoupons(rawSimilarCoupons)?.slice(0, 6);

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
              access: country,
            },
          },
          // {
          //   $match: {
          //     views: { $gte: 1 },
          //   },
          // },
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
              nativeName: 1,
              link: 1,
              affLink: 1,
              img: 1,
              sourceImg: 1,
              slug: 1,
              couponCount: 1,
              coupons: {
                _id: 1,
                englishTitle: 1,
                englishOffer: 1,
              },
            },
          },
        ],
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

      const newRecords = store?.viewsRecord?.filter(
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

export const getLatestStores = unstable_cache(
  async (country) => {
    try {
      const result = await prisma.store.findMany({
        where: {
          access: country,
        },
        take: 10,
        select: {
          coupons: true,
          nativeName: true,
          img: true,
          slug: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const validStores = result?.filter((store) => store.coupons?.length > 0);

      return {
        status: 200,
        message: "Latest Stores",
        data: validStores,
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
