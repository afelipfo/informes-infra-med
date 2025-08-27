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

# Exponemos el puerto y definimos el comando de inicio
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]