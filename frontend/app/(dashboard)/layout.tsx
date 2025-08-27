import { FileText } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-3 flex items-center gap-3">
          <FileText className="text-blue-600" size={28} />
          <h1 className="text-xl font-bold text-slate-800">
            Generador de Informes Técnicos
          </h1>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="text-center p-4 text-sm text-slate-500">
        Secretaría de Infraestructura Física - Alcaldía de Medellín 2025
      </footer>
    </div>
  );
}