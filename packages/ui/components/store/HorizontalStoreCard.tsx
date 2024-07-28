import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { words } from "../../constants/words";
import { Lang } from "../../types";
import { correctPath } from "../../lib/utils";

const HorizontalStoreCard = ({ store }: { store: any }) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const cpath = correctPath(lang);

  return (
    <>
      <div className="flex gap-4 my-1">
        <Link
          className="text-lg font-semibold rounded-md bg-muted/20 p-1"
          href={`/${cpath}/${store.slug}`}
        >
          <Image
            src={
              store.img
                ? `${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`
                : store.sourceImg
            }
            width={90}
            height={60}
            alt={store.nativeName}
            className="rounded-md "
          />
        </Link>
        <div>
          <h3 className="font-semibold  flex gap-4 items-center">
            <Link
              className="text-lg font-semibold"
              href={`/${cpath}/${store.slug}`}
            >
              {store.nativeName}
            </Link>
            <Link href={store.affLink ? store.affLink : store.link}>
              {" "}
              <Link2 size={16} />
            </Link>
          </h3>
          <p className="text-xs">
            {store.coupons?.length} {words.Coupons[lang]}
          </p>
        </div>
      </div>
    </>
  );
};

export default HorizontalStoreCard;
