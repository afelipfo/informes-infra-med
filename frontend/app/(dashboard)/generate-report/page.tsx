'use client';

import { useState } from 'react';
import { generateReport, generateDemoReport, GeneratedReport } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ReportDisplay } from '@/components/report/ReportDisplay';
import { LoaderCircle, AlertTriangle, PlayCircle } from 'lucide-react';

export default function GenerateReportPage() {
  const [apiUrl, setApiUrl] = useState('');
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiUrl) {
      setError('Por favor, ingrese una URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const result = await generateReport(apiUrl);
      setReport(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoReport = async () => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const result = await generateDemoReport();
      setReport(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Generar Nuevo Informe</h2>
        
        {/* Sección de Demostración */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h3 className="text-md font-medium text-blue-900 mb-2">🚀 Prueba Rápida</h3>
          <p className="text-sm text-blue-700 mb-3">
            Genera un informe de demostración con datos de ejemplo para ver cómo funciona la aplicación.
          </p>
          <Button 
            onClick={handleDemoReport} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin mr-2" size={16} />
                Generando Demo...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2" size={16} />
                Generar Informe de Demostración
              </>
            )}
          </Button>
        </div>

        {/* Sección de URL Personalizada */}
        <div>
          <p className="text-sm text-slate-600 mb-4">
            <strong>O pega la URL</strong> de un archivo Excel público con los datos del contrato de Urgencia Manifiesta.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 mb-4">
            <p className="text-xs text-gray-600 mb-1"><strong>Ejemplo de URL válida:</strong></p>
            <code className="text-xs text-gray-800">https://file-examples.com/storage/fe68c8a7c59a8f1a0b5c6f1/2017/10/file_example_XLSX_10.xlsx</code>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <Input
              type="url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://ejemplo.com/api/datos_contrato.xlsx"
              className="flex-grow"
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" size={16} />
                  Generando...
                </>
              ) : (
                'Generar Informe'
              )}
            </Button>
          </form>
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