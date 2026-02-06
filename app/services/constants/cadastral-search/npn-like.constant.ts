import { NpnLikeInputs } from "../../interfaces/cadastral-search/npn-like-inputs.interface";

export const NPN_LIKE_INPUTS: NpnLikeInputs[] = [
  { label: "Departamento", property: "departamento", spaces: 2 },
  { label: "Municipio", property: "municipio", spaces: 3 },
  { label: "Zona", property: "zonas", spaces: 2 },
  { label: "Sector", property: "sector", spaces: 2 },
  { label: "Comuna", property: "comuna", spaces: 2 },
  { label: "Barrio", property: "barrio", spaces: 2 },
  { label: "Manzana", property: "manzanaVereda", spaces: 4 },
  { label: "Terreno", property: "terreno", spaces: 4 },
  { label: "Condición", property: "condicion", spaces: 1 },
  { label: "Edificio", property: "edificio", spaces: 2 },
];
