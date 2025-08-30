"""
Sistema de logging estructurado usando structlog
"""
import structlog
import logging
from app.core.config import settings

def configure_logging():
    """
    Configurar el sistema de logging estructurado
    """
    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.StackInfoRenderer(),
            structlog.dev.set_exc_info,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.dev.ConsoleRenderer() if settings.LOG_LEVEL == "DEBUG" 
            else structlog.processors.JSONRenderer()
        ],
        wrapper_class=structlog.make_filtering_bound_logger(
            getattr(logging, settings.LOG_LEVEL.upper())
        ),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(),
        cache_logger_on_first_use=False,
    )

def get_logger(name: str = __name__):
    """
    Obtener un logger estructurado
    """
    return structlog.get_logger(name)
