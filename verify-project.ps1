Write-Host "=== Verificación del Proyecto Informes Infra Med ===" -ForegroundColor Yellow
Write-Host ""

Write-Host "Verificando estructura del frontend..." -ForegroundColor Green
if (Test-Path "frontend") {
    Write-Host "  ✓ Directorio frontend existe" -ForegroundColor Green
    
    if (Test-Path "frontend/package.json") {
        Write-Host "  ✓ package.json existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ package.json FALTA" -ForegroundColor Red
    }
    
    if (Test-Path "frontend/app/page.tsx") {
        Write-Host "  ✓ app/page.tsx existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ app/page.tsx FALTA" -ForegroundColor Red
    }
    
    if (Test-Path "frontend/app/generate-report/page.tsx") {
        Write-Host "  ✓ app/generate-report/page.tsx existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ app/generate-report/page.tsx FALTA" -ForegroundColor Red
    }
    
    if (Test-Path "frontend/app/(dashboard)") {
        Write-Host "  ❌ Conflicto: carpeta (dashboard) aún existe" -ForegroundColor Red
    } else {
        Write-Host "  ✓ Sin conflictos de rutas" -ForegroundColor Green
    }
} else {
    Write-Host "  ❌ Directorio frontend no existe" -ForegroundColor Red
}

Write-Host ""
Write-Host "Verificando estructura del backend..." -ForegroundColor Green
if (Test-Path "backend") {
    Write-Host "  ✓ Directorio backend existe" -ForegroundColor Green
    
    if (Test-Path "backend/requirements.txt") {
        Write-Host "  ✓ requirements.txt existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ requirements.txt FALTA" -ForegroundColor Red
    }
    
    if (Test-Path "backend/app/main.py") {
        Write-Host "  ✓ app/main.py existe" -ForegroundColor Green
    } else {
        Write-Host "  ❌ app/main.py FALTA" -ForegroundColor Red
    }
} else {
    Write-Host "  ❌ Directorio backend no existe" -ForegroundColor Red
}

Write-Host ""
Write-Host "Verificando Docker..." -ForegroundColor Green
if (Test-Path "docker-compose.yml") {
    Write-Host "  ✓ docker-compose.yml existe" -ForegroundColor Green
} else {
    Write-Host "  ❌ docker-compose.yml FALTA" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Instrucciones de Uso ===" -ForegroundColor Cyan
Write-Host "1. Desarrollo local:" -ForegroundColor White
Write-Host "   cd frontend; npm run dev" -ForegroundColor Gray
Write-Host "   cd backend; uvicorn app.main:app --reload" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Con Docker:" -ForegroundColor White
Write-Host "   docker-compose up --build" -ForegroundColor Gray
Write-Host ""
Write-Host "3. URLs:" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Gray
Write-Host "   Backend:  http://localhost:8000" -ForegroundColor Gray
Write-Host "   API Docs: http://localhost:8000/docs" -ForegroundColor Gray
