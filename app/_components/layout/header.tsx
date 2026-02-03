"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="py-5 xl:py-0 lg:py-6 border-b border-slate-300 z-10 sticky top-0 bg-slate-50 backdrop-blur-lg">
      <div className="flex justify-between items-center mx-auto px-3 sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1920px] 2xl:px-8 3xl:px-32">
        <Link href="/">
          <Image
            src="/images/logo_masora.png"
            alt="Logo"
            className="inline w-auto h-[4dvh] sm:h-[6dvh] md:h-[8dvh]"
            width={500}
            height={100}
          />
        </Link>
        <nav>
          <ul className="decoration-0 list-none flex gap-5">
            <li>
              <Link href="/" className={pathname === "/" ? styles.active : ""}>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className={pathname === "/services" ? styles.active : ""}
              >
                Servicios
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
