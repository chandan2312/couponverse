import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Crown } from "lucide-react";
import { Lang } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { correctPath } from "../../lib/utils";
import { words } from "../../constants/words";
import { Separator } from "../ui/separator";

const TopBrandsDropDown = ({ stores }: { stores: any }) => {
  const lang: Lang = (process.env.LG as Lang) || "en";
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;

  const cpath = correctPath(lang);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center gap-1">
            <Crown />
            {words.TopBrands[lang]}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className="m-2 grid grid-cols-4 lg:grid-cols-6">
            {stores?.length ? (
              stores?.map((store: any) => {
                return (
                  <DropdownMenuItem
                    key={store.id}
                    className="flex justify-center max-w-4xl mx-auto"
                  >
                    <Link
                      href={`/${cpath}/${store.slug}`}
                      className="p-1 flex flex-col items-center gap-1 "
                    >
                      <figure className="h-12 w-12 bg-card p-0.5 rounded-full border border-muted flex items-center justify-center">
                        <Image
                          src={
                            store.img
                              ? `${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`
                              : store.sourceImg
                          }
                          alt={store.nativeName || store.name}
                          width={45}
                          height={45}
                          className="rounded-full"
                        />
                      </figure>
                      <h5>{store.nativeName}</h5>
                    </Link>
                  </DropdownMenuItem>
                );
              })
            ) : (
              <div className="text-center">{words.NoStoresFound[lang]}</div>
            )}
          </div>
          <Separator orientation="horizontal" />

          <Link
            className="my-3 flex justify-center text-sm text-blue-600 font-semibold"
            href={`${process.env.PROTOCOL}${process.env.DOMAIN}/stores/all`}
          >
            {words.ViewAll[lang]}
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TopBrandsDropDown;
