"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TableCadastralData } from "../interfaces/cadastral-search/table-cadastral-columns";
import { useSearchParams } from "next/navigation";
import { URL_OBJECT } from "../constants/cadastral-search/urls.constant";
import { useCadastralPagination } from "./useCadastralPagination";

interface CadastralSearchContextType {
  searchContent: TableCadastralData[];
  isLoading: boolean;
  error: string | null;
  npn: string;
  matricula: string;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  url: string;
  setNpn: (npn: string) => void;
  setMatricula: (matricula: string) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  filterCadastralData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refetch: () => void;
}

const CadastralSearchContext = createContext<CadastralSearchContextType | null>(
  null,
);
export function useCadastralSearchContext() {
  const context = useContext(CadastralSearchContext);
  if (!context) {
    throw new Error(
      "useCadastralSearchContext debe usarse dentro de un CadastralSearchProvider",
    );
  }
  return context;
}

export function CadastralSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [npn, setNpn] = useState("");
  const [matricula, setMatricula] = useState("");
  const { page, size, setPage, setSize } = useCadastralPagination();
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchContent, setSearchContent] = useState<TableCadastralData[]>([]);
  const [originalData, setOriginalData] = useState<TableCadastralData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useSearchParams();

  const environment = params.get("environment") as keyof typeof URL_OBJECT;
  const url = URL_OBJECT[environment] || URL_OBJECT.dev;

  const urlDetallada = `${url}/baunit/npnlike`;
  const urlMatricula = `${url}/baunit/attributes/matricula`;

  const fetchDataDetallada = useCallback(async () => {
    if (!npn) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append("npnlike", npn);
      params.append("page", (page - 1).toString());
      params.append("size", size.toString());

      const urlWithParams = `${urlDetallada}?${params.toString()}`;

      const response = await fetch(urlWithParams);
      if (!response.ok) throw new Error("Error al obtener datos detallados");

      const result = await response.json();
      const resultData = Array.isArray(result) ? result : result.content || [];
      setSearchContent(resultData);
      setOriginalData(resultData);
      setTotalElements(result.totalElements);
      setTotalPages(result.totalPages);
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
      params.append("page", (page - 1).toString());
      params.append("size", size.toString());

      const urlWithParams = `${urlMatricula}?${params.toString()}`;

      const response = await fetch(urlWithParams);
      if (!response.ok) throw new Error("Error al obtener datos por matrícula");

      const result = await response.json();
      const resultData = Array.isArray(result) ? result : result.content || [];
      setSearchContent(resultData);
      setOriginalData(resultData);
      setTotalElements(result.totalElements);
      setTotalPages(result.totalPages);
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
      setSearchContent([]);
      setOriginalData([]);
      setTotalElements(0);
      setTotalPages(0);
    }
  }, [npn, matricula, fetchDataDetallada, fetchDataMatricula]);

  // Filtrar datos localmente
  const filterCadastralData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const filter = event.target.value.toLowerCase();
      if (!filter) {
        setSearchContent(originalData);
        return;
      }
      setSearchContent(
        originalData.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(filter),
          ),
        ),
      );
      setTotalElements(searchContent.length);
      setTotalPages(Math.ceil(searchContent.length / size));
    },
    [originalData, size, searchContent.length],
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
    searchContent,
    isLoading,
    error,
    npn,
    matricula,
    page,
    size,
    totalElements,
    totalPages,
    url,
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
