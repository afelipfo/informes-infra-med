# Fichero: backend/app/main.py

from fastapi import FastAPI
from app.core.config import settings
from app.api.api import api_router

# Creación de la instancia de la aplicación
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="API para la generación automática de informes técnicos para la Secretaría de Infraestructura.",
    version="1.0.0"
)

# Inclusión del router principal con el prefijo definido en .env
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
def read_root():
    """Endpoint raíz para verificar que la API está funcionando."""
    return {"status": "OK", "message": f"Bienvenido a {settings.PROJECT_NAME}"}