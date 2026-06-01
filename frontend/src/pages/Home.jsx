import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Hero Section Container */}
      <div className="page-hero card" style={{ padding: '48px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'center' }}>
        
        {/* Left Column - Product Copy */}
        <div className="hero-copy" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span className="eyebrow" style={{ alignSelf: 'flex-start' }}>SmartAttend Pro</span>
          <h1 style={{ margin: 0, fontSize: 'clamp(2.4rem, 3.5vw, 3.4rem)', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Modern attendance & secure authentication.
          </h1>
          <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563' }}>
            Establish a professional authentication module featuring role-based login, secure JWT active sessions, 
            high-fidelity face image registration, and real-time administrative auditable dashboards.
          </p>

          {/* Corporate Stats Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            background: 'rgba(15,23,42,0.03)',
            border: '1px solid rgba(15,23,42,0.06)',
            borderRadius: '20px',
            padding: '16px 24px',
            margin: '8px 0',
            maxWidth: '520px'
          }} className="hero-stats-bar">
            <div style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: '800', color: '#2563eb', lineHeight: 1 }}>99.98%</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Matching Accuracy</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'rgba(15,23,42,0.1)' }}></div>
            <div style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: '800', color: '#2563eb', lineHeight: 1 }}>&lt; 150ms</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Response Speed</span>
            </div>
            <div style={{ width: '1px', height: '28px', background: 'rgba(15,23,42,0.1)' }}></div>
            <div style={{ flex: 1 }}>
              <span style={{ display: 'block', fontSize: '1.4rem', fontWeight: '800', color: '#2563eb', lineHeight: 1 }}>JWT</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Bcrypt Secure</span>
            </div>
          </div>

          <div className="hero-actions" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link className="button primary" to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', borderRadius: '16px', fontSize: '0.95rem' }}>
              <span>Sign in to account</span>
              <span style={{ fontSize: '1.1rem' }}>➔</span>
            </Link>
            <Link className="button secondary" to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 26px', borderRadius: '16px', fontSize: '0.95rem' }}>
              <span>Register new employee</span>
              <span style={{ fontSize: '1.1rem' }}>📝</span>
            </Link>
          </div>
        </div>

        {/* Right Column - Biometric Scanner Simulator Widget */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(8,15,32,0.95), rgba(13,20,44,0.9))',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '28px',
          padding: '28px',
          boxShadow: '0 32px 80px rgba(2,6,23,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }} className="scanner-widget">
          
          {/* Active system pill */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
              Verification System
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.1)', padding: '6px 12px', borderRadius: '999px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} className="pulse-dot"></span>
              <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '700' }}>Online & Active</span>
            </div>
          </div>

          {/* Silhouette Scanner Screen */}
          <div style={{
            height: '180px',
            background: 'rgba(0,0,0,0.4)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Horizontal sweep-line */}
            <div style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '3px',
              background: 'linear-gradient(90deg, transparent, #22c55e, transparent)',
              boxShadow: '0 0 10px #22c55e, 0 0 4px #22c55e',
              animation: 'sweep 3.5s ease-in-out infinite',
              zIndex: 2
            }}></div>

            {/* Silhouette outline */}
            <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 8px rgba(37,99,235,0.2))', zIndex: 1, userSelect: 'none' }}>
              👤
            </div>

            {/* Glow backing grid */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              backgroundImage: 'radial-gradient(#2563eb 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px'
            }}></div>
          </div>

          {/* Simulated Logger Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Recent Activity logs
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem' }}>👤</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#e2e8f0' }}>Sarah Chen</span>
                </div>
                <span style={{ color: '#34d399', fontWeight: '700', fontSize: '0.78rem' }}>Verified Check-In ✅</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.9rem' }}>👤</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#e2e8f0' }}>Marcus Vance</span>
                </div>
                <span style={{ color: '#34d399', fontWeight: '700', fontSize: '0.78rem' }}>Verified Check-In ✅</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Feature Cards Deck at Bottom */}
      {/* <div className="home-features-deck" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        <div className="feature-card" style={{ background: 'rgba(255,255,255,0.95)', padding: '28px', borderRadius: '24px', boxShadow: '0 16px 40px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(37,99,235,0.08)', borderRadius: '14px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.5rem' }}>🔒</span>
          </div>
          <strong style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
            Secure Authentication
          </strong>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.6', color: '#4b5563' }}>
            Deploy role-based JSON Web Tokens (JWT) to safeguard profiles, administrative actions, and attendance feeds.
          </p>
        </div>

        <div className="feature-card" style={{ background: 'rgba(255,255,255,0.95)', padding: '28px', borderRadius: '24px', boxShadow: '0 16px 40px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(37,99,235,0.08)', borderRadius: '14px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.5rem' }}>📷</span>
          </div>
          <strong style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
            Identity Vector Encoding
          </strong>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.6', color: '#4b5563' }}>
            Simplify registrations by uploading clear face images and generating secure math mapping coordinates.
          </p>
        </div>

        <div className="feature-card" style={{ background: 'rgba(255,255,255,0.95)', padding: '28px', borderRadius: '24px', boxShadow: '0 16px 40px rgba(15,23,42,0.06)' }}>
          <div style={{ display: 'inline-flex', padding: '10px', background: 'rgba(37,99,235,0.08)', borderRadius: '14px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.5rem' }}>📊</span>
          </div>
          <strong style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
            Administrative Audits
          </strong>
          <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: '1.6', color: '#4b5563' }}>
            Delegated dashboards offer full team management, registration audits, and secure workspace controls.
          </p>
        </div>

      </div> */}

      <style>{`
        @keyframes sweep {
          0%, 100% { top: 10%; }
          50% { top: 90%; }
        }
        .pulse-dot {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @media (max-width: 900px) {
          .page-hero {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .home-features-deck {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
