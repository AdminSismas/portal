import Link from "next/link";
import { URL_ENVIRONMENTS } from "@/src/config/api_urls";

interface EnvironmentLink {
  env: URL_ENVIRONMENTS;
  label: string;
}

export default function NotFound() {
  const environmentLinks: EnvironmentLink[] = [
    {
      env: URL_ENVIRONMENTS.manizales,
      label: "Manizales",
    },
    {
      env: URL_ENVIRONMENTS.armenia,
      label: "Armenia",
    },
    {
      env: URL_ENVIRONMENTS.barrancabermeja,
      label: "Barrancabermeja",
    },
    {
      env: URL_ENVIRONMENTS.calarca,
      label: "Calarca",
    },
    {
      env: URL_ENVIRONMENTS.filandia,
      label: "Filandia",
    },
    {
      env: URL_ENVIRONMENTS.masora,
      label: "Masora",
    },
    {
      env: URL_ENVIRONMENTS.montenegro,
      label: "Montenegro",
    },
    {
      env: URL_ENVIRONMENTS.quimbaya,
      label: "Quimbaya",
    },
  ];
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-linear-to-b from-black to-white">
      <article className="bg-green-100 px-8 py-4 lg:px-16 lg:py-8 rounded-2xl border border-green-500 w-full max-w-3xl lg:max-w-4xl flex flex-col items-center gap-10 lg:gap-16">
        <header>
          <h1 className="text-3xl lg:text-5xl text-center text-red-500">
            Entorno invalido
          </h1>
        </header>
        <nav className="w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
          {environmentLinks.map((environment) => (
            <Link
              key={environment.env}
              className="w-full px-2 py-1 lg:px-4 lg:py-2 border border-green-600 bg-green-500 hover:bg-green-100 hover:text-black text-white rounded-md text-center cursor-pointer"
              href={`/${environment.env}`}
            >
              {environment.label}
            </Link>
          ))}
        </nav>
      </article>
    </div>
  );
}
