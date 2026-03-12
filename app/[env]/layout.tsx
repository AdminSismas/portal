import { Header } from "@/src/components/shared/layout/header";
import { Footer } from "@/src/components/shared/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isValidEnvironment, URL_ENVIRONMENTS } from "@/src/config/api_urls";
import { notFound } from "next/navigation";
import { use } from "react";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ env: string }>;
}

const TitlePages: Record<URL_ENVIRONMENTS, string> = {
  [URL_ENVIRONMENTS.armenia]: "Armenia",
  [URL_ENVIRONMENTS.barrancabermeja]: "Barrancabermeja",
  [URL_ENVIRONMENTS.calarca]: "Calarca",
  [URL_ENVIRONMENTS.dev]: "Desarrollo",
  [URL_ENVIRONMENTS.filandia]: "Filandia",
  [URL_ENVIRONMENTS.manizales]: "Manizales",
  [URL_ENVIRONMENTS.masora]: "Antioquia",
  [URL_ENVIRONMENTS.montenegro]: "Montenegro",
  [URL_ENVIRONMENTS.quimbaya]: "Quimbaya",
  [URL_ENVIRONMENTS.quindio]: "Quindío",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ env: string }>;
}): Promise<Metadata> {
  const { env } = await params;

  if (!isValidEnvironment(env)) {
    return {
      title: "Portal Sismas",
    };
  }

  const currentEnv = env as URL_ENVIRONMENTS;

  return {
    title: `Portal Sismas ${TitlePages[currentEnv]}`,
  };
}

export default function EnvLayout({ children, params }: LayoutProps) {
  const { env } = use(params);

  if (!isValidEnvironment(env)) {
    return notFound();
  }

  const currentEnv: URL_ENVIRONMENTS = env as URL_ENVIRONMENTS;

  return (
    <div className="flex flex-col min-h-screen">
      <Header env={currentEnv} />
      <main className="flex-1" data-env={currentEnv}>
        <TooltipProvider>{children}</TooltipProvider>
      </main>
      <Footer />
    </div>
  );
}
