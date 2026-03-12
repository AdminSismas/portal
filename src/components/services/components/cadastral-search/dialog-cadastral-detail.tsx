import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCadastralDetails } from "../../hooks/useCadastralDetails";
import { useGeographicViewer } from "../../hooks/useGeographicViewer";
import { useCallback, useState } from "react";
import { GeographicViewer } from "./geographic-viewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CadastralDetail } from "./cadastral-detail";

interface CadastralDetailProps {
  children: React.ReactNode;
  baunitIdE: string;
  cadastralNumber: string;
}

export function DialogCadastralDetail({
  children,
  baunitIdE,
  cadastralNumber,
}: CadastralDetailProps) {
  const [open, setOpen] = useState(false);

  const { getDetailInformation, haveDetailGroup } = useCadastralDetails({
    baunitIdE,
    open,
  });

  const geographicData = useGeographicViewer({
    cadastralNumber,
    enabled: open,
  });

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        geographicData.reset();
      }
    },
    [geographicData],
  );

  return (
    <Dialog data-open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-[90dvh] w-[90dvw] max-w-none! flex flex-col gap-0 p-0 overflow-hidden">
        <DialogHeader className="bg-green-200 border-b border-green-300 py-2 lg:py-4 px-2 lg:px-4">
          <DialogTitle className=" text-2xl">Aspectos generales</DialogTitle>
          <DialogDescription className="flex justify-between">
            <span>Información detallada del predio</span>
          </DialogDescription>
        </DialogHeader>
        <div className="px-2 lg:px-4 h-full">
          <Tabs defaultValue="details" className="flex flex-col h-full">
            <TabsList className="w-full shrink-0 mt-2">
              <TabsTrigger className="cursor-pointer" value="details">
                Detalles
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="geographic">
                Mapa geográfico
              </TabsTrigger>
            </TabsList>
            {/* Tab details */}
            <TabsContent value="details" className="flex-1 overflow-y-auto">
              <CadastralDetail
                getDetailInformation={getDetailInformation}
                haveDetailGroup={haveDetailGroup}
              />
            </TabsContent>
            {/* Tab geographic */}
            <TabsContent value="geographic" className="flex-1 overflow-y-auto">
              <GeographicViewer
                isLoading={geographicData.isLoading}
                error={geographicData.error}
                urlOpenData={geographicData.urlOpenData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
