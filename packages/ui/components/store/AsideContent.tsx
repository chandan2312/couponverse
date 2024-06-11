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

const AsideContent = ({
  store,
  couponCount,
  dealCount,
}: {
  store: any;
  couponCount: number;
  dealCount: number;
}) => {
  const lang = process.env.LG || "en";
  return (
    <>
      {/* ---SimilarStores mobile */}
      <SectionWrapper
        title={contentGenerator("similarStoresHeading", store.nativeName, lang)}
        className="order-1 lg:order-4 lg:hidden"
      >
        <div className="">
          {store.similarStores.map((store: any, index: any) => (
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
            <span className="">{couponCount + dealCount}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between px-2">
            <span className="font-semibold">{words.Coupons[lang]}</span>
            <span className="">{couponCount}</span>
          </div>
          <Separator />

          <div className="flex items-center justify-between px-2">
            <span className="font-semibold">{words.Deals[lang]}</span>
            <span className="">{dealCount}</span>
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
      <SectionWrapper
        title={contentGenerator("aboutHeading", store.nativeName, lang)}
        className="order-4 lg:order-3"
      >
        <p>
          {store.description
            .replace(/\*\*\*/g, "")
            .replace(/\*\*/g, "")
            .replace(/\*/g, "")
            .replace(/\#\#\#/g, "")
            .replace(/\#\#/g, "")
            .replace(/\#/g, "")}
        </p>
      </SectionWrapper>
      {/* --- TOC */}
      {/*add table of content */}
      <SectionWrapper
        title={words.Content[lang]}
        className="order-5 lg:order-4"
      >
        <ul className="list-disc list-inside">
          <li>
            <a href="#coupons">{words.Coupons[lang]}</a>
          </li>
          <li>
            <a href="#deals">{words.Deals[lang]}</a>
          </li>
          <li>
            {/* TODO: dynamic */}
            <a href="#similarStores">Similar Stores</a>
          </li>
        </ul>
      </SectionWrapper>

      {/* ---SimilarStores- desktop */}
      <SectionWrapper
        title={contentGenerator("similarStoresHeading", store.nativeName, lang)}
        className="order-1 lg:order-4 max-lg:hidden"
      >
        <div className="">
          {store.similarStores.map((store: any, index: any) => (
            <HorizontalStoreCard store={store} key={index} />
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default AsideContent;
