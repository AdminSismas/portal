import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCadastralData } from "../../interfaces/cadastral-search/table-cadastral-columns";
import { DetailsCadastral } from "../../interfaces/cadastral-search/details-cadastral";

interface CadastralDetailProps {
  children: React.ReactNode;
  baunitIdE: string;
}

interface PropertyDetail {
  label: string;
  property: keyof DetailsCadastral;
}

export function CadastralDetail({ children, baunitIdE }: CadastralDetailProps) {
  const idProperties: PropertyDetail[] = [
    { label: "Número predial (Formato)", property: "cadastralNumberFormat" },
    { label: "Número predial anterior", property: "cadastralLastNumber" },
    { label: "Nupre", property: "cadastralRegistryNumber" },
    { label: "Número predial", property: "cadastralNumber" },
    { label: "Matrícula inmobiliaria", property: "propertyRegistryNumber" },
    { label: "Número de ficha", property: "baunitIdE" },
  ];

  const useAndProperty: PropertyDetail[] = [
    { label: "Destino económico", property: "domBaunitEconoDesti" },
    { label: "Condición propiedad", property: "domBaunitCondition" },
    { label: "Código homologado", property: "baunitIdOrigin" },
    { label: "Tipo", property: "domBaunitType" },
    { label: "Inscripción catastral", property: "propertyRegistryOffice" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl lg:max-w-6xl p-0">
        <DialogHeader>
          <DialogTitle className="bg-green-100 pb-2 border-b border-green-200 rounded-t-2xl">
            <h2 className="text-2xl px-2 py-1">Aspectos generales</h2>
          </DialogTitle>
        </DialogHeader>
        <article className="py-2 px-4 lg:py-4 lg:px-8 w-full overflow-auto">
          <header>
            <h3 className="text-xl border-b border-slate-200 py-2 mb-2 font-semibold">
              Identificación del predio
            </h3>
          </header>
          <section className="grid grid-cols-2 gap-2 lg:gap-4 ">
            <div></div>
          </section>
        </article>
      </DialogContent>
    </Dialog>
  );
}
