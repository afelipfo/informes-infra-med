'use client';

import { useState } from 'react';
import { generateReportFromFile, generateDemoReport, GeneratedReport } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { ReportDisplay } from '@/components/report/ReportDisplay';
import { LoaderCircle, AlertTriangle, FileSpreadsheet, ChevronRight } from 'lucide-react';

export default function GenerateReportPage() {
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null);
  };

  const handleGenerateReport = async () => {
    if (!selectedFile) {
      setError('Por favor, selecciona un archivo primero.');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const result = await generateReportFromFile(selectedFile);
      setReport(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-t-lg shadow-md">
        <h1 className="text-2xl font-bold text-white mb-2">Generador de Informes</h1>
        <p className="text-blue-100">
          Carga tu archivo Excel/CSV y genera un informe técnico detallado instantáneamente.
        </p>
      </div>

      <div className="bg-white p-8 rounded-b-lg shadow-md mb-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 text-blue-600" size={20} />
            Cargar Archivo
          </h2>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-grow">
              <FileDropzone 
                onFileSelect={handleFileSelect}
                disabled={loading}
              />
            </div>
            
            <div className="flex lg:flex-col justify-end items-center gap-4">
              <Button 
                onClick={handleGenerateReport}
                disabled={!selectedFile || loading}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 h-auto font-medium"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" size={20} />
                    Generando...
                  </>
                ) : (
                  <>
                    Generar Informe
                    <ChevronRight className="ml-2" size={20} />
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-slate-500">
            <p>Formatos soportados: Excel (.xlsx, .xls) y CSV (.csv) • Tamaño máximo: 10MB</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3">
            <AlertTriangle size={24} />
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
        {report && <ReportDisplay report={report} />}
      </div>
    </div>
  );
}