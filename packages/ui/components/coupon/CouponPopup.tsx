"use client";

import React, { Suspense, use, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { words } from "../../constants/words";
import Link from "next/link";
import Image from "next/image";
import { faker } from "@faker-js/faker";
import { codeTrim } from "../../lib/codeTrim";
import { Clipboard, Eye, History } from "lucide-react";
import CouponWorking from "../coupon/CouponWorking";
import { addCouponView, increaseCouponViews } from "../../actions/coupon";
import { cn } from "../../lib/utils";
import { Lang } from "../../types";

const CouponPopup = ({
  deal,
  store,
  lang,
  cdnUrl,
  isHistoryPopup = false,
  isListPopup = false,
  fullWidth = false,
}: {
  deal: any;
  lang: Lang;
  cdnUrl: any;
  store: any;
  isHistoryPopup?: boolean;
  isListPopup?: boolean;
  fullWidth?: boolean;
}) => {
  const trimmedCode = codeTrim(deal.code);
  const [currCode, setCurrCode] = useState(trimmedCode);
  const [isUpdated, setIsUpdated] = useState(false);

  const dealHistory = deal.voteHistory;

  //add couponview only if deal not present in localstorage in last 24 hr

  const addViewsHandler = async (dealId: any) => {
    //TODO: viewsThreshold count not increasing in db
    const visitedDealsJson = localStorage.getItem("visitedDeals");
    const visitedDeals = visitedDealsJson ? JSON.parse(visitedDealsJson) : [];
    const visitedDeal = visitedDeals.find(
      (deal: any) =>
        deal.id === dealId && deal.time > Date.now() - 1000 * 60 * 60 * 24,
    );

    if (!visitedDeal) {
      const res = await addCouponView(dealId);

      if (res.status === 200) {
        setIsUpdated(true);
        visitedDeals.push({ id: dealId, time: Date.now() });
        localStorage.setItem("visitedDeals", JSON.stringify(visitedDeals));
      }
    }
  };

  return (
    <Dialog>
      <Suspense fallback={<div>Loading...</div>}>
        <DialogTrigger>
          {!isHistoryPopup &&
            !isListPopup &&
            (deal.type == "CODE" ? (
              <div className="relative w-full min-w-[104px] md:min-w-32">
                <div
                  className={cn(
                    "min-w-[80%] md:min-w-[85%]  h-8 overflow-y-hidden absolute top-0 left-0 bg-accent/70 border-b-4 border-b-accent p-1 active:border-b-none active:bg-accent-accent/90 text-accent-foreground flex items-center justify-center cursor-pointer rounded-l-full",
                  )}
                  onClick={() => addViewsHandler(deal.id)}
                >
                  <span className="w-full block mx-1 max-md:text-xs text-sm">
                    {
                      //@ts-ignore
                      words.SHOWCODE[lang]
                    }
                  </span>
                </div>

                <div
                  className={cn(
                    "w-full  h-8 text-accent/80 overflow-y-hidden  border-b-4 border-b-accent active:border-b-none  flex justify-end items-center p-1 px-2 border-2 border-accent/70 rounded-full max-md:text-xs",
                    fullWidth ? "min-w-48" : "max-md:min-w-36",
                  )}
                >
                  <span className="overflow-hidden w-full flex  justify-end">
                    {trimmedCode}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="min-w-36 h-8 overflow-y-hidden bg-accent/70 p-1 text-accent-foreground flex items-center justify-center cursor-pointer rounded-full px-2 border-2 border-accent/70 border-b-4 border-b-accent active:border-b-0"
                  onClick={() => addViewsHandler(deal.id)}
                >
                  <span className="mx-1 max-md:text-xs text-sm">
                    {
                      //@ts-ignore
                      words.VIEWDEAL[lang]
                    }
                  </span>
                </div>
              </div>
            ))}

          {isHistoryPopup && (
            <span className="flex gap-2 items-center">
              <History size={16} />
            </span>
          )}

          {isListPopup && (
            <span className="flex gap-2 items-center">
              <Eye size={16} />
            </span>
          )}
        </DialogTrigger>
      </Suspense>

      <DialogContent className="max-md:h-[95vh] min-h-[70vh] my-auto overflow-hidden">
        <div></div>
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          <DialogDescription className="flex flex-col gap-2 items-center p-3 overflow-y-scroll h-full max-md:h-[95vh] min-h-[70vh]">
            <div className="flex items-center gap-2 ">
              {deal?.store?.img || store?.img ? (
                <figure className="bg-muted/20 rounded-md shadow-md p-1">
                  <Image
                    src={
                      deal?.store?.img
                        ? `${cdnUrl}${deal?.store?.img}`
                        : store?.img && `${cdnUrl}${store?.img}`
                    }
                    alt={deal.title}
                    height={90}
                    width={90}
                    objectFit="contain"
                    className="rounded-md"
                  />
                </figure>
              ) : (
                <figure className="flex items-center justify-center p-0.5">
                  <p className="text-wrap font-semibold">
                    {deal?.store?.nativeName || store?.nativeName}
                  </p>
                </figure>
              )}

              <h2 className="text-primary/70 leading-5 flex items-center text-lg font-bold">
                {deal.title}
              </h2>
            </div>

            <div className="flex items-center gap-4 ">
              {deal.type == "CODE" && (
                <div className="relative">
                  <Button
                    variant="accentOutline"
                    className="flex items-center gap-2"
                  >
                    <span>{currCode}</span>
                    <span
                      onClick={async () => {
                        // await addView(deal.id);
                        navigator.clipboard.writeText(currCode);
                        if (currCode == trimmedCode) {
                          setCurrCode(deal.code);
                        }
                      }}
                      className=" hover:rounded-full hover:bg-accent hover:text-accent-foreground p-1"
                    >
                      <Clipboard />
                    </span>
                  </Button>
                </div>
              )}

              <Button variant="accentOutline">
                <Link
                  href={
                    deal?.store?.affLink
                      ? `${deal?.store?.affLink}`
                      : `${deal?.store?.link}`
                  }
                >
                  {
                    //@ts-ignore
                    words.GoToStore[lang]
                  }
                </Link>
              </Button>
            </div>

            {deal.type == "CODE" && currCode != trimmedCode && (
              <p>
                The code is copied to your clipboard. You can visit store page
                now
              </p>
            )}

            <hr className="w-full border-t my-2 border-primary/10" />

            {/* -------------------------- Working or not -------------------------------- */}
            <div className="w-full   px-1.5  flex items-center justify-between gap-2 py-1 ">
              <CouponWorking deal={deal} lang={lang || "en"} />
            </div>

            <hr className="w-full border-t my-2 border-primary/10" />

            {/* -------------------------- Coupon History -------------------------------- */}

            <div className="w-full bg-card space-y-2 p-2 rounded-md">
              <h2 className=" font-semibold my-4 py-2 text-lg text-primary/80 ">
                <span className=" bg-primary/3 py-2 border-b-4 border-primary/80">
                  {words.CouponUsageHistory[lang]}
                </span>
              </h2>
              <div className="w-auto  lg:h-2 space-y-2 ">
                {dealHistory &&
                  dealHistory?.map((history: any, index: number) => {
                    const date = new Date(history.time);
                    const readableDate = date.toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                    return (
                      <div
                        className={cn(
                          "text-left border border-muted p-2 rounded-md shadow-md text-sm",
                          history.vote == "yes"
                            ? "bg-green-500/5 border border-green-500"
                            : "bg-red-500/5 border border-red-500",
                        )}
                        key={index}
                      >
                        <div className="text-xs text-accent font-semibold">
                          {readableDate}
                        </div>
                        <div className="flex-grow">
                          {deal.type == "CODE" ? (
                            <>
                              {words.AShopperMarkedTheOffer[lang]}
                              <span className="px-2 text-green font-semibold">
                                {currCode}
                              </span>
                              as{" "}
                              {history.vote == "yes" ? (
                                <span className="font-semibold text-green-500">
                                  {words.asWorking[lang]}
                                </span>
                              ) : (
                                <span className="font-semibold text-red-500">
                                  {words.asNotWorking[lang]}
                                </span>
                              )}
                              .
                            </>
                          ) : (
                            <>
                              A Shopper voted this deal as{" "}
                              {history.vote == "yes" ? (
                                <span className="font-semibold text-green-500">
                                  {words.asWorking[lang]}
                                </span>
                              ) : (
                                <span className="font-semibold text-red-500">
                                  {words.asNotWorking[lang]}
                                </span>
                              )}
                              .
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CouponPopup;
