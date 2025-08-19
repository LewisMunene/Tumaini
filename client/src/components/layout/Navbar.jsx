// src/components/layout/Navbar.jsx - CLEAN & PROFESSIONAL NAVBAR! 🧭💙✨
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ currentUser, onSignOut }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for navbar animations
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current path is active
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/home', label: 'Dashboard', icon: '🏠' },
    { path: '/daily-checkin', label: 'Daily Check-in', icon: '✨' },
    { path: '/journal', label: 'Journal', icon: '📖' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
    { path: '/resources', label: 'Resources', icon: '🌟' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-gradient-to-r from-blue-800/95 via-blue-700/95 to-blue-800/95 backdrop-blur-md shadow-2xl border-b border-blue-300/30' 
        : 'bg-gradient-to-r from-blue-800 via-blue-700 to-blue-800 shadow-lg border-b border-blue-400/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-18' : 'h-20'
        }`}>
          
          {/* Logo Section - BIGGER LOGO! */}
          <div className="flex items-center space-x-4">
            <Link to="/home" className="flex items-center space-x-4 group">
              <div className="relative transition-transform duration-300 group-hover:scale-105">
                <img 
                  src="/assets/logos/tumaini-logo.png" 
                  alt="Tumaini Logo" 
                  className={`object-contain transition-all duration-300 ${
                    scrolled ? 'h-20 w-auto' : 'h-24 w-auto'
                  }`}
                />  
              </div>
              <div className="hidden sm:block">
                <h1 className={`font-bold text-white transition-all duration-300 ${
                  scrolled ? 'text-lg' : 'text-xl'
                }`}>
                  Tumaini
                </h1>
                <p className={`text-blue-100 -mt-1 transition-all duration-300 ${
                  scrolled ? 'text-xs' : 'text-sm'
                }`}>
                  Academic Stress Management
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center space-x-3 relative overflow-hidden group hover:scale-105 hover:shadow-lg ${
                  isActive(link.path)
                    ? 'bg-white/25 text-white shadow-xl backdrop-blur-sm ring-2 ring-white/30'
                    : 'text-blue-100 hover:text-white hover:bg-white/15 hover:backdrop-blur-sm'
                }`}
              >
                {isActive(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-blue-200/20 animate-pulse rounded-2xl"></div>
                )}
                <span className="text-lg relative z-10 transition-transform duration-300 group-hover:scale-125">{link.icon}</span>
                <span className="relative z-10 font-medium">{link.label}</span>
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-bounce"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side - Just Crisis Support */}
          <div className="flex items-center">
            
            {/* Crisis Support - Desktop */}
            <Link
              to="/resources"
              className="flex items-center space-x-3 px-4 py-2.5 bg-red-500/90 hover:bg-red-500 text-white rounded-full text-sm font-medium transition-all duration-300 border border-red-400 hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-xl"
            >
              <span className="text-lg">🆘</span>
              <span className="hidden sm:inline">Crisis Support</span>
              <span className="sm:hidden">SOS</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 ml-3 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 hover:scale-105"
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
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 animate-in slide-in-from-top-2 duration-300 backdrop-blur-sm">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-4 px-4 py-4 rounded-xl font-medium text-sm transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm ring-1 ring-white/30'
                      : 'text-blue-100 hover:text-white hover:bg-white/15'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              
              {/* Mobile Crisis Support */}
              <Link
                to="/resources"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-4 px-4 py-4 bg-red-500/20 text-red-100 rounded-xl font-medium text-sm border border-red-400/30 backdrop-blur-sm"
              >
                <span className="text-xl">🆘</span>
                <span className="font-medium">Crisis Support</span>
              </Link>
              
              {/* Mobile Sign Out */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onSignOut();
                }}
                className="flex items-center space-x-4 px-4 py-4 text-blue-100 hover:text-white hover:bg-white/15 rounded-xl font-medium text-sm w-full text-left transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;