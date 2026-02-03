"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import { imagesSrc } from "./image-carousel.constant";

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
          {imagesSrc.map((image) => (
            <figure className="embla__slide" key={image.id}>
              <Image
                src={image.src}
                alt={image.label}
                width={1920}
                height={1080}
                className="w-full h-[480px] object-cover"
              />
              <figcaption
                className="absolute top-4 right-0 px-4 py-2 bg-green-500/80 text-white/90 font-bold"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 15% 100%, 0% 80%, 0% 80%)",
                }}
              >
                {image.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
