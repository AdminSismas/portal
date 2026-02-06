import { useCallback, useEffect, useState } from "react";
import { TableCadastralData } from "../interfaces/table-cadastral-columns";

interface UseCadastralSearchProps {
  npn?: string;
  matricula?: string;
  page: number;
  size: number;
}

export function useCadastralSearch({
  matricula,
  npn,
  page,
  size,
}: UseCadastralSearchProps) {
  const [data, setData] = useState<TableCadastralData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlDetallada = "https://masora.api.sismas.com.co:5001/baunit/npnlike";
  const urlMatricula =
    "https://masora.api.sismas.com.co:5001/baunit/attributes/matricula";

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
      setData(Array.isArray(result) ? result : result.content || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [npn, page, size]);

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
      setData(Array.isArray(result) ? result : result.content || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }, [matricula, page, size]);

  useEffect(() => {
    if (npn) {
      fetchDataDetallada();
    } else if (matricula) {
      fetchDataMatricula();
    } else {
      setData([]);
    }
  }, [npn, matricula, fetchDataDetallada, fetchDataMatricula]);

  const filterCadastralData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filter = event.target.value;
    setData((data) =>
      data.filter((row) =>
        Object.values(row).some((value) =>
          value.toLowerCase().includes(filter.toLowerCase()),
        ),
      ),
    );
  };

  return {
    data,
    filterCadastralData,
    isLoading,
    error,
  };
}
