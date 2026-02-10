"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { TABLE_CADASTRAL_COLUMNS } from "../../constants/cadastral-search/table-cadastral-search.constant";
import { CadastralDetail } from "./cadastral-detail";
import { useCadastralSearchContext } from "../../hooks/cadastral-search-context";
import { TableCadastralData } from "../../interfaces/cadastral-search/table-cadastral-columns";
import { TableCadastralPagination } from "./table-cadastral-pagination";

export function TableCadastralSearch() {
  const {
    searchContent,
    isLoading,
    error,
    totalPages,
    totalElements,
    maxVisiblePages,
  } = useCadastralSearchContext();

  const textCenter = (property: keyof TableCadastralData) => {
    if (
      property === "cadastralAreaE" ||
      property === "propertyRegistryNumber"
    ) {
      return "text-center";
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-2 text-gray-600">Cargando...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8 text-red-600">
        <span>Error: {error}</span>
      </div>
    );
  }

  if (searchContent.length === 0) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500">
        <span>No hay datos para mostrar. Realice una búsqueda.</span>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_CADASTRAL_COLUMNS.map((column) => (
              <TableHead key={column.property}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchContent.map((row, index) => (
            <TableRow key={index}>
              {TABLE_CADASTRAL_COLUMNS.map((column) =>
                column.property === "" ? (
                  <TableCell
                    key={`${column.property}-${index}`}
                    className="flex justify-center items-center"
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CadastralDetail baunitIdE={row.baunitIdE}>
                          <Button
                            variant="ghost"
                            className="text-green-600 cursor-pointer"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="icon icon-tabler icons-tabler-filled icon-tabler-info-circle w-6! h-6!"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
                            </svg>
                          </Button>
                        </CadastralDetail>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Detalles del prédio</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <TableCell
                    key={`${column.property}-${index}`}
                    className={`${textCenter(column.property)} text-xs`}
                  >
                    {row[column.property]}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <TableCadastralPagination
          totalElements={totalElements}
          totalPages={totalPages}
          maxVisiblePages={maxVisiblePages}
        />
      </div>
    </>
  );
}
