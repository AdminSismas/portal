"use client";

import { useEffect, useState } from "react";

export function useResponsivePages() {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setMaxVisiblePages(2);
      } else {
        setMaxVisiblePages(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return maxVisiblePages;
}
