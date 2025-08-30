# Fichero: backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api import api_router
from app.core.logging.config import configure_logging

# Configurar logging al inicio de la aplicación
configure_logging()

# Creación de la instancia de la aplicación
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="API para la generación automática de informes técnicos para la Secretaría de Infraestructura.",
    version="1.0.0"
)

# Configuración de CORS para permitir requests del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Inclusión del router principal con el prefijo definido en .env
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
def read_root():
    """Endpoint raíz para verificar que la API está funcionando."""
    return {"status": "OK", "message": f"Bienvenido a {settings.PROJECT_NAME}"}

# Health checks moved to dedicated endpoint module