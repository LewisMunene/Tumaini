// src/App.jsx - Complete Firebase Auth Integration ✨
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import all our gorgeous components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import LandingPage from './components/layout/LandingPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 overflow-x-hidden">
          <Routes>
            {/* Landing/Home Page - Where the magic begins! */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Authentication Routes - The glow up zone */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* TODO: Protected Dashboard Routes (coming soon bestie!) */}
            {/* 
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute><Resources /></ProtectedRoute>} />
            */}
            
            {/* Catch-all route - No 404s in this house! */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;