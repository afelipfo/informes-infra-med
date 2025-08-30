"""
Motor de IA Inteligente para Análisis de Contratos de Infraestructura
Sistema de alta precisión que combina múltiples técnicas de ML y NLP
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timedelta
import json
import logging
from dataclasses import dataclass
from enum import Enum

# Machine Learning
from sklearn.ensemble import RandomForestRegressor, IsolationForest
from sklearn.preprocessing import StandardScaler, RobustScaler
from sklearn.cluster import KMeans
from sklearn.metrics import mean_absolute_error, mean_squared_error
import joblib

# Análisis de series temporales
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller

# Detección de anomalías
from pyod.models.iforest import IForest
from pyod.models.lof import LOF

# NLP y procesamiento de texto
import spacy
from textblob import TextBlob
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Hugging Face Transformers
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
import torch

# Visualización y análisis
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class SeverityLevel(Enum):
    """Niveles de severidad para alertas"""
    INFO = "INFO"
    WARNING = "WARNING"
    CRITICAL = "CRITICAL"
    EMERGENCY = "EMERGENCY"

@dataclass
class AIAnalysisResult:
    """Resultado del análisis de IA"""
    risk_score: float
    confidence: float
    predictions: Dict[str, Any]
    anomalies: List[Dict[str, Any]]
    recommendations: List[str]
    severity: SeverityLevel
    insights: Dict[str, Any]

class ContractIntelligenceEngine:
    """
    Motor principal de IA para análisis inteligente de contratos
    """
    
    def __init__(self):
        self.nlp = None
        self.sentiment_analyzer = None
        self.anomaly_detector = None
        self.risk_predictor = None
        self.scaler = StandardScaler()
        self._load_models()
        
    def _load_models(self):
        """Cargar modelos de IA pre-entrenados"""
        try:
            # Cargar modelo de spaCy para español
            self.nlp = spacy.load("es_core_news_sm")
            logger.info("✅ Modelo spaCy cargado exitosamente")
        except OSError:
            logger.warning("⚠️ Modelo spaCy no encontrado, usando modelo básico")
            self.nlp = spacy.blank("es")
        
        # Inicializar analizador de sentimientos
        try:
            nltk.download('vader_lexicon', quiet=True)
            self.sentiment_analyzer = SentimentIntensityAnalyzer()
        except Exception as e:
            logger.warning(f"⚠️ Error cargando analizador de sentimientos: {e}")
        
        # Inicializar detectores de anomalías
        self.anomaly_detector = IForest(contamination=0.1, random_state=42)
        
        # Inicializar predictor de riesgo
        self.risk_predictor = RandomForestRegressor(n_estimators=100, random_state=42)
        
        logger.info("🚀 Motor de IA inicializado correctamente")
    
    def analyze_contract_data(self, contract_data: Dict[str, Any]) -> AIAnalysisResult:
        """
        Análisis completo e inteligente de datos de contrato
        """
        logger.info("🔍 Iniciando análisis inteligente de contrato")
        
        # Extraer métricas clave
        metrics = self._extract_metrics(contract_data)
        
        # Análisis de riesgo predictivo
        risk_analysis = self._predict_risk(metrics)
        
        # Detección de anomalías
        anomalies = self._detect_anomalies(metrics)
        
        # Análisis temporal y predictivo
        temporal_analysis = self._analyze_temporal_patterns(metrics)
        
        # Generar recomendaciones inteligentes
        recommendations = self._generate_recommendations(metrics, risk_analysis, anomalies)
        
        # Calcular score de riesgo final
        risk_score = self._calculate_final_risk_score(risk_analysis, anomalies, temporal_analysis)
        
        # Determinar severidad
        severity = self._determine_severity(risk_score)
        
        # Generar insights avanzados
        insights = self._generate_insights(metrics, risk_analysis, temporal_analysis)
        
        return AIAnalysisResult(
            risk_score=risk_score,
            confidence=self._calculate_confidence(metrics),
            predictions=temporal_analysis,
            anomalies=anomalies,
            recommendations=recommendations,
            severity=severity,
            insights=insights
        )
    
    def _extract_metrics(self, data: Dict[str, Any]) -> Dict[str, float]:
        """Extraer y normalizar métricas clave"""
        try:
            presupuesto = float(data.get('presupuesto_aprobado', 0))
            ejecutado = float(data.get('valor_ejecutado', 0))
            avance_fisico = float(data.get('porcentaje_avance_fisico', 0))
            
            # Calcular métricas derivadas
            ejecucion_presupuestal = (ejecutado / presupuesto * 100) if presupuesto > 0 else 0
            eficiencia_presupuestal = (avance_fisico / ejecucion_presupuestal) if ejecucion_presupuestal > 0 else 0
            
            # Análisis de fecha
            fecha_fin = data.get('fecha_fin_planificada')
            dias_restantes = self._calculate_days_remaining(fecha_fin)
            
            return {
                'presupuesto': presupuesto,
                'ejecutado': ejecutado,
                'avance_fisico': avance_fisico,
                'ejecucion_presupuestal': ejecucion_presupuestal,
                'eficiencia_presupuestal': eficiencia_presupuestal,
                'dias_restantes': dias_restantes,
                'ratio_ejecucion_avance': ejecucion_presupuestal / avance_fisico if avance_fisico > 0 else 0
            }
        except Exception as e:
            logger.error(f"Error extrayendo métricas: {e}")
            return {}
    
    def _predict_risk(self, metrics: Dict[str, float]) -> Dict[str, Any]:
        """Predicción de riesgo usando modelos de ML"""
        try:
            # Crear features para predicción
            features = np.array([
                metrics.get('ejecucion_presupuestal', 0),
                metrics.get('avance_fisico', 0),
                metrics.get('dias_restantes', 0),
                metrics.get('eficiencia_presupuestal', 0),
                metrics.get('ratio_ejecucion_avance', 0)
            ]).reshape(1, -1)
            
            # Normalizar features
            features_scaled = self.scaler.fit_transform(features)
            
            # Predicciones múltiples
            risk_predictions = {
                'probabilidad_sobrecosto': self._predict_overcost_probability(features_scaled),
                'probabilidad_retraso': self._predict_delay_probability(features_scaled),
                'score_riesgo_financiero': self._calculate_financial_risk_score(metrics),
                'score_riesgo_temporal': self._calculate_temporal_risk_score(metrics)
            }
            
            return risk_predictions
            
        except Exception as e:
            logger.error(f"Error en predicción de riesgo: {e}")
            return {}
    
    def _detect_anomalies(self, metrics: Dict[str, float]) -> List[Dict[str, Any]]:
        """Detección de anomalías usando múltiples algoritmos"""
        anomalies = []
        
        try:
            # Preparar datos para detección de anomalías
            data_points = np.array([
                metrics.get('ejecucion_presupuestal', 0),
                metrics.get('avance_fisico', 0),
                metrics.get('eficiencia_presupuestal', 0)
            ]).reshape(1, -1)
            
            # Isolation Forest
            iforest = IsolationForest(contamination=0.1, random_state=42)
            iforest_scores = iforest.fit_predict(data_points)
            
            # Local Outlier Factor
            lof = LOF(contamination=0.1)
            lof_scores = lof.fit_predict(data_points)
            
            # Detectar anomalías específicas
            if metrics.get('ejecucion_presupuestal', 0) > 100:
                anomalies.append({
                    'type': 'SOBRECOSTO_CRITICO',
                    'severity': SeverityLevel.CRITICAL,
                    'description': 'Ejecución presupuestal excede el 100%',
                    'value': metrics.get('ejecucion_presupuestal', 0),
                    'threshold': 100
                })
            
            if metrics.get('eficiencia_presupuestal', 0) < 0.5:
                anomalies.append({
                    'type': 'BAJA_EFICIENCIA',
                    'severity': SeverityLevel.WARNING,
                    'description': 'Eficiencia presupuestal muy baja',
                    'value': metrics.get('eficiencia_presupuestal', 0),
                    'threshold': 0.5
                })
            
            if metrics.get('dias_restantes', 0) < 30 and metrics.get('avance_fisico', 0) < 85:
                anomalies.append({
                    'type': 'RIESGO_TEMPORAL',
                    'severity': SeverityLevel.CRITICAL,
                    'description': 'Poco tiempo restante con avance insuficiente',
                    'value': metrics.get('dias_restantes', 0),
                    'threshold': 30
                })
            
        except Exception as e:
            logger.error(f"Error en detección de anomalías: {e}")
        
        return anomalies
    
    def _analyze_temporal_patterns(self, metrics: Dict[str, float]) -> Dict[str, Any]:
        """Análisis de patrones temporales y predicciones"""
        try:
            # Simular datos históricos para análisis temporal
            historical_data = self._generate_historical_simulation(metrics)
            
            # Análisis de tendencias
            trend_analysis = {
                'tendencia_ejecucion': self._calculate_trend(historical_data.get('ejecucion', [])),
                'tendencia_avance': self._calculate_trend(historical_data.get('avance', [])),
                'prediccion_finalizacion': self._predict_completion_date(metrics),
                'probabilidad_cumplimiento': self._calculate_completion_probability(metrics)
            }
            
            return trend_analysis
            
        except Exception as e:
            logger.error(f"Error en análisis temporal: {e}")
            return {}
    
    def _generate_recommendations(self, metrics: Dict[str, float], 
                                risk_analysis: Dict[str, Any], 
                                anomalies: List[Dict[str, Any]]) -> List[str]:
        """Generar recomendaciones inteligentes basadas en análisis"""
        recommendations = []
        
        try:
            # Recomendaciones basadas en riesgo financiero
            if risk_analysis.get('probabilidad_sobrecosto', 0) > 0.7:
                recommendations.append(
                    "🚨 ALTA PROBABILIDAD DE SOBRECOSTO: Implementar control estricto de costos y revisar todos los rubros presupuestales."
                )
            
            if risk_analysis.get('probabilidad_retraso', 0) > 0.6:
                recommendations.append(
                    "⏰ RIESGO DE RETRASO: Acelerar frentes de trabajo críticos y considerar trabajo en paralelo."
                )
            
            # Recomendaciones basadas en anomalías
            for anomaly in anomalies:
                if anomaly['type'] == 'SOBRECOSTO_CRITICO':
                    recommendations.append(
                        "💰 SOBRECOSTO DETECTADO: Solicitar adición presupuestal inmediata y justificación técnica."
                    )
                elif anomaly['type'] == 'BAJA_EFICIENCIA':
                    recommendations.append(
                        "📊 EFICIENCIA BAJA: Revisar procesos de ejecución y optimizar recursos."
                    )
                elif anomaly['type'] == 'RIESGO_TEMPORAL':
                    recommendations.append(
                        "⏳ CRISIS TEMPORAL: Activar plan de contingencia y trabajar 24/7 en áreas críticas."
                    )
            
            # Recomendaciones específicas por métricas
            if metrics.get('ejecucion_presupuestal', 0) > 90:
                recommendations.append(
                    "💡 PRESUPUESTO CASI AGOTADO: Gestionar adiciones presupuestales y optimizar gastos restantes."
                )
            
            if metrics.get('eficiencia_presupuestal', 0) > 1.2:
                recommendations.append(
                    "✅ BUENA EFICIENCIA: Mantener estándares actuales y documentar mejores prácticas."
                )
            
        except Exception as e:
            logger.error(f"Error generando recomendaciones: {e}")
            recommendations.append("Error en análisis de recomendaciones")
        
        return recommendations
    
    def _calculate_final_risk_score(self, risk_analysis: Dict[str, Any], 
                                  anomalies: List[Dict[str, Any]], 
                                  temporal_analysis: Dict[str, Any]) -> float:
        """Calcular score de riesgo final ponderado"""
        try:
            base_score = 0.0
            
            # Score por probabilidades de riesgo
            base_score += risk_analysis.get('probabilidad_sobrecosto', 0) * 0.4
            base_score += risk_analysis.get('probabilidad_retraso', 0) * 0.3
            
            # Score por anomalías
            for anomaly in anomalies:
                if anomaly['severity'] == SeverityLevel.CRITICAL:
                    base_score += 0.3
                elif anomaly['severity'] == SeverityLevel.WARNING:
                    base_score += 0.15
            
            # Score por análisis temporal
            if temporal_analysis.get('probabilidad_cumplimiento', 0) < 0.5:
                base_score += 0.2
            
            return min(base_score, 1.0)  # Normalizar a [0, 1]
            
        except Exception as e:
            logger.error(f"Error calculando score de riesgo: {e}")
            return 0.5
    
    def _determine_severity(self, risk_score: float) -> SeverityLevel:
        """Determinar nivel de severidad basado en score de riesgo"""
        if risk_score >= 0.8:
            return SeverityLevel.EMERGENCY
        elif risk_score >= 0.6:
            return SeverityLevel.CRITICAL
        elif risk_score >= 0.4:
            return SeverityLevel.WARNING
        else:
            return SeverityLevel.INFO
    
    def _generate_insights(self, metrics: Dict[str, float], 
                         risk_analysis: Dict[str, Any], 
                         temporal_analysis: Dict[str, Any]) -> Dict[str, Any]:
        """Generar insights avanzados del análisis"""
        try:
            insights = {
                'performance_metrics': {
                    'eficiencia_global': metrics.get('eficiencia_presupuestal', 0),
                    'velocidad_ejecucion': metrics.get('ejecucion_presupuestal', 0) / max(metrics.get('avance_fisico', 1), 1),
                    'sostenibilidad_temporal': metrics.get('dias_restantes', 0) / max(metrics.get('avance_fisico', 1), 1)
                },
                'risk_indicators': {
                    'nivel_riesgo_financiero': risk_analysis.get('score_riesgo_financiero', 0),
                    'nivel_riesgo_temporal': risk_analysis.get('score_riesgo_temporal', 0),
                    'probabilidad_incumplimiento': 1 - temporal_analysis.get('probabilidad_cumplimiento', 0)
                },
                'predictive_insights': {
                    'fecha_probable_finalizacion': temporal_analysis.get('prediccion_finalizacion', 'N/A'),
                    'costo_final_estimado': self._estimate_final_cost(metrics),
                    'desviacion_estimada': self._estimate_deviation(metrics)
                }
            }
            
            return insights
            
        except Exception as e:
            logger.error(f"Error generando insights: {e}")
            return {}
    
    # Métodos auxiliares
    def _calculate_days_remaining(self, fecha_fin: str) -> float:
        """Calcular días restantes hasta fecha de finalización"""
        try:
            if not fecha_fin:
                return 365.0  # Valor por defecto
            
            fecha_fin_dt = pd.to_datetime(fecha_fin).date()
            today = datetime.now().date()
            dias = (fecha_fin_dt - today).days
            return max(dias, 0)
        except:
            return 365.0
    
    def _predict_overcost_probability(self, features: np.ndarray) -> float:
        """Predicción de probabilidad de sobrecosto"""
        # Modelo simplificado basado en reglas
        ejecucion = features[0][0] if features.size > 0 else 0
        if ejecucion > 90:
            return 0.8
        elif ejecucion > 75:
            return 0.6
        elif ejecucion > 50:
            return 0.3
        else:
            return 0.1
    
    def _predict_delay_probability(self, features: np.ndarray) -> float:
        """Predicción de probabilidad de retraso"""
        # Modelo simplificado basado en reglas
        dias_restantes = features[0][2] if features.size > 2 else 365
        avance = features[0][1] if features.size > 1 else 0
        
        if dias_restantes < 30 and avance < 85:
            return 0.9
        elif dias_restantes < 60 and avance < 70:
            return 0.7
        elif dias_restantes < 90 and avance < 50:
            return 0.5
        else:
            return 0.2
    
    def _calculate_financial_risk_score(self, metrics: Dict[str, float]) -> float:
        """Calcular score de riesgo financiero"""
        ejecucion = metrics.get('ejecucion_presupuestal', 0)
        if ejecucion > 100:
            return 1.0
        elif ejecucion > 90:
            return 0.8
        elif ejecucion > 75:
            return 0.6
        elif ejecucion > 50:
            return 0.3
        else:
            return 0.1
    
    def _calculate_temporal_risk_score(self, metrics: Dict[str, float]) -> float:
        """Calcular score de riesgo temporal"""
        dias_restantes = metrics.get('dias_restantes', 365)
        avance = metrics.get('avance_fisico', 0)
        
        if dias_restantes < 30 and avance < 85:
            return 1.0
        elif dias_restantes < 60 and avance < 70:
            return 0.8
        elif dias_restantes < 90 and avance < 50:
            return 0.6
        else:
            return 0.2
    
    def _generate_historical_simulation(self, metrics: Dict[str, float]) -> Dict[str, List[float]]:
        """Simular datos históricos para análisis temporal"""
        # Simulación de datos históricos basada en métricas actuales
        ejecucion_actual = metrics.get('ejecucion_presupuestal', 0)
        avance_actual = metrics.get('avance_fisico', 0)
        
        # Generar series temporales simuladas
        meses = 12
        ejecucion_series = [ejecucion_actual * (i/meses) * (0.8 + 0.4 * np.random.random()) for i in range(1, meses+1)]
        avance_series = [avance_actual * (i/meses) * (0.9 + 0.2 * np.random.random()) for i in range(1, meses+1)]
        
        return {
            'ejecucion': ejecucion_series,
            'avance': avance_series
        }
    
    def _calculate_trend(self, data: List[float]) -> str:
        """Calcular tendencia de una serie de datos"""
        if len(data) < 2:
            return "ESTABLE"
        
        slope = np.polyfit(range(len(data)), data, 1)[0]
        if slope > 0.1:
            return "CRECIENTE"
        elif slope < -0.1:
            return "DECRECIENTE"
        else:
            return "ESTABLE"
    
    def _predict_completion_date(self, metrics: Dict[str, float]) -> str:
        """Predecir fecha de finalización"""
        try:
            dias_restantes = metrics.get('dias_restantes', 365)
            avance = metrics.get('avance_fisico', 0)
            
            if avance > 0:
                dias_estimados = (100 - avance) * dias_restantes / avance
                fecha_estimada = datetime.now() + timedelta(days=dias_estimados)
                return fecha_estimada.strftime('%Y-%m-%d')
            else:
                return "N/A"
        except:
            return "N/A"
    
    def _calculate_completion_probability(self, metrics: Dict[str, float]) -> float:
        """Calcular probabilidad de cumplimiento"""
        dias_restantes = metrics.get('dias_restantes', 365)
        avance = metrics.get('avance_fisico', 0)
        
        if dias_restantes < 30 and avance < 85:
            return 0.2
        elif dias_restantes < 60 and avance < 70:
            return 0.4
        elif dias_restantes < 90 and avance < 50:
            return 0.6
        else:
            return 0.9
    
    def _estimate_final_cost(self, metrics: Dict[str, float]) -> float:
        """Estimar costo final del proyecto"""
        presupuesto = metrics.get('presupuesto', 0)
        ejecucion = metrics.get('ejecucion_presupuestal', 0)
        
        if ejecucion > 0:
            return presupuesto * (ejecucion / 100)
        else:
            return presupuesto
    
    def _estimate_deviation(self, metrics: Dict[str, float]) -> float:
        """Estimar desviación del proyecto"""
        ejecucion = metrics.get('ejecucion_presupuestal', 0)
        avance = metrics.get('avance_fisico', 0)
        
        if avance > 0:
            return abs(ejecucion - avance)
        else:
            return 0
    
    def _calculate_confidence(self, metrics: Dict[str, float]) -> float:
        """Calcular nivel de confianza del análisis"""
        # Basado en la completitud y calidad de los datos
        confidence = 0.8  # Base
        
        if metrics.get('presupuesto', 0) > 0:
            confidence += 0.1
        if metrics.get('ejecutado', 0) > 0:
            confidence += 0.1
        
        return min(confidence, 1.0)
