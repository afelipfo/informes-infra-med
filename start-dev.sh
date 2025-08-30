#!/usr/bin/env bash
# Script para iniciar el proyecto en modo desarrollo

echo "🚀 Iniciando Sistema de Informes - Infraestructura Medellín"
echo "=================================================="

# Verificar si Docker está corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker no está corriendo. Por favor inicia Docker Desktop."
    exit 1
fi

echo "✅ Docker está disponible"

# Verificar si existe docker-compose.yml
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ No se encontró docker-compose.yml"
    exit 1
fi

echo "📦 Construyendo e iniciando servicios con Docker Compose..."
docker-compose up --build

echo "🎉 ¡Sistema iniciado exitosamente!"
echo ""
echo "URLs disponibles:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- Documentación API: http://localhost:8000/docs"
