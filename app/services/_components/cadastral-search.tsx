import { TableCadastralSearch } from "./table-cadastral-search";
import { HeaderCadastralSearch } from "./header-cadastral-search";
import { CadastralSearchProvider } from "../hooks/cadastral-search-context";

export function CadastralSearch() {
  return (
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
  );
}
