// src/components/layout/Header.jsx - TUMAINI LOGO HEADER VIBES! ✨
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from './Navbar';

const Header = ({ showAuth = false, showNavigation = false }) => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Header Section - Deep Blue with Logo */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-lg border-b border-blue-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            
            {/* Brand Section with Logo */}
            <Link to="/" className="flex items-center space-x-4 lg:space-x-6 hover:opacity-90 transition-opacity duration-200 group">
               
              {/* Tumaini Logo and Branding */}
              <div className="flex items-center space-x-4">
                {/* Tumaini Logo */}
                <div className="flex items-center">
                   <img 
                src="/assets/logos/tumaini-logo.png" 
                alt="Tumaini Logo" 
                className="h-16 w-auto object-contain"
               
              />
                </div>
                
                {/* Platform Text - Hidden on mobile */}
                <div className="hidden lg:flex flex-col">
                  <span className="text-xs sm:text-sm text-blue-100 font-medium">
                    Academic Stress Management
                  </span>
                </div>
              </div>
            </Link>

            {/* Auth Section for Login/Register Pages */}
            {showAuth && !currentUser && (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex flex-col items-end space-y-2">
                  <span className="text-sm font-medium text-blue-100">
                    Need immediate help?
                  </span>
                  <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-semibold text-sm flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <span className="text-lg">🆘</span>
                    <span>Crisis Resources</span>
                  </button>
                </div>
                
                {/* Mobile crisis button */}
                <button className="sm:hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-3 py-2 rounded-xl font-semibold text-sm flex items-center space-x-1 transition-all duration-200 shadow-lg">
                  <span className="text-lg">🆘</span>
                  <span>Help</span>
                </button>
              </div>
            )}

            {/* Profile Section for Authenticated Users */}
            {currentUser && (
              <div className="flex items-center space-x-4">
                {/* Desktop Profile */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-white">
                      Welcome back, {currentUser.displayName?.split(' ')[0] || 'Student'}!
                    </span>
                    <span className="text-xs text-blue-100">
                      Ready to continue your wellness journey?
                    </span>
                  </div>
                  
                  {/* Profile Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center text-blue-900 font-bold shadow-lg">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0).toUpperCase() || 'S'}
                  </div>
                </div>

                {/* Mobile Profile */}
                <div className="lg:hidden flex items-center space-x-2">
                  <span className="text-sm font-medium text-white hidden sm:block">
                    Hi, {currentUser.displayName?.split(' ')[0] || 'Student'}!
                  </span>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center text-blue-900 font-bold text-sm shadow-lg">
                    {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0).toUpperCase() || 'S'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar Section - Lighter Blue */}
      {showNavigation && currentUser && (
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white shadow-md border-b border-blue-400/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Navbar currentUser={currentUser} onSignOut={handleSignOut} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;