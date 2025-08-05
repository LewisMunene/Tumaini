// src/pages/protected/HomePage.jsx - Your Wellness Command Center! 🌟✨
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Update time every minute for that fresh feeling ✨
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Handle logout with style 💅
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get personalized greeting based on time 🌅🌞🌙
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Get the user's first name from email or display name
  const getUserName = () => {
    if (currentUser?.displayName) {
      return currentUser.displayName.split(' ')[0];
    }
    if (currentUser?.email) {
      return currentUser.email.split('@')[0].split('.')[0];
    }
    return 'Bestie';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header with Navigation */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/logos/tumaini-logo.png" 
                alt="Tumaini Logo" 
                className="h-16 w-auto object-contain"
               
              />
              <div className="flex items-center space-x-2">
                
                <div>
                  <h3 className="text-xl font-bold">Tumaini</h3>
                  <p className="text-blue-200 text-sm">Student Wellness Platform</p>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600 hidden sm:block">
                {getGreeting()}, {getUserName()}! ✨
              </span>
              
              {/* Logout Button */}
              <div className="relative">
                <button
                  onClick={() => setShowLogoutConfirm(!showLogoutConfirm)}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200"
                >
                  <span className="text-lg">👋</span>
                  <span>Logout</span>
                </button>

                {/* Logout Confirmation Dropdown */}
                {showLogoutConfirm && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                    <p className="text-sm text-slate-600 mb-3">
                      Ready to log out? Your wellness journey will be here when you get back! 💝
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleLogout}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                      >
                        Yes, log out
                      </button>
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                      >
                        Stay here
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">
            {getGreeting()}, {getUserName()}! 🌟
          </h2>
          <p className="text-slate-600">
            Your wellness journey continues here. How are you feeling today? 💚
          </p>
        </div>

        {/* Quick Actions Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Daily Stress Check-in */}
          <Link to="/stress-tracking" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-blue-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Daily Check-in</h3>
                  <p className="text-sm text-slate-500">How's your stress today?</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Quick mood & stress level tracking to understand your patterns
              </p>
            </div>
          </Link>

          {/* Digital Journaling */}
          <Link to="/journaling" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-purple-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">✍️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Journal</h3>
                  <p className="text-sm text-slate-500">Write it out, bestie</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Your private space to reflect and process your thoughts safely
              </p>
            </div>
          </Link>

          {/* Analytics & Insights */}
          <Link to="/analytics" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-green-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">📈</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Your Insights</h3>
                  <p className="text-sm text-slate-500">See your progress</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Personalized analytics showing your wellness patterns and growth
              </p>
            </div>
          </Link>

          {/* Community Resources */}
          <Link to="/resources" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-orange-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Resources</h3>
                  <p className="text-sm text-slate-500">We got you covered</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Wellness resources, crisis support, and campus counseling info
              </p>
            </div>
          </Link>

          {/* Profile Settings */}
          <Link to="/profile" className="group">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group-hover:border-indigo-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">⚙️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">Profile</h3>
                  <p className="text-sm text-slate-500">Your account settings</p>
                </div>
              </div>
              <p className="text-slate-600 text-sm">
                Manage your account, privacy settings, and emergency contacts
              </p>
            </div>
          </Link>

          {/* Crisis Support - Always Accessible */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 shadow-lg border-2 border-red-200">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-2xl text-white">🆘</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Need Help Now?</h3>
                <p className="text-sm text-red-600">Crisis support available 24/7</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-red-700 text-sm font-medium">
                You're not alone. We're here for you. 💝
              </p>
              <div className="flex space-x-2">
                <a 
                  href="tel:+254722178177" 
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors duration-200"
                >
                  Call Crisis Line
                </a>
                <Link 
                  to="/resources"
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium py-2 px-3 rounded-lg text-center transition-colors duration-200"
                >
                  Get Resources
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Quote Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <p className="text-lg font-medium text-slate-700 mb-2">
            "Your mental health journey is valid, your feelings matter, and you're absolutely crushing it just by being here." 
          </p>
          <p className="text-sm text-slate-500">
            — The Tumaini Community 💚
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500">
            Tumaini provides wellness support and is not a substitute for professional medical care. 
            <br />
            If you're experiencing a mental health emergency, please contact campus security or emergency services immediately.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;