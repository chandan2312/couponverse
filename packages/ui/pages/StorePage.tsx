import StoreFAQs from "../components/store/StoreFAQs";
import { Separator } from "../components/ui/separator";
//@ts-ignore
import { words } from "../constants/words";
import { contentGenerator } from "../lib/contentGenerator";
import Image from "next/image";
import Link from "next/link";
import HowToUseSection from "../components/store/HowToUseSection";
import { notFound, redirect } from "next/navigation";
import SectionWrapper from "../components/store/SectionWrapper";
import LinkButton from "../components/custom/LinkButton";
import Heading from "../components/custom/Heading";
import AsideContent from "../components/store/AsideContent";
import { Lang } from "../types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import axios from "axios";
import OfferCard from "../components/offer/OfferCard";
import MoreOffers from "../components/offer/MoreOffers";
import CouponCard from "../components/coupon/CouponCard";
import TrendingCoupons from "../components/coupon/TrendingCoupons";
import TrendingOffers from "../components/offer/TrendingOffers";

const StorePage = async ({
  data,
  slug,
  searchParams,
}: {
  data: any;
  slug: string;
  searchParams: any;
}) => {
  if (!slug) {
    notFound();
  }

  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;

  const store = data.store; // store
  const coupons = data.coupons || []; // coupons
  const offers = data.offers || []; // offers

  const storeName =
    typeof store?.nativeName == "string" ? store.nativeName : "";

  // const couponCount = coupons?.length || 0;
  // const theOffer = generateOffer(coupons, store.nativeName, lang);

  return (
    <>
      {/* ------------------------ Breadcrumb ------------------------- */}

      <div className="mx-auto max-w-7xl">
        <ul id="breadcrumb" className="flex gap-2 text-sm">
          <li>
            <Link href="/">{words.Home[lang]}</Link>
          </li>{" "}
          /{" "}
          <li>
            <Link href="/stores">{words.Stores[lang]}</Link>
          </li>{" "}
          / <li className="font-semibold">{storeName}</li>
        </ul>
      </div>

      {/* ------------------------ Header ------------------------- */}
      <div className="mt-2 mb-4 min-w-[100vw] left-0 right-0 bg-card ">
        <div className="max-w-7xl mx-auto flex gap-2 lg:gap-4 px-2 py-6">
          <figure className="rounded-md w-30 h-30 bg-muted/20 shadow-md flex items-center justify-center p-2">
            <Image
              src={
                store?.img
                  ? `${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`
                  : ""
              }
              alt=""
              width={90}
              height={90}
              priority
              style={{ objectFit: "contain" }}
              className="rounded-md w-full h-full"
            />
          </figure>

          <div className="flex flex-col justify-center gap-2">
            <h2>{storeName}</h2>
            <LinkButton
              link={
                store?.affLink ? store.affLink : store.link ? store.link : ""
              }
              text={`${words.Visit[lang]} ${storeName}`}
            />
          </div>
        </div>
      </div>
      {/* ------------------------ Main ------------------------- */}

      <div className="relative w-full my-4 max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-4">
        {/* ----------------- left Section --------------------- */}
        {/* ----------------- TABS  */}

        {coupons.length > 0 || offers.length > 0 ? (
          <div className=" lg:col-span-9 w-full  ">
            <Tabs defaultValue="all" className="sticky top-0 z-40">
              <TabsList className="w-full  bg-transparent mx-3">
                <TabsTrigger value="all" className="min-w-20 min-h-8 p-auto">
                  ALL
                </TabsTrigger>
                <TabsTrigger
                  value="coupons"
                  className="min-w-20 min-h-8 p-auto"
                >
                  Coupons
                </TabsTrigger>
                <TabsTrigger value="offers" className="min-w-20 min-h-8 p-auto">
                  Offers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="w-full">
                {/* ----------- ALL - Coupons --------------- */}
                <div>
                  <div>
                    <Heading
                      tag="h2"
                      text={contentGenerator({
                        type: "activeCouponsHeading",
                        name: storeName,
                      })}
                    />

                    <div className="active-coupons flex flex-col gap-5">
                      {coupons.map((coupon: any) => (
                        <CouponCard
                          store={store}
                          coupon={coupon}
                          key={coupon.id}
                        />
                      ))}
                    </div>

                    <MoreOffers
                      store={store}
                      type="coupons"
                      params={{
                        shop: store.slug,
                        country: country,
                        orderby: "hotness_desc",
                        morefields: "upvotes,downvotes",
                        lang: lang,
                        page: 3,
                        perpage: 5,
                      }}
                    />
                  </div>
                </div>
                {/* ----------- ALL - Offers --------------- */}

                <Heading
                  tag="h2"
                  text={contentGenerator({
                    type: "expiredCouponsHeading",
                    name: storeName,
                  })} //TODO: offer title
                />

                <>
                  <div className="space-y-4 ">
                    {offers?.map((offer: any, index: number) => {
                      if (index == 3) {
                      }
                      return <OfferCard key={offer.id} offer={offer} />;
                    })}
                  </div>

                  <MoreOffers
                    store={store}
                    type="offers"
                    params={{
                      shop: store.slug,
                      country: country,
                      orderby: "hotness_desc",
                      morefields: "upvotes,downvotes",
                      lang: lang,
                      page: 3,
                      perpage: 5,
                    }}
                  />
                </>
              </TabsContent>
              <TabsContent value="coupons" className="w-full">
                <Heading
                  tag="h2"
                  text={contentGenerator({
                    type: "expiredCouponsHeading",
                    name: storeName,
                  })} //TODO: offer title
                />

                <>
                  <div className="space-y-4 ">
                    {coupons?.map((coupon: any, index: number) => {
                      if (index == 3) {
                      }
                      return (
                        <CouponCard
                          store={store}
                          key={coupon.id}
                          coupon={coupon}
                        />
                      );
                    })}
                  </div>

                  <MoreOffers
                    store={store}
                    type="coupons"
                    params={{
                      shop: store.slug,
                      country: country,
                      orderby: "hotness_desc",
                      morefields: "upvotes,downvotes",
                      lang: lang,
                      page: 3,
                      perpage: 5,
                    }}
                  />
                </>
              </TabsContent>
              {offers?.length && (
                <TabsContent value="offers" className="w-full">
                  <Heading
                    tag="h2"
                    text={contentGenerator({
                      type: "expiredCouponsHeading",
                      name: storeName,
                      lang,
                    })} //TODO: offer title
                  />

                  <>
                    <div className="space-y-4 ">
                      {offers?.map((offer: any, index: number) => {
                        if (index == 3) {
                        }
                        return <OfferCard key={offer.id} offer={offer} />;
                      })}
                    </div>

                    <MoreOffers
                      store={store}
                      type="offers"
                      params={{
                        shop: store.slug,
                        country: country,
                        orderby: "hotness_desc",
                        morefields: "upvotes,downvotes",
                        lang: lang,
                        page: 3,
                        perpage: 5,
                      }}
                    />
                  </>
                </TabsContent>
              )}
            </Tabs>

            <Separator />
          </div>
        ) : (
          <div className="p-2  rounded-lg shadow-md bg-card w-full h-full min-h-52 flex items-center justify-center">
            No working Coupons and Offers available for {store.nativeName}
          </div>
        )}
        {/* ----------------- right Section --------------------- */}

        <aside className="lg:col-span-3 w-full lg:sticky lg:top-20 lg:z-10 ">
          {/* ---STATS */}

          {/* <AsideContent
              store={store}
              couponCount={couponCount}
              offerCount={offers?.length || 0}
            /> */}
        </aside>
      </div>

      {/* SECOND PART */}
      {/* --------------- List Coupons --------------- */}

      <div className="w-full mx-auto max-w-7xl grid grid-cols-12 gap-4 ">
        {/* ---------- Left Section ------------ */}
        <div className="col-span-12 lg:col-span-9 w-full  lg:sticky lg:z-10 p-2">
          {/* --- ListCoupons */}

          <TrendingOffers />

          <TrendingCoupons />

          {/* --- coupons list area */}

          {/* {couponCount ?
            <CouponListWidget store={store} />
            ) : (
              <></>
            )} */}

          {/* --- About */}

          <Heading
            tag="h2"
            text={contentGenerator({ type: "aboutHeading", name: storeName })}
          />

          <div className="card-section">
            <div className="lg:flex gap-4 items-center">
              <div className="flex items-center justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`}
                  alt=""
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                  className="rounded-md"
                />
              </div>

              {store.description ? (
                <p>
                  {store.description
                    .replace(/\*\*\*/g, "")
                    .replace(/\*\*/g, "")
                    .replace(/\*/g, "")
                    .replace(/\#\#/g, "")
                    .replace(/\#/g, "")}
                </p>
              ) : (
                <></>
              )}

              {coupons.length ? (
                <p>
                  {contentGenerator({
                    type: "aboutContent",
                    name: storeName,
                    coupon: coupons.length,
                    offers: offers?.length,
                  })}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* --- FAQs */}

          <Heading
            tag="h2"
            text={contentGenerator({
              type: "faqHeading",
              name: storeName,
            })}
          />

          <div className="card-section">
            <StoreFAQs name={storeName} lang={lang} />
          </div>

          {coupons?.length > 0 ? (
            <>
              <Heading
                tag="h2"
                text={contentGenerator({
                  text: "howToApplyHeading",
                  name: storeName,
                })}
              />

              <div className="card-section">
                <HowToUseSection store={store} coupons={coupons} />
              </div>
            </>
          ) : (
            <></>
          )}

          <Heading
            tag="h2"
            text={contentGenerator({
              type: "popularCouponsHeading",
              name: storeName,
            })}
          />
        </div>
      </div>
    </>
  );
};

export default StorePage;
