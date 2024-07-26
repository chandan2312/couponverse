"use server"


import prisma from "../lib/db";




export const userOfferVotesHandler = async (type, userId, offerId, upvotedOffers, downvotedOffers) => {
  const result = {
    upvotedOffers,
    downvotedOffers,
  };
  // -------------------- Update User votes arr -------------------//
  if (type === "up") {
    if (downvotedOffers.some((item:any) => item.offerId === offerId)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          downvotedOffers: {
            set: downvotedOffers.filter((item) => item.offerId !== offerId),
          },
        },
        select: {
          id: true,
          username,
        },
      });
    }

    if (!upvotedOffers.some((item) => item.offerId === offerId)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          upvotedOffers: {
            push: { offerId: offerId, date: new Date() },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          upvotedOffers: {
            set: upvotedOffers.filter((item) => item.offerId !== offerId),
          },
        },
      });
    }
  } else {
    if (upvotedOffers.some((item) => item.offerId === offerId)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          upvotedOffers: {
            set: upvotedOffers.filter((item) => item.offerId !== offerId),
          },
        },
      });
    }

    if (!downvotedOffers.some((item) => item.offerId === offerId)) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          downvotedOffers: {
            push: { offerId: offerId, date: new Date() },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          downvotedOffers: {
            set: downvotedOffers.filter((item) => item.offerId !== offerId),
          },
        },
      });
    }
  }
};
