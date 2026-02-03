import Image from "next/image";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  buttonLabel: string;
  buttonLink: string;
  borders?: BorderProps;
}

interface BorderProps {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

export function ServiceCard({
  title,
  description,
  image,
  alt,
  borders,
  buttonLabel,
  buttonLink,
}: ServiceCardProps) {
  const haveBorder = Object.values(borders || {}).some((value) => value);

  return (
    <article
      className={`text-slate-500 leading-relaxed px-4 md:px-8 ${haveBorder ? "border" : ""}`}
      style={{
        borderLeftColor: borders?.left ? "#ccc" : "transparent",
        borderRightColor: borders?.right ? "#ccc" : "transparent",
        borderTopColor: borders?.top ? "#ccc" : "transparent",
        borderBottomColor: borders?.bottom ? "#ccc" : "transparent",
      }}
    >
      <header className="flex flex-col justify-center items-center gap-4 md:gap-6 mb-2 md:mb-4">
        <Image src={image} alt={alt} width={75} height={75} />
        <h3 className="text-lg text-slate-700 font-semibold text-center">
          {title}
        </h3>
      </header>
      <p className="text-justify">{description}</p>
      <span className="flex justify-center mt-2 md:mt-4">
        <Link
          href={buttonLink}
          className="bg-green-500/50 text-white font-semibold px-4 py-2 rounded-md"
        >
          {buttonLabel}
        </Link>
      </span>
    </article>
  );
}
