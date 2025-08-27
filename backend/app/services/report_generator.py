# Fichero: backend/app/services/report_generator.py

from app.schemas.report import TechnicalMessage, ReportSection
from typing import Dict, Any, List
import datetime
import pandas as pd

class ReportGeneratorService:
    """
    Servicio que contiene la lógica de negocio para generar las secciones
    y mensajes técnicos del informe a partir de los datos del contrato.
    """
    def __init__(self, data: Dict[str, Any]):
        self.data = data
        self.role = "Supervisor de contratos"
        self.contract_type = "Urgencia Manifiesta"

    def _generate_budget_message(self) -> ReportSection:
        """Genera la sección y el mensaje técnico para el bloque de presupuesto."""
        presupuesto = float(self.data.get('presupuesto_aprobado', 0))
        ejecutado = float(self.data.get('valor_ejecutado', 0))
        porcentaje = (ejecutado / presupuesto) * 100 if presupuesto > 0 else 0

        message_text = f"Ejecución presupuestal al {porcentaje:.2f}%. "
        severity = 'INFO'

        if porcentaje > 100:
            message_text += "¡ALERTA CRÍTICA! Se ha excedido el presupuesto aprobado. Se requiere una justificación inmediata y un plan de acción."
            severity = 'CRITICAL'
        elif porcentaje > 90:
            message_text += "ALERTA: El contrato está próximo a agotar su presupuesto. Es mandatorio revisar los rubros restantes y gestionar posibles adiciones."
            severity = 'CRITICAL'
        elif porcentaje > 75:
            message_text += "PRECAUCIÓN: Ejecución superior al 75%. Se debe monitorear semanalmente el flujo de caja para asegurar la cobertura hasta el final."
            severity = 'WARNING'

        message = TechnicalMessage(block_name="Análisis Presupuestal", message=message_text, severity=severity)
        
        return ReportSection(
            title="Análisis Presupuestal",
            data={
                "Presupuesto Aprobado": f"${presupuesto:,.2f} COP",
                "Valor Ejecutado": f"${ejecutado:,.2f} COP",
                "Porcentaje de Ejecución": f"{porcentaje:.2f}%"
            },
            message=message
        )

    def _generate_timeline_message(self) -> ReportSection:
        """Genera la sección y el mensaje técnico para el bloque de cronograma."""
        try:
            # La fecha actual está fija al contexto del prompt para consistencia
            today = datetime.date(2025, 8, 27)
            fecha_fin = pd.to_datetime(self.data.get('fecha_fin_planificada')).date()
            avance = float(self.data.get('porcentaje_avance_fisico', 0))
            
            dias_restantes = (fecha_fin - today).days
            message_text = ""
            severity = 'INFO'

            if dias_restantes < 0:
                message_text = f"¡ALERTA CRÍTICA! El contrato está atrasado por {-dias_restantes} días. Se debe activar el plan de contingencia de inmediato."
                severity = 'CRITICAL'
            elif dias_restantes < 30 and avance < 85:
                 message_text = f"ALERTA: Quedan solo {dias_restantes} días y el avance físico es del {avance}%. Riesgo alto de no cumplir el plazo. Se requiere intensificar frentes de trabajo."
                 severity = 'CRITICAL'
            elif dias_restantes < 60 and avance < 60:
                message_text = f"PRECAUCIÓN: Quedan {dias_restantes} días y el avance es del {avance}%. Se observa una desviación que debe ser corregida para evitar retrasos."
                severity = 'WARNING'
            else:
                message_text = f"El cronograma avanza según lo esperado. Quedan {dias_restantes} días para la finalización."
        
        except (ValueError, TypeError):
            message_text = "No se pudo analizar el cronograma. Verifique el formato de las fechas en el archivo Excel."
            severity = 'WARNING'

        message = TechnicalMessage(block_name="Análisis de Cronograma", message=message_text, severity=severity)
        
        return ReportSection(
            title="Análisis de Cronograma",
            data={
                "Fecha de Finalización Planificada": self.data.get('fecha_fin_planificada'),
                "Porcentaje de Avance Físico": self.data.get('porcentaje_avance_fisico')
            },
            message=message
        )

    def generate_full_report(self) -> List[ReportSection]:
        """Construye todas las secciones del informe llamando a los métodos especializados."""
        sections = [
            self._generate_budget_message(),
            self._generate_timeline_message()
            # Aquí podrías añadir más llamadas a otros métodos de análisis
            # ej: self._generate_quality_analysis(), self._generate_risk_analysis() ...
        ]
        return sections