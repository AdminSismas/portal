import { ImageCarousel } from "@/app/_components/carousel/image-carousel";

export function Banner() {
  return (
    <>
      <div className="relative w-full h-[480px]">
        <section className="absolute inset-0 flex items-center justify-start text-start z-10">
          <div className="max-w-3xl px-6">
            <h1 className="text-white font-bold uppercase text-2xl md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl leading-[1.1] mb-4">
              Gestiona tus trámites catastrales
            </h1>
            <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl 3xl:text-2xl leading-[1.7] mb-4">
              Nuestra plataforma te permite la administración, actualización y
              consulta de información catastral en Colombia.
            </p>
            <a
              className="uppercase text-white float-left bg-green-400 py-1 md:py-3 3xl:py-5 px-2 md:px-5 3xl:px-6 inline-block font-black text-xs md:text-sm lg:text-xl 3xl:text-2xl transition-all hover:bg-white hover:text-green-500 hover:font-bold"
              style={{
                clipPath: "polygon(0 100%, 0 0, 100% 0, 100% 75%, 90% 100%)",
              }}
              href="/services"
            >
              Consulta ahora
            </a>
          </div>
        </section>
        <ImageCarousel />
      </div>
    </>
  );
}
