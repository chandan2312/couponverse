"use client";

import { words } from "../../constants/words";

interface HeroProps {
    lang: "en" | "ru";
}

export const Hero = ({ lang }: HeroProps) => {
    const t = words.Home;

    return (
        <div className="@container px-4 md:px-10 py-10 md:py-16">
            <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4 relative overflow-hidden"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=2000&q=80")',
                }}
            >
                <div className="flex flex-col gap-2 text-center max-w-2xl z-10">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                        {lang === "en"
                            ? "Find the Best Deals, Save Big Today"
                            : "Найдите лучшие предложения, сэкономьте сегодня"}
                    </h1>
                    <p className="text-white/90 text-sm font-normal leading-normal @[480px]:text-base">
                        {lang === "en"
                            ? "Discover thousands of coupons and offers from your favorite stores."
                            : "Откройте для себя тысячи купонов и предложений от ваших любимых магазинов."}
                    </p>
                </div>
                <div className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16 z-10">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-lg">
                        <div className="text-slate-500 flex bg-white items-center justify-center pl-4 rounded-l-lg border-r-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                            >
                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                            </svg>
                        </div>
                        <input
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-[#181311] focus:outline-none border-0 bg-white h-full placeholder:text-slate-500 px-2 text-sm font-normal leading-normal @[480px]:text-base"
                            placeholder={
                                lang === "en"
                                    ? "Search for stores or products..."
                                    : "Поиск магазинов или товаров..."
                            }
                        />
                        <div className="flex items-center justify-center rounded-r-lg bg-white pr-2">
                            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                                <span className="truncate">
                                    {lang === "en" ? "Search" : "Поиск"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
