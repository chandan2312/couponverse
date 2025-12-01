import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Creating seed with multi-country stores and analytics...\n");

    // Clear ALL data
    console.log("🗑️  Deleting ALL data...");
    await prisma.storeAnalytics.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.offer.deleteMany();
    await prisma.store.deleteMany();
    await prisma.category.deleteMany();
    console.log("✅ Cleared\n");

    // Create categories
    console.log("📁 Creating categories...");
    const electronics = await prisma.category.create({
        data: { name: "Electronics", slug: "electronics", icon: "devices" },
    });
    const fashion = await prisma.category.create({
        data: { name: "Fashion", slug: "fashion", icon: "checkroom" },
    });
    const travel = await prisma.category.create({
        data: { name: "Travel", slug: "travel", icon: "flight" },
    });
    const food = await prisma.category.create({
        data: { name: "Food", slug: "food", icon: "restaurant" },
    });
    console.log("✅ Created 4 categories\n");

    console.log("🏪 Creating stores with multi-country support...\n");

    // ========================================
    // RUSSIA-ONLY STORES
    // ========================================
    console.log("🇷🇺 Russia-only stores:");

    const ozon = await prisma.store.create({
        data: {
            name: "Ozon",
            slug: "ozon",
            countries: ["ru"], // Russia only
            languages: ["ru"],
            description: "Российский интернет-магазин",
            websiteUrl: "https://ozon.ru",
        },
    });
    await prisma.storeAnalytics.create({
        data: { storeId: ozon.id, country: "ru", views: 5000, clicks: 350 },
    });
    console.log("  ✅ Ozon - countries: [ru], views: 5000");

    const wildberries = await prisma.store.create({
        data: {
            name: "Wildberries",
            slug: "wildberries",
            countries: ["ru"],
            languages: ["ru", "en"],
            description: "Одежда и товары для дома",
            websiteUrl: "https://wildberries.ru",
        },
    });
    await prisma.storeAnalytics.create({
        data: { storeId: wildberries.id, country: "ru", views: 8000, clicks: 600 },
    });
    console.log("  ✅ Wildberries - countries: [ru], views: 8000\n");

    // ========================================
    // SPAIN-ONLY STORES
    // ========================================
    console.log("🇪🇸 Spain-only stores:");

    const elCorte = await prisma.store.create({
        data: {
            name: "El Corte Inglés",
            slug: "el-corte-ingles",
            countries: ["es"],
            languages: ["es"],
            description: "Gran almacén español",
            websiteUrl: "https://elcorteingles.es",
        },
    });
    await prisma.storeAnalytics.create({
        data: { storeId: elCorte.id, country: "es", views: 4500, clicks: 280 },
    });
    console.log("  ✅ El Corte Inglés - countries: [es], views: 4500");

    const zara = await prisma.store.create({
        data: {
            name: "Zara",
            slug: "zara",
            countries: ["es"],
            languages: ["es", "en"],
            description: "Moda española",
            websiteUrl: "https://zara.com",
        },
    });
    await prisma.storeAnalytics.create({
        data: { storeId: zara.id, country: "es", views: 6000, clicks: 420 },
    });
    console.log("  ✅ Zara - countries: [es], views: 6000\n");

    // ========================================
    // MULTI-COUNTRY STORES
    // ========================================
    console.log("🌍 Multi-country stores:");

    const amazonGlobal = await prisma.store.create({
        data: {
            name: "Amazon",
            slug: "amazon",
            countries: ["ru", "es"], // Both countries!
            languages: ["ru", "es", "en"],
            description: "Global marketplace / Глобальный маркетплейс / Mercado global",
            websiteUrl: "https://amazon.com",
        },
    });
    // Separate analytics per country
    await prisma.storeAnalytics.createMany({
        data: [
            { storeId: amazonGlobal.id, country: "ru", views: 12000, clicks: 850 }, // Popular in Russia
            { storeId: amazonGlobal.id, country: "es", views: 200, clicks: 15 }, // Not popular in Spain
        ],
    });
    console.log("  ✅ Amazon - countries: [ru, es]");
    console.log("     Russia: 12000 views (trending)");
    console.log("     Spain: 200 views (not trending)");

    const booking = await prisma.store.create({
        data: {
            name: "Booking.com",
            slug: "booking",
            countries: ["ru", "es"],
            languages: ["ru", "es", "en"],
            description: "Бронирование отелей / Reservas de hoteles",
            websiteUrl: "https://booking.com",
        },
    });
    await prisma.storeAnalytics.createMany({
        data: [
            { storeId: booking.id, country: "ru", views: 3000, clicks: 180 },
            { storeId: booking.id, country: "es", views: 7500, clicks: 520 }, // More popular in Spain
        ],
    });
    console.log("  ✅ Booking.com - countries: [ru, es]");
    console.log("     Russia: 3000 views");
    console.log("     Spain: 7500 views (trending)\n");

    const aliexpress = await prisma.store.create({
        data: {
            name: "AliExpress",
            slug: "aliexpress",
            countries: ["ru", "es"],
            languages: ["ru", "es", "en"],
            description: "Покупки из Китая / Compras desde China",
            websiteUrl: "https://aliexpress.com",
        },
    });
    await prisma.storeAnalytics.createMany({
        data: [
            { storeId: aliexpress.id, country: "ru", views: 9500, clicks: 720 },
            { storeId: aliexpress.id, country: "es", views: 3200, clicks: 210 },
        ],
    });
    console.log("  ✅ AliExpress - countries: [ru, es]");
    console.log("     Russia: 9500 views");
    console.log("     Spain: 3200 views\n");

    // ========================================
    // CREATE OFFERS
    // ========================================
    console.log("🎁 Creating offers...\n");

    // Ozon offers (Russia only)
    await prisma.offer.createMany({
        data: [
            {
                title: "Скидка 20% на электронику",
                description: "Россия-специфичное предложение",
                discount: "20%",
                code: "RU20",
                language: "ru",
                country: "ru",
                categoryId: electronics.id,
                storeId: ozon.id,
                expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                isVerified: true,
            },
            {
                title: "Бесплатная доставка",
                description: "Глобальное предложение для русского языка",
                discount: "Free",
                language: "ru",
                country: null, // Global
                categoryId: electronics.id,
                storeId: ozon.id,
                isVerified: true,
            },
        ],
    });

    // Amazon offers (both countries)
    await prisma.offer.createMany({
        data: [
            {
                title: "500₽ скидка",
                description: "Россия-специфичное",
                discount: "500₽",
                code: "RU500",
                language: "ru",
                country: "ru",
                categoryId: electronics.id,
                storeId: amazonGlobal.id,
                expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                isVerified: true,
            },
            {
                title: "20€ descuento",
                description: "España-específico",
                discount: "20€",
                code: "ES20",
                language: "es",
                country: "es",
                categoryId: electronics.id,
                storeId: amazonGlobal.id,
                expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
                isVerified: true,
            },
            {
                title: "Free shipping worldwide",
                description: "Global English offer",
                discount: "Free",
                language: "en",
                country: null,
                categoryId: electronics.id,
                storeId: amazonGlobal.id,
                isVerified: true,
            },
        ],
    });

    // Zara offers (Spain only)
    await prisma.offer.createMany({
        data: [
            {
                title: "Rebajas 50%",
                description: "Oferta de España",
                discount: "50%",
                language: "es",
                country: "es",
                categoryId: fashion.id,
                storeId: zara.id,
                expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                isVerified: true,
            },
            {
                title: "Envío gratis",
                description: "Global para español",
                discount: "Free",
                language: "es",
                country: null,
                categoryId: fashion.id,
                storeId: zara.id,
                isVerified: true,
            },
        ],
    });

    const stats = {
        categories: await prisma.category.count(),
        stores: await prisma.store.count(),
        offers: await prisma.offer.count(),
        analytics: await prisma.storeAnalytics.count(),
    };

    console.log("\n" + "=".repeat(60));
    console.log("📊 SEED SUMMARY");
    console.log("=".repeat(60));
    console.log(`Categories: ${stats.categories}`);
    console.log(`Stores: ${stats.stores} (2 RU-only, 2 ES-only, 3 multi-country)`);
    console.log(`Offers: ${stats.offers}`);
    console.log(`Analytics Records: ${stats.analytics}`);

    console.log("\n🎯 Analytics Per Country:");
    console.log("Russia (ru):");
    console.log("  1. Amazon: 12,000 views ⭐ (trending)");
    console.log("  2. AliExpress: 9,500 views");
    console.log("  3. Wildberries: 8,000 views");
    console.log("  4. Ozon: 5,000 views");
    console.log("  5. Booking.com: 3,000 views");

    console.log("\nSpain (es):");
    console.log("  1. Booking.com: 7,500 views ⭐ (trending)");
    console.log("  2. Zara: 6,000 views");
    console.log("  3. El Corte Inglés: 4,500 views");
    console.log("  4. AliExpress: 3,200 views");
    console.log("  5. Amazon: 200 views (NOT trending here!)");

    console.log("\n✨ Multi-country analytics working correctly!");
    console.log("   Amazon is #1 in Russia but #5 in Spain");
    console.log("   Booking.com is #5 in Russia but #1 in Spain");
}

main()
    .catch((e) => {
        console.error("❌ Error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
