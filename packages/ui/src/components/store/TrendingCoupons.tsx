"use client";

import Link from "next/link";
import { Offer, Store } from "@prisma/client";

interface TrendingCouponsProps {
    offers: (Offer & { store: Store })[];
    lang: "en" | "ru" | "es";
}

export function TrendingCoupons({ offers, lang }: TrendingCouponsProps) {
    const title =
        lang === "es"
            ? "Cupones Tendencia Similares"
            : lang === "ru"
                ? "Похожие популярные купоны"
                : "Similar Trending Coupons";

    const fromText = lang === "es" ? "De" : lang === "ru" ? "От" : "From";
    const getCodeText = lang === "es" ? "Obtener Código" : lang === "ru" ? "Получить код" : "Get Code";
    const viewDealText = lang === "es" ? "Ver Oferta" : lang === "ru" ? "Посмотреть" : "View Deal";

    return (
        <div className="flex w-full justify-center">
            <section className="flex w-full max-w-4xl flex-col gap-4 px-4 sm:px-6 lg:px-8 pt-8">
                <h2 className="text-zinc-900 dark:text-zinc-50 text-2xl font-bold leading-tight tracking-tight">
                    {title}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-zinc-900/50 rounded-xl shadow-sm"
                        >
                            <div className="flex gap-4 items-center">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-14 w-14 flex-shrink-0"
                                    style={{
                                        backgroundImage: `url("${offer.store.logoUrl ||
                                            "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=200&h=200&fit=crop"
                                            }")`,
                                    }}
                                />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                        {offer.title}
                                    </h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {fromText} {offer.store.name}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href={`/offer/${offer.id}`}
                                className={`flex w-full sm:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 text-sm font-bold leading-normal tracking-[0.015em] ${offer.code
                                        ? "bg-primary text-white"
                                        : "bg-primary/10 dark:bg-primary/20 text-primary"
                                    }`}
                            >
                                <span className="truncate">
                                    {offer.code ? getCodeText : viewDealText}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
