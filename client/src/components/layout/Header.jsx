// src/components/layout/Header.jsx
import React from 'react';
import './Header.css';

const Header = ({ showAuth = false, showNavigation = false }) => {
  return (
    <header className="tumaini-header">
      <div className="header-container">
        {/* Strathmore University Branding */}
        <div className="header-brand">
          <div className="university-section">
            <div className="university-logo">
              {/* Placeholder for Strathmore logo */}
              <div className="logo-placeholder">
                <span className="logo-text">SU</span>
              </div>
            </div>
            <div className="university-info">
              <span className="university-name">Strathmore University</span>
              <span className="platform-subtitle">Student Wellness Platform</span>
            </div>
          </div>
          
          <div className="platform-branding">
            <h1 className="platform-name">Tumaini</h1>
            <span className="platform-tagline">Academic Stress Management</span>
          </div>
        </div>

        {/* Navigation for authenticated users */}
        {showNavigation && (
          <nav className="header-navigation">
            <ul className="nav-links">
              <li><a href="/dashboard" className="nav-link">Dashboard</a></li>
              <li><a href="/journal" className="nav-link">Journal</a></li>
              <li><a href="/resources" className="nav-link">Resources</a></li>
              <li><a href="/analytics" className="nav-link">Analytics</a></li>
            </ul>
          </nav>
        )}

        {/* Auth page specific elements */}
        {showAuth && (
          <div className="header-auth-section">
            <div className="crisis-support">
              <span className="help-text">Need immediate help?</span>
              <button className="crisis-btn" type="button">
                <span className="crisis-icon">🆘</span>
                Crisis Resources
              </button>
            </div>
          </div>
        )}

        {/* User profile section for authenticated users */}
        {!showAuth && (
          <div className="header-profile">
            <div className="user-info">
              <span className="user-greeting">Welcome back!</span>
              <button className="profile-btn" type="button">
                <span className="profile-icon">👤</span>
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;