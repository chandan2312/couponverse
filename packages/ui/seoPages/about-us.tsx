import Link from "next/link";
import React from "react";
import { Lang } from "../types";
import { aboutContent } from "../seoPages/constant";
import { words } from "../constants/words";

const AboutUs = async () => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE as string;
  const lang: Lang = (process.env.NEXT_PUBLIC_LG as Lang) || "en";
  const content = await aboutContent();

  return (
    <div className=" grid grid-cols-12 p-4">
      <div className="bg-white col-span-12 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{words.AboutUs[lang]}</h1>
        <div className="my-6">
          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default AboutUs;
