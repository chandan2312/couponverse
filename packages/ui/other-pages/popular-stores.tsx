import React from "react";
import { words } from "../constants/words";
import { Lang } from "../types";
import { getTrendingStores } from "../actions/store";
import HomeStoreCard from "../components/store/HomeStoreCard";

const PopularStores = async () => {
  const lang: Lang = process.env.LG as Lang;
  const trendingStoresRes = await getTrendingStores(lang);
  const trendingStores = trendingStoresRes.data;
  return (
    <>
      <h2 className="text-lg md:text-xl font-semibold my-2">
        {words.FeaturedStores[lang]}
      </h2>

      <div className="grid grid-cols-2  lg:grid-cols-3 gap-2">
        {/* map through dummy array of size 9 */}
        {trendingStores.length &&
          trendingStores.map((store: any, index: any) => (
            <HomeStoreCard key={index} store={store} includeOffer={true} />
          ))}
      </div>
    </>
  );
};

export default PopularStores;
