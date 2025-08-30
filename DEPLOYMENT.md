# 🚀 Despliegue en Railway - Sistema de Informes Infraestructura Medellín

## 📋 Descripción

Este documento contiene las instrucciones para desplegar el Sistema de Informes de Infraestructura Medellín en Railway.

## 🎯 Características del Sistema

- **Backend**: API REST con FastAPI y análisis de IA
- **Frontend**: Aplicación Next.js con interfaz moderna
- **IA**: Motor de análisis inteligente con machine learning
- **Base de Datos**: PostgreSQL (opcional)
- **Cache**: Redis (opcional)

## 🛠️ Requisitos Previos

1. **Cuenta de GitHub** (gratuita)
2. **Cuenta de Railway** (gratuita)
3. **Código del proyecto** subido a GitHub

## 📦 Archivos de Configuración

### Archivos Creados para Railway:

- `railway.json` - Configuración de Railway
- `Dockerfile.railway` - Dockerfile optimizado para Railway
- `nginx.railway.conf` - Configuración de nginx para Railway
- `start-railway.sh` - Script de inicio
- `.dockerignore` - Archivos a ignorar en el build

## 🚀 Pasos para el Despliegue

### Paso 1: Preparar el Repositorio

1. **Subir el código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sistema de Informes"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

### Paso 2: Configurar Railway

1. **Ir a [Railway.app](https://railway.app)**
2. **Crear cuenta** (puedes usar tu cuenta de GitHub)
3. **Crear nuevo proyecto**
4. **Seleccionar "Deploy from GitHub repo"**
5. **Seleccionar tu repositorio**
6. **Railway detectará automáticamente la configuración**

### Paso 3: Configurar Variables de Entorno

En Railway, ir a la pestaña "Variables" y agregar:

```env
# Configuración básica
ENVIRONMENT=production
DEBUG=false

# Configuración de la aplicación
PROJECT_NAME="Sistema de Informes - Infraestructura Medellín"
API_V1_STR=/api/v1

# Configuración de seguridad
SECRET_KEY=tu_clave_secreta_muy_larga_y_segura
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Configuración de CORS
CORS_ORIGINS=*

# Configuración de logging
LOG_FORMAT=json
LOG_LEVEL=info

# Configuración de archivos
UPLOAD_DIR=/app/temp
MAX_FILE_SIZE=10485760

# Configuración de cache (opcional)
REDIS_URL=redis://localhost:6379

# Configuración de base de datos (opcional)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### Paso 4: Desplegar

1. **Railway iniciará automáticamente el build**
2. **El proceso tomará 5-10 minutos**
3. **Railway asignará una URL automáticamente**

## 🔧 Configuración Avanzada

### Dominio Personalizado

1. **En Railway, ir a "Settings"**
2. **Seleccionar "Domains"**
3. **Agregar tu dominio personalizado**
4. **Configurar DNS según las instrucciones**

### Variables de Entorno Adicionales

```env
# Configuración de monitoreo
ENABLE_METRICS=true
ENABLE_HEALTH_CHECKS=true

# Configuración de rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60

# Configuración de IA
AI_MODEL_CACHE_SIZE=100
AI_ANALYSIS_TIMEOUT=300
```

## 📊 Monitoreo y Logs

### Ver Logs en Railway:

1. **Ir a la pestaña "Deployments"**
2. **Seleccionar el deployment activo**
3. **Ver logs en tiempo real**

### Health Check:

La aplicación expone un endpoint de health check:
```
GET https://tu-app.railway.app/health
```

## 🔒 Seguridad

### Configuraciones Implementadas:

- ✅ Headers de seguridad (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ CORS configurado correctamente
- ✅ Rate limiting básico
- ✅ Validación de archivos
- ✅ Usuario no-root en contenedor

### Recomendaciones Adicionales:

1. **Configurar autenticación** si es necesario
2. **Implementar rate limiting** más estricto
3. **Configurar backup automático** de datos
4. **Monitorear uso de recursos**

## 🚨 Solución de Problemas

### Problemas Comunes:

1. **Build falla:**
   - Verificar que todos los archivos estén en el repositorio
   - Revisar logs de build en Railway

2. **Aplicación no inicia:**
   - Verificar variables de entorno
   - Revisar logs de la aplicación

3. **Error de conexión:**
   - Verificar que el puerto esté configurado correctamente
   - Revisar configuración de nginx

### Comandos de Debug:

```bash
# Ver logs de la aplicación
railway logs

# Conectar al contenedor
railway shell

# Ver variables de entorno
railway variables
```

## 📈 Escalabilidad

### Railway Auto-scaling:

- Railway escala automáticamente según la demanda
- Puedes configurar límites en la configuración del proyecto

### Optimizaciones Implementadas:

- ✅ Multi-stage Docker build
- ✅ Cache de dependencias
- ✅ Compresión GZIP
- ✅ Optimización de imágenes estáticas

## 💰 Costos

### Railway Free Tier:

- ✅ 500 horas de ejecución por mes
- ✅ 1GB de almacenamiento
- ✅ 1GB de transferencia
- ✅ SSL gratuito
- ✅ Dominio personalizado gratuito

### Para uso empresarial:

- Considerar planes pagos de Railway
- Implementar monitoreo avanzado
- Configurar backup automático

## 📞 Soporte

### Recursos Útiles:

- [Documentación de Railway](https://docs.railway.app)
- [GitHub del proyecto](https://github.com/TU_USUARIO/TU_REPO)
- [Issues del proyecto](https://github.com/TU_USUARIO/TU_REPO/issues)

### Contacto:

Para soporte técnico, crear un issue en GitHub o contactar al equipo de desarrollo.

---

**¡Tu aplicación estará lista para ser compartida con el mundo! 🌍**
