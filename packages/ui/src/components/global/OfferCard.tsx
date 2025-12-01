"use client";

import type { Offer, Store } from "@prisma/client";
import { useState } from "react";
import { CouponPopup } from "./CouponPopup";
// import { voteOffer } from "../../actions/vote";

interface OfferCardProps {
    lang: "en" | "ru";
    offer: Offer & { store: Store };
}

export const OfferCard = ({ lang, offer }: OfferCardProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-lg">
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                    <img
                        className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                        alt={offer.store.name}
                        src={
                            offer.store.logoUrl ||
                            "https://via.placeholder.com/48?text=" +
                            offer.store.name.charAt(0)
                        }
                    />
                    <div className="flex flex-col">
                        <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                            {offer.discount || offer.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {lang === "en" ? "at " : "в "}
                            {offer.store.name}
                        </p>
                    </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {offer.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                        {offer.isVerified && (
                            <>
                                <span className="material-symbols-outlined text-base">
                                    verified
                                </span>
                                <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                <span className="text-gray-400 dark:text-gray-500">•</span>
                            </>
                        )}
                        <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    {offer.code ? (
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                        >
                            {lang === "en" ? "Get Code" : "Получить код"}
                        </button>
                    ) : (
                        <a
                            href={`/offer/${offer.id}`}
                            className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                        >
                            {lang === "en" ? "Get Deal" : "Получить скидку"}
                        </a>
                    )}
                    {offer.expiryDate && (
                        <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                            {lang === "en" ? "Expires: " : "Истекает: "}
                            {new Date(offer.expiryDate).toLocaleDateString(
                                lang === "en" ? "en-US" : "ru-RU"
"use client";
                                            <img
                                                className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                                alt={offer.store.name}
                                                src={
                                                    offer.store.logoUrl ||
                                                    "https://via.placeholder.com/48?text=" +
                                                    offer.store.name.charAt(0)
                                                }
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                                    {offer.discount || offer.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {lang === "en" ? "at " : "в "}
                                                    {offer.store.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                                {offer.isVerified && (
                                                    <>
                                                        <span className="material-symbols-outlined text-base">
                                                            verified
                                                        </span>
                                                        <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                                    </>
                                                )}
                                                <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                            {offer.code ? (
                                                <button
                                                    onClick={() => setIsPopupOpen(true)}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold tracking-wide hover:bg-primary hover:text-white transition-colors border border-primary/20 border-dashed relative overflow-hidden group"
                                                >
                                                    <span className="relative z-10 flex items-center gap-2">
                                                        {offer.code.slice(0, 4)}****
                                                        <span className="text-xs font-normal opacity-70 group-hover:opacity-100">
                                                            {lang === "en" ? "Show Code" : "Показать код"}
                                                        </span>
                                                    </span>
                                                </button>
                                            ) : (
                                                <a
                                                    href={`/offer/${offer.id}`}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Deal" : "Получить скидку"}
                                                </a>
                                            )}
                                            {offer.expiryDate && (
                                                <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                                                    {lang === "en" ? "Expires: " : "Истекает: "}
                                                    {new Date(offer.expiryDate).toLocaleDateString(
                                                        lang === "en" ? "en-US" : "ru-RU"
                                                    )}
                                                </p>
                                            )}
                                        </div>
"use client";

                    import {Offer, Store} from "@prisma/client";
                    import {useState} from "react";
                    import {CouponPopup} from "./CouponPopup";
                    import {voteOffer} from "../../actions/vote";

                    interface OfferCardProps {
                        lang: "en" | "ru";
                    offer: Offer & {store: Store };
}

                    export const OfferCard = ({lang, offer}: OfferCardProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

                    return (
        <>
                        <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-lg">
                            <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                                <img
                                    className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                    alt={offer.store.name}
                                    src={
                                        offer.store.logoUrl ||
                                        "https://via.placeholder.com/48?text=" +
                                        offer.store.name.charAt(0)
                                    }
                                />
                                <div className="flex flex-col">
                                    <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                        {offer.discount || offer.title}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {lang === "en" ? "at " : "в "}
                                        {offer.store.name}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 flex-grow flex flex-col justify-between">
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    {offer.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                    {offer.isVerified && (
                                        <>
                                            <span className="material-symbols-outlined text-base">
                                                verified
                                            </span>
                                            <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                            <span className="text-gray-400 dark:text-gray-500">•</span>
                                        </>
                                    )}
                                    <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                {offer.code ? (
                                    <button
                                        onClick={() => setIsPopupOpen(true)}
                                        className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                    >
                                        {lang === "en" ? "Get Code" : "Получить код"}
                                    </button>
                                ) : (
                                    <a
                                        href={`/offer/${offer.id}`}
                                        className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                    >
                                        {lang === "en" ? "Get Deal" : "Получить скидку"}
                                    </a>
                                )}
                                {offer.expiryDate && (
                        <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                            {lang === "en" ? "Expires: " : "Истекает: "}
                            {new Date(offer.expiryDate).toLocaleDateString(
                                lang === "en" ? "en-US" : "ru-RU"
"use client";
                                            <img
                                                className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                                alt={offer.store.name}
                                                src={
                                                    offer.store.logoUrl ||
                                                    "https://via.placeholder.com/48?text=" +
                                                    offer.store.name.charAt(0)
                                                }
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                                    {offer.discount || offer.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {lang === "en" ? "at " : "в "}
                                                    {offer.store.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                                {offer.isVerified && (
                                                    <>
                                                        <span className="material-symbols-outlined text-base">
                                                            verified
                                                        </span>
                                                        <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                                    </>
                                                )}
                                                <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                            {offer.code ? (
                                                <button
                                                    onClick={() => setIsPopupOpen(true)}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Code" : "Получить код"}
                                                </button>
                                            ) : (
                                                <a
                                                    href={`/offer/${offer.id}`}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Deal" : "Получить скидку"}
                                                </a>
                                            )}
                                            {offer.expiryDate && (
                                                <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                                                    {lang === "en" ? "Expires: " : "Истекает: "}
                                                    {new Date(offer.expiryDate).toLocaleDateString(
                                                        lang === "en" ? "en-US" : "ru-RU"
                                                    )}
                                                </p>
                                            )}
                                        </div>
```
                                                    offer.store.logoUrl ||
                                                    "https://via.placeholder.com/48?text=" +
                                                    offer.store.name.charAt(0)
                                                }
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                                    {offer.discount || offer.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {lang === "en" ? "at " : "в "}
                                                    {offer.store.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                                {offer.isVerified && (
                                                    <>
                                                        <span className="material-symbols-outlined text-base">
                                                            verified
                                                        </span>
                                                        <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                                    </>
                                                )}
                                                <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                            {offer.code ? (
                                                <button
                                                    onClick={() => setIsPopupOpen(true)}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Code" : "Получить код"}
                                                </button>
                                            ) : (
                                                <a
                                                    href={`/ offer / ${offer.id}`}
                                className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                {lang === "en" ? "Get Deal" : "Получить скидку"}
                            </a>
                                            )}
                            {offer.expiryDate && (
                                <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                                    {lang === "en" ? "Expires: " : "Истекает: "}
                                    {new Date(offer.expiryDate).toLocaleDateString(
                                        lang === "en" ? "en-US" : "ru-RU"
                                    )}
                                </p>
                            )}
                        </div>
                        "use client";

                        import {Offer, Store} from "@prisma/client";
                        import {useState} from "react";
                        import {CouponPopup} from "./CouponPopup";
                        import {voteOffer} from "../../actions/vote";

                        interface OfferCardProps {
                            lang: "en" | "ru";
                        offer: Offer & {store: Store };
}

                        export const OfferCard = ({lang, offer}: OfferCardProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

                        return (
        <>
                            <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-shadow hover:shadow-lg">
                                <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                                    <img
                                        className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                        alt={offer.store.name}
                                        src={
                                            offer.store.logoUrl ||
                                            "https://via.placeholder.com/48?text=" +
                                            offer.store.name.charAt(0)
                                        }
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                            {offer.discount || offer.title}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {lang === "en" ? "at " : "в "}
                                            {offer.store.name}
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        {offer.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                        {offer.isVerified && (
                                            <>
                                                <span className="material-symbols-outlined text-base">
                                                    verified
                                                </span>
                                                <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                                <span className="text-gray-400 dark:text-gray-500">•</span>
                                            </>
                                        )}
                                        <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                    {offer.code ? (
                                        <button
                                            onClick={() => setIsPopupOpen(true)}
                                            className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                        >
                                            {lang === "en" ? "Get Code" : "Получить код"}
                                        </button>
                                    ) : (
                                        <a
                                            href={`/offer/${offer.id}`}
                                            className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                        >
                                            {lang === "en" ? "Get Deal" : "Получить скидку"}
                                        </a>
                                    )}
                                    {offer.expiryDate && (
                        <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                            {lang === "en" ? "Expires: " : "Истекает: "}
                            {new Date(offer.expiryDate).toLocaleDateString(
                                lang === "en" ? "en-US" : "ru-RU"
"use client";
                                            <img
                                                className="h-12 w-12 rounded-lg object-contain bg-white p-1 border border-gray-200"
                                                alt={offer.store.name}
                                                src={
                                                    offer.store.logoUrl ||
                                                    "https://via.placeholder.com/48?text=" +
                                                    offer.store.name.charAt(0)
                                                }
                                            />
                                            <div className="flex flex-col">
                                                <p className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                                    {offer.discount || offer.title}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {lang === "en" ? "at " : "в "}
                                                    {offer.store.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-grow flex flex-col justify-between">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 mb-4">
                                                {offer.isVerified && (
                                                    <>
                                                        <span className="material-symbols-outlined text-base">
                                                            verified
                                                        </span>
                                                        <span>{lang === "en" ? "Verified" : "Проверено"}</span>
                                                        <span className="text-gray-400 dark:text-gray-500">•</span>
                                                    </>
                                                )}
                                                <span>{lang === "en" ? "Today's top pick" : "Выбор дня"}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 mt-auto">
                                            {offer.code ? (
                                                <button
                                                    onClick={() => setIsPopupOpen(true)}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Code" : "Получить код"}
                                                </button>
                                            ) : (
                                                <a
                                                    href={`/offer/${offer.id}`}
                                                    className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold tracking-wide hover:bg-primary/90 transition-colors"
                                                >
                                                    {lang === "en" ? "Get Deal" : "Получить скидку"}
                                                </a>
                                            )}
                                            {offer.expiryDate && (
                                                <p className="text-xs text-center text-red-600 dark:text-red-400 mt-2 font-medium">
                                                    {lang === "en" ? "Expires: " : "Истекает: "}
                                                    {new Date(offer.expiryDate).toLocaleDateString(
                                                        lang === "en" ? "en-US" : "ru-RU"
                                                    )}
                                                </p>
                                            )}
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
                            ```
