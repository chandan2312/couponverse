"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import OfferCard from "./OfferCard";
import VerticalOfferCard from "./VerticalOfferCard";
import Heading from "../custom/Heading";
import { Lang } from "../../types";

const TrendingOffers = () => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const [offers, setOffers] = useState([]);

  const newoffers = useQuery({
    queryKey: [
      "offers",
      { country, lang, orderby: "hotness_desc", page: 1, perpage: 10 },
    ],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/offer/getMany`,
        {
          params: {
            country,
            lang,
            orderby: "hotness_desc",
            page: 1,
            perpage: 10,
          },
        },
      );
      return res.data;
    },
  });

  const { data, refetch, isFetching } = newoffers;

  useEffect(() => {
    if (data) {
      setOffers(data);
    }
  }, [data]);

  return (
    <>
      <Heading tag={"h3"} text={"Trending Coupons"} />
      <div className="w-full px-2 flex justify-center items-center">
        <Carousel className="w-full px-4 ">
          <CarouselContent className="">
            {offers.map((offer, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <VerticalOfferCard offer={offer} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="mr-0" />
          <CarouselNext className="ml-0" />
        </Carousel>
      </div>
    </>
  );
};

export default TrendingOffers;
