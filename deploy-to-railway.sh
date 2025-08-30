#!/bin/bash

# Script de automatización para desplegar en Railway
# Sistema de Informes Infraestructura Medellín

set -e

echo "🚀 Script de Despliegue en Railway"
echo "=================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "railway.json" ]; then
    print_error "No se encontró railway.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

print_status "Verificando requisitos previos..."

# Verificar que git esté instalado
if ! command -v git &> /dev/null; then
    print_error "Git no está instalado. Por favor instala Git primero."
    exit 1
fi

# Verificar que estemos en un repositorio git
if [ ! -d ".git" ]; then
    print_warning "No se detectó un repositorio Git. Inicializando..."
    git init
    git add .
    git commit -m "Initial commit - Sistema de Informes Infraestructura Medellín"
    print_success "Repositorio Git inicializado"
fi

# Verificar el estado del repositorio
print_status "Verificando estado del repositorio..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "Hay cambios sin commitear. ¿Deseas hacer commit de estos cambios? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Update - $(date '+%Y-%m-%d %H:%M:%S')"
        print_success "Cambios commiteados"
    else
        print_error "Por favor, haz commit de los cambios antes de continuar."
        exit 1
    fi
fi

# Verificar si hay un remote configurado
if ! git remote get-url origin &> /dev/null; then
    print_warning "No hay un remote 'origin' configurado."
    echo "Por favor, proporciona la URL de tu repositorio GitHub:"
    read -r github_url
    git remote add origin "$github_url"
    print_success "Remote origin configurado"
fi

# Hacer push al repositorio
print_status "Haciendo push al repositorio..."
git push -u origin main
print_success "Código subido a GitHub"

# Verificar que Railway CLI esté instalado
if ! command -v railway &> /dev/null; then
    print_warning "Railway CLI no está instalado."
    echo "¿Deseas instalar Railway CLI? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        print_status "Instalando Railway CLI..."
        npm install -g @railway/cli
        print_success "Railway CLI instalado"
    else
        print_warning "Puedes instalar Railway CLI manualmente con: npm install -g @railway/cli"
    fi
fi

# Verificar si el usuario está logueado en Railway
if command -v railway &> /dev/null; then
    print_status "Verificando login de Railway..."
    if ! railway whoami &> /dev/null; then
        print_warning "No estás logueado en Railway."
        echo "¿Deseas hacer login ahora? (y/n)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            railway login
            print_success "Login exitoso en Railway"
        else
            print_warning "Puedes hacer login manualmente con: railway login"
        fi
    else
        print_success "Ya estás logueado en Railway"
    fi
fi

# Mostrar instrucciones finales
echo ""
echo "🎉 ¡Configuración completada!"
echo "=============================="
echo ""
print_success "Tu código está listo para ser desplegado en Railway"
echo ""
echo "📋 Próximos pasos:"
echo "1. Ve a https://railway.app"
echo "2. Crea un nuevo proyecto"
echo "3. Selecciona 'Deploy from GitHub repo'"
echo "4. Selecciona tu repositorio"
echo "5. Railway detectará automáticamente la configuración"
echo ""
echo "🔧 Configuración de variables de entorno:"
echo "   - Ve a la pestaña 'Variables' en Railway"
echo "   - Agrega las variables listadas en DEPLOYMENT.md"
echo ""
echo "📊 Monitoreo:"
echo "   - Los logs estarán disponibles en la pestaña 'Deployments'"
echo "   - El health check estará en: https://tu-app.railway.app/health"
echo ""
print_success "¡Tu aplicación estará lista para ser compartida!"
echo ""
echo "📚 Documentación completa: DEPLOYMENT.md"
echo "🆘 Para ayuda: https://docs.railway.app"
