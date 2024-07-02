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

export async function generateMetadata({ params }: { params: any }) {
  const lang: Lang = process.env.LG as Lang;

  return {
    title: `${process.env.APP}  - ${contentGenerator(
      "subdomainTitle",
      "",
      lang,
    )}`,
    description: contentGenerator("subdomainDescription", "", lang),
    canonical: `https://${process.env.DOMAIN}`,
    url: `https://${process.env.DOMAIN}`,

    locale: process.env.HTML_LANG,
    type: "article",
    openGraph: {
      type: "article",
      article: {
        publishedTime: Date.now(),
        modifiedTime: Date.now(),
        authors: ["dealcodie"],
      },
      url: `https://${process.env.DOMAIN}`,

      site_name: process.env.APP,
    },
  };
}

const Homepage = async () => {
  const country = process.env.COUNTRYCODE as string;
  const lang: Lang = (process.env.LG as Lang) || "en";

  const [trendingStoresRes, latestStoresRes, trendingCouponsRes] =
    await Promise.all([
      getTrendingStores(country),
      getLatestStores(country),
      getPopularCoupons(country),
    ]);

  const trendingStores = trendingStoresRes.data;
  const latestStores = latestStoresRes.data;
  const trendingCoupons = trendingCouponsRes.data;

  return (
    <>
      <div className="card-section mx-auto max-w-7xl">
        {/* section 0 - Search Bar */}
        {/* <Searchbar lang={lang} /> */} //TODO: search implement
        {/* <Separator className="my-5" /> */}
        {/* section 1 - categories and featured stores */}
        <div className="">
          {/* categories */}
          {/* <div className="col-span-12 lg:col-span-4 max-lg:order-2">
						<h2 className="text-lg md:text-xl font-semibold my-2">
							{words.BrowseCategories[lang]}
						</h2>

						<div className="grid grid-cols-3 gap-2">
							{Array.from({ length: 18 }).map((_, index) => (
								<div
									key={index}
									className="flex items-center gap-1 bg-muted/5 border border-muted/30 rounded-md p-1  "
								>
									<figure>
										<Image
											src={`https://www.pngall.com/wp-content/uploads/8/World-Travel-PNG-Picture.png`}
											width={40}
											height={40}
											alt="ToDo"
											className=""
										/>
									</figure>
									<h3>Fashion</h3>
								</div>
							))}
						</div>
					</div> */}
          {/* featured stores */}

          <div className="max-lg:order-1 col-span-12 lg:col-span-8">
            <h2 className="text-lg md:text-xl font-semibold my-2">
              {words.FeaturedStores[lang]}
            </h2>

            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
              {/* map through dummy array of size 9 */}
              {trendingStores.length &&
                trendingStores.map((store: any, index: any) => (
                  <HomeStoreCard
                    key={index}
                    store={store}
                    includeOffer={true}
                  />
                ))}
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        {/* section 2 - featured Coupons */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold my-2">
            {words.WeekFeaturedCouponOffers[lang]}
          </h2>

          <div className="grid lg:grid-cols-2 gap-3">
            {trendingCoupons.length &&
              trendingCoupons.map((deal: any, index: any) => (
                <CouponCardSide key={index} deal={deal} />
              ))}
          </div>
          <Separator className="my-6" />
        </div>
        {/* section 3 - Recently Added Stores */}
        <div>
          <h2 className="text-lg md:text-xl font-semibold my-2">
            {words.RecentlyAddedStores[lang]}
          </h2>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
            {/* map through dummy array of size 9 */}
            {latestStores.length &&
              latestStores.map((store: any, index: any) => (
                <HomeStoreCard key={index} store={store} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
