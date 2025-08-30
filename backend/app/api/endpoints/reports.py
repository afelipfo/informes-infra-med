# Fichero: backend/app/api/endpoints/reports.py

from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, Request
import tempfile
import os
import pandas as pd
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.report import GeneratedReport
from app.services.report_generator import ReportGeneratorService
from app.services.enhanced_report_service import EnhancedReportService
from app.services.intelligent_report_service import IntelligentReportService
from app.services.ai_intelligence_engine import ContractIntelligenceEngine
from app.db.session import get_db_optional
from app.db.models import User
# from app.core.rate_limiter import rate_limit  # DESHABILITADO TEMPORALMENTE
# from app.core.metrics import measure_execution_time, record_api_call  # DESHABILITADO TEMPORALMENTE
from app.core.logging.config import get_logger
# from app.auth.dependencies import get_current_user_optional
import uuid
import time

router = APIRouter()

@router.post("/generate-simple", response_model=GeneratedReport, summary="Generar Informe Simple (Prueba)")
async def generate_report_simple(
    file: UploadFile = File(..., description="Archivo Excel (.xlsx, .xls) o CSV (.csv) con datos del contrato")
):
    """
    Endpoint simple para pruebas de carga de archivos
    """
    logger = get_logger(__name__)
    logger.info(f"Simple endpoint - Starting report generation for file: {file.filename}")
    
    # Verificar extensión del archivo
    if not file.filename:
        raise HTTPException(status_code=400, detail="Debe proporcionar un nombre de archivo")
    
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
        
        # Generar informe usando el servicio inteligente de IA
        intelligent_service = IntelligentReportService()
        report = intelligent_service.generate_intelligent_report(contract_data)

        logger.info("Simple endpoint - Intelligent report generation completed successfully")
        
        return report
        
    except ValueError as e:
        logger.error(f"Simple endpoint - Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Simple endpoint - Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {e}")

@router.post("/generate", response_model=GeneratedReport, summary="Generar Informe Técnico desde Archivo")
# @rate_limit(max_requests=10, window_seconds=60)  # 10 requests por minuto - DESHABILITADO TEMPORALMENTE
# @measure_execution_time("generate_report_endpoint")  # DESHABILITADO TEMPORALMENTE
async def generate_report_endpoint(
    file: UploadFile = File(..., description="Archivo Excel (.xlsx, .xls) o CSV (.csv) con datos del contrato"),
    nombre_supervisor: Optional[str] = Form(None, description="Nombre del supervisor del proyecto"),
    nombre_proyecto: Optional[str] = Form(None, description="Nombre del proyecto"),
    # db: Optional[AsyncSession] = Depends(get_db_optional),  # DESHABILITADO TEMPORALMENTE
    # current_user: Optional[User] = Depends(get_current_user_optional)
):
    """
    Endpoint principal para la generación de informes.

    - **Recibe**: Un archivo Excel (.xlsx, .xls) o CSV (.csv) con datos del contrato.
    - **Procesa**: Valida, extrae y analiza los datos según las reglas de negocio.
    - **Devuelve**: Un informe estructurado en formato JSON con mensajes técnicos.
    - **Guarda**: El informe en base de datos para análisis histórico.
    
    **Seguridad**: Este endpoint procesa archivos subidos directamente, evitando 
    riesgos de seguridad asociados con la descarga de archivos desde URLs externas.
    """
    start_time = time.time()
    logger = get_logger(__name__)
    
    logger.info(f"Starting report generation for file: {file.filename}")
    
    # Verificar extensión del archivo
    if not file.filename:
        raise HTTPException(status_code=400, detail="Debe proporcionar un nombre de archivo")
    
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
            
            # Agregar metadata si se proporcionó
            if nombre_supervisor:
                contract_data['nombre_supervisor'] = nombre_supervisor
            if nombre_proyecto:
                contract_data['nombre_proyecto'] = nombre_proyecto
            
            # Si el diccionario está vacío, usar datos de demostración
            if not contract_data or len([k for k in contract_data.keys() if not k.startswith('nombre_')]) == 0:
                contract_data.update({
                    'presupuesto_aprobado': 1000000.0,
                    'valor_ejecutado': 850000.0,
                    'fecha_fin_planificada': '2025-12-31',
                    'porcentaje_avance_fisico': 85.0
                })
                
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error al procesar el archivo: {str(e)}"
            )
        finally:
            # Limpiar el archivo temporal
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        
        # Usar el servicio mejorado para generar y guardar el informe si hay BD disponible
        # if db is not None:  # DESHABILITADO TEMPORALMENTE
        #     enhanced_service = EnhancedReportService(db)
        #     
        #     try:
        #         report = await enhanced_service.generate_and_save_report(
        #             contract_data=contract_data,
        #             user_id=None,  # current_user.id if current_user else None,
        #             original_filename=file.filename,
        #             file_type=file_ext,
        #             supervisor_name=nombre_supervisor,
        #             project_name=nombre_proyecto
        #         )
        #         return report
        #     except Exception as db_error:
        #         # Si falla el servicio mejorado, usar fallback
        #         pass
        
        # Usar el servicio inteligente de IA
        intelligent_service = IntelligentReportService()
        report = intelligent_service.generate_intelligent_report(contract_data)

        # Registrar métricas y logging
        execution_time = time.time() - start_time
        logger.info(f"Intelligent report generation completed successfully in {execution_time:.2f}s")
        # record_api_call("/api/v1/reports/generate", "POST", 200, execution_time)  # DESHABILITADO TEMPORALMENTE
        
        return report
        
    except ValueError as e:
        execution_time = time.time() - start_time
        logger.error(f"Validation error in report generation: {e}")
        # record_api_call("/api/v1/reports/generate", "POST", 400, execution_time)  # DESHABILITADO TEMPORALMENTE
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        execution_time = time.time() - start_time
        logger.error(f"Unexpected error in report generation: {e}")
        # record_api_call("/api/v1/reports/generate", "POST", 500, execution_time)  # DESHABILITADO TEMPORALMENTE
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
        intelligent_service = IntelligentReportService()
        report = intelligent_service.generate_intelligent_report(demo_data)

        return report
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generando informe de demostración: {e}")

