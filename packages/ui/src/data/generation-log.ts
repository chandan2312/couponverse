import { prisma } from "../lib/prisma";
import { GENERATION_DURATIONS, PopularityTag } from "../config/generation";

export async function checkGenerationNeeded(
    slug: string,
    country: string,
    language: string,
    popularityTag: PopularityTag
): Promise<boolean> {
    const lastLog = await prisma.generationLog.findFirst({
        where: {
            slug,
            country,
            language,
        },
        orderBy: {
            generatedAt: "desc",
        },
    });

    if (!lastLog) {
        return true; // Never generated before
    }

    const durationDays = GENERATION_DURATIONS[popularityTag];
    const nextGenerationDate = new Date(lastLog.generatedAt);
    nextGenerationDate.setDate(nextGenerationDate.getDate() + durationDays);

    return new Date() >= nextGenerationDate;
}

export async function logGeneration(
    slug: string,
    country: string,
    language: string,
    popularityTag: PopularityTag
) {
    await prisma.generationLog.create({
        data: {
            slug,
            country,
            language,
            popularityTag,
        },
    });
}

export async function determinePopularityTag(
import { prisma } from "../lib/prisma";
import { GENERATION_DURATIONS, PopularityTag } from "../config/generation";

    export async function checkGenerationNeeded(
        slug: string,
        country: string,
        language: string,
        popularityTag: PopularityTag
    ): Promise<boolean> {
    const lastLog = await prisma.generationLog.findFirst({
        where: {
            slug,
            country,
            language,
        },
        orderBy: {
            generatedAt: "desc",
        },
    });

    if (!lastLog) {
        return true; // Never generated before
    }

    const durationDays = GENERATION_DURATIONS[popularityTag];
    const nextGenerationDate = new Date(lastLog.generatedAt);
    nextGenerationDate.setDate(nextGenerationDate.getDate() + durationDays);

    return new Date() >= nextGenerationDate;
}

export async function logGeneration(
    slug: string,
    country: string,
    language: string,
    popularityTag: PopularityTag
) {
    await prisma.generationLog.create({
        data: {
            slug,
            country,
            language,
            popularityTag,
        },
    });
}

// Cache thresholds to avoid DB hits on every call in a loop
const thresholdCache: Record<string, { high: number; mid: number; timestamp: number }> = {};

async function getDynamicThresholds(country: string) {
    // Return cached if fresh (1 hour)
    const cached = thresholdCache[country];
    if (cached && Date.now() - cached.timestamp < 1000 * 60 * 60) {
        return cached;
    }

    const totalStores = await prisma.storeAnalytics.count({
        where: { country }
    });

    if (totalStores < 10) {
        return { high: 100, mid: 10 }; // Fallback for very new apps
    }

    // Top 10% = High Traffic
    const highIndex = Math.floor(totalStores * 0.1);
    // Top 30% = Mid Traffic
    const midIndex = Math.floor(totalStores * 0.3);

    const [highStore, midStore] = await Promise.all([
        prisma.storeAnalytics.findFirst({
            where: { country },
            orderBy: { views: 'desc' },
            skip: highIndex,
            select: { views: true }
        }),
        prisma.storeAnalytics.findFirst({
            where: { country },
            orderBy: { views: 'desc' },
            skip: midIndex,
            select: { views: true }
        })
    ]);

    const thresholds = {
        high: highStore?.views || 1000,
        mid: midStore?.views || 100,
        timestamp: Date.now()
    };

    thresholdCache[country] = thresholds;
    return thresholds;
}

export async function determinePopularityTag(
    storeId: string,
    country: string
): Promise<PopularityTag> {
    // 1. Check manual override (popularIn) and Category Leader
    const store = await prisma.store.findUnique({
        where: { id: storeId },
        select: {
            popularIn: true,
            isCategoryLeader: true,
            createdAt: true
        },
    });

    if (store?.popularIn.includes(country)) {
        return "popular";
    }

    // 2. Check Analytics (Real Traffic vs Dynamic Thresholds)
    const analytics = await prisma.storeAnalytics.findUnique({
        where: { storeId_country: { storeId, country } },
        select: { views: true },
    });

    const views = analytics?.views || 0;
    const { high, mid } = await getDynamicThresholds(country);

    if (views >= high) {
        return "views"; // Top 10% of stores
    }

    // 3. New Store Boost (Honeymoon Phase)
    const daysSinceCreation = store?.createdAt
        ? Math.floor((new Date().getTime() - new Date(store.createdAt).getTime()) / (1000 * 60 * 60 * 24))
        : 999;

    if (daysSinceCreation < 90) {
        return "category"; // Boost new stores!
    }

    // 4. Category Leader
    if (store?.isCategoryLeader) {
        return "category";
    }

    // 5. Mid-tier Traffic
    if (views >= mid) {
        return "mid"; // Top 30% of stores
    }

    return "low"; // Low Traffic
}
