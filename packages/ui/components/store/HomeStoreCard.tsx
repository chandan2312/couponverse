import { Lang } from "../../types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { correctPath, generateOffer } from "../../lib/utils";
import { words } from "../../constants/words";

const HomeStoreCard = ({
  store,
  includeOffer = false,
}: {
  store: any;
  includeOffer?: boolean;
}) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const cpath = correctPath(lang);

  return (
    <>
      <div className="bg-muted/10 border border-muted/40 rounded-md p-1  flex flex-col gap-1">
        {/* store logo */}
        <Link
          href={`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${store.slug}`}
          className=" shadow-sm mx-auto  h-24  p-1.5 my-1   flex items-center justify-center"
        >
          <Image
            src={
              store?.img
                ? `${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`
                : store.sourceImg
            }
            width={75}
            height={75}
            style={{ objectFit: "contain" }}
            alt={store.nativeName || store.name}
            className="bg-card w-full m-auto  rounded-md "
          />
        </Link>

        <div className="h-full flex flex-col items-center max-md:justify-between md:justify-center">
          <Link
            href={`${process.env.PROTOCOL}${process.env.NEXT_PUBLIC_DOMAIN}/${cpath}/${store.slug}`}
            className=""
          >
            <h3 className="font-semibold text-accent max-md:text-sm text-center ">
              <span className="overflow-hidden">
                {store.nativeName || store.name}
              </span>
            </h3>
          </Link>
          {includeOffer && (
            <span className="py-1 text-xs text-accent">
              {generateOffer(store.coupons, store.nativeName, lang)}
            </span>
          )}
          {store.couponCount && (
            <p className="text-sm">
              <span>{store.couponCount}</span> {words.Coupons[lang]}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeStoreCard;
