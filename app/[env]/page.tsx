import { use } from "react";
import { HomePage } from "../../src/components/home/home-page";
import { URL_ENVIRONMENTS } from "@/src/config/api_urls";

export default function Home({ params }: { params: Promise<{ env: string }> }) {
  const { env } = use(params) as { env: keyof typeof URL_ENVIRONMENTS };
  return <HomePage env={env} />;
}
