import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api.js';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [department, setDepartment] = useState('Engineering');
  const [role, setRole] = useState('employee');
  const [faceImage, setFaceImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleUpload = (file) => {
    if (!file) return;
    setFaceImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setMessage('');
  };

  const handleClear = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFaceImage(null);
    setPreviewUrl('');
    setMessage('');
  };

  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak ⚠️', color: '#ef4444' };
      case 2:
        return { score: 50, label: 'Medium 🟠', color: '#f97316' };
      case 3:
        return { score: 75, label: 'Strong 🟢', color: '#22c55e' };
      case 4:
        return { score: 100, label: 'Very Secure 🔥', color: '#10b981' };
      default:
        return { score: 0, label: 'Too Short ❌', color: '#ef4444' };
    }
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!faceImage) {
      setMessage('Please upload a face image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('employeeId', employeeId);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('department', department);
    formData.append('role', role);
    formData.append('faceImage', faceImage);

    setLoading(true);
    setMessage('');

    try {
      const data = await registerUser(formData);
      localStorage.setItem('smartattend_token', data.token);
      localStorage.setItem('smartattend_role', data.user.role);
      setMessage('Registration successful! Redirecting to profile...');
      setTimeout(() => navigate('/profile'), 800);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="auth-container" style={{ maxWidth: '980px' }}>
        <div className="auth-card" style={{ width: '100%', padding: '44px 40px' }}>
          <div className="auth-header" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(37,99,235,0.1)', borderRadius: '16px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.8rem' }}>📝</span>
            </div>
            <h2>Create your account</h2>
            <p>Join SmartAttend and register with a face image for secure attendance validation.</p>
          </div>

          <form onSubmit={handleSubmit} className="register-grid">
            {/* Left Column - Credentials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                Account Profile
              </h3>

              <div className="form-group">
                <label>Full name</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: '#94a3b8' }}>
                    👤
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    style={{ paddingLeft: '48px', width: '100%', borderRadius: '16px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{role === 'admin' ? 'Admin Access Key' : 'Employee ID'}</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: role === 'admin' ? '#c084fc' : '#94a3b8' }}>
                    {role === 'admin' ? '🔑' : '🆔'}
                  </span>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder={role === 'admin' ? 'ADM-SECURE-KEY' : 'EMP12345'}
                    style={{ paddingLeft: '48px', width: '100%', borderRadius: '16px', borderColor: role === 'admin' ? 'rgba(168,85,247,0.3)' : 'rgba(148, 163, 184, 0.24)' }}
                    required
                  />
                </div>
                {role === 'admin' && (
                  <p style={{ margin: '4px 0 0 4px', fontSize: '0.78rem', color: '#c084fc', fontWeight: '600' }}>
                    ⚠️ Security authorization key required for admin privileges.
                  </p>
                )}
              </div>

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
                {/* Real-time Password Strength Meter */}
                {password && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '4px' }}>
                      <span>Password Strength:</span>
                      <span style={{ color: strength.color, fontWeight: '700' }}>{strength.label}</span>
                    </div>
                    <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${strength.score}%`, height: '100%', background: strength.color, transition: 'all 0.3s ease' }}></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: '#94a3b8' }}>
                      🏢
                    </span>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Engineering"
                      style={{ paddingLeft: '48px', width: '100%', borderRadius: '16px' }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: role === 'admin' ? '#c084fc' : '#94a3b8' }}>
                      👥
                    </span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{ paddingLeft: '48px', width: '100%', borderRadius: '16px', background: 'rgba(255,255,255,0.08)', color: '#e2e8f0', border: '1px solid rgba(148, 163, 184, 0.24)', height: '53px', borderColor: role === 'admin' ? 'rgba(168,85,247,0.3)' : 'rgba(148, 163, 184, 0.24)' }}
                    >
                      <option value="employee" style={{ background: '#0f172a', color: '#fff' }}>Employee</option>
                      <option value="admin" style={{ background: '#0f172a', color: '#fff' }}>Admin</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Uploader & Verification Requirements */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '8px' }}>
                Face Verification
              </h3>

              <div className="form-group">
                <label>Face registration photo</label>
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleUpload(e.dataTransfer.files?.[0] || null); }}
                  style={{
                    border: isDragging ? '2px dashed #2563eb' : '2px dashed rgba(255,255,255,0.14)',
                    background: isDragging ? 'rgba(37,99,235,0.06)' : 'rgba(255,255,255,0.03)',
                    borderRadius: '20px',
                    padding: '24px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {!previewUrl ? (
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 4px 10px rgba(15,23,42,0.12))' }}>📸</span>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#e2e8f0' }}>Drag & drop face photo here</span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>or click to browse from device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUpload(e.target.files?.[0] || null)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <img src={previewUrl} alt="Face preview" className="preview-image" style={{ borderRadius: '14px', maxHeight: '180px', width: '100%', objectFit: 'cover' }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: '600' }}>✓ Ready for verification</span>
                        <button type="button" className="button secondary" onClick={handleClear} style={{ padding: '6px 12px', borderRadius: '10px', fontSize: '0.82rem' }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirements Checklist Card */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '16px 20px' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>
                  Verification Requirements
                </h4>
                <ul style={{ margin: 0, paddingLeft: '18px', listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <li>Ensure clear lighting and face forward directly</li>
                  <li>Avoid wearing sunglasses, hats, or heavy masks</li>
                  <li>Neutral, plain background is highly recommended</li>
                  <li>File format must be JPG, JPEG or PNG</li>
                </ul>
              </div>
            </div>

            {/* Span Submit Button */}
            <div className="submit-span" style={{ gridColumn: 'span 2', marginTop: '12px' }}>
              <button
                type="submit"
                className="button primary"
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
                  background: role === 'admin' ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)' : undefined,
                  boxShadow: role === 'admin' ? '0 16px 28px rgba(147, 51, 234, 0.22)' : undefined
                }}
              >
                {loading ? (
                  <>
                    <svg style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Creating account & verifying face...</span>
                  </>
                ) : (
                  role === 'admin' ? 'Register Admin Portal' : 'Register & verify face'
                )}
              </button>
            </div>
          </form>

          {message && <div className={`message ${message.includes('successful') ? 'success' : 'error'}`} style={{ marginTop: '24px' }}>{message}</div>}

          <div className="auth-footer" style={{ marginTop: '32px' }}>
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>

        <div className="auth-highlights" style={{ marginTop: '36px', width: '100%' }}>
          <div className="highlight-item">
            <span className="highlight-icon">📷</span>
            <h4>Face Image</h4>
            <p>Upload a photo for secure face encoding and validation.</p>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">🔒</span>
            <h4>Secure Password</h4>
            <p>Your password is hashed and never stored in plain text.</p>
          </div>
          <div className="highlight-item">
            <span className="highlight-icon">👥</span>
            <h4>Role Selection</h4>
            <p>Choose admin or employee access during signup.</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .register-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 36px;
        }
        @media (max-width: 768px) {
          .register-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .submit-span {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Register;
