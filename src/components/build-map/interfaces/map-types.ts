export interface Departamento {
  codigo: string;
  nombre: string;
}

export interface Municipio {
  codigo: string;
  nombre: string;
  codigoDepartamento: string;
}

export interface MapViewerState {
  departamento: Departamento | null;
  municipio: Municipio | null;
  url: string | null;
}
