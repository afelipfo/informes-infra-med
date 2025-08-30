# Script de verificación del proyecto
Write-Host "🔍 Verificando configuración del proyecto..." -ForegroundColor Yellow
Write-Host ""

# Verificar estructura del frontend
Write-Host "✅ Verificando estructura del frontend..." -ForegroundColor Green
$frontendPath = "frontend"

if (Test-Path $frontendPath) {
    Write-Host "   ✓ Directorio frontend existe" -ForegroundColor Green
    
    # Verificar archivos críticos
    $criticalFiles = @(
        "package.json",
        "next.config.js",
        "tailwind.config.ts",
        "app/layout.tsx",
        "app/page.tsx",
        "app/generate-report/page.tsx",
        "app/reports/page.tsx"
    )
    
    foreach ($file in $criticalFiles) {
        if (Test-Path "$frontendPath/$file") {
            Write-Host "   ✓ $file existe" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $file FALTA" -ForegroundColor Red
        }
    }
    
    # Verificar que no exista conflicto de rutas
    if (!(Test-Path "$frontendPath/app/(dashboard)")) {
        Write-Host "   ✓ Sin conflictos de rutas (dashboard eliminado)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Conflicto de rutas - carpeta (dashboard) aún existe" -ForegroundColor Red
    }
} else {
    Write-Host "   ❌ Directorio frontend no existe" -ForegroundColor Red
}

Write-Host ""

# Verificar backend
Write-Host "✅ Verificando estructura del backend..." -ForegroundColor Green
$backendPath = "backend"

if (Test-Path $backendPath) {
    Write-Host "   ✓ Directorio backend existe" -ForegroundColor Green
    
    $backendFiles = @(
        "requirements.txt",
        "Dockerfile",
        "alembic.ini",
        "app/main.py",
        "app/api/api.py"
    )
    
    foreach ($file in $backendFiles) {
        if (Test-Path "$backendPath/$file") {
            Write-Host "   ✓ $file existe" -ForegroundColor Green
        } else {
            Write-Host "   ❌ $file FALTA" -ForegroundColor Red
        }
    }
} else {
    Write-Host "   ❌ Directorio backend no existe" -ForegroundColor Red
}

Write-Host ""

# Verificar Docker
Write-Host "✅ Verificando configuración Docker..." -ForegroundColor Green
if (Test-Path "docker-compose.yml") {
    Write-Host "   ✓ docker-compose.yml existe" -ForegroundColor Green
} else {
    Write-Host "   ❌ docker-compose.yml FALTA" -ForegroundColor Red
}

Write-Host ""

# Instrucciones de siguiente paso
Write-Host "🚀 Para iniciar el proyecto:" -ForegroundColor Cyan
Write-Host "   1. Para desarrollo local:" -ForegroundColor White
Write-Host "      Frontend: cd frontend; npm run dev" -ForegroundColor Gray
Write-Host "      Backend:  cd backend; uvicorn app.main:app --reload" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. Para usar Docker:" -ForegroundColor White
Write-Host "      docker-compose up --build" -ForegroundColor Gray
Write-Host ""
Write-Host "   3. URL de acceso:" -ForegroundColor White
Write-Host "      Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host "      Backend:  http://localhost:8000" -ForegroundColor Gray
Write-Host "      API Docs: http://localhost:8000/docs" -ForegroundColor Gray
