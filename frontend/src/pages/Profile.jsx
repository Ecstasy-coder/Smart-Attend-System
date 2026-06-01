import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../services/api.js';

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('smartattend_token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchProfile()
      .then((data) => setProfile(data.user))
      .catch((err) => {
        setError(err.message);
        localStorage.removeItem('smartattend_token');
        navigate('/login');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('smartattend_token');
    localStorage.removeItem('smartattend_role');
    navigate('/login');
  };

  return (
    <div className="card" style={{ maxWidth: '820px', width: '100%', padding: '44px 40px', background: 'linear-gradient(180deg, rgba(8,15,32,0.94), rgba(13,20,44,0.86))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 60px 140px rgba(2,6,23,0.7)', backdropFilter: 'blur(20px)' }}>
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="eyebrow" style={{ background: 'rgba(37,99,235,0.16)', color: '#60a5fa' }}>Employee Portal</span>
          <h2 style={{ margin: '8px 0 4px', color: '#e6eefb', fontSize: '1.8rem', fontWeight: '800' }}>Your Profile details</h2>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem' }}>Review secure account information and role-based permissions.</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="button secondary"
          style={{ padding: '10px 18px', borderRadius: '12px', fontSize: '0.88rem', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.05)', color: '#f8fafc', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Sign out ➔
        </button>
      </div>

      {error && <div className="message error">{error}</div>}

      {profile ? (
        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
          
          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 Full Name
            </span>
            <p style={{ margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>{profile.name}</p>
          </div>

          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📧 Email Address
            </span>
            <p style={{ margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc', wordBreak: 'break-all' }}>{profile.email}</p>
          </div>

          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {profile.role === 'admin' ? '🔑 Admin Access Key' : '🆔 Employee ID'}
            </span>
            <p style={{ margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>{profile.employeeId}</p>
          </div>

          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👥 System Role
            </span>
            <div style={{ marginTop: '8px' }}>
              <span style={{
                background: profile.role === 'admin' ? 'rgba(168,85,247,0.16)' : 'rgba(34,197,94,0.16)',
                color: profile.role === 'admin' ? '#c084fc' : '#4ade80',
                border: profile.role === 'admin' ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(34,197,94,0.2)',
                padding: '4px 10px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                display: 'inline-block'
              }}>
                {profile.role}
              </span>
            </div>
          </div>

          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🏢 Department
            </span>
            <p style={{ margin: '8px 0 0', fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>{profile.department || 'N/A'}</p>
          </div>

          <div className="profile-card info-tile" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '18px', padding: '20px', transition: 'all 0.2s' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              📅 Registered Date
            </span>
            <p style={{ margin: '8px 0 0', fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>
              {new Date(profile.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
            </p>
          </div>

        </div>
      ) : (
        <p style={{ color: '#cbd5e1', textAlign: 'center' }}>Loading your profile data...</p>
      )}

      <style>{`
        .info-tile:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(37,99,235,0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(2,6,23,0.3);
        }
      `}</style>
    </div>
  );
}

export default Profile;
