"""
Dependencias de autenticación para FastAPI
"""
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional
from app.db.session import get_db, get_db_optional
from app.db.models import User
from app.auth.jwt import verify_token

# Configuración del esquema de autenticación Bearer
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Obtener el usuario actual desde el token JWT
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # Verificar el token
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise credentials_exception
    
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    
    # Buscar el usuario en la base de datos
    stmt = select(User).where(User.id == user_id)
    result = await db.execute(stmt)
    user = result.scalar_one_or_none()
    
    if user is None:
        raise credentials_exception
    
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)) -> User:
    """
    Verificar que el usuario esté activo
    """
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

def require_role(required_role: str):
    """
    Dependencia para requerir un rol específico
    """
    def role_checker(current_user: User = Depends(get_current_active_user)):
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions"
            )
        return current_user
    return role_checker

# Dependencias específicas por rol
require_admin = require_role("admin")
require_generator = require_role("generator")

async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: Optional[AsyncSession] = Depends(get_db_optional)
) -> Optional[User]:
    """
    Obtener el usuario actual desde el token JWT, pero sin fallar si no hay token.
    Útil para endpoints que pueden funcionar con o sin autenticación.
    """
    if credentials is None:
        return None
        
    # Verificar el token
    payload = verify_token(credentials.credentials)
    if payload is None:
        return None
    
    user_id: str = payload.get("sub")
    if user_id is None:
        return None
    
    # Si no hay BD disponible, retornar None
    if db is None:
        return None
    
    try:
        # Buscar el usuario en la base de datos
        stmt = select(User).where(User.id == user_id)
        result = await db.execute(stmt)
        user = result.scalar_one_or_none()
        return user
    except Exception:
        # Si hay error con la BD, simplemente retornar None
        return None
