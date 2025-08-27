@echo off
REM Script para verificar la instalación local del proyecto en Windows

echo 🔍 Verificando proyecto Informes Infraestructura Medellín...
echo.

REM Verificar estructura de archivos
echo 📁 Verificando estructura de archivos...
if exist "docker-compose.yml" (
    echo ✅ docker-compose.yml existe
) else (
    echo ❌ docker-compose.yml no encontrado
)

if exist "backend\requirements.txt" (
    echo ✅ Backend requirements.txt existe
) else (
    echo ❌ Backend requirements.txt no encontrado
)

if exist "frontend\package.json" (
    echo ✅ Frontend package.json existe
) else (
    echo ❌ Frontend package.json no encontrado
)

echo.
echo 🐳 Para ejecutar con Docker:
echo 1. Inicia Docker Desktop
echo 2. Ejecuta: docker-compose up --build
echo.
echo 🛠️ Para ejecutar manualmente:
echo.
echo Backend:
echo   cd backend
echo   pip install -r requirements.txt
echo   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
echo.
echo Frontend:
echo   cd frontend
echo   npm install
echo   npm run dev
echo.
echo URLs:
echo   Frontend: http://localhost:3000
echo   Backend: http://localhost:8000
echo   API Docs: http://localhost:8000/docs
