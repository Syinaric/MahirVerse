import { useNavigate } from 'react-router-dom'

export default function PlaceholderPage({ title }) {
  const navigate = useNavigate()

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#030014',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      color: 'white',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, #4fc3f7, #ce93d8)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {title}
      </h1>
      <button
        onClick={() => navigate('/')}
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.3)',
          color: 'white',
          padding: '0.6rem 1.4rem',
          fontSize: '1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        onMouseOut={e => e.currentTarget.style.background = 'transparent'}
      >
        ← Back to MahirVerse
      </button>
    </div>
  )
}
