import { getStoreList } from "../actions/store";
import React from "react";
import { alphabets } from "../constants";
import { Button } from "../components/ui/button";
import { correctPath } from "../lib/utils";
import Link from "next/link";
import { words } from "../constants/words";
import { notFound, redirect } from "next/navigation";
import { Lang } from "../types";
import axios from "axios";
import Image from "next/image";

const StoreLetterListPage = async ({ letter }: { letter: string }) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;

  const storeListRes = await axios.get(
    `${process.env.NEXT_PUBLIC_BACK_URL}/store/getMany`,
    {
      params: { country, lang, letter: letter },
    },
  );
  const storeList = storeListRes.data;

  // if (!storeList?.length) {
  //   notFound();
  // }

  const ABCD = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-lg font-semibold my-4 p-3 bg-card">
        {words.AllStores[lang]}
      </h1>
      <div className="text-sm font-semibold my-4 p-3 grid grid-cols-6 md:grid-cols-12 bg-card">
        {ABCD.map((alphabet: string, index: any) => (
          <Link
            key={index}
            className="text-sm hover:text-blue-500 hover:font-semibold"
            href={`/stores/${alphabet.toLowerCase()}`}
          >
            {alphabet}
          </Link>
        ))}
      </div>

      {storeList?.length > 0 && (
        <div className="bg-card p-2 my-4 rounded-md shadow-md">
          <h2
            className="font-bold text-2xl p-2 border-b-2"
            id={`${letter.toLowerCase()}`}
          >
            {letter.toUpperCase()}
          </h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {storeList.map((store: any, index: any) => {
              const nativeNameObj = store.nativeName.find(
                (item: any) => item[lang] !== undefined,
              );
              const nativeNameValue = nativeNameObj ? nativeNameObj[lang] : "";

              return (
                <div className="flex items-center gap-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}${store.img}`}
                    alt={store.slug}
                    height={40}
                    width={40}
                    className={`rounded-full border border-muted/60`}
                  />

                  <Link
                    key={index}
                    className="text-sm hover:text-blue-500 hover:font-semibold"
                    href={`https://${process.env.NEXT_PUBLIC_DOMAIN}/kupon-kody/${store.slug}`}
                  >
                    {nativeNameValue}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreLetterListPage;
