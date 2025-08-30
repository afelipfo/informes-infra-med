'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface ReportResult {
  sections: Array<{
    title: string
    data: any
    message?: {
      severity: 'INFO' | 'WARNING' | 'CRITICAL'
      message: string
    }
  }>
}

export default function GenerateReportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ReportResult | null>(null)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [isConnected, setIsConnected] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  // Verificar conexión con el backend - Optimizado
  const checkConnection = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout
      
      const response = await fetch(`${API_BASE}/api/v1/health`, {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        setConnectionStatus('✅ Conectado al backend')
        setIsConnected(true)
        setError('')
        return true
      } else {
        throw new Error('Backend not responding')
      }
    } catch (err: any) {
      setConnectionStatus('❌ Error de conexión con el backend')
      setIsConnected(false)
      setError('Verifica que el servidor esté corriendo en puerto 8000')
      return false
    }
  }

  useEffect(() => {
    checkConnection()
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleFileSelect = (selectedFile: File) => {
    // Validación mejorada de archivos
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/csv'
    ]
    
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (!allowedTypes.includes(selectedFile.type) && !selectedFile.name.match(/\.(xlsx|xls|csv)$/i)) {
      setError('Tipo de archivo no válido. Solo se permiten archivos Excel (.xlsx, .xls) o CSV (.csv)')
      return
    }
    
    if (selectedFile.size > maxSize) {
      setError('El archivo es demasiado grande. Máximo 10MB permitido')
      return
    }
    
    setFile(selectedFile)
    setError('')
    setSuccess('Archivo cargado correctamente')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileSelect(droppedFile)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }

  const generateReport = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo primero')
      return
    }

    if (!isConnected) {
      const connected = await checkConnection()
      if (!connected) return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch(`${API_BASE}/api/v1/reports/generate`, {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      setResult(data)
      setSuccess('¡Informe generado exitosamente!')
    } catch (err: any) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  const runDemo = async () => {
    if (!isConnected) {
      const connected = await checkConnection()
      if (!connected) return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')
    setUploadProgress(0)

    try {
      // Simular progreso de carga
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 15, 90))
      }, 300)

      const response = await fetch(`${API_BASE}/api/v1/reports/generate-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      setResult(data)
      setSuccess('¡Demostración completada exitosamente!')
    } catch (err: any) {
      setError(`Error: ${err.message}`)
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements - Optimizados */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation - Optimizada */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-purple-500/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Mejorado */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group focus-ring transition-smooth"
              aria-label="Ir al inicio"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 depth-2">
                <span className="text-2xl" role="img" aria-label="Construcción">🏗️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gradient-blue">
                  Sistema de Informes
                </h1>
                <p className="text-xs text-gray-400">Infraestructura Medellín</p>
              </div>
            </Link>

            {/* Navigation Links - Mejorados */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth text-gray-300 hover:text-white hover:bg-white/10 focus-ring"
              >
                🏠 Inicio
              </Link>
              <Link
                href="/generate-report"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-400/30 focus-ring"
                aria-current="page"
              >
                📊 Generar Informe
              </Link>
              <Link
                href="/reports"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth text-gray-300 hover:text-white hover:bg-white/10 focus-ring"
              >
                📋 Ver Informes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content - Optimizado */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header - Mejorado */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-blue-400/30">
            <span className="text-4xl" role="img" aria-label="Gráfico">📊</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient-blue">
            Generador de Informes
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Sistema de Análisis Inteligente - Medellín
          </p>
        </div>

        {/* Connection Status - Mejorado */}
        {connectionStatus && (
          <div className={`p-4 rounded-2xl mb-8 text-center glass border transition-smooth ${
            isConnected
              ? 'border-green-400/30 text-green-200' 
              : 'border-red-400/30 text-red-200'
          }`}>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl" role="img" aria-label={isConnected ? "Conectado" : "Desconectado"}>
                {isConnected ? '🟢' : '🔴'}
              </span>
              <span className="text-lg">{connectionStatus}</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* File Upload Card - Optimizado */}
          <div className="glass rounded-3xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-smooth depth-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl animate-bounce-slow" role="img" aria-label="Carpeta">📁</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Cargar Archivo</h2>
                <p className="text-blue-200 text-sm">Excel o CSV con datos del contrato</p>
              </div>
            </div>

            <div
              className="border-2 border-dashed border-blue-400/50 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-400 transition-smooth hover:bg-blue-500/10 group focus-ring"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Arrastra y suelta archivos aquí o haz clic para seleccionar"
            >
              <div className="text-6xl mb-4 animate-float" role="img" aria-label="Subir">📤</div>
              <p className="text-white text-lg mb-2 group-hover:text-blue-200 transition-colors">
                Arrastra y suelta tu archivo aquí
              </p>
              <p className="text-blue-300 text-sm">
                o haz clic para seleccionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
                className="hidden"
                aria-label="Seleccionar archivo"
              />
            </div>

            {file && (
              <div className="mt-6 p-4 glass rounded-2xl border border-blue-400/30 animate-scale-in">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl" role="img" aria-label="Documento">📄</span>
                  <span className="text-white font-semibold">{file.name}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-blue-200">
                  <div>
                    <span className="font-semibold">Tamaño:</span> {(file.size / 1024).toFixed(1)} KB
                  </div>
                  <div>
                    <span className="font-semibold">Tipo:</span> {file.type || 'Archivo'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Controls Card - Optimizado */}
          <div className="glass rounded-3xl p-8 border border-emerald-400/20 hover:border-emerald-400/40 transition-smooth depth-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-3xl animate-pulse-slow" role="img" aria-label="Configuración">⚙️</div>
              <div>
                <h2 className="text-2xl font-bold text-white">Acciones</h2>
                <p className="text-emerald-200 text-sm">Genera tu informe ahora</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={generateReport}
                disabled={!file || isLoading}
                className={`w-full p-6 rounded-2xl font-bold text-white transition-smooth transform hover:scale-105 focus-ring ${
                  file && !isLoading
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-glow cursor-pointer depth-2'
                    : 'bg-gray-600 cursor-not-allowed'
                }`}
                aria-label={file && !isLoading ? "Generar informe con el archivo cargado" : "Selecciona un archivo primero"}
              >
                <div className="flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin text-2xl" role="img" aria-label="Cargando">🔄</div>
                      <span className="text-xl">Generando...</span>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl animate-bounce-slow" role="img" aria-label="Rayo">⚡</div>
                      <span className="text-xl">Generar Informe</span>
                    </>
                  )}
                </div>
              </button>

              <button
                onClick={runDemo}
                disabled={isLoading}
                className={`w-full p-6 rounded-2xl font-bold text-white transition-smooth transform hover:scale-105 focus-ring ${
                  isLoading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-glow cursor-pointer depth-2'
                }`}
                aria-label={isLoading ? "Procesando..." : "Probar demostración con datos de ejemplo"}
              >
                <div className="flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <div className="animate-spin text-2xl" role="img" aria-label="Cargando">🔄</div>
                      <span className="text-xl">Cargando...</span>
                    </>
                  ) : (
                    <>
                      <div className="text-2xl animate-pulse-slow" role="img" aria-label="Objetivo">🎯</div>
                      <span className="text-xl">Probar Demostración</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Progress Bar - Nuevo */}
            {isLoading && uploadProgress > 0 && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Procesando...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 glass rounded-2xl border border-yellow-400/30">
              <div className="flex items-center space-x-3">
                <span className="text-2xl" role="img" aria-label="Consejo">💡</span>
                <p className="text-yellow-200 text-sm">
                  <strong>Tip:</strong> Usa la demostración para probar el sistema sin cargar archivos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages - Optimizados */}
        {error && (
          <div className="glass border border-red-400/30 text-red-200 p-6 rounded-2xl mb-8 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <span className="text-2xl" role="img" aria-label="Error">❌</span>
              <span className="text-lg">{error}</span>
            </div>
          </div>
        )}

        {success && (
          <div className="glass border border-green-400/30 text-green-200 p-6 rounded-2xl mb-8 animate-fade-in-up">
            <div className="flex items-center space-x-3">
              <span className="text-2xl" role="img" aria-label="Éxito">✅</span>
              <span className="text-lg">{success}</span>
            </div>
          </div>
        )}

        {/* Results - Optimizado */}
        {result && (
          <div className="glass rounded-3xl p-8 border border-blue-400/20 animate-scale-in">
            <div className="flex items-center space-x-4 mb-8">
              <div className="text-4xl animate-float" role="img" aria-label="Robot">🤖</div>
              <div>
                <h3 className="text-3xl font-bold text-white">Informe Inteligente Generado</h3>
                <p className="text-blue-200">Análisis técnico con IA avanzada</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {result.sections?.map((section: any, index: number) => (
                <div key={index} className={`glass rounded-2xl p-6 border transition-smooth hover:scale-[1.02] ${
                  section.title.includes('IA') || section.title.includes('🤖') || section.title.includes('🔮') || section.title.includes('🚨') || section.title.includes('🧠') || section.title.includes('💡')
                    ? 'border-purple-400/30'
                    : 'border-blue-400/30'
                }`}>
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
                    <span className="text-2xl" role="img" aria-label="Sección">
                      {section.title.includes('IA') ? '🤖' : 
                       section.title.includes('Predictivo') ? '🔮' :
                       section.title.includes('Anomalías') ? '🚨' :
                       section.title.includes('Insights') ? '🧠' :
                       section.title.includes('Recomendaciones') ? '💡' : '📋'}
                    </span>
                    <span>{section.title}</span>
                  </h4>
                  
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/50 mb-4">
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(section.data, null, 2)}
                    </pre>
                  </div>
                  
                  {section.message && (
                    <div className={`p-4 rounded-xl border transition-smooth ${
                      section.message.severity === 'CRITICAL' ? 'bg-red-500/20 border-red-400/30 text-red-200' :
                      section.message.severity === 'WARNING' ? 'bg-yellow-500/20 border-yellow-400/30 text-yellow-200' :
                      'bg-blue-500/20 border-blue-400/30 text-blue-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <span className="text-xl" role="img" aria-label={section.message.severity}>
                          {section.message.severity === 'CRITICAL' ? '🚨' :
                           section.message.severity === 'WARNING' ? '⚠️' : 'ℹ️'}
                        </span>
                        <div>
                          <strong>{section.message.severity}:</strong> {section.message.message}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl transition-smooth transform hover:scale-105 shadow-lg hover:shadow-glow focus-ring"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'informe-tecnico.json'
                  a.click()
                  URL.revokeObjectURL(url)
                }}
                aria-label="Descargar informe en formato JSON"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl" role="img" aria-label="Descargar">📥</span>
                  <span>Descargar JSON</span>
                </div>
              </button>

              <button
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition-smooth transform hover:scale-105 shadow-lg hover:shadow-glow focus-ring"
                onClick={() => {
                  setResult(null)
                  setSuccess('')
                  setError('')
                }}
                aria-label="Generar nuevo informe"
              >
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl" role="img" aria-label="Nuevo">🔄</span>
                  <span>Nuevo Informe</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Footer - Optimizado */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-4 px-8 py-4 glass rounded-full border border-blue-400/30">
            <span className="text-blue-200" role="img" aria-label="Edificio">🏛️</span>
            <span className="text-blue-200">Secretaría de Infraestructura Física - Alcaldía de Medellín</span>
            <span className="text-blue-200" role="img" aria-label="Edificio">🏛️</span>
          </div>
          <p className="text-gray-400 text-sm mt-4">Sistema de Generación de Informes Técnicos con IA Avanzada</p>
        </div>
      </div>
    </div>
  )
}
