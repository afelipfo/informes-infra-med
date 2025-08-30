/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuración para GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/informes-infra-med' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/informes-infra-med/' : '',
}

module.exports = nextConfig
