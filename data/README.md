# 📁 Directorio de Datos

Este directorio contiene archivos de datos de ejemplo para el Sistema de Informes de Infraestructura.

## 📊 Archivos Disponibles

### `ejemplo_contrato.csv`
Archivo de ejemplo con datos de contrato para pruebas del sistema.

**Estructura:**
- `presupuesto_aprobado`: Presupuesto total aprobado para el contrato
- `valor_ejecutado`: Valor total ejecutado hasta la fecha
- `fecha_fin_planificada`: Fecha planificada de finalización del contrato
- `porcentaje_avance_fisico`: Porcentaje de avance físico del proyecto

**Ejemplo de uso:**
```bash
# Usar con el script de prueba
python test_system.py

# O cargar directamente en la aplicación web
# http://localhost:3000/generate-report
```

### `datos_contrato_ejemplo.csv`
Archivo de ejemplo adicional con diferentes valores para pruebas.

## 🔧 Formato Requerido

Los archivos deben estar en formato CSV con las siguientes columnas:

```csv
presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico
2500000,2200000,2025-09-15,88
```

## 📝 Notas

- Los archivos deben usar codificación UTF-8
- Los valores numéricos deben usar punto como separador decimal
- Las fechas deben estar en formato YYYY-MM-DD
- El porcentaje de avance debe estar entre 0 y 100
