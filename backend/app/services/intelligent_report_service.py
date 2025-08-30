"""
Servicio Inteligente de Generación de Informes con IA
Integra el motor de IA con la lógica de generación de informes existente
"""

from typing import Dict, Any, List, Optional
from app.services.report_generator import ReportGeneratorService
from app.services.ai_intelligence_engine import ContractIntelligenceEngine, AIAnalysisResult, SeverityLevel
from app.schemas.report import TechnicalMessage, ReportSection, GeneratedReport
import logging
import json
from datetime import datetime

logger = logging.getLogger(__name__)

class IntelligentReportService:
    """
    Servicio que combina la lógica de generación de informes con análisis de IA
    """
    
    def __init__(self):
        self.ai_engine = ContractIntelligenceEngine()
        self.report_generator = None
        logger.info("🚀 Servicio Inteligente de Informes inicializado")
    
    async def generate_intelligent_report(self, contract_data: Dict[str, Any]) -> GeneratedReport:
        """
        Genera un informe inteligente combinando análisis tradicional e IA
        """
        logger.info("🔍 Iniciando generación de informe inteligente")
        
        # 1. Análisis de IA
        ai_analysis = await self.ai_engine.analyze_contract_data(contract_data)
        
        # 2. Generar informe base
        self.report_generator = ReportGeneratorService(data=contract_data)
        base_sections = self.report_generator.generate_full_report()
        
        # 3. Mejorar secciones con insights de IA
        enhanced_sections = self._enhance_sections_with_ai(base_sections, ai_analysis)
        
        # 4. Agregar secciones de IA
        ai_sections = self._create_ai_sections(ai_analysis)
        
        # 5. Combinar todas las secciones
        all_sections = enhanced_sections + ai_sections
        
        logger.info(f"✅ Informe inteligente generado con {len(all_sections)} secciones")
        
        return GeneratedReport(sections=all_sections)
    
    def _enhance_sections_with_ai(self, base_sections: List[ReportSection], 
                                ai_analysis: AIAnalysisResult) -> List[ReportSection]:
        """Mejorar las secciones base con insights de IA"""
        enhanced_sections = []
        
        for section in base_sections:
            # Mejorar mensaje técnico con insights de IA
            enhanced_message = self._enhance_technical_message(section.message, ai_analysis)
            
            # Mejorar datos con métricas de IA
            enhanced_data = self._enhance_section_data(section.data, ai_analysis)
            
            enhanced_section = ReportSection(
                title=section.title,
                data=enhanced_data,
                message=enhanced_message
            )
            
            enhanced_sections.append(enhanced_section)
        
        return enhanced_sections
    
    def _enhance_technical_message(self, original_message: TechnicalMessage, 
                                 ai_analysis: AIAnalysisResult) -> TechnicalMessage:
        """Mejorar mensaje técnico con insights de IA"""
        
        # Determinar severidad basada en análisis de IA
        ai_severity = ai_analysis.severity.value
        
        # Mejorar mensaje con recomendaciones de IA
        enhanced_message = original_message.message
        
        if ai_analysis.recommendations:
            enhanced_message += "\n\n🤖 ANÁLISIS INTELIGENTE:\n"
            for i, recommendation in enumerate(ai_analysis.recommendations[:3], 1):
                enhanced_message += f"{i}. {recommendation}\n"
        
        # Agregar métricas de confianza
        confidence = ai_analysis.confidence * 100
        enhanced_message += f"\n📊 Confianza del análisis: {confidence:.1f}%"
        
        # Usar severidad de IA si es más crítica
        final_severity = ai_severity if self._is_ai_severity_higher(ai_severity, original_message.severity) else original_message.severity
        
        return TechnicalMessage(
            block_name=original_message.block_name,
            message=enhanced_message,
            severity=final_severity
        )
    
    def _enhance_section_data(self, original_data: Dict[str, Any], 
                            ai_analysis: AIAnalysisResult) -> Dict[str, Any]:
        """Mejorar datos de sección con métricas de IA"""
        enhanced_data = original_data.copy()
        
        # Agregar métricas de IA
        enhanced_data.update({
            "Score de Riesgo IA": f"{ai_analysis.risk_score:.2%}",
            "Confianza del Análisis": f"{ai_analysis.confidence:.2%}",
            "Nivel de Severidad IA": ai_analysis.severity.value
        })
        
        # Agregar insights específicos según el tipo de sección
        if "Presupuesto" in enhanced_data.get("Presupuesto Aprobado", ""):
            enhanced_data.update({
                "Probabilidad Sobrecosto": f"{ai_analysis.predictions.get('probabilidad_sobrecosto', 0):.2%}",
                "Riesgo Financiero": f"{ai_analysis.insights.get('risk_indicators', {}).get('nivel_riesgo_financiero', 0):.2%}"
            })
        
        if "Cronograma" in enhanced_data.get("Fecha de Finalización Planificada", ""):
            enhanced_data.update({
                "Probabilidad Retraso": f"{ai_analysis.predictions.get('probabilidad_retraso', 0):.2%}",
                "Riesgo Temporal": f"{ai_analysis.insights.get('risk_indicators', {}).get('nivel_riesgo_temporal', 0):.2%}",
                "Fecha Probable Finalización": ai_analysis.predictions.get('prediccion_finalizacion', 'N/A')
            })
        
        return enhanced_data
    
    def _create_ai_sections(self, ai_analysis: AIAnalysisResult) -> List[ReportSection]:
        """Crear secciones específicas de IA"""
        ai_sections = []
        
        # 1. Sección de Análisis Predictivo
        predictive_section = self._create_predictive_section(ai_analysis)
        ai_sections.append(predictive_section)
        
        # 2. Sección de Detección de Anomalías
        if ai_analysis.anomalies:
            anomalies_section = self._create_anomalies_section(ai_analysis)
            ai_sections.append(anomalies_section)
        
        # 3. Sección de Insights Avanzados
        insights_section = self._create_insights_section(ai_analysis)
        ai_sections.append(insights_section)
        
        # 4. Sección de Recomendaciones Inteligentes
        recommendations_section = self._create_recommendations_section(ai_analysis)
        ai_sections.append(recommendations_section)
        
        return ai_sections
    
    def _create_predictive_section(self, ai_analysis: AIAnalysisResult) -> ReportSection:
        """Crear sección de análisis predictivo"""
        
        predictions_data = {
            "Probabilidad de Sobrecosto": f"{ai_analysis.predictions.get('probabilidad_sobrecosto', 0):.2%}",
            "Probabilidad de Retraso": f"{ai_analysis.predictions.get('probabilidad_retraso', 0):.2%}",
            "Probabilidad de Cumplimiento": f"{ai_analysis.predictions.get('probabilidad_cumplimiento', 0):.2%}",
            "Fecha Probable de Finalización": ai_analysis.predictions.get('prediccion_finalizacion', 'N/A'),
            "Tendencia de Ejecución": ai_analysis.predictions.get('tendencia_ejecucion', 'N/A'),
            "Tendencia de Avance": ai_analysis.predictions.get('tendencia_avance', 'N/A')
        }
        
        message_text = f"🔮 ANÁLISIS PREDICTIVO AVANZADO\n\n"
        message_text += f"El sistema de IA ha analizado patrones históricos y métricas actuales para predecir el comportamiento futuro del proyecto.\n\n"
        
        if ai_analysis.predictions.get('probabilidad_sobrecosto', 0) > 0.7:
            message_text += "⚠️ ALTA PROBABILIDAD DE SOBRECOSTO detectada por IA.\n"
        
        if ai_analysis.predictions.get('probabilidad_retraso', 0) > 0.6:
            message_text += "⏰ RIESGO SIGNIFICATIVO DE RETRASO identificado.\n"
        
        if ai_analysis.predictions.get('probabilidad_cumplimiento', 0) < 0.5:
            message_text += "🚨 BAJA PROBABILIDAD DE CUMPLIMIENTO del cronograma.\n"
        
        message = TechnicalMessage(
            block_name="Análisis Predictivo IA",
            message=message_text,
            severity=self._get_predictive_severity(ai_analysis.predictions)
        )
        
        return ReportSection(
            title="🔮 Análisis Predictivo con IA",
            data=predictions_data,
            message=message
        )
    
    def _create_anomalies_section(self, ai_analysis: AIAnalysisResult) -> ReportSection:
        """Crear sección de detección de anomalías"""
        
        anomalies_data = {}
        for i, anomaly in enumerate(ai_analysis.anomalies, 1):
            anomalies_data[f"Anomalía {i}"] = f"{anomaly['type']}: {anomaly['description']}"
            anomalies_data[f"Valor {i}"] = f"{anomaly['value']:.2f}"
            anomalies_data[f"Umbral {i}"] = f"{anomaly['threshold']:.2f}"
        
        message_text = f"🚨 DETECCIÓN DE ANOMALÍAS\n\n"
        message_text += f"El sistema de IA ha identificado {len(ai_analysis.anomalies)} anomalías significativas:\n\n"
        
        for anomaly in ai_analysis.anomalies:
            message_text += f"• {anomaly['description']}\n"
            message_text += f"  Valor actual: {anomaly['value']:.2f} (Umbral: {anomaly['threshold']:.2f})\n\n"
        
        message = TechnicalMessage(
            block_name="Detección de Anomalías IA",
            message=message_text,
            severity=self._get_anomalies_severity(ai_analysis.anomalies)
        )
        
        return ReportSection(
            title="🚨 Detección de Anomalías IA",
            data=anomalies_data,
            message=message
        )
    
    def _create_insights_section(self, ai_analysis: AIAnalysisResult) -> ReportSection:
        """Crear sección de insights avanzados"""
        
        insights_data = {}
        
        # Métricas de rendimiento
        performance = ai_analysis.insights.get('performance_metrics', {})
        insights_data.update({
            "Eficiencia Global": f"{performance.get('eficiencia_global', 0):.2%}",
            "Velocidad de Ejecución": f"{performance.get('velocidad_ejecucion', 0):.2f}",
            "Sostenibilidad Temporal": f"{performance.get('sostenibilidad_temporal', 0):.2f}"
        })
        
        # Indicadores de riesgo
        risk_indicators = ai_analysis.insights.get('risk_indicators', {})
        insights_data.update({
            "Riesgo Financiero": f"{risk_indicators.get('nivel_riesgo_financiero', 0):.2%}",
            "Riesgo Temporal": f"{risk_indicators.get('nivel_riesgo_temporal', 0):.2%}",
            "Probabilidad de Incumplimiento": f"{risk_indicators.get('probabilidad_incumplimiento', 0):.2%}"
        })
        
        # Insights predictivos
        predictive_insights = ai_analysis.insights.get('predictive_insights', {})
        insights_data.update({
            "Costo Final Estimado": f"${predictive_insights.get('costo_final_estimado', 0):,.2f} COP",
            "Desviación Estimada": f"{predictive_insights.get('desviacion_estimada', 0):.2%}"
        })
        
        message_text = f"🧠 INSIGHTS AVANZADOS DE IA\n\n"
        message_text += f"Análisis profundo basado en múltiples algoritmos de machine learning:\n\n"
        
        # Agregar insights específicos
        if performance.get('eficiencia_global', 0) < 0.5:
            message_text += "📊 EFICIENCIA GLOBAL BAJA: El proyecto muestra ineficiencias significativas.\n"
        
        if risk_indicators.get('nivel_riesgo_financiero', 0) > 0.7:
            message_text += "💰 ALTO RIESGO FINANCIERO: Requiere atención inmediata.\n"
        
        if risk_indicators.get('nivel_riesgo_temporal', 0) > 0.7:
            message_text += "⏰ ALTO RIESGO TEMPORAL: Cronograma en peligro.\n"
        
        message = TechnicalMessage(
            block_name="Insights Avanzados IA",
            message=message_text,
            severity=self._get_insights_severity(ai_analysis.insights)
        )
        
        return ReportSection(
            title="🧠 Insights Avanzados IA",
            data=insights_data,
            message=message
        )
    
    def _create_recommendations_section(self, ai_analysis: AIAnalysisResult) -> ReportSection:
        """Crear sección de recomendaciones inteligentes"""
        
        recommendations_data = {}
        for i, recommendation in enumerate(ai_analysis.recommendations, 1):
            recommendations_data[f"Recomendación {i}"] = recommendation
        
        message_text = f"💡 RECOMENDACIONES INTELIGENTES\n\n"
        message_text += f"El sistema de IA ha generado {len(ai_analysis.recommendations)} recomendaciones específicas:\n\n"
        
        for i, recommendation in enumerate(ai_analysis.recommendations, 1):
            message_text += f"{i}. {recommendation}\n\n"
        
        message_text += f"📊 Score de Riesgo: {ai_analysis.risk_score:.2%}\n"
        message_text += f"🎯 Confianza del Análisis: {ai_analysis.confidence:.2%}"
        
        message = TechnicalMessage(
            block_name="Recomendaciones IA",
            message=message_text,
            severity=ai_analysis.severity.value
        )
        
        return ReportSection(
            title="💡 Recomendaciones Inteligentes IA",
            data=recommendations_data,
            message=message
        )
    
    # Métodos auxiliares
    def _is_ai_severity_higher(self, ai_severity: str, original_severity: str) -> bool:
        """Determinar si la severidad de IA es más alta que la original"""
        severity_levels = {
            'INFO': 1,
            'WARNING': 2,
            'CRITICAL': 3,
            'EMERGENCY': 4
        }
        
        ai_level = severity_levels.get(ai_severity, 1)
        original_level = severity_levels.get(original_severity, 1)
        
        return ai_level > original_level
    
    def _get_predictive_severity(self, predictions: Dict[str, Any]) -> str:
        """Determinar severidad basada en predicciones"""
        if (predictions.get('probabilidad_sobrecosto', 0) > 0.8 or 
            predictions.get('probabilidad_retraso', 0) > 0.8):
            return 'CRITICAL'
        elif (predictions.get('probabilidad_sobrecosto', 0) > 0.6 or 
              predictions.get('probabilidad_retraso', 0) > 0.6):
            return 'WARNING'
        else:
            return 'INFO'
    
    def _get_anomalies_severity(self, anomalies: List[Dict[str, Any]]) -> str:
        """Determinar severidad basada en anomalías"""
        if any(anomaly.get('severity') == SeverityLevel.CRITICAL for anomaly in anomalies):
            return 'CRITICAL'
        elif any(anomaly.get('severity') == SeverityLevel.WARNING for anomaly in anomalies):
            return 'WARNING'
        else:
            return 'INFO'
    
    def _get_insights_severity(self, insights: Dict[str, Any]) -> str:
        """Determinar severidad basada en insights"""
        risk_indicators = insights.get('risk_indicators', {})
        
        if (risk_indicators.get('nivel_riesgo_financiero', 0) > 0.8 or 
            risk_indicators.get('nivel_riesgo_temporal', 0) > 0.8):
            return 'CRITICAL'
        elif (risk_indicators.get('nivel_riesgo_financiero', 0) > 0.6 or 
              risk_indicators.get('nivel_riesgo_temporal', 0) > 0.6):
            return 'WARNING'
        else:
            return 'INFO'
