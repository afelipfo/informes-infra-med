# Fichero: backend/app/core/config.py

from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """
    Configuraciones de la aplicación, cargadas desde el archivo .env.
    """
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"
    
    # Base de datos
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/informes_db"
    
    # Autenticación JWT
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Redis para cache
    REDIS_URL: str = "redis://localhost:6379"
    
    # Configuración de archivos
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
    ALLOWED_FILE_EXTENSIONS: list = [".csv", ".xlsx", ".xls"]
    
    # Logging
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# ✅ ¡ESTA ES LA LÍNEA CLAVE!
# Se crea una instancia de la clase Settings que se llamará "settings"
settings = Settings()