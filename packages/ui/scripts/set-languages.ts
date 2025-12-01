import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function setSpecificLanguages() {
    console.log("🔄 Setting specific language assignments...\n");

    // Russian stores (kuponly.ru - port 3000)
    await prisma.store.update({
        where: { slug: "amazon" },
        data: { languages: ["ru"] },
    });
    console.log("✅ Amazon → [ru]");

    await prisma.store.update({
        where: { slug: "nike" },
        data: { languages: ["ru"] },
    });
    console.log("✅ Nike → [ru]");

    // Spanish stores (spanish.es - port 3001)
    await prisma.store.update({
        where: { slug: "booking" },
        data: { languages: ["es"] },
    });
    console.log("✅ Booking.com → [es]");

    await prisma.store.update({
        where: { slug: "uber-eats" },
        data: { languages: ["es"] },
    });
    console.log("✅ Uber Eats → [es]");

    console.log("\n✨ Language assignments complete!");
    console.log("\n📊 Testing queries:");

    const ruStores = await prisma.store.findMany({
        where: { languages: { has: "ru" } },
        select: { name: true },
    });
    console.log(`\n🇷🇺 Russian (port 3000): ${ruStores.map(s => s.name).join(", ")}`);

    const esStores = await prisma.store.findMany({
        where: { languages: { has: "es" } },
        select: { name: true },
    });
    console.log(`🇪🇸 Spanish (port 3001): ${esStores.map(s => s.name).join(", ")}`);
}

setSpecificLanguages()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
