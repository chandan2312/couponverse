import Link from "next/link";
import React from "react";
import { Lang } from "../types";

const AboutUs = () => {
  const country = process.env.COUNTRYCODE as string;
  const lang: Lang = (process.env.LG as Lang) || "en";

  return (
    <div className=" grid grid-cols-12 p-4">
      <div className="bg-white col-span-12 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">About Us</h1>

        <div></div>
      </div>
    </div>
  );
};

export default AboutUs;
