"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CouponCard from "../coupon/CouponCard";
import DummyPopup from "../coupon/DummyPopup";
import Image from "next/image";
import { words } from "../../constants/words";
import { Lang } from "../../types";
import DummyCouponCard from "../coupon/DummyCouponCard";

const HowToUseSlider = ({
  deal,
  store,
  image,
  lang,
  applyImageUrl,
}: {
  deal: any;
  store: any;
  image: string;
  lang: Lang;
  applyImageUrl: string;
}) => {
  const plugin: any = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  );

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full">
          {/* slide - 1 */}
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6 rounded-md bg-foreground/10  mx-auto ">
                <DummyCouponCard
                  deal={deal}
                  store={store}
                  lang={lang}
                  showImage={false}
                />
              </CardContent>
            </Card>
          </CarouselItem>
          {/* slide - 2 */}
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center bg-foreground/10 rounded-md  h-full">
                <DummyPopup deal={deal} image={image} lang={lang} />
              </CardContent>
            </Card>
          </CarouselItem>
          {/* slide - 3 */}
          <CarouselItem>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6 rounded-lg bg-foreground/10  ">
                <Image
                  src={applyImageUrl}
                  width={320}
                  height={320}
                  alt={words.ApplyCoupon[lang]}
                  className="rounded-md m-auto max-md:w-full mx-auto w-auto"
                />
              </CardContent>
            </Card>
          </CarouselItem>
          {/* end */}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default HowToUseSlider;
