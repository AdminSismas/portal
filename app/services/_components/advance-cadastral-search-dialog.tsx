"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { NpnLike } from "../interfaces/npn-like";

interface AdvanceCadastralSearchDialogProps {
  children: React.ReactNode;
  onSubmitMatricula: (matricula: string) => void;
  onSubmitDetallada: (formData: NpnLike) => void;
}

export function AdvanceCadastralSearchDialog({
  children,
  onSubmitMatricula,
  onSubmitDetallada,
}: AdvanceCadastralSearchDialogProps) {
  const [matricula, setMatricula] = useState("");

  const [formData, setFormData] = useState<NpnLike>({
    departamento: "",
    municipio: "",
    zonas: "",
    sector: "",
    comuna: "",
    barrio: "",
    manzanaVereda: "",
    terreno: "",
    condicion: "",
    edificio: "",
  });

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitingMatricula = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmitMatricula(matricula);
  };

  const submitingDetallada = (e: React.SubmitEvent) => {
    e.preventDefault();
    onSubmitDetallada(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="bg-green-500/10 p-4 pr-12">
          <DialogTitle className="text-green-700">
            Búsqueda catastral avanzada
          </DialogTitle>
          <DialogDescription>
            Realice una búsqueda por matrícula o por ubicación detallada
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitingMatricula} className="space-y-4 px-6 pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="matricula">Matrícula</FieldLabel>
              <Input
                id="matricula"
                type="text"
                placeholder="Ingrese el número de matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
              />
            </Field>
          </FieldGroup>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer active:bg-green-100 active:text-green-600"
            >
              Búsqueda por matrícula
            </Button>
          </div>
        </form>

        <div className="relative my-6">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
            o
          </span>
        </div>

        <form onSubmit={submitingDetallada} className="space-y-6 px-6 pb-6">
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="departamento">Departamento</FieldLabel>
                <Input
                  id="departamento"
                  type="text"
                  placeholder="Departamento"
                  value={formData.departamento}
                  onChange={(e) =>
                    handleFormChange("departamento", e.target.value)
                  }
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="municipio">Municipio</FieldLabel>
                <Input
                  id="municipio"
                  type="text"
                  placeholder="Municipio"
                  value={formData.municipio}
                  onChange={(e) =>
                    handleFormChange("municipio", e.target.value)
                  }
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="zonas">Zonas</FieldLabel>
                <Input
                  id="zonas"
                  type="text"
                  placeholder="Zona"
                  value={formData.zonas}
                  onChange={(e) => handleFormChange("zonas", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sector">Sector</FieldLabel>
                <Input
                  id="sector"
                  type="text"
                  placeholder="Sector"
                  value={formData.sector}
                  onChange={(e) => handleFormChange("sector", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="comuna">Comuna</FieldLabel>
                <Input
                  id="comuna"
                  type="text"
                  placeholder="Comuna"
                  value={formData.comuna}
                  onChange={(e) => handleFormChange("comuna", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="barrio">Barrio</FieldLabel>
                <Input
                  id="barrio"
                  type="text"
                  placeholder="Barrio"
                  value={formData.barrio}
                  onChange={(e) => handleFormChange("barrio", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="manzanaVereda">Manzana/Vereda</FieldLabel>
                <Input
                  id="manzanaVereda"
                  type="text"
                  placeholder="Manzana/Vereda"
                  value={formData.manzanaVereda}
                  onChange={(e) =>
                    handleFormChange("manzanaVereda", e.target.value)
                  }
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="terreno">Terreno</FieldLabel>
                <Input
                  id="terreno"
                  type="text"
                  placeholder="Terreno"
                  value={formData.terreno}
                  onChange={(e) => handleFormChange("terreno", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="condicion">Condición</FieldLabel>
                <Input
                  id="condicion"
                  type="text"
                  placeholder="Condición"
                  value={formData.condicion}
                  onChange={(e) =>
                    handleFormChange("condicion", e.target.value)
                  }
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="edificio">Edificio</FieldLabel>
                <Input
                  id="edificio"
                  type="text"
                  placeholder="Edificio"
                  value={formData.edificio}
                  onChange={(e) => handleFormChange("edificio", e.target.value)}
                  className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                />
              </Field>
            </div>
          </FieldGroup>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white cursor-pointer active:bg-green-100 active:text-green-600"
            >
              Búsqueda detallada
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
