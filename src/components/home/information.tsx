import Image from "next/image";

export function Information() {
  return (
    <article className="my-4 bg-gray-100 py-10 md:py-24 lg:py-40">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col justify-center items-center gap-4 md:gap-8">
        <div className="text-center lg:max-w-4xl mx-auto">
          <p className="text-gray-800 text-lg md:text-xl lg:text-2xl font-medium leading-relaxed">
            Facilitamos la interoperabilidad con plataformas, optimizando la
            gestión catastral y contribuyendo a la digitalización del sector
            público en Colombia.
          </p>
        </div>
        <Image
          src="/images/icon_api.png"
          alt="Ilustración de comunicación"
          width={1920}
          height={1080}
          className="max-w-full md:max-w-lg lg:max-w-xl"
        />
      </div>
    </article>
  );
}
