import React from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { Home, Store } from "lucide-react";
import { words } from "../../constants/words";
import { Separator } from "../ui/separator";
import NavbarSearch from "./NavbarSearch";
import TopBrandsDropDown from "./TopBrandsDropDown";
import { getTrendingStores } from "../../actions/store";
import ProfileWrapper from "./ProfileWrapper";
import { getProtocol } from "../../lib/utils";
import { Lang } from "../../types";

const Navbar = async () => {
  const lang: Lang = (process.env.LG as Lang) || "en";
  const country = (process.env.COUNTRYCODE as string) || "en";
  const protocol = getProtocol();

  const storesRes = await getTrendingStores(country);
  const stores = storesRes.data;
  return (
    <div className="bg-card sticky top-0 min-h-12  text-card-foreground/90  px-2 md:px-4 lg:px-6">
      <div className="min-h-10 pt-1 md:max-w-[85%] lg:max-w-[80%] mx-auto flex items-center gap-1 text-sm font-semibold justify-between  ">
        <div className="flex gap-1.5 items-center ">
          <div className="md:hidden flex items-center">
            <MobileMenu lang={lang || "en"} country={country} />
          </div>
          <Link href={`${process.env.PROTOCOL}${process.env.DOMAIN}`}>
            <h1 className="flex items-center gap-2">
              <span className="font-bold text-lg">{process.env.APP}</span>

              {country && country != "en" && (
                <Image
                  src={`https://flagsapi.com/${country.toUpperCase()}/flat/64.png`}
                  alt={`${process.env.APP} ${country.toUpperCase()}`}
                  width={32}
                  height={32}
                />
              )}
            </h1>
          </Link>
        </div>

        <nav className="max-md:hidden flex gap-3 items-center justify-center">
          <Link href={`/`} className="flex items-center gap-1">
            <Home />
            {words.Home[lang]}
          </Link>

          <Separator orientation="vertical" />
          <TopBrandsDropDown stores={stores} />
          <Separator orientation="vertical" />

          <Link
            href={`${process.env.PROTOCOL}${process.env.DOMAIN}/stores`}
            className="flex items-center gap-1"
          >
            <Store />
            {words.Stores[lang]}
          </Link>

          {/* <Separator orientation="vertical" /> */}

          {/* <Link 
					href={`#`}
					className="flex items-center gap-1">
						<NotebookTabs /> Categories
					</Link> */}
        </nav>

        <div className="flex items-center gap-2 md:gap-3  ">
          {/* <AddDealPopup lang={lang} /> */}

          <NavbarSearch lang={lang} />

          {/* <ProfileWrapper lang={lang || "en"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
