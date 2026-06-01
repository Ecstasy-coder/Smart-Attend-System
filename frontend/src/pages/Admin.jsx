import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../services/api.js';

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('smartattend_token');
    const role = localStorage.getItem('smartattend_role');
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    fetchUsers()
      .then((data) => setUsers(data.users || []))
      .catch((err) => {
        setError(err.message);
        if (err.message.toLowerCase().includes('token') || err.message.toLowerCase().includes('unauthorized')) {
          localStorage.removeItem('smartattend_token');
          localStorage.removeItem('smartattend_role');
          navigate('/login');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    const query = searchQuery.toLowerCase().trim();
    const name = (user.name || '').toLowerCase();
    const email = (user.email || '').toLowerCase();
    const dept = (user.department || '').toLowerCase();
    const empId = (user.employeeId || '').toLowerCase();
    return (
      name.includes(query) ||
      email.includes(query) ||
      dept.includes(query) ||
      empId.includes(query)
    );
  });

  // Calculate quick metrics
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === 'admin').length;
  const departments = [...new Set(users.map((u) => u.department).filter(Boolean))].length;

  return (
    <div className="card" style={{ maxWidth: '1000px', width: '100%', padding: '44px 40px', background: 'linear-gradient(180deg, rgba(8,15,32,0.94), rgba(13,20,44,0.86))', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 60px 140px rgba(2,6,23,0.7)', backdropFilter: 'blur(20px)' }}>
      
      {/* Header */}
      <div className="card-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '24px', marginBottom: '32px' }}>
        <span className="eyebrow" style={{ background: 'rgba(168,85,247,0.16)', color: '#c084fc' }}>Admin Operations</span>
        <h2 style={{ margin: '8px 0 4px', color: '#e6eefb', fontSize: '1.8rem', fontWeight: '800' }}>Team user management</h2>
        <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem' }}>Only authorized administrators can review registered credentials and department assignments.</p>
      </div>

      {error && <div className="message error" style={{ marginBottom: '24px' }}>{error}</div>}

      {/* Metrics Board */}
      {!loading && !error && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }} className="metrics-grid">
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '16px 20px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: '800', color: '#60a5fa' }}>{totalUsers}</span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Enrolled Users</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '16px 20px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: '800', color: '#c084fc' }}>{totalAdmins}</span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Administrators</span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '16px 20px', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: '800', color: '#34d399' }}>{departments}</span>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>Departments</span>
          </div>

        </div>
      )}

      {/* Interactive Search Bar */}
      {!loading && !error && (
        <div style={{ position: 'relative', marginBottom: '28px' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem', pointerEvents: 'none', color: '#94a3b8' }}>
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees by name, email, department or ID..."
            style={{
              width: '100%',
              padding: '14px 18px 14px 48px',
              borderRadius: '16px',
              border: '1px solid rgba(148,163,184,0.2)',
              background: 'rgba(255,255,255,0.08)',
              color: '#e2e8f0',
              fontSize: '0.95rem'
            }}
          />
        </div>
      )}

      {loading ? (
        <p style={{ color: '#cbd5e1', textAlign: 'center' }}>Loading user directory...</p>
      ) : filteredUsers.length === 0 ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', margin: '40px 0' }}>No matching team members found.</p>
      ) : (
        <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {filteredUsers.map((user) => (
            <div 
              key={user._id} 
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '20px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'all 0.2s'
              }}
              className="admin-member-card"
            >
              <div>
                <strong style={{ fontSize: '1.1rem', color: '#f8fafc', display: 'block', marginBottom: '2px' }}>{user.name}</strong>
                <span style={{ fontSize: '0.82rem', color: '#94a3b8', wordBreak: 'break-all' }}>{user.email}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: '#64748b' }}>{user.role === 'admin' ? 'Admin Key:' : 'Employee ID:'}</span>
                  <span style={{ fontWeight: '600', color: '#cbd5e1' }}>{user.employeeId}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: '#64748b' }}>Department:</span>
                  <span style={{ fontWeight: '600', color: '#cbd5e1' }}>{user.department || 'N/A'}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginTop: '4px' }}>
                  <span style={{ color: '#64748b' }}>Access Role:</span>
                  <span style={{
                    background: user.role === 'admin' ? 'rgba(168,85,247,0.16)' : 'rgba(34,197,94,0.16)',
                    color: user.role === 'admin' ? '#c084fc' : '#4ade80',
                    border: user.role === 'admin' ? '1px solid rgba(168,85,247,0.2)' : '1px solid rgba(34,197,94,0.2)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {user.role}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', fontSize: '0.75rem', color: '#64748b', textAlign: 'right' }}>
                Registered {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .admin-member-card:hover {
          background: rgba(255,255,255,0.07) !important;
          border-color: rgba(37,99,235,0.2) !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(2,6,23,0.4);
        }
        @media (max-width: 600px) {
          .metrics-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Admin;
