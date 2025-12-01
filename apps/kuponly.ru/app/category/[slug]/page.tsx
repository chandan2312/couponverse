import { getCategoryBySlug, getOffersByCategory } from "@repo/ui/src/data/fetchers";
import { getCategoryMetadata, siteMetadata } from "@repo/ui/src/config/metadata";
import { CategoryPageClient } from "@repo/ui/src/components/global/CategoryPageClient";
import { AppHomeLayout } from "@repo/ui/src/layouts/AppHomeLayout";
import { APP_CONFIG } from "@/config/app";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return { title: siteMetadata[APP_CONFIG.lang].notFound.category };
    }

    return getCategoryMetadata(APP_CONFIG.lang, category.name);
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const offers = await getOffersByCategory(category.id, APP_CONFIG.country, APP_CONFIG.lang);

    return (
        <AppHomeLayout lang={APP_CONFIG.lang}>
            <CategoryPageClient lang={APP_CONFIG.lang} category={category} offers={offers} />
        </AppHomeLayout>
    );
}
