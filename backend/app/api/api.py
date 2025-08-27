# Fichero: backend/app/api/api.py

from fastapi import APIRouter
from app.api.endpoints import reports

api_router = APIRouter()

# Incluimos el router de 'reports' bajo el prefijo '/reports'
# La URL final será /api/v1/reports/generate
api_router.include_router(reports.router, prefix="/reports", tags=["Informes"])