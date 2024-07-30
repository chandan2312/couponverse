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
import VerticalCouponCard from "./VerticalCouponCard";
import Heading from "../custom/Heading";
import { Lang } from "../../types";

const TrendingCoupons = () => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE;
  const lang: Lang = process.env.NEXT_PUBLIC_LG as Lang;
  const [coupons, setCoupons] = useState([]);

  const newoffers = useQuery({
    queryKey: ["trending-coupons"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany`,
        {
          params: {
            country,
            lang,
            orderby: "hotness_desc",
            page: 1,
            perpage: 10,
            morefields: "store",
          },
        },
      );
      return res.data;
    },
  });

  const { data, refetch, isFetching } = newoffers;

  useEffect(() => {
    if (data) {
      setCoupons(data);
    }
  }, [data]);

  return (
    <>
      <Heading tag={"h3"} text={"Trending Coupons"} />
      <div className="w-full px-2 flex justify-center items-center">
        <Carousel className="w-full px-4">
          <CarouselContent className="">
            {coupons.map((coupon, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1 h-full">
                  <VerticalCouponCard coupon={coupon} />
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

export default TrendingCoupons;
