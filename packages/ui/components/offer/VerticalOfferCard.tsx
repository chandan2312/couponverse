import Image from "next/image";
import { cn, htmlTextTrimmer } from "../../lib/utils";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Bookmark,
  CalendarX,
  Clock,
  Hourglass,
  MessageSquare,
  CircleEllipsis,
} from "lucide-react";
import IconButton from "../custom/IconButton";
import OfferButton from "../custom/OfferButton";
import OfferVote from "./OfferVote";

const VerticalOfferCard = ({ offer }: { offer: any }) => {
  const country = process?.env?.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang = process?.env?.NEXT_PUBLIC_LG || "en";
  const isExpired = offer.status == "expired" ? true : false;
  return (
    <article
      className={cn(
        "h-full relative flex flex-col items-center justify-center gap-2 bg-card mx-2 p-2 border-2 border-muted shadow-lg overflow-hidden",
        "   rounded-lg shadow-sm border border-muted/30    ",
        isExpired ? "text-muted-foreground" : "text-card-foreground",
      )}
    >
      {/* ---- Top ------ */}
      <div className="mb-1 w-full flex justify-between">
        <div>
          <OfferVote offer={offer} />
        </div>
        <div className="flex items-center gap-2 text-xs ">
          {offer.expiryDate ? (
            <div className="flex items-center gap-1">
              <CalendarX size={18} /> <span>20/07/24</span>
            </div>
          ) : (
            <div className="max-md:hidden flex items-center gap-1">
              <Clock size={18} /> <span>2 days ago</span>
            </div>
          )}
          <div className="cursor-pointer text-card-foreground/70">•••</div>
        </div>
      </div>
      {/* ---- Middle ------ */}
      <figure className=" w-36 h-36 flex-grow my-2 mr-2 ml-0.5 md:ml-2 flex items-center justify-center bg-muted/20 rounded-md shadow-sm overflow-hidden">
        <Image
          src={
            offer.img
              ? `${process?.env.NEXT_PUBLIC_CDN_URL}${offer.img}`
              : offer.sourceImg
          }
          width={140}
          height={140}
          alt={offer.title}
          title={offer.title}
          className="m-auto my-2 p-auto rounded-md overflow-hidden"
        />
      </figure>
      {/* //----------------- bottom side */}

      {/* right 1 - 2 - 2 */}
      <div className="text-md md:text-lg w-full  space-y-1.5">
        <h3 className="font-semibold text-sm text-center w-full">
          {offer.title}
        </h3>
        <div className="w-full text-center">
          <span className="text-accent font-semibold ">{offer.currency}</span>
          <span className="text-accent font-semibold ">
            {offer.discountPrice}
          </span>{" "}
          {offer?.ogPrice ? (
            <>
              <span className="text-muted/70">| </span>
              <span className="text-card-foreground/30 font-semibold  line-through">
                {offer.ogPrice}
              </span>
            </>
          ) : (
            ""
          )}{" "}
          {offer?.offer ? (
            <span className="text-accent2 font-semibold text-md">
              <span className="text-muted/70">|</span> {offer.offer}
            </span>
          ) : (
            ""
          )}
        </div>

        {/* ----- button ---- */}
        <div className="w-full flex items-center justify-center">
          <OfferButton
            code={offer?.code}
            slug={offer?.slug}
            isExpired={isExpired}
          />
        </div>

        {/* ----- user ---- */}

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
    </article>
  );
};

export default VerticalOfferCard;
