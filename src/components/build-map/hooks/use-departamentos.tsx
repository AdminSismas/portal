"use client";

import { useCallback, useEffect, useState } from "react";
import { Departamento } from "../interfaces/map-types";

interface UseDepartamentosProps {
  baseUrl: string;
}

interface UseDepartamentosReturn {
  departamentos: Departamento[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

const MOCK_DEPARTAMENTOS: Departamento[] = [
  { codigo: "05", nombre: "Antioquia" },
  { codigo: "15", nombre: "Boyacá" },
  { codigo: "17", nombre: "Caldas" },
  { codigo: "25", nombre: "Cundinamarca" },
  { codigo: "63", nombre: "Quindío" },
  { codigo: "66", nombre: "Risaralda" },
  { codigo: "68", nombre: "Santander" },
  { codigo: "73", nombre: "Tolima" },
];

export function useDepartamentos({
  baseUrl,
}: UseDepartamentosProps): UseDepartamentosReturn {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDepartamentos = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const USE_MOCK = true;

      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDepartamentos(MOCK_DEPARTAMENTOS);
        return;
      }

      const response = await fetch(`${baseUrl}/departamentos`);
      if (!response.ok) {
        throw new Error("Error al obtener departamentos");
      }
      const data = await response.json();
      setDepartamentos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setDepartamentos([]);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchDepartamentos();
  }, [fetchDepartamentos]);

  return {
    departamentos,
    isLoading,
    error,
    refetch: fetchDepartamentos,
  };
}
