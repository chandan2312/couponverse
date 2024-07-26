"use client";

import React, { useRef, useEffect } from "react";
import { Button } from "../ui/button";
import CouponCard from "./CouponCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoadedCoupons,
  setLoadedCouponsPage,
  setCouponButton,
} from "../../store/slices/coupons.slice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MoreCoupons = ({ store, slug }: { store: any; slug: string }) => {
  const country = process.env.NEXT_PUBLIC_COUNTRYCODE || "global";
  const lang = process.env.NEXT_PUBLIC_LG || "en";

  // Redux states
  const loadedCoupons = useSelector(
    (state: any) => state.coupons.loadedCoupons,
  );
  const page =
    useSelector((state: any) => state.coupons.loadedCouponsPage) || 2;
  const buttonVisible = useSelector((state: any) => state.coupons.btn);

  const firstNewCouponRef = useRef<HTMLDivElement>(null);
  const firstNewCouponIndex = useRef<number | null>(null);

  const dispatch = useDispatch();

  // Fetch coupons using useQuery
  const {
    data: newCoupons,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["coupons", slug, page],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/coupon/getMany`,
        {
          params: {
            shop: slug,
            country: country,
            orderby: "hotness_desc",
            lang: lang,
            page: page,
            perpage: 2,
          },
        },
      );

      return res.data;
    },
    enabled: false, // Don't fetch automatically
  });

  useEffect(() => {
    if (newCoupons) {
      if (newCoupons.length === 0) {
        dispatch(setCouponButton(false));
      }
      if (newCoupons.length !== 0) {
        dispatch(setLoadedCouponsPage(page + 1));
        dispatch(setLoadedCoupons([...loadedCoupons, ...newCoupons]));
        firstNewCouponIndex.current = loadedCoupons.length;
      }
    }
  }, [newCoupons, dispatch, loadedCoupons, page]);

  const handleClick = async () => {
    await refetch();
  };

  useEffect(() => {
    if (firstNewCouponIndex.current !== null) {
      const element = document.querySelector(
        `[data-index='${firstNewCouponIndex.current}']`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        firstNewCouponIndex.current = null;
      }
    }
  }, [loadedCoupons]);

  return (
    <div className="my-5">
      <div className="offers load-more space-y-4">
        {loadedCoupons?.map((coupon: any, index: number) => (
          <div
            key={coupon.id}
            data-index={index}
            ref={
              index === firstNewCouponIndex.current ? firstNewCouponRef : null
            }
          >
            <CouponCard coupon={coupon} store={store} />
          </div>
        ))}
      </div>
      {buttonVisible ? (
        <div className="w-full flex justify-center items-center py-4">
          <Button
            variant="accent2"
            className="rounded-full px-4 text-sm min-w-64"
            onClick={handleClick}
            disabled={isFetching || !buttonVisible}
          >
            {isFetching ? "Loading..." : "Load More"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MoreCoupons;
