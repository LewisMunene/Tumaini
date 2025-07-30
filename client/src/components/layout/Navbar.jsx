// src/components/layout/Navbar.jsx - TUMAINI LOGO NAVBAR QUEEN! 🧭✨
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentUser, onSignOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/checkin', label: 'Daily Check-in', icon: '✨' },
    { path: '/journal', label: 'Journal', icon: '📖' },
    { path: '/resources', label: 'Resources', icon: '🌟' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/support', label: 'Support', icon: '🤝' },
  ];

  return (
    <nav className="py-4">
      <div className="flex items-center justify-between">
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                isActive(link.path)
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-blue-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="lg:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-blue-200 p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {currentUser?.displayName?.split(' ')[0] || 'Student'}
              </p>
              <p className="text-xs text-blue-200">
                {currentUser?.email}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold shadow-md">
                {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
              </div>
              
              <button
                onClick={onSignOut}
                className="text-blue-200 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                title="Sign out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Profile */}
        <div className="lg:hidden flex items-center space-x-2">
          <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
            {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
          </div>
          <button
            onClick={onSignOut}
            className="text-blue-200 hover:text-red-300 p-1 rounded-lg hover:bg-red-500/20 transition-all duration-200"
            title="Sign out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex flex-col items-center space-y-1 ${
                  isActive(link.path)
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="text-xs text-center">{link.label}</span>
              </Link>
            ))}
          </div>
          
          {/* Mobile User Info */}
          <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
            <div className="text-sm text-blue-100">
              <p className="font-medium text-white">
                {currentUser?.displayName?.split(' ')[0] || 'Student'}
              </p>
              <p className="text-xs">{currentUser?.email}</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;