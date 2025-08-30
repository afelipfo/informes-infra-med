/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración estable para producción
  images: {
    domains: ['localhost'],
  },
  // Solo ignorar errores en desarrollo
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
