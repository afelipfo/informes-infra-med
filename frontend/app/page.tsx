'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simular carga inicial para animaciones
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
                className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30 focus-ring"
                aria-current="page"
              >
                🏠 Inicio
              </Link>
              <Link
                href="/generate-report"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-smooth text-gray-300 hover:text-white hover:bg-white/10 focus-ring"
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
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Hero Section - Mejorado */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-8 animate-float depth-3">
            <span className="text-4xl" role="img" aria-label="Construcción">🏗️</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-blue animate-glow">
            Sistema de Informes
          </h1>
          
          <h2 className="text-2xl md:text-4xl text-blue-200 mb-8 font-light">
            Secretaría de Infraestructura Física
          </h2>
          
          <div className="inline-flex items-center px-6 py-3 glass rounded-full border border-blue-400/30 mb-8 animate-scale-in">
            <span className="text-blue-200 text-lg">🏛️ Alcaldía de Medellín</span>
          </div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Genera informes técnicos automáticos para contratos de Urgencia Manifiesta con 
            <span className="text-gradient-blue font-semibold"> análisis inteligente</span> y 
            <span className="text-gradient-purple font-semibold"> resultados instantáneos</span>.
          </p>
        </div>

        {/* Action Buttons - Optimizados */}
        <div className="flex flex-col gap-8 justify-center items-center mb-20">
          <Link 
            href="/generate-report" 
            className="relative px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl text-decoration-none transition-smooth transform scale-100 hover:scale-105 hover:-translate-y-2 hover:shadow-blue-500/25 flex items-center gap-4 min-w-[300px] justify-center group focus-ring depth-3"
            aria-label="Generar nuevo informe técnico"
          >
            <div className="text-5xl animate-bounce" role="img" aria-label="Gráfico">📊</div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Generar Nuevo Informe</div>
              <div className="text-blue-200 text-sm">Análisis automático de datos</div>
            </div>
          </Link>
          
          <Link 
            href="/reports" 
            className="relative px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-2xl text-decoration-none transition-smooth transform scale-100 hover:scale-105 hover:-translate-y-2 hover:shadow-emerald-500/25 flex items-center gap-4 min-w-[300px] justify-center group focus-ring depth-3"
            aria-label="Ver informes anteriores"
          >
            <div className="text-5xl animate-pulse" role="img" aria-label="Lista">📋</div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">Ver Informes Anteriores</div>
              <div className="text-emerald-200 text-sm">Historial y análisis</div>
            </div>
          </Link>
        </div>

        {/* Features Grid - Optimizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="glass rounded-2xl p-8 border border-blue-400/20 transition-smooth hover:scale-105 hover:border-blue-400/40 cursor-pointer focus-ring depth-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-6xl mb-6 animate-float" role="img" aria-label="Robot">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Análisis Inteligente</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento automático con <span className="text-gradient-blue font-semibold">IA avanzada</span> que detecta patrones y genera alertas por severidad en tiempo real.
            </p>
            <div className="flex gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
          
          <div className="glass rounded-2xl p-8 border border-purple-400/20 transition-smooth hover:scale-105 hover:border-purple-400/40 cursor-pointer focus-ring depth-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '2s' }} role="img" aria-label="Rayo">⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Resultados Instantáneos</h3>
            <p className="text-gray-300 leading-relaxed">
              Obtén informes técnicos completos en <span className="text-gradient-purple font-semibold">segundos</span> con análisis presupuestal, cronograma y recomendaciones detalladas.
            </p>
            <div className="text-3xl mt-4 animate-spin" role="img" aria-label="Cargando">🔄</div>
          </div>
          
          <div className="glass rounded-2xl p-8 border border-emerald-400/20 transition-smooth hover:scale-105 hover:border-emerald-400/40 cursor-pointer focus-ring depth-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-6xl mb-6 animate-float" style={{ animationDelay: '4s' }} role="img" aria-label="Escudo">🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Seguro y Confiable</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento <span className="text-emerald-400 font-semibold">100% local</span> sin comprometer la seguridad de tus datos. Cumple con estándares de gobierno.
            </p>
            <div className="text-3xl mt-4 animate-pulse" role="img" aria-label="Escudo de seguridad">🛡️</div>
          </div>
        </div>

        {/* Stats Section - Optimizado */}
        <div className="glass rounded-2xl p-8 border border-blue-400/20 mb-16 animate-scale-in">
          <h3 className="text-2xl font-bold text-center text-white mb-8">📈 Estadísticas del Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center transition-smooth hover:scale-105">
              <div className="text-4xl font-bold text-gradient-blue mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Precisión</div>
            </div>
            <div className="text-center transition-smooth hover:scale-105">
              <div className="text-4xl font-bold text-gradient-purple mb-2">&lt;2s</div>
              <div className="text-gray-300 text-sm">Tiempo de Respuesta</div>
            </div>
            <div className="text-center transition-smooth hover:scale-105">
              <div className="text-4xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Disponibilidad</div>
            </div>
            <div className="text-center transition-smooth hover:scale-105">
              <div className="text-4xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">Seguro</div>
            </div>
          </div>
        </div>

        {/* Footer - Optimizado */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-full border border-blue-400/30">
            <span className="text-blue-200" role="img" aria-label="Cohete">🚀</span>
            <span className="text-blue-200">Powered by Advanced AI Technology</span>
            <span className="text-blue-200" role="img" aria-label="Cohete">🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
}