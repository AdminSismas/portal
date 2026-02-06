"use client";

import { Button } from "@/components/ui/button";
import { AdvanceCadastralSearchDialog } from "./advance-cadastral-search-dialog";
import { useCadastralSearchContext } from "../../hooks/cadastral-search-context";
import { NpnLike } from "../../interfaces/cadastral-search/npn-like";

export function HeaderCadastralSearch() {
  const { setNpn, setMatricula, setPage, setSize, filterCadastralData } =
    useCadastralSearchContext();

  const onSubmitDetallada = (detailData: NpnLike) => {
    console.log(detailData);
    const npn = Object.values(detailData).join("");
    setNpn(npn);
    setMatricula(""); // Limpiar matrícula cuando se busca por NPN
    setPage(0);
    setSize(10);
  };

  const onSubmitMatricula = (matriculaData: string) => {
    setMatricula(matriculaData);
    setNpn(""); // Limpiar NPN cuando se busca por matrícula
    setPage(0);
    setSize(10);
  };

  return (
    <header className="flex justify-between w-full">
      <AdvanceCadastralSearchDialog
        onSubmitDetallada={onSubmitDetallada}
        onSubmitMatricula={onSubmitMatricula}
      >
        <Button className="px-4 py-2 rounded-md text-green-500 bg-transparent border-0 flex gap-2 cursor-pointer hover:bg-green-500/10 hover:text-green-700 text-sm active:bg-green-400 active:text-white active:font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          Búsqueda avanzada
        </Button>
      </AdvanceCadastralSearchDialog>
      <section className="flex items-center border-b border-green-800/30 bg-slate-100 ">
        <input
          type="text"
          className="px-4 py-2  outline-0 bg-no-repeat bg-bottom bg-size-[0%_2px] transition-[background-size] duration-300 focus-visible:bg-size-[100%_2px] bg-linear-to-r from-green-800 to-green-800"
          placeholder="Filtrar"
          onChange={filterCadastralData}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="icon icon-tabler icons-tabler-filled icon-tabler-filter mr-2 text-green-800"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M20 3h-16a1 1 0 0 0 -1 1v2.227l.008 .223a3 3 0 0 0 .772 1.795l4.22 4.641v8.114a1 1 0 0 0 1.316 .949l6 -2l.108 -.043a1 1 0 0 0 .576 -.906v-6.586l4.121 -4.12a3 3 0 0 0 .879 -2.123v-2.171a1 1 0 0 0 -1 -1z" />
        </svg>
      </section>
    </header>
  );
}
