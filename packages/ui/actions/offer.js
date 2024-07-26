"use server";

import { unstable_cache } from "next/cache";
import prisma from "../lib/db";

// --------------------------- GENERAL FUNCTIONS ------------------//

export const getOffers = unstable_cache(
  async (condition, fields, orderBy, page, perPage) => {
    try {
      const skip = (page - 1) * perPage || 0;
      const take = perPage || 10;
      const offers = await prisma.offer.findMany({
        where: condition,
        ...(fields && { select: fields }),
        ...(orderBy && { orderBy: orderBy }),

        skip: skip,
        take: take,
      });

      return offers;
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return null;
    }
  },
  {
    revalidate: 60 * 60 * 24, // 1 hour
  },
);

// --------------------------- SPECIAL PURPOSE FUNCTIONS ------------------//

export const getPopularOffers = async () => {
  return [];
};

// --------------------------- ACTIONS ------------------//

export const addVote = async (
  type,
  offerId,
  userId,
  userUpvotes,
  userDownvotes,
) => {
  try {
    const offer = await prisma.offer.findUnique({
      where: {
        id: offerId,
      },
      select: {
        upvotesArr: true,
        downvotesArr: true,
        upvotes: true,
        downvotes: true,
        votesThreshold: true,
      },
    });

    if (!offer) return null; //TODO:

    const result = {
      upvotes: offer?.upvotes,
      upvotesArr: offer?.upvotesArr,
      downvotes: offer?.downvotes,
      downvotesArr: offer?.downvotesArr,
      votesThreshold: offer?.votesThreshold,
      hotness: offer?.hotness,
    };

    // -------------------- Update Offer votes arr -------------------//
    //UPVOTE
    if (type === "up") {
      //check in downvotesArr if present
      if (offer.downvotesArr.includes(userId)) {
        //remove from downvotesArr
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            downvotesArr: {
              set: offer.downvotesArr.filter((item) => item.userId !== userId),
            },
            downvotes: offer.downvotes - 1,
          },
        });
        result.downvotes = offer.downvotes - 1;
        result.downvotesArr = offer.downvotesArr.filter(
          (item) => item.userId !== userId,
        );
      }

      if (!offer.upvotesArr.includes(userId)) {
        //add to upvotes
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            upvotesArr: {
              push: { userId: userId, date: new Date() },
            },
            upvotes: offer.votes + 1,
            votesThreshold: offer.votesThreshold + 1,
          },
        });
        result.upvotes = offer.upvotes + 1;
        result.upvotesArr = offer.upvotesArr.push({
          userId: userId,
          date: new Date(),
        });
        result.votesThreshold = offer.votesThreshold + 1;
      } else {
        // remove from upvotesArr
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            upvotesArr: {
              set: offer.upvotesArr.filter((item) => item.userId !== userId),
            },
            upvotes: offer.upvotes - 1,
          },
        });
        result.upvotes = offer.upvotes - 1;
        result.upvotesArr = offer.upvotesArr.filter(
          (item) => item.userId !== userId,
        );
      }
    } else {
      //DOWNVOTE
      //check in upvotesArr if present
      if (offer.upvotesArr.includes(userId)) {
        //remove from upvotesArr
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            upvotesArr: {
              set: offer.upvotesArr.filter((item) => item.userId !== userId),
            },
            upvotes: offer.upvotes - 1,
          },
        });
        result.upvotes = offer.upvotes - 1;
        result.upvotesArr = offer.upvotesArr.filter(
          (item) => item.userId !== userId,
        );
      }

      if (!offer.downvotesArr.includes(userId)) {
        //add to downvotes
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            downvotesArr: {
              push: { userId: userId, date: new Date() },
            },
            downvotes: offer.downvotes + 1,
            votesThreshold: offer.votesThreshold + 1,
          },
        });
        result.downvotes = offer.downvotes + 1;
        result.downvotesArr = offer.downvotesArr.push({
          userId: userId,
          date: new Date(),
        });
        result.votesThreshold = offer.votesThreshold + 1;
      } else {
        // remove from downvotesArr
        await prisma.offer.update({
          where: {
            id: offerId,
          },
          data: {
            downvotesArr: {
              set: offer.downvotesArr.filter((item) => item.userId !== userId),
            },
            downvotes: offer.downvotes - 1,
          },
        });
        result.downvotes = offer.downvotes - 1;
        result.downvotesArr = offer.downvotesArr.filter(
          (item) => item.userId !== userId,
        );
      }
    }

    // -------------------- Update User votes arr -------------------//
    //add code for user upvotes and downvotes here, you chatgpt

    //calculate hotness
    const hotness = hotnessCalc(offer); //Opt: use updatehotness fn instead
    result.hotness = hotness;

    //-------------------Cleanup

    if (result.votesThreshold > 50) {
      const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
      const cutoffDate = new Date(Date.now() - THIRTY_DAYS_MS);
      const filteredUpvotesArr = offer.upvotesArr.filter(
        (entry) => new Date(entry.date) >= cutoffDate,
      );
      const filteredDownvotesArr = offer.downvotesArr.filter(
        (entry) => new Date(entry.date) >= cutoffDate,
      );

      await prisma.offer.update({
        where: {
          id: offerId,
        },
        data: {
          upvotesArr: {
            set: filteredUpvotesArr,
          },
          downvotesArr: {
            set: filteredDownvotesArr,
          },
          votesThreshold: 0,
        },
      });
    }

    return result;
  } catch (error) {
    console.log(error.message);
    //TODO:alert
    return null;
  }
};
