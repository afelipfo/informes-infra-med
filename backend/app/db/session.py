"""
Configuración de la base de datos PostgreSQL con SQLAlchemy async
"""
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import text
import os
from typing import AsyncGenerator, Optional

# URL de conexión a PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:password@localhost:5432/informes_db")

# Motor de base de datos async
engine = create_async_engine(
    DATABASE_URL,
    echo=True,  # Log SQL queries en desarrollo
    future=True
)

# Factory de sesiones async
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

class Base(DeclarativeBase):
    """Clase base para todos los modelos ORM"""
    pass

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency para obtener una sesión de base de datos async.
    Se usa como dependencia en los endpoints de FastAPI.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def get_db_optional() -> AsyncGenerator[Optional[AsyncSession], None]:
    """
    Dependency opcional para obtener una sesión de base de datos async.
    Retorna None si la base de datos no está disponible.
    """
    try:
        async with AsyncSessionLocal() as session:
            # Test connection
            await session.execute(text("SELECT 1"))
            yield session
    except Exception as e:
        print(f"Database connection failed: {e}")
        yield None

async def create_tables():
    """Crear todas las tablas en la base de datos"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def drop_tables():
    """Eliminar todas las tablas (útil para testing)"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

async def get_db_optional() -> AsyncGenerator[Optional[AsyncSession], None]:
    """
    Dependency para obtener una sesión de base de datos async de forma opcional.
    Si la BD no está disponible, devuelve None en lugar de fallar.
    Útil para endpoints que pueden funcionar con o sin BD.
    """
    try:
        async with AsyncSessionLocal() as session:
            yield session
    except Exception:
        # Si hay error conectando a la BD, devolver None
        yield None
