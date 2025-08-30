"""
Sistema de rate limiting para proteger la API
"""
import time
from typing import Dict, Tuple, Optional
import redis.asyncio as redis
from fastapi import HTTPException, Request
from app.core.config import settings
from app.core.logging.config import get_logger

logger = get_logger(__name__)

class RateLimiter:
    """Sistema de rate limiting basado en Redis"""
    
    def __init__(self):
        self.redis_client = None
        self.enabled = settings.REDIS_ENABLED
    
    async def get_client(self) -> Optional[redis.Redis]:
        """Obtener cliente Redis"""
        if not self.enabled:
            return None
            
        if self.redis_client is None:
            try:
                self.redis_client = redis.from_url(settings.REDIS_URL)
                await self.redis_client.ping()
            except Exception as e:
                logger.warning(f"Redis connection failed for rate limiting: {e}")
                self.redis_client = None
                return None
        
        return self.redis_client
    
    def _get_client_ip(self, request: Request) -> str:
        """Obtener IP del cliente"""
        # Intentar obtener IP real detrás de proxy
        forwarded_for = request.headers.get("X-Forwarded-For")
        if forwarded_for:
            return forwarded_for.split(",")[0].strip()
        
        real_ip = request.headers.get("X-Real-IP")
        if real_ip:
            return real_ip
        
        return request.client.host if request.client else "unknown"
    
    async def check_rate_limit(
        self, 
        request: Request, 
        max_requests: int = 100, 
        window_seconds: int = 60
    ) -> Tuple[bool, Dict]:
        """
        Verificar rate limit para un cliente
        
        Args:
            request: Request de FastAPI
            max_requests: Máximo número de requests en la ventana
            window_seconds: Ventana de tiempo en segundos
            
        Returns:
            Tuple[bool, Dict]: (allowed, rate_limit_info)
        """
        client = await self.get_client()
        if not client:
            # Si Redis no está disponible, permitir todas las requests
            return True, {"remaining": max_requests, "reset_time": int(time.time()) + window_seconds}
        
        client_ip = self._get_client_ip(request)
        current_time = int(time.time())
        window_start = current_time - (current_time % window_seconds)
        
        # Clave para el rate limit
        rate_limit_key = f"rate_limit:{client_ip}:{window_start}"
        
        try:
            # Obtener requests actuales
            current_requests = await client.get(rate_limit_key)
            current_requests = int(current_requests) if current_requests else 0
            
            if current_requests >= max_requests:
                # Rate limit excedido
                reset_time = window_start + window_seconds
                return False, {
                    "remaining": 0,
                    "reset_time": reset_time,
                    "limit": max_requests,
                    "window_seconds": window_seconds
                }
            
            # Incrementar contador
            await client.incr(rate_limit_key)
            await client.expire(rate_limit_key, window_seconds)
            
            remaining = max_requests - (current_requests + 1)
            reset_time = window_start + window_seconds
            
            return True, {
                "remaining": remaining,
                "reset_time": reset_time,
                "limit": max_requests,
                "window_seconds": window_seconds
            }
            
        except Exception as e:
            logger.error(f"Error checking rate limit: {e}")
            # En caso de error, permitir la request
            return True, {"remaining": max_requests, "reset_time": int(time.time()) + window_seconds}

# Instancia global del rate limiter
rate_limiter = RateLimiter()

def rate_limit(max_requests: int = 100, window_seconds: int = 60):
    """Decorador para aplicar rate limiting a endpoints"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Buscar el objeto Request en los argumentos
            request = None
            for arg in args:
                if hasattr(arg, 'headers') and hasattr(arg, 'client'):
                    request = arg
                    break
            
            if not request:
                for value in kwargs.values():
                    if hasattr(value, 'headers') and hasattr(value, 'client'):
                        request = value
                        break
            
            if not request:
                # Si no encontramos Request, permitir la ejecución
                logger.warning("Rate limit decorator: Request object not found, allowing execution")
                return await func(*args, **kwargs)
            
            allowed, rate_limit_info = await rate_limiter.check_rate_limit(
                request, max_requests, window_seconds
            )
            
            if not allowed:
                raise HTTPException(
                    status_code=429,
                    detail={
                        "error": "Rate limit exceeded",
                        "rate_limit_info": rate_limit_info
                    }
                )
            
            # Ejecutar la función original
            response = await func(*args, **kwargs)
            
            # Agregar headers de rate limit si es posible
            if hasattr(response, 'headers'):
                response.headers["X-RateLimit-Limit"] = str(max_requests)
                response.headers["X-RateLimit-Remaining"] = str(rate_limit_info["remaining"])
                response.headers["X-RateLimit-Reset"] = str(rate_limit_info["reset_time"])
            
            return response
        
        return wrapper
    return decorator
