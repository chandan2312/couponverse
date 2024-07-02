import React from "react";
import { disclaimerContent } from "./constant";
import { Lang } from "../types";
import { words } from "../constants/words";

const Disclaimer = async () => {
  const country = process.env.COUNTRYCODE as string;
  const lang: Lang = (process.env.LG as Lang) || "en";
  const content = await disclaimerContent();

  return (
    <div className=" grid grid-cols-12 p-4">
      <div className="bg-white col-span-12 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{words.Disclaimer[lang]}</h1>
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

export default Disclaimer;
