export default function GeneradorHTML() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>
        🎨 Generador de Informes - Versión HTML
      </h1>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
        Tu nueva interfaz HTML espectacular está disponible en un servidor dedicado
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a 
          href="http://localhost:8080/generador-informes.html" 
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: 'linear-gradient(135deg, #00c9ff, #92fe9d)',
            color: '#1a1a1a',
            padding: '1rem 2rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            boxShadow: '0 8px 16px rgba(0, 201, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🚀 Abrir Generador HTML
        </a>
        
        <a 
          href="/generate-report"
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            padding: '1rem 2rem',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          📱 Versión React/Next.js
        </a>
      </div>
      
      <div style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: 'rgba(255, 255, 255, 0.1)', 
        borderRadius: '12px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem', color: '#00c9ff' }}>✨ Características de la Versión HTML</h3>
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            🎨 <strong>Diseño Espectacular:</strong> Gradientes animados y efectos glassmorphism
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            🚀 <strong>Drag & Drop:</strong> Carga de archivos Excel/CSV intuitiva
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            🤖 <strong>IA Integrada:</strong> Análisis automático con recomendaciones
          </li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            📊 <strong>Demostración:</strong> Prueba con datos de ejemplo
          </li>
          <li style={{ padding: '0.5rem 0' }}>
            📱 <strong>Responsive:</strong> Funciona perfectamente en móvil y desktop
          </li>
        </ul>
      </div>
      
      <p style={{ 
        marginTop: '2rem', 
        fontSize: '0.9rem', 
        opacity: '0.8',
        textAlign: 'center'
      }}>
        💡 <strong>Tip:</strong> El servidor HTML corre en el puerto 8080, mientras que Next.js en el 3000
      </p>
    </div>
  );
}
