# Fichero: backend/tests/conftest.py
import sys
import os
import asyncio
from typing import AsyncGenerator

import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    AsyncSession,
    async_sessionmaker,
)
from sqlalchemy.sql import text

# Añadir el directorio raíz del proyecto para que los módulos sean importables
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.db.session import get_db, Base
from app.core.config import settings

# --- URLs de Base de Datos ---
# Usamos el contenedor de postgres definido en docker-compose.yml
DB_USER = "postgres"
DB_PASSWORD = "password"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME_TEST = "informes_test_db"

# URL para la base de datos de mantenimiento (para crear/eliminar la BD de prueba)
MAINTENANCE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/postgres"
# URL para la base de datos de prueba
TEST_DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME_TEST}"


# --- Motor y Sesión de Prueba ---
engine_test = create_async_engine(TEST_DATABASE_URL)
AsyncSessionLocalTest = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine_test, class_=AsyncSession
)


# --- Fixtures de Pytest ---

@pytest.fixture(scope="session")
def event_loop():
    """Crea un loop de eventos para toda la sesión de pruebas."""
    policy = asyncio.get_event_loop_policy()
    loop = policy.new_event_loop()
    yield loop
    loop.close()


@pytest_asyncio.fixture(scope="session", autouse=True)
async def setup_test_database():
    """
    Fixture a nivel de sesión para crear y destruir la base de datos de prueba.
    `autouse=True` asegura que se ejecute automáticamente para la sesión.
    """
    # Conectarse al motor de mantenimiento para crear la BD
    engine_maintenance = create_async_engine(MAINTENANCE_URL, isolation_level="AUTOCOMMIT")
    
    async with engine_maintenance.connect() as conn:
        # Forzar el cierre de conexiones existentes a la BD de prueba
        await conn.execute(text(f"""
            SELECT pg_terminate_backend(pg_stat_activity.pid)
            FROM pg_stat_activity
            WHERE pg_stat_activity.datname = '{DB_NAME_TEST}'
              AND pid <> pg_backend_pid();
        """))
        # Eliminar la BD si existe y crearla de nuevo
        await conn.execute(text(f"DROP DATABASE IF EXISTS {DB_NAME_TEST}"))
        await conn.execute(text(f"CREATE DATABASE {DB_NAME_TEST}"))
    
    await engine_maintenance.dispose()

    # Crear todas las tablas en la nueva BD de prueba
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    yield  # Las pruebas se ejecutan aquí

    # Limpieza: eliminar la BD de prueba después de que terminen las pruebas
    await engine_test.dispose()  # Cerrar todas las conexiones del pool
    async with engine_maintenance.connect() as conn:
        await conn.execute(text(f"DROP DATABASE IF EXISTS {DB_NAME_TEST}"))
    
    await engine_maintenance.dispose()


@pytest_asyncio.fixture(scope="function")
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Fixture a nivel de función que proporciona una sesión de BD transaccional
    para cada prueba.
    """
    session = AsyncSessionLocalTest()
    try:
        yield session
    finally:
        await session.close()


@pytest_asyncio.fixture(scope="function")
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """
    Crea un cliente HTTP de prueba (AsyncClient) que anula la dependencia
    de la base de datos para usar la sesión de prueba.
    """

    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()
