import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/Admin.jsx';

const navActive = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('smartattend_token');
    localStorage.removeItem('smartattend_role');
    navigate('/login');
  };

  const token = localStorage.getItem('smartattend_token');
  const role = localStorage.getItem('smartattend_role');
  const isAdmin = role === 'admin';

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>SmartAttend Pro</h1>
          <p>Modern employee attendance and authentication module.</p>
        </div>
        <nav className="nav-bar">
          <NavLink className={navActive} to="/">
            Home
          </NavLink>
          <NavLink className={navActive} to="/login">
            Login
          </NavLink>
          <NavLink className={navActive} to="/register">
            Register
          </NavLink>
          {isAdmin ? (
            <NavLink className={navActive} to="/admin">
              Admin
            </NavLink>
          ) : null}
          {token ? (
            <button className="button secondary" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
