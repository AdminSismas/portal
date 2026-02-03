import { ServiceCard } from "./service-card";

export function Services() {
  const services = [
    {
      title: "Consulta de búsqueda catastral avanzada",
      description:
        "Herramientas de búsqueda catastral avanzada para la gestión y administración de la información catastral.",
      image: "/images/consulta.png",
      alt: "Ilustración de búsqueda catastral",
      borders: {
        right: true,
      },
      buttonLabel: "Buscar",
      buttonLink: "/search",
    },
    {
      title: "Chat con IA",
      description:
        "Comunicación digital con chat impulsados por asistentes virtuales con inteligencia artificial.",
      image: "/images/chat_ia.png",
      alt: "Ilustración de comunicación",
      buttonLabel: "¡Hablemos!",
      buttonLink: "/chat",
    },
  ];

  return (
    <div className="my-4 py-10 md:py-24 lg:py-40">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col justify-center items-center gap-4 md:gap-8">
        <header className="text-center lg:max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold">Nuestros servicios</h2>
        </header>
        <div className="grid grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
