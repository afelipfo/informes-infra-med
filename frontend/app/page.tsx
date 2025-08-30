'use client'

import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-160px',
          right: '-160px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'blob 7s infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-160px',
          left: '-160px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(251, 146, 60, 0.2) 100%)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'blob 7s infinite 2s'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '160px',
          left: '160px',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
          borderRadius: '50%',
          filter: 'blur(48px)',
          animation: 'blob 7s infinite 4s'
        }}></div>
      </div>

      {/* Main Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 1rem'
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '50%',
            marginBottom: '2rem',
            animation: 'float 6s ease-in-out infinite'
          }}>
            <span style={{ fontSize: '3rem' }}>🏗️</span>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #dbeafe 50%, #f3e8ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'glow 2s ease-in-out infinite alternate'
          }}>
            Sistema de Informes
          </h1>
          
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            color: '#bfdbfe',
            marginBottom: '2rem',
            fontWeight: 300
          }}>
            Secretaría de Infraestructura Física
          </h2>
          
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
            backdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <span style={{ color: '#bfdbfe', fontSize: '1.125rem' }}>🏛️ Alcaldía de Medellín</span>
          </div>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#d1d5db',
            maxWidth: '64rem',
            margin: '3rem auto 0',
            lineHeight: '1.75'
          }}>
            Genera informes técnicos automáticos para contratos de Urgencia Manifiesta con 
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600
            }}> análisis inteligente</span> y 
            <span style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600
            }}> resultados instantáneos</span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          <Link 
            href="/generate-report" 
            style={{
              position: 'relative',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '300px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(59, 130, 246, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }}
          >
            <div style={{ fontSize: '3rem', animation: 'bounce 2s infinite' }}>📊</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>Generar Nuevo Informe</div>
              <div style={{ color: '#dbeafe', fontSize: '0.875rem' }}>Análisis automático de datos</div>
            </div>
          </Link>
          
          <Link 
            href="/reports" 
            style={{
              position: 'relative',
              padding: '1.5rem 2rem',
              background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
              borderRadius: '1rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              minWidth: '300px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(5, 150, 105, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            }}
          >
            <div style={{ fontSize: '3rem', animation: 'pulse 2s infinite' }}>📋</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>Ver Informes Anteriores</div>
              <div style={{ color: '#a7f3d0', fontSize: '0.875rem' }}>Historial y análisis</div>
            </div>
          </Link>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 6s ease-in-out infinite' }}>🤖</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Análisis Inteligente</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.75' }}>
              Procesamiento automático con <span style={{ color: '#22d3ee', fontWeight: 600 }}>IA avanzada</span> que detecta patrones y genera alertas por severidad en tiempo real.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%', animation: 'pulse 1s infinite 1s' }}></div>
              <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite 2s' }}></div>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(147, 51, 234, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.2)';
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 6s ease-in-out infinite 2s' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Resultados Instantáneos</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.75' }}>
              Obtén informes técnicos completos en <span style={{ color: '#ec4899', fontWeight: 600 }}>segundos</span> con análisis presupuestal, cronograma y recomendaciones detalladas.
            </p>
            <div style={{ marginTop: '1rem', fontSize: '2rem', animation: 'spin 3s linear infinite' }}>🔄</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)',
            backdropFilter: 'blur(8px)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid rgba(5, 150, 105, 0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(5, 150, 105, 0.2)';
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem', animation: 'float 6s ease-in-out infinite 4s' }}>🔒</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: 'white' }}>Seguro y Confiable</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.75' }}>
              Procesamiento <span style={{ color: '#10b981', fontWeight: 600 }}>100% local</span> sin comprometer la seguridad de tus datos. Cumple con estándares de gobierno.
            </p>
            <div style={{ marginTop: '1rem', fontSize: '2rem', animation: 'pulse 2s infinite' }}>🛡️</div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)',
          backdropFilter: 'blur(8px)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '1px solid rgba(59, 130, 246, 0.2)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>📈 Estadísticas del Sistema</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#22d3ee', marginBottom: '0.5rem' }}>99.9%</div>
              <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Precisión</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a855f7', marginBottom: '0.5rem' }}>&lt;2s</div>
              <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Tiempo de Respuesta</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ec4899', marginBottom: '0.5rem' }}>24/7</div>
              <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Disponibilidad</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>100%</div>
              <div style={{ color: '#d1d5db', fontSize: '0.875rem' }}>Seguro</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)',
            backdropFilter: 'blur(8px)',
            borderRadius: '9999px',
            border: '1px solid rgba(59, 130, 246, 0.3)'
          }}>
            <span style={{ color: '#bfdbfe' }}>🚀</span>
            <span style={{ color: '#bfdbfe' }}>Powered by Advanced AI Technology</span>
            <span style={{ color: '#bfdbfe' }}>🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}