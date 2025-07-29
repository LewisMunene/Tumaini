// src/components/auth/Login.jsx - NOW WITH ACTUAL FIREBASE POWER! 🚀
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../layout/Header';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Check for success message from registration
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleInputChange = (e) => {
    // Clear any previous errors/messages when user starts typing
    if (error) clearError();
    if (successMessage) setSuccessMessage('');
    
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ACTUAL FIREBASE LOGIN! No more fake timeouts bestie! 🔥
      await login(formData.email, formData.password);
      
      // Success! Navigate to dashboard (or home for now since we don't have dashboard yet)
      navigate('/'); // Change to '/dashboard' when you build it!
    } catch (error) {
      console.error('Login failed:', error);
      // Error is automatically set in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      clearError();
      setIsLoading(true);
      await loginWithGoogle();
      
      // Success! Navigate to dashboard
      navigate('/'); // Change to '/dashboard' when you build it!
    } catch (error) {
      console.error('Google sign in failed:', error);
      // Error is automatically set in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <Header showAuth={true} showNavigation={false} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md">
          
          {/* Welcome Back Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-4xl">🌟</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome Back, Bestie!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Ready to continue your wellness journey? Let's get you signed in! ✨
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
            
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-green-600 flex items-center space-x-2">
                  <span>🎉</span>
                  <span>{successMessage}</span>
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                  University Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.name@strathmore.edu"
                    pattern="[a-zA-Z0-9._%+-]+@strathmore\.edu$"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
                      formData.email && !formData.email.endsWith('@strathmore.edu')
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    required
                    disabled={isLoading}
                  />
                  <span className="absolute right-3 top-3 text-xl">📧</span>
                </div>
                {formData.email && !formData.email.endsWith('@strathmore.edu') && (
                  <p className="text-xs text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Must be a valid @strathmore.edu email address</span>
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  Only official Strathmore University email addresses are accepted
                </p>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your secure password"
                    className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-slate-700 placeholder-slate-400"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 p-1 text-slate-500 hover:text-slate-700 transition-colors duration-200"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <span className="text-slate-600">Remember me</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !formData.email.endsWith('@strathmore.edu') || !formData.password}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isLoading || !formData.email.endsWith('@strathmore.edu') || !formData.password
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
                    </svg>
                    <span>Signing you in...</span>
                  </span>
                ) : (
                  'Sign In to Tumaini 🚀'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-200"></div>
              <span className="px-4 text-sm text-slate-500 bg-white">or continue with</span>
              <div className="flex-1 border-t border-slate-200"></div>
            </div>

            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-3 px-6 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                New to Tumaini? {' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                  Create your wellness account
                </Link>
              </p>
            </div>
          </div>

          {/* Support Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Your mental health journey is private and secure. 🔒
              <br />
              Need help? Contact{' '}
              <a href="mailto:wellness@strathmore.edu" className="text-blue-600 hover:underline">
                wellness@strathmore.edu
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;