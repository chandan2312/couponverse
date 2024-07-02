import React from "react";
import { contentGenerator } from "../../lib/contentGenerator";
import { words } from "../../constants/words";
import CouponCard from "../coupon/CouponCard";
import DummyPopup from "../coupon/DummyPopup";
import Image from "next/image";
import { Lang } from "../../types";
import { Separator } from "../ui/separator";
import HowToUseSlider from "./HowToUseSlider";

const HowToUseSection = ({ store }: { store: any }) => {
  const lang: Lang = (process.env.LG as Lang) || "en";
  const deal =
    store.coupons.filter((coupon: any) => coupon.type == "CODE").length > 0
      ? store.coupons.filter((coupon: any) => coupon.type == "CODE")[0]
      : store.coupons[0];

  const image = store.img
    ? `${process.env.CDN_URL}${store.img}`
    : store.sourceUrl;

  return (
    <>
      <div className="lg:grid lg:grid-cols-12 gap-3">
        {/* //Left Section */}
        <div className="lg:col-span-8 my-auto">
          <ul className="space-y-2   mx-auto text-sm">
            <li>
              <span className="font-semibold underline pr-2">
                {words.Step[lang]} 1 -{" "}
              </span>{" "}
              {contentGenerator("howToApplyStep1", store.nativeName, lang)}
            </li>
            <Separator />
            <li>
              <span className="font-semibold underline pr-2">
                {words.Step[lang]} 2 -{" "}
              </span>{" "}
              {contentGenerator("howToApplyStep2", store.nativeName, lang)}
            </li>
            <Separator />

            <li>
              <span className="font-semibold underline pr-2">
                {words.Step[lang]} 3 -{" "}
              </span>{" "}
              {contentGenerator("howToApplyStep3", store.nativeName, lang)}
            </li>
          </ul>
        </div>
        {/* //Right Section */}
        <div className="lg:col-span-4 flex items-center justify-center w-full">
          <HowToUseSlider
            deal={deal}
            store={store}
            image={image}
            lang={lang}
            applyImageUrl={`${process.env.CDN_URL}assets/step-3-apply-coupon.jpeg`}
          />
        </div>
      </div>
    </>
  );
};

export default HowToUseSection;
