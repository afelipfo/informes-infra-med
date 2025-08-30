# Fichero: backend/app/api/endpoints/reports.py

from fastapi import APIRouter, HTTPException, UploadFile, File
import tempfile
import os
import pandas as pd
from app.schemas.report import ReportRequest, GeneratedReport
from app.services.excel_parser import ExcelParserService
from app.services.report_generator import ReportGeneratorService

router = APIRouter()

@router.post("/generate", response_model=GeneratedReport, summary="Generar Informe Técnico Automatizado")
def generate_report_endpoint(request: ReportRequest):
    """
    Endpoint principal para la generación de informes.

    - **Recibe**: URL de un archivo Excel con datos del contrato.
    - **Procesa**: Valida, extrae y analiza los datos según las reglas de negocio.
    - **Devuelve**: Un informe estructurado en formato JSON con mensajes técnicos.
    """
    try:
        parser = ExcelParserService(excel_url=str(request.excel_api_url))
        contract_data = parser.get_data_as_dict()

        generator = ReportGeneratorService(data=contract_data)
        report_sections = generator.generate_full_report()

        if not report_sections:
            raise ValueError("No se pudieron generar secciones para el informe. Verifique los datos de entrada.")

        return GeneratedReport(sections=report_sections)

    except (ValueError, ConnectionError, RuntimeError) as e:
        # Errores "esperados" o de cliente (datos malos, URL mala)
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Errores inesperados del servidor
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {e}")

@router.post("/generate-demo", response_model=GeneratedReport, summary="Generar Informe de Demostración")
def generate_demo_report():
    """
    Endpoint de demostración que genera un informe con datos de ejemplo.
    Útil para probar la funcionalidad sin necesidad de un archivo Excel externo.
    """
    # Datos de ejemplo para demostración
    demo_data = {
        'presupuesto_aprobado': 1000000.0,
        'valor_ejecutado': 850000.0,
        'fecha_fin_planificada': '2025-12-31',
        'porcentaje_avance_fisico': 85.0
    }
    
    try:
        generator = ReportGeneratorService(data=demo_data)
        report_sections = generator.generate_full_report()

        return GeneratedReport(sections=report_sections)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando informe de demostración: {e}")
        
@router.post("/generate-from-file", response_model=GeneratedReport, summary="Generar Informe desde Archivo Subido")
async def generate_report_from_file(file: UploadFile = File(...)):
    """
    Endpoint para generar informes a partir de un archivo Excel o CSV subido.
    
    - **Recibe**: Un archivo Excel (.xlsx, .xls) o CSV (.csv) con datos del contrato.
    - **Procesa**: Valida, extrae y analiza los datos según las reglas de negocio.
    - **Devuelve**: Un informe estructurado en formato JSON con mensajes técnicos.
    """
    # Verificar extensión del archivo
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ['.xlsx', '.xls', '.csv']:
        raise HTTPException(
            status_code=400,
            detail="Formato de archivo no soportado. Use Excel (.xlsx, .xls) o CSV (.csv)"
        )
    
    try:
        # Guardar archivo temporalmente
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as temp_file:
            contents = await file.read()
            temp_file.write(contents)
            temp_file_path = temp_file.name
        
        # Leer datos del archivo según su formato
        try:
            if file_ext == '.csv':
                df = pd.read_csv(temp_file_path)
            else:  # Excel
                df = pd.read_excel(temp_file_path)
            
            # Convertir DataFrame a diccionario
            contract_data = df.to_dict(orient='records')[0] if not df.empty else {}
            
            # Si el diccionario está vacío, usar datos de demostración
            if not contract_data:
                contract_data = {
                    'presupuesto_aprobado': 1000000.0,
                    'valor_ejecutado': 850000.0,
                    'fecha_fin_planificada': '2025-12-31',
                    'porcentaje_avance_fisico': 85.0
                }
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error al procesar el archivo: {str(e)}"
            )
        finally:
            # Limpiar el archivo temporal
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        
        # Generar el informe
        generator = ReportGeneratorService(data=contract_data)
        report_sections = generator.generate_full_report()

        if not report_sections:
            raise ValueError("No se pudieron generar secciones para el informe. Verifique los datos de entrada.")

        return GeneratedReport(sections=report_sections)
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {e}")