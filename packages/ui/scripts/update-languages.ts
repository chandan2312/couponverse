import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateStoreLanguages() {
    console.log("🔄 Updating store languages...");

    // Update all stores - you can customize this for specific stores
    const stores = await prisma.store.findMany();

    for (const store of stores) {
        // Default: add both Russian and Spanish to all stores for testing
        // You can customize this logic based on store name or other criteria

        let languages: string[] = [];

        // Example: Assign languages based on store name or other logic
        if (store.name.toLowerCase().includes("russian") || store.name.toLowerCase().includes("rus")) {
            languages = ["ru"];
        } else if (store.name.toLowerCase().includes("spanish") || store.name.toLowerCase().includes("spain")) {
            languages = ["es"];
        } else {
            // For testing: assign some stores to Russian, some to Spanish, some to both
            const random = Math.random();
            if (random < 0.33) {
                languages = ["ru"];
            } else if (random < 0.66) {
                languages = ["es"];
            } else {
                languages = ["ru", "es"]; // Available in both apps
            }
        }

        await prisma.store.update({
            where: { id: store.id },
            data: { languages },
        });

        console.log(`✅ ${store.name}: ${languages.join(", ")}`);
    }

    console.log("✨ Done! All stores updated with language tags.");
}

updateStoreLanguages()
    .catch((error) => {
        console.error("❌ Error:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
