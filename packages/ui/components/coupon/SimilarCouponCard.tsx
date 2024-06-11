// import CouponOver from "./CouponOver";

import Link from "next/link";

import Image from "next/image";
import { CalendarX2, Eye, Share2, Store, Users } from "lucide-react";
import { cn, correctPath, getExpiryDate } from "../../lib/utils";
import { words } from "../../constants/words";
import CouponPopup from "./CouponPopup";

type DealCardProps = {
  deal?: any;
  hideWeekViews?: boolean;
};

const SimilarCouponCard = ({ deal, hideWeekViews = false }: DealCardProps) => {
  const lang = process.env.LG || "en";
  const cpath = correctPath(lang);
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
  return (
    <article
      className={cn(
        "bg-card h-full w-full flex flex-col justify-between   rounded-lg shadow-sm border border-foreground/50  border-dashed p-2 text-card-foreground",
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2 items-center max-md:justify-center">
          <Store size={16} color={!deal.isExpired ? "#1d9867" : "#5d5d5d"} />
          <Link
            href={`${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${deal.store.slug}`}
            className={cn(!deal.isExpired && "text-accent", "font-semibold")}
          >
            {deal.store.nativeName || deal.store.name}
          </Link>
        </div>
        <div className="flex gap-2  items-center max-md:hidden">
          <CalendarX2 size={16} color="#b92d2d" />

          <span className="font-semibold text-[#b92d2d]">{expiryDate}</span>
        </div>
      </div>
      <hr className="my-1.5" />

      <div className="space-y-1">
        <div className="flex flex-col text-center justify-center flex-grow ">
          <div className="flex items-center justify-center gap-2">
            <Link
              href={`${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${deal.store.slug}`}
              className="rounded-full border border-foreground/20 shadow-sm p-0.5 h-12 w-12 flex items-center justify-center"
            >
              <Image
                src={
                  deal?.store?.img
                    ? `${process.env.CDN_URL}${deal.store.img}`
                    : deal.store.sourceImg
                }
                alt={deal.store.nativeName || deal.store.name}
                height={40}
                width={40}
                style={{ objectFit: "contain" }}
                className="rounded-full"
              />
            </Link>
            <div>
              <h3 className={cn("font-bold  text-lg text-accent")}>
                {deal.offer}
              </h3>
            </div>
          </div>

          <h2
            className={cn(
              "font-muted-foreground  leading-5 max-md:text-sm font-semibold",
            )}
          >
            {deal.title}
          </h2>
        </div>

        <div className="p-2 flex items-center justify-center gap-2 min-w-[80%] mx-auto">
          <CouponPopup
            deal={deal}
            store={deal.store}
            lang={lang}
            cdnUrl={process.env.CDN_URL as string}
            fullWidth={!hideWeekViews}
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

          <div
            className={cn(
              `flex items-center gap-1`,
              hideWeekViews && "max-md:hidden",
            )}
          >
            <Users size={16} />
            <span>
              {weeklyViews} {words.viewsLastWeek[lang]}
            </span>
          </div>
        </div>
        <div className="flex gap-3 lg:gap-4 items-center justify-end px-2">
          {/* <DealPopup deal={deal} lang={lang} isHistoryPopup={true} /> */}
          {/* <LikeDealButton /> */}
          <span>
            <Share2 size={16} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default SimilarCouponCard;
