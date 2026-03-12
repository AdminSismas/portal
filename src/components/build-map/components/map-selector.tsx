"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Departamento, Municipio } from "../interfaces/map-types";
import { useDepartamentos } from "../hooks/use-departamentos";
import { useMunicipios } from "../hooks/use-municipios";
import { useMapViewerUrl } from "../hooks/use-map-viewer-url";

interface MapSelectorProps {
  baseUrl: string;
}

export function MapSelector({ baseUrl }: MapSelectorProps) {
  const [departamento, setDepartamento] = useState<Departamento | null>(null);
  const [municipio, setMunicipio] = useState<Municipio | null>(null);

  const { departamentos, isLoading: isLoadingDepartamentos } = useDepartamentos(
    {
      baseUrl,
    },
  );

  const { municipios, isLoading: isLoadingMunicipios } = useMunicipios({
    baseUrl,
    departamento,
  });

  const { url } = useMapViewerUrl({
    baseUrl,
    departamento,
    municipio,
  });

  const handleDepartamentoChange = (value: string) => {
    const selectedDepto = departamentos.find((d) => d.codigo === value);
    if (selectedDepto) {
      setDepartamento(selectedDepto);
      setMunicipio(null);
    }
  };

  const handleMunicipioChange = (value: string) => {
    const selectedMun = municipios.find((m) => m.codigo === value);
    if (selectedMun) {
      setMunicipio(selectedMun);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="departamento" className="text-sm font-medium">
            Departamento
          </label>
          <Select
            value={departamento?.codigo || ""}
            onValueChange={handleDepartamentoChange}
            disabled={isLoadingDepartamentos}
          >
            <SelectTrigger id="departamento" className="w-full">
              <SelectValue
                placeholder={
                  isLoadingDepartamentos
                    ? "Cargando..."
                    : "Seleccione un departamento"
                }
              />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {departamentos.map((depto) => (
                  <SelectItem key={depto.codigo} value={depto.codigo}>
                    {depto.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="municipio" className="text-sm font-medium">
            Municipio
          </label>
          <Select
            value={municipio?.codigo || ""}
            onValueChange={handleMunicipioChange}
            disabled={!departamento || isLoadingMunicipios}
          >
            <SelectTrigger id="municipio" className="w-full">
              <SelectValue
                placeholder={
                  !departamento
                    ? "Seleccione un departamento primero"
                    : isLoadingMunicipios
                      ? "Cargando..."
                      : "Seleccione un municipio"
                }
              />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {municipios.map((mun) => (
                  <SelectItem key={mun.codigo} value={mun.codigo}>
                    {mun.nombre}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 min-h-[500px] border rounded-lg overflow-hidden bg-muted/20">
        {!departamento && !municipio && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-center p-8">
              Seleccione un departamento y municipio para visualizar el mapa
            </p>
          </div>
        )}
        {departamento && !municipio && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-center p-8">
              Seleccione un municipio para visualizar el mapa
            </p>
          </div>
        )}
        {url && (
          <iframe
            src={url}
            className="w-full h-full min-h-[500px]"
            title="Visualizador de Mapa"
          />
        )}
      </div>
    </div>
  );
}
