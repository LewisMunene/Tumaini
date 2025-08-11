// src/App.jsx - Complete Tumaini Platform with Protected Routes! 🌟✨
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import our gorgeous components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import LandingPage from './components/layout/LandingPage';

// Import our shiny new protected route guard 🛡️
import ProtectedRoute from './routes/ProtectedRoute';

// Import our protected pages - the wellness kingdom! 👑
import HomePage from './pages/protected/HomePage';
import DailyCheckInPage from './pages/protected/DailyCheckInPage';
// import StressTrackingPage from './pages/protected/StressTrackingPage';
import JournalingPage from './pages/protected/JournalingPage';
// import AnalyticsPage from './pages/protected/AnalyticsPage';
// import ResourcesPage from './pages/protected/ResourcesPage';
// import ProfilePage from './pages/protected/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-200 overflow-x-hidden">
          <Routes>
            {/* Public Routes - Welcome to the Tumaini universe! 🌌 */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes - Where the wellness magic happens! ✨ */}
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />

            {/* 🌟 NEW: Daily Check-in Flow - Where the self-care vibes happen! */}
            <Route 
              path="/daily-checkin" 
              element={
                <ProtectedRoute>
                  <DailyCheckInPage />
                </ProtectedRoute>
              } 
            />
            
            {/* <Route 
              path="/stress-tracking" 
              element={
                <ProtectedRoute>
                  <StressTrackingPage />
                </ProtectedRoute>
              } 
            /> */}
            
            <Route 
              path="/journal" 
              element={
                <ProtectedRoute>
                  <JournalingPage />
                </ProtectedRoute>
              } 
            />
            
            {/* <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              } 
            /> */}
            
            {/* <Route 
              path="/resources" 
              element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              } 
            /> */}
            
            {/* <Route 
              path="/profile" 
              element={
                <ProtectedRoute>  
                  <ProfilePage />
                </ProtectedRoute>
              } 
            /> */}
            
            
            {/* Legacy route redirects - keeping things smooth for users */}
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
            
            {/* Catch-all route - No 404s in this wellness house! */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;