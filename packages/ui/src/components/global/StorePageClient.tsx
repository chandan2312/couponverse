"use client";

import type { Store, Offer, Vote } from "@prisma/client";
import { useState } from "react";
import { Scissors } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { Breadcrumbs } from "./Breadcrumbs";
import { CouponPopup } from "./CouponPopup";

interface StorePageClientProps {
    lang: "en" | "ru";
    store: Store;
    offers: (Offer & { store: Store; votes: Vote[] })[];
}

export const StorePageClient = ({
    lang,
    store,
    offers,
}: StorePageClientProps) => {
    const [activeTab, setActiveTab] = useState<"all" | "coupons" | "deals">("all");
    const [selectedOffer, setSelectedOffer] = useState<(Offer & { store: Store }) | null>(null);

    // Filter offers based on active tab
    const filteredOffers = offers.filter((offer) => {
        if (activeTab === "all") return true;
        if (activeTab === "coupons") return offer.code !== null;
        if (activeTab === "deals") return offer.code === null;
        return true;
    });

    const getMaskedCode = (code: string) => {
        if (code.length <= 2) return code;
        const visibleChars = code.slice(-2);
        return "••••" + visibleChars;
    };

    return (
        <div className="flex flex-1 justify-center py-5 sm:py-8 lg:py-12">
            <div className="flex w-full max-w-4xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs
                    items={[
                        { label: lang === "en" ? "Home" : "Главная", href: "/" },
                        { label: lang === "en" ? "Stores" : "Магазины", href: "/stores" },
                        { label: store.name },
                    ]}
                />

                <section className="flex p-4 @container bg-white dark:bg-zinc-900/50 rounded-xl shadow-sm">
                    <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                        <div className="flex gap-6 items-center">
                            <div
                                className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 bg-white border border-gray-100"
                                style={{
                                    backgroundImage: `url("${store.logoUrl ||
                                        "https://via.placeholder.com/128?text=" + store.name.charAt(0)
                                        }")`,
                                }}
                            ></div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-zinc-900 dark:text-zinc-50 text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
                                    {store.name}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-normal leading-normal">
                                    {store.description}
                                </p>
                                {store.websiteUrl && (
                                    <a
                                        className="text-primary hover:underline text-sm sm:text-base font-semibold leading-normal"
                                        href={store.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {lang === "en" ? "Visit Store" : "Посетить магазин"}
                                    </a>
                                )}
                            </div>
                        </div>
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] gap-2 w-full max-w-[480px] @[520px]:w-auto hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">favorite</span>
                            <span className="truncate">
                                {lang === "en" ? "Follow" : "Подписаться"}
                            </span>
                        </button>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <div className="w-full">
                        <label className="flex flex-col h-12 w-full">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900/50 overflow-hidden">
                                <div className="text-zinc-500 dark:text-zinc-400 flex items-center justify-center pl-4 bg-transparent">
                                    <span className="material-symbols-outlined">search</span>
                                </div>
                                <input
                                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-zinc-900 dark:text-zinc-50 focus:outline-none bg-transparent h-full placeholder:text-zinc-500 dark:placeholder:text-zinc-400 px-4 pl-2 text-base font-normal leading-normal"
                                    placeholder={
                                        lang === "en"
                                            ? "Search for deals..."
                                            : "Поиск предложений..."
                                    }
                                />
                            </div>
                        </label>
                    </div>
                    <div className="flex gap-2 sm:gap-3 p-1 flex-wrap">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 font-medium text-sm transition-colors ${activeTab === "all"
                                    ? "bg-primary/10 dark:bg-primary/20 text-primary"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {lang === "en" ? "All" : "Все"} ({offers.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("coupons")}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 font-medium text-sm transition-colors ${activeTab === "coupons"
                                    ? "bg-primary/10 dark:bg-primary/20 text-primary"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {lang === "en" ? "Coupons" : "Купоны"} (
                            {offers.filter((o) => o.code).length})
                        </button>
                        <button
                            onClick={() => setActiveTab("deals")}
                            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 font-medium text-sm transition-colors ${activeTab === "deals"
                                    ? "bg-primary/10 dark:bg-primary/20 text-primary"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                }`}
                        >
                            {lang === "en" ? "Deals" : "Скидки"} (
                            {offers.filter((o) => !o.code).length})
                        </button>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-6">
                    {filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white dark:bg-zinc-900/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {offer.isVerified && (
                                        <span className="inline-flex items-center rounded-md bg-green-100 dark:bg-green-900/50 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
                                            {lang === "en" ? "Verified" : "Проверено"}
                                        </span>
                                    )}
                                    <VoteButtons
                                        offerId={offer.id}
                                        initialUpvotes={offer.upvotes}
                                        lang={lang}
                                    />
                                    {offer.expiryDate && (
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            {lang === "en" ? "Expires: " : "Истекает: "}
                                            {new Date(offer.expiryDate).toLocaleDateString(
                                                lang === "en" ? "en-US" : "ru-RU"
                                            )}
                                        </p>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                                    {offer.title}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {offer.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                {offer.code ? (
                                    <div className="flex-1 sm:flex-initial relative w-full sm:w-auto group">
                                        <button
                                            onClick={() => setSelectedOffer(offer)}
                                            className="w-full flex min-w-[120px] cursor-pointer items-center justify-center overflow-visible rounded-lg h-11 px-6 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em] border-2 border-dashed border-primary/50 hover:bg-primary/20 hover:scale-105 transition-all relative"
                                        >
                                            {/* Scissor cut line overlay */}
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] pointer-events-none z-10">
                                                <div className="absolute left-0 top-0 w-full h-full border-t border-dashed border-primary/40"></div>
                                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                    <Scissors className="w-3.5 h-3.5 text-primary rotate-90" />
                                                </div>
                                            </div>

                                            {/* Perforated edge effect */}
                                            <div className="absolute -left-1 top-0 h-full w-2 flex flex-col justify-evenly opacity-40">
                                                {[...Array(6)].map((_, i) => (
                                                    <div key={`l-${i}`} className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                                ))}
                                            </div>
                                            <div className="absolute -right-1 top-0 h-full w-2 flex flex-col justify-evenly opacity-40">
                                                {[...Array(6)].map((_, i) => (
                                                    <div key={`r-${i}`} className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                                ))}
                                            </div>

                                            <span className="truncate relative z-20">{getMaskedCode(offer.code)}</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setSelectedOffer(offer)}
                                        className="flex w-full sm:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                                    >
                                        <span className="truncate">
                                            {lang === "en" ? "Get Deal" : "Получить"}
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {selectedOffer && (
                <CouponPopup
                    offer={selectedOffer}
                    lang={lang}
                    onClose={() => setSelectedOffer(null)}
                />
            )}
        </div>
    );
};
