"use client";

import { MapSelector } from "./components/map-selector";
import { URL_ENVIRONMENTS, getMapApiUrl } from "@/src/config/api_urls";
import { Suspense } from "react";

interface BuildMapProps {
  env: URL_ENVIRONMENTS;
}

function BuildMapContent({ baseUrl }: { baseUrl: string }) {
  return (
    <div className="w-full h-full">
      <MapSelector baseUrl={baseUrl} />
    </div>
  );
}

export function BuildMap({ env }: BuildMapProps) {
  const baseUrl = getMapApiUrl(env);

  return (
    <div className="flex flex-col gap-4 py-8 lg:py-16 px-4 lg:px-8 w-full max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Visualizador de Mapa
        </h1>
        <p className="text-muted-foreground">
          Seleccione un departamento y municipio para visualizar la información
          geográfica
        </p>
      </div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-[500px]">
            <p>Cargando...</p>
          </div>
        }
      >
        <BuildMapContent baseUrl={baseUrl} />
      </Suspense>
    </div>
  );
}
