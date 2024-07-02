"use client";

import React from "react";
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
  const plugin: any = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
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
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className=" rounded-md bg-foreground/10  mx-auto">
                    <div className="bg-card rounded-lg">
                      <CouponCard deal={deal} store={store} showImage={false} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          {/* slide - 2 */}
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center ">
                  <div className=" bg-foreground/10 rounded-md  h-full">
                    <DummyPopup deal={deal} image={image} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          {/* slide - 3 */}
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="rounded-lg bg-foreground/10  flex items-center justify-center">
                    <Image
                      src={applyImageUrl}
                      width={320}
                      height={320}
                      alt={words.ApplyCoupon[lang]}
                      className="rounded-md m-auto max-md:w-full mx-auto w-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
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
