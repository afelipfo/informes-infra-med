import type { Metadata } from "next";
import "./globals.css";

// Using system fonts for now to avoid Google Fonts dependency
// TODO: Add local Inter font files to /public/fonts/ directory

export const metadata: Metadata = {
  title: "Generador de Informes | Infraestructura Medellín",
  description: "Aplicación para la generación automática de informes técnicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}