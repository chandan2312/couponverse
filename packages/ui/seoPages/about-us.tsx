import Link from "next/link";
import React from "react";

const AboutUs = () => {
  const country = process.env.COUNTRYCODE as string;
  const lang = process.env.LG as string;

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
