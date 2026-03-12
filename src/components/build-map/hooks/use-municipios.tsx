"use client";

import { useCallback, useEffect, useState } from "react";
import { Departamento, Municipio } from "../interfaces/map-types";

interface UseMunicipiosProps {
  baseUrl: string;
  departamento: Departamento | null;
}

interface UseMunicipiosReturn {
  municipios: Municipio[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const MOCK_MUNICIPIOS: Record<string, Municipio[]> = {
  "05": [
    { codigo: "05001", nombre: "Medellín", codigoDepartamento: "05" },
    { codigo: "05002", nombre: "Bello", codigoDepartamento: "05" },
    { codigo: "05004", nombre: "Itagüí", codigoDepartamento: "05" },
    { codigo: "05036", nombre: "Envigado", codigoDepartamento: "05" },
    { codigo: "05088", nombre: "Rionegro", codigoDepartamento: "05" },
  ],
  "15": [
    { codigo: "15001", nombre: "Tunja", codigoDepartamento: "15" },
    { codigo: "15022", nombre: "Duitama", codigoDepartamento: "15" },
    { codigo: "15047", nombre: "Sogamoso", codigoDepartamento: "15" },
  ],
  "17": [
    { codigo: "17001", nombre: "Manizales", codigoDepartamento: "17" },
    { codigo: "17013", nombre: "Chinchiná", codigoDepartamento: "17" },
    { codigo: "17042", nombre: "La Dorada", codigoDepartamento: "17" },
    { codigo: "17174", nombre: "Villamaría", codigoDepartamento: "17" },
  ],
  "25": [
    { codigo: "25001", nombre: "Bogotá D.C.", codigoDepartamento: "25" },
    { codigo: "25001", nombre: "Cota", codigoDepartamento: "25" },
    { codigo: "25099", nombre: "Funza", codigoDepartamento: "25" },
    { codigo: "25175", nombre: "Mosquera", codigoDepartamento: "25" },
    { codigo: "25473", nombre: "Zipaquirá", codigoDepartamento: "25" },
  ],
  "63": [
    { codigo: "63001", nombre: "Armenia", codigoDepartamento: "63" },
    { codigo: "63111", nombre: "Calarcá", codigoDepartamento: "63" },
    { codigo: "63130", nombre: "Circasia", codigoDepartamento: "63" },
    { codigo: "63212", nombre: "Filandia", codigoDepartamento: "63" },
    { codigo: "63272", nombre: "Montenegro", codigoDepartamento: "63" },
    { codigo: "63401", nombre: "Quimbaya", codigoDepartamento: "63" },
  ],
  "66": [
    { codigo: "66001", nombre: "Pereira", codigoDepartamento: "66" },
    { codigo: "66045", nombre: "Dosquebradas", codigoDepartamento: "66" },
    { codigo: "66088", nombre: "La Virginia", codigoDepartamento: "66" },
  ],
  "68": [
    { codigo: "68001", nombre: "Bucaramanga", codigoDepartamento: "68" },
    { codigo: "68013", nombre: "Barrancabermeja", codigoDepartamento: "68" },
    { codigo: "68020", nombre: "Floridablanca", codigoDepartamento: "68" },
    { codigo: "68077", nombre: "Girón", codigoDepartamento: "68" },
    { codigo: "68081", nombre: "Piedecuesta", codigoDepartamento: "68" },
  ],
  "73": [
    { codigo: "73001", nombre: "Ibagué", codigoDepartamento: "73" },
    { codigo: "73124", nombre: "Espinal", codigoDepartamento: "73" },
    { codigo: "73268", nombre: "Honda", codigoDepartamento: "73" },
  ],
};

export function useMunicipios({
  baseUrl,
  departamento,
}: UseMunicipiosProps): UseMunicipiosReturn {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMunicipios = useCallback(async () => {
    if (!departamento) {
      setMunicipios([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const USE_MOCK = true;

      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const mockData = MOCK_MUNICIPIOS[departamento.codigo] || [];
        setMunicipios(mockData);
        return;
      }

      const params = new URLSearchParams();
      params.append("codigoDane", departamento.codigo);
      const response = await fetch(
        `${baseUrl}/municipios?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Error al obtener municipios");
      }

      const data = await response.json();
      setMunicipios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setMunicipios([]);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl, departamento]);

  useEffect(() => {
    fetchMunicipios();
  }, [fetchMunicipios]);

  return {
    municipios,
    isLoading,
    error,
    refetch: fetchMunicipios,
  };
}
