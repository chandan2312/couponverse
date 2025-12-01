import type { Metadata } from "next";

export type AppLang = "en" | "ru" | "es";

interface MetadataConfig {
    home: Metadata;
    stores: Metadata;
    notFound: {
        store: string;
        category: string;
        offer: string;
    };
}

export const siteMetadata: Record<AppLang, MetadataConfig> = {
    ru: {
        home: {
            title: "Купоны и промокоды - Kuponly.ru",
            description: "Найдите лучшие купоны, промокоды и скидки для ваших любимых магазинов",
            keywords: ["купоны", "промокоды", "скидки", "распродажи"],
        },
        stores: {
            title: "Все магазины - Kuponly.ru",
            description: "Полный список магазинов с купонами и промокодами",
        },
        notFound: {
            store: "Магазин не найден",
            category: "Категория не найдена",
            offer: "Предложение не найдено",
        },
    },
    es: {
        home: {
            title: "Cupones y códigos promocionales - Spanish.es",
            description: "Encuentra los mejores cupones, códigos promocionales y descuentos para tus tiendas favoritas",
            keywords: ["cupones", "códigos promocionales", "descuentos", "ofertas"],
        },
        stores: {
            title: "Todas las tiendas - Spanish.es",
            description: "Lista completa de tiendas con cupones y códigos promocionales",
        },
        notFound: {
            store: "Tienda no encontrada",
            category: "Categoría no encontrada",
            offer: "Oferta no encontrada",
        },
    },
    en: {
        home: {
            title: "Coupons and Promo Codes - Coupons.com",
            description: "Find the best coupons, promo codes and discounts for your favorite stores",
            keywords: ["coupons", "promo codes", "discounts", "deals"],
        },
        stores: {
            title: "All Stores - Coupons.com",
            description: "Complete list of stores with coupons and promo codes",
        },
        notFound: {
            store: "Store not found",
            category: "Category not found",
            offer: "Offer not found",
        },
    },
};

/**
 * Generate metadata for store detail page
 */
export function getStoreMetadata(lang: AppLang, storeName: string, storeDescription?: string): Metadata {
    const templates = {
        ru: {
            title: `${storeName} - Купоны и промокоды | Kuponly.ru`,
            description: storeDescription || `Получите лучшие купоны и скидки для ${storeName}`,
        },
        es: {
            title: `${storeName} - Cupones y códigos promocionales | Spanish.es`,
            description: storeDescription || `Obtén los mejores cupones y descuentos para ${storeName}`,
        },
        en: {
            title: `${storeName} - Coupons and Promo Codes | Coupons.com`,
            description: storeDescription || `Get the best coupons and discounts for ${storeName}`,
        },
    };

    return templates[lang];
}

/**
 * Generate metadata for category page
 */
export function getCategoryMetadata(lang: AppLang, categoryName: string): Metadata {
    const templates = {
        ru: {
            title: `${categoryName} - Купоны и предложения | Kuponly.ru`,
            description: `Найдите лучшие купоны и скидки в категории ${categoryName}`,
        },
        es: {
            title: `${categoryName} - Cupones y ofertas | Spanish.es`,
            description: `Encuentra los mejores cupones y descuentos en ${categoryName}`,
        },
        en: {
            title: `${categoryName} - Coupons and Offers | Coupons.com`,
            description: `Find the best coupons and discounts in ${categoryName}`,
        },
    };

    return templates[lang];
}

/**
 * Generate metadata for offer detail page
 */
export function getOfferMetadata(lang: AppLang, offerTitle: string, storeName: string, offerDescription?: string): Metadata {
    const templates = {
        ru: {
            title: `${offerTitle} - ${storeName} | Kuponly.ru`,
            description: offerDescription || `Получите эту скидку от ${storeName}`,
        },
        es: {
            title: `${offerTitle} - ${storeName} | Spanish.es`,
            description: offerDescription || `Obtén este descuento de ${storeName}`,
        },
        en: {
            title: `${offerTitle} - ${storeName} | Coupons.com`,
            description: offerDescription || `Get this discount from ${storeName}`,
        },
    };

    return templates[lang];
}
