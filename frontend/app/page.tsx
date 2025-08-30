'use client'

import { useState, useRef, useEffect } from 'react'

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [reportTitle, setReportTitle] = useState('Análisis de Infraestructura - Medellín 2025')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const API_BASE = 'http://localhost:8000'

  // Verificar conexión al backend
  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/`)
      if (response.ok) {
        setConnectionStatus('✅ Sistema conectado y operativo')
        setError('')
        return true
      } else {
        throw new Error('Backend no responde')
      }
    } catch (err) {
      setConnectionStatus('❌ Error: Backend desconectado')
      setError('Verifica que el servidor esté ejecutándose en puerto 8000')
      return false
    }
  }

  useEffect(() => {
    checkConnection()
    const interval = setInterval(checkConnection, 30000) // Verificar cada 30 segundos
    return () => clearInterval(interval)
  }, [])

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setError('')
    setSuccess(`✅ Archivo "${selectedFile.name}" cargado correctamente`)
    setResult(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.type.includes('sheet') || droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.csv')) {
        handleFileSelect(droppedFile)
      } else {
        setError('❌ Formato no válido. Solo se aceptan archivos Excel (.xlsx, .xls) o CSV')
      }
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
      setError('❌ Por favor selecciona un archivo primero')
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
      setSuccess('🎉 ¡Informe generado exitosamente!')
    } catch (err: any) {
      setError(`❌ Error al generar informe: ${err.message}`)
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
      setSuccess('🎯 ¡Demostración completada exitosamente!')
    } catch (err: any) {
      setError(`❌ Error en demostración: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadReport = () => {
    if (result) {
      const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${reportTitle.toLowerCase().replace(/\s+/g, '-')}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #1e88e5 50%, #2196f3 75%, #ffffff 100%)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header Futurista */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(255, 107, 53, 0.3)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ff6b35, #1e88e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            🏗️ Generador de Informes Técnicos IA
          </h1>
          <div style={{
            background: connectionStatus.includes('✅') ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)',
            border: `1px solid ${connectionStatus.includes('✅') ? '#27ae60' : '#e74c3c'}`,
            color: connectionStatus.includes('✅') ? '#27ae60' : '#e74c3c',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            {connectionStatus}
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 2rem'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontSize: '3.5rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #ff6b35, #1e88e5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            Análisis Inteligente de Infraestructura
          </h2>
          <p style={{
            fontSize: '1.3rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            Secretaría de Infraestructura Física - Alcaldía de Medellín
          </p>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
            animation: 'pulse 2s infinite'
          }}>
            🤖 Potenciado por Inteligencia Artificial
          </div>
        </div>

        {/* Panel Principal */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '30px',
          padding: '3rem',
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem'
          }}>
            
            {/* Sección de Carga de Archivos */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ff6b35, #1e88e5)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontSize: '1.5rem'
                }}>
                  📁
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Cargar Datos
                  </h3>
                  <p style={{
                    color: '#5a6c7d',
                    margin: '0.2rem 0 0 0'
                  }}>
                    Excel o CSV para análisis
                  </p>
                </div>
              </div>

              <div
                style={{
                  border: file ? '3px solid #27ae60' : '3px dashed rgba(30, 136, 229, 0.4)',
                  borderRadius: '20px',
                  padding: '3rem',
                  textAlign: 'center',
                  background: file ? 'rgba(46, 204, 113, 0.05)' : 'rgba(30, 136, 229, 0.05)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: file ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #ff6b35, #1e88e5)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem'
                }}>
                  {file ? '✅' : '📤'}
                </div>
                <p style={{
                  color: '#2c3e50',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}>
                  {file ? 'Archivo Cargado' : 'Arrastra tu archivo aquí'}
                </p>
                <p style={{
                  color: '#5a6c7d',
                  fontSize: '1rem'
                }}>
                  {file ? file.name : 'o haz clic para seleccionar (Excel, CSV)'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  style={{ display: 'none' }}
                />
              </div>

              {file && (
                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(46, 204, 113, 0.1)',
                  borderRadius: '15px',
                  border: '1px solid rgba(46, 204, 113, 0.2)'
                }}>
                  <p style={{ color: '#27ae60', margin: '0 0 0.5rem 0', fontWeight: '600' }}>
                    📄 <strong>Archivo:</strong> {file.name}
                  </p>
                  <p style={{ color: '#27ae60', margin: 0 }}>
                    📏 <strong>Tamaño:</strong> {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              )}
            </div>

            {/* Sección de Configuración y Acciones */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #f7931e, #1e88e5)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  fontSize: '1.5rem'
                }}>
                  ⚙️
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    margin: 0
                  }}>
                    Configuración
                  </h3>
                  <p style={{
                    color: '#5a6c7d',
                    margin: '0.2rem 0 0 0'
                  }}>
                    Personaliza tu informe
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  color: '#2c3e50',
                  fontWeight: '600',
                  marginBottom: '0.8rem',
                  fontSize: '1.1rem'
                }}>
                  📝 Título del Informe
                </label>
                <input
                  type="text"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e3e3e3',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: '#2c3e50',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1e88e5'}
                  onBlur={(e) => e.target.style.borderColor = '#e3e3e3'}
                />
              </div>

              <button
                onClick={generateReport}
                disabled={!file || isLoading}
                style={{
                  width: '100%',
                  background: file && !isLoading 
                    ? 'linear-gradient(135deg, #ff6b35, #1e88e5)' 
                    : 'linear-gradient(135deg, #bdc3c7, #95a5a6)',
                  border: 'none',
                  color: 'white',
                  padding: '1.2rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  cursor: file && !isLoading ? 'pointer' : 'not-allowed',
                  marginBottom: '1rem',
                  boxShadow: file && !isLoading ? '0 10px 25px rgba(255, 107, 53, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  transform: isLoading ? 'scale(0.98)' : 'scale(1)'
                }}
              >
                {isLoading ? '🔄 Generando Informe...' : '⚡ GENERAR INFORME'}
              </button>

              <button
                onClick={runDemo}
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: isLoading 
                    ? 'linear-gradient(135deg, #bdc3c7, #95a5a6)' 
                    : 'linear-gradient(135deg, #f7931e, #1e88e5)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: !isLoading ? '0 8px 20px rgba(247, 147, 30, 0.3)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                {isLoading ? '🔄 Procesando...' : '🎯 Probar Demostración'}
              </button>
            </div>
          </div>
        </div>

        {/* Mensajes de Estado */}
        {error && (
          <div style={{
            background: 'rgba(231, 76, 60, 0.15)',
            border: '2px solid rgba(231, 76, 60, 0.3)',
            color: '#c0392b',
            padding: '1.5rem',
            borderRadius: '15px',
            marginTop: '2rem',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: 'rgba(46, 204, 113, 0.15)',
            border: '2px solid rgba(46, 204, 113, 0.3)',
            color: '#27ae60',
            padding: '1.5rem',
            borderRadius: '15px',
            marginTop: '2rem',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            {success}
          </div>
        )}

        {/* Resultados del Informe */}
        {result && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '25px',
            padding: '3rem',
            marginTop: '3rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
            border: '2px solid rgba(30, 136, 229, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                color: '#1e88e5',
                fontSize: '2rem',
                fontWeight: 'bold',
                margin: 0
              }}>
                📊 Resultados del Análisis
              </h3>
              <button
                onClick={downloadReport}
                style={{
                  background: 'linear-gradient(135deg, #ff6b35, #1e88e5)',
                  border: 'none',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)'
                }}
              >
                📥 Descargar Informe
              </button>
            </div>
            
            {result.sections?.map((section: any, index: number) => (
              <div key={index} style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                background: `linear-gradient(135deg, rgba(30, 136, 229, 0.05), rgba(255, 107, 53, 0.05))`,
                borderRadius: '15px',
                borderLeft: '5px solid #1e88e5'
              }}>
                <h4 style={{
                  color: '#1e88e5',
                  marginBottom: '1rem',
                  fontSize: '1.3rem',
                  fontWeight: 'bold'
                }}>
                  🔍 {section.title}
                </h4>
                <pre style={{
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Monaco, "Lucida Console", monospace',
                  color: '#2c3e50',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  background: 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem',
                  borderRadius: '10px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(section.data, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          marginTop: '4rem'
        }}>
          <p style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            © 2025 Secretaría de Infraestructura Física - Alcaldía de Medellín
          </p>
          <p style={{
            marginTop: '0.5rem',
            fontSize: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}>
            🚀 Sistema de Generación de Informes Técnicos con Inteligencia Artificial
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}