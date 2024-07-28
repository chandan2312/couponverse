import LinkButton from "../components/custom/LinkButton";
import IconButton from "../components/custom/IconButton";
import OfferButton from "../components/custom/OfferButton";
import OfferVote from "../components/offer/OfferVote";
import { cn, htmlTextTrimmer } from "../lib/utils";
import axios from "axios";
import { Bookmark, CalendarX, Clock, MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Heading from "../components/custom/Heading";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import TrendingOffers from "../components/offer/TrendingOffers";
import TrendingCoupons from "../components/coupon/TrendingCoupons";
import { Lang } from "../types";

const OfferPage = async ({
  slug,
  data,
  searchParams,
}: {
  slug: string;
  data: any;
  searchParams: any;
}) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL as string;

  const offer = data.offer;

  const isExpired = offer?.status == "expired" ? true : false;

  return (
    <div className="mx-auto px-auto space-y-4 max-w-5xl">
      {/* --------------------- SECTION 1 ------------------ */}
      <div
        className={cn(
          "relative flex items-center gap-2 bg-card mx-2 p-2 border-2 border-muted shadow-lg overflow-hidden",
          "   rounded-lg shadow-sm border border-muted/30    ",
          isExpired ? "text-muted-foreground" : "text-card-foreground",
        )}
      >
        <figure className=" w-80 max-h-[400px] overflow-y-hidden flex-grow my-2 mr-2 ml-0.5 md:ml-2 flex items-center justify-center bg-muted/20 rounded-lg shadow-sm overflow-hidden">
          <Image
            src={offer.img && `${cdnUrl}${offer.img || ""}`}
            width={320}
            height={320}
            alt={offer.title}
            title={offer.title}
            className="m-auto my-2 p-auto rounded-lg overflow-hidden"
          />
        </figure>
        {/* //----------------- Right side */}
        <div className="w-full space-y-3">
          {/* vote button */}
          <div className=" w-full flex justify-between">
            <div>
              <OfferVote offer={offer} />
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <CalendarX size={18} />{" "}
                <span>
                  <span className="max-md:hidden">Expires: </span>20/07/24
                </span>
              </div>
              <div className="max-md:hidden flex items-center gap-1">
                <Clock size={18} />{" "}
                <span>
                  <span className="max-md:hidden">Added: </span>2 days ago
                </span>
              </div>
              <div className="cursor-pointer text-card-foreground/70">•••</div>
            </div>
          </div>
          {/* title */}
          <h3 className="font-semibold text-lg w-full">{offer.title}</h3>
          {/* price */}
          <div className="w-full">
            <span className="text-lg text-accent font-semibold ">
              {offer.currency}
            </span>
            <span className="text-lg text-accent font-semibold ">
              {offer.discountPrice}
            </span>{" "}
            {offer?.ogPrice ? (
              <>
                <span className="text-lg text-muted/70">| </span>
                <span className="text-lg text-card-foreground/30 font-semibold  line-through">
                  {offer.ogPrice}
                </span>
              </>
            ) : (
              ""
            )}{" "}
            {offer?.offer ? (
              <span className="text-lg text-accent2 font-semibold text-md">
                <span className="text-lg text-muted/70">|</span> {offer.offer}
              </span>
            ) : (
              ""
            )}
          </div>
          {/* button */}
          <div className="w-full">
            <LinkButton
              link={offer.link}
              text={`Go to link`}
              className="h-14 py-2 text-base px-4 min-w-50"
            />
          </div>

          {/* user */}
          <div className="w-full  flex justify-end max-md:flex-col md:gap-4 ">
            <div
              className={`w-full flex flex-grow ${offer?.user ? "justify-between" : "justify-end"}  pr-2`}
            >
              {offer?.user ? (
                <Link
                  href={`/user/${offer?.user?.username}`}
                  className="flex  gap-1 items-center"
                >
                  <Image
                    src={
                      offer?.user?.avatar
                        ? `${process?.env.NEXT_PUBLIC_CDN_URL}${offer.user.avatar}`
                        : ""
                    } //TODO:fallback text
                    width={25}
                    height={25}
                    alt={offer.user.username}
                    className="rounded-full shadow-sm"
                  />{" "}
                  <div>
                    <span className="block text-xs font-semibold">
                      {offer.user.username}
                    </span>
                    {/* <span className="block text-xs ">
                    {offer?.user?.firstname || ""} {offer?.user?.lastname || ""}
                  </span> */}
                  </div>
                </Link>
              ) : (
                <div className="w-full flex-grow"></div>
              )}

              <div className="flex gap-2 items-center">
                <IconButton>
                  <Bookmark size={16} />
                </IconButton>
                <IconButton>
                  <MessageSquare size={16} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>

        {/* //----------------- Tag */}

        {offer?.isHot ? (
          <div className="absolute transform rotate-[-45deg] bg-accent2 text-accent2-foreground text-center font-semibold py-0.5 left-[-35px] top-[15px] w-[130px]">
            <span>Hot</span>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* --------------------- SECTION 2 ------------------ */}

      <div
        className={cn(
          "relative  bg-card mx-2 p-2  border-2 border-muted shadow-lg overflow-hidden",
          "   rounded-lg shadow-sm border border-muted/30    ",
          isExpired ? "text-muted-foreground" : "text-card-foreground",
        )}
      >
        <Heading tag="h2" text="Description" />

        <div
          className="px-4"
          dangerouslySetInnerHTML={{
            __html: offer?.description || "",
          }}
        ></div>
      </div>

      {/* --------------------- SECTION 3 ------------------ */}

      <div
        className={cn(
          "relative  gap-2 bg-card mx-2 p-2 border-2 border-muted shadow-lg overflow-hidden",
          "   rounded-lg shadow-sm border border-muted/30    ",
          isExpired ? "text-muted-foreground" : "text-card-foreground",
        )}
      >
        <Heading tag="h2" text="Comments" />

        <div className="w-full add-comment p-4 flex gap-4 items-center">
          <Textarea
            placeholder="Type your message here."
            className="flex-grow"
          />
          <Button variant="accent">Send message</Button>
        </div>

        {/* <Separator /> */}
      </div>

      {/* --------------------- SECTION 4 - trending offers ------------------ */}

      <div
        className={cn(
          "relative  gap-2 bg-card mx-2 p-2 border-2 border-muted shadow-lg overflow-hidden",
          "   rounded-lg shadow-sm border border-muted/30    ",
        )}
      >
        <TrendingOffers />
        <div className="flex py-4 items-center justify-center">
          <LinkButton
            link="/#trending-offers"
            text="View more offers"
            className="px-5 py-auto my-auto h-10"
          />
        </div>
      </div>

      {/* --------------------- SECTION 5 - trending coupons------------------ */}

      <div
        className={cn(
          "relative  gap-2 bg-card mx-2 p-2 border-2 border-muted shadow-lg overflow-hidden",
          "   rounded-lg shadow-sm border border-muted/30    ",
        )}
      >
        <TrendingCoupons />
        <div className="flex py-4 items-center justify-center">
          <LinkButton
            link="/#trending-Coupons"
            text="View more coupons"
            className="px-5 py-auto my-auto h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
