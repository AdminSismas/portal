import { BuildMap } from "@/src/components/build-map/build-map";
import { isValidEnvironment } from "@/src/config/api_urls";
import { notFound } from "next/navigation";

export default async function BuildMapPage({
  params,
}: {
  params: Promise<{ env: string }>;
}) {
  const { env } = await params;

  if (!isValidEnvironment(env)) {
    return notFound();
  }

  return <BuildMap env={env} />;
}
