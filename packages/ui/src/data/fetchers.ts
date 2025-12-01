import { prisma } from "../lib/prisma";
import { sortByHotScore } from "../utils/ranking";

export type AppLang = "en" | "ru" | "es" | "hi";
export type AppCountry = "us" | "in" | "ru" | "es" | "mx" | "uk";

/**
 * Get all categories
 */
export async function getCategories() {
    return prisma.category.findMany();
}

/**
 * Get stores filtered by country and language
 * Store must have country in countries array AND language in languages array
 */
export async function getStoresByCountryAndLanguage(
    country: AppCountry,
    lang: AppLang
) {
    return prisma.store.findMany({
        where: {
            countries: {
                has: country, // Store's countries array contains this country
            },
            languages: {
                has: lang,
            },
        },
        orderBy: { name: "asc" },
    });
}

/**
 * Get store by slug
 */
export async function getStoreBySlug(slug: string) {
    return prisma.store.findUnique({
        where: { slug },
    });
}

/**
 * Get store with offers filtered by country and language
 * Offers match if:
 * - language matches AND
 * - (country matches OR country is null)
 */
export async function getStoreWithOffers(
    storeId: string,
    country: AppCountry,
    lang: AppLang
) {
    const offers = await prisma.offer.findMany({
        where: {
            storeId,
            language: lang,
            OR: [
                { country }, // Country-specific offers
                { country: null }, // Global offers for this language
            ],
        },
        include: {
            store: true,
            votes: true,
        },
    });

    return sortByHotScore(offers);
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
    return prisma.category.findUnique({
        where: { slug },
    });
}

/**
 * Get offers by category with country and language filter
 */
export async function getOffersByCategory(
    categoryId: string,
    country: AppCountry,
    lang: AppLang
) {
    return prisma.offer.findMany({
        where: {
            categoryId,
            language: lang,
            OR: [
                { country },
                { country: null },
            ],
        },
        include: { store: true },
        orderBy: { id: "desc" },
    });
}

/**
 * Get offer by ID
 */
export async function getOfferById(id: string) {
    return prisma.offer.findUnique({
        where: { id },
        include: { store: true },
    });
}

/**
 * Get trending stores for a country
 */
export async function getTrendingStores(country: AppCountry, limit = 10) {
    return prisma.storeAnalytics.findMany({
        where: { country },
        orderBy: { views: "desc" },
        take: limit,
        include: {
            store: {
                select: {
                    id: true,
                    name: true,
                    slug: true,
                    logoUrl: true,
                    description: true,
                },
            },
        },
    });
}

/**
 * Track a store view (increment country-specific view count)
 */
export async function trackStoreView(storeId: string, country: AppCountry) {
    try {
        await prisma.storeAnalytics.upsert({
            where: {
                storeId_country: { storeId, country },
            },
            update: {
                views: { increment: 1 },
                lastViewed: new Date(),
            },
            create: {
                storeId,
                country,
                views: 1,
            },
        });
    } catch (error) {
        // Silently fail if store doesn't exist or DB issue
        console.error("Failed to track store view:", error);
    }
}

/**
 * Track a store click (increment country-specific click count)
 */
export async function trackStoreClick(storeId: string, country: AppCountry) {
    try {
        await prisma.storeAnalytics.upsert({
            where: {
                storeId_country: { storeId, country },
            },
            update: {
                clicks: { increment: 1 },
            },
            create: {
                storeId,
                country,
                clicks: 1,
            },
        });
    } catch (error) {
        console.error("Failed to track store click:", error);
    }
}

/**
 * Get store with country-specific analytics
 */
export async function getStoreWithAnalytics(
    slug: string,
    country: AppCountry
) {
    return prisma.store.findUnique({
        where: { slug },
        include: {
            analytics: {
                where: { country },
            },
        },
    });
}
