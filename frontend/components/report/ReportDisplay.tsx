import { GeneratedReport } from "@/lib/api";
import { ReportSectionCard } from "./ReportSectionCard";
import { BudgetChart } from "../charts/BudgetChart";
import { ProgressRing } from "../charts/ProgressRing";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

interface ReportDisplayProps {
  report: GeneratedReport;
}

export function ReportDisplay({ report }: ReportDisplayProps) {
  // Extraer datos numéricos del primer section para visualizaciones
  const budgetData = report.sections[0]?.data || {};
  const presupuestoAprobado = budgetData.presupuesto_aprobado || 0;
  const valorEjecutado = budgetData.valor_ejecutado || 0;
  const porcentajeAvance = budgetData.porcentaje_avance_fisico || 0;

  // Calcular métricas adicionales
  const eficienciaPresupuesto = presupuestoAprobado > 0 ? (valorEjecutado / presupuestoAprobado) * 100 : 0;
  const alertas = report.sections.filter(s => s.message.severity === 'CRITICAL').length;
  const advertencias = report.sections.filter(s => s.message.severity === 'WARNING').length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header del informe */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Informe de Infraestructura Médica</h2>
            <p className="text-blue-100 mt-1">{report.context}</p>
            <div className="text-sm text-blue-200 mt-2">
              <span>Contrato: {report.contract_type}</span> | <span>Año: {report.year}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              {alertas > 0 && (
                <div className="flex items-center text-red-200">
                  <AlertTriangle className="w-5 h-5 mr-1" />
                  <span>{alertas} Críticas</span>
                </div>
              )}
              {advertencias > 0 && (
                <div className="flex items-center text-yellow-200">
                  <AlertTriangle className="w-5 h-5 mr-1" />
                  <span>{advertencias} Advertencias</span>
                </div>
              )}
              {alertas === 0 && advertencias === 0 && (
                <div className="flex items-center text-green-200">
                  <CheckCircle2 className="w-5 h-5 mr-1" />
                  <span>Sin alertas críticas</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard de métricas visuales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de presupuesto */}
        <div className="lg:col-span-2">
          <BudgetChart 
            presupuestoAprobado={presupuestoAprobado}
            valorEjecutado={valorEjecutado}
          />
        </div>

        {/* Anillos de progreso */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Indicadores Clave
            </h3>
            <div className="space-y-6">
              <ProgressRing 
                percentage={porcentajeAvance}
                label="Avance Físico"
                size={80}
              />
              <ProgressRing 
                percentage={eficienciaPresupuesto}
                label="Eficiencia Presupuestal"
                size={80}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Secciones detalladas del informe */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-bold text-gray-900">Análisis Detallado</h3>
        </div>
        <div className="space-y-4">
          {report.sections.map((section, index) => (
            <ReportSectionCard key={index} section={section} />
          ))}
        </div>
      </div>

      {/* Resumen ejecutivo */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Resumen Ejecutivo</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ${(valorEjecutado).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Ejecutado</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {porcentajeAvance.toFixed(1)}%
            </div>
            <div className="text-gray-600">Avance Físico</div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {report.sections.length}
            </div>
            <div className="text-gray-600">Secciones Analizadas</div>
          </div>
        </div>
      </div>
    </div>
  );
}