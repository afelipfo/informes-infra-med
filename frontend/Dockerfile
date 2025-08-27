# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine
WORKDIR /app

# Copiar el build desde la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Exponer el puerto y correr la aplicación
EXPOSE 3000
CMD ["npm", "start"]