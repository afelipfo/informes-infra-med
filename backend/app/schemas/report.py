from pydantic import BaseModel
from typing import List, Optional

class ReportRequest(BaseModel):
    # Metadata opcional para el informe
    nombre_supervisor: Optional[str] = None
    nombre_proyecto: Optional[str] = None

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