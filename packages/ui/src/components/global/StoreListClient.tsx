"use client";

import { Store } from "@prisma/client";
import { Breadcrumbs } from "./Breadcrumbs";

interface StoreListClientProps {
    lang: "en" | "ru";
    stores: Store[];
}

export const StoreListClient = ({ lang, stores }: StoreListClientProps) => {
    return (
        <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
                <Breadcrumbs
                    items={[
                        { label: lang === "en" ? "Home" : "Главная", href: "/" },
                        { label: lang === "en" ? "Stores" : "Магазины" },
                    ]}
                />

                <div className="flex flex-wrap items-end justify-between gap-4 py-6">
                    <div className="flex min-w-72 flex-col gap-2">
                        <h1 className="text-[#181311] dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">
                            {lang === "en" ? "All Stores" : "Все магазины"}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                            {lang === "en" ? "Browse offers from" : "Просмотр предложений от"}{" "}
                            {stores.length} {lang === "en" ? "stores" : "магазинов"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-8">
                    {stores.map((store) => (
                        <a
                            key={store.id}
                            href={`/store/${store.slug}`}
                            className="flex flex-col items-center gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                        >
                            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700 p-2">
                                <img
                                    src={
                                        store.logoUrl ||
                                        "https://via.placeholder.com/80?text=" + store.name.charAt(0)
                                    }
                                    alt={store.name}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-[#181311] dark:text-gray-100">
                                    {store.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                    {store.description}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
