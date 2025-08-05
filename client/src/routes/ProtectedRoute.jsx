// src/routes/ProtectedRoute.jsx - The Auth Bouncer That Actually Cares About You! 💅✨
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while we're checking auth status - no jarring redirects bestie! 
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          {/* Cute loading animation */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-700">
              Getting your wellness space ready...
            </h2>
            <p className="text-sm text-slate-500">
              Just a sec bestie! ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with the current location
  // So after they log in, they'll come back to where they were trying to go! Smart, right? 🧠
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // User is authenticated! Welcome to the wellness kingdom bestie! 👑
  return children;
};

export default ProtectedRoute;