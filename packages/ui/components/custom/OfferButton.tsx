import React from "react";
import { words } from "../../constants/words";
import { cn } from "../../lib/utils";
import { codeTrim } from "../../lib/codeTrim";
import Link from "next/link";
import { Lang } from "../../types";

const OfferButton = ({
  code,
  slug,
  isExpired,
}: {
  code?: string;
  slug: string;
  isExpired?: boolean;
}) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE || "us";
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  if (code) {
    const trimmedCode = codeTrim(code);
    return (
      <div className="relative  w-[220px]    ">
        <Link
          href={`/offer/${slug}`}
          className={cn(
            "min-w-[80%] md:min-w-[85%] h-7 md:h-8  overflow-y-hidden absolute top-0 left-0 bg-accent/70 border-b-4 border-b-accent p-1 active:border-b-none active:bg-accent-accent/90 text-accent-foreground flex items-center justify-center cursor-pointer rounded-l-full",
          )}
          //  onClick={() => addViewsHandler(deal.id)}
        >
          <span className="flex items-center justify-center font-semibold w-full mx-1  text-xs">
            {
              //@ts-ignore
              words.SHOWCODE[lang]
            }
          </span>
        </Link>

        <div
          className={cn(
            "w-full  h-7 md:h-8 text-accent/80 overflow-y-hidden border-b-4 border-b-accent active:border-b-none flex justify-end items-center  border-2 border-accent/70 rounded-full max-md:text-xs ",
          )}
        >
          <span className=" overflow-hidden w-full flex justify-end px-2">
            {trimmedCode}
          </span>
        </div>
      </div>
    );
  }

  //---------------- else
  return (
    <Link
      href={`/offer/${slug}`}
      className={cn(
        " flex items-center justify-center bg-accent/80 border border-accent border-b-accent border-b-4 cursor-pointer hover:border-b-0 active:border-b-0 hover:bg-accent2/70 active:bg-accent2/70 hover:border-accent2 active:border-accent2 text-accent-foreground  font-semibold  rounded-full w-full lg:w-56 h-7 md:h-8 overflow-hidden ",
        lang == "ru" ? "text-xs" : "text-sm",
      )}
    >
      {words.VIEWDEAL[lang]}
    </Link>
  );
};

export default OfferButton;
