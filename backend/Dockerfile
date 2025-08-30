# Fichero: backend/Dockerfile

# --- Etapa 1: Builder ---
# Usamos una imagen completa de Python para construir las dependencias
FROM python:3.11-slim as builder

WORKDIR /usr/src/app

# Pre-instalamos dependencias para aprovechar el cache de Docker
COPY requirements.txt ./
RUN pip wheel --no-cache-dir --wheel-dir /usr/src/app/wheels -r requirements.txt


# --- Etapa 2: Final ---
# Usamos una imagen ligera (slim) para la ejecución
FROM python:3.11-slim

WORKDIR /app

# Copiamos las dependencias pre-compiladas y las instalamos
COPY --from=builder /usr/src/app/wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache /wheels/*

# Copiamos el código de nuestra aplicación
COPY ./app ./app
COPY ./.env ./.env
COPY ./setup_ai_models.py ./setup_ai_models.py

# Instalar dependencias del sistema para modelos de IA
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Configurar modelos de IA
RUN python setup_ai_models.py

# Exponemos el puerto y definimos el comando de inicio
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]