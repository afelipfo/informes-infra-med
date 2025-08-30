'use client'

import Navigation from './Navigation'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  icon?: string
}

export default function PageLayout({ children, title, subtitle, icon }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Page Header */}
        {title && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              {icon && (
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-blue-400/30">
                  <span className="text-4xl">{icon}</span>
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  )
}
