import React from "react";
import { contentGenerator } from "../../lib/contentGenerator";
import { words } from "../../constants/words";
import CouponCard from "../coupon/CouponCard";
import DummyPopup from "../coupon/DummyPopup";
import Image from "next/image";

const HowToUseSection = ({ store }: { store: any }) => {
  const lang = process.env.LG || "en";
  const deal =
    store.coupons.filter((coupon: any) => coupon.type == "CODE").length > 0
      ? store.coupons.filter((coupon: any) => coupon.type == "CODE")[0]
      : store.coupons[0];

  const image = store.img
    ? `${process.env.CDN_URL}${store.img}`
    : store.sourceUrl;

  return (
    <div className="space-y-2 my-4">
      <ul className="space-y-1 md:px-8 max-w-5xl mx-auto">
        <li>
          <span className="font-semibold underline pr-2">
            {words.Step[lang]} 1 -{" "}
          </span>{" "}
          {contentGenerator("howToApplyStep1", store.name, lang)}
          <div className="my-3 p-3 rounded-md bg-foreground/10 md:py-8 md:px-16 lg:max-w-4xl mx-auto">
            <div className="bg-card rounded-lg">
              <CouponCard deal={deal} store={store} />
            </div>
          </div>
        </li>
        <li>
          <span className="font-semibold underline pr-2">
            {words.Step[lang]} 2 -{" "}
          </span>{" "}
          {contentGenerator("howToApplyStep2", store.name, lang)}
          <div className="my-5 mx-2 md:mx-6 bg-foreground/10 rounded-md py-4 px-8 lg:max-w-4xl h-full">
            <DummyPopup deal={deal} image={image} />
          </div>
        </li>
        <li>
          <span className="font-semibold underline pr-2">
            {words.Step[lang]} 3 -{" "}
          </span>{" "}
          {contentGenerator("howToApplyStep3", store.name, lang)}
          <div className="my-4 rounded-lg bg-foreground/10 p-3 flex items-center justify-center">
            <Image
              src={`${process.env.CDN_URL}assets/step-3-apply-coupon.jpeg`}
              width={320}
              height={320}
              alt={words.ApplyCoupon[lang]}
              className="rounded-md m-auto max-md:w-full mx-auto w-auto"
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HowToUseSection;
