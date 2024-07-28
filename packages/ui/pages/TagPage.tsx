import { Separator } from "../components/ui/separator";
import { words } from "../constants/words";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SectionWrapper from "../components/store/SectionWrapper";
import LinkButton from "../components/custom/LinkButton";
import Heading from "../components/custom/Heading";

import { Lang } from "../types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

import axios from "axios";
import TrendingOffers from "../components/offer/TrendingOffers";
import TrendingCoupons from "../components/coupon/TrendingCoupons";
import CouponCard from "../components/coupon/CouponCard";
import MoreOffers from "../components/offer/MoreOffers";
import OfferCard from "../components/offer/OfferCard";
import { Flame, TicketPercent } from "lucide-react";

const TagPage = async ({
  slug,
  searchParams,
}: {
  slug: string;
  searchParams: any;
}) => {
  if (!slug) {
    notFound();
  }

  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const perpage = 10;

  const [tagRes, couponsRes, offersRes] =
    // popularStores, popularCoupons, popularOffers
    await Promise.all([
      // store
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/tag/get?slug=${slug}&lang=${lang}`,
      ), //TODO: select fields
      // coupons
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany?tagSlug=${slug}&orderby=hotness_desc&country=${country}&lang=${lang}&page=1&perpage=${perpage}&morefields=views,upvotes,downvotes,store`,
      ),
      // offers
      axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany?tagSlug=${slug}&orderby=hotness_desc&country=${country}&lang=${lang}&page=1&perpage=${perpage}&morefields=upvotes,downvotes,store`,
      ),
    ]);

  if (tagRes.status !== 200 || !tagRes.data) notFound();
  if (couponsRes.status !== 200 || offersRes.status !== 200) notFound();
  const tag = tagRes.data; // store
  const coupons = couponsRes.data || []; // coupons
  const offers = offersRes.data || []; // offers

  // console.log(tag);

  // console.log("store", store);

  // const theOffer = generateOffer(coupons, store.nativeName, lang);

  return (
    <>
      {/* ------------------------ Breadcrumb ------------------------- */}

      <div className="mx-auto max-w-5xl">
        <ul id="breadcrumb" className="flex gap-2 text-sm">
          <li>
            <Link href="/">{words.Home[lang]}</Link>
          </li>{" "}
          /{" "}
          <li>
            <Link href="#">Tag</Link>
          </li>{" "}
          / <li className="font-semibold">{tag.slug}</li>
        </ul>
      </div>

      {/* ------------------------ Header ------------------------- */}
      <div className="mt-2 mb-4 min-w-[100vw] left-0 right-0 bg-card ">
        <div className="max-w-5xl mx-auto flex gap-2 lg:gap-4 px-2 py-6">
          {/* <figure className="rounded-md w-30 h-30 bg-muted/20 shadow-md flex items-center justify-center p-2">
            <Image
              src={
                user?.avatar
                  ? `${process.env.NEXT_PUBLIC_CDN_URL}${user.avatar}`
                  : ""
              }
              alt=""
              width={90}
              height={90}
              priority
              style={{ objectFit: "contain" }}
              className="rounded-md w-full h-full"
            />
          </figure> */}

          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-lg font-semibold">{tag.slug}</h2>
            {/* <h3>
              {tag.firstname} {user.lastname}
            </h3> */}
            <div className="flex gap-4">
              <span className="flex gap-1">
                <Flame /> <span>{tag._count.offers} Offers</span>
              </span>
              <span className="flex gap-2">
                <TicketPercent /> <span>{tag._count.coupons} Coupons</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------ Main ------------------------- */}

      <div className="relative w-full my-4 max-w-5xl mx-auto gap-4">
        {/* ----------------- TABS  */}

        <div className="  w-full  ">
          <Tabs defaultValue="offers" className="sticky top-0 z-40">
            <TabsList className="w-full  bg-transparent mx-3">
              <TabsTrigger value="offers" className="min-w-20 min-h-8 p-auto">
                Offers
              </TabsTrigger>
              <TabsTrigger value="coupons" className="min-w-20 min-h-8 p-auto">
                Coupons
              </TabsTrigger>
            </TabsList>

            <TabsContent value="offers" className="w-full">
              <>
                <div className="space-y-4 ">
                  {offers?.map((offer: any, index: number) => {
                    if (index == 3) {
                    }
                    return <OfferCard key={offer.id} offer={offer} />;
                  })}
                </div>

                <MoreOffers
                  type="offers"
                  params={{
                    tagSlug: slug,
                    country: country,
                    lang: lang,
                    orderby: "hotness_desc",
                    morefields: "upvotes,downvotes",
                    page: 3,
                    perpage: 5,
                  }}
                />
              </>
            </TabsContent>

            <TabsContent value="coupons" className="w-full">
              <div className="space-y-4 ">
                {coupons?.map((coupon: any, index: number) => {
                  if (index == 3) {
                  }
                  return (
                    <CouponCard
                      store={coupon.store}
                      key={coupon.id}
                      coupon={coupon}
                    />
                  );
                })}
              </div>

              <MoreOffers
                type="coupons"
                params={{
                  tagSlug: slug,
                  country: country,
                  lang: lang,
                  orderby: "hotness_desc",
                  morefields: "upvotes,downvotes,store",
                  page: 3,
                  perpage: 5,
                }}
              />
            </TabsContent>
          </Tabs>

          <Separator />
        </div>
      </div>

      {/* SECOND PART */}

      <div className="mt-20 w-full mx-auto max-w-5xl   ">
        <div className=" w-full  p-2">
          {/* --- Popular  */}

          <TrendingOffers />
          <div className="flex py-4 items-center justify-center">
            <LinkButton
              link="/#trending-offers"
              text="View more offers"
              className="px-5 py-auto my-auto h-10"
            />
          </div>
          <TrendingCoupons />
          <div className="flex py-4 items-center justify-center">
            <LinkButton
              link="/#trending-Coupons"
              text="View more coupons"
              className="px-5 py-auto my-auto h-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TagPage;
