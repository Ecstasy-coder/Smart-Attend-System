import { useState } from 'react';
import Register from './pages/Register';
import Attendance from './pages/Attendance';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('register');

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-brand">SmartAttend Pro</div>

        <div className="nav-links">
          <button
            className={`nav-button ${
              currentPage === 'register' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('register')}
          >
            Register
          </button>

          <button
            className={`nav-button ${
              currentPage === 'attendance' ? 'active' : ''
            }`}
            onClick={() => setCurrentPage('attendance')}
          >
            Mark Attendance
          </button>
        </div>
      </nav>

      <div className="page-container">
        {currentPage === 'register' ? (
          <Register />
        ) : (
          <Attendance />
        )}
      </div>
    </div>
  );
}