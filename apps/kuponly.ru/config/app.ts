export const APP_CONFIG = {
    country: "ru" as const,
    lang: "ru" as const,
    domain: "kuponly.ru",
    name: "Kuponly",
};

export type AppLang = typeof APP_CONFIG.lang;
export type AppCountry = typeof APP_CONFIG.country;
