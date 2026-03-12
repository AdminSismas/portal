"use client";

import { URL_ENVIRONMENTS, getMapApiUrl } from "@/src/config/api_urls";
import { Globe, Lock, ShieldCheck } from "lucide-react";

interface BuildMapProps {
  env: URL_ENVIRONMENTS;
}

export function BuildMap({ env }: BuildMapProps) {
  const baseUrl = getMapApiUrl(env);

  if (!baseUrl) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <p>No se ha configurado el mapa para este entorno</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full h-full min-h-screen p-4 lg:p-6 bg-slate-50/50">
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="h-12 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4 select-none">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-md w-full max-w-2xl text-xs text-slate-500 font-medium">
              <Lock className="w-3 h-3 text-green-500" />
              <div className="flex-1 truncate select-all">
                Observatorio Inmobiliario
              </div>
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
            </div>
          </div>

          {/* Right section (Globe) */}
          <div className="flex items-center justify-end w-[60px]">
            <Globe className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 relative bg-slate-50">
          <iframe
            src={baseUrl}
            className="absolute inset-0 w-full h-full border-none"
            title="Visualizador de Mapa"
          ></iframe>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-4 py-8 lg:py-16 px-4 lg:px-8 w-full max-w-7xl mx-auto">
  //     <div className="flex flex-col gap-2">
  //       <h1 className="text-3xl font-bold tracking-tight">
  //         Visualizador de Mapa
  //       </h1>
  //       <p className="text-muted-foreground">
  //         Seleccione un departamento y municipio para visualizar la información
  //         geográfica
  //       </p>
  //     </div>
  //     <Suspense
  //       fallback={
  //         <div className="flex items-center justify-center h-[500px]">
  //           <p>Cargando...</p>
  //         </div>
  //       }
  //     >
  //       <BuildMapContent baseUrl={baseUrl} />
  //     </Suspense>
  //   </div>
  // );
}
