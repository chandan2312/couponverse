import { getOfferById } from "@repo/ui/src/data/fetchers";
import { getOfferMetadata, siteMetadata } from "@repo/ui/src/config/metadata";
import { OfferPageClient } from "@repo/ui/src/components/global/OfferPageClient";
import { AppHomeLayout } from "@repo/ui/src/layouts/AppHomeLayout";
import { APP_CONFIG } from "@/config/app";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const offer = await getOfferById(id);

    if (!offer) {
        return { title: siteMetadata[APP_CONFIG.lang].notFound.offer };
    }

    return getOfferMetadata(APP_CONFIG.lang, offer.title, offer.store.name, offer.description || undefined);
}

export default async function OfferPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const offer = await getOfferById(id);

    if (!offer) {
        notFound();
    }

    return (
        <AppHomeLayout lang={APP_CONFIG.lang}>
            <OfferPageClient lang={APP_CONFIG.lang} offer={offer} />
        </AppHomeLayout>
    );
}
