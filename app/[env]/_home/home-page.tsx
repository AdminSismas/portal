import { URL_ENVIRONMENTS } from "@/src/config/api_urls";
import { Banner } from "./components/banner";
import { Information } from "./components/information";
import { Services } from "./components/services";

export function HomePage({ env }: { env: keyof typeof URL_ENVIRONMENTS }) {
  return (
    <>
      <Banner />
      <Information />
      <Services env={env} />
    </>
  );
}
