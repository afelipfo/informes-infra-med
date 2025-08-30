# 📊 Sistema de Informes de Infraestructura - Medellín

Sistema web para la generación automática de informes técnicos para contratos de Urgencia Manifiesta de la Secretaría de Infraestructura de Medellín.

## 🚀 Características

- **🤖 IA Inteligente Avanzada**: Sistema de machine learning con múltiples algoritmos
- **🔮 Análisis Predictivo**: Predicción de riesgos y comportamientos futuros
- **🚨 Detección de Anomalías**: Identificación automática de patrones anómalos
- **📊 Insights Avanzados**: Métricas de rendimiento y eficiencia global
- **💡 Recomendaciones Inteligentes**: Sugerencias basadas en IA para optimización
- **🎯 Análisis de Riesgo**: Scoring de riesgo con múltiples dimensiones
- **📈 Análisis Temporal**: Patrones y tendencias en series de tiempo
- **🔍 Análisis Automático**: Procesa archivos Excel con datos de contratos
- **⚠️ Alertas Inteligentes**: Genera mensajes técnicos con diferentes niveles de severidad
- **💰 Análisis Presupuestal**: Monitoreo de ejecución vs presupuesto aprobado
- **⏰ Seguimiento de Cronograma**: Control de avance físico y fechas de finalización
- **🎨 Interfaz Moderna**: Frontend responsive con Next.js y Tailwind CSS

## 🏗️ Arquitectura

- **Backend**: FastAPI (Python) - API REST para procesamiento de datos
- **Frontend**: Next.js (TypeScript) - Interfaz web moderna
- **Base de Datos**: Procesamiento en memoria (archivos Excel)
- **Containerización**: Docker y Docker Compose

## 🛠️ Instalación y Ejecución

### Configuración Inicial (IMPORTANTE)

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url>
cd informes-infra-med

# 2. Crear archivos de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. Configurar modelos de IA (OPCIONAL - se hace automáticamente con Docker)
cd backend
python setup_ai_models.py
```

### Ejecución con Docker Compose (Recomendado)

```bash
# Usar el script de inicio unificado (funciona en Windows, Linux y macOS)
python start-dev.py

# O ejecutar manualmente
docker-compose up --build

# En modo detached (segundo plano)
docker-compose up -d --build
```

### URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentación API**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/api/v1/health/detailed

### Ejecución Manual (Desarrollo)

#### Backend
```bash
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Copiar configuración de ejemplo
cp .env.example .env

# Ejecutar migraciones (opcional, requiere PostgreSQL)
alembic upgrade head

# Iniciar servidor
uvicorn app.main:app --reload --port 8000
```

#### Frontend
```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📋 Uso

1. **Acceder a la aplicación**: Navega a http://localhost:3000
2. **Cargar archivo de datos**: Sube un archivo Excel (.xlsx, .xls) o CSV (.csv) con los datos del contrato
3. **Generar Informe**: El sistema procesará automáticamente los datos y generará el informe técnico
4. **Revisar Resultados**: El informe incluirá análisis presupuestal y de cronograma con alertas según corresponda

## 🧪 Pruebas

Para ejecutar las pruebas del sistema:

```bash
# Ejecutar pruebas del sistema básico
python test_system.py

# Ejecutar pruebas del sistema de IA
python test_ai_system.py

# O usar el script de inicio que incluye pruebas
python start-dev.py
```

## 📊 Formato de Datos Esperado

El archivo Excel debe contener las siguientes columnas obligatorias:

- `presupuesto_aprobado`: Valor del presupuesto total aprobado
- `valor_ejecutado`: Valor actualmente ejecutado
- `fecha_fin_planificada`: Fecha planificada de finalización del contrato
- `porcentaje_avance_fisico`: Porcentaje de avance físico del proyecto

## 🚨 Tipos de Alertas

### CRITICAL (Crítico)
- Sobrepresupuesto (>100% de ejecución)
- Presupuesto casi agotado (>90%)
- Contratos atrasados
- Riesgo alto de incumplimiento

