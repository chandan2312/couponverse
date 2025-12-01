"use client";

interface NewsletterProps {
    lang: "en" | "ru";
}

export const Newsletter = ({ lang }: NewsletterProps) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[#181311] dark:text-white">
                {lang === "en" ? "Newsletter" : "Рассылка"}
            </h3>
            <p className="text-sm text-[#896b61] dark:text-gray-400">
                {lang === "en"
                    ? "Subscribe to get the latest deals."
                    : "Подпишитесь, чтобы получать последние предложения."}
            </p>
            <div className="flex mt-2">
                <input
                    className="flex-grow rounded-l-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder={lang === "en" ? "Your email..." : "Ваш email..."}
                    type="email"
                />
                <button className="bg-primary text-white px-4 rounded-r-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                    {lang === "en" ? "Subscribe" : "Подписаться"}
                </button>
            </div>
        </div>
    );
};
