// import CouponOver from "./CouponOver";

import Link from "next/link";

import Image from "next/image";
import { CalendarX2, Eye, Share2, Store, Users } from "lucide-react";
import { cn, correctPath, getExpiryDate } from "../../lib/utils";
//@ts-ignore
import { words } from "../../constants/words";
import CouponPopup from "./CouponPopup";
import { Lang } from "../../types";

type DealCardProps = {
  coupon?: any;
};

const VerticalCouponCard = ({ coupon }: DealCardProps) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";

  const cpath = correctPath(lang);
  const weeklyViews = 0; //TODO: weeklyViews

  let expiryDate = words.LimitedTime[lang];

  if (coupon?.expiryDate) {
    expiryDate = getExpiryDate(coupon.expiryDate, lang);
  }

  const name =
    coupon?.store?.nativeName.find((el: any) => Object.keys(el)[0] == lang)?.[
      lang
    ] || "";

  const isExpired = coupon.status == "expired" ? true : false;
  return (
    <article
      className={cn(
        "bg-card mx-2 flex flex-col justify-between   rounded-lg shadow-sm border border-foreground/50  border-dashed p-2 text-card-foreground",
      )}
    >
      <div className="flex items-center justify-between text-xs">
        <div className="flex gap-2 items-center max-md:justify-center">
          <Store size={16} color={!isExpired ? "#1d9867" : "#5d5d5d"} />
          <Link
            href={`${process.env.NEXT_PUBLIC_PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${coupon?.store?.slug}`}
            className={cn(!isExpired && "text-accent", "font-semibold")}
          >
            {name}
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
              href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${coupon?.store?.slug}`}
              className="rounded-full border border-foreground/20 shadow-sm p-0.5 h-12 w-12 flex items-center justify-center"
            >
              <Image
                src={
                  coupon?.store?.img
                    ? `${process.env.NEXT_PUBLIC_CDN_URL}${coupon?.store?.img}`
                    : coupon?.store?.sourceImg
                }
                alt={name}
                height={40}
                width={40}
                style={{ objectFit: "contain" }}
                className="rounded-full"
              />
            </Link>
            <div>
              <h3 className={cn("font-bold  text-lg text-accent")}>
                {coupon?.offer}
              </h3>
            </div>
          </div>

          <h2
            className={cn(
              "font-muted-foreground  leading-5 max-md:text-sm font-semibold",
            )}
          >
            {coupon.title}
          </h2>
        </div>

        <div className="p-2 flex items-center justify-center gap-2 min-w-[80%] mx-auto">
          <CouponPopup coupon={coupon} store={coupon?.store} />
        </div>
      </div>

      <hr className="my-1.5" />

      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 ">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{coupon?.views}</span>
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

export default VerticalCouponCard;
