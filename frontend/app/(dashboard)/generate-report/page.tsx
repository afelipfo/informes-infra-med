'use client';

import { useState } from 'react';
import { generateReport, GeneratedReport } from '@/lib/api';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ReportDisplay } from '@/components/report/ReportDisplay';
import { LoaderCircle, AlertTriangle } from 'lucide-react';

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Generar Nuevo Informe</h2>
        <p className="text-sm text-slate-600 mb-4">
          Pega la URL de la API que comparte el archivo Excel con los datos del contrato de Urgencia Manifiesta.
        </p>
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