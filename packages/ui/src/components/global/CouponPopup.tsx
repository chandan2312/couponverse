"use client";

import type { Offer, Store } from "@prisma/client";
import { X, Copy, ExternalLink, Tag, CheckCircle2, Calendar } from "lucide-react";
import { useState } from "react";

interface CouponPopupProps {
    lang: "en" | "ru";
    offer: Offer & { store: Store };
    onClose: () => void;
}

export const CouponPopup = ({ lang, offer, onClose }: CouponPopupProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (offer.code) {
            navigator.clipboard.writeText(offer.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleApply = () => {
        if (offer.code) {
            navigator.clipboard.writeText(offer.code);
        }
        if (offer.store.websiteUrl) {
            window.open(offer.store.websiteUrl, "_blank");
        }
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative flex w-full max-w-lg flex-col gap-6 rounded-2xl bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Tag className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {offer.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {offer.description}
                    </p>
                </div>

                {/* Offer Details */}
                <div className="flex flex-col gap-3">
                    {offer.discount && (
                        <div className="flex items-center gap-2 text-sm">
                            <Tag className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-primary">{offer.discount}</span>
                        </div>
                    )}

                    {offer.isVerified && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{lang === "en" ? "Verified Coupon" : "Проверенный купон"}</span>
                        </div>
                    )}

                    {offer.expiryDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>
                                {lang === "en" ? "Expires: " : "Истекает: "}
                                {new Date(offer.expiryDate).toLocaleDateString(
                                    lang === "en" ? "en-US" : "ru-RU"
                                )}
                            </span>
                        </div>
                    )}
                </div>

                {/* Coupon Code Display */}
                {offer.code && (
                    <div className="relative">
                        <div className="flex h-16 w-full items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5 dark:bg-primary/10">
                            <span className="text-2xl font-bold tracking-widest text-primary select-all">
                                {offer.code}
                            </span>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="absolute -top-2 -right-2 flex items-center gap-1 rounded-full bg-primary text-white px-3 py-1 text-xs font-medium shadow-lg hover:bg-primary/90 transition-colors"
                        >
                            {copied ? (
                                <>
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>{lang === "en" ? "Copied!" : "Скопировано!"}</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    <span>{lang === "en" ? "Copy" : "Копировать"}</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Terms */}
                {offer.terms && (
                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            <span className="font-semibold">{lang === "en" ? "Terms: " : "Условия: "}</span>
                            {offer.terms}
                        </p>
                    </div>
                )}

                {/* Action Button */}
                <button
                    onClick={handleApply}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-white text-base font-bold shadow-sm transition-colors hover:bg-primary/90"
                >
                    <ExternalLink className="w-5 h-5" />
                    <span>
                        {offer.code
                            ? lang === "en" ? "Apply Coupon" : "Применить купон"
                            : lang === "en" ? "Go to Deal" : "Перейти к предложению"
                        }
                    </span>
                </button>

                {/* Store Link */}
                {offer.store.websiteUrl && (
                    <a
                        className="w-full text-center text-sm font-semibold text-primary hover:underline"
                        href={offer.store.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {lang === "en"
                            ? `Visit ${offer.store.name}`
                            : `Посетить ${offer.store.name}`}
                    </a>
                )}
            </div>
        </div>
    );
};
