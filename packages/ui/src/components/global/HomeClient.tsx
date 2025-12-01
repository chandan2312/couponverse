"use client";

import { Store, Category } from "@prisma/client";
import { Hero } from "./Hero";
import { FeaturedDeals } from "./FeaturedDeals";
import { CategoryList } from "./CategoryList";

interface HomeClientProps {
    lang: "en" | "ru" | "es";
    stores: Store[];
    categories: Category[];
}

export const HomeClient = ({ lang, stores, categories }: HomeClientProps) => {
    return (
        <div className="layout-container flex h-full grow flex-col bg-white dark:bg-background-dark">
            <div className="flex flex-1 justify-center">
                <div className="layout-content-container flex flex-col w-full max-w-[1280px] flex-1">
                    <Hero lang={lang} />
                    <FeaturedDeals lang={lang} stores={stores} />
                    <CategoryList lang={lang} categories={categories} />
                </div>
            </div>
        </div>
    );
};
