import Link from "next/link";
import { URL_ENVIRONMENTS } from "@/src/config/api_urls";

interface EnvironmentLink {
  env: URL_ENVIRONMENTS;
  label: string;
  description: string;
}

export default function NotFound() {
  const environmentLinks: EnvironmentLink[] = [
    {
      env: URL_ENVIRONMENTS.manizales,
      label: "Manizales",
      description:
        "Ingresa al portal de Sismas con la información de Manizales",
    },
    {
      env: URL_ENVIRONMENTS.armenia,
      label: "Armenia",
      description: "Ingresa al portal de Sismas con la información de Armenia",
    },
    {
      env: URL_ENVIRONMENTS.barrancabermeja,
      label: "Barrancabermeja",
      description:
        "Ingresa al portal de Sismas con la información de Barrancabermeja",
    },
    {
      env: URL_ENVIRONMENTS.calarca,
      label: "Calarca",
      description: "Ingresa al portal de Sismas con la información de Calarca",
    },
    {
      env: URL_ENVIRONMENTS.filandia,
      label: "Filandia",
      description: "Ingresa al portal de Sismas con la información de Filandia",
    },
    {
      env: URL_ENVIRONMENTS.masora,
      label: "Masora",
      description: "Ingresa al portal de Sismas con la información de Masora",
    },
    {
      env: URL_ENVIRONMENTS.montenegro,
      label: "Montenegro",
      description:
        "Ingresa al portal de Sismas con la información de Montenegro",
    },
    {
      env: URL_ENVIRONMENTS.quimbaya,
      label: "Quimbaya",
      description: "Ingresa al portal de Sismas con la información de Quimbaya",
    },
  ];
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <main className="flex flex-col flex-1 items-center justify-center px-6 py-12">
        {/* <!-- Hero Section --> */}
        <div className="max-w-3xl w-full text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-green-500/5 text-green-500 border border-green-500/10 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="icon icon-tabler icons-tabler-filled icon-tabler-alert-square-rounded"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2l.642 .005l.616 .017l.299 .013l.579 .034l.553 .046c4.687 .455 6.65 2.333 7.166 6.906l.03 .29l.046 .553l.041 .727l.006 .15l.017 .617l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.455 4.687 -2.333 6.65 -6.906 7.166l-.29 .03l-.553 .046l-.727 .041l-.15 .006l-.617 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.687 -.455 -6.65 -2.333 -7.166 -6.906l-.03 -.29l-.046 -.553l-.041 -.727l-.006 -.15l-.017 -.617l-.004 -.318v-.648l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.455 -4.687 2.333 -6.65 6.906 -7.166l.29 -.03l.553 -.046l.727 -.041l.15 -.006l.617 -.017c.21 -.003 .424 -.005 .642 -.005zm.01 13l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -8a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            Entorno no Definido
          </h1>
        </div>
        {/* <!-- Action Cards Grid --> */}
        <div className="max-w-6xl w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {environmentLinks.map((environment) => (
            <article
              key={environment.env}
              className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-primary/50 transition-all group flex flex-col"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {environment.label}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 ">
                {environment.description}
              </p>
              <Link
                className="w-full bg-green-500 hover:bg-green-500/30 text-white hover:text-primary font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                href={environment.env}
              >
                <span>{environment.label}</span>
              </Link>
            </article>
          ))}
        </div>
      </main>
      {/* <!-- Footer --> */}
      <footer className="w-full py-10 px-6 flex flex-col items-center border-t border-slate-200 dark:border-slate-800/50 bg-white dark:bg-background-dark">
        <div className="flex flex-col items-center gap-1">
          <p className="text-slate-400 text-sm font-medium">
            Sismas © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
