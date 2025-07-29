// src/components/auth/Register.jsx - NOW WITH ACTUAL FIREBASE INTEGRATION! 🔥
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../layout/Header';

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, error, clearError } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    // Clear any previous errors when user starts typing
    if (error) clearError();
    
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('emergency.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ACTUAL FIREBASE REGISTRATION! 🚀
      await register(formData);
      
      // Success! Navigate to dashboard (or login for now)
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please sign in to continue.' 
        }
      });
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is automatically set in the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      clearError();
      await loginWithGoogle();
      
      // Success! Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign up failed:', error);
      // Error is automatically set in the auth context
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && 
               formData.lastName && 
               formData.email && 
               formData.email.endsWith('@strathmore.edu') &&
               formData.studentId;
      case 2:
        return formData.password && 
               formData.confirmPassword && 
               formData.password === formData.confirmPassword &&
               formData.password.length >= 6;
      case 3:
        return formData.agreeToTerms && formData.agreeToPrivacy;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-3xl mb-2 block">👋</span>
              <h2 className="text-xl font-bold text-slate-800">Tell us about yourself!</h2>
              <p className="text-slate-600 text-sm">Let's get the basics sorted, bestie ✨</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  required
                />
              </div>
            </div>

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
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 transition-all duration-200 ${
                    formData.email && !formData.email.endsWith('@strathmore.edu')
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  required
                />
                <span className="absolute right-3 top-3 text-xl">📧</span>
              </div>
              {formData.email && !formData.email.endsWith('@strathmore.edu') && (
                <p className="text-xs text-red-600 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>Must be a valid @strathmore.edu email address</span>
                </p>
              )}
              <p className="text-xs text-slate-500">Must be your official Strathmore email</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="studentId" className="block text-sm font-semibold text-slate-700">
                Student ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  placeholder="138833"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  required
                />
                <span className="absolute right-3 top-3 text-xl">🎓</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-3xl mb-2 block">🔐</span>
              <h2 className="text-xl font-bold text-slate-800">Secure your account</h2>
              <p className="text-slate-600 text-sm">Your privacy and security are our top priority! 💪</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Create Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pr-12 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 p-1 text-slate-500 hover:text-slate-700 transition-colors duration-200"
                  title={showPassword ? 'Hide password' : 'Show password'}
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
              <p className="text-xs text-slate-500">At least 6 characters (Firebase requirement)</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-2 transition-all duration-200 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-200'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 p-1 text-slate-500 hover:text-slate-700 transition-colors duration-200"
                  title={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
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
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-red-600">Passwords don't match!</p>
              )}
            </div>

            {/* Password Strength Indicator */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-700">Password Strength:</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded ${
                      formData.password.length >= level * 2
                        ? level <= 2 ? 'bg-red-400' : level === 3 ? 'bg-yellow-400' : 'bg-green-400'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <span className="text-3xl mb-2 block">🤝</span>
              <h2 className="text-xl font-bold text-slate-800">Emergency Contact</h2>
              <p className="text-slate-600 text-sm">Someone who cares about your wellbeing 💝</p>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-red-600 flex items-center space-x-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="emergency.name" className="block text-sm font-semibold text-slate-700">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="emergency.name"
                  name="emergency.name"
                  value={formData.emergencyContact.name}
                  onChange={handleInputChange}
                  placeholder="Full name of emergency contact"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="emergency.phone" className="block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="emergency.phone"
                  name="emergency.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleInputChange}
                  placeholder="+254 700 000 000"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="emergency.relationship" className="block text-sm font-semibold text-slate-700">
                  Relationship
                </label>
                <select
                  id="emergency.relationship"
                  name="emergency.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                >
                  <option value="">Select relationship</option>
                  <option value="parent">Parent/Guardian</option>
                  <option value="sibling">Sibling</option>
                  <option value="friend">Close Friend</option>
                  <option value="relative">Other Relative</option>
                  <option value="mentor">Mentor/Advisor</option>
                </select>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
                  required
                />
                <span className="text-sm text-slate-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and understand that this platform provides wellness support, not medical treatment.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 mt-0.5"
                  required
                />
                <span className="text-sm text-slate-600">
                  I acknowledge the{' '}
                  <a href="/privacy" className="text-blue-600 hover:underline font-medium">
                    Privacy Policy
                  </a>{' '}
                  and consent to secure data processing for my wellness journey.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <Header showAuth={true} showNavigation={false} />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step <= currentStep 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {step < currentStep ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-blue-600' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">
                Join the Tumaini Family! 
              </h1>
              <p className="text-slate-600 text-sm">
                Step {currentStep} of 3 • Your wellness journey starts here ✨
              </p>
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
            <form onSubmit={currentStep === 3 ? handleSubmit : (e) => e.preventDefault()}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                    disabled={isLoading}
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                      isStepValid()
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid() || isLoading}
                    className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                      isStepValid() && !isLoading
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                        <span>Creating account...</span>
                      </span>
                    ) : (
                      'Create My Account 🎉'
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Google Sign Up - Only show on first step */}
            {currentStep === 1 && (
              <>
                <div className="my-6 flex items-center">
                  <div className="flex-1 border-t border-slate-200"></div>
                  <span className="px-4 text-sm text-slate-500 bg-white">or continue with</span>
                  <div className="flex-1 border-t border-slate-200"></div>
                </div>

                <button
                  onClick={handleGoogleSignUp}
                  className="w-full py-3 px-6 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 flex items-center justify-center space-x-3"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              </>
            )}
          </div>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Already have an account? {' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                Sign in to continue your journey
              </Link>
            </p>
          </div>

          {/* Support Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              🌟 Your information is encrypted and secure
              <br />
              Questions? Email{' '}
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

export default Register;