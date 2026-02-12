import { useCallback, useEffect, useState } from "react";
import { TableCadastralData } from "../interfaces/cadastral-search/table-cadastral-columns";

interface UseCadastralSearchProps {
  npn?: string;
  matricula?: string;
  page: number;
  size: number;
  baseUrl: string;
}

export function useCadastralSearch({
  matricula,
  npn,
  page,
  size,
  baseUrl,
}: UseCadastralSearchProps) {
  const [data, setData] = useState<TableCadastralData[]>([]);
  const [originalData, setOriginalData] = useState<TableCadastralData[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Store original API totals to restore after clearing filter
  const [apiTotalElements, setApiTotalElements] = useState(0);
  const [apiTotalPages, setApiTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlDetallada = `${baseUrl}/baunit/npnlike`;
  const urlMatricula = `${baseUrl}/baunit/attributes/matricula`;

  const fetchData = useCallback(async () => {
    if (!npn && !matricula) {
      setData([]);
      setOriginalData([]);
      setTotalElements(0);
      setTotalPages(0);
      setApiTotalElements(0);
      setApiTotalPages(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      let url = "";

      if (npn) {
        params.append("npnlike", npn);
        url = urlDetallada;
      } else if (matricula) {
        params.append("matricula", matricula);
        url = urlMatricula;
      }

      params.append("page", (page - 1).toString());
      params.append("size", size.toString());

      const urlWithParams = `${url}?${params.toString()}`;

      const response = await fetch(urlWithParams);
      if (!response.ok) {
        throw new Error(
          npn
            ? "Error al obtener datos detallados"
            : "Error al obtener datos por matrícula",
        );
      }

      const result = await response.json();
      const resultData = Array.isArray(result) ? result : result.content || [];
      const tElements = result.totalElements || resultData.length;
      const tPages =
        result.totalPages || Math.ceil(resultData.length / size) || 1;

      setData(resultData);
      setOriginalData(resultData);
      setTotalElements(tElements);
      setTotalPages(tPages);
      setApiTotalElements(tElements);
      setApiTotalPages(tPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setData([]);
      setOriginalData([]);
    } finally {
      setIsLoading(false);
    }
  }, [npn, matricula, page, size, urlDetallada, urlMatricula]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterCadastralData = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const filter = event.target.value.toLowerCase();
      if (!filter) {
        setData(originalData);
        setTotalElements(apiTotalElements);
        setTotalPages(apiTotalPages);
        return;
      }
      const filteredData = originalData.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(filter),
        ),
      );
      setData(filteredData);
      setTotalElements(filteredData.length);
      setTotalPages(Math.ceil(filteredData.length / size));
    },
    [originalData, size, apiTotalElements, apiTotalPages],
  );

  return {
    data,
    totalElements,
    totalPages,
    isLoading,
    error,
    filterCadastralData,
    refetch: fetchData,
  };
}
