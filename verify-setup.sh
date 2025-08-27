#!/bin/bash
# Script para verificar la instalación local del proyecto

echo "🔍 Verificando proyecto Informes Infraestructura Medellín..."
echo ""

# Verificar estructura de archivos
echo "📁 Verificando estructura de archivos..."
if [ -f "docker-compose.yml" ]; then
    echo "✅ docker-compose.yml existe"
else
    echo "❌ docker-compose.yml no encontrado"
fi

if [ -f "backend/requirements.txt" ]; then
    echo "✅ Backend requirements.txt existe"
else
    echo "❌ Backend requirements.txt no encontrado"
fi

if [ -f "frontend/package.json" ]; then
    echo "✅ Frontend package.json existe"
else
    echo "❌ Frontend package.json no encontrado"
fi

echo ""
echo "🐳 Para ejecutar con Docker:"
echo "1. Inicia Docker Desktop"
echo "2. Ejecuta: docker-compose up --build"
echo ""
echo "🛠️ Para ejecutar manualmente:"
echo ""
echo "Backend:"
echo "  cd backend"
echo "  pip install -r requirements.txt"
echo "  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "Frontend:"
echo "  cd frontend"
echo "  npm install"
echo "  npm run dev"
echo ""
echo "URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend: http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
