// src/components/layout/Header.jsx
import React, { useState } from 'react';

const Header = ({ showAuth = false, showNavigation = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-blue-800 to-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          
          {/* Brand Section */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            {/* Strathmore University Section */}
            <div className="flex items-center space-x-3 pr-4 lg:pr-6 border-r-2 border-white/20">
              {/* University Logo */}
              <div className="w-12 h-12 bg-white text-blue-800 rounded-lg flex items-center justify-center font-bold text-lg shadow-md">
                SU
              </div>
              
              {/* University Info - Hidden on small screens */}
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-semibold leading-tight">
                  Strathmore University
                </span>
                <span className="text-xs text-white/80 leading-tight">
                  Student Wellness Platform
                </span>
              </div>
            </div>
            
            {/* Platform Branding */}
            <div className="flex flex-col">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
                Tumaini
              </h1>
              <span className="text-xs sm:text-sm text-white/90 font-light -mt-1 hidden sm:block">
                Academic Stress Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {showNavigation && (
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="/dashboard" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                Dashboard
              </a>
              <a href="/journal" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                Journal
              </a>
              <a href="/resources" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                Resources
              </a>
              <a href="/analytics" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                Analytics
              </a>
            </nav>
          )}

          {/* Auth Section for Login/Register Pages */}
          {showAuth && (
            <div className="flex flex-col items-end space-y-2">
              <span className="text-sm font-medium hidden sm:block">
                Need immediate help?
              </span>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-sm flex items-center space-x-2 transition-all duration-200 shadow-md hover:shadow-lg">
                <span className="text-lg">🆘</span>
                <span className="hidden sm:inline">Crisis Resources</span>
                <span className="sm:hidden">Help</span>
              </button>
            </div>
          )}

          {/* Profile Section for Authenticated Users */}
          {!showAuth && (
            <div className="flex items-center space-x-4">
              {/* Desktop Profile */}
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-sm font-medium">Welcome back!</span>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all duration-200 mt-1">
                  <span>👤</span>
                  <span>Profile</span>
                </button>
              </div>
              
              {/* Mobile Profile Button */}
              <button className="lg:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-200">
                <span className="text-xl">👤</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          {showNavigation && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {showNavigation && (
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <nav className="py-4 border-t border-white/20">
              <div className="flex flex-col space-y-3">
                <a href="/dashboard" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                  📊 Dashboard
                </a>
                <a href="/journal" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                  📝 Journal
                </a>
                <a href="/resources" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                  📚 Resources
                </a>
                <a href="/analytics" className="px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium">
                  📈 Analytics
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile University Info Banner - Only show on small screens */}
      <div className="sm:hidden bg-white/5 px-4 py-2 text-center">
        <span className="text-xs text-white/80">Student Wellness Platform • Academic Stress Management</span>
      </div>
    </header>
  );
};

export default Header;