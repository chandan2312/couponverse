import React from "react";
import { words } from "../constants/words";
import { Lang } from "../types";
import { getTrendingCoupons } from "../actions/coupon";
import CouponCardSide from "../components/coupon/CouponCardSide";
const TrendingCoupons = async () => {
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const trendingCouponsRes = await getTrendingCoupons(lang);
  const trendingCoupons = trendingCouponsRes.data;
  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold my-2">
        {words.WeekFeaturedCouponOffers[lang]}
      </h2>

      <div className="grid lg:grid-cols-2 gap-3">
        {trendingCoupons?.length &&
          trendingCoupons?.map((deal: any, index: any) => (
            <CouponCardSide key={index} deal={deal} />
          ))}
      </div>
    </>
  );
};

export default TrendingCoupons;
