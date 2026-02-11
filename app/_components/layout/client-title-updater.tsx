"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

enum TitleEnvironment {
  armenia = "Armenia",
  barrancabermeja = "Barrancabermeja",
  calarca = "Calarca",
  dev = "Desarrollo",
  filandia = "Filandia",
  manizales = "Manizales",
  masora = "Masora",
  montenegro = "Montenegro",
  quimbaya = "Quimbaya",
}

export function ClientTitleUpdater() {
  const searchParams = useSearchParams();
  const environment = searchParams.get("environment") || "dev";
  const titleEnvironment =
    environment in TitleEnvironment
      ? TitleEnvironment[environment as keyof typeof TitleEnvironment]
      : "Desarrollo";

  useEffect(() => {
    document.title = `Portal Sismas ${titleEnvironment}`;
  }, [titleEnvironment]);

  return null;
}
