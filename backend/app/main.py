# Fichero: backend/app/main.py

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
import time
import structlog
from app.core.config import settings
from app.api.api import api_router
from app.core.logging.config import configure_logging

# Configurar logging al inicio de la aplicación
configure_logging()
logger = structlog.get_logger()

# Creación de la instancia de la aplicación con optimizaciones
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="API para la generación automática de informes técnicos para la Secretaría de Infraestructura.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    # Optimizaciones de rendimiento
    default_response_class=JSONResponse,
)

# Middleware de compresión GZIP para mejorar el rendimiento
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Configuración de CORS optimizada para permitir requests del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Total-Count", "X-Processing-Time"],
)

# Middleware personalizado para logging de rendimiento
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    
    # Log de inicio de request
    logger.info(
        "Request started",
        method=request.method,
        url=str(request.url),
        client_ip=request.client.host if request.client else None,
        user_agent=request.headers.get("user-agent", ""),
    )
    
    try:
        response = await call_next(request)
        
        # Calcular tiempo de procesamiento
        process_time = time.time() - start_time
        
        # Agregar header de tiempo de procesamiento
        response.headers["X-Processing-Time"] = str(process_time)
        
        # Log de finalización exitosa
        logger.info(
            "Request completed",
            method=request.method,
            url=str(request.url),
            status_code=response.status_code,
            process_time=process_time,
        )
        
        return response
        
    except Exception as e:
        # Log de errores
        process_time = time.time() - start_time
        logger.error(
            "Request failed",
            method=request.method,
            url=str(request.url),
            error=str(e),
            process_time=process_time,
        )
        raise

# Middleware para manejo de errores global
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
        "Unhandled exception",
        method=request.method,
        url=str(request.url),
        error=str(exc),
        error_type=type(exc).__name__,
    )
    
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": "Ha ocurrido un error interno del servidor",
            "timestamp": time.time(),
        }
    )

# Inclusión del router principal con el prefijo definido en .env
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Root"])
async def read_root():
    """Endpoint raíz para verificar que la API está funcionando."""
    return {
        "status": "OK", 
        "message": f"Bienvenido a {settings.PROJECT_NAME}",
        "version": "2.0.0",
        "environment": settings.ENVIRONMENT,
        "timestamp": time.time(),
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check básico del sistema."""
    return {
        "status": "healthy",
        "service": "informes-api",
        "version": "2.0.0",
        "timestamp": time.time(),
    }

# Event handlers para logging de ciclo de vida de la aplicación
@app.on_event("startup")
async def startup_event():
    """Evento ejecutado al iniciar la aplicación."""
    logger.info(
        "Application starting",
        version="2.0.0",
        environment=settings.ENVIRONMENT,
        cors_origins=settings.get_cors_origins(),
    )

@app.on_event("shutdown")
async def shutdown_event():
    """Evento ejecutado al cerrar la aplicación."""
    logger.info("Application shutting down")

# Health checks moved to dedicated endpoint module