import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GeographicViewer() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Geographic Viewer</DialogTitle>
          <DialogDescription>
            Ventana encargada del proceso de ingreso a la plataforma de
            visualización geográfica
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
