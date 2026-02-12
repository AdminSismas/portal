"use client";
import { createContext, use, useContext, useState } from "react";
import { TableCadastralData } from "../interfaces/cadastral-search/table-cadastral-columns";
import { useCadastralPagination } from "./useCadastralPagination";
import { useCadastralSearch } from "./useCadastralSearch";
import { useResponsivePages } from "./useResponsivePages";
import { API_URLS, URL_ENVIRONMENTS } from "@/src/config/api_urls";

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
  maxVisiblePages: number;
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

interface CadastralSearchProviderProps {
  children: React.ReactNode;
  params: Promise<{ env: string }>;
}

export function CadastralSearchProvider({
  children,
  params,
}: CadastralSearchProviderProps) {
  const [npn, setNpn] = useState("");
  const [matricula, setMatricula] = useState("");
  const { page, size, setPage, setSize } = useCadastralPagination();
  const maxVisiblePages = useResponsivePages();

  const { env } = use(params) as { env: URL_ENVIRONMENTS };
  const url = API_URLS[env] || API_URLS.dev;

  const {
    data: searchContent,
    isLoading,
    error,
    totalElements,
    totalPages,
    filterCadastralData,
    refetch,
  } = useCadastralSearch({
    npn,
    matricula,
    page,
    size,
    baseUrl: url,
  });

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
    maxVisiblePages,
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
