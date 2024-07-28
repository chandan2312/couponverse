import React from "react";
import { Separator } from "../ui/separator";
import SectionWrapper from "./SectionWrapper";
import { contentGenerator } from "../../lib/contentGenerator";
import Image from "next/image";
import Link from "next/link";
import { Link2 } from "lucide-react";
import { words } from "../../constants/words";
import Rating from "react-rating";
import HorizontalStoreCard from "./HorizontalStoreCard";
import { Lang } from "../../types";

const AsideContent = ({
  store,
  couponCount,
  offerCount,
}: {
  store: any;
  couponCount: number;
  offerCount: number;
}) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  return (
    <>
      {/* ---SimilarStores mobile */}
      <SectionWrapper
        title={contentGenerator({
          type: "similarStoresHeading",
          name: store.nativeName,
        })}
        className="order-1 lg:order-4 lg:hidden"
      >
        <div className="">
          {store.similarStores?.map((store: any, index: any) => (
            <HorizontalStoreCard store={store} key={index} />
          ))}
        </div>
      </SectionWrapper>
      <SectionWrapper
        title={words.StoreStats[lang]}
        className="order-2 lg:order-1"
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="font-semibold">{words.TotalOffers[lang]}</span>
            <span className="">
              {store._count.coupons + store._count.offers}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-2">
            <span className="font-semibold">{words.Coupons[lang]}</span>
            <span className="">{store._count.coupons}</span>
          </div>
          <Separator />

          <div className="flex items-center justify-between px-2">
            <span className="font-semibold">{words.Deals[lang]}</span>
            <span className="">{store._count.offers}</span>
          </div>
        </div>
      </SectionWrapper>
      {/* ---Rating */}
      <SectionWrapper
        title={`${store.nativeName} ${words.Ratings[lang]}`}
        className="order-3 lg:order-2"
      >
        {/* TODO: Add rating component here */}
        ⭐⭐⭐⭐⭐
      </SectionWrapper>
      {/* ---ABOUT */}

      {/* --- TOC */}
      {/*add table of content */}
      <SectionWrapper
        title={words.Content[lang]}
        className="order-5 lg:order-4"
      >
        <ul className="list-disc list-inside">
          <li>
            <Link href="#coupons">{words.Coupons[lang]}</Link>
          </li>
          <li>
            <Link href="#deals">{words.Deals[lang]}</Link>
          </li>
          <li>
            {/* TODO: dynamic */}
            <Link href="#similarStores">Similar Stores</Link>
          </li>
        </ul>
      </SectionWrapper>
    </>
  );
};

export default AsideContent;
