import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CADASTRAL_DETAIL_FORMAT } from "../../constants/cadastral-search/cadastral-deailt.constant";
import { useCadastralDetails } from "../../hooks/useCadastralDetails";
import { useState } from "react";

interface CadastralDetailProps {
  children: React.ReactNode;
  baunitIdE: string;
}

export function CadastralDetail({ children, baunitIdE }: CadastralDetailProps) {
  const [open, setOpen] = useState(false);

  const { getDetailInformation, haveDetailGroup } = useCadastralDetails({
    baunitIdE,
    open,
  });

  const isMatrix = (title: string) => {
    if (title === "Información Unidad Predial") {
      return haveDetailGroup();
    }
    return true;
  };

  return (
    <Dialog data-open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[90vw]! h-[90vh] max-h-[90vh]! overflow-y-auto p-0">
        <DialogHeader className="bg-green-200 border-b border-green-300 pt-2 lg:pt-4 px-2 lg:px-4">
          <DialogTitle className=" text-2xl">Aspectos generales</DialogTitle>
          <DialogDescription>
            Información detallada del predio
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 h-full">
          {CADASTRAL_DETAIL_FORMAT.map(
            (section) =>
              isMatrix(section.title) && (
                <article key={section.title} className="mb-2 lg:mb-4">
                  <header className="bg-linear-to-r from-green-100 to-white mb-1">
                    <h2 className="text-base border-b border-slate-200 p-1 font-semibold">
                      {section.title}
                    </h2>
                  </header>
                  <section className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 text-sm lg:text-xs">
                    {section.propertyDetails.map((propertyDetail) => (
                      <div
                        key={propertyDetail.label}
                        className="flex gap-2 lg:gap-4"
                      >
                        <span className="font-semibold">
                          {propertyDetail.label}:
                        </span>
                        <span>
                          {getDetailInformation(propertyDetail.property)}
                        </span>
                      </div>
                    ))}
                  </section>
                </article>
              ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
