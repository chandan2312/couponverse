// import CouponOver from "./CouponOver";

import Link from "next/link";
// import CouponButton from "./CouponButton";
// import AffLink from "./AffLink";
import Image from "next/image";
import {
  ArrowBigDown,
  ArrowBigUp,
  CalendarX2,
  Circle,
  Eye,
  Share2,
  Users,
} from "lucide-react";
import { cn, getExpiryDate } from "../../lib/utils";
import { words } from "../../constants/words";
import CouponPopup from "../../components/coupon/CouponPopup";
import { Suspense } from "react";
import { Lang } from "../../types";
import CouponVote from "./CouponVote";

type CouponCardProps = {
  store: any;
  coupon: any;
  showImage?: boolean;
};

const CouponCard = ({ coupon, store, showImage = true }: CouponCardProps) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  if (!coupon) return null;

  console.log("coupon", coupon);
  console.log("store", store);

  const isExpired = coupon?.status == "expired" ? true : false;

  const storeName =
    typeof store?.nativeName == "string"
      ? store?.nativeName
      : store?.nativeName?.find((el: any) => Object.keys(el)[0] == lang)?.[lang]
        ? store?.nativeName.find((el: any) => Object.keys(el)[0] == lang)?.[
            lang
          ]
        : store?.slug;

  //week count from viewsRecord

  const weeklyViews = coupon?.views
    ? coupon?.views?.filter((item: any) => {
        return (
          new Date(item.date).getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7
        );
      })?.length
    : 0;

  let expiryDate: any = words.LimitedTime[lang];

  if (coupon?.expiryDate) {
    expiryDate = getExpiryDate(coupon?.expiryDate, lang);
  }

  // return <>hello</>;

  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <article className="w-full flex  pl-1">
      {/* votes */}
      <CouponVote coupon={coupon} />
      {/* content */}
      <div
        className={cn(
          "w-full flex flex-grow gap-1 bg-card mx-2",
          "   rounded-lg shadow-sm border border-muted/30    ",
          isExpired ? "text-muted-foreground" : "text-card-foreground",
        )}
      >
        {/* right side */}

        <div className="flex-grow flex flex-col justify-between  p-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <div className="flex gap-2 items-center">
              <Circle size={16} color={!isExpired ? "#1d9867" : "#5d5d5d"} />
              <span className={cn(!isExpired && "text-accent")}>
                {words.Verified[lang]}
              </span>
            </div>
            <div className="flex gap-2  items-center">
              <CalendarX2
                size={16}
                color={!isExpired ? "#b92d2d" : "#5d5d5d"}
              />

              <span className="font-semibold text-[#b92d2d]">{expiryDate}</span>
            </div>
          </div>

          {/* ------------------ Mid Area ------------------ */}

          <div className="flex items-center gap-2">
            {showImage && (
              <figure className="max-md:hidden bg-muted/10 rounded-md p-1 w-16 h-16 flex items-center justify-center">
                <Image
                  src={
                    store?.img
                      ? `${process?.env.NEXT_PUBLIC_CDN_URL}${store.img}`
                      : ""
                  }
                  alt={storeName}
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
                {coupon.offer || coupon.englishOffer}
              </h3>
              <h2
                className={cn(
                  "font-muted-foreground  leading-5 ",
                  !isExpired && "font-semibold",
                )}
              >
                {coupon.title || coupon.englishTitle}
              </h2>
            </div>

            <div className="flex items-center justify-between gap-2 pl-2">
              <CouponPopup coupon={coupon} store={store} />
            </div>
          </div>

          <hr className="my-1.5" />

          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 ">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{coupon.viewsCount}</span>
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
                coupon={coupon}
                store={store}
                isHistoryPopup={true}
              />
              {/* <LikeDealButton /> */}
              <span>
                <Share2 size={16} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>

    // </Suspense>
  );
};

export default CouponCard;
