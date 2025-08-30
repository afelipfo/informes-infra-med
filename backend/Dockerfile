# Fichero: backend/Dockerfile - Versión optimizada

# --- Etapa 1: Builder optimizado ---
FROM python:3.11-slim as builder

# Instalar dependencias del sistema necesarias para compilación
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copiar solo requirements.txt primero para aprovechar cache de Docker
COPY requirements.txt ./

# Instalar dependencias con optimizaciones
RUN pip install --no-cache-dir --upgrade pip setuptools wheel && \
    pip wheel --no-cache-dir --wheel-dir /usr/src/app/wheels -r requirements.txt

# --- Etapa 2: Runtime optimizado ---
FROM python:3.11-slim

# Crear usuario no-root para seguridad
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Instalar dependencias del sistema optimizadas
RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

WORKDIR /app

# Copiar wheels y instalar dependencias
COPY --from=builder /usr/src/app/wheels /wheels
COPY requirements.txt .

# Instalar dependencias desde wheels
RUN pip install --no-cache /wheels/* && \
    rm -rf /wheels && \
    rm requirements.txt

# Copiar código de la aplicación
COPY ./app ./app
COPY ./.env ./.env
COPY ./setup_ai_models.py ./setup_ai_models.py

# Configurar modelos de IA con optimizaciones
RUN python setup_ai_models.py

# Crear directorios necesarios y establecer permisos
RUN mkdir -p /app/logs /app/cache /app/temp && \
    chown -R appuser:appuser /app

# Cambiar al usuario no-root
USER appuser

# Variables de entorno para optimización
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONOPTIMIZE=1
ENV PYTHONHASHSEED=random

# Configurar límites de memoria para Python
ENV PYTHONMALLOC=malloc
ENV PYTHONDEVMODE=0

# Exponer puerto
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Comando de inicio optimizado
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1", "--loop", "uvloop", "--http", "httptools"]