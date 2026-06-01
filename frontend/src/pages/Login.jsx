import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api.js';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activePortal, setActivePortal] = useState('employee'); // 'employee' or 'admin'

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      
      // Verification: Make sure user login matches the selected portal!
      if (activePortal === 'admin' && data.user.role !== 'admin') {
        throw new Error('Access denied: Selected credentials do not possess administrator rights.');
      } else if (activePortal === 'employee' && data.user.role === 'admin') {
        // Allow admins to login as employee, but guide them to the Admin portal for full features
        setMessage('Admin login detected. Redirecting to admin panel...');
      }

      localStorage.setItem('smartattend_token', data.token);
      localStorage.setItem('smartattend_role', data.user.role);
      
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }, 600);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };



  const isAdmin = activePortal === 'admin';
  const accentColor = isAdmin ? '#a855f7' : '#2563eb';
  const shadowColor = isAdmin ? 'rgba(168, 85, 247, 0.22)' : 'rgba(37, 99, 235, 0.22)';
  const hoverShadow = isAdmin ? 'rgba(168, 85, 247, 0.32)' : 'rgba(37, 99, 235, 0.32)';

  return (
    <div className="auth-page">
      <div className="auth-floating-shapes">
        <div className="shape shape-1" style={{ background: isAdmin ? 'radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)' : undefined }}></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card" style={{ maxWidth: '480px', width: '100%', padding: '36px 36px 40px' }}>
          
          {/* Portal Switcher Tabs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '14px',
            padding: '4px',
            marginBottom: '28px'
          }}>
            <button
              type="button"
              onClick={() => { setActivePortal('employee'); setMessage(''); }}
              style={{
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: !isAdmin ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' : 'transparent',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: !isAdmin ? '0 4px 12px rgba(37, 99, 235, 0.2)' : 'none'
              }}
            >
              👤 Employee Portal
            </button>
            <button
              type="button"
              onClick={() => { setActivePortal('admin'); setMessage(''); }}
              style={{
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                background: isAdmin ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)' : 'transparent',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isAdmin ? '0 4px 12px rgba(147, 51, 234, 0.2)' : 'none'
              }}
            >
              ⚙️ Admin Portal
            </button>
          </div>

          <div className="auth-header" style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'inline-flex',
              padding: '12px',
              background: isAdmin ? 'rgba(168,85,247,0.1)' : 'rgba(37,99,235,0.1)',
              borderRadius: '16px',
              marginBottom: '14px',
              transition: 'background 0.3s'
            }}>
              <span style={{ fontSize: '1.8rem' }}>{isAdmin ? '⚙️' : '🔐'}</span>
            </div>
            <h2>{isAdmin ? 'Sign in as Administrator' : 'Sign in to SmartAttend'}</h2>
            <p>Access your {isAdmin ? 'admin tools' : 'employee portal'} with secure JWT credentials.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="form-group">
              <label>Email address</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: '#94a3b8' }}>
                  📧
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ paddingLeft: '48px', width: '100%', borderRadius: '16px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: '#94a3b8' }}>
                  🔑
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: '48px', paddingRight: '46px', width: '100%', borderRadius: '16px' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    padding: 0,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', color: '#cbd5e1' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: '16px', height: '16px', borderRadius: '4px', cursor: 'pointer', accentColor: accentColor }}
                />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); setMessage('Password reset link sent (Mock implementation).'); }} style={{ color: accentColor, textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="button primary submit-btn"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                background: isAdmin ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)' : undefined,
                boxShadow: isAdmin ? '0 16px 28px rgba(147, 51, 234, 0.22)' : undefined
              }}
            >
              {loading ? (
                <>
                  <svg style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Verifying identity...</span>
                </>
              ) : (
                isAdmin ? 'Sign in as Admin' : 'Sign in securely'
              )}
            </button>
          </form>

          {message && (
            <div
              className={`message ${message.includes('successful') || message.includes('sent') ? 'success' : 'error'}`}
              style={{ marginTop: '20px' }}
            >
              {message}
            </div>
          )}



          <div className="auth-footer" style={{ marginTop: '28px' }}>
            <p>New to SmartAttend? <Link to="/register">Create an account</Link></p>
          </div>
        </div>

        <div className="auth-highlights">
          <div className="highlight-item">
            <span className="highlight-icon">🔐</span>
            <h4>Secure Login</h4>
            <p>JWT-based authentication keeps your credentials safe.</p>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">👤</span>
            <h4>Profile Access</h4>
            <p>View and manage your account details instantly.</p>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">⚙️</span>
            <h4>Role-Based</h4>
            <p>Admins and employees have tailored access levels.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .submit-btn:hover {
          box-shadow: 0 20px 40px ${hoverShadow} !important;
        }
      `}</style>
    </div>
  );
}

export default Login;
