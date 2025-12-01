import { getStoresByCountryAndLanguage } from "@repo/ui/src/data/fetchers";
import { siteMetadata } from "@repo/ui/src/config/metadata";
import { StoreListClient } from "@repo/ui/src/components/global/StoreListClient";
import { AppHomeLayout } from "@repo/ui/src/layouts/AppHomeLayout";
import { APP_CONFIG } from "@/config/app";

export const metadata = siteMetadata[APP_CONFIG.lang].stores;

export default async function StoresPage() {
    const stores = await getStoresByCountryAndLanguage(APP_CONFIG.country, APP_CONFIG.lang);

    return (
        <AppHomeLayout lang={APP_CONFIG.lang}>
            <StoreListClient lang={APP_CONFIG.lang} stores={stores} />
        </AppHomeLayout>
    );
}
