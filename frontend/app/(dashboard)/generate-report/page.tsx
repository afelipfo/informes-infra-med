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
  Clock,
  Upload,
  Zap,
  Star,
  Shield,
  Rocket,
  Brain
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative z-10 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mr-4" />
                  Informe Generado Exitosamente
                </h1>
                <p className="text-blue-200 mt-2 text-lg">
                  Secretaría de Infraestructura Física - Alcaldía de Medellín 2025
                </p>
              </div>
              <Button 
                onClick={resetForm}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-bold"
              >
                <FileSpreadsheet className="w-6 h-6 mr-3" />
                Generar Nuevo Informe
              </Button>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ReportDisplay report={report} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-10 left-20 w-96 h-96 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Hero Section - Spectacular */}
      <div className="relative z-10 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 text-center">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-3xl mb-10 shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500">
              <BarChart3 className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-7xl font-black bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text text-transparent mb-8 leading-tight">
              Generador de Informes Técnicos
            </h1>
            <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-20 leading-relaxed font-medium">
              Sistema inteligente con <span className="text-cyan-400 font-black text-3xl">IA avanzada</span> para la generación automática de informes técnicos 
              de infraestructura con <span className="text-purple-400 font-black text-3xl">análisis en tiempo real</span> y visualizaciones interactivas
            </p>
            
            {/* Stats Cards - Ultra Spectacular */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 max-w-6xl mx-auto">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500">
                  <div className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">&lt; 30s</div>
                  <div className="text-lg text-cyan-100 font-bold mb-6">Tiempo de Generación</div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-2xl group-hover:shadow-cyan-500/50 transform group-hover:rotate-12 transition-all duration-500">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500">
                  <div className="text-6xl font-black bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent mb-4">100%</div>
                  <div className="text-lg text-emerald-100 font-bold mb-6">Precisión de Datos</div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-2xl group-hover:shadow-emerald-500/50 transform group-hover:rotate-12 transition-all duration-500">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500">
                  <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">AI</div>
                  <div className="text-lg text-purple-100 font-bold mb-6">Análisis Inteligente</div>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-2xl group-hover:shadow-purple-500/50 transform group-hover:rotate-12 transition-all duration-500">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Spectacular Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Upload Section - Spectacular */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500 shadow-2xl">
              <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-10 py-8">
                <h3 className="text-3xl font-black text-white flex items-center">
                  <Upload className="w-10 h-10 mr-4" />
                  Cargar Archivo de Datos
                </h3>
                <p className="text-blue-100 mt-3 text-lg font-medium">
                  Sube tu archivo Excel o CSV para generar un informe técnico completo
                </p>
              </div>
              
              <div className="p-10 space-y-8">
                <div>
                  <label className="block text-lg font-black text-white mb-4">
                    Archivo de Contrato (Excel/CSV)
                  </label>
                  <div className="relative">
                    <FileDropzone 
                      onFileSelect={handleFileSelect}
                    />
                  </div>
                  <p className="text-sm text-blue-200 mt-4 flex items-center font-medium">
                    <FileText className="w-5 h-5 mr-2" />
                    Formatos: Excel (.xlsx, .xls) y CSV (.csv) • Tamaño máximo: 10MB
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black text-white mb-3">
                      Supervisor del Proyecto
                    </label>
                    <input
                      type="text"
                      value={supervisorName}
                      onChange={(e) => setSupervisorName(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur border-2 border-cyan-400/30 rounded-2xl text-white placeholder-blue-200 focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 transition-all duration-300 font-medium text-lg"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-black text-white mb-3">
                      Nombre del Proyecto
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-800/50 backdrop-blur border-2 border-purple-400/30 rounded-2xl text-white placeholder-blue-200 focus:ring-4 focus:ring-purple-400/30 focus:border-purple-400 transition-all duration-300 font-medium text-lg"
                      placeholder="Proyecto de infraestructura"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-2xl blur opacity-50"></div>
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={!selectedFile || loading}
                    className="relative w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 py-6 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="w-8 h-8 mr-4 animate-spin" />
                        Generando Informe...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-8 h-8 mr-4" />
                        Generar Informe Técnico
                        <Sparkles className="w-6 h-6 ml-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Section - Spectacular */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500 shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 px-10 py-8">
                <h3 className="text-3xl font-black text-white flex items-center">
                  <Star className="w-10 h-10 mr-4" />
                  Demostración Interactiva
                </h3>
                <p className="text-purple-100 mt-3 text-lg font-medium">
                  Explora las funcionalidades con datos de ejemplo
                </p>
              </div>
              
              <div className="p-10 text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur rounded-full mb-12 transform hover:scale-110 hover:rotate-12 transition-all duration-500">
                  <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
                
                <h4 className="text-3xl font-black text-white mb-6">
                  ¿Quieres ver cómo funciona?
                </h4>
                <p className="text-blue-200 mb-12 text-xl leading-relaxed font-medium">
                  Genera un informe de demostración con datos de ejemplo 
                  para explorar todas las funcionalidades del sistema.
                </p>
                
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur rounded-2xl p-8 mb-12 border border-purple-400/30">
                  <h5 className="font-black text-purple-300 mb-6 text-2xl">El demo incluye:</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-purple-200 font-bold">
                      <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                      Análisis presupuestario
                    </div>
                    <div className="flex items-center text-purple-200 font-bold">
                      <Clock className="w-6 h-6 mr-3 text-purple-400" />
                      Seguimiento cronograma
                    </div>
                    <div className="flex items-center text-purple-200 font-bold">
                      <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                      Indicadores de rendimiento
                    </div>
                    <div className="flex items-center text-purple-200 font-bold">
                      <Shield className="w-6 h-6 mr-3 text-purple-400" />
                      Recomendaciones técnicas
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl blur opacity-50"></div>
                  <Button 
                    onClick={handleDemoReport}
                    disabled={loading}
                    className="relative w-full bg-gradient-to-r from-purple-500 via-pink-600 to-red-600 hover:from-purple-600 hover:via-pink-700 hover:to-red-700 py-6 text-xl font-black shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="w-8 h-8 mr-4 animate-spin" />
                        Generando Demo...
                      </>
                    ) : (
                      <>
                        <Zap className="w-8 h-8 mr-4" />
                        Probar Demostración
                        <Star className="w-6 h-6 ml-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display - Spectacular */}
        {error && (
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-600 rounded-3xl blur opacity-75"></div>
              <div className="relative bg-gradient-to-br from-red-900/90 to-pink-900/90 backdrop-blur-xl rounded-3xl p-10 border border-red-400/30">
                <div className="flex items-start">
                  <AlertTriangle className="w-12 h-12 text-red-400 mr-6 flex-shrink-0 mt-2" />
                  <div>
                    <h3 className="text-red-300 font-black text-2xl mb-4">Error al generar el informe</h3>
                    <p className="text-red-200 text-lg">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section - Ultra Spectacular */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Funcionalidades Avanzadas
            </h2>
            <p className="text-2xl text-blue-200 max-w-4xl mx-auto font-medium">
              Tecnología de vanguardia para análisis inteligente de infraestructura
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center transform group-hover:scale-105 group-hover:-translate-y-6 transition-all duration-500 shadow-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-2xl mb-8 transform group-hover:rotate-12 transition-all duration-500">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-6 text-white">Análisis Automático</h3>
                <p className="text-blue-200 leading-relaxed font-medium text-lg">
                  Procesamiento inteligente de datos con validación automática 
                  y detección de anomalías en tiempo real.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center transform group-hover:scale-105 group-hover:-translate-y-6 transition-all duration-500 shadow-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 transform group-hover:rotate-12 transition-all duration-500">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-6 text-white">Visualización Avanzada</h3>
                <p className="text-blue-200 leading-relaxed font-medium text-lg">
                  Gráficos interactivos y dashboards con métricas en tiempo real 
                  y análisis de tendencias históricas.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl p-12 text-center transform group-hover:scale-105 group-hover:-translate-y-6 transition-all duration-500 shadow-2xl">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-8 transform group-hover:rotate-12 transition-all duration-500">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-black mb-6 text-white">Exportación Flexible</h3>
                <p className="text-blue-200 leading-relaxed font-medium text-lg">
                  Múltiples formatos de exportación: PDF, Excel, Word 
                  con plantillas totalmente personalizables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Spectacular */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900 to-black py-20 mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-8">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-4xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
            Secretaría de Infraestructura Física
          </h3>
          <p className="text-blue-300 text-xl font-medium mb-8">
            Alcaldía de Medellín • 2025 • Sistema de Generación de Informes Técnicos
          </p>
          <div className="mt-12 pt-8 border-t border-slate-700">
            <p className="text-blue-400 font-medium">
              Desarrollado con tecnología de inteligencia artificial para optimizar los procesos de infraestructura urbana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
