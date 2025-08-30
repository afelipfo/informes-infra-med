'use client';

import { useState } from 'react';
import { generateReportFromFile, generateDemoReport, type GeneratedReport } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { FileDropzone } from '@/components/ui/FileDropzone';
import { ReportDisplay } from '@/components/report/ReportDisplay';
import { 
  LoaderCircle, 
  AlertTriangle, 
  FileSpreadsheet, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  BarChart3,
  Sparkles,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function GenerateReportPage() {
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [supervisorName, setSupervisorName] = useState('');
  const [projectName, setProjectName] = useState('');

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

    try {
      const result = await generateReportFromFile(selectedFile, supervisorName, projectName);
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido al generar el informe.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoReport = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await generateDemoReport();
      setReport(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setSupervisorName('');
    setProjectName('');
    setReport(null);
    setError(null);
  };

  if (report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
                  Informe Generado Exitosamente
                </h1>
                <p className="text-gray-600 mt-1">
                  Secretaría de Infraestructura Física - Alcaldía de Medellín 2025
                </p>
              </div>
              <Button 
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                Generar Nuevo Informe
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ReportDisplay report={report} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-8 shadow-lg">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Generador de Informes Técnicos
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed">
              Sistema inteligente para la generación automática de informes técnicos 
              de infraestructura con análisis de datos en tiempo real y visualizaciones interactivas
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">&lt; 30s</div>
                <div className="text-sm text-gray-600 font-medium">Tiempo de Generación</div>
                <Clock className="w-6 h-6 text-blue-400 mx-auto mt-2" />
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600 font-medium">Precisión de Datos</div>
                <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mt-2" />
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">AI</div>
                <div className="text-sm text-gray-600 font-medium">Análisis Inteligente</div>
                <Sparkles className="w-6 h-6 text-purple-400 mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <FileSpreadsheet className="w-7 h-7 mr-3" />
                Cargar Archivo de Datos
              </h3>
              <p className="text-blue-100 mt-2">
                Sube tu archivo Excel o CSV para generar un informe técnico completo
              </p>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Archivo de Contrato (Excel/CSV)
                </label>
                <FileDropzone 
                  onFileSelect={handleFileSelect}
                />
                <p className="text-xs text-gray-500 mt-3 flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  Formatos: Excel (.xlsx, .xls) y CSV (.csv) • Tamaño máximo: 10MB
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Supervisor del Proyecto
                  </label>
                  <input
                    type="text"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre del Proyecto
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Proyecto de infraestructura"
                  />
                </div>
              </div>

              <Button 
                onClick={handleGenerateReport}
                disabled={!selectedFile || loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-6 h-6 mr-3 animate-spin" />
                    Generando Informe...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-6 h-6 mr-3" />
                    Generar Informe Técnico
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Demo Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="w-7 h-7 mr-3" />
                Demostración Interactiva
              </h3>
              <p className="text-purple-100 mt-2">
                Explora las funcionalidades con datos de ejemplo
              </p>
            </div>
            
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full mb-8">
                <Sparkles className="w-12 h-12 text-purple-600" />
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Quieres ver cómo funciona?
              </h4>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Genera un informe de demostración con datos de ejemplo 
                para explorar todas las funcionalidades del sistema.
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 mb-8">
                <h5 className="font-bold text-purple-900 mb-4 text-lg">El demo incluye:</h5>
                <ul className="text-purple-700 space-y-3">
                  <li className="flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Análisis presupuestario detallado
                  </li>
                  <li className="flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Seguimiento de cronograma
                  </li>
                  <li className="flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Indicadores de rendimiento
                  </li>
                  <li className="flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Recomendaciones técnicas
                  </li>
                </ul>
              </div>

              <Button 
                onClick={handleDemoReport}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="w-6 h-6 mr-3 animate-spin" />
                    Generando Demo...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-3" />
                    Probar Demostración
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
              <div className="flex items-start">
                <AlertTriangle className="w-8 h-8 text-red-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-red-800 font-bold text-lg mb-2">Error al generar el informe</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Funcionalidades Avanzadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnología de vanguardia para análisis inteligente de infraestructura
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-200 hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Análisis Automático</h3>
              <p className="text-gray-600 leading-relaxed">
                Procesamiento inteligente de datos con validación automática 
                y detección de anomalías en tiempo real.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-200 hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Visualización Avanzada</h3>
              <p className="text-gray-600 leading-relaxed">
                Gráficos interactivos y dashboards con métricas en tiempo real 
                y análisis de tendencias históricas.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-200 hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Exportación Flexible</h3>
              <p className="text-gray-600 leading-relaxed">
                Múltiples formatos de exportación: PDF, Excel, Word 
                con plantillas totalmente personalizables.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-6">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Secretaría de Infraestructura Física
          </h3>
          <p className="text-gray-400 text-lg">
            Alcaldía de Medellín • 2025 • Sistema de Generación de Informes Técnicos
          </p>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Desarrollado con tecnología de inteligencia artificial para optimizar los procesos de infraestructura urbana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
