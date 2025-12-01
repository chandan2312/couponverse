"use client";

import { Category } from "@prisma/client";

interface CategoryListProps {
    lang: "en" | "ru";
    categories: Category[];
}

export const CategoryList = ({ lang, categories }: CategoryListProps) => {
    // Map material symbols to icons if needed, or just use the string
    return (
        <section className="px-4 md:px-10 py-8">
            <h2 className="text-[#181311] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3 pt-5">
                {lang === "en" ? "Shop by Category" : "Покупки по категориям"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category) => (
                    <a
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors border border-transparent hover:border-primary/20"
                    >
                        {/* Placeholder for icon since we don't have the font loaded in this component isolation */}
                        <span className="text-primary text-4xl material-symbols-outlined">
                            {category.icon || "category"}
                        </span>
                        <p className="text-[#181311] dark:text-white text-sm font-medium">
                            {category.name}
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};
