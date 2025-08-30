'use client';

import { useMemo } from 'react';

interface BudgetChartProps {
  presupuestoAprobado: number;
  valorEjecutado: number;
}

export function BudgetChart({ presupuestoAprobado, valorEjecutado }: BudgetChartProps) {
  const percentage = useMemo(() => {
    return presupuestoAprobado > 0 ? (valorEjecutado / presupuestoAprobado) * 100 : 0;
  }, [presupuestoAprobado, valorEjecutado]);

  const getStatusColor = (percent: number) => {
    if (percent > 100) return 'text-red-600 bg-red-50 border-red-200';
    if (percent > 80) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getProgressColor = (percent: number) => {
    if (percent > 100) return 'bg-red-500';
    if (percent > 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ejecución Presupuestaria</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(percentage)}`}>
          {percentage.toFixed(1)}%
        </span>
      </div>
      
      <div className="space-y-4">
        {/* Barra de progreso */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${getProgressColor(percentage)}`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
            {percentage > 100 && (
              <div className="absolute top-0 right-0 h-4 bg-red-500 rounded-r-full border-2 border-red-600"
                   style={{ width: '4px' }} />
            )}
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              ${(valorEjecutado).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Ejecutado</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">
              ${(presupuestoAprobado).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Aprobado</div>
          </div>
        </div>

        {/* Análisis */}
        <div className="text-sm text-gray-600">
          {percentage > 100 && (
            <div className="flex items-center text-red-600">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Sobrecosto del {(percentage - 100).toFixed(1)}%
            </div>
          )}
          {percentage <= 100 && percentage >= 90 && (
            <div className="flex items-center text-yellow-600">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Ejecución alta, monitore gastos adicionales
            </div>
          )}
          {percentage < 90 && percentage >= 50 && (
            <div className="flex items-center text-blue-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Ejecución dentro del rango esperado
            </div>
          )}
          {percentage < 50 && (
            <div className="flex items-center text-orange-600">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
              Ejecución baja, revisar cronograma
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
