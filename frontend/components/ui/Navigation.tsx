'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">🏗️</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Sistema de Informes
              </h1>
              <p className="text-xs text-gray-400">Infraestructura Medellín</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              🏠 Inicio
            </Link>
            <Link
              href="/generate-report"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/generate-report')
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              📊 Generar Informe
            </Link>
            <Link
              href="/reports"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/reports')
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              📋 Ver Informes
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-lg border-t border-purple-500/20">
          <div className="px-4 py-2 space-y-1">
          <Link
            href="/"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive('/')
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-400/30'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            🏠 Inicio
          </Link>
          <Link
            href="/generate-report"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive('/generate-report')
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-white border border-green-400/30'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            📊 Generar Informe
          </Link>
          <Link
            href="/reports"
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              isActive('/reports')
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            📋 Ver Informes
                      </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
