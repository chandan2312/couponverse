import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkStores() {
    console.log("📊 Current store languages in database:\n");

    const stores = await prisma.store.findMany({
        select: {
            name: true,
            slug: true,
            languages: true,
        },
    });

    stores.forEach(store => {
        console.log(`${store.name} (${store.slug}): [${store.languages.join(", ")}]`);
    });

    console.log("\n🔍 Spanish stores (lang: es):");
    const spanishStores = await prisma.store.findMany({
        where: {
            languages: {
                has: "es",
            },
        },
    });
    console.log(spanishStores.map(s => s.name).join(", "));

    console.log("\n🔍 Russian stores (lang: ru):");
    const russianStores = await prisma.store.findMany({
        where: {
            languages: {
                has: "ru",
            },
        },
    });
    console.log(russianStores.map(s => s.name).join(", "));
}

checkStores()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
