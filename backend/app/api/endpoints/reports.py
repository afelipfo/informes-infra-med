# Fichero: backend/app/api/endpoints/reports.py

from fastapi import APIRouter, HTTPException
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