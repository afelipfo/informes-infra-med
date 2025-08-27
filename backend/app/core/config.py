# Fichero: backend/app/core/config.py

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Configuraciones de la aplicación, cargadas desde el archivo .env.
    """
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# ✅ ¡ESTA ES LA LÍNEA CLAVE!
# Se crea una instancia de la clase Settings que se llamará "settings"
settings = Settings()