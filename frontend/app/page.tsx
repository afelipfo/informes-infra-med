import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sistema de Informes
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            Secretaría de Infraestructura Física - Alcaldía de Medellín
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            Genera informes técnicos automáticos para contratos de Urgencia Manifiesta. 
            Sube tus archivos Excel y obtén análisis presupuestal y de cronograma instantáneamente.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            href="/generate-report" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors duration-200 text-lg"
          >
            📊 Generar Nuevo Informe
          </Link>
          
          <Link 
            href="/reports" 
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-colors duration-200 text-lg"
          >
            📋 Ver Informes Anteriores
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📈 Análisis Automático</h3>
            <p className="text-gray-600">
              Procesamiento inteligente de datos de contratos con alertas por severidad.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">⚡ Resultados Instantáneos</h3>
            <p className="text-gray-600">
              Obtén informes técnicos completos en segundos con análisis presupuestal y de cronograma.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🔒 Seguro y Confiable</h3>
            <p className="text-gray-600">
              Procesamiento local de archivos sin comprometer la seguridad de los datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}