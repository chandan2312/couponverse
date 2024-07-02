import { getStoreList } from "../actions/store";
import React from "react";
import { alphabets } from "../constants";
import { Button } from "../components/ui/button";
import { correctPath } from "../lib/utils";
import Link from "next/link";
import { words } from "../constants/words";
import { notFound, redirect } from "next/navigation";
import { Lang } from "../types";

const StoreListPage = async () => {
  const country = process.env.COUNTRYCODE;
  const lang: Lang = (process.env.LG as Lang) || "en";

  const storeListRes = await getStoreList(country, 100000, 0);
  const storeList = storeListRes.data;

  if (!storeList.length) {
    notFound();
  }

  const cpath = correctPath(lang);

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
      <div className="text-sm font-semibold my-4 p-3 grid grid-cols-6 md:grid-cols-12  bg-card">
        {ABCD.map((alphabet: string, index: any) => {
          return (
            <Link
              key={index}
              className="text-sm hover:text-blue-500 hover:font-semibold"
              href={`#${alphabet.toLowerCase()}`}
            >
              {alphabet}
            </Link>
          );
        })}
      </div>
      {alphabets.map((alphabet) => {
        if (
          storeList.filter(
            (store: any) =>
              store.nativeName[0].toLowerCase() == alphabet.toLowerCase(),
          ).length > 0
        ) {
          return (
            <div
              className="bg-card p-2 my-4 rounded-md shadow-md"
              key={alphabet}
            >
              <h2
                className="font-bold text-2xl p-2 border-b-2"
                id={`${alphabet.toLowerCase()}`}
              >
                {alphabet}
              </h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {storeList.map((store: any, index: any) => {
                  if (
                    store.nativeName[0].toLowerCase() == alphabet.toLowerCase()
                  ) {
                    return (
                      <Link
                        key={index}
                        className="text-sm hover:text-blue-500 hover:font-semibold"
                        href={`${process.env.PROTOCOL}${process.env.DOMAIN}/${cpath}/${store.slug}`}
                      >
                        {store.nativeName}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default StoreListPage;
