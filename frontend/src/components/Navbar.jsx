import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export const Navbar = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <h1 className="logo">💰 Expense Tracker</h1>
        <div className="nav-links">
          <button className="nav-btn" onClick={() => onNavigate('expenses')}>
            Expenses
          </button>
          <button className="nav-btn" onClick={() => onNavigate('dashboard')}>
            Dashboard
          </button>
        </div>
        <div className="user-section">
          <span className="user-name">{user?.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
