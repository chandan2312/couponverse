import React from "react";
import { getSearch } from "../actions/other";
import Image from "next/image";
import Link from "next/link";
import { correctPath } from "../lib/utils";
import { Lang } from "../types";

const SearchPage = async ({ params }: { params: any }) => {
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const term = params.term;

  const cpath = correctPath(lang);

  if (!term) {
    return (
      <div className="bg-background p-3 rounded-md my-3">
        <h2 className="font-semibold text-2xl">No Search Term Provided</h2>
      </div>
    );
  }

  if (term?.length < 3) {
    return (
      <div className="bg-background p-3 rounded-md my-3">
        <h2 className="font-semibold text-2xl">
          Search term must be at least 3 characters
        </h2>
      </div>
    );
  }

  const searchResultRes = await getSearch(term, lang);

  const searchResult = searchResultRes?.data;

  if (searchResult?.length === 0) {
    return (
      <div className="bg-background p-3 rounded-md my-3">
        <h2 className="font-semibold text-2xl">No Result Found for {term}</h2>
      </div>
    );
  }

  return (
    <>
      <div className="bg-background p-3 rounded-md my-3">
        <h2 className="font-semibold text-2xl">Search Result for {term}</h2>
      </div>

      <div className="bg-background p-3 rounded-md my-3">
        {searchResult?.length > 0 &&
          searchResult?.map((result: any, index: any) => {
            return (
              <div key={index} className=" rounded-md ">
                <Link
                  href={`/${cpath}/${result.slug}`}
                  className="flex items-center gap-2"
                >
                  <figure>
                    <Image
                      src={result?.img || ""}
                      alt={result?.name}
                      width={50}
                      height={50}
                      className="rounded-full shadow-md"
                    />
                  </figure>
                  <h4 className="font-semibold">{result.name}</h4>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchPage;
