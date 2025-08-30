export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          📋 Informes Anteriores
        </h1>
        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <p className="text-lg text-gray-600 mb-4">
            Funcionalidad de historial de informes
          </p>
          <p className="text-green-600">
            ✅ Página funcionando correctamente
          </p>
          <div className="mt-6">
            <a 
              href="/" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
              🏠 Volver al Inicio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
