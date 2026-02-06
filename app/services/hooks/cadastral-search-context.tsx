"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TableCadastralData } from "../interfaces/table-cadastral-columns";
import { useSearchParams } from "next/navigation";
import { URL_OBJECT } from "../constants/urls";

// Definir la forma del contexto
interface CadastralSearchContextType {
  // Data y estado
  data: TableCadastralData[];
  isLoading: boolean;
  error: string | null;

  // Parámetros de búsqueda
  npn: string;
  matricula: string;
  page: number;
  size: number;

  // Acciones
  setNpn: (npn: string) => void;
  setMatricula: (matricula: string) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  filterCadastralData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
}

// Crear el contexto con valor por defecto
const CadastralSearchContext = createContext<CadastralSearchContextType | null>(
  null,
);

// Hook para consumir el contexto
export function useCadastralSearchContext() {
  const context = useContext(CadastralSearchContext);
  if (!context) {
    throw new Error(
      "useCadastralSearchContext debe usarse dentro de un CadastralSearchProvider",
    );
  }
  return context;
}

// Provider que maneja toda la lógica de búsqueda
export function CadastralSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado de búsqueda
  const [npn, setNpn] = useState("");
  const [matricula, setMatricula] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // Estado de datos
  const [data, setData] = useState<TableCadastralData[]>([]);
  const [originalData, setOriginalData] = useState<TableCadastralData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useSearchParams();

  const environment = params.get("environment") as keyof typeof URL_OBJECT;
  const url = URL_OBJECT[environment] ?? URL_OBJECT.dev;

  const urlDetallada = `${url}/baunit/npnlike`;
  const urlMatricula = `${url}/baunit/attributes/matricula`;

  const fetchDataDetallada = useCallback(async () => {
    if (!npn) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("npnlike", npn);
      params.append("page", page.toString());
      params.append("size", size.toString());

      const urlWithParams = `${urlDetallada}?${params.toString()}`;

      const response = await fetch(urlWithParams);
      if (!response.ok) throw new Error("Error al obtener datos detallados");

      const result = await response.json();
      const resultData = Array.isArray(result) ? result : result.content || [];
      setData(resultData);
      setOriginalData(resultData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [npn, page, size, urlDetallada]);

  const fetchDataMatricula = useCallback(async () => {
    if (!matricula) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("matricula", matricula);
      params.append("page", page.toString());
      params.append("size", size.toString());

      const urlWithParams = `${urlMatricula}?${params.toString()}`;

      const response = await fetch(urlWithParams);
      if (!response.ok) throw new Error("Error al obtener datos por matrícula");

      const result = await response.json();
      const resultData = Array.isArray(result) ? result : result.content || [];
      setData(resultData);
      setOriginalData(resultData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [matricula, page, size, urlMatricula]);

  // Ejecutar búsqueda cuando cambian los parámetros
  useEffect(() => {
    if (npn) {
      fetchDataDetallada();
    } else if (matricula) {
      fetchDataMatricula();
    } else {
      setData([]);
      setOriginalData([]);
    }
  }, [npn, matricula, fetchDataDetallada, fetchDataMatricula]);

  // Filtrar datos localmente
  const filterCadastralData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const filter = event.target.value.toLowerCase();
      if (!filter) {
        setData(originalData);
        return;
      }
      setData(
        originalData.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filter),
          ),
        ),
      );
    },
    [originalData],
  );

  // Función para refetch manual
  const refetch = useCallback(() => {
    if (npn) {
      fetchDataDetallada();
    } else if (matricula) {
      fetchDataMatricula();
    }
  }, [npn, matricula, fetchDataDetallada, fetchDataMatricula]);

  const value: CadastralSearchContextType = {
    data,
    isLoading,
    error,
    npn,
    matricula,
    page,
    size,
    setNpn,
    setMatricula,
    setPage,
    setSize,
    filterCadastralData,
    refetch,
  };

  return (
    <CadastralSearchContext.Provider value={value}>
      {children}
    </CadastralSearchContext.Provider>
  );
}
