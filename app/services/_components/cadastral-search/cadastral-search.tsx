import { Suspense } from "react";
import { TableCadastralSearch } from "./table-cadastral-search";
import { HeaderCadastralSearch } from "./header-cadastral-search";
import { CadastralSearchProvider } from "../../hooks/cadastral-search-context";

function CadastralSearchFallback() {
  return (
    <div className="h-full w-full flex flex-col items-center px-24 lg:px-32">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Búsqueda catastral</h1>
        <article className="bg-white border border-slate-400 rounded-xl shadow shadow-slate-500 p-4 lg:p-8 w-full">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-slate-200 rounded w-full"></div>
            <div className="h-64 bg-slate-200 rounded w-full"></div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function CadastralSearch() {
  return (
    <Suspense fallback={<CadastralSearchFallback />}>
      <CadastralSearchProvider>
        <div className="h-full w-full flex flex-col items-center px-24 lg:px-32">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-4">Búsqueda catastral</h1>
            <article className="bg-white border border-slate-400 rounded-xl shadow shadow-slate-500 p-4 lg:p-8 w-full">
              <HeaderCadastralSearch />
              <TableCadastralSearch />
            </article>
          </div>
        </div>
      </CadastralSearchProvider>
    </Suspense>
  );
}