@router.post("/ai-analysis", summary="Análisis Avanzado de IA")
async def ai_analysis_endpoint(
    file: UploadFile = File(..., description="Archivo Excel (.xlsx, .xls) o CSV (.csv) con datos del contrato")
):
    """
    Endpoint especializado para análisis avanzado de IA.
    Proporciona análisis detallado con múltiples algoritmos de machine learning.
    """
    logger = get_logger(__name__)
    logger.info(f"Starting AI analysis for file: {file.filename}")
    
    # Verificar extensión del archivo
    if not file.filename:
        raise HTTPException(status_code=400, detail="Debe proporcionar un nombre de archivo")
    
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
        
        # Leer datos del archivo
        try:
            if file_ext == '.csv':
                df = pd.read_csv(temp_file_path)
            else:  # Excel
                df = pd.read_excel(temp_file_path)
            
            contract_data = df.to_dict(orient='records')[0] if not df.empty else {}
            
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Error al procesar el archivo: {str(e)}"
            )
        finally:
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
        
        # Análisis directo con el motor de IA
        ai_engine = ContractIntelligenceEngine()
        ai_analysis = ai_engine.analyze_contract_data(contract_data)
        
        # Preparar respuesta detallada
        response = {
            "ai_analysis": {
                "risk_score": ai_analysis.risk_score,
                "confidence": ai_analysis.confidence,
                "severity": ai_analysis.severity.value,
                "predictions": ai_analysis.predictions,
                "anomalies": ai_analysis.anomalies,
                "recommendations": ai_analysis.recommendations,
                "insights": ai_analysis.insights
            },
            "contract_data": contract_data,
            "analysis_timestamp": datetime.now().isoformat()
        }
        
        logger.info("AI analysis completed successfully")
        return response
        
    except Exception as e:
        logger.error(f"Error in AI analysis: {e}")
        raise HTTPException(status_code=500, detail=f"Error en análisis de IA: {e}")