'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ReportDisplay } from '@/components/report/ReportDisplay';
import { GeneratedReport } from '@/lib/api';

export default function ReportDetailPage() {
  const params = useParams();
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // En una implementación real, aquí cargarías el reporte por ID
    // Por ahora mostramos un mensaje informativo
    setLoading(false);
    setError('Esta página mostrará los detalles del reporte cuando se implemente la persistencia de datos.');
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-md">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              <strong>ID del reporte:</strong> {params.id}
            </p>
            <p className="text-sm mt-1">
              Para ver reportes generados, utiliza la página de generación de reportes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {report ? (
        <ReportDisplay report={report} />
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Reporte no encontrado
          </h2>
          <p className="text-gray-600">
            El reporte con ID {params.id} no pudo ser cargado.
          </p>
        </div>
      )}
    </div>
  );
}