# Script de automatización para desplegar en Railway (PowerShell)
# Sistema de Informes Infraestructura Medellín

param(
    [string]$GitHubUrl = ""
)

# Configurar colores para output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"
$White = "White"

# Función para imprimir mensajes
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

Write-Host "🚀 Script de Despliegue en Railway" -ForegroundColor $White
Write-Host "==================================" -ForegroundColor $White

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "railway.json")) {
    Write-Error "No se encontró railway.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
}

Write-Status "Verificando requisitos previos..."

# Verificar que git esté instalado
try {
    git --version | Out-Null
    Write-Success "Git está instalado"
} catch {
    Write-Error "Git no está instalado. Por favor instala Git primero."
    exit 1
}

# Verificar que estemos en un repositorio git
if (-not (Test-Path ".git")) {
    Write-Warning "No se detectó un repositorio Git. Inicializando..."
    git init
    git add .
    git commit -m "Initial commit - Sistema de Informes Infraestructura Medellín"
    Write-Success "Repositorio Git inicializado"
}

# Verificar el estado del repositorio
Write-Status "Verificando estado del repositorio..."
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Hay cambios sin commitear. ¿Deseas hacer commit de estos cambios? (y/n)"
    $response = Read-Host
    if ($response -eq "y" -or $response -eq "Y") {
        git add .
        git commit -m "Update - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        Write-Success "Cambios commiteados"
    } else {
        Write-Error "Por favor, haz commit de los cambios antes de continuar."
        exit 1
    }
}

# Verificar si hay un remote configurado
try {
    git remote get-url origin | Out-Null
    Write-Success "Remote origin configurado"
} catch {
    Write-Warning "No hay un remote 'origin' configurado."
    if (-not $GitHubUrl) {
        Write-Host "Por favor, proporciona la URL de tu repositorio GitHub:"
        $GitHubUrl = Read-Host
    }
    git remote add origin $GitHubUrl
    Write-Success "Remote origin configurado"
}

# Hacer push al repositorio
Write-Status "Haciendo push al repositorio..."
git push -u origin main
Write-Success "Código subido a GitHub"

# Verificar que Railway CLI esté instalado
try {
    railway --version | Out-Null
    Write-Success "Railway CLI está instalado"
} catch {
    Write-Warning "Railway CLI no está instalado."
    Write-Host "¿Deseas instalar Railway CLI? (y/n)"
    $response = Read-Host
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Status "Instalando Railway CLI..."
        npm install -g @railway/cli
        Write-Success "Railway CLI instalado"
    } else {
        Write-Warning "Puedes instalar Railway CLI manualmente con: npm install -g @railway/cli"
    }
}

# Verificar si el usuario está logueado en Railway
try {
    railway whoami | Out-Null
    Write-Success "Ya estás logueado en Railway"
} catch {
    Write-Warning "No estás logueado en Railway."
    Write-Host "¿Deseas hacer login ahora? (y/n)"
    $response = Read-Host
    if ($response -eq "y" -or $response -eq "Y") {
        railway login
        Write-Success "Login exitoso en Railway"
    } else {
        Write-Warning "Puedes hacer login manualmente con: railway login"
    }
}

# Mostrar instrucciones finales
Write-Host ""
Write-Host "🎉 ¡Configuración completada!" -ForegroundColor $White
Write-Host "==============================" -ForegroundColor $White
Write-Host ""
Write-Success "Tu código está listo para ser desplegado en Railway"
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor $White
Write-Host "1. Ve a https://railway.app" -ForegroundColor $White
Write-Host "2. Crea un nuevo proyecto" -ForegroundColor $White
Write-Host "3. Selecciona 'Deploy from GitHub repo'" -ForegroundColor $White
Write-Host "4. Selecciona tu repositorio" -ForegroundColor $White
Write-Host "5. Railway detectará automáticamente la configuración" -ForegroundColor $White
Write-Host ""
Write-Host "🔧 Configuración de variables de entorno:" -ForegroundColor $White
Write-Host "   - Ve a la pestaña 'Variables' en Railway" -ForegroundColor $White
Write-Host "   - Agrega las variables listadas en DEPLOYMENT.md" -ForegroundColor $White
Write-Host ""
Write-Host "📊 Monitoreo:" -ForegroundColor $White
Write-Host "   - Los logs estarán disponibles en la pestaña 'Deployments'" -ForegroundColor $White
Write-Host "   - El health check estará en: https://tu-app.railway.app/health" -ForegroundColor $White
Write-Host ""
Write-Success "¡Tu aplicación estará lista para ser compartida!"
Write-Host ""
Write-Host "📚 Documentación completa: DEPLOYMENT.md" -ForegroundColor $White
Write-Host "🆘 Para ayuda: https://docs.railway.app" -ForegroundColor $White
