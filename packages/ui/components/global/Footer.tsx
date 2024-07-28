import Link from "next/link";
import React from "react";
import Image from "next/image";
import { words } from "../../constants/words";
import { Lang } from "../../types";

const Footer = () => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  return (
    <>
      <footer className="mx-auto max-w-7xl space-y-8 px-4 pt-4 font-medium bg-card text-card-foreground rounded-t-lg">
        <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-2 text-sm">
          <nav className="flex flex-col items-start space-y-2.5 md:space-y-1.5 ">
            <Link
              href="/pages/about-us"
              className="transition hover:text-blue-500"
            >
              {words.AboutUs[lang]}
            </Link>
            <Link
              href="/pages/contact-us"
              className="transition hover:text-blue-500"
            >
              {words.ContactUs[lang]}
            </Link>
            <Link
              href="/pages/privacy-policy"
              className="transition hover:text-blue-500"
            >
              {words.PrivacyPolicy[lang]}
            </Link>
            <Link
              href="/pages/disclaimer"
              className="transition hover:text-blue-500"
            >
              {words.Disclaimer[lang]}
            </Link>
            <Link
              href="/pages/terms-and-conditions"
              className="transition hover:text-blue-500"
            >
              {words.TermsAndConditions[lang]}
            </Link>
            <Link href="/pages/dmca" className="transition hover:text-blue-500">
              DMCA
            </Link>
          </nav>

          <nav className="flex flex-col items-start space-y-2.5 md:space-y-1.5 ">
            <Link href="/" className="transition hover:text-blue-500">
              {words.Home[lang]}
            </Link>
            <Link href="/stores" className="transition hover:text-blue-500">
              {words.AllStores[lang]}
            </Link>
            {/* <Link
              href="/view/popular-stores"
              className="transition hover:text-blue-500"
            >
              {words.PopularStores[lang]}
            </Link>
            <Link
              href="/view/trending-coupons"
              className="transition hover:text-blue-500"
            >
              {words.TrendingCouponOffers[lang]}
            </Link> */}
          </nav>
        </div>
        <div className="text-sm flex flex-col space-y-4 border-t border-slate-200 py-8 sm:items-center sm:justify-between md:flex-row md:space-y-0">
          <p>© 2024 {process.env.NEXT_PUBLIC_APP}, Inc.</p>

          <p>{words.HaveANiceDay[lang]}</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
