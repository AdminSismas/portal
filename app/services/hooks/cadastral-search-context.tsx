"use client";
import { createContext, useContext, useState } from "react";
import { TableCadastralData } from "../interfaces/cadastral-search/table-cadastral-columns";
import { useSearchParams } from "next/navigation";
import { URL_OBJECT } from "../constants/cadastral-search/urls.constant";
import { useCadastralPagination } from "./useCadastralPagination";
import { useCadastralSearch } from "./useCadastralSearch";
import { useResponsivePages } from "./useResponsivePages";

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

export function CadastralSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [npn, setNpn] = useState("");
  const [matricula, setMatricula] = useState("");
  const { page, size, setPage, setSize } = useCadastralPagination();
  const maxVisiblePages = useResponsivePages();

  const params = useSearchParams();
  const environment = params.get("environment") as keyof typeof URL_OBJECT;
  const url = URL_OBJECT[environment] || URL_OBJECT.dev;

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
