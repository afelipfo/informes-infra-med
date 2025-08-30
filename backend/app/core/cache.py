"""
Sistema de cache mejorado con Redis
"""
import json
import hashlib
from typing import Any, Optional, Union
import redis.asyncio as redis
from app.core.config import settings
from app.core.logging.config import get_logger

logger = get_logger(__name__)

class CacheManager:
    """Gestor de cache con Redis"""
    
    def __init__(self):
        self.redis_client = None
        self.enabled = settings.REDIS_ENABLED
        self.default_ttl = settings.REDIS_TTL
    
    async def get_client(self) -> Optional[redis.Redis]:
        """Obtener cliente Redis"""
        if not self.enabled:
            return None
            
        if self.redis_client is None:
            try:
                self.redis_client = redis.from_url(settings.REDIS_URL)
                await self.redis_client.ping()
                logger.info("Redis connection established")
            except Exception as e:
                logger.warning(f"Redis connection failed: {e}")
                self.redis_client = None
                return None
        
        return self.redis_client
    
    def _generate_key(self, prefix: str, *args, **kwargs) -> str:
        """Generar clave única para cache"""
        key_parts = [prefix]
        
        # Agregar argumentos posicionales
        for arg in args:
            key_parts.append(str(arg))
        
        # Agregar argumentos nombrados ordenados
        for key, value in sorted(kwargs.items()):
            key_parts.append(f"{key}:{value}")
        
        key_string = ":".join(key_parts)
        return hashlib.md5(key_string.encode()).hexdigest()
    
    async def get(self, key: str) -> Optional[Any]:
        """Obtener valor del cache"""
        client = await self.get_client()
        if not client:
            return None
            
        try:
            value = await client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error getting cache key {key}: {e}")
            return None
    
    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """Establecer valor en cache"""
        client = await self.get_client()
        if not client:
            return False
            
        try:
            ttl = ttl or self.default_ttl
            await client.setex(key, ttl, json.dumps(value))
            return True
        except Exception as e:
            logger.error(f"Error setting cache key {key}: {e}")
            return False
    
    async def delete(self, key: str) -> bool:
        """Eliminar clave del cache"""
        client = await self.get_client()
        if not client:
            return False
            
        try:
            await client.delete(key)
            return True
        except Exception as e:
            logger.error(f"Error deleting cache key {key}: {e}")
            return False
    
    async def clear_pattern(self, pattern: str) -> int:
        """Eliminar claves que coincidan con un patrón"""
        client = await self.get_client()
        if not client:
            return 0
            
        try:
            keys = await client.keys(pattern)
            if keys:
                await client.delete(*keys)
                return len(keys)
            return 0
        except Exception as e:
            logger.error(f"Error clearing cache pattern {pattern}: {e}")
            return 0
    
    async def exists(self, key: str) -> bool:
        """Verificar si existe una clave"""
        client = await self.get_client()
        if not client:
            return False
            
        try:
            return await client.exists(key) > 0
        except Exception as e:
            logger.error(f"Error checking cache key {key}: {e}")
            return False

# Instancia global del gestor de cache
cache_manager = CacheManager()

def cache_result(prefix: str, ttl: Optional[int] = None):
    """Decorador para cachear resultados de funciones"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Generar clave única
            cache_key = cache_manager._generate_key(prefix, *args, **kwargs)
            
            # Intentar obtener del cache
            cached_result = await cache_manager.get(cache_key)
            if cached_result is not None:
                logger.debug(f"Cache hit for key: {cache_key}")
                return cached_result
            
            # Ejecutar función y cachear resultado
            result = await func(*args, **kwargs)
            await cache_manager.set(cache_key, result, ttl)
            logger.debug(f"Cache miss for key: {cache_key}, stored result")
            
            return result
        
        return wrapper
    return decorator
