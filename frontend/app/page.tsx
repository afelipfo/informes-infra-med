'use client'

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🏗️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Sistema de Informes
                </h1>
                <p className="text-xs text-gray-400">Infraestructura Medellín</p>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30"
              >
                🏠 Inicio
              </Link>
              <Link
                href="/generate-report"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10"
              >
                📊 Generar Informe
              </Link>
              <Link
                href="/reports"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10"
              >
                📋 Ver Informes
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 animate-float">
          <span className="text-4xl">🏗️</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent animate-glow">
          Sistema de Informes
        </h1>
        
        <h2 className="text-2xl md:text-4xl text-blue-200 mb-8 font-light">
          Secretaría de Infraestructura Física
        </h2>
        
        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full border border-blue-400/30 mb-8">
          <span className="text-blue-200 text-lg">🏛️ Alcaldía de Medellín</span>
        </div>
        
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Genera informes técnicos automáticos para contratos de Urgencia Manifiesta con 
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-semibold"> análisis inteligente</span> y 
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-semibold"> resultados instantáneos</span>.
        </p>
      </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-8 justify-center items-center mb-20">
          <Link 
            href="/generate-report" 
            className="relative px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl text-decoration-none transition-all duration-300 transform scale-100 hover:scale-105 hover:-translate-y-2 hover:shadow-blue-500/25 flex items-center gap-4 min-w-[300px] justify-center group"
          >
            <div className="text-5xl animate-bounce">📊</div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Generar Nuevo Informe</div>
              <div className="text-blue-200 text-sm">Análisis automático de datos</div>
            </div>
          </Link>
          
          <Link 
            href="/reports" 
            className="relative px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-2xl text-decoration-none transition-all duration-300 transform scale-100 hover:scale-105 hover:-translate-y-2 hover:shadow-emerald-500/25 flex items-center gap-4 min-w-[300px] justify-center group"
          >
            <div className="text-5xl animate-pulse">📋</div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Ver Informes Anteriores</div>
              <div className="text-emerald-200 text-sm">Historial y análisis</div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 transition-all duration-300 hover:scale-105 hover:border-blue-400/40 cursor-pointer">
            <div className="text-6xl mb-6 animate-float">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Análisis Inteligente</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento automático con <span className="text-cyan-400 font-semibold">IA avanzada</span> que detecta patrones y genera alertas por severidad en tiempo real.
            </p>
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 transition-all duration-300 hover:scale-105 hover:border-purple-400/40 cursor-pointer">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2s' }}>⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Resultados Instantáneos</h3>
            <p className="text-gray-300 leading-relaxed">
              Obtén informes técnicos completos en <span className="text-pink-400 font-semibold">segundos</span> con análisis presupuestal, cronograma y recomendaciones detalladas.
            </p>
            <div className="text-3xl mt-4 animate-spin">🔄</div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-lg rounded-2xl p-8 border border-emerald-400/20 transition-all duration-300 hover:scale-105 hover:border-emerald-400/40 cursor-pointer">
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '4s' }}>🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Seguro y Confiable</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento <span className="text-emerald-400 font-semibold">100% local</span> sin comprometer la seguridad de tus datos. Cumple con estándares de gobierno.
            </p>
            <div className="text-3xl mt-4 animate-pulse">🛡️</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 mb-16">
          <h3 className="text-2xl font-bold text-center text-white mb-8">📈 Estadísticas del Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Precisión</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">&lt;2s</div>
              <div className="text-gray-300 text-sm">Tiempo de Respuesta</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">Seguro</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-full border border-blue-400/30">
            <span className="text-blue-200">🚀</span>
            <span className="text-blue-200">Powered by Advanced AI Technology</span>
            <span className="text-blue-200">🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
}