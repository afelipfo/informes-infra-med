"""
Endpoints de health check y monitoreo del sistema
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import Dict, Any
import redis.asyncio as redis
import time
import psutil
import os
from app.db.session import get_db_optional
from app.core.config import settings
from app.core.metrics import metrics_collector

router = APIRouter()

@router.get("/health", tags=["Health"], summary="Health Check Básico")
async def basic_health():
    """Health check básico para verificar que la API está funcionando"""
    return {
        "status": "healthy",
        "service": "informes-api",
        "version": "2.0.0",
        "timestamp": int(time.time())
    }

@router.get("/health/detailed", tags=["Health"], summary="Health Check Detallado")
async def detailed_health(db: AsyncSession = Depends(get_db_optional)):
    """Health check detallado con verificación de dependencias"""
    health_status = {
        "status": "healthy",
        "service": "informes-api",
        "version": "2.0.0",
        "timestamp": int(time.time()),
        "checks": {
            "database": {"status": "unknown", "response_time": None},
            "redis": {"status": "unknown", "response_time": None},
            "storage": {"status": "healthy", "response_time": 0}
        }
    }
    
    overall_healthy = True
    
    # Check Database
    if db is not None:
        try:
            start_time = time.time()
            await db.execute(text("SELECT 1"))
            db_response_time = round((time.time() - start_time) * 1000, 2)
            health_status["checks"]["database"] = {
                "status": "healthy",
                "response_time": f"{db_response_time}ms"
            }
        except Exception as e:
            health_status["checks"]["database"] = {
                "status": "unhealthy",
                "error": str(e)
            }
            overall_healthy = False
    else:
        health_status["checks"]["database"] = {
            "status": "unavailable",
            "message": "Database connection not available"
        }
        # No marcar como unhealthy si la DB es opcional
    
    # Check Redis
    if settings.REDIS_ENABLED:
        try:
            start_time = time.time()
            redis_client = redis.from_url(settings.REDIS_URL)
            await redis_client.ping()
            redis_response_time = round((time.time() - start_time) * 1000, 2)
            health_status["checks"]["redis"] = {
                "status": "healthy",
                "response_time": f"{redis_response_time}ms"
            }
            await redis_client.close()
        except Exception as e:
            health_status["checks"]["redis"] = {
                "status": "unhealthy",
                "error": str(e)
            }
            # Redis es opcional, no afecta el estado general
    else:
        health_status["checks"]["redis"] = {
            "status": "disabled",
            "message": "Redis is disabled in configuration"
        }
    
    # Set overall status
    health_status["status"] = "healthy" if overall_healthy else "unhealthy"
    
    return health_status

@router.get("/health/readiness", tags=["Health"], summary="Readiness Check")
async def readiness_check():
    """Verifica si el servicio está listo para recibir tráfico"""
    return {
        "status": "ready",
        "service": "informes-api",
        "timestamp": int(time.time()),
        "message": "Service is ready to accept traffic"
    }

@router.get("/health/liveness", tags=["Health"], summary="Liveness Check") 
async def liveness_check():
    """Verifica si el servicio está vivo"""
    return {
        "status": "alive",
        "service": "informes-api", 
        "timestamp": int(time.time()),
        "message": "Service is alive"
    }

@router.get("/metrics", tags=["Health"], summary="Métricas del Sistema")
async def get_metrics():
    """Obtiene métricas de rendimiento del sistema"""
    # Información del sistema
    system_info = {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "memory_percent": psutil.virtual_memory().percent,
        "disk_usage": psutil.disk_usage('/').percent,
        "uptime": time.time() - psutil.boot_time()
    }
    
    # Métricas de la aplicación
    metrics_summary = metrics_collector.get_metrics_summary()
    
    return {
        "timestamp": int(time.time()),
        "system": system_info,
        "application_metrics": metrics_summary
    }
