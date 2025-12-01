"use client";

import { words } from "../../constants/words";
import { Newsletter } from "./Newsletter";

interface FooterProps {
    lang: "en" | "ru";
}

export const Footer = ({ lang }: FooterProps) => {
    const t = words.Footer;

    return (
        <footer className="mt-16 bg-white dark:bg-gray-900 px-4 md:px-10 py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-[#181311] dark:text-white">
                        <h2 className="text-lg font-bold">Couponverse</h2>
                    </div>
                    <p className="text-sm text-[#896b61] dark:text-gray-400">
                        {lang === "en"
                            ? "Your one-stop shop for the best deals and coupons."
                            : "Ваш универсальный магазин лучших предложений и купонов."}
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[#181311] dark:text-white">
                        {lang === "en" ? "Quick Links" : "Быстрые ссылки"}
                    </h3>
                    <a className="text-sm text-[#896b61] dark:text-gray-400 hover:text-primary" href="/">
                        {lang === "en" ? "Home" : "Главная"}
                    </a>
                    <a className="text-sm text-[#896b61] dark:text-gray-400 hover:text-primary" href="#">
                        {lang === "en" ? "Categories" : "Категории"}
                    </a>
                    <a className="text-sm text-[#896b61] dark:text-gray-400 hover:text-primary" href="#">
                        {lang === "en" ? "Stores" : "Магазины"}
                    </a>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-[#181311] dark:text-white">
                        {lang === "en" ? "Legal" : "Юридическая информация"}
                    </h3>
                    <a className="text-sm text-[#896b61] dark:text-gray-400 hover:text-primary" href="#">
                        {lang === "en" ? "Terms of Service" : "Условия использования"}
                    </a>
                    <a className="text-sm text-[#896b61] dark:text-gray-400 hover:text-primary" href="#">
                        {lang === "en" ? "Privacy Policy" : "Политика конфиденциальности"}
                    </a>
                </div>
                <Newsletter lang={lang} />
            </div>
            <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-4 text-center text-sm text-[#896b61] dark:text-gray-400">
                {t.copyright[lang]}
            </div>
        </footer>
    );
};
