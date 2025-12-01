"use client";

import type { Category, Offer, Store } from "@prisma/client";
import { Breadcrumbs } from "./Breadcrumbs";
import { OfferCard } from "./OfferCard";

interface CategoryPageClientProps {
    lang: "en" | "ru";
    category: Category;
    offers: (Offer & { store: Store })[];
}

export const CategoryPageClient = ({
    lang,
    category,
    offers,
}: CategoryPageClientProps) => {
    return (
        <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
                <p>DEBUG_STRING_123</p>
                <Breadcrumbs
                    items={[
                        { label: lang === "en" ? "Home" : "Главная", href: "/" },
                        { label: lang === "en" ? "Categories" : "Категории", href: "#" },
                        { label: category.name },
                    ]}
                />

                <div className="flex flex-wrap items-end justify-between gap-4 py-6">
                    <div className="flex min-w-72 flex-col gap-2">
                        <h1 className="text-[#181311] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                            {category.name} {lang === "en" ? "Offers" : "Предложения"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                            {lang === "en" ? "Showing" : "Показано"} {offers.length}{" "}
                            {lang === "en" ? "offers" : "предложений"}
                        </p>
                    </div>
                    <label className="relative flex-1 max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181311] dark:text-gray-200 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-11 placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-10 text-base font-normal leading-normal"
                            placeholder={
                                lang === "en"
                                    ? `Search in ${category.name}...`
                                    : `Поиск в ${category.name}...`
                            }
                        />
                    </label>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-y border-gray-200/80 dark:border-gray-700/80">
                    <div className="flex gap-2 flex-wrap">
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-3 pr-2 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            <p className="text-[#181311] dark:text-gray-200 text-sm font-medium leading-normal">
                                {lang === "en" ? "Store" : "Магазин"}
                            </p>
                            <span className="material-symbols-outlined text-lg">
                                expand_more
                            </span>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-3 pr-2 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            <p className="text-[#181311] dark:text-gray-200 text-sm font-medium leading-normal">
                                {lang === "en" ? "Brand" : "Бренд"}
                            </p>
                            <span className="material-symbols-outlined text-lg">
                                expand_more
                            </span>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-3 pr-2 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            <p className="text-[#181311] dark:text-gray-200 text-sm font-medium leading-normal">
                                {lang === "en" ? "Offer Type" : "Тип предложения"}
                            </p>
                            <span className="material-symbols-outlined text-lg">
                                expand_more
                            </span>
                        </button>
                        <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary/20 dark:bg-primary/30 border border-primary/50 text-primary dark:text-white pl-3 pr-3 shadow-sm">
                            <p className="text-sm font-medium leading-normal">
                                {lang === "en" ? "Verified Only" : "Только проверенные"}
                            </p>
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl">
                                filter_list
                            </span>
                            <span className="text-sm font-medium">
                                {lang === "en" ? "Filters" : "Фильтры"}
                            </span>
                        </button>
                        <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl">
                                swap_vert
                            </span>
                            <span className="text-sm font-medium">
                                {lang === "en" ? "Sort by: Popular" : "Сортировка: Популярные"}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
                    {offers.map((offer) => (
                        <OfferCard key={offer.id} lang={lang} offer={offer} />
                    ))}
                </div>
            </div>
        </div>
    );
};
