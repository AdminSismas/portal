import { URL_ENVIRONMENTS } from "@/src/config/api_urls";
import { Banner } from "./banner";
import { Information } from "./information";
import { Services } from "./services";

export function HomePage({ env }: { env: keyof typeof URL_ENVIRONMENTS }) {
  return (
    <>
      <Banner env={env} />
      <Information />
      <Services env={env} />
    </>
  );
}
