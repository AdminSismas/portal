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
import {
  TABLE_CADASTRAL_COLUMNS,
  TABLE_CADASTRAL_DATA,
} from "../constants/table-cadastral-search";

import { TableCadastralData } from "../interfaces/table-cadastral-columns";

export function TableCadastralSearch() {
  const textCenter = (property: keyof TableCadastralData) => {
    if (
      property === "cadastralAreaE" ||
      property === "propertyRegistryNumber"
    ) {
      return "text-center";
    }
    return "";
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {TABLE_CADASTRAL_COLUMNS.map((column) => (
            <TableHead key={column.property}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {TABLE_CADASTRAL_DATA.map((row, index) => (
          <TableRow key={index}>
            {TABLE_CADASTRAL_COLUMNS.map((column) =>
              column.property === "" ? (
                <TableCell
                  key={`${column.property}-${index}`}
                  className="flex justify-center items-center"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                          className="icon icon-tabler icons-tabler-filled icon-tabler-info-circle"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Detalles del prédio</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              ) : (
                <TableCell
                  key={`${column.property}-${index}`}
                  className={textCenter(column.property)}
                >
                  {row[column.property]}
                </TableCell>
              ),
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
