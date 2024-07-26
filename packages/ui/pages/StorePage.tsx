import StoreFAQs from "../components/store/StoreFAQs";
import { Separator } from "../components/ui/separator";
import { words } from "../constants/words";
import { contentGenerator } from "../lib/contentGenerator";
import Image from "next/image";
import Link from "next/link";
import { correctPath, generateOffer } from "../lib/utils";
import HowToUseSection from "../components/store/HowToUseSection";
import prisma from "../lib/db";
import { notFound, redirect } from "next/navigation";
import SectionWrapper from "../components/store/SectionWrapper";
import LinkButton from "../components/custom/LinkButton";
import Heading from "../components/custom/Heading";
import AsideContent from "../components/store/AsideContent";
import HorizontalStoreCard from "../components/store/HorizontalStoreCard";
import { Lang } from "../types";
import CouponListWidget from "../components/coupon/CouponListWidget";
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
  slug,
  storePath,
  searchParams,
}: {
  slug: string;
  storePath: string;
  searchParams: any;
}) => {
  if (!slug) {
    notFound();
  }

  const country = process.env.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const perpage = 2;

  const [storeRes, couponsRes, offersRes] =
    // popularStores, popularCoupons, popularOffers
    await Promise.all([
      // store
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/store/get?slug=${slug}&country=${country}&lang=${lang}`,
      ), //TODO: select fields
      // coupons
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?shop=${slug}&orderby=hotness_desc&country=${country},in&lang=${lang}&page=1&perpage=${perpage}&morefields=viewsArr,upvotesArr,downvotesArr`,
      ),
      // offers
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?shop=${slug}&orderby=hotness_desc&country=${country}&lang=${lang}&page=1&perpage=${perpage}&morefields=upvotesArr,downvotesArr`,
      ),
      // popularStores
      // axios.get(
      //   `${process.env.NEXT_PUBLIC_BACK_URL}/store/getMany?orderby=views_desc&country=${country}&lang=${lang}&page=1&perpage=2`,
      // ),
      // // popularCoupons
      // axios.get(
      //   `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?country=${country}&page=1&perpage=3`,
      // ),
      // // popularOffers
      // axios.get(
      //   `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?country=${country}&page=1&perpage=3`,
      // ),
    ]);

  if (storeRes.status !== 200 || !storeRes.data) notFound();
  if (couponsRes.status !== 200 || offersRes.status !== 200) notFound();
  const store = storeRes.data; // store
  const coupons = couponsRes.data || []; // coupons
  const offers = offersRes.data || []; // offers

  // console.log("store", store);

  const couponCount = coupons?.length || 0;
  // const theOffer = generateOffer(coupons, store.nativeName, lang);

  if (coupons?.length) {
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
              <Link href="/stores/all">{words.Stores[lang]}</Link>
            </li>{" "}
            / <li className="font-semibold">{store.nativeName}</li>
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
              <h2>{store.nativeName}</h2>
              <LinkButton
                link={
                  store?.affLink ? store.affLink : store.link ? store.link : ""
                }
                text={`${words.Visit[lang]} ${store.nativeName}`}
              />
            </div>
          </div>
        </div>
        {/* ------------------------ Main ------------------------- */}

        <div className="relative w-full my-4 max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-4">
          {/* ----------------- left Section --------------------- */}
          {/* ----------------- TABS  */}

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
                  {offers?.length ? "Offers" : "Deals"}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="w-full">
                {/* ----------- ALL - Coupons --------------- */}
                <div>
                  <div>
                    <Heading
                      tag="h2"
                      text={contentGenerator(
                        "activeCouponsHeading",
                        store.nativeName,
                        lang,
                      )}
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
                        morefields: "upvotesArr,downvotesArr",
                        lang: lang,
                        page: 2,
                        perpage: perpage,
                      }}
                    />
                  </div>
                  )
                </div>
                {/* ----------- ALL - Offers --------------- */}

                <Heading
                  tag="h2"
                  text={contentGenerator(
                    "expiredCouponsHeading",
                    store.nativeName,
                    lang,
                  )} //TODO: offer title
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
                      morefields: "upvotesArr,downvotesArr",
                      lang: lang,
                      page: 2,
                      perpage: perpage,
                    }}
                  />
                </>
              </TabsContent>
              <TabsContent value="coupons" className="w-full">
                <Heading
                  tag="h2"
                  text={contentGenerator(
                    "expiredCouponsHeading",
                    store.nativeName,
                    lang,
                  )} //TODO: offer title
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
                      morefields: "upvotesArr,downvotesArr",
                      lang: lang,
                      page: 2,
                      perpage: perpage,
                    }}
                  />
                </>
              </TabsContent>
              {offers?.length && (
                <TabsContent value="offers" className="w-full">
                  <Heading
                    tag="h2"
                    text={contentGenerator(
                      "expiredCouponsHeading",
                      store.nativeName,
                      lang,
                    )} //TODO: offer title
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
                        morefields: "upvotesArr,downvotesArr",
                        lang: lang,
                        page: 2,
                        perpage: perpage,
                      }}
                    />
                  </>
                </TabsContent>
              )}
            </Tabs>

            <Separator />
          </div>
          {/* ----------------- right Section --------------------- */}

          <aside className="lg:col-span-3 w-full lg:sticky lg:top-20 lg:z-10 ">
            {/* ---STATS */}

            <AsideContent
              store={store}
              couponCount={couponCount}
              offerCount={offers?.length || 0}
            />
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
              text={contentGenerator("aboutHeading", store.nativeName, lang)}
            />

            <div className="card-section">
              <div className="lg:flex gap-4 items-center">
                <div className="flex items-center justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`}
                    alt=""
                    width={200}
                    height={200}
                    priority
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

                <p>
                  {contentGenerator(
                    "aboutContent",
                    store.nativeName,
                    lang,
                    // theOffer,
                    "",
                    couponCount,
                    offers?.length,
                  )}
                </p>
              </div>
            </div>

            {/* --- FAQs */}

            <Heading
              tag="h2"
              text={contentGenerator("faqHeading", store.nativeName, lang)}
            />

            <div className="card-section">
              <StoreFAQs name={store.nativeName} lang={lang} />
            </div>

            <Heading
              tag="h2"
              text={contentGenerator(
                "howToApplyHeading",
                store.nativeName,
                lang,
              )}
            />

            <div className="card-section">
              <HowToUseSection store={store} coupons={coupons} />
            </div>

            <Heading
              tag="h2"
              text={contentGenerator(
                "popularCouponsHeading",
                store.nativeName,
                lang,
              )}
            />

            {/* <div className="card-section w-full">
              {popularCoupons?.map((coupon: any, index: any) => (
                <div key={index} className="w-full">
                  <div className="w-full flex items-center gap-3 ">
                    <figure className="w-28 h-28 p-1 m-auto flex items-center justify-center flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_CDN_URL}${coupon.store.img}`}
                        alt={coupon.title}
                        width={100}
                        height={100}
                        priority
                        style={{ objectFit: "contain" }}
                        className="rounded-md"
                      />
                    </figure>

                    <h4 className="font-semibold">{coupon.offer}</h4>

                    <p className="flex-grow">{coupon.title}</p>
                    <Link href={`/${validPath}/${coupon.store.slug}`}>
                      View
                    </Link>
                  </div>

                  <Separator />
                </div>
              ))}
            </div> */}
          </div>

          {/* ---------- Right Section - featured stores ------------ */}
          {/* {popularStores?.length ? (
            <div className="col-span-12 lg:col-span-3 w-full lg:sticky lg:top-20 ">
              <SectionWrapper title={words.FeaturedStores[lang]}>
                {popularStores?.map((store: any, index: any) => (
                  <HorizontalStoreCard key={index} store={store} />
                ))}
              </SectionWrapper>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </>
    );
  }
};

export default StorePage;
