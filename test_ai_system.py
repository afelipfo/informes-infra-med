#!/usr/bin/env python3
"""
Script de prueba para el sistema de IA inteligente
Verifica que todos los componentes funcionen correctamente
"""

import requests
import json
import time
import sys
import os
from pathlib import Path

def test_backend_connection():
    """Probar conexión con el backend"""
    print("🔍 Probando conexión con el backend...")
    try:
        response = requests.get("http://localhost:8000/api/v1/health/detailed", timeout=10)
        if response.status_code == 200:
            print("✅ Backend conectado exitosamente")
            return True
        else:
            print(f"❌ Backend respondió con código {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Error conectando al backend: {e}")
        return False

def test_ai_analysis():
    """Probar análisis de IA con datos de ejemplo"""
    print("\n🤖 Probando análisis de IA...")
    
    # Datos de prueba
    test_data = {
        'presupuesto_aprobado': 2500000,
        'valor_ejecutado': 2200000,
        'fecha_fin_planificada': '2025-09-15',
        'porcentaje_avance_fisico': 88
    }
    
    try:
        # Crear archivo CSV temporal
        csv_content = "presupuesto_aprobado,valor_ejecutado,fecha_fin_planificada,porcentaje_avance_fisico\n"
        csv_content += f"{test_data['presupuesto_aprobado']},{test_data['valor_ejecutado']},{test_data['fecha_fin_planificada']},{test_data['porcentaje_avance_fisico']}\n"
        
        with open("test_data.csv", "w") as f:
            f.write(csv_content)
        
        # Probar endpoint de análisis de IA
        with open("test_data.csv", "rb") as f:
            files = {'file': ('test_data.csv', f, 'text/csv')}
            response = requests.post("http://localhost:8000/api/v1/reports/ai-analysis", files=files, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Análisis de IA completado exitosamente")
            
            # Mostrar resultados clave
            ai_analysis = result.get('ai_analysis', {})
            print(f"   📊 Score de Riesgo: {ai_analysis.get('risk_score', 0):.2%}")
            print(f"   🎯 Confianza: {ai_analysis.get('confidence', 0):.2%}")
            print(f"   🚨 Severidad: {ai_analysis.get('severity', 'N/A')}")
            print(f"   💡 Recomendaciones: {len(ai_analysis.get('recommendations', []))}")
            
            return True
        else:
            print(f"❌ Error en análisis de IA: {response.status_code}")
            print(f"   Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error probando análisis de IA: {e}")
        return False
    finally:
        # Limpiar archivo temporal
        if os.path.exists("test_data.csv"):
            os.remove("test_data.csv")

def test_intelligent_report():
    """Probar generación de informe inteligente"""
    print("\n📊 Probando generación de informe inteligente...")
    
    try:
        # Usar archivo de ejemplo
        example_file = "data/ejemplo_contrato_avanzado.csv"
        if not os.path.exists(example_file):
            example_file = "data/ejemplo_contrato.csv"
        
        if not os.path.exists(example_file):
            print(f"❌ No se encontró archivo de ejemplo: {example_file}")
            return False
        
        with open(example_file, "rb") as f:
            files = {'file': (os.path.basename(example_file), f, 'text/csv')}
            response = requests.post("http://localhost:8000/api/v1/reports/generate", files=files, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Informe inteligente generado exitosamente")
            
            # Verificar secciones de IA
            sections = result.get('sections', [])
            ai_sections = [s for s in sections if any(keyword in s.get('title', '') for keyword in ['IA', 'Predictivo', 'Anomalías', 'Insights', 'Recomendaciones'])]
            
            print(f"   📋 Total de secciones: {len(sections)}")
            print(f"   🤖 Secciones de IA: {len(ai_sections)}")
            
            # Mostrar títulos de secciones de IA
            for section in ai_sections:
                print(f"      - {section.get('title', 'N/A')}")
            
            return True
        else:
            print(f"❌ Error generando informe: {response.status_code}")
            print(f"   Respuesta: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error probando informe inteligente: {e}")
        return False

def test_demo_endpoint():
    """Probar endpoint de demostración"""
    print("\n🎯 Probando endpoint de demostración...")
    
    try:
        response = requests.post("http://localhost:8000/api/v1/reports/generate-demo", timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Demostración completada exitosamente")
            
            sections = result.get('sections', [])
            print(f"   📋 Secciones generadas: {len(sections)}")
            
            return True
        else:
            print(f"❌ Error en demostración: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error probando demostración: {e}")
        return False

def main():
    """Función principal de pruebas"""
    print("=" * 60)
    print("🧪 PRUEBAS DEL SISTEMA DE IA INTELIGENTE")
    print("Sistema de Informes de Infraestructura - Medellín")
    print("=" * 60)
    
    # Verificar que el backend esté corriendo
    if not test_backend_connection():
        print("\n❌ El backend no está disponible. Asegúrate de que esté corriendo en http://localhost:8000")
        sys.exit(1)
    
    # Ejecutar pruebas
    tests = [
        ("Análisis de IA", test_ai_analysis),
        ("Informe Inteligente", test_intelligent_report),
        ("Endpoint de Demostración", test_demo_endpoint)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            success = test_func()
            results.append((test_name, success))
        except Exception as e:
            print(f"❌ Error ejecutando {test_name}: {e}")
            results.append((test_name, False))
    
    # Resumen de resultados
    print("\n" + "=" * 60)
    print("📊 RESUMEN DE PRUEBAS")
    print("=" * 60)
    
    passed = 0
    for test_name, success in results:
        status = "✅ PASÓ" if success else "❌ FALLÓ"
        print(f"{status} - {test_name}")
        if success:
            passed += 1
    
    print(f"\n🎯 Resultado: {passed}/{len(results)} pruebas exitosas")
    
    if passed == len(results):
        print("🎉 ¡Todas las pruebas pasaron! El sistema de IA está funcionando correctamente.")
        return True
    else:
        print("⚠️ Algunas pruebas fallaron. Revisa los errores anteriores.")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
