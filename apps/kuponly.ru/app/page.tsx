import { getCategories, getStoresByCountryAndLanguage, getTrendingStores } from "@repo/ui/src/data/fetchers";
import { siteMetadata } from "@repo/ui/src/config/metadata";
import { HomeClient } from "@repo/ui/src/components/global/HomeClient";
import { TrendingStoresWidget } from "@repo/ui/src/components/global/TrendingStoresWidget";
import { AppHomeLayout } from "@repo/ui/src/layouts/AppHomeLayout";
import { APP_CONFIG } from "@/config/app";

export const dynamic = "force-dynamic";
export const metadata = siteMetadata[APP_CONFIG.lang].home;

export default async function Home() {
  const categories = await getCategories();
  const stores = await getStoresByCountryAndLanguage(APP_CONFIG.country, APP_CONFIG.lang);

  // Get trending stores for this country
  const trendingStores = await getTrendingStores(APP_CONFIG.country, 10);

  return (
    <AppHomeLayout lang={APP_CONFIG.lang}>
      <HomeClient lang={APP_CONFIG.lang} categories={categories} stores={stores} />

      {/* Trending Stores Widget */}
      {trendingStores.length > 0 && (
        <TrendingStoresWidget stores={trendingStores} lang={APP_CONFIG.lang} />
      )}
    </AppHomeLayout>
  );
}
