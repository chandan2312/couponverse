import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { words } from "../../constants/words";
import { Lang } from "../../types";

const HorizontalStoreCard = ({ store }: { store: any }) => {
  const lang: Lang = (process.env.LG as Lang) || "en";

  return (
    <>
      <div className="flex gap-4 my-1">
        <figure className="rounded-md bg-muted/20 p-1">
          <Image
            src={
              store.img ? `${process.env.CDN_URL}${store.img}` : store.sourceImg
            }
            width={90}
            height={60}
            alt={store.nativeName}
            className="rounded-md "
          />
        </figure>
        <div>
          <Link href={store.affLink ? store.affLink : store.link}>
            <h3 className="font-semibold  flex gap-1 items-center">
              {store.nativeName} <Link2 size={16} />
            </h3>
            <p className="text-xs">
              {store.coupons.length} {words.Coupons[lang]}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HorizontalStoreCard;
