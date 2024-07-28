"use client";

import React, { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "../../constants";
import { Lang, SideNavItem } from "../../types";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { words } from "../../constants/words";

const SideNav = ({ lang, country }: { lang: Lang; country: string }) => {
  return (
    <div className="w-full  h-screen flex-1 text-primary   flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="mx-auto flex gap-1.5 space-x-3 items-center   md:px-6 border-b  h-12 w-full"
        >
          <h1 className="flex items-center gap-2">
            <span className="font-bold text-lg">
              {process.env.NEXT_PUBLIC_APP}
            </span>

            {country && country != "en" && (
              <Image
                src={`https://flagsapi.com/${country.toUpperCase()}/flat/64.png`}
                alt={`${process.env.NEXT_PUBLIC_APP} ${country.toUpperCase()}`}
                width={32}
                height={32}
              />
            )}
          </h1>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS?.map((item: any, idx: number) => {
            return <MenuItem key={idx} item={item} lang={lang} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

export const MenuItem = ({ item, lang }: { item: SideNavItem; lang: Lang }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between  hover:bg-zinc-100 ${
              pathname?.includes(item.path) && " text-accent"
            }
						}`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold   flex">
                {words[item.title as keyof typeof words][lang]}
              </span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${subItem.path === pathname && " text-accent"}`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : item.onClick ? (
        // TODO: Implement onClick for signout & signin
        <div
          onClick={item.onClick}
          className={`flex flex-row cursor-pointer space-x-4 items-center p-2 rounded-lg ${
            item.path === pathname && " text-accent"
          }`}
        >
          {item.icon}
          <span className="font-semibold flex">
            {words[item.title as keyof typeof words][lang]}
          </span>
        </div>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg ${
            item.path === pathname && " text-accent"
          }`}
        >
          {item.icon}
          <span className="font-semibold flex">
            {words[item.title as keyof typeof words][lang]}
          </span>
        </Link>
      )}
    </div>
  );
};
