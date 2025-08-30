#!/usr/bin/env python3
"""
Script de prueba simplificado
"""
import requests
import json

def test_demo():
    """Probar solo el demo"""
    print("🎯 Probando Demo...")
    response = requests.post("http://localhost:8000/api/v1/reports/generate-demo")
    if response.status_code == 200:
        data = response.json()
        print("✅ Demo funciona correctamente")
        print(f"   Secciones: {len(data['sections'])}")
        for section in data['sections']:
            print(f"   - {section['title']}: {section['message']['severity']}")
            print(f"     Mensaje: {section['message']['message'][:100]}...")
    else:
        print(f"❌ Demo falló: {response.status_code}")
        print(f"   Error: {response.text}")

def test_file_upload_simple():
    """Probar carga de archivo de forma simple"""
    print("\n📁 Probando Carga de Archivo...")
    
    # Crear archivo simple
    with open("simple_test.csv", "w") as f:
        f.write("presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico\n")
        f.write("1000000,800000,2025-12-31,80\n")
    
    # Cargar archivo
    with open("simple_test.csv", "rb") as f:
        files = {"file": ("simple_test.csv", f, "text/csv")}
        response = requests.post("http://localhost:8000/api/v1/reports/generate", files=files)
    
    if response.status_code == 200:
        data = response.json()
        print("✅ Carga de archivo funciona correctamente")
        print(f"   Secciones: {len(data['sections'])}")
        for section in data['sections']:
            print(f"   - {section['title']}: {section['message']['severity']}")
    else:
        print(f"❌ Carga de archivo falló: {response.status_code}")
        print(f"   Error: {response.text}")

if __name__ == "__main__":
    test_demo()
    test_file_upload_simple()
