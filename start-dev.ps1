# Script PowerShell para iniciar el proyecto en modo desarrollo

Write-Host "🚀 Iniciando Sistema de Informes - Infraestructura Medellín" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Yellow
Write-Host ""

# Verificar si Docker está corriendo
try {
    $dockerInfo = docker info 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker not running"
    }
    Write-Host "✅ Docker está disponible" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Verificar si existe docker-compose.yml
if (-not (Test-Path "docker-compose.yml")) {
    Write-Host "❌ No se encontró docker-compose.yml" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Construyendo e iniciando servicios con Docker Compose..." -ForegroundColor Blue
docker-compose up --build

Write-Host ""
Write-Host "🎉 ¡Sistema iniciado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "URLs disponibles:" -ForegroundColor Cyan
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "- Backend API: http://localhost:8000" -ForegroundColor White
Write-Host "- Documentación API: http://localhost:8000/docs" -ForegroundColor White
