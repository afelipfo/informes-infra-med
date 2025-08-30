#!/usr/bin/env python3
"""
Script de configuración para modelos de IA
Descarga e instala los modelos necesarios para el sistema de IA inteligente
"""

import subprocess
import sys
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_command(command, description):
    """Ejecutar comando y manejar errores"""
    logger.info(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        logger.info(f"✅ {description} completado exitosamente")
        return True
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ Error en {description}: {e}")
        logger.error(f"Salida de error: {e.stderr}")
        return False

def setup_ai_models():
    """Configurar todos los modelos de IA necesarios"""
    logger.info("🚀 Iniciando configuración de modelos de IA...")
    
    # Verificar Python y pip
    logger.info(f"🐍 Python version: {sys.version}")
    
    # Comandos de instalación
    commands = [
        ("pip install --upgrade pip", "Actualizando pip"),
        ("python -m spacy download es_core_news_sm", "Descargando modelo spaCy para español"),
        ("python -c \"import nltk; nltk.download('vader_lexicon', quiet=True)\"", "Descargando léxico NLTK"),
        ("python -c \"import nltk; nltk.download('punkt', quiet=True)\"", "Descargando tokenizador NLTK"),
        ("python -c \"import nltk; nltk.download('stopwords', quiet=True)\"", "Descargando stopwords NLTK"),
    ]
    
    success_count = 0
    for command, description in commands:
        if run_command(command, description):
            success_count += 1
    
    logger.info(f"📊 Configuración completada: {success_count}/{len(commands)} comandos exitosos")
    
    if success_count == len(commands):
        logger.info("🎉 ¡Todos los modelos de IA han sido configurados exitosamente!")
        return True
    else:
        logger.warning("⚠️ Algunos modelos no se pudieron instalar. El sistema funcionará con capacidades limitadas.")
        return False

def verify_installation():
    """Verificar que los modelos se instalaron correctamente"""
    logger.info("🔍 Verificando instalación de modelos...")
    
    try:
        import spacy
        nlp = spacy.load("es_core_news_sm")
        logger.info("✅ Modelo spaCy verificado")
    except Exception as e:
        logger.error(f"❌ Error verificando spaCy: {e}")
        return False
    
    try:
        import nltk
        from nltk.sentiment import SentimentIntensityAnalyzer
        analyzer = SentimentIntensityAnalyzer()
        logger.info("✅ NLTK verificado")
    except Exception as e:
        logger.error(f"❌ Error verificando NLTK: {e}")
        return False
    
    try:
        import sklearn
        import numpy
        import pandas
        logger.info("✅ Librerías de ML verificadas")
    except Exception as e:
        logger.error(f"❌ Error verificando librerías ML: {e}")
        return False
    
    logger.info("🎉 Verificación completada exitosamente")
    return True

def main():
    """Función principal"""
    logger.info("=" * 60)
    logger.info("🤖 CONFIGURADOR DE MODELOS DE IA")
    logger.info("Sistema de Informes de Infraestructura - Medellín")
    logger.info("=" * 60)
    
    # Configurar modelos
    if setup_ai_models():
        # Verificar instalación
        if verify_installation():
            logger.info("🎯 Configuración completada exitosamente")
            logger.info("El sistema de IA está listo para usar")
        else:
            logger.error("❌ Error en la verificación de instalación")
            sys.exit(1)
    else:
        logger.error("❌ Error en la configuración de modelos")
        sys.exit(1)

if __name__ == "__main__":
    main()
