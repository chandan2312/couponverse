"use client";

import { Store } from "@prisma/client";
import Link from "next/link";

interface FeaturedDealsProps {
    lang: "en" | "ru" | "es";
    stores: Store[];
}

export const FeaturedDeals = ({ lang, stores }: FeaturedDealsProps) => {
    const title = lang === "es" ? "Tiendas Destacadas" : lang === "ru" ? "Популярные магазины" : "Featured Stores";
    const visitText = lang === "es" ? "Visitar Tienda" : lang === "ru" ? "Посетить магазин" : "Visit Store";

    return (
        <section className="px-4 md:px-10 py-8">
            <h2 className="text-[#181311] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                {title}
            </h2>
            <div className="flex overflow-x-auto pb-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 gap-4">
                {stores.map((store) => (
                    <Link
                        key={store.id}
                        href={`/store/${store.slug}`}
                        className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm min-w-[280px] max-w-[320px] border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                        <div
                            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-t-xl"
                            style={{
                                backgroundImage: `url("${store.logoUrl || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80"}")`,
                            }}
                        />
                        <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
                            <div>
                                <p className="text-[#181311] dark:text-white text-base font-medium leading-normal line-clamp-2">
                                    {store.name}
                                </p>
                                {store.description && (
                                    <p className="text-[#896b61] dark:text-gray-400 text-sm font-normal leading-normal mt-1 line-clamp-2">
                                        {store.description}
                                    </p>
                                )}
                            </div>
                            <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/10 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary hover:text-white transition-colors">
                                <span className="truncate">{visitText}</span>
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
