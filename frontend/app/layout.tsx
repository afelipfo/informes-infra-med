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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Sistema de Informes | Infraestructura Medellín",
    description: "Sistema avanzado de generación automática de informes técnicos con IA",
    url: "http://localhost:3000",
    siteName: "Sistema de Informes - Infraestructura Medellín",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sistema de Informes - Infraestructura Medellín",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sistema de Informes | Infraestructura Medellín",
    description: "Sistema avanzado de generación automática de informes técnicos con IA",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}