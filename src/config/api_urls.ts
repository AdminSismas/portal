export enum URL_ENVIRONMENTS {
  armenia = "armenia", // No se usa
  barrancabermeja = "barrancabermeja",
  calarca = "calarca", // No se usa
  dev = "dev", // No se usa
  filandia = "filandia",
  manizales = "manizales",
  masora = "masora",
  montenegro = "montenegro",
  quimbaya = "quimbaya",
  quindio = "quindio",
}

export const API_URLS: Record<URL_ENVIRONMENTS, string> = {
  [URL_ENVIRONMENTS.armenia]: "https://armenia.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.barrancabermeja]:
    "https://barrancabermeja.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.calarca]: "https://dev.api.sismas.com.co:5002",
  [URL_ENVIRONMENTS.dev]: "https://dev.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.filandia]: "https://quindio.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.manizales]: "https://manizales.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.masora]: "https://masora.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.montenegro]: "https://quindio.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.quimbaya]: "https://quindio.api.sismas.com.co:5001",
  [URL_ENVIRONMENTS.quindio]: "https://quindio.api.sismas.com.co:5001",
};

export const MAP_API_URLS: Record<URL_ENVIRONMENTS, string> = {
  [URL_ENVIRONMENTS.armenia]: "",
  [URL_ENVIRONMENTS.barrancabermeja]:
    "https://country.geo.sismas.com.co:8081/mapstore/#/context/barrancabermeja/897",
  [URL_ENVIRONMENTS.calarca]: "",
  [URL_ENVIRONMENTS.dev]: "",
  [URL_ENVIRONMENTS.filandia]:
    "https://country.geo.sismas.com.co:8081/mapstore/#/context/filandia/796",
  [URL_ENVIRONMENTS.manizales]: "",
  [URL_ENVIRONMENTS.masora]: "",
  [URL_ENVIRONMENTS.montenegro]:
    "https://country.geo.sismas.com.co:8081/mapstore/#/context/montenegro/256",
  [URL_ENVIRONMENTS.quimbaya]:
    "https://country.geo.sismas.com.co:8081/mapstore/#/context/quimbaya/263",
  [URL_ENVIRONMENTS.quindio]: "",
};

const invalidEnvironments = [
  URL_ENVIRONMENTS.armenia,
  URL_ENVIRONMENTS.calarca,
  ...(process.env.NODE_ENV === "production" ? [URL_ENVIRONMENTS.dev] : []),
];

export function isValidEnvironment(env: string): env is URL_ENVIRONMENTS {
  return (
    env in URL_ENVIRONMENTS &&
    !invalidEnvironments.includes(env as URL_ENVIRONMENTS)
  );
}

export function getApiUrl(env: string): string {
  if (!isValidEnvironment(env)) {
    throw new Error(`Invalid environment: ${env}`);
  }
  return API_URLS[env];
}

export function getMapApiUrl(env: URL_ENVIRONMENTS): string {
  return MAP_API_URLS[env];
}