### WARNING (Advertencia)
- Ejecución presupuestal alta (>75%)
- Desviaciones en cronograma
- Situaciones que requieren monitoreo

### INFO (Informativo)
- Ejecución normal
- Cronograma en tiempo
- Estados regulares del contrato

## 🔧 Configuración

### Variables de Entorno

#### Backend (`backend/.env`)
```env
# Configuración del Proyecto
PROJECT_NAME="API de Generación de Informes - Infraestructura Medellín"
API_V1_STR="/api/v1"
ENVIRONMENT="development"

# Base de Datos PostgreSQL (opcional)
DATABASE_URL="postgresql+asyncpg://postgres:password@localhost:5432/informes_db"

# Autenticación JWT (opcional)
SECRET_KEY="your-super-secret-jwt-key-change-in-production"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Redis para Cache (opcional)
REDIS_URL="redis://localhost:6379"
REDIS_ENABLED=true

# Configuración de archivos
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_EXTENSIONS=[".csv", ".xlsx", ".xls"]

# Logging
LOG_LEVEL=INFO
```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🛡️ Estructura del Proyecto

```
informes-infra-med/
├── backend/                    # API FastAPI
│   ├── app/
│   │   ├── api/               # Endpoints de la API
│   │   ├── core/              # Configuraciones
│   │   ├── schemas/           # Modelos Pydantic
│   │   └── services/          # Lógica de negocio
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                   # Aplicación Next.js
│   ├── app/                   # App Router de Next.js
│   ├── components/            # Componentes React
│   ├── lib/                   # Utilidades y API client
│   └── Dockerfile
├── data/                       # Datos de ejemplo
│   ├── ejemplo_contrato.csv   # Archivo de datos de prueba
│   └── README.md              # Documentación de datos
├── test_system.py             # Script de pruebas unificado
├── start-dev.py               # Script de inicio multiplataforma
├── docker-compose.yml         # Orquestación de servicios
└── README.md                  # Documentación principal
```

## 📝 API Endpoints

### POST `/api/v1/reports/generate`
Genera un informe técnico basado en los datos del archivo subido.

**Request:** `multipart/form-data`
- `file`: Archivo Excel (.xlsx, .xls) o CSV (.csv)
- `nombre_supervisor` (opcional): Nombre del supervisor
- `nombre_proyecto` (opcional): Nombre del proyecto

### POST `/api/v1/reports/generate-simple`
Endpoint simplificado para pruebas rápidas.

### POST `/api/v1/reports/generate-demo`
Genera un informe de demostración con datos de ejemplo.

### POST `/api/v1/reports/ai-analysis`
Análisis avanzado de IA con múltiples algoritmos de machine learning.
**Response:**
```json
{
  "ai_analysis": {
    "risk_score": 0.75,
    "confidence": 0.92,
    "severity": "CRITICAL",
    "predictions": {
      "probabilidad_sobrecosto": 0.8,
      "probabilidad_retraso": 0.6,
      "probabilidad_cumplimiento": 0.4
    },
    "anomalies": [
      {
        "type": "SOBRECOSTO_CRITICO",
        "severity": "CRITICAL",
        "description": "Ejecución presupuestal excede el 100%",
        "value": 105.2,
        "threshold": 100
      }
    ],
    "recommendations": [
      "🚨 ALTA PROBABILIDAD DE SOBRECOSTO: Implementar control estricto de costos",
      "⏰ RIESGO DE RETRASO: Acelerar frentes de trabajo críticos"
    ],
    "insights": {
      "performance_metrics": {
        "eficiencia_global": 0.85,
        "velocidad_ejecucion": 1.2,
        "sostenibilidad_temporal": 0.7
      },
      "risk_indicators": {
        "nivel_riesgo_financiero": 0.8,
        "nivel_riesgo_temporal": 0.6,
        "probabilidad_incumplimiento": 0.6
      }
    }
  },
  "contract_data": {...},
  "analysis_timestamp": "2025-01-27T10:30:00"
}
```

