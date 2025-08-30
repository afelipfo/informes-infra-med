"""
Servicio mejorado de generación de reportes con persistencia en base de datos
"""
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.models import Report, Project, ReportSection, ReportAnalytics, User
from app.schemas.report import GeneratedReport, ReportSection as ReportSectionSchema
from app.services.report_generator import ReportGeneratorService
import uuid
from datetime import datetime
import json

class EnhancedReportService:
    """
    Servicio mejorado que combina la lógica existente con persistencia en BD
    """
    
    def __init__(self, db: AsyncSession):
        self.db = db
    
    async def generate_and_save_report(
        self,
        contract_data: Dict[str, Any],
        user_id: Optional[uuid.UUID] = None,
        project_id: Optional[uuid.UUID] = None,
        original_filename: Optional[str] = None,
        file_type: Optional[str] = None,
        supervisor_name: Optional[str] = None,
        project_name: Optional[str] = None
    ) -> GeneratedReport:
        """
        Generar un informe usando la lógica existente y guardarlo en BD
        """
        
        # 1. Usar el servicio existente para generar el informe
        generator = ReportGeneratorService(data=contract_data)
        sections = generator.generate_full_report()
        
        # 2. Crear o encontrar el proyecto
        project = None
        if project_name:
            project = await self._get_or_create_project(
                name=project_name,
                supervisor_name=supervisor_name
            )
            project_id = project.id
        
        # 3. Crear el registro del informe en BD
        report_data = Report(
            id=uuid.uuid4(),
            project_id=project_id,
            created_by=user_id,
            presupuesto_aprobado=contract_data.get('presupuesto_aprobado'),
            valor_ejecutado=contract_data.get('valor_ejecutado'),
            fecha_fin_planificada=self._parse_date(contract_data.get('fecha_fin_planificada')),
            porcentaje_avance_fisico=contract_data.get('porcentaje_avance_fisico'),
            # Convertir las secciones a un formato de diccionario para la BD
            sections_data=[section.model_dump() for section in sections],
            raw_data=contract_data,
            original_filename=original_filename,
            file_type=file_type
        )
        
        self.db.add(report_data)
        await self.db.commit()
        await self.db.refresh(report_data)
        
        # 4. Guardar secciones individuales para análisis
        for section in sections:
            section_data = ReportSection(
                report_id=report_data.id,
                title=section.title,
                block_name=section.message.block_name,
                message=section.message.message,
                severity=section.message.severity,
                data=section.data
            )
            self.db.add(section_data)
        
        # 5. Calcular y guardar analytics
        analytics = await self._calculate_analytics(report_data, contract_data)
        self.db.add(analytics)
        
        await self.db.commit()
        
        # 6. Retornar el informe en el formato esperado
        return GeneratedReport(
            contract_type=report_data.contract_type,
            year=report_data.year,
            context=report_data.context,
            sections=sections
        )
    
    async def get_report_by_id(self, report_id: uuid.UUID) -> Optional[Report]:
        """Obtener un informe por ID"""
        stmt = select(Report).where(Report.id == report_id)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()
    
    async def get_reports_by_user(self, user_id: uuid.UUID, limit: int = 10) -> List[Report]:
        """Obtener informes de un usuario"""
        stmt = select(Report).where(Report.created_by == user_id).limit(limit)
        result = await self.db.execute(stmt)
        return result.scalars().all()
    
    async def get_project_reports(self, project_id: uuid.UUID) -> List[Report]:
        """Obtener todos los informes de un proyecto"""
        stmt = select(Report).where(Report.project_id == project_id)
        result = await self.db.execute(stmt)
        return result.scalars().all()
    
    async def _get_or_create_project(self, name: str, supervisor_name: Optional[str] = None) -> Project:
        """Crear o encontrar un proyecto existente"""
        stmt = select(Project).where(Project.name == name)
        result = await self.db.execute(stmt)
        project = result.scalar_one_or_none()
        
        if not project:
            project = Project(
                name=name,
                supervisor_name=supervisor_name,
                description=f"Proyecto de infraestructura: {name}"
            )
            self.db.add(project)
            await self.db.commit()
            await self.db.refresh(project)
        
        return project
    
    async def _calculate_analytics(self, report: Report, contract_data: Dict[str, Any]) -> ReportAnalytics:
        """Calcular métricas y analytics del informe"""
        presupuesto = contract_data.get('presupuesto_aprobado', 0)
        ejecutado = contract_data.get('valor_ejecutado', 0)
        avance_fisico = contract_data.get('porcentaje_avance_fisico', 0)
        
        # Calcular eficiencia presupuestaria
        budget_efficiency = (ejecutado / presupuesto) if presupuesto > 0 else 0
        
        # Calcular performance temporal (simplificado)
        time_performance = avance_fisico / 100.0
        
        # Calcular score de riesgo basado en desviaciones
        risk_score = 0.0
        if budget_efficiency > 1.0:  # Sobrecosto
            risk_score += 0.3
        if time_performance < 0.8:  # Retraso significativo
            risk_score += 0.4
        if budget_efficiency < 0.5:  # Ejecución muy baja
            risk_score += 0.3
        
        return ReportAnalytics(
            report_id=report.id,
            budget_efficiency=budget_efficiency,
            time_performance=time_performance,
            risk_score=min(risk_score, 1.0),
            trend_analysis={
                "budget_trend": "over_budget" if budget_efficiency > 1.0 else "under_budget",
                "timeline_trend": "delayed" if time_performance < 0.8 else "on_time",
                "overall_health": "critical" if risk_score > 0.7 else "warning" if risk_score > 0.3 else "good"
            }
        )
    
    def _parse_date(self, date_str: Optional[str]) -> Optional[datetime]:
        """Parsear fecha desde string"""
        if not date_str:
            return None
        try:
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        except (ValueError, AttributeError):
            return None
