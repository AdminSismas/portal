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
import { NpnLike } from "../../interfaces/cadastral-search/npn-like";
import { NPN_LIKE_INPUTS } from "../../constants/cadastral-search/npn-like.constant";

interface AdvanceCadastralSearchDialogProps {
  children: React.ReactNode;
  onSubmitMatricula: (matricula: string) => void;
  onSubmitDetallada: (npnLike: string) => void;
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

    let npnLike = "";

    NPN_LIKE_INPUTS.forEach((input) => {
      if (!formData[input.property]) npnLike += "_".repeat(input.spaces);
      else
        npnLike += String(formData[input.property]).padStart(input.spaces, "0");
    });

    // setFormData((prev) => ({
    //   departamento: prev.departamento || "__",
    //   municipio: prev.municipio || "___",
    //   zonas: prev.zonas || "__",
    //   sector: prev.sector || "__",
    //   comuna: prev.comuna || "__",
    //   barrio: prev.barrio || "__",
    //   manzanaVereda: prev.manzanaVereda || "____",
    //   terreno: prev.terreno || "____",
    //   condicion: prev.condicion || "_",
    //   edificio: prev.edificio || "__",
    // }));

    onSubmitDetallada(npnLike);
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
              {NPN_LIKE_INPUTS.map((input) => (
                <Field key={input.property}>
                  <FieldLabel htmlFor={input.property}>
                    {input.label}
                  </FieldLabel>
                  <Input
                    id={input.property}
                    type="number"
                    placeholder={input.label}
                    value={formData[input.property]}
                    minLength={input.spaces}
                    maxLength={input.spaces}
                    onChange={(e) =>
                      handleFormChange(input.property, e.target.value)
                    }
                    className="focus-visible:ring-green-500/50 focus-visible:border-green-500"
                  />
                </Field>
              ))}
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
