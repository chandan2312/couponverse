import { prisma } from "../lib/prisma";
import {
    checkGenerationNeeded,
    determinePopularityTag,
    logGeneration
} from "../data/generation-log";
import { generateOffersBatch, StoreOffers, GeneratedOffer } from "../lib/gemini";

export async function processStoreBatch(
    storeIds: string[],
    country: string,
    language: string
) {
    const stores = await prisma.store.findMany({
        where: {
            id: { in: storeIds },
            countries: { has: country },
            languages: { has: language }
        }
    });

    const eligibleStores: typeof stores = [];

    // 1. Filter stores that need updates
    for (const store of stores) {
        const tag = await determinePopularityTag(store.id, country);
        const needed = await checkGenerationNeeded(store.slug, country, language, tag);

        if (needed) {
            eligibleStores.push(store);
            console.log(`[${country}-${language}] Update needed for: ${store.name} (${tag})`);
        } else {
            console.log(`[${country}-${language}] Skipping: ${store.name} (Cool-down active)`);
        }
    }

    if (eligibleStores.length === 0) return;

    // 2. Generate in batches of 5 to avoid huge prompts
    const BATCH_SIZE = 5;
    for (let i = 0; i < eligibleStores.length; i += BATCH_SIZE) {
        const batch = eligibleStores.slice(i, i + BATCH_SIZE);
        const storeNames = batch.map((s: { name: string }) => s.name);

        console.log(`Generating for batch: ${storeNames.join(", ")}...`);

        const results = await generateOffersBatch(storeNames, country, language);

        // 3. Save results
        for (const result of results) {
            const store = batch.find((s: { name: string }) => s.name === result.storeName);
            if (!store) continue;

            await saveOffers(store.id, result.offers, country, language);

            // 4. Log generation
            const tag = await determinePopularityTag(store.id, country);
            await logGeneration(store.slug, country, language, tag);
        }

        // Rate limit safety
        await new Promise(r => setTimeout(r, 2000));
    }
}

async function saveOffers(
    storeId: string,
    offers: GeneratedOffer[],
    country: string,
    language: string
) {
    let addedCount = 0;

    for (const offer of offers) {
        // Simple dedup check
        const exists = await prisma.offer.findFirst({
            where: {
                storeId,
                code: offer.code,
                title: offer.title,
                country,
                language
            }
        });

        if (!exists) {
            // Fetch a fallback category if needed
            const category = await prisma.category.findFirst();
            if (!category) {
                console.error("No categories found in DB! Cannot save offer.");
                continue;
            }

            await prisma.offer.create({
                data: {
                    storeId,
                    title: offer.title,
                    description: offer.description,
                    code: offer.code,
                    discount: offer.discount,
                    expiryDate: new Date(offer.expiryDate),
                    language,
                    country,
                    isVerified: false, // AI generated
                    categoryId: category.id
                }
            });
            addedCount++;
        }
    }
    console.log(`Saved ${addedCount} new offers for storeId ${storeId}`);
}
