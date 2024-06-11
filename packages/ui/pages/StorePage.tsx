import { getStorePage } from "../actions/store";
import CouponCard from "../components/coupon/CouponCard";
import SimilarCouponCard from "../components/coupon/SimilarCouponCard";
import SimilarStoreCard from "../components/store/SimilarStoreCard";
import StoreFAQs from "../components/store/StoreFAQs";
import TabSelector from "../components/coupon/TabSelector";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { words } from "../constants/words";
import { contentGenerator } from "../lib/contentGenerator";
import filterCoupons from "../lib/filterCoupons";
import Image from "next/image";
import Link from "next/link";
import { correctPath, generateOffer } from "../lib/utils";
import HowToUseSection from "../components/store/HowToUseSection";
import { notFound, redirect } from "next/navigation";
import AddStoreView from "../components/store/AddStoreView";
import SectionWrapper from "../components/store/SectionWrapper";
import LinkButton from "../components/custom/LinkButton";
import HomeStoreCard from "../components/store/HomeStoreCard";
import { Link2 } from "lucide-react";
import Heading from "../components/custom/Heading";
import AsideContent from "../components/store/AsideContent";
import HorizontalStoreCard from "../components/store/HorizontalStoreCard";

export const revalidate = 86400; //24 hr

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
  const lang = process.env.LG || "en";

  const validPath = correctPath(lang);
  if (storePath !== validPath) {
    redirect(`/${validPath}/${slug}`);
  }

  const response = await getStorePage(slug, lang, country);
  const store = response.data;
  if (!store) {
    notFound();
  }

  const newCoupons = filterCoupons(store.coupons);
  const couponCount = newCoupons.filter(
    (item: any) => item.type == "CODE",
  ).length;
  const dealCount = newCoupons.filter(
    (item: any) => item.type == "DEAL",
  ).length;

  const theOffer = generateOffer(store.coupons, store.nativeName, lang);

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
          <figure className="rounded-md w-30 h-30 bg-muted/20 shadow-md flex items-center justify-center p-1">
            <Image
              src={
                store.img
                  ? `${process.env.CDN_URL}${store.img}`
                  : store.sourceImg
              }
              alt=""
              width={120}
              height={120}
              priority
              style={{ objectFit: "contain" }}
              className="rounded-md"
            />
          </figure>

          <div className="flex flex-col justify-between">
            <h2>{store.nativeName}</h2>
            <LinkButton
              link={store.affLink ? store.affLink : store.link}
              text={`${words.Visit[lang]} ${store.nativeName}`}
            />
          </div>
        </div>
      </div>
      {/* ------------------------ Main ------------------------- */}

      <div className="w-full my-4 max-w-7xl mx-auto lg:grid lg:grid-cols-12 gap-4">
        {/* ----------------- Left Section --------------------- */}

        <aside className="lg:col-span-3 w-full lg:sticky lg:z-10">
          {/* ---STATS */}

          <AsideContent
            store={store}
            couponCount={couponCount}
            dealCount={dealCount}
          />
        </aside>
        {/* ----------------- Right Section --------------------- */}

        {/* --------------- active --------------- */}

        {newCoupons.filter((item: any) => item.isExpired === false).length ? (
          <div className="lg:col-span-9">
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
                  count: newCoupons.length,
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
              {newCoupons
                .filter((item: any) => item.isExpired === false)
                .map((deal: any) => (
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

        {newCoupons.filter((item: any) => item.isExpired === true).length ? (
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
              {newCoupons
                .filter((item: any) => item.isExpired === true)
                .map((deal: any) => (
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

        {store.similarCoupons.length ? (
          <div className="lg:col-span-9 lg:col-start-4">
            <Separator />
            <Heading tag="h2" text={words.SimilarCoupons[lang]} />

            <div className="similar-coupons mx-auto grid grid-cols-2   gap-2 lg:gap-4  p-2">
              {store.similarCoupons.map((deal: any, index: any) => (
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

      {/* SECOND PART */}
      {/* --------------- List Coupons --------------- */}

      <div className="w-full mx-auto max-w-7xl grid grid-cols-12 gap-4 ">
        {/* ---------- LEft Section - featured stores ------------ */}
        <div className="col-span-12 lg:col-span-3 w-full lg:sticky lg:z-10 ">
          <SectionWrapper title={words.FeaturedStores[lang]}>
            {/* //TODO: change to featured stores */}
            {store.similarStores.map((store: any, index: any) => (
              <HorizontalStoreCard key={index} store={store} />
            ))}
          </SectionWrapper>
        </div>
        {/* ---------- Right Section ------------ */}
        <div className="col-span-12 lg:col-span-9 w-full lg:sticky lg:z-10 p-2">
          {/* //TODO: change heading */}
          {/* --- ListCoupons */}
          <Heading tag="h2" text={`Popular ${store.name} Coupon Codes 2024`} />

          <div className="card-section">
            <table className="w-full ">
              <thead>
                <th className="text-left">Offer Title</th>
                <th className="text-left">Code</th>
                <th className="text-left">Used</th>
              </thead>

              <tbody className="text-sm">
                {/* //TODO: filter coupon or sort */}
                {store.coupons.map((coupon: any, index: any) => (
                  <>
                    <tr
                      key={index}
                      className="m-2 my-4 border-b border-b-muted/30"
                    >
                      <td className="my-2">{coupon.title}</td>
                      <td className="my-2">{coupon.code}</td>
                      <td className="my-2">{coupon.views}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* --- About */}

          <Heading
            tag="h2"
            text={contentGenerator("aboutHeading", store.name, lang)}
          />

          <div className="card-section">
            <p>
              {store.description
                .replace(/\*\*\*/g, "")
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .replace(/\#\#/g, "")
                .replace(/\#/g, "")}
            </p>
          </div>

          {/* --- FAQs */}

          <Heading
            tag="h2"
            text={contentGenerator("faqHeading", store.nativeName, lang)}
          />

          <div className="card-section">
            <StoreFAQs name={store.nativeName} />
          </div>

          <Heading
            tag="h2"
            text={contentGenerator("howToApplyHeading", store.nativeName, lang)}
          />

          <div className="card-section">
            <HowToUseSection store={store} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;
