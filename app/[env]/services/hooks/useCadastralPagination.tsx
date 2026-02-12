"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useCadastralPagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 10;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (name === "page") {
        params.set(name, value);
      } else if (name === "size") {
        params.set(name, value);
        params.set("page", "1");
      }
      return params.toString();
    },
    [searchParams],
  );

  const setPage = (newPage: number) => {
    router.push(`${pathname}?${createQueryString("page", String(newPage))}`);
  };

  const setSize = (newSize: number) => {
    router.push(`${pathname}?${createQueryString("size", String(newSize))}`);
  };

  return {
    page,
    size,
    setPage,
    setSize,
  };
}
