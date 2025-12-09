import cron from "node-cron";
import { prisma } from "./lib/prisma";
import { processStoreBatch } from "./services/generator";

async function runScraper() {
    console.log("🚀 Starting Coupon Scraper Cycle...");

    try {
        // 1. Fetch all stores
        const stores = await prisma.store.findMany({
            select: { id: true, countries: true, languages: true }
        });

        console.log(`Found ${stores.length} stores to process.`);

        // 2. Group by Country-Language for batching
        // Map key: "country-language" -> value: [storeId, storeId...]
        const batches: Record<string, string[]> = {};

        for (const store of stores) {
            for (const country of store.countries) {
                for (const lang of store.languages) {
                    const key = `${country}-${lang}`;
                    if (!batches[key]) batches[key] = [];
                    batches[key].push(store.id);
                }
            }
        }

        // 3. Process each group
        for (const [key, storeIds] of Object.entries(batches)) {
            const [country, lang] = key.split("-");
            console.log(`\nProcessing group: ${country} - ${lang} (${storeIds.length} stores)`);

            // Process in chunks of 10 to avoid overwhelming the generator logic
            const CHUNK_SIZE = 10;
            for (let i = 0; i < storeIds.length; i += CHUNK_SIZE) {
                const chunk = storeIds.slice(i, i + CHUNK_SIZE);
                if (country && lang) {
                    await processStoreBatch(chunk, country, lang);
                }
            }
        }

        console.log("\n✅ Scraper Cycle Completed!");

    } catch (error) {
        console.error("❌ Error in scraper cycle:", error);
    }
}

// Schedule: Run every 6 hours
cron.schedule("0 */6 * * *", () => {
    runScraper();
});

// Run immediately on start (for testing)
console.log("Scraper service started. Running initial cycle...");
runScraper();
