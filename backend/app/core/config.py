# Fichero: backend/app/core/config.py

from pydantic_settings import BaseSettings
from typing import Optional, List
import os

class Settings(BaseSettings):
    """
    Configuraciones de la aplicación, cargadas desde el archivo .env.
    """
    PROJECT_NAME: str = "API de Generación de Informes - Infraestructura Medellín"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Base de datos
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/informes_db"
    
    # Autenticación JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Redis para cache
    REDIS_URL: str = "redis://localhost:6379"
    REDIS_ENABLED: bool = True
    
    # Configuración de archivos
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_EXTENSIONS: List[str] = [".csv", ".xlsx", ".xls"]
    
    # Logging
    LOG_LEVEL: str = "INFO"
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    
    # Rate Limiting
    RATE_LIMIT_ENABLED: bool = False
    REQUESTS_PER_MINUTE: int = 60
    
    # Security Headers
    SECURITY_HEADERS_ENABLED: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

    def get_cors_origins(self) -> List[str]:
        """Obtener orígenes CORS permitidos"""
        if self.ENVIRONMENT == "production":
            return [self.FRONTEND_URL]
        return self.ALLOWED_ORIGINS

# ✅ ¡ESTA ES LA LÍNEA CLAVE!
# Se crea una instancia de la clase Settings que se llamará "settings"
settings = Settings()