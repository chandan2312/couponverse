import React from "react";
import Heading from "../custom/Heading";
import Link from "next/link";
import Image from "next/image";
import { Lang } from "../../types";

const TopStoresWidget = ({ stores }: { stores: any }) => {
  const country = process?.env?.NEXT_PUBLIC_COUNTRYCODE;
  const lang: Lang = process?.env?.NEXT_PUBLIC_LG as Lang;
  const cdnUrl = process?.env?.NEXT_PUBLIC_CDN_URL;

  return (
    <div className="w-full">
      <Heading text="Top Stores" tag="h3" />

      <div className="grid grid-cols-12 gap-3">
        {stores.map((store: any, index: any) => {
          const storeName = store.nativeName.find(
            (el: any) => Object.keys(el)[0] == lang,
          )?.[lang];

          return (
            <Link
              href={`/coupons/${store.slug}`}
              key={index}
              className="col-span-3 m-auto border  bg-muted/10 rounded-full p-1 flex items-center justify-center h-auto w-auto"
            >
              <Image
                src={`${cdnUrl}${store.img}`}
                alt={store.name}
                className="max-md:h-16 max-md:w-16 rounded-full"
                width={80}
                height={80}
                title={store.name}
              />
              {/* <span className="text-sm">{store.name}</span> */}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopStoresWidget;
