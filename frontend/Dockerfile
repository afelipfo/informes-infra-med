# Dockerfile optimizado para Frontend Next.js

# Etapa 1: Dependencias
FROM node:18-alpine AS deps

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias con cache optimizado
RUN npm ci --only=production --silent && npm cache clean --force

# Etapa 2: Builder optimizado
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependencias desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente
COPY . .

# Configurar variables de entorno para build optimizado
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build optimizado con cache
RUN npm run build

# Etapa 3: Runtime optimizado
FROM node:18-alpine AS runner

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Variables de entorno para optimización
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Crear directorio para archivos estáticos
RUN mkdir -p /app/.next/cache

# Copiar archivos necesarios desde builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copiar build optimizado
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiar al usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Comando de inicio optimizado
CMD ["node", "server.js"]