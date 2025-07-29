// src/components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement Firebase password reset
    console.log('Password reset requested for:', email);
    
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
        <Header showAuth={true} showNavigation={false} />
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="text-5xl">📧</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-4">
                Check Your Email! ✨
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We've sent password reset instructions to{' '}
                <span className="font-semibold text-blue-600">{email}</span>
                <br />
                Check your inbox and follow the link to reset your password.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Pro tip:</strong> Check your spam folder if you don't see the email within a few minutes! 🔍
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center"
                  >
                    Back to Sign In 🔑
                  </Link>
                  
                  <button
                    onClick={() => {
                      setEmailSent(false);
                      setEmail('');
                    }}
                    className="w-full border-2 border-slate-200 text-slate-600 py-3 px-6 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200"
                  >
                    Try Different Email
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Still having trouble? Contact{' '}
                <a href="mailto:support@tumaini.strathmore.edu" className="text-blue-600 hover:underline">
                  support@tumaini.strathmore.edu
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <Header showAuth={true} showNavigation={false} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Reset Password Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-4xl">🔐</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-2">
              Forgot Your Password?
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              No worries bestie! We'll send you reset instructions 💪
            </p>
          </div>

          {/* Reset Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@strathmore.edu"
                    pattern="[a-zA-Z0-9._%+-]+@strathmore\.edu$"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
                      email && !email.endsWith('@strathmore.edu')
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    required
                  />
                  <span className="absolute right-3 top-3 text-xl">📧</span>
                </div>
                {email && !email.endsWith('@strathmore.edu') && (
                  <p className="text-xs text-red-600 flex items-center space-x-1">
                    <span>⚠️</span>
                    <span>Must be a valid @strathmore.edu email address</span>
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  Enter the email you used to create your account
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !email.endsWith('@strathmore.edu')}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isLoading || !email.endsWith('@strathmore.edu')
                    ? 'bg-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                    <span>Sending instructions...</span>
                  </span>
                ) : (
                  'Send Reset Instructions 📨'
                )}
              </button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <p className="text-slate-600 text-sm">
                Remember your password? {' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                  Back to Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Support Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Need help? We're here for you! 💝
              <br />
              Contact{' '}
              <a href="mailto:support@tumaini.strathmore.edu" className="text-blue-600 hover:underline">
                support@tumaini.strathmore.edu
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;