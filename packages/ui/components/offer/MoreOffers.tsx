"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import OfferCard from "./OfferCard";
import CouponCard from "../coupon/CouponCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MoreOffers = ({
  store,
  params,
  type,
}: {
  store?: any;
  params: any;
  type: string;
}) => {
  const initialState = {
    offers: [],
    page: params.page || 3,
  };

  const [state, setState] = useState({ [params.tab]: initialState });

  const currentState = state[params.tab] || initialState;
  const { offers, page } = currentState;

  const firstNewOfferRef = useRef(null);
  const firstNewOfferIndex = useRef(null);

  const endpoint = type === "coupons" ? "coupon/getMany" : "offer/getMany";

  const {
    data: newOffers,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [type, params.tab, page],
    queryFn: async () => {
      // delete params.tab;
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_URL}/${endpoint}`,
        {
          params: {
            ...params,
            page,
          },
        },
      );
      return res.data;
    },
    enabled: false,
  });

  useEffect(() => {
    if (newOffers) {
      if (newOffers.length !== 0) {
        setState((prevState: any) => {
          const updatedOffers = [
            ...(prevState[params.tab]?.offers || []),
            ...newOffers,
          ];
          return {
            ...prevState,
            [params.tab]: {
              offers: updatedOffers,
              page: prevState[params.tab]?.page
                ? prevState[params.tab].page + 1
                : 2,
            },
          };
        });
        //@ts-ignore
        firstNewOfferIndex.current = offers.length || 0;
      }
    }
  }, [newOffers]);

  const handleClick = async () => {
    await refetch();
  };

  useEffect(() => {
    if (firstNewOfferIndex.current !== null) {
      const element = document.querySelector(
        `[data-index='${firstNewOfferIndex.current}']`,
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        firstNewOfferIndex.current = null;
      }
    }
  }, [offers]);

  return (
    <div>
      <div className="offers load-more space-y-4">
        {offers.map((offer: any, index) => (
          <div
            key={offer.id}
            data-index={index}
            ref={index === firstNewOfferIndex.current ? firstNewOfferRef : null}
          >
            {type === "coupons" ? (
              <CouponCard store={store ? store : offer.store} coupon={offer} />
            ) : (
              <OfferCard offer={offer} />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center items-center py-4">
        <Button
          variant="accent2"
          className="rounded-full px-4 text-sm min-w-64"
          onClick={handleClick}
          disabled={isFetching}
        >
          {isFetching ? "Loading..." : "Load More"}
        </Button>
      </div>
    </div>
  );
};

export default MoreOffers;
