export const APP_CONFIG = {
    country: "es" as const,
    lang: "es" as const,
    domain: "spanish.es",
    name: "Cupones España",
};

export type AppLang = typeof APP_CONFIG.lang;
export type AppCountry = typeof APP_CONFIG.country;
