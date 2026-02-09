import { TableCadastralColumns } from "../../interfaces/cadastral-search/table-cadastral-columns";

export const TABLE_CADASTRAL_COLUMNS: TableCadastralColumns[] = [
  { label: "Información", property: "" },
  { label: "Matrícula inmobiliaria", property: "propertyRegistryNumber" },
  { label: "Número predial", property: "cadastralNumber" },
  { label: "Área terreno", property: "cadastralAreaE" },
  { label: "Condición", property: "domBaunitCondition" },
  { label: "Destino económico", property: "domBaunitEconoDesti" },
];
