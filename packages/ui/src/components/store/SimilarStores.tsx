"use client";

import Link from "next/link";
import { Store } from "@prisma/client";

interface SimilarStoresProps {
    stores: (Store & { offerCount?: number })[];
    lang: "en" | "ru" | "es";
}

export function SimilarStores({ stores, lang }: SimilarStoresProps) {
    const title = lang === "es"
        ? "Tiendas Similares"
        : lang === "ru"
            ? "Похожие магазины"
            : "Similar Stores";

    const dealsText = (count: number) => {
        if (lang === "es") return `${count} Ofertas`;
        if (lang === "ru") return `${count} предложений`;
        return `${count} Deals`;
    };

    return (
        <div className="flex w-full justify-center">
            <section className="flex w-full max-w-4xl flex-col gap-4 px-4 sm:px-6 lg:px-8 pt-8">
                <h2 className="text-zinc-900 dark:text-zinc-50 text-2xl font-bold leading-tight tracking-tight">
                    {title}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {stores.map((store) => (
                        <Link
                            key={store.id}
                            href={`/store/${store.slug}`}
                            className="flex flex-col items-center justify-center gap-3 p-4 bg-white dark:bg-zinc-900/50 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-16 w-16"
                                style={{
                                    backgroundImage: `url("${store.logoUrl ||
                                        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop"
                                        }")`,
                                }}
                            />
                            <div className="flex flex-col items-center text-center">
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
                                    {store.name}
                                </h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {dealsText(store.offerCount || 0)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
