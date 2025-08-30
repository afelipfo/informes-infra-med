import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 animate-float">
            <span className="text-3xl">🏗️</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-glow">
            Sistema de Informes
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-blue-200 mb-8 font-light">
            Secretaría de Infraestructura Física
          </h2>
          
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
            <span className="text-blue-200 text-lg">🏛️ Alcaldía de Medellín</span>
          </div>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mt-12 leading-relaxed">
            Genera informes técnicos automáticos para contratos de Urgencia Manifiesta con 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold"> análisis inteligente</span> y 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold"> resultados instantáneos</span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-20">
          <Link 
            href="/generate-report" 
            className="group relative px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="text-3xl animate-bounce-slow">📊</div>
              <div className="text-left">
                <div className="text-white font-bold text-xl">Generar Nuevo Informe</div>
                <div className="text-blue-100 text-sm">Análisis automático de datos</div>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/reports" 
            className="group relative px-8 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-4">
              <div className="text-3xl animate-pulse-slow">📋</div>
              <div className="text-left">
                <div className="text-white font-bold text-xl">Ver Informes Anteriores</div>
                <div className="text-emerald-100 text-sm">Historial y análisis</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-6 animate-float">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Análisis Inteligente</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento automático con <span className="text-cyan-400 font-semibold">IA avanzada</span> que detecta patrones y genera alertas por severidad en tiempo real.
            </p>
            <div className="mt-4 flex space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-1000"></div>
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse animation-delay-2000"></div>
            </div>
          </div>
          
          <div className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-6 animate-float animation-delay-2000">⚡</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Resultados Instantáneos</h3>
            <p className="text-gray-300 leading-relaxed">
              Obtén informes técnicos completos en <span className="text-pink-400 font-semibold">segundos</span> con análisis presupuestal, cronograma y recomendaciones detalladas.
            </p>
            <div className="mt-4 text-2xl animate-spin-slow">🔄</div>
          </div>
          
          <div className="group bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-400/20 hover:border-emerald-400/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl mb-6 animate-float animation-delay-4000">🔒</div>
            <h3 className="text-2xl font-bold mb-4 text-white">Seguro y Confiable</h3>
            <p className="text-gray-300 leading-relaxed">
              Procesamiento <span className="text-emerald-400 font-semibold">100% local</span> sin comprometer la seguridad de tus datos. Cumple con estándares de gobierno.
            </p>
            <div className="mt-4 text-2xl animate-pulse-slow">🛡️</div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20">
          <h3 className="text-2xl font-bold text-center text-white mb-8">📈 Estadísticas del Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
              <div className="text-gray-300 text-sm">Precisión</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">&lt;2s</div>
              <div className="text-gray-300 text-sm">Tiempo de Respuesta</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">Seguro</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
            <span className="text-blue-200">🚀</span>
            <span className="text-blue-200">Powered by Advanced AI Technology</span>
            <span className="text-blue-200">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}