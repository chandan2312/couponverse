"use client";

import Link from "next/link";
import { Store, StoreAnalytics } from "@prisma/client";

interface TrendingStoresWidgetProps {
    stores: (StoreAnalytics & { store: Store })[];
    lang: "en" | "ru" | "es";
}

export function TrendingStoresWidget({ stores, lang }: TrendingStoresWidgetProps) {
    const title =
        lang === "es"
            ? "🔥 Tiendas Populares"
            : lang === "ru"
                ? "🔥 Популярные магазины"
                : "🔥 Trending Stores";

    const viewsText = (views: number) => {
        if (lang === "es") return `${views.toLocaleString()} vistas`;
        if (lang === "ru") return `${views.toLocaleString()} просмотров`;
        return `${views.toLocaleString()} views`;
    };

    return (
        <section className="px-4 md:px-10 py-8">
            <h2 className="text-[#181311] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                {title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {stores.map(({ store, views }) => (
                    <Link
                        key={store.id}
                        href={`/store/${store.slug}`}
                        className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-20 w-20"
                            style={{
                                backgroundImage: `url("${store.logoUrl ||
                                    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop"
                                    }")`,
                            }}
                        />
                        <div className="flex flex-col items-center text-center">
                            <h3 className="font-bold text-[#181311] dark:text-white text-sm line-clamp-1">
                                {store.name}
                            </h3>
                            <p className="text-xs text-[#896b61] dark:text-gray-400">
                                {viewsText(views)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
