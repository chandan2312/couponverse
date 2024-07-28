import Image from "next/image";
import { cn, htmlTextTrimmer, timeAgo, timeLeft } from "../../lib/utils";
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
import { Lang } from "../../types";

const OfferCard = ({ offer, store }: { offer: any; store?: any }) => {
  const country = process?.env?.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang: Lang = process?.env?.NEXT_PUBLIC_LG as Lang;
  const isExpired = offer.status == "expired" ? true : false;

  const storeName = store
    ? store.nativeName.find((el: any) => Object.keys(el)[0] == lang)?.[lang]
    : offer.store
      ? offer.store.nativeName.find((el: any) => Object.keys(el)[0] == lang)?.[
          lang
        ]
      : "";

  return (
    <article
      className={cn(
        "mx-2 p-2  overflow-hidden bg-card rounded-lg shadow-lg border-2 border-muted/60 ",
        isExpired ? "text-muted-foreground" : "text-card-foreground",
      )}
    >
      <div className={cn("relative flex items-center gap-2 ")}>
        <Link
          href={`/offer/${offer.slug}`}
          className="relative w-36 h-36 flex-grow my-2 mr-2 ml-0.5 md:ml-2 flex items-center justify-center bg-muted/20 rounded-md shadow-sm overflow-hidden"
        >
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
        </Link>

        {storeName ? (
          <Link
            href={`/coupons/${store ? store.slug : offer.store.slug}`}
            className="text-xs px-1 absolute top-0 left-0 bg-accent2 text-accent-foreground font-semibold rounded-lg overflow-hidden max-w-36 max-h-[18px]"
          >
            {storeName}
          </Link>
        ) : (
          ""
        )}

        {/* //----------------- Right side */}
        <div className="w-full flex flex-col justify-center gap-1">
          {/*  Right - 1*/}
          <div className="flex gap-2 items-center">
            {/* right 1 -2 */}
            <div className="w-full flex flex-col md:items-center md:gap-2">
              {/* right 1 - 2 - 1 */}
              <div className="mb-1 w-full flex justify-between">
                <div>
                  <OfferVote offer={offer} />
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  {offer.expiryDate && offer.status !== "expired" ? (
                    <div className="flex items-center gap-1">
                      <CalendarX size={18} />
                      <span>
                        {/* <span className="max-md:hidden">Expires: </span> */}
                        {timeLeft(offer.expiryDate)}
                      </span>
                    </div>
                  ) : offer.status !== "expired" ? (
                    <div className=" flex items-center gap-1">
                      <Clock size={18} />
                      <span>
                        <span className="max-md:hidden">Added: </span>
                        {timeAgo(offer.createdAt)}
                      </span>
                    </div>
                  ) : (
                    <div>Expired</div>
                  )}
                  <div className="cursor-pointer text-card-foreground/70">
                    •••
                  </div>
                </div>
              </div>
              {/* right 1 - 2 - 2 */}
              <div className="text-md md:text-lg w-full flex md:justify-between md:items-center max-md:flex-col gap-1">
                <div>
                  <Link href={`/offer/${offer.slug}`}>
                    <h3 className="font-semibold text-sm w-full">
                      {offer.title}
                    </h3>
                  </Link>
                  <Link href={`/offer/${offer.slug}`} className="w-full">
                    <span className="text-accent font-semibold ">
                      {offer.currency}
                    </span>
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
                  </Link>
                </div>

                <div className="py-1 max-md:flex max-md:flex-col ">
                  <OfferButton
                    code={offer?.code}
                    slug={offer?.slug}
                    isExpired={isExpired}
                  />
                </div>
              </div>
            </div>
          </div>

          {offer?.description ? (
            <p className="text-xs px-2">
              {htmlTextTrimmer(offer.description, 20)}
            </p>
          ) : (
            <p></p>
          )}
          {/* //----------------- Author & COupon Button */}

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
      </div>

      {offer?.shortDescription ? (
        <div className="max-md:mt-2 py-1 px-2 max-md:text-xs text-sm max-h-[54px] md:max-h-[62px] overflow-hidden">
          {offer.shortDescription}
        </div>
      ) : (
        ""
      )}

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

export default OfferCard;
