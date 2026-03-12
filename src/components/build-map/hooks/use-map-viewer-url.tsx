"use client";

import { useMemo } from "react";
import { Departamento, Municipio } from "../interfaces/map-types";

interface UseMapViewerUrlProps {
  baseUrl: string;
  departamento: Departamento | null;
  municipio: Municipio | null;
}

interface UseMapViewerUrlReturn {
  url: string | null;
}

export function useMapViewerUrl({
  baseUrl,
  departamento,
  municipio,
}: UseMapViewerUrlProps): UseMapViewerUrlReturn {
  const url = useMemo(() => {
    if (!departamento || !municipio) {
      return null;
    }

    const lowerMunicipio = municipio.nombre.toLowerCase();
    const municipioCode = municipio.codigo.slice(2, 5);

    console.log(`${baseUrl}#/context/${lowerMunicipio}/${municipioCode}`);

    return `${baseUrl}#/context/${lowerMunicipio}/${municipioCode}`;
  }, [baseUrl, departamento, municipio]);

  return { url };
}
