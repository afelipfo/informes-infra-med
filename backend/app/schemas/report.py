from pydantic import BaseModel, HttpUrl
from typing import List

class ReportRequest(BaseModel):
    excel_api_url: HttpUrl
    # Podríamos añadir más metadata si fuera necesario
    # nombre_supervisor: str

class TechnicalMessage(BaseModel):
    block_name: str
    message: str
    severity: str # e.g., 'INFO', 'WARNING', 'CRITICAL'

class ReportSection(BaseModel):
    title: str
    data: dict # Los datos extraídos del excel
    message: TechnicalMessage # El mensaje generado

class GeneratedReport(BaseModel):
    contract_type: str = "Urgencia Manifiesta"
    year: int = 2025
    context: str = "Secretaría de Infraestructura Física - Alcaldía de Medellín"
    sections: List[ReportSection]