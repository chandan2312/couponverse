"use client";
import Link from "next/link";

import Image from "next/image";
import { CalendarX2, Circle, Eye, Share2, Users } from "lucide-react";
import { cn, getExpiryDate } from "../../lib/utils";
import { words } from "../../constants/words";
import CouponPopup from "../../components/coupon/CouponPopup";
import { Suspense, useState } from "react";
import { Lang } from "../../types";

type CouponCardProps = {
  store: any;
  deal: any;
  searchParams?: any;
  lang?: any;
  showImage?: boolean;
};

const DummyCouponCard = ({
  deal,
  store,
  lang,
  searchParams,
  showImage = true,
}: CouponCardProps) => {
  if (!deal) return null;

  const isExpired = deal.isExpired;

  const handleCouponVote = (vote: string) => {
    console.log(vote);
  };

  //week count from viewsRecord

  const weeklyViews = deal.viewsRecord
    ? deal.viewsRecord.filter((item: any) => {
        return (
          new Date(item.time).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7
        );
      }).length
    : 0;

  let expiryDate = words.LimitedTime[lang];

  if (deal.expiryDate) {
    expiryDate = getExpiryDate(deal.expiryDate, lang);
  }

  //dynamic import Dealpopup

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <article
      className={cn(
        "flex gap-1 bg-card mx-2",
        "   rounded-lg shadow-sm border border-muted/30    ",
        isExpired ? "text-muted-foreground" : "text-card-foreground",
      )}
    >
      {/* right side */}

      <div className="flex-grow flex flex-col justify-between  p-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-2 items-center">
            <Circle size={16} color={!isExpired ? "#1d9867" : "#5d5d5d"} />
            <span className={cn(!isExpired && "text-accent")}>
              {words.Verified[lang]}
            </span>
          </div>
          <div className="flex gap-2  items-center">
            <CalendarX2 size={16} color={!isExpired ? "#b92d2d" : "#5d5d5d"} />

            <span className="font-semibold text-[#b92d2d]">{expiryDate}</span>
          </div>
        </div>
        <hr className="my-1.5" />

        {/* ------------------ Mid Area ------------------ */}

        <div className="flex items-center gap-2">
          {showImage && (
            <figure className="max-md:hidden bg-muted/10 rounded-md p-1 w-16 h-16 flex items-center justify-center">
              <Image
                src={
                  store.img
                    ? `${process.env.CDN_URL}${store.img}`
                    : store.sourceImg
                }
                alt={store.nativeName || store.name}
                width={60}
                height={60}
              />
            </figure>
          )}
          <div className="flex flex-col justify-center flex-grow ">
            <h3
              className={cn(
                "font-bold  text-lg",
                !isExpired ? "text-accent" : "text-muted-foreground",
              )}
            >
              {deal.offer}
            </h3>
            <h2
              className={cn(
                "font-muted-foreground  leading-5 ",
                !isExpired && "font-semibold",
              )}
            >
              {deal.title || deal.sourceTitle}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2 p-2">
            <CouponPopup
              deal={deal}
              store={store}
              lang={lang}
              cdnUrl={process.env.CDN_URL as string}
            />
          </div>
        </div>

        <hr className="my-1.5" />

        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-1">
              <Eye size={16} />
              <span>{deal.views}</span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>
                {weeklyViews} {words.viewsLastWeek[lang]}
              </span>
            </div>
          </div>
          <div className="flex gap-3 lg:gap-4 items-center justify-end px-2">
            <CouponPopup
              deal={deal}
              store={store}
              lang={lang}
              cdnUrl={process.env.CDN_URL as string}
              isHistoryPopup={true}
            />
            {/* <LikeDealButton /> */}
            <span>
              <Share2 size={16} />
            </span>
          </div>
        </div>
      </div>
    </article>
    // </Suspense>
  );
};

export default DummyCouponCard;
