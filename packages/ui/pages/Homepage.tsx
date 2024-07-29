"use server";
import { getTrendingCoupons, getPopularCoupons } from "../actions/coupon";
import { getLatestStores, getTrendingStores } from "../actions/store";
import Searchbar from "../components/global/Searchbar";
import { Separator } from "../components/ui/separator";
import { words } from "../constants/words";
import HomeStoreCard from "../components/store/HomeStoreCard";
import CouponCardSide from "../components/coupon/CouponCardSide";
import { Lang } from "../types";
import { contentGenerator } from "../lib/contentGenerator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import axios from "axios";
import { notFound } from "next/navigation";
import OfferCard from "../components/offer/OfferCard";
import MoreOffers from "../components/offer/MoreOffers";
import CouponCard from "../components/coupon/CouponCard";
import TopStoresWidget from "../components/store/TopStoresWidget";

export async function generateMetadata({ params }: { params: any }) {
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;

  return {
    title: `${process.env.NEXT_PUBLIC_APP}  - ${contentGenerator({
      type: "subdomainTitle",
    })}`,
    description: contentGenerator({ type: "subdomainDescription" }),
    canonical: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
    url: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: Date.now(),
        modifiedTime: Date.now(),
        authors: ["couponverse"],
      },
      url: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,

      site_name: process.env.NEXT_PUBLIC_APP,
    },
  };
}

const Homepage = async () => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";

  const [bestStoresRes, hottestOffersRes, latestOffersRes, hottestCouponsRes] =
    await Promise.all([
      // best store
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/store/getMany?&country=${country}&lang=${lang}&orderby=views_desc&perpage=20`,
      ),
      // hottest Offers
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?orderby=hotness_desc&country=${country},in&lang=${lang}&page=1&perpage=10&morefields=upvotes,downvotes,store,shortDescription`,
      ),
      // // trending Offers
      // axios.get(
      //   `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?orderby=hotness_desc&country=${country},in&lang=${lang}&page=1&perpage=2&morefields=viewsArr,upvotesArr,downvotesArr`,
      // ),
      // latest Offers
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?orderby=updatedAt_desc&country=${country}&lang=${lang}&page=1&perpage=10&morefields=upvotes,downvotes,store,shortDescription`,
      ),
      // hottest Coupons
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?orderby=hotness_desc&country=${country}&lang=${lang}&page=1&perpage=10&morefields=upvotes,downvotes,store`,
      ),
    ]);

  if (bestStoresRes?.status !== 200 || !bestStoresRes?.data) notFound();
  if (hottestOffersRes.status !== 200 || latestOffersRes.status !== 200)
    notFound();

  const bestStores = bestStoresRes.data;
  const hottestOffers = hottestOffersRes.data;
  const latestOffers = latestOffersRes.data;
  const hottestCoupons = hottestCouponsRes.data;

  return (
    <>
      <div className=" mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-4 ">
        <div className="lg:col-span-9">
          <Tabs
            defaultValue="hottest-offers"
            className="sticky top-0 z-40 w-auto"
          >
            <TabsList className="sticky top-0 z-20   bg-card py-2 rounded-lg  w-auto mx-3">
              <TabsTrigger
                value="hottest-offers"
                className="min-w-20 min-h-8 p-auto"
              >
                Hottest
              </TabsTrigger>
              {/* <TabsTrigger
                value="trending-offers"
                className="min-w-20 min-h-8 p-auto"
              >
                Trending
              </TabsTrigger> */}
              <TabsTrigger
                value="latest-offers"
                className="min-w-20 min-h-8 p-auto"
              >
                Latest
              </TabsTrigger>
              <TabsTrigger
                value="hottest-coupons"
                className="min-w-20 min-h-8 p-auto"
              >
                Top Coupons
              </TabsTrigger>
            </TabsList>

            {/* //1 */}
            <TabsContent value="hottest-offers" className="w-full">
              <div className="space-y-4 ">
                {hottestOffers?.map((offer: any, index: number) => {
                  return <OfferCard key={offer.id} offer={offer} />;
                })}
                <MoreOffers
                  type="offers"
                  params={{
                    country,
                    lang,
                    orderby: "hotness_desc",
                    morefields: "upvotes,downvotes,store",
                    page: 3,
                    perpage: 5,
                    tab: "hottest-offers",
                  }}
                />
              </div>
            </TabsContent>
            {/* 2 -trending offers */}
            {/* <TabsContent value="trending-offers" className="w-full">
              <div className="space-y-4 ">
                {trendingOffers.map((offer: any, index: number) => {
                  return <OfferCard key={offer.id} offer={offer} />;
                })}
                <MoreOffers
                  // initialOffers={latestOffers}
                  params={{
                    country,
                    orderby: "updatedAt_desc",
                    lang,
                    page: 2,
                    perpage: 2,
                    tab: "latest-offers",
                  }}
                />
              </div>
            </TabsContent> */}
            {/* 3 - latest offers */}
            <TabsContent value="latest-offers" className="w-full">
              <div className="space-y-4 ">
                {latestOffers.map((offer: any, index: number) => {
                  return <OfferCard key={offer.id} offer={offer} />;
                })}
                <MoreOffers
                  type="offers"
                  params={{
                    country,
                    orderby: "updatedAt_desc",
                    morefields: "upvotes,downvotes,store",
                    lang,
                    page: 3,
                    perpage: 5,
                    tab: "latest-offers",
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="hottest-coupons" className="w-full">
              <div className="space-y-4 ">
                {hottestCoupons.map((coupon: any, index: number) => {
                  return (
                    <CouponCard
                      key={coupon.id}
                      store={coupon.store}
                      coupon={coupon}
                    />
                  );
                })}
                <MoreOffers
                  type="coupons"
                  params={{
                    country,
                    lang,
                    orderby: "hotness_desc",
                    morefields: "upvotes,downvotes,store",
                    page: 3,
                    perpage: 5,
                    tab: "hottest-coupons",
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <aside className="mt-12 bg-card rounded-lg p-2 border border-muted/40 shadow-md lg:w-full lg:col-span-3 m-3">
          <TopStoresWidget stores={bestStores} />
        </aside>
      </div>
    </>
  );
};

export default Homepage;
