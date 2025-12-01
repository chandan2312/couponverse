"use client";

import type { Offer, Store } from "@prisma/client";
import { useState } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { CouponPopup } from "./CouponPopup";
// import { voteOffer } from "../../actions/vote";

interface OfferPageClientProps {
    lang: "en" | "ru";
    offer: Offer & { store: Store };
}

export const OfferPageClient = ({ lang, offer }: OfferPageClientProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className="flex flex-1 justify-center py-5 sm:py-8 lg:py-12">
                <div className="flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        items={[
                            { label: lang === "en" ? "Home" : "Главная", href: "/" },
                            {
                                label: lang === "en" ? "Stores" : "Магазины",
                                href: "/stores",
                            },
                            { label: offer.store.name, href: `/store/${offer.store.slug}` },
                            { label: offer.title },
                        ]}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="col-span-1 lg:col-span-2 space-y-8">
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <h1 className="text-[#181311] dark:text-gray-100 text-2xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                                        {offer.title}
                                    </h1>
                                    <img
                                        alt={offer.store.name}
                                        className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                        src={
                                            offer.store.logoUrl ||
                                            "https://via.placeholder.com/48?text=" +
                                            offer.store.name.charAt(0)
                                        }
                                    />
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {offer.isVerified && (
                                        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-50 dark:bg-gray-700 px-3">
                                            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-xl">
                                                verified
                                            </span>
                                            <p className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-200">
                                                {lang === "en" ? "Verified" : "Проверено"}
                                            </p>
                                        </div>
                                    )}
                                    {offer.expiryDate && (
                                        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-50 dark:bg-gray-700 px-3">
                                            <span className="material-symbols-outlined text-primary text-xl">
                                                schedule
                                            </span>
                                            <p className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-200">
                                                {lang === "en" ? "Expires: " : "Истекает: "}
                                                {new Date(offer.expiryDate).toLocaleDateString(
                                                    lang === "en" ? "en-US" : "ru-RU"
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    {offer.code ? (
                                        <button
                                            onClick={() => setIsPopupOpen(true)}
                                            className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
                                        >
                                            <span className="truncate">
                                                {lang === "en" ? "Get Code" : "Получить код"}
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="flex w-full max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                                            <span className="truncate">
                                                {lang === "en" ? "Get Deal" : "Получить скидку"}
                                            </span>
                                        </button>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        {lang === "en"
                                            ? "Click to activate the deal and be redirected to the store."
                                            : "Нажмите, чтобы активировать предложение и перейти в магазин."}
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        {/* <button
                                            onClick={() => voteOffer(offer.id, "up")}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-green-100 hover:text-green-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-green-500/20 dark:hover:text-green-400 gap-1"
                                        >
                                            <span className="material-symbols-outlined">thumb_up</span>
                                            <span className="text-xs font-bold">{offer.upvotes}</span>
                                        </button>
                                        <button
                                            onClick={() => voteOffer(offer.id, "down")}
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-red-100 hover:text-red-500 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-red-500/20 dark:hover:text-red-400 gap-1"
                                        >
                                            <span className="material-symbols-outlined">thumb_down</span>
                                            <span className="text-xs font-bold">{offer.downvotes}</span>
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-[#181311] dark:text-gray-100">
                                    {lang === "en" ? "Offer Details" : "Детали предложения"}
                                </h3>
                                <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                    <p>{offer.description}</p>
                                    {offer.terms && (
                                        <>
                                            <h4 className="font-bold mt-4">
                                                {lang === "en"
                                                    ? "Terms & Conditions"
                                                    : "Условия и положения"}
                                            </h4>
                                            <p>{offer.terms}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-span-1 space-y-8 mt-8 lg:mt-0">
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        alt={offer.store.name}
                                        className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                        src={
                                            offer.store.logoUrl ||
                                            "https://via.placeholder.com/48?text=" +
                                            offer.store.name.charAt(0)
                                        }
                                    />
                                    <div>
                                        <h4 className="font-bold text-[#181311] dark:text-gray-100">
                                            {lang === "en" ? "About" : "О магазине"}{" "}
                                            {offer.store.name}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {offer.store.description}
                                </p>
                                <a
                                    href={`/store/${offer.store.slug}`}
                                    className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-50 dark:bg-gray-700 text-[#181311] dark:text-gray-100 text-sm font-bold leading-normal tracking-[0.015em] border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <span className="truncate">
                                        {lang === "en"
                                            ? "See All Brand Offers"
                                            : "Все предложения бренда"}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isPopupOpen && (
                <CouponPopup
                    lang={lang}
                    offer={offer}
                    onClose={() => setIsPopupOpen(false)}
                // voteOffer={voteOffer}
                />
            )}
        </>
    );
};
