#!/usr/bin/env python3
"""
Script unificado de configuración y verificación del proyecto
Informes Infraestructura Medellín
"""
import os
import sys
import subprocess
import json
from pathlib import Path
from typing import Dict, List, Tuple

class ProjectSetup:
    """Configurador y verificador unificado del proyecto"""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent
        self.backend_path = self.project_root / "backend"
        self.frontend_path = self.project_root / "frontend"
        self.data_path = self.project_root / "data"
        
    def run_setup(self):
        """Ejecutar configuración completa del proyecto"""
        print("🚀 Configurando Sistema de Informes - Infraestructura Medellín")
        print("=" * 60)
        
        # 1. Verificar estructura
        print("\n📁 Verificando estructura del proyecto...")
        structure_ok = self.verify_structure()
        
        # 2. Crear archivos de configuración
        print("\n⚙️ Creando archivos de configuración...")
        self.create_config_files()
        
        # 3. Verificar dependencias
        print("\n📦 Verificando dependencias...")
        deps_ok = self.check_dependencies()
        
        # 4. Verificar Docker
        print("\n🐳 Verificando Docker...")
        docker_ok = self.check_docker()
        
        # 5. Resumen final
        print("\n" + "=" * 60)
        print("📊 RESUMEN DE CONFIGURACIÓN:")
        print(f"   ✅ Estructura: {'OK' if structure_ok else 'FAIL'}")
        print(f"   ✅ Dependencias: {'OK' if deps_ok else 'FAIL'}")
        print(f"   ✅ Docker: {'OK' if docker_ok else 'FAIL'}")
        
        if all([structure_ok, deps_ok, docker_ok]):
            print("\n🎉 ¡Proyecto configurado exitosamente!")
            self.show_next_steps()
        else:
            print("\n❌ Hay problemas pendientes. Revisa los errores arriba.")
            return False
        
        return True
    
    def verify_structure(self) -> bool:
        """Verificar estructura de directorios y archivos clave"""
        required_paths = [
            self.backend_path / "app" / "main.py",
            self.backend_path / "requirements.txt",
            self.frontend_path / "package.json",
            self.frontend_path / "app" / "page.tsx",
            self.project_root / "docker-compose.yml",
            self.data_path / "datos_contrato_ejemplo.csv"
        ]
        
        missing_paths = []
        for path in required_paths:
            if not path.exists():
                missing_paths.append(str(path.relative_to(self.project_root)))
                print(f"   ❌ Falta: {path.relative_to(self.project_root)}")
            else:
                print(f"   ✅ {path.relative_to(self.project_root)}")
        
        return len(missing_paths) == 0
    
    def create_config_files(self):
        """Crear archivos de configuración necesarios"""
        
        # Backend .env.example
        backend_env = """# Configuración del Proyecto
PROJECT_NAME="API de Generación de Informes - Infraestructura Medellín"
API_V1_STR="/api/v1"
ENVIRONMENT="development"

# Base de Datos PostgreSQL
DATABASE_URL="postgresql+asyncpg://postgres:password@localhost:5432/informes_db"

# Autenticación JWT
SECRET_KEY="your-super-secret-jwt-key-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis para Cache
REDIS_URL="redis://localhost:6379"
REDIS_ENABLED=true

# Configuración de Archivos
MAX_FILE_SIZE=10485760
ALLOWED_FILE_EXTENSIONS=[".csv", ".xlsx", ".xls"]

# Logging
LOG_LEVEL="INFO"

# CORS
FRONTEND_URL="http://localhost:3000"
"""
        
        # Frontend .env.example
        frontend_env = """# URL del API Backend
NEXT_PUBLIC_API_URL="http://localhost:8000"

# Configuración de desarrollo
NODE_ENV="development"

# Información de la aplicación
NEXT_PUBLIC_APP_NAME="Sistema de Informes - Infraestructura Medellín"
NEXT_PUBLIC_APP_VERSION="2.0.0"
"""
        
        # Crear archivos
        self._write_file(self.backend_path / ".env.example", backend_env)
        self._write_file(self.frontend_path / ".env.example", frontend_env)
        
        print("   ✅ Archivos .env.example creados")
        print("   💡 Copia .env.example a .env y ajusta según necesites")
    
    def check_dependencies(self) -> bool:
        """Verificar que las dependencias estén disponibles"""
        dependencies = {
            "python": self._check_python(),
            "node": self._check_node(),
            "npm": self._check_npm()
        }
        
        for name, (available, version) in dependencies.items():
            status = "✅" if available else "❌"
            print(f"   {status} {name}: {version}")
        
        return all(dep[0] for dep in dependencies.values())
    
    def check_docker(self) -> bool:
        """Verificar disponibilidad de Docker"""
        try:
            result = subprocess.run(["docker", "--version"], 
                                 capture_output=True, text=True, timeout=10)
            if result.returncode == 0:
                print(f"   ✅ Docker: {result.stdout.strip()}")
                
                # Verificar Docker Compose
                result = subprocess.run(["docker-compose", "--version"],
                                     capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    print(f"   ✅ Docker Compose: {result.stdout.strip()}")
                    return True
                else:
                    print("   ❌ Docker Compose no disponible")
                    return False
            else:
                print("   ❌ Docker no disponible")
                return False
        except Exception as e:
            print(f"   ❌ Error verificando Docker: {e}")
            return False
    
    def show_next_steps(self):
        """Mostrar próximos pasos para el usuario"""
        print("\n🎯 PRÓXIMOS PASOS:")
        print("   1. Configurar variables de entorno:")
        print("      cd backend && cp .env.example .env")
        print("      cd frontend && cp .env.example .env.local")
        print("")
        print("   2. Iniciar con Docker (recomendado):")
        print("      docker-compose up --build")
        print("")
        print("   3. O desarrollo local:")
        print("      Terminal 1: cd backend && uvicorn app.main:app --reload")
        print("      Terminal 2: cd frontend && npm run dev")
        print("")
        print("   4. URLs disponibles:")
        print("      🌐 Frontend: http://localhost:3000")
        print("      🔧 API: http://localhost:8000")
        print("      📚 Docs: http://localhost:8000/docs")
    
    def _check_python(self) -> Tuple[bool, str]:
        """Verificar Python"""
        try:
            result = subprocess.run([sys.executable, "--version"],
                                 capture_output=True, text=True)
            return True, result.stdout.strip()
        except Exception:
            return False, "No disponible"
    
    def _check_node(self) -> Tuple[bool, str]:
        """Verificar Node.js"""
        try:
            result = subprocess.run(["node", "--version"],
                                 capture_output=True, text=True)
            return True, result.stdout.strip()
        except Exception:
            return False, "No disponible"
    
    def _check_npm(self) -> Tuple[bool, str]:
        """Verificar npm"""
        try:
            result = subprocess.run(["npm", "--version"],
                                 capture_output=True, text=True)
            return True, result.stdout.strip()
        except Exception:
            return False, "No disponible"
    
    def _write_file(self, path: Path, content: str):
        """Escribir archivo de forma segura"""
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding='utf-8')
        except Exception as e:
            print(f"   ❌ Error creando {path}: {e}")

if __name__ == "__main__":
    setup = ProjectSetup()
    success = setup.run_setup()
    sys.exit(0 if success else 1)
