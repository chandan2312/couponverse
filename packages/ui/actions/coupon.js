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

// {shop,code, offer,type}

export const getCouponList = unstable_cache(
  async (page, perPage) => {
    const skip = (page - 1) * perPage;
    const take = perPage;
    try {
      const [data, total] = await Promise.all([
        prisma.coupon.findMany({
          skip,
          take,
        }),
        prisma.coupon.count(),
      ]);

      return {
        status: 200,
        message: "Coupons List",
        data: data,
        total: total,
      };
    } catch (error) {
      console.log(error.message);

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

export const getCoupon = async (dealId) => {
  //single coupon
  try {
    const coupon = await prisma.Coupon.findUnique({
      where: {
        id: dealId,
      },
    });

    return {
      status: 200,
      message: "Coupon Found",
      data: coupon,
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

export const addCoupon = async (data) => {
  // {shop,code, offer,type}
  try {
    const coupon = await prisma.Coupon.create({
      data: data,
    });

    return {
      status: 200,
      message: "Coupon Created",
      data: coupon,
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

export const updateCoupon = async (dealId, data) => {
  // {shop,code, offer,type}
  try {
    const coupon = await prisma.Coupon.update({
      where: {
        id: dealId,
      },
      data: data,
    });

    return {
      status: 200,
      message: "Coupon Updated",
      data: coupon,
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

export const deleteCoupon = async (dealId) => {
  try {
    const coupon = await prisma.Coupon.delete({
      where: {
        id: dealId,
      },
    });

    return {
      status: 200,
      message: "Coupon Deleted",
      data: coupon,
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

export const addCoupons = async (deals, slug) => {
  try {
    const checkDuplicatePromises = await deals.map(async (item) => {
      const checkCouponRes = await prisma.Coupon.findMany({
        where: {
          code: item.code || "",
          offer: item.offer || "",
          type: item.type || "DEAL",
          shop: item.shop,
        },
      });

      return checkCouponRes.length > 0;
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
      deals.map(async (item) => {
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

    const length = addedDeals.filter((item) => item != null).length;
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

export const increaseCouponViews = async (dealId) => {
  try {
    const coupon = await prisma.Coupon.update({
      where: {
        id: dealId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return {
      status: 200,
      message: "Views Increased",
      data: coupon,
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

// {shop,code, offer,type}
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

export const addCouponVote = async (data) => {
  //structure of data
  // [
  // 	{
  // 		vote: "yes" || "no",
  // 		time: new Date(),
  // 	}
  // ]

  try {
    const coupon = await prisma.Coupon.findUnique({
      where: {
        id: data.dealId,
      },
    });

    if (!coupon) {
      return {
        status: 404,
        message: "Coupon Not Found",
        data: 0,
      };
    }
    let history = coupon?.voteHistory || [];

    if (history.length > 20) {
      history.shift();
    }

    history.push({
      vote: data.vote,
      time: new Date(),
    });

    const updatedCoupon = await prisma.Coupon.update({
      where: {
        id: data.dealId,
      },
      data: {
        votes: {
          increment: 1,
        },
        voteHistory: history,
      },
    });

    return {
      status: 200,
      message: "Vote Added Successfully",
      data: updatedCoupon,
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

export const addCouponView = async (dealId) => {
  const recordToAdd = {
    time: new Date(),
  };
  try {
    //get current threshhold
    const threshold = await prisma.Coupon.findUnique({
      where: {
        id: dealId,
      },
      select: {
        viewsThreshold: true,
        viewsRecord: true,
      },
    });

    if (threshold == null) {
      return {
        status: 404,
        message: "Coupon Not Found",
        data: 0,
      };
    }

    const coupon = await prisma.Coupon.update({
      where: {
        id: dealId,
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

    if (threshold.viewsThreshold + 1 > 20) {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const newRecords = coupon.viewsRecord.filter(
        (record) => new Date(record.time) >= sevenDaysAgo,
      );
      //delete stale records && make threshold 0

      await prisma.Coupon.update({
        where: {
          id: dealId,
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
      data: coupon,
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

export const likeCoupon = async (dealId) => {
  try {
    const coupon = await prisma.Coupon.update({
      where: {
        id: dealId,
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return {
      status: 200,
      message: "Likes Increased",
      data: coupon,
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
              sourceDescription: 1,
              description: 1,
              shop: 1,
              offer: 1,
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
                name: 1,
                slug: 1,
                img: 1,
                sourceImg: 1,
                views: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          },
        ],
      });

      const newCoupons = result.filter((coupon) => {
        return !filteredWords.some(
          (word) =>
            coupon.title.toLowerCase().includes(word.toLowerCase()) ||
            coupon.offer.toLowerCase().includes(word.toLowerCase()),
        );
      });

      console.log("newCoupons.length");
      console.log(newCoupons);

      if (englishCountries.includes(country)) {
        return {
          status: 200,
          message: "Trending coupons",
          data: newCoupons,
        };
      }

      const couponsData = result
        ?.map((item) => {
          return [item.title, item.description, item.offer];
        })
        ?.flat()
        ?.map((item) => (item === undefined ? "" : item));

      const ac = new AbortController();

      const translatedCouponData = await translate(couponsData, {
        to: lang,
        agent: new HttpProxyAgent(
          `https://zone-48D601A0-country-us:CB7785DAF3F94ED59097CEFF8646120F@proxy.bytio.com:8443`,
        ),
        signal: ac.signal,
      });

      const newResult = result.map((item, index) => {
        item.title = translatedCouponData[index * 3].text;
        item.description = translatedCouponData[index * 3 + 1].text;
        item.offer = translatedCouponData[index * 3 + 2].text;
        return item;
      });

      return {
        status: 200,
        message: "Trending coupons",
        data: newResult,
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
