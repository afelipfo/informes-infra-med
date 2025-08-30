#!/usr/bin/env python3
"""
Script para probar el endpoint simple
"""
import requests
import json

def test_simple_endpoint():
    """Probar el endpoint simple"""
    print("🎯 Probando Endpoint Simple...")
    
    # Crear archivo simple
    with open("simple_test.csv", "w") as f:
        f.write("presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico\n")
        f.write("1000000,800000,2025-12-31,80\n")
    
    # Cargar archivo
    with open("simple_test.csv", "rb") as f:
        files = {"file": ("simple_test.csv", f, "text/csv")}
        response = requests.post("http://localhost:8000/api/v1/reports/generate-simple", files=files)
    
    if response.status_code == 200:
        data = response.json()
        print("✅ Endpoint Simple funciona correctamente")
        print(f"   Secciones: {len(data['sections'])}")
        for section in data['sections']:
            print(f"   - {section['title']}: {section['message']['severity']}")
            print(f"     Mensaje: {section['message']['message'][:100]}...")
    else:
        print(f"❌ Endpoint Simple falló: {response.status_code}")
        print(f"   Error: {response.text}")

if __name__ == "__main__":
    test_simple_endpoint()
