import { useCallback, useEffect, useRef, useState } from "react";
import { useCadastralSearchContext } from "./cadastral-search-context";

interface UseGeographicViewerProps {
  cadastralNumber: string;
  enabled?: boolean;
}

interface UseGeographicViewerReturn {
  isLoading: boolean;
  error: string | null;
  urlOpenData: string | null;
  reset: () => void;
}

export function useGeographicViewer({
  cadastralNumber,
  enabled = true,
}: UseGeographicViewerProps): UseGeographicViewerReturn {
  const { url } = useCadastralSearchContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlOpenData, setUrlOpenData] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchGeographicInfo = useCallback(async () => {
    if (!cadastralNumber || !enabled || hasFetched.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${url}/accessGeo/extentByCodigo/datosAbiertos/${cadastralNumber}`,
      );

      if (!response.ok) {
        throw new Error("No se pudo obtener la información geográfica.");
      }

      const data = await response.text();
      setUrlOpenData(data);
      hasFetched.current = true;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Error desconocido al obtener datos geográficos.";
      setError(message);
      console.error("Error en la solicitud geográfica:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cadastralNumber, url, enabled]);

  useEffect(() => {
    fetchGeographicInfo();
  }, [fetchGeographicInfo]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setUrlOpenData(null);
    hasFetched.current = false;
  }, []);

  return {
    isLoading,
    error,
    urlOpenData,
    reset,
  };
}
