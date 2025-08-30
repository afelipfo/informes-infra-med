# Fichero: backend/app/api/api.py

from fastapi import APIRouter
from app.api.endpoints import reports, health

api_router = APIRouter()

# Incluimos el router de 'reports' bajo el prefijo '/reports'
# La URL final será /api/v1/reports/generate
api_router.include_router(reports.router, prefix="/reports", tags=["Informes"])

# Incluimos el router de 'health' para monitoreo
api_router.include_router(health.router, tags=["Health"])