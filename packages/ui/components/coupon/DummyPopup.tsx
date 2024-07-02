"use client";

import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Clipboard } from "lucide-react";
import { words } from "../../constants/words";
import { cn } from "../../lib/utils";
import { Lang } from "../../types";

const DummyPopup = ({
  deal,
  image,
  lang,
}: {
  deal: any;
  image: string;
  lang: Lang;
}) => {
  const date = new Date();
  const readableDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="rounded-lg bg-card flex flex-col gap-2 items-center p-3 overflow-y-scroll h-full max-md:h-[70vh] min-h-[70vh]">
        <div className="flex items-center gap-4 ">
          <figure className="rounded-md max-w-36 p-2 bg-muted/40">
            <Image
              src={image}
              alt={deal.title}
              height={90}
              width={90}
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </figure>

          <div>
            <h2 className="text-primary/70 leading-5 flex items-center text-lg font-bold">
              {deal.title}
            </h2>

            <div className="flex items-center  gap-4 my-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Button
                    variant="accentOutline"
                    className="flex items-center gap-2"
                  >
                    <span>FREE20</span>
                    <span className=" hover:rounded-full hover:bg-accent hover:text-accent-foreground p-1">
                      <Clipboard />
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 ">
                <div className="p-1 border rounded-lg bg-muted/10">
                  {words.GoToStore[lang]}
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="w-full border-t my-2 border-primary/10" />

        {/* -------------------------- Working or not -------------------------------- */}
        <div className="w-full   px-1.5  flex items-center justify-between gap-2 py-1 ">
          <div>{`${words.IsItWorking[lang]}?`}</div>

          <div className="flex gap-1">
            <Button
              variant="accentOutline"
              size="xs"
              className={`font-semibold bg-accent/60 text-accent-foreground`}
            >
              {words.Yes[lang]}
            </Button>
            <Button
              variant="dangerOutline"
              size="xs"
              className={`font-semibold `}
            >
              {words.No[lang]}
            </Button>
          </div>
        </div>

        <hr className="w-full border-t my-1 border-primary/10" />

        {/* -------------------------- Coupon History -------------------------------- */}

        {/* <div className="w-full bg-card   rounded-md">
          <h2 className=" font-semibold py-2 text-lg text-primary/80 ">
            <span className=" bg-primary/3 py-2 border-b-4 border-primary/80">
              {words.CouponUsageHistory[lang]}
            </span>
          </h2>
          <div className="w-auto  lg:h-2 space-y-2 ">
            <div
              className={cn(
                "text-left border border-muted p-2 rounded-md shadow-md text-sm",
                "bg-green-500/5 border border-green-500",
              )}
            >
              <div className="text-xs text-accent font-semibold">
                {readableDate}
              </div>
              <div className="flex-grow">
                <>
                  {words.AShopperMarkedTheOffer[lang]}
                  <span className="px-2 text-green font-semibold">FREE20</span>
                  <span className="font-semibold text-green-500">
                    {words.asWorking[lang]}
                  </span>
                  .
                </>
              </div>
            </div>
            <div
              className={cn(
                "text-left border border-muted p-2 rounded-md shadow-md text-sm",
                "bg-green-500/5 border border-green-500",
              )}
            >
              <div className="text-xs text-accent font-semibold">
                {readableDate}
              </div>
              <div className="flex-grow">
                <>
                  {words.AShopperMarkedTheOffer[lang]}
                  <span className="px-2 text-green font-semibold">FREE20</span>
                  <span className="font-semibold text-green-500">
                    {words.asWorking[lang]}
                  </span>
                  .
                </>
              </div>
            </div>
            <div
              className={cn(
                "text-left border border-muted p-2 rounded-md shadow-md text-sm",
                "bg-red-500/5 border border-red-500",
              )}
            >
              <div className="text-xs text-accent font-semibold">
                {readableDate}
              </div>
              <div className="flex-grow">
                <>
                  {words.AShopperMarkedTheOffer[lang]}
                  <span className="px-2 text-green font-semibold">FREE20</span>
                  as{" "}
                  <span className="font-semibold text-red-500">
                    {words.asNotWorking[lang]}
                  </span>
                  .
                </>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DummyPopup;
