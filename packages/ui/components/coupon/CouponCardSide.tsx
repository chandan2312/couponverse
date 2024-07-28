import Link from "next/link";
import Image from "next/image";
import { CalendarX2, Eye, Share2, Store, Users } from "lucide-react";
import { cn, correctPath, getExpiryDate, getProtocol } from "../../lib/utils";
import { words } from "../../constants/words";
import CouponPopup from "../coupon/CouponPopup";
import { Lang } from "../../types";

type DealCardProps = {
  deal?: any;
  hideWeekViews?: boolean;
};

const CouponCardSide = ({ deal }: DealCardProps) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";

  const cpath = correctPath(lang);
  const protocol = getProtocol();
  const weeklyViews = deal.viewsRecord
    ? deal?.viewsRecord?.filter((item: any) => {
        return (
          new Date(item.time).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7
        );
      })?.length
    : 0;

  let expiryDate = words.LimitedTime[lang];

  if (deal.expiryDate) {
    expiryDate = getExpiryDate(deal.expiryDate, lang);
  }
  return (
    <article
      className={cn(
        "h-full flex flex-col justify-between   bg-muted/5 rounded-lg shadow-sm border border-foreground/50  border-dashed p-2 text-card-foreground",
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2 items-center max-md:justify-center">
          <Store size={16} color={!deal.isExpired ? "#1d9867" : "#5d5d5d"} />
          <Link
            href={`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${deal.store.slug}`}
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

      <div className="flex items-center gap-4">
        {/* ----------------------- Left Side --------------------------- */}
        <div>
          <Link
            href={`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${deal.store.slug}`}
            className="rounded-lg border border-foreground/20 shadow-sm p-2 h-32 w-32 flex items-center justify-center"
          >
            <Image
              src={
                deal?.store?.img
                  ? `${process.env.NEXT_PUBLIC_CDN_URL}${deal.store.img}`
                  : deal.store.sourceImg
              }
              alt={deal.store.nativeName || deal.store.name}
              height={120}
              width={120}
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* ----------------------- Right Side --------------------------- */}

        <div>
          <div className="flex flex-col   flex-grow ">
            <div className="flex items-center  gap-2">
              <div>
                <h3 className={cn("font-bold  text-lg text-accent")}>
                  {deal.offer}
                </h3>
              </div>
            </div>

            <h2
              className={cn("font-muted-foreground  leading-5  font-semibold")}
            >
              {deal.title}
            </h2>
          </div>

          <div className="p-2 flex items-center justify-start  gap-2 min-w-[80%] mx-auto">
            <CouponPopup coupon={deal} store={deal.store} />
          </div>
        </div>
      </div>

      <hr className="my-1.5" />

      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{deal.views}</span>
          </div>

          <div className={cn(`flex items-center gap-1 `)}>
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

export default CouponCardSide;
