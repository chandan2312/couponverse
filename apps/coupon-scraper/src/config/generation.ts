export const GENERATION_DURATIONS = {
    popular: 7,  // days (Global/Country Giants)
    views: 7,    // days (High Traffic > 1000)
    category: 14, // days (Category Leaders)
    mid: 14,     // days (Mid Traffic > 100)
    low: 30,     // days (Low Traffic)
} as const;

export type PopularityTag = keyof typeof GENERATION_DURATIONS;
