#!/usr/bin/env python3
"""
Script de prueba unificado para el Sistema de Informes de Infraestructura
"""
import requests
import json
import time
import os
from typing import Dict, Any

class SystemTester:
    def __init__(self, base_url: str = "http://localhost:8000", frontend_url: str = "http://localhost:3000"):
        self.base_url = base_url
        self.frontend_url = frontend_url
        self.test_results = []
    
    def log_test(self, test_name: str, success: bool, message: str = "", data: Dict[str, Any] = None):
        """Registrar resultado de prueba"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "data": data or {}
        }
        self.test_results.append(result)
        
        status = "✅" if success else "❌"
        print(f"{status} {test_name}: {message}")
    
    def test_health_check(self):
        """Probar health check del backend"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=5)
            if response.status_code == 200:
                data = response.json()
                self.log_test("Health Check", True, f"Backend funcionando - {data.get('message', 'OK')}")
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Health Check", False, f"Error de conexión: {str(e)}")
    
    def test_demo_report(self):
        """Probar generación de informe de demostración"""
        try:
            response = requests.post(f"{self.base_url}/api/v1/reports/generate-demo", timeout=10)
            if response.status_code == 200:
                data = response.json()
                sections_count = len(data.get('sections', []))
                self.log_test("Demo Report", True, f"Informe generado con {sections_count} secciones", {
                    "contract_type": data.get('contract_type'),
                    "year": data.get('year'),
                    "sections_count": sections_count
                })
            else:
                self.log_test("Demo Report", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Demo Report", False, f"Error: {str(e)}")
    
    def test_file_upload(self):
        """Probar carga de archivo CSV"""
        try:
            # Crear archivo de prueba
            test_data = """presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico
2500000,2200000,2025-09-15,88"""
            
            test_file = "test_upload.csv"
            with open(test_file, "w") as f:
                f.write(test_data)
            
            # Cargar archivo
            with open(test_file, "rb") as f:
                files = {"file": (test_file, f, "text/csv")}
                response = requests.post(f"{self.base_url}/api/v1/reports/generate", files=files, timeout=15)
            
            # Limpiar archivo temporal
            if os.path.exists(test_file):
                os.remove(test_file)
            
            if response.status_code == 200:
                data = response.json()
                sections_count = len(data.get('sections', []))
                self.log_test("File Upload", True, f"Archivo procesado con {sections_count} secciones", {
                    "contract_type": data.get('contract_type'),
                    "sections_count": sections_count
                })
            else:
                self.log_test("File Upload", False, f"Status code: {response.status_code} - {response.text}")
        except Exception as e:
            self.log_test("File Upload", False, f"Error: {str(e)}")
    
    def test_simple_endpoint(self):
        """Probar endpoint simple"""
        try:
            # Crear archivo de prueba
            test_data = """presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico
1000000,800000,2025-12-31,80"""
            
            test_file = "simple_test.csv"
            with open(test_file, "w") as f:
                f.write(test_data)
            
            # Cargar archivo
            with open(test_file, "rb") as f:
                files = {"file": (test_file, f, "text/csv")}
                response = requests.post(f"{self.base_url}/api/v1/reports/generate-simple", files=files, timeout=15)
            
            # Limpiar archivo temporal
            if os.path.exists(test_file):
                os.remove(test_file)
            
            if response.status_code == 200:
                data = response.json()
                sections_count = len(data.get('sections', []))
                self.log_test("Simple Endpoint", True, f"Endpoint simple funcionando con {sections_count} secciones")
            else:
                self.log_test("Simple Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Simple Endpoint", False, f"Error: {str(e)}")
    
    def test_frontend(self):
        """Probar acceso al frontend"""
        try:
            response = requests.get(self.frontend_url, timeout=5)
            if response.status_code == 200:
                self.log_test("Frontend", True, f"Frontend accesible - {len(response.content)} bytes")
            else:
                self.log_test("Frontend", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Frontend", False, f"Error de conexión: {str(e)}")
    
    def test_api_docs(self):
        """Probar documentación de la API"""
        try:
            response = requests.get(f"{self.base_url}/docs", timeout=5)
            if response.status_code == 200:
                self.log_test("API Docs", True, "Documentación de API accesible")
            else:
                self.log_test("API Docs", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("API Docs", False, f"Error: {str(e)}")
    
    def run_all_tests(self):
        """Ejecutar todas las pruebas"""
        print("🚀 INICIANDO PRUEBAS DEL SISTEMA DE INFORMES")
        print("=" * 60)
        print()
        
        # Esperar un momento para que los servicios estén listos
        time.sleep(2)
        
        self.test_health_check()
        self.test_demo_report()
        self.test_file_upload()
        self.test_simple_endpoint()
        self.test_frontend()
        self.test_api_docs()
        
        self.print_summary()
    
    def print_summary(self):
        """Imprimir resumen de resultados"""
        print()
        print("🎉 RESUMEN DE PRUEBAS")
        print("=" * 60)
        
        successful_tests = sum(1 for result in self.test_results if result["success"])
        total_tests = len(self.test_results)
        
        print(f"✅ Pruebas exitosas: {successful_tests}/{total_tests}")
        print(f"❌ Pruebas fallidas: {total_tests - successful_tests}/{total_tests}")
        
        if successful_tests == total_tests:
            print("🎉 ¡TODAS LAS PRUEBAS EXITOSAS!")
        else:
            print("⚠️  Algunas pruebas fallaron. Revisa los errores arriba.")
        
        print()
        print("📊 URLs del Sistema:")
        print(f"   🌐 Frontend: {self.frontend_url}")
        print(f"   🔧 Backend API: {self.base_url}")
        print(f"   📚 Documentación API: {self.base_url}/docs")
        print(f"   💚 Health Check: {self.base_url}/api/v1/health/detailed")

def main():
    """Función principal"""
    tester = SystemTester()
    tester.run_all_tests()

if __name__ == "__main__":
    main()
