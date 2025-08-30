'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Report {
  id: string
  title: string
  date: string
  status: 'completed' | 'processing' | 'error'
  type: string
  size: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  // Simular carga de datos
  useEffect(() => {
    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Informe Contrato Urgencia Manifiesta - Vías',
        date: '2025-01-15',
        status: 'completed',
        type: 'Excel',
        size: '2.3 MB'
      },
      {
        id: '2',
        title: 'Análisis Presupuestal - Infraestructura',
        date: '2025-01-14',
        status: 'completed',
        type: 'CSV',
        size: '1.8 MB'
      },
      {
        id: '3',
        title: 'Reporte Técnico - Construcción',
        date: '2025-01-13',
        status: 'processing',
        type: 'Excel',
        size: '3.1 MB'
      },
      {
        id: '4',
        title: 'Evaluación Cronograma - Obras',
        date: '2025-01-12',
        status: 'error',
        type: 'CSV',
        size: '1.2 MB'
      }
    ]

    setTimeout(() => {
      setReports(mockReports)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30 text-green-200'
      case 'processing':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-200'
      case 'error':
        return 'bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-400/30 text-red-200'
      default:
        return 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-400/30 text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'processing':
        return '🔄'
      case 'error':
        return '❌'
      default:
        return '❓'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mb-6 animate-float">
            <span className="text-2xl">📋</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
            Informes Anteriores
          </h1>
          
          <p className="text-xl text-emerald-200 font-light">
            Historial y análisis de informes generados
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl animate-pulse-slow">📊</div>
              <div>
                <div className="text-2xl font-bold text-white">{reports.length}</div>
                <div className="text-blue-200 text-sm">Total Informes</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-400/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl animate-float">✅</div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {reports.filter(r => r.status === 'completed').length}
                </div>
                <div className="text-green-200 text-sm">Completados</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl animate-spin-slow">🔄</div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {reports.filter(r => r.status === 'processing').length}
                </div>
                <div className="text-blue-200 text-sm">Procesando</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-400/20">
            <div className="flex items-center space-x-4">
              <div className="text-3xl animate-pulse-slow">❌</div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {reports.filter(r => r.status === 'error').length}
                </div>
                <div className="text-red-200 text-sm">Con Errores</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-semibold mb-2">🔍 Buscar Informes</label>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-white font-semibold mb-2">📊 Filtrar por Estado</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos los estados</option>
                <option value="completed">Completados</option>
                <option value="processing">Procesando</option>
                <option value="error">Con errores</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 animate-spin">
                <span className="text-2xl">🔄</span>
              </div>
              <p className="text-blue-200 text-lg">Cargando informes...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-float">📭</div>
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron informes</h3>
              <p className="text-gray-400 mb-6">No hay informes que coincidan con los filtros aplicados</p>
              <Link
                href="/generate-report"
                className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>📊</span>
                <span>Generar Nuevo Informe</span>
              </Link>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl animate-float">📄</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">📅</span>
                            <span className="text-gray-300">{report.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">📁</span>
                            <span className="text-gray-300">{report.type}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">💾</span>
                            <span className="text-gray-300">{report.size}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">🆔</span>
                            <span className="text-gray-300">#{report.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className={`px-4 py-2 rounded-xl border ${getStatusColor(report.status)}`}>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getStatusIcon(report.status)}</span>
                        <span className="font-semibold capitalize">{report.status}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                        <span className="text-lg">👁️</span>
                      </button>
                      <button className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                        <span className="text-lg">📥</span>
                      </button>
                      <button className="p-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                        <span className="text-lg">🗑️</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <Link
            href="/generate-report"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-glow"
          >
            <span className="text-2xl animate-bounce-slow">📊</span>
            <span className="text-xl">Generar Nuevo Informe</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
            <span className="text-emerald-200">🏛️</span>
            <span className="text-emerald-200">Secretaría de Infraestructura Física - Alcaldía de Medellín</span>
            <span className="text-emerald-200">🏛️</span>
          </div>
          <p className="text-gray-400 text-sm mt-4">Sistema de Gestión de Informes Técnicos con IA Avanzada</p>
        </div>
      </div>
    </div>
  )
}
