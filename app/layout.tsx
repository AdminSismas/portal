import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/layout/header";
import { Footer } from "./_components/layout/footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClientTitleUpdater } from "./_components/layout/client-title-updater";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Sismas",
  description: "Página de servicios de Sismas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ClientTitleUpdater />
        </Suspense>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <TooltipProvider>{children}</TooltipProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
