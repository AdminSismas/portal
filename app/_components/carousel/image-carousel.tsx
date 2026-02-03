"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Fade from "embla-carousel-fade";

export function ImageCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false }), Fade()],
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="embla h-[480px] w-full">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <Image
              src="/images/manizales.png"
              alt="Manizales"
              width={1920}
              height={1080}
              className="w-full h-[480px] object-cover"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/images/armenia.png"
              alt="Armenia"
              width={1920}
              height={1080}
              className="w-full h-[480px] object-cover"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/images/barrancabermeja.png"
              alt="Barrancabermeja"
              width={1920}
              height={1080}
              className="w-full h-[480px] object-cover"
            />
          </div>
          <div className="embla__slide">
            <Image
              src="/images/san_vicente_ferrer.png"
              alt="San Vicente Ferrer"
              width={1920}
              height={1080}
              className="w-full h-[480px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
