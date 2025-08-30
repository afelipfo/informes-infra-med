# 📊 Sistema de Informes de Infraestructura - Medellín

Sistema web para la generación automática de informes técnicos para contratos de Urgencia Manifiesta de la Secretaría de Infraestructura de Medellín.

## 🚀 Características

- **Análisis Automático**: Procesa archivos Excel con datos de contratos
- **Alertas Inteligentes**: Genera mensajes técnicos con diferentes niveles de severidad
- **Análisis Presupuestal**: Monitoreo de ejecución vs presupuesto aprobado
- **Seguimiento de Cronograma**: Control de avance físico y fechas de finalización
- **Interfaz Moderna**: Frontend responsive con Next.js y Tailwind CSS

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

# 2. Configurar proyecto automáticamente
python scripts/setup.py

# 3. Crear archivos de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

### Ejecución con Docker Compose (Recomendado)

```bash
# Construir y ejecutar todos los servicios
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
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📋 Uso

1. **Acceder a la aplicación**: Navega a http://localhost:3000
2. **Ingresar URL del Excel**: Proporciona la URL de la API que devuelve el archivo Excel con los datos del contrato
3. **Generar Informe**: El sistema procesará automáticamente los datos y generará el informe técnico
4. **Revisar Resultados**: El informe incluirá análisis presupuestal y de cronograma con alertas según corresponda

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
PROJECT_NAME="API de Generación de Informes - Infraestructura Medellín"
API_V1_STR="/api/v1"
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
└── docker-compose.yml         # Orquestación de servicios
```

## 📝 API Endpoints

### POST `/api/v1/reports/generate`
Genera un informe técnico basado en los datos del Excel.

**Request Body:**
```json
{
  "excel_api_url": "https://ejemplo.com/api/datos_contrato.xlsx"
}
```

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