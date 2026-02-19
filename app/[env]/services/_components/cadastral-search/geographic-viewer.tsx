interface GeographicViewerProps {
  isLoading: boolean;
  error: string | null;
  urlOpenData: string | null;
}

export function GeographicViewer({
  isLoading,
  error,
  urlOpenData,
}: GeographicViewerProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 h-full w-full">
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando información geográfica...
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200 w-full">
          <p>
            <strong className="text-white bg-red-500 px-2 py-1 rounded-sm">
              Error:
            </strong>{" "}
            No se pudo obtener la información geográfica.
          </p>
        </div>
      )}

      {!isLoading && !error && urlOpenData && (
        <iframe src={urlOpenData} className="w-full h-full"></iframe>
      )}

      {!isLoading && !error && !urlOpenData && (
        <p className="text-sm text-muted-foreground">
          No se encontró información geográfica para este predio.
        </p>
      )}
    </div>
  );
}
