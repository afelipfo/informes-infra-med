#!/bin/bash

# Script de inicio para Railway - Sistema de Informes Infraestructura Medellín

echo "🚀 Iniciando Sistema de Informes en Railway..."

# Función para manejar la terminación
cleanup() {
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID $NGINX_PID 2>/dev/null
    exit 0
}

# Configurar trap para manejar señales de terminación
trap cleanup SIGTERM SIGINT

# Verificar que el puerto esté disponible
if [ -z "$PORT" ]; then
    echo "⚠️ Variable PORT no definida, usando puerto 3000"
    export PORT=3000
fi

echo "📊 Puerto configurado: $PORT"

# Iniciar backend en segundo plano
echo "🔧 Iniciando backend..."
cd /app/backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 1 &
BACKEND_PID=$!

# Esperar a que el backend esté listo
echo "⏳ Esperando a que el backend esté listo..."
for i in {1..30}; do
    if curl -f http://127.0.0.1:8000/health >/dev/null 2>&1; then
        echo "✅ Backend iniciado correctamente"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Error: Backend no se inició correctamente"
        exit 1
    fi
    sleep 1
done

# Iniciar frontend en segundo plano
echo "🎨 Iniciando frontend..."
cd /app/frontend
npm start &
FRONTEND_PID=$!

# Esperar a que el frontend esté listo
echo "⏳ Esperando a que el frontend esté listo..."
for i in {1..30}; do
    if curl -f http://127.0.0.1:3000 >/dev/null 2>&1; then
        echo "✅ Frontend iniciado correctamente"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Error: Frontend no se inició correctamente"
        exit 1
    fi
    sleep 1
done

# Iniciar nginx
echo "🌐 Iniciando nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

echo "🎉 Sistema de Informes iniciado correctamente!"
echo "📱 Aplicación disponible en el puerto: $PORT"
echo "🔍 Health check: http://localhost:$PORT/health"

# Mantener el script ejecutándose
wait
