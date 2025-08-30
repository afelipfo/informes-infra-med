import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Informes | Infraestructura Medellín",
  description: "Sistema avanzado de generación automática de informes técnicos para contratos de Urgencia Manifiesta. Análisis inteligente con IA para la Secretaría de Infraestructura Física de Medellín.",
  keywords: "informes técnicos, infraestructura, medellín, contratos, urgencia manifiesta, análisis automático, IA",
  authors: [{ name: "Secretaría de Infraestructura Física - Alcaldía de Medellín" }],
  creator: "Alcaldía de Medellín",
  publisher: "Secretaría de Infraestructura Física",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-900 text-white`}>
        {children}
      </body>
    </html>
  );
}