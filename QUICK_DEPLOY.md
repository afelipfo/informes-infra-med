# 🚀 Despliegue Rápido en Railway

## ⚡ Guía Express (5 minutos)

### Paso 1: Preparar el Repositorio

1. **Crear repositorio en GitHub:**
   - Ve a [GitHub.com](https://github.com)
   - Crea un nuevo repositorio
   - Copia la URL del repositorio

2. **Ejecutar script de automatización:**
   ```powershell
   # En Windows (PowerShell)
   .\deploy-to-railway.ps1
   
   # O manualmente:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```

### Paso 2: Desplegar en Railway

1. **Ir a [Railway.app](https://railway.app)**
2. **Crear cuenta** (usar GitHub)
3. **Crear nuevo proyecto**
4. **Seleccionar "Deploy from GitHub repo"**
5. **Seleccionar tu repositorio**
6. **¡Railway detectará automáticamente la configuración!**

### Paso 3: Configurar Variables (Opcional)

En Railway → Variables, agregar:

```env
ENVIRONMENT=production
DEBUG=false
SECRET_KEY=tu_clave_secreta_aqui
CORS_ORIGINS=*
```

### Paso 4: ¡Listo!

- **URL automática:** `https://tu-app.railway.app`
- **Health check:** `https://tu-app.railway.app/health`
- **Tiempo de build:** 5-10 minutos

---

## 📋 Checklist de Verificación

- [ ] Repositorio creado en GitHub
- [ ] Código subido al repositorio
- [ ] Proyecto creado en Railway
- [ ] Repositorio conectado en Railway
- [ ] Build completado exitosamente
- [ ] Aplicación accesible via URL
- [ ] Health check responde correctamente

---

## 🔧 Solución de Problemas Rápidos

### Build Falla
- Verificar que todos los archivos estén en el repositorio
- Revisar logs en Railway → Deployments

### Aplicación No Inicia
- Verificar variables de entorno
- Revisar logs de la aplicación

### Error de Conexión
- Verificar que el puerto esté configurado
- Revisar configuración de nginx

---

## 📞 Soporte

- **Documentación completa:** `DEPLOYMENT.md`
- **Railway Docs:** https://docs.railway.app
- **Variables de entorno:** `railway.env.example`

---

**¡Tu aplicación estará lista para ser compartida! 🌍**
