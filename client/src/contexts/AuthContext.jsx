// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChange, 
  signOutUser,
  registerWithEmail,
  signInWithEmail,
  signInWithGoogle,
  resetPassword 
} from '../services/authService';

// Create auth context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const user = await registerWithEmail(userData);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setError(null);
      const user = await signInWithEmail(email, password);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Google login function
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const user = await signInWithGoogle();
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setError(null);
      await signOutUser();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Password reset function
  const sendPasswordReset = async (email) => {
    try {
      setError(null);
      await resetPassword(email);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  // Context value
  const value = {
    currentUser,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    sendPasswordReset,
    clearError,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;