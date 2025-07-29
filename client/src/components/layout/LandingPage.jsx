// src/components/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 to-slate-200">
      {/* Header with auth mode enabled for landing page */}
      <Header showAuth={true} showNavigation={false} />
      
      {/* Main content area */}
      <main className="flex-1 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent mb-4 lg:mb-6">
              ⚡ Tumaini Platform Preview ⚡
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Welcome to the future of student wellness at Strathmore University!
              <br className="hidden sm:block" />
              Our header is serving those official university vibes while keeping 
              mental health support front and center. ✨
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Your Wellness Journey 🚀
              </Link>
              <Link
                to="/login"
                className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
              >
                Already Have an Account? Sign In
              </Link>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
            
            {/* Secure Authentication Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔐</span>
                <h3 className="text-xl font-semibold text-blue-800">Secure Authentication</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                University email validation with Google sign-in option for seamless access to your wellness journey.
              </p>
            </div>

            {/* Stress Tracking Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📊</span>
                <h3 className="text-xl font-semibold text-blue-800">Stress Tracking</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Daily wellness check-ins with mood and sleep monitoring to help you understand your patterns.
              </p>
            </div>

            {/* Digital Journaling Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📝</span>
                <h3 className="text-xl font-semibold text-blue-800">Digital Journaling</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Private journaling with sentiment analysis for crisis detection and personalized wellness insights.
              </p>
            </div>

            {/* Crisis Support Card */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-slate-200 hover:shadow-xl hover:border-red-300 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🆘</span>
                <h3 className="text-xl font-semibold text-red-600">Crisis Support</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Immediate access to crisis resources and counselor alerts when you need support the most.
              </p>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white rounded-2xl p-8 lg:p-12 shadow-2xl">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 lg:mb-6">
                Authentication Pages Are LIVE! 🎉
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-6">
                We've built the most beautiful login/register experience that'll make you actually 
                <em className="italic font-medium"> excited </em> 
                to sign up for mental health support. No cap! 💯
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
                >
                  Try Registration Flow ✨
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Test Login Experience 🔑
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-friendly Footer Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500">
              <span className="hidden sm:inline">Student Wellness Platform • </span>
              Academic Stress Management • 
              <span className="hidden sm:inline"> Progressive Web Application</span>
              <span className="sm:hidden"> PWA Ready</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;