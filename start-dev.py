#!/usr/bin/env python3
"""
Script de inicio unificado para el Sistema de Informes de Infraestructura
Funciona en Windows, Linux y macOS
"""
import os
import sys
import subprocess
import platform
import time

def print_header():
    """Imprimir encabezado del sistema"""
    print("🚀" + "="*60 + "🚀")
    print("🏗️  SISTEMA DE INFORMES - INFRAESTRUCTURA MEDELLÍN 🏗️")
    print("🚀" + "="*60 + "🚀")
    print()

def check_docker():
    """Verificar si Docker está disponible"""
    print("🔍 Verificando Docker...")
    try:
        result = subprocess.run(['docker', 'info'], 
                              capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print("✅ Docker está disponible")
            return True
        else:
            print("❌ Docker no está funcionando correctamente")
            return False
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("❌ Docker no está instalado o no está corriendo")
        print("   Por favor instala Docker Desktop y asegúrate de que esté ejecutándose")
        return False

def check_docker_compose():
    """Verificar si docker-compose está disponible"""
    print("🔍 Verificando Docker Compose...")
    try:
        result = subprocess.run(['docker-compose', '--version'], 
                              capture_output=True, text=True, timeout=5)
        if result.returncode == 0:
            print("✅ Docker Compose está disponible")
            return True
        else:
            print("❌ Docker Compose no está funcionando correctamente")
            return False
    except (subprocess.TimeoutExpired, FileNotFoundError):
        print("❌ Docker Compose no está instalado")
        return False

def check_files():
    """Verificar que los archivos necesarios existen"""
    print("🔍 Verificando archivos del proyecto...")
    
    required_files = [
        'docker-compose.yml',
        'backend/Dockerfile',
        'frontend/Dockerfile',
        'backend/requirements.txt',
        'frontend/package.json'
    ]
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
    
    if missing_files:
        print("❌ Faltan archivos necesarios:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    else:
        print("✅ Todos los archivos necesarios están presentes")
        return True

def start_services():
    """Iniciar servicios con Docker Compose"""
    print("📦 Iniciando servicios con Docker Compose...")
    print()
    
    try:
        # Construir e iniciar servicios
        cmd = ['docker-compose', 'up', '--build']
        print(f"Ejecutando: {' '.join(cmd)}")
        print()
        
        # Ejecutar docker-compose
        process = subprocess.Popen(cmd)
        
        # Esperar un momento para que los servicios se inicien
        time.sleep(5)
        
        print()
        print("🎉 ¡Sistema iniciado exitosamente!")
        print()
        print("📊 URLs disponibles:")
        print("   🌐 Frontend: http://localhost:3000")
        print("   🔧 Backend API: http://localhost:8000")
        print("   📚 Documentación API: http://localhost:8000/docs")
        print("   💚 Health Check: http://localhost:8000/api/v1/health/detailed")
        print()
        print("🛑 Presiona Ctrl+C para detener los servicios")
        print()
        
        # Esperar a que el proceso termine
        process.wait()
        
    except KeyboardInterrupt:
        print()
        print("🛑 Deteniendo servicios...")
        try:
            subprocess.run(['docker-compose', 'down'], 
                         capture_output=True, text=True, timeout=10)
            print("✅ Servicios detenidos correctamente")
        except:
            print("⚠️  Error al detener servicios manualmente")
    except Exception as e:
        print(f"❌ Error al iniciar servicios: {e}")
        return False
    
    return True

def run_tests():
    """Ejecutar pruebas del sistema"""
    print("🧪 ¿Deseas ejecutar las pruebas del sistema? (s/n): ", end="")
    response = input().lower().strip()
    
    if response in ['s', 'si', 'sí', 'y', 'yes']:
        print()
        print("🧪 Ejecutando pruebas del sistema...")
        try:
            subprocess.run([sys.executable, 'test_system.py'])
        except FileNotFoundError:
            print("⚠️  Archivo test_system.py no encontrado")
        except Exception as e:
            print(f"❌ Error ejecutando pruebas: {e}")

def main():
    """Función principal"""
    print_header()
    
    # Verificar sistema operativo
    system = platform.system()
    print(f"🖥️  Sistema operativo detectado: {system}")
    print()
    
    # Verificaciones previas
    if not check_docker():
        return False
    
    if not check_docker_compose():
        return False
    
    if not check_files():
        return False
    
    print()
    
    # Iniciar servicios
    success = start_services()
    
    if success:
        # Preguntar si ejecutar pruebas
        run_tests()
    
    return success

if __name__ == "__main__":
    try:
        success = main()
        if not success:
            sys.exit(1)
    except KeyboardInterrupt:
        print("\n👋 ¡Hasta luego!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error inesperado: {e}")
        sys.exit(1)
