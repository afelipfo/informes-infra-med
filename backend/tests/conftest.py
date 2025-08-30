"""
Configuración pytest para testing de la aplicación
"""
import pytest
import asyncio
from typing import AsyncGenerator
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from app.main import app
from app.db.session import get_db, Base
from app.core.config import settings

# Base de datos de prueba
TEST_DATABASE_URL = "postgresql+asyncpg://postgres:password@localhost:5432/informes_test_db"

engine_test = create_async_engine(TEST_DATABASE_URL, echo=True)
AsyncSessionLocalTest = async_sessionmaker(engine_test, class_=AsyncSession, expire_on_commit=False)

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Crear una sesión de base de datos para testing
    """
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocalTest() as session:
        yield session
    
    async with engine_test.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest.fixture
async def client(db_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    """
    Crear un cliente HTTP para testing
    """
    def override_get_db():
        return db_session
    
    app.dependency_overrides[get_db] = override_get_db
    
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
    
    app.dependency_overrides.clear()
