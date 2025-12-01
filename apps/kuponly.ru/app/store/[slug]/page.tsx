import { getStoreBySlug, getStoreWithOffers, getTrendingStores, trackStoreView } from "@repo/ui/src/data/fetchers";
import { getStoreMetadata, siteMetadata } from "@repo/ui/src/config/metadata";
import { StorePageClient } from "@repo/ui/src/components/global/StorePageClient";
import { SimilarStores } from "@repo/ui/src/components/store/SimilarStores";
import { TrendingCoupons } from "@repo/ui/src/components/store/TrendingCoupons";
import { AppHomeLayout } from "@repo/ui/src/layouts/AppHomeLayout";
import { APP_CONFIG } from "@/config/app";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@repo/ui/src/lib/prisma";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const store = await getStoreBySlug(slug);

    if (!store) {
        return { title: siteMetadata[APP_CONFIG.lang].notFound.store };
    }

    return getStoreMetadata(APP_CONFIG.lang, store.name, store.description || undefined);
}

export default async function StorePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const store = await getStoreBySlug(slug);

    if (!store) {
        notFound();
    }

    // Check if store is available for this country and language
    // Use optional chaining in case Prisma client hasn't been regenerated yet
    const isAvailableForCountry = store.countries?.includes(APP_CONFIG.country) ?? true;
    const isAvailableForLanguage = store.languages?.includes(APP_CONFIG.lang) ?? true;

    if (!isAvailableForCountry || !isAvailableForLanguage) {
        // Store exists but not available for this country/language combination
        notFound();
    }

    // Track the store view only if store is available
    await trackStoreView(store.id, APP_CONFIG.country);

    // Get offers for this store
    const offers = await getStoreWithOffers(store.id, APP_CONFIG.country, APP_CONFIG.lang);

    // Get trending stores in this country (excluding current store)
    const trendingData = await getTrendingStores(APP_CONFIG.country, 5);
    const similarStores = trendingData
        .filter((t) => t.store.id !== store.id)
        .slice(0, 4)
        .map((t) => t.store);

    // Get offer counts for similar stores
    const similarStoresWithCounts = await Promise.all(
        similarStores.map(async (s) => {
            const count = await prisma.offer.count({
                where: {
                    storeId: s.id,
                    language: APP_CONFIG.lang,
                    OR: [
                        { country: APP_CONFIG.country },
                        { country: null },
                    ],
                },
            });
            return { ...s, offerCount: count };
        })
    );

    // Get trending offers from other stores (same category as this store's offers)
    const categoryIds = [...new Set(offers.map((o) => o.categoryId))];
    const trendingOffers = categoryIds.length > 0
        ? await prisma.offer.findMany({
            where: {
                categoryId: { in: categoryIds },
                storeId: { not: store.id },
                language: APP_CONFIG.lang,
                OR: [
                    { country: APP_CONFIG.country },
                    { country: null },
                ],
            },
            include: { store: true },
            take: 3,
            orderBy: { upvotes: "desc" },
        })
        : [];

    return (
        <AppHomeLayout lang={APP_CONFIG.lang}>
            <StorePageClient lang={APP_CONFIG.lang} store={store} offers={offers} />

            {/* Similar Stores Section */}
            {similarStoresWithCounts.length > 0 && (
                <SimilarStores stores={similarStoresWithCounts} lang={APP_CONFIG.lang} />
            )}

            {/* Trending Coupons Section */}
            {trendingOffers.length > 0 && (
                <TrendingCoupons offers={trendingOffers} lang={APP_CONFIG.lang} />
            )}
        </AppHomeLayout>
    );
}