### GET `/api/v1/health/detailed`
Health check detallado del sistema.

**Response:**
```json
{
  "contract_type": "Urgencia Manifiesta",
  "year": 2025,
  "context": "Secretaría de Infraestructura Física - Alcaldía de Medellín",
  "sections": [
    {
      "title": "Análisis Presupuestal",
      "data": {
        "Presupuesto Aprobado": "$1,000,000.00 COP",
        "Valor Ejecutado": "$750,000.00 COP",
        "Porcentaje de Ejecución": "75.00%"
      },
      "message": {
        "block_name": "Análisis Presupuestal",
        "message": "Ejecución presupuestal al 75.00%. PRECAUCIÓN: Ejecución superior al 75%...",
        "severity": "WARNING"
      }
    }
  ]
}
```

## 🛡️ Seguridad

### Características de Seguridad Implementadas

- ✅ **Validación de archivos**: Verificación de MIME types y extensiones permitidas
- ✅ **Límites de tamaño**: Control de tamaño máximo de archivos subidos
- ✅ **Rate limiting**: Protección contra abuso de la API
- ✅ **Sanitización de datos**: Limpieza de datos de entrada
- ✅ **Logging estructurado**: Registro detallado de operaciones
- ✅ **Headers de seguridad**: Configuración de seguridad en respuestas HTTP

### Mejoras de Seguridad

- **Eliminación de SSRF**: El sistema ya no descarga archivos desde URLs externas
- **Upload directo**: Los archivos se suben directamente al servidor
- **Validación estricta**: Verificación de tipos de archivo y contenido
- **Manejo seguro de errores**: No exposición de información sensible

## 🤖 Sistema de IA Inteligente

### Motor de IA Avanzado
El sistema integra múltiples técnicas de machine learning y análisis de datos:

- **🔮 Análisis Predictivo**: Predicción de sobrecostos, retrasos y probabilidades de cumplimiento
- **🚨 Detección de Anomalías**: Identificación automática de patrones anómalos usando Isolation Forest y LOF
- **📊 Scoring de Riesgo**: Cálculo de riesgo multidimensional con ponderación inteligente
- **💡 Recomendaciones**: Generación automática de recomendaciones basadas en análisis de datos
- **📈 Análisis Temporal**: Identificación de tendencias y patrones en series de tiempo
- **🎯 Insights Avanzados**: Métricas de eficiencia global y sostenibilidad temporal

### Algoritmos Implementados
- **Random Forest**: Para predicción de riesgos
- **Isolation Forest**: Para detección de anomalías
- **Local Outlier Factor (LOF)**: Para detección de outliers
- **Análisis de Series Temporales**: Para predicciones temporales
- **NLP con spaCy**: Para procesamiento de texto en español
- **Análisis de Sentimientos**: Para evaluación de contexto

### Modelos de IA Utilizados
- **spaCy es_core_news_sm**: Modelo de procesamiento de lenguaje natural en español
- **NLTK VADER**: Análisis de sentimientos
- **Scikit-learn**: Algoritmos de machine learning
- **PyOD**: Detección de anomalías

## 🚀 Características Avanzadas

### Sistema de Monitoreo
- **Health checks**: Verificación de estado del sistema
- **Métricas de rendimiento**: Monitoreo de tiempo de respuesta
- **Logging estructurado**: Registros en formato JSON para análisis

### Optimizaciones de Rendimiento
- **Cache con Redis**: Almacenamiento en caché de resultados
- **Procesamiento asíncrono**: Manejo eficiente de múltiples requests
- **Validación optimizada**: Verificación rápida de archivos

### Escalabilidad
- **Containerización**: Docker para despliegue consistente
- **Arquitectura modular**: Separación clara de responsabilidades
- **Configuración flexible**: Variables de entorno para diferentes entornos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Desarrollado para

**Secretaría de Infraestructura Física**  
Alcaldía de Medellín