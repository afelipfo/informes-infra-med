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
      <div 
        className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative"
        style={{
          background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #312e81 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div 
          className="relative z-10 bg-gray-900 bg-opacity-95 backdrop-blur border-b border-blue-500 border-opacity-30 shadow-2xl"
          style={{
            background: 'rgba(17, 24, 39, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(59, 130, 246, 0.3)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-8">
              <div>
                <h1 
                  className="text-3xl font-bold text-transparent bg-clip-text flex items-center"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mr-4" />
                  Informe Generado Exitosamente
                </h1>
                <p className="text-blue-200 mt-2 text-lg">
                  Secretaría de Infraestructura Física - Alcaldía de Medellín 2025
                </p>
              </div>
              <Button 
                onClick={resetForm}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-bold"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)',
                  boxShadow: '0 10px 25px rgba(6, 182, 212, 0.5)'
                }}
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
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 25%, #312e81 50%, #7c3aed 75%, #ec4899 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-10 left-10 w-96 h-96 rounded-full opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(59,130,246,0.4) 50%, transparent 100%)',
            filter: 'blur(40px)'
          }}
        ></div>
        <div 
          className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(236,72,153,0.4) 50%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute bottom-10 left-20 w-96 h-96 rounded-full opacity-30 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.6) 0%, rgba(239,68,68,0.4) 50%, transparent 100%)',
            filter: 'blur(40px)',
            animationDelay: '4s'
          }}
        ></div>
      </div>
      
      {/* Hero Section */}
      <div 
        className="relative z-10 border-b shadow-2xl"
        style={{
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-24 text-center">
            <div 
              className="inline-flex items-center justify-center w-28 h-28 rounded-3xl mb-10 shadow-2xl transform hover:scale-110 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)'
              }}
            >
              <BarChart3 className="w-14 h-14 text-white" />
            </div>
            <h1 
              className="text-7xl font-black mb-8 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #8b5cf6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Generador de Informes Técnicos
            </h1>
            <p className="text-2xl text-blue-100 max-w-5xl mx-auto mb-20 leading-relaxed font-medium">
              Sistema inteligente con{' '}
              <span 
                className="font-black text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                IA avanzada
              </span>{' '}
              para la generación automática de informes técnicos de infraestructura con{' '}
              <span 
                className="font-black text-3xl"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                análisis en tiempo real
              </span>{' '}
              y visualizaciones interactivas
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 max-w-6xl mx-auto">
              {/* Card 1 - Tiempo */}
              <div className="group relative">
                <div 
                  className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
                  }}
                ></div>
                <div 
                  className="relative rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500"
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div 
                    className="text-6xl font-black mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    &lt; 30s
                  </div>
                  <div className="text-lg text-cyan-100 font-bold mb-6">Tiempo de Generación</div>
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                      boxShadow: '0 10px 25px rgba(6, 182, 212, 0.5)'
                    }}
                  >
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Card 2 - Precisión */}
              <div className="group relative">
                <div 
                  className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  }}
                ></div>
                <div 
                  className="relative rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500"
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div 
                    className="text-6xl font-black mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    100%
                  </div>
                  <div className="text-lg text-emerald-100 font-bold mb-6">Precisión de Datos</div>
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 10px 25px rgba(16, 185, 129, 0.5)'
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Card 3 - AI */}
              <div className="group relative">
                <div 
                  className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                  }}
                ></div>
                <div 
                  className="relative rounded-3xl p-10 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500"
                  style={{
                    background: 'rgba(17, 24, 39, 0.9)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div 
                    className="text-6xl font-black mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    AI
                  </div>
                  <div className="text-lg text-purple-100 font-bold mb-6">Análisis Inteligente</div>
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-all duration-500"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.5)'
                    }}
                  >
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Upload Section */}
          <div className="group relative">
            <div 
              className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)'
              }}
            ></div>
            <div 
              className="relative rounded-3xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-2xl"
              style={{
                background: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div 
                className="px-10 py-8"
                style={{
                  background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)'
                }}
              >
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
                    <FileDropzone onFileSelect={handleFileSelect} />
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
                      className="w-full px-6 py-4 border-2 rounded-2xl text-white placeholder-blue-200 focus:ring-4 transition-all duration-300 font-medium text-lg"
                      style={{
                        background: 'rgba(30, 41, 59, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderColor: 'rgba(6, 182, 212, 0.3)',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#06b6d4';
                        e.target.style.boxShadow = '0 0 0 4px rgba(6, 182, 212, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(6, 182, 212, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
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
                      className="w-full px-6 py-4 border-2 rounded-2xl text-white placeholder-blue-200 focus:ring-4 transition-all duration-300 font-medium text-lg"
                      style={{
                        background: 'rgba(30, 41, 59, 0.5)',
                        backdropFilter: 'blur(10px)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#8b5cf6';
                        e.target.style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Proyecto de infraestructura"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div 
                    className="absolute -inset-1 rounded-2xl blur opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
                    }}
                  ></div>
                  <Button 
                    onClick={handleGenerateReport}
                    disabled={!selectedFile || loading}
                    className="relative w-full py-6 text-xl font-black disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transition-all duration-500 transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
                      boxShadow: '0 10px 25px rgba(6, 182, 212, 0.5)'
                    }}
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

          {/* Demo Section */}
          <div className="group relative">
            <div 
              className="absolute -inset-1 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)'
              }}
            ></div>
            <div 
              className="relative rounded-3xl overflow-hidden transform group-hover:scale-105 transition-all duration-500 shadow-2xl"
              style={{
                background: 'rgba(17, 24, 39, 0.95)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div 
                className="px-10 py-8"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)'
                }}
              >
                <h3 className="text-3xl font-black text-white flex items-center">
                  <Star className="w-10 h-10 mr-4" />
                  Demostración Interactiva
                </h3>
                <p className="text-purple-100 mt-3 text-lg font-medium">
                  Explora las funcionalidades con datos de ejemplo
                </p>
              </div>
              
              <div className="p-10 text-center">
                <div 
                  className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-12 transform hover:scale-110 hover:rotate-12 transition-all duration-500"
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Sparkles className="w-16 h-16 text-purple-400" />
                </div>
                
                <h4 className="text-3xl font-black text-white mb-6">
                  ¿Quieres ver cómo funciona?
                </h4>
                <p className="text-blue-200 mb-12 text-xl leading-relaxed font-medium">
                  Genera un informe de demostración con datos de ejemplo 
                  para explorar todas las funcionalidades del sistema.
                </p>
                
                <div 
                  className="rounded-2xl p-8 mb-12 border"
                  style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(139, 92, 246, 0.3)'
                  }}
                >
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
                  <div 
                    className="absolute -inset-1 rounded-2xl blur opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)'
                    }}
                  ></div>
                  <Button 
                    onClick={handleDemoReport}
                    disabled={loading}
                    className="relative w-full py-6 text-xl font-black shadow-2xl transition-all duration-500 transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #ef4444 100%)',
                      boxShadow: '0 10px 25px rgba(139, 92, 246, 0.5)'
                    }}
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

        {/* Error Display */}
        {error && (
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative">
              <div 
                className="absolute -inset-1 rounded-3xl blur opacity-75"
                style={{
                  background: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)'
                }}
              ></div>
              <div 
                className="relative rounded-3xl p-10 border"
                style={{
                  background: 'rgba(153, 27, 27, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(239, 68, 68, 0.3)'
                }}
              >
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
      </div>

      {/* Footer */}
      <footer 
        className="relative z-10 py-20 mt-32"
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #000000 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8"
            style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'
            }}
          >
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 
            className="text-4xl font-black mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Secretaría de Infraestructura Física
          </h3>
          <p className="text-blue-300 text-xl font-medium mb-8">
            Alcaldía de Medellín • 2025 • Sistema de Generación de Informes Técnicos
          </p>
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-blue-400 font-medium">
              Desarrollado con tecnología de inteligencia artificial para optimizar los procesos de infraestructura urbana
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
