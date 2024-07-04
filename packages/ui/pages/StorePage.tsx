import { getStorePage, getTrendingStores } from "../actions/store";
import { getPopularCoupons } from "../actions/coupon";
import CouponCard from "../components/coupon/CouponCard";
import SimilarCouponCard from "../components/coupon/SimilarCouponCard";
import StoreFAQs from "../components/store/StoreFAQs";
import TabSelector from "../components/coupon/TabSelector";
import { Separator } from "../components/ui/separator";
import { words } from "../constants/words";
import { contentGenerator } from "../lib/contentGenerator";
import Image from "next/image";
import Link from "next/link";
import { correctPath, generateOffer } from "../lib/utils";
import HowToUseSection from "../components/store/HowToUseSection";

import { notFound, redirect } from "next/navigation";
import SectionWrapper from "../components/store/SectionWrapper";
import LinkButton from "../components/custom/LinkButton";
import Heading from "../components/custom/Heading";
import AsideContent from "../components/store/AsideContent";
import HorizontalStoreCard from "../components/store/HorizontalStoreCard";
import { Lang } from "../types";
import CouponPopup from "../components/coupon/CouponPopup";
import { codeTrim } from "../lib/codeTrim";
import CouponListWidget from "../components/coupon/CouponListWidget";

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

  const country = process.env.COUNTRYCODE || "us";
  const lang: Lang = (process.env.LG as Lang) || "en";

  const validPath = correctPath(lang);
  if (storePath !== validPath) {
    redirect(`/${validPath}/${slug}`);
  }

  const response = await getStorePage(slug, lang, country);
  const store = response.data;
  if (!store) {
    notFound();
  }

  const couponCount = store.coupons?.filter(
    (item: any) => item.type == "CODE",
  )?.length;
  const dealCount = store.coupons?.filter(
    (item: any) => item.type == "DEAL",
  )?.length;

  const theOffer = generateOffer(store.coupons, store.nativeName, lang);

  const popularStoresRes = await getTrendingStores(country);
  const popularStores = popularStoresRes.data;

  const popularCouponsRes = await getPopularCoupons(country);
  const popularCoupons = popularCouponsRes.data;

  if (store.coupons?.length) {
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
            / <li className="font-semibold">{store.nativeName}</li>
          </ul>
        </div>

        {/* ------------------------ Header ------------------------- */}
        <div className="mt-2 mb-4 min-w-[100vw] left-0 right-0 bg-card ">
          <div className="max-w-7xl mx-auto flex gap-2 lg:gap-4 px-2 py-6">
            <figure className="rounded-md w-30 h-30 bg-muted/20 shadow-md flex items-center justify-center p-2">
              <Image
                src={store.img ? `${process.env.CDN_URL}${store.img}` : ""}
                alt=""
                width={120}
                height={120}
                priority
                style={{ objectFit: "contain" }}
                className="rounded-md w-full h-full"
              />
            </figure>

            <div className="flex flex-col justify-between">
              <h2>{store.nativeName}</h2>
              <LinkButton
                link={
                  store.affLink ? store.affLink : store.link ? store.link : ""
                }
                text={`${words.Visit[lang]} ${store.nativeName}`}
              />
            </div>
          </div>
        </div>
        {/* ------------------------ Main ------------------------- */}

        <div className="relative w-full my-4 max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-4">
          {/* ----------------- Right Section --------------------- */}

          <div className="order-first lg:order-last lg:col-span-9 w-full   ">
            {/* --------------- active --------------- */}

            {store.coupons?.filter((item: any) => item.isExpired === false)
              ?.length ? (
              <div>
                <Heading
                  tag="h2"
                  text={contentGenerator(
                    "activeCouponsHeading",
                    store.nativeName,
                    lang,
                  )}
                />
                <TabSelector
                  searchParams={searchParams}
                  tabs={[
                    {
                      name: words.All[lang],
                      value: "all",
                      count: store.coupons?.length,
                    },
                    {
                      name: words.Coupons[lang],
                      value: "coupons",
                      count: couponCount,
                    },
                    {
                      name: words.Deals[lang],
                      value: "deals",
                      count: dealCount,
                    },
                  ]}
                />

                <div className="active-coupons flex flex-col gap-3 my-3">
                  {store.coupons
                    ?.filter((item: any) => item.isExpired === false)
                    ?.map((deal: any) => (
                      <CouponCard
                        store={store}
                        deal={deal}
                        key={deal.id}
                        searchParams={searchParams}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* --------------- expired --------------- */}

            {store?.coupons?.filter((item: any) => item.isExpired === true)
              ?.length ? (
              <div className="lg:col-span-9">
                <Heading
                  tag="h2"
                  text={contentGenerator(
                    "expiredCouponsHeading",
                    store.nativeName,
                    lang,
                  )}
                />

                <div className="expired-coupons flex flex-col gap-3 my-3">
                  {store.coupons
                    ?.filter((item: any) => item.isExpired === true)
                    ?.map((deal: any) => (
                      <CouponCard
                        store={store}
                        deal={deal}
                        key={deal.id}
                        searchParams={searchParams}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* --------------- similarCoupons --------------- */}

            {store?.similarCoupons?.length ? (
              <div>
                <Separator />
                <Heading tag="h2" text={words.SimilarCoupons[lang]} />

                <div className="similar-coupons mx-auto grid grid-cols-2   gap-2 lg:gap-4  p-2">
                  {store.similarCoupons?.map((deal: any, index: any) => (
                    <SimilarCouponCard
                      key={index}
                      deal={deal}
                      hideWeekViews={true}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <></>
            )}
            <Separator />
          </div>
          {/* ----------------- Left Section --------------------- */}

          <aside className="lg:col-span-3 w-full lg:sticky lg:top-20 lg:z-10 ">
            {/* ---STATS */}

            <AsideContent
              store={store}
              couponCount={couponCount}
              dealCount={dealCount}
            />
          </aside>
        </div>

        {/* SECOND PART */}
        {/* --------------- List Coupons --------------- */}

        <div className="w-full mx-auto max-w-7xl grid grid-cols-12 gap-4 ">
          {/* ---------- LEft Section - featured stores ------------ */}
          {popularStores?.length ? (
            <div className="col-span-12 lg:col-span-3 w-full lg:sticky lg:top-20 ">
              <SectionWrapper title={words.FeaturedStores[lang]}>
                {popularStores?.map((store: any, index: any) => (
                  <HorizontalStoreCard key={index} store={store} />
                ))}
              </SectionWrapper>
            </div>
          ) : (
            <></>
          )}
          {/* ---------- Right Section ------------ */}
          <div className="col-span-12 lg:col-span-9 w-full lg:col-start-4 lg:sticky lg:z-10 p-2">
            {/* --- ListCoupons */}
            {couponCount ? (
              <Heading
                tag="h2"
                text={contentGenerator(
                  "popularCouponsHeading",
                  store.nativeName,
                  lang,
                )}
              />
            ) : (
              <></>
            )}

            {/* --- coupons list */}

            {couponCount &&
            store.coupons
              ?.filter((item: any) => item.isExpired != true)
              ?.filter((item: any) => item.type == "CODE")?.length ? (
              <CouponListWidget store={store} />
            ) : (
              <></>
            )}

            {/* --- About */}

            <Heading
              tag="h2"
              text={contentGenerator("aboutHeading", store.nativeName, lang)}
            />

            <div className="card-section">
              <div className="lg:flex gap-4 items-center">
                <div className="flex items-center justify-center">
                  <Image
                    src={`${process.env.CDN_URL}${store.img}`}
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
                    theOffer,
                    "",
                    couponCount,
                    dealCount,
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
              <HowToUseSection store={store} />
            </div>

            <Heading
              tag="h2"
              text={contentGenerator(
                "popularCouponsHeading",
                store.nativeName,
                lang,
              )}
            />

            <div className="card-section w-full">
              {popularCoupons?.map((coupon: any, index: any) => (
                <div key={index} className="w-full">
                  <div className="w-full flex items-center gap-3 ">
                    <figure className="w-28 h-28 p-1 m-auto flex items-center justify-center flex-shrink-0">
                      <Image
                        src={`${process.env.CDN_URL}${coupon.store.img}`}
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
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default StorePage;
