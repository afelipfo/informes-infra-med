'use client'

import { useState, useRef, useEffect } from 'react'

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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  // Verificar conexión con el backend
  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/`)
      if (response.ok) {
        setConnectionStatus('✅ Conectado al backend')
        setError('')
        return true
      } else {
        throw new Error('Backend not responding')
      }
    } catch (err) {
      setConnectionStatus('❌ Error de conexión con el backend')
      setError('Verifica que el servidor esté corriendo en puerto 8000')
      return false
    }
  }

  useEffect(() => {
    checkConnection()
  }, [])

  const handleFileSelect = (selectedFile: File) => {
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

    const isConnected = await checkConnection()
    if (!isConnected) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch(`${API_BASE}/api/v1/reports/generate`, {
        method: 'POST',
        body: formData
      })

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
    }
  }

  const runDemo = async () => {
    const isConnected = await checkConnection()
    if (!isConnected) return

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`${API_BASE}/api/v1/reports/generate-demo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

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
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 text-center shadow-lg">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Generador de Informes Técnicos
          </h1>
          <p className="text-xl text-gray-600">
            Sistema de Análisis de Infraestructura - Medellín
          </p>
        </div>

        {/* Connection Status */}
        {connectionStatus && (
          <div className={`p-4 rounded-lg mb-6 text-center ${
            connectionStatus.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {connectionStatus}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* File Upload Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📁 Cargar Archivo
            </h2>
            <p className="text-gray-600 mb-4">
              Sube tu archivo Excel o CSV para generar el informe
            </p>

            <div
              className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-4xl mb-4">📤</div>
              <p className="text-gray-700 mb-2">
                Arrastra y suelta tu archivo aquí
              </p>
              <p className="text-gray-500 text-sm">
                o haz clic para seleccionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p><strong>Archivo:</strong> {file.name}</p>
                <p><strong>Tamaño:</strong> {(file.size / 1024).toFixed(1)} KB</p>
                <p><strong>Tipo:</strong> {file.type}</p>
              </div>
            )}
          </div>

          {/* Controls Card */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⚙️ Acciones
            </h2>

            <button
              onClick={generateReport}
              disabled={!file || isLoading}
              className={`w-full mb-4 p-4 rounded-lg font-semibold text-white transition-colors ${
                file && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isLoading ? '🔄 Generando...' : '⚡ Generar Informe'}
            </button>

            <button
              onClick={runDemo}
              disabled={isLoading}
              className={`w-full p-4 rounded-lg font-semibold text-white transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }`}
            >
              {isLoading ? '🔄 Cargando...' : '🎯 Probar Demostración'}
            </button>

            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>💡 Tip:</strong> Usa la demostración para probar el sistema sin cargar archivos
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 p-4 rounded-lg mb-6">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
            ✅ {success}
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              📊 Resultado del Informe
            </h3>
            
            {result.sections?.map((section: any, index: number) => (
              <div key={index} className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-blue-700 mb-2">
                  {section.title}
                </h4>
                <div className="bg-white p-3 rounded border">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify(section.data, null, 2)}
                  </pre>
                </div>
                {section.message && (
                  <div className={`mt-3 p-3 rounded ${
                    section.message.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    section.message.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    <strong>{section.message.severity}:</strong> {section.message.message}
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'informe-tecnico.json'
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                📥 Descargar JSON
              </button>

              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => {
                  setResult(null)
                  setSuccess('')
                  setError('')
                }}
              >
                🔄 Nuevo Informe
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 text-gray-600">
          <p>&copy; 2025 Secretaría de Infraestructura Física - Alcaldía de Medellín</p>
          <p className="text-sm mt-2">Sistema de Generación de Informes Técnicos con IA</p>
        </div>
      </div>
    </div>
  )
}
